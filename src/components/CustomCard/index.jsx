import { Box, Button, Grid, Typography } from "@mui/material";

const CustomCard = ({ image, value, title, buttonTitle }) => {
  return (
    <Box sx={{ p: 4, bgcolor: "white", borderRadius: 3 }}>
      <Grid container>
        <Grid item lg={5}>
          <img src={image} style={{ height: "100%" }} />
        </Grid>
        <Grid item lg={7}>
          <Grid item lg={12} display="flex" justifyContent="flex-end">
            <Typography gutterBottom variant="h5" component="div">
              {value}
            </Typography>
          </Grid>
          <Grid item lg={12} display="flex" justifyContent="flex-end">
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            lg={12}
            display="flex"
            justifyContent="flex-end"
            paddingTop={2}
          >
            <Button variant="outlined">{buttonTitle}</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomCard;
