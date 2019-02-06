import styled from "styled-components";

export const ButtonFlat = styled.button`
  background-image: linear-gradient(to right, #2854f2, #6885f5);
  min-width: ${props => (props.width ? props.width : 150)}px;
  min-height: ${props => (props.height ? props.height : 40)}px;
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
