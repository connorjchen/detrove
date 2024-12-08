import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  bankAccount: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.transferMoneyGetBankAccount:
      return {
        ...state,
        bankAccount: action.payload,
      };
    case RequestsEnum.transferMoneyInitiatePlaid:
      return {
        ...state,
        bankAccount: action.payload,
      };
    default:
      return state;
  }
};
