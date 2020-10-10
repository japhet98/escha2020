import React, { Component } from "react";
import { register } from "../Store/Actions/authActions";
import { connect } from "react-redux";
import { TextField, SelectField } from "../Component/Constant";
import img from "../assets/IMG-20201007-WA0008.jpg";
import "./index.css";
import RiseLoader from "react-spinners/CircleLoader";
/**
 * name
 * school
 * member or not
 * pre-tertiary,tertiary or alumni
 * email
 * active whatsApp
 * gender
 *
 * expectation
 */
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      othername: "",
      gender: "",
      status: "",
      email: "",
      phone: "",
      member: "",
      institution: "",
      password: "",
      expectation: "",
      momo: "",
      network: "",
      errors: {},
      error: true,
      loading: false,
      isvalid: false,
    };
  }
  handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (!!this.state.errors[target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[target.name];
      this.setState({
        [name]: value,
        errors,
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    // Validating
    if (this.state.name.trim() === "") {
      errors.name = "Full name is required";
    }
    if (
      (this.state.gender.trim() === "Select Gender") |
      (this.state.gender.trim() === "")
    ) {
      errors.gender = "Select Gender";
    }
    // Before Loading
    let isValid;
    this.setState({ loading: true });

    // After Loading
    document.getElementById("spinning").hidden = false;
    document.getElementById("form").hidden = true;

    setTimeout(() => {
      this.setState({ loading: false });
      if (!this.state.loading) {
        this.setState({ errors });
        isValid = Object.keys(errors).length === 0;
        document.getElementById("spinning").hidden = true;
        document.getElementById("form").hidden = false;
        if (isValid) {
          const data = {
            name: this.state.name.trim(),
          };
          this.props.register(this.state);
        }
      }
    }, 5000);
  };
  render() {
    const { authError } = this.props;
    return (
      <div className="container">
        {/* <span
          className="spinner text-danger mx-auto text-center"
          //   role="status"
          id="spinning"
          hidden
          style={{ marginTop: "250px" }}
        >
          <RiseLoader margin={1} size={50} color={"#fff"} loading={true} />
        </span> */}
        <div className="Loading-header" id="spinning" hidden>
          <RiseLoader margin={1} size={100} color={"#fff"} loading={true} />{" "}
        </div>{" "}
        <div className="my-container">
          <form onSubmit={this.handleSubmit} className="form-group" id="form">
            {!!this.state.errors.global && (
              <div className="ui negative message">
                <p>{this.state.errors.global}</p>
              </div>
            )}
            <TextField
              type="text"
              name="name"
              label="Full Name"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChange}
              required
              errorstatus={this.state.error}
              errors={this.state.errors.name}
            />
            {/* <TextField
              type="text"
              name="othername"
              label="Othername"
              className="form-control"
              value={this.state.othername}
              onChange={this.handleChange}
            />
            <TextField
              type="text"
              name="lastname"
              label="Lastname"
              className="form-control"
              value={this.state.lastname}
              onChange={this.handleChange}
              required
            /> */}
            <SelectField
              label="Gender"
              name="gender"
              required
              value={this.state.gender}
              onChange={this.handleChange}
              errorstatus={this.state.error}
              errors={this.state.errors.gender}
            />
            <SelectField
              label="Are you a COP member"
              name="member"
              required
              value={this.state.member}
              onChange={this.handleChange}
              data={["Select Status", "Member", "Not Member"]}
              errorstatus={this.state.error}
              errors={this.state.errors.member}
            />
            <SelectField
              label="PENSA Membership Status"
              name="status"
              required
              value={this.state.status}
              onChange={this.handleChange}
              data={[
                "Select Status",
                "Pre-Tertiary",
                "Tertiary",
                "Alumni",
                "non-PENSA",
              ]}
              errorstatus={this.state.error}
              errors={this.state.errors.status}
            />
            <TextField
              type="textarea"
              name="expectation"
              label="What is your expectation after the conference"
              className="form-control"
              value={this.state.expectation}
              onChange={this.handleChange}
              required
              errorstatus={this.state.error}
              errors={this.state.errors.expectation}
            />
            <TextField
              type="text"
              name="email"
              label="Email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
              required
              errorstatus={this.state.error}
              errors={this.state.errors.email}
            />
            <TextField
              type="text"
              name="momo"
              label="momo"
              className="form-control"
              value={this.state.momo}
              onChange={this.handleChange}
              required
              errorstatus={this.state.error}
              errors={this.state.errors.momo}
            />
            <SelectField
              label="Telecom Network"
              name="network"
              required
              value={this.state.network}
              onChange={this.handleChange}
              data={["Select Telecom", "MTN", "Airtel/Tigo", "Vodafone"]}
              errorstatus={this.state.error}
              errors={this.state.errors.network}
            />
            <div
              style={{ marginTop: "20px", width: "50%" }}
              className="container"
            >
              <button type="submit" className="btn btn-success form-control">
                Register
              </button>
            </div>
            <div className="text-center btn-danger">
              {authError && !this.state.loading ? <p>{authError}</p> : null}
            </div>
          </form>
        </div>
        <img src={img} alt="bg" />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (creds) => dispatch(register(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
