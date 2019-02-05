export const API_BASE_PATH = "https://stock-analyzer-api.herokuapp.com";

export const USER_REGISTER_ENDPOINT = "/api/auth/signup";

export const USER_LOGIN_ENDPOINT = "/api/auth/signin";

export const USER_PROFILE_ENDPOINT = "/api/user/me";

export const USER_EDIT_ENDPOINT = "/api/user";

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
