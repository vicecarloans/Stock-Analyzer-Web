import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Introduction } from "./Introduction";
import { Product } from "./Product";
import { AboutUs } from "./AboutUs";
import { WavesIcon } from "assets/vectors";
export class UnauthorizedLanding extends Component {
  render() {
    return (
      <div>
        <Introduction />
        <Product />
        <WavesIcon />
        <AboutUs />
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
