import React, { PureComponent } from "react";
import { AboutWrapper, Title } from "./AboutUs.styles";
import { TEAM } from "constants/landing/team";
import "static/css/about.scss";

export default class AboutUs extends PureComponent {
  renderTeam = () => {
    return TEAM.map(member => (
      <div
        className="bx--col-lg-6 bx--col-md-6 bx--col-sm-12 bx--col-xs-12 wow fadeInUp animated"
        key={member.id}
      >
        <div className="team-list">
          <div className="conte">
            <div className="dbox">
              <div className="dleft">
                <div className={member.picture} />
              </div>
              <div className="dright">
                <h3>{member.name}</h3>
                <span>{member.title}</span>
              </div>
            </div>
            <div className="con">
              <p>{member.bio}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  render() {
    return (
      <AboutWrapper id="team">
        <Title className="wow fadeInUp animated">About Us</Title>
        <div className="bx--grid container">
          <div className="bx--row">{this.renderTeam()}</div>
        </div>
      </AboutWrapper>
    );
  }
}
