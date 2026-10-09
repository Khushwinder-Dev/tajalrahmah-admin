/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";
import { getModuleFromPath } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import {
  fixedColumnsValues,
  MOCK_TABLE_DATA,
  tableViewColumnSchema,
  type TableViewDataType,
} from "./config/ModuleLevelConfig";

export default function ComponentLevelDataTableView({
  viewMode,
  setViewMode,
  dataTableFilter,
  searchQuery,
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
  dataTableFilter: any;
  searchQuery: string;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);
  const canCreate = usePermission(detectedModule, "create");

  console.log("table view", location.pathname);

  const columnSchema: TableViewDataTableColumnConfig[] = [
    ...tableViewColumnSchema,

    // same for all module so you dont have to change this part
    { key: "createdAt", title: "Created", type: "date", readOnly: true },
    { key: "updatedAt", title: "Updated", type: "date", readOnly: true },
    { key: "draftedAt", title: "Drafted", type: "date", readOnly: true },
  ];

  const componentColumns = columnSchema.map((schema) =>
    buildColumn(schema, MOCK_TABLE_DATA, canCreate)
  );

  const filteredData = MOCK_TABLE_DATA.filter((leave) => {
    if (dataTableFilter.status === "Active") {
      return leave.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !leave.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return leave.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return leave.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return leave.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={fixedColumnsValues}
      pathName={location.pathname.split("/")[1]}
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
    />
  );
}

export type TableViewDataTableColumnConfig = {
  key: keyof TableViewDataType;
  title: string;
  type?: "string" | "number" | "date";
  size?: number;
  minSize?: number;
  readOnly?: boolean;
};

const buildColumn = (
  config: TableViewDataTableColumnConfig,
  data: any[],
  canCreate: boolean
) => {
  const {
    key,
    title,
    type = "string",
    size = 200,
    minSize = 150,
    readOnly,
  } = config;

  // Unique options for dropdown filter
  const options =
    type === "date"
      ? []
      : [...new Set(data.map((item) => item[key]).filter(Boolean))];

  // Filtering logic
  const filterFn = (row: any, columnId: string, filterValue: any) => {
    if (!filterValue || filterValue.length === 0) return true;
    const cellValue = row.getValue(columnId);

    if (type === "date") {
      if (!cellValue) return false;
      const formatted = new Date(cellValue).toISOString().split("T")[0];
      return filterValue.includes(formatted);
    }

    return filterValue.some((fv: string) =>
      String(cellValue).toLowerCase().includes(fv.toLowerCase())
    );
  };

  // Sorting logic
  const sortingFn =
    type === "date"
      ? (row1: any, row2: any) =>
          new Date(row1.getValue(key)).getTime() -
          new Date(row2.getValue(key)).getTime()
      : (row1: any, row2: any) =>
          String(row1.getValue(key)).localeCompare(String(row2.getValue(key)));

  return {
    accessorKey: key,
    title,
    options,
    filterFn,
    sortingFn,
    size,
    minSize,
    meta: {
      exportLabel: key,
      readOnly: readOnly ?? !canCreate,
    },
  };
};
