import React from "react";
import ImageSlider from "../components/ImageSlider";
import { makeStyles } from "@material-ui/core/styles";
import doc1 from "../imges/doc1.png";
import doc2 from "../imges/doc2.jpg";
import doc3 from "../imges/doc3.jpg";
import Grid from "@mui/material/Grid";
import Box from "@material-ui/core/Box";
import { TextField, Button, Paper } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "1.5%",
    marginBottom: "5%",
  },
}));

const Services = () => {
  const classes = useStyles();
  const images = [doc1, doc2, doc3];

  return (
    <div className={classes.container}>
      <Box>
        <Box>
          <Box>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <Grid xs={12}>
                <div>
                  <ImageSlider images={images} interval={4000} />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br />
      </Box>
    </div>
  );
};

export default Services;
