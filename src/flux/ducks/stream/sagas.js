import {
  take,
  put,
  race,
  call,
  cancelled,
  delay,
  takeLatest,
  fork,
  select
} from "redux-saga/effects";
import {
  connectQuoteStream,
  createQuoteStreamChannel,
  disconnectQuoteStream
} from "./events/stock";
import {
  START_QUOTE_CHANNEL,
  turnQuoteChannelOn,
  turnQuoteChannelOff,
  STOP_QUOTE_CHANNEL,
  QUOTE_CHANNEL_OFF,
  updateStockData,
  turnQuoteServerOff,
  initStockDataIntradayFailed,
  initStockDataIntradaySuccess,
  INIT_STOCK_LAST,
  initStockLastFailed,
  initStockLastSuccess,
  updateCancellationToken,
  INIT_STOCK_DATA_INTRADAY,
  INIT_STOCK_DATA_RANGE,
  initStockDataRangeFailed,
  initStockDataRangeSuccess
} from "./actions";
import {
  TOKEN_API,
  getIntradayDataByStock,
  getStockDataByRange,
  BASE_URL,
  LAST_ENDPOINT
} from "constants/iextrading";
import { timeParse } from "d3-time-format";
import {
  chartDataSelector,
  cancellationTokenChartSelector,
  selectedStockSelector
} from "./selectors";

import Axios from "axios";

function* listenDisconnectQuoteStreamSaga() {
  while (true) {
    const {
      payload: { stock }
    } = yield take(QUOTE_CHANNEL_OFF);
    const cancellationToken = yield select(cancellationTokenChartSelector);
    yield call(disconnectQuoteStream, cancellationToken);
    yield put(turnQuoteServerOff());
    yield put(turnQuoteChannelOff());
  }
}

function* listenToQuoteStreamSaga(stock) {
  try {
    yield put(turnQuoteChannelOn());

    yield fork(listenDisconnectQuoteStreamSaga);

    const quoteStreamChannel = yield call(createQuoteStreamChannel, stock);

    yield takeLatest(quoteStreamChannel, handleUpdateStockDataSaga);
  } catch (err) {
    console.warn(err);
  } finally {
    if (yield cancelled()) {
      yield put(turnQuoteChannelOff(stock));
    }
  }
}

function* handleUpdateStockDataSaga({ data, cancellationToken }) {
  const chunk = yield select(chartDataSelector);

  const prevCancellationToken = yield select(cancellationTokenChartSelector);
  if (prevCancellationToken != cancellationToken) {
    yield put(updateCancellationToken(cancellationToken));
  }
  if (chunk.length < data.length) {
    const updated = data.slice(chunk.length);
    let processed = [];
    for (let d of updated) {
      const unix = timeParse("%Y%m%d%H:%M");
      processed.push({
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
        volume: d.volume,
        date: new Date(unix(d.date + d.minute))
      });
    }
    yield put(updateStockData(processed));
  }
}

function* handleInitStockDataIntradaySaga({ payload }) {
  try {
    const { data } = yield call(
      Axios.get,
      `${BASE_URL}${getIntradayDataByStock(payload)}?token=${TOKEN_API}`
    );
    //Check if data is 1d
    let processed = [];
    if (data[0].minute) {
      for (let d of data) {
        const unix = timeParse("%Y%m%d%H:%M");
        processed.push({
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
          volume: d.volume,
          date: new Date(unix(d.date + d.minute))
        });
      }
    }

    yield put(initStockDataIntradaySuccess(processed));
  } catch (err) {
    yield put(initStockDataIntradayFailed(err));
  }
}

function* handleInitLastDataSaga({ payload: { stocks } }) {
  try {
    const { data } = yield call(
      Axios.get,
      `${BASE_URL}${LAST_ENDPOINT}?token=${TOKEN_API}&symbols=${stocks.join(
        ","
      )}`
    );
    let processed = [];

    for (let d of data) {
      processed.push({
        ...d,
        lastSalePrice: d.lastSalePrice && d.lastSalePrice.toFixed(2)
      });
    }
    yield put(initStockLastSuccess(processed));
  } catch (err) {
    yield put(initStockLastFailed(err));
  }
}
function* handleInitStockDataRangeSaga({ payload: { range } }) {
  try {
    const selectedStock = yield select(selectedStockSelector);
    const { data } = yield call(
      Axios.get,
      `${BASE_URL}${getStockDataByRange({
        stock: selectedStock,
        range
      })}?token=${TOKEN_API}`
    );
    let processed = [];
    for (let d of data) {
      const unix = timeParse("%Y-%m-%d");
      processed.push({
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
        volume: d.volume,
        date: new Date(unix(d.date))
      });
    }
    yield put(initStockDataRangeSuccess(processed));
  } catch (err) {
    yield put(initStockDataRangeFailed(err));
  }
}

export function* streamSagaWatcher() {
  while (true) {
    const { payload } = yield take(START_QUOTE_CHANNEL);
    yield race({
      task: call(listenToQuoteStreamSaga, payload.stock),
      cancel: take(STOP_QUOTE_CHANNEL)
    });
  }
}

export function* apiSagaWatcher() {
  yield takeLatest(INIT_STOCK_DATA_INTRADAY, handleInitStockDataIntradaySaga);
  yield takeLatest(INIT_STOCK_LAST, handleInitLastDataSaga);
  yield takeLatest(INIT_STOCK_DATA_RANGE, handleInitStockDataRangeSaga);
}
