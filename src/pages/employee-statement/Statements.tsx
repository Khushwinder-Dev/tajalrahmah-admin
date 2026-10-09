/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "./components/StatementsTable";
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
import SimplePageLayout from "./components/SimpleLayout";
import { useAppSelector } from "@/store";
import { selectMinimizedModulesForUser } from "@/store/minimizedModulesSlice";

export default function Statements() {
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

  const [searchQuery] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  // Sample options for autocomplete fields
  const DepartmentOptions = [
    "ABC Corporation Ltd.",
    "XYZ Industries",
    "Tech Solutions Inc.",
    "Digital Marketing Pro",
    "Global Services Ltd.",
    "Innovation Hub",
    "Creative Agency",
    "Business Partners",
  ];

  const designationOptions = [
    "Managing Director",
    "Department Head",
    "Assistant Manager",
    "Human Resource",
    "Accountant",
    "Cashier",
    "Security Audit",
    "System Integration",
  ];

  const employeeOptions = [
    "Mr. Tarequl Islam",
    "Mr. Md. Tarequl Islam",
    "Mr. Md. Tarequl Islam",
    "Mr. Md. Tarequl Islam",
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

    return true;
  });
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const minimizedModulesForUser = useAppSelector((state) =>
    selectMinimizedModulesForUser(state, userId ?? "__no_user__")
  );

  return (
    <SimplePageLayout
      title="Employee Statements"
      setShowExport={setShowExport}
      showExport={showExport}
      exportText="Export Data"
    >
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
                  name="Department"
                  allowCustomInput={true}
                  options={DepartmentOptions}
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
                  options={designationOptions}
                  value={filterData.project}
                  onValueChange={(value: string) =>
                    setFilterData({ ...filterData, project: value })
                  }
                  onEnterPress={() => {}}
                  placeholder=" "
                  labelText="Select Project"
                  className="relative"
                  tooltipText="Choose project to filter"
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
                  id="branch-filter"
                  name="Employee"
                  allowCustomInput={true}
                  options={employeeOptions}
                  value={filterData.branch}
                  onValueChange={(value: string) =>
                    setFilterData({ ...filterData, branch: value })
                  }
                  onEnterPress={() => {}}
                  placeholder=" "
                  labelText="Employee"
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
        <div
          className={cn(
            minimizedModulesForUser.length > 0
              ? "h-[calc(100vh-477px)]"
              : "h-[calc(100vh-350px)]"
          )}
        >
          <div className="overflow-y-auto overflow-x-hidden scroll-smooth [scrollbar-gutter:stable] h-full">
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
        </div>
      </div>
    </SimplePageLayout>
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
