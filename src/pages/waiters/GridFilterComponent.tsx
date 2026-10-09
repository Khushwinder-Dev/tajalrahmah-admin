/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface SimpleFilterProps {
  data: any[];
  setFilteredData: (filtered: any[]) => void;
  setShowFilter: (visible: boolean) => void;
}

export default function SimpleFilterComponent({
  data,
  setFilteredData,
  setShowFilter,
}: SimpleFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, Set<any>>
  >({});
  const [isInitialized, setIsInitialized] = useState(false);

  const filterableFields = useMemo(() => {
    if (data.length === 0) return [];
    // Return string fields (exclude id or non-string if needed)
    return Object.keys(data[0]).filter((key) => key !== "id");
  }, [data]);

  const fieldOptions = useMemo(() => {
    const result: Record<string, Set<string>> = {};
    for (const row of data) {
      for (const key of filterableFields) {
        if (!result[key]) result[key] = new Set();
        if (row[key] !== undefined && row[key] !== null) {
          result[key].add(String(row[key]));
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
        filtered = filtered.filter((row) => values.has(String(row[key])));
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
      if (checked) prevSet.add(value);
      else prevSet.delete(value);
      return { ...prev, [key]: prevSet };
    });
  };

  return (
    <div className="w-72 h-[100vh] child flex flex-col border rounded-lg overflow-hidden">
      {/* Fixed Header */}
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
              setShowFilter(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
        {filterableFields
          .filter((key) => {
            const values = Array.from(fieldOptions[key] ?? []);
            return (
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

            return (
              <div key={key}>
                <div className="flex items-center gap-2 font-medium mb-1">
                  <Checkbox
                    checked={isParentChecked}
                    onCheckedChange={(checked) =>
                      handleParentCheck(key, checked)
                    }
                    className="data-[state=checked]:text-white"
                  />
                  <span className="text-primary">{key}</span>
                </div>

                <div className="ml-4 space-y-1">
                  {values
                    .filter((val) =>
                      val.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((val) => (
                      <div
                        key={val}
                        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1"
                      >
                        <Checkbox
                          checked={selected.includes(val)}
                          onCheckedChange={(checked) =>
                            handleChildCheck(key, val, checked)
                          }
                          className="data-[state=checked]:text-white text-primary"
                        />
                        <span className="text-sm text-primary">{val}</span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Fixed Footer */}
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
