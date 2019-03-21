import styled from "styled-components";

export const NewsWrapper = styled.div`
  background-color: #0c0c14;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
  min-height: 100%;
`;

export const NewsTitleDiv = styled.div`
  height: 5%;
  border-bottom: 1px dashed #c7c7c7;
  padding: 10px 20px;
`;

export const NewsTitle = styled.h1`
  font-weight: bold;
  font-size: 24px;
  text-transform: capitalize;
`;

export const SearchDiv = styled.div`
  margin: 15px auto;
  padding: 10px 20px;
  width: 90%;
  background-color: rgba(124, 199, 255, 0.36);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NewsListingWrapper = styled.div`
  margin: 20px auto;
  width: 90%;
  background-color: #0c0c14;
`;

export const NewsListingContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding-right: 20px;
  background-color: #0c0c14;
  display: flex;
  padding: 20px 0;
  cursor: pointer;
  &:hover {
    border: 1px solid gray;
  }
`;

export const NewsPicture = styled.div`
  flex: 0.3;
  max-width: 250px;
  max-height: 250px;
  background-color: transparent;
  background-image: url(${props => props.image}),
    url("/static/images/placeholder.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 20px;
`;

export const NewsDetailsWrapper = styled.div`
  flex: 0.7;
`;

export const NewsDate = styled.p`
  color: #b5b5b5;
  font-size: 12px;
  margin-bottom: 25px;
`;
export const NewsHeadLine = styled.h1`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`;
export const NewsSummary = styled.p`
  font-size: 14px;
`;

export const TagWrapper = styled.div`
  margin-top: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: gray;
`;
