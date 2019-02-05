import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_PAYMENT
} from "./actions";
const initialState = {
  loading: false,
  user: {},
  token: "",
  err: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return { ...state, loading: payload.loading };

    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false };

    case REGISTER_USER_FAILED:
      return { ...state, err: payload.err, loading: false };

    case REGISTER_PAYMENT:
      return { ...state, token: payload.token };
    default:
      return state;
  }
};
