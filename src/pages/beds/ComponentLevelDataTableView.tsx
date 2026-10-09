/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  bedName: string;
  description: string;

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
    bedName: "Single Bed",
    description: "Standard single bed for one person",
    status: "Active",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-05T12:30:00Z",
    draftedAt: null,
    actionMessage: "Created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    bedName: "Double Bed",
    description: "Spacious double bed for two people",
    status: "Active",
    createdAt: "2025-01-02T11:15:00Z",
    updatedAt: "2025-01-06T14:10:00Z",
    draftedAt: null,
    actionMessage: "Details updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    bedName: "Queen Bed",
    description: "Comfortable queen-sized bed",
    status: "Draft",
    createdAt: "2025-01-03T09:20:00Z",
    updatedAt: "2025-01-04T16:00:00Z",
    draftedAt: "2025-01-04T16:00:00Z",
    actionMessage: "Saved as draft",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    bedName: "King Bed",
    description: "Luxury king-sized bed with extra space",
    status: "Active",
    createdAt: "2025-01-04T08:00:00Z",
    updatedAt: "2025-01-07T09:45:00Z",
    draftedAt: null,
    actionMessage: "Activated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    bedName: "Bunk Bed",
    description: "Stacked bunk bed suitable for kids or hostels",
    status: "Active",
    createdAt: "2025-01-05T13:10:00Z",
    updatedAt: "2025-01-10T15:00:00Z",
    draftedAt: null,
    actionMessage: "Added new design",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    bedName: "Sofa Bed",
    description: "Convertible sofa bed, perfect for small spaces",
    status: "Deleted",
    createdAt: "2025-01-06T14:20:00Z",
    updatedAt: "2025-01-11T17:00:00Z",
    draftedAt: null,
    actionMessage: "Deleted from catalog",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "7",
    bedName: "Daybed",
    description: "Stylish daybed that doubles as a seating option",
    status: "Draft",
    createdAt: "2025-01-07T10:00:00Z",
    updatedAt: "2025-01-08T18:20:00Z",
    draftedAt: "2025-01-08T18:20:00Z",
    actionMessage: "Saved draft for later",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    bedName: "Futon",
    description: "Traditional futon mattress bed",
    status: "Deleted",
    createdAt: "2025-01-08T09:40:00Z",
    updatedAt: "2025-01-09T12:00:00Z",
    draftedAt: null,
    actionMessage: "Removed by admin",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "9",
    bedName: "Canopy Bed",
    description: "Decorative canopy bed with elegant frame",
    status: "Active",
    createdAt: "2025-01-09T08:50:00Z",
    updatedAt: "2025-01-12T15:45:00Z",
    draftedAt: null,
    actionMessage: "Reactivated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    bedName: "Murphy Bed",
    description: "Foldable wall bed for compact rooms",
    status: "Active",
    createdAt: "2025-01-10T07:20:00Z",
    updatedAt: "2025-01-13T11:30:00Z",
    draftedAt: null,
    actionMessage: "New entry added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    bedName: "Trundle Bed",
    description: "Pull-out trundle bed for guest use",
    status: "Active",
    createdAt: "2025-01-11T12:15:00Z",
    updatedAt: "2025-01-14T14:00:00Z",
    draftedAt: null,
    actionMessage: "Updated dimensions",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    bedName: "Water Bed",
    description: "Unique water-filled bed for comfort",
    status: "Deleted",
    createdAt: "2025-01-12T15:10:00Z",
    updatedAt: "2025-01-15T16:30:00Z",
    draftedAt: null,
    actionMessage: "Removed due to low demand",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
];

export default function ComponentLevelDataTableView({
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
  const canCreate = usePermission("beds", "create");

  const componentColumns = [
    {
      accessorKey: "bedName",
      title: "Bed Name",
      options: [...new Set(mockTableData.map((item) => item.bedName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("bedName").localeCompare(row2.getValue("bedName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "bedName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockTableData.map((item) => item.description))],
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
      size: 200,
      minSize: 400,
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
      fixedColumns={["bedName"]} // Pin leave types column
      pathName="beds"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
