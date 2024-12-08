import { defaultSneaker } from "../constants";
import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  sneaker: defaultSneaker,
  listings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.buyGetSneaker:
      return {
        ...state,
        sneaker: action.payload,
      };

    case RequestsEnum.buyGetListings:
      return {
        ...state,
        listings: action.payload,
      };
    default:
      return state;
  }
};
