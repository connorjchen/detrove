import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  useTheme,
  Divider,
  OutlinedInput,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LogInReminder from "../components/logInReminder";
import ContentBox from "../components/contentBox";
import { convertToDisplayPrice } from "../utils/utils";
import { usePlaidLink } from "react-plaid-link";
import {
  makeTransfer as makeTransferApi,
  getAccountBalance,
  initiatePlaid,
  createLinkToken as createLinkTokenApi,
  getBankAccount,
  transferMoney as transferMoneyApi,
} from "../redux/actions/transferMoneyActions";
import { displayErrors } from "../utils/utils";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import Loading from "../components/loading";

export default function TransferMoney() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { bankAccount } = useSelector((state) => state.transferMoney);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [
      RequestsEnum.transferMoneyGetAccountBalance,
      RequestsEnum.transferMoneyGetBankAccount,
      RequestsEnum.transferMoneyInitiatePlaid,
      RequestsEnum.transferMoneyMakeTransfer,
      RequestsEnum.transferMoneyCreateLinkToken,
    ])
  );

  const { user } = useSelector((state) => state.profile);
  const [transferAmount, setTransferAmount] = useState("");
  const [token, setToken] = useState(null);
  let isOauth = false;

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  const onSuccess = useCallback(
    (publicToken) => {
      dispatch(initiatePlaid(publicToken, user.id));
    },
    [dispatch, user]
  );

  const createLinkToken = React.useCallback(async () => {
    // For OAuth, use previously generated Link token
    if (window.location.href.includes("?oauth_state_id=")) {
      const linkToken = localStorage.getItem("link_token");
      setToken(linkToken);
    } else {
      if (user) {
        const data = await dispatch(createLinkTokenApi(user.id));
        setToken(data.link_token);
        localStorage.setItem("link_token", data.link_token);
      }
    }
  }, [setToken, dispatch, user]);

  const config = {
    token,
    onSuccess,
  };

  // For OAuth, configure the received redirect URI
  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }
  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (bankAccount && !bankAccount?.accountName) {
      if (token == null) {
        createLinkToken();
      }
      if (isOauth && ready) {
        open();
      }
    }
  }, [token, isOauth, ready, open, createLinkToken, bankAccount]);

  useEffect(() => {
    if (user) {
      dispatch(getBankAccount(user.id));
    }
  }, [dispatch, user]);

  const makeTransfer = async (transferAmount) => {
    dispatch(getAccountBalance(user.id)).then((realtimeAvailableBalance) => {
      if (realtimeAvailableBalance >= transferAmount) {
        dispatch(
          makeTransferApi(user.id, Math.round(transferAmount * 100))
        ).then((chargeStatus) => {
          if (chargeStatus === "succeeded") {
            enqueueSnackbar("Transfer successful!", { variant: "success" });
          } else if (chargeStatus === "pending") {
            enqueueSnackbar("Transfer pending!", { variant: "success" });
          } else {
            enqueueSnackbar("Transfer failed!", { variant: "error" });
          }
        });

        setTransferAmount("");
        // transfers money instantly
        // dispatch(transferMoneyApi(user.id, transferAmount));
      } else {
        enqueueSnackbar("Insufficient available funds!", { variant: "error" });
      }
    });
  };

  function ConnectToBank() {
    if (bankAccount?.accountName && bankAccount?.availableBalance) {
      return (
        <Typography variant="h6" height="48px" lineHeight="48px">
          {bankAccount.accountName}{" "}
          {convertToDisplayPrice(bankAccount.availableBalance)}
        </Typography>
      );
    } else {
      return (
        <Box
          sx={{
            ...theme.basicButton,
            height: "48px",
            width: "180px",
            backgroundColor: theme.palette.accent.dark,
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.accent.hover,
            },
          }}
          onClick={() => open()}
        >
          <Typography variant="h6">Connect to Bank</Typography>
        </Box>
      );
    }
  }

  function TransferMoneyButton() {
    const validTransfer =
      bankAccount?.availableBalance &&
      transferAmount > 0 &&
      transferAmount <= parseFloat(bankAccount?.availableBalance);
    return (
      <>
        <Box
          sx={{
            ...theme.basicButton,
            height: "48px",
            width: "100%",
            backgroundColor: validTransfer
              ? theme.palette.accent.dark
              : theme.palette.secondary.hover,
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: validTransfer
                ? theme.palette.accent.hover
                : null,
            },
            cursor: validTransfer ? "pointer" : "not-allowed",
          }}
          onClick={() => (validTransfer ? makeTransfer(transferAmount) : null)}
        >
          <Typography variant="h6">Deposit Money</Typography>
        </Box>
        <Typography
          variant="h6"
          color={theme.palette.secondary.bold}
          fontSize="14px"
          mt="10px"
        >
          * Transfers may take up to 4 business days to complete
        </Typography>
      </>
    );
  }

  function TransactionInfo({ typeOfTransaction, amount, isWithdraw, date }) {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontSize="20px">
            {typeOfTransaction}
          </Typography>
          <Typography variant="h6" fontSize="20px">
            {isWithdraw ? "-" : "+"}${amount}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            {date}
          </Typography>
        </Box>
      </>
    );
  }

  if (!user) return <LogInReminder />;
  if (isLoading) return <Loading />;

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          marginRight: { xs: "0px", md: "32px" },
        }}
      >
        <Typography variant="h6" fontSize="24px" marginBottom="16px">
          Deposit Money
        </Typography>
        <ContentBox
          title="Information"
          content={
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="8px"
              >
                <Typography variant="h6" fontSize="20px">
                  Amount
                </Typography>
                <OutlinedInput
                  value={transferAmount}
                  type="number"
                  onChange={(e) => {
                    const regex = /^\d+(\.\d{1,2})?$/;
                    if (regex.test(e.target.value) || e.target.value === "")
                      setTransferAmount(e.target.value);
                  }}
                  startAdornment={<Typography variant="h6">$</Typography>}
                  placeholder="0.00"
                  sx={{
                    ...theme.inputAnimation,
                    height: "48px",
                    width: "180px",
                  }}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="8px"
              >
                <Typography variant="h6" fontSize="20px">
                  From
                </Typography>
                <ConnectToBank />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontSize="20px">
                  To
                </Typography>
                <Typography variant="h6" height="48px" lineHeight="48px">
                  {`Your Detrove Account ${convertToDisplayPrice(
                    user.balance
                  )}`}
                </Typography>
              </Box>
              <TransferMoneyButton />
            </Box>
          }
        />
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          marginTop: { xs: "12px", md: 0 },
        }}
      >
        <Typography variant="h6" fontSize="24px" marginBottom="12px">
          Withdraw Money
        </Typography>
        <Box
          sx={{
            ...theme.basicButton,
            height: "48px",
            backgroundColor: theme.palette.accent.dark,
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.accent.hover,
            },
            cursor: "pointer",
          }}
          onClick={() =>
            window.open("https://forms.gle/RrusNzY4KtSSJf8Y8", "_blank")
          }
        >
          <Typography variant="h6">Continue Withdraw Process</Typography>
        </Box>
      </Box>
      {/* <Box
        sx={{
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Typography variant="h6" fontSize="30px" marginBottom="12px">
          Cash: ${user.balance}
        </Typography>
        <Typography variant="h6" fontSize="24px" marginBottom="16px">
          Transaction History
        </Typography>
        <Divider sx={{ margin: "16px 0" }} />
        <TransactionInfo
          typeOfTransaction="Placeholder Transaction"
          amount={0.0}
          isWithdraw={true}
          date={"Jan 1, 2023"}
        />
        <Divider sx={{ margin: "16px 0" }} />
        <TransactionInfo
          typeOfTransaction="Placeholder Transaction"
          amount={0.0}
          isWithdraw={false}
          date={"Jan 1, 2023"}
        />
        <Divider sx={{ margin: "16px 0" }} />
      </Box> */}
    </Box>
  );
}
