/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  claimCode: string;
  dateCreated: string;
  customer: string;
  invoice: string;
  productService: string;
  receiptProcess: string;
  description: string;
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
    claimCode: "CLM-1001",
    dateCreated: "2025-01-05",
    customer: "John Doe",
    invoice: "INV-2001",
    productService: "Laptop Repair",
    receiptProcess: "Submitted",
    description: "Laptop screen replacement under warranty.",
    clientNote: "Please process quickly.",
    adminNote: "Approved for repair.",
    status: "Active",
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2025-01-08T12:00:00Z",
    draftedAt: null,
    actionMessage: "Activated successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    claimCode: "CLM-1002",
    dateCreated: "2025-01-07",
    customer: "Jane Smith",
    invoice: "INV-2002",
    productService: "Phone Replacement",
    receiptProcess: "Processing",
    description: "Customer reported hardware failure.",
    clientNote: "Urgent replacement needed.",
    adminNote: "Pending approval.",
    status: "Updated",
    createdAt: "2025-01-07T09:30:00Z",
    updatedAt: "2025-01-10T11:00:00Z",
    draftedAt: null,
    actionMessage: "Record updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    claimCode: "CLM-1003",
    dateCreated: "2025-01-10",
    customer: "Michael Lee",
    invoice: "INV-2003",
    productService: "Software License",
    receiptProcess: "Submitted",
    description: "Request for license renewal.",
    clientNote: "Need by end of week.",
    adminNote: "Approved.",
    status: "Active",
    createdAt: "2025-01-10T08:45:00Z",
    updatedAt: "2025-01-12T14:20:00Z",
    draftedAt: null,
    actionMessage: "Claim approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    claimCode: "CLM-1004",
    dateCreated: "2025-01-12",
    customer: "Emma Watson",
    invoice: "INV-2004",
    productService: "Printer Service",
    receiptProcess: "Draft",
    description: "Printer not working properly.",
    clientNote: "Will provide more info later.",
    adminNote: "Waiting for details.",
    status: "Draft",
    createdAt: "2025-01-12T12:10:00Z",
    updatedAt: "2025-01-12T12:10:00Z",
    draftedAt: "2025-01-12T12:10:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    claimCode: "CLM-1005",
    dateCreated: "2025-01-15",
    customer: "David Johnson",
    invoice: "INV-2005",
    productService: "Monitor Replacement",
    receiptProcess: "Processing",
    description: "Monitor showing dead pixels.",
    clientNote: "Replacement requested.",
    adminNote: "Under review.",
    status: "Active",
    createdAt: "2025-01-15T09:00:00Z",
    updatedAt: "2025-01-17T10:30:00Z",
    draftedAt: null,
    actionMessage: "Active claim",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    claimCode: "CLM-1006",
    dateCreated: "2025-01-17",
    customer: "Sophia Brown",
    invoice: "INV-2006",
    productService: "Tablet Repair",
    receiptProcess: "Deleted",
    description: "Tablet charging issue.",
    clientNote: "Not urgent.",
    adminNote: "Duplicate request.",
    status: "Deleted",
    createdAt: "2025-01-17T15:20:00Z",
    updatedAt: "2025-01-19T09:00:00Z",
    draftedAt: null,
    actionMessage: "Claim deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "7",
    claimCode: "CLM-1007",
    dateCreated: "2025-01-20",
    customer: "Oliver Davis",
    invoice: "INV-2007",
    productService: "Headphone Warranty",
    receiptProcess: "Submitted",
    description: "Headphones not working on left side.",
    clientNote: "Expect replacement soon.",
    adminNote: "Sent for inspection.",
    status: "Active",
    createdAt: "2025-01-20T11:00:00Z",
    updatedAt: "2025-01-23T10:15:00Z",
    draftedAt: null,
    actionMessage: "In progress",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    claimCode: "CLM-1008",
    dateCreated: "2025-01-22",
    customer: "Lucas Miller",
    invoice: "INV-2008",
    productService: "Smartwatch Replacement",
    receiptProcess: "Processing",
    description: "Screen cracked within warranty.",
    clientNote: "Need urgent replacement.",
    adminNote: "Pending shipment.",
    status: "Updated",
    createdAt: "2025-01-22T09:45:00Z",
    updatedAt: "2025-01-25T16:30:00Z",
    draftedAt: null,
    actionMessage: "Updated with shipment details",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    claimCode: "CLM-1009",
    dateCreated: "2025-01-25",
    customer: "Mia Wilson",
    invoice: "INV-2009",
    productService: "Desktop Service",
    receiptProcess: "Submitted",
    description: "PC shutting down randomly.",
    clientNote: "Needs urgent fix.",
    adminNote: "Forwarded to service team.",
    status: "Active",
    createdAt: "2025-01-25T13:00:00Z",
    updatedAt: "2025-01-28T12:00:00Z",
    draftedAt: null,
    actionMessage: "Service assigned",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    claimCode: "CLM-1010",
    dateCreated: "2025-01-28",
    customer: "James Anderson",
    invoice: "INV-2010",
    productService: "Keyboard Replacement",
    receiptProcess: "Draft",
    description: "Keys not functioning.",
    clientNote: "Will confirm later.",
    adminNote: "Incomplete claim.",
    status: "Draft",
    createdAt: "2025-01-28T08:00:00Z",
    updatedAt: "2025-01-28T08:00:00Z",
    draftedAt: "2025-01-28T08:00:00Z",
    actionMessage: "Draft in progress",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    claimCode: "CLM-1011",
    dateCreated: "2025-01-30",
    customer: "Charlotte Martinez",
    invoice: "INV-2011",
    productService: "Warranty Claim",
    receiptProcess: "Submitted",
    description: "Product under warranty not working.",
    clientNote: "Please replace quickly.",
    adminNote: "Review in progress.",
    status: "Active",
    createdAt: "2025-01-30T10:20:00Z",
    updatedAt: "2025-02-02T14:30:00Z",
    draftedAt: null,
    actionMessage: "Claim in review",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    claimCode: "CLM-1012",
    dateCreated: "2025-02-02",
    customer: "Ethan Thomas",
    invoice: "INV-2012",
    productService: "Software Installation",
    receiptProcess: "Deleted",
    description: "Issue with product key.",
    clientNote: "Not valid.",
    adminNote: "Duplicate request.",
    status: "Deleted",
    createdAt: "2025-02-02T11:30:00Z",
    updatedAt: "2025-02-04T09:45:00Z",
    draftedAt: null,
    actionMessage: "Marked as deleted",
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
  const canCreate = usePermission("warranties", "create");

  const componentColumns = [
    {
      accessorKey: "claimCode",
      title: "Claim Code",
      options: [...new Set(mockTableData.map((item) => item.claimCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("claimCode")
          .localeCompare(row2.getValue("claimCode"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "claimCode",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "dateCreated",
      title: "Date Created",
      options: [...new Set(mockTableData.map((item) => item.dateCreated))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("dateCreated")
          .localeCompare(row2.getValue("dateCreated"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "dateCreated",
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
      minSize: 180,
      meta: {
        exportLabel: "customer",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "invoice",
      title: "Invoice",
      options: [...new Set(mockTableData.map((item) => item.invoice))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("invoice").localeCompare(row2.getValue("invoice"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "invoice",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "productService",
      title: "Product Service",
      options: [...new Set(mockTableData.map((item) => item.productService))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("productService")
          .localeCompare(row2.getValue("productService"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "productService",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "productService",
      title: "Product Service",
      options: [...new Set(mockTableData.map((item) => item.productService))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("productService")
          .localeCompare(row2.getValue("productService"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "productService",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "receiptProcess",
      title: "Receipt Process",
      options: [...new Set(mockTableData.map((item) => item.receiptProcess))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("receiptProcess")
          .localeCompare(row2.getValue("receiptProcess"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "receiptProcess",
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
      minSize: 180,
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
      fixedColumns={["claimCode", "dateCreated"]} // Pin leave types column
      pathName="warranties"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
