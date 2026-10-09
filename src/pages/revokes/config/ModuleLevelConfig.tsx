import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  employee: string;
  revokeDate: string;
  branch: string;
  reason: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  employee: "",
  revokeDate: "",
  branch: "",
  reason: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "employee",
  "revokeDate",
  "branch",
  "reason",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["employee"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "employee", title: "Employee" },
  { key: "revokeDate", title: "Revoke Date" },
  { key: "branch", title: "Branch" },
  { key: "reason", title: "Reason" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    employee: "Sabbir Shuvo",
    revokeDate: "2025-09-01",
    branch: "Dhaka",
    reason: "Violation of policy",
    status: "Active",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "Reviewed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    employee: "Rana Ahmed",
    revokeDate: "2025-09-03",
    branch: "Chittagong",
    reason: "Late submission",
    status: "Draft",
    createdAt: "2025-09-03T09:30:00Z",
    updatedAt: "2025-09-03T09:30:00Z",
    draftedAt: "2025-09-03T09:45:00Z",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    employee: "Mita Rahman",
    revokeDate: "2025-08-20",
    branch: "Sylhet",
    reason: "Unauthorized leave",
    status: "Deleted",
    createdAt: "2025-08-20T14:00:00Z",
    updatedAt: "2025-08-25T11:00:00Z",
    draftedAt: null,
    actionMessage: "Removed from system",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: true,
  },
  {
    id: "4",
    employee: "Tariq Islam",
    revokeDate: "2025-09-10",
    branch: "Rajshahi",
    reason: "Incomplete task",
    status: "Updated",
    createdAt: "2025-09-05T08:15:00Z",
    updatedAt: "2025-09-10T10:30:00Z",
    draftedAt: null,
    actionMessage: "Task updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    employee: "Nazia Akter",
    revokeDate: "2025-09-12",
    branch: "Khulna",
    reason: "Attendance issue",
    status: "Active",
    createdAt: "2025-09-06T10:00:00Z",
    updatedAt: "2025-09-12T12:00:00Z",
    draftedAt: null,
    actionMessage: "Reviewed and approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    employee: "Jahid Hasan",
    revokeDate: "2025-09-08",
    branch: "Barisal",
    reason: "Policy violation",
    status: "Draft",
    createdAt: "2025-09-01T09:00:00Z",
    updatedAt: "2025-09-04T11:00:00Z",
    draftedAt: "2025-09-04T11:15:00Z",
    actionMessage: "Awaiting manager review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    employee: "Rina Sultana",
    revokeDate: "2025-09-15",
    branch: "Dhaka",
    reason: "Late report",
    status: "Updated",
    createdAt: "2025-09-10T08:30:00Z",
    updatedAt: "2025-09-15T10:45:00Z",
    draftedAt: null,
    actionMessage: "Report updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    employee: "Kamal Hossain",
    revokeDate: "2025-08-30",
    branch: "Chittagong",
    reason: "Missed deadline",
    status: "Deleted",
    createdAt: "2025-08-25T14:00:00Z",
    updatedAt: "2025-08-30T16:00:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: true,
  },
  {
    id: "9",
    employee: "Farzana Begum",
    revokeDate: "2025-09-11",
    branch: "Sylhet",
    reason: "Incomplete form",
    status: "Active",
    createdAt: "2025-09-07T09:20:00Z",
    updatedAt: "2025-09-11T11:00:00Z",
    draftedAt: null,
    actionMessage: "Form completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    employee: "Asif Mahmud",
    revokeDate: "2025-09-13",
    branch: "Rajshahi",
    reason: "Unauthorized access",
    status: "Updated",
    createdAt: "2025-09-08T10:15:00Z",
    updatedAt: "2025-09-13T12:30:00Z",
    draftedAt: null,
    actionMessage: "Access updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    employee: "Lamia Khan",
    revokeDate: "2025-09-09",
    branch: "Khulna",
    reason: "Late submission",
    status: "Draft",
    createdAt: "2025-09-05T08:45:00Z",
    updatedAt: "2025-09-07T09:00:00Z",
    draftedAt: "2025-09-07T09:15:00Z",
    actionMessage: "Waiting for approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    employee: "Sohail Ahmed",
    revokeDate: "2025-09-14",
    branch: "Barisal",
    reason: "Policy update",
    status: "Active",
    createdAt: "2025-09-10T10:00:00Z",
    updatedAt: "2025-09-14T11:30:00Z",
    draftedAt: null,
    actionMessage: "Policy applied",
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
  employee: "Employee",
  revokeDate: "Revoke Date",
  branch: "Branch",
  reason: "Reason",
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
    employee: "Sabbir Shuvo",
    revokeDate: "2025-09-01",
    branch: "Dhaka",
    reason: "Policy violation",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-01T10:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-02T12:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    employee: "Rana Ahmed",
    revokeDate: "2025-09-03",
    branch: "Chittagong",
    reason: "Late submission",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-09-03T09:30:00Z"),
    draftedAt: new Date("2025-09-03T09:45:00Z"),
    updatedAt: new Date("2025-09-03T09:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    employee: "Mita Rahman",
    revokeDate: "2025-08-20",
    branch: "Sylhet",
    reason: "Unauthorized leave",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-08-20T14:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-25T11:00:00Z"),
    deletedAt: new Date("2025-08-25T12:00:00Z"),
    isDeleted: true,
  },
  {
    id: "4",
    employee: "Tariq Islam",
    revokeDate: "2025-09-10",
    branch: "Rajshahi",
    reason: "Incomplete task",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-05T08:15:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-10T10:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    employee: "Nazia Akter",
    revokeDate: "2025-09-12",
    branch: "Khulna",
    reason: "Attendance issue",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-06T10:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-12T12:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    employee: "Jahid Hasan",
    revokeDate: "2025-09-08",
    branch: "Barisal",
    reason: "Policy violation",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-09-01T09:00:00Z"),
    draftedAt: new Date("2025-09-04T11:15:00Z"),
    updatedAt: new Date("2025-09-04T11:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    employee: "Rina Sultana",
    revokeDate: "2025-09-15",
    branch: "Dhaka",
    reason: "Late report",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-10T08:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-15T10:45:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    employee: "Kamal Hossain",
    revokeDate: "2025-08-30",
    branch: "Chittagong",
    reason: "Missed deadline",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-08-25T14:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-30T16:00:00Z"),
    deletedAt: new Date("2025-08-30T16:30:00Z"),
    isDeleted: true,
  },
  {
    id: "9",
    employee: "Farzana Begum",
    revokeDate: "2025-09-11",
    branch: "Sylhet",
    reason: "Incomplete form",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-07T09:20:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-11T11:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    employee: "Asif Mahmud",
    revokeDate: "2025-09-13",
    branch: "Rajshahi",
    reason: "Unauthorized access",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-08T10:15:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-13T12:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    employee: "Lamia Khan",
    revokeDate: "2025-09-09",
    branch: "Khulna",
    reason: "Late submission",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-09-05T08:45:00Z"),
    draftedAt: new Date("2025-09-07T09:15:00Z"),
    updatedAt: new Date("2025-09-07T09:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    employee: "Sohail Ahmed",
    revokeDate: "2025-09-14",
    branch: "Barisal",
    reason: "Policy update",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-10T10:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-14T11:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
];
