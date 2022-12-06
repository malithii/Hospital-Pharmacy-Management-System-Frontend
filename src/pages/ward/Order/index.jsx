import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import TitleBar from "../../../components/TitleBar";
import order from "../../../images/order.png";
import Chart from "react-apexcharts";

const Order = () => {
  const [value, setValue] = useState(dayjs());

  return (
    <Box>
      <TitleBar image={order} title="Order" description="Manages Orders" />

      <Grid container spacing={2}>
        <Grid item lg={5}>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pb={1}
                >
                  Order
                </Typography>
                <Grid item lg={12} xs={12}>
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
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
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                        size="small"
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    color="#495579"
                    pb={1}
                  >
                    Drug Name
                  </Typography>
                  <TextField id="drugName" size="small" fullWidth />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    color="#495579"
                    pb={1}
                  >
                    Quantity
                  </Typography>
                  <TextField size="small" fullWidth id="quantity" />
                </Grid>
                <Grid
                  item
                  lg={12}
                  pt={3}
                  xs={12}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <Button
                    variant="contained"
                    sx={{ minWidth: "200px" }}
                    size="large"
                  >
                    ADD
                  </Button>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pb={1}
                >
                  Low Level Drugs
                </Typography>
                <Chart
                  type="bar"
                  width="100%"
                  height="200rem"
                  options={{
                    chart: {
                      id: "basic-bar",
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 4,
                        horizontal: true,
                      },
                    },
                    xaxis: {
                      categories: [
                        "Allopurinol",
                        "Amoxicillin",
                        "Bisoprolol",
                        "Cefalexin",
                        "Domperidone ",
                        "Escitalopram",
                        "Finasteride ",
                        "Hydroxocobalamin ",
                      ],
                    },
                  }}
                  series={[
                    {
                      name: "series-1",
                      data: [30, 40, 45, 50, 49, 60, 70, 91],
                    },
                  ]}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={7}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
              Order
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
