import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  employeeName: string;
  dependantName: string;
  relation: string;
  dateOfBirth: string;
  citizenIdentification: string;
  reason: string;
  effectiveDate: string;
  expirationDate: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  employeeName: "",
  dependantName: "",
  relation: "",
  dateOfBirth: "",
  citizenIdentification: "",
  reason: "",
  effectiveDate: "",
  expirationDate: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "employeeName",
  "dependantName",
  "relation",
  "dateOfBirth",
  "citizenIdentification",
  "reason",
  "effectiveDate",
  "expirationDate",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["employeeName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "employeeName", title: "Employee Name" },
  { key: "dependantName", title: "Dependant Name" },
  { key: "relation", title: "Relation" },
  { key: "dateOfBirth", title: "Date Of Birth" },
  { key: "citizenIdentification", title: "Citizen Identification" },
  { key: "reason", title: "Reason" },
  { key: "effectiveDate", title: "Effective Date" },
  { key: "expirationDate", title: "Expiration Date" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    employeeName: "John Smith",
    dependantName: "Sarah Smith",
    relation: "Spouse",
    dateOfBirth: "1985-03-15",
    citizenIdentification: "1234567890",
    reason: "Marriage",
    effectiveDate: "2025-01-01",
    expirationDate: "2025-12-31",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Dependant added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    employeeName: "Maria Garcia",
    dependantName: "Carlos Garcia",
    relation: "Child",
    dateOfBirth: "2010-07-22",
    citizenIdentification: "0987654321",
    reason: "Birth",
    effectiveDate: "2025-01-01",
    expirationDate: "2025-12-31",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Dependant added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    employeeName: "David Johnson",
    dependantName: "Emily Johnson",
    relation: "Child",
    dateOfBirth: "2015-11-08",
    citizenIdentification: "1122334455",
    reason: "Birth",
    effectiveDate: "2025-01-01",
    expirationDate: "2025-12-31",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Dependant added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    employeeName: "Lisa Chen",
    dependantName: "Robert Chen",
    relation: "Spouse",
    dateOfBirth: "1988-09-12",
    citizenIdentification: "5566778899",
    reason: "Marriage",
    effectiveDate: "2025-02-01",
    expirationDate: "2025-12-31",
    status: "Draft",
    createdAt: "2025-01-01",
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
    employeeName: "Michael Brown",
    dependantName: "Jennifer Brown",
    relation: "Spouse",
    dateOfBirth: "1990-04-25",
    citizenIdentification: "9988776655",
    reason: "Marriage",
    effectiveDate: "2025-01-01",
    expirationDate: "2025-12-31",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Dependant added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    employeeName: "Anna Wilson",
    dependantName: "James Wilson",
    relation: "Child",
    dateOfBirth: "2012-12-03",
    citizenIdentification: "4433221100",
    reason: "Birth",
    effectiveDate: "2025-01-01",
    expirationDate: "2025-12-31",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Dependant added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    employeeName: "Robert Taylor",
    dependantName: "Susan Taylor",
    relation: "Spouse",
    dateOfBirth: "1987-06-18",
    citizenIdentification: "6677889900",
    reason: "Marriage",
    effectiveDate: "2025-01-01",
    expirationDate: "2025-12-31",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Dependant completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    employeeName: "Jennifer Davis",
    dependantName: "Michael Davis",
    relation: "Child",
    dateOfBirth: "2018-01-14",
    citizenIdentification: "3344556677",
    reason: "Birth",
    effectiveDate: "2025-01-01",
    expirationDate: "2025-12-31",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Dependant added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    employeeName: "Christopher Lee",
    dependantName: "Amanda Lee",
    relation: "Spouse",
    dateOfBirth: "1992-08-30",
    citizenIdentification: "8899001122",
    reason: "Marriage",
    effectiveDate: "2025-01-01",
    expirationDate: "2025-12-31",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Dependant added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    employeeName: "Sarah Martinez",
    dependantName: "Daniel Martinez",
    relation: "Child",
    dateOfBirth: "2016-05-07",
    citizenIdentification: "2233445566",
    reason: "Birth",
    effectiveDate: "2025-01-01",
    expirationDate: "2025-12-31",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Dependant added",
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
  employeeName: "John Smith",
  dependantName: "Sarah Smith",
  relation: "Spouse",
  dateOfBirth: "1985-03-15",
  citizenIdentification: "1234567890",
  reason: "Marriage",
  effectiveDate: "2025-01-01",
  expirationDate: "2025-12-31",

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
    name: "employeeName",
    label: "Employee Name",
    component: "input",
    nextFocus: "dependantName",
    tooltip: "Enter employee name",
    required: true,
  },
  {
    name: "dependantName",
    label: "Dependant Name",
    component: "input",
    nextFocus: "relation",
    tooltip: "Enter dependant name",
    required: true,
  },
  {
    name: "relation",
    label: "Relation",
    component: "autocomplete",
    options: ["Spouse", "Child", "Parent", "Sibling", "Other"],
    nextFocus: "dateOfBirth",
    tooltip: "Select relation",
    required: true,
  },
  {
    name: "dateOfBirth",
    label: "Date Of Birth",
    component: "input",
    type: "date",
    nextFocus: "citizenIdentification",
    tooltip: "Enter date of birth",
    required: true,
  },
  {
    name: "citizenIdentification",
    label: "Citizen Identification",
    component: "input",
    nextFocus: "reason",
    tooltip: "Enter citizen identification number",
    required: true,
  },
  {
    name: "reason",
    label: "Reason",
    component: "autocomplete",
    options: ["Marriage", "Birth", "Adoption", "Other"],
    nextFocus: "effectiveDate",
    tooltip: "Select reason",
    required: true,
  },
  {
    name: "effectiveDate",
    label: "Effective Date",
    component: "input",
    type: "date",
    nextFocus: "expirationDate",
    tooltip: "Enter effective date",
    required: true,
  },
  {
    name: "expirationDate",
    label: "Expiration Date",
    component: "input",
    type: "date",
    tooltip: "Enter expiration date",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  employeeName: "Employee Name",
  dependantName: "Dependant Name",
  relation: "Relation",
  dateOfBirth: "Date Of Birth",
  citizenIdentification: "Citizen Identification",
  reason: "Reason",
  effectiveDate: "Effective Date",
  expirationDate: "Expiration Date",
};
