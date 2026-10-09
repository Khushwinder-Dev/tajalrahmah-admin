/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Leaves Application interface to match the grid component
interface LeaveItem {
  id: string;
  branch: string;
  iqamaNo: string;
  leaveType: string;
  fromDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  applicationHardCopy: string;
  status: "Active" | "Pending" | "Draft" | "Rejected";
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
    branch: "Main Branch",
    iqamaNo: "2345678901",
    leaveType: "Annual Leave",
    fromDate: "2024-10-15",
    endDate: "2024-10-20",
    totalDays: 5,
    reason: "Family vacation",
    applicationHardCopy: "Yes",
    status: "Active",
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
    branch: "East Branch",
    iqamaNo: "3456789012",
    leaveType: "Sick Leave",
    fromDate: "2024-10-10",
    endDate: "2024-10-12",
    totalDays: 2,
    reason: "Medical treatment",
    applicationHardCopy: "No",
    status: "Active",
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
    branch: "North Branch",
    iqamaNo: "4567890123",
    leaveType: "Emergency Leave",
    fromDate: "2024-10-08",
    endDate: "2024-10-09",
    totalDays: 1,
    reason: "Family emergency",
    applicationHardCopy: "Yes",
    status: "Draft",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-17",
    draftedAt: "2024-01-16",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    branch: "West Branch",
    iqamaNo: "5678901234",
    leaveType: "Maternity Leave",
    fromDate: "2024-10-01",
    endDate: "2024-12-01",
    totalDays: 60,
    reason: "Maternity",
    applicationHardCopy: "Yes",
    status: "Pending",
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
    branch: "South Branch",
    iqamaNo: "6789012345",
    leaveType: "Study Leave",
    fromDate: "2024-11-01",
    endDate: "2024-11-05",
    totalDays: 4,
    reason: "Professional training",
    applicationHardCopy: "No",
    status: "Active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-19",
    draftedAt: "2024-01-18",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    branch: "Main Branch",
    iqamaNo: "7890123456",
    leaveType: "Personal Leave",
    fromDate: "2024-10-20",
    endDate: "2024-10-22",
    totalDays: 2,
    reason: "Personal matters",
    applicationHardCopy: "Yes",
    status: "Active",
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
    branch: "East Branch",
    iqamaNo: "8901234567",
    leaveType: "Annual Leave",
    fromDate: "2024-11-10",
    endDate: "2024-11-15",
    totalDays: 5,
    reason: "Travel",
    applicationHardCopy: "No",
    status: "Pending",
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
    branch: "North Branch",
    iqamaNo: "9012345678",
    leaveType: "Sick Leave",
    fromDate: "2024-10-25",
    endDate: "2024-10-27",
    totalDays: 2,
    reason: "Medical checkup",
    applicationHardCopy: "Yes",
    status: "Draft",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
    draftedAt: "2024-01-21",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    branch: "West Branch",
    iqamaNo: "1234567890",
    leaveType: "Paternity Leave",
    fromDate: "2024-11-05",
    endDate: "2024-11-12",
    totalDays: 7,
    reason: "Newborn care",
    applicationHardCopy: "Yes",
    status: "Active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-23",
    draftedAt: "2024-01-22",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    branch: "South Branch",
    iqamaNo: "2109876543",
    leaveType: "Emergency Leave",
    fromDate: "2024-10-28",
    endDate: "2024-10-30",
    totalDays: 2,
    reason: "Urgent family matter",
    applicationHardCopy: "No",
    status: "Rejected",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-24",
    draftedAt: "2024-01-23",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    branch: "Main Branch",
    iqamaNo: "3210987654",
    leaveType: "Annual Leave",
    fromDate: "2024-12-01",
    endDate: "2024-12-10",
    totalDays: 9,
    reason: "Year-end vacation",
    applicationHardCopy: "Yes",
    status: "Active",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-25",
    draftedAt: "2024-01-24",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    branch: "East Branch",
    iqamaNo: "4321098765",
    leaveType: "Study Leave",
    fromDate: "2024-11-15",
    endDate: "2024-11-20",
    totalDays: 5,
    reason: "Certification course",
    applicationHardCopy: "No",
    status: "Draft",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-26",
    draftedAt: "2024-01-25",
    isActive: false,
    isDraft: true,
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
  const { canCreate } = useCountriesPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
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
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "iqamaNo",
      title: "Iqama No",
      options: [...new Set(mockLeaves.map((item) => item.iqamaNo))],
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
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Iqama No",
        readOnly: true,
      },
    },
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
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Leave Type",
        readOnly: !canCreate,
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
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;
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
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;
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
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal)
        );
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
      accessorKey: "reason",
      title: "Reason",
      options: [...new Set(mockLeaves.map((item) => item.reason))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("reason").localeCompare(row2.getValue("reason"));
      },
      size: isMobile ? 180 : 220,
      minSize: 180,
      meta: {
        exportLabel: "Reason",
        readOnly: true,
      },
    },
    {
      accessorKey: "applicationHardCopy",
      title: "Hard Copy",
      options: [...new Set(mockLeaves.map((item) => item.applicationHardCopy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("applicationHardCopy")
          .localeCompare(row2.getValue("applicationHardCopy"));
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Application Hard Copy",
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
    // States use the same flags for demo
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
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["branch", "leaveType", "status"]}
      pathName="leaves"
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
