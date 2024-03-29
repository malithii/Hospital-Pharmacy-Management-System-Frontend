import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";

// const minDate = dayjs("2020-01-01T00:00:00.000");
// const maxDate = dayjs("2034-01-01T00:00:00.000");

export default function CustomCalendar() {
  const [date, setDate] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
    </LocalizationProvider>
  );
}
