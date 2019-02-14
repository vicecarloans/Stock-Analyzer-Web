import React, { Component } from "react";
import { SALayout } from "components/common";
import { Login as LoginComponent } from "components/Login";

export default class Login extends Component {
  render() {
    return (
      <SALayout>
        <LoginComponent />
      </SALayout>
    );
  }
}
