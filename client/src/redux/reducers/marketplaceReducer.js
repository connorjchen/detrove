import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  listings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.marketplaceGetListings:
      return {
        ...state,
        listings: action.payload,
      };
    default:
      return state;
  }
};
