import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  max-height: 100vh;
  min-height: 80vh;
  margin-bottom: 20px;
  display: flex;
`;

export const ChartContainer = styled.div`
  flex: 0.7;
  min-height: 100%;
  background-color: #0a1231;
  padding-bottom: 40px;
`;

export const ToolsContainer = styled.div`
  min-height: 10%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row-reverse;
  align-items: center;
`;

export const HistoricalChartContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export const SubContainer = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 0 20px;
`;

export const StocksContainer = styled.div`
  flex: 0.6;
  overflow-y: scroll;
  margin-bottom: 10px;
  background-color: #0a1231;
`;

export const ActionContainer = styled.div`
  flex: 0.4;
  background-color: #0a1231;
  display: flex;
  padding: 15px;
`;

export const BuyStockContainer = styled.div`
  flex: 0.5;
  border-right: 1px solid #c7c7c7;
  padding: 0 15px;
`;

export const SellStockContainer = styled.div`
  flex: 0.5;
  padding: 0 15px;
`;

export const SearchStockContainer = styled.div`
  width: 100%;
  padding-right: 100%;
  padding-left: 10px;
`;

export const DataTitle = styled.h1`
  font-weight: bold;
  font-size: 18px;
`;

export const Data = styled.p`
  font-size: 14px;
`;

export const StockDescription = styled.p`
  font-size: 14px;
`;

export const CompanyWebsite = styled.a`
  text-decoration: none;
  color: #89a2ff;
  &:hover {
    color: #4a6ef5;
  }
`;
