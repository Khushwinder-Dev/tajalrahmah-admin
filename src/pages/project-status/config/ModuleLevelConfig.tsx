import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  name: string;
  description: string;
  tickets: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  name: "",
  description: "",
  tickets: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "name",
  "description",
  "tickets",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["name"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "name", title: "Name" },
  { key: "description", title: "Description" },
  { key: "tickets", title: "Tickets" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    description:
      "Development of a comprehensive e-commerce platform with payment integration",
    tickets: "TICK-001, TICK-002, TICK-003",
    status: "In Progress",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project status created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Cross-platform mobile application for iOS and Android",
    tickets: "TICK-004, TICK-005",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project status created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    name: "Database Migration",
    description: "Migration of legacy database to cloud infrastructure",
    tickets: "TICK-006, TICK-007, TICK-008, TICK-009",
    status: "In Progress",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project status created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    name: "API Integration",
    description: "Third-party API integration for payment processing",
    tickets: "TICK-010",
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
    name: "UI/UX Redesign",
    description: "Complete redesign of user interface and user experience",
    tickets: "TICK-011, TICK-012",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project status created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    name: "Security Audit",
    description: "Comprehensive security audit and vulnerability assessment",
    tickets: "TICK-013, TICK-014, TICK-015",
    status: "In Progress",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project status created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    name: "Performance Optimization",
    description: "Code optimization and performance improvements",
    tickets: "TICK-016",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project status created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    name: "Testing Framework",
    description: "Implementation of automated testing framework",
    tickets: "TICK-017, TICK-018, TICK-019",
    status: "In Progress",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project status created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    name: "Documentation Update",
    description: "Update and maintain project documentation",
    tickets: "TICK-020",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project status created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    name: "Deployment Pipeline",
    description: "Setup CI/CD pipeline for automated deployment",
    tickets: "TICK-021, TICK-022, TICK-023, TICK-024",
    status: "In Progress",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project status created",
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
  name: "E-commerce Platform",
  description:
    "Development of a comprehensive e-commerce platform with payment integration",
  tickets: "TICK-001, TICK-002, TICK-003",

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
    name: "name",
    label: "Name",
    component: "input",
    nextFocus: "description",
    tooltip: "Enter project name",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    placeholder: "Enter project description",
    nextFocus: "tickets",
    tooltip: "Enter project description",
    required: true,
  },
  {
    name: "tickets",
    label: "Tickets",
    component: "input",
    placeholder: "Enter ticket numbers (comma separated)",
    tooltip: "Enter ticket numbers associated with this project",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  name: "Name",
  description: "Description",
  tickets: "Tickets",
};
