import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/buy`;

export const getSneaker = (sneakerId) => async (dispatch) => {
  return await requestHelper(dispatch, RequestsEnum.buyGetSneaker, async () => {
    const { data } = await Axios.get(`${baseUrl}/sneaker/${sneakerId}`);
    dispatch({
      type: RequestsEnum.buyGetSneaker,
      payload: data.result,
    });
  });
};

export const getListings = (sneakerId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.buyGetListings,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/listings/${sneakerId}`);
      dispatch({
        type: RequestsEnum.buyGetListings,
        payload: data.result,
      });
    }
  );
};

export const purchaseListing = (listingId, buyerId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.buyPurchaseListing,
    async () => {
      await Axios.patch(`${baseUrl}/purchase/${listingId}`, {
        buyerId,
      });
      return { result: "success" };
    }
  );
};
