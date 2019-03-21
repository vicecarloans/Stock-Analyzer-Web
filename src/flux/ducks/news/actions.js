export const ADD_NEWS_FILTER = "@NEWS/ADD_NEWS_FILTER";

export const addFilter = symbols => ({
  type: ADD_NEWS_FILTER,
  payload: {
    symbols
  }
});

export const FILTER_NEWS_BY_STOCK = "@NEWS/FILTER_NEWS_BY_STOCK";

export const filterNewsByStock = () => ({
  type: FILTER_NEWS_BY_STOCK
});

export const FILTER_NEWS_BY_STOCK_SUCCESS =
  "@NEWS/FILTER_NEWS_BY_STOCK_SUCCESS";

export const filterNewsByStockSuccess = news => ({
  type: FILTER_NEWS_BY_STOCK_SUCCESS,
  payload: {
    news
  }
});

export const FILTER_NEWS_BY_STOCK_FAILED = "@NEWS/FILTER_NEWS_BY_STOCK_FAILED";

export const filterNewsByStockFailed = err => ({
  type: FILTER_NEWS_BY_STOCK_FAILED,
  payload: {
    err
  }
});

export const FETCH_MIXED_NEWS = "@NEWS/FETCH_MIXED_NEWS";

export const fetchMixedNews = () => ({
  type: FETCH_MIXED_NEWS
});

export const FETCH_MIXED_NEWS_SUCCESS = "@NEWS/FETCH_MIXED_NEWS_SUCCESS";

export const fetchMixedNewsSuccess = news => ({
  type: FETCH_MIXED_NEWS_SUCCESS,
  payload: {
    news
  }
});

export const FETCH_MIXED_NEWS_FAILED = "@NEWS/FETCH_MIXED_NEWS_FAILED";

export const fetchMixedNewsFailed = err => ({
  type: FETCH_MIXED_NEWS_FAILED,
  payload: {
    err
  }
});

export const CLEAR_FILTER = "@NEWS/CLEAR_FILTER";

export const clearFilter = () => ({
  type: CLEAR_FILTER
});

export const LOAD_MORE = "@NEWS/LOAD_MORE";

export const loadMore = () => ({
  type: LOAD_MORE
});
