import { createSelector } from "reselect";

export const streamSelector = state => state.stream;

export const statusSelector = createSelector(
  streamSelector,
  stream => stream.status
);

export const chartDataSelector = createSelector(
  streamSelector,
  stream => stream.chart.data
);

export const chartLoadingSelector = createSelector(
  streamSelector,
  stream => stream.chart.loading
);

export const errorSelector = createSelector(
  streamSelector,
  stream => stream.chart.err
);

export const selectedStockSelector = createSelector(
  streamSelector,
  stream => stream.chart.selectedStock
);

export const listDataSelector = createSelector(
  streamSelector,
  stream => stream.list.data
);

export const listLoadingSelector = createSelector(
  streamSelector,
  stream => stream.list.loading
);

export const listErrorSelector = createSelector(
  streamSelector,
  stream => stream.list.err
);

export const filteredListSelector = createSelector(
  streamSelector,
  stream => stream.list.filtered
);

export const keywordListSelector = createSelector(
  streamSelector,
  stream => stream.list.keyword
);

export const cancellationTokenChartSelector = createSelector(
  streamSelector,
  stream => stream.chart.cancellationToken
);

export const rangeChartSelector = createSelector(
  streamSelector,
  stream => stream.chart.range
);
