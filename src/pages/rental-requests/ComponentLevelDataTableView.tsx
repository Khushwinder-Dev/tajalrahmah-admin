/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  propertyName: string;
  customer: string;
  requestNumber: string;
  inspectionDate: string;
  leaseStartDate: string;
  term: string;
  endDate: string;
  dateCreated: string;
  propertyPrice: string;
  contractAmount: string;
  clientNote: string;
  adminNote: string;

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
    propertyName: "Greenwood Apartments",
    customer: "John Smith",
    requestNumber: "REQ-1001",
    inspectionDate: "2025-01-10",
    leaseStartDate: "2025-02-01",
    term: "12 months",
    endDate: "2026-01-31",
    dateCreated: "2025-01-05",
    propertyPrice: "250000",
    contractAmount: "12000",
    clientNote: "Looking for early move-in",
    adminNote: "Approved",
    status: "Active",
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2025-02-01T12:00:00Z",
    draftedAt: null,
    actionMessage: "Created new contract",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    propertyName: "Sunset Villas",
    customer: "Emma Johnson",
    requestNumber: "REQ-1002",
    inspectionDate: "2025-02-14",
    leaseStartDate: "2025-03-01",
    term: "6 months",
    endDate: "2025-08-31",
    dateCreated: "2025-02-10",
    propertyPrice: "180000",
    contractAmount: "8000",
    clientNote: "Requested furnished unit",
    adminNote: "Pending confirmation",
    status: "Draft",
    createdAt: "2025-02-10T09:30:00Z",
    updatedAt: "2025-02-12T15:00:00Z",
    draftedAt: "2025-02-11T10:00:00Z",
    actionMessage: "Drafted lease agreement",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    propertyName: "Riverside Complex",
    customer: "Michael Brown",
    requestNumber: "REQ-1003",
    inspectionDate: "2025-01-20",
    leaseStartDate: "2025-02-15",
    term: "24 months",
    endDate: "2027-02-14",
    dateCreated: "2025-01-15",
    propertyPrice: "320000",
    contractAmount: "24000",
    clientNote: "Wants pet-friendly policy",
    adminNote: "Approved with conditions",
    status: "Active",
    createdAt: "2025-01-15T14:00:00Z",
    updatedAt: "2025-02-16T10:00:00Z",
    draftedAt: null,
    actionMessage: "Lease signed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    propertyName: "Hilltop Residency",
    customer: "Sophia Williams",
    requestNumber: "REQ-1004",
    inspectionDate: "2025-03-05",
    leaseStartDate: "2025-04-01",
    term: "12 months",
    endDate: "2026-03-31",
    dateCreated: "2025-03-01",
    propertyPrice: "200000",
    contractAmount: "15000",
    clientNote: "Requested parking space",
    adminNote: "Under review",
    status: "Pending",
    createdAt: "2025-03-01T11:00:00Z",
    updatedAt: "2025-03-06T09:30:00Z",
    draftedAt: null,
    actionMessage: "Waiting for approval",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    propertyName: "Lakeview Homes",
    customer: "William Davis",
    requestNumber: "REQ-1005",
    inspectionDate: "2025-04-15",
    leaseStartDate: "2025-05-01",
    term: "6 months",
    endDate: "2025-10-31",
    dateCreated: "2025-04-10",
    propertyPrice: "175000",
    contractAmount: "7000",
    clientNote: "Requested early termination clause",
    adminNote: "Approved",
    status: "Active",
    createdAt: "2025-04-10T08:00:00Z",
    updatedAt: "2025-05-02T16:00:00Z",
    draftedAt: null,
    actionMessage: "Lease activated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    propertyName: "Downtown Plaza",
    customer: "Olivia Martinez",
    requestNumber: "REQ-1006",
    inspectionDate: "2025-01-30",
    leaseStartDate: "2025-02-20",
    term: "18 months",
    endDate: "2026-08-19",
    dateCreated: "2025-01-28",
    propertyPrice: "400000",
    contractAmount: "30000",
    clientNote: "Requested discount",
    adminNote: "Negotiated",
    status: "Active",
    createdAt: "2025-01-28T13:00:00Z",
    updatedAt: "2025-02-21T09:45:00Z",
    draftedAt: null,
    actionMessage: "Discount approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    propertyName: "Palm Gardens",
    customer: "James Wilson",
    requestNumber: "REQ-1007",
    inspectionDate: "2025-02-25",
    leaseStartDate: "2025-03-15",
    term: "12 months",
    endDate: "2026-03-14",
    dateCreated: "2025-02-22",
    propertyPrice: "220000",
    contractAmount: "16000",
    clientNote: "Requested garden maintenance",
    adminNote: "Approved",
    status: "Active",
    createdAt: "2025-02-22T12:00:00Z",
    updatedAt: "2025-03-16T10:30:00Z",
    draftedAt: null,
    actionMessage: "Lease finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    propertyName: "Ocean Breeze Condos",
    customer: "Isabella Taylor",
    requestNumber: "REQ-1008",
    inspectionDate: "2025-03-10",
    leaseStartDate: "2025-04-01",
    term: "36 months",
    endDate: "2028-03-31",
    dateCreated: "2025-03-05",
    propertyPrice: "600000",
    contractAmount: "50000",
    clientNote: "Needs ocean-facing unit",
    adminNote: "Approved with premium pricing",
    status: "Active",
    createdAt: "2025-03-05T15:00:00Z",
    updatedAt: "2025-04-02T14:00:00Z",
    draftedAt: null,
    actionMessage: "Premium applied",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    propertyName: "Royal Heights",
    customer: "Ethan Anderson",
    requestNumber: "REQ-1009",
    inspectionDate: "2025-02-05",
    leaseStartDate: "2025-02-25",
    term: "12 months",
    endDate: "2026-02-24",
    dateCreated: "2025-02-01",
    propertyPrice: "280000",
    contractAmount: "20000",
    clientNote: "Requested flexible rent",
    adminNote: "Negotiated",
    status: "Active",
    createdAt: "2025-02-01T11:00:00Z",
    updatedAt: "2025-02-26T10:00:00Z",
    draftedAt: null,
    actionMessage: "Contract finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    propertyName: "Silverline Towers",
    customer: "Charlotte Thomas",
    requestNumber: "REQ-1010",
    inspectionDate: "2025-03-12",
    leaseStartDate: "2025-04-01",
    term: "6 months",
    endDate: "2025-09-30",
    dateCreated: "2025-03-08",
    propertyPrice: "150000",
    contractAmount: "6000",
    clientNote: "Requested short lease",
    adminNote: "Approved",
    status: "Active",
    createdAt: "2025-03-08T10:00:00Z",
    updatedAt: "2025-04-02T09:00:00Z",
    draftedAt: null,
    actionMessage: "Lease executed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    propertyName: "Meadow Park",
    customer: "Daniel Garcia",
    requestNumber: "REQ-1011",
    inspectionDate: "2025-01-18",
    leaseStartDate: "2025-02-05",
    term: "24 months",
    endDate: "2027-02-04",
    dateCreated: "2025-01-12",
    propertyPrice: "350000",
    contractAmount: "28000",
    clientNote: "Wants extra storage",
    adminNote: "Approved",
    status: "Active",
    createdAt: "2025-01-12T14:30:00Z",
    updatedAt: "2025-02-06T12:00:00Z",
    draftedAt: null,
    actionMessage: "Storage clause added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    propertyName: "Cedar Lane Houses",
    customer: "Mia Lopez",
    requestNumber: "REQ-1012",
    inspectionDate: "2025-02-28",
    leaseStartDate: "2025-03-20",
    term: "12 months",
    endDate: "2026-03-19",
    dateCreated: "2025-02-25",
    propertyPrice: "270000",
    contractAmount: "18000",
    clientNote: "Requested pet allowance",
    adminNote: "Pending",
    status: "Pending",
    createdAt: "2025-02-25T09:00:00Z",
    updatedAt: "2025-03-01T11:00:00Z",
    draftedAt: null,
    actionMessage: "Approval pending",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
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
  const canCreate = usePermission("rentalRequests", "create");

  const componentColumns = [
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
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "propertyName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customer",
      title: "Customer",
      options: [...new Set(mockTableData.map((item) => item.customer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customer")
          .localeCompare(row2.getValue("customer"));
      },
      size: 200,
      minSize: 200,
      meta: {
        exportLabel: "customer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "requestNumber",
      title: "Request Number",
      options: [...new Set(mockTableData.map((item) => item.requestNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("requestNumber")
          .localeCompare(row2.getValue("requestNumber"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "requestNumber",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "inspectionDate",
      title: "Inspection Date",
      options: [...new Set(mockTableData.map((item) => item.inspectionDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("inspectionDate")
          .localeCompare(row2.getValue("inspectionDate"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "inspectionDate",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "leaseStartDate",
      title: "Lease Start Date",
      options: [...new Set(mockTableData.map((item) => item.leaseStartDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("leaseStartDate")
          .localeCompare(row2.getValue("leaseStartDate"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "leaseStartDate",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "term",
      title: "Term",
      options: [...new Set(mockTableData.map((item) => item.term))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("term").localeCompare(row2.getValue("term"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "term",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "endDate",
      title: "End Date",
      options: [...new Set(mockTableData.map((item) => item.endDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("endDate").localeCompare(row2.getValue("endDate"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "endDate",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "propertyPrice",
      title: "Property Price",
      options: [...new Set(mockTableData.map((item) => item.propertyPrice))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("propertyPrice")
          .localeCompare(row2.getValue("propertyPrice"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "propertyPrice",
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
      fixedColumns={["propertyName", "customer"]} // Pin leave types column
      pathName="rental-requests"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
