import { Button, Chip, Grid, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getOrders, getPendingOrders } from "../../../App/orderService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import TitleBar from "../../../components/TitleBar";
import ordersIcon from "../../../images/ordersIcon.png";

const RecievedOrders = () => {
  const [detailedOrder, setDetailedOrder] = useState({});
  const navigate = useNavigate();

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

  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  function createData(obj, user, date, status) {
    return {
      obj,
      user,
      date,
      status,
    };
  }

  useEffect(() => {
    getPendingOrders((response) => {
      console.log(response.order);
      setRetrivedRows(
        response.order.map((e) =>
          createData(
            e,
            <Chip label={e.wardUser.wardNo} />,
            e.date.slice(0, 10),
            <Chip label={e.status} sx={{ backgroundColor: " #f1c40f " }} />
          )
        )
      );
      setNumOfRows(response.order.length);
    });
  }, [shouldRefresh]);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const issueClickHandler = (data) => {
    console.log(data.obj);
    navigate("/detailed-orders", {
      state: { detailedOrder: data.obj },
    });
  };

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
            <Grid item lg={7}>
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
                  { btnName: "Issue", actionFunc: issueClickHandler },
                ]}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecievedOrders;
