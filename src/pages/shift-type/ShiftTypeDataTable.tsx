/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Shift Type interface to match the grid component
interface ShiftTypeItem {
  id: string;
  name: string;
  color: string;
  startTime: string;
  endTime: string;
  lunchStart: string;
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

const mockShiftTypes: ShiftTypeItem[] = [
  {
    id: "1",
    name: "Morning Shift",
    color: "#3B82F6",
    startTime: "06:00",
    endTime: "14:00",
    lunchStart: "12:00",
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
    name: "Afternoon Shift",
    color: "#10B981",
    startTime: "14:00",
    endTime: "22:00",
    lunchStart: "18:00",
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
    name: "Night Shift",
    color: "#8B5CF6",
    startTime: "22:00",
    endTime: "06:00",
    lunchStart: "02:00",
    status: "Draft",
    createdAt: "2024-02-17",
    updatedAt: "2024-02-17",
    draftedAt: "2024-02-16",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    name: "Day Shift",
    color: "#F59E0B",
    startTime: "08:00",
    endTime: "16:00",
    lunchStart: "13:00",
    status: "Pending",
    createdAt: "2024-02-18",
    updatedAt: "2024-02-18",
    draftedAt: "2024-02-17",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    name: "Evening Shift",
    color: "#EF4444",
    startTime: "16:00",
    endTime: "00:00",
    lunchStart: "20:00",
    status: "Active",
    createdAt: "2024-03-19",
    updatedAt: "2024-03-19",
    draftedAt: "2024-03-18",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    name: "Part Time Morning",
    color: "#06B6D4",
    startTime: "09:00",
    endTime: "13:00",
    lunchStart: "11:30",
    status: "Active",
    createdAt: "2024-03-20",
    updatedAt: "2024-03-20",
    draftedAt: "2024-03-19",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    name: "Part Time Evening",
    color: "#84CC16",
    startTime: "17:00",
    endTime: "21:00",
    lunchStart: "19:00",
    status: "Pending",
    createdAt: "2024-04-21",
    updatedAt: "2024-04-21",
    draftedAt: "2024-04-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    name: "Weekend Shift",
    color: "#F97316",
    startTime: "10:00",
    endTime: "18:00",
    lunchStart: "14:00",
    status: "Draft",
    createdAt: "2024-04-22",
    updatedAt: "2024-04-22",
    draftedAt: "2024-04-21",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    name: "Holiday Shift",
    color: "#EC4899",
    startTime: "11:00",
    endTime: "19:00",
    lunchStart: "15:00",
    status: "Active",
    createdAt: "2024-05-23",
    updatedAt: "2024-05-23",
    draftedAt: "2024-05-22",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    name: "Overtime Shift",
    color: "#6366F1",
    startTime: "20:00",
    endTime: "04:00",
    lunchStart: "00:00",
    status: "Rejected",
    createdAt: "2024-05-24",
    updatedAt: "2024-05-24",
    draftedAt: "2024-05-23",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    name: "Split Shift",
    color: "#14B8A6",
    startTime: "07:00",
    endTime: "15:00",
    lunchStart: "12:00",
    status: "Active",
    createdAt: "2024-06-25",
    updatedAt: "2024-06-25",
    draftedAt: "2024-06-24",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    name: "Rotating Shift",
    color: "#F43F5E",
    startTime: "12:00",
    endTime: "20:00",
    lunchStart: "16:00",
    status: "Draft",
    createdAt: "2024-06-26",
    updatedAt: "2024-06-26",
    draftedAt: "2024-06-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function ShiftTypeDataTable({
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
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockShiftTypes.map((item) => item.name))],
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
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "color",
      title: "Color",
      options: [...new Set(mockShiftTypes.map((item) => item.color))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("color").localeCompare(row2.getValue("color"));
      },
      size: isMobile ? 120 : 150,
      minSize: 100,
      meta: {
        exportLabel: "Color",
        readOnly: true,
      },
    },
    {
      accessorKey: "startTime",
      title: "Start Time",
      options: [...new Set(mockShiftTypes.map((item) => item.startTime))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("startTime")
          .localeCompare(row2.getValue("startTime"));
      },
      size: isMobile ? 120 : 150,
      minSize: 100,
      meta: {
        exportLabel: "Start Time",
        readOnly: true,
      },
    },
    {
      accessorKey: "endTime",
      title: "End Time",
      options: [...new Set(mockShiftTypes.map((item) => item.endTime))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("endTime").localeCompare(row2.getValue("endTime"));
      },
      size: isMobile ? 120 : 150,
      minSize: 100,
      meta: {
        exportLabel: "End Time",
        readOnly: true,
      },
    },
    {
      accessorKey: "lunchStart",
      title: "Lunch Start",
      options: [...new Set(mockShiftTypes.map((item) => item.lunchStart))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("lunchStart")
          .localeCompare(row2.getValue("lunchStart"));
      },
      size: isMobile ? 120 : 150,
      minSize: 100,
      meta: {
        exportLabel: "Lunch Start",
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

  const filteredData = mockShiftTypes.filter((item: ShiftTypeItem) => {
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
      fixedColumns={["name", "status"]}
      pathName="shift-type"
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
