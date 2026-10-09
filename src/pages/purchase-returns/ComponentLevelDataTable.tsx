/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";

type ListTableDataType = {
  documentNumber: string;
  purchaseInvoiceNumber: string;
  poNumber: string;
  poDate: string;
  supplierName: string;
  paymentType: string;
  dueDays: number;
  paymentDate: string;
  supplierNumber: string;
  supplierStatus: string;
  supplierGroup: string;
  remarks: string;
  country: string;
  state: string;
  city: string;

  // same for all component
  id: string;
  status: "active" | "inactive" | "draft";
  isActive: boolean;
  isDeleted: boolean;
  isDraft: boolean;
  isUpdated: boolean;
  actionMessage: string;
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
};

const listTableData: ListTableDataType[] = [
  {
    documentNumber: "PR-1001",
    purchaseInvoiceNumber: "INV-5001",
    poNumber: "PO-3001",
    poDate: "2025-06-15",
    supplierName: "Alpha Traders",
    paymentType: "Credit",
    dueDays: 30,
    paymentDate: "2025-07-15",
    supplierNumber: "SUP-001",
    supplierStatus: "Verified",
    supplierGroup: "Local",
    remarks: "Returned damaged items",
    country: "Bangladesh",
    state: "Dhaka",
    city: "Dhaka",
    id: "1",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "16 Jun 2025",
    createdAt: "2025-06-16T09:00:00Z",
    updatedAt: "2025-06-16T09:00:00Z",
    draftedAt: "",
  },
  {
    documentNumber: "PR-1002",
    purchaseInvoiceNumber: "INV-5002",
    poNumber: "PO-3002",
    poDate: "2025-06-18",
    supplierName: "Global Supplies",
    paymentType: "Cash",
    dueDays: 0,
    paymentDate: "2025-06-18",
    supplierNumber: "SUP-002",
    supplierStatus: "Active",
    supplierGroup: "International",
    remarks: "Late delivery",
    country: "India",
    state: "West Bengal",
    city: "Kolkata",
    id: "2",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "19 Jun 2025",
    createdAt: "2025-06-19T10:30:00Z",
    updatedAt: "2025-06-19T10:30:00Z",
    draftedAt: "",
  },
  {
    documentNumber: "PR-1003",
    purchaseInvoiceNumber: "INV-5003",
    poNumber: "PO-3003",
    poDate: "2025-06-20",
    supplierName: "Mega Mart",
    paymentType: "Credit",
    dueDays: 15,
    paymentDate: "2025-07-05",
    supplierNumber: "SUP-003",
    supplierStatus: "Pending",
    supplierGroup: "Local",
    remarks: "Mismatch in items",
    country: "Bangladesh",
    state: "Chattogram",
    city: "Chattogram",
    id: "3",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Draft saved",
    createdAt: "2025-06-21T12:00:00Z",
    updatedAt: "2025-06-21T12:00:00Z",
    draftedAt: "2025-06-21T12:00:00Z",
  },
  {
    documentNumber: "PR-1004",
    purchaseInvoiceNumber: "INV-5004",
    poNumber: "PO-3004",
    poDate: "2025-06-22",
    supplierName: "Delta Exports",
    paymentType: "Bank Transfer",
    dueDays: 20,
    paymentDate: "2025-07-12",
    supplierNumber: "SUP-004",
    supplierStatus: "Active",
    supplierGroup: "International",
    remarks: "Defective packaging",
    country: "China",
    state: "Guangdong",
    city: "Guangzhou",
    id: "4",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Record updated",
    createdAt: "2025-06-23T14:00:00Z",
    updatedAt: "2025-06-24T10:00:00Z",
    draftedAt: "",
  },
  {
    documentNumber: "PR-1005",
    purchaseInvoiceNumber: "INV-5005",
    poNumber: "PO-3005",
    poDate: "2025-06-25",
    supplierName: "Blue Ocean",
    paymentType: "Cash",
    dueDays: 0,
    paymentDate: "2025-06-25",
    supplierNumber: "SUP-005",
    supplierStatus: "Verified",
    supplierGroup: "Local",
    remarks: "Unapproved goods",
    country: "Bangladesh",
    state: "Sylhet",
    city: "Sylhet",
    id: "5",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Marked as deleted",
    createdAt: "2025-06-25T11:00:00Z",
    updatedAt: "2025-06-25T11:00:00Z",
    draftedAt: "",
  },
  {
    documentNumber: "PR-1006",
    purchaseInvoiceNumber: "INV-5006",
    poNumber: "PO-3006",
    poDate: "2025-06-26",
    supplierName: "Sunrise Co.",
    paymentType: "Credit",
    dueDays: 10,
    paymentDate: "2025-07-06",
    supplierNumber: "SUP-006",
    supplierStatus: "Active",
    supplierGroup: "International",
    remarks: "Exceeded PO quantity",
    country: "Thailand",
    state: "Bangkok",
    city: "Bangkok",
    id: "6",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "27 Jun 2025",
    createdAt: "2025-06-27T15:30:00Z",
    updatedAt: "2025-06-27T15:30:00Z",
    draftedAt: "",
  },
  {
    documentNumber: "PR-1007",
    purchaseInvoiceNumber: "INV-5007",
    poNumber: "PO-3007",
    poDate: "2025-06-28",
    supplierName: "Eastern Link",
    paymentType: "Bank Transfer",
    dueDays: 7,
    paymentDate: "2025-07-05",
    supplierNumber: "SUP-007",
    supplierStatus: "Verified",
    supplierGroup: "Local",
    remarks: "Wrong model received",
    country: "Bangladesh",
    state: "Khulna",
    city: "Khulna",
    id: "7",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Waiting approval",
    createdAt: "2025-06-29T09:45:00Z",
    updatedAt: "2025-06-29T09:45:00Z",
    draftedAt: "2025-06-29T09:45:00Z",
  },
  {
    documentNumber: "PR-1008",
    purchaseInvoiceNumber: "INV-5008",
    poNumber: "PO-3008",
    poDate: "2025-07-01",
    supplierName: "Techno World",
    paymentType: "Credit",
    dueDays: 20,
    paymentDate: "2025-07-21",
    supplierNumber: "SUP-008",
    supplierStatus: "Pending",
    supplierGroup: "International",
    remarks: "Returned expired items",
    country: "Singapore",
    state: "Central",
    city: "Singapore",
    id: "8",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Auto-sync update",
    createdAt: "2025-07-02T08:00:00Z",
    updatedAt: "2025-07-03T10:00:00Z",
    draftedAt: "",
  },
  {
    documentNumber: "PR-1009",
    purchaseInvoiceNumber: "INV-5009",
    poNumber: "PO-3009",
    poDate: "2025-07-03",
    supplierName: "Royal Traders",
    paymentType: "Cash",
    dueDays: 0,
    paymentDate: "2025-07-03",
    supplierNumber: "SUP-009",
    supplierStatus: "Verified",
    supplierGroup: "Local",
    remarks: "Wrong delivery location",
    country: "Bangladesh",
    state: "Rajshahi",
    city: "Rajshahi",
    id: "9",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Archived",
    createdAt: "2025-07-04T12:30:00Z",
    updatedAt: "2025-07-04T12:30:00Z",
    draftedAt: "",
  },
  {
    documentNumber: "PR-1010",
    purchaseInvoiceNumber: "INV-5010",
    poNumber: "PO-3010",
    poDate: "2025-07-05",
    supplierName: "Nova Enterprise",
    paymentType: "Credit",
    dueDays: 25,
    paymentDate: "2025-07-30",
    supplierNumber: "SUP-010",
    supplierStatus: "Active",
    supplierGroup: "International",
    remarks: "Rejected due to defect",
    country: "Malaysia",
    state: "Selangor",
    city: "Shah Alam",
    id: "10",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "20 Jul 2025",
    createdAt: "2025-07-06T10:10:00Z",
    updatedAt: "2025-07-06T10:10:00Z",
    draftedAt: "",
  },
];

export default function ComponentLevelDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
  setShowExport,
  showExport,
  setShowFilter,
  showFilter,
  setShowVisibility,
  showVisibility,
  isFilterOpen,
  setIsFilterOpen,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const componentColumns = [
    {
      accessorKey: "documentNumber",
      title: "Document Number",
      options: [...new Set(listTableData.map((item) => item.documentNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("documentNumber")
          .localeCompare(row2.getValue("documentNumber"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "documentNumber",
      },
    },
    {
      accessorKey: "purchaseInvoiceNumber",
      title: "Purchase Invoice Number",
      options: [
        ...new Set(listTableData.map((item) => item.purchaseInvoiceNumber)),
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
          .getValue("purchaseInvoiceNumber")
          .localeCompare(row2.getValue("purchaseInvoiceNumber"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "purchaseInvoiceNumber",
      },
    },
    {
      accessorKey: "poNumber",
      title: "PO Number",
      options: [...new Set(listTableData.map((item) => item.poNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("poNumber")
          .localeCompare(row2.getValue("poNumber"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "poNumber",
      },
    },
    {
      accessorKey: "poDate",
      title: "PO Date",
      options: [...new Set(listTableData.map((item) => item.poDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("poDate").localeCompare(row2.getValue("poDate"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "poDate",
      },
    },
    {
      accessorKey: "supplierName",
      title: "Supplier Name",
      options: [...new Set(listTableData.map((item) => item.supplierName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("supplierName")
          .localeCompare(row2.getValue("supplierName"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "supplierName",
      },
    },
    {
      accessorKey: "paymentType",
      title: "Payment Type",
      options: [...new Set(listTableData.map((item) => item.paymentType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("paymentType")
          .localeCompare(row2.getValue("paymentType"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "paymentType",
      },
    },

    {
      accessorKey: "dueDays",
      title: "Due Days",
      options: [...new Set(listTableData.map((item) => item.dueDays))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId);
        return filterValue.some(
          (filterVal: string | number) =>
            String(cellValue) === String(filterVal)
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("dueDays").localeCompare(row2.getValue("dueDays"));
      },
      size: 120,
      minSize: 80,
      meta: {
        exportLabel: "dueDays",
      },
    },

    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("createdAt")
          .localeCompare(row2.getValue("createdAt"));
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("updatedAt")
          .localeCompare(row2.getValue("updatedAt"));
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("draftedAt")
          .localeCompare(row2.getValue("draftedAt"));
      },
    },
  ];

  const filteredData = listTableData.filter((item) => {
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
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={[]} // Pin country name column
      pathName={"purchase-returns"}
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      searchQuery={""}
    />
  );
}
