import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Wrapper, Title } from "./Introduction.styles";
import { SAButton } from "components/common";

export class Introduction extends Component {
  componentDidMount() {
    if (window) {
      this.createParticle();
    }
  }
  handleJoin = () => {};
  createParticle = () => {
    require("particles.js/particles");
    window.particlesJS.load("particle-js", "static/particles-config.json");
  };
  render() {
    return (
      <Wrapper id="top">
        <div style={{ zIndex: 10 }}>
          <Title>Stock Analyzer</Title>
          <Title>Investment &amp; Risk Analysis Platform</Title>
          <SAButton
            onClick={this.handleJoin}
            style={{ minWidth: 250, minHeight: 52, fontSize: 20 }}
          >
            Join free for a month
          </SAButton>
        </div>

        <div
          id="particle-js"
          style={{ position: "absolute", zIndex: 0, minWidth: "100%" }}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Introduction);
