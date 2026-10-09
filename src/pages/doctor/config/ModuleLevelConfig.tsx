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
  designation: string;
  department: string;
  address: string;
  phoneNo: string;
  mobileNo: string;
  shortBiography: string;
  picture: string;
  specialist: string;
  dateOfBirth: string;
  sex: string;
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
  designation: "",
  department: "",
  address: "",
  phoneNo: "",
  mobileNo: "",
  shortBiography: "",
  picture: "",
  specialist: "",
  dateOfBirth: "",
  sex: "",
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
  "department",
  "specialist",
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
  { key: "designation", title: "Designation" },
  { key: "department", title: "Department" },
  { key: "specialist", title: "Specialist" },
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
    designation: "Senior Consultant",
    department: "Cardiology",
    address: "123 Main St, Cityville",
    phoneNo: "+1 555-0100",
    mobileNo: "+1 555-1100",
    shortBiography: "20+ years in interventional cardiology.",
    picture: "/public/default-avatar.jpg",
    specialist: "Interventional Cardiology",
    dateOfBirth: "1978-04-12",
    sex: "Male",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Doctor created",
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
    designation: "Consultant",
    department: "Neurology",
    address: "45 Oak Ave, Townsburg",
    phoneNo: "+1 555-0200",
    mobileNo: "+1 555-1200",
    shortBiography: "Specialist in pediatric neurology.",
    picture: "/public/default-avatar.jpg",
    specialist: "Pediatric Neurology",
    dateOfBirth: "1985-09-23",
    sex: "Female",
    status: "Active",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Doctor created",
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
    designation: "Registrar",
    department: "Orthopedics",
    address: "9 Crescent Rd, Metropolis",
    phoneNo: "+1 555-0300",
    mobileNo: "+1 555-1300",
    shortBiography: "Focus on sports injuries.",
    picture: "/public/default-avatar.jpg",
    specialist: "Sports Medicine",
    dateOfBirth: "1990-12-01",
    sex: "Male",
    status: "Active",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Doctor created",
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
    designation: "Consultant",
    department: "Dermatology",
    address: "77 Lake View, Harbor City",
    phoneNo: "+1 555-0400",
    mobileNo: "+1 555-1400",
    shortBiography: "Dermatopathology and cosmetic procedures.",
    picture: "/public/default-avatar.jpg",
    specialist: "Dermatology",
    dateOfBirth: "1982-03-18",
    sex: "Female",
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
    designation: "Senior Consultant",
    department: "Oncology",
    address: "12 River St, Oldtown",
    phoneNo: "+1 555-0500",
    mobileNo: "+1 555-1500",
    shortBiography: "Clinical oncology with research focus.",
    picture: "/public/default-avatar.jpg",
    specialist: "Medical Oncology",
    dateOfBirth: "1975-07-07",
    sex: "Male",
    status: "Active",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Doctor created",
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
  designation: "Senior Consultant",
  department: "Cardiology",
  address: "123 Main St, Cityville",
  phoneNo: "+1 555-0100",
  mobileNo: "+1 555-1100",
  shortBiography: "20+ years in interventional cardiology.",
  picture: "/public/default-avatar.jpg",
  specialist: "Interventional Cardiology",
  dateOfBirth: "1978-04-12",
  sex: "Male",
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
    nextFocus: "designation",
    tooltip: "Enter password",
    required: true,
  },
  {
    name: "designation",
    label: "Designation",
    component: "input",
    nextFocus: "department",
    tooltip: "Enter designation",
    required: true,
  },
  {
    name: "department",
    label: "Department",
    component: "input",
    nextFocus: "address",
    tooltip: "Enter department",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    component: "input",
    nextFocus: "phoneNo",
    tooltip: "Enter address",
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
    nextFocus: "shortBiography",
    tooltip: "Enter mobile number",
  },
  {
    name: "shortBiography",
    label: "Short Biography",
    component: "input",
    nextFocus: "picture",
    tooltip: "Enter short biography",
  },
  {
    name: "picture",
    label: "Picture",
    component: "input",
    nextFocus: "specialist",
    tooltip: "Enter picture URL",
  },
  {
    name: "specialist",
    label: "Specialist",
    component: "input",
    nextFocus: "dateOfBirth",
    tooltip: "Enter specialty",
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    component: "input",
    type: "date",
    nextFocus: "sex",
    tooltip: "Select birth date",
  },
  {
    name: "sex",
    label: "Sex",
    component: "autocomplete",
    options: ["Male", "Female", "Other"],
    nextFocus: "status",
    tooltip: "Select sex",
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
  designation: "Designation",
  department: "Department",
  address: "Address",
  phoneNo: "Phone No",
  mobileNo: "Mobile No",
  shortBiography: "Short Biography",
  picture: "Picture",
  specialist: "Specialist",
  dateOfBirth: "Date of Birth",
  sex: "Sex",
  status: "Status",
};
