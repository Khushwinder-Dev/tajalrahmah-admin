/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  code: string;
  propertyName: string;
  group: string;
  countryName: string;

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
    code: "P-001",
    propertyName: "Sunrise Villa",
    group: "Residential",
    countryName: "Bangladesh",
    status: "Active",
    createdAt: "2025-01-10T09:30:00Z",
    updatedAt: "2025-02-05T11:00:00Z",
    draftedAt: null,
    actionMessage: "Property listed successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    code: "P-002",
    propertyName: "Green Horizon Apartments",
    group: "Residential",
    countryName: "India",
    status: "Draft",
    createdAt: "2025-01-12T14:00:00Z",
    updatedAt: "2025-01-15T10:15:00Z",
    draftedAt: "2025-01-12T14:00:00Z",
    actionMessage: "Awaiting approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    code: "P-003",
    propertyName: "Blue Lagoon Resort",
    group: "Hospitality",
    countryName: "Sri Lanka",
    status: "Inactive",
    createdAt: "2025-02-01T08:45:00Z",
    updatedAt: "2025-02-10T09:20:00Z",
    draftedAt: null,
    actionMessage: "Temporarily closed for renovation",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    code: "P-004",
    propertyName: "Golden Plaza Mall",
    group: "Commercial",
    countryName: "Malaysia",
    status: "Deleted",
    createdAt: "2025-01-20T12:00:00Z",
    updatedAt: "2025-02-14T15:00:00Z",
    draftedAt: null,
    actionMessage: "Property removed by admin",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    code: "P-005",
    propertyName: "Ocean View Hotel",
    group: "Hospitality",
    countryName: "Thailand",
    status: "Updated",
    createdAt: "2025-02-05T06:15:00Z",
    updatedAt: "2025-02-12T07:30:00Z",
    draftedAt: null,
    actionMessage: "Room details updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    code: "P-006",
    propertyName: "Emerald Residency",
    group: "Residential",
    countryName: "Nepal",
    status: "Active",
    createdAt: "2025-01-18T09:50:00Z",
    updatedAt: "2025-01-25T08:00:00Z",
    draftedAt: null,
    actionMessage: "Fully booked for the season",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    code: "P-007",
    propertyName: "City Light Tower",
    group: "Commercial",
    countryName: "Singapore",
    status: "Draft",
    createdAt: "2025-02-03T11:45:00Z",
    updatedAt: "2025-02-04T10:20:00Z",
    draftedAt: "2025-02-03T11:45:00Z",
    actionMessage: "Pending property verification",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    code: "P-008",
    propertyName: "Royal Garden Estate",
    group: "Residential",
    countryName: "Bangladesh",
    status: "Inactive",
    createdAt: "2025-01-22T07:30:00Z",
    updatedAt: "2025-02-01T08:10:00Z",
    draftedAt: null,
    actionMessage: "Ownership transfer in progress",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    code: "P-009",
    propertyName: "Lakeview Paradise",
    group: "Hospitality",
    countryName: "Bhutan",
    status: "Deleted",
    createdAt: "2025-01-15T05:45:00Z",
    updatedAt: "2025-02-09T09:00:00Z",
    draftedAt: null,
    actionMessage: "Removed due to contract expiration",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "10",
    code: "P-010",
    propertyName: "Metro Business Hub",
    group: "Commercial",
    countryName: "India",
    status: "Updated",
    createdAt: "2025-01-30T13:10:00Z",
    updatedAt: "2025-02-11T12:15:00Z",
    draftedAt: null,
    actionMessage: "Added new retail units",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    code: "P-011",
    propertyName: "Pearl Residency",
    group: "Residential",
    countryName: "Pakistan",
    status: "Active",
    createdAt: "2025-01-28T14:25:00Z",
    updatedAt: "2025-02-03T09:35:00Z",
    draftedAt: null,
    actionMessage: "Now available for rent",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    code: "P-012",
    propertyName: "Seaside Retreat",
    group: "Hospitality",
    countryName: "Maldives",
    status: "Draft",
    createdAt: "2025-02-06T16:40:00Z",
    updatedAt: "2025-02-07T17:10:00Z",
    draftedAt: "2025-02-06T16:40:00Z",
    actionMessage: "Awaiting photography",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function PropertyDataTable({
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
  const canCreate = usePermission("property", "create");

  const componentColumns = [
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockTableData.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "propertyName",
      title: "Property Name",
      options: [...new Set(mockTableData.map((item) => item.propertyName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("propertyName")
          .localeCompare(row2.getValue("propertyName"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "propertyName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "group",
      title: "Group",
      options: [...new Set(mockTableData.map((item) => item.group))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("group").localeCompare(row2.getValue("group"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "group",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "countryName",
      title: "Country Name",
      options: [...new Set(mockTableData.map((item) => item.countryName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("countryName")
          .localeCompare(row2.getValue("countryName"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "countryName",
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
      fixedColumns={["code", "propertyName"]} // Pin leave types column
      pathName="property"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
