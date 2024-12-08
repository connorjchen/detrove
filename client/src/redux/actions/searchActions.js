import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/search`;

export const getSneakers = () => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.searchGetSneakers,
    async () => {
      const { data } = await Axios.get(`${baseUrl}/sneakers`);
      dispatch({
        type: RequestsEnum.searchGetSneakers,
        payload: data.result,
      });
    }
  );
};
