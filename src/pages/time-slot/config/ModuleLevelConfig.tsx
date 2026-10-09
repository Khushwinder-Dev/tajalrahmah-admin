import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  slNo: string;
  slotName: string;
  slot: string;
  status: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  slNo: "",
  slotName: "",
  slot: "",
  status: "Active",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "slotName",
  "slot",
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
  { key: "slotName", title: "Slot Name" },
  { key: "slot", title: "Slot" },
  { key: "status", title: "Status" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    slNo: "1",
    slotName: "Morning Slot",
    slot: "09:00 - 12:00",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Time slot created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    slNo: "2",
    slotName: "Afternoon Slot",
    slot: "12:00 - 15:00",
    status: "Active",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Time slot created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    slNo: "3",
    slotName: "Evening Slot",
    slot: "15:00 - 18:00",
    status: "Active",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Time slot created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    slNo: "4",
    slotName: "Night Slot",
    slot: "18:00 - 21:00",
    status: "Draft",
    createdAt: "2025-01-04",
    updatedAt: "2025-01-31",
    draftedAt: "2025-01-30",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    slNo: "5",
    slotName: "Late Night Slot",
    slot: "21:00 - 24:00",
    status: "Active",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Time slot created",
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
  slotName: "Morning Slot",
  slot: "09:00 - 12:00",
  status: "Active",

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
    nextFocus: "slotName",
    tooltip: "Enter serial number",
    required: true,
  },
  {
    name: "slotName",
    label: "Slot Name",
    component: "input",
    nextFocus: "slot",
    tooltip: "Enter slot name",
    required: true,
  },
  {
    name: "slot",
    label: "Slot",
    component: "input",
    nextFocus: "status",
    tooltip: "Enter time slot (e.g., 09:00 - 12:00)",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    component: "autocomplete",
    options: ["Active", "Inactive", "Draft", "Completed", "Cancelled"],
    tooltip: "Select status",
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
  slotName: "Slot Name",
  slot: "Slot",
  status: "Status",
};
