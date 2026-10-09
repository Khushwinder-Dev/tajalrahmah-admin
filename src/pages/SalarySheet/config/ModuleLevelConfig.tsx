import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  from: string;
  salaryMonth: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  from: "",
  salaryMonth: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = ["from"];

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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["from"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "from", title: "From" },
  { key: "salaryMonth", title: "Salary Month" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    from: "HR Department",
    salaryMonth: "January",
    status: "Active",
    createdAt: "2025-01-05T09:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
    draftedAt: null,
    actionMessage: "Salary processed successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    from: "Finance Team",
    salaryMonth: "February",
    status: "Draft",
    createdAt: "2025-02-01T12:30:00Z",
    updatedAt: "2025-02-02T09:00:00Z",
    draftedAt: "2025-02-01T12:30:00Z",
    actionMessage: "Awaiting approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    from: "Operations",
    salaryMonth: "March",
    status: "Inactive",
    createdAt: "2025-03-10T08:00:00Z",
    updatedAt: "2025-03-15T11:00:00Z",
    draftedAt: null,
    actionMessage: "Pending update",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    from: "HR Department",
    salaryMonth: "April",
    status: "Deleted",
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-11-20T10:30:00Z",
    draftedAt: null,
    actionMessage: "Removed from system",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    from: "Finance Team",
    salaryMonth: "May",
    status: "Active",
    createdAt: "2025-05-01T09:30:00Z",
    updatedAt: "2025-05-05T10:00:00Z",
    draftedAt: null,
    actionMessage: "Processed successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    from: "Operations",
    salaryMonth: "June",
    status: "Updated",
    createdAt: "2025-06-10T08:45:00Z",
    updatedAt: "2025-06-12T09:15:00Z",
    draftedAt: null,
    actionMessage: "Details updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    from: "HR Department",
    salaryMonth: "July",
    status: "Active",
    createdAt: "2024-12-10T11:00:00Z",
    updatedAt: "2025-01-01T09:15:00Z",
    draftedAt: null,
    actionMessage: "Salary released",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    from: "Finance Team",
    salaryMonth: "August",
    status: "Inactive",
    createdAt: "2024-10-05T12:30:00Z",
    updatedAt: "2024-11-01T10:00:00Z",
    draftedAt: null,
    actionMessage: "Not processed",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    from: "Operations",
    salaryMonth: "September",
    status: "Draft",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-02T08:45:00Z",
    draftedAt: "2025-09-01T10:00:00Z",
    actionMessage: "Pending verification",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    from: "HR Department",
    salaryMonth: "October",
    status: "Active",
    createdAt: "2024-09-20T09:00:00Z",
    updatedAt: "2024-09-25T12:00:00Z",
    draftedAt: null,
    actionMessage: "Salary confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    from: "Finance Team",
    salaryMonth: "November",
    status: "Inactive",
    createdAt: "2025-01-12T08:00:00Z",
    updatedAt: "2025-01-18T10:00:00Z",
    draftedAt: null,
    actionMessage: "Processing paused",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    from: "Operations",
    salaryMonth: "December",
    status: "Deleted",
    createdAt: "2024-08-01T07:00:00Z",
    updatedAt: "2024-08-05T09:00:00Z",
    draftedAt: null,
    actionMessage: "Removed from records",
    isActive: false,
    isDraft: false,
    isDeleted: true,
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
  from: "Bonus Type 1",
  salaryMonth: "Description One",

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
    name: "from",
    label: "From",
    component: "autocomplete",
    options: ["HR Department", "Finance Team", "Operations"],
    placeholder: " ",
    nextFocus: "salaryMonth",
    tooltip: "Enter from",
    required: true,
  },
  {
    name: "salaryMonth",
    label: "Salary Month",
    component: "input",
    nextFocus: "isDefault",
    tooltip: "Enter salary month",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  from: "From",
  salaryMonth: "Salary Month",
};
