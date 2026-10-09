import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  invoiceNumber: string;
  customerName: string;
  taxAmount: string;
  totalAmount: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  invoiceNumber: "",
  customerName: "",
  taxAmount: "",
  totalAmount: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "invoiceNumber",
  "customerName",
  "taxAmount",
  "totalAmount",
];

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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["invoiceNumber"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "invoiceNumber", title: "Invoice Number" },
  { key: "customerName", title: "Customer Name" },
  { key: "taxAmount", title: "Tax Amount" },
  { key: "totalAmount", title: "Total Amount" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    invoiceNumber: "INV-1001",
    customerName: "John Doe",
    taxAmount: "15.00",
    totalAmount: "115.00",
    status: "Paid",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-02",
    draftedAt: null,
    actionMessage: "Invoice sent",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    invoiceNumber: "INV-1002",
    customerName: "Jane Smith",
    taxAmount: "20.00",
    totalAmount: "220.00",
    status: "Pending",
    createdAt: "2025-09-03",
    updatedAt: "2025-09-04",
    draftedAt: null,
    actionMessage: "Awaiting payment",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    invoiceNumber: "INV-1003",
    customerName: "Acme Corp",
    taxAmount: "50.00",
    totalAmount: "550.00",
    status: "Paid",
    createdAt: "2025-09-05",
    updatedAt: "2025-09-06",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    invoiceNumber: "INV-1004",
    customerName: "Global Ltd",
    taxAmount: "30.00",
    totalAmount: "330.00",
    status: "Overdue",
    createdAt: "2025-09-07",
    updatedAt: "2025-09-08",
    draftedAt: null,
    actionMessage: "Reminder sent",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    invoiceNumber: "INV-1005",
    customerName: "Bob Builder",
    taxAmount: "12.00",
    totalAmount: "112.00",
    status: "Paid",
    createdAt: "2025-09-09",
    updatedAt: "2025-09-10",
    draftedAt: null,
    actionMessage: "Invoice approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    invoiceNumber: "INV-1006",
    customerName: "Alice Wonderland",
    taxAmount: "18.00",
    totalAmount: "218.00",
    status: "Pending",
    createdAt: "2025-09-11",
    updatedAt: "2025-09-12",
    draftedAt: null,
    actionMessage: "Waiting for confirmation",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    invoiceNumber: "INV-1007",
    customerName: "Tech Solutions",
    taxAmount: "25.00",
    totalAmount: "275.00",
    status: "Paid",
    createdAt: "2025-09-13",
    updatedAt: "2025-09-14",
    draftedAt: null,
    actionMessage: "Payment confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    invoiceNumber: "INV-1008",
    customerName: "Bright Ideas",
    taxAmount: "22.00",
    totalAmount: "222.00",
    status: "Overdue",
    createdAt: "2025-09-15",
    updatedAt: "2025-09-16",
    draftedAt: null,
    actionMessage: "Second reminder sent",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    invoiceNumber: "INV-1009",
    customerName: "Sunshine Inc",
    taxAmount: "28.00",
    totalAmount: "328.00",
    status: "Paid",
    createdAt: "2025-09-17",
    updatedAt: "2025-09-18",
    draftedAt: null,
    actionMessage: "Invoice cleared",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    invoiceNumber: "INV-1010",
    customerName: "Happy Homes",
    taxAmount: "16.00",
    totalAmount: "116.00",
    status: "Pending",
    createdAt: "2025-09-19",
    updatedAt: "2025-09-20",
    draftedAt: null,
    actionMessage: "Awaiting client approval",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    invoiceNumber: "INV-1011",
    customerName: "Speedy Delivery",
    taxAmount: "35.00",
    totalAmount: "335.00",
    status: "Paid",
    createdAt: "2025-09-21",
    updatedAt: "2025-09-22",
    draftedAt: null,
    actionMessage: "Payment done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    invoiceNumber: "INV-1012",
    customerName: "Green Fields",
    taxAmount: "10.00",
    totalAmount: "110.00",
    status: "Overdue",
    createdAt: "2025-09-23",
    updatedAt: "2025-09-24",
    draftedAt: null,
    actionMessage: "Final notice sent",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  invoiceNumber: "Invoice Number",
  customerName: "Customer Name",
  taxAmount: "Tax Amount",
  totalAmount: "Total Amount",
};

export type GridDataType = ModuleFieldsType & {
  id: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

export const GridViewDataList: GridDataType[] = [
  {
    id: "1",
    invoiceNumber: "INV-1001",
    customerName: "John Doe",
    taxAmount: "15.00",
    totalAmount: "115.00",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-01"),
    draftedAt: null,
    updatedAt: new Date("2025-09-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    invoiceNumber: "INV-1002",
    customerName: "Jane Smith",
    taxAmount: "20.00",
    totalAmount: "220.00",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-03"),
    draftedAt: null,
    updatedAt: new Date("2025-09-04"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    invoiceNumber: "INV-1003",
    customerName: "Acme Corp",
    taxAmount: "50.00",
    totalAmount: "550.00",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-05"),
    draftedAt: null,
    updatedAt: new Date("2025-09-06"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    invoiceNumber: "INV-1004",
    customerName: "Global Ltd",
    taxAmount: "30.00",
    totalAmount: "330.00",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-09-07"),
    draftedAt: new Date("2025-09-08"),
    updatedAt: new Date("2025-09-09"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    invoiceNumber: "INV-1005",
    customerName: "Bob Builder",
    taxAmount: "12.00",
    totalAmount: "112.00",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-10"),
    draftedAt: null,
    updatedAt: new Date("2025-09-11"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    invoiceNumber: "INV-1006",
    customerName: "Alice Wonderland",
    taxAmount: "18.00",
    totalAmount: "218.00",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-12"),
    draftedAt: null,
    updatedAt: new Date("2025-09-13"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    invoiceNumber: "INV-1007",
    customerName: "Tech Solutions",
    taxAmount: "25.00",
    totalAmount: "275.00",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-14"),
    draftedAt: null,
    updatedAt: new Date("2025-09-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    invoiceNumber: "INV-1008",
    customerName: "Bright Ideas",
    taxAmount: "22.00",
    totalAmount: "222.00",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-09-16"),
    draftedAt: new Date("2025-09-17"),
    updatedAt: new Date("2025-09-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    invoiceNumber: "INV-1009",
    customerName: "Sunshine Inc",
    taxAmount: "28.00",
    totalAmount: "328.00",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-19"),
    draftedAt: null,
    updatedAt: new Date("2025-09-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    invoiceNumber: "INV-1010",
    customerName: "Happy Homes",
    taxAmount: "16.00",
    totalAmount: "116.00",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-21"),
    draftedAt: null,
    updatedAt: new Date("2025-09-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    invoiceNumber: "INV-1011",
    customerName: "Speedy Delivery",
    taxAmount: "35.00",
    totalAmount: "335.00",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-23"),
    draftedAt: null,
    updatedAt: new Date("2025-09-24"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    invoiceNumber: "INV-1012",
    customerName: "Green Fields",
    taxAmount: "10.00",
    totalAmount: "110.00",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-09-25"),
    draftedAt: new Date("2025-09-26"),
    updatedAt: new Date("2025-09-27"),
    deletedAt: null,
    isDeleted: false,
  },
];
