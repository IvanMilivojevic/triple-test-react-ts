import { useState, useEffect, ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { getData, getQuery } from "../utils/fetch";

export const useDataQuery = <T, U>(resource: string, initialFilters: U) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [filters, setFilters] = useState({ ...initialFilters });

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      const query = getQuery<U>(filters);

      async function loadData(query: string) {
        setLoading(true);
        setError(null);
        try {
          const data = await getData<T>(resource, query);
          setData(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
      loadData(query);
    }, 200);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [filters, resource]);

  const updateFilters = (name: string, value: string) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [name]: value,
      };
    });
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    updateFilters(event.target.name, event.target.value);
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    updateFilters(event.target.name, event.target.value);
  };

  return {
    data,
    loading,
    error,
    filters,
    handleChangeInput,
    handleChangeSelect,
  };
};
