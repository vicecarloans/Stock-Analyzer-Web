import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "server/routes";
import { connect } from "react-redux";
import { TextInput } from "carbon-components-react";
import { Authentication, SAButton } from "components/common";
import { ForgotPassword, RegisterWithUs, SALink } from "./Login.styles";

export class Login extends Component {
  render() {
    return (
      <Authentication header="Login">
        <TextInput
          placeholder="e.g. John.Doe@gmail.com"
          labelText="Email"
          id="email"
          light={false}
          invalid={false}
          invalidText="Email must be valid and not blank"
          onChange={() => {}}
        />
        <TextInput
          placeholder=""
          labelText="Password"
          id="password"
          light={false}
          type="password"
          invalid={false}
          invalidText="Password is required"
          onChange={() => {}}
        />
        <SAButton onClick={() => {}} style={{ margin: "40px 0px" }}>
          Login
        </SAButton>
        <Link prefetch route="forgotPassword">
          <ForgotPassword>Forgot Password</ForgotPassword>
        </Link>
        <RegisterWithUs>
          Don&apos;t have an account? Register with us{" "}
          <Link prefetch route="register">
            <SALink>Here</SALink>
          </Link>
        </RegisterWithUs>
      </Authentication>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
