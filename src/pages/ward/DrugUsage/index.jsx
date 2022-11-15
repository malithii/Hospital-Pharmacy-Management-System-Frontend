import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

const DrugUsage = () => {
  const [date, setDate] = useState("");

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };
  return (
    <Box>
      <Typography>Enter Date:</Typography>
    </Box>
  );
};

export default DrugUsage;
