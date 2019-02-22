import styled from "styled-components";

export const MainWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`;

export const ProfileWrapper = styled.div`
  height: 100%;
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #0c0c14;
  border-radius: 10px;
  box-shadow: 0 3px 6 rgba(163, 163, 163, 0.16);
`;

export const BlurBackground = styled.div`
  height: 350px;
  width: 100%;
  filter: blur(15px);
  -webkit-filter: blur(15px);
  border-radius: 10px 10px 0 0;
  background-image: url(${props => props.picture});
  background: ${props =>
    !props.picture && "linear-gradient(to right, #000428, #004e92)"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Overlay = styled.div`
  position: absolute;
  z-index: 10;
  border-radius: 10px 10px 0 0;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  width: 100%;
  min-height: 100%;
`;
export const Preview = styled.div`
  background-image: url(${props =>
    props.picture || "/static/images/default_user.png"});
  border-radius: 100%;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ModeWrapper = styled.div`
  width: 100%;
  padding: 40px;
  margin-top: 70px;
`;
export const GenericText = styled.p`
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
`;

export const Title = styled(GenericText)`
  font-size: 24px;
  font-weight: bold;
`;

export const Value = styled(GenericText)`
  font-size: 18px;
  text-transform: capitalize;
`;

export const LineBreak = styled.div`
  border-bottom: 1px solid #9f9f9f;
  margin: 10px 0;
  width: 100%;
  height: 1px;
`;

export const DashedLineBreak = styled.div`
  border-bottom: 1px dashed #9f9f9f;
  height: 1px;
  width: 100%;
  margin: 10px 0;
`;

export const Label = styled(GenericText)`
  margin-top: 15px;
  font-size: 12px;
  font-weight: 500;
`;
