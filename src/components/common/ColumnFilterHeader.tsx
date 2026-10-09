/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input } from "@mantine/core";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowUp, ArrowDown, Filter, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Checkbox } from "../ui/checkbox";

export default function ColumnFilterHeader({
  column,
  title,
  options,
}: {
  column: any;
  title: string;
  options: any[];
}) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const currentFilter = column.getFilterValue();
  const sortDirection = column.getIsSorted();

  useEffect(() => {
    if (currentFilter && Array.isArray(currentFilter)) {
      setSelectedOptions(currentFilter);
    }
  }, [currentFilter]);

  const handleOptionToggle = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);
    column.setFilterValue(
      newSelectedOptions.length > 0 ? newSelectedOptions : undefined
    );
  };

  const clearFilter = () => {
    setSelectedOptions([]);
    column.setFilterValue(undefined);
  };

  const toggleSorting = () => {
    if (sortDirection === "asc") {
      column.toggleSorting(true);
    } else {
      column.toggleSorting(false);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toString().toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="flex items-center gap-1 group">
      <span>{title}</span>

      <button
        onClick={toggleSorting}
        className={`p-1 rounded transition-opacity ${
          sortDirection
            ? "opacity-100 bg-blue-100 text-blue-600"
            : "opacity-0 group-hover:opacity-100 text-gray-500 hover:bg-gray-100"
        }`}
      >
        {sortDirection === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : sortDirection === "desc" ? (
          <ArrowDown className="h-4 w-4" />
        ) : (
          <ArrowUp className="h-4 w-4" />
        )}
      </button>

      <div
        className={`${
          isFilterOpen || selectedOptions.length > 0
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        } transition-opacity`}
      >
        <DropdownMenu onOpenChange={setIsFilterOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 p-0 ${
                selectedOptions.length > 0 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Filter className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <div className="p-2">
              <Input
                placeholder={`Search...`}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="h-8"
              />
            </div>

            <DropdownMenuSeparator />

            {/* Select All */}
            <DropdownMenuCheckboxItem
              checked={
                selectedOptions.length === filteredOptions.length &&
                filteredOptions.length > 0
              }
              onCheckedChange={() => {
                if (selectedOptions.length === filteredOptions.length) {
                  setSelectedOptions([]);
                  column.setFilterValue(undefined);
                } else {
                  setSelectedOptions(filteredOptions.map((o) => o.toString()));
                  column.setFilterValue(
                    filteredOptions.map((o) => o.toString())
                  );
                }
              }}
            >
              Select All
            </DropdownMenuCheckboxItem>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.map((option) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={option}
                    checked={selectedOptions.includes(option.toString())}
                    onCheckedChange={() =>
                      handleOptionToggle(option.toString())
                    }
                  >
                    {option}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </div>

            {/* Clear Filter */}
            {selectedOptions.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearFilter}>
                  <X className="mr-2 h-4 w-4" />
                  Clear all
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Current filter indicator - always visible when active */}
      {selectedOptions.length > 0 && (
        <span className="ml-1 text-xs text-blue-500">
          {selectedOptions.length} selected
        </span>
      )}
    </div>
  );
}

function DropdownMenuCheckboxItem({
  children,
  checked,
  onCheckedChange,
  ...props
}: {
  children: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onSelect={(e) => e.preventDefault()}
      {...props}
    >
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      {children}
    </DropdownMenuItem>
  );
}
