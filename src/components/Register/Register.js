import React, { Component } from "react";
import { Authentication } from "components/common";
import PropTypes from "prop-types";
import REGISTER_STEPS from "constants/register/stepper";
import combineSelectors from "utils/combineSelectors";
import {
  stepperSelector,
  goToNextStep,
  backToPreviousStep
} from "flux/ducks/auth";
import { connect } from "react-redux";
import {
  ProgressIndicator,
  ProgressStep,
  Button
} from "carbon-components-react";
import { StepIndicatorHeader, StepIndicatorSubHeader } from "./Register.styles";
import PickPlanComponent from "./PickPlan";
import RegisterForm from "./RegisterForm";
import ReviewPayment from "./ReviewPayment";
import RegisterSuccess from "./RegisterSuccess";

export class Register extends Component {
  static propTypes = {
    step: PropTypes.number
  };

  static defaultProps = {
    step: 0
  };

  getHeaderComponent = () => {
    const { step } = this.props;
    return [
      <StepIndicatorHeader key={`${REGISTER_STEPS[step].id}-header`}>
        {REGISTER_STEPS[step].header}
      </StepIndicatorHeader>,
      <StepIndicatorSubHeader key={`${REGISTER_STEPS[step].id}-subheader`}>
        {REGISTER_STEPS[step].subheader}
      </StepIndicatorSubHeader>
    ];
  };

  getSteps = () =>
    REGISTER_STEPS.map((step, i) => (
      <ProgressStep key={`${step.id}-${step.label}`} label={step.label} />
    ));

  renderPlanOptions = () => <PickPlanComponent />;

  renderRegisterForm = () => <RegisterForm />;

  renderReviewPayment = () => <ReviewPayment />;

  renderRegisterSuccess = () => <RegisterSuccess />;

  render() {
    const { step } = this.props;

    return (
      <Authentication
        headerAlign="flex-start"
        headerComponent={this.getHeaderComponent()}
      >
        <ProgressIndicator currentIndex={step}>
          {this.getSteps()}
        </ProgressIndicator>
        {step === 0 && this.renderPlanOptions()}
        {step === 1 && this.renderRegisterForm()}
        {step === 2 && this.renderReviewPayment()}
        {step === 3 && this.renderRegisterSuccess()}
      </Authentication>
    );
  }
}

const mapStateToProps = combineSelectors({
  step: stepperSelector
});

const mapDispatchToProps = {
  goToNextStep,
  backToPreviousStep
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
