import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DataTable from "../../components/DataTable/DataTable";
import { Column } from "../../components/DataTable/TableGrid";
import Filters from "../../components/Filters/Filters";
import { useDataQuery } from "../../hooks/DataQuery.hook";

// For every resource we want to show (on this or other pages)
// we can define structure for single record of resource and its filters
type Program = {
  id: number;
  name: string;
  return_percentage: string;
  threshold: number;
  currency: string;
  status: string;
  pause_at: null | string;
};

type ProgramFilters = {
  name: string;
  status: string;
};

const programFilters: ProgramFilters = { name: "", status: "" };

const Programs = () => {
  // Custom hook that will return fetched data as well as status of fetching, filters, handlers
  // We can reuse it on other resource pages where we also can use same approach
  // Resource type and filter are passed as generics, while arguments are resource name and filters
  const { data, loading, error, filters, handleChangeInput, handleChangeSelect } = useDataQuery<
    Program,
    ProgramFilters
  >("programs", programFilters);

  // Mapping of columns which is used to create dynamic table. Placed in state, because later on
  // we can potentially manage it, and with some table column filter adapt which column is shown
  const [columns] = useState<Column[]>([
    { label: "Name", key: "name" },
    { label: "Cashback", key: "return_percentage" },
    { label: "Threshold", key: "threshold", type: "currency" },
    { label: "Status", key: "status" },
    { label: "Pause Date", key: "pause_at", type: "date" },
  ]);

  return (
    <div>
      <Filters>
        <TextField
          id="name"
          label="Search by Name"
          name="name"
          value={filters.name}
          onChange={handleChangeInput}
          sx={{ mr: 3, minWidth: 250 }}
        />
        {/*
          Decided to go with select field as filter for Status of programs
          Simply because in future maybe we will have several columns which also have Active value
          Also it can be tough to navigate if there are too many status options later on
        */}
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            value={filters.status}
            label="Status"
            onChange={handleChangeSelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="PAUSED">PAUSED</MenuItem>
            <MenuItem value="PAUSE_SCHEDULED">PAUSE_SCHEDULED</MenuItem>
          </Select>
        </FormControl>
      </Filters>
      <DataTable data={data} loading={loading} error={error} columns={columns} />
    </div>
  );
};

export default Programs;
