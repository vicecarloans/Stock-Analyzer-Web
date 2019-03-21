import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { IEXTRADING_PUBLISHABLE_TOKEN } = publicRuntimeConfig;
export const BASE_URL = "https://cloud.iexapis.com/beta";
export const TOKEN = IEXTRADING_PUBLISHABLE_TOKEN;

// export const BASE_URL = 'https://sandbox.iexapis.com';
// export const TOKEN = process.env.IEXTRADING_TEST_PUBLISHABLE_TOKEN;
export const GET_NEWS = "/stock/market/news";
