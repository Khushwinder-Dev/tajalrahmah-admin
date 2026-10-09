import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  salesAgent: string;
  discount: string;
  taxable: string;
  tax: string;
  netTotal: string;
  date: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  invoiceNumber: "",
  customerId: "",
  customerName: "",
  salesAgent: "",
  discount: "",
  taxable: "",
  tax: "",
  netTotal: "",
  date: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = ["invoiceNumber"];

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
  { key: "customerId", title: "Customer ID" },
  { key: "customerName", title: "Customer Name" },
  { key: "salesAgent", title: "Sales Agent" },
  { key: "date", title: "Date" },
  { key: "discount", title: "Discount" },
  { key: "taxable", title: "Taxable" },
  { key: "tax", title: "Tax" },
  { key: "netTotal", title: "Net Total" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    status: "Active",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-06",
    draftedAt: null,
    actionMessage: "Invoice finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    invoiceNumber: "INV-1001",
    customerId: "CUST-001",
    customerName: "Rahim Uddin",
    salesAgent: "Agent A",
    discount: "50",
    taxable: "1450",
    tax: "145",
    netTotal: "1595",
    date: "2025-01-05",
  },
  {
    id: "2",
    status: "Active",
    createdAt: "2025-01-06",
    updatedAt: "2025-01-06",
    draftedAt: null,
    actionMessage: "Invoice paid",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    invoiceNumber: "INV-1002",
    customerId: "CUST-002",
    customerName: "Karim Ali",
    salesAgent: "Agent B",
    discount: "100",
    taxable: "1900",
    tax: "190",
    netTotal: "2090",
    date: "2025-01-06",
  },
  {
    id: "3",
    status: "Draft",
    createdAt: "2025-01-07",
    updatedAt: "2025-01-07",
    draftedAt: "2025-01-07",
    actionMessage: "Invoice in draft",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    invoiceNumber: "INV-1003",
    customerId: "CUST-003",
    customerName: "Nasrin Jahan",
    salesAgent: "Agent C",
    discount: "0",
    taxable: "1200",
    tax: "120",
    netTotal: "1320",
    date: "2025-01-07",
  },
  {
    id: "4",
    status: "Deleted",
    createdAt: "2025-01-08",
    updatedAt: "2025-01-09",
    draftedAt: null,
    actionMessage: "Invoice deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    invoiceNumber: "INV-1004",
    customerId: "CUST-004",
    customerName: "Mahmudul Hasan",
    salesAgent: "Agent A",
    discount: "200",
    taxable: "2300",
    tax: "230",
    netTotal: "2530",
    date: "2025-01-08",
  },
  {
    id: "5",
    status: "Active",
    createdAt: "2025-01-09",
    updatedAt: "2025-01-09",
    draftedAt: null,
    actionMessage: "Invoice finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    invoiceNumber: "INV-1005",
    customerId: "CUST-005",
    customerName: "Sadia Afrin",
    salesAgent: "Agent D",
    discount: "150",
    taxable: "2850",
    tax: "285",
    netTotal: "3135",
    date: "2025-01-09",
  },
  {
    id: "6",
    status: "Updated",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-12",
    draftedAt: null,
    actionMessage: "Invoice updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    invoiceNumber: "INV-1006",
    customerId: "CUST-006",
    customerName: "Imran Hossain",
    salesAgent: "Agent B",
    discount: "80",
    taxable: "1720",
    tax: "172",
    netTotal: "1892",
    date: "2025-01-10",
  },
  {
    id: "7",
    status: "Active",
    createdAt: "2025-01-11",
    updatedAt: "2025-01-11",
    draftedAt: null,
    actionMessage: "Invoice paid",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    invoiceNumber: "INV-1007",
    customerId: "CUST-007",
    customerName: "Rafiq Chowdhury",
    salesAgent: "Agent C",
    discount: "100",
    taxable: "2100",
    tax: "210",
    netTotal: "2310",
    date: "2025-01-11",
  },
  {
    id: "8",
    status: "Draft",
    createdAt: "2025-01-12",
    updatedAt: "2025-01-12",
    draftedAt: "2025-01-12",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    invoiceNumber: "INV-1008",
    customerId: "CUST-008",
    customerName: "Mitu Akter",
    salesAgent: "Agent D",
    discount: "50",
    taxable: "1350",
    tax: "135",
    netTotal: "1485",
    date: "2025-01-12",
  },
  {
    id: "9",
    status: "Active",
    createdAt: "2025-01-13",
    updatedAt: "2025-01-13",
    draftedAt: null,
    actionMessage: "Invoice approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    invoiceNumber: "INV-1009",
    customerId: "CUST-009",
    customerName: "Shakil Ahmed",
    salesAgent: "Agent A",
    discount: "100",
    taxable: "2600",
    tax: "260",
    netTotal: "2860",
    date: "2025-01-13",
  },
  {
    id: "10",
    status: "Deleted",
    createdAt: "2025-01-14",
    updatedAt: "2025-01-15",
    draftedAt: null,
    actionMessage: "Invoice removed",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    invoiceNumber: "INV-1010",
    customerId: "CUST-010",
    customerName: "Tasnim Jahan",
    salesAgent: "Agent B",
    discount: "200",
    taxable: "3000",
    tax: "300",
    netTotal: "3300",
    date: "2025-01-14",
  },
  {
    id: "11",
    status: "Updated",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-16",
    draftedAt: null,
    actionMessage: "Invoice modified",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    invoiceNumber: "INV-1011",
    customerId: "CUST-011",
    customerName: "Nusrat Jahan",
    salesAgent: "Agent C",
    discount: "150",
    taxable: "2450",
    tax: "245",
    netTotal: "2695",
    date: "2025-01-15",
  },
  {
    id: "12",
    status: "Active",
    createdAt: "2025-01-16",
    updatedAt: "2025-01-16",
    draftedAt: null,
    actionMessage: "Invoice finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    invoiceNumber: "INV-1012",
    customerId: "CUST-012",
    customerName: "Tanvir Islam",
    salesAgent: "Agent D",
    discount: "100",
    taxable: "3400",
    tax: "340",
    netTotal: "3740",
    date: "2025-01-16",
  },
];

/*
===============================
# PDF Config
===============================
*/
export const printConfigFieldLabels: ModuleFieldsType = {
  customerId: "Customer ID",
  customerName: "Customer Name",
  salesAgent: "Sales Agent",
  discount: "Discount",
  taxable: "Taxable",
  tax: "Tax",
  netTotal: "Net Total",
  date: "Date",
  invoiceNumber: "Invoice Number",
};
