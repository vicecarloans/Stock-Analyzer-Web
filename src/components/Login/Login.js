import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "server/routes";
import { connect } from "react-redux";
import {
  TextInput,
  InlineLoading,
  InlineNotification
} from "carbon-components-react";
import { login, dismissLoginError } from "flux/ducks/auth";
import {
  loginLoadingSelector,
  loginErrorSelector
} from "flux/ducks/auth/selectors";
import combineSelectors from "utils/combineSelectors";
import { reduxForm, Field } from "redux-form";
import { Authentication, SAButton } from "components/common";
import { ForgotPassword, RegisterWithUs, SALink } from "./Login.styles";

export class Login extends Component {
  renderField = ({ input, placeholder, label, type }) => (
    <TextInput
      {...input}
      placeholder={placeholder}
      labelText={label}
      id={label}
      type={type}
      light={false}
    />
  );

  handleLogin = () => {
    this.props.login();
  };

  dismissError = () => {
    this.props.dismissLoginError();
  };

  render() {
    return (
      <Authentication header="Login">
        {this.props.err && (
          <InlineNotification
            kind="error"
            title="Wrong email or password"
            subtitle="Please try again"
            onCloseButtonClick={this.dismissError}
          />
        )}
        <form className="sa--form">
          <Field
            component={this.renderField}
            name="email"
            type="text"
            placeholder="e.g. John.Doe@gmail.com"
            label="Email"
          />
          <Field
            component={this.renderField}
            name="password"
            type="password"
            placeholder=""
            label="Password"
          />
        </form>
        <SAButton style={{ margin: "40px 0px" }} onClick={this.handleLogin}>
          {this.props.loading ? (
            <InlineLoading description="Logging In..." />
          ) : (
            "Login"
          )}
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

const LoginForm = reduxForm({
  form: "login"
})(Login);

const mapStateToProps = combineSelectors({
  loading: loginLoadingSelector,
  err: loginErrorSelector
});

const mapDispatchToProps = {
  login,
  dismissLoginError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
