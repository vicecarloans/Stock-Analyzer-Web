import { createSelector } from "reselect";

export const modalsSelector = state => state.modals;

export const addStockModalSelector = createSelector(
  modalsSelector,
  modals => modals.addStock
);

export const deleteStockModalSelector = createSelector(
  modalsSelector,
  modals => modals.deleteStock
);

export const sellStockModalSelector = createSelector(
  modalsSelector,
  modals => modals.sellStock
);

export const companyModalSelector = createSelector(
  modalsSelector,
  modals => modals.company
);

export const selectedStocksSelector = createSelector(
  modalsSelector,
  modals => modals.stocks
);
