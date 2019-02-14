import React, { Component } from "react";
import { Button } from "carbon-components-react";
import { Link } from "server/routes";
import { connect } from "react-redux";
import { SALayout } from "components/common/SALayout";
import combineSelectors from "utils/combineSelectors";
import { userSelector, loadingSelector, registerUser } from "flux/ducks/auth";
import { UnauthorizedLanding } from "components/Landing";

class Home extends Component {
  render() {
    return (
      <SALayout>
        <UnauthorizedLanding />
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
