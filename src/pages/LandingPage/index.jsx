import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/medlink-logo.png";
import background from "../../images/landing-bg.jpg";
import { Opacity } from "@mui/icons-material";
const LandingPage = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#99c8f3",
      }}
    >
      <Grid container p={3} pl={4}>
        <Grid item lg={2} pl={5}>
          <img src={logo} height="150px" />
        </Grid>
        <Grid item lg={7} pt={8} sx={{ display: "inline-flex" }}>
          <Link
            to=""
            style={{
              textDecoration: "none ",
              color: "white",
              paddingRight: "50px",
            }}
          >
            <Typography variant="h5">Home</Typography>
          </Link>
          <Link to="" style={{ textDecoration: "none ", color: "white" }}>
            <Typography variant="h5">About</Typography>
          </Link>
        </Grid>
        <Grid item lg={3} pt={8} sx={{ display: "inline-flex" }}>
          <Link
            to=""
            style={{
              textDecoration: "none ",
              color: "white",
              paddingRight: "50px",
            }}
          >
            <Typography variant="h5">Pharmacist Login</Typography>
          </Link>
          <Link to="/login" style={{ textDecoration: "none ", color: "white" }}>
            <Typography variant="h5">Ward User Login</Typography>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={5.8} pl={9} pt={6}>
          <Typography variant="h1" sx={{ color: "white" }}>
            We are the one, the one you can trust
          </Typography>
          <Typography variant="h5" sx={{ color: "white" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate
          </Typography>
        </Grid>
        <Grid item lg={6}>
          <img src={background} width="100%" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
