import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  slNo: string;
  appointmentId: string;
  patientId: string;
  department: string;
  doctorName: string;
  serialNo: string;
  problem: string;
  date: string;
  status: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  slNo: "",
  appointmentId: "",
  patientId: "",
  department: "",
  doctorName: "",
  serialNo: "",
  problem: "",
  date: "",
  status: "Active",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "appointmentId",
  "patientId",
  "department",
  "doctorName",
  "serialNo",
  "problem",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["slNo"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "slNo", title: "SL.NO" },
  { key: "appointmentId", title: "Appointment Id" },
  { key: "patientId", title: "Patient Id" },
  { key: "department", title: "Department" },
  { key: "doctorName", title: "Doctor Name" },
  { key: "serialNo", title: "Serial No" },
  { key: "problem", title: "Problem" },
  { key: "date", title: "Date" },
  { key: "status", title: "Status" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    slNo: "1",
    appointmentId: "APT-001",
    patientId: "PAT-001",
    department: "Cardiology",
    doctorName: "Dr. John Doe",
    serialNo: "001",
    problem: "Chest Pain",
    date: "2025-01-15",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Appointment created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    slNo: "2",
    appointmentId: "APT-002",
    patientId: "PAT-002",
    department: "Neurology",
    doctorName: "Dr. Jane Smith",
    serialNo: "002",
    problem: "Headache",
    date: "2025-01-16",
    status: "Active",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Appointment created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    slNo: "3",
    appointmentId: "APT-003",
    patientId: "PAT-003",
    department: "Orthopedics",
    doctorName: "Dr. Ahmed Khan",
    serialNo: "003",
    problem: "Knee Pain",
    date: "2025-01-17",
    status: "Active",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Appointment created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    slNo: "4",
    appointmentId: "APT-004",
    patientId: "PAT-004",
    department: "Dermatology",
    doctorName: "Dr. Liu Wen",
    serialNo: "004",
    problem: "Skin Rash",
    date: "2025-01-18",
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
    slNo: "5",
    appointmentId: "APT-005",
    patientId: "PAT-005",
    department: "Oncology",
    doctorName: "Dr. Carlos Diaz",
    serialNo: "005",
    problem: "Follow-up Consultation",
    date: "2025-01-19",
    status: "Active",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Appointment created",
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
  slNo: "1",
  appointmentId: "APT-001",
  patientId: "PAT-001",
  department: "Cardiology",
  doctorName: "Dr. John Doe",
  serialNo: "001",
  problem: "Chest Pain",
  date: "2025-01-15",
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
    name: "slNo",
    label: "SL.NO",
    component: "input",
    nextFocus: "appointmentId",
    tooltip: "Enter serial number",
    required: true,
  },
  {
    name: "appointmentId",
    label: "Appointment Id",
    component: "input",
    nextFocus: "patientId",
    tooltip: "Enter appointment ID",
    required: true,
  },
  {
    name: "patientId",
    label: "Patient Id",
    component: "input",
    nextFocus: "department",
    tooltip: "Enter patient ID",
    required: true,
  },
  {
    name: "department",
    label: "Department",
    component: "input",
    nextFocus: "doctorName",
    tooltip: "Enter department",
    required: true,
  },
  {
    name: "doctorName",
    label: "Doctor Name",
    component: "input",
    nextFocus: "serialNo",
    tooltip: "Enter doctor name",
    required: true,
  },
  {
    name: "serialNo",
    label: "Serial No",
    component: "input",
    nextFocus: "problem",
    tooltip: "Enter serial number",
    required: true,
  },
  {
    name: "problem",
    label: "Problem",
    component: "input",
    nextFocus: "date",
    tooltip: "Enter problem description",
    required: true,
  },
  {
    name: "date",
    label: "Date",
    component: "input",
    type: "date",
    nextFocus: "status",
    tooltip: "Select appointment date",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    component: "autocomplete",
    options: ["Active", "Inactive", "Draft", "Completed", "Cancelled"],
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
  slNo: "SL.NO",
  appointmentId: "Appointment Id",
  patientId: "Patient Id",
  department: "Department",
  doctorName: "Doctor Name",
  serialNo: "Serial No",
  problem: "Problem",
  date: "Date",
  status: "Status",
};
