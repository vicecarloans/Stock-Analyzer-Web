import styled from "styled-components";

export const ButtonFlat = styled.button`
  background-image: ${props =>
    props.disabled
      ? "linear-gradient(to right, #485563, #29323c)"
      : "linear-gradient(to right, #2854f2, #6885f5)"};
  min-width: ${props => (props.minWidth ? props.minWidth : "150px")};
  min-height: ${props => (props.minHeight ? props.minHeight : "40px")};
  max-width: ${props => (props.maxWidth ? props.maxWidth : "250px")};
  max-height: ${props => (props.maxHeight ? props.maxHeight : "52px")};
  margin: ${props => props.margin};
  border-radius: 10px;
  color: #fff;
  border: none;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: ${props => (props.fontSize ? props.fontSize : "14px")};
  outline: none;
  cursor: pointer;
  &:hover {
    background-image: ${props =>
      !props.disabled && "linear-gradient(to right, #6885f5, #2854f2)"};
  }
`;

export const ButtonSticky = styled.button`
  position: fixed;
  bottom: 0;
  background-image: ${props =>
    props.disabled
      ? "linear-gradient(to right, #485563, #29323c)"
      : "linear-gradient(to right, #2854f2, #6885f5)"};
  border-radius: 100%;
  min-width: ${props => (props.minWidth ? props.minWidth : "64px")};
  min-height: ${props => (props.minHeight ? props.minHeight : "64px")};
  max-width: ${props => (props.maxWidth ? props.maxWidth : "128px")};
  max-height: ${props => (props.maxHeight ? props.maxHeight : "128px")};
  margin: ${props => props.margin};
  color: #fff;
  border: none;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: ${props => (props.fontSize ? props.fontSize : "14px")};
  outline: none;
  cursor: pointer;
  right: 64px;
  bottom: 64px;
  z-index: 123;
  &:hover {
    background-image: ${props =>
      !props.disabled && "linear-gradient(to right, #6885f5, #2854f2)"};
  }
`;
