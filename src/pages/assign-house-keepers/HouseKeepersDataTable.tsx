/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockHouseKeepers = [
  {
    id: "1",
    houseKeeperName: "John Smith",
    roomSizeName: "VIP Suite",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    houseKeeperName: "Maria Garcia",
    roomSizeName: "Standard Room",
    status: "Active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    houseKeeperName: "Ahmed Hassan",
    roomSizeName: "Conference Room",
    status: "Inactive",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    houseKeeperName: "Sarah Johnson",
    roomSizeName: "Dining Area",
    status: "Draft",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: "2024-01-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    houseKeeperName: "Carlos Rodriguez",
    roomSizeName: "Pool Area",
    status: "Deleted",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "6",
    houseKeeperName: "Lisa Chen",
    roomSizeName: "Spa & Wellness",
    status: "Updated",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    houseKeeperName: "David Wilson",
    roomSizeName: "Lobby & Reception",
    status: "Active",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    houseKeeperName: "Fatima Al-Zahra",
    roomSizeName: "Staff Quarters",
    status: "Active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    houseKeeperName: "Michael Brown",
    roomSizeName: "Gym & Fitness",
    status: "Active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    houseKeeperName: "Elena Petrov",
    roomSizeName: "Banquet Hall",
    status: "Inactive",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    houseKeeperName: "James Lee",
    roomSizeName: "Parking Area",
    status: "Active",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    houseKeeperName: "Aisha Patel",
    roomSizeName: "Laundry & Storage",
    status: "Active",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function HouseKeepersDataTable({
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
  const canCreate = usePermission("assignHouseKeepers", "create");

  const componentColumns = [
    {
      accessorKey: "houseKeeperName",
      title: "House Keeper",
      options: [
        ...new Set(mockHouseKeepers.map((item) => item.houseKeeperName)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("houseKeeperName")
          .localeCompare(row2.getValue("houseKeeperName"));
      },
      size: 180,
      minSize: 140,
      meta: {
        exportLabel: "houseKeeperName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "roomSizeName",
      title: "Room Size",
      options: [...new Set(mockHouseKeepers.map((item) => item.roomSizeName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("roomSizeName")
          .localeCompare(row2.getValue("roomSizeName"));
      },
      size: 260,
      minSize: 160,
      meta: {
        exportLabel: "roomSizeName",
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

  const filteredData = mockHouseKeepers
    .filter((item) => {
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
    })
    .map((item) => ({
      ...item,
      status: item.isDeleted
        ? "Deleted"
        : item.isDraft
        ? "Draft"
        : item.isUpdated
        ? "Updated"
        : item.isActive
        ? "Active"
        : "Inactive",
    }));

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["houseKeeperName"]} // Pin house keeper name column
      pathName="assign-house-keepers"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
