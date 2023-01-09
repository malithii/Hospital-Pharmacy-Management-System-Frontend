import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import TitleBar from "../../../components/TitleBar";
import recievedIcon from "../../../images/recievedIcon.png";

const RecievedStocks = () => {
  const [value, setValue] = useState(dayjs());

  return (
    <Box>
      <TitleBar
        image={recievedIcon}
        title="Received Stocks"
        description="Manage Received Stocks"
      />
      <Grid container spacing={2}>
        <Grid item lg={5} xs={12}>
          <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3, pb: 3 }}>
            <Typography>Add New Stock</Typography>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      minDate={dayjs("2017-01-01")}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      inputFormat="YYYY-MM-DD"
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{ width: "99%" }}
                        />
                      )}
                      size="small"
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item lg={6} xs={12} pt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Drug
                </Typography>
                <TextField size="small" fullWidth sx={{ width: "98%" }} />
              </Grid>
              <Grid item lg={6} xs={12} mt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Batch
                </Typography>
                <TextField size="small" fullWidth sx={{ width: "98%" }} />
              </Grid>
              <Grid item lg={6} xs={12} mt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Expire Date
                </Typography>
                <TextField size="small" fullWidth sx={{ width: "98%" }} />
              </Grid>
              <Grid item lg={6} xs={12} mt={1}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Quantity{" "}
                </Typography>
                <TextField size="small" fullWidth sx={{ width: "98%" }} />
              </Grid>
              <Grid item lg={6} mt={2}>
                <Button variant="outlined" size="medium" sx={{ width: "98%" }}>
                  Clear
                </Button>
              </Grid>
              <Grid item lg={6} mt={2}>
                <Button variant="contained" size="medium" sx={{ width: "98%" }}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={7} xs={12}>
          <Box
            sx={{
              bgcolor: "white",
              p: 2,
              borderRadius: 3,
              pb: 3,
              height: "325px",
            }}
          >
            <Typography>Stocks Added</Typography>
            <Box sx={{ height: "78%" }}></Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" size="medium" sx={{ width: "150px" }}>
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3, pb: 3 }}>
            <Typography>Received Stocks History</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecievedStocks;
