/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Search,
  X,
  Printer,
  FileSpreadsheet,
  FileText,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import PDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import { toastError } from "@/lib/toast";
import { exportToExcel } from "@/lib/exportToExcel";
import { exportToCSV } from "@/lib/exportToCSV";
import { printHtmlContent } from "@/lib/printHtmlContent";
import countryDetailPrintContent from "@/lib/printContents/countryDetails";

interface ExportDropdownProps {
  table: any; // Replace with your table type
  allColumnsVisible: boolean;
  setAllColumnsVisible: (visible: boolean) => void;
  setShowExport: (visible: boolean) => void;
}

export function ExportComponent({
  table,
  allColumnsVisible,
  setAllColumnsVisible,
  setShowExport,
}: ExportDropdownProps) {
  const [exportSearch, setExportSearch] = useState("");

  const handleApply = () => {
    // Add your apply logic here
    console.log("Apply clicked");
    setShowExport(false);
  };

  const handleExport = async () => {
    console.log("Export clicked");
    try {
      const blob = await pdf(
        <PDF
          data={[
            {
              code: "BD",
              name: "Bangladesh",
              name_in_bangla: "বাংলাদেশ",
              name_in_arabic: "البنغلاديش",
              created_at: "2025-06-26T12:00:00.000Z",
              updated_at: "2025-06-26T12:00:00.000Z",
              deleted_at: null,
              drafted_at: null,
              is_active: true,
              is_draft: false,
              is_deleted: false,
              flag_url: "https://flagcdn.com/16x12/bd.png",
              country_code: "BD",
              country_name: "Bangladesh",
              country_flag: "🇧🇩",
              description: "The central business district of the city",
              is_default: true,
              is_drafted: false,
            },
          ]}
          title="Country Details"
          subtitle="Country Information Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "countries-summary.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleExportToExcel = () => {
    try {
      const rows = table.getRowModel().rows; // Get all currently visible (filtered + sorted) rows
      const visibleColumns = table
        .getVisibleFlatColumns()
        .filter((col: any) => col.id !== "select" && col.id !== "actions");

      const exportableData = rows.map((row: any) => {
        const rowData: Record<string, any> = {};
        visibleColumns.forEach((col: any) => {
          const header = col.columnDef.meta?.exportLabel || col.id;

          console.log("col", col.columnDef.meta?.exportLabel);
          console.log("header", header);

          rowData[header] = row.getValue(col.id);
        });
        return rowData;
      });

      console.log("exportableData", exportableData);

      exportToExcel(
        exportableData,
        "countries-data",
        "Countries",
        [25, 15, 20, 12, 18, 18]
      );
    } catch (error) {
      console.error("Export to Excel failed", error);
      toastError("Export to Excel failed");
    }
  };

  const handleExportToCSV = () => {
    try {
      const rows = table.getRowModel().rows;
      const visibleColumns = table
        .getVisibleFlatColumns()
        .filter((col: any) => col.id !== "select" && col.id !== "actions");

      const exportableData = rows.map((row: any) => {
        const rowData: Record<string, any> = {};
        visibleColumns.forEach((col: any) => {
          const header =
            typeof col.columnDef.header === "string"
              ? col.columnDef.header
              : col.columnDef.meta?.exportLabel || col.id;

          console.log("header", header);

          rowData[header] = row.getValue(col.id);
        });
        return rowData;
      });

      console.log("exportableData", exportableData);

      exportToCSV(exportableData, "countries-data.csv");
    } catch (error) {
      console.error("Export to CSV failed", error);
      toastError("Export to CSV failed");
    }
  };

  const handlePrintCountry = () => {
    console.log("handlePrintCountry");
    try {
      const rows = table.getRowModel().rows;
      const visibleColumns = table
        .getVisibleFlatColumns()
        .filter((col: any) => col.id !== "select" && col.id !== "actions");

      const exportableData = rows.map((row: any) => {
        const rowData: Record<string, any> = {};
        visibleColumns.forEach((col: any) => {
          console.log("col", col);
          const header = col.columnDef.meta?.exportLabel || col.id;

          console.log("header", header);

          rowData[header] = row.getValue(col.id);
        });
        return rowData;
      });

      console.log("exportableData", exportableData);
      const html = countryDetailPrintContent(exportableData);

      printHtmlContent(html);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when printing");
    }
  };

  // const handlePrint = (countryData: any): void => {
  //   if (!countryData) return;

  //   const printWindow: Window | null = window.open("", "_blank");

  //   if (printWindow) {
  //     printWindow.document.open(); // Ensure the document is opened for writing
  //     printWindow.document.write(`
  //           <html>
  //             <head>
  //               <title>Print</title>
  //               <!-- Inject Tailwind CSS from CDN or your build path -->
  //               <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  //               <style>
  //                 /* General Print Styles */
  //                 body {
  //                   font-family: Arial, sans-serif;
  //                   margin: 0;
  //                   padding: 0;
  //                 }
  //                 .print-container {
  //                   border: 1px solid #ddd;
  //                   padding: 20px;
  //                   border-radius: 8px;
  //                 }
  //                 /* Add any additional custom styles here */
  //               </style>
  //             </head>
  //             <body>
  //               <div id="print-root"></div> <!-- Placeholder for React component -->
  //             </body>
  //           </html>
  //         `);
  //     printWindow.document.close();

  //     // Wait for the document to be fully loaded
  //     printWindow.onload = (): void => {
  //       const printRoot = printWindow.document.getElementById("print-root");
  //       if (!printRoot) return;

  //       const root = ReactDOM.createRoot(printRoot);

  //       // Here you render the full content template
  //       root.render(<PrintTemplate countryData={countryData} />);

  //       // After rendering, trigger the print and close the window
  //       setTimeout((): void => {
  //         printWindow.print();
  //         printWindow.close();
  //       }, 500);
  //     };
  //   }
  // };

  return (
    <div className="w-72 h-full flex flex-col border rounded-lg overflow-hidden">
      {/* Top Section - Fixed Header */}
      <div className="bg-white dark:bg-gray-900 border-b px-3 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          {/* Select All Checkbox */}
          <Checkbox
            checked={allColumnsVisible}
            onCheckedChange={(checked) => {
              table
                .getAllColumns()
                .filter(
                  (col: any) =>
                    col.getCanHide() &&
                    col.id !== "select" &&
                    col.id !== "actions"
                )
                .forEach((col: any) => col.toggleVisibility(!!checked));
              setAllColumnsVisible(!!checked);
            }}
            className="data-[state=checked]:bg-primary data-[state=checked]:text-white"
          />

          {/* Search Input */}
          <div className="relative flex-1 rounded-full">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="pl-8 h-8 w-full rounded-full"
              value={exportSearch}
              onChange={(e) => setExportSearch(e.target.value)}
            />
          </div>

          {/* Clear Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setExportSearch("");
              setShowExport(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content - Split into left checkboxes and right export options */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left Side - Checkboxes */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto smooth-scroll px-1 py-1">
            {table
              .getAllColumns()
              .filter(
                (column: any) =>
                  column.getCanHide() &&
                  column.id !== "select" &&
                  column.id !== "actions" &&
                  (!exportSearch ||
                    column.id
                      .toLowerCase()
                      .includes(exportSearch.toLowerCase()))
              )
              .map((column: any) => (
                <div
                  key={column.id}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <Checkbox
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      column.toggleVisibility(!!value);
                      const visibleColumns = table
                        .getAllColumns()
                        .filter(
                          (col: any) =>
                            col.getCanHide() &&
                            col.id !== "select" &&
                            col.id !== "actions"
                        )
                        .filter((col: any) => col.getIsVisible());
                      setAllColumnsVisible(
                        visibleColumns.length ===
                          table
                            .getAllColumns()
                            .filter(
                              (col: any) =>
                                col.getCanHide() &&
                                col.id !== "select" &&
                                col.id !== "actions"
                            ).length
                      );
                    }}
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-white"
                  />
                  <span className="text-sm">{column.id}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Right Side - Export Options with Icons in Rounded Circles */}
        <div className="w-20 border-l bg-gray-50 dark:bg-gray-800 flex flex-col items-center py-3 gap-3 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-blue-200"
            title="Print"
            onClick={handlePrintCountry}
          >
            <Printer className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-blue-200"
            title="Export to Excel"
            onClick={() => handleExportToExcel()}
          >
            <FileSpreadsheet className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-blue-200"
            title="Export to PDF"
            onClick={() => handleExport()}
          >
            <FileText className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-blue-200"
            title="Export to CSV"
            onClick={() => handleExportToCSV()}
          >
            <Download className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>

      {/* Bottom Section - Fixed Footer (Full Width) */}
      <div className="bg-white dark:bg-gray-900 border-t px-3 py-2 flex-shrink-0 w-full">
        <div className="flex justify-between">
          {/* Reset Button */}
          <Button
            variant="outline"
            size="sm"
            className="rounded-full dark:hover:bg-gray-800"
            onClick={() => {
              table
                .getAllColumns()
                .filter(
                  (col: any) =>
                    col.getCanHide() &&
                    col.id !== "select" &&
                    col.id !== "actions"
                )
                .forEach((col: any) => col.toggleVisibility(true));
              setAllColumnsVisible(true);
              setExportSearch("");
            }}
          >
            Reset
          </Button>

          {/* Apply Button */}
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExportComponent;
