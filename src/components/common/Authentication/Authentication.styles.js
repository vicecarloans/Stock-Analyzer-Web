import styled from "styled-components";
import media from "utils/styling/media";

export const AuthBody = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
`;

export const AuthWrapper = styled.div`
    max-width: 45vw;
    min-width: 40vw;
    min-height: 60vh;
    border-radius: 40px;
    background-color: #CBC5C5;
    border: 1px solid #707070;
    ${media.phone`
        min-height: 20vh;
    `}
    ${media.desktop`
        min-height: 50vh;
        min-width: 50vw;
    `}
    ${media.retina`
        max-width: 45vw;
        min-width: 40vw;
    `}
    ${media.highres`
        max-width: 50vw;
        min-width: 45vw;
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
  color: #000;
  font-weight: bold;
  font-family: "IBM Plex Sans", sans-serif;
`;
