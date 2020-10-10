import React, { Component } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";

import RiseLoader from "react-spinners/RiseLoader";
// import Metadata from "../../Pages/MetaData/Metadata";

class Loading extends Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 3000);
    // ReactGA.initialize("UA-154721739-1");
    // ReactGA.pageview("Loading Screen");
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <div>
        {" "}
        {/* <Metadata title="PENSA - UMaT" /> */}
        <div className="Loading-header">
          <RiseLoader margin={1} size={30} color={"#fff"} loading={true} />{" "}
        </div>{" "}
      </div>
    );
  }
}
///
export default Loading;
