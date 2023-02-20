import {
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useLocation, useSearchParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { acceptOrder } from "../../../App/orderService";
import { showAlert } from "../../../App/alertService";

const DetailedOrders = () => {
  const location = useLocation();

  console.log(location.state);

  const [order, setOrder] = useState(
    location.state.detailedOrder.orderItems.map((order) => ({
      drugName: order.drug.drugId,
      drug: order.drug._id,
      quantityOrdered: order.quantityOrdered,
      issueDrugs: order.issueDrugs.map((issue) => ({
        batch: issue.batch,
        quantityIssued: issue.quantityIssued,
      })),
    }))
  );
  useEffect(() => {
    console.log(order);
  }, [order]);

  const [batch, setBatch] = useState("");
  const [quantityIssued, setQuantityIssued] = useState(0);
  const [issues, setIssues] = useState({});
  const pharmacist = useSelector((state) => state.loginHPMS._id);
  const [orderItem, setOrderItem] = useState({
    drug: "",
    quantityOrdered: 0,
    issueDrugs: [],
  });
  const [orderItems, setOrderItems] = useState([]);

  // console.log("issue order");
  // console.log(order);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  const reqBody = {
    _id: location.state.detailedOrder._id,
    wardUser: location.state.detailedOrder.wardUser._id,
    pharmacist: pharmacist,
    orderItems: order,
  };
  const onSubmit = () => {
    console.log("submit");
    console.log(reqBody);
    acceptOrder(reqBody, (response) => {
      console.log(response);
      if (response.status === "success") {
        showAlert("Drugs Issued successfully", "success");
      } else {
        showAlert("Error", "error");
      }
    });
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                <Typography fontWeight={"bold"}>Ward: </Typography>
                <Typography fontWeight={"bold"}>
                  {location.state.detailedOrder.wardUser.wardNo}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                <Typography fontWeight={"bold"}>Date: </Typography>
                <Typography fontWeight={"bold"}>
                  {location.state.detailedOrder.date.slice(0, 10)}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                  Issue
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={8}>
          {order.map((e, index) => {
            console.log(e);
            return (
              <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, mt: 2 }}>
                <Grid container spacing={2} sx={{ pb: 1 }}>
                  <Grid
                    item
                    xs={12}
                    lg={3.5}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                      Drug :
                    </Typography>

                    <Typography sx={{ fontWeight: "normal", fontSize: 14 }}>
                      {" "}
                      {e.drugName}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={2.5}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                      Quantity :
                    </Typography>
                    <Typography sx={{ fontWeight: "normal", fontSize: 14 }}>
                      {e.quantityOrdered}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={6}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                      Batch:
                    </Typography>
                    <TextField
                      id="batch "
                      size="small"
                      sx={{ ml: "20px", mr: "30px" }}
                      onChange={(e) => {
                        setBatch(e.target.value);
                      }}
                    />
                    <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                      Issue:
                    </Typography>
                    <TextField
                      id="quantityIssued"
                      size="small"
                      sx={{ ml: "20px" }}
                      onChange={(e) => {
                        setQuantityIssued(e.target.value);
                      }}
                    />
                    <IconButton>
                      {"   "}{" "}
                      <AddCircleIcon
                        color="primary"
                        onClick={() => {
                          console.log("EEEEEEE");
                          console.log(e);
                          //prevent adding same batch and quantity again
                          if (
                            issues[e.drug] &&
                            issues[e.drug].find((issue) => {
                              return (
                                issue.batch === batch &&
                                issue.quantityIssued === quantityIssued
                              );
                            })
                          ) {
                            showAlert(
                              "Batch and quantity already added",
                              "error"
                            );
                            return;
                          } else {
                            const response = fetch(
                              `http://localhost:9000/inventory/checkBatchQuantity`,
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  user: pharmacist,
                                  drug: e.drug,
                                  batch: batch,
                                  quantity: quantityIssued,
                                }),
                              }
                            );
                            response
                              .then((res) => res.json())
                              .then((data) => {
                                if (data.status === "success") {
                                  setIssues((prev) => {
                                    if (prev[e.drug]) {
                                      return {
                                        ...prev,
                                        [e.drug]: [
                                          ...prev[e.drug],
                                          {
                                            batch: batch,
                                            quantityIssued: quantityIssued,
                                          },
                                        ],
                                      };
                                    } else {
                                      return {
                                        ...prev,
                                        [e.drug]: [
                                          {
                                            batch: batch,
                                            quantityIssued: quantityIssued,
                                          },
                                        ],
                                      };
                                    }
                                  });
                                  order[index].issueDrugs.push({
                                    batch: batch,
                                    quantityIssued: quantityIssued,
                                  });

                                  setOrder(order);
                                } else {
                                  showAlert(data.error, "error");
                                }
                              });
                          }

                          //   {setIssues((prev) => {
                          //     if (prev[e.drug]) {
                          //       return {
                          //         ...prev,
                          //         [e.drug]: [
                          //           ...prev[e.drug],
                          //           {
                          //             batch: batch,
                          //             quantityIssued: quantityIssued,
                          //           },
                          //         ],
                          //       };
                          //     } else {
                          //       return {
                          //         ...prev,
                          //         [e.drug]: [
                          //           {
                          //             batch: batch,
                          //             quantityIssued: quantityIssued,
                          //           },
                          //         ],
                          //       };
                          //     }
                          //   });
                          //   order[index].issueDrugs.push({
                          //     batch: batch,
                          //     quantityIssued: quantityIssued,
                          //   });

                          //   setOrder(order);
                          //   console.log("orderItems");
                          //   console.log(orderItems);
                          //   console.log("order");
                          //   console.log(order);
                          // }
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container sx={{ pt: 1 }}>
                  <Grid item lg={12} sx={{ pb: 1 }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                      Issue Drugs
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <Chip label="Batch" />
                          </TableCell>
                          <TableCell align="center">
                            <Chip label="Quantity" />
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {issues[e.drug]?.map((a) => (
                          <>
                            <TableRow>
                              <TableCell align="center">{a.batch}</TableCell>
                              <TableCell align="center">
                                {a.quantityIssued}
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={12}
                    sx={{ display: "flex", justifyContent: "end" }}
                  >
                    bdndj
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedOrders;
