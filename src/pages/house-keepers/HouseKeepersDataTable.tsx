/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockHouseKeepers = [
  {
    id: "1",
    name: "John Smith",
    description: "Main house keeper for VIP rooms and suites.",
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
    name: "Maria Garcia",
    description: "House keeper for standard rooms and common areas.",
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
    name: "Ahmed Hassan",
    description: "House keeper for conference rooms and business areas.",
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
    name: "Sarah Johnson",
    description: "House keeper for dining areas and kitchen support.",
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
    name: "Carlos Rodriguez",
    description: "House keeper for outdoor areas and pool facilities.",
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
    name: "Lisa Chen",
    description: "House keeper for spa and wellness areas.",
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
    name: "David Wilson",
    description: "House keeper for lobby and reception areas.",
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
    name: "Fatima Al-Zahra",
    description: "House keeper for staff quarters and back areas.",
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
    name: "Michael Brown",
    description: "House keeper for gym and fitness facilities.",
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
    name: "Elena Petrov",
    description: "House keeper for banquet halls and event spaces.",
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
    name: "James Lee",
    description: "House keeper for parking areas and entrance.",
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
    name: "Aisha Patel",
    description: "House keeper for laundry and storage areas.",
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
  const canCreate = usePermission("houseKeeper", "create");

  const componentColumns = [
    {
      accessorKey: "name",
      title: "House Keeper",
      options: [...new Set(mockHouseKeepers.map((item) => item.name))],
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
      size: 180,
      minSize: 140,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockHouseKeepers.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: 260,
      minSize: 160,
      meta: {
        exportLabel: "description",
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
      fixedColumns={["name"]} // Pin name column
      pathName="house-keepers"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
