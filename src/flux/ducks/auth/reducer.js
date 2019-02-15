import { combineReducers } from "redux";
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  FETCH_USER,
  REGISTER_USER_FAILED,
  REGISTER_PAYMENT,
  NEXT_STEP,
  PREVIOUS_STEP,
  PICK_PLAN,
  OPEN_PAYMENT_MODAL,
  CLOSE_PAYMENT_MODAL,
  REGISTER_PAYMENT_FAILED,
  REGISTER_DONE,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  DISMISS_LOGIN_ERROR,
  SIGN_OUT,
  UPLOAD_IMAGE_URL,
  UPLOAD_IMAGE_URL_SUCCESS,
  UPLOAD_IMAGE_URL_FAILED,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILED,
  DISMISS_UPDATE_NOTIFICATION
} from "./actions";

const initialState = {
  user: null,
  err: "",
  loading: false,
  success: false
};

const account = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false };
    case LOGIN_FAILED:
      return { ...state, loading: false, err: payload.err };
    case FETCH_USER:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, user: payload.user, loading: false };
    case FETCH_USER_FAILED:
      return {
        ...initialState,
        err: payload.err,
        loading: false,
        user: null
      };
    case DISMISS_LOGIN_ERROR:
      return { ...state, err: "" };
    case UPLOAD_IMAGE_URL:
      return { ...state, loading: true };
    case UPLOAD_IMAGE_URL_SUCCESS:
      return {
        ...state,
        user: { ...state.user, picture: payload.picture },
        loading: false
      };
    case UPLOAD_IMAGE_URL_FAILED:
      return { ...state, err: payload.err, loading: false };
    case UPDATE_USER_DATA:
      return { ...state, loading: true };
    case UPDATE_USER_DATA_SUCCESS:
      return { ...state, success: true, loading: false };
    case UPDATE_USER_DATA_FAILED:
      return { ...state, loading: false, err: payload.err };
    case SIGN_OUT:
      return initialState;
    case DISMISS_UPDATE_NOTIFICATION:
      return { ...state, success: false };

    default:
      return state;
  }
};

const registerInitialState = {
  plan: null,
  loading: false,
  err: "",
  token: ""
};

const registerRequest = (state = registerInitialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return { ...state, loading: true };

    case REGISTER_USER_FAILED:
      return { ...state, err: payload.err, loading: false };

    case REGISTER_PAYMENT:
      return { ...state, token: payload.token };

    case REGISTER_PAYMENT_FAILED:
      return { ...state, err: payload.err };
    case PICK_PLAN:
      return { ...state, plan: payload.plan };

    case REGISTER_DONE:
      return registerInitialState;
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
    case REGISTER_DONE:
      return 1;
    default:
      return state;
  }
};

const initialModal = {
  payment: false
};

const modal = (state = initialModal, { type, payload }) => {
  switch (type) {
    case OPEN_PAYMENT_MODAL:
      return { ...state, payment: true };
    case CLOSE_PAYMENT_MODAL:
      return { ...state, payment: false };
    default:
      return state;
  }
};

export default combineReducers({
  account,
  step,
  registerRequest,
  modal
});
