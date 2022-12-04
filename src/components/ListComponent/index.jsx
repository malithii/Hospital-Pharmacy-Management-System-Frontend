import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ListComponent = ({ x, color, label }) => {
  return (
    <Grid item lg={x} sx={{ display: "inline-flex" }} p={1}>
      <Box height={20} width={20} bgcolor={color}></Box>
      <Typography ml={2}>{label}</Typography>
    </Grid>
  );
};

export default ListComponent;
