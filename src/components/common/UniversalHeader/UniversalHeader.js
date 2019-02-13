import React, { Component } from "react";
import { connect } from "react-redux";
import { SAButton } from "components/common";
import { HEADERS } from "constants/header";
import { Router, Link } from "server/routes";
import jump from "jump.js";
import {
  Wrapper,
  HeaderLeft,
  HeaderRight,
  LinearGradient,
  SectionLink
} from "./UniversalHeader.styles";

export class UniversalHeader extends Component {
  componentDidMount() {
    Router.prefetchRoute("/login");
  }

  handleSignup = () => {
    Router.pushRoute("/login");
  };

  getLeft = () => (
    <HeaderLeft>
      <Link prefetch route="/">
        <img
          style={{ cursor: "pointer" }}
          src="static/images/logo.png"
          alt="Stock Analyzer Logo"
        />
      </Link>
    </HeaderLeft>
  );

  handleSectionClick = hash => {
    if (window.location.pathname === "/" && hash) {
      jump(hash);
    }
  };

  getRight = () => (
    <HeaderRight>
      {HEADERS.map(header => (
        <Link scroll route={header.href} key={header.title}>
          <SectionLink onClick={() => this.handleSectionClick(header.hash)}>
            {header.title}
          </SectionLink>
        </Link>
      ))}
      <SAButton onClick={this.handleSignup}>Log In/Sign Up</SAButton>
    </HeaderRight>
  );

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
