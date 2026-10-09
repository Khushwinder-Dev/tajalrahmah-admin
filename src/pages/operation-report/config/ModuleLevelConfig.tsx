import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  patientId: string;
  date: string;
  title: string;
  description: string;
  doctorName: string;
  status: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  patientId: "",
  date: "",
  title: "",
  description: "",
  doctorName: "",
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
  "date",
  "title",
  "description",
  "doctorName",
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
  status: string;
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = [
  "patientId",
  "date",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "patientId", title: "Patient ID" },
  { key: "date", title: "Date" },
  { key: "title", title: "Title" },
  { key: "description", title: "Description" },
  { key: "doctorName", title: "Doctor Name" },
  { key: "status", title: "Status" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    patientId: "PT001",
    date: "2025-09-08",
    title: "Normal Delivery Report",
    description:
      "Successful natural birth delivery at 38 weeks gestation. Mother and baby in good health.",
    doctorName: "Dr. Sarah Ahmed",
    status: "Completed",
    createdAt: "2025-09-08",
    updatedAt: "2025-09-08",
    draftedAt: null,
    actionMessage: "Report finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    patientId: "PT002",
    date: "2025-09-07",
    title: "C-Section Delivery Report",
    description:
      "Cesarean section performed due to breech presentation. Baby delivered safely at 39 weeks.",
    doctorName: "Dr. Rahman Khan",
    status: "Completed",
    createdAt: "2025-09-07",
    updatedAt: "2025-09-07",
    draftedAt: null,
    actionMessage: "Report approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    patientId: "PT003",
    date: "2025-09-06",
    title: "Premature Birth Report",
    description:
      "Premature delivery at 34 weeks. Baby transferred to NICU for monitoring and care.",
    doctorName: "Dr. Fatima Islam",
    status: "Under Review",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-06",
    draftedAt: null,
    actionMessage: "Pending specialist review",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    patientId: "PT004",
    date: "2025-09-05",
    title: "Twin Birth Report",
    description:
      "Successful delivery of twins via vaginal birth. Both babies healthy and stable.",
    doctorName: "Dr. Rashida Begum",
    status: "Completed",
    createdAt: "2025-09-05",
    updatedAt: "2025-09-05",
    draftedAt: null,
    actionMessage: "Documentation complete",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    patientId: "PT005",
    date: "2025-09-04",
    title: "Emergency Birth Report",
    description:
      "Emergency delivery due to cord prolapse. Quick intervention ensured positive outcome.",
    doctorName: "Dr. Karim Hassan",
    status: "Draft",
    createdAt: "2025-09-04",
    updatedAt: "2025-09-04",
    draftedAt: "2025-09-04",
    actionMessage: "Awaiting final review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    patientId: "PT006",
    date: "2025-09-03",
    title: "Water Birth Report",
    description:
      "Water birth delivery completed successfully. Natural labor with minimal complications.",
    doctorName: "Dr. Nasreen Ali",
    status: "Completed",
    createdAt: "2025-09-03",
    updatedAt: "2025-09-03",
    draftedAt: null,
    actionMessage: "Report filed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
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
  patientId: "PT007",
  date: "2025-09-10",
  title: "Standard Delivery Report",
  description:
    "Normal vaginal delivery at full term. Mother and baby are healthy and stable.",
  doctorName: "Dr. Ahmed Rahman",
  status: "In Progress",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

// add item for your necessary fields
export const formFields: FieldConfig[] = [
  {
    name: "patientId",
    label: "Patient ID",
    component: "input",
    nextFocus: "date",
    tooltip: "Enter patient identification number",
    required: true,
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    component: "input",
    nextFocus: "title",
    tooltip: "Select birth date",
    required: true,
  },
  {
    name: "title",
    label: "Title",
    component: "autocomplete",
    options: [
      "Normal Delivery Report",
      "C-Section Delivery Report",
      "Premature Birth Report",
      "Twin Birth Report",
      "Emergency Birth Report",
      "Water Birth Report",
      "Induced Labor Report",
      "VBAC Delivery Report",
    ],
    placeholder: " ",
    nextFocus: "description",
    tooltip: "Select or enter report title",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    nextFocus: "doctorName",
    tooltip: "Enter detailed birth report description",
    required: true,
  },
  {
    name: "doctorName",
    label: "Doctor Name",
    component: "autocomplete",
    options: [
      "Dr. Sarah Ahmed",
      "Dr. Rahman Khan",
      "Dr. Fatima Islam",
      "Dr. Rashida Begum",
      "Dr. Karim Hassan",
      "Dr. Nasreen Ali",
      "Dr. Ahmed Rahman",
      "Dr. Sultana Khatun",
    ],
    placeholder: " ",
    nextFocus: "status",
    tooltip: "Select or enter doctor name",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    component: "autocomplete",
    options: [
      "Draft",
      "In Progress",
      "Under Review",
      "Completed",
      "Approved",
      "Cancelled",
    ],
    placeholder: " ",
    tooltip: "Select report status",
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
  date: "Date",
  title: "Title",
  description: "Description",
  doctorName: "Doctor Name",
  status: "Status",
};
