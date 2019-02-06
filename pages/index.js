import React, { Component } from "react";
import { Button } from "carbon-components-react";
import { Link } from "server/routes";
import { connect } from "react-redux";
import { SALayout } from "components/common/SALayout";
import combineSelectors from "utils/combineSelectors";
import { userSelector, loadingSelector, registerUser } from "flux/ducks/auth";
import { Payment } from "components/Payment";

class Home extends Component {
  handleRegister = () => {
    const user = {
      username: "vicecarloans",
      email: "huydam1997@gmail.com",
      password: "secret",
      name: "Huy Dam",
      plan: 1
    };

    this.props.registerUser(user);
  };
  render() {
    return (
      <SALayout>
        <Payment />
        <Button onClick={this.handleRegister}>Register</Button>
      </SALayout>
    );
  }
}

const MapStateToProps = combineSelectors({
  user: userSelector
});

const MapDispatchToProps = {
  registerUser
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Home);
