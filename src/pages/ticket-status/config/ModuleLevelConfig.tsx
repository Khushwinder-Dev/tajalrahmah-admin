import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  name: string;
  color: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  name: "",
  color: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = ["color", "name"];

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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["name"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "name", title: "Name" },
  { key: "color", title: "Color" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    name: "Dashboard",
    color: "#3b82f6",
    status: "Active",
    createdAt: "2025-08-01T10:15:00Z",
    updatedAt: "2025-08-10T14:20:00Z",
    draftedAt: null,
    actionMessage: "Module running successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    name: "Reports",
    color: "#f59e0b",
    status: "Draft",
    createdAt: "2025-07-20T08:30:00Z",
    updatedAt: "2025-07-25T09:40:00Z",
    draftedAt: "2025-07-22T11:00:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    name: "Analytics",
    color: "#10b981",
    status: "Updated",
    createdAt: "2025-07-15T07:25:00Z",
    updatedAt: "2025-08-01T12:00:00Z",
    draftedAt: null,
    actionMessage: "Updated with new filters",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    name: "Users",
    color: "#ef4444",
    status: "Deleted",
    createdAt: "2025-06-12T10:00:00Z",
    updatedAt: "2025-07-05T15:30:00Z",
    draftedAt: null,
    actionMessage: "Module removed",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    name: "Invoices",
    color: "#8b5cf6",
    status: "Active",
    createdAt: "2025-08-02T09:15:00Z",
    updatedAt: "2025-08-08T13:10:00Z",
    draftedAt: null,
    actionMessage: "New invoice feature enabled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    name: "Settings",
    color: "#06b6d4",
    status: "Active",
    createdAt: "2025-06-30T11:25:00Z",
    updatedAt: "2025-07-15T17:40:00Z",
    draftedAt: null,
    actionMessage: "Settings synced",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    name: "Notifications",
    color: "#84cc16",
    status: "Draft",
    createdAt: "2025-07-10T14:00:00Z",
    updatedAt: "2025-07-12T16:20:00Z",
    draftedAt: "2025-07-11T15:00:00Z",
    actionMessage: "Draft pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    name: "Profile",
    color: "#ec4899",
    status: "Updated",
    createdAt: "2025-08-03T08:50:00Z",
    updatedAt: "2025-08-06T10:30:00Z",
    draftedAt: null,
    actionMessage: "Profile fields updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    name: "Projects",
    color: "#0ea5e9",
    status: "Active",
    createdAt: "2025-07-05T12:15:00Z",
    updatedAt: "2025-07-25T13:50:00Z",
    draftedAt: null,
    actionMessage: "Projects list refreshed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    name: "Tasks",
    color: "#d946ef",
    status: "Deleted",
    createdAt: "2025-06-18T09:45:00Z",
    updatedAt: "2025-06-25T11:15:00Z",
    draftedAt: null,
    actionMessage: "Task module archived",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "11",
    name: "Payments",
    color: "#f43f5e",
    status: "Active",
    createdAt: "2025-08-01T07:00:00Z",
    updatedAt: "2025-08-07T12:40:00Z",
    draftedAt: null,
    actionMessage: "Payment gateway integrated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    name: "Support",
    color: "#22c55e",
    status: "Updated",
    createdAt: "2025-07-28T10:10:00Z",
    updatedAt: "2025-08-05T15:45:00Z",
    draftedAt: null,
    actionMessage: "Support system enhanced",
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
  name: "Boss Laddu Khan",
  color: "#ffffff",

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
    name: "name",
    label: "Name",
    component: "input",
    nextFocus: "position",
    tooltip: "Enter name",
    required: true,
  },

  {
    name: "color",
    type: "color",
    label: "Color",
    component: "input",
    nextFocus: "position",
    tooltip: "Enter color",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  name: "Name",
  color: "Color",
};
