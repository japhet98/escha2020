import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router";
import { compose } from "redux";
import { signOut } from "../Store/Actions/authActions";
import Pagination from "./Pagination";

class ViewParticipants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      postsPerPage: 13,
    };
  }

  Logout = () => {
    if (this.props) {
      this.props.signOut();
    }
  };
  render() {
    const { member, auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    const currentPosts =
      member && member.slice(indexOfFirstPost, indexOfLastPost);

    let i = 1;

    const Total = (
      <div className="container-fluid mx-auto">
        <button type="button" className="btn btn-primary">
          Total Participants{" "}
          <span className="badge badge-success">{member && member.length}</span>
        </button>
      </div>
    );
    return (
      <div style={{ width: "100%" }}>
        <button
          className="btn btn-danger"
          style={{ float: "right" }}
          onClick={this.Logout}
        >
          Logout
        </button>
        {Total}
        <table className="table table-striped table-bordered table-sm">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>COP Status</th>
              <th>PENSA Status</th>
              <th>Eductation Level</th>
              <th>Institution</th>
              <th>Expectation</th>
              <th>Date Registered</th>
            </tr>
          </thead>

          {currentPosts &&
            currentPosts.map((e) => (
              <tbody key={e.id}>
                <tr>
                  <td>
                    <b>{i++}</b>
                  </td>
                  <td>{e.name}</td>
                  <td>{e.gender}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>{e.member}</td>
                  <td>{e.pensa}</td>
                  <td>{e.status}</td>
                  <td>{e.institution}</td>
                  <td>{e.expectation}</td>
                  <td>{e.dateRegistered}</td>
                </tr>
              </tbody>
            ))}
        </table>

        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={member ? member.length : 0}
          paginate={paginate}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    member: state.firestore.ordered.member,
  };
};

export default compose(
  connect(mapStateToProps, { signOut }),
  firestoreConnect([
    { collection: "member", orderBy: ["dateRegistered", "asc"] },
  ])
)(ViewParticipants);
