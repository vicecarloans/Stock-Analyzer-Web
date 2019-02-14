import React, { Component } from "react";
import {
  goToNextStep,
  backToPreviousStep,
  openPaymentModal,
  registerUser
} from "flux/ducks/auth";
import {
  planSelector,
  loadingSelector,
  tokenSelector
} from "flux/ducks/auth/selectors";
import combineSelectors from "utils/combineSelectors";
import { Payment } from "components/Payment";
import { SAButton } from "components/common";
import PropTypes from "prop-types";
import { PLANS } from "constants/landing/plans";
import { calculateTax, calculateTotal } from "utils/charge";
import { STRIPE_PUBLIC_KEY } from "constants/stripe";

import { StripeProvider, Elements } from "react-stripe-elements";
import { connect } from "react-redux";
import { Loading } from "carbon-components-react";
import {
  ReviewHeader,
  FieldWrapper,
  FieldTitle,
  FieldValue,
  NavigationButtonWrapper,
  LineBreak,
  DashedLineBreak
} from "./Register.styles";

class ReviewPayment extends Component {
  static propTypes = {
    plan: PropTypes.number.isRequired,
    backToPreviousStep: PropTypes.func.isRequired,
    token: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    openPaymentModal: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired
  };

  static defaultProps = {
    token: ""
  };

  state = {
    stripe: null
  };

  componentDidMount() {
    this.setState({ stripe: window.Stripe(STRIPE_PUBLIC_KEY) });
  }

  extractPlan = () => {
    const { plan } = this.props;
    return PLANS.find(p => p.id === plan);
  };

  handlePayment = () => {
    this.props.openPaymentModal();
  };

  handleRegister = () => {
    this.props.registerUser();
  };

  render() {
    const plan = this.extractPlan();
    const total = calculateTotal(plan.price);
    return (
      <div style={{ width: "50%", marginTop: "20px" }}>
        <ReviewHeader>Order Review</ReviewHeader>
        <FieldWrapper>
          <FieldTitle>Account Type:</FieldTitle>
          <FieldValue>{plan.type}</FieldValue>
        </FieldWrapper>
        <FieldWrapper>
          <FieldTitle>Cost per month:</FieldTitle>
          <FieldValue>{`\$${plan.price}`}</FieldValue>
        </FieldWrapper>

        <LineBreak />

        <FieldWrapper>
          <FieldTitle>Subtotal:</FieldTitle>
          <FieldValue>{`\$${plan.price}`}</FieldValue>
        </FieldWrapper>

        <FieldWrapper>
          <FieldTitle>Tax:</FieldTitle>
          <FieldValue>{`\$${calculateTax(plan.price)}`}</FieldValue>
        </FieldWrapper>

        <DashedLineBreak />

        <FieldWrapper>
          <FieldTitle>Total: </FieldTitle>
          <FieldValue>{`\$${total}`}</FieldValue>
        </FieldWrapper>
        <NavigationButtonWrapper>
          <SAButton
            style={{ minWidth: "100px", maxWidth: "150px" }}
            onClick={this.props.backToPreviousStep}
            className="bx--col-sm-6"
          >
            Back
          </SAButton>

          {this.props.token ? (
            <SAButton
              style={{ minWidth: "100px", maxWidth: "150px" }}
              onClick={this.handleRegister}
              className="bx--col-sm-6"
            >
              Register
            </SAButton>
          ) : (
            <SAButton
              style={{ minWidth: "100px", maxWidth: "150px" }}
              onClick={this.handlePayment}
              className="bx--col-sm-6"
            >{`Pay \$${total}`}</SAButton>
          )}

          <Loading active={this.props.loading} />
          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <Payment amount={total} />
            </Elements>
          </StripeProvider>
        </NavigationButtonWrapper>
      </div>
    );
  }
}

const MapStateToProps = combineSelectors({
  plan: planSelector,
  loading: loadingSelector,
  token: tokenSelector
});

const MapDispatchToProps = {
  goToNextStep,
  backToPreviousStep,
  openPaymentModal,
  registerUser
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(ReviewPayment);
