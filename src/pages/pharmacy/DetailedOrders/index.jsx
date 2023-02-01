import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation, useSearchParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const DetailedOrders = () => {
  const location = useLocation();

  console.log(location.state);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                <Typography fontWeight={"bold"}>Ward: </Typography>
                <Typography fontWeight={"bold"}>
                  {location.state.detailedOrder.wardUser.wardNo}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                <Typography fontWeight={"bold"}>Date: </Typography>
                <Typography fontWeight={"bold"}>
                  {location.state.detailedOrder.date}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {location.state.detailedOrder.orderItems.map((e) => (
            <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, mt: 2 }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography>{e.drug.drugId}</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography>{e.quantityOrdered}</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography>Batch</Typography>
                  <TextField size="small" sx={{ ml: "20px", mr: "30px" }} />
                  <Typography>Quantity</Typography>
                  <TextField size="small" sx={{ ml: "20px" }} />
                  <IconButton>
                    {"   "} <AddCircleIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedOrders;
