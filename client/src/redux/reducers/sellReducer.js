import { defaultSneaker } from "../constants";
import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  sneaker: defaultSneaker,
  unlistedItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.sellGetSneaker:
      return {
        ...state,
        sneaker: action.payload,
      };

    case RequestsEnum.sellGetUnlistedItems:
      return {
        ...state,
        unlistedItems: action.payload,
      };
    default:
      return state;
  }
};
