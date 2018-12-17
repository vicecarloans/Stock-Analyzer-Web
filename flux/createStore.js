import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

export default () => {
  return createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
  );
};
