import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGridSelector } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import {
  getBatches,
  removeBatch,
  updateReorderLevel,
} from "../../App/inventoryService";
import { showAlert } from "../../App/alertService";
import { getDrugById } from "../../App/drugsService";

const RemoveBatchModal = ({ open, setOpen, updatingData, setRefresh }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [drugs, setDrugs] = useState([]);
  const [batchNos, setBatchNos] = useState([]);

  useEffect(() => {
    getDrugById((response) => {
      console.log(response.drug);
      setDrugs(response.drug);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    getValues,
  } = useForm();

  const user = useSelector((state) => state.loginHPMS._id);

  const onSubmit = (data) => {
    console.log(data);
    removeBatch(
      { user: user, drug: data.drug._id, batch: data.batchNo },
      (response) => {
        console.log(response);
        setRefresh((prev) => !prev);
        showAlert("Batch removed successfully", "success");
        handleClose();
      }
    );
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
          width: "20rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3 }}>
          {" "}
          <Typography>Remove Batch</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Drug</Typography>
              <Autocomplete
                disablePortal
                {...register("drug", {
                  required: {
                    value: true,
                    message: "Drug is required",
                  },
                })}
                onChange={(e, value) => {
                  setValue("drug", value);
                  console.log(value);
                  getBatches({ user: user, drug: value._id }, (response) => {
                    console.log(response);
                    setBatchNos(response.inventory);
                    console.log(batchNos);
                  });
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
            <Grid item xs={12}>
              <Typography>Batch No</Typography>
              <Autocomplete
                disablePortal
                {...register("batchNo", {
                  required: {
                    value: true,
                    message: "batchNo is required",
                  },
                })}
                onChange={(e, value) => {
                  setValue("batchNo", value.batchNo);
                  console.log(value);
                }}
                id="combo-box-demo"
                getOptionLabel={(option) => option.batchNo}
                options={batchNos}
                sx={{
                  width: "98%",
                  ...(errors.batchNo && {
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
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                sx={{ width: "100%" }}
              >
                Remove Batch
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default RemoveBatchModal;
