import styled from "styled-components";

export const ButtonFlat = styled.button`
  background-image: linear-gradient(to right, #2854f2, #6885f5);
  min-width: ${props => (props.minWidth ? props.minWidth : 150)}px;
  min-height: ${props => (props.minHeight ? props.minHeight : 40)}px;
  max-width: ${props => (props.maxWidth ? props.maxWidth : 250)}px;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 52)}px;
  margin: ${props => props.margin};
  border-radius: 10px;
  color: #fff;
  border: none;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: ${props => (props.fontSize ? props.fontSize : 14)}px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(to right, #6885f5, #2854f2);
  }
`;
