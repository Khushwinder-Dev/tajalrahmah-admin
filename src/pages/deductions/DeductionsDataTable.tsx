/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  name: string;
  iqamaNo: string;
  deductionType: string;
  branch: string;
  deductionAmount: string;
  notes: string;
  date: string;

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
    id: "tab-001",
    name: "Fahim Hossain",
    iqamaNo: "1234567890",
    deductionType: "Late Arrival",
    branch: "Dhaka",
    deductionAmount: "100",
    notes: "Late for 3 days",
    date: "2025-08-01",
    status: "Active",
    createdAt: "2025-08-01T08:00:00Z",
    updatedAt: "2025-08-01T08:30:00Z",
    draftedAt: null,
    actionMessage: "Deduction approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "tab-002",
    name: "Sadia Akter",
    iqamaNo: "2345678901",
    deductionType: "Absence",
    branch: "Chattogram",
    deductionAmount: "300",
    notes: "Absent without notice",
    date: "2025-08-02",
    status: "Active",
    createdAt: "2025-08-02T09:00:00Z",
    updatedAt: "2025-08-02T09:30:00Z",
    draftedAt: null,
    actionMessage: "Reviewed by HR",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "tab-003",
    name: "Rasel Ahmed",
    iqamaNo: "3456789012",
    deductionType: "Early Leave",
    branch: "Sylhet",
    deductionAmount: "150",
    notes: "Left early on 2 days",
    date: "2025-08-03",
    status: "Updated",
    createdAt: "2025-08-03T10:00:00Z",
    updatedAt: "2025-08-03T10:20:00Z",
    draftedAt: null,
    actionMessage: "Updated after review",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "tab-004",
    name: "Nusrat Jahan",
    iqamaNo: "4567890123",
    deductionType: "Disciplinary",
    branch: "Khulna",
    deductionAmount: "500",
    notes: "Verbal abuse reported",
    date: "2025-08-04",
    status: "Deleted",
    createdAt: "2025-08-04T11:00:00Z",
    updatedAt: "2025-08-04T11:45:00Z",
    draftedAt: null,
    actionMessage: "Deleted due to invalid reason",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "tab-005",
    name: "Mizanur Rahman",
    iqamaNo: "5678901234",
    deductionType: "Damage",
    branch: "Rajshahi",
    deductionAmount: "250",
    notes: "Broke company laptop",
    date: "2025-08-05",
    status: "Active",
    createdAt: "2025-08-05T12:00:00Z",
    updatedAt: "2025-08-05T12:20:00Z",
    draftedAt: null,
    actionMessage: "Approved by Admin",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "tab-006",
    name: "Sumaiya Islam",
    iqamaNo: "6789012345",
    deductionType: "Late Arrival",
    branch: "Barishal",
    deductionAmount: "100",
    notes: "Late two times",
    date: "2025-08-06",
    status: "Draft",
    createdAt: "2025-08-06T08:30:00Z",
    updatedAt: "2025-08-06T08:40:00Z",
    draftedAt: "2025-08-06T08:35:00Z",
    actionMessage: "Saved as draft",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "tab-007",
    name: "Tanvir Hossain",
    iqamaNo: "7890123456",
    deductionType: "Unauthorized Overtime",
    branch: "Comilla",
    deductionAmount: "200",
    notes: "Worked OT without permission",
    date: "2025-08-07",
    status: "Active",
    createdAt: "2025-08-07T13:00:00Z",
    updatedAt: "2025-08-07T13:25:00Z",
    draftedAt: null,
    actionMessage: "Accounted in August",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "tab-008",
    name: "Sanjida Khatun",
    iqamaNo: "8901234567",
    deductionType: "Absence",
    branch: "Rangpur",
    deductionAmount: "300",
    notes: "3-day leave without notice",
    date: "2025-08-08",
    status: "Draft",
    createdAt: "2025-08-08T14:00:00Z",
    updatedAt: "2025-08-08T14:15:00Z",
    draftedAt: "2025-08-08T14:10:00Z",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "tab-009",
    name: "Arman Khan",
    iqamaNo: "9012345678",
    deductionType: "Negligence",
    branch: "Mymensingh",
    deductionAmount: "120",
    notes: "Did not follow SOP",
    date: "2025-08-09",
    status: "Deleted",
    createdAt: "2025-08-09T15:00:00Z",
    updatedAt: "2025-08-09T15:30:00Z",
    draftedAt: null,
    actionMessage: "Invalid entry removed",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "tab-010",
    name: "Rafiq Hasan",
    iqamaNo: "0123456789",
    deductionType: "Late Arrival",
    branch: "Dhaka",
    deductionAmount: "50",
    notes: "Minor delay",
    date: "2025-08-10",
    status: "Active",
    createdAt: "2025-08-10T08:00:00Z",
    updatedAt: "2025-08-10T08:20:00Z",
    draftedAt: null,
    actionMessage: "Processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "tab-011",
    name: "Lamia Ferdous",
    iqamaNo: "1324354657",
    deductionType: "Misbehavior",
    branch: "Narayanganj",
    deductionAmount: "500",
    notes: "Misconduct with manager",
    date: "2025-08-11",
    status: "Updated",
    createdAt: "2025-08-11T10:00:00Z",
    updatedAt: "2025-08-11T10:45:00Z",
    draftedAt: null,
    actionMessage: "Record modified after discussion",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "tab-012",
    name: "Jamil Uddin",
    iqamaNo: "1928374650",
    deductionType: "Violation of Safety",
    branch: "Gazipur",
    deductionAmount: "400",
    notes: "Didn’t wear safety gear",
    date: "2025-08-12",
    status: "Active",
    createdAt: "2025-08-12T11:00:00Z",
    updatedAt: "2025-08-12T11:30:00Z",
    draftedAt: null,
    actionMessage: "Safety team approved deduction",
    isActive: true,
    isDraft: false,
    isDeleted: false,
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
  const canCreate = usePermission("deductions", "create");

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Name",
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
      accessorKey: "iqamaNo",
      title: "Iqama No",
      options: [...new Set(mockTableData.map((item) => item.iqamaNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("iqamaNo").localeCompare(row2.getValue("iqamaNo"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "iqamaNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "deductionType",
      title: "Deduction Type",
      options: [...new Set(mockTableData.map((item) => item.deductionType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("deductionType")
          .localeCompare(row2.getValue("deductionType"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "deductionType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "branch",
      title: "Branch",
      options: [...new Set(mockTableData.map((item) => item.branch))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("branch").localeCompare(row2.getValue("branch"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "branch",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "deductionAmount",
      title: "Deduction Amount",
      options: [...new Set(mockTableData.map((item) => item.deductionAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("deductionAmount")
          .localeCompare(row2.getValue("deductionAmount"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "deductionAmount",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "notes",
      title: "Notes",
      options: [...new Set(mockTableData.map((item) => item.notes))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("notes").localeCompare(row2.getValue("notes"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "notes",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "date",
      title: "Date",
      options: [...new Set(mockTableData.map((item) => item.date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("date").localeCompare(row2.getValue("date"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "date",
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
      fixedColumns={["name", "iqamaNo"]} // Pin leave types column
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
