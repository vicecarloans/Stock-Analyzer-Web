import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  REGISTER_USER,
  registerUserFailed,
  registerUserSuccess
} from "./actions";
import { tokenSelector } from "./selectors";
import {
  API_BASE_PATH,
  USER_REGISTER_ENDPOINT,
  REQUEST_HEADERS
} from "constants/api";
import Axios from "axios";

export function* registerUserSaga({ payload }) {
  try {
    const token = yield select(tokenSelector);
    if (!token) throw new Error("User payment hasn't been registered");
    const user = { ...payload.user, source: token };
    const res = yield call(
      Axios.post,
      `${API_BASE_PATH}${USER_REGISTER_ENDPOINT}`,
      JSON.stringify(user),
      REQUEST_HEADERS
    );
    yield put(registerUserSuccess(res));
  } catch (err) {
    yield put(registerUserFailed(err));
  }
}

export default function* authSagaWatcher() {
  yield takeLatest(REGISTER_USER, registerUserSaga);
}
