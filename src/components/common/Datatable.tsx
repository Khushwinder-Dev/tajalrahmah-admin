/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Grid,
  Import,
  List,
  Mic,
  MoreHorizontal,
  Search,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnFiltersState,
  flexRender,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Trash2 } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import { useDisclosure } from "@mantine/hooks";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ExportComponent } from "@/pages/Country/ListExportComponent";
import FilterComponent from "@/pages/Country/ListFilterComponent";
import ColumnVisibilityPanel from "@/pages/Country/ListVisibilityComponent";
import ImportStepper from "@/components/common/ImportStepper";
import { Modal } from "@mantine/core";

// Base types for common table functionality
export interface BaseTableRow {
  id: string;
  [key: string]: any;
}

export interface DataTableProps<T extends BaseTableRow> {
  data: T[];
  columns: any[];
  viewMode: string;
  setViewMode: (viewMode: "grid" | "list") => void;
  onDataChange?: (data: T[]) => void;
  onBulkDelete?: (selectedIds: string[]) => void;
  onBulkUpdate?: (selectedRows: T[]) => void;
  onDelete?: (id: string) => void;
  searchPlaceholder?: string;
  importTitle?: string;
  enableImport?: boolean;
  enableExport?: boolean;
  enableFilter?: boolean;
  enableColumnVisibility?: boolean;
  enableBulkActions?: boolean;
  customImportComponent?: React.ReactNode;
  customSearchIcon?: React.ReactNode;
  tableTitle?: string;
}

export default function DataTable<T extends BaseTableRow>({
  data: initialData,
  columns,
  viewMode,
  setViewMode,
  onDataChange,
  onBulkDelete,
  onBulkUpdate,
  //   onDelete,
  searchPlaceholder = "Search...",
  importTitle = "Import Data",
  enableImport = true,
  enableExport = true,
  enableFilter = true,
  enableColumnVisibility = true,
  enableBulkActions = true,
  customImportComponent,
  customSearchIcon,
  tableTitle,
}: DataTableProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnId: string;
  } | null>(null);
  const [, setEditValue] = useState<any>("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [selectedCell, setSelectedCell] = useState({
    rowIndex: -1,
    columnId: "",
  });
  const tableRef = useRef<HTMLTableElement>(null);
  const [showExport, setShowExport] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const [showVisibility, setShowVisibility] = useState(false);
  const [modalData] = useState({
    title: importTitle,
    message: customImportComponent || <ImportStepper />,
  });
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  // Update local data when initialData changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Enhanced columns with selection and actions

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
    setEditingCell(null);
  }, []);

  const isCellSelected = (rowIndex: number, columnId: string) => {
    return (
      selectedCell.rowIndex === rowIndex && selectedCell.columnId === columnId
    );
  };

  const navigateToCell = useCallback((rowIndex: number, columnId: string) => {
    setSelectedCell({ rowIndex, columnId });
    setEditingCell(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
    const tableElement = tableRef.current as HTMLTableElement;
    if (tableElement) {
      tableElement.addEventListener("keydown", handleKeyDown);
      tableElement.setAttribute("tabindex", "0");
      return () => {
        tableElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  //   const handleEdit = (rowId: string, columnId: string, value: any) => {
  //     const updatedData = data.map((row) => {
  //       if (row.id === rowId) {
  //         return { ...row, [columnId]: value };
  //       }
  //       return row;
  //     });

  //     setData(updatedData);
  //     onDataChange?.(updatedData);
  //     setEditingCell(null);

  //     const rowIndex = table
  //       .getRowModel()
  //       .rows.findIndex((row) => row.id === rowId);
  //     if (rowIndex !== -1) {
  //       setSelectedCell({ rowIndex, columnId });
  //     }

  //     setTimeout(() => {
  //       if (tableRef.current) {
  //         tableRef.current.focus();
  //       }
  //     }, 0);
  //   };

  //   const handleRowDelete = (id: string) => {
  //     if (onDelete) {
  //       onDelete(id);
  //     } else {
  //       const updatedData = data.filter((row) => row.id !== id);
  //       setData(updatedData);
  //       onDataChange?.(updatedData);
  //     }
  //   };

  const handleBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection).map(
      (idx) => data[parseInt(idx)].id
    );

    if (onBulkDelete) {
      onBulkDelete(selectedIds);
    } else {
      const updatedData = data.filter((row) => !selectedIds.includes(row.id));
      setData(updatedData);
      onDataChange?.(updatedData);
    }
    setRowSelection({});
  };

  const handleBulkUpdate = () => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    if (onBulkUpdate) {
      onBulkUpdate(selectedRows);
    }
    setRowSelection({});
  };

  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="px-4 py-3 h-full flex flex-col">
      {tableTitle && (
        <div className="pb-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {tableTitle}
          </h2>
        </div>
      )}

      <div className="pb-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left column - View toggle, Import, and Bulk actions */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="gap-2 cursor-pointer"
            >
              {viewMode === "grid" ? (
                <>
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </>
              ) : (
                <>
                  <Grid className="h-4 w-4" />
                  <span className="hidden sm:inline">Grid</span>
                </>
              )}
            </Button>

            {enableImport && (
              <Button
                variant="outline"
                className="gap-2 cursor-pointer"
                onClick={() => openModal()}
              >
                <Import className="h-4 w-4" />
                <span className="hidden sm:inline">{t("common.import")}</span>
              </Button>
            )}

            <Modal
              opened={opened}
              onClose={closeModal}
              title={importTitle}
              size="xl"
              overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
              }}
            >
              <div className="pt-5 pb-14 px-5">{modalData.message}</div>
            </Modal>

            {/* Bulk actions - only show when rows are selected */}
            {enableBulkActions && selectedRows.length > 0 && (
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
                  className="disabled:opacity-500 cursor-pointer"
                  variant="outline"
                  size="sm"
                  onClick={handleBulkUpdate}
                >
                  Bulk Edit
                </Button>
              </div>
            )}
          </div>

          {/* Middle column - Search with mic */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative flex items-center rounded-full">
                {customSearchIcon || (
                  <Search className="absolute left-3 h-4 w-4 text-gray-400 text-blue-500" />
                )}
                <Input
                  placeholder={searchPlaceholder}
                  className="pl-9 pr-9 w-full rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0"
                >
                  <Mic className="h-4 w-4  text-blue-400" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right column - Filter, Export, and Columns */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            {selectedRows.length > 0 && (
              <div>
                selected {selectedRows.length} of total {data.length}
              </div>
            )}

            {enableExport && (
              <Button
                variant="outline"
                className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
                  showExport ? "bg-blue-400 text-white" : ""
                }`}
                onClick={() => {
                  setShowExport(!showExport);
                  setShowFilter(false);
                }}
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">{t("common.export")}</span>
              </Button>
            )}

            {enableFilter && (
              <Button
                variant="outline"
                className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
                  showFilter ? "bg-blue-400 text-white" : ""
                }`}
                onClick={() => {
                  setShowFilter(!showFilter);
                  setShowExport(false);
                }}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">{t("common.filters")}</span>
              </Button>
            )}

            {enableColumnVisibility && (
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
                  showVisibility ? "bg-blue-400 text-white" : ""
                }`}
                onClick={() => setShowVisibility(true)}
              >
                Visibility
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div
              ref={tableRef}
              className="relative h-full min-w-full focus:outline-none"
              tabIndex={0}
            >
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full dark:bg-gray-900">
                  <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0"
                            style={{
                              width: header.getSize(),
                              cursor: header.column.getCanSort()
                                ? "pointer"
                                : "default",
                              backgroundColor: "inherit",
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

                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className={`group ${
                          row.getIsSelected()
                            ? "bg-gray-100 dark:bg-gray-800"
                            : ""
                        }`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className={`px-6 py-4 whitespace-nowrap ${
                              isCellSelected(row.index, cell.column.id)
                                ? "ring-2 ring-blue-500 ring-inset bg-blue-50"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                            data-row-id={row.id}
                            data-col-id={cell.column.id}
                            onClick={(e) => {
                              if (e.detail === 1) {
                                setTimeout(() => {
                                  if (e.detail === 1) {
                                    handleCellClick(row.index, cell.column.id);
                                  }
                                }, 200);
                              }
                            }}
                            onDoubleClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
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
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan={table.getAllColumns().length}
                        className="sticky bottom-0 bg-white dark:bg-gray-900 pt-2 border-t"
                      >
                        <PaginationControls table={table} />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        {enableExport && showExport && (
          <div className="w-72 flex-shrink-0 border-l bg-white dark:bg-gray-800">
            <ExportComponent
              table={table}
              allColumnsVisible={allColumnsVisible}
              setAllColumnsVisible={setAllColumnsVisible}
              setShowExport={setShowExport}
            />
          </div>
        )}

        {enableFilter && showFilter && (
          <div className="w-72 flex-shrink-0 border-l bg-white dark:bg-gray-800">
             {/* <FilterComponent table={table} setShowFilter=
            {setShowFilter} /> */}
            <FilterComponent table={table} />
          </div>
        )}

        {enableColumnVisibility && showVisibility && (
          <div className="w-72 flex-shrink-0 border-l bg-white dark:bg-gray-800">
            <ColumnVisibilityPanel
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

function PaginationControls({ table }: { table: any }) {
  const defaultSizes = [5, 10, 20];
  const moreSizes = [30, 40, 50, 100, 200];

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
            className={`min-w-[40px] ${
              table.getState().pagination.pageSize === pageSize
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white text-blue-500 border-blue-500 hover:bg-blue-600"
            }`}
          >
            {pageSize}
          </Button>
        ))}

        {/* More page sizes popup */}
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" className="min-w-[40px]">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 space-y-1">
            {moreSizes.map((pageSize) => (
              <Button
                key={pageSize}
                variant={
                  table.getState().pagination.pageSize === pageSize
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => table.setPageSize(Number(pageSize))}
                className={`w-full justify-start ${
                  table.getState().pagination.pageSize === pageSize
                    ? "bg-white text-blue-500 border-blue-500 hover:bg-white hover:text-blue-600"
                    : ""
                }`}
              >
                {pageSize}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Pagination navigation buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="px-3 py-1 text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// function DropdownMenuCheckboxItem({
//   children,
//   checked,
//   onCheckedChange,
//   ...props
// }: {
//   children: React.ReactNode;
//   checked: boolean;
//   onCheckedChange: (checked: boolean) => void;
// }) {
//   return (
//     <DropdownMenuItem
//       className="flex items-center gap-2"
//       onSelect={(e) => e.preventDefault()}
//       {...props}
//     >
//       <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
//       {children}
//     </DropdownMenuItem>
//   );
// }
