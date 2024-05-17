import React from "react";
import Navbar from "../layout/Navbar";
import "../css/SignUp.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";

function SignUp() {
  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
      style={{ height: "100vh" }}
    >
      <MDBCol className="position-relative d-flex justify-content-center align-items-center">
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <MDBCard className="my-5 bg-glass">
          <MDBCardBody className="p-5" style={{ width: "39rem" }}>
            <MDBRow>
              <MDBCol col="6">
                <MDBInput wrapperClass="mb-4" label="First name" id="form1" type="text" />
              </MDBCol>

              <MDBCol col="6">
                <MDBInput wrapperClass="mb-4" label="Last name" id="form2" type="text" />
              </MDBCol>
            </MDBRow>

            <MDBInput wrapperClass="mb-4" label="Mobile" id="form3" type="text" />
            <MDBInput wrapperClass="mb-4" label="Password" id="form4" type="password" />

            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Subscribe to our newsletter"
              />
            </div>

            <MDBBtn className="w-100 mb-4" size="md">
              sign up
            </MDBBtn>

            <div className="text-center">
              <p>or sign up with:</p>

              <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn tag="a" color="none" className="mx-3" style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      {/* </MDBRow> */}
    </MDBContainer>
  );
}

export default SignUp;
