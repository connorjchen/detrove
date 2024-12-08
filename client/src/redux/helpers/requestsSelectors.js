// Extract request field from state
const requestState = (state) => state.requests;

const namedRequestsInProgress = (state, requestNames) => {
  const singleNamedRequestInProgress = (singleRequestName) =>
    requestState(state).requests.find(
      (request) => request.name === singleRequestName && request.inProgress
    ) !== undefined;

  return requestNames.some(singleNamedRequestInProgress);
};

const namedRequestsError = (state, requestNames) => {
  const singleNamedRequestError = (singleRequestName) =>
    requestState(state).requests.find(
      (request) => request.name === singleRequestName && request.error !== null
    )?.error;

  const errors = requestNames
    .map(singleNamedRequestError)
    .filter((error) => error !== undefined);
  return errors.length > 0 ? errors : undefined;
};

export const getLoadingAndErrors = (state, requestNames) => {
  const isLoading = namedRequestsInProgress(state, requestNames);
  const errors = namedRequestsError(state, requestNames);
  return { isLoading, errors };
};
