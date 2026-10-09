/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const MockData = [
  {
    id: "1",
    shift: "Morning",
    startTime: "08:00 AM",
    endTime: "12:00 PM",
    createdAt: "2022-01-15",
    updatedAt: "2022-11-20",
    draftedAt: "2021-12-28",
    status: "active",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    shift: "Afternoon",
    startTime: "12:00 PM",
    endTime: "04:00 PM",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2022-12-20",
    status: "active",
    actionMessage: "4h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    shift: "Evening",
    startTime: "04:00 PM",
    endTime: "08:00 PM",
    createdAt: "2021-01-10",
    updatedAt: "2021-12-20",
    draftedAt: "2020-12-28",
    status: "archived",
    actionMessage: "6mo",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    shift: "Night",
    startTime: "08:00 PM",
    endTime: "12:00 AM",
    createdAt: "2020-01-12",
    updatedAt: "2020-12-22",
    draftedAt: "2019-12-30",
    status: "archived",
    actionMessage: "1y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    shift: "Graveyard",
    startTime: "12:00 AM",
    endTime: "06:00 AM",
    createdAt: "2019-01-10",
    updatedAt: "2019-12-15",
    draftedAt: "2018-12-20",
    status: "archived",
    actionMessage: "2y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    shift: "Split Shift",
    startTime: "06:00 AM",
    endTime: "10:00 AM",
    createdAt: "2018-01-08",
    updatedAt: "2018-12-10",
    draftedAt: "2017-12-18",
    status: "archived",
    actionMessage: "3y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    shift: "Morning Extended",
    startTime: "06:00 AM",
    endTime: "02:00 PM",
    createdAt: "2017-01-05",
    updatedAt: "2017-12-12",
    draftedAt: "2016-12-22",
    status: "archived",
    actionMessage: "4y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    shift: "Afternoon Extended",
    startTime: "02:00 PM",
    endTime: "10:00 PM",
    createdAt: "2024-01-15",
    updatedAt: "2024-06-01",
    draftedAt: "2023-12-20",
    status: "draft",
    actionMessage: "3d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    shift: "Weekend Morning",
    startTime: "09:00 AM",
    endTime: "01:00 PM",
    createdAt: "2025-01-10",
    updatedAt: "2025-07-05",
    draftedAt: "2024-12-01",
    status: "draft",
    actionMessage: "2d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    shift: "Weekend Night",
    startTime: "07:00 PM",
    endTime: "11:00 PM",
    createdAt: "2026-01-20",
    updatedAt: "2026-07-02",
    draftedAt: "2025-12-10",
    status: "draft",
    actionMessage: "1d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function ShiftDataTable({
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
  const { canCreate } = useCountriesPermissions();

  const componentColumns = [
    {
      accessorKey: "shift",
      title: "Shift",
      options: [...new Set(MockData.map((item) => item.shift))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("shift").localeCompare(row2.getValue("shift"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "shift",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "startTime",
      title: "Start Time",
      options: [...new Set(MockData.map((item) => item.startTime))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "startTime",
        readOnly: true,
      },
    },
    {
      accessorKey: "endTime",
      title: "End Time",
      options: [...new Set(MockData.map((item) => item.endTime))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "endTime",
        readOnly: true,
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
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("draftedAt")).getTime() -
          new Date(row2.getValue("draftedAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = MockData.filter((finance) => {
    if (dataTableFilter.status === "Active") {
      return finance.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !finance.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return finance.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return finance.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return finance.isUpdated;
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
      fixedColumns={["name", "status"]} // Pin country name column
      pathName="shifts"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
