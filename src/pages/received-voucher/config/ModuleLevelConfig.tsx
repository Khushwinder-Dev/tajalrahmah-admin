import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  branch: string;
  voucherNumber: string;
  category: string;
  subCategory: string;
  expense: string;
  date: string;
  amount: string;
  currency: string;
  paymentMode: string;
  vat: string;
  supplier: string;
  approvedBy: string;
  purchaseNumber: string;
  supplierVatNumber: string;
  expenseBy: string;
  expenseFor: string;
  applyToVat: string;
  note: string;

  attachment: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  branch: "",
  voucherNumber: "",
  category: "",
  subCategory: "",
  expense: "",
  date: "",
  amount: "",
  currency: "",
  paymentMode: "",
  vat: "",
  supplier: "",
  approvedBy: "",
  purchaseNumber: "",
  supplierVatNumber: "",
  expenseBy: "",
  expenseFor: "",
  applyToVat: "",
  note: "",
  attachment: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "branch",
  "voucherNumber",
  "category",
  "subCategory",
  "expense",
  "date",
  "amount",
  "currency",
  "paymentMode",
  "vat",
  "supplier",
  "approvedBy",
  "purchaseNumber",
  "supplierVatNumber",
  "expenseBy",
  "expenseFor",
  "applyToVat",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = [
  "branch",
  "category",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "branch", title: "Branch" },
  { key: "category", title: "Category" },
  { key: "subCategory", title: "Sub Category" },
  { key: "expense", title: "Expense" },
  { key: "date", title: "Date" },
  { key: "amount", title: "Amount" },
  { key: "currency", title: "Currency" },
  { key: "paymentMode", title: "Payment Mode" },
  { key: "vat", title: "VAT" },
  { key: "supplier", title: "Supplier" },
  { key: "approvedBy", title: "Approved By" },
  { key: "purchaseNumber", title: "Purchase Number" },
  { key: "supplierVatNumber", title: "Supplier VAT Number" },
  { key: "expenseBy", title: "Expense By" },
  { key: "expenseFor", title: "Expense For" },
  { key: "applyToVat", title: "Apply To VAT" },
  { key: "note", title: "Note" },
  { key: "attachment", title: "Attachment" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    branch: "Head Office",
    voucherNumber: "V001",
    category: "Travel",
    subCategory: "Domestic",
    expense: "Air Ticket",
    date: "2025-08-20",
    amount: "5000",
    currency: "USD",
    paymentMode: "Cash",
    vat: "10%",
    supplier: "ABC Travels",
    approvedBy: "John Doe",
    purchaseNumber: "INV-12345",
    supplierVatNumber: "VAT-987654321",
    expenseBy: "Michael Scott",
    expenseFor: "Regional Meeting",
    applyToVat: "Yes",
    note: "Flight to New York for client visit",
    attachment: "ticket-ny.pdf",
    status: "Active",
    createdAt: "2025-08-20",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Approved by CTO",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    branch: "Head Office",
    voucherNumber: "V002",
    category: "Travel",
    subCategory: "International",
    expense: "Hotel Stay",
    date: "2025-08-22",
    amount: "1200",
    currency: "USD",
    paymentMode: "Credit Card",
    vat: "12%",
    supplier: "Hilton Hotels",
    approvedBy: "Sarah Lee",
    purchaseNumber: "INV-67891",
    supplierVatNumber: "VAT-543216789",
    expenseBy: "Dwight Schrute",
    expenseFor: "Conference in Berlin",
    applyToVat: "Yes",
    note: "3 nights stay during IT summit",
    attachment: "hotel-berlin.pdf",
    status: "Draft",
    createdAt: "2025-08-21",
    updatedAt: "2025-08-24",
    draftedAt: "2025-08-22",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    branch: "Chittagong Office",
    voucherNumber: "V003",
    category: "Office Supplies",
    subCategory: "Stationery",
    expense: "Printer Paper",
    date: "2025-08-18",
    amount: "300",
    currency: "BDT",
    paymentMode: "Cash",
    vat: "5%",
    supplier: "Paper House Ltd",
    approvedBy: "Tanvir Ahmed",
    purchaseNumber: "PO-99871",
    supplierVatNumber: "VAT-111223344",
    expenseBy: "Nusrat Jahan",
    expenseFor: "Daily office use",
    applyToVat: "Yes",
    note: "Bulk paper purchase",
    attachment: "paper-bill.pdf",
    status: "Active",
    createdAt: "2025-08-18",
    updatedAt: "2025-08-20",
    draftedAt: null,
    actionMessage: "Approved by Admin",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    branch: "Dhaka HQ",
    voucherNumber: "V004",
    category: "Utilities",
    subCategory: "Electricity",
    expense: "Electric Bill",
    date: "2025-08-15",
    amount: "25000",
    currency: "BDT",
    paymentMode: "Bank Transfer",
    vat: "0%",
    supplier: "DESCO",
    approvedBy: "Finance Head",
    purchaseNumber: "BILL-202508",
    supplierVatNumber: "N/A",
    expenseBy: "Accounts Dept",
    expenseFor: "Office utilities",
    applyToVat: "No",
    note: "Monthly electricity bill",
    attachment: "electricity-august.pdf",
    status: "Active",
    createdAt: "2025-08-15",
    updatedAt: "2025-08-19",
    draftedAt: null,
    actionMessage: "Paid successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    branch: "Head Office",
    voucherNumber: "V005",
    category: "Maintenance",
    subCategory: "IT Support",
    expense: "Laptop Repair",
    date: "2025-08-12",
    amount: "8000",
    currency: "BDT",
    paymentMode: "Cash",
    vat: "7%",
    supplier: "TechFix Ltd",
    approvedBy: "IT Manager",
    purchaseNumber: "INV-77881",
    supplierVatNumber: "VAT-555666777",
    expenseBy: "Shahidul Islam",
    expenseFor: "Development Team",
    applyToVat: "Yes",
    note: "Laptop motherboard replacement",
    attachment: "repair-bill.pdf",
    status: "Active",
    createdAt: "2025-08-12",
    updatedAt: "2025-08-17",
    draftedAt: null,
    actionMessage: "Approved by IT",
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
  branch: "Head Office",
  voucherNumber: "V001",
  category: "Travel",
  subCategory: "Domestic",
  expense: "Transport",
  date: "2025-08-20",
  amount: "5000",
  currency: "USD",
  paymentMode: "Cash",
  vat: "10%",
  supplier: "ABC Logistics",
  approvedBy: "John Doe",
  purchaseNumber: "12345",
  supplierVatNumber: "123456789",
  expenseBy: "John Doe",
  expenseFor: "John Doe",
  applyToVat: "Yes",
  note: "Travel to New York",
  attachment: "JD_Frontend.pdf",

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
    name: "branch",
    label: "Branch",
    component: "autocomplete",
    options: ["Head Office", "Branch 1", "Branch 2", "Branch 3", "Branch 4"],
    nextFocus: "voucherNumber",
    tooltip: "Select branch",
    required: true,
  },
  {
    name: "voucherNumber",
    label: "Voucher Number",
    component: "input",
    nextFocus: "category",
    tooltip: "Enter voucher number",
    required: true,
  },
  {
    name: "category",
    label: "Category",
    component: "mutiselect",
    options: ["Travel", "Food", "Entertainment", "Other"],
    nextFocus: "subCategory",
    tooltip: "Enter category",
    required: true,
  },
  {
    name: "subCategory",
    label: "Sub Category",
    component: "autocomplete",
    options: ["Domestic", "International", "Local"],
    nextFocus: "expense",
    tooltip: "Enter sub category",
    required: true,
  },
  {
    name: "expense",
    label: "Expense",
    component: "input",
    nextFocus: "date",
    tooltip: "Enter expense",
    required: true,
  },
  {
    name: "date",
    label: "Date",
    component: "input",
    nextFocus: "amount",
    tooltip: "Enter date",
    required: true,
    type: "date",
  },
  {
    name: "amount",
    label: "Amount",
    component: "input",
    nextFocus: "currency",
    tooltip: "Enter amount",
    required: true,
  },
  {
    name: "currency",
    label: "Currency",
    component: "autocomplete",
    options: ["USD", "EUR", "GBP", "JPY", "CNY"],
    nextFocus: "paymentMode",
    tooltip: "Select currency",
    required: true,
  },
  {
    name: "paymentMode",
    label: "Payment Mode",
    component: "autocomplete",
    options: ["Cash", "Credit Card", "Debit Card", "Online Payment"],
    nextFocus: "vat",
    tooltip: "Select payment mode",
    required: true,
  },
  {
    name: "vat",
    label: "VAT",
    component: "autocomplete",
    options: ["10%", "20%", "30%"],
    nextFocus: "supplier",
    tooltip: "Select VAT",
    required: true,
  },
  {
    name: "supplier",
    label: "Supplier",
    component: "autocomplete",
    options: ["ABC Logistics", "XYZ Logistics", "LMN Logistics"],
    nextFocus: "approvedBy",
    tooltip: "Select supplier",
    required: true,
  },
  {
    name: "approvedBy",
    label: "Approved By",
    component: "autocomplete",
    options: ["John Doe", "Jane Doe", "John Smith", "Jane Smith"],
    nextFocus: "purchaseNumber",
    tooltip: "Select approved by",
    required: true,
  },
  {
    name: "purchaseNumber",
    label: "Purchase Number",
    component: "input",
    nextFocus: "supplierVatNumber",
    tooltip: "Enter purchase number",
    required: true,
  },
  {
    name: "supplierVatNumber",
    label: "Supplier VAT Number",
    component: "input",
    nextFocus: "expenseBy",
    tooltip: "Enter supplier VAT number",
    required: true,
  },
  {
    name: "expenseBy",
    label: "Expense By",
    component: "autocomplete",
    options: ["John Doe", "Jane Doe", "John Smith", "Jane Smith"],
    nextFocus: "expenseFor",
    tooltip: "Select expense by",
    required: true,
  },
  {
    name: "expenseFor",
    label: "Expense For",
    component: "input",
    nextFocus: "applyToVat",
    tooltip: "Enter expense for",
    required: true,
  },
  {
    name: "applyToVat",
    label: "Apply To VAT",
    component: "autocomplete",
    options: ["Yes", "No"],
    nextFocus: "note",
    tooltip: "Enter apply to VAT",
    required: true,
  },
  {
    name: "note",
    label: "Note",
    component: "input",
    nextFocus: "attachment",
    tooltip: "Enter note",
    required: true,
  },
  {
    name: "attachment",
    label: "Attachment",
    component: "input",
    tooltip: "Upload attachment if any",
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  branch: "Branch",
  voucherNumber: "Voucher Number",
  category: "Category",
  subCategory: "Sub Category",
  expense: "Expense",
  date: "Date",
  amount: "Amount",
  currency: "Currency",
  paymentMode: "Payment Mode",
  vat: "VAT",
  supplier: "Supplier",
  approvedBy: "Approved By",
  purchaseNumber: "Purchase Number",
  supplierVatNumber: "Supplier VAT Number",
  expenseBy: "Expense By",
  expenseFor: "Expense For",
  applyToVat: "Apply To VAT",
  note: "Note",         
  attachment: "Attachment",
};
