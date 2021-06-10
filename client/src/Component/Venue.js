import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import "../Style/Venue.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    flexDirection: "row",
    display: "flex",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const renderCafe = (item, index) => {
  return (
    <Grid item xs={12} key={index}>
      <Card classname={classes.root}>
        <CardActions>
          <CardMedia
            className={classes.media}
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
            title="Image"
          />
        </CardActions>
        <CardActions>
          <CardHeader
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"/>
        </CardActions>
        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      </Card>
    </Grid>
  );
};

export default function Venue() {
  const [cafe, setCafe] = useState([1, 2, 2]);
  return (
    <Container maxWidth="lg" flexRow>
      <Grid container spacing={3}>
        {cafe.map(renderCafe)}
      </Grid>
      {/* <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/coffee_break_j3of.svg"></img> */}
    </Container>
  );
}
