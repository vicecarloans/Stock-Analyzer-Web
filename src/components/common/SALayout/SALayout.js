import React, { PureComponent } from "react";
import { LinearGradient, DarkBackground } from "./SALayout.styles";

export default class SALayout extends PureComponent {
  render() {
    return (
      <DarkBackground>
        <LinearGradient />
        {this.props.children}
      </DarkBackground>
    );
  }
}
