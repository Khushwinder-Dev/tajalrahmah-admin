import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  admissionId: string;
  patientId: string;
  amount: string;
  paymentMethod: string;
  cashCardCheque: string;
  receiptNo: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  admissionId: "",
  patientId: "",
  amount: "",
  paymentMethod: "",
  cashCardCheque: "",
  receiptNo: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "admissionId",
  "patientId",
  "amount",
  "paymentMethod",
  "cashCardCheque",
  "receiptNo",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["admissionId"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "admissionId", title: "Admission ID" },
  { key: "patientId", title: "Patient ID" },
  { key: "amount", title: "Amount" },
  { key: "paymentMethod", title: "Payment Method" },
  { key: "cashCardCheque", title: "Cash / Card / Cheque" },
  { key: "receiptNo", title: "Receipt No" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    admissionId: "ADM001",
    patientId: "PAT001",
    amount: "5000",
    paymentMethod: "Cash",
    cashCardCheque: "Cash",
    receiptNo: "RCPT001",
    status: "Completed",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-01T11:00:00Z",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    admissionId: "ADM002",
    patientId: "PAT002",
    amount: "7500",
    paymentMethod: "Card",
    cashCardCheque: "Cash",
    receiptNo: "RCPT002",
    status: "Pending",
    createdAt: "2025-09-02T09:15:00Z",
    updatedAt: "2025-09-02T09:20:00Z",
    draftedAt: null,
    actionMessage: "Awaiting confirmation",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    admissionId: "ADM003",
    patientId: "PAT003",
    amount: "3200",
    paymentMethod: "Online",
    cashCardCheque: "Cash",
    receiptNo: "RCPT003",
    status: "Completed",
    createdAt: "2025-09-03T14:00:00Z",
    updatedAt: "2025-09-03T14:30:00Z",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    admissionId: "ADM004",
    patientId: "PAT004",
    amount: "1500",
    paymentMethod: "Cash",
    cashCardCheque: "Cash",
    receiptNo: "RCPT004",
    status: "Draft",
    createdAt: "2025-09-04T08:30:00Z",
    updatedAt: "2025-09-04T08:35:00Z",
    draftedAt: "2025-09-04T08:35:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    admissionId: "ADM005",
    patientId: "PAT005",
    amount: "9800",
    paymentMethod: "Card",
    cashCardCheque: "Cash",
    receiptNo: "RCPT005",
    status: "Completed",
    createdAt: "2025-09-05T12:00:00Z",
    updatedAt: "2025-09-05T12:45:00Z",
    draftedAt: null,
    actionMessage: "Payment successful",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    admissionId: "ADM006",
    patientId: "PAT006",
    amount: "4300",
    paymentMethod: "Online",
    cashCardCheque: "Cash",
    receiptNo: "RCPT006",
    status: "Deleted",
    createdAt: "2025-09-06T15:00:00Z",
    updatedAt: "2025-09-06T15:10:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "7",
    admissionId: "ADM007",
    patientId: "PAT007",
    amount: "6200",
    paymentMethod: "Cash",
    cashCardCheque: "Cash",
    receiptNo: "RCPT007",
    status: "Completed",
    createdAt: "2025-09-07T10:20:00Z",
    updatedAt: "2025-09-07T10:40:00Z",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    admissionId: "ADM008",
    patientId: "PAT008",
    amount: "2500",
    paymentMethod: "Card",
    cashCardCheque: "Cash",
    receiptNo: "RCPT008",
    status: "Pending",
    createdAt: "2025-09-08T09:45:00Z",
    updatedAt: "2025-09-08T09:50:00Z",
    draftedAt: null,
    actionMessage: "Awaiting approval",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    admissionId: "ADM009",
    patientId: "PAT009",
    amount: "8700",
    paymentMethod: "Online",
    cashCardCheque: "Cash",
    receiptNo: "RCPT009",
    status: "Completed",
    createdAt: "2025-09-09T13:00:00Z",
    updatedAt: "2025-09-09T13:25:00Z",
    draftedAt: null,
    actionMessage: "Payment successful",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    admissionId: "ADM010",
    patientId: "PAT010",
    amount: "3400",
    paymentMethod: "Cash",
    cashCardCheque: "Cash",
    receiptNo: "RCPT010",
    status: "Draft",
    createdAt: "2025-09-10T11:00:00Z",
    updatedAt: "2025-09-10T11:10:00Z",
    draftedAt: "2025-09-10T11:10:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    admissionId: "ADM011",
    patientId: "PAT011",
    amount: "7600",
    paymentMethod: "Online",
    cashCardCheque: "Cash",
    receiptNo: "RCPT011",
    status: "Completed",
    createdAt: "2025-09-11T14:00:00Z",
    updatedAt: "2025-09-11T14:40:00Z",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    admissionId: "ADM012",
    patientId: "PAT012",
    amount: "500",
    paymentMethod: "Cash",
    cashCardCheque: "Cash",
    receiptNo: "RCPT012",
    status: "Deleted",
    createdAt: "2025-09-12T08:00:00Z",
    updatedAt: "2025-09-12T08:05:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
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
  admissionId: "ADM001",
  patientId: "PAT001",
  amount: "5000",
  paymentMethod: "Cash",
  receiptNo: "RCPT001",
  cashCardCheque: "Cash",

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
    name: "admissionId",
    label: "Admission ID",
    nextFocus: "patientId",
    component: "input",
    tooltip: "Enter admission id",
    required: true,
  },
  {
    name: "patientId",
    label: "Patient ID",
    nextFocus: "amount",
    component: "input",
    tooltip: "Enter patient id",
    required: true,
  },
  {
    name: "amount",
    label: "Amount",
    nextFocus: "paymentMethod",
    component: "input",
    tooltip: "Enter amount",
    required: true,
  },
  {
    name: "paymentMethod",
    label: "Payment Method",
    nextFocus: "cashCardCheque",
    component: "input",
    tooltip: "Enter payment method",
    required: true,
  },
  {
    name: "cashCardCheque",
    label: "Cash / Card / Cheque",
    nextFocus: "receiptNo",
    component: "input",
    tooltip: "Enter cash / card / cheque",
    required: true,
  },
  {
    name: "receiptNo",
    label: "Receipt No",
    nextFocus: "isDefault",
    component: "input",
    tooltip: "Enter receipt no",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  admissionId: "Admission ID",
  patientId: "Patient ID",
  amount: "Amount",
  paymentMethod: "Payment Method",
  cashCardCheque: "Cash / Card / Cheque",
  receiptNo: "Receipt No",
};

// grid view

export type GridDataType = ModuleFieldsType & {
  id: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

export const gridviewData: GridDataType[] = [
  {
    id: "1",
    admissionId: "ADM-1001",
    patientId: "PAT-2001",
    amount: "1500",
    paymentMethod: "Cash",
    cashCardCheque: "Cash",
    receiptNo: "RCPT-001",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-01"),
    draftedAt: null,
    updatedAt: new Date("2025-01-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    admissionId: "ADM-1002",
    patientId: "PAT-2002",
    amount: "2200",
    paymentMethod: "Card",
    cashCardCheque: "VISA",
    receiptNo: "RCPT-002",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-03"),
    draftedAt: null,
    updatedAt: new Date("2025-01-04"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    admissionId: "ADM-1003",
    patientId: "PAT-2003",
    amount: "1800",
    paymentMethod: "Cheque",
    cashCardCheque: "Cheque-123",
    receiptNo: "RCPT-003",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-05"),
    draftedAt: new Date("2025-01-06"),
    updatedAt: new Date("2025-01-06"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    admissionId: "ADM-1004",
    patientId: "PAT-2004",
    amount: "3500",
    paymentMethod: "Cash",
    cashCardCheque: "Cash",
    receiptNo: "RCPT-004",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-07"),
    draftedAt: null,
    updatedAt: new Date("2025-01-08"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    admissionId: "ADM-1005",
    patientId: "PAT-2005",
    amount: "2700",
    paymentMethod: "Card",
    cashCardCheque: "MasterCard",
    receiptNo: "RCPT-005",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-09"),
    draftedAt: null,
    updatedAt: new Date("2025-01-10"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    admissionId: "ADM-1006",
    patientId: "PAT-2006",
    amount: "3100",
    paymentMethod: "Cheque",
    cashCardCheque: "Cheque-456",
    receiptNo: "RCPT-006",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-11"),
    draftedAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    admissionId: "ADM-1007",
    patientId: "PAT-2007",
    amount: "4000",
    paymentMethod: "Cash",
    cashCardCheque: "Cash",
    receiptNo: "RCPT-007",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-13"),
    draftedAt: null,
    updatedAt: new Date("2025-01-14"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    admissionId: "ADM-1008",
    patientId: "PAT-2008",
    amount: "1450",
    paymentMethod: "Card",
    cashCardCheque: "VISA",
    receiptNo: "RCPT-008",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-15"),
    draftedAt: null,
    updatedAt: new Date("2025-01-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    admissionId: "ADM-1009",
    patientId: "PAT-2009",
    amount: "1950",
    paymentMethod: "Cheque",
    cashCardCheque: "Cheque-789",
    receiptNo: "RCPT-009",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-17"),
    draftedAt: new Date("2025-01-18"),
    updatedAt: new Date("2025-01-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    admissionId: "ADM-1010",
    patientId: "PAT-2010",
    amount: "5000",
    paymentMethod: "Cash",
    cashCardCheque: "Cash",
    receiptNo: "RCPT-010",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-19"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    admissionId: "ADM-1011",
    patientId: "PAT-2011",
    amount: "2600",
    paymentMethod: "Card",
    cashCardCheque: "MasterCard",
    receiptNo: "RCPT-011",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-21"),
    draftedAt: null,
    updatedAt: new Date("2025-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    admissionId: "ADM-1012",
    patientId: "PAT-2012",
    amount: "3400",
    paymentMethod: "Cheque",
    cashCardCheque: "Cheque-999",
    receiptNo: "RCPT-012",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-23"),
    draftedAt: new Date("2025-01-24"),
    updatedAt: new Date("2025-01-24"),
    deletedAt: null,
    isDeleted: false,
  },
];
