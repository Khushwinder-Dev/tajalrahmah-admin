import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  CompanyName: string;
  Address: string;
  City: string;
  State: string;
  Country: string;
  ZipCode: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  CompanyName: "",
  Address: "",
  City: "",
  State: "",
  Country: "",
  ZipCode: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "CompanyName",
  "Address",
  "City",
  "State",
  "Country",
  "ZipCode",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = [
  "Address",
  "City",
  "State",
  "Country",
  "ZipCode",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "CompanyName", title: "Company Name" },
  { key: "Address", title: "Address" },
  { key: "City", title: "City" },
  { key: "State", title: "State" },
  { key: "Country", title: "Country" },
  { key: "ZipCode", title: "Zip Code" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    CompanyName: "Company 1",
    Address: "Address 1",
    City: "City 1",
    State: "State 1",
    Country: "Country 1",
    ZipCode: "ZipCode 1",
    status: "Completed",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "Loan repaid on time",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    CompanyName: "Company 2",
    Address: "Address 2",
    City: "City 2",
    State: "State 2",
    Country: "Country 2",
    ZipCode: "ZipCode 2",
    status: "Pending",
    createdAt: "2025-09-02T11:00:00Z",
    updatedAt: "2025-09-02T11:30:00Z",
    draftedAt: null,
    actionMessage: "Awaiting payment",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    CompanyName: "Company 3",
    Address: "Address 3",
    City: "City 3",
    State: "State 3",
    Country: "Country 3",
    ZipCode: "ZipCode 3",
    status: "Completed",
    createdAt: "2025-09-03T09:30:00Z",
    updatedAt: "2025-09-04T10:00:00Z",
    draftedAt: null,
    actionMessage: "Repaid with delay",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    CompanyName: "Company 4",
    Address: "Address 4",
    City: "City 4",
    State: "State 4",
    Country: "Country 4",
    ZipCode: "ZipCode 4",
    status: "Pending",
    createdAt: "2025-09-04T14:00:00Z",
    updatedAt: "2025-09-04T14:30:00Z",
    draftedAt: null,
    actionMessage: "Payment scheduled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    CompanyName: "Company 5",
    Address: "Address 5",
    City: "City 5",
    State: "State 5",
    Country: "Country 5",
    ZipCode: "ZipCode 5",
    status: "Completed",
    createdAt: "2025-09-05T08:00:00Z",
    updatedAt: "2025-09-06T09:00:00Z",
    draftedAt: null,
    actionMessage: "Paid in full",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",

    CompanyName: "Company 5",
    Address: "Address 5",
    City: "City 5",
    State: "State 5",
    Country: "Country 5",
    ZipCode: "ZipCode 5",
    status: "Pending",
    createdAt: "2025-09-06T10:00:00Z",
    updatedAt: "2025-09-06T11:00:00Z",
    draftedAt: null,
    actionMessage: "Awaiting refund",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    CompanyName: "Company 5",
    Address: "Address 5",
    City: "City 5",
    State: "State 5",
    Country: "Country 5",
    ZipCode: "ZipCode 5",
    status: "Completed",
    createdAt: "2025-09-07T09:00:00Z",
    updatedAt: "2025-09-08T10:00:00Z",
    draftedAt: null,
    actionMessage: "Repaid successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    CompanyName: "Company 5",
    Address: "Address 5",
    City: "City 5",
    State: "State 5",
    Country: "Country 5",
    ZipCode: "ZipCode 5",
    status: "Pending",
    createdAt: "2025-09-08T12:00:00Z",
    updatedAt: "2025-09-08T12:30:00Z",
    draftedAt: null,
    actionMessage: "Partial payment done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    CompanyName: "Company 5",
    Address: "Address 5",
    City: "City 5",
    State: "State 5",
    Country: "Country 5",
    ZipCode: "ZipCode 5",
    status: "Completed",
    createdAt: "2025-09-09T11:00:00Z",
    updatedAt: "2025-09-10T12:00:00Z",
    draftedAt: null,
    actionMessage: "Paid with interest",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    CompanyName: "Company 5",
    Address: "Address 5",
    City: "City 5",
    State: "State 5",
    Country: "Country 5",
    ZipCode: "ZipCode 5",
    status: "Pending",
    createdAt: "2025-09-10T10:30:00Z",
    updatedAt: "2025-09-10T11:00:00Z",
    draftedAt: null,
    actionMessage: "Refund pending",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    CompanyName: "Company 5",
    Address: "Address 5",
    City: "City 5",
    State: "State 5",
    Country: "Country 5",
    ZipCode: "ZipCode 5",
    status: "Completed",
    createdAt: "2025-09-11T09:00:00Z",
    updatedAt: "2025-09-12T10:00:00Z",
    draftedAt: null,
    actionMessage: "Paid in full",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    CompanyName: "Company 5",
    Address: "Address 5",
    City: "City 5",
    State: "State 5",
    Country: "Country 5",
    ZipCode: "ZipCode 5",
    status: "Pending",
    createdAt: "2025-09-12T08:30:00Z",
    updatedAt: "2025-09-12T09:00:00Z",
    draftedAt: null,
    actionMessage: "Awaiting refund",
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
  CompanyName: "Company 5",
  Address: "Address 5",
  City: "City 5",
  State: "State 5",
  Country: "Country 5",
  ZipCode: "ZipCode 5",

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
    name: "CompanyName",
    label: "Company Name",
    type: "text",
    nextFocus: "Address",
    component: "input",
    tooltip: "Enter company name",
    required: true,
  },
  {
    name: "Address",
    label: "Address",
    nextFocus: "City",
    component: "input",
    tooltip: "Enter address",
    placeholder: " ",
    required: true,
  },
  {
    name: "City",
    label: "City",
    nextFocus: "State",
    component: "input",
    type: "text",
    tooltip: "Enter city",
    required: true,
  },
  {
    name: "State",
    label: "State",
    nextFocus: "Country",
    component: "input",
    type: "text",
    tooltip: "Enter state",
    required: true,
  },
  {
    name: "Country",
    label: "Country",
    nextFocus: "ZipCode",
    component: "input",
    type: "text",
    tooltip: "Enter country",
    required: true,
  },
  {
    name: "ZipCode",
    label: "Zip Code",
    nextFocus: "isDefault",
    component: "input",
    type: "number",
    tooltip: "Enter zip code",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  CompanyName: "Company Name",
  Address: "Address",
  City: "City",
  State: "State",
  Country: "Country",
  ZipCode: "Zip Code",
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
    CompanyName: "Company 1",
    Address: "Address 1",
    City: "City 1",
    State: "State 1",
    Country: "Country 1",
    ZipCode: "ZipCode 1",

    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-01T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-02T10:00:00Z"),
    deletedAt: null,
  },
  {
    id: "2",
    CompanyName: "Company 2",
    Address: "Address 2",
    City: "City 2",
    State: "State 2",
    Country: "Country 2",
    ZipCode: "ZipCode 2",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-05T08:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-06T09:00:00Z"),
    deletedAt: null,
  },
  {
    id: "3",
    CompanyName: "Company 3",
    Address: "Address 3",
    City: "City 3",
    State: "State 3",
    Country: "Country 3",
    ZipCode: "ZipCode 3",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-10T10:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-12T12:00:00Z"),
    deletedAt: null,
  },
  {
    id: "4",
    CompanyName: "Company 4",
    Address: "Address 4",
    City: "City 4",
    State: "State 4",
    Country: "Country 4",
    ZipCode: "ZipCode 4",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-12T11:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-13T14:00:00Z"),
    deletedAt: null,
  },
  {
    id: "5",
    CompanyName: "Company 5",
    Address: "Address 5",
    City: "City 5",
    State: "State 5",
    Country: "Country 5",
    ZipCode: "ZipCode 5",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-15T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-16T10:00:00Z"),
    deletedAt: null,
  },
  {
    id: "6",
    CompanyName: "Company 6",
    Address: "Address 6",
    City: "City 6",
    State: "State 6",
    Country: "Country 6",
    ZipCode: "ZipCode 6",
    isDefault: false,
    isActive: true,
    isDraft: true,
    isDeleted: false,
    createdAt: new Date("2025-09-18T08:00:00Z"),
    draftedAt: new Date("2025-09-18T09:00:00Z"),
    updatedAt: new Date("2025-09-18T09:30:00Z"),
    deletedAt: null,
  },
  {
    id: "7",
    CompanyName: "Company 7",
    Address: "Address 7",
    City: "City 7",
    State: "State 7",
    Country: "Country 7",
    ZipCode: "ZipCode 7",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-20T10:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-21T12:00:00Z"),
    deletedAt: null,
  },
  {
    id: "8",
    CompanyName: "Company 8",
    Address: "Address 8",
    City: "City 8",
    State: "State 8",
    Country: "Country 8",
    ZipCode: "ZipCode 8",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-22T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-23T11:00:00Z"),
    deletedAt: null,
  },
  {
    id: "9",
    CompanyName: "Company 9",
    Address: "Address 9",
    City: "City 9",
    State: "State 9",
    Country: "Country 9",
    ZipCode: "ZipCode 9",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-25T08:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-26T10:00:00Z"),
    deletedAt: null,
  },
  {
    id: "10",
    CompanyName: "Company 10",
    Address: "Address 10",
    City: "City 10",
    State: "State 10",
    Country: "Country 10",
    ZipCode: "ZipCode 10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-28T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-29T11:00:00Z"),
    deletedAt: null,
  },
  {
    id: "11",
    CompanyName: "Company 11",
    Address: "Address 11",
    City: "City 11",
    State: "State 11",
    Country: "Country 11",
    ZipCode: "ZipCode 11",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-10-01T08:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-10-02T09:30:00Z"),
    deletedAt: null,
  },
  {
    id: "12",
    CompanyName: "Company 12",
    Address: "Address 12",
    City: "City 12",
    State: "State 12",
    Country: "Country 12",
    ZipCode: "ZipCode 12",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-10-03T10:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-10-04T11:00:00Z"),
    deletedAt: null,
  },
];
