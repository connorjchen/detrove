import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/admin`;

export const getWaitlist = () => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.adminGetWaitlist,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/waitlist`);
      dispatch({
        type: RequestsEnum.adminGetWaitlist,
        payload: data.result,
      });
    }
  );
};

export const addSneaker =
  (
    brand,
    name,
    gender,
    styleCode,
    retailPrice,
    releaseDate,
    colorway,
    description,
    valueProposition
  ) =>
  async (dispatch) => {
    return await requestHelper(
      dispatch,
      RequestsEnum.adminAddSneaker,
      async () => {
        await Axios.post(`${baseUrl}/sneaker`, {
          brand,
          name,
          gender,
          styleCode,
          retailPrice,
          releaseDate,
          colorway,
          description,
          branch: `${process.env.REACT_APP_BRANCH} ${valueProposition}`,
        });
      }
    );
  };

export const addItem = (sneakerId, size, ownerId) => async (dispatch) => {
  return await requestHelper(dispatch, RequestsEnum.adminAddItem, async () => {
    await Axios.post(`${baseUrl}/item`, {
      sneakerId,
      size,
      ownerId,
    });
  });
};
