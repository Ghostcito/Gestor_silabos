import { silabos } from "../database/schema.js";

export const fetcher = async <silabos>(url: string): Promise<silabos> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return response.json() as Promise<silabos>;
};
