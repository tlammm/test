import React, { useState } from "react";
import { Card, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import "../Style/Venue.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const renderCafe = (item, index) => {
  return (
    <Grid item xs={12} key={index}>
      <Card>xs=12</Card>
    </Grid>
  );
};

export default function Venue() {
  const [cafe, setCafe] = useState([1,2,2]);
  return (
    <Container maxWidth="lg" flexRow>
      <Grid container spacing={3}>
        {cafe.map(renderCafe)}
      </Grid>
      {/* <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/coffee_break_j3of.svg"></img> */}
    </Container>
  );
}
