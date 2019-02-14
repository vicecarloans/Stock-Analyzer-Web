import { createSelector } from "reselect";

export const authSelector = state => state.auth;

export const userSelector = createSelector(
  authSelector,
  authState => authState.account.user
);

export const loginLoadingSelector = createSelector(
  authSelector,
  authState => authState.account.loading
);

export const loginErrorSelector = createSelector(
  authSelector,
  authState => authState.account.err
);

export const tokenSelector = createSelector(
  authSelector,
  authState => authState.registerRequest.token
);

export const loadingSelector = createSelector(
  authSelector,
  authState => authState.registerRequest.loading
);

export const errorSelector = createSelector(
  authSelector,
  authState => authState.registerRequest.err
);

export const stepperSelector = createSelector(
  authSelector,
  authState => authState.step - 1
);

export const planSelector = createSelector(
  authSelector,
  authState => authState.registerRequest.plan
);

export const paymentModalSelector = createSelector(
  authSelector,
  authState => authState.modal.payment
);
