import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import Meetingimg from "../imges/meeting.jpg";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "5%",
  },
  Meetingimg: {
    // [theme.breakpoints.up("xs")]: {
    //   height: "auto",
    //   padding: 0,
    //   margin: 0,
    // },
  },
  imageContainer: {
    maxWidth: "100%",
    height: "auto",
    display: "block",
    margin: "0 auto",
  },
  container2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "12px",
  },

  Heading: {
    fontSize: "20px",
    padding: "0% 3% 2% 3%",
    color: "#FD346E",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
  },
  SubHeading: {
    // fontWeight: "bold",
    fontSize: "45px",
    padding: "0% 3% 0% 3%",
    lineHeight: "1.3em",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
      maxWidth: "525px",
    },
  },
  desc: {
    fontSize: "16px",
    padding: "0% 3% 0% 3%",
    color: "#757E8C",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
      maxWidth: "500px",
    },
  },
  card_body: {
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
      marginTop: "5%",
      // marginBottom:"2%"
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
      marginTop: "5%",
      marginLeft: "9%",
    },
  },
  card_heading: {
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "2em",
  },
  card_desc: {
    color: "#727B8A",
    maxWidth: "283px",
    fontSize: "0.9rem",
    lineHeight: "1.7em",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
  },
  // cardWithIcon: {
  //   [theme.breakpoints.up("xs")]: {},
  //   [theme.breakpoints.up("sm")]: {
  //     textAlign: "center",
  //   },
  //   [theme.breakpoints.up("md")]: {
  //     textAlign: "left",
  //   },
  // },
}));

export default function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Box sx={{ flexGrow: 1, marginLeft: "5%", marginRight: "5%" }}>
        <Grid
          container
          direction={{ md: "row", xs: "column" }}
          justifyContent={{ xs: "center", md: "flex-start" }}
          alignItems="center"
          spacing={2}
        >
          <Grid xs={12} md={6} className={classes.Head_container}>
            <p className={classes.Heading}>Why Choose Us</p>
            <h2 className={classes.SubHeading}>
              An Exceptionally Unique Experience Tailored To You
            </h2>
            <p className={classes.desc}>
              We are idea generators, goal seekers, challenge-thirsty professionals, creators of
              unique Internet projects. We deliver unconventional solutions
            </p>
            <Grid
              container
              direction={{ md: "row", xs: "column" }}
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              spacing={2}
              className={classes.cardWithIcon}
              // style={{ margin: "5% 3% 3% 3%" }}
            >
              <Grid xs={12} md={6}>
                <div className={classes.card_body}>
                  <div style={{ marginBottom: "10px" }}>
                    <MailIcon />
                  </div>
                  <div className={classes.card_heading}>Minimal Design</div>
                  <div className={classes.card_desc}>
                    There are many variations passages of Lorem Ipsum majority
                  </div>
                </div>
              </Grid>
              {/* <br /> */}
              <Grid xs={12} md={6}>
                <div className={classes.card_body}>
                  <div style={{ marginBottom: "10px" }}>
                    <NotificationsIcon />
                  </div>
                  <div className={classes.card_heading}>Best Material</div>
                  <div className={classes.card_desc}>
                    There are many variations passages of Lorem Ipsum majority
                  </div>
                </div>
                <br />
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} md={6}>
            <div>
              <Container className={classes.container2}>
                <img src={Meetingimg} alt="Responsive" className={classes.image} />
              </Container>
              <br />
              <Container className={classes.container2}>
                <img src={Meetingimg} alt="Responsive" className={classes.image} />
              </Container>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
