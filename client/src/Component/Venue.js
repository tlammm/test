import React from "react";
import { Container } from "@material-ui/core";
import { Grid, Avatar } from "@material-ui/core";
import "../Style/Venue.css";

export default function Venue() {
  return (
    <Container maxWidth="lg" flexRow>
      <div class="search">Search bar</div>
      <div class="cafe">Shop</div>
      <div class="image">
        <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/coffee_break_j3of.svg"></img>
      </div>
    </Container>
  );
}