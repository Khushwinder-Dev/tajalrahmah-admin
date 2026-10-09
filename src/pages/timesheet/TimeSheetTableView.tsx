import { flexRender, type Table } from "@tanstack/react-table";
import type { EmployeeRow } from "./TimeSheetTable";
import { cn } from "@/lib/utils";

type Props = {
  table: Table<EmployeeRow>;
  sticky?: string[];
};

const TimeSheetTableView = ({ table, sticky }: Props) => {
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
    <div className="overflow-auto border border-gray-200 rounded-xl shadow-sm h-[calc(100vh-210px)]">
      <table className="min-w-[1000px] table-fixed text-sm">
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
                      "bg-gray-50 border-b border-gray-200 h-[50px] px-3 py-2 font-semibold text-left whitespace-nowrap",
                      header.column.columnDef.meta?.headerClassName,
                      isSticky ? "sticky z-[2] bg-white" : ""
                    )}
                    style={isSticky ? { left } : undefined}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="text-gray-800 divide-y divide-gray-100">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-all group">
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
      </table>
    </div>
  );
};

export default TimeSheetTableView;
