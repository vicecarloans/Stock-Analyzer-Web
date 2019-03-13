import styled from "styled-components";

export const PortfolioWrapper = styled.div`
  width: 90%;
  background-color: #0c0c14;
  height: 100%;
  margin: 0 auto;
`;

export const TitleSection = styled.div`
  height: 5%;
  padding: 10px 40px;
  border-bottom: 1px dashed #c7c7c7;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

export const AddStockSection = styled.div`
  height: 5%;
  text-align: right;
  padding: 10px 40px;
  border-bottom: 1px solid #707070;
  background-color: #141414;
`;

export const AddStockTitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const DataSquareSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  padding: 40px 20px;
  width: 90%;
  margin: auto;
`;

export const DataSquareDiv = styled.div`
  min-width: 180px;
  min-height: 100px;
  border: 1px solid #333333;
  border-radius: 5px;
  margin: 10px;
`;

export const DataSquareHeader = styled.div`
  border-bottom: 1px solid #333333;
  padding: 10px 0;
  height: 40%;
  text-align: center;
  background-color: #020202;
`;

export const DataSquareHeaderText = styled.h1`
  font-size: 20px;
  font-weight: medium;
  color: #dddddd;
`;

export const DataSquareBody = styled.div`
  height: 60%;
  background-color: #141414;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DataSquareBodyText = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

export const DataSquareBodyTextPercentage = styled(DataSquareBodyText)`
  color: ${props => (props.percentage >= 0.0 ? "#19BE87" : "#FF1744")};
`;

export const PerformanceDataSection = styled.div`
  width: 90%;
  margin: auto;
  padding: 40px 20px;
`;

export const HistoricalDataSection = styled(PerformanceDataSection)``;

export const HistoricalDataDiv = styled.div`
  width: 100%;
`;
