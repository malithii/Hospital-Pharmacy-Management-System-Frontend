import {
  Box,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useGridSelector } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { updateReorderLevel } from "../../App/inventoryService";
import { showAlert } from "../../App/alertService";

const ReorderLevelModal = ({ open, setOpen, updatingData, setRefresh }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    if (updatingData.drugId) {
      console.log(updatingData);
      setValue("reorderLevel", updatingData.reorderLevel);
    }
  }, [updatingData]);

  const user = useSelector((state) => state.loginHPMS._id);

  const onSubmit = (data) => {
    console.log("data");
    console.log(data);
    console.log(updatingData);
    updateReorderLevel(
      {
        user: user,
        drug: updatingData.obj.drug._id,
        reorderLevel: data.reorderLevel,
      },
      (response) => {
        console.log(response);
        setRefresh((prev) => !prev);
        showAlert("Reorder level updated successfully", "success");
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
          <Typography>Update Reorder Level</Typography>
          <Grid container>
            <Grid
              item
              lg={12}
              sx={{ display: "flex", alignItems: "center", pt: 2 }}
            >
              <TextField
                size="small"
                sx={{ width: "100%" }}
                id="reorderLevel"
                placeholder="Reorder Level"
                {...register("reorderLevel", {
                  required: {
                    value: true,
                    message: "Reorder level is required",
                  },
                  validate: {
                    isNumber: (value) => {
                      if (!value.match(/^[0-9]*$/)) {
                        return "Please enter a number";
                      }
                    },
                  },
                })}
                {...(errors.reorderLevel && {
                  error: true,
                  helperText: errors.reorderLevel.message,
                })}
              />
              <IconButton onClick={handleSubmit(onSubmit)}>
                <CheckCircleIcon color="success" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReorderLevelModal;
