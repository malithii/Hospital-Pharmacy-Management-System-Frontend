import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import medicine1 from "../../../images/medicine-2.png";
import ListComponent from "../../../components/ListComponent";
import { useForm } from "react-hook-form";
import { getAllDrugs, newDrug } from "../../../App/drugsService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import DrugsModal from "../../../components/DrugsModal";

const Drugs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      id: "category",
      numeric: false,
      disablePadding: true,
      label: "Category",
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
      id: "level",
      numeric: false,
      disablePadding: true,
      label: "Level",
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

  const [drugValue, setDrugValues] = useState({
    drugId: "",
    drugName: "",
    category: "",
    description: "",
    level: "",
    storeTemp: "",
  });

  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  function createData(
    _id,
    drugId,
    drugName,
    category,
    description,
    level,
    storeTemp
  ) {
    return {
      _id,
      drugId,
      drugName,
      category,
      description,
      level,
      storeTemp,
    };
  }

  useEffect(() => {
    getAllDrugs((response) => {
      console.log(response.drug);
      setRetrivedRows(
        response.drug.map((e) =>
          createData(
            e._id,
            e.drugId,
            e.drugName,
            e.category,
            e.description,
            e.level,
            e.storeTemp
          )
        )
      );
      setNumOfRows(response.drug.length);
    });
  }, [shouldRefresh]);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

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
    console.log(data);
    handleOpen();
    //btn action
  };

  const clearAll = () => {
    resetField("drugId");
    resetField("drugName");
    resetField("category");
    resetField("description");
    resetField("level");
    resetField("storeTemp");
  };

  const onSubmit = (data) => {
    newDrug(data, (response) => {
      console.log(response);
      clearAll();
      setShouldRefresh((prev) => !prev);
    });
  };

  return (
    <Box>
      <TitleBar
        image={medicine1}
        title="Drugs"
        description="Manage drug details"
      />
      <Grid container mt={2} spacing={2} mb={2}>
        <Grid item lg={8}>
          <Grid container spacing={2}>
            <Grid item lg={6} xs={12}>
              <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
                <Typography variant="h6" pb={3}>
                  Store Temperature
                </Typography>
                <Grid container>
                  <ListComponent
                    x="12"
                    color="#F49D1A"
                    label="1 :- Non-Refrigerated medicines: 10°- 25°C "
                  />
                  <ListComponent
                    x="12"
                    color="#DC3535"
                    label="2 :- Refrigerated medicines: 2°-8°C  "
                  />
                  <ListComponent
                    x="12"
                    color="#B01E68"
                    label="1 :- Freezing temperatures: -10°C to -25°C "
                  />
                </Grid>
                <Typography variant="h5" pb={3} mt={3}>
                  Levels
                </Typography>
                <Grid container>
                  <ListComponent
                    x="6"
                    color="#379237"
                    label="1 :- General Medicines"
                  />
                  <ListComponent
                    x="6"
                    color="#FCE700"
                    label="2 :- Pharmacy Medicines"
                  />
                  <ListComponent
                    x="6"
                    color="#400D51"
                    label="3 :- Prescription Only "
                  />
                  <ListComponent
                    x="6"
                    color="#EB1D36"
                    label="4 :- Controlled drugs"
                  />
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
                <Typography variant="h5" pb={3}>
                  Levels
                </Typography>
                <Chart
                  type="pie"
                  width={500}
                  height={390}
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
            <Grid item lg={12}>
              <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
                <Chart
                  type="bar"
                  width="100%"
                  height="150px"
                  options={{
                    chart: {
                      id: "basic-bar",
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 4,
                        horizontal: true,
                      },
                    },
                    xaxis: {
                      categories: [
                        "Non-Refrigerated",
                        "Refrigerated",
                        "Freezing",
                      ],
                    },
                  }}
                  series={[
                    {
                      name: "series-1",
                      data: [30, 40, 45],
                    },
                  ]}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={4} xs={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, pt: 5 }}>
            <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
              Add New Drug
            </Typography>
            <Grid container>
              <Grid item lg={12}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pt={1}
                >
                  Drug ID
                </Typography>
                <TextField
                  id="drugid"
                  sx={{ mt: "0.5rem", width: "98%" }}
                  placeholder="Drug ID"
                  size="small"
                  {...register("drugId", {
                    required: {
                      value: true,
                      message: "Drug ID is required",
                    },
                  })}
                  {...(errors.drugId && {
                    error: true,
                    helperText: errors.drugId.message,
                  })}
                ></TextField>
              </Grid>
              <Grid item lg={12}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pt={1}
                >
                  Drug Name
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
                    helperText: errors.drugName.message,
                  })}
                ></TextField>
              </Grid>
              <Grid item lg={12}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pt={1}
                >
                  Category
                </Typography>
                <TextField
                  id="category"
                  sx={{ mt: "0.5rem", width: "98%" }}
                  placeholder="Category"
                  size="small"
                  {...register("category", {
                    required: {
                      value: true,
                      message: "Category is required",
                    },
                  })}
                  {...(errors.category && {
                    error: true,
                    helperText: errors.category.message,
                  })}
                ></TextField>
              </Grid>
              <Grid item lg={12}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pt={1}
                >
                  Description
                </Typography>
                <TextField
                  id="description"
                  sx={{ mt: "0.5rem", width: "98%" }}
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
                    helperText: errors.description.message,
                  })}
                ></TextField>
              </Grid>
              <Grid item lg={6}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pt={1}
                >
                  Level
                </Typography>
                <TextField
                  id="level"
                  sx={{ mt: "0.5rem", width: "98%" }}
                  placeholder="Level"
                  size="small"
                  {...register("level", {
                    required: {
                      value: true,
                      message: "Level is required",
                    },
                  })}
                  {...(errors.level && {
                    error: true,
                    helperText: errors.level.message,
                  })}
                ></TextField>
              </Grid>
              <Grid item lg={6}>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="#495579"
                  pt={1}
                >
                  Store Temperature
                </Typography>
                <TextField
                  id="storeTemp"
                  sx={{ mt: "0.5rem", width: "98%" }}
                  placeholder="Store Temperature"
                  size="small"
                  {...register("storeTemp", {
                    required: {
                      value: true,
                      message: "Store temperature is required",
                    },
                  })}
                  {...(errors.storeTemp && {
                    error: true,
                    helperText: errors.storeTemp.message,
                  })}
                ></TextField>
              </Grid>
              <Grid
                item
                lg={12}
                pt={4}
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
      <DrugsModal
        open={open}
        setOpen={setOpen}
        drugValue={drugValue}
        setShouldRefresh={setShouldRefresh}
        updatingData={updatingData}
      />
    </Box>
  );
};

export default Drugs;
