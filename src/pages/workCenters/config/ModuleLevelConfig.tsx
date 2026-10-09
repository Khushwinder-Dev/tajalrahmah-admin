import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  name: string;
  code: string;
  workingHours: string;
  timeEfficiency: string;
  costPerHour: string;
  capacity: string;
  oeeTarget: string;
  timeBeforeProduction: string;
  timeAfterProduction: string;
  description: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  name: "",
  code: "",
  workingHours: "",
  timeEfficiency: "",
  costPerHour: "",
  capacity: "",
  oeeTarget: "",
  timeBeforeProduction: "",
  timeAfterProduction: "",
  description: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "name",
  "code",
  "workingHours",
  "timeEfficiency",
  "costPerHour",
  "capacity",
  "oeeTarget",
  "timeBeforeProduction",
  "timeAfterProduction",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["name", "code"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "name", title: "Name" },
  { key: "code", title: "Code" },
  { key: "workingHours", title: "Working Hours" },
  { key: "timeEfficiency", title: "Time Efficiency" },
  { key: "costPerHour", title: "Cost Per Hour" },
  { key: "capacity", title: "Capacity" },
  { key: "oeeTarget", title: "OEE Target" },
  { key: "timeBeforeProduction", title: "Time Before Production" },
  { key: "timeAfterProduction", title: "Time After Production" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    name: "Assembly Line A",
    code: "WC-001",
    workingHours: "08:00 - 17:00",
    timeEfficiency: "92%",
    costPerHour: "25 USD",
    capacity: "500 units/day",
    oeeTarget: "85%",
    timeBeforeProduction: "15 mins",
    timeAfterProduction: "10 mins",
    description: "Handles small appliance assembly operations.",
    status: "Active",
    createdAt: "2025-08-20",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Approved by CTO",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    name: "Packaging Unit",
    code: "WC-002",
    workingHours: "09:00 - 18:00",
    timeEfficiency: "89%",
    costPerHour: "20 USD",
    capacity: "800 units/day",
    oeeTarget: "80%",
    timeBeforeProduction: "10 mins",
    timeAfterProduction: "12 mins",
    description: "Focuses on product packaging and labeling.",
    status: "Draft",
    createdAt: "2025-08-21",
    updatedAt: "2025-08-24",
    draftedAt: "2025-08-22",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    name: "QA Expansion Unit",
    code: "WC-003",
    workingHours: "08:30 - 17:30",
    timeEfficiency: "90%",
    costPerHour: "22 USD",
    capacity: "300 units/day",
    oeeTarget: "82%",
    timeBeforeProduction: "20 mins",
    timeAfterProduction: "15 mins",
    description: "Handles QA and testing operations.",
    status: "Active",
    createdAt: "2025-08-19",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Approved by QA Lead",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    name: "UI/UX Design Studio",
    code: "WC-004",
    workingHours: "10:00 - 19:00",
    timeEfficiency: "88%",
    costPerHour: "28 USD",
    capacity: "120 units/day",
    oeeTarget: "80%",
    timeBeforeProduction: "12 mins",
    timeAfterProduction: "10 mins",
    description: "Focuses on UI/UX design operations.",
    status: "Active",
    createdAt: "2025-08-18",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Approved by Design Head",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    name: "Analytics Unit",
    code: "WC-005",
    workingHours: "09:00 - 18:00",
    timeEfficiency: "91%",
    costPerHour: "30 USD",
    capacity: "250 units/day",
    oeeTarget: "83%",
    timeBeforeProduction: "15 mins",
    timeAfterProduction: "12 mins",
    description: "Handles all data analysis operations.",
    status: "Active",
    createdAt: "2025-08-17",
    updatedAt: "2025-08-24",
    draftedAt: null,
    actionMessage: "Recruitment in progress",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    name: "HR Operations",
    code: "WC-006",
    workingHours: "08:00 - 16:00",
    timeEfficiency: "87%",
    costPerHour: "18 USD",
    capacity: "100 units/day",
    oeeTarget: "78%",
    timeBeforeProduction: "10 mins",
    timeAfterProduction: "10 mins",
    description: "Supports HR operations and employee management.",
    status: "Active",
    createdAt: "2025-08-15",
    updatedAt: "2025-08-23",
    draftedAt: null,
    actionMessage: "Approved by HR",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    name: "Marketing Unit",
    code: "WC-007",
    workingHours: "09:30 - 18:30",
    timeEfficiency: "86%",
    costPerHour: "26 USD",
    capacity: "350 units/day",
    oeeTarget: "79%",
    timeBeforeProduction: "18 mins",
    timeAfterProduction: "14 mins",
    description: "Executes marketing operations and campaigns.",
    status: "Draft",
    createdAt: "2025-08-14",
    updatedAt: "2025-08-22",
    draftedAt: "2025-08-20",
    actionMessage: "Waiting for CEO approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    name: "Finance Department",
    code: "WC-008",
    workingHours: "08:30 - 17:30",
    timeEfficiency: "90%",
    costPerHour: "35 USD",
    capacity: "200 units/day",
    oeeTarget: "81%",
    timeBeforeProduction: "15 mins",
    timeAfterProduction: "12 mins",
    description: "Handles financial reports and accounts.",
    status: "Active",
    createdAt: "2025-08-13",
    updatedAt: "2025-08-21",
    draftedAt: null,
    actionMessage: "Final approval completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    name: "Customer Support Center",
    code: "WC-009",
    workingHours: "Shift-based",
    timeEfficiency: "84%",
    costPerHour: "15 USD",
    capacity: "600 units/day",
    oeeTarget: "77%",
    timeBeforeProduction: "10 mins",
    timeAfterProduction: "8 mins",
    description: "Handles customer service and support.",
    status: "Active",
    createdAt: "2025-08-12",
    updatedAt: "2025-08-19",
    draftedAt: null,
    actionMessage: "Recruitment open",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    name: "Project Management Office",
    code: "WC-010",
    workingHours: "09:00 - 18:00",
    timeEfficiency: "93%",
    costPerHour: "40 USD",
    capacity: "150 units/day",
    oeeTarget: "88%",
    timeBeforeProduction: "20 mins",
    timeAfterProduction: "15 mins",
    description: "Manages project operations and delivery.",
    status: "Active",
    createdAt: "2025-08-11",
    updatedAt: "2025-08-18",
    draftedAt: null,
    actionMessage: "CEO Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    name: "DevOps Center",
    code: "WC-011",
    workingHours: "Flexible",
    timeEfficiency: "92%",
    costPerHour: "38 USD",
    capacity: "180 units/day",
    oeeTarget: "85%",
    timeBeforeProduction: "25 mins",
    timeAfterProduction: "15 mins",
    description: "Handles cloud infrastructure and pipelines.",
    status: "Active",
    createdAt: "2025-08-10",
    updatedAt: "2025-08-16",
    draftedAt: null,
    actionMessage: "In recruitment process",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    name: "Content Writing Hub",
    code: "WC-012",
    workingHours: "Remote/Flexible",
    timeEfficiency: "85%",
    costPerHour: "18 USD",
    capacity: "400 units/day",
    oeeTarget: "80%",
    timeBeforeProduction: "10 mins",
    timeAfterProduction: "8 mins",
    description: "Produces marketing and blog content.",
    status: "Active",
    createdAt: "2025-08-09",
    updatedAt: "2025-08-15",
    draftedAt: null,
    actionMessage: "Recruitment ongoing",
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
  name: "Name",
  code: "Code",
  workingHours: "Working Hours",
  timeEfficiency: "Time Efficiency",
  costPerHour: "Cost Per Hour",
  capacity: "Capacity",
  oeeTarget: "OEE Target",
  timeBeforeProduction: "Time Before Production",
  timeAfterProduction: "Time After Production",
  description: "Description",

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
    nextFocus: "code",
    tooltip: "Enter name",
    required: true,
  },
  {
    name: "code",
    label: "Code",
    component: "input",
    nextFocus: "workingHours",
    tooltip: "Enter code",
    required: true,
  },
  {
    name: "workingHours",
    label: "Working Hours",
    component: "autocomplete",
    options: ["Flexible", "Full-time", "Part-time", "Contract", "Internship"],
    placeholder: " ",
    nextFocus: "timeEfficiency",
    tooltip: "Select or enter working hours",
    required: true,
  },
  {
    name: "timeEfficiency",
    label: "Time Efficiency",
    component: "input",
    nextFocus: "costPerHour",
    tooltip: "Enter time efficiency",
    required: true,
  },
  {
    name: "costPerHour",
    label: "Cost Per Hour",
    component: "input",
    nextFocus: "capacity",
    tooltip: "Enter cost per hour",
    required: true,
  },
  {
    name: "capacity",
    label: "Capacity",
    component: "input",
    nextFocus: "oeeTarget",
    tooltip: "Enter capacity",
    required: true,
  },
  {
    name: "oeeTarget",
    label: "OEE Target",
    component: "input",
    nextFocus: "timeBeforeProduction",
    tooltip: "Enter OEE target",
    required: true,
  },
  {
    name: "timeBeforeProduction",
    label: "Time Before Production",
    component: "input",
    nextFocus: "timeAfterProduction",
    tooltip: "Enter time before production",
    required: true,
  },
  {
    name: "timeAfterProduction",
    label: "Time After Production",
    component: "input",
    nextFocus: "description",
    tooltip: "Enter time after production",
    required: true,
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
  name: "Name",
  code: "Code",
  workingHours: "Working Hours",
  timeEfficiency: "Time Efficiency",
  costPerHour: "Cost Per Hour",
  capacity: "Capacity",
  oeeTarget: "OEE Target",
  timeBeforeProduction: "Time Before Production",
  timeAfterProduction: "Time After Production",
  description: "Description",
};
