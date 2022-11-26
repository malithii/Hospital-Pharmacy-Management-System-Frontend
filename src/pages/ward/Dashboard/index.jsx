import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { FcApproval } from "react-icons/fc";
import CustomCard from "../../../components/CustomCard";
import CardDetails from "../../../data/CardDetails";

const Dashboard = () => {
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
    </Box>
  );
};

export default Dashboard;
