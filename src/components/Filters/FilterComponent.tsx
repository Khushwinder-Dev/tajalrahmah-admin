/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import FloatingCloseButton from "../common/FloatingCloseButton";
import HeaderSearch from "../HeaderSearch";

interface FilterComponentProps {
  data: any[];
  setFilteredData: (filtered: any[]) => void;
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
}

export default function FilterComponent({
  data,
  setFilteredData,
  onReset,
  onApply,
  onClose,
}: FilterComponentProps) {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, Set<any>>
  >({});
  const [isInitialized, setIsInitialized] = useState(false);

  const filterableFields = useMemo(() => {
    if (data.length === 0) return [];
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

  useEffect(() => {
    if (data.length > 0 && !isInitialized) {
      setSelectedFilters(fieldOptions);
      setIsInitialized(true);
    }
  }, [data, fieldOptions, isInitialized]);

  const handleReset = () => {
    setSelectedFilters({});
    setSearch("");
    onReset();
  };

  const handleApply = () => {
    let filtered = data;
    for (const key in selectedFilters) {
      const values = selectedFilters[key];
      if (values.size > 0) {
        filtered = filtered.filter((row) => values.has(String(row[key])));
      }
    }
    setFilteredData(filtered);
    onApply();
  };

  const handleParentCheck = (key: string, checked: boolean) => {
    const allValues = Array.from(fieldOptions[key] ?? []);
    setSelectedFilters((prev: Record<string, Set<any>>) => {
      const updated = new Set(checked ? allValues : []);
      return { ...prev, [key]: updated };
    });
  };

  const handleChildCheck = (key: string, value: string, checked: boolean) => {
    setSelectedFilters((prev: Record<string, Set<any>>) => {
      const prevSet = new Set(prev[key] ?? []);
      if (checked) prevSet.add(value);
      else prevSet.delete(value);
      return { ...prev, [key]: prevSet };
    });
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Floating Close Button */}
      <FloatingCloseButton onClose={onClose} />

      <div className="pl-2 pr-3 py-4 border-b flex-shrink-0">
        <HeaderSearch searchQuery={search} setSearchQuery={setSearch} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 grid-scroll">
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
                {/* Parent Field - Checkbox Left, Text Right */}
                <div className="flex items-center gap-2 font-medium mb-2 pb-2 border-b">
                  {/* checkbox */}
                  <Checkbox
                    id={key}
                    checked={isParentChecked}
                    onCheckedChange={(checked) => {
                      if (checked === true) {
                        handleParentCheck(key, true);
                      } else {
                        handleParentCheck(key, false);
                      }
                    }}
                    className="bg-white! border! border-sky-400! data-[state=checked]:bg-white! data-[state=checked]:border-sky-400! data-[state=checked]:text-black!"
                  />
                  <Label
                    htmlFor={key}
                    className="text-gray-900 dark:text-gray-100 capitalize"
                  >
                    {key}
                  </Label>
                </div>

                {/* Child Values - Checkbox Left, Text Right */}
                <div className="ml-6 space-y-1">
                  {values
                    .filter((val) =>
                      val.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((val) => {
                      const isChildChecked = selected.includes(val);

                      return (
                        <div
                          key={val}
                          className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1"
                        >
                          {/* Checkbox */}
                          <Checkbox
                            id={val}
                            checked={isChildChecked}
                            onCheckedChange={(checked) => {
                              if (checked === true) {
                                handleChildCheck(key, val, true);
                              } else {
                                handleChildCheck(key, val, false);
                              }
                            }}
                            className="bg-white! border! border-sky-400! data-[state=checked]:bg-white! data-[state=checked]:border-sky-400! data-[state=checked]:text-black!"
                          />
                          <Label
                            htmlFor={val}
                            className="text-sm text-gray-700 dark:text-gray-300 flex-1"
                          >
                            {val}
                          </Label>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer with Apply and Reset buttons */}
      <div className="bg-white dark:bg-gray-900 border-t px-3 py-2 flex-shrink-0 rounded-b-full">
        <div className="flex justify-between">
          <Button
            variant="default"
            size="sm"
            className="min-w-[60px] cursor-pointer border border-primary hover:text-white hover:bg-primary bg-white text-primary!"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="default"
            size="sm"
            className="min-w-[60px] cursor-pointer border border-primary hover:text-white hover:bg-primary bg-white text-primary!"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
