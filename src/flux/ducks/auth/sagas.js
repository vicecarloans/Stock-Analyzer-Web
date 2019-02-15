import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  API_BASE_PATH,
  USER_REGISTER_ENDPOINT,
  REQUEST_HEADERS,
  USER_PROFILE_ENDPOINT,
  REQUEST_HEADERS_AUTH,
  REQUEST_HEADERS_AUTH_MANUAL_COOKIE,
  USER_EDIT_PICTURE_ENDPOINT,
  USER_EDIT_ENDPOINT,
  USER_LOGIN_ENDPOINT
} from "constants/api";
import Axios from "axios";
import { getFormValues, destroy, reset } from "redux-form";
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
  loginSuccess,
  UPLOAD_IMAGE_URL,
  uploadImageUrlFailed,
  uploadImageUrlSuccess,
  UPDATE_USER_DATA,
  updateUserDataFailed,
  updateUserDataSuccess,
  fetchUser
} from "./actions";
import { tokenSelector, planSelector } from "./selectors";
import { Router } from "server/routes";

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

    Router.replaceRoute("/dashboard");
  } catch (err) {
    yield put(loginFailed(err));
  }
}

export function* fetchUserSaga() {
  try {
    const { data } = yield call(
      Axios.get,
      `${USER_PROFILE_ENDPOINT}`,
      REQUEST_HEADERS_AUTH
    );
    yield put(fetchUserSuccess(data));
  } catch (err) {
    yield put(fetchUserFailed());
  }
}

export function* uploadImageSaga({ payload }) {
  try {
    const { url } = payload;
    let formData = new FormData();
    formData.append("picture", url);
    const {
      data: { data, picture }
    } = yield call(Axios.put, `${USER_EDIT_PICTURE_ENDPOINT}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    });
    yield put(uploadImageUrlSuccess(picture));
  } catch (err) {
    yield put(uploadImageUrlFailed(err));
  }
}

export function* updateUserSaga() {
  try {
    const { name, title, address } = yield select(getFormValues("profile"));
    const body = { name, title, address };

    yield call(
      Axios.put,
      USER_EDIT_ENDPOINT,
      JSON.stringify(body),
      REQUEST_HEADERS_AUTH
    );

    yield put(fetchUser());
    yield put(updateUserDataSuccess());
    yield put(destroy("profile"));
  } catch (err) {
    yield put(updateUserDataFailed(err.message));
  }
}

export default function* authSagaWatcher() {
  yield takeLatest(REGISTER_USER, registerUserSaga);
  yield takeLatest(FETCH_USER, fetchUserSaga);
  yield takeLatest(LOGIN, loginUserSaga);
  yield takeLatest(UPLOAD_IMAGE_URL, uploadImageSaga);
  yield takeLatest(UPDATE_USER_DATA, updateUserSaga);
}
