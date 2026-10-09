/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { exportToCSV } from "@/lib/exportToCSV";
import { exportToExcel } from "@/lib/exportToExcel";
import { toastError } from "@/lib/toast";

interface OpeningStockExportProps {
  data: any[];
  setFilteredData: (filtered: any[]) => void;
  setIsExportOpen: (visible: boolean) => void;
}

const mockStockTransferData = [
  {
    id: "1",
    documentNumber: "ST001",
    sourceBranch: "Main Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-15",
    remarks: "Initial inventory setup",
    amount: 15000.5,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    documentNumber: "OS002",
    sourceBranch: "North Branch",
    destinationBranch: "South Branch",
    documentDate: "2024-01-16",
    remarks: "Quarterly stock adjustment",
    amount: 8750.25,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
  },
  {
    id: "3",
    documentNumber: "OS003",
    sourceBranch: "South Branch",
    destinationBranch: "East Branch",
    documentDate: "2024-01-17",
    remarks: "New location inventory",
    amount: 12300.75,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
  },
  {
    id: "4",
    documentNumber: "OS004",
    sourceBranch: "East Branch",
    destinationBranch: "West Branch",
    documentDate: "2024-01-18",
    remarks: "Stock reconciliation",
    amount: 9850.0,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
  },
];

export default function StockTransferExportComponent({
  data,
  setFilteredData,
  setIsExportOpen,
}: OpeningStockExportProps) {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );

  const filterableFields = useMemo(() => {
    if (data.length === 0) return [];
    // Return relevant fields for opening stock, excluding internal fields
    return Object.keys(data[0]).filter(
      (key) =>
        !["id", "createdAt", "updatedAt", "deletedAt", "draftedAt"].includes(
          key
        )
    );
  }, [data]);

  const resetFilters = () => {
    setSelectedFilters(new Set());
    setSearch("");
  };

  const applyFilters = () => {
    if (selectedFilters.size === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((row) => {
        return Array.from(selectedFilters).some((key) => {
          const value = row[key];
          return value !== undefined && value !== null;
        });
      });
      setFilteredData(filtered);
    }
    setIsExportOpen(false);
  };

  const handleCheckboxChange = (key: string, checked: boolean | string) => {
    setSelectedFilters((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(key);
      } else {
        newSet.delete(key);
      }
      return newSet;
    });
  };

  // Format data for export with proper labels and formatting
  const formatDataForExport = (rawData: any[]) => {
    return rawData.map((item) => ({
      "Document Number": item.documentNumber,
      Branch: item.branch,
      "Document Date": new Date(item.documentDate).toLocaleDateString(),
      Remarks: item.remarks,
      Amount: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(item.amount),
      Status: item.isActive ? "Active" : "Inactive",
      Draft: item.isDraft ? "Yes" : "No",
      "Created Date": new Date(item.createdAt).toLocaleDateString(),
    }));
  };

  const handleCSV = () => {
    const formattedData = formatDataForExport(mockStockTransferData);
    exportToCSV(formattedData, "stock-transfer.csv");
  };

  const handleExcel = () => {
    const formattedData = formatDataForExport(mockStockTransferData);
    exportToExcel(formattedData, "stock-transfer.xlsx");
  };

  const handleExport = async () => {
    console.log("Export clicked");
    try {
      // For now, just export as CSV since we don't have opening stock-specific PDF component
      const formattedData = formatDataForExport(mockStockTransferData);
      exportToCSV(formattedData, "stock-transfer-summary.csv");
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating export");
    }
  };

  const handlePrint = () => {
    // Create a printable version of the opening stock data
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const formattedData = formatDataForExport(mockStockTransferData);
      const printContent = `
        <html>
          <head>
            <title>Stock Transfer Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; text-align: center; margin-bottom: 30px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
              th { background-color: #f2f2f2; font-weight: bold; }
              tr:nth-child(even) { background-color: #f9f9f9; }
              .total { margin-top: 20px; font-weight: bold; font-size: 16px; }
            </style>
          </head>
          <body>
            <h1>Stock Transfer Report</h1>
            <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Total Records:</strong> ${formattedData.length}</p>
            <table>
              <thead>
                <tr>
                  ${Object.keys(formattedData[0] || {})
                    .map((key) => `<th>${key}</th>`)
                    .join("")}
                </tr>
              </thead>
              <tbody>
                ${formattedData
                  .map(
                    (row) =>
                      `<tr>${Object.values(row)
                        .map((value) => `<td>${value}</td>`)
                        .join("")}</tr>`
                  )
                  .join("")}
              </tbody>
            </table>
            <div class="total">
              <p>Total Amount: ${formattedData
                .reduce((sum, item) => {
                  const amount = parseFloat(item.Amount.replace(/[$,]/g, ""));
                  return sum + (isNaN(amount) ? 0 : amount);
                }, 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}</p>
            </div>
          </body>
        </html>
      `;
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="w-76 h-[100vh] flex flex-col border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* Top Bar - Full Width */}
      <div className="border-b px-3 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 rounded-full">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search fields..."
              className="pl-8 h-8 w-full rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setSearch("");
              setIsExportOpen(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Middle Section - 2 Sections */}
      <div className="flex-1 flex overflow-y-auto">
        {/* Left Section - Checkboxes */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Export Fields
          </div>
          {filterableFields
            .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
            .map((key) => (
              <div
                key={key}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1"
              >
                <Checkbox
                  id={`filter-${key}`}
                  checked={selectedFilters.has(key)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(key, checked)
                  }
                  className="data-[state=checked]:text-white"
                />
                <label
                  htmlFor={`filter-${key}`}
                  className="text-sm font-medium capitalize cursor-pointer flex-1"
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
              </div>
            ))}

          {filterableFields.length === 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No fields available
            </div>
          )}
        </div>

        {/* Right Section - Export Options */}
        <div className="w-20 border-l bg-gray-50 dark:bg-gray-800 flex flex-col items-center py-3 gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
            onClick={handleCSV}
            title="Export as CSV"
          >
            <FileText className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={handleExcel}
            title="Export as Excel"
          >
            <FileSpreadsheet className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleExport}
            title="Export as PDF"
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={handlePrint}
            title="Print Report"
          >
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Bar - Apply/Reset Buttons */}
      <div className="bg-white dark:bg-gray-900 border-t px-4 py-2">
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="dark:hover:bg-gray-800 rounded-full"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={applyFilters}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
