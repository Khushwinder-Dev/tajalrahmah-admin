/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;
  code: string;
  bloodGroup: string;

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
    id: "BG-001",
    code: "CODE-001",
    bloodGroup: "A+",
    status: "Active",
    createdAt: "2025-08-01T09:00:00",
    updatedAt: "2025-08-02T10:00:00",
    draftedAt: null,
    actionMessage: "Blood group verified",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "BG-002",
    code: "CODE-002",
    bloodGroup: "A-",
    status: "Draft",
    createdAt: "2025-08-02T11:00:00",
    updatedAt: "2025-08-03T12:00:00",
    draftedAt: "2025-08-03T12:00:00",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "BG-003",
    code: "CODE-003",
    bloodGroup: "B+",
    status: "Updated",
    createdAt: "2025-08-03T13:00:00",
    updatedAt: "2025-08-04T14:00:00",
    draftedAt: null,
    actionMessage: "Blood group info updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "BG-004",
    code: "CODE-004",
    bloodGroup: "B-",
    status: "Deleted",
    createdAt: "2025-08-04T15:00:00",
    updatedAt: "2025-08-05T16:00:00",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "BG-005",
    code: "CODE-005",
    bloodGroup: "AB+",
    status: "Active",
    createdAt: "2025-08-05T17:00:00",
    updatedAt: "2025-08-06T18:00:00",
    draftedAt: null,
    actionMessage: "Blood group verified",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "BG-006",
    code: "CODE-006",
    bloodGroup: "AB-",
    status: "Draft",
    createdAt: "2025-08-06T19:00:00",
    updatedAt: "2025-08-07T20:00:00",
    draftedAt: "2025-08-07T20:00:00",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "BG-007",
    code: "CODE-007",
    bloodGroup: "O+",
    status: "Active",
    createdAt: "2025-08-07T21:00:00",
    updatedAt: "2025-08-08T22:00:00",
    draftedAt: null,
    actionMessage: "Blood group verified",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "BG-008",
    code: "CODE-008",
    bloodGroup: "O-",
    status: "Deleted",
    createdAt: "2025-08-08T23:00:00",
    updatedAt: "2025-08-09T00:00:00",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "BG-009",
    code: "CODE-009",
    bloodGroup: "A+",
    status: "Updated",
    createdAt: "2025-08-09T01:00:00",
    updatedAt: "2025-08-10T02:00:00",
    draftedAt: null,
    actionMessage: "Blood group info updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "BG-010",
    code: "CODE-010",
    bloodGroup: "B+",
    status: "Active",
    createdAt: "2025-08-10T03:00:00",
    updatedAt: "2025-08-11T04:00:00",
    draftedAt: null,
    actionMessage: "Blood group verified",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "BG-011",
    code: "CODE-011",
    bloodGroup: "O+",
    status: "Draft",
    createdAt: "2025-08-11T05:00:00",
    updatedAt: "2025-08-12T06:00:00",
    draftedAt: "2025-08-12T06:00:00",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "BG-012",
    code: "CODE-012",
    bloodGroup: "AB+",
    status: "Updated",
    createdAt: "2025-08-12T07:00:00",
    updatedAt: "2025-08-13T08:00:00",
    draftedAt: null,
    actionMessage: "Blood group info updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function TermsDataTable({
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
  const canCreate = usePermission("bloodGroups", "create");

  const componentColumns = [
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
      accessorKey: "bloodGroup",
      title: "Blood Group",
      options: [...new Set(mockTableData.map((item) => item.bloodGroup))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("bloodGroup")
          .localeCompare(row2.getValue("bloodGroup"));
      },
      size: 150,
      minSize: 400,
      meta: {
        exportLabel: "bloodGroup",
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
      fixedColumns={["code"]} // Pin leave types column
      pathName="bloodGroups"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
