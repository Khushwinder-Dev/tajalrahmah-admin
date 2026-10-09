/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import { Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface DeliveryOrderLogisticFilterProps {
  data: any[];
  setFilteredData: (filtered: any[]) => void;
  setShowFilter: (visible: boolean) => void;
}

export default function DeliveryOrderLogisticGridFilterComponent({
  data,
  setFilteredData,
  setShowFilter,
}: DeliveryOrderLogisticFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, Set<any>>
  >({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Define the field display names for better UX
  const fieldDisplayNames: Record<string, string> = {
    sn: "Serial Number",
    country: "Country",
    company: "Company",
    piNo: "P.I. Number",
    invoiceNo: "Invoice Number",
    supplierName: "Supplier Name",
    status: "Status",
    dateLoginId: "Date Login ID",
    isActive: "Active Status",
    isDeleted: "Deleted Status",
    createdAt: "Created Date",
    updatedAt: "Updated Date",
  };

  const filterableFields = useMemo(() => {
    if (data.length === 0) return [];
    // Return fields relevant to delivery order logistics (exclude id and system fields)
    return Object.keys(data[0]).filter(
      (key) => !["id", "createdAt", "updatedAt", "isDeleted"].includes(key)
    );
  }, [data]);

  const fieldOptions = useMemo(() => {
    const result: Record<string, Set<string>> = {};
    for (const row of data) {
      for (const key of filterableFields) {
        if (!result[key]) result[key] = new Set();
        if (row[key] !== undefined && row[key] !== null) {
          // Handle different data types
          if (key === "dateLoginId" && row[key] instanceof Date) {
            result[key].add(row[key].toLocaleDateString());
          } else if (typeof row[key] === "boolean") {
            result[key].add(row[key] ? "Yes" : "No");
          } else {
            result[key].add(String(row[key]));
          }
        }
      }
    }
    return result;
  }, [data, filterableFields]);

  // Initialize filters on data change - select all by default
  useEffect(() => {
    if (data.length > 0 && !isInitialized) {
      const initialFilters: Record<string, Set<string>> = {};
      for (const key of filterableFields) {
        initialFilters[key] = new Set(fieldOptions[key]);
      }
      setSelectedFilters(initialFilters);
      setIsInitialized(true);
    }
  }, [data, fieldOptions, filterableFields, isInitialized]);

  const resetFilters = () => {
    // Reset to all selected (default state)
    const resetFilters: Record<string, Set<string>> = {};
    for (const key of filterableFields) {
      resetFilters[key] = new Set(fieldOptions[key]);
    }
    setSelectedFilters(resetFilters);
    setSearch("");
  };

  const clearAllFilters = () => {
    // Clear all selections
    setSelectedFilters({});
    setSearch("");
  };

  const applyFilters = () => {
    let filtered = data;

    for (const key in selectedFilters) {
      const values = selectedFilters[key];
      if (values && values.size > 0) {
        filtered = filtered.filter((row) => {
          let valueToCheck = row[key];

          // Handle different data types for comparison
          if (key === "dateLoginId" && valueToCheck instanceof Date) {
            valueToCheck = valueToCheck.toLocaleDateString();
          } else if (typeof valueToCheck === "boolean") {
            valueToCheck = valueToCheck ? "Yes" : "No";
          } else {
            valueToCheck = String(valueToCheck);
          }

          return values.has(valueToCheck);
        });
      }
    }

    setFilteredData(filtered);
    setShowFilter(false);
  };

  const handleParentCheck = (key: string, checked: boolean | string) => {
    const allValues = Array.from(fieldOptions[key] ?? []);
    setSelectedFilters((prev) => {
      const updated = new Set(checked ? allValues : []);
      return { ...prev, [key]: updated };
    });
  };

  const handleChildCheck = (
    key: string,
    value: string,
    checked: boolean | string
  ) => {
    setSelectedFilters((prev) => {
      const prevSet = new Set(prev[key] ?? []);
      if (checked) {
        prevSet.add(value);
      } else {
        prevSet.delete(value);
      }
      return { ...prev, [key]: prevSet };
    });
  };

  const getSelectedCount = () => {
    return Object.values(selectedFilters).reduce(
      (total, set) => total + set.size,
      0
    );
  };

  const getTotalCount = () => {
    return Object.values(fieldOptions).reduce(
      (total, set) => total + set.size,
      0
    );
  };

  return (
    <div className="w-72 h-[100vh] child flex flex-col border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* Fixed Header */}
      <div className="border-b px-3 py-2 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Filter className="h-4 w-4" />
            <span>Filter Delivery Orders</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 ml-auto"
            onClick={() => setShowFilter(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative rounded-full">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search filters..."
            className="pl-8 h-8 w-full rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Summary */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          {getSelectedCount()} of {getTotalCount()} options selected
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
        {filterableFields
          .filter((key) => {
            const displayName = fieldDisplayNames[key] || key;
            const values = Array.from(fieldOptions[key] ?? []);
            return (
              displayName.toLowerCase().includes(search.toLowerCase()) ||
              key.toLowerCase().includes(search.toLowerCase()) ||
              values.some((val) =>
                val.toLowerCase().includes(search.toLowerCase())
              )
            );
          })
          .map((key) => {
            const values = Array.from(fieldOptions[key] ?? []).sort();
            const selected = Array.from(selectedFilters[key] ?? []);
            const isParentChecked = selected.length > 0;
            const isParentIndeterminate =
              selected.length > 0 && selected.length < values.length;
            const displayName = fieldDisplayNames[key] || key;

            return (
              <div
                key={key}
                className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center gap-2 font-medium mb-2">
                  <Checkbox
                    checked={isParentChecked && !isParentIndeterminate}
                    // @ts-expect-error - Mantine supports indeterminate
                    indeterminate={isParentIndeterminate}
                    onCheckedChange={(checked) =>
                      handleParentCheck(key, checked)
                    }
                    className="data-[state=checked]:text-white"
                  />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {displayName}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                    ({selected.length}/{values.length})
                  </span>
                </div>

                <div className="ml-4 space-y-1 max-h-32 overflow-y-auto">
                  {values
                    .filter((val) =>
                      val.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((val) => (
                      <div
                        key={val}
                        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1 transition-colors"
                      >
                        <Checkbox
                          checked={selected.includes(val)}
                          onCheckedChange={(checked) =>
                            handleChildCheck(key, val, checked)
                          }
                          className="data-[state=checked]:text-white"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                          {val}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Fixed Footer */}
      <div className="bg-white dark:bg-gray-900 border-t px-3 py-3 flex-shrink-0">
        <div className="flex gap-2 mb-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-full text-xs"
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-full text-xs"
            onClick={resetFilters}
          >
            Select All
          </Button>
        </div>
        <Button
          variant="default"
          size="sm"
          className="w-full rounded-full"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
