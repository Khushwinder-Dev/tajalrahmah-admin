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
import { useState } from "react";
import EnglishDate from "@/components/EnglishDateInput";
import { Autocomplete } from "@/components/common/Autocomplete";
import { cn } from "@/lib/utils";

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
}) {
  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);
  const canCreate = usePermission(detectedModule, "create");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [filterData, setFilterData] = useState({
    fromDate: "",
    toDate: "",
    customer: "",
    project: "",
    branch: "",
    status: "",
  });

  // Sample options for autocomplete fields
  const customerOptions = [
    "ABC Corporation Ltd.",
    "XYZ Industries",
    "Tech Solutions Inc.",
    "Digital Marketing Pro",
    "Global Services Ltd.",
    "Innovation Hub",
    "Creative Agency",
    "Business Partners",
  ];

  const projectOptions = [
    "Managing Directior",
    "Human Resource Management",
    "Department Head",
    "Digital Marketing Campaign",
    "Database Migration",
    "Cloud Infrastructure",
    "Security Audit",
    "System Integration",
  ];

  const branchOptions = [
    "Mark Taylor",
    "Abu Daud",
    "Mr Alisson",
    "Tafsir Bin Hamid",
  ];

  // const statusOptions = [
  //   { value: "", label: "All Status" },
  //   { value: "Active", label: "Active" },
  //   { value: "Inactive", label: "Inactive" },
  //   { value: "Draft", label: "Draft" },
  //   { value: "Completed", label: "Completed" },
  //   { value: "Pending", label: "Pending" },
  // ];

  const columnSchema: TableViewDataTableColumnConfig[] = [
    ...tableViewColumnSchema,
    { key: "createdAt", title: "Created", type: "date", readOnly: true },
    { key: "updatedAt", title: "Updated", type: "date", readOnly: true },
    { key: "draftedAt", title: "Drafted", type: "date", readOnly: true },
  ];

  const componentColumns = columnSchema.map((schema) =>
    buildColumn(schema, MOCK_TABLE_DATA, canCreate)
  );

  // Apply filters to data
  const filteredData = MOCK_TABLE_DATA.filter((item) => {
    // Apply date filters
    if (filterData.fromDate && item.documentDate < filterData.fromDate) {
      return false;
    }
    if (filterData.toDate && item.documentDate > filterData.toDate) {
      return false;
    }

    // Apply customer filter
    if (
      filterData.customer &&
      !item.narration.toLowerCase().includes(filterData.customer.toLowerCase())
    ) {
      return false;
    }

    // Apply project filter
    if (
      filterData.project &&
      !item.narration.toLowerCase().includes(filterData.project.toLowerCase())
    ) {
      return false;
    }

    // Apply branch filter
    if (
      filterData.branch &&
      !item.narration.toLowerCase().includes(filterData.branch.toLowerCase())
    ) {
      return false;
    }

    // Apply existing status filters
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return item.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.isUpdated;
    }

    return true;
  });

  return (
    <div className="space-y-2">
      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="space-y-2">
          {/* Single Row - All Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-4">
            {/* From Date - 2 columns */}
            <div className="col-span-2 ">
              <EnglishDate
                isDate={true}
                calendarType="gregorian"
                userLang="en"
                rtl={false}
                value={filterData.fromDate}
                onChange={(date: string) =>
                  setFilterData({ ...filterData, fromDate: date })
                }
                disabled={false}
                labelText="From Date"
                className={cn("transition-all", "ring-1 ring-primary")}
                isStartFocus={false}
                setStartNextFocus={() => {}}
                isShowCalender={true}
              />
            </div>

            {/* To Date - 2 columns */}
            <div className="col-span-2">
              <EnglishDate
                isDate={true}
                calendarType="gregorian"
                userLang="en"
                rtl={false}
                value={filterData.toDate}
                onChange={(date: string) =>
                  setFilterData({ ...filterData, toDate: date })
                }
                disabled={false}
                labelText="To Date"
                className={cn("transition-all", "ring-1 ring-primary")}
                isStartFocus={false}
                setStartNextFocus={() => {}}
                isShowCalender={true}
              />
            </div>

            {/* Select Customer - 2 columns */}
            <div className="col-span-2">
              <Autocomplete
                id="customer-filter"
                name="customer"
                allowCustomInput={true}
                options={customerOptions}
                value={filterData.customer}
                onValueChange={(value: string) =>
                  setFilterData({ ...filterData, customer: value })
                }
                onEnterPress={() => {}}
                placeholder=" "
                labelText="Select Department"
                className="relative"
                tooltipText="Choose department to filter"
                userLang="en"
                styles={{
                  input: {
                    borderColor: "var(--primary)",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
              />
            </div>

            {/* Select Project - 2 columns */}
            <div className="col-span-2">
              <Autocomplete
                id="project-filter"
                name="project"
                allowCustomInput={true}
                options={projectOptions}
                value={filterData.project}
                onValueChange={(value: string) =>
                  setFilterData({ ...filterData, project: value })
                }
                onEnterPress={() => {}}
                placeholder=" "
                labelText="Select Designation"
                className="relative"
                tooltipText="Choose designation to filter"
                userLang="en"
                styles={{
                  input: {
                    borderColor: "var(--primary)",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
              />
            </div>

            {/* Branch - 2 columns */}
            <div className="col-span-2">
              <Autocomplete
                id="employee-filter"
                name="branch"
                allowCustomInput={true}
                options={branchOptions}
                value={filterData.branch}
                onValueChange={(value: string) =>
                  setFilterData({ ...filterData, branch: value })
                }
                onEnterPress={() => {}}
                placeholder=" "
                labelText="Select Employee"
                className="relative"
                tooltipText="Choose employee to filter"
                userLang="en"
                styles={{
                  input: {
                    borderColor: "var(--primary)",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
              />
            </div>

            {/* Status Autocomplete - 2 columns */}
            {/* <div className="col-span-2">
              <Autocomplete
                id="status-filter"
                name="status"
                allowCustomInput={false}
                options={statusOptions.map((option) => option.label)}
                value={filterData.status}
                onValueChange={(value: string) =>
                  setFilterData({ ...filterData, status: value })
                }
                onEnterPress={() => {}}
                placeholder=" "
                labelText="Status"
                className="relative"
                tooltipText="Choose status to filter"
                userLang="en"
                styles={{
                  input: {
                    borderColor: "var(--primary)",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* Data Table */}
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
    </div>
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

  const options =
    type === "date"
      ? []
      : [...new Set(data.map((item) => item[key]).filter(Boolean))];

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
