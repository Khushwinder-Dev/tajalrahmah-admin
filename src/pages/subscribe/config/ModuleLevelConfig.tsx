import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  email: string;
  userName: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  email: "",
  userName: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = ["email", "userName"];

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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["email"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "email", title: "Email" },
  { key: "userName", title: "User Name" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    userName: "John Doe",
    status: "Completed",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-02",
    draftedAt: null,
    actionMessage: "Invoice finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    userName: "Jane Smith",
    status: "Pending",
    createdAt: "2025-09-03",
    updatedAt: "2025-09-03",
    draftedAt: null,
    actionMessage: "Awaiting payment",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    email: "michael.johnson@example.com",
    userName: "Michael Johnson",
    status: "Completed",
    createdAt: "2025-08-25",
    updatedAt: "2025-08-30",
    draftedAt: null,
    actionMessage: "Invoice paid",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    email: "emily.davis@example.com",
    userName: "Emily Davis",
    status: "Draft",
    createdAt: "2025-09-05",
    updatedAt: "2025-09-05",
    draftedAt: "2025-09-05",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    email: "david.wilson@example.com",
    userName: "David Wilson",
    status: "Completed",
    createdAt: "2025-08-28",
    updatedAt: "2025-08-29",
    draftedAt: null,
    actionMessage: "Payment confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    email: "sophia.martinez@example.com",
    userName: "Sophia Martinez",
    status: "Cancelled",
    createdAt: "2025-08-20",
    updatedAt: "2025-08-21",
    draftedAt: null,
    actionMessage: "Invoice cancelled",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "7",
    email: "olivia.brown@example.com",
    userName: "Olivia Brown",
    status: "Completed",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-03",
    draftedAt: null,
    actionMessage: "Invoice closed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    email: "daniel.lee@example.com",
    userName: "Daniel Lee",
    status: "Pending",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-06",
    draftedAt: null,
    actionMessage: "Waiting approval",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    email: "william.harris@example.com",
    userName: "William Harris",
    status: "Completed",
    createdAt: "2025-08-15",
    updatedAt: "2025-08-16",
    draftedAt: null,
    actionMessage: "Invoice paid",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    email: "isabella.clark@example.com",
    userName: "Isabella Clark",
    status: "Draft",
    createdAt: "2025-09-08",
    updatedAt: "2025-09-08",
    draftedAt: "2025-09-08",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    email: "james.allen@example.com",
    userName: "James Allen",
    status: "Completed",
    createdAt: "2025-08-10",
    updatedAt: "2025-08-11",
    draftedAt: null,
    actionMessage: "Invoice settled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    email: "mia.scott@example.com",
    userName: "Mia Scott",
    status: "Pending",
    createdAt: "2025-09-10",
    updatedAt: "2025-09-10",
    draftedAt: null,
    actionMessage: "Awaiting confirmation",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];


/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  userName: "User Name",
  email: "Email Address",
};

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

export const GridViewDataList: GridDataType[] = [
  {
    id: "1",
    userName: "John Doe",
    email: "john.doe@example.com",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-01"),
    draftedAt: null,
    updatedAt: new Date("2025-09-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    userName: "Jane Smith",
    email: "jane.smith@example.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-02"),
    draftedAt: null,
    updatedAt: new Date("2025-09-03"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    userName: "Michael Brown",
    email: "michael.brown@example.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-03"),
    draftedAt: null,
    updatedAt: new Date("2025-09-04"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    userName: "Emily Davis",
    email: "emily.davis@example.com",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-09-04"),
    draftedAt: new Date("2025-09-04"),
    updatedAt: new Date("2025-09-05"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    userName: "Chris Wilson",
    email: "chris.wilson@example.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-05"),
    draftedAt: null,
    updatedAt: new Date("2025-09-06"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    userName: "Sophia Lee",
    email: "sophia.lee@example.com",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-09-06"),
    draftedAt: null,
    updatedAt: new Date("2025-09-07"),
    deletedAt: new Date("2025-09-10"),
    isDeleted: true,
  },
  {
    id: "7",
    userName: "William Taylor",
    email: "william.taylor@example.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-07"),
    draftedAt: null,
    updatedAt: new Date("2025-09-08"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    userName: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-08"),
    draftedAt: null,
    updatedAt: new Date("2025-09-09"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    userName: "James Anderson",
    email: "james.anderson@example.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-09"),
    draftedAt: null,
    updatedAt: new Date("2025-09-10"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    userName: "Ava Thomas",
    email: "ava.thomas@example.com",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-09-10"),
    draftedAt: new Date("2025-09-10"),
    updatedAt: new Date("2025-09-11"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    userName: "Daniel White",
    email: "daniel.white@example.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-11"),
    draftedAt: null,
    updatedAt: new Date("2025-09-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    userName: "Grace Hall",
    email: "grace.hall@example.com",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-12"),
    draftedAt: null,
    updatedAt: new Date("2025-09-13"),
    deletedAt: null,
    isDeleted: false,
  },
];

