import React, { PureComponent } from "react";
import { DarkBackground, ContentWrapper } from "./SALayout.styles";
import { UniversalHeader } from "components/common";
export default class SALayout extends PureComponent {
  render() {
    return (
      <DarkBackground>
        <UniversalHeader />
        <ContentWrapper>{this.props.children}</ContentWrapper>
      </DarkBackground>
    );
  }
}
