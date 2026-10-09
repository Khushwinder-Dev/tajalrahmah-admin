/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockWeeklyHolidays = [
  {
    id: "1",
    holidayName: "Eid Al-Fitr",
    fromDate: "2024-04-10",
    endDate: "2024-04-12",
    totalDays: 3,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    holidayName: "Eid Al-Adha",
    fromDate: "2024-06-17",
    endDate: "2024-06-19",
    totalDays: 3,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    holidayName: "National Day",
    fromDate: "2024-09-23",
    endDate: "2024-09-23",
    totalDays: 1,
    createdAt: "2023-05-15",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "20m",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    holidayName: "Prophet's Birthday",
    fromDate: "2024-09-28",
    endDate: "2024-09-28",
    totalDays: 1,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: "2024-01-25",
    actionMessage: "15 Apr",
    isActive: true,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    holidayName: "New Year's Day",
    fromDate: "2024-01-01",
    endDate: "2024-01-01",
    totalDays: 1,
    createdAt: "2023-12-15",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    holidayName: "Saudi Founding Day",
    fromDate: "2024-02-22",
    endDate: "2024-02-22",
    totalDays: 1,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    holidayName: "Weekend Extension",
    fromDate: "2024-03-15",
    endDate: "2024-03-17",
    totalDays: 3,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    holidayName: "Spring Break",
    fromDate: "2024-04-01",
    endDate: "2024-04-05",
    totalDays: 5,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    holidayName: "Summer Vacation",
    fromDate: "2024-07-01",
    endDate: "2024-07-31",
    totalDays: 31,
    createdAt: "2021-12-15",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    holidayName: "Holiday Season",
    fromDate: "2024-12-25",
    endDate: "2024-12-26",
    totalDays: 2,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    holidayName: "Company Anniversary",
    fromDate: "2024-05-15",
    endDate: "2024-05-15",
    totalDays: 1,
    createdAt: "2024-02-15",
    updatedAt: "2024-01-30",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    holidayName: "Team Building Day",
    fromDate: "2024-08-15",
    endDate: "2024-08-16",
    totalDays: 2,
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    holidayName: "Public Holiday",
    fromDate: "2024-10-15",
    endDate: "2024-10-15",
    totalDays: 1,
    createdAt: "2023-08-01",
    updatedAt: "2024-02-01",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    holidayName: "Religious Holiday",
    fromDate: "2024-11-01",
    endDate: "2024-11-01",
    totalDays: 1,
    createdAt: "2024-01-01",
    updatedAt: "2024-02-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    holidayName: "Special Event",
    fromDate: "2024-04-15",
    endDate: "2025-04-15",
    totalDays: 365,
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    holidayName: "Seasonal Break",
    fromDate: "2023-03-01",
    endDate: "2028-03-01",
    totalDays: 1827,
    createdAt: "2023-03-01",
    updatedAt: "2024-02-04",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    holidayName: "Company Event",
    fromDate: "2024-06-01",
    endDate: "2024-12-01",
    totalDays: 184,
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    holidayName: "Staff Meeting",
    fromDate: "2024-02-01",
    endDate: "2024-08-01",
    totalDays: 183,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    holidayName: "Training Day",
    fromDate: "2024-01-10",
    endDate: "2025-01-10",
    totalDays: 366,
    createdAt: "2024-01-10",
    updatedAt: "2024-02-07",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    holidayName: "Maintenance Day",
    fromDate: "2023-10-01",
    endDate: "2024-04-01",
    totalDays: 183,
    createdAt: "2023-10-01",
    updatedAt: "2024-02-08",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function WeeklyHolidaysDataTable({
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
  const canCreate = usePermission("weeklyHolidays", "create");

  const componentColumns = [
    {
      accessorKey: "holidayName",
      title: "Holiday Name",
      options: [...new Set(mockWeeklyHolidays.map((item) => item.holidayName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("holidayName")
          .localeCompare(row2.getValue("holidayName"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "holidayName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "fromDate",
      title: "From Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("fromDate")).getTime() -
          new Date(row2.getValue("fromDate")).getTime()
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "fromDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "endDate",
      title: "End Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("endDate")).getTime() -
          new Date(row2.getValue("endDate")).getTime()
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "endDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "totalDays",
      title: "Total Days",
      options: [...new Set(mockWeeklyHolidays.map((item) => item.totalDays))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("totalDays") - row2.getValue("totalDays");
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "totalDays",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [],
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
      options: [],
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
      options: [],
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

  const filteredData = mockWeeklyHolidays.filter((holiday) => {
    if (dataTableFilter.status === "Active") {
      return holiday.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !holiday.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return holiday.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return holiday.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return holiday.isUpdated;
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
      fixedColumns={["holidayName"]}
      pathName="weekly-holidays"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
