import { createSelector } from "reselect";

export const authSelector = state => state.auth;

export const userSelector = createSelector(
  authSelector,
  authState => authState.account.user
);

export const tokenSelector = createSelector(
  authSelector,
  authState => authState.account.token
);

export const loadingSelector = createSelector(
  authSelector,
  authState => authState.account.loading
);

export const errorSelector = createSelector(
  authSelector,
  authState => authState.account.err
);

export const stepperSelector = createSelector(
  authSelector,
  authState => authState.step - 1
);
