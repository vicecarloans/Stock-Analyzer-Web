import styled from "styled-components";
import media from "utils/styling/media";

export const AuthBody = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
`;

export const AuthWrapper = styled.div`
    min-width: 70vw;
    min-height: 70vh;
    border-radius: 40px;
    background-color: #0C0C14;
    border: 1px solid rgba(255, 255, 255, 255, 0.4);
    ${media.phone`
        min-height: 20vh;
    `}
    ${media.desktop`
        min-height: 50vh;
        min-width: 50vw;
    `}
    ${media.retina`
        min-width: 70vw;
    `}

`;
const alignmentRegex = /(?:flex\-start|center|flex\-end)/g;

export const HeaderWrapper = styled.div`
  min-height: 10%;
  border-bottom: 1px dashed #707070;
  display: flex;
  flex-direction: column;
  align-items: ${props =>
    props.headerAlign && props.headerAlign.match(alignmentRegex)
      ? props.headerAlign
      : "center"};
  justify-content: center;
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  width: 100%;
  height: 100%;
`;

export const Header = styled.h1`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  font-family: "IBM Plex Sans", sans-serif;
`;
