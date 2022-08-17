import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCellBodyFormatted from "./TableCellBodyFormatted";

export type Column = {
  label: string;
  key: string;
  type?: "currency" | "date";
};

export type DataRecord = {
  [key: string]: any;
};

export interface ITableGridProps {
  data: DataRecord[];
  columns: Column[];
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6973ac",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));

const TableGrid = ({ data, columns }: ITableGridProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell component="th" key={column.label}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => (
            <StyledTableRow key={record.id}>
              {columns.map((column) => (
                <TableCellBodyFormatted key={column.key} record={record} column={column} />
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableGrid;
