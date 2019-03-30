import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import { getProfilebyHandle } from "../../actions/profileActions";

class Profile extends Component {
  ComponentDidMound() {
    if (this.props.match.params.handle) {
      this.props.getProfilebyHandle(this.props.match.params.handle);
    }
  }
  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfilebyHandle: PropTypes.func.isRequired
};

const mapstateToProps = state => ({
  profle: state.profile
});

export default connect(
  mapstateToProps,
  { getProfilebyHandle }
)(Profile);
