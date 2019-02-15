import "static/css/profile.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import combineSelectors from "utils/combineSelectors";
import PropTypes from "prop-types";
import { SAButton } from "components/common";
import {
  userSelector,
  loginLoadingSelector,
  loginErrorSelector,
  notificationSelector
} from "flux/ducks/auth/selectors";
import {
  uploadImageUrl,
  updateUserData,
  dismissUpdateNotification
} from "flux/ducks/auth";
import {
  MainWrapper,
  ProfileWrapper,
  BlurBackground,
  Overlay,
  Preview
} from "./Profile.styles";
import UserInfoForm from "./UserInfoForm";
import { isPristine } from "redux-form";

import { Loading, ToastNotification } from "carbon-components-react";

class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool,
    err: PropTypes.string,
    pristine: PropTypes.bool
  };

  static defaultProps = {
    loading: false,
    err: "",
    pristine: true
  };

  handleImageUpload = ev => {
    if (ev.target.files && ev.target.files[0]) {
      this.props.uploadImageUrl(ev.target.files[0]);
    }
  };

  renderUserInfoForm = () => <UserInfoForm user={this.props.user} />;

  handleSubmit = () => {
    this.props.updateUserData();
  };
  render() {
    return (
      <MainWrapper>
        <ProfileWrapper>
          <BlurBackground picture={this.props.user.picture}>
            <Overlay />
          </BlurBackground>
          <div className="avatar-upload">
            <div className="avatar-edit">
              <input
                onChange={this.handleImageUpload}
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
              />
              <label htmlFor="imageUpload">
                <i className="material-icons iconUpload">file_upload</i>
              </label>
            </div>
            <div className="avatar-preview">
              <Preview picture={this.props.user.picture} />
            </div>
          </div>
          {this.renderUserInfoForm()}
        </ProfileWrapper>
        <SAButton
          disabled={this.props.pristine}
          onClick={this.handleSubmit}
          type="sticky"
        >
          <i className="material-icons iconSave">save</i>
        </SAButton>
        <Loading active={this.props.loading} />

        {this.props.notification && (
          <ToastNotification
            kind="success"
            title="Congratulations"
            subtitle="Your profile is up to date"
            iconDescription="describes the close button"
            onCloseButtonClick={() => {
              this.props.dismissUpdateNotification();
            }}
            caption=""
            className="wow fadeInUp animated"
            style={{
              position: "absolute",
              right: 0,
              bottom: "120px"
            }}
          />
        )}
      </MainWrapper>
    );
  }
}

const MapStateToProps = combineSelectors({
  user: userSelector,
  loading: loginLoadingSelector,
  err: loginErrorSelector,
  pristine: isPristine("profile"),
  notification: notificationSelector
});

const MapDispatchToProps = {
  uploadImageUrl,
  updateUserData,
  dismissUpdateNotification
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Profile);
