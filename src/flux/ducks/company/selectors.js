import { createSelector } from "reselect";

export const companySelector = state => state.company;

export const companyDataSelector = createSelector(
  companySelector,
  company => company.data
);

export const companyLoadingSelector = createSelector(
  companySelector,
  company => company.loading
);

export const companyErrorSelector = createSelector(
  companySelector,
  company => company.err
);
