import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const viewAllDrugUsage = () => {
  return (
    <Box>
      <Grid container>
        <Grid item>
          <Box sx={{ bgcolor: "white", p: 4 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
              View All Drug Usage Details
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default viewAllDrugUsage;
