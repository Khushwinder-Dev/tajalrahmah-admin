// // exportToPrint.ts
// import React from "react";
// import { createRoot } from "react-dom/client";
// import PrintTemplate from "@/pages/Country/PrintTemplate.jsx";
// import ReactDOM from "react-dom";

// const handlePrint = (countryData: any | undefined): void => {
//     console.log("Printing  country data ", countryData);
//     if (!countryData) return;

//     const printWindow: Window | null = window.open("", "_blank");

//     console.log("Printing  country data ", countryData);

//     if (printWindow) {
//       printWindow.document.open(); // Ensure the document is opened for writing
//       printWindow.document.write(`
//             <html>
//               <head>
//                 <title>Print</title>
//                 <!-- Inject Tailwind CSS from CDN or your build path -->
//                 <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
//                 <style>
//                   /* General Print Styles */
//                   body {
//                     font-family: Arial, sans-serif;
//                     margin: 0;
//                     padding: 0;
//                   }
//                   .print-container {
//                     border: 1px solid #ddd;
//                     padding: 20px;
//                     border-radius: 8px;
//                   }
//                   /* Add any additional custom styles here */
//                 </style>
//               </head>
//               <body>
//                 <div id="print-root"></div> <!-- Placeholder for React component -->
//               </body>
//             </html>
//           `);
//       printWindow.document.close();

//       // Wait for the document to be fully loaded
//       printWindow.onload = (): void => {
//         const printRoot = printWindow.document.getElementById("print-root");
//         if (!printRoot) return;

//         const root = ReactDOM.createRoot(printRoot);

//         // Here you render the full content template
//         root.render(<PrintTemplate countryData={countryData} />);

//         // After rendering, trigger the print and close the window
//         setTimeout((): void => {
//           printWindow.print();
//           printWindow.close();
//         }, 500);
//       };
//     }
//   };

// export default handlePrint;
