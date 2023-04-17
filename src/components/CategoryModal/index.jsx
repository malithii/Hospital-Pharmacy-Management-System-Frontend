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
import EditIcon from "@mui/icons-material/Edit";
import { newCategory, updateCategory } from "../../App/drugsService";
import { useForm } from "react-hook-form";
import { useState } from "react";

const CategoryModal = ({
  openCategory,
  setOpenCategory,
  setRefreshCategories,
  categories,
}) => {
  const handleOpenCategory = () => setOpenCategory(true);
  const handleCloseCategory = () => setOpenCategory(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  const clearCategory = () => {
    resetField("name");
  };

  const onSubmitCategory = (data) => {
    console.log(data);
    newCategory(data, (response) => {
      console.log(response);
      clearCategory();
      setRefreshCategories((prev) => !prev);
    });
  };

  const categoryUpdate = (data) => {
    console.log(data);
    updateCategory(data, (response) => {
      console.log(response);
      setRefreshCategories((prev) => !prev);
    });
  };

  const [editing, setEditing] = useState("");

  return (
    <Modal
      open={openCategory}
      onClose={handleCloseCategory}
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
          Drug Categories
        </Typography>
        <Grid container>
          <Grid item lg={3} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h7" fontWeight="normal">
              New Category
            </Typography>
          </Grid>
          <Grid item lg={7} sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              sx={{ mt: "0.5rem", width: "98%" }}
              placeholder="Category Name"
              size="small"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Category is required",
                },
              })}
              {...(errors.name && {
                error: true,
                helperText: errors.name.message,
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
              onClick={handleSubmit(onSubmitCategory)}
            >
              Add
            </Button>
          </Grid>
          <Typography variant="h7" fontWeight="bold" sx={{ pt: 2 }}>
            Existing Categories
          </Typography>
        </Grid>
        <Box sx={{ height: "250px" }} overflow="auto" scrollbarWidth="thin">
          {categories.map((category) =>
            category._id === editing._id ? (
              <Box
                display={"flex"}
                alignItems={"center"}
                mt={1}
                justifyContent="space-between"
              >
                <TextField
                  size="small"
                  value={editing.name}
                  onChange={(e) => {
                    setEditing({ ...editing, name: e.target.value });
                  }}
                />
                <Button
                  onClick={() => {
                    console.log(editing);
                    categoryUpdate(editing);
                    setEditing("");
                  }}
                >
                  Update
                </Button>
              </Box>
            ) : (
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      setEditing(category);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={category.name} />
              </ListItem>
            )
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
