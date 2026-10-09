/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface OpeningStockFilterProps {
  data: any[];
  setFilteredData: (filtered: any[]) => void;
  setShowFilter: (visible: boolean) => void;
}

export default function OpeningStockFilterComponent({
  data,
  setFilteredData,
  setShowFilter,
}: OpeningStockFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, Set<any>>
  >({});
  const [isInitialized, setIsInitialized] = useState(false);

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

  const fieldOptions = useMemo(() => {
    const result: Record<string, Set<string>> = {};
    for (const row of data) {
      for (const key of filterableFields) {
        if (!result[key]) result[key] = new Set();
        if (row[key] !== undefined && row[key] !== null) {
          // Format values for better display
          let displayValue = String(row[key]);

          // Special formatting for specific fields
          if (key === "documentDate") {
            displayValue = new Date(row[key]).toLocaleDateString();
          } else if (key === "amount") {
            displayValue = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(Number(row[key]));
          } else if (key === "isActive") {
            displayValue = row[key] ? "Active" : "Inactive";
          } else if (key === "isDraft") {
            displayValue = row[key] ? "Draft" : "Final";
          }

          result[key].add(displayValue);
        }
      }
    }
    return result;
  }, [data, filterableFields]);

  // Initialize filters on data change
  useEffect(() => {
    if (data.length > 0 && !isInitialized) {
      setSelectedFilters(fieldOptions);
      setIsInitialized(true);
    }
  }, [data, fieldOptions, isInitialized]);

  const resetFilters = () => {
    setSelectedFilters({});
    setSearch("");
  };

  const applyFilters = () => {
    let filtered = data;

    for (const key in selectedFilters) {
      const values = selectedFilters[key];
      if (values.size > 0) {
        filtered = filtered.filter((row) => {
          let rowValue = String(row[key]);

          // Apply the same formatting logic as in fieldOptions
          if (key === "documentDate") {
            rowValue = new Date(row[key]).toLocaleDateString();
          } else if (key === "amount") {
            rowValue = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(Number(row[key]));
          } else if (key === "isActive") {
            rowValue = row[key] ? "Active" : "Inactive";
          } else if (key === "isDraft") {
            rowValue = row[key] ? "Draft" : "Final";
          }

          return values.has(rowValue);
        });
      }
    }

    setFilteredData(filtered);
    setShowFilter(false);
  };

  const handleParentCheck = (key: string, checked: boolean | string) => {
    const allValues = Array.from(fieldOptions[key] ?? []);
    setSelectedFilters((prev: Record<string, Set<any>>) => {
      const updated = new Set(checked ? allValues : []);
      return { ...prev, [key]: updated };
    });
  };

  const handleChildCheck = (
    key: string,
    value: string,
    checked: boolean | string
  ) => {
    setSelectedFilters((prev: Record<string, Set<any>>) => {
      const prevSet = new Set(prev[key] ?? []);
      if (checked) prevSet.add(value);
      else prevSet.delete(value);
      return { ...prev, [key]: prevSet };
    });
  };

  // Helper function to get user-friendly field names
  const getFieldDisplayName = (key: string) => {
    const fieldMap: Record<string, string> = {
      documentNumber: "Document Number",
      branch: "Branch",
      documentDate: "Document Date",
      remarks: "Remarks",
      amount: "Amount",
      isActive: "Status",
      isDraft: "Draft Status",
    };

    return (
      fieldMap[key] ||
      key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
    );
  };

  return (
    <div className="w-72 h-[100vh] child flex flex-col border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* Fixed Header */}
      <div className="border-b px-3 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 rounded-full">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search filters..."
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
              setShowFilter(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Title */}
      <div className="px-3 py-2 border-b bg-gray-50 dark:bg-gray-800">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Opening Stock Filters
        </h3>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
        {filterableFields
          .filter((key) => {
            const fieldName = getFieldDisplayName(key);
            const values = Array.from(fieldOptions[key] ?? []);
            return (
              fieldName.toLowerCase().includes(search.toLowerCase()) ||
              key.toLowerCase().includes(search.toLowerCase()) ||
              values.some((val) =>
                val.toLowerCase().includes(search.toLowerCase())
              )
            );
          })
          .map((key) => {
            const values = Array.from(fieldOptions[key] ?? []);
            const selected = Array.from(selectedFilters[key] ?? []);
            const isParentChecked = selected.length > 0;
            const fieldDisplayName = getFieldDisplayName(key);

            return (
              <div
                key={key}
                className="border-b border-gray-100 dark:border-gray-700 pb-3"
              >
                <div className="flex items-center gap-2 font-medium mb-2">
                  <Checkbox
                    checked={isParentChecked}
                    onCheckedChange={(checked) =>
                      handleParentCheck(key, checked)
                    }
                    className="data-[state=checked]:text-white"
                  />
                  <span className="text-primary font-semibold text-sm">
                    {fieldDisplayName}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">
                    ({values.length})
                  </span>
                </div>

                <div className="ml-4 space-y-1 max-h-32 overflow-y-auto">
                  {values
                    .filter((val) =>
                      val.toLowerCase().includes(search.toLowerCase())
                    )
                    .sort() // Sort values alphabetically
                    .map((val) => (
                      <div
                        key={val}
                        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1 text-sm"
                      >
                        <Checkbox
                          checked={selected.includes(val)}
                          onCheckedChange={(checked) =>
                            handleChildCheck(key, val, checked)
                          }
                          className="data-[state=checked]:text-white text-primary"
                        />
                        <span
                          className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1"
                          title={val} // Show full value on hover
                        >
                          {val}
                        </span>
                      </div>
                    ))}

                  {values.filter((val) =>
                    val.toLowerCase().includes(search.toLowerCase())
                  ).length === 0 && (
                    <div className="text-xs text-gray-500 italic px-2 py-1">
                      No matching values
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        {filterableFields.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No filterable fields available</p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      <div className="bg-white dark:bg-gray-900 border-t px-4 py-3 flex-shrink-0">
        <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            className="dark:hover:bg-gray-800 rounded-full flex-1"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button
            variant="default"
            size="sm"
            className="rounded-full flex-1"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </div>

        {/* Show active filter count */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          {Object.keys(selectedFilters).length > 0 && (
            <span>
              {Object.values(selectedFilters).reduce(
                (total, set) => total + set.size,
                0
              )}{" "}
              filters selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
