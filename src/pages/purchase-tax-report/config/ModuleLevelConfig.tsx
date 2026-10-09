import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  invoiceNo: string;
  customer: string;
  purchaseDate: string;
  rate: string;
  taxAmount: string;
  discount: string;
  invoiceTotal: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  invoiceNo: "",
  customer: "",
  purchaseDate: "",
  rate: "",
  taxAmount: "",
  discount: "",
  invoiceTotal: "",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["invoiceNo"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "invoiceNo", title: "Invoice Number" },
  { key: "customer", title: "Customer" },
  { key: "purchaseDate", title: "Purchase Date" },
  { key: "rate", title: "Rate" },
  { key: "taxAmount", title: "Tax Amount" },
  { key: "discount", title: "Discount" },
  { key: "invoiceTotal", title: "Invoice Total" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    invoiceNo: "INV-2001",
    customer: "John Doe",
    purchaseDate: "2025-09-01",
    rate: "500",
    taxAmount: "50",
    discount: "20",
    invoiceTotal: "530",
    status: "Paid",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-02",
    draftedAt: null,
    actionMessage: "Invoice confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    invoiceNo: "INV-2002",
    customer: "Emma Watson",
    purchaseDate: "2025-09-02",
    rate: "800",
    taxAmount: "80",
    discount: "50",
    invoiceTotal: "830",
    status: "Pending",
    createdAt: "2025-09-02",
    updatedAt: "2025-09-02",
    draftedAt: "2025-09-02",
    actionMessage: "Awaiting approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    invoiceNo: "INV-2003",
    customer: "Michael Brown",
    purchaseDate: "2025-09-03",
    rate: "1200",
    taxAmount: "120",
    discount: "0",
    invoiceTotal: "1320",
    status: "Paid",
    createdAt: "2025-09-03",
    updatedAt: "2025-09-04",
    draftedAt: null,
    actionMessage: "Invoice paid in full",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    invoiceNo: "INV-2004",
    customer: "Sophia Turner",
    purchaseDate: "2025-09-04",
    rate: "600",
    taxAmount: "60",
    discount: "30",
    invoiceTotal: "630",
    status: "Cancelled",
    createdAt: "2025-09-04",
    updatedAt: "2025-09-05",
    draftedAt: null,
    actionMessage: "Invoice cancelled",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    invoiceNo: "INV-2005",
    customer: "Chris Evans",
    purchaseDate: "2025-09-05",
    rate: "1500",
    taxAmount: "150",
    discount: "100",
    invoiceTotal: "1550",
    status: "Paid",
    createdAt: "2025-09-05",
    updatedAt: "2025-09-06",
    draftedAt: null,
    actionMessage: "Invoice cleared",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    invoiceNo: "INV-2006",
    customer: "Olivia Harris",
    purchaseDate: "2025-09-06",
    rate: "450",
    taxAmount: "45",
    discount: "15",
    invoiceTotal: "480",
    status: "Pending",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-06",
    draftedAt: "2025-09-06",
    actionMessage: "Awaiting payment",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    invoiceNo: "INV-2007",
    customer: "Daniel Clark",
    purchaseDate: "2025-09-07",
    rate: "950",
    taxAmount: "95",
    discount: "25",
    invoiceTotal: "1020",
    status: "Overdue",
    createdAt: "2025-09-07",
    updatedAt: "2025-09-08",
    draftedAt: null,
    actionMessage: "Payment overdue",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    invoiceNo: "INV-2008",
    customer: "Isabella Martinez",
    purchaseDate: "2025-09-08",
    rate: "1100",
    taxAmount: "110",
    discount: "40",
    invoiceTotal: "1170",
    status: "Paid",
    createdAt: "2025-09-08",
    updatedAt: "2025-09-09",
    draftedAt: null,
    actionMessage: "Invoice settled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    invoiceNo: "INV-2009",
    customer: "Ethan Wright",
    purchaseDate: "2025-09-09",
    rate: "300",
    taxAmount: "30",
    discount: "10",
    invoiceTotal: "320",
    status: "Cancelled",
    createdAt: "2025-09-09",
    updatedAt: "2025-09-09",
    draftedAt: null,
    actionMessage: "Cancelled by customer",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "10",
    invoiceNo: "INV-2010",
    customer: "Ava Robinson",
    purchaseDate: "2025-09-10",
    rate: "2000",
    taxAmount: "200",
    discount: "150",
    invoiceTotal: "2050",
    status: "Paid",
    createdAt: "2025-09-10",
    updatedAt: "2025-09-11",
    draftedAt: null,
    actionMessage: "Full payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    invoiceNo: "INV-2011",
    customer: "William Lewis",
    purchaseDate: "2025-09-11",
    rate: "1750",
    taxAmount: "175",
    discount: "75",
    invoiceTotal: "1850",
    status: "Pending",
    createdAt: "2025-09-11",
    updatedAt: "2025-09-11",
    draftedAt: "2025-09-11",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    invoiceNo: "INV-2012",
    customer: "Mia Thompson",
    purchaseDate: "2025-09-12",
    rate: "2500",
    taxAmount: "250",
    discount: "200",
    invoiceTotal: "2550",
    status: "Paid",
    createdAt: "2025-09-12",
    updatedAt: "2025-09-13",
    draftedAt: null,
    actionMessage: "Invoice closed",
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
  invoiceNo: "Invoice Number",
  customer: "Customer",
  purchaseDate: "Purchase Date",
  rate: "Rate",
  taxAmount: "Tax Amount",
  discount: "Discount",
  invoiceTotal: "Invoice Total",
};
