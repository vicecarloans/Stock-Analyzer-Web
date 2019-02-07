import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  SinglePlanWrapper,
  Type,
  Amount,
  Price,
  Description
} from "./Plans.styles";

export default class PlanType extends PureComponent {
  static defaultProps = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    promotion: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };
  render() {
    const { color, type, price, description, promotion } = this.props;
    return (
      <SinglePlanWrapper className="wow fadeInUp animated" color={color}>
        <Type>{type}</Type>
        <Price>{price}</Price>
        <Amount>{promotion}</Amount>
        <Description>{description}</Description>
      </SinglePlanWrapper>
    );
  }
}
