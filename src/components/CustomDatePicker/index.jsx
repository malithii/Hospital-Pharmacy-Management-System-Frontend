import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const CustomDatePicker = () => {
  // const [value, setValue] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          // value={value}
          minDate={dayjs("2017-01-01")}
          // onChange={(newValue) => {
          //   setValue(newValue);
          // }}
          renderInput={(params) => <TextField size="small" {...params} />}
          size="small"
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;

//  <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Stack spacing={3}>
//         <DesktopDatePicker
//           // value={value}
//           minDate={dayjs("2017-01-01")}
//           // onChange={(newValue) => {
//           //   setValue(newValue);
//           // }}
//           renderInput={(params) => <TextField size="small" {...params} />}
//           size="small"
//         />
//       </Stack>
//     </LocalizationProvider>
//   );
