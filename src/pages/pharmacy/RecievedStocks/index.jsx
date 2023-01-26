import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getRecieved } from "../../../App/receivedStocksService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import TitleBar from "../../../components/TitleBar";
import recievedIcon from "../../../images/recievedIcon.png";

const RecievedStocks = () => {
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

  const requestBody = {
    user: "63b564bcfc1d5e7994bea009",
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
              height: "330px",
            }}
          >
            <Typography fontWeight={"bold"}>Stocks Added</Typography>
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
