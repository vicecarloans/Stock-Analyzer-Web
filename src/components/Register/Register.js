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
    REGISTER_STEPS.map(step => (
      <ProgressStep key={`${step.id}-${step.label}`} label={step.label} />
    ));

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
        <Button
          onClick={() => {
            this.props.goToNextStep();
          }}
        >
          Next
        </Button>
        <Button
          onClick={() => {
            this.props.backToPreviousStep();
          }}
        >
          Back
        </Button>
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
