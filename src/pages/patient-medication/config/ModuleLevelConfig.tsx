import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  slNo: string;
  patientId: string;
  medicineName: string;
  dosage: string;
  perDayIntake: string;
  fullStomach: string;
  othersInstruction: string;
  fromDate: string;
  toDate: string;
  doctorName: string;
  intakeTime: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  slNo: "",
  patientId: "",
  medicineName: "",
  dosage: "",
  perDayIntake: "",
  fullStomach: "",
  othersInstruction: "",
  fromDate: "",
  toDate: "",
  doctorName: "",
  intakeTime: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "patientId",
  "medicineName",
  "dosage",
  "doctorName",
  "intakeTime",
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
  { key: "patientId", title: "Patient ID" },
  { key: "medicineName", title: "Medicine Name" },
  { key: "dosage", title: "Dosage" },
  { key: "perDayIntake", title: "Per Day Intake" },
  { key: "fullStomach", title: "Full Stomach" },
  { key: "othersInstruction", title: "Others Instruction" },
  { key: "fromDate", title: "From Date" },
  { key: "toDate", title: "To Date" },
  { key: "doctorName", title: "Doctor Name" },
  { key: "intakeTime", title: "Intake Time" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    slNo: "1",
    patientId: "P001",
    medicineName: "Paracetamol",
    dosage: "500mg",
    perDayIntake: "3 times",
    fullStomach: "Yes",
    othersInstruction: "Take with water",
    fromDate: "2025-01-01",
    toDate: "2025-01-07",
    doctorName: "Dr. Smith",
    intakeTime: "08:00, 14:00, 20:00",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Medication prescribed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    slNo: "2",
    patientId: "P002",
    medicineName: "Amoxicillin",
    dosage: "250mg",
    perDayIntake: "2 times",
    fullStomach: "No",
    othersInstruction: "Complete full course",
    fromDate: "2025-01-02",
    toDate: "2025-01-10",
    doctorName: "Dr. Johnson",
    intakeTime: "09:00, 21:00",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Medication prescribed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    slNo: "3",
    patientId: "P003",
    medicineName: "Ibuprofen",
    dosage: "400mg",
    perDayIntake: "3 times",
    fullStomach: "Yes",
    othersInstruction: "Take with food",
    fromDate: "2025-01-03",
    toDate: "2025-01-05",
    doctorName: "Dr. Brown",
    intakeTime: "08:00, 14:00, 20:00",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Medication prescribed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    slNo: "4",
    patientId: "P004",
    medicineName: "Metformin",
    dosage: "500mg",
    perDayIntake: "2 times",
    fullStomach: "Yes",
    othersInstruction: "Monitor blood sugar",
    fromDate: "2025-01-04",
    toDate: "2025-01-30",
    doctorName: "Dr. Wilson",
    intakeTime: "08:00, 18:00",
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
    slNo: "5",
    patientId: "P005",
    medicineName: "Lisinopril",
    dosage: "10mg",
    perDayIntake: "1 time",
    fullStomach: "No",
    othersInstruction: "Take at same time daily",
    fromDate: "2025-01-05",
    toDate: "2025-02-05",
    doctorName: "Dr. Davis",
    intakeTime: "07:00",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Medication prescribed",
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
  patientId: "P001",
  medicineName: "Sample Medicine",
  dosage: "500mg",
  perDayIntake: "2 times",
  fullStomach: "Yes",
  othersInstruction: "Take with water",
  fromDate: "2025-01-01",
  toDate: "2025-01-07",
  doctorName: "Dr. Sample",
  intakeTime: "08:00, 20:00",

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
    nextFocus: "patientId",
    tooltip: "Enter serial number",
    required: true,
  },
  {
    name: "patientId",
    label: "Patient ID",
    component: "input",
    nextFocus: "medicineName",
    tooltip: "Enter patient ID",
    required: true,
  },
  {
    name: "medicineName",
    label: "Medicine Name",
    component: "input",
    nextFocus: "dosage",
    tooltip: "Enter medicine name",
    required: true,
  },
  {
    name: "dosage",
    label: "Dosage",
    component: "input",
    nextFocus: "perDayIntake",
    tooltip: "Enter dosage amount",
    required: true,
  },
  {
    name: "perDayIntake",
    label: "Per Day Intake",
    component: "input",
    nextFocus: "fullStomach",
    tooltip: "Enter frequency per day",
    required: true,
  },
  {
    name: "fullStomach",
    label: "Full Stomach",
    component: "autocomplete",
    options: ["Yes", "No"],
    nextFocus: "othersInstruction",
    tooltip: "Select if taken with full stomach",
    required: true,
  },
  {
    name: "othersInstruction",
    label: "Others Instruction",
    component: "input",
    nextFocus: "fromDate",
    tooltip: "Enter additional instructions",
    required: false,
  },
  {
    name: "fromDate",
    label: "From Date",
    component: "input",
    nextFocus: "toDate",
    tooltip: "Enter start date",
    required: true,
  },
  {
    name: "toDate",
    label: "To Date",
    component: "input",
    nextFocus: "doctorName",
    tooltip: "Enter end date",
    required: true,
  },
  {
    name: "doctorName",
    label: "Doctor Name",
    component: "input",
    nextFocus: "intakeTime",
    tooltip: "Enter doctor name",
    required: true,
  },
  {
    name: "intakeTime",
    label: "Intake Time",
    component: "input",
    tooltip: "Enter intake times (e.g., 08:00, 14:00, 20:00)",
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
  patientId: "Patient ID",
  medicineName: "Medicine Name",
  dosage: "Dosage",
  perDayIntake: "Per Day Intake",
  fullStomach: "Full Stomach",
  othersInstruction: "Others Instruction",
  fromDate: "From Date",
  toDate: "To Date",
  doctorName: "Doctor Name",
  intakeTime: "Intake Time",
};
