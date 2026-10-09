import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  slNo: string;
  packageName: string;
  description: string;
  packageIncluding: string;
  service: string;
  quantity: string;
  rate: string;
  discount: string;
  status: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  slNo: "",
  packageName: "",
  description: "",
  packageIncluding: "",
  service: "",
  quantity: "",
  rate: "",
  discount: "",
  status: "Active",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "packageName",
  "description",
  "packageIncluding",
  "service",
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
  { key: "packageName", title: "Package Name" },
  { key: "description", title: "Description" },
  { key: "packageIncluding", title: "Package Including" },
  { key: "service", title: "Service" },
  { key: "quantity", title: "Quantity" },
  { key: "rate", title: "Rate" },
  { key: "discount", title: "Discount" },
  { key: "status", title: "Status" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    slNo: "1",
    packageName: "Basic Package",
    description: "Essential services package",
    packageIncluding: "Food, Drinks, Service",
    service: "Table Service",
    quantity: "1",
    rate: "500.00",
    discount: "10%",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Package created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    slNo: "2",
    packageName: "Premium Package",
    description: "Premium services with extra features",
    packageIncluding: "Food, Drinks, Service, Entertainment",
    service: "Full Service",
    quantity: "1",
    rate: "800.00",
    discount: "15%",
    status: "Active",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Package created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    slNo: "3",
    packageName: "Deluxe Package",
    description: "Luxury package with all amenities",
    packageIncluding: "Food, Drinks, Service, Entertainment, VIP",
    service: "VIP Service",
    quantity: "1",
    rate: "1200.00",
    discount: "20%",
    status: "Active",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Package created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    slNo: "4",
    packageName: "Family Package",
    description: "Family-friendly package deal",
    packageIncluding: "Food, Drinks, Kids Menu",
    service: "Family Service",
    quantity: "4",
    rate: "1500.00",
    discount: "25%",
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
    packageName: "Corporate Package",
    description: "Business meeting package",
    packageIncluding: "Food, Drinks, Meeting Room",
    service: "Corporate Service",
    quantity: "10",
    rate: "2000.00",
    discount: "30%",
    status: "Active",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Package created",
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
  packageName: "Sample Package",
  description: "Sample package description",
  packageIncluding: "Food, Drinks, Service",
  service: "Table Service",
  quantity: "1",
  rate: "500.00",
  discount: "10%",
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
    nextFocus: "packageName",
    tooltip: "Enter serial number",
    required: true,
  },
  {
    name: "packageName",
    label: "Package Name",
    component: "input",
    nextFocus: "description",
    tooltip: "Enter package name",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    nextFocus: "packageIncluding",
    tooltip: "Enter package description",
    required: true,
  },
  {
    name: "packageIncluding",
    label: "Package Including",
    component: "input",
    nextFocus: "service",
    tooltip: "Enter what's included in package",
    required: true,
  },
  {
    name: "service",
    label: "Service",
    component: "input",
    nextFocus: "quantity",
    tooltip: "Enter service type",
    required: true,
  },
  {
    name: "quantity",
    label: "Quantity",
    component: "input",
    nextFocus: "rate",
    tooltip: "Enter quantity",
    required: true,
  },
  {
    name: "rate",
    label: "Rate",
    component: "input",
    nextFocus: "discount",
    tooltip: "Enter rate amount",
    required: true,
  },
  {
    name: "discount",
    label: "Discount",
    component: "input",
    nextFocus: "status",
    tooltip: "Enter discount percentage",
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
  packageName: "Package Name",
  description: "Description",
  packageIncluding: "Package Including",
  service: "Service",
  quantity: "Quantity",
  rate: "Rate",
  discount: "Discount",
  status: "Status",
};
