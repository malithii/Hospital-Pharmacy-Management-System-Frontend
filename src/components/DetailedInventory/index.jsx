import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";

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
            height: "420px",
            overflow: "auto",
            scrollbarWidth: "thin",
          }}
        >
          <Typography fontWeight={"bold"} variant="h6" mb={2}>
            Detailed Inventory
          </Typography>
          <Grid container>
            <Grid item lg={4}>
              <Typography fontWeight={"bold"}>Drug Id: </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography>{detailedInventory.drugId}</Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography fontWeight={"bold"}>Category: </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography>
                {detailedInventory.obj.drug.category.name}
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography fontWeight={"bold"}>Quantity in stock: </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography>{detailedInventory.quantityInStock}</Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography fontWeight={"bold"}>Reorder Level: </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography>{detailedInventory.reorderLevel}</Typography>
            </Grid>
            <Grid item lg={12} mt={2}>
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#a9cce3 ",
                      // borderBottom: "2px solid black",
                      "& th": {
                        color: "black",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <TableCell align="center" size="small">
                      Batch No
                    </TableCell>
                    <TableCell align="center" size="small">
                      Exp Date
                    </TableCell>
                    <TableCell align="center" size="small">
                      Quantity
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailedInventory.obj.batch.map((batch) => (
                    <TableRow
                      key={batch.batchNo}
                      sx={{
                        backgroundColor: "#eaf2f8",
                        borderBottom: "1.5px solid black",
                        "& th": {
                          color: "rgba(96, 96, 96)",
                        },
                      }}
                    >
                      <TableCell align="center" size="small">
                        {batch.batchNo}
                      </TableCell>
                      <TableCell align="center" size="small">
                        {batch.expDate}
                      </TableCell>
                      <TableCell align="center" size="small">
                        {batch.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            bgcolor: "#CCE8F7",
            borderRadius: 3,
            p: 3,
            height: "420px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontWeight={"bold"}>
            Please Select a drug to view detailed inventory
          </Typography>

          <WysiwygIcon />
        </Box>
      )}
    </>
  );
};

export default DetailedInventory;
