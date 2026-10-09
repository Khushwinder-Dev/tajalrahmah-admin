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
import { pdf } from "@react-pdf/renderer";
import PDF from "@/components/common/pdf";
import { toastError } from "@/lib/toast";
import { Tooltip } from "@mantine/core";

interface DeliveryOrderLogisticExportProps {
  data: any[];
  setFilteredData: (filtered: any[]) => void;
  setIsExportOpen: (visible: boolean) => void;
}

const mockDeliveryOrderData = [
  {
    sn: "DOL001",
    country: "Bangladesh",
    company: "Al-Rashid Trading Company",
    piNo: "PI-2024-001",
    invoiceNo: "INV-2024-001",
    supplierName: "Global Supplies Ltd",
    status: "Active",
    dateLoginId: "2024-01-15",
  },
  {
    sn: "DOL002",
    country: "UAE",
    company: "Al-Zahrani Enterprises",
    piNo: "PI-2024-002",
    invoiceNo: "INV-2024-002",
    supplierName: "Emirates Trading Co",
    status: "Delivered",
    dateLoginId: "2024-01-16",
  },
  {
    sn: "DOL003",
    country: "Kuwait",
    company: "Al-Otaibi Industries",
    piNo: "PI-2024-003",
    invoiceNo: "INV-2024-003",
    supplierName: "Kuwait Supply Chain",
    status: "In Transit",
    dateLoginId: "2024-01-17",
  },
];

export default function DeliveryOrderLogisticGridExportComponent({
  data,
  setFilteredData,
  setIsExportOpen,
}: DeliveryOrderLogisticExportProps) {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );

  const filterableFields = useMemo(() => {
    if (data.length === 0) return [];
    // Return string fields (exclude id or non-string if needed)
    return Object.keys(data[0]).filter((key) => key !== "id");
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

  const handleCSV = () =>
    exportToCSV(mockDeliveryOrderData, "delivery-order-logistics.csv");
  const handleExcel = () =>
    exportToExcel(mockDeliveryOrderData, "delivery-order-logistics.xlsx");

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Delivery Order Logistics Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; text-align: center; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; font-weight: bold; }
              tr:nth-child(even) { background-color: #f9f9f9; }
              .status-active { color: #22c55e; }
              .status-delivered { color: #3b82f6; }
              .status-transit { color: #f59e0b; }
              .status-pending { color: #ef4444; }
            </style>
          </head>
          <body>
            <h1>Delivery Order Logistics Report</h1>
            <table>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Country</th>
                  <th>Company</th>
                  <th>P.I. No</th>
                  <th>Invoice No</th>
                  <th>Supplier Name</th>
                  <th>Status</th>
                  <th>Date Login ID</th>
                </tr>
              </thead>
              <tbody>
                ${mockDeliveryOrderData
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.sn}</td>
                    <td>${item.country}</td>
                    <td>${item.company}</td>
                    <td>${item.piNo}</td>
                    <td>${item.invoiceNo}</td>
                    <td>${item.supplierName}</td>
                    <td class="status-${item.status
                      .toLowerCase()
                      .replace(" ", "-")}">${item.status}</td>
                    <td>${item.dateLoginId}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      const pdfData = mockDeliveryOrderData.map((item) => ({
        sn: item.sn,
        country: item.country,
        company: item.company,
        pi_no: item.piNo,
        invoice_no: item.invoiceNo,
        supplier_name: item.supplierName,
        status: item.status,
        date_login_id: item.dateLoginId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        drafted_at: null,
        is_active: item.status === "Active",
        is_draft: false,
        is_deleted: false,
        description: `Delivery order logistics for ${item.company}`,
        is_default: false,
        is_drafted: false,
      }));

      const blob = await pdf(
        <PDF
          data={pdfData}
          title="Delivery Order Logistics Details"
          subtitle="Delivery Order Logistics Information Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "delivery-order-logistics-summary.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
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
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Select Fields to Export:
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
                  className="text-sm font-medium capitalize cursor-pointer"
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
              </div>
            ))}
        </div>

        {/* Right Section - Export Options */}
        <div className="w-20 border-l bg-gray-50 dark:bg-gray-800 flex flex-col items-center py-3 gap-2 flex-shrink-0">
          <Tooltip
            label="Print Report"
            position="left"
            arrowSize={8}
            withArrow
            styles={{
              tooltip: {
                fontSize: "14px",
                padding: "8px 12px",
                backgroundColor: "#374151",
                color: "white",
                borderRadius: "6px",
                fontWeight: "500",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              },
              arrow: {
                backgroundColor: "#374151",
              },
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-gray-100 border-2 border-primary hover:scale-110 transition-all"
              title="Print Report"
              onClick={handlePrint}
            >
              <Printer className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
            </Button>
          </Tooltip>

          <Tooltip
            label="Export to Excel"
            position="left"
            arrowSize={8}
            withArrow
            styles={{
              tooltip: {
                fontSize: "14px",
                padding: "8px 12px",
                backgroundColor: "#374151",
                color: "white",
                borderRadius: "6px",
                fontWeight: "500",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              },
              arrow: {
                backgroundColor: "#374151",
              },
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-primary hover:scale-110 transition-all"
              title="Export to Excel"
              onClick={handleExcel}
            >
              <FileSpreadsheet className="h-5 w-5 text-primary" />
            </Button>
          </Tooltip>

          <Tooltip
            label="Export to PDF"
            position="left"
            arrowSize={8}
            withArrow
            styles={{
              tooltip: {
                fontSize: "14px",
                padding: "8px 12px",
                backgroundColor: "#374151",
                color: "white",
                borderRadius: "6px",
                fontWeight: "500",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              },
              arrow: {
                backgroundColor: "#374151",
              },
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-primary hover:scale-110 transition-all"
              title="Export to PDF"
              onClick={handleExportPDF}
            >
              <FileText className="h-5 w-5 text-primary" />
            </Button>
          </Tooltip>

          <Tooltip
            label="Export to CSV"
            position="left"
            arrowSize={8}
            withArrow
            styles={{
              tooltip: {
                fontSize: "14px",
                padding: "8px 12px",
                backgroundColor: "#374151",
                color: "white",
                borderRadius: "6px",
                fontWeight: "500",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              },
              arrow: {
                backgroundColor: "#374151",
              },
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-primary hover:scale-110 transition-all"
              title="Export to CSV"
              onClick={handleCSV}
            >
              <Download className="h-5 w-5 text-primary" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Bottom Bar - Full Width */}
      <div className="border-t px-3 py-2 flex-shrink-0 mb-2">
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button
            variant="default"
            size="sm"
            className="rounded-full"
            onClick={applyFilters}
          >
            Apply & Export
          </Button>
        </div>
      </div>
    </div>
  );
}
