import React, { Component } from "react";
// import DashboardLayout from "../../Layout/DashboardLayout";
import { SelectField, TextField } from "../Constant";
import "./index.css";
import { register } from "../../Store/Actions/authActions";
import { connect } from "react-redux";

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
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      type: "personal",
      firstname: "",
      lastname: "",
      othername: "",
      dateofbirth: "",
      residence: "",
      gender: "",
      image: null,
      url: "",
      email: "",
      school: "",
      phone: "",
      password: "",
      npassword: "",
      cpassword: "",
    };
  }

  handleChange = (e) => {
    const target = e.target;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  };

  viewPage = (number, type) => {
    this.setState({
      number,
      type,
    });
  };
  render() {
    const { authError } = this.props;
    /**
     * Finish
     */
    const Finish = (
      <div style={{ marginTop: "20px", width: "50%" }} className="container">
        <button className="form-control btn btn-success" type="submit">
          Save
        </button>
      </div>
    );
    /**
     * End of Finish
     */

    const Next = (number, type) => (
      <div style={{ marginTop: "20px", width: "50%" }} className="container">
        <button
          className="form-control btn btn-primary"
          onClick={() => this.viewPage(number, type)}
        >
          Next
        </button>
      </div>
    );
    const Stepper = (number, type, label, icon) => (
      <div className="stepwizard-step col-xs-3">
        <a
          href={`#step-${number}`}
          type="button"
          className="btn btn-success btn-circle"
          // onClick={() => this.viewPage(number, type)}
        >
          <i className={`fa ${icon}`} aria-hidden="true"></i>
        </a>
        <p>
          <small>{label}</small>
        </p>
      </div>
    );

    /**
     * Personal Information
     */
    const Personal = (number, type) => (
      <div>
        <div className="card card-body">
          <div className="card-head text-center">
            <h3>
              <b>Personal Infomation</b>
            </h3>
          </div>
          <div>
            <TextField
              label="First Name"
              name="firstname"
              required
              value={this.state.firstname}
              onChange={this.handleChange}
              placeholder="e.g John"
            />
            <TextField
              label="Last Name"
              name="lastname"
              required
              value={this.state.lastname}
              onChange={this.handleChange}
              placeholder="e.g Doe"
            />
            <TextField
              label="Other Name"
              name="othername"
              value={this.state.othername}
              onChange={this.handleChange}
              placeholder="e.g Kwesi"
            />
            <SelectField
              label="Gender"
              name="gender"
              required
              value={this.state.gender}
              onChange={this.handleChange}
            />
            <TextField
              label="Date of Birth"
              name="dateofbirth"
              value={this.state.dateofbirth}
              onChange={this.handleChange}
              type="date"
              required
            />
            <TextField
              label="Residential Address"
              name="residence"
              value={this.state.residence}
              onChange={this.handleChange}
              placeholder="e.g Elmina - Essuakyir H/No 84"
              required
            />
            {Next(number, type)}
            {/* {Finish} */}
          </div>
        </div>
      </div>
    );

    /**End of Personal Information */

    /**
     * Contact Information
     */
    const Contact = (number, type) => (
      <div>
        <div className="card card-body">
          <div className="card-head text-center">
            <h3>
              <b>Contact Infomation</b>
            </h3>
          </div>
          <div>
            <TextField
              label="Phone Number"
              name="phone"
              required
              value={this.state.phone}
              onChange={this.handleChange}
              placeholder="e.g 0553234323"
            />
            <TextField
              label="Email Address"
              name="email"
              required
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="e.g example@gmail.com"
            />
            {Next(number, type)}
          </div>
        </div>
      </div>
    );
    /**
     * End of Contact Information
     */

    /**
     * Educational Information
     */
    const Educational = (number, type) => (
      <div>
        <div className="card card-body">
          <div className="card-head text-center">
            <h3>
              <b>Educational Infomation</b>
            </h3>
          </div>
          <div>
            <SelectField
              label="Institution Name"
              name="school"
              required
              value={this.state.school}
              onChange={this.handleChange}
              data={["Select Institution", "UMaT", "KNUST", "UCC"]}
            />
            {Next(number, type)}
          </div>
        </div>
      </div>
    );
    /**
     * End of Educational Information
     */

    /**
     * Account Information
     */
    const Account = (number, type) => (
      <div>
        <div className="card card-body">
          <div className="card-head text-center">
            <TextField
              label="Current Password"
              name="password"
              type="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField
              label="New Password"
              name="npassword"
              type="password"
              required
              value={this.state.npassword}
              onChange={this.handleChange}
            />
            <TextField
              label="Confirm New Password"
              name="cpassword"
              type="password"
              required
              value={this.state.cpassword}
              onChange={this.handleChange}
            />
            {Finish}
          </div>
        </div>
      </div>
    );

    /**
     * End of Account Information
     */

    return (
      // <DashboardLayout>
      <div className="container-fluid" style={{ width: "100%" }}>
        <div className="stepwizard">
          <div className="stepwizard-row setup-panel" style={{ width: "100%" }}>
            {Stepper(1, "personal", "Personal Information", "fa-user")}
            {Stepper(2, "contact", "Contact Information", "fa-address-book-o")}
            {Stepper(
              3,
              "education",
              "Educational Information",
              "fa-graduation-cap"
            )}
            {Stepper(4, "passwordreset", "Password Reset", "fa-unlock-alt")}
          </div>
        </div>

        <form className="form-group container" onSubmit={this.handleSubmit}>
          {this.state.number === 1
            ? Personal(2, "personal")
            : this.state.number === 2
            ? Contact(3, "contact")
            : this.state.number === 3
            ? Educational(4, "education")
            : this.state.number === 4
            ? Account(4, "account")
            : ""}
        </form>
      </div>
      // </DashboardLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
