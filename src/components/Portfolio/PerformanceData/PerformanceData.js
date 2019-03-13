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

export class PerformanceData extends Component {
  getOverviewData = () => {
    const mockData = {
      portfolioChange: "$-711.59",
      portfolioChangePercentage: -5.7,
      portfolioMin: "$ 4,780.58",
      portfolioMax: "$ 5,601.56",
      leastProfitable: { name: "AAPL", loss: "$-711.59" },
      mostProfitable: { name: "GOOGL", profit: "$100.70" },
      worstStock: { name: "AAPL", percentage: -2.5 },
      bestStock: { name: "GOOGL", percentage: 1.5 }
    };
    return mockData;
  };

  generateIncomeStatement = () => {
    const mockData = {
      totalInvestment: "$0",
      totalRevenue: "$0",
      realizedPL: "$0",
      taxExempt: "$0",
      taxPayable: "$0"
    };
    return mockData;
  };

  generateCashflowStatement = () => {
    const mockData = {
      totalInvestment: "$0",
      totalRevenue: "$0",
      netCashflow: "$0"
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformanceData);
