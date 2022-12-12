import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
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
  description,
  level,
  storeTemp,
  updatingData,
  setShouldRefresh,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  const clearAll = () => {
    resetField("drugId");
    resetField("drugName");
    resetField("category");
    resetField("description");
    resetField("level");
    resetField("storeTemp");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (updatingData.drugId) {
      setValue("drugId", updatingData.drugId);
      setValue("drugName", updatingData.drugName);
      setValue("category", updatingData.category);
      setValue("description", updatingData.description);
      setValue("level", updatingData.level);
      setValue("storeTemp", updatingData.storeTemp);
    }
  }, [updatingData]);

  const onSubmit = (data) => {
    data["_id"] = updatingData._id;
    console.log(data);
    updateDrugs(data, (response) => {
      console.log(response);
      clearAll();
      setShouldRefresh((prev) => !prev);
      handleClose();
    });
  };

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
                variant="h6"
                fontWeight={"bold"}
                color="#495579"
                pt={1}
              >
                Drug ID
              </Typography>
              <TextField
                value={drugId}
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
                value={level}
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
                value={storeTemp}
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
