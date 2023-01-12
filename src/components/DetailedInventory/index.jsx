import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const DetailedInventory = ({ detailedInventory }) => {
  console.log(detailedInventory);
  useEffect(() => {
    console.log(detailedInventory.obj);
  }, [detailedInventory]);

  return (
    <>
      {detailedInventory.obj ? (
        <Box
          sx={{
            bgcolor: "#CCE8F7",
            borderRadius: 3,
            p: 3,
            height: "400px",
          }}
        >
          <Typography fontWeight={"bold"}>Detailed Inventory</Typography>
          <Grid container>
            <Grid item lg={4}>
              <Typography fontWeight={"normal"}>Drug Id: </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography>{detailedInventory.drugId}</Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography fontWeight={"normal"}>Category: </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography>
                {detailedInventory.obj.drug.category.name}
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography fontWeight={"normal"}>Quantity in stock: </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography>{detailedInventory.quantityInStock}</Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography fontWeight={"normal"}>Reorder Level: </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography>{detailedInventory.reorderLevel}</Typography>
            </Grid>
            <Grid item lg={12}>
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Batch No</TableCell>
                    <TableCell align="center">Exp Date</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailedInventory.obj.batch.map((batch) => (
                    <TableRow
                      key={batch.batchNo}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{batch.batchNo}</TableCell>
                      <TableCell align="center">{batch.expDate}</TableCell>
                      <TableCell align="center">{batch.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>Please select a Drug</Box>
      )}
    </>
  );
};

export default DetailedInventory;
