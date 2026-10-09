import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "title",
  "description",
  "startDate",
  "endDate",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["title"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "title", title: "Title" },
  { key: "description", title: "Description" },
  { key: "startDate", title: "Start Date" },
  { key: "endDate", title: "End Date" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    title: "Notice 1",
    description: "Description 1",
    startDate: "2025-09-01T10:00:00Z",
    endDate: "2025-09-01T11:00:00Z",
    status: "Completed",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-01T11:00:00Z",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    title: "Notice 2",
    description: "Description 2",
    startDate: "2025-09-02T09:15:00Z",
    endDate: "2025-09-02T09:20:00Z",
    status: "Pending",
    createdAt: "2025-09-02T09:15:00Z",
    updatedAt: "2025-09-02T09:20:00Z",
    draftedAt: null,
    actionMessage: "Awaiting confirmation",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    title: "Notice 3",
    description: "Description 3",
    startDate: "2025-09-03T14:00:00Z",
    endDate: "2025-09-03T14:30:00Z",
    status: "Completed",
    createdAt: "2025-09-03T14:00:00Z",
    updatedAt: "2025-09-03T14:30:00Z",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    title: "Notice 4",
    description: "Description 4",
    startDate: "2025-09-04T08:30:00Z",
    endDate: "2025-09-04T08:35:00Z",
    status: "Draft",
    createdAt: "2025-09-04T08:30:00Z",
    updatedAt: "2025-09-04T08:35:00Z",
    draftedAt: "2025-09-04T08:35:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    title: "Notice 5",
    description: "Description 5",
    startDate: "2025-09-05T12:00:00Z",
    endDate: "2025-09-05T12:45:00Z",
    status: "Completed",
    createdAt: "2025-09-05T12:00:00Z",
    updatedAt: "2025-09-05T12:45:00Z",
    draftedAt: null,
    actionMessage: "Payment successful",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    title: "Notice 6",
    description: "Description 6",
    startDate: "2025-09-06T15:00:00Z",
    endDate: "2025-09-06T15:10:00Z",
    status: "Deleted",
    createdAt: "2025-09-06T15:00:00Z",
    updatedAt: "2025-09-06T15:10:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "7",
    title: "Notice 7",
    description: "Description 7",
    startDate: "2025-09-07T10:20:00Z",
    endDate: "2025-09-07T10:40:00Z",
    status: "Completed",
    createdAt: "2025-09-07T10:20:00Z",
    updatedAt: "2025-09-07T10:40:00Z",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    title: "Notice 8",
    description: "Description 8",
    startDate: "2025-09-08T09:45:00Z",
    endDate: "2025-09-08T09:50:00Z",
    status: "Pending",
    createdAt: "2025-09-08T09:45:00Z",
    updatedAt: "2025-09-08T09:50:00Z",
    draftedAt: null,
    actionMessage: "Awaiting approval",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    title: "Notice 9",
    description: "Description 9",
    startDate: "2025-09-09T13:00:00Z",
    endDate: "2025-09-09T13:25:00Z",
    status: "Completed",
    createdAt: "2025-09-09T13:00:00Z",
    updatedAt: "2025-09-09T13:25:00Z",
    draftedAt: null,
    actionMessage: "Payment successful",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    title: "Notice 10",
    description: "Description 10",
    startDate: "2025-09-10T11:00:00Z",
    endDate: "2025-09-10T11:10:00Z",
    status: "Draft",
    createdAt: "2025-09-10T11:00:00Z",
    updatedAt: "2025-09-10T11:10:00Z",
    draftedAt: "2025-09-10T11:10:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    title: "Notice 11",
    description: "Description 11",
    startDate: "2025-09-11T14:00:00Z",
    endDate: "2025-09-11T14:40:00Z",
    status: "Completed",
    createdAt: "2025-09-11T14:00:00Z",
    updatedAt: "2025-09-11T14:40:00Z",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    title: "Notice 12",
    description: "Description 12",
    startDate: "2025-09-12T08:00:00Z",
    endDate: "2025-09-12T08:05:00Z",
    status: "Deleted",
    createdAt: "2025-09-12T08:00:00Z",
    updatedAt: "2025-09-12T08:05:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
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
  title: "Notice 12",
  description: "Description 12",
  startDate: "2025-09-12T08:00:00Z",
  endDate: "2025-09-12T08:05:00Z",

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
    name: "title",
    label: "Title",
    nextFocus: "description",
    component: "input",
    tooltip: "Enter title",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    nextFocus: "startDate",
    component: "input",
    tooltip: "Enter description",
    required: true,
  },
  {
    name: "startDate",
    label: "Start Date",
    nextFocus: "endDate",
    component: "input",
    type: "date",
    tooltip: "Enter start date",
    required: true,
  },
  {
    name: "endDate",
    label: "End Date",
    nextFocus: "isDefault",
    component: "input",
    type: "date",
    tooltip: "Enter end date",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  title: "Title",
  description: "Description",
  startDate: "Start Date",
  endDate: "End Date",
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
    title: "Project Alpha",
    description: "Initial phase of Project Alpha with requirement gathering",
    startDate: "2025-09-01",
    endDate: "2025-09-10",
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
    title: "Project Beta",
    description: "Design and prototyping phase for Project Beta",
    startDate: "2025-09-05",
    endDate: "2025-09-15",
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
    title: "Project Gamma",
    description: "Development phase for Project Gamma features",
    startDate: "2025-09-10",
    endDate: "2025-09-25",
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
    title: "Project Delta",
    description: "Testing and QA for Project Delta",
    startDate: "2025-09-12",
    endDate: "2025-09-20",
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
    title: "Project Epsilon",
    description: "Deployment and go-live preparation for Project Epsilon",
    startDate: "2025-09-15",
    endDate: "2025-09-22",
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
    title: "Project Zeta",
    description: "Initial research and planning for Project Zeta",
    startDate: "2025-09-18",
    endDate: "2025-09-25",
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
    title: "Project Eta",
    description: "UI/UX improvements for Project Eta",
    startDate: "2025-09-20",
    endDate: "2025-09-28",
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
    title: "Project Theta",
    description: "Bug fixes and patch updates for Project Theta",
    startDate: "2025-09-22",
    endDate: "2025-09-30",
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
    title: "Project Iota",
    description: "Performance testing for Project Iota",
    startDate: "2025-09-25",
    endDate: "2025-10-05",
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
    title: "Project Kappa",
    description: "Final review and approvals for Project Kappa",
    startDate: "2025-09-28",
    endDate: "2025-10-05",
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
    title: "Project Lambda",
    description: "Documentation and knowledge transfer for Project Lambda",
    startDate: "2025-10-01",
    endDate: "2025-10-08",
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
    title: "Project Mu",
    description: "Retrospective and evaluation for Project Mu",
    startDate: "2025-10-03",
    endDate: "2025-10-10",
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
