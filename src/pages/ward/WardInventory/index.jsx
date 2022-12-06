import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import iconInventory from "../../../images/icon-inventory-96.png";
import SearchIcon from "@mui/icons-material/Search";

const WardInventory = () => {
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
  ];
  return (
    <Box>
      <TitleBar
        image={iconInventory}
        title="Ward Inventory"
        description="View Ward Inventory"
      />
      <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
        <Grid container>
          <Grid item lg={3}>
            <Typography
              variant="h8"
              fontWeight={"normal"}
              color="#495579"
              pb={1}
            >
              Add New Drug Usage Details
            </Typography>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField {...params} label="Drug Name" size="small" />
              )}
            />
          </Grid>
          <Grid item lg={3}>
            <Box p={3}>
              <Button
                variant="contained"
                sx={{ minWidth: "200px" }}
                size="large"
              >
                <SearchIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WardInventory;
