import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  emailAddress: string;
  fullName: string;
  phoneNo: string;
  enquiry: string;
  readStatus: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  emailAddress: "",
  fullName: "",
  phoneNo: "",
  enquiry: "",
  readStatus: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "emailAddress",
  "fullName",
  "phoneNo",
  "enquiry",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["emailAddress"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "emailAddress", title: "Email Address" },
  { key: "fullName", title: "Full Name" },
  { key: "phoneNo", title: "Phone No" },
  { key: "enquiry", title: "Enquiry" },
  { key: "readStatus", title: "Read/Unread" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    emailAddress: "john.doe@email.com",
    fullName: "John Doe",
    phoneNo: "+1-555-0123",
    enquiry: "Interested in cardiac consultation services",
    readStatus: "Read",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Enquiry processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    emailAddress: "sarah.smith@email.com",
    fullName: "Sarah Smith",
    phoneNo: "+1-555-0456",
    enquiry: "Asking about orthopedic surgery options",
    readStatus: "Unread",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "New enquiry received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    emailAddress: "mike.johnson@email.com",
    fullName: "Mike Johnson",
    phoneNo: "+1-555-0789",
    enquiry: "Need information about neurological treatments",
    readStatus: "Read",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Follow-up scheduled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    emailAddress: "emily.davis@email.com",
    fullName: "Emily Davis",
    phoneNo: "+1-555-0321",
    enquiry: "Dermatology appointment availability",
    readStatus: "Unread",
    createdAt: "2025-01-04",
    updatedAt: "2025-01-31",
    draftedAt: "2025-01-30",
    actionMessage: "Pending review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    emailAddress: "robert.wilson@email.com",
    fullName: "Robert Wilson",
    phoneNo: "+1-555-0654",
    enquiry: "Pediatric checkup and vaccination schedule",
    readStatus: "Read",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Appointment booked",
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
  emailAddress: "john.doe@email.com",
  fullName: "John Doe",
  phoneNo: "+1-555-0123",
  enquiry: "Interested in cardiac consultation services",
  readStatus: "Unread",

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
    name: "emailAddress",
    label: "Email Address",
    component: "input",
    type: "email",
    nextFocus: "fullName",
    tooltip: "Enter email address",
    required: true,
  },
  {
    name: "fullName",
    label: "Full Name",
    component: "input",
    nextFocus: "phoneNo",
    tooltip: "Enter full name",
    required: true,
  },
  {
    name: "phoneNo",
    label: "Phone No",
    component: "input",
    type: "tel",
    nextFocus: "enquiry",
    tooltip: "Enter phone number",
    required: true,
  },
  {
    name: "enquiry",
    label: "Enquiry",
    component: "input",
    nextFocus: "readStatus",
    tooltip: "Enter enquiry details",
    required: true,
  },
  {
    name: "readStatus",
    label: "Read/Unread Status",
    component: "autocomplete",
    options: ["Read", "Unread"],
    tooltip: "Select read status",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  emailAddress: "Email Address",
  fullName: "Full Name",
  phoneNo: "Phone No",
  enquiry: "Enquiry",
  readStatus: "Read/Unread",
};
