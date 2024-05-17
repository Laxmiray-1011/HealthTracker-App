/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import axios from "axios";
import { getPrescriptions } from "api/patient/patientApi";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

export default function data() {
  const [users, setUsers] = useState([]);
  const access_token = sessionStorage.getItem("access_token");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getPrescriptions(access_token)
      .then((response) => {
        const responseData = response.data.data.items;
        const dataArray = Array.isArray(responseData) ? responseData : [responseData];
        setUsers(dataArray);
        // console.log(users);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteData = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:8089/api/patient/prescriptions/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        // Update the data after successful deletion
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const Doctor = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Image Doctor Name", accessor: "doctor", align: "left" },
      { Header: "place", accessor: "place", align: "left" },
      { Header: "Visit Date", accessor: "visitDate", align: "center" },
      { Header: "Description", accessor: "description", width: "25%", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: users.map((data) => ({
      doctor: <Doctor image={team2} name={data.dr_name} email="john@creative-tim.com" />,
      place: <Job title={data.place} />,
      visitDate: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data.dr_visit_date}
        </MDTypography>
      ),
      description: (
        <MDTypography
          color="text"
          fontWeight="medium"
          fontSize="13px"
          style={{
            width: "275px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {data.description}
        </MDTypography>
      ),
      action: (
        <MDBox>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MDTypography component="a" href="#" color="text">
              <Icon>more_vert</Icon>
              {data.id}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <VisibilityIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{data.id}</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
            </MDTypography>
          </Button>
        </MDBox>
      ),
    })),
  };
}
