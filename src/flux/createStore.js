import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const SagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "SA-Client",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    {},
    composeWithDevTools(applyMiddleware(SagaMiddleware))
  );

  store.sagaTask = SagaMiddleware.run(rootSaga);

  store.__persistor = persistStore(store);

  return store;
};
