import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import { allDrugUsages, viewDrugUsageByDate } from "../../../App/wardDrugUsage";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const UsageHistory = () => {
  const [date, setDate] = useState(dayjs());
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
  ];

  const { register, handleSubmit, setValue } = useForm();

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
  const user = useSelector((state) => state.loginHPMS._id);
  const requestBody = {
    user: user,
  };

  useEffect(() => {
    allDrugUsages(requestBody, (response) => {
      console.log(response.drugUsage);
      setRetrivedRows(
        response.drugUsage.map((e) =>
          createData(
            e._id,
            e.date.slice(0, 10),
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
    console.log(rows);
  }, [rows]);

  return (
    <Box>
      <Grid container>
        <Grid item lg={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={3}>
              View All Drug Usage Details
            </Typography>
            <Box sx={{ display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    minDate={dayjs("2017-01-01")}
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                      setValue("date", newValue.format("YYYY-MM-DD"));
                      console.log(date);
                    }}
                    inputFormat="YYYY-MM-DD"
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        sx={{ width: 350, paddingBottom: 2, paddingRight: 2 }}
                        // {...register("date", {
                        //   required: {
                        //     value: true,
                        //     message: "Date is required",
                        //   },
                        // })}
                        // {...(errors.date && {
                        //   error: true,
                        //   helperText: errors.date.message,
                        // })}
                      />
                    )}
                    size="small"
                  />
                </Stack>
              </LocalizationProvider>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ width: 150, height: 40, marginLeft: 2 }}
                startIcon={<SearchIcon />}
                onClick={handleSubmit((data) => {
                  console.log(data);
                  viewDrugUsageByDate(
                    { user: user, date: data.date.slice(0, 10) },
                    (response) => {
                      console.log(response);
                      setRetrivedRows(
                        response.drugUsage.map((e) =>
                          createData(
                            e._id,
                            e.date.slice(0, 10),
                            e.drug.drugId,
                            e.batchNo,
                            e.bht,
                            e.quantitytoBHT,
                            e.quantityfromBHT
                          )
                        )
                      );
                    }
                  );
                })}
              >
                Search
              </Button>
            </Box>
            <EnhancedTable
              headCells={headCells}
              rows={rows}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              numOfRows={numOfRows}
              tableTitle={"Drug Usage"}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsageHistory;
