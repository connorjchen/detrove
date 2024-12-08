import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/money`;

export const getBankAccount = (userId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.transferMoneyGetBankAccount,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/bank/account/${userId}`);
      dispatch({
        type: RequestsEnum.transferMoneyGetBankAccount,
        payload: data,
      });
    }
  );
};

// update Detrove user account
export const transferMoney = (userId, amount) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.transferMoneyTransfer,
    async () => {
      await Axios.post(`${baseUrl}/transfer/${userId}`, { amount });
      return { result: "success" };
    }
  );
};

// transfer through Stripe
export const makeTransfer = (userId, amount) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.transferMoneyMakeTransfer,
    async () => {
      const { data } = await Axios.post(`${baseUrl}/makeTransfer/${userId}`, {
        amount,
        description: `${userId} transferred money to Detrove`,
      });
      return data.status;
    }
  );
};

export const getAccountBalance = (userId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.transferMoneyGetAccountBalance,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/balance/${userId}`);
      return data.accounts[0].balances.available;
    }
  );
};

export const initiatePlaid = (publicToken, userId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.transferMoneyInitiatePlaid,
    async () => {
      const { data } = await Axios.post(`${baseUrl}/initiatePlaid/${userId}`, {
        public_token: publicToken,
      });
      dispatch({
        type: RequestsEnum.transferMoneyInitiatePlaid,
        payload: data,
      });
    }
  );
};

export const createLinkToken = (userId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.transferMoneyCreateLinkToken,
    async () => {
      const { data } = await Axios.get(
        `${baseUrl}/create_link_token/${userId}`
      );
      return data;
    }
  );
};
