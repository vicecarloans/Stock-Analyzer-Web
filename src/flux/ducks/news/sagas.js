import { takeLatest, put, call, select } from "redux-saga/effects";
import { BASE_URL, TOKEN_API, GET_NEWS } from "constants/iextrading";
import { STOCKS } from "constants/portfolio/stocks";
import Axios from "axios";
import {
  fetchMixedNewsFailed,
  FETCH_MIXED_NEWS,
  fetchMixedNewsSuccess,
  filterNewsByStockFailed,
  filterNewsByStockSuccess,
  FILTER_NEWS_BY_STOCK,
  ADD_NEWS_FILTER,
  CLEAR_FILTER
} from "./actions";
import { newsSymbolsSelector } from "./selectors";

export function* fetchMixedNewsSaga() {
  try {
    const { data } = yield call(
      Axios.get,
      `${BASE_URL}${GET_NEWS}/last/1?token=${TOKEN_API}&symbols=${STOCKS.join(
        ","
      )}`
    );
    let res = [];
    for (let news of data) {
      for (let n of news) {
        res.push(n);
      }
    }
    yield put(fetchMixedNewsSuccess(res));
    // yield put(fetchMixedNewsFailed());
  } catch (err) {
    yield put(fetchMixedNewsFailed(err));
  }
}

export function* fetchFilteredNewsSaga() {
  try {
    const symbols = yield select(newsSymbolsSelector);
    if (symbols.length > 0) {
      const total = Math.floor(50 / symbols.length);
      const { data } = yield call(
        Axios.get,
        `${BASE_URL}${GET_NEWS}/last/${total}?token=${TOKEN_API}&symbols=${symbols.join(
          ","
        )}`
      );

      let res = [];
      for (let news of data) {
        for (let n of news) {
          res.push(n);
        }
      }
      yield put(filterNewsByStockSuccess(res));
    }
    throw new Error(filterNewsByStockFailed("No symbols "));
  } catch (err) {
    yield put(filterNewsByStockFailed(err));
  }
}

export default function* newsSagaWatcher() {
  yield takeLatest(FETCH_MIXED_NEWS, fetchMixedNewsSaga);
  yield takeLatest(ADD_NEWS_FILTER, fetchFilteredNewsSaga);
}
