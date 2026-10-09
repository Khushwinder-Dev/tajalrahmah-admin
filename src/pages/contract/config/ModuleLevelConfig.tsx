import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  subject: string;
  contractType: string;
  customer: string;
  contractValue: string;
  startDate: string;
  endDate: string;
  description: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  subject: "",
  contractType: "",
  customer: "",
  contractValue: "",
  startDate: "",
  endDate: "",
  description: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "subject",
  "contractType",
  "customer",
  "contractValue",
  "startDate",
  "endDate",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["subject"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "subject", title: "Subject" },
  { key: "contractType", title: "Contract Type" },
  { key: "customer", title: "Customer" },
  { key: "contractValue", title: "Contract Value" },
  { key: "startDate", title: "Start Date" },
  { key: "endDate", title: "End Date" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    subject: "Software Development Agreement",
    contractType: "Service Contract",
    customer: "TechCorp Solutions",
    contractValue: "$150,000",
    startDate: "2025-01-15",
    endDate: "2025-12-15",
    description:
      "Full-stack web application development with maintenance support",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Contract created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    subject: "Cloud Infrastructure Setup",
    contractType: "Consulting Contract",
    customer: "DataFlow Inc",
    contractValue: "$75,000",
    startDate: "2025-02-01",
    endDate: "2025-08-01",
    description: "AWS cloud migration and infrastructure optimization",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Contract created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    subject: "Mobile App Development",
    contractType: "Fixed Price Contract",
    customer: "RetailMax Ltd",
    contractValue: "$200,000",
    startDate: "2025-01-20",
    endDate: "2025-10-20",
    description: "iOS and Android mobile application for e-commerce platform",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Contract created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    subject: "Security Audit Services",
    contractType: "Time & Materials",
    customer: "SecureBank Corp",
    contractValue: "$50,000",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    description: "Comprehensive security assessment and penetration testing",
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
    subject: "Database Migration Project",
    contractType: "Service Contract",
    customer: "Enterprise Systems",
    contractValue: "$120,000",
    startDate: "2025-02-15",
    endDate: "2025-09-15",
    description: "Legacy database migration to modern cloud infrastructure",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Contract created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    subject: "API Integration Services",
    contractType: "Consulting Contract",
    customer: "PaymentGateway LLC",
    contractValue: "$90,000",
    startDate: "2025-01-10",
    endDate: "2025-07-10",
    description: "Third-party payment gateway integration and customization",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Contract created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    subject: "UI/UX Design Services",
    contractType: "Fixed Price Contract",
    customer: "Creative Agency Pro",
    contractValue: "$60,000",
    startDate: "2025-01-05",
    endDate: "2025-05-05",
    description: "Complete user interface and user experience redesign",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Contract completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    subject: "Performance Optimization",
    contractType: "Time & Materials",
    customer: "SpeedTech Solutions",
    contractValue: "$40,000",
    startDate: "2025-02-01",
    endDate: "2025-04-01",
    description: "Application performance optimization and code refactoring",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Contract created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    subject: "Testing Framework Implementation",
    contractType: "Service Contract",
    customer: "QualityAssurance Inc",
    contractValue: "$80,000",
    startDate: "2025-01-25",
    endDate: "2025-08-25",
    description: "Automated testing framework setup and implementation",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Contract created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    subject: "Documentation Services",
    contractType: "Consulting Contract",
    customer: "DocuTech Systems",
    contractValue: "$35,000",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    description: "Technical documentation creation and maintenance",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Contract created",
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
  subject: "Software Development Agreement",
  contractType: "Service Contract",
  customer: "TechCorp Solutions",
  contractValue: "$150,000",
  startDate: "2025-01-15",
  endDate: "2025-12-15",
  description:
    "Full-stack web application development with maintenance support",

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
    name: "subject",
    label: "Subject",
    component: "input",
    nextFocus: "contractType",
    tooltip: "Enter contract subject",
    required: true,
  },
  {
    name: "contractType",
    label: "Contract Type",
    component: "autocomplete",
    placeholder: "Select contract type",
    nextFocus: "customer",
    tooltip: "Select the type of contract",
    options: [
      "Service Contract",
      "Consulting Contract",
      "Fixed Price Contract",
      "Time & Materials",
      "Maintenance Contract",
    ],
    required: true,
  },
  {
    name: "customer",
    label: "Customer",
    component: "input",
    placeholder: "Enter customer name",
    nextFocus: "contractValue",
    tooltip: "Enter customer name or company",
    required: true,
  },
  {
    name: "contractValue",
    label: "Contract Value",
    component: "input",
    placeholder: "Enter contract value (e.g., $150,000)",
    nextFocus: "startDate",
    tooltip: "Enter the total contract value",
    required: true,
  },
  {
    name: "startDate",
    label: "Start Date",
    component: "input",
    type: "date",
    nextFocus: "endDate",
    tooltip: "Enter contract start date",
    required: true,
  },
  {
    name: "endDate",
    label: "End Date",
    component: "input",
    type: "date",
    nextFocus: "description",
    tooltip: "Enter contract end date",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    placeholder: "Enter contract description",
    tooltip: "Enter detailed contract description",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  subject: "Subject",
  contractType: "Contract Type",
  customer: "Customer",
  contractValue: "Contract Value",
  startDate: "Start Date",
  endDate: "End Date",
  description: "Description",
};
