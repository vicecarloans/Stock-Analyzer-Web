import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerPayment } from "flux/ducks/auth";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import combineSelectors from "utils/combineSelectors";
import { STRIPE_PUBLIC_KEY } from "constants/stripe";
import { bindActionCreators } from "redux";

export class Payment extends Component {
  onHandleToken = token => {
    this.props.registerPayment(token.id);
  };
  render() {
    return (
      <StripeCheckout
        name="Stock Analyzer"
        description="Plan checkout"
        amount={4999}
        token={this.onHandleToken}
        stripeKey={STRIPE_PUBLIC_KEY}
      />
    );
  }
}

const mapStateToProps = combineSelectors({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerPayment
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
