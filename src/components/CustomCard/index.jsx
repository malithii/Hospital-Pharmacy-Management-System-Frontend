import { Box, Button, Grid, Typography } from "@mui/material";

const CustomCard = ({ image, value, title, buttonTitle }) => {
  return (
    <Box sx={{ p: 2, bgcolor: "white", borderRadius: 3 }}>
      <Grid container>
        <Grid item lg={4}>
          <img src={image} width="100%" alt="card" />
        </Grid>
        <Grid item lg={8}>
          <Grid item lg={12} display="flex" justifyContent="flex-end">
            <Typography gutterBottom variant="h6" component="div">
              {value}
            </Typography>
          </Grid>
          <Grid item lg={12} display="flex" justifyContent="flex-end">
            <Typography gutterBottom variant="h6" component="div">
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
            <Button variant="outlined" size="small">
              {buttonTitle}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomCard;
