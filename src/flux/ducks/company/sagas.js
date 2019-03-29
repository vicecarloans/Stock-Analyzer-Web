import { takeLatest, select, put, call } from "redux-saga/effects";

import {
  BASE_URL,
  getCompanySummaryByStock,
  getStatusByStock,
  TOKEN_API
} from "constants/iextrading";
import {
  getCompanyDataFailed,
  GET_COMPANY_DATA,
  getCompanyDataSuccess
} from "./actions";
import Axios from "axios";

function* getCompanyDataSaga({ payload: { symbol } }) {
  try {
    const { data: companyDesc } = yield call(
      Axios.get,
      `${BASE_URL}${getCompanySummaryByStock(symbol)}?token=${TOKEN_API}`
    );
    const { data: performDesc } = yield call(
      Axios.get,
      `${BASE_URL}${getStatusByStock(symbol)}?token=${TOKEN_API}`
    );
    const summary = {
      name: companyDesc.companyName,
      description: companyDesc.description,
      exchange: companyDesc.exchange,
      employees: companyDesc.employees,
      sector: companyDesc.sector,
      industry: companyDesc.industry,
      website: companyDesc.website,
      volume: performDesc.avg30Volume,
      marketcap: performDesc.marketcap,
      week52Range: `${performDesc.week52low} - ${performDesc.week52high}`,
      dividendYield: `${(performDesc.dividendYield * 100).toFixed(2)}%`,
      nextEarningsDate: performDesc.nextEarningsDate
    };
    yield put(getCompanyDataSuccess(summary));
  } catch (err) {
    yield put(getCompanyDataFailed(err));
  }
}

export default function* companySagaWatcher() {
  yield takeLatest(GET_COMPANY_DATA, getCompanyDataSaga);
}
