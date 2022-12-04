import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import medicine1 from "../../../images/medicine-2.png";
import ListComponent from "../../../components/ListComponent";
import { useForm } from "react-hook-form";
import { getAllDrugs, newDrug } from "../../../App/drugsService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import React, { useEffect, useState } from "react";

const Drugs = () => {
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

  const editClickHandler = (userId) => {
    console.log(userId);
    //btn action
  };
  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  function createData(
    drugId,
    drugName,
    category,
    description,
    level,
    storeTemp
  ) {
    return {
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
  }, []);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

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
        <Grid item lg={4} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" pb={3}>
                General Drug Categories
              </Typography>
              <Grid container>
                <ListComponent x="6" color="#0D4C92" label="Analgesics" />
                <ListComponent x="6" color="#9A1663" label="Antacids" />
                <ListComponent
                  x="6"
                  color="#C539B4"
                  label="Antianxiety Drugs"
                />
                <ListComponent x="6" color="#B01E68" label="Antiarrhythmics" />
                <ListComponent x="6" color="#EB6440" label="Antibacterials" />
                <ListComponent x="6" color="#7743DB" label="Anticoagulants" />
                <ListComponent x="6" color="#3A8891" label="Antidepressants" />
                <ListComponent x="6" color="#FF8FB1" label="Antivirals" />
                <ListComponent x="6" color="#FD841F" label="Bronchodilators" />
                <ListComponent x="6" color="#54B435" label="Cold Cures" />
                <ListComponent x="6" color="#FF6464" label="Diuretics" />
                <ListComponent x="6" color="#5DA7DB" label="Expectorant" />
                <ListComponent x="6" color="#E0144C" label="Hormones" />
                <ListComponent
                  x="6"
                  color="#000000"
                  label="mmunosuppressives"
                />
                <ListComponent x="6" color="#00ABB3" label="Sedatives" />
                <ListComponent x="6" color="#EA047E" label="Tranquilizer" />
                <ListComponent x="6" color="#A8E890" label="Vitamins" />
                <ListComponent x="6" color="#5F9DF7" label="Hypoglycemics " />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" pb={3}>
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
                  x="12"
                  color="#379237"
                  label="1 :- General Medicines"
                />
                <ListComponent
                  x="12"
                  color="#FCE700"
                  label="2 :- Pharmacy Medicines"
                />
                <ListComponent
                  x="12"
                  color="#400D51"
                  label="3 :- Prescription Only "
                />
                <ListComponent
                  x="12"
                  color="#EB1D36"
                  label="4 :- Controlled drugs"
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Add New Drug</Typography>
              <Grid container>
                <Grid item lg={12}>
                  <Typography pt={1}>Drug ID</Typography>
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
                  <Typography pt={1}>Drug Name</Typography>
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
                  <Typography pt={1}>Category</Typography>
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
                  <Typography pt={1}>Description</Typography>
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
                  <Typography pt={1}>Level</Typography>
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
                  <Typography pt={1}>Store Temperature</Typography>
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
                  p={2}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <EnhancedTable
            headCells={headCells}
            rows={rows}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            numOfRows={numOfRows}
            tableTitle={"Drugs"}
            actionButtons={[{ btnName: "Edit", actionFunc: editClickHandler }]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Drugs;
