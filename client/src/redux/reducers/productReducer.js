import { defaultSneaker } from "../constants";
import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  sneaker: defaultSneaker,
  listings: [],
  isWatchlistItem: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.productGetSneaker:
      return {
        ...state,
        sneaker: action.payload,
      };

    case RequestsEnum.productGetListings:
      return {
        ...state,
        listings: action.payload,
      };
    case RequestsEnum.productGetIsWatchlistItem:
    case RequestsEnum.productCreateWatchlistItem:
    case RequestsEnum.productDeleteWatchlistItem:
      return {
        ...state,
        isWatchlistItem: action.payload,
      };
    default:
      return state;
  }
};
