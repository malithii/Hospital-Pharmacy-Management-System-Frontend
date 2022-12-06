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
        <Grid item lg={4}>
          <Box
            sx={{ bgcolor: "white", p: 2, borderRadius: 3, height: "31rem" }}
          >
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
              Expiring List
            </Typography>
            <Grid container>
              <Grid item lg={4}>
                <Typography
                  variant="h6"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Drug Name
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography
                  variant="h6"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Expire Date
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography
                  variant="h6"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Quantity
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Paracetamol
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  2023-02-25
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  52
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Augmentin
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  2023-04-25
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  71
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Nervijen
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  2024-06-07
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  60
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item lg={4}>
          <Box
            sx={{ bgcolor: "white", p: 2, borderRadius: 3, height: "31rem" }}
          >
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
              Expiring List
            </Typography>
            <Grid container>
              <Grid item lg={4}>
                <Typography
                  variant="h6"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Drug Name
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography
                  variant="h6"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Expire Date
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography
                  variant="h6"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Quantity
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Paracetamol
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  2023-02-25
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  52
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Augmentin
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  2023-04-25
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  71
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Nervijen
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  2024-06-07
                </Typography>
              </Grid>
              <Grid item lg={4} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  60
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
