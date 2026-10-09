import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  patientId: string;
  appointmentId: string;
  type: string;
  doctorName: string;
  visitingFee: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  patientId: "",
  appointmentId: "",
  type: "",
  doctorName: "",
  visitingFee: "",
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
  { key: "appointmentId", title: "Appointment ID" },
  { key: "type", title: "Type" },
  { key: "doctorName", title: "Doctor Name" },
  { key: "visitingFee", title: "Visiting Fee" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    patientId: "P-1001",
    appointmentId: "A-5001",
    type: "General Checkup",
    doctorName: "Dr. Rahman",
    visitingFee: "500",
    status: "Active",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "Checked in",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    patientId: "P-1002",
    appointmentId: "A-5002",
    type: "Dental",
    doctorName: "Dr. Alam",
    visitingFee: "800",
    status: "Draft",
    createdAt: "2025-09-03T09:30:00Z",
    updatedAt: "2025-09-03T10:15:00Z",
    draftedAt: "2025-09-03T09:45:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    patientId: "P-1003",
    appointmentId: "A-5003",
    type: "Cardiology",
    doctorName: "Dr. Hasan",
    visitingFee: "1200",
    status: "Deleted",
    createdAt: "2025-08-25T08:00:00Z",
    updatedAt: "2025-08-26T08:30:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "4",
    patientId: "P-1004",
    appointmentId: "A-5004",
    type: "ENT",
    doctorName: "Dr. Jahan",
    visitingFee: "600",
    status: "Updated",
    createdAt: "2025-09-05T11:20:00Z",
    updatedAt: "2025-09-06T14:00:00Z",
    draftedAt: null,
    actionMessage: "Prescription updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    patientId: "P-1005",
    appointmentId: "A-5005",
    type: "Neurology",
    doctorName: "Dr. Karim",
    visitingFee: "1500",
    status: "Active",
    createdAt: "2025-09-07T15:00:00Z",
    updatedAt: "2025-09-07T16:10:00Z",
    draftedAt: null,
    actionMessage: "Follow-up scheduled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    patientId: "P-1006",
    appointmentId: "A-5006",
    type: "Pediatrics",
    doctorName: "Dr. Nahar",
    visitingFee: "700",
    status: "Draft",
    createdAt: "2025-09-08T10:00:00Z",
    updatedAt: "2025-09-08T10:30:00Z",
    draftedAt: "2025-09-08T10:10:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    patientId: "P-1007",
    appointmentId: "A-5007",
    type: "Orthopedics",
    doctorName: "Dr. Akter",
    visitingFee: "1000",
    status: "Active",
    createdAt: "2025-09-09T09:00:00Z",
    updatedAt: "2025-09-09T10:45:00Z",
    draftedAt: null,
    actionMessage: "Checked in",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    patientId: "P-1008",
    appointmentId: "A-5008",
    type: "Dermatology",
    doctorName: "Dr. Chowdhury",
    visitingFee: "900",
    status: "Deleted",
    createdAt: "2025-08-30T13:00:00Z",
    updatedAt: "2025-08-30T14:00:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "9",
    patientId: "P-1009",
    appointmentId: "A-5009",
    type: "Eye",
    doctorName: "Dr. Hossain",
    visitingFee: "650",
    status: "Updated",
    createdAt: "2025-09-02T11:00:00Z",
    updatedAt: "2025-09-02T12:15:00Z",
    draftedAt: null,
    actionMessage: "Updated patient info",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    patientId: "P-1010",
    appointmentId: "A-5010",
    type: "General Surgery",
    doctorName: "Dr. Majumder",
    visitingFee: "2000",
    status: "Active",
    createdAt: "2025-09-04T14:00:00Z",
    updatedAt: "2025-09-04T15:20:00Z",
    draftedAt: null,
    actionMessage: "Operation scheduled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    patientId: "P-1011",
    appointmentId: "A-5011",
    type: "Psychiatry",
    doctorName: "Dr. Farzana",
    visitingFee: "1100",
    status: "Draft",
    createdAt: "2025-09-06T09:30:00Z",
    updatedAt: "2025-09-06T10:00:00Z",
    draftedAt: "2025-09-06T09:45:00Z",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    patientId: "P-1012",
    appointmentId: "A-5012",
    type: "Urology",
    doctorName: "Dr. Islam",
    visitingFee: "1300",
    status: "Active",
    createdAt: "2025-09-10T10:00:00Z",
    updatedAt: "2025-09-10T11:10:00Z",
    draftedAt: null,
    actionMessage: "Checked in",
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
  appointmentId: "Appointment ID",
  type: "Type",
  doctorName: "Doctor Name",
  visitingFee: "Visiting Fee",
};
