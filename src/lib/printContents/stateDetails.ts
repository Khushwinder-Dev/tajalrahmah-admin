import type { StateData } from "@/types/states.types";

const stateDetailPrintContent = (stateData: StateData[]) => {
  // const getStatusBadge = (status: number) => {
  //   return status === 1
  //     ? '<span class="badge badge-success">Yes</span>'
  //     : '<span class="badge badge-danger">No</span>';
  // };

  // const formatDate = (date: string | null) => {
  //   if (!date) return "--/--/----";
  //   const d = new Date(date);
  //   const day = d.getDate();
  //   const month = d.toLocaleString("default", { month: "short" });
  //   const year = d.getFullYear();
  //   return `${day} ${month} ${year}`;
  // };

  const tableRows = stateData
    .map(
      (state) => `
      <tr>
        <td>${state.code}</td>
        <td>${state.name}</td>
        <td>${state.name_in_bangla}</td>
        <td>${state.name_in_arabic}</td>
        <td>${state.country_name}</td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>State Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f5f5f5;
          }
          .badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
          .badge-success {
            background-color: #4caf50;
            color: white;
          }
          .badge-danger {
            background-color: #f44336;
            color: white;
          }
          h1 {
            color: #2196f3;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <h1>State Details</h1>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Name in Bangla</th>
              <th>Name in Arabic</th>
              <th>Country</th>
              <th>Default</th>
              <th>Active</th>
              <th>Draft</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Drafted</th>
              <th>Deleted</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
    </html>
  `;
};

export default stateDetailPrintContent;
