import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Introduction } from "./Introduction";

export class UnauthorizedLanding extends Component {
  render() {
    return (
      <div>
        <Introduction />
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
