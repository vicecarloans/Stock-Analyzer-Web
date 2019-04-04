import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  PortfolioWrapper,
  Title,
  TitleSection,
  AddStockSection,
  AddStockTitle,
  DataSquareSection,
  PerformanceDataSection,
  HistoricalDataSection
} from "./Portfolio.styles";

import { PerformanceData } from "./PerformanceData";
import DataSquare from "./DataSquare";
import HistoricalTable from "./HistoricalTable";
import { SAButton } from "components/common";
import {
  toggleAddStock,
  addStockModalSelector,
  deleteStockModalSelector,
  sellStockModalSelector
} from "flux/ducks/modals";
import {
  fetchPortfolioPerformance,
  fetchPortfolioChart,
  fetchPortfolioBreakdown,
  fetchHoldings,
  fetchTableData
} from "flux/ducks/portfolio";
import combineSelectors from "utils/combineSelectors";
import { AddStockModal, DeleteStockModal, SellStockModal } from "./Modals";

export class Portfolio extends PureComponent {
  componentDidMount() {
    const {
      fetchPortfolioPerformance,
      fetchPortfolioChart,
      fetchPortfolioBreakdown,
      fetchHoldings,
      fetchTableData
    } = this.props;
    fetchPortfolioPerformance();
    fetchPortfolioChart();
    fetchPortfolioBreakdown();
    fetchHoldings();
    fetchTableData();
  }
  addStock = () => {
    const { toggleAddStock } = this.props;
    toggleAddStock();
  };

  renderCreateModal = () => {
    const { shouldOpenAddStock } = this.props;
    return <AddStockModal open={shouldOpenAddStock} />;
  };

  renderDeleteModal = () => {
    const { shouldOpenDeleteStock } = this.props;
    return <DeleteStockModal open={shouldOpenDeleteStock} />;
  };

  renderSellModal = () => {
    const { shouldOpenSellStock } = this.props;
    return <SellStockModal open={shouldOpenSellStock} />;
  };
  /**
 * acquisitionCost(pin): 653.65
realizedPL(pin): 179.8
totalInvestment(pin): 653.65
totalRevenue(pin): 201.5
 */
  render() {
    return (
      <PortfolioWrapper>
        {this.renderCreateModal()}
        {this.renderDeleteModal()}
        {this.renderSellModal()}
        <TitleSection>
          <Title>My Portfolio</Title>
        </TitleSection>
        <AddStockSection>
          <SAButton onClick={this.addStock}>
            <AddStockTitle>
              <i className="material-icons">add</i> Stock
            </AddStockTitle>
          </SAButton>
        </AddStockSection>
        <DataSquareSection>
          <DataSquare
            key="Acquisition Cost"
            header="Acquisition Cost"
            body="acquisitionCost"
          />
          <DataSquare
            key="Realized P/L"
            header="Realized P/L"
            body="realizedPL"
          />
          <DataSquare key="Revenue" header="Revenue" body="totalRevenue" />
        </DataSquareSection>
        <PerformanceDataSection>
          <PerformanceData />
        </PerformanceDataSection>
        <HistoricalDataSection>
          <HistoricalTable />
        </HistoricalDataSection>
      </PortfolioWrapper>
    );
  }
}

const mapStateToProps = combineSelectors({
  shouldOpenAddStock: addStockModalSelector,
  shouldOpenDeleteStock: deleteStockModalSelector,
  shouldOpenSellStock: sellStockModalSelector
});

const mapDispatchToProps = {
  toggleAddStock,
  fetchPortfolioPerformance,
  fetchPortfolioChart,
  fetchPortfolioBreakdown,
  fetchHoldings,
  fetchTableData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
