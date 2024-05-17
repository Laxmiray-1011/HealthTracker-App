import React from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import logo from "../imges/logo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "2%",
    paddingBottom: "2%",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  logo: {
    width: "30%",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "2%",
      maxWidth: "100%",
      height: "auto",
      display: "block",
      margin: "0 auto",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2%",
      maxWidth: "100%",
      height: "auto",
      display: "block",
      margin: "0 auto",
    },
  },
  visit_links: {
    color: "white",
    // marginTop: "5%",
  },
  company: {
    color: "white",
    // marginTop: "5%",
  },
  contact: {
    color: "white",
    // marginTop: "0%",
  },
  divider: {
    paddingTop: "2%",
    color: "#73798D",
    paddingBottom: "2%",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  icons: {
    textAlign: "right",
    // marginRight: "5%",
    [theme.breakpoints.down("xs")]: {
      marginTop: "2%",
      marginBottom: "10%",
      textAlign: "center",
    },
  },
}));
const Footer = () => {
  const classes = useStyles();

  return (
    <div style={{ backgroundColor: "#081421" }}>
      <div style={{ margin: "4% 4% 0% 4%" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid xs={12} sm={12} md={3}>
            <div className={classes.logo}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: "177px", height: "51px", marginTop: "8%" }}
              />
            </div>
          </Grid>
          <Grid xs={12} sm={4} md={3}>
            <div className={classes.visit_links}>
              <h4>Visit Links</h4>
              <br />
              <div style={{ lineHeight: "1.3em", color: "#73798D" }}>
                <p>Privacy</p>
                <p>Terms & Condition</p>
                <p>FAQ</p>
              </div>
            </div>
          </Grid>
          <Grid xs={12} sm={4} md={3}>
            <div className={classes.company}>
              <h4>Company</h4>
              <br />
              <div style={{ lineHeight: "1.3em", color: "#73798D" }}>
                <p>Home</p>
                <p>About Us</p>
                <p>Contact Us</p>
              </div>
            </div>
          </Grid>
          <Grid xs={12} sm={4} md={3}>
            <div className={classes.contact}>
              <h4>Contact</h4>
              <br />
              <div style={{ lineHeight: "1.3em", color: "#73798D" }}>
                <p>+99 (0) 101 0000 888</p>
                <p>Info@yourdomain.com</p>
                <p>Info@yourdomain.com</p>
              </div>
            </div>
          </Grid>
        </Grid>
        <Divider style={{ backgroundColor: "white", opacity: "1.25" }} />
        <Grid
          container
          direction={{ xs: "column", sm: "row", md: "row" }}
          justifyContent={{ md: "flex-start", xs: "center" }}
          className={classes.divider}
        >
          <Grid xs={12} sm={6} md={6}>
            Copyright © 2023 phlox. All Rights Reserved.
          </Grid>
          <Grid xs={12} sm={6} md={6}>
            <div className={classes.icons}>
              <InstagramIcon style={{ color: "white", marginRight: "5%" }} />
              <LinkedInIcon style={{ color: "white", marginRight: "5%" }} />
              <FacebookIcon style={{ color: "white", marginRight: "5%" }} />
              <WhatsAppIcon style={{ color: "white", marginRight: "5%" }} />
              <TwitterIcon style={{ color: "white", marginRight: "5%" }} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
