import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 10vh;
  width: 100vw;
  background-color: #141e30;
  display: flex;
  position: relative;
  padding: 0 30px;
  margin-top: 5vh;
  justify-content: space-between;
  align-items: center;
`;

export const CopyRight = styled.h2`
  font-size: 20px;
  font-family: "IBM Plex Sans", sans-serif;
  display: inline;
  color: #fff;
`;

export const SAText = styled.span`
  color: #7994f5;
  font-size: 20px;
  font-family: "IBM Plex Sans", sans-serif;
  display: inline;
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
