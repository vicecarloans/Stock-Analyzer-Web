import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { SAButton } from "components/common";
import {
  SinglePlanWrapper,
  Type,
  Amount,
  Price,
  Description
} from "./Plans.styles";

export default class PlanType extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    promotion: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    canPick: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    canPick: false,
    onClick: () => {}
  };

  render() {
    const { color, type, price, description, promotion } = this.props;
    return (
      <SinglePlanWrapper className="wow fadeInUp animated" color={color}>
        <Type>{type}</Type>
        <Price>{`\$${price}`}</Price>
        <Amount>{promotion}</Amount>
        <Description>{description}</Description>
        {this.props.canPick && (
          <SAButton
            style={{ margin: "40px auto" }}
            onClick={this.props.onClick}
          >
            Continue
          </SAButton>
        )}
      </SinglePlanWrapper>
    );
  }
}
