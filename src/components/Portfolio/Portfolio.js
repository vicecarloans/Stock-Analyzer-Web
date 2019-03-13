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
import combineSelectors from "utils/combineSelectors";
import { AddStockModal, DeleteStockModal, SellStockModal } from "./Modals";

export class Portfolio extends PureComponent {
  addStock = () => {
    const { toggleAddStock } = this.props;
    toggleAddStock();
  };

  renderDataSquare = () => {
    const mockData = [
      {
        header: "Acquisition Cost",
        body: "$1000.00"
      },
      {
        header: "Realized P/L",
        body: "0.0",
        percentage: 0.0
      },
      {
        header: "Profit/Loss",
        body: "$3,400",
        percentage: 2.34
      },
      {
        header: "Holdings",
        body: "$4,300.00"
      },
      {
        header: "24H Profit/Loss",
        body: "$ -711.59",
        percentage: -5.7
      }
    ];
    return mockData.map(data => (
      <DataSquare
        key={data.header}
        header={data.header}
        body={data.body}
        percentage={data.percentage}
      />
    ));
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
        <DataSquareSection>{this.renderDataSquare()}</DataSquareSection>
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
  toggleAddStock
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
