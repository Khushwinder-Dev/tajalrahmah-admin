import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  categoryName: string;
  description: string;
  categoryStatus: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  categoryName: "",
  description: "",
  categoryStatus: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = ["categoryName"];

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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["categoryName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "categoryName", title: "Category Name" },
  { key: "description", title: "Description" },
  { key: "categoryStatus", title: "Category Status" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    categoryName: "Cardiology",
    description: "Heart-related medical services and treatments.",
    categoryStatus: "Published",
    status: "Active",
    createdAt: "2025-01-05T10:30:00Z",
    updatedAt: "2025-01-07T12:00:00Z",
    draftedAt: null,
    actionMessage: "Category activated successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    categoryName: "Dermatology",
    description: "Skin and cosmetic treatments.",
    categoryStatus: "Published",
    status: "Active",
    createdAt: "2025-01-10T09:00:00Z",
    updatedAt: "2025-01-12T14:15:00Z",
    draftedAt: null,
    actionMessage: "Category updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    categoryName: "Neurology",
    description: "Brain and nervous system care.",
    categoryStatus: "Draft",
    status: "Draft",
    createdAt: "2025-01-15T11:00:00Z",
    updatedAt: "2025-01-15T11:00:00Z",
    draftedAt: "2025-01-15T11:00:00Z",
    actionMessage: "Saved as draft",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    categoryName: "Orthopedic",
    description: "Bone, joint, and muscle treatments.",
    categoryStatus: "Deleted",
    status: "Inactive",
    createdAt: "2025-01-20T15:30:00Z",
    updatedAt: "2025-01-22T16:45:00Z",
    draftedAt: null,
    actionMessage: "Category deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    categoryName: "Pediatrics",
    description: "Child healthcare and medical support.",
    categoryStatus: "Published",
    status: "Active",
    createdAt: "2025-02-05T08:20:00Z",
    updatedAt: "2025-02-06T09:10:00Z",
    draftedAt: null,
    actionMessage: "Category added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    categoryName: "ENT",
    description: "Ear, nose, and throat related treatments.",
    categoryStatus: "Draft",
    status: "Draft",
    createdAt: "2025-02-10T10:45:00Z",
    updatedAt: "2025-02-10T10:45:00Z",
    draftedAt: "2025-02-10T10:45:00Z",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    categoryName: "Oncology",
    description: "Cancer diagnosis and treatments.",
    categoryStatus: "Published",
    status: "Active",
    createdAt: "2025-02-12T13:00:00Z",
    updatedAt: "2025-02-15T15:00:00Z",
    draftedAt: null,
    actionMessage: "Category updated with new info",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    categoryName: "Gynecology",
    description: "Women’s reproductive health services.",
    categoryStatus: "Published",
    status: "Active",
    createdAt: "2025-02-18T09:25:00Z",
    updatedAt: "2025-02-19T11:45:00Z",
    draftedAt: null,
    actionMessage: "Category activated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    categoryName: "Psychiatry",
    description: "Mental health and counseling services.",
    categoryStatus: "Inactive",
    status: "Inactive",
    createdAt: "2025-02-20T07:40:00Z",
    updatedAt: "2025-02-21T08:15:00Z",
    draftedAt: null,
    actionMessage: "Category marked inactive",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    categoryName: "Radiology",
    description: "Medical imaging and diagnostic services.",
    categoryStatus: "Published",
    status: "Active",
    createdAt: "2025-02-22T14:50:00Z",
    updatedAt: "2025-02-23T16:00:00Z",
    draftedAt: null,
    actionMessage: "Category added to system",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    categoryName: "Urology",
    description: "Urinary tract and kidney treatments.",
    categoryStatus: "Draft",
    status: "Draft",
    createdAt: "2025-02-25T12:00:00Z",
    updatedAt: "2025-02-25T12:00:00Z",
    draftedAt: "2025-02-25T12:00:00Z",
    actionMessage: "Work in progress",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    categoryName: "Emergency",
    description: "24/7 emergency medical services.",
    categoryStatus: "Deleted",
    status: "Inactive",
    createdAt: "2025-02-28T18:30:00Z",
    updatedAt: "2025-03-01T20:00:00Z",
    draftedAt: null,
    actionMessage: "Category removed",
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
  categoryName: "Cardiology",
  description: "Heart-related medical services and treatments.",
  categoryStatus: "Published",

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
    name: "categoryName",
    label: "Category Name",
    component: "input",
    nextFocus: "description",
    tooltip: "Enter name",
    required: true,
  },

  {
    name: "description",
    type: "text",
    label: "Description",
    component: "input",
    nextFocus: "categoryStatus",
    tooltip: "Enter description",
    required: true,
  },
  {
    name: "categoryStatus",
    label: "Category Status",
    component: "autocomplete",
    nextFocus: "isDefault",
    options: ["Published", "Draft", "Inactive", "Deleted"],
    placeholder: " ",
    tooltip: "Enter category status",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  categoryName: "Category Name",
  description: "Description",
  categoryStatus: "Category Status",
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
    categoryName: "Cardiology",
    description: "Heart-related medical services",
    categoryStatus: "Published",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-01T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-01-02T10:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    categoryName: "Dermatology",
    description: "Skin care and cosmetic treatments",
    categoryStatus: "Published",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-03T11:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-01-04T12:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    categoryName: "Neurology",
    description: "Brain and nervous system treatments",
    categoryStatus: "Draft",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-05T14:00:00Z"),
    draftedAt: new Date("2025-01-05T14:00:00Z"),
    updatedAt: new Date("2025-01-05T14:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    categoryName: "Orthopedic",
    description: "Bone and joint treatments",
    categoryStatus: "Deleted",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-06T16:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-01-07T09:00:00Z"),
    deletedAt: new Date("2025-01-07T09:00:00Z"),
    isDeleted: true,
  },
  {
    id: "5",
    categoryName: "Pediatrics",
    description: "Child healthcare services",
    categoryStatus: "Published",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-08T08:15:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-01-09T10:45:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    categoryName: "ENT",
    description: "Ear, nose, and throat treatments",
    categoryStatus: "Draft",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-10T13:20:00Z"),
    draftedAt: new Date("2025-01-10T13:20:00Z"),
    updatedAt: new Date("2025-01-10T13:20:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    categoryName: "Oncology",
    description: "Cancer diagnosis and treatment",
    categoryStatus: "Published",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-12T09:45:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-01-13T11:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    categoryName: "Gynecology",
    description: "Women’s health and maternity care",
    categoryStatus: "Published",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-14T15:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-01-15T16:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    categoryName: "Psychiatry",
    description: "Mental health and counseling",
    categoryStatus: "Inactive",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-16T10:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-01-17T12:45:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    categoryName: "Radiology",
    description: "Medical imaging and diagnostic services",
    categoryStatus: "Published",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-18T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-01-19T11:20:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    categoryName: "Urology",
    description: "Kidney and urinary tract treatments",
    categoryStatus: "Draft",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-20T14:10:00Z"),
    draftedAt: new Date("2025-01-20T14:10:00Z"),
    updatedAt: new Date("2025-01-20T14:10:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    categoryName: "Emergency",
    description: "24/7 emergency medical services",
    categoryStatus: "Deleted",
    isDefault: true,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-22T17:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-01-23T18:00:00Z"),
    deletedAt: new Date("2025-01-23T18:00:00Z"),
    isDeleted: true,
  },
];
