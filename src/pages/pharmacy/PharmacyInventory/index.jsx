import {
  Autocomplete,
  Button,
  Chip,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import iconInventory from "../../../images/icon-inventory-96.png";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import {
  getInventoryByDrug,
  searchInventoryByDrug,
  viewInventory,
} from "../../../App/inventoryService";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";
import DetailedInventory from "../../../components/DetailedInventory";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import ReorderLevelModal from "../../../components/ReorderLevelModal";
import { useForm } from "react-hook-form";
import { getDrugById } from "../../../App/drugsService";
import RemoveBatchModal from "../../../components/RemoveBatchModal";

const PharmacyInventory = () => {
  const [detailedInventory, setDetailedInventory] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [updatingData, setUpdatingData] = useState({});
  const [reorderLevel, setReorderLevel] = useState({
    reorderLevel: "",
  });

  const [refresh, setRefresh] = useState(true);
  const handleReorderLevelChange = (data) => {
    setUpdatingData(data);
    console.log("handleReorderLevelChange");
    console.log(data);
    handleOpen();
  };

  const headCells = [
    {
      id: "drugId",
      numeric: false,
      disablePadding: true,
      label: "Drug ID",
      align: "center",
    },
    {
      id: "quantityInStock",
      numeric: false,
      disablePadding: true,
      label: "Quantity",
      align: "center",
    },
    {
      id: "reorderLevel",
      numeric: false,
      disablePadding: true,
      label: "Reorder Level",
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

  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [rows, setRows] = useState([]);
  const [retrivedRows, setRetrivedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [numOfRows, setNumOfRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [drugs, setDrugs] = useState([]);

  const editClickHandler = (data) => {
    setDetailedInventory(data);
    // console.log(data);
  };

  const user = useSelector((state) => state.loginHPMS._id);
  const userType = useSelector((state) => state.loginHPMS.type);

  const requestBody = {
    user: user,
  };
  useEffect(() => {
    setRows(
      retrivedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, retrivedRows]);

  function createData(obj, drugId, quantityInStock, reorderLevel) {
    return {
      obj,
      drugId,
      quantityInStock,
      reorderLevel,
    };
  }

  useEffect(() => {
    setLoading(true);
    viewInventory(requestBody, (response) => {
      setLoading(false);
      console.log(response.inventory.inventory);
      setRetrivedRows(
        response.inventory.inventory.map((e) =>
          createData(
            e,
            e.drug.drugId,
            e.quantityInStock < e.reorderLevel ? (
              <Chip
                label={e.quantityInStock}
                color="error"
                variant="outlined"
              />
            ) : (
              e.quantityInStock
            ),
            e.reorderLevel
          )
        )
      );
      setNumOfRows(response.inventory.inventory.length);
    });
  }, [refresh]);

  useEffect(() => {
    // console.log(rows);
  }, [rows]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  useEffect(() => {
    getDrugById((response) => {
      console.log(response.drug);
      setDrugs(response.drug);
    });
  }, []);

  const searchInventory = (data) => {
    searchInventoryByDrug({ drug: data.drug._id, user: user }, (response) => {
      setRetrivedRows(
        response.inventory.map((e) =>
          createData(e, e.drug.drugId, e.quantityInStock, e.reorderLevel)
        )
      );
      setNumOfRows(response.inventory.length);
    });
  };

  const removeBatchfunc = () => {
    handleOpen2();
  };
  return (
    <Box>
      <TitleBar
        image={iconInventory}
        title="Inventory"
        description="View Inventory"
      />
      {loading && <LoadingAnimation />}
      <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid item lg={3}>
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
          <Grid item lg={3} sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              sx={{ minWidth: "100px", mt: 0.5, height: "80%" }}
              size="small"
              onClick={handleSubmit(searchInventory)}
            >
              <SearchIcon />
            </Button>
          </Grid>
          {userType === "PHARMACIST" ? (
            <Grid item lg={6} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                sx={{ minWidth: "100px", mt: 0.5, height: "80%" }}
                size="small"
                onClick={removeBatchfunc}
              >
                Remove Batch
              </Button>
            </Grid>
          ) : null}

          <Grid
            item
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          ></Grid>
          {/* ///////////////////////// */}
          <Grid item lg={7}>
            <Box sx={{ width: "100%" }}>
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
                  { btnName: <WysiwygIcon />, actionFunc: editClickHandler },
                  {
                    btnName: <EditIcon />,
                    actionFunc: handleReorderLevelChange,
                  },
                ]}
              />
            </Box>
          </Grid>
          <Grid
            item
            lg={5}
            sx={{
              pl: 2,
            }}
          >
            <DetailedInventory
              detailedInventory={detailedInventory}
              refresh={refresh}
            />
          </Grid>
        </Grid>
      </Box>
      <ReorderLevelModal
        open={open}
        setOpen={setOpen}
        reorderLevel={reorderLevel}
        updatingData={updatingData}
        setRefresh={setRefresh}
      />
      <RemoveBatchModal
        open={open2}
        setOpen={setOpen2}
        setRefresh={setRefresh}
      />
    </Box>
  );
};

export default PharmacyInventory;
