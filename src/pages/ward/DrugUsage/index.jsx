import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TitleBar from "../../../components/TitleBar";
import medicine2 from "../../../images/medicine-2.png";
import { useForm } from "react-hook-form";
import {
  allDrugUsages,
  getDrugUsageByDate,
  newDrugUsage,
  viewDrugUsageByDate,
} from "../../../App/wardDrugUsage";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCalendar from "../../../components/Calendar";
import { useSelector } from "react-redux";
import { getDrugById } from "../../../App/drugsService";
import {
  getBatches,
  searchInventoryByDrug,
} from "../../../App/inventoryService";

const DrugUsage = () => {
  const [date, setDate] = useState(dayjs());
  const [drugs, setDrugs] = useState([]);
  const [batchNos, setBatchNos] = useState([]);

  const navigate = useNavigate();
  const navigateToHistory = () => {
    let path = `/drugusagehistory`;
    navigate(path);
  };

  const headCells = [
    {
      id: "date",
      numeric: "false",
      disablePadding: true,
      label: "Date",
      align: "center",
    },
    {
      id: "drug",
      numeric: "false",
      disablePadding: true,
      label: "Drug Name",
      align: "center",
    },
    {
      id: "batchNo",
      numeric: "false",
      disablePadding: true,
      label: "Batch No",
      align: "center",
    },

    {
      id: "bht",
      numeric: "false",
      disablePadding: true,
      label: "BHT",
      align: "center",
    },
    {
      id: "quantityToBHT",

      disablePadding: true,
      label: "Quantity To BHT",
      align: "center",
    },
    {
      id: "quantityFromBHT",

      disablePadding: true,
      label: "Quantity from BHT",
      align: "center",
    },
    {
      id: "Actions",
      numeric: true,
      disablePadding: false,
      label: "Actions",
      align: "center",
      sorting: false,
    },
  ];

  const [rows, setRows] = useState([]);
  const [retrivedRows, setRetrivedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [numOfRows, setNumOfRows] = useState(0);

  const editClickHandler = (userId) => {
    console.log(userId);
    //btn action
  };
  const [shouldRefresh, setShouldRefresh] = useState(true);

  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  function createData(
    _id,
    date,
    drug,
    batchNo,
    bht,
    quantitytoBHT,
    quantityfromBHT
  ) {
    return {
      _id,
      date,
      drug,
      batchNo,
      bht,
      quantitytoBHT,
      quantityfromBHT,
    };
  }
  var today = new Date(),
    month = today.getMonth() + 1,
    month1 = month < 10 ? "0" + month : month,
    date1 = today.getFullYear() + "-" + month1 + "-" + today.getDate();

  // console.log("DATE: " + date1);
  const user = useSelector((state) => state.loginHPMS._id);
  const requestBody = {
    user: user,
    date: date1,
  };

  useEffect(() => {
    viewDrugUsageByDate(requestBody, (response) => {
      console.log(response.drugUsage);
      setRetrivedRows(
        response.drugUsage.map((e) =>
          createData(
            e._id,
            e.date,
            e.drug.drugId,
            e.batchNo,
            e.bht,
            e.quantitytoBHT,
            e.quantityfromBHT
          )
        )
      );
      setNumOfRows(response.drugUsage.length);
    });
  }, [shouldRefresh]);

  useEffect(() => {
    getDrugById((response) => {
      console.log(response.drug);
      setDrugs(response.drug);
    });
  }, []);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  const clearAll = () => {
    resetField("batchNo");
    resetField("bht");
    resetField("quantitytoBHT");
    resetField("quantityfromBHT");
  };

  const onSubmit = (data) => {
    console.log(data);
    const body = {
      ...data,
      user: user,

      date: date,
      drug: data.drug._id,

      quantitytoBHT: Number(data.quantitytoBHT),
      quantityfromBHT: Number(data.quantityfromBHT),
    };
    newDrugUsage(body, (response) => {
      console.log(response);
      clearAll();
      setShouldRefresh((prev) => !prev);
    });
  };
  return (
    <Box>
      <TitleBar
        image={medicine2}
        title="Drug Usage Details"
        description="Manage drug usage details"
      />

      <Grid container spacing={2}>
        <Grid item lg={7} xs={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
              Add New Drug Usage Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
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
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                        setValue("date", newValue.format("YYYY-MM-DD"));
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

              <Grid item lg={6} xs={12}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Drug:{" "}
                  {errors.drug ? (
                    <span style={{ color: "red", fontSize: 10 }}>
                      {errors.drug.message}
                    </span>
                  ) : null}
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
                    getBatches({ user: user, drug: value._id }, (response) => {
                      console.log(response);
                      setBatchNos(response.inventory);
                      console.log(batchNos);
                    });
                  }}
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.drugId}
                  options={drugs}
                  sx={{
                    mt: "0.5rem",
                    width: "100%",
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
              <Grid item lg={6} xs={12}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Batch No{" "}
                  {errors.batchNo ? (
                    <span style={{ color: "red", fontSize: 10 }}>
                      {errors.batchNo.message}
                    </span>
                  ) : null}
                </Typography>
                <Autocomplete
                  disablePortal
                  {...register("batchNo", {
                    required: {
                      value: true,
                      message: "batchNo is required",
                    },
                  })}
                  onChange={(e, value) => {
                    setValue("batchNo", value.batchNo);
                    console.log(value);
                  }}
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.batchNo}
                  options={batchNos}
                  sx={{
                    width: "98%",
                    ...(errors.batchNo && {
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
                {/* <TextField
                  size="small"
                  fullWidth
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
                /> */}
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  BHT{" "}
                  {errors.bht ? (
                    <span style={{ color: "red", fontSize: 10 }}>
                      {errors.bht.message}
                    </span>
                  ) : null}
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="bht"
                  {...register("bht", {
                    required: {
                      value: true,
                      message: "BHT is required",
                    },
                  })}
                  {...(errors.bht && {
                    error: true,
                  })}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Quantity to BHT{" "}
                  {errors.quantitytoBHT ? (
                    <span style={{ color: "red", fontSize: 10 }}>
                      {errors.quantitytoBHT.message}
                    </span>
                  ) : null}
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="quantitytoBHT"
                  {...register("quantitytoBHT", {
                    required: {
                      value: true,
                      message: "Quantity is required",
                    },
                    validate: {
                      isNumber: (value) => {
                        if (!value.match(/^[0-9]*$/)) {
                          return "Please enter a number";
                        }
                      },
                      // lessThan100: (value) => {
                      //   if (value > 100) {
                      //     return "knfksndfkj";
                      //   }
                      // },
                    },
                  })}
                  {...(errors.quantitytoBHT && {
                    error: true,
                  })}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography
                  variant="h7"
                  fontWeight={"normal"}
                  color="#495579"
                  pb={1}
                >
                  Quantity from BHT
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="quantityfromBHT"
                  {...register("quantityfromBHT", {})}
                  // {...(errors.quantity2 && {
                  //   error: true,
                  //   helperText: errors.quantity2.message,
                  // })}
                />
              </Grid>
              <Grid
                item
                lg={12}
                xs={12}
                gap={2}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  variant="outlined"
                  sx={{ minWidth: "150px" }}
                  size="medium"
                  onClick={clearAll}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  sx={{ minWidth: "150px" }}
                  size="medium"
                  onClick={handleSubmit(onSubmit)}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={5} xs={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, pt: 3, pb: 3 }}>
            <Grid item sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                sx={{ minWidth: "200px" }}
                size="large"
                onClick={navigateToHistory}
                title="Click to view drug usage history"
              >
                View History
              </Button>
              <CustomCalendar />
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={3}>
              Drug Usage Details Added Today
            </Typography>
            <EnhancedTable
              headCells={headCells}
              rows={rows}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              numOfRows={numOfRows}
              tableTitle={"Drugs"}
              actionButtons={[
                { btnName: "Edit", actionFunc: editClickHandler },
              ]}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DrugUsage;
