/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  shippingPrefix: string;
  number: string;
  agency: string;
  officeOfOrigin: string;
  customer: string;
  customerAddress: string;
  recipient: string;
  recipientAddress: string;
  logisticService: string;
  paymentTerm: string;

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
    shippingPrefix: "SPX",
    number: "10001",
    agency: "FastShip Ltd.",
    officeOfOrigin: "Dhaka Central",
    customer: "Md. Rahim",
    customerAddress: "123, Gulshan Avenue, Dhaka",
    recipient: "Mr. Karim",
    recipientAddress: "45, Banani Road, Dhaka",
    logisticService: "Express",
    paymentTerm: "Prepaid",
    status: "Active",
    createdAt: "2025-08-01T09:15:00Z",
    updatedAt: "2025-08-01T10:00:00Z",
    draftedAt: null,
    actionMessage: "Shipment created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    shippingPrefix: "SPX",
    number: "10002",
    agency: "Creative Logistics",
    officeOfOrigin: "Chittagong Port",
    customer: "Nusrat Jahan",
    customerAddress: "456, Agrabad, Chittagong",
    recipient: "Sadia Akter",
    recipientAddress: "22, Uttara Sector 7, Dhaka",
    logisticService: "Standard",
    paymentTerm: "Cash on Delivery",
    status: "Active",
    createdAt: "2025-08-02T11:20:00Z",
    updatedAt: "2025-08-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "Shipment booked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    shippingPrefix: "SPX",
    number: "10003",
    agency: "SkyNet Courier",
    officeOfOrigin: "Dhaka Airport",
    customer: "Jahidul Islam",
    customerAddress: "78, Mirpur Road, Dhaka",
    recipient: "Rashid Khan",
    recipientAddress: "99, Kazla, Rajshahi",
    logisticService: "Overnight",
    paymentTerm: "Prepaid",
    status: "Inactive",
    createdAt: "2025-08-03T08:45:00Z",
    updatedAt: "2025-08-03T09:00:00Z",
    draftedAt: null,
    actionMessage: "Shipment cancelled",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    shippingPrefix: "SPX",
    number: "10004",
    agency: "Khulna Express",
    officeOfOrigin: "Khulna Hub",
    customer: "Hasan Mahmud",
    customerAddress: "12, Sonadanga, Khulna",
    recipient: "Abdul Karim",
    recipientAddress: "34, Jessore Road, Khulna",
    logisticService: "Economy",
    paymentTerm: "Prepaid",
    status: "Pending",
    createdAt: "2025-08-04T13:10:00Z",
    updatedAt: "2025-08-04T13:15:00Z",
    draftedAt: null,
    actionMessage: "Awaiting pickup",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    shippingPrefix: "SPX",
    number: "10005",
    agency: "Metro Logistics",
    officeOfOrigin: "Dhaka HQ",
    customer: "Sabbir Ahmed",
    customerAddress: "45, Mohakhali DOHS, Dhaka",
    recipient: "Shahidul Alam",
    recipientAddress: "67, New Eskaton, Dhaka",
    logisticService: "Express",
    paymentTerm: "Prepaid",
    status: "Active",
    createdAt: "2025-08-05T15:00:00Z",
    updatedAt: "2025-08-05T15:30:00Z",
    draftedAt: null,
    actionMessage: "Shipment confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    shippingPrefix: "SPX",
    number: "10006",
    agency: "Sylhet Cargo",
    officeOfOrigin: "Sylhet Branch",
    customer: "Rashid Khan",
    customerAddress: "89, Zindabazar, Sylhet",
    recipient: "Tanvir Hossain",
    recipientAddress: "55, Kalabagan, Dhaka",
    logisticService: "Standard",
    paymentTerm: "Cash on Delivery",
    status: "Active",
    createdAt: "2025-08-06T12:10:00Z",
    updatedAt: "2025-08-06T12:30:00Z",
    draftedAt: null,
    actionMessage: "Shipment dispatched",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    shippingPrefix: "SPX",
    number: "10007",
    agency: "Prime Logistics",
    officeOfOrigin: "Dhaka HQ",
    customer: "Rahim Uddin",
    customerAddress: "22, Tejgaon Industrial Area, Dhaka",
    recipient: "Nayeem Hasan",
    recipientAddress: "33, Chandgaon, Chittagong",
    logisticService: "Overnight",
    paymentTerm: "Prepaid",
    status: "Active",
    createdAt: "2025-08-07T10:45:00Z",
    updatedAt: "2025-08-07T11:00:00Z",
    draftedAt: null,
    actionMessage: "Updated customer details",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    shippingPrefix: "SPX",
    number: "10008",
    agency: "Chittagong Express",
    officeOfOrigin: "Chittagong Branch",
    customer: "Sabbir Hossain",
    customerAddress: "10, Nasirabad, Chittagong",
    recipient: "Anwar Hossain",
    recipientAddress: "71, Farmgate, Dhaka",
    logisticService: "Economy",
    paymentTerm: "Prepaid",
    status: "Inactive",
    createdAt: "2025-08-08T14:00:00Z",
    updatedAt: "2025-08-08T14:10:00Z",
    draftedAt: null,
    actionMessage: "Shipment disabled",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
];

export default function ShipmentDataTable({
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
  const canCreate = usePermission("expenses", "create");

  const componentColumns = [
    {
      accessorKey: "shippingPrefix",
      title: "Shipping Prefix",
      options: [...new Set(mockTableData.map((item) => item.shippingPrefix))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("shippingPrefix")
          .localeCompare(row2.getValue("shippingPrefix"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "shippingPrefix",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "number",
      title: "S.Number",
      options: [...new Set(mockTableData.map((item) => item.number))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("number").localeCompare(row2.getValue("number"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "number",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "agency",
      title: "Agency",
      options: [...new Set(mockTableData.map((item) => item.agency))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("agency").localeCompare(row2.getValue("agency"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "agency",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "officeOfOrigin",
      title: "Office of Origin",
      options: [...new Set(mockTableData.map((item) => item.officeOfOrigin))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("officeOfOrigin")
          .localeCompare(row2.getValue("officeOfOrigin"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "officeOfOrigin",
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
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "customer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customerAddress",
      title: "Customer Address",
      options: [...new Set(mockTableData.map((item) => item.customerAddress))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerAddress")
          .localeCompare(row2.getValue("customerAddress"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "customerAddress",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "recipient",
      title: "Recipient",
      options: [...new Set(mockTableData.map((item) => item.recipient))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("recipient")
          .localeCompare(row2.getValue("recipient"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "recipient",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "recipientAddress",
      title: "Recipient Address",
      options: [...new Set(mockTableData.map((item) => item.recipientAddress))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("recipientAddress")
          .localeCompare(row2.getValue("recipientAddress"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "recipientAddress",
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
      fixedColumns={["shippingPrefix"]} // Pin leave types column
      pathName="shipment"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
