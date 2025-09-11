import useSWR from "swr";
import type { Silabo } from "../models/silabo.js";
import { fetcher } from "../lib/fetcher.js";

export const useSilabos = () => {
  const { data, error, isLoading, mutate } = useSWR<Silabo[]>(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  return {
    silabos: data,
    isLoading,
    isError: error,
    mutate,
  };
};
