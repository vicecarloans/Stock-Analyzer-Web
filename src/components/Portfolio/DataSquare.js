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

export class DataSquare extends PureComponent {
  static propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    percentage: PropTypes.number
  };

  static defaultProps = {
    percentage: null
  };

  render() {
    const { header, body, percentage } = this.props;
    return (
      <DataSquareDiv>
        <DataSquareHeader>
          <DataSquareHeaderText>{header}</DataSquareHeaderText>
        </DataSquareHeader>
        <DataSquareBody>
          {percentage ? (
            <DataSquareBodyTextPercentage
              percentage={percentage}
            >{`${body} (${percentage} %)`}</DataSquareBodyTextPercentage>
          ) : (
            <DataSquareBodyText>{body}</DataSquareBodyText>
          )}
        </DataSquareBody>
      </DataSquareDiv>
    );
  }
}

export default DataSquare;
