/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";

// Leaves Approval interface to match the grid component
interface LeaveItem {
  id: string;
  leaveType: string;
  branch: string;
  employee: string;
  fromDate: string;
  endDate: string;
  totalDays: number;
  hardCopy: boolean;
  approvedBy: string;
  status: "Approved" | "Pending" | "Rejected";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockLeaves: LeaveItem[] = [
  {
    id: "1",
    leaveType: "Annual Leave",
    branch: "Main Branch",
    employee: "John Doe",
    fromDate: "2025-10-10",
    endDate: "2025-10-15",
    totalDays: 5,
    hardCopy: true,
    approvedBy: "Manager A",
    status: "Approved",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    draftedAt: "2024-01-14",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    leaveType: "Sick Leave",
    branch: "Branch B",
    employee: "Jane Smith",
    fromDate: "2025-10-08",
    endDate: "2025-10-09",
    totalDays: 2,
    hardCopy: false,
    approvedBy: "Manager B",
    status: "Pending",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
    draftedAt: "2024-01-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    leaveType: "Maternity Leave",
    branch: "Main Branch",
    employee: "Sarah Johnson",
    fromDate: "2025-10-20",
    endDate: "2025-12-20",
    totalDays: 60,
    hardCopy: true,
    approvedBy: "Manager A",
    status: "Approved",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-17",
    draftedAt: "2024-01-16",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    leaveType: "Paternity Leave",
    branch: "Branch C",
    employee: "Mike Wilson",
    fromDate: "2025-10-15",
    endDate: "2025-10-22",
    totalDays: 7,
    hardCopy: true,
    approvedBy: "Manager C",
    status: "Approved",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
    draftedAt: "2024-01-17",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    leaveType: "Emergency Leave",
    branch: "Branch B",
    employee: "Emily Brown",
    fromDate: "2025-10-07",
    endDate: "2025-10-08",
    totalDays: 1,
    hardCopy: false,
    approvedBy: "Manager B",
    status: "Rejected",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-19",
    draftedAt: "2024-01-18",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    leaveType: "Study Leave",
    branch: "Main Branch",
    employee: "David Lee",
    fromDate: "2025-11-01",
    endDate: "2025-11-10",
    totalDays: 10,
    hardCopy: true,
    approvedBy: "Manager A",
    status: "Pending",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
    draftedAt: "2024-01-19",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    leaveType: "Bereavement Leave",
    branch: "Branch C",
    employee: "Lisa Chen",
    fromDate: "2025-10-12",
    endDate: "2025-10-14",
    totalDays: 3,
    hardCopy: true,
    approvedBy: "Manager C",
    status: "Approved",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-21",
    draftedAt: "2024-01-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    leaveType: "Personal Leave",
    branch: "Branch B",
    employee: "Tom Anderson",
    fromDate: "2025-10-25",
    endDate: "2025-10-26",
    totalDays: 2,
    hardCopy: false,
    approvedBy: "Manager B",
    status: "Pending",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
    draftedAt: "2024-01-21",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
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
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "leaveType",
      title: "Leave Type",
      options: [...new Set(mockLeaves.map((item) => item.leaveType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("leaveType")
          .localeCompare(row2.getValue("leaveType"));
      },
      size: isMobile ? 180 : 200,
      minSize: 180,
      meta: {
        exportLabel: "Leave Type",
        readOnly: true,
      },
    },
    {
      accessorKey: "branch",
      title: "Branch",
      options: [...new Set(mockLeaves.map((item) => item.branch))],
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
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Branch",
        readOnly: true,
      },
    },
    {
      accessorKey: "employee",
      title: "Employee",
      options: [...new Set(mockLeaves.map((item) => item.employee))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("employee")
          .localeCompare(row2.getValue("employee"));
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Employee",
        readOnly: true,
      },
    },
    {
      accessorKey: "fromDate",
      title: "From Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("fromDate"));
        const date2 = new Date(row2.getValue("fromDate"));
        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "From Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "endDate",
      title: "End Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("endDate"));
        const date2 = new Date(row2.getValue("endDate"));
        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "End Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "totalDays",
      title: "Total Days",
      options: [
        ...new Set(mockLeaves.map((item) => item.totalDays.toString())),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId).toString();
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("totalDays") - row2.getValue("totalDays");
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Total Days",
        readOnly: true,
      },
    },
    {
      accessorKey: "hardCopy",
      title: "Hard Copy",
      options: ["Yes", "No"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) ? "Yes" : "No";
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const val1 = row1.getValue("hardCopy") ? 1 : 0;
        const val2 = row2.getValue("hardCopy") ? 1 : 0;
        return val1 - val2;
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Hard Copy",
        readOnly: true,
      },
    },
    {
      accessorKey: "approvedBy",
      title: "Approved By",
      options: [...new Set(mockLeaves.map((item) => item.approvedBy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("approvedBy")
          .localeCompare(row2.getValue("approvedBy"));
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Approved By",
        readOnly: true,
      },
    },

    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("createdAt"));
        const date2 = new Date(row2.getValue("createdAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
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
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("updatedAt"));
        const date2 = new Date(row2.getValue("updatedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
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
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("draftedAt"));
        const date2 = new Date(row2.getValue("draftedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockLeaves.filter((item: LeaveItem) => {
    // Filter by status
    if (dataTableFilter.status === "Approved") {
      return item.status === "Approved";
    } else if (dataTableFilter.status === "Pending") {
      return item.status === "Pending";
    } else if (dataTableFilter.status === "Rejected") {
      return item.status === "Rejected";
    } else if (dataTableFilter.status === "Active") {
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
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["leaveType", "status"]}
      pathName="leaves-approval"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      showImages={false}
    />
  );
}
