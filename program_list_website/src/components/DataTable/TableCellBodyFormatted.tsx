import React from "react";
import dayjs from "dayjs";
import { Column, DataRecord, StyledTableCell } from "./TableGrid";

interface ITableCellBodyFormattedProps {
  record: DataRecord;
  column: Column;
}

const TableCellBodyFormatted = ({ record, column }: ITableCellBodyFormattedProps) => {
  let cellValue = record[column.key] ?? "-";

  if (column.type === "currency") {
    cellValue = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
      cellValue
    );
  } else if (column.type === "date" && cellValue !== "-") {
    cellValue = dayjs(cellValue).format("YYYY/MM/DD");
  }

  return <StyledTableCell>{cellValue}</StyledTableCell>;
};

export default TableCellBodyFormatted;
