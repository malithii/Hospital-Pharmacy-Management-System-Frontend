import {
  Autocomplete,
  Button,
  Grid,
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
import { viewInventory } from "../../../App/inventoryService";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";

const PharmacyInventory = () => {
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

  const requestBody = {
    user: "63b564bcfc1d5e7994bea009",
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
          createData(e, e.drug.drugId, e.quantityInStock, e.reorderLevel)
        )
      );
      setNumOfRows(response.inventory.inventory.length);
    });
  }, [shouldRefresh]);

  useEffect(() => {
    // console.log(rows);
  }, [rows]);

  /////////////////////////////////////////////////////////////////////////////////
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
  ];
  return (
    <Box>
      <TitleBar
        image={iconInventory}
        title="Pharmacy Inventory"
        description="View Pharmacy Inventory"
      />
      {loading && <LoadingAnimation />}
      <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
        <Grid container>
          <Grid item lg={3}>
            <Typography
              variant="h8"
              fontWeight={"normal"}
              color="#495579"
              pb={1}
            >
              Ward Inventory
            </Typography>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField {...params} label="Drug Name" size="small" />
              )}
            />
          </Grid>
          <Grid item lg={3}>
            <Box p={3}>
              <Button
                variant="contained"
                sx={{ minWidth: "200px" }}
                size="large"
              >
                <SearchIcon />
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button variant="contained" sx={{ minWidth: "200px" }} size="large">
              Detailed View
            </Button>
          </Grid>
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
                actionButtons={[{ btnName: "Edit" }]}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PharmacyInventory;
