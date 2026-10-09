import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: string;
  mobileNo: string;
  bloodGroup: string;
  sex: string;
  dateOfBirth: string;
  address: string;
  status: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNo: "",
  mobileNo: "",
  bloodGroup: "",
  sex: "",
  dateOfBirth: "",
  address: "",
  status: "Active",
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
  "email",
  "phoneNo",
  "mobileNo",
  "bloodGroup",
  "sex",
  "status",
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
  { key: "email", title: "Email Address" },
  { key: "phoneNo", title: "Phone No" },
  { key: "bloodGroup", title: "Blood Group" },
  { key: "sex", title: "Sex" },
  { key: "status", title: "Status" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "********",
    phoneNo: "+1 555-0100",
    mobileNo: "+1 555-1100",
    bloodGroup: "O+",
    sex: "Male",
    dateOfBirth: "1985-04-12",
    address: "123 Main St, Cityville",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Patient created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "********",
    phoneNo: "+1 555-0200",
    mobileNo: "+1 555-1200",
    bloodGroup: "A+",
    sex: "Female",
    dateOfBirth: "1990-09-23",
    address: "45 Oak Ave, Townsburg",
    status: "Active",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Patient created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    firstName: "Ahmed",
    lastName: "Khan",
    email: "ahmed.khan@example.com",
    password: "********",
    phoneNo: "+1 555-0300",
    mobileNo: "+1 555-1300",
    bloodGroup: "B+",
    sex: "Male",
    dateOfBirth: "1988-12-01",
    address: "9 Crescent Rd, Metropolis",
    status: "Active",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Patient created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    firstName: "Liu",
    lastName: "Wen",
    email: "liu.wen@example.com",
    password: "********",
    phoneNo: "+1 555-0400",
    mobileNo: "+1 555-1400",
    bloodGroup: "AB+",
    sex: "Female",
    dateOfBirth: "1992-03-18",
    address: "77 Lake View, Harbor City",
    status: "Draft",
    createdAt: "2025-01-04",
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
    firstName: "Carlos",
    lastName: "Diaz",
    email: "carlos.diaz@example.com",
    password: "********",
    phoneNo: "+1 555-0500",
    mobileNo: "+1 555-1500",
    bloodGroup: "O-",
    sex: "Male",
    dateOfBirth: "1987-07-07",
    address: "12 River St, Oldtown",
    status: "Active",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Patient created",
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
  email: "john.doe@example.com",
  password: "********",
  phoneNo: "+1 555-0100",
  mobileNo: "+1 555-1100",
  bloodGroup: "O+",
  sex: "Male",
  dateOfBirth: "1985-04-12",
  address: "123 Main St, Cityville",
  status: "Active",

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
    nextFocus: "email",
    tooltip: "Enter last name",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    component: "input",
    type: "email",
    nextFocus: "password",
    tooltip: "Enter email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    component: "input",
    type: "password",
    nextFocus: "phoneNo",
    tooltip: "Enter password",
    required: true,
  },
  {
    name: "phoneNo",
    label: "Phone No",
    component: "input",
    nextFocus: "mobileNo",
    tooltip: "Enter phone number",
  },
  {
    name: "mobileNo",
    label: "Mobile No",
    component: "input",
    nextFocus: "bloodGroup",
    tooltip: "Enter mobile number",
  },
  {
    name: "bloodGroup",
    label: "Blood Group",
    component: "autocomplete",
    options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    nextFocus: "sex",
    tooltip: "Select blood group",
  },
  {
    name: "sex",
    label: "Sex",
    component: "autocomplete",
    options: ["Male", "Female", "Other"],
    nextFocus: "dateOfBirth",
    tooltip: "Select sex",
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    component: "input",
    type: "date",
    nextFocus: "address",
    tooltip: "Select birth date",
  },
  {
    name: "address",
    label: "Address",
    component: "input",
    nextFocus: "status",
    tooltip: "Enter address",
  },
  {
    name: "status",
    label: "Status",
    component: "autocomplete",
    options: ["Active", "Inactive", "Draft"],
    tooltip: "Select status",
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
  email: "Email Address",
  password: "Password",
  phoneNo: "Phone No",
  mobileNo: "Mobile No",
  bloodGroup: "Blood Group",
  sex: "Sex",
  dateOfBirth: "Date of Birth",
  address: "Address",
  status: "Status",
};
