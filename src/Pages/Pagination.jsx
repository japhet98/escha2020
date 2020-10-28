import React from "react";
import {
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
  MDBCol,
  MDBRow,
} from "mdbreact";
const Pagination = ({ postsPerPage, totalPosts, paginate, lnk }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <MDBRow className="mx-auto">
        <MDBCol>
          <MDBPagination circle>
            <MDBPageItem>
              <MDBPageNav className="page-link">
                <span>First</span>
              </MDBPageNav>
            </MDBPageItem>

            <MDBPageItem onClick={() => paginate(pageNumbers[0])}>
              <MDBPageNav className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </MDBPageNav>
            </MDBPageItem>
            {pageNumbers.map((number) => (
              <MDBPageItem active key={number}>
                <MDBPageNav
                  className="page-link"
                  onClick={() => paginate(number)}
                >
                  {number} <span className="sr-only">(current)</span>
                </MDBPageNav>
              </MDBPageItem>
            ))}
            <MDBPageItem
              onClick={() => paginate(pageNumbers[pageNumbers.length - 1])}
            >
              <MDBPageNav className="page-link">&raquo;</MDBPageNav>
            </MDBPageItem>

            <MDBPageItem>
              <MDBPageNav className="page-link">Last</MDBPageNav>
            </MDBPageItem>
          </MDBPagination>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default Pagination;
