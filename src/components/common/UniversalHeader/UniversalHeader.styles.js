import styled from "styled-components";

import media from "utils/styling/media";

export const Wrapper = styled.header`
  padding: 0.5rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  max-height: 60px;
  z-index: 51;
  box-shadow: 0 4px 10px -6px black;
  ${media.tablet`
    padding-left: 5%;
  `};
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  min-width: 40vw;
`;

export const LinearGradient = styled.div`
  background-image: linear-gradient(#141e30, #000);
  width: 100vw;
  min-height: 100px;
  padding: 40px 0;
`;

export const SectionLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-family: "IBM Plex Sans", sans-serif;
  cursor: pointer;
  &:hover {
    color: #bad4ff;
  }
`;

export const ProfileIcon = styled.div`
  width: 72.5px;
  height: 72.5px;
  border-radius: 50%;
  background-image: url(${props =>
    props.picture || "/static/images/default_user.png"});
  background-size: cover;
  background-color: #013280;
  background-position: center;
`;
