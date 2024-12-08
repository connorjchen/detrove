import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/profile`;

export const getUser = (userEmail) => async (dispatch) => {
  if (!userEmail) {
    return await requestHelper(
      dispatch,
      RequestsEnum.profileGetUser,
      async () => {
        dispatch({
          type: RequestsEnum.profileGetUser,
          payload: null,
        });
      }
    );
  } else {
    return await requestHelper(
      dispatch,
      RequestsEnum.profileGetUser,
      async () => {
        const { data } = await Axios.get(`${baseUrl}/user/${userEmail}`);
        if (data.result === null) {
          return false;
        } else {
          dispatch({
            type: RequestsEnum.profileGetUser,
            payload: data.result,
          });
          return true;
        }
      }
    );
  }
};

export const createUser =
  (userEmail, firstName, lastName, referrerCode) => async (dispatch) => {
    return await requestHelper(
      dispatch,
      RequestsEnum.profileCreateUser,
      async () => {
        const { data } = await Axios.post(`${baseUrl}/user/${userEmail}`, {
          firstName,
          lastName,
          referrerCode,
        });
        dispatch({
          type: RequestsEnum.profileCreateUser,
          payload: data.result,
        });
      }
    );
  };

export const getItems = (userId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.profileGetItems,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/items/${userId}`);
      dispatch({
        type: RequestsEnum.profileGetItems,
        payload: data.result,
      });
    }
  );
};

export const getActiveListings = (userId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.profileGetActiveListings,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/active/listings/${userId}`);
      dispatch({
        type: RequestsEnum.profileGetActiveListings,
        payload: data.result,
      });
    }
  );
};

export const getWatchlist = (userId) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.profileGetWatchlist,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/watchlist/${userId}`);
      dispatch({
        type: RequestsEnum.profileGetWatchlist,
        payload: data.result,
      });
    }
  );
};
