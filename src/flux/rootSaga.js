import { all, fork } from "redux-saga/effects";

import authSagaWatcher from "./ducks/auth/sagas.js";

export default function* rootSaga() {
  yield all([fork(authSagaWatcher)]);
}
