import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Authenticate from "../Pages/Auth";
import Instructions from "../Pages/Instructions";
import Register from "../Pages/Register";
import viewParticipants from "../Pages/viewParticipants";
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Instructions} />
        <Route path="/register" component={Register} />
        <Route path="/participant" component={viewParticipants} />
        <Route path="/login" component={Authenticate} />
      </Switch>
    );
  }
}

export default Routes;
