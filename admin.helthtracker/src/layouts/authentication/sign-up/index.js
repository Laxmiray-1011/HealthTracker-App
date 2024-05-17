// react-router-dom components
import { Link } from "react-router-dom";
import { useState } from "react";

// Axios and API
import axios from "axios";
import { signUp } from "api/patient/patientApi";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cover() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const namePattern = /^[A-Za-z]+$/;
    const mobileNumberPattern = /^[0-9]{10}$/;

    if (!name || !mobile || !password) {
      toast.error("please enter the details");
      return;
    } else if (!namePattern.test(name)) {
      toast.error("Name can only contain lettters !!");
    } else if (!mobileNumberPattern.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    } else {
      try {
        const response = await signUp(name, mobile, password);

        if (response.data.success === true) {
          const user = response.data.data.user;
          const accessToken = response.data.data.access_token;

          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("access_token", accessToken);

          window.location.href = "/patient/dashboard";
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error:", error);
      }
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="tel"
                label="Mobile"
                variant="standard"
                fullWidth
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                sign Up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/patient/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ fontSize: "16px", maxWidth: "500px", width: "100%", height: "auto" }}
        />
      </Card>
    </CoverLayout>
  );
}

export default Cover;
