import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  API_BASE_PATH,
  USER_REGISTER_ENDPOINT,
  REQUEST_HEADERS,
  USER_PROFILE_ENDPOINT,
  REQUEST_HEADERS_AUTH,
  REQUEST_HEADERS_AUTH_MANUAL_COOKIE,
  USER_LOGIN_ENDPOINT
} from "constants/api";
import Axios from "axios";
import { getFormValues, destroy } from "redux-form";
import {
  REGISTER_USER,
  registerUserFailed,
  registerUserSuccess,
  goToNextStep,
  FETCH_USER,
  fetchUserFailed,
  fetchUserSuccess,
  LOGIN,
  loginFailed,
  loginSuccess
} from "./actions";
import { tokenSelector, planSelector } from "./selectors";

export function* registerUserSaga() {
  try {
    const token = yield select(tokenSelector);
    const user = yield select(getFormValues("register"));

    const plan = yield select(planSelector);

    const body = {
      ...user,
      source: token,
      plan,
      username: user.email
    };
    if (!token) throw new Error("User payment hasn't been registered");

    const res = yield call(
      Axios.post,
      `${API_BASE_PATH}${USER_REGISTER_ENDPOINT}`,
      JSON.stringify(body),
      REQUEST_HEADERS
    );
    yield put(registerUserSuccess(res));
    yield put(goToNextStep());
    yield put(destroy("register"));
  } catch (err) {
    yield put(registerUserFailed(err));
  }
}

export function* loginUserSaga() {
  try {
    const user = yield select(getFormValues("login"));

    const body = { usernameOrEmail: user.email, password: user.password };

    const res = yield call(
      Axios.post,
      `${USER_LOGIN_ENDPOINT}`,
      JSON.stringify(body),
      REQUEST_HEADERS_AUTH
    );

    yield put(loginSuccess(res));
  } catch (err) {
    yield put(loginFailed(err));
  }
}

export function* fetchUserSaga({ payload: { cookie } }) {
  try {
    const res = yield call(
      Axios.get,
      `${API_BASE_PATH}${USER_PROFILE_ENDPOINT}`,
      cookie ? REQUEST_HEADERS_AUTH_MANUAL_COOKIE(cookie) : REQUEST_HEADERS_AUTH
    );
    yield put(fetchUserSuccess(res));
  } catch (err) {
    yield put(fetchUserFailed());
  }
}

export default function* authSagaWatcher() {
  yield takeLatest(REGISTER_USER, registerUserSaga);
  yield takeLatest(FETCH_USER, fetchUserSaga);
  yield takeLatest(LOGIN, loginUserSaga);
}
