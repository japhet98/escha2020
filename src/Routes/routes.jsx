import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../Pages/Register";
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Register} />
      </Switch>
    );
  }
}

export default Routes;
