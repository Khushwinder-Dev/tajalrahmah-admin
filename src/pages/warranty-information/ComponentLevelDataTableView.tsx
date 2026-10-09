/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  customer: string;
  orderNumber: string;
  invoiceNumber: string;
  productOrServiceName: string;
  rate: number;
  quantity: number;
  serialNumber: string;

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
    customer: "Rahim Traders",
    orderNumber: "ORD-1001",
    invoiceNumber: "INV-5001",
    productOrServiceName: "Laptop",
    rate: 65000,
    quantity: 2,
    serialNumber: "SN-ALP-001",
    status: "Active",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-02T11:30:00Z",
    draftedAt: null,
    actionMessage: "Order confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    customer: "Karim Electronics",
    orderNumber: "ORD-1002",
    invoiceNumber: "INV-5002",
    productOrServiceName: "Mobile Phone",
    rate: 25000,
    quantity: 5,
    serialNumber: "SN-MBL-002",
    status: "Active",
    createdAt: "2025-01-03T09:15:00Z",
    updatedAt: "2025-01-03T09:45:00Z",
    draftedAt: null,
    actionMessage: "Order shipped",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    customer: "Digital World",
    orderNumber: "ORD-1003",
    invoiceNumber: "INV-5003",
    productOrServiceName: "Printer",
    rate: 18000,
    quantity: 3,
    serialNumber: "SN-PRN-003",
    status: "Draft",
    createdAt: "2025-01-05T14:00:00Z",
    updatedAt: "2025-01-06T08:20:00Z",
    draftedAt: "2025-01-05T14:00:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    customer: "Techno Hub",
    orderNumber: "ORD-1004",
    invoiceNumber: "INV-5004",
    productOrServiceName: "Router",
    rate: 4500,
    quantity: 6,
    serialNumber: "SN-RT-004",
    status: "Active",
    createdAt: "2025-01-07T12:10:00Z",
    updatedAt: "2025-01-08T16:30:00Z",
    draftedAt: null,
    actionMessage: "Delivered",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    customer: "Smart Solutions",
    orderNumber: "ORD-1005",
    invoiceNumber: "INV-5005",
    productOrServiceName: "Keyboard",
    rate: 1200,
    quantity: 10,
    serialNumber: "SN-KB-005",
    status: "Deleted",
    createdAt: "2025-01-10T07:00:00Z",
    updatedAt: "2025-01-11T10:30:00Z",
    draftedAt: null,
    actionMessage: "Order cancelled",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "6",
    customer: "Mega Mart",
    orderNumber: "ORD-1006",
    invoiceNumber: "INV-5006",
    productOrServiceName: "Mouse",
    rate: 800,
    quantity: 15,
    serialNumber: "SN-MS-006",
    status: "Active",
    createdAt: "2025-01-12T09:00:00Z",
    updatedAt: "2025-01-12T09:15:00Z",
    draftedAt: null,
    actionMessage: "Processing",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    customer: "Global Tech",
    orderNumber: "ORD-1007",
    invoiceNumber: "INV-5007",
    productOrServiceName: "Monitor",
    rate: 12000,
    quantity: 4,
    serialNumber: "SN-MNT-007",
    status: "Active",
    createdAt: "2025-01-14T10:20:00Z",
    updatedAt: "2025-01-15T11:10:00Z",
    draftedAt: null,
    actionMessage: "Packed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    customer: "BD IT Zone",
    orderNumber: "ORD-1008",
    invoiceNumber: "INV-5008",
    productOrServiceName: "External HDD",
    rate: 7000,
    quantity: 3,
    serialNumber: "SN-HDD-008",
    status: "Draft",
    createdAt: "2025-01-16T14:30:00Z",
    updatedAt: "2025-01-17T09:00:00Z",
    draftedAt: "2025-01-16T14:30:00Z",
    actionMessage: "Draft updated",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    customer: "Electro Point",
    orderNumber: "ORD-1009",
    invoiceNumber: "INV-5009",
    productOrServiceName: "Projector",
    rate: 55000,
    quantity: 1,
    serialNumber: "SN-PJ-009",
    status: "Active",
    createdAt: "2025-01-18T08:40:00Z",
    updatedAt: "2025-01-19T10:00:00Z",
    draftedAt: null,
    actionMessage: "Delivered",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    customer: "Future Tech",
    orderNumber: "ORD-1010",
    invoiceNumber: "INV-5010",
    productOrServiceName: "Smart Watch",
    rate: 8000,
    quantity: 7,
    serialNumber: "SN-SW-010",
    status: "Active",
    createdAt: "2025-01-20T09:10:00Z",
    updatedAt: "2025-01-21T11:45:00Z",
    draftedAt: null,
    actionMessage: "Shipped",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    customer: "Gadget House",
    orderNumber: "ORD-1011",
    invoiceNumber: "INV-5011",
    productOrServiceName: "Tablet",
    rate: 30000,
    quantity: 2,
    serialNumber: "SN-TB-011",
    status: "Deleted",
    createdAt: "2025-01-22T13:00:00Z",
    updatedAt: "2025-01-23T14:00:00Z",
    draftedAt: null,
    actionMessage: "Deleted by admin",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "12",
    customer: "Tech Valley",
    orderNumber: "ORD-1012",
    invoiceNumber: "INV-5012",
    productOrServiceName: "CCTV Camera",
    rate: 15000,
    quantity: 6,
    serialNumber: "SN-CC-012",
    status: "Active",
    createdAt: "2025-01-24T09:30:00Z",
    updatedAt: "2025-01-25T10:10:00Z",
    draftedAt: null,
    actionMessage: "Confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
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
  const canCreate = usePermission("warrantyInformation", "create");

  const componentColumns = [
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
      minSize: 150,
      meta: {
        exportLabel: "customer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "orderNumber",
      title: "Order Number",
      options: [...new Set(mockTableData.map((item) => item.orderNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("orderNumber")
          .localeCompare(row2.getValue("orderNumber"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "orderNumber",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "invoiceNumber",
      title: "Invoice Number",
      options: [...new Set(mockTableData.map((item) => item.invoiceNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("invoiceNumber")
          .localeCompare(row2.getValue("invoiceNumber"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "invoiceNumber",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "productOrServiceName",
      title: "Product Or Service Name",
      options: [
        ...new Set(mockTableData.map((item) => item.productOrServiceName)),
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
          .getValue("productOrServiceName")
          .localeCompare(row2.getValue("productOrServiceName"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "productOrServiceName",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "rate",
      title: "Rate",
      options: [...new Set(mockTableData.map((item) => item.rate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("rate").localeCompare(row2.getValue("rate"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "rate",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "quantity",
      title: "Quantity",
      options: [...new Set(mockTableData.map((item) => item.quantity))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("quantity")
          .localeCompare(row2.getValue("quantity"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "quantity",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "serialNumber",
      title: "Serial Number",
      options: [...new Set(mockTableData.map((item) => item.serialNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("serialNumber")
          .localeCompare(row2.getValue("serialNumber"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "serialNumber",
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
      fixedColumns={["customer", "orderNumber"]} // Pin leave types column
      pathName="warranty-information"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
