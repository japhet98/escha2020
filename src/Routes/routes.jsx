import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Instructions from "../Pages/Instructions";
import Register from "../Pages/Register";
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Instructions} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

export default Routes;
