import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import reports from "../../../images/reports.png";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const WardReports = () => {
  const navigate = useNavigate();
  const navigateToFullReport = () => {
    let path = `/wardfullreport`;
    navigate(path);
  };
  return (
    <Box>
      <TitleBar image={reports} title="Reports" description="View Reports" />

      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3 }}>
            <Box sx={{ display: "flex", pb: 2 }}>
              <Typography variant="h7" fontWeight={"bold"} color="#495579">
                This Week's Drug Usage
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                size="small"
                onClick={navigateToFullReport}
              >
                View Full Details
              </Button>
            </Box>
            <Chart
              type="bar"
              width="100%"
              height="200rem"
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
                  ],
                },
              }}
              series={[
                {
                  name: "series-1",
                  data: [30, 40, 45, 50, 49, 60, 70, 91],
                },
              ]}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WardReports;
