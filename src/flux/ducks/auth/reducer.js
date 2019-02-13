import { combineReducers } from "redux";
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_PAYMENT,
  NEXT_STEP,
  PREVIOUS_STEP
} from "./actions";

const initialState = {
  loading: false,
  user: {},
  token: "",
  err: ""
};

const account = (state = initialState, { type, payload }) => {
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

const step = (state = 1, { type, payload }) => {
  switch (type) {
    case NEXT_STEP:
      const next = state < 4 && state + 1;
      return next || state;
    case PREVIOUS_STEP:
      const prev = state > 1 && state - 1;
      return prev || state;
    default:
      return state;
  }
};

export default combineReducers({
  account,
  step
});
