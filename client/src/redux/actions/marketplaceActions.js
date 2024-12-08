import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/marketplace`;

export const getListings = () => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.marketplaceGetListings,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/listings`);
      dispatch({
        type: RequestsEnum.marketplaceGetListings,
        payload: data.result,
      });
    }
  );
};
