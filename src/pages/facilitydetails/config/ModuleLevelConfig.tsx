import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  facilityType: string;
  facilityName: string;
  description: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  facilityType: "",
  facilityName: "",
  description: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "facilityType",
  "facilityName",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["facilityName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "facilityType", title: "Facility Type" },
  { key: "facilityName", title: "Facility Name" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    facilityType: "Office Building",
    facilityName: "Main Office Complex",
    description:
      "Primary corporate headquarters with executive offices, meeting rooms, and administrative facilities",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    facilityType: "Manufacturing Plant",
    facilityName: "Production Facility A",
    description:
      "Industrial facility for production and assembly of electronic components and devices",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    facilityType: "Research Center",
    facilityName: "R&D Laboratory",
    description:
      "State-of-the-art research facility equipped with advanced laboratories and testing equipment",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    facilityType: "Warehouse",
    facilityName: "Distribution Center",
    description:
      "Large storage and distribution facility for inventory management and logistics operations",
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
    facilityType: "Service Center",
    facilityName: "Customer Support Hub",
    description:
      "Dedicated facility for customer support operations with call center and help desk services",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    facilityType: "Training Center",
    facilityName: "Learning Academy",
    description:
      "Educational facility for employee training programs and professional development courses",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    facilityType: "Data Center",
    facilityName: "IT Infrastructure Hub",
    description:
      "Secure facility housing servers, networking equipment, and IT infrastructure",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Facility completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    facilityType: "Quality Lab",
    facilityName: "Testing Laboratory",
    description:
      "Specialized facility for product testing, quality assurance, and compliance verification",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    facilityType: "Recreation Center",
    facilityName: "Employee Wellness Hub",
    description:
      "Multi-purpose facility with gym, cafeteria, and recreational amenities for staff",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Facility created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    facilityType: "Workshop",
    facilityName: "Maintenance Facility",
    description:
      "Technical facility for equipment maintenance, repairs, and mechanical operations",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Facility created",
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
  facilityType: "Office Building",
  facilityName: "Main Office Complex",
  description:
    "Primary corporate headquarters with executive offices, meeting rooms, and administrative facilities",

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
    name: "facilityType",
    label: "Facility Type",
    component: "autocomplete",
    options: [
      "Office Building",
      "Manufacturing Plant",
      "Research Center",
      "Warehouse",
      "Service Center",
      "Training Center",
      "Data Center",
      "Quality Lab",
      "Recreation Center",
      "Workshop",
    ],
    nextFocus: "facilityName",
    tooltip: "Select facility type",
    required: true,
  },
  {
    name: "facilityName",
    label: "Facility Name",
    component: "input",
    nextFocus: "description",
    tooltip: "Enter facility name",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    tooltip: "Enter facility description",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  facilityType: "Facility Type",
  facilityName: "Facility Name",
  description: "Description",
};
