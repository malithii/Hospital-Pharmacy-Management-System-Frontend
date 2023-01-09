import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import CustomCard from "../../../components/CustomCard";
import TitleBar from "../../../components/TitleBar";
import PharmacyCard from "../../../data/PharmacyCard";
import dashboardIcon from "../../../images/dashboardIcon.png";

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
      </Grid>
    </Box>
  );
};

export default PharmacyDashboard;
