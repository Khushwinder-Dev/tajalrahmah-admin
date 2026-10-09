import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  invoiceNo: string;
  customer: string;
  subTotal: string;
  discount: string;
  tax: string;
  netAmount: string;
  date: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  invoiceNo: "",
  customer: "",
  subTotal: "",
  discount: "",
  tax: "",
  netAmount: "",
  date: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = ["invoiceNo"];

/*
======================================
Data Table View Config
======================================
*/

// Data table view data type
export type TableViewDataType = ModuleFieldsType & {
  id: string;
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

// add value in array if you want to add fixed columns left side
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["invoiceNo", "date"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "invoiceNo", title: "Invoice Number" },
  { key: "customer", title: "Customer" },
  { key: "date", title: "Date" },
  { key: "subTotal", title: "Sub Total" },
  { key: "discount", title: "Discount" },
  { key: "tax", title: "Tax" },
  { key: "netAmount", title: "Net Amount" },
  
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    invoiceNo: "INV-1001",
    customer: "John Doe",
    subTotal: "1200",
    discount: "100",
    tax: "50",
    netAmount: "1150",
    date: "2025-09-01",
    status: "Active",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "Invoice confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    invoiceNo: "INV-1002",
    customer: "Jane Smith",
    subTotal: "800",
    discount: "50",
    tax: "30",
    netAmount: "780",
    date: "2025-09-02",
    status: "Draft",
    createdAt: "2025-09-02T09:30:00Z",
    updatedAt: "2025-09-02T10:15:00Z",
    draftedAt: "2025-09-02T09:45:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    invoiceNo: "INV-1003",
    customer: "Robert Brown",
    subTotal: "1500",
    discount: "200",
    tax: "75",
    netAmount: "1375",
    date: "2025-09-03",
    status: "Deleted",
    createdAt: "2025-09-03T08:00:00Z",
    updatedAt: "2025-09-03T08:30:00Z",
    draftedAt: null,
    actionMessage: "Invoice deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "4",
    invoiceNo: "INV-1004",
    customer: "Emily Davis",
    subTotal: "600",
    discount: "20",
    tax: "15",
    netAmount: "595",
    date: "2025-09-04",
    status: "Updated",
    createdAt: "2025-09-04T11:20:00Z",
    updatedAt: "2025-09-05T14:00:00Z",
    draftedAt: null,
    actionMessage: "Invoice updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    invoiceNo: "INV-1005",
    customer: "Michael Wilson",
    subTotal: "2000",
    discount: "150",
    tax: "100",
    netAmount: "1950",
    date: "2025-09-05",
    status: "Active",
    createdAt: "2025-09-05T15:00:00Z",
    updatedAt: "2025-09-05T16:10:00Z",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    invoiceNo: "INV-1006",
    customer: "Sophia Taylor",
    subTotal: "950",
    discount: "70",
    tax: "40",
    netAmount: "920",
    date: "2025-09-06",
    status: "Draft",
    createdAt: "2025-09-06T10:00:00Z",
    updatedAt: "2025-09-06T10:30:00Z",
    draftedAt: "2025-09-06T10:10:00Z",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    invoiceNo: "INV-1007",
    customer: "David Martinez",
    subTotal: "1800",
    discount: "120",
    tax: "90",
    netAmount: "1770",
    date: "2025-09-07",
    status: "Active",
    createdAt: "2025-09-07T09:00:00Z",
    updatedAt: "2025-09-07T10:45:00Z",
    draftedAt: null,
    actionMessage: "Invoice processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    invoiceNo: "INV-1008",
    customer: "Olivia Anderson",
    subTotal: "700",
    discount: "30",
    tax: "25",
    netAmount: "695",
    date: "2025-09-08",
    status: "Deleted",
    createdAt: "2025-09-08T13:00:00Z",
    updatedAt: "2025-09-08T14:00:00Z",
    draftedAt: null,
    actionMessage: "Invoice deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "9",
    invoiceNo: "INV-1009",
    customer: "William Thomas",
    subTotal: "1300",
    discount: "100",
    tax: "60",
    netAmount: "1260",
    date: "2025-09-09",
    status: "Updated",
    createdAt: "2025-09-09T11:00:00Z",
    updatedAt: "2025-09-09T12:15:00Z",
    draftedAt: null,
    actionMessage: "Invoice updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    invoiceNo: "INV-1010",
    customer: "Isabella White",
    subTotal: "2200",
    discount: "200",
    tax: "120",
    netAmount: "2120",
    date: "2025-09-10",
    status: "Active",
    createdAt: "2025-09-10T14:00:00Z",
    updatedAt: "2025-09-10T15:20:00Z",
    draftedAt: null,
    actionMessage: "Invoice confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    invoiceNo: "INV-1011",
    customer: "James Harris",
    subTotal: "500",
    discount: "20",
    tax: "10",
    netAmount: "490",
    date: "2025-09-11",
    status: "Draft",
    createdAt: "2025-09-11T09:30:00Z",
    updatedAt: "2025-09-11T10:00:00Z",
    draftedAt: "2025-09-11T09:45:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    invoiceNo: "INV-1012",
    customer: "Ava Clark",
    subTotal: "1750",
    discount: "150",
    tax: "80",
    netAmount: "1680",
    date: "2025-09-12",
    status: "Active",
    createdAt: "2025-09-12T10:00:00Z",
    updatedAt: "2025-09-12T11:10:00Z",
    draftedAt: null,
    actionMessage: "Invoice processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];


/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  invoiceNo: "Invoice No",
  customer: "Customer",
  date: "Date",
  subTotal: "Sub Total",
  discount: "Discount",
  tax: "Tax",
  netAmount: "Net Amount",
};
