import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import { TextField } from "../Component/Constant";
import { signIn } from "../Store/Actions/authActions";

class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.email === "admin@gmail.com") {
      this.props.signIn(this.state);
      if (this.props.auth.uid)
        return (
          //   console.log("registerd")
          this.props.history.push("/participant")
        );
    }
  };
  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/participant" />;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="container form-group" style={{ marginTop: "200px" }}>
            <TextField
              name="email"
              value={this.state.email}
              placeholder="e.g example@gmail.com"
              className="form-control"
              label="Email Address"
              required
              onChange={this.handleChange}
            />
            <TextField
              label="Password"
              value={this.state.password}
              type="password"
              name="password"
              placeholder="********************"
              className="form-control"
              required
              onChange={this.handleChange}
            />
          </div>
          <div
            className="container"
            style={{ marginTop: "20px", width: "50%" }}
          >
            <button type="submit" className="btn btn-success form-control">
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Authenticate)
);
