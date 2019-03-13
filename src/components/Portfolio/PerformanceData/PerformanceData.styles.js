import styled from "styled-components";

export const PerformanceDataDiv = styled.div`
  width: 100%;
  border: 1px solid #333333;
  background-color: #000;
`;

export const PerformanceDataBody = styled.div`
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const OverviewPortfolioData = styled.div`
  flex: 0.4;
  height: 100%;
  border-right: 1px solid #333333;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

export const OverviewPortfolioChart = styled.div`
  flex: 0.6;
  text-align: center;
  height: 100%;
`;

export const OverviewPortfolioDataWrapper = styled.div`
  min-width: 80%;
  min-height: 80%;
`;

export const PortfolioChangeWrapper = styled.div`
  text-align: center;
  border-bottom: 1px solid #707070;
  padding-bottom: 20px;
`;

export const MiniPortfolioChangeWrapper = styled(PortfolioChangeWrapper)`
  border-bottom: ${props => (props.border ? "1px dashed #3c3c3c" : "none")};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;

export const PortfolioTitle = styled.h1`
  font-size: 16px;
  color: #a2a2a2;
  font-weight: bold;
`;

export const MiniPortfolioTitle = styled(PortfolioTitle)`
  font-size: 12px;
`;

export const PortfolioDataWithPercentage = styled.h1`
  font-size: 20px;
  color: ${props => (props.percentage >= 0 ? "#19BE87" : "#FF1744")};
  font-weight: bold;
`;

export const PortfolioDataWithoutPercentage = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

export const MiniPortfolioDataWithPercentage = styled(
  PortfolioDataWithPercentage
)`
  font-size: 16px;
`;

export const MiniPortfolioChangeSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
export const MiniPortfolioDataWithoutPercentage = styled(
  PortfolioDataWithoutPercentage
)`
  font-size: 16px;
`;

export const MiniPortfolioDataSection = styled.div`
  display: flex;
`;

export const AccountingIncomeData = styled.div`
  flex: 0.5;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

export const AccountingCashflowData = styled(AccountingIncomeData)`
  border-right: none;
`;

export const OverviewPortfolioChartWrapper = styled.div`
  min-width: 80%;
  min-height: 80%;
`;
