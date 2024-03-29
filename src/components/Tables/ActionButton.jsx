import { Margin } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function ActionButton({ text, actionClickHandler }) {
  return (
    <Button
      style={{
        cursor: "pointer",
        minWidth: 0,
      }}
      onClick={() => actionClickHandler()}
    >
      {text}
    </Button>
  );
}

export default ActionButton;
