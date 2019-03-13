import { createSelector } from "reselect";

export const stockState = state => state.stocks;

export const sellStocksListSelector = createSelector(
  stockState,
  stocks => stocks.sellStocks.list
);

export const deleteStocksListSelector = createSelector(
  stockState,
  stocks => stocks.deleteStocks.list
);
