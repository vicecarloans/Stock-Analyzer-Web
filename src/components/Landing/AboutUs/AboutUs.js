import React, { PureComponent } from "react";
import { AboutWrapper, Title } from "./AboutUs.styles";

export default class AboutUs extends PureComponent {
  render() {
    return (
      <AboutWrapper id="team">
        <Title className="wow fadeInUp animated">About Us</Title>
      </AboutWrapper>
    );
  }
}
