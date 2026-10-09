import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
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
  "companyName",
  "email",
  "mobile",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["firstName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "firstName", title: "First Name" },
  { key: "lastName", title: "Last Name" },
  { key: "companyName", title: "Company Name" },
  { key: "email", title: "Email" },
  { key: "mobile", title: "Mobile" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    companyName: "Tech Solutions Inc",
    email: "john.doe@techsolutions.com",
    mobile: "+1234567890",
    password: "password123",
    confirmPassword: "password123",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Client added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    companyName: "Marketing Pro",
    email: "jane.smith@marketingpro.com",
    mobile: "+1234567891",
    password: "password456",
    confirmPassword: "password456",
    createdAt: "2025-02-01",
    updatedAt: "2025-02-28",
    draftedAt: null,
    actionMessage: "Client updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    companyName: "Digital Agency",
    email: "mike.johnson@digitalagency.com",
    mobile: "+1234567892",
    password: "password789",
    confirmPassword: "password789",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-31",
    draftedAt: null,
    actionMessage: "New client",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Wilson",
    companyName: "Creative Studio",
    email: "sarah.wilson@creativestudio.com",
    mobile: "+1234567893",
    password: "password101",
    confirmPassword: "password101",
    createdAt: "2025-04-01",
    updatedAt: "2025-04-30",
    draftedAt: "2025-04-25",
    actionMessage: "Pending activation",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    companyName: "Business Corp",
    email: "david.brown@businesscorp.com",
    mobile: "+1234567894",
    password: "password202",
    confirmPassword: "password202",
    createdAt: "2025-05-01",
    updatedAt: "2025-05-31",
    draftedAt: null,
    actionMessage: "Client active",
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
  firstName: "John",
  lastName: "Doe",
  companyName: "Tech Solutions Inc",
  email: "john.doe@techsolutions.com",
  mobile: "+1234567890",
  password: "password123",
  confirmPassword: "password123",

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
    nextFocus: "companyName",
    tooltip: "Enter last name",
    required: true,
  },
  {
    name: "companyName",
    label: "Company Name",
    component: "input",
    nextFocus: "email",
    tooltip: "Enter company name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    component: "input",
    type: "email",
    nextFocus: "mobile",
    tooltip: "Enter email address",
    required: true,
  },
  {
    name: "mobile",
    label: "Mobile",
    component: "input",
    type: "tel",
    nextFocus: "password",
    tooltip: "Enter mobile number",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    component: "input",
    type: "password",
    nextFocus: "confirmPassword",
    tooltip: "Enter password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    component: "input",
    type: "password",
    tooltip: "Confirm password",
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
  companyName: "Company Name",
  email: "Email",
  mobile: "Mobile",
  password: "Password",
  confirmPassword: "Confirm Password",
};
