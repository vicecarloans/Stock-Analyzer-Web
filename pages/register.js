import React, { Component } from "react";
import { SALayout } from "components/common";
import { Register as RegisterComponent } from "components/Register";

export default class Register extends Component {
  render() {
    return (
      <SALayout>
        <RegisterComponent />
      </SALayout>
    );
  }
}
