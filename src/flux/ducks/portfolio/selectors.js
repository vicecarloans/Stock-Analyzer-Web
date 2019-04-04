import { createSelector } from "reselect";

export const portfolioSelector = state => state.portfolio;

export const performanceSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.performance
);

export const chartSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.chart
);

export const chartPerformanceSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.chart.performance
);

export const chartDataSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.chart.portfolioValue
);

export const errorSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.err
);

export const breakdownsSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.breakdowns
);

export const tableDataSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.tableData
);

export const holdingsSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.holdings
);

export const performanceLoadingSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.loading.performance
);

export const chartLoadingSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.loading.chart
);

export const breakdownsLoadingSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.loading.breakdowns
);
export const holdingsLoadingSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.loading.holdings
);

export const tableDataLoadingSelector = createSelector(
  portfolioSelector,
  portfolio => portfolio.loading.table
);
