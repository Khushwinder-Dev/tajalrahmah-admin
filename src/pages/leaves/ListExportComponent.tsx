/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Printer,
  FileSpreadsheet,
  FileText,
  Download,
  MessageCircle,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@mantine/core";
import { cn } from "@/lib/utils";
import { pdf } from "@react-pdf/renderer";
import { toastError } from "@/lib/toast";
import { exportToExcel } from "@/lib/exportToExcel";
import { exportToCSV } from "@/lib/exportToCSV";
import { printHtmlContent } from "@/lib/printHtmlContent";
// import countryDetailPrintContent from "@/lib/printContents/countryDetails";
import dynamicPrintContent from "@/lib/printContents/countryDetails";
import { TablePDF } from "@/components/TablePDF";
import WhatsAppPopup from "@/components/common/WhatsAppPopup";
import { useDisclosure } from "@mantine/hooks";
import EmailPopup from "@/components/common/EmailPopup";
import FloatingCloseButton from "@/components/common/FloatingCloseButton";
import HeaderSearch from "@/components/HeaderSearch";

interface ExportDropdownProps {
  table: any; // Replace with your table type
  allColumnsVisible: boolean;
  setAllColumnsVisible: (visible: boolean) => void;
  columnOrder?: string[];
  setShowExport: (visible: boolean) => void;
  onClose: () => void;
}

export function ExportComponent({
  table,
  allColumnsVisible,
  setAllColumnsVisible,
  columnOrder,
  onClose,
}: ExportDropdownProps) {
  const [whatsappOpened, { open: openWhatsapp, close: closeWhatsapp }] =
    useDisclosure(false);
  const [emailOpened, { open: openEmail, close: closeEmail }] =
    useDisclosure(false);

  const visibleColumns = table
    .getVisibleFlatColumns()
    .filter((col: any) => col.id !== "select" && col.id !== "actions");

  console.log("visibleColumns in export component", visibleColumns);
  const [exportSearch, setExportSearch] = useState("");

  const exportButtons = [
    {
      id: "excel",
      icon: FileSpreadsheet,
      label: "Export to Excel",
      color: "text-green-600",
      onClick: handleExportToExcel,
    },
    {
      id: "pdf",
      icon: FileText,
      label: "Export to PDF",
      color: "text-red-600",
      onClick: handleExport,
    },
    {
      id: "csv",
      icon: Download,
      label: "Export to CSV",
      color: "text-blue-600",
      onClick: handleExportToCSV,
    },
    {
      id: "print",
      icon: Printer,
      label: "Export to Print",
      color: "text-gray-600",
      onClick: handlePrintCountry,
    },
    {
      id: "docs",
      icon: FileText,
      label: "Export to Docs",
      color: "text-purple-600",
      onClick: () => console.log("Export to Docs"),
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "Export to WhatsApp",
      color: "text-green-500",
      onClick: () => openWhatsapp(),
    },
    {
      id: "email",
      icon: Mail,
      label: "Export to Email",
      color: "text-blue-500",
      onClick: () => openEmail(),
    },
  ];

  // [All your existing export functions remain the same - handleExport, handleExportToExcel, etc.]
  // ... (keeping all the export functions as they were)

  // Add this data cleaning function
  function cleanDataForExport(data: any[]) {
    return data.map((row) => {
      const cleanedRow: Record<string, any> = {};

      Object.keys(row).forEach((key) => {
        const value = row[key];

        // Skip JSX/React component strings and invalid values
        if (
          typeof value === "string" &&
          (value.includes("jsxDEV") ||
            value.includes("fileName:") ||
            value.includes("lineNumber:") ||
            value.length > 500) // Skip very long strings that are likely JSX
        ) {
          return; // Skip this property
        }

        // Clean and format valid values
        if (value !== null && value !== undefined) {
          // Handle dates
          if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}/)) {
            cleanedRow[key] = new Date(value).toLocaleDateString();
          }
          // Handle booleans
          else if (typeof value === "boolean") {
            cleanedRow[key] = value ? "Yes" : "No";
          }
          // Handle regular strings and numbers
          else if (typeof value === "string" || typeof value === "number") {
            cleanedRow[key] = value;
          }
        }
      });

      return cleanedRow;
    });
  }

  // Update your export functions to use cleaned data
  async function handleExport() {
    console.log("Export clicked");
    console.log("columnOrder", columnOrder);
    try {
      const rows = table.getRowModel().rows;
      const allVisibleColumns = table
        .getVisibleFlatColumns()
        .filter((col: any) => col.id !== "select" && col.id !== "actions");

      // Reorder columns based on columnOrder state, excluding select and actions
      const orderedColumnIds = columnOrder?.filter(
        (colId) => colId !== "select" && colId !== "actions"
      );

      const visibleColumns = orderedColumnIds
        ?.map((orderedColId) =>
          allVisibleColumns.find((col: any) => col.id === orderedColId)
        )
        .filter((col) => col && col.getIsVisible()); // Only include visible columns

      console.log(
        "Final ordered visible columns:",
        visibleColumns?.map((col) => col?.id)
      );

      // Get clean data from table in the correct column order
      const tableData = rows.map((row: any) => {
        const rowData: Record<string, any> = {};
        visibleColumns?.forEach((col: any) => {
          const value = row.getValue(col.id);
          // Clean the data
          if (
            value !== null &&
            value !== undefined &&
            typeof value !== "object"
          ) {
            rowData[col.id] = value;
          }
        });
        return rowData;
      });

      // Create column headers with proper display names in the correct order
      const columnHeaders = visibleColumns?.map((col: any) => {
        const displayNameMap: Record<string, string> = {
          title: "Name",
          code: "Code",
          callingCode: "ISD",
          currency: "Currency",
          states: "States",
          cities: "Cities",
          createdAt: "Created At",
          updatedAt: "Updated At",
          draftedAt: "Drafted At",
          status: "Status",
        };

        return {
          key: col.id,
          header:
            col.columnDef.meta?.exportLabel || displayNameMap[col.id] || col.id,
          width: col.getSize ? col.getSize() : 150,
        };
      });

      console.log("Column headers for PDF:", columnHeaders);

      const blob = await pdf(
        <TablePDF
          data={tableData}
          columns={columnHeaders}
          title="Countries Data Export"
          subtitle="Country Information Report"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "countries-table-export.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  }

  function handleExportToExcel() {
    try {
      const rows = table.getRowModel().rows;
      const allVisibleColumns = table
        .getVisibleFlatColumns()
        .filter((col: any) => col.id !== "select" && col.id !== "actions");

      // Reorder columns based on columnOrder state
      const orderedColumnIds = columnOrder?.filter(
        (colId) => colId !== "select" && colId !== "actions"
      );

      const visibleColumns = orderedColumnIds
        ?.map((orderedColId) =>
          allVisibleColumns.find((col: any) => col.id === orderedColId)
        )
        .filter((col) => col && col.getIsVisible());

      // Get and clean data
      const rawData = rows.map((row: any) => {
        const rowData: Record<string, any> = {};
        visibleColumns?.forEach((col: any) => {
          rowData[col.id] = row.getValue(col.id);
        });
        return rowData;
      });

      const cleanedData = cleanDataForExport(rawData);

      // Create final export data with proper headers in correct order
      const exportableData = cleanedData.map((row: any) => {
        const finalRow: Record<string, any> = {};
        visibleColumns?.forEach((col: any) => {
          if (row[col.id] !== undefined) {
            const displayNameMap: Record<string, string> = {
              title: "Name",
              code: "Code",
              callingCode: "ISD",
              currency: "Currency",
              states: "States",
              cities: "Cities",
              createdAt: "Created At",
              updatedAt: "Updated At",
              draftedAt: "Drafted At",
              status: "Status",
            };

            const header =
              col.columnDef.meta?.exportLabel ||
              displayNameMap[col.id] ||
              (typeof col.columnDef.header === "string"
                ? col.columnDef.header
                : col.id);
            finalRow[header] = row[col.id];
          }
        });
        return finalRow;
      });

      const columnWidths = Object.keys(exportableData[0] || {}).map(() => 20);

      exportToExcel(
        exportableData,
        "table-data-export",
        "Table Data",
        columnWidths
      );
    } catch (error) {
      console.error("Export to Excel failed", error);
      toastError("Export to Excel failed");
    }
  }

  function handleExportToCSV() {
    try {
      const rows = table.getRowModel().rows;
      const allVisibleColumns = table
        .getVisibleFlatColumns()
        .filter((col: any) => col.id !== "select" && col.id !== "actions");

      // Reorder columns based on columnOrder state
      const orderedColumnIds = columnOrder?.filter(
        (colId) => colId !== "select" && colId !== "actions"
      );

      const visibleColumns = orderedColumnIds
        ?.map((orderedColId) =>
          allVisibleColumns.find((col: any) => col.id === orderedColId)
        )
        .filter((col) => col && col.getIsVisible());

      // Get and clean data
      const rawData = rows.map((row: any) => {
        const rowData: Record<string, any> = {};
        visibleColumns?.forEach((col: any) => {
          rowData[col.id] = row.getValue(col.id);
        });
        return rawData;
      });

      const cleanedData = cleanDataForExport(rawData);

      // Create final export data with proper headers in correct order
      const exportableData = cleanedData.map((row: any) => {
        const finalRow: Record<string, any> = {};
        visibleColumns?.forEach((col: any) => {
          if (row[col.id] !== undefined) {
            const displayNameMap: Record<string, string> = {
              title: "Name",
              code: "Code",
              callingCode: "ISD",
              currency: "Currency",
              states: "States",
              cities: "Cities",
              createdAt: "Created At",
              updatedAt: "Updated At",
              draftedAt: "Drafted At",
              status: "Status",
            };

            const header =
              col.columnDef.meta?.exportLabel ||
              displayNameMap[col.id] ||
              (typeof col.columnDef.header === "string"
                ? col.columnDef.header
                : col.id);
            finalRow[header] = row[col.id];
          }
        });
        return finalRow;
      });

      exportToCSV(exportableData, "table-data-export.csv");
    } catch (error) {
      console.error("Export to CSV failed", error);
      toastError("Export to CSV failed");
    }
  }

  function handlePrintCountry() {
    console.log("handlePrintCountry");
    try {
      const rows = table.getRowModel().rows;
      const allVisibleColumns = table
        .getVisibleFlatColumns()
        .filter((col: any) => col.id !== "select" && col.id !== "actions");

      // Reorder columns based on columnOrder state
      const orderedColumnIds = columnOrder?.filter(
        (colId) => colId !== "select" && colId !== "actions"
      );

      const visibleColumns = orderedColumnIds
        ?.map((orderedColId) =>
          allVisibleColumns.find((col: any) => col.id === orderedColId)
        )
        .filter((col) => col && col.getIsVisible());

      // Get and clean data
      const rawData = rows.map((row: any) => {
        const rowData: Record<string, any> = {};
        visibleColumns?.forEach((col: any) => {
          rowData[col.id] = row.getValue(col.id);
        });
        return rowData;
      });

      const cleanedData = cleanDataForExport(rawData);

      // Create headers for print in correct order
      const headers = visibleColumns
        ?.filter((col: any) =>
          cleanedData.some((row) => row[col.id] !== undefined)
        )
        .map((col: any) => {
          const displayNameMap: Record<string, string> = {
            title: "Name",
            code: "Code",
            callingCode: "ISD",
            currency: "Currency",
            states: "States",
            cities: "Cities",
            createdAt: "Created At",
            updatedAt: "Updated At",
            draftedAt: "Drafted At",
            status: "Status",
          };

          return {
            key: col.id,
            label:
              col.columnDef.meta?.exportLabel ||
              displayNameMap[col.id] ||
              (typeof col.columnDef.header === "string"
                ? col.columnDef.header
                : col.id),
          };
        });

      const html = dynamicPrintContent(cleanedData, headers, "Table Data");
      printHtmlContent(html);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when printing");
    }
  }

  return (
    <>
      <div className="h-full flex flex-col relative overflow-visible">
        {/* Floating X Button */}
        <FloatingCloseButton onClose={onClose} />

        {/* Full Width Search */}
        <div className="pl-2 pr-3 py-4 border-b flex-shrink-0">
          <HeaderSearch
            searchQuery={exportSearch}
            setSearchQuery={setExportSearch}
          />
        </div>

        {/* Full Width Select All */}
        <div className="px-6 py-4 border-b bg-white dark:bg-gray-800 flex-shrink-0">
          <div className="flex items-center justify-between gap-2 font-medium">
            <span className="text-gray-900 dark:text-gray-100">Select All</span>
            <div
              className={cn(
                "w-[36px] h-4 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 cursor-pointer",
                allColumnsVisible
                  ? "bg-sky-400 justify-end"
                  : "bg-sky-200 justify-start"
              )}
              onClick={() => {
                const newValue = !allColumnsVisible;
                table
                  .getAllColumns()
                  .filter(
                    (col: any) =>
                      col.getCanHide() &&
                      col.id !== "select" &&
                      col.id !== "actions"
                  )
                  .forEach((col: any) => col.toggleVisibility(newValue));
                setAllColumnsVisible(newValue);
              }}
            >
              <div className="w-4.5 h-4.5 bg-gray-50 rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.25)] transition-all duration-200" />
            </div>
          </div>
        </div>

        {/* Content Area with Single Scroll */}
        <div className="flex-1 flex overflow-hidden">
          {/* Combined Content Area with Single Scroll */}
          <div className="flex-1 overflow-y-auto grid-scroll">
            <div className="flex">
              {/* Left side - Field names */}
              <div className="flex-1 px-6 py-4 space-y-3">
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
                  .map((column: any) => {
                    const isVisible = column.getIsVisible();

                    return (
                      <div
                        key={column.id}
                        className="flex items-center justify-between gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize flex-1">
                          {column.id}
                        </span>
                        <div
                          className={cn(
                            "w-[36px] h-4 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 cursor-pointer",
                            isVisible
                              ? "bg-sky-400 justify-end"
                              : "bg-sky-200 justify-start"
                          )}
                          onClick={() => {
                            column.toggleVisibility(!isVisible);
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
                        >
                          <div className="w-4.5 h-4.5 bg-gray-50 rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.25)] transition-all duration-200" />
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Right side - Export options (sticky) */}
              <div className="w-20 border-l sticky top-0">
                <div className="flex flex-col items-center space-y-4 p-2 py-6">
                  {exportButtons.map((button) => {
                    const IconComponent = button.icon;
                    return (
                      <Tooltip
                        key={button.id}
                        label={button.label}
                        position="left"
                        withArrow
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className={`w-12 h-12 rounded-full hover:scale-105 transition-transform flex-shrink-0 ${button.color}`}
                          onClick={button.onClick}
                        >
                          <IconComponent className="w-6 h-6" />
                        </Button>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailPopup closeEmail={closeEmail} emailOpened={emailOpened} />
      <WhatsAppPopup
        closeWhatsapp={closeWhatsapp}
        whatsappOpened={whatsappOpened}
      />
    </>
  );
}

export default ExportComponent;
