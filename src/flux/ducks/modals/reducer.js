import {
  TOGGLE_ADD_STOCK,
  TOGGLE_DELETE_STOCK,
  TOGGLE_SELL_STOCK,
  TOGGLE_COMPANY_MODAL
} from "./actions";
import {
  BUY_STOCK_SUCCESS,
  SELL_STOCKS_SUCCESS,
  DELETE_STOCKS_SUCCESS
} from "../portfolio/actions";

const initialState = {
  addStock: false,
  deleteStock: false,
  sellStock: false,
  company: false,
  stocks: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_ADD_STOCK:
      return { ...state, addStock: !state.addStock };
    case TOGGLE_DELETE_STOCK:
      return {
        ...state,
        deleteStock: !state.deleteStock,
        stocks: payload.stocks
      };
    case TOGGLE_SELL_STOCK:
      return {
        ...state,
        sellStock: !state.sellStock,
        stocks: payload.stocks
      };
    case TOGGLE_COMPANY_MODAL:
      return { ...state, company: !state.company };
    case BUY_STOCK_SUCCESS:
      return { ...state, addStock: false };
    case SELL_STOCKS_SUCCESS:
      return { ...state, sellStock: false };
    case DELETE_STOCKS_SUCCESS:
      return { ...state, deleteStock: false };
    default:
      return state;
  }
};
