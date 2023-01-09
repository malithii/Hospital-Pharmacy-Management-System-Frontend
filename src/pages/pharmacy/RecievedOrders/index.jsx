import { Button, Grid } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getOrders } from "../../../App/orderService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import TitleBar from "../../../components/TitleBar";
import ordersIcon from "../../../images/ordersIcon.png";

const RecievedOrders = () => {
  const headCells = [
    {
      id: "user",
      numeric: false,
      disablePadding: true,
      label: "Ward No",
      align: "center",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
      align: "center",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
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

  function createData(_id, user, date, status) {
    return {
      _id,
      user,
      date,
      status,
    };
  }

  useEffect(() => {
    getOrders((response) => {
      console.log(response.order);
      setRetrivedRows(
        response.order.map((e) =>
          createData(e._id, e.user.wardNo, e.date, e.status)
        )
      );
      setNumOfRows(response.order.length);
    });
  }, [shouldRefresh]);

  useEffect(() => {
    console.log(rows);
  }, [rows]);
  return (
    <Box>
      <TitleBar
        image={ordersIcon}
        title="Orders"
        description="Accept and manage orders"
      />
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3, pb: 3 }}>
            <Grid
              item
              lg={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="contained">View Order History</Button>
            </Grid>
            Pending Orders
            <Grid item lg={12}>
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
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecievedOrders;
