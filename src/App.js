import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };

  render() {
    return (
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            // onLoaderFinished={}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey = {this.apiKey}
                  key="general"
                  pageSize={5}
                  country="us"
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress} 
                  apiKey = {this.apiKey}
                  key="entertainment"
                  pageSize={5}
                  country="us"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey = {this.apiKey}
                  key="business"
                  pageSize={5}
                  country="us"
                  category="business"
                />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey = {this.apiKey}
                  key="health"
                  pageSize={5}
                  country="us"
                  category="health"
                />
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey = {this.apiKey}
                  key="technology"
                  pageSize={5}
                  country="us"
                  category="technology"
                />
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey = {this.apiKey}
                  key="science"
                  pageSize={5}
                  country="us"
                  category="science"
                />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey = {this.apiKey}
                  key="sports"
                  pageSize={5}
                  country="us"
                  category="sports"
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}
