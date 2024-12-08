import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  waitlist: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.adminGetWaitlist:
      return {
        ...state,
        waitlist: action.payload,
      };
    default:
      return state;
  }
};
