/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
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
import { Modal } from "@mantine/core";
import useIsMobile from "@/hooks/useIsMobile";

type HistoryEntry = {
  id: string;
  date: string;
  user: string;
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
  isOptionModalOpen,
  setIsOptionModalOpen,
  title,
}: // statusInfo,
{
  columnData: HistoryEntry[];
  isOptionModalOpen: boolean;
  setIsOptionModalOpen: (value: boolean) => void;
  title: string;
  statusInfo?: {
    created?: string;
    updated?: string;
    drafted?: string;
    deleted?: string;
  };
}) {
  const isMobile = useIsMobile();
  const [data] = useState(columnData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
        accessorKey: "date",
        header: ({ column }) => (
          <ColumnFilterHeader column={column} title="Date" />
        ),
        cell: (info) => (
          <div className="text-xs sm:text-sm text-gray-900 truncate">
            {info.getValue() as string}
          </div>
        ),
        size: isMobile ? 130 : 160,
        minSize: isMobile ? 100 : 140,
      },
      {
        accessorKey: "user",
        header: ({ column }) => (
          <ColumnFilterHeader column={column} title="User" />
        ),
        cell: (info) => (
          <div className="text-xs sm:text-sm text-gray-900 truncate">
            {info.getValue() as string}
          </div>
        ),
        sortingFn: (row1: any, row2: any) => {
          return row1.getValue("user").localeCompare(row2.getValue("user"));
        },
        size: isMobile ? 100 : 140,
        minSize: isMobile ? 80 : 120,
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
        size: isMobile ? 90 : 110,
        minSize: isMobile ? 80 : 100,
      },
      {
        accessorKey: "export",
        header: ({ column }) => (
          <ColumnFilterHeader column={column} title="Export" />
        ),
        cell: (info: any) => (
          <div className="text-xs sm:text-sm text-gray-900 truncate">
            {info.getValue() as string}
          </div>
        ),
        size: isMobile ? 80 : 110,
        minSize: isMobile ? 70 : 100,
      },
      {
        accessorKey: "pdf",
        header: "PDF",
        cell: (info: any) => (
          <div className="flex justify-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                info.getValue()
                  ? "bg-primary border-primary"
                  : "border-gray-300"
              }`}
            >
              {info.getValue() && (
                <div className="w-full h-full rounded-full bg-primary"></div>
              )}
            </div>
          </div>
        ),
        size: isMobile ? 56 : 72,
        minSize: isMobile ? 48 : 64,
      },
      {
        accessorKey: "csv",
        header: "CSV",
        cell: (info: any) => (
          <div className="flex justify-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                info.getValue()
                  ? "bg-primary border-primary"
                  : "border-gray-300"
              }`}
            >
              {info.getValue() && (
                <div className="w-full h-full rounded-full bg-primary"></div>
              )}
            </div>
          </div>
        ),
        size: isMobile ? 56 : 72,
        minSize: isMobile ? 48 : 64,
      },
      {
        accessorKey: "xls",
        header: "XLS",
        cell: (info: any) => (
          <div className="flex justify-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                info.getValue()
                  ? "bg-primary border-primary"
                  : "border-gray-300"
              }`}
            >
              {info.getValue() && (
                <div className="w-full h-full rounded-full bg-primary"></div>
              )}
            </div>
          </div>
        ),
        size: isMobile ? 56 : 72,
        minSize: isMobile ? 48 : 64,
      },
      {
        accessorKey: "doc",
        header: "DOC",
        cell: (info: any) => (
          <div className="flex justify-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                info.getValue()
                  ? "bg-primary border-primary"
                  : "border-gray-300"
              }`}
            >
              {info.getValue() && (
                <div className="w-full h-full rounded-full bg-primary"></div>
              )}
            </div>
          </div>
        ),
        size: isMobile ? 56 : 72,
        minSize: isMobile ? 48 : 64,
      },
      {
        accessorKey: "print",
        header: "Print",
        cell: (info: any) => (
          <div className="flex justify-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                info.getValue()
                  ? "bg-primary border-primary"
                  : "border-gray-300"
              }`}
            >
              {info.getValue() && (
                <div className="w-full h-full rounded-full bg-primary"></div>
              )}
            </div>
          </div>
        ),
        size: isMobile ? 56 : 72,
        minSize: isMobile ? 48 : 64,
      },
    ];

    return columns;
  }, [isMobile]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility,
      sorting,
      globalFilter,
    },
    getRowId: (row) => row.id,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
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
  }, [columnFilters, globalFilter]);

  return (
    <Modal
      opened={isOptionModalOpen}
      onClose={() => setIsOptionModalOpen(false)}
      size="100%"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      withCloseButton={false}
      centered={true}
      styles={{
        body: {
          padding: "1rem",
          minHeight: "50vh",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
        content: {
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxWidth: "800px",
          maxHeight: "600px",
          borderRadius: "24px",
          overflow: "hidden",
        },
        header: {
          flexShrink: 0,
        },
      }}
    >
      <Modal.Header className="flex justify-between p-4 border-b">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          {/* Title + Close for small screens */}
          <div className="flex items-center justify-between gap-4 w-full sm:hidden">
            <Modal.Title className="col-span-1 md:col-span-1">
              <span className="text-lg font-semibold text-primary">
                {title}
              </span>
            </Modal.Title>

            <div className="flex justify-end">
              <Modal.CloseButton className="hover:text-red-500!" />
            </div>
          </div>

          {/* Title for sm and up */}
          <Modal.Title className="hidden sm:block col-span-1 md:col-span-1">
            <span className="text-lg font-semibold text-primary">{title}</span>
          </Modal.Title>

          {/* Global Search */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search all columns..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>

          {/* Close button on the far right for sm and up */}
          <div className="hidden sm:flex justify-end">
            <Modal.CloseButton className="hover:text-red-500!" />
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="flex-1 flex flex-col min-h-0 p-0">
        <div className="flex-1 flex flex-col min-h-0">
          {/* Status Information */}

          {/* Table Container */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div
              ref={tableContainerRef}
              className="flex-1 focus:outline-none border border-gray-200 rounded-lg min-h-0 overflow-x-auto overflow-y-scroll grid-scroll"
              tabIndex={0}
            >
              <div className="min-w-full">
                <table className="w-full border-collapse table-fixed sm:table-auto">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="pl-2 pr-2 py-1 sm:pl-3 sm:py-2 text-left text-[11px] sm:text-xs font-medium text-gray-500 capitalize tracking-wider border-b border-gray-200 bg-gray-50"
                            style={{
                              width: `${header.getSize()}px`,
                              minWidth: `${
                                header.column.columnDef.minSize ||
                                header.getSize()
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
                            className={`px-2 py-1 sm:px-3 sm:py-2 whitespace-nowrap text-xs sm:text-sm cursor-pointer ${
                              isCellSelected(row.index, cell.column.id)
                                ? "ring-2 ring-primary ring-inset bg-primary/10"
                                : ""
                            }`}
                            style={{
                              width: `${cell.column.getSize()}px`,
                              minWidth: `${
                                cell.column.columnDef.minSize ||
                                cell.column.getSize()
                              }px`,
                            }}
                            onClick={() =>
                              handleCellClick(row.index, cell.column.id)
                            }
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
                    <div className="flex items-center gap-2 text-primary">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
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
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-3 mt-4 flex-shrink-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center text-sm text-gray-600 gap-2 font-semibold">
              <span>Total {sortedAndFilteredData.length} entries</span>
              {selectedCell.rowIndex !== -1 && (
                <span className="text-primary">
                  Selected: Row {selectedCell.rowIndex + 1}, Column{" "}
                  {selectedCell.columnId}
                </span>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
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
    <div className="flex items-center justify-between gap-1 group">
      <span className="capitalize text-xs sm:text-sm">{title}</span>

      {/* Sort button */}
      <button
        onClick={toggleSorting}
        className={`p-1 rounded transition-opacity flex-shrink-0 ${
          sortDirection
            ? "opacity-100 bg-blue-100 text-primary"
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
        <span className="ml-1 text-xs text-primary flex-shrink-0">
          {selectedOptions.length}
        </span>
      )}
    </div>
  );
}
