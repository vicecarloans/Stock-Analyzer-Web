export const REGISTER_PAYMENT = "@AUTH/REGISTER_PAYMENT";
export const registerPayment = token => ({
  type: REGISTER_PAYMENT,
  payload: {
    token
  }
});

export const REGISTER_PAYMENT_FAILED = "REGISTER_PAYMENT_FAILED";
export const registerPaymentFailed = message => ({
  type: REGISTER_PAYMENT_FAILED,
  payload: {
    err: message
  }
});

export const REGISTER_USER = "@AUTH/REGISTER_USER";

export const registerUser = () => ({
  type: REGISTER_USER
});

export const REGISTER_USER_SUCCESS = "@AUTH/REGISTER_USER_SUCCESS";

export const registerUserSuccess = () => ({
  type: REGISTER_USER_SUCCESS
});

export const REGISTER_USER_FAILED = "@AUTH/REGISTER_USER_FAILED";

export const registerUserFailed = err => ({
  type: REGISTER_USER_FAILED,
  payload: {
    err
  }
});

export const NEXT_STEP = "@AUTH/NEXT_STEP";
export const goToNextStep = () => ({
  type: NEXT_STEP
});

export const PREVIOUS_STEP = "@AUTH/PREVIOUS_STEP";

export const backToPreviousStep = () => ({
  type: PREVIOUS_STEP
});

export const PICK_PLAN = "@AUTH/PICK_PLAN";

export const pickPlan = plan => ({
  type: PICK_PLAN,
  payload: {
    plan
  }
});

export const OPEN_PAYMENT_MODAL = "@AUTH/OPEN_PAYMENT_MODAL";

export const openPaymentModal = () => ({
  type: OPEN_PAYMENT_MODAL
});

export const CLOSE_PAYMENT_MODAL = "@AUTH/CLOSE_PAYMENT_MODAL";

export const closePaymentModal = () => ({
  type: CLOSE_PAYMENT_MODAL
});

export const REGISTER_DONE = "@AUTH/REGISTER_DONE";

export const registerDone = () => ({
  type: REGISTER_DONE
});

export const LOGIN = "@AUTH/LOGIN";
export const login = () => ({
  type: LOGIN
});

export const LOGIN_SUCCESS = "@AUTH/LOGIN_SUCCESS";
export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const LOGIN_FAILED = "@AUTH/LOGIN_FAILED";
export const loginFailed = err => ({
  type: LOGIN_FAILED,
  payload: {
    err
  }
});

export const FETCH_USER = "@AUTH/FETCH_USER";

export const fetchUser = (cookie = null) => ({
  type: FETCH_USER,
  payload: {
    cookie
  }
});

export const FETCH_USER_SUCCESS = "@AUTH/FETCH_USER_SUCCESS";

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: {
    user
  }
});
export const FETCH_USER_FAILED = "@AUTH/FETCH_USER_FAILED";
export const fetchUserFailed = err => ({
  type: FETCH_USER_FAILED,
  payload: {
    err
  }
});

export const DISMISS_LOGIN_ERROR = "@AUTH/DISMISS_LOGIN_ERROR";

export const dismissLoginError = () => ({
  type: DISMISS_LOGIN_ERROR
});

export const SIGN_OUT = "@AUTH/SIGN_OUT";

export const signOut = () => ({
  type: SIGN_OUT
});

export const UPLOAD_IMAGE_URL = "@AUTH/UPLOAD_IMAGE_URL";

export const uploadImageUrl = url => ({
  type: UPLOAD_IMAGE_URL,
  payload: {
    url
  }
});

export const UPLOAD_IMAGE_URL_SUCCESS = "UPLOAD_IMAGE_URL_SUCCESS";

export const uploadImageUrlSuccess = picture => ({
  type: UPLOAD_IMAGE_URL_SUCCESS,
  payload: {
    picture
  }
});

export const UPLOAD_IMAGE_URL_FAILED = "UPLOAD_IMAGE_URL_FAILED";

export const uploadImageUrlFailed = err => ({
  type: UPLOAD_IMAGE_URL_FAILED,
  payload: {
    err
  }
});

export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const updateUserData = () => ({
  type: UPDATE_USER_DATA
});

export const UPDATE_USER_DATA_SUCCESS = "UPDATE_USER_DATA_SUCCESS";

export const updateUserDataSuccess = () => ({
  type: UPDATE_USER_DATA_SUCCESS
});

export const UPDATE_USER_DATA_FAILED = "UPDATE_USER_DATA_FAILED";

export const updateUserDataFailed = err => ({
  type: UPDATE_USER_DATA_FAILED,
  payload: {
    err
  }
});

export const DISMISS_UPDATE_NOTIFICATION = "DISMISS_UPDATE_NOTIFICATION";

export const dismissUpdateNotification = () => ({
  type: DISMISS_UPDATE_NOTIFICATION
});
