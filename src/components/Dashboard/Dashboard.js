import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  DashboardContainer,
  ChartContainer,
  SubContainer,
  StocksContainer,
  ActionContainer,
  BuyStockContainer,
  SellStockContainer,
  ToolsContainer,
  HistoricalChartContainer
} from "./Dashboard.styles";
import {
  selectedStockSelector,
  startQuoteChannel,
  stopQuoteChannel,
  initStockDataIntraday,
  initStockDataRange,
  rangeChartSelector
} from "flux/ducks/stream";
import { getCompanyData } from "flux/ducks/company";
import { toggleCompanyModal } from "flux/ducks/modals";
import {
  DropdownV2,
  Button,
  Tabs,
  Tab,
  ContentSwitcher,
  Switch
} from "carbon-components-react";
import { INDICATORS } from "constants/indicators";
import combineSelectors from "utils/combineSelectors";
import StockChart from "./StockChart";
import StockList from "./StockList";
import CompanyModal from "./CompanyModal";

export class Dashboard extends Component {
  static propTypes = {
    selectedStock: PropTypes.string,
    stopQuoteChannel: PropTypes.func.isRequired,
    initStockDataIntraday: PropTypes.func.isRequired,
    startQuoteChannel: PropTypes.func.isRequired,
    initStockDataRange: PropTypes.func.isRequired,
    selectedRange: PropTypes.oneOf(["1d", "1m", "3m", "6m", "1y"]).isRequired,
    getCompanyData: PropTypes.func.isRequired,
    toggleCompanyModal: PropTypes.func.isRequired
  };
  static defaultProps = {
    selectedStock: ""
  };

  state = {
    indicator: null
  };
  handleIndicator = ({ selectedItem }) => {
    this.setState({ indicator: selectedItem });
  };
  openSeeMore = () => {
    this.props.toggleCompanyModal();
    this.props.getCompanyData(this.props.selectedStock);
  };

  componentWillUnmount() {
    const { stopQuoteChannel } = this.props;
    stopQuoteChannel();
  }
  generateStockDataIntraday = () => {
    const {
      initStockDataIntraday,
      selectedStock,
      startQuoteChannel
    } = this.props;
    initStockDataIntraday(selectedStock);
    startQuoteChannel(selectedStock);
  };
  generateStockRange = range => {
    const { initStockDataRange, stopQuoteChannel } = this.props;
    stopQuoteChannel();
    initStockDataRange(range);
  };
  handleSwitchRange = data => {
    switch (data.index) {
      case 0:
        this.generateStockDataIntraday();
        break;
      case 1:
        this.generateStockRange("1m");
        break;
      case 2:
        this.generateStockRange("3m");
        break;
      case 3:
        this.generateStockRange("6m");
        break;
      case 4:
        this.generateStockRange("1y");
        break;
      default:
        this.generateStockDataIntraday();
    }
  };

  getSelectedRange = () => {
    const { selectedRange } = this.props;
    switch (selectedRange) {
      case "1d":
        return 0;
      case "1m":
        return 1;
      case "3m":
        return 2;
      case "6m":
        return 3;
      case "1y":
        return 4;
      default:
        return 0;
    }
  };
  render() {
    return (
      <DashboardContainer>
        <CompanyModal />
        <ChartContainer>
          <ToolsContainer>
            <DropdownV2
              className="sa--drop-down-indicator"
              label="Indicators"
              itemToString={item => item}
              items={INDICATORS}
              onChange={this.handleIndicator}
            />
            <Button className="sa--btn-see-more" onClick={this.openSeeMore}>
              More Info{" "}
              <i style={{ marginLeft: "2px" }} className="material-icons">
                add_circle_outline
              </i>
            </Button>
          </ToolsContainer>
          <HistoricalChartContainer>
            <StockChart indicator={this.state.indicator} />
            <ContentSwitcher
              onChange={this.handleSwitchRange}
              selectedIndex={this.getSelectedRange()}
              className="sa--range-switcher"
            >
              <Switch name="1d" text="1d (Real Time)" />
              <Switch name="1m" text="1m" />
              <Switch name="3m" text="3m" />
              <Switch name="6m" text="6m" />
              <Switch name="1y" text="1y" />
            </ContentSwitcher>
          </HistoricalChartContainer>
        </ChartContainer>
        <SubContainer>
          <StocksContainer>
            <StockList />
          </StocksContainer>
          <ActionContainer>
            <BuyStockContainer />
            <SellStockContainer />
          </ActionContainer>
        </SubContainer>
      </DashboardContainer>
    );
  }
}

const mapStateToProps = combineSelectors({
  selectedStock: selectedStockSelector,
  selectedRange: rangeChartSelector
});

const mapDispatchToProps = {
  stopQuoteChannel,
  initStockDataIntraday,
  startQuoteChannel,
  initStockDataRange,
  toggleCompanyModal,
  getCompanyData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
