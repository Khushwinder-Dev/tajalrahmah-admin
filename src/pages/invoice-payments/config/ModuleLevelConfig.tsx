import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  invoiceNumber: string;
  remainingAmount: string;
  amountReceived: string;
  paymentDate: string;
  paymentMode: string;
  transactionId: string;
  note: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  invoiceNumber: "",
  remainingAmount: "",
  amountReceived: "",
  paymentDate: "",
  paymentMode: "",
  transactionId: "",
  note: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "invoiceNumber",
  "paymentMode",
  "transactionId",
  "note",
];

/*
======================================
Data Table View Config
======================================
*/

// Data table view data type
export type TableViewDataType = ModuleFieldsType & {
  id: string;
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
  { key: "remainingAmount", title: "Remaining Amount" },
  { key: "amountReceived", title: "Amount Received" },
  { key: "paymentDate", title: "Payment Date" },
  { key: "paymentMode", title: "Payment Mode" },
  { key: "transactionId", title: "Transaction ID" },
  { key: "note", title: "Note" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    invoiceNumber: "INV-2025-001",
    remainingAmount: "500.00",
    amountReceived: "1500.00",
    paymentDate: "2025-01-15",
    paymentMode: "Credit Card",
    transactionId: "TXN-CC-001",
    note: "Payment received for medical consultation",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Payment processed successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-002",
    remainingAmount: "750.00",
    amountReceived: "250.00",
    paymentDate: "2025-01-16",
    paymentMode: "Cash",
    transactionId: "TXN-CASH-002",
    note: "Partial payment for surgery",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Partial payment recorded",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-003",
    remainingAmount: "0.00",
    amountReceived: "2000.00",
    paymentDate: "2025-01-17",
    paymentMode: "Bank Transfer",
    transactionId: "TXN-BT-003",
    note: "Full payment for diagnostic tests",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Payment completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-004",
    remainingAmount: "300.00",
    amountReceived: "200.00",
    paymentDate: "2025-01-18",
    paymentMode: "UPI",
    transactionId: "TXN-UPI-004",
    note: "Insurance co-payment",
    createdAt: "2025-01-04",
    updatedAt: "2025-01-31",
    draftedAt: "2025-01-30",
    actionMessage: "Payment under review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    invoiceNumber: "INV-2025-005",
    remainingAmount: "1200.00",
    amountReceived: "800.00",
    paymentDate: "2025-01-19",
    paymentMode: "Debit Card",
    transactionId: "TXN-DC-005",
    note: "Emergency treatment payment",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Payment processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
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
  invoiceNumber: "INV-2025-001",
  remainingAmount: "500.00",
  amountReceived: "1500.00",
  paymentDate: "2025-01-15",
  paymentMode: "Credit Card",
  transactionId: "TXN-CC-001",
  note: "Payment received for medical consultation",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

// add item for your nessasary fields
export const formFields: FieldConfig[] = [
  {
    name: "invoiceNumber",
    label: "Invoice Number",
    component: "input",
    nextFocus: "remainingAmount",
    tooltip: "Enter invoice number",
    required: true,
  },
  {
    name: "remainingAmount",
    label: "Remaining Amount",
    component: "input",
    type: "number",
    nextFocus: "amountReceived",
    tooltip: "Enter remaining amount to be paid",
    required: true,
  },
  {
    name: "amountReceived",
    label: "Amount Received",
    component: "input",
    type: "number",
    nextFocus: "paymentDate",
    tooltip: "Enter amount received",
    required: true,
  },
  {
    name: "paymentDate",
    label: "Payment Date",
    component: "input",
    type: "date",
    nextFocus: "paymentMode",
    tooltip: "Select payment date",
    required: true,
  },
  {
    name: "paymentMode",
    label: "Payment Mode",
    component: "autocomplete",
    options: [
      "Cash",
      "Credit Card",
      "Debit Card",
      "Bank Transfer",
      "UPI",
      "Cheque",
      "Net Banking",
      "Wallet",
    ],
    nextFocus: "transactionId",
    tooltip: "Select payment method",
    required: true,
  },
  {
    name: "transactionId",
    label: "Transaction ID",
    component: "input",
    nextFocus: "note",
    tooltip: "Enter transaction ID or reference number",
    required: false,
  },
  {
    name: "note",
    label: "Note",
    component: "input",
    tooltip: "Add any additional notes about the payment",
    required: false,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  invoiceNumber: "Invoice Number",
  remainingAmount: "Remaining Amount",
  amountReceived: "Amount Received",
  paymentDate: "Payment Date",
  paymentMode: "Payment Mode",
  transactionId: "Transaction ID",
  note: "Note",
};
