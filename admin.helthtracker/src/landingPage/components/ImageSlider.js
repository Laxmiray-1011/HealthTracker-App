import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  carousel: {
    position: "relative",
    width: "110rem",
    height: "30rem",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  test: {},
});

const ImageSlider = ({ images, interval }) => {
  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className={classes.carousel}>
        <CardMedia className={classes.image} component="img" image={images[currentImageIndex]} />
      </Card>
    </div>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.array.isRequired,
  interval: PropTypes.number.isRequired,
};

export default ImageSlider;
