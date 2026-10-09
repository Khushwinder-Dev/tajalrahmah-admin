import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  date: string;
  type: string;
  loanAmount: string;
  receivedDate: string;
  refundDate: string;
  numberOfDays: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  date: "",
  type: "",
  loanAmount: "",
  receivedDate: "",
  refundDate: "",
  numberOfDays: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "date",
  "type",
  "loanAmount",
  "receivedDate",
  "refundDate",
  "numberOfDays",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["date"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "date", title: "Date" },
  { key: "type", title: "Type" },
  { key: "loanAmount", title: "Loan Amount" },
  { key: "receivedDate", title: "Received Date" },
  { key: "refundDate", title: "Refund Date" },
  { key: "numberOfDays", title: "Number of Days" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    date: "2025-09-01",
    type: "Personal Loan",
    loanAmount: "5000",
    receivedDate: "2025-09-01",
    refundDate: "2025-09-10",
    numberOfDays: "10",
    status: "Completed",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "Loan repaid on time",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    date: "2025-09-02",
    type: "Business Loan",
    loanAmount: "15000",
    receivedDate: "2025-09-02",
    refundDate: "2025-09-12",
    numberOfDays: "10",
    status: "Pending",
    createdAt: "2025-09-02T11:00:00Z",
    updatedAt: "2025-09-02T11:30:00Z",
    draftedAt: null,
    actionMessage: "Awaiting payment",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    date: "2025-09-03",
    type: "Personal Loan",
    loanAmount: "8000",
    receivedDate: "2025-09-03",
    refundDate: "2025-09-13",
    numberOfDays: "10",
    status: "Completed",
    createdAt: "2025-09-03T09:30:00Z",
    updatedAt: "2025-09-04T10:00:00Z",
    draftedAt: null,
    actionMessage: "Repaid with delay",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    date: "2025-09-04",
    type: "Education Loan",
    loanAmount: "12000",
    receivedDate: "2025-09-04",
    refundDate: "2025-09-14",
    numberOfDays: "10",
    status: "Pending",
    createdAt: "2025-09-04T14:00:00Z",
    updatedAt: "2025-09-04T14:30:00Z",
    draftedAt: null,
    actionMessage: "Payment scheduled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    date: "2025-09-05",
    type: "Business Loan",
    loanAmount: "20000",
    receivedDate: "2025-09-05",
    refundDate: "2025-09-15",
    numberOfDays: "10",
    status: "Completed",
    createdAt: "2025-09-05T08:00:00Z",
    updatedAt: "2025-09-06T09:00:00Z",
    draftedAt: null,
    actionMessage: "Paid in full",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    date: "2025-09-06",
    type: "Personal Loan",
    loanAmount: "6000",
    receivedDate: "2025-09-06",
    refundDate: "2025-09-16",
    numberOfDays: "10",
    status: "Pending",
    createdAt: "2025-09-06T10:00:00Z",
    updatedAt: "2025-09-06T11:00:00Z",
    draftedAt: null,
    actionMessage: "Awaiting refund",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    date: "2025-09-07",
    type: "Education Loan",
    loanAmount: "10000",
    receivedDate: "2025-09-07",
    refundDate: "2025-09-17",
    numberOfDays: "10",
    status: "Completed",
    createdAt: "2025-09-07T09:00:00Z",
    updatedAt: "2025-09-08T10:00:00Z",
    draftedAt: null,
    actionMessage: "Repaid successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    date: "2025-09-08",
    type: "Business Loan",
    loanAmount: "18000",
    receivedDate: "2025-09-08",
    refundDate: "2025-09-18",
    numberOfDays: "10",
    status: "Pending",
    createdAt: "2025-09-08T12:00:00Z",
    updatedAt: "2025-09-08T12:30:00Z",
    draftedAt: null,
    actionMessage: "Partial payment done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    date: "2025-09-09",
    type: "Personal Loan",
    loanAmount: "7000",
    receivedDate: "2025-09-09",
    refundDate: "2025-09-19",
    numberOfDays: "10",
    status: "Completed",
    createdAt: "2025-09-09T11:00:00Z",
    updatedAt: "2025-09-10T12:00:00Z",
    draftedAt: null,
    actionMessage: "Paid with interest",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    date: "2025-09-10",
    type: "Education Loan",
    loanAmount: "9000",
    receivedDate: "2025-09-10",
    refundDate: "2025-09-20",
    numberOfDays: "10",
    status: "Pending",
    createdAt: "2025-09-10T10:30:00Z",
    updatedAt: "2025-09-10T11:00:00Z",
    draftedAt: null,
    actionMessage: "Refund pending",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    date: "2025-09-11",
    type: "Business Loan",
    loanAmount: "22000",
    receivedDate: "2025-09-11",
    refundDate: "2025-09-21",
    numberOfDays: "10",
    status: "Completed",
    createdAt: "2025-09-11T09:00:00Z",
    updatedAt: "2025-09-12T10:00:00Z",
    draftedAt: null,
    actionMessage: "Paid in full",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    date: "2025-09-12",
    type: "Personal Loan",
    loanAmount: "6500",
    receivedDate: "2025-09-12",
    refundDate: "2025-09-22",
    numberOfDays: "10",
    status: "Pending",
    createdAt: "2025-09-12T08:30:00Z",
    updatedAt: "2025-09-12T09:00:00Z",
    draftedAt: null,
    actionMessage: "Awaiting refund",
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
  date: "2025-09-12",
  type: "Personal Loan",
  loanAmount: "6500",
  receivedDate: "2025-09-12",
  refundDate: "2025-09-22",
  numberOfDays: "10",

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
    name: "date",
    label: "Date",
    type: "date",
    nextFocus: "type",
    component: "input",
    tooltip: "Enter date",
    required: true,
  },
  {
    name: "type",
    label: "Type",
    nextFocus: "loanAmount",
    component: "autocomplete",
    options: ["Personal Loan", "Business Loan", "Education Loan"],
    tooltip: "Enter type",
    placeholder: " ",
    required: true,
  },
  {
    name: "loanAmount",
    label: "Loan Amount",
    nextFocus: "receivedDate",
    component: "input",
    type: "number",
    tooltip: "Enter loan amount",
    required: true,
  },
  {
    name: "receivedDate",
    label: "Received Date",
    nextFocus: "refundDate",
    component: "input",
    type: "date",
    tooltip: "Enter received date",
    required: true,
  },
  {
    name: "refundDate",
    label: "Refund Date",
    nextFocus: "numberOfDays",
    component: "input",
    type: "date",
    tooltip: "Enter refund date",
    required: true,
  },
  {
    name: "numberOfDays",
    label: "Number of Days",
    nextFocus: "isDefault",
    component: "input",
    type: "number",
    tooltip: "Enter number of days",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  date: "Date",
  type: "Type",
  loanAmount: "Loan Amount",
  receivedDate: "Received Date",
  refundDate: "Refund Date",
  numberOfDays: "Number of Days",
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
    date: "2025-09-01",
    type: "Personal Loan",
    loanAmount: "5000",
    receivedDate: "2025-09-01",
    refundDate: "2025-09-10",
    numberOfDays: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-01T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-02T10:00:00Z"),
    deletedAt: null,
  },
  {
    id: "2",
    date: "2025-09-02",
    type: "Business Loan",
    loanAmount: "15000",
    receivedDate: "2025-09-02",
    refundDate: "2025-09-12",
    numberOfDays: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-05T08:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-06T09:00:00Z"),
    deletedAt: null,
  },
  {
    id: "3",
    date: "2025-09-10",
    type: "Education Loan",
    loanAmount: "10000",
    receivedDate: "2025-09-10",
    refundDate: "2025-09-25",
    numberOfDays: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-10T10:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-12T12:00:00Z"),
    deletedAt: null,
  },
  {
    id: "4",
    date: "2025-09-12",
    type: "Personal Loan",
    loanAmount: "6000",
    receivedDate: "2025-09-12",
    refundDate: "2025-09-22",
    numberOfDays: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-12T11:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-13T14:00:00Z"),
    deletedAt: null,
  },
  {
    id: "5",
    date: "2025-09-15",
    type: "Business Loan",
    loanAmount: "18000",
    receivedDate: "2025-09-15",
    refundDate: "2025-09-22",
    numberOfDays: "10",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-15T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-16T10:00:00Z"),
    deletedAt: null,
  },
  {
    id: "6",
    date: "2025-09-18",
    type: "Education Loan",
    loanAmount: "12000",
    receivedDate: "2025-09-18",
    refundDate: "2025-09-25",
    numberOfDays: "10",
    isDefault: false,
    isActive: true,
    isDraft: true,
    isDeleted: false,
    createdAt: new Date("2025-09-18T08:00:00Z"),
    draftedAt: new Date("2025-09-18T09:00:00Z"),
    updatedAt: new Date("2025-09-18T09:30:00Z"),
    deletedAt: null,
  },
  {
    id: "7",
    date: "2025-09-20",
    type: "Personal Loan",
    loanAmount: "7000",
    receivedDate: "2025-09-20",
    refundDate: "2025-09-28",
    numberOfDays: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-20T10:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-21T12:00:00Z"),
    deletedAt: null,
  },
  {
    id: "8",
    date: "2025-09-22",
    type: "Business Loan",
    loanAmount: "15000",
    receivedDate: "2025-09-22",
    refundDate: "2025-09-30",
    numberOfDays: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-22T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-23T11:00:00Z"),
    deletedAt: null,
  },
  {
    id: "9",
    date: "2025-09-25",
    type: "Education Loan",
    loanAmount: "10000",
    receivedDate: "2025-09-25",
    refundDate: "2025-10-05",
    numberOfDays: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-25T08:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-26T10:00:00Z"),
    deletedAt: null,
  },
  {
    id: "10",
    date: "2025-09-28",
    type: "Business Loan",
    loanAmount: "18000",
    receivedDate: "2025-09-28",
    refundDate: "2025-10-05",
    numberOfDays: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-28T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-29T11:00:00Z"),
    deletedAt: null,
  },
  {
    id: "11",
    date: "2025-10-01",
    type: "Personal Loan",
    loanAmount: "7000",
    receivedDate: "2025-10-01",
    refundDate: "2025-10-08",
    numberOfDays: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-10-01T08:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-10-02T09:30:00Z"),
    deletedAt: null,
  },
  {
    id: "12",
    date: "2025-10-03",
    type: "Education Loan",
    loanAmount: "12000",
    receivedDate: "2025-10-03",
    refundDate: "2025-10-10",
    numberOfDays: "10",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-10-03T10:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-10-04T11:00:00Z"),
    deletedAt: null,
  },
];
