import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  garage: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  description: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  garage: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  description: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "garage",
  "address",
  "city",
  "state",
  "zipCode",
  "country",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["garage"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "garage", title: "Garage" },
  { key: "address", title: "Address" },
  { key: "city", title: "City" },
  { key: "state", title: "State" },
  { key: "zipCode", title: "Zip Code" },
  { key: "country", title: "Country" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    garage: "City Auto Works",
    address: "123 Main St",
    city: "Dhaka",
    state: "Dhaka",
    zipCode: "1207",
    country: "Bangladesh",
    description: "General auto repair and servicing.",
    status: "Active",
    createdAt: "2025-01-10T09:15:00Z",
    updatedAt: "2025-01-12T10:30:00Z",
    draftedAt: null,
    actionMessage: "Garage registered successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    garage: "Premium Motors",
    address: "45 Gulshan Ave",
    city: "Dhaka",
    state: "Dhaka",
    zipCode: "1212",
    country: "Bangladesh",
    description: "Luxury car servicing and detailing.",
    status: "Draft",
    createdAt: "2025-02-02T11:00:00Z",
    updatedAt: "2025-02-05T12:20:00Z",
    draftedAt: "2025-02-03T08:00:00Z",
    actionMessage: "Garage draft saved.",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    garage: "Shuvo Car Care",
    address: "22 Agrabad Rd",
    city: "Chattogram",
    state: "Chattogram",
    zipCode: "4000",
    country: "Bangladesh",
    description: "Complete car wash and detailing services.",
    status: "Active",
    createdAt: "2025-01-18T14:40:00Z",
    updatedAt: "2025-01-19T15:20:00Z",
    draftedAt: null,
    actionMessage: "Garage activated.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    garage: "AutoFix",
    address: "89 Banani Block B",
    city: "Dhaka",
    state: "Dhaka",
    zipCode: "1213",
    country: "Bangladesh",
    description: "Engine diagnostics and repair specialists.",
    status: "Inactive",
    createdAt: "2025-01-25T08:20:00Z",
    updatedAt: "2025-01-28T09:15:00Z",
    draftedAt: null,
    actionMessage: "Garage marked as inactive.",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    garage: "MotorHub",
    address: "55 Zindabazar",
    city: "Sylhet",
    state: "Sylhet",
    zipCode: "3100",
    country: "Bangladesh",
    description: "Car accessories and tire replacement.",
    status: "Deleted",
    createdAt: "2025-01-12T16:00:00Z",
    updatedAt: "2025-01-20T17:15:00Z",
    draftedAt: null,
    actionMessage: "Garage deleted.",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "6",
    garage: "Speedy Service",
    address: "34 Mirpur Rd",
    city: "Dhaka",
    state: "Dhaka",
    zipCode: "1216",
    country: "Bangladesh",
    description: "Quick oil change and basic maintenance.",
    status: "Active",
    createdAt: "2025-02-01T07:10:00Z",
    updatedAt: "2025-02-02T09:45:00Z",
    draftedAt: null,
    actionMessage: "Garage added to system.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    garage: "Elite Car Service",
    address: "12 Uttara Sector 7",
    city: "Dhaka",
    state: "Dhaka",
    zipCode: "1230",
    country: "Bangladesh",
    description: "High-end car customization and repairs.",
    status: "Draft",
    createdAt: "2025-01-15T12:00:00Z",
    updatedAt: "2025-01-16T13:15:00Z",
    draftedAt: "2025-01-15T13:00:00Z",
    actionMessage: "Draft created.",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    garage: "Reliable Auto",
    address: "77 Kaptan Bazar",
    city: "Dhaka",
    state: "Dhaka",
    zipCode: "1100",
    country: "Bangladesh",
    description: "Brake service and general car repair.",
    status: "Inactive",
    createdAt: "2025-01-09T10:30:00Z",
    updatedAt: "2025-01-11T11:10:00Z",
    draftedAt: null,
    actionMessage: "Temporarily closed.",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    garage: "Super Auto Zone",
    address: "99 Station Rd",
    city: "Rajshahi",
    state: "Rajshahi",
    zipCode: "6100",
    country: "Bangladesh",
    description: "Car batteries and electrical repair.",
    status: "Active",
    createdAt: "2025-02-05T18:00:00Z",
    updatedAt: "2025-02-06T19:20:00Z",
    draftedAt: null,
    actionMessage: "Garage activated.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    garage: "DriveWell",
    address: "44 College Rd",
    city: "Khulna",
    state: "Khulna",
    zipCode: "9000",
    country: "Bangladesh",
    description: "Suspension and wheel alignment.",
    status: "Deleted",
    createdAt: "2025-01-22T14:20:00Z",
    updatedAt: "2025-01-24T15:00:00Z",
    draftedAt: null,
    actionMessage: "Removed from directory.",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "11",
    garage: "Turbo Tech",
    address: "10 Industrial Area",
    city: "Gazipur",
    state: "Dhaka",
    zipCode: "1700",
    country: "Bangladesh",
    description: "Turbocharger and engine upgrades.",
    status: "Active",
    createdAt: "2025-01-28T08:40:00Z",
    updatedAt: "2025-01-29T10:15:00Z",
    draftedAt: null,
    actionMessage: "Garage updated successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    garage: "Budget Auto Care",
    address: "25 Natun Bazar",
    city: "Barisal",
    state: "Barisal",
    zipCode: "8200",
    country: "Bangladesh",
    description: "Affordable repair and service center.",
    status: "Inactive",
    createdAt: "2025-02-07T09:00:00Z",
    updatedAt: "2025-02-08T10:30:00Z",
    draftedAt: null,
    actionMessage: "Garage paused.",
    isActive: false,
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
  garage: "City Auto Works",
  address: "123 Main St",
  city: "Dhaka",
  state: "Dhaka",
  zipCode: "1207",
  country: "Bangladesh",
  description: "General auto repair and servicing.",

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
    name: "garage",
    label: "Garage",
    component: "input",
    nextFocus: "address",
    tooltip: "Enter garage",
    required: true,
  },

  {
    name: "address",
    label: "Address",
    component: "input",
    nextFocus: "city",
    tooltip: "Enter address",
    required: true,
  },

  {
    name: "city",
    label: "City",
    component: "input",
    nextFocus: "state",
    tooltip: "Enter city",
    required: true,
  },
  {
    name: "state",
    label: "State",
    component: "autocomplete",
    nextFocus: "zipCode",
    options: ["New State", "Zero State", "Hello State"],
    placeholder: " ",
    tooltip: "Enter state",
    required: true,
  },
  {
    name: "zipCode",
    label: "ZIP Code",
    component: "input",
    nextFocus: "country",
    tooltip: "Enter zip code",
    required: true,
  },
  {
    name: "country",
    label: "Country",
    component: "autocomplete",
    nextFocus: "description",
    options: ["New country", "Zero country", "Hello country"],
    placeholder: " ",
    tooltip: "Enter country",
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
  address: "Address",
  city: "City",
  state: "State",
  zipCode: "ZIP Code",
  country: "Country",
  description: "Description",
  garage: "Garage",
};
