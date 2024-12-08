import { RequestsEnum } from "../helpers/requestsEnum";

const initialState = {
  sneakers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RequestsEnum.searchGetSneakers:
      return {
        ...state,
        sneakers: action.payload,
      };
    default:
      return state;
  }
};
