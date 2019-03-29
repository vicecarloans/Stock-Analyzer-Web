import { all, fork } from "redux-saga/effects";

import authWatcher from "./ducks/auth/sagas";
import newsSagaWatcher from "./ducks/news/sagas";
import { streamSagaWatcher, apiSagaWatcher } from "./ducks/stream/sagas";
import companySagaWatcher from "./ducks/company/sagas";
export default function* rootSaga() {
  yield all([fork(authWatcher)]);
  yield all([fork(newsSagaWatcher)]);
  yield all([fork(streamSagaWatcher)]);
  yield all([fork(apiSagaWatcher)]);
  yield all([fork(companySagaWatcher)]);
}
