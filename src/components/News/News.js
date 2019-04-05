import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  NewsWrapper,
  NewsTitleDiv,
  NewsTitle,
  SearchDiv,
  NewsListingWrapper,
  NewsListingContainer,
  NewsPicture,
  NewsDetailsWrapper,
  NewsDate,
  NewsHeadLine,
  NewsSummary,
  TagWrapper
} from "./News.styles";
import { MultiSelect, Button, Loading, Tag } from "carbon-components-react";
import { STOCKS } from "constants/portfolio/stocks";
import {
  fetchMixedNews,
  addFilter,
  clearFilter,
  newsLoadingSelector,
  newsDisplaySelector,
  newsSymbolsSelector,
  canLoadMore,
  errorSelector,
  loadMore,
  newsOffsetSelector
} from "flux/ducks/news";
import combineSelectors from "utils/combineSelectors";
import { WindowScroller, List, AutoSizer } from "react-virtualized";
import { SAButton } from "components/common";
import { TOKEN_API } from "constants/iextrading";

export class News extends Component {
  static propTypes = {
    news: PropTypes.arrayOf(
      PropTypes.shape({
        datetime: PropTypes.number.isRequired,
        headline: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        related: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        lang: PropTypes.string.isRequired,
        hasPaywall: PropTypes.bool.isRequired
      })
    ),
    canLoadMore: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    symbols: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.string,
    fetchMixedNews: PropTypes.func.isRequired,
    addFilter: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchMixedNews();
  }

  handleChange = ({ selectedItems }) => {
    if (selectedItems.length > 0) {
      this.props.addFilter(selectedItems);
    } else {
      this.props.clearFilter();
      this.scroller.forceUpdateGrid();
    }
  };
  listRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { news } = this.props;
    const current = news[index];
    const datetime = new Date(current.datetime);
    return (
      <NewsListingContainer
        onClick={() =>
          window.open(`${current.url}?token=${TOKEN_API}`, "_blank")
        }
        key={key}
        style={style}
      >
        <NewsPicture image={`${current.image}?token=${TOKEN_API}`} />
        <NewsDetailsWrapper>
          <NewsDate>
            {datetime.toLocaleDateString("en-US")} | {current.source}
          </NewsDate>
          <NewsHeadLine>{current.headline}</NewsHeadLine>
          <NewsSummary>{current.summary.substring(0, 200)}...</NewsSummary>
          <TagWrapper>
            Related:
            {current.related.split(",").map(tag => (
              <Tag className="sa--tag" type="beta" key={tag}>
                {tag}
              </Tag>
            ))}
          </TagWrapper>
        </NewsDetailsWrapper>
      </NewsListingContainer>
    );
  };

  onLoadMore = () => {
    this.props.loadMore();
    setTimeout(() => {
      const initialTop = this.scroller.getOffsetForRow({
        alignment: "start",
        index: this.props.offset * 10
      });
      window.scrollTo(0, initialTop);
    }, 0);
  };

  renderListing = () => {
    return this.props.loading ? (
      <Loading withOverlay={false} className="listing-loader" />
    ) : (
      <React.Fragment>
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <AutoSizer style={{ height: "100%" }}>
              {({ width }) => (
                <List
                  autoHeight
                  height={height}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  rowCount={this.props.news.length}
                  rowHeight={250}
                  rowRenderer={this.listRenderer}
                  scrollTop={scrollTop}
                  width={width}
                  ref={ref => (this.scroller = ref)}
                  scrollToAlignment="center"
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
        {this.props.canLoadMore && (
          <Button onClick={this.onLoadMore} className="sa--load-more">
            Load More
          </Button>
        )}
      </React.Fragment>
    );
  };
  scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  render() {
    return (
      <NewsWrapper>
        <NewsTitleDiv>
          <NewsTitle>News Listing</NewsTitle>
        </NewsTitleDiv>
        <SearchDiv>
          <MultiSelect.Filterable
            items={STOCKS}
            placeholder="Enter your stock..."
            onChange={this.handleChange}
            itemToString={item => item}
            className="sa--add-stock sa--filter-news"
            initialSelectedItems={this.props.symbols}
            ref={ref => (this.selection = ref)}
          />
        </SearchDiv>
        <NewsListingWrapper>{this.renderListing()}</NewsListingWrapper>
        <SAButton onClick={this.scrollToTop} type="sticky">
          <i className="material-icons scroll-top-icon">vertical_align_top</i>
        </SAButton>
      </NewsWrapper>
    );
  }
}

const mapStateToProps = combineSelectors({
  loading: newsLoadingSelector,
  news: newsDisplaySelector,
  symbols: newsSymbolsSelector,
  canLoadMore,
  offset: newsOffsetSelector,
  error: errorSelector
});

const mapDispatchToProps = {
  fetchMixedNews,
  addFilter,
  clearFilter,
  loadMore
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
