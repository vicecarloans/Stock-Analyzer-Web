import { createSelector } from "reselect";

const newsSelector = state => state.news;

export const newsLoadingSelector = createSelector(
  newsSelector,
  news => news.loading
);

export const newsDisplaySelector = createSelector(
  newsSelector,
  news =>
    news.symbols.length > 0
      ? news.filteredNews.slice(0, (news.offset + 1) * 10)
      : news.mixedNews.slice(0, (news.offset + 1) * 10)
);
export const newsTypeSelector = createSelector(
  newsSelector,
  news => (news.symbols.length > 0 ? news.filteredNews : news.mixedNews)
);

export const newsSymbolsSelector = createSelector(
  newsSelector,
  news => news.symbols
);

export const newsOffsetSelector = createSelector(
  newsSelector,
  news => news.offset
);

export const canLoadMore = createSelector(
  newsTypeSelector,
  newsDisplaySelector,
  (news, display) => news.length != display.length
);

export const errorSelector = createSelector(
  newsSelector,
  news => news.error
);
