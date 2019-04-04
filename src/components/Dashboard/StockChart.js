import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import combineSelectors from "utils/combineSelectors";
import {
  selectedStockSelector,
  stopQuoteChannel,
  chartLoadingSelector,
  chartDataSelector
} from "flux/ducks/stream";
import { Loading } from "carbon-components-react";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  CandlestickSeries,
  BarSeries,
  LineSeries,
  MACDSeries,
  StochasticSeries
} from "react-stockcharts/lib/series";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import {
  sma,
  macd,
  stochasticOscillator
} from "react-stockcharts/lib/indicator";

const candlesAppearance = {
  wickStroke: "#ffffff",
  fill: function fill(d) {
    return d.close > d.open ? "#19BE87" : "#FF1744";
  },
  stroke: "#ffffff",
  candleStrokeWidth: 1,
  widthRatio: 0.8,
  opacity: 1
};

const macdAppearance = {
  stroke: {
    macd: "#FF0000",
    signal: "#00F300"
  },
  fill: {
    divergence: "#4682B4"
  }
};

const mouseEdgeAppearance = {
  textFill: "#542605",
  stroke: "#05233B",
  strokeOpacity: 1,
  strokeWidth: 3,
  arrowWidth: 5,
  fill: "#BCDEFA"
};

const axisAppearance = {
  stroke: "#ffffff",
  tickStroke: "#ffffff"
};
const stoAppearance = {
  stroke: Object.assign({}, StochasticSeries.defaultProps.stroke)
};

export class StockChart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    selectedStock: PropTypes.string,
    stopQuoteChannel: PropTypes.func.isRequired,
    indicator: PropTypes.string
  };

  static defaultProps = {
    selectedStock: null,
    indicator: ""
  };

  feedMAData = () => {
    return sma()
      .options({ windowSize: 20, sourcePath: "close" })
      .merge((d, c) => {
        d.sma20 = c;
      })
      .accessor(d => d.sma20)
      .stroke("#ff6e49");
  };

  feedMACDData = () => {
    return macd()
      .options({ fast: 12, slow: 26, signal: 9 })
      .merge((d, c) => {
        d.macd = c;
      })
      .accessor(d => d.macd);
  };

  feedSTOData = () => {
    return stochasticOscillator()
      .options({ windowSize: 14, kWindowSize: 3, dWindowSize: 4 })
      .merge((d, c) => {
        d.fullSTO = c;
      })
      .accessor(d => d.fullSTO);
  };

  feedData = indicatorFuncs => {
    const { data: initialData, width, ratio } = this.props;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => d.date
    );
    let calculatedData = initialData;

    indicatorFuncs.forEach(indicator => {
      calculatedData = indicator(calculatedData);
    });
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );

    const height = 550;
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

    return {
      width,
      ratio,
      displayXAccessor,
      xAccessor,
      xScale,
      height,
      data,
      margin,
      xGrid,
      yGrid
    };
  };
  render() {
    const sma20 = this.feedMAData();
    const macd = this.feedMACDData();
    const fullSTO = this.feedSTOData();
    const graphData = this.feedData([sma20, macd, fullSTO]);
    return this.props.loading ? (
      <Loading withOverlay={false} />
    ) : (
      <ChartCanvas
        height={graphData.height}
        ratio={graphData.ratio}
        width={graphData.width}
        margin={graphData.margin}
        seriesName="MSFT"
        data={graphData.data}
        xScale={graphData.xScale}
        xAccessor={graphData.xAccessor}
        displayXAccessor={graphData.displayXAccessor}
        mouseMoveEvent={false}
        panEvent={true}
        zoomEvent={true}
      >
        <Chart
          id={1}
          yExtents={[d => [d.high, d.low], sma20.accessor()]}
          height={350}
        >
          <XAxis
            {...axisAppearance}
            axisAt="bottom"
            orient="bottom"
            ticks={6}
            {...graphData.xGrid}
          />
          <YAxis
            {...axisAppearance}
            axisAt="right"
            orient="right"
            {...graphData.yGrid}
          />
          <CandlestickSeries {...candlesAppearance} />
          {this.props.indicator === "AI Regression" && (
            <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()} />
          )}
          {this.props.indicator === "AI Regression" && (
            <CurrentCoordinate
              yAccessor={sma20.accessor()}
              fill={sma20.stroke()}
            />
          )}

          <MouseCoordinateX
            rectWidth={60}
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d %H:%M:%S")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={d => d.close}
            fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />
          <CrossHairCursor className="sa--crosshair" />
        </Chart>
        <Chart
          id={2}
          yExtents={d => [d.volume]}
          height={150}
          origin={(w, h) => [0, h - 300]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            {...axisAppearance}
            ticks={5}
            tickFormat={format(".1s")}
          />

          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".2s")}
          />

          <BarSeries
            yAccessor={d => d.volume}
            fill={d => (d.close > d.open ? "#19BE87" : "#FF1744")}
          />

          <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />

          <EdgeIndicator
            itemType="last"
            orient="left"
            edgeAt="left"
            yAccessor={d => d.volume}
            displayFormat={format(".4s")}
            fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />
        </Chart>
        {this.props.indicator === "MACD" && (
          <Chart
            id={3}
            height={150}
            yExtents={macd.accessor()}
            origin={(w, h) => [0, h - 150]}
            padding={{ top: 10, bottom: 10 }}
          >
            <XAxis {...axisAppearance} axisAt="bottom" orient="bottom" />
            <YAxis
              {...axisAppearance}
              axisAt="right"
              orient="right"
              ticks={2}
            />

            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat("%Y-%m-%d")}
              rectRadius={5}
              {...mouseEdgeAppearance}
            />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}
              {...mouseEdgeAppearance}
            />
            <MACDSeries yAccessor={d => d.macd} {...macdAppearance} />
          </Chart>
        )}
        {this.props.indicator === "Stochastic Oscillator" && (
          <Chart
            id={4}
            height={150}
            yExtents={[0, 100]}
            origin={(w, h) => [0, h - 150]}
            padding={{ top: 10, bottom: 10 }}
          >
            <XAxis
              {...axisAppearance}
              axisAt="bottom"
              orient="bottom"
              {...graphData.xGrid}
            />
            <YAxis
              {...axisAppearance}
              axisAt="right"
              orient="right"
              tickValues={[20, 50, 80]}
            />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat("%Y-%m-%d")}
              {...mouseEdgeAppearance}
            />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}
              {...mouseEdgeAppearance}
            />
            <StochasticSeries yAccessor={d => d.fullSTO} {...stoAppearance} />
          </Chart>
        )}
      </ChartCanvas>
    );
  }
}

const mapStateToProps = combineSelectors({
  selectedStock: selectedStockSelector,
  data: chartDataSelector,
  loading: chartLoadingSelector
});

const mapDispatchToProps = {
  stopQuoteChannel
};

StockChart = fitWidth(StockChart);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockChart);
