/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  EmployeeName: string;
  TotalScore: string;

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
    EmployeeName: "Ahsan Habib",
    TotalScore: "85",
    status: "Active",
    createdAt: "2025-01-05T10:30:00Z",
    updatedAt: "2025-02-10T12:00:00Z",
    draftedAt: null,
    actionMessage: "Employee performance updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    EmployeeName: "Nusrat Jahan",
    TotalScore: "92",
    status: "Active",
    createdAt: "2025-01-07T14:45:00Z",
    updatedAt: "2025-02-12T09:20:00Z",
    draftedAt: null,
    actionMessage: "Promotion considered",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    EmployeeName: "Sabbir Rahman",
    TotalScore: "77",
    status: "Active",
    createdAt: "2025-01-10T11:10:00Z",
    updatedAt: "2025-02-15T16:30:00Z",
    draftedAt: null,
    actionMessage: "Monthly evaluation complete",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    EmployeeName: "Farzana Akter",
    TotalScore: "64",
    status: "Draft",
    createdAt: "2025-01-15T09:25:00Z",
    updatedAt: "2025-01-20T10:15:00Z",
    draftedAt: "2025-01-20T10:15:00Z",
    actionMessage: "Drafted for review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    EmployeeName: "Tanvir Hossain",
    TotalScore: "88",
    status: "Active",
    createdAt: "2025-01-18T13:00:00Z",
    updatedAt: "2025-02-16T12:00:00Z",
    draftedAt: null,
    actionMessage: "Performance approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    EmployeeName: "Mim Sultana",
    TotalScore: "73",
    status: "Deleted",
    createdAt: "2025-01-22T15:30:00Z",
    updatedAt: "2025-02-18T14:00:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "7",
    EmployeeName: "Imran Khan",
    TotalScore: "95",
    status: "Active",
    createdAt: "2025-01-25T08:20:00Z",
    updatedAt: "2025-02-17T10:45:00Z",
    draftedAt: null,
    actionMessage: "Outstanding performance",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    EmployeeName: "Sharmin Akter",
    TotalScore: "69",
    status: "Active",
    createdAt: "2025-01-28T09:50:00Z",
    updatedAt: "2025-02-20T15:15:00Z",
    draftedAt: null,
    actionMessage: "Pending appraisal",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    EmployeeName: "Mahmudul Hasan",
    TotalScore: "81",
    status: "Deleted",
    createdAt: "2025-01-30T12:15:00Z",
    updatedAt: "2025-02-21T11:45:00Z",
    draftedAt: null,
    actionMessage: "Removed from records",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "10",
    EmployeeName: "Rafiq Chowdhury",
    TotalScore: "59",
    status: "Draft",
    createdAt: "2025-02-01T14:40:00Z",
    updatedAt: "2025-02-03T09:30:00Z",
    draftedAt: "2025-02-03T09:30:00Z",
    actionMessage: "Awaiting approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    EmployeeName: "Taslima Rahman",
    TotalScore: "90",
    status: "Active",
    createdAt: "2025-02-04T16:10:00Z",
    updatedAt: "2025-02-19T12:00:00Z",
    draftedAt: null,
    actionMessage: "Confirmed as top performer",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    EmployeeName: "Shakil Ahmed",
    TotalScore: "78",
    status: "Active",
    createdAt: "2025-02-07T10:55:00Z",
    updatedAt: "2025-02-21T15:45:00Z",
    draftedAt: null,
    actionMessage: "Good performance",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

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
  const canCreate = usePermission("awardLists", "create");

  const componentColumns = [
    {
      accessorKey: "EmployeeName",
      title: "Employee Name",
      options: [...new Set(mockTableData.map((item) => item.EmployeeName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("EmployeeName")
          .localeCompare(row2.getValue("EmployeeName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "EmployeeName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "TotalScore",
      title: "Total Score",
      options: [...new Set(mockTableData.map((item) => item.TotalScore))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("TotalScore")
          .localeCompare(row2.getValue("TotalScore"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "TotalScore",
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
      fixedColumns={["EmployeeName"]} // Pin leave types column
      pathName="employee-performances"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
