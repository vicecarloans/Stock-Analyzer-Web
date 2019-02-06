import React, { Component } from "react";
import { connect } from "react-redux";
import { SAButton } from "components/common";
import { HEADERS } from "constants/header";
import {
  Wrapper,
  HeaderLeft,
  HeaderRight,
  LinearGradient,
  SectionLink
} from "./UniversalHeader.styles";

export class UniversalHeader extends Component {
  handleSignup = () => {};
  getLeft = () => {
    return (
      <HeaderLeft>
        <a href="/">
          <img src="static/images/logo.png" />
        </a>
      </HeaderLeft>
    );
  };

  getRight = () => {
    return (
      <HeaderRight>
        {HEADERS.map(header => (
          <SectionLink key={header.title} href={header.href}>
            {header.title}
          </SectionLink>
        ))}
        <SAButton onClick={this.handleSignup}>Log In/Sign Up</SAButton>
      </HeaderRight>
    );
  };

  render() {
    return (
      <LinearGradient>
        <Wrapper>
          {this.getLeft()}
          {this.getRight()}
        </Wrapper>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UniversalHeader);
