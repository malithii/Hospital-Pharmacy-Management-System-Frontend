import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import TitleBar from "../../../components/TitleBar";
import order from "../../../images/order.png";
import Chart from "react-apexcharts";
import { useForm } from "react-hook-form";
import { getOrders, newOrder } from "../../../App/orderService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";

const Order = () => {
  const [value, setValue] = useState(dayjs());

  const headCells = [
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
      align: "center",
    },
    {
      id: "drugName",
      numeric: false,
      disablePadding: true,
      label: "Drug Name",
      align: "center",
    },
    {
      id: "quantity",
      numeric: false,
      disablePadding: true,
      label: "Quantity",
      align: "center",
    },
  ];

  const [rows, setRows] = useState([]);
  const [retrivedRows, setRetrivedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [numOfRows, setNumOfRows] = useState(0);
  const [shouldRefresh, setShouldRefresh] = useState(true);

  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  function createData(_id, date, drugName, quantity) {
    return {
      _id,
      date,
      drugName,
      quantity,
    };
  }

  useEffect(() => {
    getOrders((response) => {
      console.log(response.order);
      setRetrivedRows(
        response.order.map((e) =>
          createData(e._id, e.date, e.drugName, e.quantity)
        )
      );
      setNumOfRows(response.order.length);
    });
  }, [shouldRefresh]);

  const editClickHandler = (userId) => {
    console.log(userId);
    //btn action
  };
  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const clearAll = () => {
    resetField("drugName");
    resetField("quantity");
  };

  const onSubmit = (data) => {
    newOrder(data, (response) => {
      console.log(response);
      clearAll();
      setShouldRefresh((prev) => !prev);
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <TitleBar image={order} title="Order" description="Manages Orders" />

      <Grid container spacing={2}>
        <Grid item lg={5}>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3 }}>
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
                            {...register("date", {
                              required: {
                                value: true,
                                message: "Date is required",
                              },
                            })}
                            {...(errors.date && {
                              error: true,
                              helperText: errors.date.message,
                            })}
                          />
                        )}
                        size="small"
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Typography
                    variant="h7"
                    fontWeight={"normal"}
                    color="#495579"
                    pb={1}
                  >
                    Drug
                  </Typography>
                  <TextField
                    id="drugName"
                    size="small"
                    fullWidth
                    {...register("drugName", {
                      required: {
                        value: true,
                        message: "Drug Name is required",
                      },
                    })}
                    {...(errors.drugName && {
                      error: true,
                      helperText: errors.drugName.message,
                    })}
                  />
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Typography
                    variant="h7"
                    fontWeight={"normal"}
                    color="#495579"
                    pb={1}
                  >
                    Quantity
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    id="quantity"
                    {...register("quantity", {
                      required: {
                        value: true,
                        message: "Drug quantity is required",
                      },
                    })}
                    {...(errors.quantity && {
                      error: true,
                      helperText: errors.quantity.message,
                    })}
                  />
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
                    sx={{ minWidth: "150px" }}
                    size="medium"
                    onClick={handleSubmit(onSubmit)}
                  >
                    ADD
                  </Button>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3 }}>
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
          <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
              Order
            </Typography>
            <EnhancedTable
              headCells={headCells}
              rows={rows}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              numOfRows={numOfRows}
              tableTitle={"Orders"}
              actionButtons={[
                { btnName: "Edit", actionFunc: editClickHandler },
              ]}
            />
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button variant="contained" size="large" onClick={handleOpen}>
                Order
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, pt: 5 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
              Order Details
            </Typography>
            <EnhancedTable
              headCells={headCells}
              rows={rows}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              numOfRows={numOfRows}
              tableTitle={"Orders"}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Order;
