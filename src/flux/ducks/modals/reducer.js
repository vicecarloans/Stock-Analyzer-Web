import {
  TOGGLE_ADD_STOCK,
  TOGGLE_DELETE_STOCK,
  TOGGLE_SELL_STOCK
} from "./actions";

const initialState = {
  addStock: false,
  deleteStock: false,
  sellStock: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_ADD_STOCK:
      return { ...state, addStock: !state.addStock };
    case TOGGLE_DELETE_STOCK:
      return { ...state, deleteStock: !state.deleteStock };
    case TOGGLE_SELL_STOCK:
      return { ...state, sellStock: !state.sellStock };
    default:
      return state;
  }
};
