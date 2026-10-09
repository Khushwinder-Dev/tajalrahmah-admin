import { flexRender, type Table } from "@tanstack/react-table";
import type { EmployeeRow } from "./DatabaseTable";
import { cn } from "@/lib/utils";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
} from "lucide-react";
import { Popover } from "@mantine/core";

type Props = {
  table: Table<EmployeeRow>;
  sticky?: string[];
};

const DatabaseTableView = ({ table, sticky }: Props) => {
  let leftOffset = 0;
  const stickyStyles: Record<string, number> = {};

  // Calculate pixel offsets for sticky columns
  if (sticky) {
    for (const columnId of sticky) {
      const col = table.getAllColumns().find((c) => c.id === columnId);
      // Try to get stickyWidth from meta, fallback to 100 if not found
      const width = col?.columnDef.meta?.stickyWidth ?? 100;
      stickyStyles[columnId] = leftOffset;
      leftOffset += width;
    }
  }

  return (
    <div className="overflow-auto border border-gray-200 rounded-xl shadow-sm h-[calc(100vh-260px)]">
      <table className="min-w-[1000px] w-full text-sm">
        <thead className="sticky top-0 z-10 bg-white shadow-sm text-xs text-gray-700 capitalize tracking-wider">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const columnId = header.column.id;
                const isSticky = sticky?.includes(columnId);
                const left = stickyStyles[columnId];

                return (
                  <th
                    key={header.id}
                    className={cn(
                      "bg-gray-50 border-b border-gray-200 h-[50px] px-3 py-2 font-semibold text-left whitespace-nowrap cursor-pointer select-none group",
                      header.column.columnDef.meta?.headerClassName,
                      isSticky ? "sticky z-[2] bg-white" : ""
                    )}
                    style={isSticky ? { left } : undefined}
                    onClick={header.column.getToggleSortingHandler?.()}
                  >
                    {header.isPlaceholder ? null : (
                      <span className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span
                          className={cn(
                            "ml-1 transition-opacity",
                            header.column.getIsSorted()
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          )}
                        >
                          {header.column.getIsSorted() === "asc" && (
                            <ArrowUp size={16} />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <ArrowDown size={16} />
                          )}
                          {!header.column.getIsSorted() && (
                            <ArrowUpDown size={16} />
                          )}
                        </span>
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="text-gray-800 divide-y divide-gray-100">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.original.id}
              className="hover:bg-gray-50 transition-all group"
            >
              {row.getVisibleCells().map((cell) => {
                const columnId = cell.column.id;
                const isSticky = sticky?.includes(columnId);
                const left = stickyStyles[columnId];

                return (
                  <td
                    key={cell.id}
                    className={cn(
                      "align-middle px-3 py-2 whitespace-nowrap h-[50px]",
                      isSticky
                        ? "sticky z-[1] bg-white group-hover:bg-gray-50"
                        : "",
                      cell.column.columnDef.meta?.cellClassName
                    )}
                    style={isSticky ? { left } : undefined}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {/* <tfoot className="sticky bottom-0 bg-white h-[50px] border-t border-gray-200">
          <tr className="px-4 py-3">
            <td>
              <div className="flex items-center gap-2 justify-start">
                {[10, 20, 30].map((size) => (
                  <button
                    key={size}
                    className={cn(
                      "border rounded px-2 py-1 text-sm focus:outline-none transition",
                      table.getState().pagination.pageSize === size
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    )}
                    onClick={() => table.setPageSize(size)}
                  >
                    {size}
                  </button>
                ))}
                <Popover position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <button
                      className={cn(
                        "border rounded px-2 py-1 text-sm focus:outline-none transition",
                        [50, 100, 200].includes(
                          table.getState().pagination.pageSize
                        )
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      )}
                      type="button"
                    >
                      <Ellipsis size={20} />
                    </button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <div className="flex flex-col gap-1">
                      {[50, 100, 200].map((size) => (
                        <button
                          key={size}
                          className={cn(
                            "px-2 py-1 rounded text-sm text-left",
                            table.getState().pagination.pageSize === size
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-100"
                          )}
                          onClick={() => table.setPageSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </Popover.Dropdown>
                </Popover>
              </div>

              <div className="w-1/3 text-center align-middle text-sm">
                Showing {table.getFilteredRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} items
              </div>

              <div className="flex items-center justify-end gap-4">
                <button
                  className="p-2 rounded disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>
                <button
                  className="p-2 rounded disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Next Page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </td>
          </tr>
        </tfoot> */}

        <tfoot className="sticky bottom-0 bg-white h-[50px] border-t border-gray-200">
          <tr>
            <td colSpan={100}>
              <div className="flex justify-between items-center px-4 py-2">
                {/* Left: Page Size Controls */}
                <div className="flex items-center gap-2">
                  {[10, 20, 30].map((size) => (
                    <button
                      key={size}
                      className={cn(
                        "border rounded px-2 py-1 text-sm focus:outline-none transition",
                        table.getState().pagination.pageSize === size
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      )}
                      onClick={() => table.setPageSize(size)}
                    >
                      {size}
                    </button>
                  ))}

                  <Popover position="bottom" withArrow shadow="md">
                    <Popover.Target>
                      <button
                        className={cn(
                          "border rounded px-2 py-1 text-sm focus:outline-none transition",
                          [50, 100, 200].includes(
                            table.getState().pagination.pageSize
                          )
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        )}
                        type="button"
                      >
                        <Ellipsis size={20} />
                      </button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <div className="flex flex-col gap-1">
                        {[50, 100, 200].map((size) => (
                          <button
                            key={size}
                            className={cn(
                              "px-2 py-1 rounded text-sm text-left",
                              table.getState().pagination.pageSize === size
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-100"
                            )}
                            onClick={() => table.setPageSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </Popover.Dropdown>
                  </Popover>
                </div>

                {/* Center: Item count */}
                <div className="text-sm text-center">
                  Showing {table.getFilteredRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} items
                </div>

                {/* Right: Pagination */}
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </span>
                  <button
                    className="p-2 rounded disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label="Next Page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DatabaseTableView;
