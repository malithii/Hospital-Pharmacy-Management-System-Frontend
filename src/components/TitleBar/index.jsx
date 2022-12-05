import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";

const TitleBar = ({ image, title, description }) => {
  return (
    <Box
      sx={{
        padding: "25px",
        bgcolor: "white",
        borderRadius: 3,
        marginBottom: 2,
      }}
    >
      <Grid container>
        <Grid item lg={0.5}>
          <img src={image} height="50px" alt="logo" />
        </Grid>
        <Grid item lg={4}>
          <Grid item lg={12}>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          <Grid item lg={12}>
            <Typography variant="h7">{description}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          lg={7.5}
          display="flex"
          justifyContent="end"
          alignItems={"center"}
        >
          <Box width={"30%"} justifyContent="center" display={"flex"}>
            <HomeIcon sx={{ fontSize: "1.8rem" }} />
            <Typography variant="h6">Home/{title}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TitleBar;
