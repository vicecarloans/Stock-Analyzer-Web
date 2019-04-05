export const START_QUOTE_CHANNEL = "@STREAM/START_QUOTE_CHANNEL";

export const startQuoteChannel = stock => ({
  type: START_QUOTE_CHANNEL,
  payload: {
    stock
  }
});

export const STOP_QUOTE_CHANNEL = "@STREAM/STOP_QUOTE_CHANNEL";

export const stopQuoteChannel = () => ({
  type: STOP_QUOTE_CHANNEL
});

export const QUOTE_CHANNEL_ON = "@STREAM/QUOTE_CHANNEL_ON";

export const turnQuoteChannelOn = () => ({
  type: QUOTE_CHANNEL_ON
});

export const QUOTE_SERVER_ON = "@STREAM/QUOTE_SERVER_ON";

export const turnQuoteServerOn = () => ({
  type: QUOTE_SERVER_ON
});

export const QUOTE_SERVER_OFF = "@STREAM/QUOTE_SERVER_OFF";

export const turnQuoteServerOff = () => ({
  type: QUOTE_SERVER_OFF
});

export const QUOTE_CHANNEL_OFF = "@STREAM/QUOTE_CHANNEL_OFF";

export const turnQuoteChannelOff = stock => ({
  type: QUOTE_CHANNEL_OFF,
  payload: {
    stock
  }
});

export const UPDATE_STOCK_DATA = "@STREAM/UPDATE_STOCK_DATA";

export const updateStockData = data => ({
  type: UPDATE_STOCK_DATA,
  payload: {
    data
  }
});

export const INIT_STOCK_DATA_INTRADAY = "@STREAM/INIT_STOCK_DATA_INTRADAY";

export const initStockDataIntraday = stock => ({
  type: INIT_STOCK_DATA_INTRADAY,
  payload: {
    stock
  }
});

export const INIT_STOCK_DATA_INTRADAY_SUCCESS =
  "@STREAM/INIT_STOCK_DATA_INTRADAY_SUCCESS";

export const initStockDataIntradaySuccess = data => ({
  type: INIT_STOCK_DATA_INTRADAY_SUCCESS,
  payload: {
    data
  }
});

export const INIT_STOCK_DATA_INTRADAY_FAILED =
  "@STREAM/INIT_STOCK_DATA_INTRADAY_FAILED";

export const initStockDataIntradayFailed = err => ({
  type: INIT_STOCK_DATA_INTRADAY_FAILED,
  payload: {
    err
  }
});
export const INIT_STOCK_LAST = "INIT_STOCK_LAST";

export const initStockLast = stocks => ({
  type: INIT_STOCK_LAST,
  payload: {
    stocks
  }
});

export const INIT_STOCK_LAST_SUCCESS = "INIT_STOCK_LAST_SUCCESS";

export const initStockLastSuccess = data => ({
  type: INIT_STOCK_LAST_SUCCESS,
  payload: {
    data
  }
});

export const INIT_STOCK_LAST_FAILED = "INIT_STOCK_LAST_FAILED";
export const initStockLastFailed = err => ({
  type: INIT_STOCK_LAST_FAILED,
  payload: {
    err
  }
});

export const SELECT_STOCK = "SELECT_STOCK";

export const selectStock = stock => ({
  type: SELECT_STOCK,
  payload: {
    stock
  }
});

export const FILTER_STOCK_DISPLAY = "FILTER_STOCK_DISPLAY";

export const filterStock = keyword => ({
  type: FILTER_STOCK_DISPLAY,
  payload: {
    keyword
  }
});

export const UPDATE_CANCELLATION_TOKEN = "UPDATE_CANCELLATION_TOKEN";

export const updateCancellationToken = cancellationToken => ({
  type: UPDATE_CANCELLATION_TOKEN,
  payload: {
    cancellationToken
  }
});

export const INIT_STOCK_DATA_RANGE = "INIT_STOCK_DATA_RANGE";
export const initStockDataRange = range => ({
  type: INIT_STOCK_DATA_RANGE,
  payload: {
    range
  }
});

export const INIT_STOCK_DATA_RANGE_SUCCESS = "INIT_STOCK_DATA_RANGE_SUCCESS";
export const initStockDataRangeSuccess = data => ({
  type: INIT_STOCK_DATA_RANGE_SUCCESS,
  payload: {
    data
  }
});

export const INIT_STOCK_DATA_RANGE_FAILED = "INIT_STOCK_DATA_RANGE_FAILED";

export const initStockDataRangeFailed = err => ({
  type: INIT_STOCK_DATA_RANGE_FAILED,
  payload: {
    err
  }
});

export const PREDICT_STOCK = "PREDICT_STOCK";

export const predictStock = () => ({
  type: PREDICT_STOCK
});

export const PREDICT_STOCK_SUCCESS = "PREDICT_STOCK_SUCCESS";

export const predictStockSuccess = prediction => ({
  type: PREDICT_STOCK_SUCCESS,
  payload: {
    prediction
  }
});

export const PREDICT_STOCK_FAILED = "PREDICT_STOCK_FAILED";

export const predictStockFailed = err => ({
  type: PREDICT_STOCK_FAILED,
  payload: {
    err
  }
});
