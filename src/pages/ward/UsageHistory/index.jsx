import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { allDrugUsages } from "../../../App/wardDrugUsage";
import EnhancedTable from "../../../components/Tables/EnhancedTable";

const UsageHistory = () => {
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
    wardNo: "13",
  };

  useEffect(() => {
    allDrugUsages(requestBody, (response) => {
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

  return (
    <Box>
      <Grid container>
        <Grid item lg={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={3}>
              View All Drug Usage Details
            </Typography>

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
