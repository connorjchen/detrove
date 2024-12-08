import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/sell`;

export const getSneaker = (sneakerId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.sellGetSneaker,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/sneaker/${sneakerId}`);
      dispatch({
        type: RequestsEnum.sellGetSneaker,
        payload: data.result,
      });
    }
  );
};

export const getUnlistedItems = (userId, sneakerId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.sellGetUnlistedItems,
    async () => {
      const { data } = await Axios.get(
        `${baseUrl}/unlisted/items/${userId}/${sneakerId}`
      );
      dispatch({
        type: RequestsEnum.sellGetUnlistedItems,
        payload: data.result,
      });
    }
  );
};

export const createListing = (itemId, sellerId, price) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.sellCreateListing,
    async () => {
      await Axios.post(`${baseUrl}/listing`, {
        itemId,
        sellerId,
        price,
      });
      return { result: "success" };
    }
  );
};
