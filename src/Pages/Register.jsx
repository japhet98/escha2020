import React, { Component } from "react";
import { register } from "../Store/Actions/authActions";
import { connect } from "react-redux";
import { TextField, SelectField } from "../Component/Constant";
// import img from "../assets/IMG-20201007-WA0008.jpg";
import "./index.css";
import RiseLoader from "react-spinners/CircleLoader";
import { Button, Modal } from "react-bootstrap";
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
      gender: "",
      status: "",
      email: "",
      phone: "",
      member: "",
      institution: "",
      password: "123456789",
      expectation: "",
      momo: "",
      network: "",
      errors: {},
      error: true,
      loading: false,
      isvalid: false,
      registered: false,
      show: false,
      loading_: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
    this.setState({ name: "" });
    this.resetForm();
  };

  handleShow = () => {
    this.setState({ show: true, _loading: false });
  };
  resetForm() {
    this.setState({
      email: "",

      modal: false,
    });
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
    if (
      (this.state.status.trim() === "Select Status") |
      (this.state.status.trim() === "")
    ) {
      errors.status = "Select Status";
    }
    if (
      (this.state.network.trim() === "Select Network") |
      (this.state.network.trim() === "")
    ) {
      errors.network = "Select Network Type";
    }

    if (
      (this.state.member.trim() === "Select Status") |
      (this.state.member.trim() === "")
    ) {
      errors.member = "Select COP Status";
    }

    if (
      this.state.institution.trim() === "" &&
      this.state.status !== "Alumni"
    ) {
      errors.institution = "Enter Institution";
    }

    if (this.state.email.trim() === "") {
      errors.email = "Enter Email";
    }
    if (this.state.momo.trim() === "") {
      errors.momo = "Enter your mobile money number";
    }
    if (this.state.expectation.trim() === "") {
      errors.expectation = "Enter your expectation for the conference";
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
          this.props.register(this.state);
        }
        // if (this.props.success) {
        this.handleShow();
        // }
      }
    }, 5000);
  };
  render() {
    const { authError } = this.props;

    console.log(this.props.success);
    return (
      <div className="container">
        {/* <span\
        51,31,84,17
          className="spinner text-danger mx-auto text-center"
          //   role="status"
          id="spinning"
          hidden
          style={{ marginTop: "250px" }}
        >
          <RiseLoader margin={1} size={50} color={"#fff"} loading={true} />
        </span> */}
        {/* {this.state.registered ?  : ""} */}
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

            <SelectField
              label="Gender"
              name="gender"
              required
              value={this.state.gender}
              onChange={this.handleChange}
              errorstatus={this.state.error}
              errors={this.state.errors.gender}
            />

            {/* <TextField
              type="text"
              name="lastname"
              label="Lastname"
              className="form-control"
              value={this.state.lastname}
              onChange={this.handleChange}
              required
            /> */}
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
                "Non-PENSA",
              ]}
              errorstatus={this.state.error}
              errors={this.state.errors.status}
            />
            {this.state.status === "Pre-Tertiary" ||
            this.state.status === "Tertiary" ||
            this.state.status === "Non-PENSA" ? (
              <TextField
                type="text"
                name="institution"
                label="Institution"
                className="form-control"
                value={this.state.institution}
                onChange={this.handleChange}
                errorstatus={this.state.institution}
                errors={this.state.errors.institution}
              />
            ) : (
              ""
            )}
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
              label="Mobile Money Number"
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

            <Modal
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              show={this.state.show}
              onHide={this.handleClose}
              centered
            >
              <Modal.Body className="contact_success_modal_body">
                {/* <Image
                  className="contact_success_modal_img mx-auto text-center"
                  src="https://icon-library.net/images/success-icon/success-icon-5.jpg"
                  width="50%"
                /> */}
                {this.props.loaded ? (
                  <div className="text-center btn-danger">
                    <p>{authError}</p>
                  </div>
                ) : (
                  ""
                )}

                {this.props.success ? (
                  <>
                    {" "}
                    <h5>
                      Thank you{" "}
                      <span>
                        <strong>{this.state.name}</strong>!!
                      </span>{" "}
                      😇
                    </h5>
                    <h6>
                      You have successfuly registered for the second edition of
                      the Eschatological conference
                    </h6>
                    <b>
                      {" "}
                      <h6>
                        Check your email for the links to access the conference.
                      </h6>
                    </b>
                    <br />
                  </>
                ) : (
                  ""
                )}

                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={this.handleClose}
                  className="contact-email-text-btn"
                >
                  Close
                </Button>
              </Modal.Body>
            </Modal>
          </form>
        </div>
        {/* <img src={img} alt="bg" /> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    success: state.auth.success,
    loaded: state.auth.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (creds) => dispatch(register(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
