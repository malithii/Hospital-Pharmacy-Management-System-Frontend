import {
  Autocomplete,
  Button,
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
    });
    setOrderItems([]);
  };

  return (
    <Box>
      <TitleBar image={order} title="Order" description="Manages Orders" />

      <Grid container spacing={2}>
        <Grid item lg={5}>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 2,
                  borderRadius: 3,
                  height: "500px",
                  overflow: "auto",
                }}
              >
                <Grid container sx={{ width: "100%" }}>
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    color="#495579"
                    pb={1}
                  >
                    Order
                  </Typography>
                  <Grid item lg={12}>
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
                        width: "100%",
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
                  <Grid item lg={12}>
                    <Typography>Quantity</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      id="quantityOrdered"
                      value={quantityOrdered}
                      onChange={(e) => setQuantityOrdered(e.target.value)}
                    />
                  </Grid>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setQuantityOrdered("");
                      setValue("");
                      setOrderItems([
                        ...orderItems,
                        {
                          drug: value,
                          quantityOrdered: quantityOrdered,
                        },
                      ]);
                      console.log(orderItems);
                    }}
                  >
                    Order
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={7}>
          <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
              Order
            </Typography>
            <Grid container>
              {orderItems.map((item) => {
                return (
                  <Grid item lg={12} key={item.id}>
                    <Grid container>
                      <Grid item lg={4}>
                        <Typography>Drug</Typography>
                        <Typography>{item.drug.drugId}</Typography>
                      </Grid>
                      <Grid item lg={4}>
                        <Typography>Quantity</Typography>
                        <Typography>{item.quantityOrdered}</Typography>
                      </Grid>
                      <Grid item lg={4}>
                        <IconButton
                          onClick={() => {
                            setOrderItems(
                              orderItems.filter(
                                (i) => i.drug.drugId !== item.drug.drugId
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
                );
              })}
              {orderItems.length > 0 ? ( // if orderItems is not empty
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                  Submit
                </Button>
              ) : (
                <Typography>Order is empty</Typography>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
