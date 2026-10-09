/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;
  jobLocation: string;
  country: string;
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
    id: "LOC-TAB-001",
    jobLocation: "Dhaka",
    country: "Bangladesh",
    description: "Head office for administrative and tech roles",
    status: "Active",
    createdAt: "2025-08-01T09:00:00Z",
    updatedAt: "2025-08-02T10:00:00Z",
    draftedAt: null,
    actionMessage: "Location created and active",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "LOC-TAB-002",
    jobLocation: "Chittagong",
    country: "Bangladesh",
    description: "Port city office, focus on logistics and shipping",
    status: "Active",
    createdAt: "2025-08-02T11:00:00Z",
    updatedAt: "2025-08-03T12:00:00Z",
    draftedAt: null,
    actionMessage: "Office operational for logistics",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "LOC-TAB-003",
    jobLocation: "Sylhet",
    country: "Bangladesh",
    description: "Regional branch for tea industry operations",
    status: "Draft",
    createdAt: "2025-08-03T13:00:00Z",
    updatedAt: "2025-08-04T14:00:00Z",
    draftedAt: "2025-08-03T15:00:00Z",
    actionMessage: "Drafted for review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "LOC-TAB-004",
    jobLocation: "Khulna",
    country: "Bangladesh",
    description: "Manufacturing and industrial hub office",
    status: "Active",
    createdAt: "2025-08-04T15:00:00Z",
    updatedAt: "2025-08-05T16:00:00Z",
    draftedAt: null,
    actionMessage: "Manufacturing operations live",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "LOC-TAB-005",
    jobLocation: "Barisal",
    country: "Bangladesh",
    description: "Agricultural support and logistics center",
    status: "Active",
    createdAt: "2025-08-05T17:00:00Z",
    updatedAt: "2025-08-06T18:00:00Z",
    draftedAt: null,
    actionMessage: "Agri support operational",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "LOC-TAB-006",
    jobLocation: "Rajshahi",
    country: "Bangladesh",
    description: "Textile industry regional office",
    status: "Active",
    createdAt: "2025-08-06T19:00:00Z",
    updatedAt: "2025-08-07T20:00:00Z",
    draftedAt: null,
    actionMessage: "Textile operations active",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "LOC-TAB-007",
    jobLocation: "Rangpur",
    country: "Bangladesh",
    description: "Agricultural and rural development office",
    status: "Active",
    createdAt: "2025-08-07T21:00:00Z",
    updatedAt: "2025-08-08T22:00:00Z",
    draftedAt: null,
    actionMessage: "Rural development unit running",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "LOC-TAB-008",
    jobLocation: "Comilla",
    country: "Bangladesh",
    description: "Regional office for textile and manufacturing",
    status: "Draft",
    createdAt: "2025-08-08T23:00:00Z",
    updatedAt: "2025-08-09T01:00:00Z",
    draftedAt: "2025-08-09T00:00:00Z",
    actionMessage: "Awaiting approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "LOC-TAB-009",
    jobLocation: "Narayanganj",
    country: "Bangladesh",
    description: "Industrial and commercial hub near Dhaka",
    status: "Active",
    createdAt: "2025-08-09T02:00:00Z",
    updatedAt: "2025-08-10T03:00:00Z",
    draftedAt: null,
    actionMessage: "Industrial zone in operation",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "LOC-TAB-010",
    jobLocation: "Gazipur",
    country: "Bangladesh",
    description: "Industrial zone with textile factories",
    status: "Active",
    createdAt: "2025-08-10T04:00:00Z",
    updatedAt: "2025-08-11T05:00:00Z",
    draftedAt: null,
    actionMessage: "Factories operational",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "LOC-TAB-011",
    jobLocation: "Feni",
    country: "Bangladesh",
    description: "Regional office for manufacturing and trade",
    status: "Deleted",
    createdAt: "2025-08-11T06:00:00Z",
    updatedAt: "2025-08-12T07:00:00Z",
    draftedAt: null,
    actionMessage: "Location removed from system",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "LOC-TAB-012",
    jobLocation: "Cox's Bazar",
    country: "Bangladesh",
    description: "Tourism office and coastal operations",
    status: "Active",
    createdAt: "2025-08-12T08:00:00Z",
    updatedAt: "2025-08-13T09:00:00Z",
    draftedAt: null,
    actionMessage: "Tourism operations live",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function JobLocationsDataTable({
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
  const canCreate = usePermission("jobLocations", "create");

  const componentColumns = [
    {
      accessorKey: "jobLocation",
      title: "Job Location",
      options: [...new Set(mockTableData.map((item) => item.jobLocation))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("jobLocation")
          .localeCompare(row2.getValue("jobLocation"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "jobLocation",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockTableData.map((item) => item.country))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "country",
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
      size: 150,
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
      fixedColumns={["jobLocation"]} // Pin leave types column
      pathName="jobLocations"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
