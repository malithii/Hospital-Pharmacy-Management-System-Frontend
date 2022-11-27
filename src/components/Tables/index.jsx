import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Paracetamol11", 159, 6.0, 24, 4.0),
  createData("Ibuprofen1", 237, 9.0, 37, 4.3),
  createData(" Antihistamine1", 262, 16.0, 24, 6.0),
  createData("Cyclizine1", 305, 3.7, 67, 4.3),
  createData("Metoclopramide1", 356, 16.0, 49, 3.9),
  createData("Paracetamol1", 159, 6.0, 24, 4.0),
  createData("Ibuprofen1", 237, 9.0, 37, 4.3),
  createData(" Antihistamine", 262, 16.0, 24, 6.0),
  createData("Cyclizine", 305, 3.7, 67, 4.3),
  createData("Metoclopramide", 356, 16.0, 49, 3.9),
  createData("Paracetamol", 159, 6.0, 24, 4.0),
  createData("Ibuprofen", 237, 9.0, 37, 4.3),
  createData(" Antihistamine1111", 262, 16.0, 24, 6.0),
  createData("Cyclizine1111", 305, 3.7, 67, 4.3),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Medicine</TableCell>
            <TableCell align="right">Drug ID</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Expire Date</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
