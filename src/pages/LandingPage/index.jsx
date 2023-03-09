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
      <Grid container pl={4}>
        <Grid item lg={2} pl={5}>
          <img src={logo} height="150px" />
        </Grid>
        <Grid item lg={7} pt={8} sx={{ display: "inline-flex" }}></Grid>
        <Grid
          item
          lg={3}
          pt={8}
          sx={{ display: "inline-flex", justifyContent: "center" }}
        >
          <Link to="/login" style={{ textDecoration: "none ", color: "white" }}>
            <Typography variant="h5"> Login</Typography>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={5.8} pl={9} pt={14}>
          <Typography variant="h2" sx={{ color: "white" }}>
            We are the one, the one you can trust
          </Typography>
          <Typography variant="h5" sx={{ color: "white" }}>
            medlink is a hospital pharmacy management system that connects the
            pharmacy and wards and makes the pharmacy workflow more efficient
            and effective.
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
