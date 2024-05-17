import * as React from "react";
// import Container from "@mui/material/Container";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ContactPhoneTwoTone from "@mui/icons-material/ContactPhoneTwoTone";
// import doctor1 from "../imges/doctor2.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
    },
  },
  heading: {
    marginTop: "4rem",
    fontSize: "1rem",
    color: "white",
    textShadow: "10px 1px 10px rgba(20, 0, 0, 0.75)",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
    },
  },
  paragraph: {
    fontFamily: "revert-layer",
    color: "white",
    fontSize: "60px",
    textShadow: "10px 1px 10px rgba(20, 0, 0, 0.75)",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
    },
  },
  emailicon: {
    color: "white",
    textShadow: "10px 1px 10px rgba(20, 0, 0, 0.75)",
  },
  card_body: {
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      // textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      // textAlign: "center",
    },
    background: "#5e35b1",
    marginLeft: "10%",

    "&:hover": {
      background: "#f00",
      borderRadius: "12px",
      padding: "8%,8%,5%,8%",
    },
  },

  card_heading: {
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "2em",
    textShadow: "10px 1px 10px rgba(20, 0, 0, 0.75)",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
    },
  },
  card_desc: {
    color: "white",
    fontSize: "0.9rem",
    lineHeight: "1.7em",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
    },
    textShadow: "10px 1px 10px rgba(20, 0, 0, 0.75)",
  },
  contain: {
    fontSize: "20px",
    padding: "6% 3% 2% 14%",
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
  query: {
    fontWeight: "bold",
    fontSize: "45px",
    padding: "0% 3% 0% 13%",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
      maxWidth: "564px",
    },
  },
  note: {
    fontSize: "16px",
    padding: "0% 3% 0% 13%",
    color: "#757E8C",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
      maxWidth: "717px",
    },
  },
  formdata: {
    padding: "0% 3% 2% 13%",
    backgroundColor: "#eceff1",
    marginBottom: "3%",
    marginLeft: "5rem",
    marginRight: "2rem",
    [theme.breakpoints.up("xs")]: {
      // textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      // textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      // textAlign: "center",
      maxWidth: "717px",
    },
  },
  container1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginRight: "2rem",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
      maxWidth: "717px",
    },
  },
  image: {
    maxWidth: "100%",
    maxHeight: "200%",
    borderRadius: "10px",
  },
}));
export default function ContactUs() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ l: 5 }}
        >
          <Box
            container
            direction="row"
            sx={{
              flexGrow: 1,
              mb: 10,
              borderRadius: "16px",
              marginLeft: "15%",
              marginRight: "15%",
              marginTop: "1%",
              marginBottom: "5%",
              padding: "0% 8% 5% 8%",
              borderColor: "secondary.main",
              // width:0,
              height: "20%",
              backgroundColor: "#5e35b1",
              boxShadow: 20,
            }}
          >
            <Grid
              container
              direction={{ md: "row", xs: "column" }}
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              spacing={2}
            >
              <Grid xs={12}>
                <p className={classes.heading}>Contact With Us</p>
                <p className={classes.paragraph}>Lets Create Progress Together For Greate Health</p>
              </Grid>
              <Grid
                container
                direction={{ md: "row", xs: "column" }}
                justifyContent={{ xs: "center", md: "flex-start" }}
                alignItems={{ xs: "center", md: "flex-start" }}
                spacing={2}
              >
                <Grid xs={12} md={6}>
                  <div className={classes.card_body}>
                    <div style={{ marginBottom: "10px" }}>
                      <EmailIcon style={{ color: "white", fontSize: "3rem" }} />
                    </div>
                    <p className={classes.card_heading}>Our Email Address:</p>
                    <p className={classes.card_desc}>
                      healthtracker123@gmail.com<br></br>healthtracker@gmail.com
                    </p>
                  </div>
                </Grid>
                <Grid xs={12} md={6}>
                  <div className={classes.card_body}>
                    <div style={{ marginBottom: "10px" }}>
                      <ContactPhoneTwoTone style={{ color: "white", fontSize: "3rem" }} />
                    </div>
                    <p className={classes.card_heading}>Our Contact Numbers:</p>
                    <p className={classes.card_desc}>
                      +91-1234567890<br></br>+91-5678904321
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </div>
      <div>
        <Box className={classes.box}>
          <Grid
            container
            direction={{ md: "row", xs: "column" }}
            justifyContent={{ xs: "center", md: "flex-start" }}
            alignItems="center"
            spacing={2}
          >
            <Grid xs={12} md={6} className={classes.Headcontain}>
              <p className={classes.contain}>Why Choose Us</p>
              <h2 className={classes.query}>
                Have a Question? <br></br>
                Get in Touch!
              </h2>
              <p className={classes.note}>
                Your email address will not be published.Required field are marked*.
              </p>
            </Grid>
          </Grid>
          <Grid
            container
            direction={{ md: "row", xs: "column" }}
            justifyContent={{ xs: "center", md: "flex-start" }}
            alignItems="center"
            spacing={2}
          >
            <Grid xs={12}>
              <div className={classes.formdata}>
                <form>
                  <Grid
                    container
                    // spacing={2}
                    width={500}
                    direction={{ md: "row", xs: "column" }}
                    justifyContent={{ xs: "center", md: "flex-start" }}
                    marginBottom={2}
                  >
                    <Grid style={{ marginTop: "3rem", marginBottom: "1rem" }} xs={12}>
                      <TextField
                        name="name"
                        label="Name"
                        required
                        InputProps={{
                          style: {
                            borderRadius: "10px",
                            backgroundColor: "whitesmoke",
                            boxShadow: "5px 1px 5px rgba(20, 0, 0, 0.75)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid style={{ marginTop: "1rem", width: "100%" }}>
                      <TextField
                        name="email"
                        label="Email"
                        required
                        InputProps={{
                          style: {
                            borderRadius: "10px",
                            backgroundColor: "whitesmoke",
                            boxShadow: "5px 1px 5px rgba(20, 0, 0, 0.75)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid style={{ marginTop: "2rem", width: "100%" }}>
                      <TextField
                        name="phone"
                        label="phone"
                        required
                        InputProps={{
                          style: {
                            borderRadius: "10px",
                            backgroundColor: "whitesmoke",
                            boxShadow: "5px 1px 5px rgba(20, 0, 0, 0.75)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "2rem" }}>
                      <TextField
                        name="message"
                        label="Message"
                        textarea
                        rows={4}
                        fullWidth
                        required
                        InputProps={{
                          style: {
                            height: "150px",
                            width: "300px",
                            borderRadius: "10px",
                            backgroundColor: "whitesmoke",
                            boxShadow: "5px 1px 5px rgba(20, 0, 0, 0.75)",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    style={{
                      marginTop: "2rem",
                      marginBottom: "2rem",
                      boxShadow: "5px 1px 10px",
                      backgroundColor: "#6a1b9a",
                    }}
                  >
                    Send Query
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
