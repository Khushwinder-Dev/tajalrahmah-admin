import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  code: string;
  barCode: string;
  itemName: string;
  quantity: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  code: "",
  barCode: "",
  itemName: "",
  quantity: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "code",
  "barCode",
  "itemName",
  "quantity",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = [
  "code",
  "itemName",
  "quantity",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "code", title: "Code" },
  { key: "barCode", title: "Bar Code" },
  { key: "itemName", title: "Item Name" },
  { key: "quantity", title: "Quantity" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    code: "ITEM001",
    barCode: "1234567890123",
    itemName: "Premium Coffee Beans",
    quantity: "50",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "Item created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    code: "ITEM002",
    barCode: "1234567890124",
    itemName: "Organic Green Tea",
    quantity: "25",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "Item created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    code: "ITEM003",
    barCode: "1234567890125",
    itemName: "Chocolate Cookies",
    quantity: "100",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "Item created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    code: "ITEM004",
    barCode: "1234567890126",
    itemName: "Fresh Milk",
    quantity: "30",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "Item created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    code: "ITEM005",
    barCode: "1234567890127",
    itemName: "Whole Wheat Bread",
    quantity: "40",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "Item created successfully",
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
  code: "ITEM001",
  barCode: "1234567890123",
  itemName: "Premium Coffee Beans",
  quantity: "50",

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
    name: "code",
    label: "Code",
    component: "input",
    nextFocus: "barCode",
    tooltip: "Enter item code",
    required: true,
  },
  {
    name: "barCode",
    label: "Bar Code",
    component: "input",
    nextFocus: "itemName",
    tooltip: "Enter barcode number",
    required: true,
  },
  {
    name: "itemName",
    label: "Item Name",
    component: "input",
    nextFocus: "quantity",
    tooltip: "Enter item name",
    required: true,
  },
  {
    name: "quantity",
    label: "Quantity",
    component: "input",
    type: "number",
    tooltip: "Enter quantity",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  code: "Code",
  barCode: "Bar Code",
  itemName: "Item Name",
  quantity: "Quantity",
};
