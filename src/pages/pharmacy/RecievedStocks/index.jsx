import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getDrugById } from "../../../App/drugsService";
import {
  getRecieved,
  newRecievedDrugs,
} from "../../../App/receivedStocksService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import TitleBar from "../../../components/TitleBar";
import recievedIcon from "../../../images/recievedIcon.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import drugStore from "../../../images/drugStore.png";

const RecievedStocks = () => {
  const [date, setDate] = useState(dayjs());
  const [drugs, setDrugs] = useState([]);
  const [receivedStocks, setReceivedStocks] = useState([]);

  const headCells = [
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
      align: "center",
    },
    {
      id: "drugId",
      numeric: false,
      disablePadding: true,
      label: "Drug ID",
      align: "center",
    },
    {
      id: "batch",
      numeric: false,
      disablePadding: true,
      label: "Batch",
      align: "center",
    },
    {
      id: "expDate",
      numeric: false,
      disablePadding: true,
      label: "Exp Date",
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

  function createData(obj, date, drugId, batch, expDate, quantity) {
    return {
      obj,
      date,
      drugId,
      batch,
      expDate,
      quantity,
    };
  }

  const user = useSelector((state) => state.loginHPMS._id);

  const requestBody = {
    user: user,
    date: date,
    recievedDrugs: receivedStocks,
  };

  const onSubmit = () => {
    newRecievedDrugs(requestBody, (response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    getRecieved(requestBody, (response) => {
      console.log(response.recievedDrug);
      setRetrivedRows(
        response.recievedDrug.map((e) =>
          createData(
            e,
            e.date,
            e.drug.drugId,
            e.recievedDrugs.batchNo,
            e.recievedDrugs.expDate,
            e.recievedDrugs.quantity
          )
        )
      );
      setNumOfRows(response.recievedDrug.length);
    });
  }, [shouldRefresh]);

  useEffect(() => {
    // console.log(rows);
  }, [rows]);

  useEffect(() => {
    getDrugById((response) => {
      console.log(response.drug);
      setDrugs(response.drug);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  const addStock = (data) => {
    console.log(data);
    // receivedStocks.push(data);
    setReceivedStocks([...receivedStocks, data]);
    console.log(receivedStocks);
  };

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
            <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
              Add New Stock
            </Typography>
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
                        setDate(newValue);
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
                <Autocomplete
                  disablePortal
                  {...register("drug", {
                    required: {
                      value: true,
                      message: "Drug is required",
                    },
                  })}
                  onChange={(e, value) => {
                    setValue("drug", value);
                    console.log(value);
                  }}
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.drugId}
                  options={drugs}
                  sx={{
                    width: "98%",
                    ...(errors.drug && {
                      border: "1px solid red",
                    }),
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        sx={{ color: "red" }}
                        {...params}
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    );
                  }}
                />
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
                <TextField
                  size="small"
                  fullWidth
                  sx={{ width: "98%" }}
                  id="batchNo"
                  {...register("batchNo", {
                    required: {
                      value: true,
                      message: "batchNo is required",
                    },
                  })}
                  {...(errors.batchNo && {
                    error: true,
                  })}
                />
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
                          sx={{ width: "98%" }}
                          {...register("expDate", {
                            required: {
                              value: true,
                              message: "Exp Date is required",
                            },
                          })}
                          {...(errors.expDate && {
                            error: true,
                            helperText: errors.expDate.message,
                          })}
                        />
                      )}
                      size="small"
                    />
                  </Stack>
                </LocalizationProvider>
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
                <TextField
                  size="small"
                  fullWidth
                  sx={{ width: "98%" }}
                  {...register("quantity", {
                    required: {
                      value: true,
                      message: "Quantity is required",
                    },
                  })}
                  {...(errors.quantity && {
                    error: true,
                    helperText: errors.quantity.message,
                  })}
                />
              </Grid>
              <Grid item lg={6} mt={2}>
                <Button variant="outlined" size="medium" sx={{ width: "98%" }}>
                  Clear
                </Button>
              </Grid>
              <Grid item lg={6} mt={2}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: "98%" }}
                  onClick={handleSubmit(addStock)}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={7} xs={12}>
          {receivedStocks.length > 0 ? (
            <>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 2,
                  borderRadius: 3,
                  pb: 3,
                  height: "330px",
                  pl: 5,
                }}
              >
                <Typography fontWeight={"bold"} mb={1}>
                  Stocks Added
                </Typography>

                <Box
                  sx={{
                    height: "78%",
                    overflow: "auto",
                    scrollbarWidth: "thin",
                  }}
                >
                  <Grid container>
                    <Grid item lg={3}>
                      <Typography fontWeight={"bold"}>Drug</Typography>
                    </Grid>
                    <Grid item lg={3}>
                      <Typography fontWeight={"bold"}>Batch</Typography>
                    </Grid>
                    <Grid item lg={2.5}>
                      <Typography fontWeight={"bold"}>Expire Date</Typography>
                    </Grid>
                    <Grid item lg={1.5}>
                      <Typography fontWeight={"bold"}>Quantity</Typography>
                    </Grid>

                    {receivedStocks.map((item) => {
                      return (
                        <Grid container>
                          <Grid
                            item
                            lg={3}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Typography>{item.drug.drugId}</Typography>
                          </Grid>
                          <Grid
                            item
                            lg={3}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Typography>{item.batchNo}</Typography>
                          </Grid>
                          <Grid
                            item
                            lg={2.5}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Typography>{item.expDate}</Typography>
                          </Grid>
                          <Grid
                            item
                            lg={2}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Typography>{item.quantity}</Typography>
                          </Grid>
                          <Grid item lg={1.5}>
                            <IconButton
                              onClick={() => {
                                setReceivedStocks(
                                  receivedStocks.filter(
                                    (i) =>
                                      i.drug.drugId !== item.drug.drugId ||
                                      i.batchNo !== item.batchNo ||
                                      i.expDate !== item.expDate ||
                                      i.quantity !== item.quantity
                                  )
                                );
                                console.log(receivedStocks);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ width: "150px" }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                bgcolor: "white",
                p: 2,
                borderRadius: 3,
                pb: 3,
                height: "330px",
                pl: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography fontWeight={"bold"}>No Stocks Added</Typography>

              <img src={drugStore} alt="drugStore" />
            </Box>
          )}
        </Grid>
        <Grid item lg={12} xs={12}>
          <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3, pb: 3 }}>
            <Typography fontWeight={"bold"} sx={{ mb: 2 }}>
              Received Stocks
            </Typography>
            <EnhancedTable
              headCells={headCells}
              rows={rows}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              numOfRows={numOfRows}
              tableTitle={"Received Stocks"}
              // actionButtons={[
              //   { btnName: "Edit", actionFunc: editClickHandler },
              // ]}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecievedStocks;
