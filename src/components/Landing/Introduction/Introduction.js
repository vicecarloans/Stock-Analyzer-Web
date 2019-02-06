import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Wrapper, Title } from "./Introduction.styles";
import { SAButton } from "components/common";

export class Introduction extends PureComponent {
  handleJoin = () => {};

  render() {
    return (
      <Wrapper>
        <Title>Stock Analyzer</Title>
        <Title>Investment &amp; Risk Analysis Platform</Title>
        <SAButton
          onClick={this.handleJoin}
          style={{ width: 250, height: 52, fontSize: 20 }}
        >
          Join free for a month
        </SAButton>
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
