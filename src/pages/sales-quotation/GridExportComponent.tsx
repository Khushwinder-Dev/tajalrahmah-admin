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

interface SimpleFilterProps {
  data: any[];
  setFilteredData: (filtered: any[]) => void;
  setIsExportOpen: (visible: boolean) => void;
}

const mockData = [
  {
    code: "A001",
    Area: "Downtown District",
    Country: "United States",
    State: "California",
    City: "Los Angeles",
    isActive: true,
    created_at: "2024-01-15",
  },
  {
    code: "A002",
    Area: "Business Center",
    Country: "Canada",
    State: "Ontario",
    City: "Toronto",
    isActive: true,
    created_at: "2024-01-16",
  },
];

export default function SimpleFilterComponent({
  data,
  setFilteredData,
  setIsExportOpen,
}: SimpleFilterProps) {
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

  const handleCSV = () => exportToCSV(mockData, "areas.csv");
  const handleExcel = () => exportToExcel(mockData, "areas.xlsx");
  const handleExport = async () => {
    console.log("Export clicked");
    try {
      // For now, just export as CSV since we don't have area-specific PDF component
      exportToCSV(mockData, "areas-summary.csv");
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating export");
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
              placeholder="Search..."
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
                  className="text-sm font-medium"
                >
                  {key}
                </label>
              </div>
            ))}
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
            title="Print"
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
