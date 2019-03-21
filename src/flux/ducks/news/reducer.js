import {
  ADD_NEWS_FILTER,
  FILTER_NEWS_BY_STOCK,
  FILTER_NEWS_BY_STOCK_SUCCESS,
  FILTER_NEWS_BY_STOCK_FAILED,
  FETCH_MIXED_NEWS,
  FETCH_MIXED_NEWS_SUCCESS,
  FETCH_MIXED_NEWS_FAILED,
  CLEAR_FILTER,
  LOAD_MORE
} from "./actions";

const initialState = {
  mixedNews: [],
  filteredNews: [],
  loading: false,
  symbols: [],
  offset: 0,
  err: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NEWS_FILTER:
      return {
        ...state,
        symbols: payload.symbols,
        loading: true,
        offset: 0
      };
    case FILTER_NEWS_BY_STOCK:
      return { ...state, loading: true, offset: 0 };
    case FILTER_NEWS_BY_STOCK_SUCCESS:
      return { ...state, filteredNews: payload.news, loading: false };
    case FILTER_NEWS_BY_STOCK_FAILED:
      return { ...state, err: payload.err, loading: false };
    case FETCH_MIXED_NEWS:
      return { ...state, loading: true, offset: 0 };
    case FETCH_MIXED_NEWS_SUCCESS:
      return { ...state, mixedNews: payload.news, loading: false };
    case FETCH_MIXED_NEWS_FAILED:
      return { ...state, err: payload.err, loading: false };
    case CLEAR_FILTER:
      return { ...state, symbols: [], offset: 0 };
    case LOAD_MORE:
      return { ...state, offset: state.offset + 1 };
    default:
      return state;
  }
};
