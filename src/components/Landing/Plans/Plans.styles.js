import styled from "styled-components";

export const PlansWrapper = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  text-align: center;
  width: 100vw;
  min-height: 70vh;
  position: relative;
`;

export const Title = styled.h1`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 40px;
  color: #fff;
`;

export const Text = styled.p`
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
`;

export const SubTitle = styled(Text)`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const SinglePlanWrapper = styled.div`
  width: 370px;
  height: 550px;
  text-align: center;
  background-color: ${props => props.color};
  padding: 40px 20px;
`;

export const Type = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin: 40px 0;
`;

export const Price = styled(Text)`
  font-size: 72px;
  font-weight: 500;
  margin-bottom: 2px;
`;

export const Amount = styled(Text)`
  color: rgba(255, 255, 255, 0.81);
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 60px;
`;

export const Description = styled(Text)`
  font-size: 16px;
`;
