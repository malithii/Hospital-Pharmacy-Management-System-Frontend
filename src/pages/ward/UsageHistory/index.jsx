import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import { allDrugUsages } from "../../../App/wardDrugUsage";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import SearchIcon from "@mui/icons-material/Search";

const UsageHistory = () => {
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
  const [shouldRefresh, setShouldRefresh] = useState(true);

  const editClickHandler = (userId) => {
    console.log(userId);
    //btn action
    setShouldRefresh((prev) => !prev);
  };

  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  function createData(_id, date, drugName, batchNo, bht, quantity) {
    return {
      _id,
      date,
      drugName,
      batchNo,
      bht,
      quantity,
    };
  }
  const requestBody = {
    wardNo: "13",
  };

  useEffect(() => {
    allDrugUsages(requestBody, (response) => {
      console.log(response.drugUsage);
      setRetrivedRows(
        response.drugUsage.map((e) =>
          createData(e._id, e.date, e.drugName, e.batchNo, e.bht, e.quantity)
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
                    onChange={(newValue) => {
                      setValue(newValue);
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
                sx={{ minWidth: "200px", height: "40px" }}
                size="large"
              >
                <SearchIcon />
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

export default UsageHistory;
