import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/listing`;

export const getListing = (listingId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.listingGetListing,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/listing/${listingId}`);
      dispatch({
        type: RequestsEnum.listingGetListing,
        payload: data.result,
      });
    }
  );
};

export const updateListing =
  (listingId, price, isDeleted) => async (dispatch) => {
    return await requestHelper(
      dispatch,
      RequestsEnum.listingUpdateListing,
      async () => {
        await Axios.patch(`${baseUrl}/listing/${listingId}`, {
          price,
          isDeleted,
        });
        return { result: "success" };
      }
    );
  };
