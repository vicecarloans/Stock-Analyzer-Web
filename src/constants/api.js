export const API_BASE_PATH = "http://ec2-52-91-157-120.compute-1.amazonaws.com";
// export const API_BASE_PATH = 'http://localhost:9082';
export const USER_REGISTER_ENDPOINT = "/api/auth/signup";

export const USER_LOGIN_ENDPOINT = "/api/auth/signin";

export const USER_PROFILE_ENDPOINT = "/api/user";

export const USER_EDIT_ENDPOINT = "/api/user";

export const USER_EDIT_PICTURE_ENDPOINT = "/api/user/picture";

export const GET_ALL_STOCKS_ENDPOINT = "/api/trans/all";

export const BUY_STOCK_ENDPOINT = "/api/trans/buy";

export const SELL_STOCK_ENDPOINT = "/api/trans/sell";

export const DELETE_STOCK_ENDPOINT = "/api/trans";

export const STOCK_PERFORMANCE_ENDPOINT = "/api/trans/performance";

export const STOCK_HOLDINGS_ENDPOINT = "/api/trans/holdings";

export const STOCK_CHART_ENDPOINT = "/api/trans/chart";

export const STOCK_BREAKDOWNS_ENDPOINT = "/api/trans/breakdowns";

export const STOCK_TABLE_DATA_ENDPOINT = "/api/trans/table";

export const getCheckEmailEndpoint = email =>
  `/api/user/checkEmailAvailability/${email}`;

export const getCheckUsernameEndpoint = username =>
  `/api/user/checkUsernameAvailability/${username}`;

export const REQUEST_HEADERS_AUTH = {
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
};

export const REQUEST_HEADERS = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const REQUEST_HEADERS_AUTH_MANUAL_COOKIE = cookie => ({
  headers: {
    "Content-Type": "application/json",
    cookie
  },
  withCredentials: true
});
