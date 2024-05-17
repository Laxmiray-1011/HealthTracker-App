import React from "react";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../imges/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Menu from "@mui/material/Menu";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      marginRight: "0%",
    },
  },
  logo: {
    width: "200x",
    height: "75px",
    [theme.breakpoints.down("sm")]: {
      width: "155px",
      height: "75px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "130px",
      height: "75px",
    },
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
  tab: {
    outline: "none",
    paddingRight: "25px",
    color: "black",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("lg")]: {
      paddingRight: "10px",
    },
  },
  menuTop: {
    marginLeft: "0",
    marginRight: "5%",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  registervendorBtn: {
    backgroundColor: "#2dd1d1",
    cursor: "pointer",
    // fontWeight: "100",
    color: "white",
    padding: "10px 15px",
    // width: "300px",
    borderRadius: "30px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Box sx={{ flexGrow: 1, marginLeft: "5%", marginRight: "5%" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6} container direction="row">
            <div className={classes.menuTop}>
              <Paper sx={{ width: 70, maxWidth: "100%" }}>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon style={{ fontSize: "50px", color: "black" }} />
                </Button>
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
                      <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <BookIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Blog</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <SubscriptionsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Subscriptions</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContactPageIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Contact Us</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <InfoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>About Us</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign In</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <PersonAddAlt1Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign Up</ListItemText>
                  </MenuItem>
                </Menu>
              </Paper>
            </div>
            <div className={classes.logo}>
              <img src={logo} alt="not" className={classes.imgStyle} />
            </div>
          </Grid>
          <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
            <div className={classes.part2}>
              <Link className={classes.tab} to="/">
                Home
              </Link>

              <Link className={classes.tab} to="/">
                Blog
              </Link>

              <Link className={classes.tab} to="/">
                Subscription
              </Link>

              <Link className={classes.tab} to="/">
                Contact
              </Link>

              <Link className={classes.tab} to="/">
                About
              </Link>

              <Link className={classes.tab} to="/patient/sign-up">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#6001D3", borderRadius: "25px" }}
                  style={{ color: "white" }}
                >
                  Sign Up
                </Button>
              </Link>

              <Link className={classes.tab} to="/patient/sign-in">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#6001D3", borderRadius: "25px" }}
                  style={{ color: "white" }}
                >
                  Sign In
                </Button>
              </Link>
            </div>
            <div className={classes.registervendorBtn}>Register as a vendor</div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
