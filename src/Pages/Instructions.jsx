import React, { Component } from "react";
import { MDBContainer, MDBAlert } from "mdbreact";
import { withRouter } from "react-router";

class Instructions extends Component {
  Register = () => {
    this.props.history.push("/register");
  };
  render() {
    const IndexAlertPage = ({ Children, color, dismiss }) => {
      return (
        <MDBContainer>
          <MDBAlert color={color} dismiss={dismiss}>
            {Children}
          </MDBAlert>
        </MDBContainer>
      );
    };
    return (
      <div className="container form-group">
        <IndexAlertPage
          color="warning"
          Children={
            <strong className="text-center">Registration Instructions</strong>
          }
        />
        <IndexAlertPage
          color="warning"
          Children={
            <div>
              <h6>
                Enter your active email since conference links will be sent to
                you via email
              </h6>

              <h6>
                Check your input before you register by clicking on the{" "}
                <b>Check Input</b> button
              </h6>

              <h6>
                Complete your registration by clicking on the <b>Register</b>{" "}
                button
              </h6>
            </div>
          }
        />

        <IndexAlertPage
          color="warning"
          Children={
            <div>
              <h5>PAYMENT OPTION</h5>
              <h6>
                <label>
                  {" "}
                  1. When on our checkout form, click the Mobile Money option
                </label>
                <label>2.Input your mobile money number</label>
                <label> 3.Choose your provider </label>
                <label>4.Click on Confirm </label>
              </h6>

              <div>
                <h5>
                  <b>Important to Note</b>
                </h5>
                <label>
                  For <b>Vodafone</b> users, after you confirm your mobile money
                  number and provider, you will have to dial *110# on your
                  mobile phone, select option 4: Make Payments and select option
                  4: Generate Voucher and enter your pin to complete the
                  request. You will receive a text message containing your
                  voucher code after which you will come back to the checkout
                  form to click on 'I have received my voucher code.' Input the
                  voucher code to authorise the payment and complete the
                  transaction.
                </label>
              </div>
            </div>
          }
        />
        <div className="container" style={{ width: "50%" }}>
          <button
            type="button"
            className="btn btn-success form-control container"
            onClick={this.Register}
          >
            Finish
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Instructions);
