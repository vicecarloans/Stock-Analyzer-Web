import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const {
  IEXTRADING_PUBLISHABLE_TOKEN_STREAM,
  IEXTRADING_PUBLISHABLE_TOKEN_API
} = publicRuntimeConfig;

/* HTTP Request */
export const BASE_URL = "https://cloud.iexapis.com/beta";
export const TOKEN_STREAM = IEXTRADING_PUBLISHABLE_TOKEN_STREAM;
export const TOKEN_API = IEXTRADING_PUBLISHABLE_TOKEN_API;
//Get all news
export const GET_NEWS = "/stock/market/news";

//Get Stock Chart
export const getIntradayDataByStock = ({ stock }) =>
  `/stock/${stock}/intraday-prices`;

//Get Stock Chart By Range
export const getStockDataByRange = ({ stock, range }) =>
  `/stock/${stock}/chart/${range}`;
//Get Minified Data
export const LAST_ENDPOINT = "/tops";
//Company
export const getCompanySummaryByStock = stock => `/stock/${stock}/company`;
//Status
export const getStatusByStock = stock => `/stock/${stock}/stats`;

/* Streaming API start here */

export const BASE_URL_STREAMING = "https://cloud-sse.iexapis.com/beta";

export const STOCK_QUOTES = "/stocksUS";
