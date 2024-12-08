import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/product`;

export const getSneaker = (sneakerId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.productGetSneaker,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/sneaker/${sneakerId}`);
      dispatch({
        type: RequestsEnum.productGetSneaker,
        payload: data.result,
      });
    }
  );
};

export const getListings = (sneakerId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.productGetListings,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/listings/${sneakerId}`);
      dispatch({
        type: RequestsEnum.productGetListings,
        payload: data.result,
      });
    }
  );
};

export const getIsWatchlistItem = (userId, sneakerId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.productGetIsWatchlistItem,
    async () => {
      const { data } = await Axios.get(
        `${baseUrl}/watchlist/${userId}/${sneakerId}`
      );
      dispatch({
        type: RequestsEnum.productGetIsWatchlistItem,
        payload: data.result,
      });
    }
  );
};

export const createWatchlistItem = (userId, sneakerId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.productCreateWatchlistItem,
    async () => {
      await Axios.post(`${baseUrl}/watchlist`, {
        userId,
        sneakerId,
      });
      dispatch({
        type: RequestsEnum.productCreateWatchlistItem,
        payload: true,
      });
    }
  );
};

export const deleteWatchlistItem = (userId, sneakerId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.productDeleteWatchlistItem,
    async () => {
      await Axios.patch(`${baseUrl}/watchlist/${userId}/${sneakerId}`);
      dispatch({
        type: RequestsEnum.productDeleteWatchlistItem,
        payload: false,
      });
    }
  );
};
