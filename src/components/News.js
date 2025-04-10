import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    // console.log("This is a news constructor!");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsBucket - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async updatePage() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(40);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      // page:this.state.page,
      
      totalResults: parsedData.totalResults,
      articles: parsedData.articles || [],
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updatePage();
  }

  handlePrevClick = async () => {
    // console.log("prev");
    this.setState({
      page: this.state.page - 1,
    });
    this.updatePage();
  };
  handleNextClick = async () => {
    // console.log("next");
    this.setState({
      page: this.state.page + 1,
    });
    this.updatePage();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      // page:this.state.page,
      articles: this.state.articles.concat(parsedData.articles || []),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 className="my-3 text-center">
          Your Daily News Bucket : Top{" "}
          {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length || 0}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title}
                      description={element.description}
                      newsUrl={element.url}
                      imageUrl={element.urlToImage}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className = "container d-flex justify-content-between">
        <button type="button" 
            disabled = {this.state.page <= 1} 
            className="btn btn-info my-2"  
            onClick={this.handlePrevClick}>&larr; Previous
        </button>

        <button type="button" 
            disabled = {this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)} 
            className="btn btn-info my-2" 
            onClick = {this.handleNextClick}>Next &rarr;
        </button>

        </div> */}
      </>
    );
  }
}

export default News;
