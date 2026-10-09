/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
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
import { Popover as PopoverMantine } from "@mantine/core";

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
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowDownNarrowWide,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// import { useSearchParams } from "react-router-dom";
// import ColumnVisibility from "../NewVisibiltyComponent";
import { cn } from "@/lib/utils";
import DataTableFilterComponent from "@/pages/Country/DataTableFIlterComponent";
import React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";

import { type Header, type Cell } from "@tanstack/react-table";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import useIsMobile from "@/hooks/useIsMobile";
import MobilePaginationDrawer from "@/components/MobilePaginationDrawer";

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
    // TanStack v8 Column exposes size via getSize(); avoid using non-existent `size` prop
    offset += rightStickyColumns[i].getSize();
  }
  return `${offset}px`;
}

const DraggableTableHeader = ({
  header,
  isFixed,
  fixedPosition,
  leftPosition,
  rightOffset,
}: {
  header: Header<any, unknown>;
  isFixed: boolean | undefined;
  fixedPosition?: string | undefined;
  leftPosition: number;
  rightOffset?: string;
  componentColumns: any;
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transition } =
    useSortable({
      id: header.column.id,
      disabled: isFixed,
    });

  const dragStyles: React.CSSProperties = {
    // Remove transform completely when using DragOverlay
    transform: "none",
    transition,
    opacity: isDragging ? 0.4 : 1, // Make original header semi-transparent during drag
    zIndex: isDragging ? -1 : "auto",
  };

  const fixedStyles: React.CSSProperties = isFixed
    ? {
        position: "sticky",
        ...(fixedPosition === "right"
          ? { right: rightOffset }
          : { left: `${leftPosition}px` }),
        zIndex: 30,
      }
    : {};

  return (
    <th
      ref={setNodeRef}
      style={{
        ...dragStyles,
        ...fixedStyles,
        width: `${header.getSize()}px`,
        minWidth: `${header.column.columnDef.minSize || header.getSize()}px`,
        maxWidth: `${header.column.columnDef.maxSize || "none"}`,
      }}
      className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-white! capitalize tracking-wider border-b border-gray-200 bg-[#E9F8FF] dark:bg-gray-900 transition-all duration-200 ${
        !isFixed ? "cursor-grab active:cursor-grabbing hover:bg-blue-50" : ""
      } ${isDragging ? "border-dashed border-gray-300 bg-gray-100" : ""}`}
      {...(!isFixed ? attributes : {})}
      {...(!isFixed ? listeners : {})}
    >
      <div className="flex items-center gap-2">
        {/* {!isFixed && (
          <div
            className={`p-1 ${isDragging ? "text-gray-400" : "text-gray-400"}`}
          >
            <GripVertical className="h-4 w-4" />
          </div>
        )} */}

        <div className={`flex-1 ${isDragging ? "opacity-50" : ""}`}>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>
      </div>
    </th>
  );
};

const DragAlongCell = ({
  cell,
  isFixed,
  fixedPosition,
  leftPosition,
  rightOffset,
  isCellSelected,
  rowIsSelected,
  onCellClick,
  onCellDoubleClick,
}: {
  cell: Cell<any, unknown>;
  isFixed: boolean | undefined;
  fixedPosition?: string;
  leftPosition: number;
  rightOffset?: string;
  isCellSelected: boolean;
  rowIsSelected: boolean;
  onCellClick: () => void;
  onCellDoubleClick: () => void;
}) => {
  const { isDragging, setNodeRef, transition } = useSortable({
    id: cell.column.id,
    disabled: isFixed,
  });

  const dragStyles: React.CSSProperties = {
    transform: "none", // Remove transform when using DragOverlay
    transition,
    opacity: isDragging ? 0.4 : 1, // Make cells semi-transparent during drag
  };

  const fixedStyles: React.CSSProperties = isFixed
    ? {
        position: "sticky",
        ...(fixedPosition === "right"
          ? { right: rightOffset }
          : { left: `${leftPosition}px` }),
        zIndex: 10,
      }
    : {};

  return (
    <td
      ref={setNodeRef}
      style={{
        ...dragStyles,
        ...fixedStyles,
        width: `${cell.column.getSize()}px`,
        minWidth: `${cell.column.columnDef.minSize || cell.column.getSize()}px`,
        maxWidth: `${cell.column.columnDef.maxSize || "none"}`,
      }}
      className={`px-4 py-2 whitespace-nowrap border-b border-gray-200 dark:border-gray-700 transition-all duration-200 ${
        isCellSelected ? "ring-1 ring-primary ring-inset" : ""
      } ${
        isFixed
          ? `sticky shadow-md border-b border-gray-200 dark:border-gray-700 ${
              rowIsSelected
                ? "bg-blue-50 dark:bg-gray-800"
                : "bg-white dark:bg-gray-900"
            }`
          : ""
      } ${isDragging ? "border-dashed border-gray-300 bg-gray-100" : ""}`}
      data-row-id={cell.row.id}
      data-col-id={cell.column.id}
      onClick={(e) => {
        if (e.detail === 1) {
          onCellClick();
        }
      }}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onCellDoubleClick();
      }}
    >
      <div className={isDragging ? "opacity-50" : ""}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    </td>
  );
};

export default function CommonDataTable({
  searchQuery,
  componentColumns,
  columnData,
  fixedColumns = [],
  setShowExport,
  showExport,
  setShowFilter,
  showFilter,
  setShowVisibility,
  showVisibility,
  isFilterOpen,
  setIsFilterOpen,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  componentColumns: any;
  columnData: any[];
  fixedColumns?: string[];
  searchQuery: string;
  pathName: string;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
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
  const [, setHasPendingChanges] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  //   const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();

  // Column order state for drag and drop
  const [columnOrder, setColumnOrder] = useState<string[]>(() => {
    const baseColumns = [
      "select",
      ...componentColumns.map((col: any) => col.accessorKey || col.id),
      "status",
      "actions",
    ];
    return baseColumns.filter(Boolean); // Remove any undefined values
  });

  //   const navigate = useNavigate();

  useEffect(() => {
    setData(columnData);
    setHasPendingChanges(false);
  }, [columnData]);

  const [globalFilter, setGlobalFilter] = useState<string | RegExp>("");

  useEffect(() => {
    try {
      const regex = new RegExp(searchQuery, "i");
      setGlobalFilter(regex);
    } catch {
      setGlobalFilter(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const tableContainer = tableContainerRef.current;
      if (!tableContainer) return;

      // Check if the click is outside the table container
      if (!tableContainer.contains(event.target as Node)) {
        // Clear the selected cell
        setSelectedCell({ rowIndex: -1, columnId: "" });
        // Also clear any editing cell
        setEditingCell(null);
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper function to calculate fixed column position
  const getFixedColumnPosition = useCallback(
    (accessorKey: string, columns: any[]) => {
      let position = isMobile ? 30 : 0;

      if (accessorKey === "select") return 0;
      if (accessorKey === "actions") return 0;

      const fixedColumnIndex = fixedColumns.indexOf(accessorKey);
      if (fixedColumnIndex === -1) return 0;

      for (let i = 0; i < fixedColumnIndex; i++) {
        const col = columns.find((c: any) => c.accessorKey === fixedColumns[i]);
        position += col?.size || 150;
      }

      return position;
    },
    [fixedColumns]
  );

  const columns = useMemo(() => {
    const columns: ColumnDef<any>[] = [];

    componentColumns.forEach((componentColumn: any) => {
      const isFixed = fixedColumns.includes(componentColumn.accessorKey);

      if (componentColumn.accessorKey === "status") {
        columns.push({
          accessorKey: componentColumn.accessorKey,
          header: ({ column }) => (
            <ColumnFilterHeader
              column={column}
              title={componentColumn.title}
              options={componentColumn.options}
              accessorKey={componentColumn.accessorKey}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
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
          sortingFn: componentColumn.sortingFn,
          size: componentColumn.size || 120,
          minSize: componentColumn.minSize || 80,
          meta: {
            exportLabel: componentColumn.meta?.exportLabel,
          },
        });
      } else if (componentColumn.accessorKey === "currency") {
        columns.push({
          accessorKey: componentColumn.accessorKey,
          header: ({ column }) => (
            <ColumnFilterHeader
              column={column}
              title={componentColumn.title}
              options={componentColumn.options}
              accessorKey={componentColumn.accessorKey}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          ),
          cell: (info) => (
            <CurrencyEditableCell
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
          sortingFn: componentColumn.sortingFn,
          size: componentColumn.size || 150,
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
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
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
          sortingFn: componentColumn.sortingFn,
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
      columnOrder, // Add column order state
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnOrderChange: setColumnOrder, // Add column order handler
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: (row, columnId, filterValue) => {
      if (filterValue instanceof RegExp) {
        return filterValue.test(row.getValue(columnId));
      }
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
    columnResizeMode: "onChange",
  });

  // const DragOverlayContent = ({ activeId }: { activeId: string | null }) => {
  //   if (!activeId) return null;

  //   // Find the active column
  //   const activeColumn = table
  //     .getAllColumns()
  //     .find((col) => col.id === activeId);
  //   if (!activeColumn) return null;

  //   return (
  //     <div className="bg-white shadow-2xl border-2 border-blue-300 rounded-lg overflow-hidden transform rotate-2">
  //       <div className="px-4 py-3 text-left text-xs font-semibold text-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
  //         <div className="flex items-center gap-2">
  //           <GripVertical className="h-4 w-4 text-blue-500" />
  //           <div className="flex-1">
  //             {/* Render the header content */}
  //             {activeColumn.columnDef.header &&
  //             typeof activeColumn.columnDef.header === "function"
  //               ? activeColumn.columnDef.header({ column: activeColumn } as any)
  //               : activeColumn.columnDef.header || activeId}
  //           </div>
  //         </div>
  //       </div>
  //       {/* Optional: Add a preview of some cell content */}
  //       <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">
  //         Dragging column...
  //       </div>
  //     </div>
  //   );
  // };

  const MouseFollowingDragOverlay = ({
    activeId,
  }: {
    activeId: string | null;
  }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      };

      if (activeId) {
        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
      }
    }, [activeId]);

    if (!activeId) return null;

    const activeColumn = table
      .getAllColumns()
      .find((col) => col.id === activeId);
    if (!activeColumn) return null;

    return (
      <div
        style={{
          position: "fixed",
          left: mousePosition.x - 75, // Offset to center the overlay on cursor
          top: mousePosition.y - 25, // Offset to position above cursor
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(0, 0)", // Override any DnD kit transforms
        }}
        className="bg-[#E9F8FF] shadow-2xl border-2 border-primary rounded-lg overflow-hidden transform scale-105"
      >
        <div className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-white! bg-[#E9F8FF] border-b border-blue-200">
          <div className="flex items-center gap-2">
            {/* <GripVertical className="h-4 w-4 text-blue-600 animate-pulse" /> */}
            <div className="flex-1 whitespace-nowrap">
              {activeColumn.columnDef.header &&
              typeof activeColumn.columnDef.header === "function"
                ? activeColumn.columnDef.header({ column: activeColumn } as any)
                : activeColumn.columnDef.header || activeId}
            </div>
          </div>
        </div>
        <div className="px-4 py-2 text-xs text-blue-600 bg-white font-medium min-h-[30px]">
          Drop to reorder column
        </div>
      </div>
    );
  };

  // Drag and drop handlers
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Increase distance to make it easier to trigger
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // const draggableColumnIds = useMemo(() => {
  //   const ids = columnOrder.filter((id) => {
  //     const column = table.getAllColumns().find((col) => col.id === id);
  //     const isFixed = column?.columnDef.meta?.isFixed;
  //     console.log(`Column ${id}:`, { found: !!column, isFixed });
  //     return column && !isFixed;
  //   });
  //   console.log("Draggable column IDs:", ids);
  //   return ids;
  // }, [columnOrder, table]);

  // Also debug your column order

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

  // ... (keep all your existing functions: scrollCellIntoView, navigateToCell, visibleColumnInfo, etc.)
  const scrollCellIntoView = useCallback(
    (rowIndex: number, columnId: string) => {
      const container = tableContainerRef.current;
      if (!container) return;

      const rows = table.getRowModel().rows;
      const rowId = rows[rowIndex]?.id;
      if (!rowId) return;

      const cellEl = container.querySelector<HTMLElement>(
        `td[data-row-id="${rowId}"][data-col-id="${columnId}"]`
      );
      if (!cellEl) return;

      const cRect = container.getBoundingClientRect();
      const eRect = cellEl.getBoundingClientRect();

      const allCols = table.getAllColumns();
      const targetCol = allCols.find((c) => c.id === columnId);
      const targetIsFixed = !!targetCol?.columnDef.meta?.isFixed;
      const leftOverlay = allCols
        .filter(
          (c) =>
            c.columnDef.meta?.isFixed &&
            c.columnDef.meta?.fixedPosition === "left"
        )
        .reduce((sum, c) => sum + c.getSize(), 0);
      const rightOverlay = allCols
        .filter(
          (c) =>
            c.columnDef.meta?.isFixed &&
            c.columnDef.meta?.fixedPosition === "right"
        )
        .reduce((sum, c) => sum + c.getSize(), 0);

      const thead = container.querySelector<HTMLTableSectionElement>("thead");
      const headerOverlay = thead ? thead.getBoundingClientRect().height : 0;

      const visLeft = cRect.left + leftOverlay;
      const visRight = cRect.right - rightOverlay;
      const visTop = cRect.top + headerOverlay;
      const visBottom = cRect.bottom;

      const padding = 8;

      if (!targetIsFixed) {
        if (eRect.left < visLeft) {
          const delta = visLeft - eRect.left + padding;
          container.scrollLeft -= delta;
        } else if (eRect.right > visRight) {
          const delta = eRect.right - visRight + padding;
          container.scrollLeft += delta;
        }
      }

      if (eRect.top < visTop) {
        const delta = visTop - eRect.top + padding;
        container.scrollTop -= delta;
      } else if (eRect.bottom > visBottom) {
        const delta = eRect.bottom - visBottom + padding;
        container.scrollTop += delta;
      }
    },
    [table]
  );

  const navigateToCell = useCallback(
    (rowIndex: number, columnId: string) => {
      setSelectedCell({ rowIndex, columnId });
      setEditingCell(null);
      setTimeout(() => scrollCellIntoView(rowIndex, columnId), 0);
    },
    [scrollCellIntoView]
  );

  const visibleColumnInfo = useMemo(() => {
    const columns = table.getAllColumns().filter((col) => col.getIsVisible());
    return {
      columnIds: columns.map((col) => col.id),
      columnCount: columns.length,
    };
  }, [table]);

  const rowCount = useMemo(() => table.getRowModel().rows.length, [table]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (editingCell || selectedCell.rowIndex === -1 || !selectedCell.columnId)
        return;

      const { columnIds, columnCount } = visibleColumnInfo;
      const currentRowIndex = selectedCell.rowIndex;
      const currentColumnIndex = columnIds.indexOf(selectedCell.columnId);

      if (currentColumnIndex === -1) return;

      let newRowIndex = currentRowIndex;
      let newColumnIndex = currentColumnIndex;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          newRowIndex = Math.max(0, currentRowIndex - 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          newRowIndex = Math.min(rowCount - 1, currentRowIndex + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          newColumnIndex = Math.max(0, currentColumnIndex - 1);
          break;
        case "ArrowRight":
          e.preventDefault();
          newColumnIndex = Math.min(columnCount - 1, currentColumnIndex + 1);
          break;
        case "Tab":
          e.preventDefault();
          // Move to next cell (same as right arrow)
          newColumnIndex = Math.min(columnCount - 1, currentColumnIndex + 1);
          break;
        case "PageDown":
          e.preventDefault();
          // Move to next page and maintain cursor focus
          if (table.getCanNextPage()) {
            table.nextPage();
            // Keep the same row position on the new page if possible
            const newPageRowCount = table.getRowModel().rows.length;
            newRowIndex = Math.min(currentRowIndex, newPageRowCount - 1);
            // Use setTimeout to ensure the page change is processed first
            setTimeout(() => {
              navigateToCell(newRowIndex, columnIds[currentColumnIndex]);
            }, 0);
            return;
          }
          break;
        case "PageUp":
          e.preventDefault();
          // Move to previous page and maintain cursor focus
          if (table.getCanPreviousPage()) {
            table.previousPage();
            // Keep the same row position on the new page if possible
            const newPageRowCount = table.getRowModel().rows.length;
            newRowIndex = Math.min(currentRowIndex, newPageRowCount - 1);
            // Use setTimeout to ensure the page change is processed first
            setTimeout(() => {
              navigateToCell(newRowIndex, columnIds[currentColumnIndex]);
            }, 0);
            return;
          }
          break;
        case "End":
          e.preventDefault();
          // Move to last row and last cell of current page
          newRowIndex = rowCount - 1;
          newColumnIndex = columnCount - 1;
          break;
        case "Home":
          e.preventDefault();
          // Move to first row and first cell of current page
          newRowIndex = 0;
          newColumnIndex = 0;
          break;
        case " ": // Space key
        case "Spacebar":
          e.preventDefault();
          {
            const rows = table.getRowModel().rows;
            const row = rows[currentRowIndex];
            if (row) {
              row.toggleSelected(!row.getIsSelected());
            }
          }
          return;
        case "Enter":
          e.preventDefault();
          if (
            selectedCell.columnId !== "select" &&
            selectedCell.columnId !== "actions"
          ) {
            const rows = table.getRowModel().rows;
            const rowId = rows[currentRowIndex]?.id;
            if (rowId) {
              const currentValue = rows[currentRowIndex].getValue(
                selectedCell.columnId
              );
              setEditValue(currentValue);
              setEditingCell({ rowId, columnId: selectedCell.columnId });
            }
          }
          return;
        default:
          return;
      }

      if (
        newRowIndex !== currentRowIndex ||
        newColumnIndex !== currentColumnIndex
      ) {
        navigateToCell(newRowIndex, columnIds[newColumnIndex]);
      }
    },
    [
      selectedCell,
      editingCell,
      visibleColumnInfo,
      rowCount,
      navigateToCell,
      table,
    ]
  );

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
    setHasPendingChanges(true);
    setEditingCell(null);

    const rowIndex = table
      .getRowModel()
      .rows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      setSelectedCell({ rowIndex, columnId });
    }

    setTimeout(() => {
      if (tableContainerRef.current) {
        tableContainerRef.current.focus();
      }
    }, 0);
  };

  //   const goToDetails = (id: string) => {
  //     // Check if pathName is a Google Maps coordinate AND we're in the logged-users module
  //     if (
  //       pathName.startsWith("google-maps:") &&
  //       pathName.includes("logged-users")
  //     ) {
  //       // Find the row data
  //       const rowData = data.find((item) => item.id === id);

  //       if (rowData && rowData.latitude && rowData.longitude) {
  //         const googleMapsUrl = `https://www.google.com/maps?q=${rowData.latitude},${rowData.longitude}`;
  //         window.open(googleMapsUrl, "_blank");
  //         return;
  //       }
  //     }

  //     const currentView = searchParams.get("view") || "grid";
  //     navigate(`/${pathName}/${id}?fromView=${currentView}`);
  //   };

  //   const handleBulkDelete = () => {
  //     const selectedIds = Object.keys(rowSelection).map(
  //       (idx) => data[parseInt(idx)].id
  //     );
  //     setData((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
  //     setRowSelection({});
  //   };

  //   const handleBulkUpdate = () => {
  //     const selectedRows = table.getSelectedRowModel().rows;
  //     console.log(selectedRows);
  //     setRowSelection({});
  //     setHasPendingChanges(false);
  //   };

  //   const selectedRows = table.getSelectedRowModel().rows;
  const [isPaginationDrawerOpen, setIsPaginationDrawerOpen] = useState(false);

  // Add this function before your component return statement
  const calculateTotals = (data: any[]) => {
    return data.reduce(
      (totals, row) => {
        const debit = parseFloat(row.debit || "0");
        const credit = parseFloat(row.credit || "0");

        return {
          totalDebit: totals.totalDebit + debit,
          totalCredit: totals.totalCredit + credit,
          totalBalance: totals.totalBalance + (credit - debit),
        };
      },
      { totalDebit: 0, totalCredit: 0, totalBalance: 0 }
    );
  };

  const totals = calculateTotals(data);

  return (
    // Wrap everything in DndContext - NOTE: This should be outside the table element
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
      }}
      onDragEnd={(event) => {
        setActiveId(null);
        handleDragEnd(event);
      }}
      onDragCancel={() => {
        setActiveId(null);
      }}
      sensors={sensors}
      onDragOver={(event) => {
        handleDragEnd(event);
      }}
    >
      <div
        className={`h-full flex flex-col ${
          isMobile ? "px-2 py-1" : "px-4 py-1"
        }`}
      >
        {/* Header Controls - Fixed height */}
        {/* {(selectedRows.length > 0 || hasPendingChanges) && (
          <div
            className={`pb-4 ${
              isMobile
                ? "h-auto min-h-[60px] flex flex-col gap-2 max-[400px]:flex-col min-[401px]:flex-row min-[401px]:items-center min-[401px]:justify-between"
                : "h-[50px] grid grid-cols-2"
            }`}
          >
            <div
              className={`${
                isMobile
                  ? "flex flex-col items-center gap-2 max-[400px]:flex-col max-[400px]:items-center min-[401px]:flex-row min-[401px]:items-center min-[401px]:flex-nowrap min-[401px]:gap-2"
                  : "flex items-center space-x-2 ml-2"
              }`}
            >
              <div className="flex items-center gap-2">
                {selectedRows.length > 0 && (
                  <Button
                    className={`disabled:opacity-500 cursor-pointer text-red-600 ${
                      isMobile ? "text-xs px-2 py-1 h-7 w-fit" : ""
                    }`}
                    variant="outline"
                    size={isMobile ? "sm" : "sm"}
                    onClick={handleBulkDelete}
                  >
                    Bulk Delete
                  </Button>
                )}

                {hasPendingChanges && (
                  <Button
                    className={`disabled:opacity-500 cursor-pointer hover:bg-primary rounded-full ${
                      isMobile ? "text-xs px-2 py-1 h-7 w-fit" : ""
                    }`}
                    variant="outline"
                    size={isMobile ? "sm" : "sm"}
                    onClick={handleBulkUpdate}
                  >
                    Bulk Update
                  </Button>
                )}
              </div>

              {selectedRows.length > 0 && (
                <div
                  className={
                    isMobile
                      ? "text-sm text-gray-600 dark:text-white! text-center"
                      : ""
                  }
                >
                  Selected {selectedRows.length} of total {data.length}
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-2"></div>
          </div>
        )} */}

        {/* Main Content Area - Flexible height */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Table Container - Takes remaining space */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Table with scrollable body */}
            <div
              ref={tableContainerRef}
              className={`
    flex-1 focus:outline-none border border-gray-200 rounded-lg min-h-0 
    overflow-x-auto overflow-y-scroll grid-scroll! 
    bg-[#fafafa] dark:bg-gray-800
    [&::-webkit-scrollbar]:!w-1.5 
    [&::-webkit-scrollbar]:!h-1.5 
    [&::-webkit-scrollbar-track]:!bg-white 
dark:[&::-webkit-scrollbar-track]:!bg-gray-800 
    [&::-webkit-scrollbar-track]:!border-t 
    [&::-webkit-scrollbar-track]:!border-b 
    [&::-webkit-scrollbar-track]:!border-gray-300 
    [&::-webkit-scrollbar-track]:!mt-12 
    [&::-webkit-scrollbar-track]:!ml-40 
    [&::-webkit-scrollbar-thumb]:!bg-[#20b7fa] 
    [&::-webkit-scrollbar-thumb]:!rounded-full 
    [&::-webkit-scrollbar-thumb:hover]:!bg-[#1a9ee6]`}
              tabIndex={0}
              style={{
                height: isMobile
                  ? "calc(100vh - 200px)"
                  : "calc(100vh - 100px)",
                minHeight: "200px",
              }}
            >
              <table
                className="w-full border-collapse"
                style={{ tableLayout: "fixed" }}
              >
                <thead className="bg-[#E9F8FF] dark:bg-gray-900 sticky top-0 z-20">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      <SortableContext
                        items={headerGroup.headers.map(
                          (header) => header.column.id
                        )} // Use actual rendered headers
                        strategy={horizontalListSortingStrategy}
                      >
                        {headerGroup.headers.map((header) => {
                          const isFixed = header.column.columnDef.meta?.isFixed;
                          const fixedPosition =
                            header.column.columnDef.meta?.fixedPosition;
                          const leftPosition = getFixedColumnPosition(
                            header.id,
                            componentColumns
                          );
                          const rightOffset =
                            isFixed && fixedPosition === "right"
                              ? getStickyRightOffset(
                                  header.column.id,
                                  table.getAllColumns()
                                )
                              : undefined;

                          return (
                            <DraggableTableHeader
                              key={header.id}
                              header={header}
                              isFixed={isFixed}
                              fixedPosition={fixedPosition}
                              leftPosition={leftPosition}
                              rightOffset={rightOffset}
                              componentColumns={componentColumns}
                              isFilterOpen={isFilterOpen}
                              setIsFilterOpen={setIsFilterOpen}
                            />
                          );
                        })}
                      </SortableContext>
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 overflow-y-auto">
                  {table.getRowModel().rows.length > 0 ? (
                    <>
                      {/* Regular data rows */}
                      {table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          className={cn(
                            "group/cell hover:bg-gray-50 dark:hover:bg-gray-800",
                            row.getIsSelected()
                              ? "bg-blue-50 hover:bg-blue-50 dark:bg-gray-800"
                              : ""
                          )}
                        >
                          {/* Your existing row cell mapping */}
                          <SortableContext
                            items={row
                              .getVisibleCells()
                              .map((cell) => cell.column.id)}
                            strategy={horizontalListSortingStrategy}
                          >
                            {row.getVisibleCells().map((cell) => {
                              // Your existing cell rendering logic
                              const isFixed =
                                cell.column.columnDef.meta?.isFixed;
                              const fixedPosition =
                                cell.column.columnDef.meta?.fixedPosition;
                              const leftPosition = getFixedColumnPosition(
                                cell.column.id,
                                componentColumns
                              );
                              const rightOffset =
                                isFixed && fixedPosition === "right"
                                  ? getStickyRightOffset(
                                      cell.column.id,
                                      table.getAllColumns()
                                    )
                                  : undefined;

                              return (
                                <DragAlongCell
                                  key={cell.id}
                                  cell={cell}
                                  isFixed={isFixed}
                                  fixedPosition={fixedPosition}
                                  leftPosition={leftPosition}
                                  rightOffset={rightOffset}
                                  isCellSelected={isCellSelected(
                                    row.index,
                                    cell.column.id
                                  )}
                                  rowIsSelected={row.getIsSelected()}
                                  onCellClick={() =>
                                    handleCellClick(row.index, cell.column.id)
                                  }
                                  onCellDoubleClick={() => {
                                    if (
                                      cell.column.id !== "select" &&
                                      cell.column.id !== "actions"
                                    ) {
                                      setSelectedCell({
                                        rowIndex: row.index,
                                        columnId: cell.column.id,
                                      });
                                      setEditValue(
                                        row.getValue(cell.column.id)
                                      );
                                      setEditingCell({
                                        rowId: row.id,
                                        columnId: cell.column.id,
                                      });
                                    }
                                  }}
                                />
                              );
                            })}
                          </SortableContext>
                        </tr>
                      ))}

                      {/* Totals Row */}
                      <tr className="bg-gray-100 dark:bg-gray-700 border-t-2 border-gray-300 dark:border-gray-600 font-bold">
                        {table.getAllColumns().map((column) => {
                          const columnId = column.id;
                          const isFixed = column.columnDef.meta?.isFixed;
                          const fixedPosition =
                            column.columnDef.meta?.fixedPosition;
                          const leftPosition = getFixedColumnPosition(
                            columnId,
                            componentColumns
                          );
                          const rightOffset =
                            isFixed && fixedPosition === "right"
                              ? getStickyRightOffset(
                                  columnId,
                                  table.getAllColumns()
                                )
                              : undefined;

                          // Determine cell content based on column
                          let cellContent = "";
                          if (columnId === "documentNo") {
                            cellContent = "Total";
                          } else if (columnId === "debit") {
                            cellContent = `৳${totals.totalDebit.toFixed(2)}`;
                          } else if (columnId === "credit") {
                            cellContent = `৳${totals.totalCredit.toFixed(2)}`;
                          } else if (columnId === "balance") {
                            cellContent = `৳${totals.totalBalance.toFixed(2)}`;
                          }

                          return (
                            <td
                              key={columnId}
                              className={cn(
                                "px-3 py-2 text-sm border-r border-gray-200 dark:border-gray-600",
                                isFixed &&
                                  fixedPosition === "left" &&
                                  "sticky bg-gray-100 dark:bg-gray-700 z-10",
                                isFixed &&
                                  fixedPosition === "right" &&
                                  "sticky bg-gray-100 dark:bg-gray-700 z-10",
                                columnId === "balance" &&
                                  totals.totalBalance < 0 &&
                                  "text-red-600 dark:text-red-400",
                                columnId === "balance" &&
                                  totals.totalBalance >= 0 &&
                                  "text-green-600 dark:text-green-400",
                                columnId === "debit" &&
                                  "text-red-600 dark:text-red-400",
                                columnId === "credit" &&
                                  "text-green-600 dark:text-green-400"
                              )}
                              style={{
                                left:
                                  isFixed && fixedPosition === "left"
                                    ? leftPosition
                                    : undefined,
                                right:
                                  isFixed && fixedPosition === "right"
                                    ? rightOffset
                                    : undefined,
                                width: column.getSize(),
                                minWidth: column.columnDef.minSize,
                                maxWidth: column.columnDef.maxSize,
                              }}
                            >
                              <div className="truncate font-semibold">
                                {cellContent}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    </>
                  ) : (
                    // Your existing empty state
                    <tr>
                      <td
                        colSpan={table.getAllColumns().length}
                        className="px-6 py-12"
                      >
                        <div className="flex flex-col items-center justify-start text-center bg-white rounded-lg min-h-[400px]">
                          <div className="text-gray-400 dark:text-white! mb-4">
                            <svg
                              className="w-16 h-16 mx-auto"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white! mb-2">
                            No data available
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                            There are no records to display at the moment.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer - Fixed at bottom */}
            <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t">
              <PaginationControls
                table={table}
                isPaginationDrawerOpen={isPaginationDrawerOpen}
                setIsPaginationDrawerOpen={setIsPaginationDrawerOpen}
              />
            </div>
          </div>

          {/* Mobile Pagination Drawer */}
          <MobilePaginationDrawer
            isOpen={isPaginationDrawerOpen}
            onClose={() => setIsPaginationDrawerOpen(false)}
            table={table}
          />

          {/* Side Panels */}
          {(showFilter || showVisibility || showExport) && (
            <div
              className={`w-80 flex-shrink-0 bg-white dark:bg-gray-800 ${
                isMobile ? "w-full" : "p-4"
              }`}
            >
              <DataTableFilterComponent
                table={table}
                columnOrder={columnOrder}
                setShowFilter={setShowFilter}
                setShowVisibility={setShowVisibility}
                allColumnsVisible={allColumnsVisible}
                setAllColumnsVisible={setAllColumnsVisible}
                setShowExport={setShowExport}
                activeTab={
                  showFilter
                    ? "filter"
                    : showExport
                    ? "export"
                    : showVisibility
                    ? "visibility"
                    : "filter"
                }
              />
            </div>
          )}
        </div>
      </div>
      <MouseFollowingDragOverlay activeId={activeId} />
    </DndContext>
  );
}

// Updated ColumnFilterHeader component
function ColumnFilterHeader({
  column,
  title,
  options,
}: {
  column: any;
  title: string;
  options: any[];
  accessorKey: string;
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentFilter = column.getFilterValue();
  const sortDirection = column.getIsSorted();

  useEffect(() => {
    if (currentFilter && Array.isArray(currentFilter)) {
      setSelectedOptions(currentFilter);
    }
  }, [currentFilter]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

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
    setIsOpen(false);
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

  const handleSelectAll = () => {
    if (selectedOptions.length === filteredOptions.length) {
      setSelectedOptions([]);
      column.setFilterValue(undefined);
    } else {
      const allOptions = filteredOptions.map((o) => o.toString());
      setSelectedOptions(allOptions);
      column.setFilterValue(allOptions);
    }
  };

  return (
    <div className="flex items-center gap-1 group/header justify-between min-w-[150px]">
      <div className="flex-1 flex items-center justify-start text-gray-800 dark:text-white! pr-2">
        <span className="truncate">{title}</span>
      </div>

      <div className="items-center gap-1 group-hover/header:flex flex">
        <button
          onClick={toggleSorting}
          className={`p-1 rounded transition-opacity flex-shrink-0 ${
            sortDirection
              ? "opacity-100 bg-blue-100 text-primary"
              : "opacity-0 group-hover/header:opacity-100 text-gray-800 dark:text-white! hover:bg-gray-100"
          }`}
        >
          {sortDirection === "asc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : sortDirection === "desc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDownNarrowWide className="h-4 w-4" />
          )}
        </button>

        <div
          className="flex-shrink-0 opacity-0 group-hover/header:opacity-100 transition-opacity relative"
          ref={dropdownRef}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`h-6 w-6 p-0 rounded hover:bg-gray-100 flex items-center justify-center ${
              selectedOptions.length > 0
                ? "text-blue-600"
                : "text-gray-800 dark:text-white!"
            }`}
          >
            <Filter className="h-3 w-3 cursor-pointer" />
          </button>

          {isOpen && (
            <div className="absolute top-8 left-0 z-5000 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="p-2">
                <Input
                  placeholder={`Search ${title}`}
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="h-8 text-gray-800 dark:text-white!"
                />
              </div>

              <div className="border-t border-gray-200"></div>

              {/* Select All */}
              <div
                className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100 text-gray-800 dark:text-white!"
                onClick={handleSelectAll}
              >
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center ${
                    selectedOptions.length === filteredOptions.length &&
                    filteredOptions.length > 0
                      ? "bg-white border-gray-500"
                      : "bg-white border-gray-500"
                  }`}
                >
                  {selectedOptions.length === filteredOptions.length &&
                    filteredOptions.length > 0 && (
                      <svg
                        className="w-3 h-3 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                </div>
                <span>Select All</span>
              </div>

              {/* Options List */}
              <div className="max-h-60 overflow-y-auto grid-scroll">
                {filteredOptions.map((option) => {
                  const isChecked = selectedOptions.includes(option.toString());
                  return (
                    <div
                      key={option}
                      className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100 text-gray-800 dark:text-white!"
                      onClick={() => handleOptionToggle(option.toString())}
                    >
                      <div
                        className={`w-4 h-4 border rounded flex items-center justify-center ${
                          isChecked
                            ? "bg-white border-gray-500"
                            : "bg-white border-gray-500"
                        }`}
                      >
                        {isChecked && (
                          <svg
                            className="w-3 h-3 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  );
                })}
              </div>

              {/* Clear Filter */}
              {selectedOptions.length > 0 && (
                <>
                  <div className="border-t border-gray-200"></div>
                  <div
                    className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100 text-red-600"
                    onClick={clearFilter}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reset
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
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
  const [hasError, setHasError] = useState(false);

  const isEditing =
    editingCell?.rowId === info.row.id &&
    editingCell?.columnId === info.column.id;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      setHasError(false); // Reset error when starting to edit
    }
  }, [isEditing]);

  // Validation function
  const validateValue = (columnId: string, value: any): boolean => {
    if (columnId === "code") {
      return value && value.toString().length === 3;
    } else if (columnId === "title") {
      if (!value || value.toString().trim() === "") return false;
      const titleStr = value.toString().trim();
      // Check if it contains only letters (no numbers or special characters)
      const lettersOnlyRegex = /^[a-zA-Z\s]+$/;
      if (!lettersOnlyRegex.test(titleStr)) return false;
      // Check if first letter is capitalized and follows proper case
      const properCaseRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
      return properCaseRegex.test(titleStr);
    }
    // Add more validation rules here as needed
    return true; // Default: no validation error
  };

  const handleSave = () => {
    const isValid = validateValue(info.column.id, editValue);

    if (isValid) {
      setHasError(false);
      handleEdit(info.row.id, info.column.id, editValue);
      setEditingCell(null); // Exit editing mode
      setSelectedCell({ rowIndex: info.row.index, columnId: info.column.id });
    } else {
      setHasError(true);
      // Keep editing mode active when there's an error
      // Don't call setEditingCell(null) here
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation(); // Prevent table navigation while editing

    if (e.key === "Enter") {
      handleSave();
      return; // Don't continue processing if Enter was pressed
    }
    if (e.key === "Escape") {
      setHasError(false);
      setEditingCell(null);
      setSelectedCell({ rowIndex: info.row.index, columnId: info.column.id });
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const isValid = validateValue(info.column.id, editValue);

      if (isValid) {
        setHasError(false);
        handleEdit(info.row.id, info.column.id, editValue);
        setEditingCell(null); // Exit editing mode
        if (e.shiftKey) {
          focusPreviousCell(info.row.id, info.column.id);
        } else {
          focusNextCell(info.row.id, info.column.id);
        }
      } else {
        setHasError(true);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }
  };

  const focusNextCell = (rowId: string, columnId: string) => {
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

    if (currentIndex === columnsOrder.length - 1) {
      const nextRowIndex = info.row.index + 1;
      setSelectedCell({ rowIndex: nextRowIndex, columnId: columnsOrder[0] });
    } else {
      setSelectedCell({ rowIndex: info.row.index, columnId: nextColumnId });
    }
  };

  const focusPreviousCell = (rowId: string, columnId: string) => {
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
    if (!code) return "";
    return `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
  };

  if (isEditing) {
    return (
      <>
        <Input
          ref={inputRef}
          type={info.column.id === "email" ? "email" : "text"}
          value={editValue}
          onChange={(e) => {
            setEditValue(e.target.value);
            // Clear error when user starts typing
            if (hasError) {
              setHasError(false);
            }
          }}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          readOnly={readOnly}
          className={cn(
            "h-full w-full outline-0 focus:ring-0 p-1 bg-white dark:bg-gray-800 dark:text-white",
            hasError
              ? "focus-visible:ring-0 border-2 border-red-500 focus:border-red-500"
              : "border-0 focus:border-0",
            readOnly
              ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed border-none ring-0 focus-visible:ring-0"
              : ""
          )}
        />
      </>
    );
  }

  return (
    <div className="cursor-pointer p-1 rounded min-h-[32px] flex items-center truncate dark:text-white">
      {info.column.id === "createdAt" ||
      info.column.id === "updatedAt" ||
      info.column.id === "deletedAt" ||
      info.column.id === "draftedAt" ? (
        info.getValue() ? (
          new Date(info.getValue() as string)
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-")
        ) : (
          "—"
        )
      ) : info.column.id === "name" ? (
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
        <div className="flex items-center justify-start w-full dark:text-white">
          {info.getValue()}
        </div>
      ) : (
        <div className="flex items-center justify-start dark:text-white">
          {info.getValue()}
        </div>
      )}
    </div>
  );
}

function StatusEditableCell({
  info,
}: // editingCell,
// setEditingCell,
// editValue,
// setEditValue,
// handleEdit,
// setSelectedCell,
{
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
  // const isEditing =
  //   editingCell?.rowId === info.row.id &&
  //   editingCell?.columnId === info.column.id;

  // const statusOptions = [
  //   { value: "active", label: "Active" },
  //   { value: "inactive", label: "Inactive" },
  //   { value: "draft", label: "Draft" },
  //   { value: "deleted", label: "Delete" },
  // ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      draft: "bg-blue-100 text-blue-800",
      deleted: "bg-gray-100 text-gray-800 dark:text-white!",
    };

    return (
      <span
        className={`inline-flex items-center px-1.5 py-1.5 rounded-full text-xs font-medium ${
          statusColors[status as keyof typeof statusColors] ||
          "bg-gray-100 text-gray-800 dark:text-white!"
        }`}
      >
        {status?.charAt(0)?.toUpperCase() + status?.slice(1) || ""}
      </span>
    );
  };

  // if (isEditing) {
  //   return (
  //     <Select
  //       value={
  //         typeof editValue === "string" && editValue !== ""
  //           ? editValue
  //           : info.row.original.status ?? ""
  //       }
  //       onValueChange={(value: string) => {
  //         setEditValue(value);
  //         handleEdit(info.row.id, info.column.id, value);
  //       }}
  //       onOpenChange={(open: boolean) => {
  //         if (!open) {
  //           setEditingCell(null);
  //           setSelectedCell({
  //             rowIndex: info.row.index,
  //             columnId: info.column.id,
  //           });
  //         }
  //       }}
  //       open={true} // Force the select to be open
  //       defaultOpen={true} // Ensure it opens by default
  //     >
  //       <SelectTrigger className="w-full border-2 border-primary items-center justify-center bg-blue-50 outline-0 focus:ring-0 focus:border-primary p-1 h-auto">
  //         <SelectValue placeholder="" />
  //       </SelectTrigger>
  //       <SelectContent>
  //         {statusOptions.map((option) => (
  //           <SelectItem key={option.value} value={option.value}>
  //             {option.label}
  //           </SelectItem>
  //         ))}
  //       </SelectContent>
  //     </Select>
  //   );
  // }

  const statusValue = info.row.original.status;

  return (
    <div className="cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] flex items-center dark:hover:bg-gray-800 justify-center">
      {getStatusBadge(statusValue)}
    </div>
  );
}

function CurrencyEditableCell({
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
  const [isOpen, setIsOpen] = useState(false);

  const isEditing =
    editingCell?.rowId === info.row.id &&
    editingCell?.columnId === info.column.id;

  // Auto-open dropdown when editing starts
  useEffect(() => {
    if (isEditing) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isEditing]);

  // Dummy currency options (>10 items to demonstrate scroll) with country codes
  const currencyOptions: {
    value: string;
    label: string;
    countryCode: string;
  }[] = [
    { value: "USD", label: "USD", countryCode: "US" },
    { value: "EUR", label: "EUR", countryCode: "EU" },
    { value: "GBP", label: "GBP", countryCode: "GB" },
    { value: "JPY", label: "JPY", countryCode: "JP" },
    { value: "AUD", label: "AUD", countryCode: "AU" },
    { value: "CAD", label: "CAD", countryCode: "CA" },
    { value: "CHF", label: "CHF", countryCode: "CH" },
    { value: "CNY", label: "CNY", countryCode: "CN" },
    { value: "INR", label: "INR", countryCode: "IN" },
    { value: "BRL", label: "BRL", countryCode: "BR" },
    { value: "ZAR", label: "ZAR", countryCode: "ZA" },
    { value: "NZD", label: "NZD", countryCode: "NZ" },
    { value: "SEK", label: "SEK", countryCode: "SE" },
    { value: "NOK", label: "NOK", countryCode: "NO" },
    { value: "DKK", label: "DKK", countryCode: "DK" },
  ];

  // If readOnly, always render non-editable view
  if (readOnly) {
    const currencyValue = (
      info.getValue?.() ??
      info.row.original?.currency ??
      ""
    ).toString();
    return (
      <div className="cursor-default p-1 rounded min-h-[32px] flex items-center justify-center">
        {currencyValue}
      </div>
    );
  }

  if (isEditing) {
    return (
      <Select
        open={isOpen}
        value={
          typeof editValue === "string" && editValue !== ""
            ? editValue
            : (
                info.getValue?.() ??
                info.row.original?.currency ??
                ""
              ).toString()
        }
        onValueChange={(value: string) => {
          setEditValue(value);
          handleEdit(info.row.id, info.column.id, value);
          setIsOpen(false);
        }}
        onOpenChange={(open: boolean) => {
          setIsOpen(open);
          if (!open) {
            setEditingCell(null);
            setSelectedCell({
              rowIndex: info.row.index,
              columnId: info.column.id,
            });
          }
        }}
      >
        <SelectTrigger className="w-[170px]">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent className="min-h-[200px] max-h-[300px] w-[170px] overflow-y-auto">
          <div className="max-h-[280px] overflow-y-scroll grid-scroll">
            {currencyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">
                    <img
                      height={16}
                      width={16}
                      src={`https://flagcdn.com/${option.countryCode.toLowerCase()}.svg`}
                      alt={`${option.countryCode} flag`}
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://flagcdn.com/us.svg`;
                      }}
                    />
                  </span>
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    );
  }

  const currencyValue = (
    info.getValue?.() ??
    info.row.original?.currency ??
    ""
  ).toString();

  const selectedMeta = currencyOptions.find((o) => o.value === currencyValue);
  return (
    <div className="cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] flex items-center dark:hover:bg-gray-800 dark:text-white justify-start gap-2">
      {selectedMeta ? (
        <>
          <span className="text-lg leading-none">
            <img
              height={24}
              width={24}
              src={`https://flagcdn.com/${selectedMeta.countryCode.toLowerCase()}.svg`}
              alt={`${selectedMeta.countryCode} flag`}
              onError={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `https://flagcdn.com/us.svg`;
              }}
            />
          </span>
          <span>{currencyValue}</span>
        </>
      ) : (
        <span>{currencyValue}</span>
      )}
    </div>
  );
}

function PaginationControls({
  table,
  setIsPaginationDrawerOpen,
}: {
  table: any;
  isPaginationDrawerOpen: boolean;
  setIsPaginationDrawerOpen: (isOpen: boolean) => void;
}) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [pageInputValue, setPageInputValue] = useState(
    (table.getState().pagination.pageIndex + 1).toString()
  );
  const [customPageSize, setCustomPageSize] = useState("");
  const pageInputRef = useRef<HTMLInputElement>(null);

  const defaultSizes = [10, 25, 50, 75];
  const moreSizes = [100, 300, 500, 750, 999];

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

  const handleCustomPageSizeSubmit = () => {
    const size = parseInt(customPageSize);
    if (!size) return;
    if (size > 0 && size <= totalRows) {
      table.setPageSize(size);
    }
    setCustomPageSize("");
  };

  const handleCustomPageSizeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCustomPageSizeSubmit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePageInputSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();

      const currentPageIndex = table.getState().pagination.pageIndex;

      if (e.key === "ArrowUp" && currentPageIndex < totalPages - 1) {
        table.setPageIndex(currentPageIndex + 1);
      } else if (e.key === "ArrowDown" && currentPageIndex > 0) {
        table.setPageIndex(currentPageIndex - 1);
      }
    }
  };

  const handlePageInputFocus = () => {
    setIsInputFocused(true);
    // Select all text when input is focused
    setTimeout(() => {
      pageInputRef.current?.select();
    }, 0);
  };

  const handlePageInputBlur = () => {
    setIsInputFocused(false);
    handlePageInputSubmit(); // Update pagination when clicking outside
  };

  // Update input value when page changes externally
  useEffect(() => {
    setPageInputValue(currentPage.toString());
  }, [currentPage]);

  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <div className="mb-20 mt-2 text-right flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-white!">
            Showing {startItem}-{endItem} of {totalRows}{" "}
            {totalRows === 1 ? "Country" : "Countries"}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPaginationDrawerOpen(true)}
          >
            Paginations
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-2 mt-4">
          {/* Page size buttons */}
          <div className="flex items-center space-x-2">
            {defaultSizes.map((pageSize) => (
              <Button
                key={pageSize}
                variant={
                  table.getState().pagination.pageSize === pageSize
                    ? "default"
                    : "default"
                }
                size="sm"
                onClick={() => table.setPageSize(Number(pageSize))}
                className={`min-w-[60px] cursor-pointer border border-sky-300 ${
                  table.getState().pagination.pageSize === pageSize
                    ? "bg-primary text-white border-primary hover:bg-primary dark:bg-gray-900 dark:text-white"
                    : "hover:text-white hover:bg-primary bg-white dark:bg-gray-800 dark:text-white text-sky-500!"
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
                  variant="default"
                  className="min-w-[60px] border border-sky-300! bg-white hover:bg-primary text-sky-500! dark:bg-gray-800 dark:text-white"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 p-2 bg-[#E9F8FF]">
                <div className="flex flex-col space-y-2">
                  {/* All option */}
                  <Button
                    variant={
                      table.getState().pagination.pageSize >= totalRows
                        ? "default"
                        : "ghost"
                    }
                    size="sm"
                    onClick={() => table.setPageSize(totalRows)}
                    className={`min-w-[40px] cursor-pointer ${
                      table.getState().pagination.pageSize >= totalRows
                        ? "bg-primary text-white hover:bg-primary"
                        : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    All
                  </Button>

                  {/* More size buttons - in reverse order (100 down, then up) */}
                  {moreSizes.reverse().map((pageSize) => (
                    <Button
                      key={pageSize}
                      variant={
                        table.getState().pagination.pageSize === pageSize
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      onClick={() => table.setPageSize(Number(pageSize))}
                      className={`min-w-[40px] cursor-pointer ${
                        table.getState().pagination.pageSize === pageSize
                          ? "bg-primary text-white hover:bg-primary"
                          : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
                      }`}
                    >
                      {pageSize}
                    </Button>
                  ))}

                  {/* Custom page size input at the top */}
                  <Input
                    type="number"
                    placeholder="Custom"
                    value={customPageSize}
                    onChange={(e) => setCustomPageSize(e.target.value)}
                    onKeyPress={handleCustomPageSizeKeyPress}
                    onBlur={handleCustomPageSizeSubmit}
                    className="w-full  bg-sky-50 h-7 text-xs text-center text-sky-400! placeholder:text-sky-400! border-sky-300"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Data count display */}
          <div className="text-sm text-gray-600 dark:text-white!">
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
              }}
              position="top"
              withArrow
              shadow="md"
              width={150}
              trapFocus={false}
            >
              <PopoverMantine.Target>
                <Input
                  ref={pageInputRef}
                  type="number"
                  min="1"
                  max={totalPages}
                  onFocus={handlePageInputFocus}
                  onBlur={handlePageInputBlur}
                  value={pageInputValue}
                  onChange={(e) => handlePageInputChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onKeyDown={handleKeyDown}
                  className="w-16 h-8 text-center border-sky-200 bg-sky-50 text-sky-500"
                />
              </PopoverMantine.Target>
              <PopoverMantine.Dropdown className="p-2 bg-[#E9F8FF]!">
                <div
                  className={`flex flex-col gap-1 ${
                    totalPages > 7
                      ? "max-h-[200px] overflow-y-auto grid-scroll"
                      : ""
                  }`}
                  style={{ maxHeight: totalPages > 7 ? "200px" : "auto" }}
                >
                  {Array.from(
                    { length: totalPages },
                    (_, i) => totalPages - i
                  ).map((pageNum) => (
                    <div
                      key={pageNum}
                      className="text-sky-600 my-1 px-2 py-1 rounded-[12px] text-center cursor-pointer"
                      onClick={() => {
                        handlePageInputChange(pageNum.toString());
                        setIsInputFocused(false);
                        table.setPageIndex(pageNum - 1); // Set the page directly
                      }}
                    >
                      {pageNum}
                    </div>
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
      )}
    </>
  );
}
