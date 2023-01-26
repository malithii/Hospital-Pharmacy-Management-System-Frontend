import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import CustomCalendar from "../../../components/Calendar";
import CustomCard from "../../../components/CustomCard";
import TitleBar from "../../../components/TitleBar";
import PharmacyCard from "../../../data/PharmacyCard";
import dashboardIcon from "../../../images/dashboardIcon.png";
import Chart from "react-apexcharts";

const PharmacyDashboard = () => {
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
        <Grid item lg={7} xs={12}>
          <Box
            sx={{
              bgcolor: "white",
              pt: 2,
              pl: 2,
              pr: 2,
              borderRadius: 3,
              height: "380px",
            }}
          >
            <Chart
              type="bar"
              width="100%"
              height="100%"
              options={{
                chart: {
                  id: "basic-bar",
                },

                xaxis: {
                  categories: [
                    "Allopurinol",
                    "Amoxicillin",
                    "Bisoprolol",
                    "Cefalexin",
                    "Domperidone ",
                    "Escitalopram",
                    "Finasteride ",
                    "Hydroxocobalamin ",
                    "Allopurinol",
                    "Amoxicillin",
                    "Bisoprolol",
                    "Cefalexin",
                    "Domperidone ",
                    "Escitalopram",
                    "Finasteride ",
                    "Hydroxocobalamin ",
                  ],
                },
                title: {
                  text: "Inventory",
                  align: "left",
                  margin: 10,
                  offsetX: 0,
                  offsetY: 0,
                  floating: false,
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: undefined,
                    color: "#263238",
                  },
                },
              }}
              series={[
                {
                  name: "series-1",
                  data: [
                    30, 40, 45, 50, 49, 60, 70, 10, 30, 130, 45, 50, 39, 60, 20,
                    91,
                  ],
                },
              ]}
            />
          </Box>
        </Grid>
        <Grid item lg={5} xs={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, pt: 3, pb: 3 }}>
            <Grid item sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                sx={{ minWidth: "200px" }}
                size="large"
                title="Click to view drug usage history"
              >
                View History
              </Button>
              <CustomCalendar />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PharmacyDashboard;
