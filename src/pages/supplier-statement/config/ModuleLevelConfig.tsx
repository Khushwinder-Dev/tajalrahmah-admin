import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  documentNo: string;
  documentDate: string;
  invoiceNo: string;
  invoiceDate: string;
  narration: string;
  debit: string;
  credit: string;
  balance: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  documentNo: "",
  documentDate: "",
  invoiceNo: "",
  invoiceDate: "",
  narration: "",
  debit: "",
  credit: "",
  balance: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "documentNo",
  "documentDate",
  "invoiceNo",
  "invoiceDate",
  "narration",
  "debit",
  "credit",
  "balance",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["documentNo"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "documentNo", title: "Document No", readOnly: true },
  { key: "documentDate", title: "Document Date", readOnly: true },
  { key: "invoiceNo", title: "Invoice No", readOnly: true },
  { key: "invoiceDate", title: "Invoice Date", readOnly: true },
  { key: "narration", title: "Narration", readOnly: true },
  { key: "debit", title: "Debit", readOnly: true },
  { key: "credit", title: "Credit", readOnly: true },
  { key: "balance", title: "Balance", readOnly: true },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    documentNo: "DOC-2025-001",
    documentDate: "2025-09-01",
    invoiceNo: "INV-2025-0001",
    invoiceDate: "2025-09-01",
    narration:
      "Payment received from client ABC Ltd for software development services",
    debit: "0.00",
    credit: "150000.00",
    balance: "150000.00",
    status: "Posted",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-01",
    draftedAt: null,
    actionMessage: "Transaction posted successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    documentNo: "DOC-2025-002",
    documentDate: "2025-09-02",
    invoiceNo: "INV-2025-0002",
    invoiceDate: "2025-09-02",
    narration: "Office rent payment for September 2025",
    debit: "45000.00",
    credit: "0.00",
    balance: "105000.00",
    status: "Posted",
    createdAt: "2025-09-02",
    updatedAt: "2025-09-02",
    draftedAt: null,
    actionMessage: "Rent payment processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    documentNo: "DOC-2025-003",
    documentDate: "2025-09-03",
    invoiceNo: "INV-2025-0003",
    invoiceDate: "2025-09-03",
    narration: "Employee salary payment for August 2025",
    debit: "280000.00",
    credit: "0.00",
    balance: "-175000.00",
    status: "Posted",
    createdAt: "2025-09-03",
    updatedAt: "2025-09-03",
    draftedAt: null,
    actionMessage: "Salary disbursement completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    documentNo: "DOC-2025-004",
    documentDate: "2025-09-04",
    invoiceNo: "INV-2025-0004",
    invoiceDate: "2025-09-04",
    narration: "Equipment purchase - Dell laptops for development team",
    debit: "120000.00",
    credit: "0.00",
    balance: "-295000.00",
    status: "Draft",
    createdAt: "2025-09-04",
    updatedAt: "2025-09-04",
    draftedAt: "2025-09-04",
    actionMessage: "Pending approval from CFO",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    documentNo: "DOC-2025-005",
    documentDate: "2025-09-05",
    invoiceNo: "INV-2025-0005",
    invoiceDate: "2025-09-05",
    narration: "Service income from XYZ Corporation - mobile app development",
    debit: "0.00",
    credit: "200000.00",
    balance: "-95000.00",
    status: "Posted",
    createdAt: "2025-09-05",
    updatedAt: "2025-09-05",
    draftedAt: null,
    actionMessage: "Income recorded",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    documentNo: "DOC-2025-006",
    documentDate: "2025-09-06",
    invoiceNo: "INV-2025-0006",
    invoiceDate: "2025-09-06",
    narration: "Utility bills payment - electricity and internet",
    debit: "8500.00",
    credit: "0.00",
    balance: "-103500.00",
    status: "Posted",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-06",
    draftedAt: null,
    actionMessage: "Utility payments processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    documentNo: "DOC-2025-007",
    documentDate: "2025-09-07",
    invoiceNo: "INV-2025-0007",
    invoiceDate: "2025-09-07",
    narration: "Bank loan installment payment",
    debit: "25000.00",
    credit: "0.00",
    balance: "-128500.00",
    status: "Posted",
    createdAt: "2025-09-07",
    updatedAt: "2025-09-07",
    draftedAt: null,
    actionMessage: "Loan payment completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    documentNo: "DOC-2025-008",
    documentDate: "2025-09-08",
    invoiceNo: "INV-2025-0008",
    invoiceDate: "2025-09-08",
    narration: "Consulting fee received from PQR Ltd",
    debit: "0.00",
    credit: "75000.00",
    balance: "-53500.00",
    status: "Posted",
    createdAt: "2025-09-08",
    updatedAt: "2025-09-08",
    draftedAt: null,
    actionMessage: "Consulting income posted",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    documentNo: "DOC-2025-009",
    documentDate: "2025-09-09",
    invoiceNo: "INV-2025-0009",
    invoiceDate: "2025-09-09",
    narration: "Marketing expenses - Google Ads and social media campaigns",
    debit: "15000.00",
    credit: "0.00",
    balance: "-68500.00",
    status: "Draft",
    createdAt: "2025-09-09",
    updatedAt: "2025-09-09",
    draftedAt: "2025-09-09",
    actionMessage: "Awaiting marketing head approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    documentNo: "DOC-2025-010",
    documentDate: "2025-09-10",
    invoiceNo: "INV-2025-0010",
    invoiceDate: "2025-09-10",
    narration: "Insurance premium payment - office and equipment",
    debit: "12000.00",
    credit: "0.00",
    balance: "-80500.00",
    status: "Posted",
    createdAt: "2025-09-10",
    updatedAt: "2025-09-10",
    draftedAt: null,
    actionMessage: "Insurance payment completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    documentNo: "DOC-2025-001",
    documentDate: "2025-09-01",
    invoiceNo: "INV-2025-0001",
    invoiceDate: "2025-09-01",
    narration:
      "Payment received from client ABC Ltd for software development services",
    debit: "0.00",
    credit: "150000.00",
    balance: "150000.00",
    status: "Posted",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-01",
    draftedAt: null,
    actionMessage: "Transaction posted successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    documentNo: "DOC-2025-002",
    documentDate: "2025-09-02",
    invoiceNo: "INV-2025-0002",
    invoiceDate: "2025-09-02",
    narration: "Office rent payment for September 2025",
    debit: "45000.00",
    credit: "0.00",
    balance: "105000.00",
    status: "Posted",
    createdAt: "2025-09-02",
    updatedAt: "2025-09-02",
    draftedAt: null,
    actionMessage: "Rent payment processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    documentNo: "DOC-2025-003",
    documentDate: "2025-09-03",
    invoiceNo: "INV-2025-0003",
    invoiceDate: "2025-09-03",
    narration: "Employee salary payment for August 2025",
    debit: "280000.00",
    credit: "0.00",
    balance: "-175000.00",
    status: "Posted",
    createdAt: "2025-09-03",
    updatedAt: "2025-09-03",
    draftedAt: null,
    actionMessage: "Salary disbursement completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "14",
    documentNo: "DOC-2025-004",
    documentDate: "2025-09-04",
    invoiceNo: "INV-2025-0004",
    invoiceDate: "2025-09-04",
    narration: "Equipment purchase - Dell laptops for development team",
    debit: "120000.00",
    credit: "0.00",
    balance: "-295000.00",
    status: "Draft",
    createdAt: "2025-09-04",
    updatedAt: "2025-09-04",
    draftedAt: "2025-09-04",
    actionMessage: "Pending approval from CFO",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    documentNo: "DOC-2025-005",
    documentDate: "2025-09-05",
    invoiceNo: "INV-2025-0005",
    invoiceDate: "2025-09-05",
    narration: "Service income from XYZ Corporation - mobile app development",
    debit: "0.00",
    credit: "200000.00",
    balance: "-95000.00",
    status: "Posted",
    createdAt: "2025-09-05",
    updatedAt: "2025-09-05",
    draftedAt: null,
    actionMessage: "Income recorded",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    documentNo: "DOC-2025-006",
    documentDate: "2025-09-06",
    invoiceNo: "INV-2025-0006",
    invoiceDate: "2025-09-06",
    narration: "Utility bills payment - electricity and internet",
    debit: "8500.00",
    credit: "0.00",
    balance: "-103500.00",
    status: "Posted",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-06",
    draftedAt: null,
    actionMessage: "Utility payments processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    documentNo: "DOC-2025-007",
    documentDate: "2025-09-07",
    invoiceNo: "INV-2025-0007",
    invoiceDate: "2025-09-07",
    narration: "Bank loan installment payment",
    debit: "25000.00",
    credit: "0.00",
    balance: "-128500.00",
    status: "Posted",
    createdAt: "2025-09-07",
    updatedAt: "2025-09-07",
    draftedAt: null,
    actionMessage: "Loan payment completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "18",
    documentNo: "DOC-2025-008",
    documentDate: "2025-09-08",
    invoiceNo: "INV-2025-0008",
    invoiceDate: "2025-09-08",
    narration: "Consulting fee received from PQR Ltd",
    debit: "0.00",
    credit: "75000.00",
    balance: "-53500.00",
    status: "Posted",
    createdAt: "2025-09-08",
    updatedAt: "2025-09-08",
    draftedAt: null,
    actionMessage: "Consulting income posted",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    documentNo: "DOC-2025-009",
    documentDate: "2025-09-09",
    invoiceNo: "INV-2025-0009",
    invoiceDate: "2025-09-09",
    narration: "Marketing expenses - Google Ads and social media campaigns",
    debit: "15000.00",
    credit: "0.00",
    balance: "-68500.00",
    status: "Draft",
    createdAt: "2025-09-09",
    updatedAt: "2025-09-09",
    draftedAt: "2025-09-09",
    actionMessage: "Awaiting marketing head approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    documentNo: "DOC-2025-010",
    documentDate: "2025-09-10",
    invoiceNo: "INV-2025-0010",
    invoiceDate: "2025-09-10",
    narration: "Insurance premium payment - office and equipment",
    debit: "12000.00",
    credit: "0.00",
    balance: "-80500.00",
    status: "Posted",
    createdAt: "2025-09-10",
    updatedAt: "2025-09-10",
    draftedAt: null,
    actionMessage: "Insurance payment completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

/* 
==========================
# Create Page Config
==========================
*/

// create page types
export type ModuleCreateEditPageTypes = ModuleFieldsType & {
  isDefault: boolean;
  isDraft: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

// Utility to extract the keys of ModuleFieldsType whose values are strings
type StringKeys<T> = Extract<
  {
    [K in keyof T]-?: T[K] extends string ? K : never;
  }[keyof T],
  string
>;

// field config types
type FieldConfig = {
  name: StringKeys<ModuleFieldsType>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  component: "autocomplete" | "input" | "mutiselect";
  placeholder?: string;
  options?: string[];
  nextFocus?: string;
  tooltip?: string;
  required?: boolean;
};

export const initialDataWithValue: ModuleCreateEditPageTypes = {
  documentNo: "DOC-2025-011",
  documentDate: "2025-09-11",
  invoiceNo: "INV-2025-0011",
  invoiceDate: "2025-09-11",
  narration: "Office supplies purchase - stationery and equipment",
  debit: "5000.00",
  credit: "0.00",
  balance: "-85500.00",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

// add item for your necessary fields
export const formFields: FieldConfig[] = [
  {
    name: "documentNo",
    label: "Document No",
    component: "input",
    nextFocus: "documentDate",
    tooltip: "Enter document number",
    required: true,
  },
  {
    name: "documentDate",
    label: "Document Date",
    type: "date",
    component: "input",
    nextFocus: "invoiceNo",
    tooltip: "Select document date",
    required: true,
  },
  {
    name: "invoiceNo",
    label: "Invoice No",
    component: "input",
    nextFocus: "invoiceDate",
    tooltip: "Enter invoice number",
    required: true,
  },
  {
    name: "invoiceDate",
    label: "Invoice Date",
    type: "date",
    component: "input",
    nextFocus: "narration",
    tooltip: "Select invoice date",
    required: true,
  },
  {
    name: "narration",
    label: "Narration",
    component: "input",
    nextFocus: "debit",
    tooltip: "Enter detailed description of the transaction",
    required: true,
  },
  {
    name: "debit",
    label: "Debit",
    type: "number",
    component: "input",
    nextFocus: "credit",
    tooltip: "Enter debit amount (if any)",
    required: false,
  },
  {
    name: "credit",
    label: "Credit",
    type: "number",
    component: "input",
    nextFocus: "balance",
    tooltip: "Enter credit amount (if any)",
    required: false,
  },
  {
    name: "balance",
    label: "Balance",
    type: "number",
    component: "input",
    tooltip: "Enter current balance after transaction",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  documentNo: "Document No",
  documentDate: "Document Date",
  invoiceNo: "Invoice No",
  invoiceDate: "Invoice Date",
  narration: "Narration",
  debit: "Debit",
  credit: "Credit",
  balance: "Balance",
};
