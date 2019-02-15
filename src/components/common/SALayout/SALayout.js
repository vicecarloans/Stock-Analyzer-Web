import React, { PureComponent } from "react";
import { UniversalHeader, UniversalFooter } from "components/common";
import PropTypes from "prop-types";
import { DarkBackground, ContentWrapper } from "./SALayout.styles";

export default class SALayout extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({})
  };

  static defaultProps = {
    user: null
  };
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
        <UniversalHeader user={this.props.user} />
        <ContentWrapper>{this.props.children}</ContentWrapper>
        <UniversalFooter />
      </DarkBackground>
    );
  }
}
