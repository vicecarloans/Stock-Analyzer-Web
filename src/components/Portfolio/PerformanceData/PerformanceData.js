import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  PerformanceDataDiv,
  PerformanceDataBody,
  OverviewPortfolioData,
  AccountingIncomeData,
  AccountingCashflowData,
  OverviewPortfolioChart
} from "./PerformanceData.styles";
import { Tabs, Tab } from "carbon-components-react";
import OverviewData from "./OverviewData";
import PortfolioChart from "./PortfolioChart";
import { IncomeStatement, CashflowStatement } from "./AccountingData";
import combineSelectors from "utils/combineSelectors";
import {
  chartSelector,
  breakdownsSelector,
  performanceSelector
} from "flux/ducks/portfolio";

export class PerformanceData extends Component {
  static propTypes = {
    chart: PropTypes.object.isRequired,
    breakdowns: PropTypes.object.isRequired
  };
  getOverviewData = () => {
    const { chart, breakdowns } = this.props;
    const overview = {
      portfolioMin: `$ ${chart.performance.portfolioMIN}`,
      portfolioMax: `$ ${chart.performance.portfolioMAX}`,
      portfolioChange: `$ ${chart.performance.portfolioChange}`,
      portfolioChangePercentage: parseFloat(
        (chart.performance.portfolioChangePercent * 100).toFixed(1)
      ),
      leastProfitable: {
        name: breakdowns.leastProfit.name,
        loss: `$ ${breakdowns.leastProfit.value.toFixed(2)}`
      },
      mostProfitable: {
        name: breakdowns.mostProfit.name,
        profit: `$ ${breakdowns.mostProfit.value.toFixed(2)}`
      },
      worstStock: {
        name: breakdowns.worstStock.name,
        percentage: parseFloat(breakdowns.worstStock.value.toFixed(2))
      },
      bestStock: {
        name: breakdowns.bestStock.name,
        percentage: parseFloat(breakdowns.bestStock.value.toFixed(2))
      }
    };
    return overview;
  };

  generateIncomeStatement = () => {
    const { performance } = this.props;

    const data = {
      totalInvestment: `$ ${performance.totalInvestment.toFixed(2)}`,
      totalRevenue: `$ ${performance.totalRevenue.toFixed(2)}`,
      realizedPL: `$ ${performance.realizedPL.toFixed(2)}`,
      taxExempt: "$0",
      taxPayable: `$ ${(performance.totalRevenue * 0.13).toFixed(2)}`
    };
    return data;
  };

  generateCashflowStatement = () => {
    const { performance } = this.props;
    const mockData = {
      totalInvestment: `$ ${performance.totalInvestment.toFixed(2)}`,
      totalRevenue: `$ ${performance.totalRevenue.toFixed(2)}`,
      netCashflow: `$ ${(
        performance.totalRevenue - performance.totalInvestment
      ).toFixed(2)}`
    };
    return mockData;
  };

  render() {
    return (
      <PerformanceDataDiv>
        <Tabs>
          <Tab className="sa--tab" label="Overview">
            <PerformanceDataBody>
              <OverviewPortfolioData>
                <OverviewData {...this.getOverviewData()} />
              </OverviewPortfolioData>
              <OverviewPortfolioChart>
                <PortfolioChart />
              </OverviewPortfolioChart>
            </PerformanceDataBody>
          </Tab>
          <Tab className="sa--tab" label="Accounting">
            <PerformanceDataBody>
              <AccountingIncomeData>
                <IncomeStatement {...this.generateIncomeStatement()} />
              </AccountingIncomeData>
              <AccountingCashflowData>
                <CashflowStatement {...this.generateCashflowStatement()} />
              </AccountingCashflowData>
            </PerformanceDataBody>
          </Tab>
        </Tabs>
      </PerformanceDataDiv>
    );
  }
}

const mapStateToProps = combineSelectors({
  performance: performanceSelector,
  chart: chartSelector,
  breakdowns: breakdownsSelector
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformanceData);
