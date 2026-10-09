/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  name: string;
  code: string;

  status: string;
  createdAt: string;
  updatedAt: string;
  draftedAt: string | null;
  actionMessage: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
};

const mockTableData: TabDataType[] = [
  {
    id: "1",
    name: "Internal",
    code: "PRJ-001",
    status: "Active",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-02T11:00:00Z",
    draftedAt: null,
    actionMessage: "Created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    name: "Client-Based",
    code: "PRJ-002",
    status: "Active",
    createdAt: "2025-01-03T09:30:00Z",
    updatedAt: "2025-01-04T09:45:00Z",
    draftedAt: null,
    actionMessage: "Created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    name: "R&D",
    code: "PRJ-003",
    status: "Active",
    createdAt: "2025-02-10T14:00:00Z",
    updatedAt: "2025-02-11T15:00:00Z",
    draftedAt: null,
    actionMessage: "Updated with new strategy",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    name: "Support",
    code: "PRJ-004",
    status: "Draft",
    createdAt: "2025-03-01T08:00:00Z",
    updatedAt: "2025-03-01T08:30:00Z",
    draftedAt: "2025-03-01T08:00:00Z",
    actionMessage: "Drafted for review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    name: "Maintenance",
    code: "PRJ-005",
    status: "Active",
    createdAt: "2025-03-15T12:00:00Z",
    updatedAt: "2025-03-20T13:00:00Z",
    draftedAt: null,
    actionMessage: "Enabled for production",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    name: "Upgrade",
    code: "PRJ-006",
    status: "Deleted",
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2025-04-05T10:15:00Z",
    draftedAt: null,
    actionMessage: "Removed from list",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "7",
    name: "Testing",
    code: "PRJ-007",
    status: "Active",
    createdAt: "2025-04-20T16:00:00Z",
    updatedAt: "2025-04-22T17:00:00Z",
    draftedAt: null,
    actionMessage: "QA ready",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    name: "Consulting",
    code: "PRJ-008",
    status: "Active",
    createdAt: "2025-05-01T09:00:00Z",
    updatedAt: "2025-05-05T09:20:00Z",
    draftedAt: null,
    actionMessage: "Project type approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    name: "Implementation",
    code: "PRJ-009",
    status: "Draft",
    createdAt: "2025-05-10T11:00:00Z",
    updatedAt: "2025-05-11T11:30:00Z",
    draftedAt: "2025-05-10T11:00:00Z",
    actionMessage: "Awaiting approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    name: "Migration",
    code: "PRJ-010",
    status: "Active",
    createdAt: "2025-06-01T14:00:00Z",
    updatedAt: "2025-06-02T14:30:00Z",
    draftedAt: null,
    actionMessage: "Live in production",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    name: "Training",
    code: "PRJ-011",
    status: "Active",
    createdAt: "2025-06-15T13:00:00Z",
    updatedAt: "2025-06-17T13:45:00Z",
    draftedAt: null,
    actionMessage: "Training module ready",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    name: "Custom Development",
    code: "PRJ-012",
    status: "Deleted",
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "2025-07-03T10:30:00Z",
    draftedAt: null,
    actionMessage: "Deprecated type",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
];

export default function LeavesDataTable({
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
  const canCreate = usePermission("projectTypes", "create");

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Project Type",
      options: [...new Set(mockTableData.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockTableData.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "createdAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId);
        if (!cellValue) return false;
        const dateValue = new Date(cellValue as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(dateValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = row1.getValue("draftedAt");
        const date2 = row2.getValue("draftedAt");
        if (!date1 && !date2) return 0;
        if (!date1) return 1;
        if (!date2) return -1;
        return new Date(date1).getTime() - new Date(date2).getTime();
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockTableData.filter((leave) => {
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
      fixedColumns={["name", "code"]} // Pin leave types column
      pathName="project-types"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
