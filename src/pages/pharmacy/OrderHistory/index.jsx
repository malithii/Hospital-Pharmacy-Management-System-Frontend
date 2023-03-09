import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getOrders } from "../../../App/orderService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";

const OrderHistory = () => {
  const headCells = [
    {
      id: "date",
      numeric: "false",
      disablePadding: true,
      label: "Date",
      align: "center",
    },
    {
      id: "wardNo",
      numeric: "false",
      disablePadding: true,
      label: "Ward",
      align: "center",
    },
    {
      id: "status",
      numeric: "false",
      disablePadding: true,
      label: "Status",
      align: "center",
    },
    {
      id: "drug",
      numeric: "false",
      disablePadding: true,
      label: "Drug",
      align: "center",
    },
    {
      id: "batch",
      numeric: "false",
      disablePadding: true,
      label: "Batch",
      align: "center",
    },
    {
      id: "quantityIssued",
      numeric: "false",
      disablePadding: true,
      label: "Q/I",
      align: "center",
    },
    {
      id: "quantityReceived",
      numeric: "false",
      disablePadding: true,
      label: "Q/R",
      align: "center",
    },
    {
      id: "totalOrdered",
      numeric: "false",
      disablePadding: true,
      label: "T/O",
      align: "center",
    },
    {
      id: "totalIssued",
      numeric: "false",
      disablePadding: true,
      label: "T/I",
      align: "center",
    },
    {
      id: "totalReceived",
      numeric: "false",
      disablePadding: true,
      label: "T/R",
      align: "center",
    },
  ];
  const [rows, setRows] = useState([]);
  const [retrivedRows, setRetrivedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [numOfRows, setNumOfRows] = useState(0);

  useEffect(() => {
    getOrders((response) => {
      console.log(response);
      setRetrivedRows(
        response.order.map((obj) =>
          createData(
            obj._id,
            obj.date.slice(0, 10),
            obj.wardUser.wardNo,
            obj.status === "DELIVERED" ? (
              <Chip label={obj.status} color="secondary" />
            ) : (
              <Chip label={obj.status} color="warning" />
            ),
            obj.orderItems.map((item) => (
              <Typography>{item.drug.drugId}</Typography>
            )),
            obj.orderItems.map((item) =>
              item.issueDrugs.map((issue) => (
                <Typography>{issue.batch}</Typography>
              ))
            ),
            obj.orderItems.map((item) =>
              item.issueDrugs.map((issue) => (
                <Typography>{issue.quantityIssued}</Typography>
              ))
            ),
            obj.orderItems.map((item) =>
              item.issueDrugs.map((issue) => (
                <Typography>{issue.quantityRecieved}</Typography>
              ))
            ),
            obj.orderItems.map((item) => (
              <Typography>{item.quantityOrdered}</Typography>
            )),
            obj.orderItems.map((item) => (
              <Typography>{item.totalIssued}</Typography>
            )),
            obj.orderItems.map((item) => (
              <Typography>{item.totalRecieved}</Typography>
            ))
          )
        )
      );
      setNumOfRows(response.order.length);
    });
  }, []);

  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  function createData(
    _id,
    date,
    wardNo,
    status,
    drug,
    batch,
    quantityIssued,
    quantityReceived,
    totalOrdered,
    totalIssued,
    totalReceived
  ) {
    return {
      _id,
      date,
      wardNo,
      status,
      drug,
      batch,
      quantityIssued,
      quantityReceived,
      totalOrdered,
      totalIssued,
      totalReceived,
    };
  }
  return (
    <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
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
  );
};

export default OrderHistory;
