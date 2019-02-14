import styled from "styled-components";

export const StepIndicatorHeader = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #000;
  margin-left: 25px;
  font-family: "IBM Plex Sans", sans-serif;
`;

export const StepIndicatorSubHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin-left: 25px;
  font-family: "IBM Plex Sans", sans-serif;
`;

export const NavigationButtonWrapper = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
  margin: 20px 0;
`;

export const ReviewPaymentWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
`;

export const ReviewHeader = styled(StepIndicatorSubHeader)`
  text-align: center;
  letter-spacing: 3px;
  font-size: 28px;
  margin: 20px 0;
`;

export const FieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FieldTitle = styled(StepIndicatorHeader)`
  font-weight: 400;
  letter-spacing: 1px;
  margin: 5px 0;
  font-size: 20px;
`;

export const FieldValue = styled(StepIndicatorSubHeader)`
  font-weight: 600;
  font-size: 20px;
`;

export const LineBreak = styled.div`
  border-bottom: 1px solid #9f9f9f;
  margin: 10px 0;
  height: 1px;
`;

export const DashedLineBreak = styled.div`
  border-bottom: 1px dashed #9f9f9f;
  height: 1px;
  margin: 10px 0;
`;

export const SuccessWord = styled.p`
  font-size: 22px;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: bold;
  color: #39363b;
  margin: 20px 0;
`;

export const SuccessWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
`;
