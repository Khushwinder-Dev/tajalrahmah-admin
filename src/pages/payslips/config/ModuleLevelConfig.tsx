import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  iqmaNumber: string;
  employeeName: string;
  branch: string;
  month: string;
  departments: string;
  designations: string;
  status: string;
  salary: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  iqmaNumber: "",
  employeeName: "",
  branch: "",
  month: "",
  departments: "",
  designations: "",
  status: "",
  salary: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "iqmaNumber",
  "employeeName",
  "branch",
  "month",
  "departments",
  "designations",
  "status",
  "salary",
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
  "iqmaNumber",
  "employeeName",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "iqmaNumber", title: "Iqma Number" },
  { key: "employeeName", title: "Employee Name" },
  { key: "branch", title: "Branch" },
  { key: "month", title: "Month" },
  { key: "departments", title: "Departments" },
  { key: "designations", title: "Designations" },
  { key: "status", title: "Status" },
  { key: "salary", title: "Salary" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    iqmaNumber: "1234567890",
    employeeName: "Ahmed Al-Rashid",
    branch: "Main Branch",
    month: "January 2025",
    departments: "IT",
    designations: "Software Developer",
    status: "Paid",
    salary: "8000",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Salary processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    iqmaNumber: "2345678901",
    employeeName: "Fatima Hassan",
    branch: "Downtown Branch",
    month: "January 2025",
    departments: "HR",
    designations: "HR Manager",
    status: "Paid",
    salary: "12000",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Salary processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    iqmaNumber: "3456789012",
    employeeName: "Mohammed Ali",
    branch: "Main Branch",
    month: "January 2025",
    departments: "Finance",
    designations: "Accountant",
    status: "Paid",
    salary: "7000",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Salary processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    iqmaNumber: "4567890123",
    employeeName: "Aisha Khan",
    branch: "Mall Branch",
    month: "January 2025",
    departments: "Sales",
    designations: "Sales Executive",
    status: "Pending",
    salary: "6000",
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
    iqmaNumber: "5678901234",
    employeeName: "Omar Abdullah",
    branch: "Main Branch",
    month: "January 2025",
    departments: "Operations",
    designations: "Operations Manager",
    status: "Paid",
    salary: "15000",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Salary processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    iqmaNumber: "6789012345",
    employeeName: "Layla Ibrahim",
    branch: "Downtown Branch",
    month: "January 2025",
    departments: "Marketing",
    designations: "Marketing Specialist",
    status: "Paid",
    salary: "9000",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Salary processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    iqmaNumber: "7890123456",
    employeeName: "Khalid Al-Zahra",
    branch: "Mall Branch",
    month: "January 2025",
    departments: "Customer Service",
    designations: "Customer Service Rep",
    status: "Paid",
    salary: "5500",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Salary processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    iqmaNumber: "8901234567",
    employeeName: "Nour Al-Mansouri",
    branch: "Main Branch",
    month: "January 2025",
    departments: "IT",
    designations: "System Administrator",
    status: "Paid",
    salary: "10000",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Salary processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    iqmaNumber: "9012345678",
    employeeName: "Yousef Al-Rashid",
    branch: "Downtown Branch",
    month: "January 2025",
    departments: "Finance",
    designations: "Financial Analyst",
    status: "Paid",
    salary: "8500",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Salary processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    iqmaNumber: "0123456789",
    employeeName: "Mariam Al-Hassan",
    branch: "Mall Branch",
    month: "January 2025",
    departments: "HR",
    designations: "HR Assistant",
    status: "Paid",
    salary: "5000",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Salary processed",
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
  iqmaNumber: "1234567890",
  employeeName: "Ahmed Al-Rashid",
  branch: "Main Branch",
  month: "January 2025",
  departments: "IT",
  designations: "Software Developer",
  status: "Paid",
  salary: "8000",

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
    name: "iqmaNumber",
    label: "Iqma Number",
    component: "input",
    nextFocus: "employeeName",
    tooltip: "Enter employee Iqma number",
    required: true,
  },
  {
    name: "employeeName",
    label: "Employee Name",
    component: "input",
    nextFocus: "branch",
    tooltip: "Enter employee full name",
    required: true,
  },
  {
    name: "branch",
    label: "Branch",
    component: "autocomplete",
    options: [
      "Main Branch",
      "Downtown Branch",
      "Mall Branch",
      "Airport Branch",
      "University Branch",
    ],
    placeholder: " ",
    nextFocus: "month",
    tooltip: "Select branch location",
    required: true,
  },
  {
    name: "month",
    label: "Month",
    component: "autocomplete",
    options: [
      "January 2025",
      "February 2025",
      "March 2025",
      "April 2025",
      "May 2025",
      "June 2025",
      "July 2025",
      "August 2025",
      "September 2025",
      "October 2025",
      "November 2025",
      "December 2025",
    ],
    placeholder: " ",
    nextFocus: "departments",
    tooltip: "Select payroll month",
    required: true,
  },
  {
    name: "departments",
    label: "Departments",
    component: "autocomplete",
    options: [
      "IT",
      "HR",
      "Finance",
      "Sales",
      "Marketing",
      "Operations",
      "Customer Service",
      "Administration",
    ],
    placeholder: " ",
    nextFocus: "designations",
    tooltip: "Select department",
    required: true,
  },
  {
    name: "designations",
    label: "Designations",
    component: "autocomplete",
    options: [
      "Software Developer",
      "HR Manager",
      "Accountant",
      "Sales Executive",
      "Marketing Specialist",
      "Operations Manager",
      "Customer Service Rep",
      "System Administrator",
      "Financial Analyst",
      "HR Assistant",
    ],
    placeholder: " ",
    nextFocus: "status",
    tooltip: "Select job designation",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    component: "autocomplete",
    options: ["Paid", "Pending", "Draft", "Approved", "Rejected"],
    placeholder: " ",
    nextFocus: "salary",
    tooltip: "Select payment status",
    required: true,
  },
  {
    name: "salary",
    label: "Salary",
    component: "input",
    type: "number",
    tooltip: "Enter salary amount",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  iqmaNumber: "Iqma Number",
  employeeName: "Employee Name",
  branch: "Branch",
  month: "Month",
  departments: "Departments",
  designations: "Designations",
  status: "Status",
  salary: "Salary",
};
