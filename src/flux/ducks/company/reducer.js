import {
  GET_COMPANY_DATA,
  GET_COMPANY_DATA_SUCCESS,
  GET_COMPANY_DATA_FAILED
} from "./actions";

const initialState = {
  loading: false,
  data: {},
  err: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COMPANY_DATA:
      return { ...state, loading: true };
    case GET_COMPANY_DATA_SUCCESS:
      return { ...state, loading: false, data: payload.data };
    case GET_COMPANY_DATA_FAILED:
      return { ...state, loading: false, err: payload.err };
    default:
      return state;
  }
};
