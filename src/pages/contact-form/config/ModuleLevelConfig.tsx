import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "firstName",
  "lastName",
  "phone",
  "email",
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
  message: string;
};

// add value in array if you want to add fixed columns left side
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["firstName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "firstName", title: "First Name", readOnly: true },
  { key: "lastName", title: "Last Name", readOnly: true },
  { key: "phone", title: "Phone", readOnly: true },
  { key: "email", title: "Email", readOnly: true },
  { key: "message", title: "Message", readOnly: true },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Contact added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    message: "Contact added",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1234567891",
    email: "jane.smith@example.com",
    createdAt: "2025-02-01",
    updatedAt: "2025-02-28",
    draftedAt: null,
    actionMessage: "Contact updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    message: "Contact updated",
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    phone: "+1234567892",
    email: "mike.johnson@example.com",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-31",
    draftedAt: null,
    actionMessage: "New contact",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    message: "New contact",
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Wilson",
    phone: "+1234567893",
    email: "sarah.wilson@example.com",
    createdAt: "2025-04-01",
    updatedAt: "2025-04-30",
    draftedAt: "2025-04-25",
    actionMessage: "Pending activation",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    message: "Pending activation",
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    phone: "+1234567894",
    email: "david.brown@example.com",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-31",
    draftedAt: null,
    actionMessage: "Contact active",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    message: "Contact active",
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
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890",
  email: "john.doe@example.com",

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
    name: "firstName",
    label: "First Name",
    component: "input",
    nextFocus: "lastName",
    tooltip: "Enter first name",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    component: "input",
    nextFocus: "phone",
    tooltip: "Enter last name",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    component: "input",
    type: "tel",
    nextFocus: "email",
    tooltip: "Enter phone number",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    component: "input",
    type: "email",
    tooltip: "Enter email address",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  firstName: "First Name",
  lastName: "Last Name",
  phone: "Phone",
  email: "Email",
};
