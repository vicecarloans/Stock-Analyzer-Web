import React, { PureComponent } from "react";
import { UniversalHeader, UniversalFooter } from "components/common";
import { DarkBackground, ContentWrapper } from "./SALayout.styles";

export default class SALayout extends PureComponent {
  componentDidMount() {
    if (window) {
      const WOW = require("static/js/wow.min.js");
      window.wow = new WOW.WOW({
        offset: 0,
        live: false
      });
      window.wow.init();
    }
  }

  render() {
    return (
      <DarkBackground>
        <UniversalHeader />
        <ContentWrapper>{this.props.children}</ContentWrapper>
        <UniversalFooter />
      </DarkBackground>
    );
  }
}
