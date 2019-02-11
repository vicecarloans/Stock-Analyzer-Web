import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { WavesIcon } from "assets/vectors";
import jump from "jump.js";
import { Introduction } from "./Introduction";
import { Product } from "./Product";
import { AboutUs } from "./AboutUs";
import { Plans } from "./Plans";
import { WavesWrapper } from "./UnauthorizedLanding.styles";

export class UnauthorizedLanding extends Component {
  state = {
    hash: ""
  };

  componentDidMount() {
    const { hash } = window.location;
    if (hash) {
      jump(hash);
      this.setState({ hash });
    }
  }

  render() {
    return (
      <div>
        <Introduction />
        <Product />
        <WavesWrapper>
          <WavesIcon />
        </WavesWrapper>
        <AboutUs />
        <Plans />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnauthorizedLanding);
