import { all, fork } from "redux-saga/effects";

import authWatcher from "./ducks/auth/sagas";

export default function* rootSaga() {
  yield all([fork(authWatcher)]);
}
