import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./ducks/auth";
import modalsReducer from "./ducks/modals";
import newsReducer from "./ducks/news";
import streamReducer from "./ducks/stream";
import companyReducer from "./ducks/company";
import portfolioReducer from "./ducks/portfolio";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  modals: modalsReducer,
  news: newsReducer,
  stream: streamReducer,
  company: companyReducer,
  portfolio: portfolioReducer
});

export default rootReducer;
