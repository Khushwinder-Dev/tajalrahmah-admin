/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";

export const exportToExcel = (
  data: any[],
  fileName: string = "export",
  sheetName: string = "Sheet1",
  columnWidths?: number[] // ⬅️ Optional column widths in characters
) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Apply column widths
  if (columnWidths && columnWidths.length > 0) {
    worksheet["!cols"] = columnWidths.map((w) => ({ wch: w }));
  } else {
    // Default: auto-adjust based on header length
    const headers = Object.keys(data[0] || {});
    worksheet["!cols"] = headers.map((h) => ({
      wch: Math.max(h.length + 5, 15),
    }));
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
