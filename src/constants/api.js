export const API_BASE_PATH = "https://stock-analyzer-api.herokuapp.com";
// export const API_BASE_PATH = 'http://localhost:9082';
export const USER_REGISTER_ENDPOINT = "/api/auth/signup";

export const USER_LOGIN_ENDPOINT = "/api/auth/signin";

export const USER_PROFILE_ENDPOINT = "/api/user";

export const USER_EDIT_ENDPOINT = "/api/user";

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
