import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import TitleBar from "../../../components/TitleBar";
import order from "../../../images/order.png";
import Chart from "react-apexcharts";
import { useForm } from "react-hook-form";
import { getOrders, newOrder } from "../../../App/orderService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import { getDrugById } from "../../../App/drugsService";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const Order = () => {
  const [indexes, setIndexes] = useState([]);
  const [counter, setCounter] = useState(0);
  const [drugs, setDrugs] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.orderItems);
  };

  const addItem = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeItem = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const clearItems = () => {
    setIndexes([]);
  };

  useEffect(() => {
    getDrugById((response) => {
      console.log(response.drug);
      setDrugs(response.drug);
    });
  }, []);
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {indexes.map((index) => {
                        const fieldName = `orderItems[${index}]`;
                        return (
                          <fieldset
                            style={{ border: "none" }}
                            name={fieldName}
                            key={fieldName}
                          >
                            <Grid container spacing={2}>
                              <Grid item lg={6.3} xs={12}>
                                <Typography variant="h7" fontWeight={"normal"}>
                                  Drug {index}:
                                </Typography>
                                {/* <input
                            type="text"
                            name={`${fieldName}.firstName`}
                            {...register(`${fieldName}.firstName`)}
                          /> */}
                                <Autocomplete
                                  disablePortal
                                  {...register(`${fieldName}.drug`, {
                                    required: {
                                      value: true,
                                      message: "Drug is required",
                                    },
                                  })}
                                  onChange={(e, value) => {
                                    setValue("drug", value);
                                    console.log(value);
                                  }}
                                  id="combo-box-demo"
                                  getOptionLabel={(option) => option.drugId}
                                  options={drugs}
                                  sx={{
                                    mt: "0.5rem",
                                    width: "100%",
                                    ...(errors.drug && {
                                      border: "1px solid red",
                                    }),
                                  }}
                                  renderInput={(params) => {
                                    return (
                                      <TextField
                                        name={`${fieldName}.drug`}
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
                              <Grid item lg={4.3} xs={12}>
                                <Typography variant="h7" fontWeight={"normal"}>
                                  Quantity {index}:
                                </Typography>
                                <TextField
                                  size="small"
                                  sx={{ width: "100%", mt: "0.5rem" }}
                                  type="text"
                                  name={`${fieldName}.quantityOrdered`}
                                  {...register(`${fieldName}.quantityOrdered`)}
                                />
                              </Grid>
                              <Grid item lg={1.4}>
                                <IconButton
                                  aria-label="delete"
                                  onClick={removeItem(index)}
                                  sx={{ mt: "1.8rem" }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </fieldset>
                        );
                      })}

                      <Grid item lg={12}>
                        <Grid container spacing={2} p={2}>
                          <Grid item lg={4} xs={12}>
                            <Button
                              variant="contained"
                              onClick={addItem}
                              startIcon={<AddCircleIcon />}
                              sx={{ width: "100%" }}
                            >
                              Add New
                            </Button>
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <Button
                              variant="contained"
                              onClick={clearItems}
                              startIcon={<ClearAllIcon />}
                              sx={{ width: "100%" }}
                            >
                              Clear All
                            </Button>
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              startIcon={<AddShoppingCartIcon />}
                              sx={{ width: "100%" }}
                            >
                              Order
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
