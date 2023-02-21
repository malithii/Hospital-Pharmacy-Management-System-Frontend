import {
  Button,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  getAcceptedOrders,
  saveQuantityReceived,
} from "../../../App/orderService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import TitleBar from "../../../components/TitleBar";
import recievedIcon from "../../../images/recievedIcon.png";

const ReceiveWardStocks = () => {
  const headCells = [
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
  const [orderItems, setorderitems] = useState([]);
  const [pharmacist, setPharmacist] = useState("");
  const [orderId, setOrderId] = useState("");

  const user = useSelector((state) => state.loginHPMS._id);

  function createData(obj, date, status) {
    return {
      obj,
      date,
      status,
    };
  }

  useEffect(() => {
    getAcceptedOrders({ wardUser: user }, (response) => {
      //   console.log(response);
      setRetrivedRows(
        response.orders.map((e) => createData(e, e.date.slice(0, 10), e.status))
      );
      setNumOfRows(response.orders.length);
    });
  }, [shouldRefresh]);

  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  const actionClickHandler = (data) => {
    console.log(data.obj.orderItems);
    setorderitems(
      data.obj.orderItems.map((e) => ({
        drugName: e.drug.drugId,
        drug: e.drug._id,
        issueDrugs: e.issueDrugs.map((a) => ({
          batch: a.batch,
          quantityIssued: a.quantityIssued,
          quantityRecieved: a.quantityIssued,
        })),
        quantityOrdered: e.quantityOrdered,
      }))
    );
    setPharmacist(data.obj.pharmacist);
    setOrderId(data.obj._id);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    getValues,
  } = useForm();

  const onSubmit = () => {
    // console.log(orderItems);
    const reqBody = {
      _id: orderId,
      pharmacist: pharmacist,
      wardUser: user,
      orderItems: orderItems,
    };
    // console.log(reqBody);
    saveQuantityReceived(reqBody, (response) => {
      console.log(response);
    });
    setShouldRefresh(!shouldRefresh);
    setorderitems([]);
  };
  return (
    <Box>
      <TitleBar
        image={recievedIcon}
        title="Received"
        description="Accept and manage received stocks"
      />

      <Grid container spacing={2}>
        <Grid item lg={7}>
          <Box
            sx={{
              bgcolor: "white",
              p: 2,
              borderRadius: 3,
              pb: 3,
              height: "490px",
            }}
          >
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
                { btnName: "ACCEPT", actionFunc: actionClickHandler },
              ]}
            />
          </Box>
        </Grid>
        <Grid item lg={5}>
          <Box
            sx={{
              bgcolor: "white",
              p: 2,
              borderRadius: 3,
              pb: 3,
              height: "490px",
            }}
          >
            <Grid
              item
              lg={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {" "}
              <Typography variant="h7">Ordered Items</Typography>
              <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                Done
              </Button>
            </Grid>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Chip label="Drug" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Chip label="Batch" color="primary" variant="outlined" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.drugName}</TableCell>
                      {item.issueDrugs.map((issueDrug) => (
                        <>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <Chip label="Batch" />
                              </TableCell>
                              <TableCell>
                                <Chip label="Quantity Issued" />
                              </TableCell>
                              <TableCell>
                                <Chip label="Quantity Received" />
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableRow>
                            <TableCell align="center">
                              {issueDrug.batch}
                            </TableCell>
                            <TableCell align="center">
                              {issueDrug.quantityIssued}
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                size="small"
                                sx={{ width: "60px" }}
                                defaultValue={issueDrug.quantityIssued}
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  issueDrug.quantityRecieved = e.target.value;

                                  setorderitems([...orderItems]);
                                  console.log("ORDERITEMS");
                                  console.log(orderItems);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReceiveWardStocks;
