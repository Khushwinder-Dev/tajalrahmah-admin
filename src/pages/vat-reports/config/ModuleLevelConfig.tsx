import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  branch: string;
  period: string;
  input: string;
  output: string;
  net: string;
  paid: string;
  unpaid: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  branch: "",
  period: "",
  input: "",
  output: "",
  net: "",
  paid: "",
  unpaid: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "branch",
  "period",
  "net",
  "paid",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["branch"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "branch", title: "Branch" },
  { key: "period", title: "Period" },
  { key: "input", title: "Input" },
  { key: "output", title: "Output" },
  { key: "net", title: "Net" },
  { key: "paid", title: "Paid" },
  { key: "unpaid", title: "Unpaid" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    branch: "Main Branch",
    period: "January 2025",
    input: "15000.00",
    output: "12000.00",
    net: "3000.00",
    paid: "2500.00",
    unpaid: "500.00",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "VAT report processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    branch: "East Branch",
    period: "February 2025",
    input: "18500.00",
    output: "14200.00",
    net: "4300.00",
    paid: "4300.00",
    unpaid: "0.00",
    createdAt: "2025-02-01",
    updatedAt: "2025-02-28",
    draftedAt: null,
    actionMessage: "VAT fully paid",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    branch: "West Branch",
    period: "March 2025",
    input: "22000.00",
    output: "16800.00",
    net: "5200.00",
    paid: "3200.00",
    unpaid: "2000.00",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-31",
    draftedAt: null,
    actionMessage: "Partial payment pending",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    branch: "North Branch",
    period: "April 2025",
    input: "13500.00",
    output: "11000.00",
    net: "2500.00",
    paid: "0.00",
    unpaid: "2500.00",
    createdAt: "2025-04-01",
    updatedAt: "2025-04-30",
    draftedAt: "2025-04-25",
    actionMessage: "Payment pending review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    branch: "South Branch",
    period: "May 2025",
    input: "19800.00",
    output: "15600.00",
    net: "4200.00",
    paid: "4200.00",
    unpaid: "0.00",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-31",
    draftedAt: null,
    actionMessage: "VAT report completed",
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
  branch: "Main Branch",
  period: "January 2025",
  input: "15000.00",
  output: "12000.00",
  net: "3000.00",
  paid: "2500.00",
  unpaid: "500.00",

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
    options: [
      "Main Branch",
      "East Branch",
      "West Branch",
      "North Branch",
      "South Branch",
      "Central Branch",
    ],
    nextFocus: "period",
    tooltip: "Select branch",
    required: true,
  },
  {
    name: "period",
    label: "Period",
    component: "input",
    nextFocus: "input",
    tooltip: "Enter reporting period (e.g., January 2025)",
    required: true,
  },
  {
    name: "input",
    label: "Input",
    component: "input",
    type: "number",
    nextFocus: "output",
    tooltip: "Enter input VAT amount",
    required: true,
  },
  {
    name: "output",
    label: "Output",
    component: "input",
    type: "number",
    nextFocus: "net",
    tooltip: "Enter output VAT amount",
    required: true,
  },
  {
    name: "net",
    label: "Net",
    component: "input",
    type: "number",
    nextFocus: "paid",
    tooltip: "Enter net VAT amount",
    required: true,
  },
  {
    name: "paid",
    label: "Paid",
    component: "input",
    type: "number",
    nextFocus: "unpaid",
    tooltip: "Enter paid VAT amount",
    required: true,
  },
  {
    name: "unpaid",
    label: "Unpaid",
    component: "input",
    type: "number",
    tooltip: "Enter unpaid VAT amount",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  branch: "Branch",
  period: "Period",
  input: "Input",
  output: "Output",
  net: "Net",
  paid: "Paid",
  unpaid: "Unpaid",
};
