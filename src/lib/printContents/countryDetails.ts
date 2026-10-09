/* eslint-disable @typescript-eslint/no-explicit-any */
export default function dynamicPrintContent(
  data: any[],
  headers?: Array<{ key: string; label: string }>,
  title: string = "Data Details"
) {
  // If no headers provided, extract from first data item
  const printHeaders =
    headers ||
    Object.keys(data[0] || {}).map((key) => ({
      key,
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()), // Convert camelCase to Title Case
    }));

  const dataCards = data
    .map((rowData, index) => {
      // Generate rows based on available headers and data
      const rows = printHeaders
        .filter(
          (header) =>
            rowData[header.key] !== undefined && rowData[header.key] !== null
        )
        .map((header) => {
          let value = rowData[header.key];

          // Format different data types
          if (typeof value === "boolean") {
            value = value ? "Yes" : "No";
          } else if (value instanceof Date) {
            value = value.toLocaleDateString();
          } else if (
            typeof value === "string" &&
            value.includes("T") &&
            !isNaN(Date.parse(value))
          ) {
            // Check if it's a date string
            value = new Date(value).toLocaleDateString();
          }

          return `
            <div class="font-semibold text-gray-800">${header.label}:</div>
            <div class="text-gray-600">${value ?? "-"}</div>
          `;
        })
        .join("");

      return `
        <div class="print-container max-w-2xl mx-auto p-6 rounded-lg border border-gray-300 shadow-sm space-y-6 bg-white mb-8">
          <h2 class="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
            ${title} ${data.length > 1 ? `#${index + 1}` : ""}
          </h2>
          <div class="grid grid-cols-2 gap-y-4 gap-x-2 text-sm border-b pb-2">
            ${rows}
          </div>
        </div>
      `;
    })
    .join("");

  return `<div class="print-wrapper">${dataCards}</div>`;
}
