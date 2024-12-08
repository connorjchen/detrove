import express from "express";
import {
  getBankAccount,
  updateMoney,
  createBankAccount,
  getAccessTokenAndAccountId,
  getCustomerId,
} from "../services/transferMoneyServices.js";
import dotenv from "dotenv";
import Stripe from "stripe";
import { Configuration, PlaidApi, Products, PlaidEnvironments } from "plaid";

dotenv.config();
const router = express.Router();

const prettyPrintResponse = (response) => {
  console.log(util.inspect(response.data, { colors: true, depth: 4 }));
};

const PLAID_ENV = process.env.PLAID_ENV;
const stripe = new Stripe(
  PLAID_ENV === "sandbox" || PLAID_ENV === "development"
    ? process.env.STRIPE_SECRET_KEY_SANDBOX
    : process.env.STRIPE_SECRET_KEY_PRODUCTION
);
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;

const PLAID_SECRET =
  PLAID_ENV === "sandbox"
    ? process.env.PLAID_SECRET_SANDBOX
    : PLAID_ENV === "development"
    ? process.env.PLAID_SECRET_DEVELOPMENT
    : process.env.PLAID_SECRET_PRODUCTION;

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (
  process.env.PLAID_PRODUCTS || Products.Transactions
).split(",");

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || "US").split(
  ","
);

// The payment_id is only relevant for the UK/EU Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store along with the Payment metadata, such as userId .
let PAYMENT_ID = null;
const LINK_CUSTOM_NAME = process.env.LINK_CUSTOM_NAME || null;

const WEBHOOK_URL =
  process.env.WEBHOOK_URL || "https://www.example.com/server/plaid_webhook";

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const client = new PlaidApi(configuration);

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
router.get("/create_link_token/:userId", async (req, res, next) => {
  const { userId } = req.params;

  const tokenResponse = await client.linkTokenCreate({
    user: { client_user_id: userId },
    client_name: "Detrove",
    language: "en",
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
    webhook: WEBHOOK_URL,
    link_customization_name: LINK_CUSTOM_NAME,
  });
  res.json(tokenResponse.data);
});

// Retrieve real-time Balances for each of an Item's accounts
// https://plaid.com/docs/#balance
router.get("/balance/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const { access_token, account_id } = await getAccessTokenAndAccountId(userId);

  Promise.resolve()
    .then(async function () {
      const balanceResponse = await client.accountsBalanceGet({
        access_token,
        options: {
          account_ids: [account_id],
        },
      });
      res.json(balanceResponse.data);
    })
    .catch(next);
});

// Make stripe transfer from customer funding source to app's master account.
router.post("/makeTransfer/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const { amount, description } = req.body;

  const { customer_id } = await getCustomerId(userId);

  try {
    const receipt = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      description: description,
      customer: customer_id,
    });
    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
router.post("/initiatePlaid/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    const access_token = tokenResponse.data.access_token;

    const accountResult = await client.accountsGet({
      access_token,
    });

    // Works assuming that we're only allowing our user to select one account per Item.
    const account_id = accountResult.data.accounts[0].account_id;

    // Generate a bank account token
    const stripeTokenResponse =
      await client.processorStripeBankAccountTokenCreate({
        access_token,
        account_id,
      });

    const bankAccountToken = stripeTokenResponse.data.stripe_bank_account_token;

    // Get user identity - the request is the same for both auth and identity calls
    const identityResponse = await client.identityGet({
      access_token,
      options: {
        account_ids: [account_id],
      },
    });
    let email = identityResponse.data.accounts[0].owners[0].emails[0].data;
    let ownerNames = identityResponse.data.accounts[0].owners[0].names[0];
    let accountName = identityResponse.data.accounts[0].name;
    let availableBalance = identityResponse.data.accounts[0].balances.available;

    // Create a Stripe Customer
    const customer = await stripe.customers.create({
      description: "Example customer",
      name: ownerNames,
      email: email,
      source: bankAccountToken,
    });

    await createBankAccount(
      userId,
      accountName,
      ownerNames,
      account_id,
      access_token,
      customer.id,
      req,
      res
    );

    res.json({ accountName, availableBalance });
  } catch (error) {
    next(error);
  }
});

router.get("/bank/account/:userId", async function (req, res) {
  const { userId } = req.params;
  await getBankAccount(userId, client, req, res);
});

// Route to add/subtract money to user's Detrove account
router.post("/transfer/:userId", async function (req, res) {
  const { userId } = req.params;
  const { amount } = req.body;
  await updateMoney(userId, amount, req, res);
});

export default router;
