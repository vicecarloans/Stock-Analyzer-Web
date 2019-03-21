import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./ducks/auth";
import modalsReducer from "./ducks/modals";
import stocksReducer from "./ducks/stocks";
import newsReducer from "./ducks/news";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  stocks: stocksReducer,
  modals: modalsReducer,
  news: newsReducer
});

export default rootReducer;
