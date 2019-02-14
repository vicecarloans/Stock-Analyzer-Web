import React, { Component } from "react";
import { Router } from "server/routes";
import { SAButton } from "components/common";
import PropTypes from "prop-types";

import { registerDone } from "flux/ducks/auth/actions";
import { connect } from "react-redux";
import { SuccessWord, SuccessWrapper } from "./Register.styles";

class RegisterSuccess extends Component {
  static propTypes = {
    registerDone: PropTypes.func.isRequired
  };

  componentDidMount() {
    Router.prefetchRoute("/login");
  }

  handleSignup = () => {
    Router.pushRoute("/login");
    this.props.registerDone();
  };

  render() {
    return (
      <SuccessWrapper>
        <img src="/static/images/success.png" alt="Register Success Icon" />
        <SuccessWord>Enjoy your subscription with us</SuccessWord>
        <SAButton onClick={this.handleSignup}>Back To Login</SAButton>
      </SuccessWrapper>
    );
  }
}

const MapDispatchToProps = {
  registerDone
};
export default connect(
  null,
  MapDispatchToProps
)(RegisterSuccess);
