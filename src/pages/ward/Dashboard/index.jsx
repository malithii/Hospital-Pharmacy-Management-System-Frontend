import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomCard from "../../../components/CustomCard";
import CardDetails from "../../../data/CardDetails";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import TitleBar from "../../../components/TitleBar";
import dashboardIcon from "../../../images/dashboardIcon.png";
import Chart from "react-apexcharts";

const Dashboard = () => {
  return (
    <Box>
      <TitleBar image={dashboardIcon} title="Dashboard" description="Home" />
      <Grid container spacing={2} mt={2}>
        {CardDetails.map((card, index) => {
          return (
            <Grid item lg={3} xs={12}>
              <CustomCard key={index} {...card} />
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3} pt={3}>
        <Grid item lg={4}>
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3 }}>
                <Chart
                  type="bar"
                  width="100%"
                  height="180px"
                  options={{
                    chart: {
                      id: "basic-bar",
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 4,
                        horizontal: true,
                      },
                    },
                    xaxis: {
                      categories: [
                        "Non-Refrigerated",
                        "Refrigerated",
                        "Freezing",
                      ],
                    },
                  }}
                  series={[
                    {
                      name: "series-1",
                      data: [30, 40, 45],
                    },
                  ]}
                />
              </Box>
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3 }}>
                <Chart
                  type="bar"
                  width="100%"
                  height="200px"
                  options={{
                    chart: {
                      id: "basic-bar",
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 4,
                        horizontal: true,
                      },
                    },
                    xaxis: {
                      categories: [
                        "General Medicines",
                        "Pharmacy Medicines",
                        "Prescription Only",
                        "Controlled drugs",
                      ],
                    },
                  }}
                  series={[
                    {
                      name: "series-1",
                      data: [30, 40, 20, 45],
                    },
                  ]}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
