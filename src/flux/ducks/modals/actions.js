export const TOGGLE_ADD_STOCK = "TOGGLE_ADD_STOCK";

export const toggleAddStock = () => ({
  type: TOGGLE_ADD_STOCK
});

export const TOGGLE_DELETE_STOCK = "TOGGLE_DELETE_STOCK";

export const toggleDeleteStock = stocks => ({
  type: TOGGLE_DELETE_STOCK,
  payload: {
    stocks
  }
});

export const TOGGLE_SELL_STOCK = "TOGGLE_SELL_STOCK";

export const toggleSellStock = stocks => ({
  type: TOGGLE_SELL_STOCK,
  payload: {
    stocks
  }
});
