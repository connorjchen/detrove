export const requestHelper = async (dispatch, requestName, request) => {
  dispatch(requestStarted(requestName));

  try {
    const result = await request();
    dispatch(requestFinished(requestName));
    return result;
  } catch (error) {
    const errorMessage = error.response?.data?.message ?? error.message;
    dispatch(requestFailed({ requestName, error: errorMessage }));
    return Promise.reject(errorMessage);
  }
};

export const REQUEST_STARTED = "REQUEST_STARTED";
export const REQUEST_FINISHED = "REQUEST_FINISHED";
export const REQUEST_FAILED = "REQUEST_FAILED";

export const requestStarted = (requestName) => ({
  type: REQUEST_STARTED,
  payload: {
    request: {
      name: requestName,
      inProgress: true,
    },
  },
});

export const requestFinished = (requestName) => ({
  type: REQUEST_FINISHED,
  payload: {
    request: {
      name: requestName,
      inProgress: false,
    },
  },
});

export const requestFailed = ({ requestName, error }) => ({
  type: REQUEST_FAILED,
  payload: {
    request: {
      name: requestName,
      inProgress: false,
      error,
    },
  },
});
