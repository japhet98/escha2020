import React, { Component } from "react";
import { register } from "../Store/Actions/authActions";
import { connect } from "react-redux";
import { TextField, SelectField } from "../Component/Constant";
// import img from "../assets/IMG-20201007-WA0008.jpg";
import "./index.css";
import RiseLoader from "react-spinners/CircleLoader";
import { Button, Modal } from "react-bootstrap";
import { usePaystackPayment } from "react-paystack";
import { MDBContainer, MDBAlert } from "mdbreact";

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
      pensa: "",
      network: "",
      errors: {},
      error: true,
      loading: false,
      isvalid: false,
      invalid: "Your input data is not valid",
      registered: false,
      show: false,
      _loading: false,
      validated: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
    // this.setState({ name: "" });
    this.resetForm();
  };

  handleShow = () => {
    this.setState({ show: true, _loading: false });
  };
  resetForm() {
    this.setState({
      // email: "",

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
    this.setState({
      isvalid: false,
      invalid: "Check the validity of your input",
    });
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
      (this.state.member.trim() === "Select Status") |
      (this.state.member.trim() === "")
    ) {
      errors.member = "Select COP Status";
    }

    if (
      (this.state.pensa.trim() === "Select Status") |
      (this.state.pensa.trim() === "")
    ) {
      errors.pensa = "Select PENSA Membership Status";
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
        this.setState({
          isvalid: isValid,
        });
        this.setState({
          validated: true,
        });
        document.getElementById("spinning").hidden = true;
        document.getElementById("form").hidden = false;

        // if (isValid) {
        //   console.log("IT IS VALID");
        // }
        // if (isValid) {
        //   this.props.register(this.state);
        // }
        // // if (this.props.success) {
        // this.handleShow();
        // // }
      }
    }, 5000);
  };

  Submit = (isValid) => {
    if (this.state.isvalid) {
      this.props.register(this.state);
      this.handleShow();
    }
  };

  // you can call this function anything
  onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    this.Submit();
    console.log(reference);
  };

  // you can call this function anything
  onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // this.handleSubmit();
    console.log("closed");
  };

  render() {
    const { authError } = this.props;

    const config = {
      reference: new Date().getTime(),
      email: this.state.email,
      firstname: this.state.name.split(" ").shift(),
      amount:
        this.state.status === "Pre-Tertiary"
          ? 200
          : this.state.status === "Tertiary"
          ? 500
          : 1000,
      publicKey: "pk_live_195c388bc88cfe71e44120fe6b1c5c74e6ba8cce",
      currency: "GHS",
    };

    const PaystackHookExample = () => {
      const initializePayment = usePaystackPayment(config);
      return (
        <div>
          <button
            type="button"
            className="btn btn-success form-control "
            onClick={() => {
              initializePayment(this.onSuccess, this.onClose);
            }}
          >
            Register
          </button>
        </div>
      );
    };
    const IndexAlertPage = ({ Children, color, dismiss }) => {
      return (
        <MDBContainer>
          <MDBAlert color={color} dismiss={dismiss}>
            {Children}
          </MDBAlert>
        </MDBContainer>
      );
    };

    const Instructions = (
      <div className="container-fluid">
        <IndexAlertPage
          color="warning"
          dismiss
          Children={
            <strong className="text-center">Registration Instructions</strong>
          }
        />
        <IndexAlertPage
          color="warning"
          dismiss
          Children={
            <h5>
              Enter your active email since conference links will be sent to you
              via email
            </h5>
          }
        />
        <IndexAlertPage
          color="warning"
          dismiss
          Children={
            <h5>
              Check your input before you register by clicking on the{" "}
              <b>Check Input</b> button
            </h5>
          }
        />
        <IndexAlertPage
          color="warning"
          dismiss
          Children={
            <h5>
              Complete your registration by clicking on the <b>Register</b>{" "}
              button
            </h5>
          }
        />
      </div>
    );
    return (
      <div className="container">
        <div className="Loading-header" id="spinning" hidden>
          <RiseLoader margin={1} size={100} color={"#fff"} loading={true} />{" "}
        </div>{" "}
        <div className="my-container">
          <form onSubmit={this.handleSubmit} className="form-group" id="form">
            {Instructions}
            <div className="container">
              {this.state.validated ? (
                this.state.isvalid ? (
                  <h4 className="btn-success mx-auto text-center">
                    Your input data is Valid
                  </h4>
                ) : (
                  <h4 className="btn-danger  mx-auto text-center">
                    Your input data is invalid
                  </h4>
                )
              ) : (
                ""
              )}
            </div>
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
              name="pensa"
              required
              value={this.state.pensa}
              onChange={this.handleChange}
              data={["Select Status", "Member", "Not Member"]}
              errorstatus={this.state.error}
              errors={this.state.errors.pensa}
            />
            <SelectField
              label="Education Status"
              name="status"
              required
              value={this.state.status}
              onChange={this.handleChange}
              data={["Select Status", "Pre-Tertiary", "Tertiary", "Alumni"]}
              errorstatus={this.state.error}
              errors={this.state.errors.status}
            />
            {this.state.status === "Pre-Tertiary" ||
            this.state.status === "Tertiary" ? (
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
              label="Phone Number"
              className="form-control"
              value={this.state.momo}
              onChange={this.handleChange}
              required
              errorstatus={this.state.error}
              errors={this.state.errors.momo}
            />

            <div style={{ marginTop: "20px" }} className="container row">
              <div
                className="col-lg-6 col-md-6 col-sm-6"
                style={{ marginTop: "20px" }}
              >
                <button type="submit" className="btn btn-success form-control">
                  Check Input
                </button>
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-6"
                style={{ marginTop: "20px" }}
              >
                {this.state.validated && this.state.isvalid ? (
                  <PaystackHookExample />
                ) : (
                  ""
                )}
              </div>
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
                  className="contact-email-text-btn btn-primary"
                >
                  Close
                </Button>
              </Modal.Body>
            </Modal>
          </form>
          {/* <PaystackHookExample /> */}
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
