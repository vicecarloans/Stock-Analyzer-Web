import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { OverviewPortfolioChartWrapper } from "./PerformanceData.styles";
import { format } from "d3-format";
import { timeFormat, timeParse } from "d3-time-format";
import { tsvParse } from "d3-dsv";
import { InlineLoading } from "carbon-components-react";
import { ChartCanvas, Chart } from "react-stockcharts";
import { LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  EdgeIndicator
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { last } from "react-stockcharts/lib/utils";
import { fitWidth } from "react-stockcharts/lib/helper";
import {
  chartDataSelector,
  chartLoadingSelector,
  chartPerformanceSelector
} from "flux/ducks/portfolio";
import combineSelectors from "utils/combineSelectors";

export class PortfolioChart extends Component {
  renderChart = () => {
    if (!this.props.loading) {
      if (this.props.data.length == 0) {
        return <p>No data available</p>;
      }
      const { data: initialData } = this.props;
      const { width, ratio } = this.props;
      const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
        d => d.date
      );
      const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
        initialData
      );
      const xExtents = [
        xAccessor(last(data)),
        xAccessor(data[data.length - 20])
      ];

      const height = 300;
      const margin = { left: 70, right: 70, top: 20, bottom: 30 };
      const gridHeight = height - margin.top - margin.bottom;
      const gridWidth = width - margin.left - margin.right;

      const showGrid = true;
      const yGrid = showGrid
        ? {
            innerTickSize: -1 * gridWidth,
            tickStrokeDasharray: "Solid",
            tickStrokeOpacity: 0.2,
            tickStrokeWidth: 1
          }
        : {};
      const xGrid = showGrid
        ? {
            innerTickSize: -1 * gridHeight,
            tickStrokeDasharray: "Solid",
            tickStrokeOpacity: 0.2,
            tickStrokeWidth: 1
          }
        : {};
      return (
        <ChartCanvas
          ratio={ratio}
          width={width}
          height={height}
          margin={margin}
          pointsPerPxThreshold={1}
          mouseMoveEvent={true}
          seriesName="MSFT"
          data={data}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
          xScale={xScale}
          xExtents={xExtents}
        >
          <Chart id={1} yExtents={d => [d.value]}>
            <XAxis
              axisAt="bottom"
              orient="bottom"
              ticks={6}
              stroke="#ffffff"
              tickStroke="#ffffff"
              {...xGrid}
            />
            <YAxis
              axisAt="left"
              orient="left"
              ticks={5}
              tickStroke="#ffffff"
              stroke="#000"
              {...yGrid}
            />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat("%Y-%m-%d")}
            />
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".2f")}
            />
            <EdgeIndicator
              itemType="last"
              orient="right"
              edgeAt="right"
              yAccessor={d => d.value}
              fill="#3d87ff"
            />
            <LineSeries
              yAccessor={d => d.value}
              stroke={
                this.props.performance.portfolioChangePercent > 1
                  ? "#19BE87"
                  : "#FF1744"
              }
            />

            <CrossHairCursor className="sa--crosshair" />
          </Chart>
        </ChartCanvas>
      );
    }

    return <InlineLoading description="Loading data..." />;
  };
  render() {
    return this.renderChart();
  }
}

const mapStateToProps = combineSelectors({
  performance: chartPerformanceSelector,
  data: chartDataSelector,
  loading: chartLoadingSelector
});

const mapDispatchToProps = {};

PortfolioChart = fitWidth(PortfolioChart);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioChart);
