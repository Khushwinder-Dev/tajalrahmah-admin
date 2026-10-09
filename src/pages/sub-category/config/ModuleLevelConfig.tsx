import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  slNo: string;
  name: string;
  groups: string;
  categories: string;
  description: string;
  status: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  slNo: "",
  name: "",
  groups: "",
  categories: "",
  description: "",
  status: "Active",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "name",
  "groups",
  "categories",
  "description",
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
  { key: "slNo", title: "SL.NO", size: 100, minSize: 100 },
  { key: "name", title: "Name" },
  { key: "groups", title: "Groups" },
  { key: "categories", title: "Categories" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    slNo: "1",
    name: "Electronics",
    groups: "Technology",
    categories: "Gadgets",
    description: "Electronic devices and accessories",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Sub-category created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    slNo: "2",
    name: "Clothing",
    groups: "Fashion",
    categories: "Apparel",
    description: "Men's and women's clothing items",
    status: "Active",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Sub-category created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    slNo: "3",
    name: "Books",
    groups: "Education",
    categories: "Literature",
    description: "Educational and fiction books",
    status: "Active",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Sub-category created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    slNo: "4",
    name: "Home Decor",
    groups: "Interior",
    categories: "Furniture",
    description: "Home decoration and furniture items",
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
    name: "Sports",
    groups: "Fitness",
    categories: "Equipment",
    description: "Sports and fitness equipment",
    status: "Active",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Sub-category created",
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
  disabled?: boolean;
  showTemplate?: boolean;
};

export const initialDataWithValue: ModuleCreateEditPageTypes = {
  slNo: "1",
  name: "Electronics",
  groups: "Technology",
  categories: "Gadgets",
  description: "Electronic devices and accessories",
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
    nextFocus: "name",
    tooltip: "Enter serial number",
    required: true,
  },
  {
    name: "name",
    label: "Name",
    component: "input",
    nextFocus: "groups",
    tooltip: "Enter sub-category name",
    required: true,
    showTemplate: true,
  },
  {
    name: "groups",
    label: "Groups",
    component: "input",
    nextFocus: "categories",
    tooltip: "Enter group name",
    required: true,
  },
  {
    name: "categories",
    label: "Categories",
    component: "autocomplete",
    nextFocus: "description",
    tooltip: "Enter category name",
    required: true,
    options: ["Gadgets", "Clothing", "Books", "Home Decor", "Sports"],
    showTemplate: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    nextFocus: "status",
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
  slNo: "SL.NO",
  name: "Name",
  groups: "Groups",
  categories: "Categories",
  description: "Description",
  status: "Status",
};
