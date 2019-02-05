import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const SagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(SagaMiddleware))
  );

  store.runSagaTask = () => {
    store.sagaTask = SagaMiddleware.run(rootSaga);
  };
  store.runSagaTask();

  return store;
};
