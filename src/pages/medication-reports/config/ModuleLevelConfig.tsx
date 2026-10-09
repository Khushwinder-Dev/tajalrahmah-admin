import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
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

export const searchableKeys: (keyof ModuleFieldsType)[] = ["patientId"];

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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["patientId"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
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
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-02",
    draftedAt: null,
    actionMessage: "Prescription created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    patientId: "PAT-1001",
    medicineName: "Paracetamol",
    dosage: "500mg",
    perDayIntake: "3",
    fullStomach: "No",
    othersInstruction: "Take with water",
    fromDate: "2025-01-01",
    toDate: "2025-01-07",
    doctorName: "Dr. Rahman",
    intakeTime: "08:00, 14:00, 20:00",
  },
  {
    id: "2",
    status: "Active",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-03",
    draftedAt: null,
    actionMessage: "Prescription updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    patientId: "PAT-1002",
    medicineName: "Amoxicillin",
    dosage: "250mg",
    perDayIntake: "2",
    fullStomach: "Yes",
    othersInstruction: "Complete the full course",
    fromDate: "2025-01-02",
    toDate: "2025-01-09",
    doctorName: "Dr. Karim",
    intakeTime: "09:00, 21:00",
  },
  {
    id: "3",
    status: "Draft",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-03",
    draftedAt: "2025-01-03",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    patientId: "PAT-1003",
    medicineName: "Metformin",
    dosage: "850mg",
    perDayIntake: "2",
    fullStomach: "Yes",
    othersInstruction: "For diabetes management",
    fromDate: "2025-01-03",
    toDate: "2025-02-03",
    doctorName: "Dr. Akter",
    intakeTime: "08:00, 20:00",
  },
  {
    id: "4",
    status: "Active",
    createdAt: "2025-01-04",
    updatedAt: "2025-01-05",
    draftedAt: null,
    actionMessage: "Prescription created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    patientId: "PAT-1004",
    medicineName: "Omeprazole",
    dosage: "20mg",
    perDayIntake: "1",
    fullStomach: "No",
    othersInstruction: "Take before breakfast",
    fromDate: "2025-01-04",
    toDate: "2025-01-14",
    doctorName: "Dr. Nabila",
    intakeTime: "07:30",
  },
  {
    id: "5",
    status: "Deleted",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-06",
    draftedAt: null,
    actionMessage: "Prescription deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    patientId: "PAT-1005",
    medicineName: "Ibuprofen",
    dosage: "400mg",
    perDayIntake: "3",
    fullStomach: "Yes",
    othersInstruction: "Take after meals",
    fromDate: "2025-01-05",
    toDate: "2025-01-10",
    doctorName: "Dr. Hasan",
    intakeTime: "08:00, 14:00, 20:00",
  },
  {
    id: "6",
    status: "Active",
    createdAt: "2025-01-06",
    updatedAt: "2025-01-07",
    draftedAt: null,
    actionMessage: "Prescription created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    patientId: "PAT-1006",
    medicineName: "Amlodipine",
    dosage: "5mg",
    perDayIntake: "1",
    fullStomach: "Yes",
    othersInstruction: "For blood pressure",
    fromDate: "2025-01-06",
    toDate: "2025-02-06",
    doctorName: "Dr. Mahmud",
    intakeTime: "09:00",
  },
  {
    id: "7",
    status: "Draft",
    createdAt: "2025-01-07",
    updatedAt: "2025-01-07",
    draftedAt: "2025-01-07",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    patientId: "PAT-1007",
    medicineName: "Cetirizine",
    dosage: "10mg",
    perDayIntake: "1",
    fullStomach: "No",
    othersInstruction: "Take at night for allergies",
    fromDate: "2025-01-07",
    toDate: "2025-01-14",
    doctorName: "Dr. Ahsan",
    intakeTime: "21:00",
  },
  {
    id: "8",
    status: "Active",
    createdAt: "2025-01-08",
    updatedAt: "2025-01-09",
    draftedAt: null,
    actionMessage: "Prescription created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    patientId: "PAT-1008",
    medicineName: "Azithromycin",
    dosage: "500mg",
    perDayIntake: "1",
    fullStomach: "Yes",
    othersInstruction: "Take after lunch",
    fromDate: "2025-01-08",
    toDate: "2025-01-11",
    doctorName: "Dr. Salma",
    intakeTime: "13:00",
  },
  {
    id: "9",
    status: "Active",
    createdAt: "2025-01-09",
    updatedAt: "2025-01-10",
    draftedAt: null,
    actionMessage: "Prescription created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    patientId: "PAT-1009",
    medicineName: "Losartan",
    dosage: "50mg",
    perDayIntake: "1",
    fullStomach: "Yes",
    othersInstruction: "Blood pressure medicine",
    fromDate: "2025-01-09",
    toDate: "2025-02-09",
    doctorName: "Dr. Imran",
    intakeTime: "08:30",
  },
  {
    id: "10",
    status: "Deleted",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-11",
    draftedAt: null,
    actionMessage: "Prescription deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    patientId: "PAT-1010",
    medicineName: "Clarithromycin",
    dosage: "250mg",
    perDayIntake: "2",
    fullStomach: "Yes",
    othersInstruction: "Take with water",
    fromDate: "2025-01-10",
    toDate: "2025-01-15",
    doctorName: "Dr. Nasrin",
    intakeTime: "08:00, 20:00",
  },
  {
    id: "11",
    status: "Active",
    createdAt: "2025-01-11",
    updatedAt: "2025-01-12",
    draftedAt: null,
    actionMessage: "Prescription updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    patientId: "PAT-1011",
    medicineName: "Vitamin D",
    dosage: "1000IU",
    perDayIntake: "1",
    fullStomach: "Yes",
    othersInstruction: "Take with milk",
    fromDate: "2025-01-11",
    toDate: "2025-03-11",
    doctorName: "Dr. Amin",
    intakeTime: "10:00",
  },
  {
    id: "12",
    status: "Active",
    createdAt: "2025-01-12",
    updatedAt: "2025-01-13",
    draftedAt: null,
    actionMessage: "Prescription created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    patientId: "PAT-1012",
    medicineName: "Prednisolone",
    dosage: "10mg",
    perDayIntake: "1",
    fullStomach: "Yes",
    othersInstruction: "Do not stop suddenly",
    fromDate: "2025-01-12",
    toDate: "2025-01-22",
    doctorName: "Dr. Hossain",
    intakeTime: "09:00",
  },
];

/*
===============================
# PDF Config
===============================
*/
export const printConfigFieldLabels: ModuleFieldsType = {
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
