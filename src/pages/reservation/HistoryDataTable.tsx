/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
} from "@tanstack/react-table";

type HistoryEntry = {
  id: string;

  reservationNo: string;
  reservationDate: string;
  customerName: string;
  table: string;
  persons: number;
  startTime: string;
  endTime: string;
  mobile: string;
  phone: string;
  email: string;
  description: string;

  status: "Active" | "InActive" | "Delete" | "Draft";
  export: "Single" | "Bulk";
  pdf: boolean;
  csv: boolean;
  xls: boolean;
  doc: boolean;
  print: boolean;
};

export default function HistoryDataTable({
  columnData,
}: {
  columnData: HistoryEntry[];
}) {
  const [data] = useState(columnData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  // Cell selection state
  const [selectedCell, setSelectedCell] = useState({
    rowIndex: -1,
    columnId: "",
  });

  // Infinite scroll states
  const [displayedRows, setDisplayedRows] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_LOAD = 10;

  const columns = useMemo(() => {
    const columns: ColumnDef<HistoryEntry>[] = [
      {
        accessorKey: "reservationNo",
        header: ({ column }) => (
          <ColumnFilterHeader column={column} title="Reservation No" />
        ),
        cell: (info) => (
          <div className="text-sm text-gray-900 font-medium">
            {info.getValue() as string}
          </div>
        ),
        sortingFn: (row1: any, row2: any) => {
          return row1
            .getValue("reservationNo")
            .localeCompare(row2.getValue("reservationNo"));
        },
        size: 120,
        minSize: 100,
      },
      {
        accessorKey: "reservationDate",
        header: ({ column }) => (
          <ColumnFilterHeader column={column} title="Reservation Date" />
        ),
        cell: (info) => (
          <div className="text-sm text-gray-900">
            {info.getValue() as string}
          </div>
        ),
        size: 140,
        minSize: 120,
      },
      {
        accessorKey: "customerName",
        header: ({ column }) => (
          <ColumnFilterHeader column={column} title="Customer Name" />
        ),
        cell: (info) => (
          <div className="text-sm text-gray-900 font-medium">
            {info.getValue() as string}
          </div>
        ),
        sortingFn: (row1: any, row2: any) => {
          return row1
            .getValue("customerName")
            .localeCompare(row2.getValue("customerName"));
        },
        size: 120,
        minSize: 100,
      },
      {
        accessorKey: "table",
        header: ({ column }) => (
          <ColumnFilterHeader column={column} title="Table No" />
        ),
        cell: (info) => (
          <div className="text-sm text-gray-900 font-medium">
            {info.getValue() as string}
          </div>
        ),
        sortingFn: (row1: any, row2: any) => {
          return row1.getValue("table").localeCompare(row2.getValue("table"));
        },
        size: 120,
        minSize: 100,
      },
      {
        accessorKey: "description",
        header: ({ column }) => (
          <ColumnFilterHeader column={column} title="Description" />
        ),
        cell: (info) => (
          <div className="text-sm text-gray-900 font-medium">
            {info.getValue() as string}
          </div>
        ),
        sortingFn: (row1: any, row2: any) => {
          return row1
            .getValue("description")
            .localeCompare(row2.getValue("description"));
        },
        size: 120,
        minSize: 100,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <ColumnFilterHeader column={column} title="Status" />
        ),
        cell: (info) => {
          const status = info.getValue() as string;
          const statusColors = {
            Active: "text-green-600 bg-green-50",
            InActive: "text-red-600 bg-red-50",
            Delete: "text-red-600 bg-red-50",
            Draft: "text-yellow-600 bg-yellow-50",
          };

          return (
            <span
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                statusColors[status as keyof typeof statusColors]
              }`}
            >
              {status}
            </span>
          );
        },
        size: 100,
        minSize: 80,
      },
      {
        accessorKey: "export",
        header: ({ column }) => (
          <ColumnFilterHeader column={column} title="Export" />
        ),
        cell: (info: any) => (
          <div className="text-sm text-gray-900">
            {info.getValue() as string}
          </div>
        ),
        size: 80,
        minSize: 70,
      },
      {
        accessorKey: "pdf",
        header: "PDF",
        cell: (info: any) => (
          <div className="flex justify-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                info.getValue()
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-300"
              }`}
            >
              {info.getValue() && (
                <div className="w-full h-full rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
        ),
        size: 60,
        minSize: 50,
      },
      {
        accessorKey: "csv",
        header: "CSV",
        cell: (info: any) => (
          <div className="flex justify-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                info.getValue()
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-300"
              }`}
            >
              {info.getValue() && (
                <div className="w-full h-full rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
        ),
        size: 60,
        minSize: 50,
      },
      {
        accessorKey: "xls",
        header: "XLS",
        cell: (info: any) => (
          <div className="flex justify-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                info.getValue()
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-300"
              }`}
            >
              {info.getValue() && (
                <div className="w-full h-full rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
        ),
        size: 60,
        minSize: 50,
      },
      {
        accessorKey: "doc",
        header: "DOC",
        cell: (info: any) => (
          <div className="flex justify-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                info.getValue()
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-300"
              }`}
            >
              {info.getValue() && (
                <div className="w-full h-full rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
        ),
        size: 60,
        minSize: 50,
      },
      {
        accessorKey: "print",
        header: "Print",
        cell: (info: any) => (
          <div className="flex justify-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                info.getValue()
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-300"
              }`}
            >
              {info.getValue() && (
                <div className="w-full h-full rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
        ),
        size: 70,
        minSize: 60,
      },
    ];

    return columns;
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility,
      sorting,
    },
    getRowId: (row) => row.id,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    columnResizeMode: "onChange",
  });

  // Get sorted and filtered data for infinite scroll
  const sortedAndFilteredData = table.getSortedRowModel().rows;
  const visibleRows = sortedAndFilteredData.slice(0, displayedRows);

  // Cell selection functions
  const handleCellClick = useCallback((rowIndex: number, columnId: string) => {
    setSelectedCell({ rowIndex, columnId });
  }, []);

  const isCellSelected = (rowIndex: number, columnId: string) => {
    return (
      selectedCell.rowIndex === rowIndex && selectedCell.columnId === columnId
    );
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedCell.rowIndex === -1 || !selectedCell.columnId) return;

      const rows = visibleRows;
      const columns = table.getAllColumns().filter((col) => col.getIsVisible());
      const columnIds = columns.map((col) => col.id);
      const currentRowIndex = selectedCell.rowIndex;
      const currentColumnIndex = columnIds.indexOf(selectedCell.columnId);

      let newRowIndex = currentRowIndex;
      let newColumnIndex = currentColumnIndex;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          newRowIndex = Math.max(0, currentRowIndex - 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          newRowIndex = Math.min(rows.length - 1, currentRowIndex + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          newColumnIndex = Math.max(0, currentColumnIndex - 1);
          break;
        case "ArrowRight":
          e.preventDefault();
          newColumnIndex = Math.min(
            columnIds.length - 1,
            currentColumnIndex + 1
          );
          break;
        default:
          return;
      }

      setSelectedCell({
        rowIndex: newRowIndex,
        columnId: columnIds[newColumnIndex],
      });
    },
    [selectedCell, visibleRows, table]
  );

  // Add keyboard event listener
  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      tableContainer.addEventListener("keydown", handleKeyDown);
      tableContainer.setAttribute("tabindex", "0");
      return () => {
        tableContainer.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  // Load more data function
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newDisplayedRows = displayedRows + ITEMS_PER_LOAD;
    setDisplayedRows(newDisplayedRows);

    if (newDisplayedRows >= sortedAndFilteredData.length) {
      setHasMore(false);
    }

    setIsLoading(false);
  }, [displayedRows, sortedAndFilteredData.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100;

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  // Add scroll event listener
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayedRows(15);
    setHasMore(true);
    setIsLoading(false);
    setSelectedCell({ rowIndex: -1, columnId: "" }); // Reset selection on filter change
  }, [columnFilters]);

  return (
    <div className="h-[67vh] flex flex-col">
      {/* Table Container - Single table for proper alignment */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div
          ref={tableContainerRef}
          className="flex-1 overflow-auto scroll-smooth smooth-scroll focus:outline-none border border-gray-200 rounded-lg"
          tabIndex={0}
        >
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50"
                      style={{
                        width: `${header.getSize()}px`,
                        minWidth: `${
                          header.column.columnDef.minSize || header.getSize()
                        }px`,
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visibleRows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`
        ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
        hover:bg-gray-100
      `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-3 py-2 whitespace-nowrap text-sm cursor-pointer ${
                        isCellSelected(row.index, cell.column.id)
                          ? "ring-2 ring-blue-500 ring-inset bg-blue-50"
                          : ""
                      }`}
                      style={{
                        width: `${cell.column.getSize()}px`,
                        minWidth: `${
                          cell.column.columnDef.minSize || cell.column.getSize()
                        }px`,
                      }}
                      onClick={() => handleCellClick(row.index, cell.column.id)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more entries...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && sortedAndFilteredData.length > 15 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500">
                All {sortedAndFilteredData.length} entries loaded
              </span>
            </div>
          )}

          {/* No data message */}
          {sortedAndFilteredData.length === 0 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500">
                No entries found matching your filters
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="flex-shrink-0 border-t bg-gray-50 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {Math.min(displayedRows, sortedAndFilteredData.length)} of{" "}
            {sortedAndFilteredData.length} entries
          </span>
          {selectedCell.rowIndex !== -1 && (
            <span className="text-blue-600">
              Selected: Row {selectedCell.rowIndex + 1}, Column{" "}
              {selectedCell.columnId}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Column Filter Header Component
function ColumnFilterHeader({ column, title }: { column: any; title: string }) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const currentFilter = column.getFilterValue();
  const sortDirection = column.getIsSorted();

  useEffect(() => {
    if (currentFilter && Array.isArray(currentFilter)) {
      setSelectedOptions(currentFilter);
    }
  }, [currentFilter]);

  const toggleSorting = () => {
    if (!sortDirection) {
      // No sorting currently, set to ascending
      column.toggleSorting(false);
    } else if (sortDirection === "asc") {
      // Currently ascending, set to descending
      column.toggleSorting(true);
    } else {
      // Currently descending, clear sorting
      column.clearSorting();
    }
  };

  return (
    <div className="flex items-center gap-1 group">
      <span className="truncate">{title}</span>

      {/* Sort button */}
      <button
        onClick={toggleSorting}
        className={`p-1 rounded transition-opacity flex-shrink-0 ${
          sortDirection
            ? "opacity-100 bg-blue-100 text-blue-600"
            : "opacity-0 group-hover:opacity-100 text-gray-500 hover:bg-gray-100"
        }`}
      >
        {sortDirection === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : sortDirection === "desc" ? (
          <ArrowDown className="h-3 w-3" />
        ) : (
          <ArrowUp className="h-3 w-3" />
        )}
      </button>

      {/* Filter count indicator */}
      {selectedOptions.length > 0 && (
        <span className="ml-1 text-xs text-blue-500 flex-shrink-0">
          {selectedOptions.length}
        </span>
      )}
    </div>
  );
}
