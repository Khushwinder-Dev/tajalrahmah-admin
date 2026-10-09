import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  patientId: string;
  departmentName: string;
  doctorName: string;
  appointmentDate: string;
  serialNo: string;
  problem: string;
  status: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  patientId: "",
  departmentName: "",
  doctorName: "",
  appointmentDate: "",
  serialNo: "",
  problem: "",
  status: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "patientId",
  "departmentName",
  "doctorName",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["serialNo"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "serialNo", title: "Serial No" },
  { key: "patientId", title: "Patient ID" },
  { key: "departmentName", title: "Department Name" },
  { key: "doctorName", title: "Doctor Name" },
  { key: "appointmentDate", title: "Appointment Date" },
  { key: "problem", title: "Problem" },
  { key: "status", title: "Status" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    patientId: "P001",
    departmentName: "Cardiology",
    doctorName: "Dr. Smith",
    appointmentDate: "2025-01-15",
    serialNo: "A001",
    problem: "Chest pain and irregular heartbeat",
    status: "Confirmed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Appointment scheduled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    patientId: "P002",
    departmentName: "Orthopedics",
    doctorName: "Dr. Johnson",
    appointmentDate: "2025-01-16",
    serialNo: "A002",
    problem: "Knee pain and swelling",
    status: "Pending",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Waiting for confirmation",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    patientId: "P003",
    departmentName: "Neurology",
    doctorName: "Dr. Brown",
    appointmentDate: "2025-01-17",
    serialNo: "A003",
    problem: "Persistent headaches and dizziness",
    status: "Confirmed",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Appointment scheduled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    patientId: "P004",
    departmentName: "Dermatology",
    doctorName: "Dr. Wilson",
    appointmentDate: "2025-01-18",
    serialNo: "A004",
    problem: "Skin rash and allergic reactions",
    status: "Cancelled",
    createdAt: "2025-01-04",
    updatedAt: "2025-01-31",
    draftedAt: "2025-01-30",
    actionMessage: "Patient cancelled",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    patientId: "P005",
    departmentName: "Pediatrics",
    doctorName: "Dr. Davis",
    appointmentDate: "2025-01-19",
    serialNo: "A005",
    problem: "Regular checkup and vaccination",
    status: "Confirmed",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Appointment scheduled",
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
  patientId: "P001",
  departmentName: "Cardiology",
  doctorName: "Dr. Sample",
  appointmentDate: "2025-01-15",
  serialNo: "A001",
  problem: "Sample health issue",
  status: "Confirmed",

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
    name: "patientId",
    label: "Patient ID",
    component: "input",
    nextFocus: "departmentName",
    tooltip: "Enter patient ID",
    required: true,
  },
  {
    name: "departmentName",
    label: "Department Name",
    component: "autocomplete",
    options: [
      "Cardiology",
      "Orthopedics",
      "Neurology",
      "Dermatology",
      "Pediatrics",
      "General Medicine",
      "Gynecology",
      "ENT",
      "Ophthalmology",
      "Psychiatry",
    ],
    nextFocus: "doctorName",
    tooltip: "Select department",
    required: true,
  },
  {
    name: "doctorName",
    label: "Doctor Name",
    component: "input",
    nextFocus: "appointmentDate",
    tooltip: "Enter doctor name",
    required: true,
  },
  {
    name: "appointmentDate",
    label: "Appointment Date",
    component: "input",
    type: "date",
    nextFocus: "serialNo",
    tooltip: "Select appointment date",
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
    nextFocus: "status",
    tooltip: "Describe the health problem",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    component: "autocomplete",
    options: ["Confirmed", "Pending", "Cancelled", "Completed", "Rescheduled"],
    tooltip: "Select appointment status",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  patientId: "Patient ID",
  departmentName: "Department Name",
  doctorName: "Doctor Name",
  appointmentDate: "Appointment Date",
  serialNo: "Serial No",
  problem: "Problem",
  status: "Status",
};
