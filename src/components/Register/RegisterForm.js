import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, getFormMeta, isInvalid, submit } from "redux-form";
import { registerValidate, registerValidateAsync } from "utils/validation";
import { SAButton } from "components/common";
import { connect } from "react-redux";
import { TextInput, InlineLoading } from "carbon-components-react";
import { goToNextStep, backToPreviousStep } from "flux/ducks/auth";
import { NavigationButtonWrapper } from "./Register.styles";

const onSubmit = (values, dispatch) => {
  dispatch(goToNextStep());
};

class RegisterForm extends PureComponent {
  static propTypes = {
    isInvalid: PropTypes.bool.isRequired,
    goToNextStep: PropTypes.func.isRequired,
    backToPreviousStep: PropTypes.func.isRequired
  };

  renderField = ({
    input,
    placeholder,
    label,
    type,
    meta: { asyncValidating, touched, error }
  }) => (
    <TextInput
      {...input}
      placeholder={placeholder}
      labelText={label}
      id={label}
      type={type}
      light={false}
      invalid={touched && !!error}
      invalidText={error}
    />
  );

  handleClick = () => {
    this.props.submit("register");
  };

  render() {
    return (
      <form className="sa--form" onSubmit={this.props.handleSubmit}>
        <Field
          component={this.renderField}
          name="name"
          type="text"
          placeholder="e.g. John Doe"
          label="Full Name"
        />
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
        <Field
          component={this.renderField}
          name="confirmPassword"
          type="password"
          placeholder=""
          label="Confirm Password"
        />
        <div style={{ width: "60%", margin: "0 auto" }}>
          <NavigationButtonWrapper>
            <SAButton
              style={{ minWidth: "100px", maxWidth: "150px" }}
              onClick={this.props.backToPreviousStep}
              className="bx--col-sm-6"
            >
              Back
            </SAButton>
            <SAButton
              style={{ minWidth: "100px", maxWidth: "150px" }}
              onClick={this.handleClick}
              disabled={this.props.isInvalid || !!this.props.isValidatingAsync}
              className="bx--col-sm-6"
            >
              {this.props.isValidatingAsync ? (
                <InlineLoading
                  description="Validating..."
                  success={!this.props.isValidatingAsync}
                />
              ) : (
                "Continue"
              )}
            </SAButton>
          </NavigationButtonWrapper>
        </div>
      </form>
    );
  }
}
const MapStateToProps = state => ({
  isInvalid: isInvalid("register")(state),
  meta: getFormMeta("register")(state),
  isValidatingAsync: state.form.register && state.form.register.asyncValidating
});

const MapDispatchToProps = {
  goToNextStep,
  backToPreviousStep,
  submit
};

const RegisterReduxForm = reduxForm({
  form: "register",
  validate: registerValidate,
  asyncValidate: registerValidateAsync,
  destroyOnUnmount: false,
  asyncChangeFields: ["email"],
  onSubmit
})(RegisterForm);

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(RegisterReduxForm);
