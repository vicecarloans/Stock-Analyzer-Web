import { combineReducers } from "redux";
import { TOGGLE_SELL_STOCK, TOGGLE_DELETE_STOCK } from "flux/ducks/modals";
const sellInitialState = {
  list: []
};

const sellStocks = (state = sellInitialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SELL_STOCK:
      return { ...state, list: payload.stocks };

    default:
      return state;
  }
};

const deleteInitialState = {
  list: []
};

const deleteStocks = (state = deleteInitialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_DELETE_STOCK:
      return { ...state, list: payload.stocks };

    default:
      return state;
  }
};

export default combineReducers({
  sellStocks,
  deleteStocks
});
