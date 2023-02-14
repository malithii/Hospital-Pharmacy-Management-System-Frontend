import {
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
    <Box sx={{ bgcolor: "white", p: 3, borderRadius: 3, height: "380px" }}>
      <Typography fontWeight="bold" sx={{ pb: 1, pl: 2.5 }}>
        Expiring List
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Drug Name</TableCell>
              <TableCell align="center">Expire Date</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expireDates.map((item) => {
              return (
                <TableRow>
                  <TableCell align="center">{item.drug}</TableCell>
                  <TableCell align="center">{item.expireDate}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    <ErrorIcon sx={{ color: "#c0392b" }} />
                  </TableCell>
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
