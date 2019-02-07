import React, { PureComponent } from "react";
import {
  Wrapper,
  CopyRight,
  SAText,
  SectionLink
} from "./UniversalFooter.styles";

export default class UniversalFooter extends PureComponent {
  render() {
    return (
      <Wrapper>
        <CopyRight>
          &copy; 2018-2019 <SAText>Stock Analyzer</SAText>. All rights reserved.
        </CopyRight>
        <SectionLink>Feedback</SectionLink>
      </Wrapper>
    );
  }
}
