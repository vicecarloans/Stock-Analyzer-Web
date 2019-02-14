import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PLANS } from "constants/landing/plans";
import { pickPlan, goToNextStep } from "flux/ducks/auth";
import { PlanType } from "components/Landing/Plans";

export class PickPlan extends PureComponent {
  static propTypes = {
    pickPlan: PropTypes.func.isRequired,
    goToNextStep: PropTypes.func.isRequired
  };

  handlePlanClick = id => {
    this.props.pickPlan(id);
    this.props.goToNextStep();
  };

  renderPlans = () =>
    PLANS.map(plan => (
      <div className="bx--col-xl-4 bx--col-lg-12 align-center" key={plan.id}>
        <PlanType
          color={plan.color}
          type={plan.type}
          price={`${plan.price}`}
          promotion={plan.promotion}
          description={plan.description}
          canPick
          onClick={() => this.handlePlanClick(plan.id)}
        />
      </div>
    ));

  render() {
    return (
      <div className="bx--grid grid-container plans">
        <div className="bx--row">{this.renderPlans()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  pickPlan,
  goToNextStep
};

export default connect(
  null,
  mapDispatchToProps
)(PickPlan);
