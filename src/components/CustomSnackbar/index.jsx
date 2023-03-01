import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../reducers/alertSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = () => {
  const { visibility, severity, message } = useSelector(
    (state) => state.alertHPMS
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        dispatch(hide());
      }, 1000);
    }
  }, [open]);

  useEffect(() => {
    if (visibility) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [visibility]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        {...(severity.length > 0 && {
          severity: severity,
        })}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
