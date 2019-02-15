import React, { Component } from "react";
import { connect } from "react-redux";
import { SAButton } from "components/common";
import { HEADERS, AUTHORIZED_HEADERS } from "constants/header";
import { Router, Link } from "server/routes";
import { userSelector } from "flux/ducks/auth/selectors";
import combineSelectors from "utils/combineSelectors";
import jump from "jump.js";
import {
  Wrapper,
  HeaderLeft,
  HeaderRight,
  LinearGradient,
  SectionLink,
  ProfileIcon
} from "./UniversalHeader.styles";
import PropTypes from "prop-types";

export class UniversalHeader extends Component {
  static propTypes = {
    user: PropTypes.shape({})
  };

  static defaultProps = {
    user: null
  };

  state = {
    isReady: false
  };
  componentDidMount() {
    Router.prefetchRoute("/login");
    var elems = document.querySelectorAll(".dropdown-trigger");
    if (M && M.Dropdown && elems.length > 0) {
      M.Dropdown.init(elems, {
        alignment: "right",
        coverTrigger: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var elems = document.querySelectorAll(".dropdown-trigger");
    if (M && M.Dropdown && elems.length > 0) {
      M.Dropdown.init(elems, {
        alignment: "right",
        coverTrigger: false
      });
    }
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

  getRight = () => {
    const { user } = this.props;
    if (user) {
      return (
        <HeaderRight>
          {AUTHORIZED_HEADERS.map(header => (
            <Link scroll route={header.href} key={header.title}>
              <SectionLink>{header.title}</SectionLink>
            </Link>
          ))}
          <ProfileIcon
            className="dropdown-trigger"
            data-target="dropdown1"
            picture={user.picture}
          />
          <ul id="dropdown1" className="dropdown-content">
            <li>
              <Link route="/profile">
                <a>My Profile</a>
              </Link>
            </li>
            <li>
              <Link prefetch route="/portfolio">
                <a>My Portfolio</a>
              </Link>
            </li>
            <li>
              <a href="/api/auth/signout">Log out</a>
            </li>
          </ul>
        </HeaderRight>
      );
    }
    return (
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

const mapStateToProps = combineSelectors({
  user: userSelector
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UniversalHeader);
