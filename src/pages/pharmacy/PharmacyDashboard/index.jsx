import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import CustomCalendar from "../../../components/Calendar";
import CustomCard from "../../../components/CustomCard";
import TitleBar from "../../../components/TitleBar";
import PharmacyCard from "../../../data/PharmacyCard";
import dashboardIcon from "../../../images/dashboardIcon.png";
import Chart from "react-apexcharts";
import NearExpireDates from "../../../components/NearExpireDates";
import InventoryChart from "../../../components/InventoryChart";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { expireDateNotification } from "../../../App/notificationsService";

const PharmacyDashboard = () => {
  const [value, setValue] = useState(dayjs());

  const isWeekend = (date) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  const user = useSelector((state) => state.loginHPMS._id);
  useEffect(() => {
    expireDateNotification({ user: user }, (response) => {
      console.log(response);
    });
  }, []);

  return (
    <Box>
      <TitleBar image={dashboardIcon} title="Dashboard" description="Home" />
      <Grid container spacing={2}>
        {PharmacyCard.map((card, index) => {
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

export default PharmacyDashboard;
