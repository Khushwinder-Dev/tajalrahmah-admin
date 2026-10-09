/* eslint-disable @typescript-eslint/no-explicit-any */
import Papa from "papaparse";

export const exportToCSV = (data: any[], filename: string = "export.csv") => {
  const csv = Papa.unparse(data); // Convert JSON array to CSV string

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
