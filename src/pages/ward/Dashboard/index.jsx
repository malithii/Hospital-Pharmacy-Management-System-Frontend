import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CustomCard from "../../../components/CustomCard";
import CardDetails from "../../../data/CardDetails";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BarChart from "../../../components/Charts/BarChart";
import PieChart from "../../../components/Charts/PieChart";
import Tables from "../../../components/Tables";

const Dashboard = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Box>
      <Grid container spacing={2}>
        {CardDetails.map((card, index) => {
          return (
            <Grid item lg={3} xs={12}>
              <CustomCard key={index} {...card} />
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid item lg={4}>
          <Paper>
            <BarChart />
          </Paper>
        </Grid>
        <Grid item lg={4}>
          <Paper>
            <BarChart />
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper>
            <PieChart />
          </Paper>
        </Grid>
        <Grid item lg={12}>
          <Typography variant="h5">Drug Inventory Summary</Typography>
        </Grid>
        <Grid item lg={12}>
          <Tables />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
