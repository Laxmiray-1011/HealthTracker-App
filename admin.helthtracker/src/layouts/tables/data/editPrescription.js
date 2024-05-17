import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function editPrescription() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call to fetch the data
        const response = await axios.get("https://api.example.com/visit-details");
        const data = response.data;

        // Set the form data based on the received data
        // setFormData({
        //   doctorName: data.doctorName,
        //   place: data.place,
        //   visitDate: data.visitDate,
        //   description: data.description,
        // });
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);
  const [formData, setFormData] = useState({
    doctorName: "",
    place: "",
    visitDate: "",
    description: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or other actions
    // using the form data
    console.log(formData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Edit Prescription</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="DOCTOR NAME"
                    fullWidth
                    variant="outlined"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="PLACE"
                    fullWidth
                    variant="outlined"
                    name="place"
                    value={formData.place}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="VISIT DATE"
                    fullWidth
                    variant="outlined"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="DESCRIPTION"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />

                  <Button type="submit" variant="contained" sx={{ marginTop: "20px" }}>
                    Submit
                  </Button>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default editPrescription;
