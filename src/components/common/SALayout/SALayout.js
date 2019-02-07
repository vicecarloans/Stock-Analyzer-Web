import React, { PureComponent } from "react";
import { DarkBackground, ContentWrapper } from "./SALayout.styles";
import { UniversalHeader, UniversalFooter } from "components/common";
export default class SALayout extends PureComponent {
  componentDidMount() {
    if (window) {
      const SmoothScroll = require("static/js/smooth-scroll.min.js");
      const scroll = SmoothScroll.init('a[href*="#"]');
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
