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
import { useState } from "react";

const PharmacyInventory = () => {
  const columns = [
    { id: "drugId", label: "Drug ID", minWidth: 170 },
    { id: "drugName", label: "Drug Name", minWidth: 100 },
    {
      id: "category",
      label: "Category",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "storeTemp",
      label: "Storage Temperature",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "level",
      label: "Level",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "batchNo",
      label: "Batch No",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "exp",
      label: "Expire Date",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  function createData(
    drugId,
    drugName,
    category,
    storeTemp,
    level,
    batchNo,
    exp,
    quantity
  ) {
    return {
      drugId,
      drugName,
      category,
      storeTemp,
      level,
      batchNo,
      exp,
      quantity,
    };
  }

  const rows = [
    createData(
      "WWT342",
      "Amoxicillin",
      "General",
      "1",
      "2",
      "RTY456",
      "2024-03-12",
      "45"
    ),
    createData(
      "GHT3245",
      "Paracetamol",
      "General",
      "2",
      "4",
      "RTY456",
      "2024-05-27",
      "140"
    ),
    createData(
      "ERY457",
      "Augmentin",
      "General",
      "1",
      "3",
      "24567",
      "2022-08-27",
      "52"
    ),
    createData(
      "TJY2345",
      "Nervjin",
      "General",
      "1",
      "3",
      "TH456",
      "2026-01-27",
      "52"
    ),
    createData(
      "GNM567",
      "Ventolin",
      "General",
      "2",
      "3",
      "4577889",
      "2024-05-27",
      "109"
    ),
    createData(
      "TQW3455",
      "Gablin",
      "General",
      "1",
      "3",
      "67889",
      "2023-0-27",
      "45"
    ),
    createData(
      "NMQ457",
      "Celeko",
      "General",
      "1",
      "2",
      "56789",
      "2023-05-01",
      "96"
    ),
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
          {/* ///////////////////////// */}
          <Grid item lg={12}>
            <Box sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PharmacyInventory;