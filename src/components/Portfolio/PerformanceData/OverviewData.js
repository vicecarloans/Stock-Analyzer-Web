import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  OverviewPortfolioDataWrapper,
  PortfolioChangeWrapper,
  PortfolioTitle,
  PortfolioDataWithPercentage,
  MiniPortfolioChangeWrapper,
  MiniPortfolioTitle,
  MiniPortfolioDataWithoutPercentage,
  MiniPortfolioChangeSection,
  MiniPortfolioDataWithPercentage,
  MiniPortfolioDataSection
} from "./PerformanceData.styles";
import { SkeletonText } from "carbon-components-react";
import { connect } from "react-redux";
import combineSelectors from "utils/combineSelectors";
import {
  chartLoadingSelector,
  breakdownsLoadingSelector
} from "flux/ducks/portfolio";
class OverviewData extends PureComponent {
  static propTypes = {
    portfolioChange: PropTypes.string.isRequired,
    portfolioChangePercentage: PropTypes.number.isRequired,
    portfolioMin: PropTypes.string.isRequired,
    portfolioMax: PropTypes.string.isRequired,
    leastProfitable: PropTypes.shape({
      name: PropTypes.string,
      loss: PropTypes.string
    }),
    mostProfitable: PropTypes.shape({
      name: PropTypes.string,
      profit: PropTypes.string
    }),
    worstStock: PropTypes.shape({
      name: PropTypes.string,
      percentage: PropTypes.number
    }),
    bestStock: PropTypes.shape({
      name: PropTypes.string,
      percentage: PropTypes.number
    }),
    chartLoading: PropTypes.bool.isRequired,
    breakdownsLoading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    leastProfitable: null,
    mostProfitable: null,
    worstStock: null,
    bestStock: null
  };
  render() {
    const {
      portfolioChange,
      portfolioChangePercentage,
      portfolioMin,
      portfolioMax,
      leastProfitable,
      mostProfitable,
      worstStock,
      bestStock,
      chartLoading,
      breakdownsLoading
    } = this.props;
    return (
      <OverviewPortfolioDataWrapper>
        <PortfolioChangeWrapper>
          <PortfolioTitle>Portfolio Change</PortfolioTitle>
          {chartLoading ? (
            <SkeletonText />
          ) : (
            <PortfolioDataWithPercentage
              percentage={portfolioChangePercentage}
            >{`${portfolioChange} (${portfolioChangePercentage} %)`}</PortfolioDataWithPercentage>
          )}
        </PortfolioChangeWrapper>
        <MiniPortfolioChangeWrapper border={true}>
          <MiniPortfolioChangeSection>
            <MiniPortfolioTitle>Portfolio MIN</MiniPortfolioTitle>
            {chartLoading ? (
              <SkeletonText />
            ) : (
              <MiniPortfolioDataWithoutPercentage>
                {portfolioMin}
              </MiniPortfolioDataWithoutPercentage>
            )}
          </MiniPortfolioChangeSection>
          <MiniPortfolioChangeSection>
            <MiniPortfolioTitle>Portfolio MAX</MiniPortfolioTitle>
            {chartLoading ? (
              <SkeletonText />
            ) : (
              <MiniPortfolioDataWithoutPercentage>
                {portfolioMax}
              </MiniPortfolioDataWithoutPercentage>
            )}
          </MiniPortfolioChangeSection>
        </MiniPortfolioChangeWrapper>
        <MiniPortfolioChangeWrapper border={true}>
          <MiniPortfolioChangeSection>
            <MiniPortfolioTitle>Least Profitable</MiniPortfolioTitle>

            {breakdownsLoading ? (
              <SkeletonText />
            ) : (
              <MiniPortfolioDataSection>
                <MiniPortfolioDataWithoutPercentage>
                  {leastProfitable.name} -
                </MiniPortfolioDataWithoutPercentage>
                &nbsp;
                <MiniPortfolioDataWithPercentage percentage={-1}>
                  {leastProfitable.loss}
                </MiniPortfolioDataWithPercentage>
              </MiniPortfolioDataSection>
            )}
          </MiniPortfolioChangeSection>
          <MiniPortfolioChangeSection>
            <MiniPortfolioTitle>Most Profitable</MiniPortfolioTitle>

            {breakdownsLoading ? (
              <SkeletonText />
            ) : (
              <MiniPortfolioDataSection>
                <MiniPortfolioDataWithoutPercentage>
                  {mostProfitable.name} -
                </MiniPortfolioDataWithoutPercentage>
                &nbsp;
                <MiniPortfolioDataWithPercentage percentage={1}>
                  {mostProfitable.profit}
                </MiniPortfolioDataWithPercentage>
              </MiniPortfolioDataSection>
            )}
          </MiniPortfolioChangeSection>
        </MiniPortfolioChangeWrapper>
        <MiniPortfolioChangeWrapper border={false}>
          <MiniPortfolioChangeSection>
            <MiniPortfolioTitle>Worst Stock</MiniPortfolioTitle>

            {breakdownsLoading ? (
              <SkeletonText />
            ) : (
              <MiniPortfolioDataSection>
                <MiniPortfolioDataWithoutPercentage>
                  {worstStock.name}
                </MiniPortfolioDataWithoutPercentage>
                &nbsp;
                <MiniPortfolioDataWithPercentage percentage={-1}>
                  ({worstStock.percentage} %)
                </MiniPortfolioDataWithPercentage>
              </MiniPortfolioDataSection>
            )}
          </MiniPortfolioChangeSection>
          <MiniPortfolioChangeSection>
            <MiniPortfolioTitle>Best Stock</MiniPortfolioTitle>

            {breakdownsLoading ? (
              <SkeletonText />
            ) : (
              <MiniPortfolioDataSection>
                <MiniPortfolioDataWithoutPercentage>
                  {bestStock.name}
                </MiniPortfolioDataWithoutPercentage>
                &nbsp;
                <MiniPortfolioDataWithPercentage percentage={1}>
                  ({bestStock.percentage} %)
                </MiniPortfolioDataWithPercentage>
              </MiniPortfolioDataSection>
            )}
          </MiniPortfolioChangeSection>
        </MiniPortfolioChangeWrapper>
      </OverviewPortfolioDataWrapper>
    );
  }
}

const MapStateToProps = combineSelectors({
  chartLoading: chartLoadingSelector,
  breakdownsLoading: breakdownsLoadingSelector
});

export default connect(MapStateToProps)(OverviewData);
