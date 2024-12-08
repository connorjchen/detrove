import {
  REQUEST_STARTED,
  REQUEST_FINISHED,
  REQUEST_FAILED,
} from "./requestsHelpers";

const initialState = {
  requests: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STARTED: {
      const existingCall = state.requests.find(
        (request) => request.requestName === action.payload.request.name
      );

      if (existingCall) {
        return {
          ...state,
          requests: state.requests.map((request) =>
            request.name === action.payload.request.name
              ? { ...request, inProgress: true, error: null }
              : request
          ),
        };
      }
      return {
        ...state,
        requests: [...state.requests, action.payload.request],
      };
    }
    case REQUEST_FINISHED: {
      return {
        ...state,
        requests: state.requests.filter(
          (request) => request.name !== action.payload.request.name
        ),
      };
    }
    case REQUEST_FAILED: {
      return {
        ...state,
        requests: state.requests.map((request) =>
          request.name === action.payload.request.name
            ? {
                ...request,
                error: action.payload.request.error,
                inProgress: false,
              }
            : request
        ),
      };
    }
    default: {
      return state;
    }
  }
};
