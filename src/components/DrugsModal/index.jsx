import {
  Autocomplete,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateDrugs } from "../../App/drugsService";

const DrugsModal = ({
  open,
  setOpen,
  drugId,
  drugName,
  category,
  strength,
  description,
  storeTemp,
  categories,
  storeTemps,
  updatingData,
  setShouldRefresh,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    getValues,
  } = useForm();
  const [categoryD, setCategory] = useState("");
  const [storeTempD, setStoreTemp] = useState("");

  const clearAll = () => {
    resetField("drugName");
    resetField("strength");
    resetField("category");
    resetField("storeTemp");
    resetField("description");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (updatingData.drugId) {
      console.log(updatingData);
      setCategory(updatingData.obj.category);
      setStoreTemp(updatingData.obj.storeTemp);
      setValue("drugId", updatingData.drugId);
      setValue("drugName", updatingData.drugName);
      setValue("strength", updatingData.strength);
      setValue("category", updatingData.obj.category);
      setValue("description", updatingData.description);

      setValue("storeTemp", updatingData.storeTemp);
    }
  }, [updatingData]);

  const onSubmit = (data) => {
    data["_id"] = updatingData.obj._id;
    data["category"] = data.category._id;
    data["storeTemp"] = data.storeTemp._id;
    console.log(data);
    updateDrugs(data, (response) => {
      console.log(response);
      clearAll();
      setShouldRefresh((prev) => !prev);
      handleClose();
    });
  };
  // console.log(getValues("category"));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: "30rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, pt: 5 }}>
          <Typography variant="h6" fontWeight={"bold"} color="#495579" pb={1}>
            Update
          </Typography>
          <Grid container>
            <Grid item lg={12}>
              <Typography
                variant="h7"
                fontWeight={"normal"}
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
                variant="h7"
                fontWeight={"normal"}
                color="#495579"
                pt={1}
              >
                Strength
              </Typography>
              <TextField
                id="strength"
                sx={{ mt: "0.5rem", width: "98%" }}
                placeholder="trength"
                size="small"
                {...register("strength", {
                  required: {
                    value: true,
                    message: "Strength is required",
                  },
                })}
                {...(errors.strength && {
                  error: true,
                  helperText: errors.strength.message,
                })}
              ></TextField>
            </Grid>
            <Grid item lg={12}>
              <Typography
                variant="h7"
                fontWeight={"normal"}
                color="#495579"
                pt={1}
              >
                Category
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
                  // if (updatingData.drugId) {
                  //   updatingData.obj["category"] = value;
                  // }
                  setCategory(value);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                value={{ ...categoryD }}
                id="category"
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
            <Grid item lg={12}>
              <Typography
                variant="h7"
                fontWeight={"normal"}
                color="#495579"
                pt={1}
              >
                Store Temperature
              </Typography>
              <Autocomplete
                disablePortal
                {...register("storeTemp", {
                  required: {
                    value: true,
                    message: "StoreTemp is required",
                  },
                })}
                onChange={(e, value) => {
                  setValue("storeTemp", value);
                  // if (updatingData.drugId) {
                  //   updatingData.obj["category"] = value;
                  // }
                  setStoreTemp(value);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={{ ...storeTempD }}
                id="storeTemp"
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
              <Typography
                variant="h7"
                fontWeight={"normal"}
                color="#495579"
                pt={1}
              >
                Description
              </Typography>
              <TextField
                value={description}
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
                {updatingData.drugId ? "Update" : "Add"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default DrugsModal;
