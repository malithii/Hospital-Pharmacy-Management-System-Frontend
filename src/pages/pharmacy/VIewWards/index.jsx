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
import wardIcon from "../../../images/hospital-icon.png";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getWardInventory, viewInventory } from "../../../App/inventoryService";
import EnhancedTable from "../../../components/Tables/EnhancedTable";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import DetailedInventory from "../../../components/DetailedInventory";

const ViewWards = () => {
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

  const [detailedInventory, setDetailedInventory] = useState({});
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [rows, setRows] = useState([]);
  const [retrivedRows, setRetrivedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [numOfRows, setNumOfRows] = useState(0);

  const [wardNos, setWardNos] = useState([]);
  useEffect(() => {
    getWardInventory((response) => {
      console.log(response.inventory);
      setWardNos(response.inventory);
    });
  }, []);

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

  const getUserInventory = (_id) => {
    viewInventory({ user: _id }, (response) => {
      console.log("abc");
      console.log(response.inventory);
      setRetrivedRows(
        response.inventory.inventory.map((e) =>
          createData(e, e.drug.drugId, e.quantityInStock, e.reorderLevel)
        )
      );
      setNumOfRows(response.inventory.inventory.length);
    });
  };

  const editClickHandler = (data) => {
    setDetailedInventory(data);
    // console.log(data);
  };

  return (
    <Box>
      <TitleBar
        image={wardIcon}
        title="View"
        description="View Ward Inventories"
      />

      <Grid container>
        <Grid item lg={12}>
          <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3 }}>
            <Grid container gap={2}>
              {wardNos.map((x) => {
                console.log(x.user._id);
                return (
                  <Button
                    variant="contained"
                    onClick={() => {
                      getUserInventory(x.user._id);
                    }}
                  >
                    {x.user.wardNo}
                  </Button>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, mt: 2 }}>
        <Grid container>
          <Grid item lg={3}>
            <Typography
              variant="h8"
              fontWeight={"normal"}
              color="#495579"
              pb={1}
            >
              Search
            </Typography>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
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
          {/* ///////////////////////// */}
          <Grid item lg={7}>
            <Box sx={{ width: "100%", overflow: "hidden" }}>
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
                ]}
              />
            </Box>
          </Grid>
          <Grid item lg={5} sx={{ pl: 2 }}>
            <DetailedInventory detailedInventory={detailedInventory} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewWards;
