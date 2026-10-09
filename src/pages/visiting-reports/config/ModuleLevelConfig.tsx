import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  patientId: string;
  visitType: string;
  visitBy: string;
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
  patientId: "",
  visitType: "",
  visitBy: "",
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
  { key: "visitType", title: "Visit Type" },
  { key: "visitBy", title: "Visit By" },
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
    patientId: "P-1001",
    visitType: "General Checkup",
    visitBy: "Dr. Rahman",
    visitDate: "2025-09-01",
    visitTime: "10:00 AM",
    finding: "Mild fever",
    instructions: "Take paracetamol 500mg",
    fees: "500",
    status: "Completed",
    createdAt: "2025-09-01T09:30:00Z",
    updatedAt: "2025-09-01T10:30:00Z",
    draftedAt: null,
    actionMessage: "Checked and prescribed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    patientId: "P-1002",
    visitType: "Dental",
    visitBy: "Dr. Karim",
    visitDate: "2025-09-02",
    visitTime: "11:30 AM",
    finding: "Toothache",
    instructions: "Prescribed antibiotics",
    fees: "800",
    status: "Completed",
    createdAt: "2025-09-02T11:00:00Z",
    updatedAt: "2025-09-02T11:45:00Z",
    draftedAt: null,
    actionMessage: "Treatment done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    patientId: "P-1003",
    visitType: "Eye Checkup",
    visitBy: "Dr. Ayesha",
    visitDate: "2025-09-03",
    visitTime: "09:45 AM",
    finding: "Vision blur",
    instructions: "Prescribed glasses",
    fees: "600",
    status: "Completed",
    createdAt: "2025-09-03T09:20:00Z",
    updatedAt: "2025-09-03T10:00:00Z",
    draftedAt: null,
    actionMessage: "New prescription",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    patientId: "P-1004",
    visitType: "ENT",
    visitBy: "Dr. Hasan",
    visitDate: "2025-09-04",
    visitTime: "01:00 PM",
    finding: "Ear infection",
    instructions: "Antibiotics & ear drops",
    fees: "700",
    status: "Completed",
    createdAt: "2025-09-04T12:45:00Z",
    updatedAt: "2025-09-04T01:30:00Z",
    draftedAt: null,
    actionMessage: "Prescribed treatment",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    patientId: "P-1005",
    visitType: "Pediatrics",
    visitBy: "Dr. Jahan",
    visitDate: "2025-09-05",
    visitTime: "02:15 PM",
    finding: "Cold & cough",
    instructions: "Cough syrup & rest",
    fees: "400",
    status: "Completed",
    createdAt: "2025-09-05T02:00:00Z",
    updatedAt: "2025-09-05T02:45:00Z",
    draftedAt: null,
    actionMessage: "Child prescribed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    patientId: "P-1006",
    visitType: "Orthopedic",
    visitBy: "Dr. Alam",
    visitDate: "2025-09-06",
    visitTime: "03:30 PM",
    finding: "Back pain",
    instructions: "Pain relief & physiotherapy",
    fees: "1000",
    status: "Completed",
    createdAt: "2025-09-06T03:00:00Z",
    updatedAt: "2025-09-06T04:00:00Z",
    draftedAt: null,
    actionMessage: "Recommended physiotherapy",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    patientId: "P-1007",
    visitType: "Dermatology",
    visitBy: "Dr. Tahmina",
    visitDate: "2025-09-07",
    visitTime: "10:30 AM",
    finding: "Skin rash",
    instructions: "Topical cream",
    fees: "550",
    status: "Completed",
    createdAt: "2025-09-07T10:00:00Z",
    updatedAt: "2025-09-07T11:00:00Z",
    draftedAt: null,
    actionMessage: "Prescribed cream",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    patientId: "P-1008",
    visitType: "Neurology",
    visitBy: "Dr. Kabir",
    visitDate: "2025-09-08",
    visitTime: "12:00 PM",
    finding: "Headache",
    instructions: "MRI recommended",
    fees: "1500",
    status: "Pending",
    createdAt: "2025-09-08T11:45:00Z",
    updatedAt: "2025-09-08T12:10:00Z",
    draftedAt: null,
    actionMessage: "Further test needed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    patientId: "P-1009",
    visitType: "General Checkup",
    visitBy: "Dr. Rahman",
    visitDate: "2025-09-09",
    visitTime: "09:15 AM",
    finding: "Routine checkup",
    instructions: "Healthy diet",
    fees: "300",
    status: "Completed",
    createdAt: "2025-09-09T09:00:00Z",
    updatedAt: "2025-09-09T09:45:00Z",
    draftedAt: null,
    actionMessage: "No major issues",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    patientId: "P-1010",
    visitType: "Cardiology",
    visitBy: "Dr. Sultana",
    visitDate: "2025-09-10",
    visitTime: "02:45 PM",
    finding: "Chest pain",
    instructions: "ECG & follow up",
    fees: "2000",
    status: "Pending",
    createdAt: "2025-09-10T02:20:00Z",
    updatedAt: "2025-09-10T03:00:00Z",
    draftedAt: null,
    actionMessage: "ECG advised",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    patientId: "P-1011",
    visitType: "Dental",
    visitBy: "Dr. Karim",
    visitDate: "2025-09-11",
    visitTime: "04:30 PM",
    finding: "Cavity",
    instructions: "Filling required",
    fees: "1200",
    status: "Completed",
    createdAt: "2025-09-11T04:00:00Z",
    updatedAt: "2025-09-11T05:00:00Z",
    draftedAt: null,
    actionMessage: "Scheduled filling",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    patientId: "P-1012",
    visitType: "Gynecology",
    visitBy: "Dr. Farzana",
    visitDate: "2025-09-12",
    visitTime: "11:15 AM",
    finding: "Routine checkup",
    instructions: "Vitamin supplements",
    fees: "900",
    status: "Completed",
    createdAt: "2025-09-12T11:00:00Z",
    updatedAt: "2025-09-12T11:40:00Z",
    draftedAt: null,
    actionMessage: "Routine advice",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

/*
===============================
# PDF Config
===============================
*/
export const printConfigFieldLabels: ModuleFieldsType = {
  patientId: "Patient ID",
  visitType: "Visit Type",
  visitBy: "Visit By",
  visitDate: "Visit Date",
  visitTime: "Visit Time",
  finding: "Finding",
  instructions: "Instructions",
  fees: "Fees",
};
