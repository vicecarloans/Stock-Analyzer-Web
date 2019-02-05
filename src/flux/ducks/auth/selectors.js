import { createSelector } from "reselect";

export const authSelector = state => state.auth;

export const userSelector = createSelector(
  authSelector,
  authState => authState.user
);

export const tokenSelector = createSelector(
  authSelector,
  authState => authState.token
);

export const loadingSelector = createSelector(
  authSelector,
  authState => authState.loading
);

export const errorSelector = createSelector(
  authSelector,
  authState => authState.err
);
