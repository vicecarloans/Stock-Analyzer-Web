import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Logo from "assets/images/logo.png";
import { Wrapper, HeaderLeft, HeaderRight } from "./UniversalHeader.styles";

export class UniversalHeader extends Component {
  static propTypes = {
    prop: PropTypes
  };

  getLeft = () => {
    return (
      <a href="/">
        <Logo />
      </a>
    );
  };

  render() {
    return (
      <div>
        <Wrapper>
          <HeaderLeft>{this.getLeft()}</HeaderLeft>
          <HeaderRight />
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UniversalHeader);
