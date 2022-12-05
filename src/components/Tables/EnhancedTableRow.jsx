import { TableCell, TableRow } from "@mui/material";
import React from "react";
import ActionButton from "./ActionButton";

function EnhancedTableRow({
  index,
  row = {},
  data = [],
  actionButtons = [],
  align = "center",
}) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
      {data.map((item, id) => {
        return (
          <TableCell
            component="th"
            key={id}
            scope="row"
            align={align}
            style={{ fontWeight: "normal", fontSize: "19px", color: "#495579" }}
          >
            {item}
          </TableCell>
        );
      })}
      {/* render buttons if defined */}
      {actionButtons.length > 0 && (
        <TableCell component="th" scope="row" align="center">
          {actionButtons.map((action, id) => {
            return (
              <ActionButton
                key={id}
                actionClickHandler={() =>
                  action.actionFunc(data[0], data[2], row)
                }
                text={action.btnName}
              ></ActionButton>
            );
          })}
        </TableCell>
      )}
    </TableRow>
  );
}

export default EnhancedTableRow;
