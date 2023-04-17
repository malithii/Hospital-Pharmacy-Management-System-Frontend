import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomCard from "../../../components/CustomCard";
import CardDetails from "../../../data/CardDetails";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import TitleBar from "../../../components/TitleBar";
import dashboardIcon from "../../../images/dashboardIcon.png";
import Chart from "react-apexcharts";
import InventoryChart from "../../../components/InventoryChart";
import NearExpireDates from "../../../components/NearExpireDates";
import CustomCalendar from "../../../components/Calendar";

const Dashboard = () => {
  return (
    <Box>
      <TitleBar image={dashboardIcon} title="Dashboard" description="Home" />
      <Grid container spacing={2}>
        {CardDetails.map((card, index) => {
          return (
            <Grid item lg={3} xs={12}>
              <CustomCard key={index} {...card} />
            </Grid>
          );
        })}
        <Grid item lg={4} xs={12}>
          <InventoryChart />
        </Grid>
        <Grid item lg={4.5} xs={12}>
          {/* <Grid item sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                sx={{ minWidth: "200px" }}
                size="large"
                title="Click to view drug usage history"
              >
                View History
              </Button>
              <CustomCalendar />
            </Grid> */}
          <NearExpireDates />
        </Grid>
        <Grid item lg={3.5}>
          <Box sx={{ bgcolor: "white", p: 3, borderRadius: 3 }}>
            <CustomCalendar />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
