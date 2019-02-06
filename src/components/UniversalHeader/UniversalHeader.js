import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Logo from "assets/images/logo.png";
import { HEADERS } from "constants/header";
import { Button } from "carbon-components-react";
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

  getRight = () => {
    return (
      <div>
        {HEADERS.map(header => (
          <a href={header.href}>{header.title}</a>
        ))}
        <Button>Log In/Sign Up</Button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Wrapper>
          <HeaderLeft>{this.getLeft()}</HeaderLeft>
          <HeaderRight>{this.getRight()}</HeaderRight>
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
