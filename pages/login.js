import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SALayout } from "components/common";
import { Login as LoginComponent } from "components/Login";

export class Login extends Component {
  render() {
    return (
      <SALayout>
        <LoginComponent />
      </SALayout>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
