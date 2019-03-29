import { combineReducers } from "redux";
import {
  QUOTE_CHANNEL_ON,
  QUOTE_CHANNEL_OFF,
  QUOTE_SERVER_ON,
  QUOTE_SERVER_OFF,
  UPDATE_STOCK_DATA,
  START_QUOTE_CHANNEL,
  STOP_QUOTE_CHANNEL,
  INIT_STOCK_DATA_INTRADAY,
  INIT_STOCK_DATA_INTRADAY_SUCCESS,
  INIT_STOCK_DATA_INTRADAY_FAILED,
  SELECT_STOCK,
  INIT_STOCK_LAST,
  INIT_STOCK_LAST_FAILED,
  INIT_STOCK_LAST_SUCCESS,
  FILTER_STOCK_DISPLAY,
  UPDATE_CANCELLATION_TOKEN,
  INIT_STOCK_DATA_RANGE,
  INIT_STOCK_DATA_RANGE_SUCCESS,
  INIT_STOCK_DATA_RANGE_FAILED
} from "./actions";

const initialStatusState = {
  server: "unknown",
  channel: "off"
};

const status = (state = initialStatusState, { type, payload }) => {
  switch (type) {
    case QUOTE_CHANNEL_ON:
      return { ...state, channel: "on" };
    case STOP_QUOTE_CHANNEL:
    case QUOTE_CHANNEL_OFF:
      return { ...state, channel: "off" };
    case QUOTE_SERVER_ON:
      return { ...state, server: "on" };
    case QUOTE_SERVER_OFF:
      return { ...state, server: "off" };
    default:
      return state;
  }
};

const initialChartState = {
  data: [],
  err: null,
  loading: false,
  selectedStock: null,
  cancellationToken: null,
  range: "1d"
};

const chart = (state = initialChartState, { type, payload }) => {
  switch (type) {
    case UPDATE_STOCK_DATA:
      return {
        ...state,
        data: [...state.data, ...payload.data]
      };
    case INIT_STOCK_DATA_INTRADAY:
      return { ...state, loading: true, data: [], range: "1d" };
    case INIT_STOCK_DATA_INTRADAY_SUCCESS:
      return { ...state, loading: false, data: payload.data };
    case INIT_STOCK_DATA_INTRADAY_FAILED:
      return { ...state, loading: false, err: payload.err };
    case INIT_STOCK_DATA_RANGE:
      return { ...state, loading: true, data: [], range: payload.range };
    case INIT_STOCK_DATA_RANGE_SUCCESS:
      return { ...state, loading: false, data: payload.data };
    case INIT_STOCK_DATA_RANGE_FAILED:
      return { ...state, loading: false, err: payload.err };
    case SELECT_STOCK:
      return { ...state, selectedStock: payload.stock };
    case UPDATE_CANCELLATION_TOKEN:
      return { ...state, cancellationToken: payload.cancellationToken };
    default:
      return state;
  }
};

const initialListState = {
  data: [],
  loading: false,
  err: null,
  filtered: [],
  keyword: ""
};

const list = (state = initialListState, { type, payload }) => {
  switch (type) {
    case INIT_STOCK_LAST:
      return { ...state, loading: true };
    case INIT_STOCK_LAST_SUCCESS:
      return { ...state, loading: false, data: payload.data };
    case INIT_STOCK_LAST_FAILED:
      return { ...state, loading: false, err: payload.err };
    case FILTER_STOCK_DISPLAY:
      return {
        ...state,
        filtered: state.data.filter(d => d.symbol.includes(payload.keyword)),
        keyword: payload.keyword
      };
    default:
      return state;
  }
};

export default combineReducers({
  status,
  chart,
  list
});
