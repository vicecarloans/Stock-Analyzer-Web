import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SAButton } from "components/common";
import { Wrapper, Title } from "./Introduction.styles";

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
            style={{ minWidth: "250px", minHeight: "52px", fontSize: "20px" }}
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
