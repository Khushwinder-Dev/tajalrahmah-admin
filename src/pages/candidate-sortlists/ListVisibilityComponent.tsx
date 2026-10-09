import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { Column } from "@tanstack/react-table";

interface ColumnVisibilityPanelProps<TData> {
  table: {
    getAllColumns: () => Column<TData>[];
    getIsAllColumnsVisible: () => boolean;
    toggleAllColumnsVisible: (value: boolean) => void;
  };
  setShowVisibility: (value: boolean) => void;
}

export default function ColumnVisibilityPanel<TData>({
  table,
  setShowVisibility,
}: ColumnVisibilityPanelProps<TData>) {
  const [columnSearch, setColumnSearch] = useState("");
  const [allColumnsVisible, setAllColumnsVisible] = useState(
    table.getIsAllColumnsVisible()
  );

  return (
    <div
      className={`w-72 h-full flex flex-col border rounded-lg transition-width duration-300 ease-in-out bg-white dark:bg-gray-900 overflow-hidden shadow-lg`}
    >
      {/* Fixed Top Section */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 border-b px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <Checkbox
              id="select-all-columns"
              checked={allColumnsVisible}
              onCheckedChange={(checked) => {
                table.toggleAllColumnsVisible(!!checked);
                setAllColumnsVisible(!!checked);
              }}
              className=""
            />
            <div className="relative flex-1 rounded-full">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search..."
                className="pl-8 h-8 w-full rounded-full"
                value={columnSearch}
                onChange={(e) => setColumnSearch(e.target.value)}
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-2"
            onClick={() => {
              setShowVisibility(false);
              setColumnSearch("");
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Middle Section */}
      <div className="flex-1 overflow-y-auto px-1 py-1">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .filter(
            (column) =>
              !columnSearch ||
              column.id.toLowerCase().includes(columnSearch.toLowerCase())
          )
          .map((column) => (
            <div
              key={column.id}
              className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Checkbox
                id={`column-${column.id}`}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(!!value);
                  setAllColumnsVisible(table.getIsAllColumnsVisible());
                }}
                className="mr-2"
              />
              <label htmlFor={`column-${column.id}`} className="text-sm">
                {column.id}
              </label>
            </div>
          ))}
      </div>

      {/* Fixed Bottom Section */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 z-10 border-t px-3 py-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-gray-800"
          onClick={() => {
            table.toggleAllColumnsVisible(true);
            setAllColumnsVisible(true);
            setColumnSearch("");
          }}
        >
          Reset All
        </Button>
      </div>
    </div>
  );
}
