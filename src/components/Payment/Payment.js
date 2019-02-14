/*eslint-disable */
import React, { Component } from "react";
import {
  registerPayment,
  closePaymentModal,
  registerPaymentFailed
} from "flux/ducks/auth";
import { paymentModalSelector, errorSelector } from "flux/ducks/auth/selectors";
import { connect } from "react-redux";
import combineSelectors from "utils/combineSelectors";
import { Modal, TextInputSkeleton } from "carbon-components-react";
import PropTypes from "prop-types";
import { injectStripe, CardElement } from "react-stripe-elements";
import { bindActionCreators } from "redux";

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "18px",
        color: "#fff",
        iconColor: "#fff",
        width: "100%",
        fontFamily: '"IBM Plex Sans", sans serif',
        "::placeholder": {
          color: "rgba(255,255,255,0.31)"
        }
      },
      invalid: {
        color: "#960000",
        iconColor: "#960000"
      },
      focus: {
        backgroundColor: "#fff"
      }
    }
  };
};

class Payment extends Component {
  static propTypes = {
    amount: PropTypes.string.isRequired,
    open: PropTypes.bool
  };

  static defaultProps = {
    open: false
  };

  handleSubmit = async ev => {
    try {
      if (this.props.stripe) {
        const { token } = await this.props.stripe.createToken();
        if (token) {
          this.props.registerPayment(token.id);
          this.props.closePaymentModal();
        } else {
          throw new Error({ code: 1, message: "Unable to process request" });
        }
      }
    } catch (err) {
      this.props.registerPaymentFailed(err.message);
    }
  };

  render() {
    const { err, open, amount } = this.props;
    return (
      <Modal
        open={open}
        className="payment-modal"
        shouldSubmitOnEnter
        modalHeading="Subscription for Stock Analyzer"
        primaryButtonText={`Pay \$${amount}`}
        secondaryButtonText={null}
        iconDescription="Decline Payment"
        onRequestSubmit={this.handleSubmit}
        onRequestClose={() => {
          this.props.closePaymentModal();
        }}
      >
        <label>
          <p className="input-label">Card Details:</p>
          <CardElement
            className="form-control"
            hidePostalCode
            {...createOptions()}
          />
          <p className="payment-err">{err}</p>
        </label>
      </Modal>
    );
  }
}

const InjectedPayment = injectStripe(Payment);

const MapStateToProps = state => ({
  open: paymentModalSelector(state),
  err: errorSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerPayment,
      closePaymentModal
    },
    dispatch
  );

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(InjectedPayment);
