import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PlansWrapper, Title, SubTitle } from "./Plans.styles";
import { SAButton } from "components/common";
import { PLANS } from "constants/landing/plans";
import PlanType from "./PlanType";

export class Plans extends Component {
  renderPlan = () => {
    return PLANS.map(plan => (
      <div className="bx--col-lg-4 bx--col-md-12" key={plan.id}>
        <PlanType
          color={plan.color}
          type={plan.type}
          price={plan.price}
          promotion={plan.promotion}
          description={plan.description}
        />
      </div>
    ));
  };
  render() {
    return (
      <PlansWrapper id="plan">
        <Title>Service Plans</Title>
        <SubTitle>Our services come with different offers</SubTitle>
        <SAButton
          onClick={() => {}}
          style={{ minWidth: 200, minHeight: 52, fontSize: 16 }}
        >
          Join free for a month
        </SAButton>
        <div className="bx--grid container plans">
          <div className="bx--row">{this.renderPlan()}</div>
        </div>
      </PlansWrapper>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plans);
