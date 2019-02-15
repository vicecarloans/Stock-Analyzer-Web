import React, { Component } from "react";
import { connect } from "react-redux";
import { SAButton } from "components/common";
import { HEADERS, AUTHORIZED_HEADERS } from "constants/header";
import { Router, Link } from "server/routes";
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
    instances: null
  };
  componentDidMount() {
    Router.prefetchRoute("/login");
    console.log("did mount");
    var elems = document.querySelectorAll(".dropdown-trigger");
    console.log(elems);
    if (elems.length > 0) {
      const instances = M.Dropdown.init(elems, {
        alignment: "right",
        coverTrigger: false
      });
      this.setState({ instances });
    }
  }

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    var elems = document.querySelectorAll(".dropdown-trigger");
    console.log(elems);
    if (M.Dropdown && elems.length > 0 && !state.instances) {
      const instances = M.Dropdown.init(elems, {
        alignment: "right",
        coverTrigger: false
      });
      newState = { ...newState, instances };
    }
    return newState;
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
    console.log("rendered");
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
              <Link prefetch route="/profile">
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UniversalHeader);
