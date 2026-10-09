import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  doctorName: string;
  availableTime: string;
  perPatientTime: string;
  serialVisibility: string;
  status: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  doctorName: "",
  availableTime: "",
  perPatientTime: "",
  serialVisibility: "",
  status: "Active",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "doctorName",
  "availableTime",
  "perPatientTime",
  "serialVisibility",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["doctorName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "doctorName", title: "Doctor Name" },
  { key: "availableTime", title: "Available Time" },
  { key: "perPatientTime", title: "Per Patient Time" },
  { key: "serialVisibility", title: "Serial Visibility" },
  { key: "status", title: "Status" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    doctorName: "Dr. John Doe",
    availableTime: "09:00 AM - 05:00 PM",
    perPatientTime: "30 minutes",
    serialVisibility: "Visible",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Schedule created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    doctorName: "Dr. Jane Smith",
    availableTime: "08:00 AM - 04:00 PM",
    perPatientTime: "45 minutes",
    serialVisibility: "Hidden",
    status: "Active",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Schedule created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    doctorName: "Dr. Ahmed Khan",
    availableTime: "10:00 AM - 06:00 PM",
    perPatientTime: "20 minutes",
    serialVisibility: "Visible",
    status: "Active",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Schedule created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    doctorName: "Dr. Liu Wen",
    availableTime: "11:00 AM - 07:00 PM",
    perPatientTime: "60 minutes",
    serialVisibility: "Visible",
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
    doctorName: "Dr. Carlos Diaz",
    availableTime: "07:00 AM - 03:00 PM",
    perPatientTime: "25 minutes",
    serialVisibility: "Hidden",
    status: "Active",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Schedule created",
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
  doctorName: "Dr. John Doe",
  availableTime: "09:00 AM - 05:00 PM",
  perPatientTime: "30 minutes",
  serialVisibility: "Visible",
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
    name: "doctorName",
    label: "Doctor Name",
    component: "autocomplete",
    options: [
      "Dr. John Doe",
      "Dr. Jane Smith",
      "Dr. Ahmed Khan",
      "Dr. Liu Wen",
      "Dr. Carlos Diaz",
    ],
    nextFocus: "availableTime",
    tooltip: "Select doctor",
    required: true,
  },
  {
    name: "availableTime",
    label: "Available Time",
    component: "input",
    nextFocus: "perPatientTime",
    tooltip: "Enter available time (e.g., 09:00 AM - 05:00 PM)",
    required: true,
  },
  {
    name: "perPatientTime",
    label: "Per Patient Time",
    component: "autocomplete",
    options: [
      "15 minutes",
      "20 minutes",
      "25 minutes",
      "30 minutes",
      "45 minutes",
      "60 minutes",
    ],
    nextFocus: "serialVisibility",
    tooltip: "Select time per patient",
    required: true,
  },
  {
    name: "serialVisibility",
    label: "Serial Visibility",
    component: "autocomplete",
    options: ["Visible", "Hidden"],
    nextFocus: "status",
    tooltip: "Select serial visibility",
    required: true,
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
  doctorName: "Doctor Name",
  availableTime: "Available Time",
  perPatientTime: "Per Patient Time",
  serialVisibility: "Serial Visibility",
  status: "Status",
};
