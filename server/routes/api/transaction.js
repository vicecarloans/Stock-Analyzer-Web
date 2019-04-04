const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const resourceConstants = require("../../constants/resource");
const requireLogin = require("../../middlewares/requireLogin");
const { parsed: localEnv } = require("dotenv").config();

axios.default.defaults.baseURL = resourceConstants.RESOURCE_SERVER_URI;
axios.default.defaults.headers = {
  "Content-Type": "application/json"
};

const iexToken =
  process.env.IEXTRADING_PUBLISHABLE_TOKEN_STREAM ||
  localEnv.IEXTRADING_PUBLISHABLE_TOKEN_STREAM;

/**
 * This function will draw a timeline with action from buy to sell
 * params:
 * transactions: Array of Transaction object
 * Return:
 * {
 * 		"aapl": {
 * 			series: {
	* 			'2019-01-02/1': {action: "buy", price: ..., value: ..., id: 1, relatedStock: null, date: '2019-01-02'},
	* 			'2019-02-01/2': {action: "sell", price: ..., value: ..., id: 2, relatedStock: 1, date: '2019-02-01'},
	* 			...
	* 		},
    * 		timeline: ['2019-01-02/1', '2019-02-01/']
 * 		},
 * 		"googl": {
 * 			...
 * 		}
 *

 * }
 */
function normalizeSortedTimeLineAsc(transactions) {
  let data = {};
  transactions.forEach(transaction => {
    const {
      soldPositions,
      boughtOn,
      id: parentId,
      stock,
      initialValue,
      initialQuantity
    } = transaction;

    const buyDateString = new Date(boughtOn * 1000).toISOString().substr(0, 10);
    if (!data[stock]) {
      data[stock] = {
        series: {},
        timeline: []
      };
    }
    data[stock].series = {
      ...data[stock].series,
      [`${buyDateString}/${parentId}`]: {
        action: "buy",
        stock,
        value: initialValue,
        quantity: initialQuantity,
        relatedStock: null,
        date: buyDateString,
        id: parentId
      }
    };
    data[stock].timeline.push(`${buyDateString}/${parentId}`);
    soldPositions.forEach(sold => {
      const { soldOn, soldQuantity, soldPrice, id: childId } = sold;
      const soldDateString = new Date(soldOn * 1000)
        .toISOString()
        .substr(0, 10);
      data[stock].series = {
        ...data[stock].series,
        [`${soldDateString}/${childId}`]: {
          stock,
          value: soldPrice,
          action: "sell",
          quantity: soldQuantity,
          referenceStock: `${buyDateString}/${parentId}`,
          date: soldDateString,
          id: childId
        }
      };
      data[stock].timeline.push(`${soldDateString}/${childId}`);
    });
    data[stock].timeline.sort();
  });
  return { ...data };
}

/**
 * This function will draw a timeline with action from buy to sell
 * params:
 * transactions: Array of Transaction object
 * Return:
 * {
 * 		'aapl': {
 * 			series: {
 * 				'2019-01-02/1': {open: ..., value: ..., date: '2019-01-02'},
 * 				'2019-01-03': {close: ..., value: ..., date: '2019-02-01'},
 * 				...
 * 			}
 * 			timeline: ['2019-01-02', '2019-01-03']
 * 		},
 * 		'googl': {
 * 			...
 * 		}
 *
 * }
 */
// function normalizeTimelineIexData(data) {
// 	let stocks = {};
// 	let timeline = [];
// 	Object.keys(data).forEach(key => {
// 		//Normalize
// 		if (!stocks.key || !stocks.timeline) {
// 			stocks.key = {};
// 			stocks.timeline = [];
// 		}
// 		const { chart } = data[key];
// 		chart.forEach(summary => {
// 			stocks.key = {
// 				...series.data,
// 				[summary.date]: {
// 					...summary,
// 				},
// 			};
// 			stocks.timeline.push(summary.date);
// 		});
// 	});
// 	Object.keys(stocks).forEach(name => {
// 		stocks[name].timeline.sort();
// 		if (timeline.length < stocks[name].timeline.length) {
// 			timeline = stocks[name].timeline;
// 		}
// 	});
// 	return { ...stocks, timeline };
// }

router.get("/chart", requireLogin, async (req, res, next) => {
  try {
    const { data: apiData } = await axios.get("/api/trans/all", {
      headers: {
        Authorization: "Bearer " + req.token
      }
    });
    let all = [];
    apiData.forEach(d => {
      if (all.indexOf(d.stock) === -1) {
        all.push(d.stock);
      }
    });

    const portfolioTimeLine = normalizeSortedTimeLineAsc(apiData);
    if (all.length > 0) {
      const { data: iexData } = await axios.get(
        `https://cloud.iexapis.com/beta/stock/market/batch?symbols=${all.join(
          ","
        )}&types=chart&range=ytd&token=${iexToken}`
      );
      let portfolioValue = [];
      //Single stock first
      Object.keys(iexData).forEach(stock => {
        const portfolioStock = portfolioTimeLine[stock];
        iexData[stock].chart.forEach(chart => {
          const events = portfolioStock.timeline.filter(
            timeline => timeline.substr(0, 10) <= chart.date
          );

          const currQty = events.reduce((acc, val) => {
            const batch = portfolioStock.series[val];
            if (batch.action == "buy") {
              acc += batch.quantity;
            }
            if (batch.action == "sell") {
              acc -= batch.quantity;
            }
            return acc;
          }, 0);

          const index = portfolioValue.findIndex(v => v.date == chart.date);
          if (index != -1) {
            portfolioValue[index].value += currQty * chart.close;
          } else {
            portfolioValue.push({
              date: chart.date,
              value: currQty * chart.close
            });
          }
        });
      });
      let performance = {
        portfolioMIN: portfolioValue[0].value,
        portfolioMAX: portfolioValue[0].value,
        portfolioChange: 0,
        portfolioChangePercent: 0
      };

      portfolioValue.forEach(({ value }) => {
        if (value < performance.portfolioMIN) performance.portfolioMIN = value;
        if (value > performance.portfolioMAX) performance.portfolioMAX = value;
      });

      performance.portfolioChange =
        portfolioValue[portfolioValue.length - 1].value -
        portfolioValue[0].value;

      performance.portfolioChangePercent =
        portfolioValue[portfolioValue.length - 1].value /
          portfolioValue[0].value -
        1;
      return res.json({
        performance,
        portfolioValue
      });
    }

    return res.json([]);
  } catch (err) {
    next({
      status: err.response.data.status,
      message: err.response.data.message
    });
  }
});

router.post("/buy", requireLogin, async (req, res, next) => {
  try {
    const { data } = await axios.post("/api/trans/buy", req.body, {
      headers: {
        Authorization: "Bearer " + req.token
      }
    });

    return res.json(data);
  } catch (err) {
    next({
      status: err.response.data.status,
      message: err.response.data.message
    });
  }
});

router.post("/sell", requireLogin, async (req, res, next) => {
  try {
    const { data } = await axios.post("/api/trans/sell", req.body, {
      headers: {
        Authorization: "Bearer " + req.token
      }
    });

    return res.json(data);
  } catch (err) {
    next({
      status: err.response.data.status,
      message: err.response.data.message
    });
  }
});

router.delete("/", requireLogin, async (req, res, next) => {
  try {
    const { data } = await axios.delete("/api/trans", {
      data: req.body,
      headers: {
        Authorization: "Bearer " + req.token
      }
    });
    return res.json(data);
  } catch (err) {
    next({
      status: err.response.data.status,
      message: err.response.data.message
    });
  }
});

router.get("/performance", requireLogin, async (req, res, next) => {
  try {
    const { data } = await axios.get("/api/trans/performance", {
      headers: {
        Authorization: "Bearer " + req.token
      }
    });
    return res.json(data);
  } catch (err) {
    next({
      status: err.response.data.status,
      message: err.response.data.message
    });
  }
});

router.get("/holdings", requireLogin, async (req, res, next) => {
  try {
    const { data } = await axios.get("/api/trans/holdings", {
      headers: {
        Authorization: "Bearer " + req.token
      }
    });
    return res.json(data);
  } catch (err) {
    next({
      status: err.response.data.status,
      message: err.response.data.message
    });
  }
});

router.get("/breakdowns", requireLogin, async (req, res, next) => {
  try {
    const { data: apiData } = await axios.get("/api/trans/holdings", {
      headers: {
        Authorization: "Bearer " + req.token
      }
    });
    const portfolioData = normalizeSortedTimeLineAsc(apiData);
    let performance = {
      mostProfit: {
        name: null,
        value: 0
      },
      leastProfit: {
        name: null,
        value: 0
      },
      worstStock: {
        name: null,
        value: 0
      },
      bestStock: {
        name: null,
        value: 0
      }
    };
    const portfolioKey = Object.keys(portfolioData);
    for (let stock of portfolioKey) {
      const { series, timeline } = portfolioData[stock];
      const firstDate = timeline[0].substr(0, 10);
      let first = [];
      for (let i = 0; i < timeline.length; i++) {
        //Get all transaction on that first day
        if (!timeline[i].includes(firstDate)) break;
        first.push(timeline[i]);
      }
      const lastDate = timeline[timeline.length - 1].substr(0, 10);

      const profitFirstDay = first.reduce((acc, val) => {
        const data = series[val];

        if (data.action == "sell") {
          acc += data.value * data.quantity;
        } else {
          acc += data.quantity * data.value;
        }
        return acc;
      }, 0);

      const { data: endInvestment } = await axios.get(
        `https://cloud.iexapis.com/beta/stock/${stock}/chart/ytd/${lastDate.replace(
          /-/g,
          ""
        )}?chartByDay=true&chartLast=1&token=${iexToken}`
      );

      let currQty = 0;
      let profitLastDay = timeline.reduce((acc, val) => {
        const data = series[val];

        if (data.action == "sell") {
          acc += data.value * data.quantity;
          currQty -= data.quantity;
        } else {
          currQty += data.quantity;
        }
        return acc;
      }, 0);
      let investmentLast =
        endInvestment.length > 0
          ? endInvestment[0].close
          : series[timeline[timeline.length - 1]].value;
      profitLastDay += currQty * investmentLast;
      const profitByStock = profitLastDay - profitFirstDay;
      const percentage = (profitLastDay / profitFirstDay - 1) * 100;
      if (!performance.leastProfit.name) {
        performance.leastProfit.name = stock;
        performance.leastProfit.value = profitByStock;
      }
      if (!performance.worstStock.name) {
        performance.worstStock.name = stock;
        performance.worstStock.value = percentage;
      }
      if (performance.leastProfit.value > profitByStock) {
        performance.leastProfit.name = stock;
        performance.leastProfit.value = profitByStock;
      }
      if (performance.mostProfit.value < profitByStock) {
        performance.mostProfit.name = stock;
        performance.mostProfit.value = profitByStock;
      }
      if (performance.worstStock.value > percentage) {
        performance.worstStock.name = stock;
        performance.worstStock.value = percentage;
      }
      if (performance.bestStock.value < percentage) {
        performance.bestStock.name = stock;
        performance.bestStock.value = percentage;
      }
    }
    // Object.keys(portfolioData).forEach(async stock => {});
    return res.json({ ...performance });
  } catch (err) {
    next({
      status: err.response.data.status,
      message: err.response.data.message
    });
  }
});

router.get("/table", requireLogin, async (req, res, next) => {
  try {
    const { data: apiData } = await axios.get("/api/trans/holdings", {
      headers: {
        Authorization: "Bearer " + req.token
      }
    });
    let table = [];
    if (apiData.length > 0) {
      for (let transaction of apiData) {
        const { data: currentPrice } = await axios.get(
          `https://cloud.iexapis.com/beta/stock/${
            transaction.stock
          }/price?token=${iexToken}`
        );
        let curQty = transaction.initialQuantity;
        let revenue = 0;

        transaction.soldPositions.forEach(sold => {
          curQty -= sold.soldQuantity;
          revenue += sold.soldQuantity * sold.soldPrice;
        });
        let endVal = revenue + curQty * currentPrice;
        let startVal = transaction.initialValue * transaction.initialQuantity;
        table.push({
          id: transaction.id + "/" + transaction.stock,
          name: transaction.stock,
          price: currentPrice,
          total: curQty * currentPrice,
          profitLoss: endVal - startVal,

          change: (endVal / startVal - 1) * 100,
          type: endVal > startVal ? 1 : 0
        });
      }
    }
    res.json(table);
  } catch (err) {
    next({
      status: err.response.data.status,
      message: err.response.data.message
    });
  }
});

module.exports = router;
