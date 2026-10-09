/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  unavailableDate: string;
  startTime: string;
  endTime: string;

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
    unavailableDate: "2025-08-15",
    startTime: "09:00",
    endTime: "12:00",
    status: "Active",
    createdAt: "2025-08-01T10:00:00",
    updatedAt: "2025-08-05T12:00:00",
    draftedAt: null,
    actionMessage: "Unavailable due to maintenance work",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    unavailableDate: "2025-08-16",
    startTime: "13:00",
    endTime: "17:00",
    status: "Active",
    createdAt: "2025-08-02T09:30:00",
    updatedAt: "2025-08-06T14:00:00",
    draftedAt: null,
    actionMessage: "Reserved for a private event",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    unavailableDate: "2025-08-17",
    startTime: "10:00",
    endTime: "15:00",
    status: "Draft",
    createdAt: "2025-08-05T08:15:00",
    updatedAt: "2025-08-07T09:00:00",
    draftedAt: "2025-08-07T09:00:00",
    actionMessage: "Draft schedule awaiting approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    unavailableDate: "2025-08-18",
    startTime: "08:00",
    endTime: "11:30",
    status: "Deleted",
    createdAt: "2025-08-06T11:45:00",
    updatedAt: "2025-08-08T16:10:00",
    draftedAt: null,
    actionMessage: "Cancelled due to schedule change",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    unavailableDate: "2025-08-19",
    startTime: "14:00",
    endTime: "18:00",
    status: "Active",
    createdAt: "2025-08-07T13:20:00",
    updatedAt: "2025-08-10T09:45:00",
    draftedAt: null,
    actionMessage: "Unavailable for equipment upgrade",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    unavailableDate: "2025-08-20",
    startTime: "07:30",
    endTime: "10:30",
    status: "Deleted",
    createdAt: "2025-08-08T07:00:00",
    updatedAt: "2025-08-12T08:30:00",
    draftedAt: null,
    actionMessage: "Booking cancelled by client",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "7",
    unavailableDate: "2025-08-21",
    startTime: "12:00",
    endTime: "16:00",
    status: "Active",
    createdAt: "2025-08-09T11:40:00",
    updatedAt: "2025-08-14T15:50:00",
    draftedAt: null,
    actionMessage: "Unavailable for deep cleaning",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    unavailableDate: "2025-08-22",
    startTime: "09:15",
    endTime: "11:15",
    status: "Draft",
    createdAt: "2025-08-10T09:10:00",
    updatedAt: "2025-08-11T10:00:00",
    draftedAt: "2025-08-11T10:00:00",
    actionMessage: "Pending approval for holiday",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    unavailableDate: "2025-08-23",
    startTime: "15:00",
    endTime: "19:00",
    status: "Active",
    createdAt: "2025-08-11T13:30:00",
    updatedAt: "2025-08-14T09:25:00",
    draftedAt: null,
    actionMessage: "Unavailable due to corporate booking",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    unavailableDate: "2025-08-24",
    startTime: "10:00",
    endTime: "14:00",
    status: "Deleted",
    createdAt: "2025-08-12T07:25:00",
    updatedAt: "2025-08-15T08:10:00",
    draftedAt: null,
    actionMessage: "Event cancelled",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "11",
    unavailableDate: "2025-08-25",
    startTime: "08:30",
    endTime: "12:30",
    status: "Active",
    createdAt: "2025-08-13T10:10:00",
    updatedAt: "2025-08-16T13:45:00",
    draftedAt: null,
    actionMessage: "Unavailable for regular maintenance",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    unavailableDate: "2025-08-26",
    startTime: "11:00",
    endTime: "15:00",
    status: "Draft",
    createdAt: "2025-08-14T09:00:00",
    updatedAt: "2025-08-15T10:15:00",
    draftedAt: "2025-08-15T10:15:00",
    actionMessage: "Draft schedule for inspection",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function UnavailableDatesDataTable({
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
      accessorKey: "unavailableDate",
      title: "Unavailable Date",
      options: [...new Set(mockTableData.map((item) => item.unavailableDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("unavailableDate")
          .localeCompare(row2.getValue("unavailableDate"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "unavailableDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "startTime",
      title: "Start Time",
      options: [...new Set(mockTableData.map((item) => item.startTime))],
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
      size: 150,
      minSize: 400,
      meta: {
        exportLabel: "startTime",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "endTime",
      title: "End Time",
      options: [...new Set(mockTableData.map((item) => item.endTime))],
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
      size: 150,
      minSize: 400,
      meta: {
        exportLabel: "endTime",
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
      fixedColumns={["unavailableDate"]} // Pin leave types column
      pathName="unavailable-dates"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
