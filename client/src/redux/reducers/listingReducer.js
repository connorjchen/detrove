import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  listing: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.listingGetListing:
      return {
        ...state,
        listing: action.payload,
      };
    default:
      return state;
  }
};
