import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  serviceName: string;
  serviceCategory: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  serviceName: "",
  serviceCategory: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "serviceName",
  "serviceCategory",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["serviceName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "serviceName", title: "Service Name" },
  { key: "serviceCategory", title: "Service Category" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    serviceName: "Food Service",
    serviceCategory: "Dining",
    status: "Active",
    createdAt: "2025-08-20",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Service active",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    serviceName: "Beverage Service",
    serviceCategory: "Drinks",
    status: "Active",
    createdAt: "2025-08-21",
    updatedAt: "2025-08-24",
    draftedAt: null,
    actionMessage: "Service running",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    serviceName: "Catering Service",
    serviceCategory: "Events",
    status: "Active",
    createdAt: "2025-08-19",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Service available",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    serviceName: "Takeaway Service",
    serviceCategory: "Delivery",
    status: "Draft",
    createdAt: "2025-08-18",
    updatedAt: "2025-08-25",
    draftedAt: "2025-08-20",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    serviceName: "Delivery Service",
    serviceCategory: "Delivery",
    status: "Active",
    createdAt: "2025-08-17",
    updatedAt: "2025-08-24",
    draftedAt: null,
    actionMessage: "Service operational",
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
  serviceName: "Food Service",
  serviceCategory: "Dining",

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
    name: "serviceName",
    label: "Service Name",
    component: "input",
    nextFocus: "serviceCategory",
    tooltip: "Enter service name",
    required: true,
  },
  {
    name: "serviceCategory",
    label: "Service Category",
    component: "input",
    tooltip: "Enter service category",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  serviceName: "Service Name",
  serviceCategory: "Service Category",
};
