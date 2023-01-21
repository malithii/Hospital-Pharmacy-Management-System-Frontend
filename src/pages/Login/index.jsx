import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardContent } from "@mui/material";
import backgroundLogin from "../../images/backgroundLogin.jpg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogin } from "../../App/userService";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/loginSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MedPlus
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    userLogin(data, (response) => {
      console.log(response);
      if (response.status === "success") {
        const { _id, username, wardNo, email, type } = response.user;
        dispatch(
          login({
            _id,
            username,
            wardNo,
            email,
            type,
          })
        );
        if (type === "PHARMACIST") {
          navigate("/pharmacy-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    });
    //  newDrug(data, (response) => {
    //    console.log(response);
    //  });
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundLogin})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      display="flex"
      justifyContent="right"
      alignContent={"center"}
    >
      <ThemeProvider theme={theme}>
        <Card sx={{ mr: "160px" }}>
          <CardContent>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 6,

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Username is required",
                      },
                    })}
                    {...(errors.username && {
                      error: true,
                      helperText: errors.username.message,
                    })}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    })}
                    {...(errors.password && {
                      error: true,
                      helperText: errors.password.message,
                    })}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 6, mb: 6 }} />
            </Container>
          </CardContent>
        </Card>
      </ThemeProvider>
    </Grid>
  );
}
