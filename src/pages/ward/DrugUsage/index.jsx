import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import TitleBar from "../../../components/TitleBar";
import medicine2 from "../../../images/medicine-2.png";
import { useForm } from "react-hook-form";
import { getDrugUsageByDate, newDrugUsage } from "../../../App/wardDrugUsage";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import { useEffect } from "react";

const DrugUsage = () => {
  const [value, setValue] = useState(dayjs());

  const headCells = [
    {
      id: "date",
      numeric: "false",
      disablePadding: true,
      label: "Date",
      align: "center",
    },
    {
      id: "drugName",
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
      id: "quantity",
      numeric: "false",
      disablePadding: true,
      label: "Quantity",
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

  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  function createData(date, drugName, batchNo, bht, quantity) {
    return {
      date,
      drugName,
      batchNo,
      bht,
      quantity,
    };
  }
  const requestBody = {
    date: "2022-04-23",
    wardNo: "13",
  };
  useEffect(() => {
    getDrugUsageByDate(requestBody, (response) => {
      console.log(response.drugUsage);
      setRetrivedRows(
        response.drugUsage.map((e) =>
          createData(e.date, e.drugName, e.batchNo, e.bht, e.quantity)
        )
      );
      setNumOfRows(response.drugUsage.length);
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
  } = useForm();

  const clearAll = () => {
    resetField("wardNo");
    resetField("drugName");
    resetField("batchNo");
    resetField("bht");
    resetField("quantity");
  };

  const onSubmit = (data) => {
    newDrugUsage(data, (response) => {
      console.log("response");
      clearAll();
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
        <Grid item lg={8} xs={12}>
          <Box sx={{ bgcolor: "white", p: 4 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
              Add New Drug Usage Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
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
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pb={1}
                >
                  Ward No
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="wardNo"
                  {...register("wardNo", {
                    required: {
                      value: true,
                      message: "wardNo is required",
                    },
                  })}
                  {...(errors.wardNo && {
                    error: true,
                    helperText: errors.wardNo.message,
                  })}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pb={1}
                >
                  Drug Name
                </Typography>
                <TextField
                  id="drugName"
                  size="small"
                  fullWidth
                  {...register("drugName", {
                    required: {
                      value: true,
                      message: "drugName is required",
                    },
                  })}
                  {...(errors.drugName && {
                    error: true,
                    helperText: errors.drugName.message,
                  })}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pb={1}
                >
                  Batch No
                </Typography>
                <TextField
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
                    helperText: errors.batchNo.message,
                  })}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pb={1}
                >
                  BHT
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
                    helperText: errors.bht.message,
                  })}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
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
                      message: "Quantity is required",
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
                xs={12}
                gap={2}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  variant="outlined"
                  sx={{ minWidth: "200px" }}
                  size="large"
                  onClick={clearAll}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  sx={{ minWidth: "200px" }}
                  size="large"
                  onClick={handleSubmit(onSubmit)}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Box sx={{ bgcolor: "white", p: 4 }}>
            <Grid item sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                sx={{ minWidth: "200px" }}
                size="large"
              >
                View History
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item lg={12}>
          <Box sx={{ bgcolor: "white", p: 4 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
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
