import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  AuthBody,
  AuthWrapper,
  HeaderWrapper,
  Header,
  BodyWrapper
} from "./Authentication.styles";

export default class Authentication extends PureComponent {
  static propTypes = {
    header: PropTypes.string,
    headerStyle: PropTypes.shape(),
    // flex-start, center, flex-end
    headerAlign: PropTypes.string,
    headerComponent: PropTypes.arrayOf(PropTypes.element)
  };

  static defaultProps = {
    header: "",
    headerStyle: null,
    headerAlign: null,
    headerComponent: null
  };

  renderHeader = () => {
    const { headerComponent, header, headerStyle } = this.props;
    if (headerComponent) {
      return headerComponent;
    }
    return <Header {...headerStyle}>{header}</Header>;
  };

  render() {
    const { headerAlign } = this.props;
    return (
      <AuthBody>
        <AuthWrapper>
          <HeaderWrapper headerAlign={headerAlign}>
            {this.renderHeader()}
          </HeaderWrapper>
          <BodyWrapper>{this.props.children}</BodyWrapper>
        </AuthWrapper>
      </AuthBody>
    );
  }
}
