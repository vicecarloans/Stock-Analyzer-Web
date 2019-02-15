import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userSelector } from "flux/ducks/auth/selectors";
import { PLANS } from "constants/landing/plans";
import { reduxForm, Field } from "redux-form";
import { TextInput } from "carbon-components-react";
import {
  ModeWrapper,
  Title,
  DashedLineBreak,
  Label,
  Value
} from "./Profile.styles";

class UserInfoForm extends Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired
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
      className="profile-input"
      id={label}
      type={type}
      light={false}
      invalid={touched && !!error}
      invalidText={error}
    />
  );

  getPlan = () =>
    PLANS.find(
      plan => plan.type.toLowerCase() === this.props.user.plan.toLowerCase()
    );
  getDay = () => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const date = new Date(this.props.user.chargeDate * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  render() {
    const plan = this.getPlan();
    return (
      <ModeWrapper>
        <Title>User Details:</Title>
        <DashedLineBreak />
        <form className="sa--form">
          <Field
            component={this.renderField}
            name="name"
            type="text"
            placeholder="e.g. John Doe"
            label="Full Name"
          />
          <Field
            component={this.renderField}
            name="title"
            type="text"
            placeholder="e.g. Financial Investor"
            label="Job Title"
          />
          <Field
            component={this.renderField}
            name="address"
            type="text"
            placeholder="e.g. 160 Kendal Avenue"
            label="Address"
          />
        </form>
        <Title>Account Details: </Title>
        <DashedLineBreak />
        <Label>Account plan:</Label>
        <Value>
          {plan.type} - <b>${plan.price}</b>
        </Value>
        <Label>Next Recurring Charge:</Label>
        <Value>{this.getDay()}</Value>
      </ModeWrapper>
    );
  }
}

const UserInfoReduxForm = reduxForm({ form: "profile" })(UserInfoForm);

const mapStateToProps = state => ({
  initialValues: userSelector(state)
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoReduxForm);
