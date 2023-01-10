import {
  Autocomplete,
  Avatar,
  Button,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import medicine1 from "../../../images/medicine-2.png";
import ListComponent from "../../../components/ListComponent";
import { useForm } from "react-hook-form";
import {
  getAllDrugs,
  getCategories,
  getStoreTemps,
  newCategory,
  newDrug,
} from "../../../App/drugsService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import DrugsModal from "../../../components/DrugsModal";
import EditIcon from "@mui/icons-material/Edit";
import CategoryModal from "../../../components/CategoryModal";
import StoreTempModal from "../../../components/StoreTempModal";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";

const Drugs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openCategory, setOpenCategory] = useState(false);
  const handleOpenCategory = () => setOpenCategory(true);
  const handleCloseCategory = () => setOpenCategory(false);

  const [openStoreTemp, setOpenStoreTemp] = useState(false);
  const handleOpenStoreTemp = () => setOpenStoreTemp(true);
  const handleCloseStoreTemp = () => setOpenStoreTemp(false);

  const headCells = [
    {
      id: "drugId",
      numeric: false,
      disablePadding: true,
      label: "Drug ID",
      align: "center",
    },
    {
      id: "drugName",
      numeric: false,
      disablePadding: true,
      label: "Drug Name",
      align: "center",
    },
    {
      id: "strength",
      numeric: false,
      disablePadding: true,
      label: "Strength",
      align: "center",
    },
    {
      id: "category",
      numeric: false,
      disablePadding: true,
      label: "Category",
      align: "center",
    },
    {
      id: "storeTemp",
      numeric: false,
      disablePadding: true,
      label: "Store Temperature",
      align: "center",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: true,
      label: "Description",
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
  const [refreshCategories, setRefreshCategories] = useState(true);
  const [refreshStoreTemps, setRefreshStoreTemps] = useState(true);

  const [drugValue, setDrugValues] = useState({
    drugName: "",
    strength: "",
    category: "",
    storeTemp: "",
    description: "",
  });

  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  function createData(
    obj,
    drugId,
    drugName,
    strength,
    category,
    storeTemp,
    description
  ) {
    return {
      obj,
      drugId,
      drugName,
      strength,
      category,
      storeTemp,
      description,
    };
  }

  useEffect(() => {
    getAllDrugs((response) => {
      // console.log(response.drug);
      setRetrivedRows(
        response.drug.map((e) =>
          createData(
            e,
            e.drugId,
            e.drugName,
            e.strength,
            e.category.name,
            e.storeTemp.id,
            e.description
          )
        )
      );
      setNumOfRows(response.drug.length);
    });
  }, [shouldRefresh]);

  useEffect(() => {
    // console.log(rows);
  }, [rows]);

  const [categories, setCategories] = useState([]);
  const [storeTemps, setStoreTemps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories((response) => {
      console.log(response.categories);
      setCategories(response.categories);
    });
  }, [refreshCategories]);

  useEffect(() => {
    setLoading(true);
    getStoreTemps((response) => {
      setLoading(false);
      console.log(response.storeTemps);
      setStoreTemps(response.storeTemps);
    });
  }, [refreshStoreTemps]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();
  const [updatingData, setUpdatingData] = useState({});
  const editClickHandler = (data) => {
    setUpdatingData(data);
    // console.log(data);
    handleOpen();
    //btn action
  };

  const clearAll = () => {
    resetField("drugId");
    resetField("drugName");
    resetField("strength");
    resetField("category");
    resetField("storeTemp");
    resetField("description");
  };

  const onSubmit = (data) => {
    setLoading(true);
    newDrug(
      data,
      (response) => {
        console.log(response);
        clearAll();
        setShouldRefresh((prev) => !prev);
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <Box>
      <TitleBar
        image={medicine1}
        title="Drugs"
        description="Manage drug details"
      />
      {loading && <LoadingAnimation />}
      <Grid container spacing={2} mb={2}>
        <Grid item lg={4}>
          <Grid container spacing={2}>
            <Grid item lg={12} xs={12}>
              <Box
                sx={{
                  bgcolor: "white",
                  pl: 2,
                  pr: 4,
                  pb: 4,
                  pt: 2,
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h6">Categories</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                    title="Add and view categories"
                    onClick={handleOpenCategory}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h6">Store Temperatures</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                    title="Add and view categories"
                    onClick={handleOpenStoreTemp}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h7" pt={2}>
                    Drugs in Categories:
                  </Typography>
                </Box>
                <Chart
                  type="pie"
                  width={450}
                  height={340}
                  options={{
                    chart: {
                      id: "basic-bar",
                    },
                    labels: [
                      "General Medicines",
                      "Pharmacy Medicine",
                      "Prescription Only",
                      "Controlled Drugs",
                    ],
                  }}
                  series={[55, 13, 43, 22]}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={8} xs={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, pt: 3 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579">
              Add New Drug
            </Typography>
            <Grid container>
              <Grid item lg={6}>
                <Typography fontWeight={"normal"} color="#495579" pt={1}>
                  Drug Name{" "}
                  {errors.drugName ? (
                    <span style={{ color: "red", fontSize: 10 }}>
                      {errors.drugName.message}
                    </span>
                  ) : null}
                </Typography>
                <TextField
                  id="drugName"
                  sx={{ mt: "0.5rem", width: "98%" }}
                  placeholder="Drug Name"
                  size="small"
                  {...register("drugName", {
                    required: {
                      value: true,
                      message: "Drug Name is required",
                    },
                  })}
                  {...(errors.drugName && {
                    error: true,
                  })}
                ></TextField>
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={setCategories}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Movie" />
                  )}
                /> */}
              </Grid>
              <Grid item lg={6}>
                <Typography fontWeight={"normal"} color="#495579" pt={1}>
                  Strength{" "}
                  {errors.strength ? (
                    <span style={{ color: "red", fontSize: 10 }}>
                      {errors.strength.message}
                    </span>
                  ) : null}
                </Typography>
                <TextField
                  id="strength"
                  sx={{ mt: "0.5rem", width: "98%" }}
                  placeholder="Strength"
                  size="small"
                  {...register("strength", {
                    required: {
                      value: true,
                      message: "Strength is required",
                    },
                  })}
                  {...(errors.strength && {
                    error: true,
                  })}
                ></TextField>
              </Grid>
              <Grid item lg={6}>
                <Typography fontWeight={"normal"} color="#495579" pt={1}>
                  Category{" "}
                  {errors.category ? (
                    <span style={{ color: "red", fontSize: 10 }}>
                      {errors.category.message}
                    </span>
                  ) : null}
                </Typography>

                <Autocomplete
                  disablePortal
                  {...register("category", {
                    required: {
                      value: true,
                      message: "category is required",
                    },
                  })}
                  onChange={(e, value) => {
                    setValue("category", value);
                  }}
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.name}
                  options={categories}
                  sx={{
                    mt: "0.5rem",
                    width: "98%",
                    ...(errors.category && {
                      border: "1px solid red",
                    }),
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
                        // {...register("storeTemp", {
                        //   required: {
                        //     value: true,
                        //     message: "Store temperature is required",
                        //   },
                        // })}
                        // {...(errors.storeTemp && {
                        //   error: true,
                        //   helperText: errors.storeTemp.message,
                        // })}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item lg={6}>
                <Typography fontWeight={"normal"} color="#495579" pt={1}>
                  Store Temperature{" "}
                  {errors.storeTemp ? (
                    <span style={{ color: "red", fontSize: 10 }}>
                      {errors.storeTemp.message}
                    </span>
                  ) : null}
                </Typography>
                <Autocomplete
                  disablePortal
                  {...register("storeTemp", {
                    required: {
                      value: true,
                      message: "Store temperature is required",
                    },
                  })}
                  onChange={(e, value) => {
                    setValue("storeTemp", value);
                  }}
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.id}
                  options={storeTemps}
                  sx={{
                    mt: "0.5rem",
                    width: "98%",
                    ...(errors.storeTemp && {
                      border: "1px solid red",
                    }),
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
                        // {...register("storeTemp", {
                        //   required: {
                        //     value: true,
                        //     message: "Store temperature is required",
                        //   },
                        // })}
                        // {...(errors.storeTemp && {
                        //   error: true,
                        //   helperText: errors.storeTemp.message,
                        // })}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item lg={12}>
                <Typography fontWeight={"normal"} color="#495579" pt={1}>
                  Description{" "}
                  {errors.description ? (
                    <span style={{ color: "red", fontSize: 10 }}>
                      {errors.description.message}
                    </span>
                  ) : null}
                </Typography>
                <TextField
                  id="description"
                  sx={{ mt: "0.5rem", width: "99%" }}
                  placeholder="Description"
                  multiline
                  rows={2}
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                  })}
                  {...(errors.description && {
                    error: true,
                  })}
                ></TextField>
              </Grid>

              <Grid
                item
                lg={12}
                pt={2}
                gap={2}
                pl={2}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  variant="outlined"
                  sx={{ minWidth: "50%" }}
                  size="large"
                  onClick={clearAll}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  sx={{ minWidth: "50%" }}
                  size="large"
                  onClick={handleSubmit(onSubmit)}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item lg={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={3}>
              All Drugs
            </Typography>
            <EnhancedTable
              headCells={headCells}
              rows={rows}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              numOfRows={numOfRows}
              tableTitle={"Drugs"}
              actionButtons={[
                { btnName: "Edit", actionFunc: editClickHandler },
              ]}
            />
          </Box>
        </Grid>
      </Grid>

      <CategoryModal
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
        setRefreshCategories={setRefreshCategories}
        categories={categories}
      />
      <StoreTempModal
        openStoreTemp={openStoreTemp}
        setOpenStoreTemp={setOpenStoreTemp}
        storeTemps={storeTemps}
        setRefreshStoreTemps={setRefreshStoreTemps}
      />

      <DrugsModal
        open={open}
        setOpen={setOpen}
        drugValue={drugValue}
        setShouldRefresh={setShouldRefresh}
        updatingData={updatingData}
        categories={categories}
      />
    </Box>
  );
};

export default Drugs;
