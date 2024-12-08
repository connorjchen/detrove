import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  user: null,
  items: [],
  activeListings: [],
  watchlist: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.profileGetUser:
    case RequestsEnum.profileCreateUser:
      return {
        ...state,
        user: action.payload,
      };
    case RequestsEnum.profileGetItems:
      return {
        ...state,
        items: action.payload,
      };
    case RequestsEnum.profileGetActiveListings:
      return {
        ...state,
        activeListings: action.payload,
      };
    case RequestsEnum.profileGetWatchlist:
      return {
        ...state,
        watchlist: action.payload,
      };
    default:
      return state;
  }
};
