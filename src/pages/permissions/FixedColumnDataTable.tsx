/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover as PopoverMantine } from "@mantine/core";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExportComponent } from "@/pages/Country/ListExportComponent";
import FilterComponent from "@/pages/Country/ListFilterComponent";
// import ColumnVisibilityPanel from "@/pages/Country/ListVisibilityComponent";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingFnOption,
} from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Minus,
  MoreHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import ColumnVisibility from "@/components/common/NewVisibiltyComponent";
import { cn } from "@/lib/utils";

type User = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  deletedAt: string | null;
  draftedAt: string | null;
  meta: {
    isFixed?: boolean;
    fixedPosition?: "left" | "right";
  };
  actionMessage: string;
};

// Utility to calculate right offset for sticky right columns
function getStickyRightOffset(columnId: string, allColumns: any[]): string {
  // Get all columns that are right-sticky and come after this one (to the right)
  const rightStickyColumns = allColumns.filter(
    (col: any) =>
      col.columnDef.meta?.isFixed &&
      col.columnDef.meta?.fixedPosition === "right"
  );
  const currentIndex = rightStickyColumns.findIndex(
    (col: any) => col.id === columnId
  );
  if (currentIndex === -1) return "0px";
  // Sum widths of all columns to the right of this one
  let offset = 0;
  for (let i = currentIndex + 1; i < rightStickyColumns.length; i++) {
    offset += rightStickyColumns[i].getSize
      ? rightStickyColumns[i].getSize()
      : rightStickyColumns[i].size || 0;
  }
  return `${offset}px`;
}

export default function CommonDataTable({
  searchQuery,
  componentColumns,
  columnData,
  fixedColumns = [], // New prop for fixed columns
  pathName,
  setShowExport,
  showExport,
  showFilter,
  setShowVisibility,
  showVisibility,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  componentColumns: any;
  columnData: any[];
  fixedColumns?: string[]; // Array of column accessorKeys to be fixed
  searchQuery: string;
  pathName: string;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  console.log("Column data:", columnData);
  const [data, setData] = useState(columnData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnId: string;
  } | null>(null);
  const [editValue, setEditValue] = useState<any>("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [selectedCell, setSelectedCell] = useState({
    rowIndex: -1,
    columnId: "",
  });
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setData(columnData);
  }, [columnData]);

  const [globalFilter, setGlobalFilter] = useState<string | RegExp>("");

  useEffect(() => {
    try {
      // Create case-insensitive regex pattern
      const regex = new RegExp(searchQuery, "i");
      setGlobalFilter(regex);
    } catch {
      // Fallback to simple string search if regex fails
      setGlobalFilter(searchQuery);
    }
  }, [searchQuery]);

  // Helper function to calculate fixed column position
  const getFixedColumnPosition = useCallback(
    (accessorKey: string, columns: any[]) => {
      let position = 60; // Start after select column (which is always first and fixed)

      // If this is the select column, return 0
      if (accessorKey === "select") return 0;

      // If this is the actions column and it's right-fixed, return 0 (it will be positioned from right)
      if (accessorKey === "actions") return 0;

      const fixedColumnIndex = fixedColumns.indexOf(accessorKey);
      if (fixedColumnIndex === -1) return 0; // Not a fixed column

      // Calculate position by summing widths of previous fixed columns
      for (let i = 0; i < fixedColumnIndex; i++) {
        const col = columns.find((c: any) => c.accessorKey === fixedColumns[i]);
        position += col?.size || 150;
      }

      return position;
    },
    [fixedColumns]
  );

  // Calculate total width of left-fixed columns (excluding actions column)
  // const getLeftFixedColumnsWidth = useCallback(() => {
  //   let width = 60; // Base width for select column

  //   fixedColumns.forEach((accessorKey) => {
  //     const col = componentColumns.find(
  //       (c: any) => c.accessorKey === accessorKey
  //     );
  //     if (col) {
  //       width += col.size || 150;
  //     }
  //   });

  //   return width;
  // }, [componentColumns, fixedColumns]);

  const columns = useMemo(() => {
    const columns: ColumnDef<User>[] = [
      {
        id: "select",
        header: ({ table }) => {
          const allSelected = table.getIsAllPageRowsSelected();
          const someSelected =
            table.getSelectedRowModel().rows.length > 0 && !allSelected;

          return (
            <div className="flex items-center">
              {someSelected ? (
                <button
                  onClick={() => table.toggleAllPageRowsSelected(false)}
                  className="flex items-center justify-center w-4 h-4 rounded border border-gray-300 cursor-pointer"
                >
                  <Minus className="h-3 w-3 text-gray-600" />
                </button>
              ) : (
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                  }
                  aria-label="Select all"
                  className="w-4 h-4 cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
              )}
            </div>
          );
        },
        cell: ({ row, table }) => (
          <div
            className={`
                ${
                  table.getIsAllPageRowsSelected() || row.getIsSelected()
                    ? "opacity-100"
                    : "opacity-100"
                }
                transition-opacit
              `}
          >
            <Checkbox
              checked={row.getIsSelected()}
              className="w-4 h-4 cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-white"
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        size: 60,
        minSize: 60,
        maxSize: 60,
        meta: {
          isFixed: true,
          fixedPosition: "left",
        },
      },
    ];

    componentColumns.forEach((componentColumn: any) => {
      const isFixed = fixedColumns.includes(componentColumn.accessorKey);

      console.log("Preparing column", componentColumn);

      if (componentColumn.accessorKey === "status") {
        columns.push({
          accessorKey: componentColumn.accessorKey,
          header: ({ column }) => (
            <ColumnFilterHeader
              column={column}
              title={componentColumn.title}
              options={componentColumn.options}
              accessorKey={componentColumn.accessorKey}
            />
          ),
          cell: (info) => (
            <StatusEditableCell
              info={info}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              editValue={editValue}
              setEditValue={setEditValue}
              handleEdit={handleEdit}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
            />
          ),
          filterFn: componentColumn.filterFn,
          sortingFn: componentColumn.sortingFn as SortingFnOption<User>,
          size: componentColumn.size || 120,
          minSize: componentColumn.minSize || 80,
          meta: {
            isFixed,
            fixedPosition: isFixed ? "left" : "right",
            exportLabel: componentColumn.meta?.exportLabel,
          },
        });
      } else if (
        [
          "add",
          "edit",
          "view",
          "delete",
          "import",
          "export",
          "pdf",
          "print",
          "history",
          "restore",
        ].includes(componentColumn.accessorKey)
      ) {
        columns.push({
          accessorKey: componentColumn.accessorKey,
          header: ({ column }) => (
            <ColumnFilterHeader
              column={column}
              title={componentColumn.title}
              options={componentColumn.options}
              accessorKey={componentColumn.accessorKey}
            />
          ),
          cell: componentColumn.cell, // Use the Yes/No cell renderer
          filterFn: componentColumn.filterFn,
          sortingFn: componentColumn.sortingFn as SortingFnOption<User>,
          size: componentColumn.size || 120,
          minSize: componentColumn.minSize || 100,
          meta: {
            isFixed,
            fixedPosition: isFixed ? "left" : undefined,
            exportLabel: componentColumn.meta?.exportLabel,
          },
        });
      } else {
        columns.push({
          accessorKey: componentColumn.accessorKey,
          header: ({ column }) => (
            <ColumnFilterHeader
              column={column}
              title={componentColumn.title}
              options={componentColumn.options}
              accessorKey={componentColumn.accessorKey}
            />
          ),
          cell: (info) => (
            <EditableCell
              info={info}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              editValue={editValue}
              setEditValue={setEditValue}
              handleEdit={handleEdit}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              readOnly={componentColumn.meta?.readOnly}
            />
          ),
          filterFn: componentColumn.filterFn,
          sortingFn: componentColumn.sortingFn as SortingFnOption<User>,
          size: componentColumn.size || 150,
          minSize: componentColumn.minSize || 100,
          meta: {
            isFixed,
            fixedPosition: isFixed ? "left" : undefined,
            exportLabel: componentColumn.meta?.exportLabel,
          },
        });
      }
    });

    columns.push({
      id: "status",
      header: () => <div className="w-full text-center">Status</div>,
      cell: (info) => {
        return (
          <div className="flex items-center justify-between group/cell">
            <div className="flex-1 flex items-center justify-center text-gray-600 pr-2 truncate">
              {info.row.original.status}
            </div>
          </div>
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        isFixed: true,
        fixedPosition: "right",
      },
    });

    columns.push({
      id: "actions",
      header: () => <div className="w-full text-center">Actions</div>,
      cell: (info) => {
        const rowHasSelectedCell = isRowSelected(info.row.index);
        return (
          <div className="flex items-center justify-between group/cell">
            <div className="flex-1 flex items-center justify-center text-gray-600 pr-2 truncate">
              {info.row.original.actionMessage}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goToDetails("1")}
              className={`rounded-full cursor-pointer transition-all duration-200 bg-transparent text-center ${
                rowHasSelectedCell
                  ? "opacity-100 bg-blue-600 text-white"
                  : "opacity-0 group-hover/cell:opacity-100 group-hover/cell:bg-blue-600 group-hover/cell:text-white"
              } hover:!bg-blue-600 hover:!text-white`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        isFixed: true,
        fixedPosition: "right",
      },
    });

    return columns;
  }, [data, editingCell, editValue, selectedCell, fixedColumns]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection,
      columnVisibility,
      pagination,
      globalFilter,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: (row, columnId, filterValue) => {
      // For regex objects
      if (filterValue instanceof RegExp) {
        return filterValue.test(row.getValue(columnId));
      }
      // Fallback to string includes
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
    columnResizeMode: "onChange",
  });

  const [allColumnsVisible, setAllColumnsVisible] = useState(
    table
      .getAllColumns()
      .filter(
        (col) => col.getCanHide() && col.id !== "select" && col.id !== "actions"
      )
      .every((col) => col.getIsVisible())
  );

  const handleCellClick = useCallback((rowIndex: number, columnId: string) => {
    setSelectedCell({ rowIndex, columnId });
    // Clear editing state when selecting a new cell
    setEditingCell(null);
  }, []);

  const isCellSelected = (rowIndex: number, columnId: string) => {
    return (
      selectedCell.rowIndex === rowIndex && selectedCell.columnId === columnId
    );
  };

  const isRowSelected = (rowIndex: number) => {
    return selectedCell.rowIndex === rowIndex;
  };

  // Updated navigation functions
  const navigateToCell = useCallback((rowIndex: number, columnId: string) => {
    setSelectedCell({ rowIndex, columnId });
    setEditingCell(null); // Exit editing mode when navigating
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't handle navigation if we're in editing mode
      if (editingCell) return;

      if (selectedCell.rowIndex === -1 || !selectedCell.columnId) return;

      const rows = table.getRowModel().rows;
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
        case "Enter":
          e.preventDefault();
          // Enter edit mode for the selected cell
          // eslint-disable-next-line no-case-declarations
          const rowId = rows[currentRowIndex]?.id;
          if (
            rowId &&
            selectedCell.columnId !== "select" &&
            selectedCell.columnId !== "actions"
          ) {
            setEditingCell({ rowId, columnId: selectedCell.columnId });
            const currentValue = rows[currentRowIndex].getValue(
              selectedCell.columnId
            );
            setEditValue(currentValue);
          }
          return;
        default:
          return;
      }

      navigateToCell(newRowIndex, columnIds[newColumnIndex]);
    },
    [selectedCell, table, editingCell, navigateToCell]
  );

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      tableContainer.addEventListener("keydown", handleKeyDown);
      tableContainer.setAttribute("tabindex", "0"); // Make table focusable
      return () => {
        tableContainer.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  const handleEdit = (rowId: string, columnId: string, value: any) => {
    setData((prev) => {
      return prev.map((row) => {
        if (row.id === rowId) {
          const updatedrow = { ...row, [columnId]: value };
          return updatedrow;
        }
        return row;
      });
    });
    setEditingCell(null);

    // Keep the cell selected after editing
    const rowIndex = table
      .getRowModel()
      .rows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      setSelectedCell({ rowIndex, columnId });
    }

    // Refocus the table after editing
    setTimeout(() => {
      if (tableContainerRef.current) {
        tableContainerRef.current.focus();
      }
    }, 0);
  };

  const goToDetails = (id: string) => {
    navigate(`/${pathName}/${id}`);
  };

  const handleBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection).map(
      (idx) => data[parseInt(idx)].id
    );
    setData((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
    setRowSelection({});
  };

  const handleBulkUpdate = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    selectedRows.forEach((row) => {
      console.log(row.original);
    });
    setRowSelection({});
  };

  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="h-full flex flex-col px-4 py-3">
      {/* Header Controls - Fixed height */}
      {selectedRows.length > 0 && (
        <div className="flex-shrink-0 pb-4 h-[7vh]">
          <div className="flex gap-4 items-center justify-between">
            {/* Left column - View toggle, Import, and Bulk actions */}
            <div className="col-span-4 flex items-center gap-2">
              {/* Bulk actions - only show when rows are selected */}

              <div className="flex items-center space-x-2 ml-2">
                <Button
                  className="disabled:opacity-500 cursor-pointer text-red-600"
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button
                  className="disabled:opacity-500 cursor-pointer hover:bg-primary rounded-full"
                  variant="outline"
                  size="sm"
                  onClick={handleBulkUpdate}
                >
                  Bulk Edit
                </Button>
              </div>
            </div>

            {/* Right column - Filter, Export, and Columns */}
            <div className="col-span-4 flex items-center justify-end gap-2">
              {selectedRows.length > 0 && (
                <div>
                  selected {selectedRows.length} of total {data.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Main Content Area - Flexible height */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Table Container - Takes remaining space */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Table with scrollable body */}
          <div
            ref={tableContainerRef}
            className={`flex-1 scroll-smooth smooth-scroll focus:outline-none border border-gray-200 rounded-lg min-h-0 ${
              pagination.pageSize === 10
                ? "overflow-x-auto overflow-y-hidden"
                : "overflow-auto"
            }`}
            tabIndex={0}
            style={{
              height: "calc(100vh - 200px)", // Adjust based on your footer height and other elements
              minHeight: "200px", // Minimum height for small screens
            }}
          >
            <table
              className="w-full border-collapse"
              style={{ tableLayout: "fixed" }}
            >
              <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-20">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const isFixed = header.column.columnDef.meta?.isFixed;
                      const fixedPosition =
                        header.column.columnDef.meta?.fixedPosition;
                      const leftPosition = getFixedColumnPosition(
                        header.id,
                        componentColumns
                      );
                      // Calculate right offset for right-sticky columns
                      const rightOffset =
                        isFixed && fixedPosition === "right"
                          ? getStickyRightOffset(
                              header.column.id,
                              table.getAllColumns()
                            )
                          : undefined;

                      return (
                        <th
                          key={header.id}
                          className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 capitalize tracking-wider border-b border-gray-200 bg-gray-50 dark:bg-gray-900 ${
                            isFixed ? `sticky z-30 shadow-md gray-300` : ""
                          }`}
                          style={{
                            width: `${header.getSize()}px`,
                            minWidth: `${
                              header.column.columnDef.minSize ||
                              header.getSize()
                            }px`,
                            maxWidth: `${
                              header.column.columnDef.maxSize || "none"
                            }`,
                            ...(isFixed &&
                              (fixedPosition === "right"
                                ? { right: rightOffset }
                                : { left: `${leftPosition}px` })), // Use right for right-sticky, left for left-sticky
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`group/cell hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      row.getIsSelected() ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isFixed = cell.column.columnDef.meta?.isFixed;
                      const fixedPosition =
                        cell.column.columnDef.meta?.fixedPosition;
                      const leftPosition = getFixedColumnPosition(
                        cell.column.id,
                        componentColumns
                      );
                      // Calculate right offset for right-sticky columns
                      const rightOffset =
                        isFixed && fixedPosition === "right"
                          ? getStickyRightOffset(
                              cell.column.id,
                              table.getAllColumns()
                            )
                          : undefined;

                      return (
                        <td
                          key={cell.id}
                          className={`px-4 py-3 whitespace-nowrap border-b border-gray-200 ${
                            isCellSelected(row.index, cell.column.id)
                              ? "ring-2 ring-primary ring-inset bg-white"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          } ${
                            isFixed
                              ? `sticky z-10 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 ${
                                  row.getIsSelected()
                                    ? "bg-gray-100 dark:bg-gray-800"
                                    : ""
                                }`
                              : ""
                          }`}
                          style={{
                            width: `${cell.column.getSize()}px`,
                            minWidth: `${
                              cell.column.columnDef.minSize ||
                              cell.column.getSize()
                            }px`,
                            maxWidth: `${
                              cell.column.columnDef.maxSize || "none"
                            }`,
                            ...(isFixed &&
                              (fixedPosition === "right"
                                ? { right: rightOffset }
                                : { left: `${leftPosition}px` })), // Use right for right-sticky, left for left-sticky
                          }}
                          data-row-id={row.id}
                          data-col-id={cell.column.id}
                          onClick={(e) => {
                            // Only handle single click if it's not part of a double-click
                            if (e.detail === 1) {
                              handleCellClick(row.index, cell.column.id);
                            }
                          }}
                          onDoubleClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Handle double-click for editable cells
                            if (
                              cell.column.id !== "select" &&
                              cell.column.id !== "actions"
                            ) {
                              setSelectedCell({
                                rowIndex: row.index,
                                columnId: cell.column.id,
                              });
                              setEditingCell({
                                rowId: row.id,
                                columnId: cell.column.id,
                              });
                              setEditValue(row.getValue(cell.column.id));
                            }
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer - Fixed at bottom */}
          <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t">
            <PaginationControls table={table} />
          </div>
        </div>

        {/* Side Panels */}
        {showExport && (
          <div className="w-72 flex-shrink-0 border-l bg-white dark:bg-gray-800">
            <ExportComponent
              table={table}
              allColumnsVisible={allColumnsVisible}
              setAllColumnsVisible={setAllColumnsVisible}
              setShowExport={setShowExport}
            />
          </div>
        )}
        {showFilter && (
          <div className="w-72 flex-shrink-0 border-l bg-white dark:bg-gray-800">
            <FilterComponent table={table} />
          </div>
        )}
        {showVisibility && (
          <div className="w-72 flex-shrink-0 border-l bg-white dark:bg-gray-800">
            {/* <ColumnVisibilityPanel
              table={table}
              setShowVisibility={setShowVisibility}
            /> */}
            <ColumnVisibility
              table={table}
              setShowVisibility={setShowVisibility}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Updated ColumnFilterHeader component
function ColumnFilterHeader({
  column,
  title,
  options,
  accessorKey,
}: {
  column: any;
  title: string;
  options: any[];
  accessorKey: string;
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
    <div className="flex items-center gap-1 group justify-between min-w-[150px]">
      <div
        className={cn(
          "flex-1 flex items-center justify-start text-gray-600 pr-2",
          accessorKey === "callingCode" || accessorKey === "code"
            ? "justify-center"
            : "justify-start"
        )}
      >
        <span className="truncate">{title}</span>
      </div>

      {accessorKey === "callingCode" || accessorKey === "code" ? (
        <div
          className={cn(
            "items-center gap-1 group-hover:flex hidden",
            isFilterOpen || sortDirection || selectedOptions.length > 0
              ? "flex"
              : "hidden"
          )}
        >
          <button
            onClick={toggleSorting}
            className={`p-1 rounded transition-opacity flex-shrink-0 ${
              sortDirection
                ? "opacity-100 bg-blue-100 text-blue-600"
                : "opacity-0 group-hover:opacity-100 text-gray-500 hover:bg-gray-100"
            }`}
          >
            {sortDirection === "asc" ? (
              <ArrowDownNarrowWide className="h-4 w-4" />
            ) : sortDirection === "desc" ? (
              <ArrowUpNarrowWide className="h-4 w-4" />
            ) : (
              <ArrowDownNarrowWide className="h-4 w-4" />
            )}
          </button>
          <div
            className={`flex-shrink-0 ${
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
                    selectedOptions.length > 0
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  <Filter className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <div className="p-2">
                  <Input
                    placeholder={`Search ${title}`}
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
                      setSelectedOptions(
                        filteredOptions.map((o) => o.toString())
                      );
                      column.setFilterValue(
                        filteredOptions.map((o) => o.toString())
                      );
                    }
                  }}
                >
                  Select All
                </DropdownMenuCheckboxItem>

                {/* Options List */}
                <div className="max-h-60 overflow-y-auto scroll-smooth smooth-scroll">
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
            <span className="ml-1 text-xs text-blue-500 flex-shrink-0">
              {selectedOptions.length}
            </span>
          )}
        </div>
      ) : (
        <div className={cn("items-center gap-1 group-hover:flex flex")}>
          <button
            onClick={toggleSorting}
            className={`p-1 rounded transition-opacity flex-shrink-0 ${
              sortDirection
                ? "opacity-100 bg-blue-100 text-blue-600"
                : "opacity-0 group-hover:opacity-100 text-gray-500 hover:bg-gray-100"
            }`}
          >
            {sortDirection === "asc" ? (
              <ArrowDownNarrowWide className="h-4 w-4" />
            ) : sortDirection === "desc" ? (
              <ArrowUpNarrowWide className="h-4 w-4" />
            ) : (
              <ArrowDownNarrowWide className="h-4 w-4" />
            )}
          </button>
          <div
            className={`flex-shrink-0 ${
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
                    selectedOptions.length > 0
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  <Filter className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <div className="p-2">
                  <Input
                    placeholder={`Search ${title}`}
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
                      setSelectedOptions(
                        filteredOptions.map((o) => o.toString())
                      );
                      column.setFilterValue(
                        filteredOptions.map((o) => o.toString())
                      );
                    }
                  }}
                >
                  Select All
                </DropdownMenuCheckboxItem>

                {/* Options List */}
                <div className="max-h-60 overflow-y-auto scroll-smooth smooth-scroll">
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
            <span className="ml-1 text-xs text-blue-500 flex-shrink-0">
              {selectedOptions.length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function EditableCell({
  info,
  editingCell,
  setEditingCell,
  editValue,
  setEditValue,
  handleEdit,
  setSelectedCell,
  readOnly,
}: {
  info: any;
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: React.Dispatch<
    React.SetStateAction<{ rowId: string; columnId: string } | null>
  >;
  editValue: any;
  setEditValue: React.Dispatch<React.SetStateAction<any>>;
  handleEdit: (rowId: string, columnId: string, value: any) => void;
  selectedCell: { rowIndex: number; columnId: string };
  setSelectedCell: React.Dispatch<
    React.SetStateAction<{ rowIndex: number; columnId: string }>
  >;
  readOnly?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isEditing =
    editingCell?.rowId === info.row.id &&
    editingCell?.columnId === info.column.id;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation(); // Prevent table navigation while editing

    if (e.key === "Enter") {
      handleEdit(info.row.id, info.column.id, editValue);
      // Keep cell selected after editing
      setSelectedCell({ rowIndex: info.row.index, columnId: info.column.id });
    }
    if (e.key === "Escape") {
      setEditingCell(null);
      // Return to selection mode
      setSelectedCell({ rowIndex: info.row.index, columnId: info.column.id });
    }
    if (e.key === "Tab") {
      e.preventDefault();
      handleEdit(info.row.id, info.column.id, editValue);
      if (e.shiftKey) {
        focusPreviousCell(info.row.id, info.column.id);
      } else {
        focusNextCell(info.row.id, info.column.id);
      }
    }
  };

  const focusNextCell = (rowId: string, columnId: string) => {
    console.log(rowId, columnId);
    const columnsOrder = [
      "select",
      "name",
      "email",
      "status",
      "createdAt",
      "deletedAt",
      "draftedAt",
      "actions",
    ];
    const currentIndex = columnsOrder.indexOf(columnId);
    const nextColumnId = columnsOrder[currentIndex + 1] || columnsOrder[0];

    // If we're at the last column, move to first column of next row
    if (currentIndex === columnsOrder.length - 1) {
      const nextRowIndex = info.row.index + 1;
      setSelectedCell({ rowIndex: nextRowIndex, columnId: columnsOrder[0] });
    } else {
      setSelectedCell({ rowIndex: info.row.index, columnId: nextColumnId });
    }
  };

  const focusPreviousCell = (rowId: string, columnId: string) => {
    console.log(rowId, columnId);
    const columnsOrder = [
      "select",
      "name",
      "email",
      "status",
      "createdAt",
      "deletedAt",
      "draftedAt",
      "actions",
    ];
    const currentIndex = columnsOrder.indexOf(columnId);
    const prevColumnId =
      currentIndex > 0
        ? columnsOrder[currentIndex - 1]
        : columnsOrder[columnsOrder.length - 1];

    // If we're at the first column, move to last column of previous row
    if (currentIndex === 0) {
      const prevRowIndex = Math.max(0, info.row.index - 1);
      setSelectedCell({
        rowIndex: prevRowIndex,
        columnId: columnsOrder[columnsOrder.length - 1],
      });
    } else {
      setSelectedCell({ rowIndex: info.row.index, columnId: prevColumnId });
    }
  };

  const getFlagImage = (code: string) => {
    return `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
  };

  if (isEditing) {
    return (
      <>
        {/* {info.column.id === "title" && info.row.original.code && (
          <img
            src={getFlagImage(info.row.original.code) || ""}
            alt={`${info.getValue()} flag`}
            className="w-5 h-4 mr-2 object-contain"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )} */}
        <Input
          ref={inputRef}
          type={info.column.id === "email" ? "email" : "text"}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            handleEdit(info.row.id, info.column.id, editValue);
            setSelectedCell({
              rowIndex: info.row.index,
              columnId: info.column.id,
            });
          }}
          disabled={readOnly}
          className="h-full w-full border-0 outline-0 focus:ring-0 focus:border-0 p-1 bg-white dark:bg-gray-800"
        />
      </>
    );
  }

  return (
    <div className="cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] flex items-center dark:hover:bg-gray-800 truncate">
      {info.column.id === "createdAt" ||
      info.column.id === "deletedAt" ||
      info.column.id === "draftedAt" ? (
        info.getValue() ? (
          new Date(info.getValue() as string).toLocaleDateString()
        ) : (
          "—"
        )
      ) : info.column.id === "title" ? (
        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <img
            src={getFlagImage(info.row.original.code) || ""}
            alt={`${info.getValue()} flag`}
            className="w-5 h-4 object-contain flex-shrink-0"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="truncate">{info.getValue()}</span>
        </div>
      ) : info.column.id === "callingCode" || info.column.id === "code" ? (
        <div className="flex items-center justify-center w-full">
          {info.getValue()}
        </div>
      ) : (
        <div className="flex items-center justify-start">{info.getValue()}</div>
      )}
    </div>
  );
}

function StatusEditableCell({
  info,
  editingCell,
  setEditingCell,
  editValue,
  setEditValue,
  handleEdit,
  setSelectedCell,
}: {
  info: any;
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: React.Dispatch<
    React.SetStateAction<{ rowId: string; columnId: string } | null>
  >;
  editValue: any;
  setEditValue: React.Dispatch<React.SetStateAction<any>>;
  handleEdit: (rowId: string, columnId: string, value: any) => void;
  selectedCell: { rowIndex: number; columnId: string };
  setSelectedCell: React.Dispatch<
    React.SetStateAction<{ rowIndex: number; columnId: string }>
  >;
}) {
  const isEditing =
    editingCell?.rowId === info.row.id &&
    editingCell?.columnId === info.column.id;

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusColors[status as keyof typeof statusColors] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isEditing) {
    return (
      <Select
        value={editValue}
        onValueChange={(value: string) => {
          setEditValue(value);
          handleEdit(info.row.id, info.column.id, value);
        }}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setEditingCell(null);
            setSelectedCell({
              rowIndex: info.row.index,
              columnId: info.column.id,
            });
          }
        }}
      >
        <SelectTrigger className="w-full border-0 outline-0 focus:ring-0 focus:border-0 p-1 bg-transparent h-auto">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className="cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] flex items-center dark:hover:bg-gray-800">
      {getStatusBadge(info.getValue())}
    </div>
  );
}

function PaginationControls({ table }: { table: any }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [pageInputValue, setPageInputValue] = useState(
    (table.getState().pagination.pageIndex + 1).toString()
  );

  const defaultSizes = [10, 25, 50, 75];
  const moreSizes = ["All", 100, 300, 500, 750, 999];

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  // Calculate the range of items being shown
  const startItem = table.getState().pagination.pageIndex * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalRows);

  const handlePageInputChange = (value: string) => {
    setPageInputValue(value);
  };

  const handlePageInputSubmit = () => {
    const pageNumber = parseInt(pageInputValue);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      table.setPageIndex(pageNumber - 1);
    } else {
      // Reset to current page if invalid
      setPageInputValue(currentPage.toString());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePageInputSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault(); // Prevent default number input behavior

      const currentPageIndex = table.getState().pagination.pageIndex;

      if (e.key === "ArrowUp" && currentPageIndex < totalPages - 1) {
        table.setPageIndex(currentPageIndex + 1);
      } else if (e.key === "ArrowDown" && currentPageIndex > 0) {
        table.setPageIndex(currentPageIndex - 1);
      }
    }
  };

  // Update input value when page changes externally
  useEffect(() => {
    setPageInputValue(currentPage.toString());
  }, [currentPage]);

  return (
    <div className="flex items-center justify-between px-2 mt-4">
      {/* Page size buttons */}
      <div className="flex items-center space-x-2">
        {defaultSizes.map((pageSize) => (
          <Button
            key={pageSize}
            variant={
              table.getState().pagination.pageSize === pageSize
                ? "default"
                : "outline"
            }
            size="sm"
            onClick={() => table.setPageSize(Number(pageSize))}
            className={`min-w-[40px] cursor-pointer ${
              table.getState().pagination.pageSize === pageSize
                ? "bg-primary text-white border-primary hover:bg-primary"
                : "hover:text-white hover:bg-primary bg-sky-200 text-black"
            }`}
          >
            {pageSize}
          </Button>
        ))}

        {/* More page sizes popup */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="min-w-[20px] bg-sky-200 text-black border-sky-100 hover:bg-primary"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-32 p-1">
            {" "}
            {/* Reduced width and padding */}
            <div className="flex flex-col space-y-1">
              {" "}
              {/* Changed to column layout */}
              {moreSizes.map((pageSize) => (
                <Button
                  key={pageSize}
                  variant={
                    table.getState().pagination.pageSize === pageSize
                      ? "default"
                      : "ghost" // Changed to ghost for more compact look
                  }
                  size="sm"
                  onClick={() => table.setPageSize(Number(pageSize))}
                  className={`min-w-[40px] cursor-pointer ${
                    table.getState().pagination.pageSize === pageSize
                      ? "bg-primary text-white hover:bg-primary"
                      : "bg-white text-primary border-primary hover:bg-primary"
                  }`}
                >
                  {pageSize}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Data count display */}
      <div className="text-sm text-gray-600">
        Showing {startItem}-{endItem} of {totalRows}{" "}
        {totalRows === 1 ? "Country" : "Countries"}
      </div>

      {/* Pagination navigation buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="hover:text-white hover:bg-primary bg-sky-200 text-black"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="hover:text-white hover:bg-primary bg-sky-200 text-black"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <PopoverMantine
          opened={isInputFocused}
          onClose={() => {
            setIsInputFocused(false);
            handlePageInputSubmit(); // Optionally submit on close
          }}
          position="top"
          withArrow
          shadow="md"
          width={150}
          trapFocus={false}
        >
          <PopoverMantine.Target>
            <Input
              type="number"
              min="1"
              max={totalPages}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              value={pageInputValue}
              onChange={(e) => handlePageInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              onKeyDown={handleKeyDown}
              // REMOVE onBlur here
              className="w-16 h-8 text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </PopoverMantine.Target>
          <PopoverMantine.Dropdown className="p-0">
            <div
              className={`flex flex-col gap-1 ${
                totalPages > 10 ? "h-40 overflow-y-auto" : ""
              }`}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  variant={"outline"}
                  key={i + 1}
                  className="hover:bg-blue-100 px-2 py-1 rounded text-left"
                  onMouseDown={() => {
                    handlePageInputChange((i + 1).toString());
                    setIsInputFocused(false);
                  }}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </PopoverMantine.Dropdown>
        </PopoverMantine>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="hover:text-white hover:bg-primary bg-sky-200 text-black"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="hover:text-white hover:bg-primary bg-sky-200 text-black"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
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
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-primary data-[state=checked]:text-white"
      />
      {children}
    </DropdownMenuItem>
  );
}
