import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  initStockDataIntraday,
  selectStock,
  startQuoteChannel,
  stopQuoteChannel,
  listDataSelector,
  listLoadingSelector,
  listErrorSelector,
  initStockLast,
  selectedStockSelector,
  filterStock,
  filteredListSelector,
  keywordListSelector,
  predictStock
} from "flux/ducks/stream";
import { STOCKS } from "constants/portfolio/stocks";
import combineSelectors from "utils/combineSelectors";
import { Loading, TextInput, TextInputSkeleton } from "carbon-components-react";
import { Table, AutoSizer, Column } from "react-virtualized";
import { SearchStockContainer } from "./Dashboard.styles";

export class StockList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    filteredList: PropTypes.array,
    keyword: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    err: PropTypes.object,
    startQuoteChannel: PropTypes.func.isRequired,
    stopQuoteChannel: PropTypes.func.isRequired,
    initStockDataIntraday: PropTypes.func.isRequired,
    selectStock: PropTypes.func.isRequired,
    selectedStock: PropTypes.string
  };

  static defaultProps = {
    err: null,
    selectedStock: null,
    filteredList: [],
    keyword: ""
  };

  generateStockData = stock => {
    this.props.selectStock(stock);

    this.props.initStockDataIntraday(stock);
    const { selectedStock } = this.props;
    this.props.predictStock(stock);
    this.props.stopQuoteChannel(selectedStock);

    this.props.startQuoteChannel(stock);
  };
  componentDidMount() {
    const { initStockLast, selectedStock } = this.props;
    initStockLast(STOCKS);
    if (!selectedStock) {
      this.generateStockData(STOCKS[0]);
    } else {
      this.generateStockData(selectedStock);
    }
  }

  handleRowClick = ({ event, index, rowData }) => {
    this.generateStockData(rowData.symbol);
  };

  handleFilterStock = e => {
    this.props.filterStock(e.target.value);
  };

  render() {
    const { loading, list, filteredList, keyword } = this.props;
    const displayList =
      keyword && filteredList && filteredList.length > 0 ? filteredList : list;
    return loading ? (
      <div>
        <TextInputSkeleton />
        <Loading withOverlay={false} />
      </div>
    ) : (
      <AutoSizer style={{ height: "100%" }}>
        {({ width, height }) => (
          <div style={{ width, height, overflow: "hidden" }}>
            <SearchStockContainer>
              <TextInput
                placeholder="Search Stocks..."
                labelText="Filter Stocks"
                hideLabel
                onChange={this.handleFilterStock}
                value={keyword}
                id="stock-filter"
                className="sa--stock-filter"
              />
            </SearchStockContainer>

            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={displayList.length}
              rowGetter={({ index }) => displayList[index]}
              onRowClick={this.handleRowClick}
            >
              <Column label="Symbol" dataKey="symbol" width={width / 2} />
              <Column label="Price" dataKey="lastSalePrice" width={width / 2} />
            </Table>
          </div>
        )}
      </AutoSizer>
    );
  }
}

const mapStateToProps = combineSelectors({
  list: listDataSelector,
  loading: listLoadingSelector,
  err: listErrorSelector,
  selectedStock: selectedStockSelector,
  filteredList: filteredListSelector,
  keyword: keywordListSelector
});

const mapDispatchToProps = {
  startQuoteChannel,
  stopQuoteChannel,
  initStockDataIntraday,
  selectStock,
  initStockLast,
  filterStock,
  predictStock
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockList);
