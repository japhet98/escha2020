import React from "react";
import { MDBContainer, MDBAlert } from "mdbreact";

export const IndexAlertPage = ({ Children, color, dismiss }) => {
  return (
    <MDBContainer>
      <MDBAlert color={color} dismiss={dismiss}>
        {Children}
      </MDBAlert>
    </MDBContainer>
  );
};
