import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomCard from "../../../components/CustomCard";
import CardDetails from "../../../data/CardDetails";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Box>
      <Grid container spacing={2}>
        {CardDetails.map((card, index) => {
          return (
            <Grid item xs={3}>
              <CustomCard key={index} {...card} />
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={3}>
          <Calendar onChange={onChange} value={value} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
