import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  roomSizeName: string;
  from: string;
  to: string;
  promocode: string;
  discount: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  roomSizeName: "",
  from: "",
  to: "",
  promocode: "",
  discount: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "roomSizeName",
  "from",
  "to",
  "promocode",
  "discount",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["roomSizeName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "roomSizeName", title: "Room Size Name" },
  { key: "from", title: "From" },
  { key: "to", title: "To" },
  { key: "promocode", title: "Promocode" },
  { key: "discount", title: "Discount" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    roomSizeName: "Standard Room",
    from: "2025-01-01",
    to: "2025-01-31",
    promocode: "WELCOME20",
    discount: "20%",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Promocode created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    roomSizeName: "Deluxe Room",
    from: "2025-02-01",
    to: "2025-02-28",
    promocode: "DELUXE15",
    discount: "15%",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Promocode created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    roomSizeName: "Suite",
    from: "2025-03-01",
    to: "2025-03-31",
    promocode: "SUITE30",
    discount: "30%",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Promocode created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    roomSizeName: "Family Room",
    from: "2025-04-01",
    to: "2025-04-30",
    promocode: "FAMILY25",
    discount: "25%",
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
    roomSizeName: "Executive Room",
    from: "2025-05-01",
    to: "2025-05-31",
    promocode: "EXEC50",
    discount: "50%",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Promocode created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    roomSizeName: "Presidential Suite",
    from: "2025-06-01",
    to: "2025-06-30",
    promocode: "PRESIDENT40",
    discount: "40%",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Promocode created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    roomSizeName: "Penthouse",
    from: "2025-07-01",
    to: "2025-07-31",
    promocode: "PENTHOUSE60",
    discount: "60%",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Promocode completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    roomSizeName: "Ocean View Room",
    from: "2025-08-01",
    to: "2025-08-31",
    promocode: "OCEAN35",
    discount: "35%",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Promocode created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    roomSizeName: "Garden Room",
    from: "2025-09-01",
    to: "2025-09-30",
    promocode: "GARDEN10",
    discount: "10%",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Promocode created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    roomSizeName: "Business Room",
    from: "2025-10-01",
    to: "2025-10-31",
    promocode: "BUSINESS45",
    discount: "45%",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Promocode created",
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
  roomSizeName: "Standard Room",
  from: "2025-01-01",
  to: "2025-01-31",
  promocode: "WELCOME20",
  discount: "20%",

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
    name: "roomSizeName",
    label: "Room Size Name",
    component: "input",
    nextFocus: "from",
    tooltip: "Enter room size name",
    required: true,
  },
  {
    name: "from",
    label: "From",
    component: "input",
    type: "date",
    nextFocus: "to",
    tooltip: "Enter start date",
    required: true,
  },
  {
    name: "to",
    label: "To",
    component: "input",
    type: "date",
    nextFocus: "promocode",
    tooltip: "Enter end date",
    required: true,
  },
  {
    name: "promocode",
    label: "Promocode",
    component: "input",
    nextFocus: "discount",
    tooltip: "Enter promocode",
    required: true,
  },
  {
    name: "discount",
    label: "Discount",
    component: "input",
    placeholder: "Enter discount percentage",
    tooltip: "Enter discount percentage",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  roomSizeName: "Room Size Name",
  from: "From",
  to: "To",
  promocode: "Promocode",
  discount: "Discount",
};
