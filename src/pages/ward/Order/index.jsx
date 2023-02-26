import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import { useEffect, useState } from "react";
import TitleBar from "../../../components/TitleBar";
import order from "../../../images/order.png";
import { getDrugById } from "../../../App/drugsService";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { newOrder } from "../../../App/orderService";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { showAlert } from "../../../App/alertService";

const Order = () => {
  const [drugs, setDrugs] = useState([]);
  const [quantityOrdered, setQuantityOrdered] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    getDrugById((response) => {
      console.log(response.drug);
      setDrugs(response.drug);
    });
  }, []);

  const { handleSubmit } = useForm();

  const [orderItems, setOrderItems] = useState([]);

  var today = new Date(),
    month = today.getMonth() + 1,
    month1 = month < 10 ? "0" + month : month,
    date = today.getFullYear() + "-" + month1 + "-" + today.getDate();

  const wardUser = useSelector((state) => state.loginHPMS._id);

  const requestBody = {
    wardUser: wardUser,
    date: date,
    orderItems: orderItems,
  };
  const onSubmit = () => {
    console.log(requestBody);

    newOrder(requestBody, (response) => {
      console.log(response);
      showAlert("Order Created Successfully", "success");
    });
    setOrderItems([]);
  };

  return (
    <Box>
      <TitleBar image={order} title="Order" description="Manages Orders" />

      <Grid container spacing={2}>
        <Grid item lg={6}>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 2,
                  borderRadius: 3,
                  overflow: "auto",
                }}
              >
                <Grid container sx={{ width: "100%" }}>
                  <Grid item lg={12}>
                    <Typography
                      variant="h6"
                      fontWeight={"bold"}
                      color="#495579"
                    >
                      Add Order Items
                    </Typography>
                  </Grid>

                  <Grid item lg={6}>
                    <Typography>Drug</Typography>
                    <Autocomplete
                      disablePortal
                      // {...register("drug", {
                      //   required: {
                      //     value: true,
                      //     message: "Drug is required",
                      //   },
                      // })}
                      onChange={(e, value) => {
                        setValue(value);
                        console.log(value);
                      }}
                      id="combo-box-demo"
                      getOptionLabel={(option) => option.drugId}
                      options={drugs}
                      sx={{
                        mt: "0.5rem",
                        width: "98%",
                        // ...(errors.drug && {
                        //   border: "1px solid red",
                        // }),
                      }}
                      renderInput={(params) => {
                        return (
                          <TextField
                            sx={{ color: "red" }}
                            {...params}
                            size="small"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Typography>Quantity</Typography>
                    <TextField
                      size="small"
                      sx={{ mt: "0.5rem", width: "98%" }}
                      id="quantityOrdered"
                      value={quantityOrdered}
                      onChange={(e) => setQuantityOrdered(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      pt: 1,
                      pr: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (isNaN(quantityOrdered) || quantityOrdered === "") {
                          showAlert("Quantity should be a number", "error");
                          return;
                        } else {
                          setQuantityOrdered("");

                          setOrderItems([
                            ...orderItems,
                            {
                              drug: value,
                              quantityOrdered: quantityOrdered,
                            },
                          ]);
                          console.log(orderItems);
                        }
                      }}
                      endIcon={<AddCircleIcon />}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={12}>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 2,
                  borderRadius: 3,
                  height: "300px",
                  overflow: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                <Grid
                  item
                  lg={12}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    color="#495579"
                    pb={1}
                  >
                    Order
                  </Typography>
                  {orderItems.length > 0 ? ( // if orderItems is not empty
                    <Button
                      variant="contained"
                      sx={{ bottom: 0 }}
                      onClick={handleSubmit(onSubmit)}
                    >
                      Order
                    </Button>
                  ) : null}
                </Grid>
                <Grid container sx={{ pt: 3 }}>
                  {orderItems.map((item) => {
                    return (
                      <>
                        {" "}
                        <Grid item lg={12} key={item.id}>
                          <Grid
                            container
                            sx={{ borderBottom: "1px solid black" }}
                          >
                            <Grid
                              item
                              lg={4}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography>{item.drug.drugId}</Typography>
                            </Grid>
                            <Grid
                              item
                              lg={4}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography>{item.quantityOrdered}</Typography>
                            </Grid>
                            <Grid
                              item
                              lg={4}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <IconButton
                                onClick={() => {
                                  setOrderItems(
                                    orderItems.filter(
                                      (i) =>
                                        i.drug.drugId !== item.drug.drugId ||
                                        i.quantityOrdered !==
                                          item.quantityOrdered
                                    )
                                  );
                                  console.log(orderItems);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                  {orderItems.length > 0 ? null : ( // if orderItems is not empty
                    <Box
                      sx={{
                        height: "200px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        Order is empty. Add Order Items to order
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
