import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  bonusType: string;
  description: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  bonusType: "",
  description: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "bonusType",
  "description",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["bonusType"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "bonusType", title: "Bonus Type" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    bonusType: "Referral",
    description: "Bonus for referring a new customer",
    status: "Active",
    createdAt: "2025-01-10T10:15:00Z",
    updatedAt: "2025-01-15T09:00:00Z",
    draftedAt: null,
    actionMessage: "Referral program live",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    bonusType: "Signup",
    description: "Signup bonus for new users",
    status: "Draft",
    createdAt: "2025-02-01T12:30:00Z",
    updatedAt: "2025-02-02T10:00:00Z",
    draftedAt: "2025-02-01T12:30:00Z",
    actionMessage: "Awaiting approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    bonusType: "Loyalty",
    description: "Bonus for long-term users",
    status: "Inactive",
    createdAt: "2024-12-20T14:00:00Z",
    updatedAt: "2025-01-05T10:00:00Z",
    draftedAt: null,
    actionMessage: "Temporarily disabled",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    bonusType: "Holiday",
    description: "Special holiday bonus",
    status: "Deleted",
    createdAt: "2024-11-15T09:00:00Z",
    updatedAt: "2024-11-20T09:30:00Z",
    draftedAt: null,
    actionMessage: "Removed from campaign",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    bonusType: "Cashback",
    description: "Cashback on first purchase",
    status: "Active",
    createdAt: "2025-01-25T08:00:00Z",
    updatedAt: "2025-01-30T11:00:00Z",
    draftedAt: null,
    actionMessage: "Ongoing cashback offer",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    bonusType: "Milestone",
    description: "Reward for completing milestones",
    status: "Updated",
    createdAt: "2025-02-05T13:00:00Z",
    updatedAt: "2025-02-07T09:45:00Z",
    draftedAt: null,
    actionMessage: "Details updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    bonusType: "Birthday",
    description: "Special birthday bonus",
    status: "Active",
    createdAt: "2024-12-10T15:20:00Z",
    updatedAt: "2025-01-01T09:15:00Z",
    draftedAt: null,
    actionMessage: "Sent on birthday",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    bonusType: "Welcome Back",
    description: "Bonus for returning users",
    status: "Inactive",
    createdAt: "2024-10-05T11:30:00Z",
    updatedAt: "2024-11-01T10:00:00Z",
    draftedAt: null,
    actionMessage: "Disabled campaign",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    bonusType: "Seasonal",
    description: "Winter seasonal bonus",
    status: "Draft",
    createdAt: "2025-02-15T10:00:00Z",
    updatedAt: "2025-02-16T09:00:00Z",
    draftedAt: "2025-02-15T10:00:00Z",
    actionMessage: "Under review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    bonusType: "Anniversary",
    description: "Anniversary celebration bonus",
    status: "Active",
    createdAt: "2024-09-20T09:00:00Z",
    updatedAt: "2024-09-25T12:00:00Z",
    draftedAt: null,
    actionMessage: "Active for loyal users",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    bonusType: "Feedback",
    description: "Bonus for giving feedback",
    status: "Inactive",
    createdAt: "2025-01-12T08:00:00Z",
    updatedAt: "2025-01-18T10:00:00Z",
    draftedAt: null,
    actionMessage: "Temporarily closed",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    bonusType: "Survey",
    description: "Bonus for completing surveys",
    status: "Deleted",
    createdAt: "2024-08-01T07:00:00Z",
    updatedAt: "2024-08-05T09:00:00Z",
    draftedAt: null,
    actionMessage: "Removed campaign",
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
  bonusType: "Bonus Type 1",
  description: "Description One",

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
    name: "bonusType",
    label: "Bonus Type",
    component: "input",
    nextFocus: "description",
    tooltip: "Enter bonus type",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    nextFocus: "isDefault",
    tooltip: "Enter description",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  bonusType: "Bonus Type",
  description: "Description",
};
