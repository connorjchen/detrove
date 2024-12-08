import Axios from "axios";
import { apiBaseUrl } from "../constants";
import { requestHelper } from "../helpers/requestsHelpers";
import { RequestsEnum } from "../helpers/requestsEnum";

const baseUrl = `${apiBaseUrl}/landing`;

export const addEmail = (email, valueProposition) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.landingAddEmail,
    async () => {
      await Axios.post(`${baseUrl}/email`, {
        email,
        branch: `${process.env.REACT_APP_BRANCH} ${valueProposition}`,
      });
    }
  );
};

export const addPageView = (page, valueProposition) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    RequestsEnum.landingAddPageView,
    async () => {
      await Axios.post(`${baseUrl}/pageview`, {
        page,
        branch: `${process.env.REACT_APP_BRANCH} ${valueProposition}`,
      });
    }
  );
};
