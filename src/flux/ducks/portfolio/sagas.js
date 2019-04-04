import { takeLatest, put, call, select } from "redux-saga/effects";
import {
  FETCH_PORTFOLIO_PERFORMANCE,
  fetchPortfolioPerformanceFailed,
  fetchPortfolioPerformanceSuccess,
  fetchPortfolioChartFailed,
  FETCH_PORTFOLIO_CHART,
  fetchPortfolioChartSuccess,
  fetchPortfolioBreakdownFailed,
  fetchPortfolioBreakdownSuccess,
  FETCH_PORTFOLIO_BREAKDOWN,
  FETCH_HOLDINGS,
  fetchHoldingsFailed,
  fetchHoldingsSuccess,
  deleteStocksSuccess,
  deleteStocksFailed,
  BUY_STOCK,
  DELETE_STOCKS,
  SELL_STOCKS,
  buyStockFailed,
  buyStockSuccess,
  fetchPortfolioPerformance,
  fetchPortfolioBreakdown,
  fetchPortfolioChart,
  fetchHoldings,
  fetchTableDataFailed,
  fetchTableDataSuccess,
  FETCH_TABLE_DATA,
  fetchTableData,
  sellStocksFailed,
  sellStocksSuccess
} from "./actions";

import Axios from "axios";
import {
  STOCK_PERFORMANCE_ENDPOINT,
  STOCK_HOLDINGS_ENDPOINT,
  STOCK_CHART_ENDPOINT,
  BUY_STOCK_ENDPOINT,
  SELL_STOCK_ENDPOINT,
  DELETE_STOCK_ENDPOINT,
  STOCK_BREAKDOWNS_ENDPOINT,
  REQUEST_HEADERS_AUTH,
  STOCK_TABLE_DATA_ENDPOINT
} from "constants/api";
import { OHLC_ENDPOINT, TOKEN_STREAM, BASE_URL } from "constants/iextrading";

import { destroy } from "redux-form";

import { timeParse } from "d3-time-format";

function* handlePortfolioPerformanceSaga() {
  try {
    const { data } = yield call(
      Axios.get,
      STOCK_PERFORMANCE_ENDPOINT,
      REQUEST_HEADERS_AUTH
    );
    yield put(fetchPortfolioPerformanceSuccess(data));
  } catch ({ error }) {
    yield put(fetchPortfolioPerformanceFailed(error));
  }
}

function* handlePortfolioChartSaga() {
  try {
    const { data } = yield call(
      Axios.get,
      STOCK_CHART_ENDPOINT,
      REQUEST_HEADERS_AUTH
    );

    const unix = timeParse("%Y-%m-%d");

    let formatted = [];
    for (let chart of data.portfolioValue) {
      formatted.push({
        value: chart.value,
        date: new Date(unix(chart.date))
      });
    }
    yield put(
      fetchPortfolioChartSuccess({
        performance: data.performance,
        portfolioValue: formatted
      })
    );
  } catch ({ error }) {
    yield put(fetchPortfolioChartFailed(error));
  }
}

function* handlePortfolioBreakdownSaga() {
  try {
    const { data } = yield call(
      Axios.get,
      STOCK_BREAKDOWNS_ENDPOINT,
      REQUEST_HEADERS_AUTH
    );
    yield put(fetchPortfolioBreakdownSuccess(data));
  } catch ({ error }) {
    yield put(fetchPortfolioBreakdownFailed(error));
  }
}

function* handlePortfolioHoldingsSaga() {
  try {
    const { data } = yield call(
      Axios.get,
      STOCK_HOLDINGS_ENDPOINT,
      REQUEST_HEADERS_AUTH
    );

    yield put(fetchHoldingsSuccess(data));
  } catch ({ error }) {
    yield put(fetchHoldingsFailed(error));
  }
}

function* handleDeleteStockSaga({ payload: { stocks } }) {
  try {
    yield call(Axios.delete, DELETE_STOCK_ENDPOINT, {
      data: stocks,
      withCredentials: true
    });
    yield put(fetchPortfolioPerformance());
    yield put(fetchPortfolioChart());
    yield put(fetchPortfolioBreakdown());
    yield put(fetchHoldings());
    yield put(fetchTableData());
    yield put(deleteStocksSuccess());
  } catch ({ error }) {
    yield put(deleteStocksFailed(error));
  }
}
function* handleBuyStockSaga({
  payload: {
    data: { amount, price, stockname }
  }
}) {
  try {
    const { data: response } = yield call(
      Axios.post,
      BUY_STOCK_ENDPOINT,
      {
        name: stockname,
        price,
        date: Date.now() / 1000,
        quantity: amount
      },
      REQUEST_HEADERS_AUTH
    );

    yield put(fetchPortfolioPerformance());
    yield put(fetchPortfolioChart());
    yield put(fetchPortfolioBreakdown());
    yield put(fetchHoldings());
    yield put(fetchTableData());
    yield put(destroy("add-stock"));
    yield put(buyStockSuccess());
  } catch ({ error }) {
    yield put(buyStockFailed(error));
  }
}

function* handleSellStockSaga({ payload: { stocks } }) {
  try {
    let names = [];
    Object.keys(stocks).forEach(stock => {
      const name = stock.split("/")[1];
      if (names.indexOf(name) == -1) names.push(name);
    });
    const { data: marketData } = yield call(
      Axios.get,
      `${BASE_URL}${OHLC_ENDPOINT}?token=${TOKEN_STREAM}&symbols=${names.join(
        ","
      )}`
    );

    let body = [];
    Object.keys(stocks).forEach(stock => {
      const arr = stock.split("/");
      const id = arr[0];
      const name = arr[1];
      const quantity = stocks[stock];
      const { price } = marketData.find(
        d => d.symbol.toLowerCase() == name.toLowerCase()
      ).close;
      body.push({
        id,
        quantity,
        price
      });
    });

    const { data } = yield call(
      Axios.post,
      SELL_STOCK_ENDPOINT,
      body,
      REQUEST_HEADERS_AUTH
    );
    yield put(fetchPortfolioPerformance());
    yield put(fetchPortfolioChart());
    yield put(fetchPortfolioBreakdown());
    yield put(fetchHoldings());
    yield put(fetchTableData());
    yield put(destroy("sell-stock-modal"));
    yield put(sellStocksSuccess());
  } catch ({ error }) {
    yield put(sellStocksFailed(error));
  }
}

function* handleFetchTableDataSaga() {
  try {
    const { data } = yield call(
      Axios.get,
      STOCK_TABLE_DATA_ENDPOINT,
      REQUEST_HEADERS_AUTH
    );
    yield put(fetchTableDataSuccess(data));
  } catch ({ error }) {
    yield put(fetchTableDataFailed(error));
  }
}
export default function* portfolioSagaWatcher() {
  yield takeLatest(
    FETCH_PORTFOLIO_PERFORMANCE,
    handlePortfolioPerformanceSaga,
    REQUEST_HEADERS_AUTH
  );
  yield takeLatest(FETCH_PORTFOLIO_CHART, handlePortfolioChartSaga);
  yield takeLatest(FETCH_PORTFOLIO_BREAKDOWN, handlePortfolioBreakdownSaga);
  yield takeLatest(FETCH_HOLDINGS, handlePortfolioHoldingsSaga);
  yield takeLatest(DELETE_STOCKS, handleDeleteStockSaga);
  yield takeLatest(BUY_STOCK, handleBuyStockSaga);
  yield takeLatest(SELL_STOCKS, handleSellStockSaga);
  yield takeLatest(FETCH_TABLE_DATA, handleFetchTableDataSaga);
}
