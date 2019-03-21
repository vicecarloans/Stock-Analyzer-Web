import { all, fork } from "redux-saga/effects";

import authWatcher from "./ducks/auth/sagas";
import newsSagaWatcher from "./ducks/news/sagas";

export default function* rootSaga() {
  yield all([fork(authWatcher)]);
  yield all([fork(newsSagaWatcher)]);
}
