import {
  Button,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import { newStoreTemp } from "../../App/drugsService";

const StoreTempModal = ({
  openStoreTemp,
  setOpenStoreTemp,
  storeTemps,
  setRefreshStoreTemps,
}) => {
  const handleOpenStoreTemp = () => setOpenStoreTemp(true);
  const handleCloseStoreTemp = () => setOpenStoreTemp(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  const clearStoreTemp = () => {
    resetField("name");
    resetField("range");
  };
  const onSubmitStoreTemp = (data) => {
    console.log(data);
    newStoreTemp(data, (response) => {
      console.log(response);
      clearStoreTemp();
      setRefreshStoreTemps((prev) => !prev);
    });
  };

  return (
    <Modal
      open={openStoreTemp}
      onClose={handleCloseStoreTemp}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 3,
          pt: 5,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Typography variant="h7" fontWeight="bold">
          Store Temperatures
        </Typography>
        <Grid container>
          <Grid item lg={2} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h7" fontWeight="normal">
              Add New
            </Typography>
          </Grid>
          <Grid item lg={4} sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              sx={{ mt: "0.5rem", width: "98%" }}
              placeholder="Temperature Name"
              size="small"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Temperature name is required",
                },
              })}
              {...(errors.name && {
                error: true,
                helperText: errors.name.message,
              })}
            ></TextField>
          </Grid>
          <Grid item lg={4} sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              sx={{ mt: "0.5rem", width: "98%" }}
              placeholder="Temperature Range"
              size="small"
              id="range"
              {...register("range", {
                required: {
                  value: true,
                  message: "Range is required",
                },
              })}
              {...(errors.range && {
                error: true,
                helperText: errors.range.message,
              })}
            ></TextField>
          </Grid>
          <Grid
            item
            lg={2}
            sx={{ display: "flex", alignItems: "center", pt: 1 }}
          >
            <Button
              variant="contained"
              sx={{ width: "100px" }}
              onClick={handleSubmit(onSubmitStoreTemp)}
            >
              Add
            </Button>
          </Grid>
          <Typography variant="h7" fontWeight="bold" sx={{ pt: 2 }}>
            Existing Categories
          </Typography>
        </Grid>
        <Box sx={{ height: "250px" }} overflow>
          <Grid item lg={4}>
            {storeTemps.map((storeTemp) => (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={storeTemp.id} />
              </ListItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default StoreTempModal;
