export const REGISTER_PAYMENT = "@AUTH/REGISTER_PAYMENT";
export const registerPayment = token => ({
  type: REGISTER_PAYMENT,
  payload: {
    token
  }
});

export const REGISTER_USER = "@AUTH/REGISTER_USER";

export const registerUser = user => ({
  type: REGISTER_USER,
  payload: {
    user
  }
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

export const NEXT_STEP = "NEXT_STEP";
export const goToNextStep = () => ({
  type: NEXT_STEP
});

export const PREVIOUS_STEP = "PREVIOUS_STEP";

export const backToPreviousStep = () => ({
  type: PREVIOUS_STEP
});
