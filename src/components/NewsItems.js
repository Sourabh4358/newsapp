import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
        <div className="card">
          <span className="badge rounded-pill bg-danger" style = {{left: "0", position: "absolute"}}>
            {source}
          </span>
          <img
            src={
              !imageUrl
                ? "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2024/08/One-big-reason-you-may-want-to-hold-out-for-the-iPhone-17.webp?resize=1200%2C628&quality=82&strip=all&ssl=1"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-primary">
              Read News
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
