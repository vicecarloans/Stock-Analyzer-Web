import React, { PureComponent } from "react";
import { UniversalHeader, UniversalFooter } from "components/common";
import PropTypes from "prop-types";
import { fetchUserSuccess, fetchUserFailed } from "flux/ducks/auth";

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
    const { user, store } = this.props;

    if (!user) {
      //In case server doesn't dispatch
      store.dispatch(fetchUserFailed());
    }
    if (user) {
      store.dispatch(fetchUserSuccess(JSON.parse(user)));
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
