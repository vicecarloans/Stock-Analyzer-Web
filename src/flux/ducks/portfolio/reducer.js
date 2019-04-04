import {
  FETCH_PORTFOLIO_PERFORMANCE,
  FETCH_PORTFOLIO_PERFORMANCE_SUCCESS,
  FETCH_PORTFOLIO_PERFORMANCE_FAILED,
  FETCH_PORTFOLIO_CHART,
  FETCH_PORTFOLIO_BREAKDOWN,
  FETCH_HOLDINGS,
  FETCH_PORTFOLIO_CHART_SUCCESS,
  FETCH_PORTFOLIO_CHART_FAILED,
  FETCH_PORTFOLIO_BREAKDOWN_SUCCESS,
  FETCH_PORTFOLIO_BREAKDOWN_FAILED,
  FETCH_HOLDINGS_SUCCESS,
  FETCH_HOLDINGS_FAILED,
  BUY_STOCK_FAILED,
  SELL_STOCKS_FAILED,
  DELETE_STOCKS_FAILED,
  FETCH_TABLE_DATA_FAILED,
  FETCH_TABLE_DATA,
  FETCH_TABLE_DATA_SUCCESS
} from "./actions";
import { combineReducers } from "redux";

const initialPerformanceState = {
  acquisitionCost: 0,
  realizedPL: 0,
  holdingsQty: 0,
  totalInvestment: 0,
  totalRevenue: 0
};

const performance = (state = initialPerformanceState, { type, payload }) => {
  switch (type) {
    case FETCH_PORTFOLIO_PERFORMANCE_SUCCESS:
      return {
        ...state,
        acquisitionCost: payload.acquisitionCost,
        realizedPL: payload.realizedPL,
        holdingsQty: payload.holdingsQty,
        totalInvestment: payload.totalInvestment,
        totalRevenue: payload.totalRevenue
      };
    default:
      return state;
  }
};

const initialLoadingState = {
  performance: false,
  chart: false,
  breakdowns: false,
  holdings: false,
  table: false
};

const loading = (state = initialLoadingState, { type, payload }) => {
  switch (type) {
    case FETCH_PORTFOLIO_PERFORMANCE:
      return { ...state, performance: true };
    case FETCH_PORTFOLIO_PERFORMANCE_SUCCESS:
    case FETCH_PORTFOLIO_PERFORMANCE_FAILED:
      return { ...state, performance: false };
    case FETCH_PORTFOLIO_CHART:
      return { ...state, chart: true };
    case FETCH_PORTFOLIO_CHART_SUCCESS:
    case FETCH_PORTFOLIO_CHART_FAILED:
      return { ...state, chart: false };
    case FETCH_PORTFOLIO_BREAKDOWN:
      return { ...state, breakdowns: true };
    case FETCH_PORTFOLIO_BREAKDOWN_SUCCESS:
    case FETCH_PORTFOLIO_BREAKDOWN_FAILED:
      return { ...state, breakdowns: false };
    case FETCH_HOLDINGS:
      return { ...state, holdings: true };
    case FETCH_HOLDINGS_SUCCESS:
    case FETCH_HOLDINGS_FAILED:
      return { ...state, holdings: false };
    case FETCH_TABLE_DATA:
      return { ...state, table: true };
    case FETCH_TABLE_DATA_SUCCESS:
    case FETCH_TABLE_DATA_FAILED:
      return { ...state, table: false };
    default:
      return state;
  }
};

const initialChartState = {
  performance: {
    portfolioMIN: 0,
    portfolioMAX: 0,
    portfolioChange: 0,
    portfolioChangePercent: 0
  },
  portfolioValue: []
};

const chart = (state = initialChartState, { type, payload }) => {
  switch (type) {
    case FETCH_PORTFOLIO_CHART_SUCCESS:
      return {
        ...state,
        performance: payload.performance,
        portfolioValue: payload.portfolioValue
      };

    default:
      return state;
  }
};

const initialErrorState = {
  status: null,
  message: ""
};

const err = (state = initialErrorState, { type, payload }) => {
  switch (type) {
    case FETCH_PORTFOLIO_CHART_FAILED:
    case FETCH_PORTFOLIO_BREAKDOWN_FAILED:
    case FETCH_HOLDINGS_FAILED:
    case BUY_STOCK_FAILED:
    case SELL_STOCKS_FAILED:
    case DELETE_STOCKS_FAILED:
    case FETCH_TABLE_DATA_FAILED:
    case FETCH_PORTFOLIO_PERFORMANCE_FAILED:
      return {
        ...state,
        status: payload.err.status,
        message: payload.err.message
      };

    default:
      return state;
  }
};

const initialBreakdownsState = {
  mostProfit: {
    name: null,
    value: 0
  },
  leastProfit: {
    name: null,
    value: 0
  },
  worstStock: {
    name: null,
    value: 0
  },
  bestStock: {
    name: null,
    value: 0
  }
};

const breakdowns = (state = initialBreakdownsState, { type, payload }) => {
  switch (type) {
    case FETCH_PORTFOLIO_BREAKDOWN_SUCCESS:
      return {
        ...state,
        mostProfit: payload.mostProfit,
        leastProfit: payload.leastProfit,
        worstStock: payload.worstStock,
        bestStock: payload.bestStock
      };

    default:
      return state;
  }
};

const initialHoldingsState = [];

const holdings = (state = initialHoldingsState, { type, payload }) => {
  switch (type) {
    case FETCH_HOLDINGS_SUCCESS:
      return payload.data;

    default:
      return state;
  }
};

const initialTableDataState = [];

const tableData = (state = initialTableDataState, { type, payload }) => {
  switch (type) {
    case FETCH_TABLE_DATA_SUCCESS:
      return payload.data;

    default:
      return state;
  }
};

export default combineReducers({
  performance,
  loading,
  chart,
  err,
  breakdowns,
  holdings,
  tableData
});
