import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";
import FloatingCloseButton from "@/components/common/FloatingCloseButton";
import HeaderSearch from "@/components/HeaderSearch";

interface ColumnVisibilityPanelProps<TData> {
  table: {
    getAllColumns: () => Column<TData>[];
    getIsAllColumnsVisible: () => boolean;
    toggleAllColumnsVisible: (value: boolean) => void;
  };
  setShowVisibility: (value: boolean) => void;
  onClose?: () => void;
  columnOrder?: string[];
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
    <div className="h-full flex flex-col relative overflow-visible">
      {/* Floating X Button */}
      <FloatingCloseButton onClose={() => setShowVisibility(false)} />

      {/* Full Width Search */}
      {/* <div className="p-3 border-b flex-shrink-0">
        <div className="relative mt-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            placeholder="Search..."
            className="pl-10 pr-10 h-10 w-full rounded-full"
            value={columnSearch}
            onChange={(e) => setColumnSearch(e.target.value)}
          />
          <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary cursor-pointer hover:text-gray-700 transition-colors" />
        </div>
      </div> */}

      <div className="pl-2 pr-3 py-4 border-b flex-shrink-0">
        <HeaderSearch
          searchQuery={columnSearch}
          setSearchQuery={setColumnSearch}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left side - Field names with switches on right */}
        <div className="flex-1 flex flex-col">
          {/* Select All - Fixed at top */}
          <div className="px-3 py-3 border-b bg-white dark:bg-gray-800 sticky top-0 z-10">
            <div className="flex items-center justify-between gap-2 font-medium">
              <span className="text-gray-900 dark:text-gray-100">
                Select All
              </span>
              <div
                className={cn(
                  "w-[36px] h-4 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 cursor-pointer",
                  allColumnsVisible
                    ? "bg-sky-400 justify-end"
                    : "bg-sky-200 justify-start"
                )}
                onClick={() => {
                  const newValue = !allColumnsVisible;
                  table.toggleAllColumnsVisible(newValue);
                  setAllColumnsVisible(newValue);
                }}
              >
                <div className="w-4.5 h-4.5 bg-gray-50 rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.25)] transition-all duration-200" />
              </div>
            </div>
          </div>

          {/* Scrollable field names */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 grid-scroll">
            {/* Individual Column Names with Switches on Right */}
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .filter(
                (column) =>
                  !columnSearch ||
                  column.id.toLowerCase().includes(columnSearch.toLowerCase())
              )
              .map((column) => {
                const isVisible = column.getIsVisible();

                return (
                  <div
                    key={column.id}
                    className="flex items-center justify-between gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize flex-1">
                      {column.id}
                    </span>
                    <div
                      className={cn(
                        "w-[36px] h-4 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 cursor-pointer",
                        isVisible
                          ? "bg-sky-400 justify-end"
                          : "bg-sky-200 justify-start"
                      )}
                      onClick={() => {
                        column.toggleVisibility(!isVisible);
                        setAllColumnsVisible(table.getIsAllColumnsVisible());
                      }}
                    >
                      <div className="w-4.5 h-4.5 bg-gray-50 rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.25)] transition-all duration-200" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
