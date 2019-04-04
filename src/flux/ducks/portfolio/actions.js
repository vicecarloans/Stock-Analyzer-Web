export const FETCH_PORTFOLIO_PERFORMANCE = "FETCH_PORTFOLIO_PERFORMANCE";

export const fetchPortfolioPerformance = () => ({
  type: FETCH_PORTFOLIO_PERFORMANCE
});

export const FETCH_PORTFOLIO_PERFORMANCE_SUCCESS =
  "FETCH_PORTFOLIO_PERFORMANCE_SUCCESS";
/**
 * 
 * @param {
    "success": true,
    "message": "Response successfully",
    "acquisitionCost": 21.7,
    "realizedPL": 179.8,
    "holdingsQty": 0,
    "totalInvestment": 21.7,
    "totalRevenue": 201.5
} data
 */
export const fetchPortfolioPerformanceSuccess = data => ({
  type: FETCH_PORTFOLIO_PERFORMANCE_SUCCESS,
  payload: {
    ...data
  }
});

export const FETCH_PORTFOLIO_PERFORMANCE_FAILED =
  "FETCH_PORTFOLIO_PERFORMANCE_FAILED";

export const fetchPortfolioPerformanceFailed = err => ({
  type: FETCH_PORTFOLIO_PERFORMANCE_FAILED,
  payload: {
    err
  }
});

export const FETCH_PORTFOLIO_CHART = "FETCH_PORTFOLIO_CHART";

export const fetchPortfolioChart = () => ({
  type: FETCH_PORTFOLIO_CHART
});

export const FETCH_PORTFOLIO_CHART_SUCCESS = "FETCH_PORTFOLIO_CHART_SUCCESS";

/**
 * 
 * @param {
    "performance": {
        "portfolioMIN": 1813.98,
        "portfolioMAX": 3638.52,
        "portfolioChange": -1264.2800000000002,
        "portfolioChangePercent": -0.41071254539902413
    },
    "portfolioValue": [
        {
            "date": "2019-01-02",
            "value": 3078.26
        },
        {
            "date": "2019-01-03",
            "value": 3000.56
        },
        {
            "date": "2019-01-04",
            "value": 3150.78
        },
        ...
    ]
} data
 */
export const fetchPortfolioChartSuccess = data => ({
  type: FETCH_PORTFOLIO_CHART_SUCCESS,
  payload: {
    ...data
  }
});

export const FETCH_PORTFOLIO_CHART_FAILED = "FETCH_PORTFOLIO_CHART_FAILED";

export const fetchPortfolioChartFailed = err => ({
  type: FETCH_PORTFOLIO_CHART_FAILED,
  payload: {
    err
  }
});

export const FETCH_PORTFOLIO_BREAKDOWN = "FETCH_PORTFOLIO_BREAKDOWN";

export const fetchPortfolioBreakdown = () => ({
  type: FETCH_PORTFOLIO_BREAKDOWN
});

export const FETCH_PORTFOLIO_BREAKDOWN_SUCCESS =
  "FETCH_PORTFOLIO_BREAKDOWN_SUCCESS";
/**
 * 
 * @param {
    "mostProfit": {
        "name": null,
        "value": 0
    },
    "leastProfit": {
        "name": null,
        "value": 0
    },
    "worstStock": {
        "name": null,
        "value": 0
    },
    "bestStock": {
        "name": null,
        "value": 0
    }
} data
 */
export const fetchPortfolioBreakdownSuccess = data => ({
  type: FETCH_PORTFOLIO_BREAKDOWN_SUCCESS,
  payload: {
    ...data
  }
});

export const FETCH_PORTFOLIO_BREAKDOWN_FAILED =
  "FETCH_PORTFOLIO_BREAKDOWN_FAILED";

export const fetchPortfolioBreakdownFailed = err => ({
  type: FETCH_PORTFOLIO_BREAKDOWN_FAILED,
  payload: {
    err
  }
});

export const FETCH_HOLDINGS = "FETCH_HOLDINGS";
export const fetchHoldings = () => ({
  type: FETCH_HOLDINGS
});
export const FETCH_HOLDINGS_SUCCESS = "FETCH_HOLDINGS_SUCCESS";
/**
 * 
 * @param [
    {
        "createdAt": "2019-04-03T17:17:23.532Z",
        "updatedAt": "2019-04-03T17:17:23.532Z",
        "id": 11,
        "stock": "AMZN",
        "initialValue": 10.85,
        "initialQuantity": 2,
        "soldPositions": [],
        "boughtOn": 1551744000
    }
] data
 */
export const fetchHoldingsSuccess = data => ({
  type: FETCH_HOLDINGS_SUCCESS,
  payload: {
    data
  }
});

export const FETCH_HOLDINGS_FAILED = "FETCH_HOLDINGS_FAILED";

export const fetchHoldingsFailed = err => ({
  type: FETCH_HOLDINGS_FAILED,
  payload: {
    err
  }
});

export const BUY_STOCK = "BUY_STOCK";

export const buyStock = data => ({
  type: BUY_STOCK,
  payload: {
    data
  }
});

export const BUY_STOCK_SUCCESS = "BUY_STOCK_SUCCESS";
/**
 * 
 * @param {
    "createdAt": "2019-04-03T17:17:23.532Z",
    "updatedAt": "2019-04-03T17:17:23.532Z",
    "id": 11,
    "stock": "AMZN",
    "initialValue": 10.85,
    "initialQuantity": 2,
    "soldPositions": [],
    "boughtOn": 1551744000
    } data
 */

export const buyStockSuccess = data => ({
  type: BUY_STOCK_SUCCESS,
  payload: {
    data
  }
});

export const BUY_STOCK_FAILED = "BUY_STOCK_FAILED";

export const buyStockFailed = err => ({
  type: BUY_STOCK_FAILED,
  payload: {
    err
  }
});

export const SELL_STOCKS = "SELL_STOCK";

export const sellStocks = stocks => ({
  type: SELL_STOCKS,
  payload: {
    stocks
  }
});

export const SELL_STOCKS_SUCCESS = "SELL_STOCK_SUCCESS";

export const sellStocksSuccess = () => ({
  type: SELL_STOCKS_SUCCESS
});

export const SELL_STOCKS_FAILED = "SELL_STOCK_FAILED";

export const sellStocksFailed = err => ({
  type: SELL_STOCKS_FAILED,
  payload: {
    err
  }
});

export const DELETE_STOCKS = "DELETE_STOCKS";

export const deleteStocks = stocks => ({
  type: DELETE_STOCKS,
  payload: {
    stocks
  }
});

export const DELETE_STOCKS_SUCCESS = "DELETE_STOCKS_SUCCESS";

export const deleteStocksSuccess = () => ({
  type: DELETE_STOCKS_SUCCESS
});

export const DELETE_STOCKS_FAILED = "DELETE_STOCKS_FAILED";
export const deleteStocksFailed = err => ({
  type: DELETE_STOCKS_FAILED,
  payload: {
    err
  }
});

export const FETCH_TABLE_DATA = "FETCH_TABLE_DATA";

export const fetchTableData = () => ({
  type: FETCH_TABLE_DATA
});

export const FETCH_TABLE_DATA_SUCCESS = "FETCH_TABLE_DATA_SUCCESS";
export const fetchTableDataSuccess = data => ({
  type: FETCH_TABLE_DATA_SUCCESS,
  payload: {
    data
  }
});

export const FETCH_TABLE_DATA_FAILED = "FETCH_TABLE_DATA_FAILED";

export const fetchTableDataFailed = err => ({
  type: FETCH_TABLE_DATA_FAILED,
  payload: {
    err
  }
});
