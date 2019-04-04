import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  DataSquareDiv,
  DataSquareHeader,
  DataSquareHeaderText,
  DataSquareBody,
  DataSquareBodyText,
  DataSquareBodyTextPercentage
} from "./Portfolio.styles";
import { SkeletonText } from "carbon-components-react";
import { connect } from "react-redux";
import combineSelectors from "utils/combineSelectors";
import {
  performanceSelector,
  performanceLoadingSelector
} from "flux/ducks/portfolio";

export class DataSquare extends PureComponent {
  static propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    performance: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render() {
    const { header, body, loading, performance } = this.props;
    return (
      <DataSquareDiv>
        <DataSquareHeader>
          <DataSquareHeaderText>{header}</DataSquareHeaderText>
        </DataSquareHeader>
        <DataSquareBody>
          {loading ? (
            <SkeletonText />
          ) : (
            <DataSquareBodyText>
              $ {performance[body].toFixed(2)}
            </DataSquareBodyText>
          )}
        </DataSquareBody>
      </DataSquareDiv>
    );
  }
}

const MapStateToProps = combineSelectors({
  performance: performanceSelector,
  loading: performanceLoadingSelector
});
export default connect(MapStateToProps)(DataSquare);
