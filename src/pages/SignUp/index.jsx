import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import logo from "../../images/logo2.png";
import Select from "@mui/material/Select";

const SignUp = () => {
  const [type, setType] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <Grid
      container
      // sx={{
      //   minHeight: "100vh",
      //   backgroundImage: `url(${logo})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "left",
      // }}
      display="flex"
    >
      <Grid
        item
        lg={7}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <img src={logo} height="50%%" width="60%" alt="logo" />
      </Grid>
      <Grid
        item
        lg={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            bgcolor: "white",
            p: 3,
            width: "550px",
            borderRadius: 3,
            mr: 4,
          }}
        >
          <Typography variant="h5">Add New User</Typography>
          <Grid container>
            <Typography variant="h7" fontWeight={"normal"} mt={2}>
              User Type:
            </Typography>
            <Select
              id="select-type"
              value={type}
              onChange={handleChange}
              fullWidth
              size="small"
            >
              <MenuItem value={10}>Pharmacist</MenuItem>
              <MenuItem value={20}>Ward User</MenuItem>
            </Select>
            <Typography variant="h7" fontWeight={"normal"} pt={2}>
              Email:
            </Typography>
            <TextField size="small" fullWidth />
            <Typography variant="h7" fontWeight={"normal"} pt={2}>
              Username:
            </Typography>
            <TextField size="small" fullWidth />
            <Typography variant="h7" fontWeight={"normal"} pt={2}>
              Ward Number:
            </Typography>
            <TextField size="small" fullWidth />
            <Typography variant="h7" fontWeight={"normal"} pt={2}>
              Contact Number:
            </Typography>
            <TextField size="small" fullWidth />
            <Typography variant="h7" fontWeight={"normal"} pt={2}>
              Password:
            </Typography>
            <TextField size="small" fullWidth type={"password"} />
            <Grid
              container
              gap={2}
              pt={2}
              display="flex"
              justifyContent="right"
              alignContent={"center"}
            >
              {/* flexgrow: divide width of display flex */}
              <Button variant="contained" sx={{ flexGrow: 1 }}>
                Clear All
              </Button>
              <Button variant="contained" sx={{ flexGrow: 1 }}>
                Add User
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
