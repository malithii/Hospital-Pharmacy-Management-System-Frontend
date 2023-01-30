import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation, useSearchParams } from "react-router-dom";

const DetailedOrders = () => {
  const location = useLocation();

  console.log(location.state);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {location.state.detailedOrder.orderItems.map((e) => (
            <div>{e.drug.drugId}</div>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedOrders;
