import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  loanType: string;
  description: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  loanType: "",
  description: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "loanType",
  "description",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["loanType"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "loanType", title: "Loan Type" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    loanType: "Personal Loan",
    description: "Unsecured loan for personal expenses",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Loan type created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    loanType: "Home Loan",
    description: "Secured loan for purchasing property",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Loan type created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    loanType: "Auto Loan",
    description: "Secured loan for vehicle purchase",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Loan type created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    loanType: "Business Loan",
    description: "Loan for business expansion and operations",
    status: "Draft",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: "2025-01-30",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    loanType: "Education Loan",
    description: "Loan for educational expenses",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Loan type created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    loanType: "Credit Card",
    description: "Revolving credit facility",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Loan type created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    loanType: "Mortgage Loan",
    description: "Long-term loan secured by real estate",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Loan type created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    loanType: "Line of Credit",
    description: "Flexible credit facility for businesses",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Loan type created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    loanType: "Equipment Loan",
    description: "Loan for purchasing business equipment",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Loan type created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    loanType: "Working Capital Loan",
    description: "Short-term loan for daily business operations",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Loan type created",
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
  loanType: "Personal Loan",
  description: "Unsecured loan for personal expenses",

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
    name: "loanType",
    label: "Loan Type",
    component: "input",
    nextFocus: "description",
    tooltip: "Enter loan type name",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    placeholder: "Enter loan description",
    tooltip: "Enter loan type description",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  loanType: "Loan Type",
  description: "Description",
};
