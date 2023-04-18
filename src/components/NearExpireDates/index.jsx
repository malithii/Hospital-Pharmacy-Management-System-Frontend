import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNearestExpireDates } from "../../App/inventoryService";
import ErrorIcon from "@mui/icons-material/Error";

const NearExpireDates = () => {
  const user = useSelector((state) => state.loginHPMS._id);
  const [expireDates, setExpireDates] = useState([]);

  useEffect(() => {
    getNearestExpireDates({ user: user }, (response) => {
      console.log(response);
      setExpireDates(response.inventory);
    });
  }, []);
  return (
    <Box
      sx={{ bgcolor: "white", p: 1, borderRadius: 3, height: "380px", pt: 3 }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight="bold" sx={{ pb: 1, pl: 2.5 }}>
          Expiring List
        </Typography>
        <Button variant="outlined" sx={{ border: 0, fontSize: 12 }}>
          View All
        </Button>
      </Box>

      <TableContainer sx={{ maxHeight: 300, scrollbarWidth: "thin" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#707b7c" }}
              >
                <Chip label="Drug" />
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#707b7c" }}
              >
                <Chip label="Exp Date" />
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#707b7c" }}
              >
                <Chip label="Quantity" />
              </TableCell>
              {/* <TableCell align="center"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {expireDates.map((item) => {
              return (
                <TableRow>
                  <TableCell align="center">
                    <Chip label={item.drug} />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={item.expireDate.slice(0, 10)}
                      color="error"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  {/* <TableCell align="center">
                    <ErrorIcon sx={{ color: "#c0392b" }} />
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NearExpireDates;
