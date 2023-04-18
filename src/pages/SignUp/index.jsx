import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import logo from "../../images/logo2.png";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { userSignUp } from "../../App/userService";

const SignUp = () => {
  const [type, setType] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();
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
              <MenuItem value={"PHARMACIST"}>PHARMACIST</MenuItem>
              <MenuItem value={"WARDUSER"}>WARDUSER</MenuItem>
            </Select>
            <Typography variant="h7" fontWeight={"normal"} pt={2}>
              Email:
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />
            <Typography variant="h7" fontWeight={"normal"} pt={2}>
              Username:
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
            <Typography variant="h7" fontWeight={"normal"} pt={2}>
              Ward Number:
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("wardNo", {
                required: {
                  value: true,
                  message: "Ward Number is required",
                },
              })}
            />
            <Typography variant="h7" fontWeight={"normal"} pt={2}>
              Contact Number:
            </Typography>
            <TextField
              size="small"
              fullWidth
              {...register("contact", {
                required: {
                  value: true,
                  message: "Contact Number is required",
                },
              })}
            />
            <Typography variant="h7" fontWeight={"normal"} pt={2}>
              Password:
            </Typography>
            <TextField
              size="small"
              fullWidth
              type={"password"}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
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
              <Button
                variant="contained"
                sx={{ flexGrow: 1 }}
                onClick={handleSubmit((data) => {
                  const req = { type: type, ...data };
                  console.log(req);
                  userSignUp(req, (res) => {
                    console.log(res);
                  });
                })}
              >
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
