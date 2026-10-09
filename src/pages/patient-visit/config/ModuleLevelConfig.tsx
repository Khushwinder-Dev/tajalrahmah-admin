import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  slNo: string;
  patientId: string;
  visitBy: string;
  selectOption: string;
  visitDate: string;
  visitTime: string;
  finding: string;
  instructions: string;
  fees: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  slNo: "",
  patientId: "",
  visitBy: "",
  selectOption: "",
  visitDate: "",
  visitTime: "",
  finding: "",
  instructions: "",
  fees: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "patientId",
  "visitBy",
  "selectOption",
  "visitDate",
  "visitTime",
  "finding",
  "instructions",
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
  { key: "visitBy", title: "Visit By" },
  { key: "selectOption", title: "Select Option" },
  { key: "visitDate", title: "Visit Date" },
  { key: "visitTime", title: "Visit Time" },
  { key: "finding", title: "Finding" },
  { key: "instructions", title: "Instructions" },
  { key: "fees", title: "Fees" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    slNo: "1",
    patientId: "P001",
    visitBy: "Dr. Smith",
    selectOption: "Regular Checkup",
    visitDate: "2025-01-01",
    visitTime: "10:00 AM",
    finding: "Normal blood pressure, slight fever",
    instructions: "Rest for 2 days, take prescribed medication",
    fees: "150.00",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Visit completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    slNo: "2",
    patientId: "P002",
    visitBy: "Dr. Johnson",
    selectOption: "Emergency Visit",
    visitDate: "2025-01-02",
    visitTime: "02:30 PM",
    finding: "Severe headache, high temperature",
    instructions: "Immediate medication, follow up in 3 days",
    fees: "200.00",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Emergency visit completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    slNo: "3",
    patientId: "P003",
    visitBy: "Dr. Brown",
    selectOption: "Follow-up Visit",
    visitDate: "2025-01-03",
    visitTime: "11:15 AM",
    finding: "Improvement in condition, stable vitals",
    instructions: "Continue current medication, next visit in 1 week",
    fees: "120.00",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Follow-up completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    slNo: "4",
    patientId: "P004",
    visitBy: "Dr. Wilson",
    selectOption: "Consultation",
    visitDate: "2025-01-04",
    visitTime: "09:45 AM",
    finding: "Diabetes management review needed",
    instructions: "Adjust medication dosage, dietary changes",
    fees: "180.00",
    createdAt: "2025-01-04",
    updatedAt: "2025-01-31",
    draftedAt: "2025-01-30",
    actionMessage: "Consultation pending review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    slNo: "5",
    patientId: "P005",
    visitBy: "Dr. Davis",
    selectOption: "Routine Checkup",
    visitDate: "2025-01-05",
    visitTime: "03:00 PM",
    finding: "All vitals normal, good health",
    instructions: "Maintain current lifestyle, annual checkup due",
    fees: "100.00",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Routine checkup completed",
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
  visitBy: "Dr. Sample",
  selectOption: "Regular Checkup",
  visitDate: "2025-01-01",
  visitTime: "10:00 AM",
  finding: "Sample finding",
  instructions: "Sample instructions",
  fees: "150.00",

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
    nextFocus: "visitBy",
    tooltip: "Enter patient ID",
    required: true,
  },
  {
    name: "visitBy",
    label: "Visit By",
    component: "input",
    nextFocus: "selectOption",
    tooltip: "Enter doctor or staff name",
    required: true,
  },
  {
    name: "selectOption",
    label: "Select Option",
    component: "autocomplete",
    options: [
      "Regular Checkup",
      "Emergency Visit",
      "Follow-up Visit",
      "Consultation",
      "Routine Checkup",
    ],
    nextFocus: "visitDate",
    tooltip: "Select visit type",
    required: true,
  },
  {
    name: "visitDate",
    label: "Visit Date",
    component: "input",
    nextFocus: "visitTime",
    tooltip: "Enter visit date",
    required: true,
  },
  {
    name: "visitTime",
    label: "Visit Time",
    component: "input",
    nextFocus: "finding",
    tooltip: "Enter visit time",
    required: true,
  },
  {
    name: "finding",
    label: "Finding",
    component: "input",
    nextFocus: "instructions",
    tooltip: "Enter medical findings",
    required: true,
  },
  {
    name: "instructions",
    label: "Instructions",
    component: "input",
    nextFocus: "fees",
    tooltip: "Enter instructions for patient",
    required: true,
  },
  {
    name: "fees",
    label: "Fees",
    component: "input",
    tooltip: "Enter consultation fees",
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
  visitBy: "Visit By",
  selectOption: "Select Option",
  visitDate: "Visit Date",
  visitTime: "Visit Time",
  finding: "Finding",
  instructions: "Instructions",
  fees: "Fees",
};
