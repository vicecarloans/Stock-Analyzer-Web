export const GET_COMPANY_DATA = "GET_COMPANY_DATA";

export const getCompanyData = symbol => ({
  type: GET_COMPANY_DATA,
  payload: {
    symbol
  }
});

export const GET_COMPANY_DATA_SUCCESS = "GET_COMPANY_DATA_SUCCESS";

export const getCompanyDataSuccess = data => ({
  type: GET_COMPANY_DATA_SUCCESS,
  payload: {
    data
  }
});

export const GET_COMPANY_DATA_FAILED = "GET_COMPANY_DATA_FAILED";

export const getCompanyDataFailed = err => ({
  type: GET_COMPANY_DATA_FAILED,
  payload: {
    err
  }
});
