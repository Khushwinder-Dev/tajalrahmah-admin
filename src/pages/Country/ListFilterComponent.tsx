/* eslint-disable @typescript-eslint/no-explicit-any */
import FloatingCloseButton from "@/components/common/FloatingCloseButton";
import HeaderSearch from "@/components/HeaderSearch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface FilterComponentProps {
  table: any; // TanStack table instance
  onClose: () => void;
  columnOrder?: string[];
}

export default function FilterComponent({
  table,
  onClose,
}: FilterComponentProps) {
  const [search, setSearch] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Filter columns with faceted values and are filterable
  const filterableColumns = table
    .getAllColumns()
    .filter(
      (col: any) =>
        col.getCanFilter() &&
        col.getFacetedUniqueValues &&
        col.id !== "select" &&
        col.id !== "actions"
    );

  useEffect(() => {
    if (filterableColumns && filterableColumns.length > 0 && !isInitialized) {
      filterableColumns.forEach((col: any) => {
        const allValues = [...col.getFacetedUniqueValues().keys()];
        if (allValues.length > 0) {
          col.setFilterValue(allValues);
        }
      });
      setIsInitialized(true);
    }
  }, [filterableColumns, isInitialized]);

  // Reset all filters
  const resetFilters = () => {
    filterableColumns.forEach((col: any) => {
      col.setFilterValue(undefined);
    });
    setSearch("");
  };

  return (
    <div className="w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700  h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out overflow-visible relative flex flex-col">
      {/* Floating X Button */}
      <FloatingCloseButton onClose={onClose} />

      {/* Header - Enhanced Search */}
      {/* <div className="bg-white dark:bg-gray-900 border-b px-3 py-3 sticky top-0 z-10 flex-shrink-0">
        <div className="relative mt-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            placeholder="Search..."
            className="pl-10 pr-10 h-10 w-full rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary cursor-pointer hover:text-gray-700 transition-colors" />
        </div>
      </div> */}
      <div className="pl-2 pr-3 py-4 border-b flex-shrink-0">
        <HeaderSearch searchQuery={search} setSearchQuery={setSearch} />
      </div>

      {/* Body - Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 grid-scroll [&::-webkit-scrollbar-track]:!m-0">
        {filterableColumns
          .filter((col: any) => {
            console.log("Column before getFacetedUniqueValues", col);
            const values = [...col.getFacetedUniqueValues().keys()].map((v) =>
              String(v)
            );
            return (
              col.id.toLowerCase().includes(search.toLowerCase()) ||
              values.some((val) =>
                val.toLowerCase().includes(search.toLowerCase())
              )
            );
          })
          .map((col: any) => {
            const selected = Array.isArray(col.getFilterValue())
              ? col.getFilterValue()
              : [];

            const options = [...col.getFacetedUniqueValues().entries()].filter(
              ([key]) =>
                key !== undefined &&
                String(key).toLowerCase().includes(search.toLowerCase())
            );

            const isParentChecked = selected && selected.length > 0;

            return (
              <div key={col.id}>
                {/* Column header as parent - Checkbox Left, Text Right */}
                <div className="flex items-center gap-2 font-medium mb-2 pb-2 border-b">
                  {/* checkbox */}
                  <Checkbox
                    id={col.id}
                    checked={isParentChecked}
                    onCheckedChange={(checked) => {
                      if (checked === true) {
                        col.setFilterValue(options.map(([val]) => val));
                      } else {
                        col.setFilterValue([]);
                      }
                    }}
                    className="bg-white! border! border-sky-400! data-[state=checked]:bg-white! data-[state=checked]:border-sky-400! data-[state=checked]:text-black!"
                  />
                  <Label
                    htmlFor={col.id}
                    className="text-gray-900 dark:text-gray-100 capitalize"
                  >
                    {col.id}
                  </Label>
                </div>

                {/* Children - Checkbox Left, Text Right */}
                <div className="ml-6 space-y-1">
                  {options.map(([value, count]) => {
                    const isSelected = selected.includes(value);

                    return (
                      <div
                        key={String(value)}
                        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1"
                      >
                        <Checkbox
                          id={String(value)}
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            const newValues = new Set(selected);
                            if (checked === true) {
                              newValues.add(value);
                            } else {
                              newValues.delete(value);
                            }
                            col.setFilterValue([...newValues]);
                          }}
                          aria-label={`Toggle ${String(value)}`}
                          className="size-4 bg-white! border! border-sky-400! data-[state=checked]:bg-white! data-[state=checked]:border-sky-400! data-[state=checked]:text-black!"
                        />
                        <Label
                          htmlFor={String(value)}
                          className="text-sm text-gray-700 dark:text-gray-300 flex-1"
                        >
                          {String(value)} ({count})
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-900 border-t px-3 py-2 justify-between flex-shrink-0">
        <div className="flex justify-between">
          <Button
            variant="default"
            size="sm"
            onClick={resetFilters}
            className="min-w-[60px] cursor-pointer border border-primary hover:text-white hover:bg-primary bg-white text-primary!"
          >
            Reset
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={resetFilters}
            className="min-w-[60px] cursor-pointer border border-primary bg-white text-primary! hover:bg-primary"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
