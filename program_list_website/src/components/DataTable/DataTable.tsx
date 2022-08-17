import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TableGrid, { ITableGridProps } from "./TableGrid";

interface IDataTableProps extends ITableGridProps {
  loading: boolean;
  error: any;
}

const DataTable = ({ data, loading, error, columns }: IDataTableProps) => {
  return (
    <Box sx={{ display: "flex", position: "relative", minHeight: 100, mt: 3 }}>
      {data.length !== 0 ? (
        <TableGrid data={data} columns={columns} />
      ) : loading ? null : (
        <Box>There are no records found.</Box>
      )}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
      {error ? <Box sx={{ display: "flex" }}>{error}</Box> : null}
    </Box>
  );
};

export default DataTable;
