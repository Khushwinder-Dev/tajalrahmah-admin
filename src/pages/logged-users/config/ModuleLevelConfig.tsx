import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  user: string;
  email: string;
  phone: string;
  ipAddress: string;
  country: string;
  city: string;
  state: string;
  address: string;
  loginTime: string;
  lastActivity: string;
  status: string;
  latitude: string;
  longitude: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  user: "",
  email: "",
  phone: "",
  ipAddress: "",
  country: "",
  city: "",
  state: "",
  address: "",
  loginTime: "",
  lastActivity: "",
  status: "",
  latitude: "",
  longitude: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "user",
  "email",
  "phone",
  "ipAddress",
  "country",
  "city",
  "state",
  "address",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = [
  "user",
  "email",
  "status",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "user", title: "User" },
  { key: "email", title: "Email" },
  { key: "phone", title: "Phone" },
  { key: "ipAddress", title: "IP Address" },
  { key: "country", title: "Country" },
  { key: "city", title: "City" },
  { key: "state", title: "State" },
  { key: "address", title: "Address" },
  { key: "loginTime", title: "Login Time" },
  { key: "lastActivity", title: "Last Activity" },
  { key: "status", title: "Status" },
  { key: "latitude", title: "Latitude" },
  { key: "longitude", title: "Longitude" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    user: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    ipAddress: "192.168.1.100",
    country: "United States",
    city: "New York",
    state: "NY",
    address: "123 Main St, New York, NY 10001",
    loginTime: "2025-01-20 09:30:00",
    lastActivity: "2025-01-20 15:45:00",
    status: "Active",
    latitude: "40.7128",
    longitude: "-74.0060",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "User logged in successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    user: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-0124",
    ipAddress: "192.168.1.101",
    country: "United States",
    city: "Los Angeles",
    state: "CA",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    loginTime: "2025-01-20 08:15:00",
    lastActivity: "2025-01-20 16:20:00",
    status: "Active",
    latitude: "34.0522",
    longitude: "-118.2437",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "User session active",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    user: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1-555-0125",
    ipAddress: "192.168.1.102",
    country: "Canada",
    city: "Toronto",
    state: "ON",
    address: "789 Maple Rd, Toronto, ON M5V 2H1",
    loginTime: "2025-01-20 10:00:00",
    lastActivity: "2025-01-20 14:30:00",
    status: "Inactive",
    latitude: "43.6532",
    longitude: "-79.3832",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "User logged out",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    user: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1-555-0126",
    ipAddress: "192.168.1.103",
    country: "United Kingdom",
    city: "London",
    state: "England",
    address: "321 Baker St, London, W1U 6TU",
    loginTime: "2025-01-20 07:45:00",
    lastActivity: "2025-01-20 17:10:00",
    status: "Active",
    latitude: "51.5074",
    longitude: "-0.1278",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "User working on tasks",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    user: "David Brown",
    email: "david.brown@example.com",
    phone: "+1-555-0127",
    ipAddress: "192.168.1.104",
    country: "Australia",
    city: "Sydney",
    state: "NSW",
    address: "654 Harbour Dr, Sydney, NSW 2000",
    loginTime: "2025-01-20 11:20:00",
    lastActivity: "2025-01-20 18:45:00",
    status: "Active",
    latitude: "-33.8688",
    longitude: "151.2093",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "User in meeting",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    user: "Lisa Davis",
    email: "lisa.davis@example.com",
    phone: "+1-555-0128",
    ipAddress: "192.168.1.105",
    country: "Germany",
    city: "Berlin",
    state: "Berlin",
    address: "987 Unter den Linden, Berlin, 10117",
    loginTime: "2025-01-20 06:30:00",
    lastActivity: "2025-01-20 13:15:00",
    status: "Suspended",
    latitude: "52.5200",
    longitude: "13.4050",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "Account suspended due to policy violation",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    user: "Robert Taylor",
    email: "robert.taylor@example.com",
    phone: "+1-555-0129",
    ipAddress: "192.168.1.106",
    country: "France",
    city: "Paris",
    state: "Île-de-France",
    address: "147 Champs-Élysées, Paris, 75008",
    loginTime: "2025-01-20 09:00:00",
    lastActivity: "2025-01-20 15:30:00",
    status: "Active",
    latitude: "48.8566",
    longitude: "2.3522",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "User accessing reports",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    user: "Emily Anderson",
    email: "emily.anderson@example.com",
    phone: "+1-555-0130",
    ipAddress: "192.168.1.107",
    country: "Japan",
    city: "Tokyo",
    state: "Tokyo",
    address: "258 Shibuya Crossing, Tokyo, 150-0002",
    loginTime: "2025-01-20 12:00:00",
    lastActivity: "2025-01-20 19:45:00",
    status: "Active",
    latitude: "35.6762",
    longitude: "139.6503",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "User updating profile",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    user: "Michael Garcia",
    email: "michael.garcia@example.com",
    phone: "+1-555-0131",
    ipAddress: "192.168.1.108",
    country: "Brazil",
    city: "São Paulo",
    state: "SP",
    address: "369 Paulista Ave, São Paulo, SP 01310-100",
    loginTime: "2025-01-20 10:30:00",
    lastActivity: "2025-01-20 16:00:00",
    status: "Inactive",
    latitude: "-23.5505",
    longitude: "-46.6333",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "User session expired",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    user: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    phone: "+1-555-0132",
    ipAddress: "192.168.1.109",
    country: "India",
    city: "Mumbai",
    state: "Maharashtra",
    address: "741 Marine Drive, Mumbai, MH 400002",
    loginTime: "2025-01-20 08:00:00",
    lastActivity: "2025-01-20 14:30:00",
    status: "Active",
    latitude: "19.0760",
    longitude: "72.8777",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
    draftedAt: null,
    actionMessage: "User working on projects",
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
  user: "John Doe",
  email: "john.doe@example.com",
  phone: "+1-555-0123",
  ipAddress: "192.168.1.100",
  country: "United States",
  city: "New York",
  state: "NY",
  address: "123 Main St, New York, NY 10001",
  loginTime: "2025-01-20 09:30:00",
  lastActivity: "2025-01-20 15:45:00",
  status: "Active",
  latitude: "40.7128",
  longitude: "-74.0060",

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
    name: "user",
    label: "User",
    component: "input",
    nextFocus: "email",
    tooltip: "Enter user's full name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    component: "input",
    type: "email",
    nextFocus: "phone",
    tooltip: "Enter user's email address",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    component: "input",
    type: "tel",
    nextFocus: "ipAddress",
    tooltip: "Enter user's phone number",
    required: true,
  },
  {
    name: "ipAddress",
    label: "IP Address",
    component: "input",
    nextFocus: "country",
    tooltip: "Enter user's IP address",
    required: true,
  },
  {
    name: "country",
    label: "Country",
    component: "autocomplete",
    options: [
      "United States",
      "Canada",
      "United Kingdom",
      "Germany",
      "France",
      "Japan",
      "Australia",
      "Brazil",
      "India",
      "China",
    ],
    placeholder: " ",
    nextFocus: "city",
    tooltip: "Select user's country",
    required: true,
  },
  {
    name: "city",
    label: "City",
    component: "input",
    nextFocus: "state",
    tooltip: "Enter user's city",
    required: true,
  },
  {
    name: "state",
    label: "State/Province",
    component: "input",
    nextFocus: "address",
    tooltip: "Enter user's state or province",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    component: "input",
    nextFocus: "loginTime",
    tooltip: "Enter user's full address",
    required: true,
  },
  {
    name: "loginTime",
    label: "Login Time",
    component: "input",
    type: "datetime-local",
    nextFocus: "lastActivity",
    tooltip: "Select user's login time",
    required: true,
  },
  {
    name: "lastActivity",
    label: "Last Activity",
    component: "input",
    type: "datetime-local",
    nextFocus: "status",
    tooltip: "Select user's last activity time",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    component: "autocomplete",
    options: ["Active", "Inactive", "Suspended", "Blocked", "Pending"],
    placeholder: " ",
    nextFocus: "latitude",
    tooltip: "Select user's current status",
    required: true,
  },
  {
    name: "latitude",
    label: "Latitude",
    component: "input",
    type: "number",
    nextFocus: "longitude",
    tooltip: "Enter latitude for Google Maps",
    required: true,
  },
  {
    name: "longitude",
    label: "Longitude",
    component: "input",
    type: "number",
    tooltip: "Enter longitude for Google Maps",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  user: "User",
  email: "Email",
  phone: "Phone",
  ipAddress: "IP Address",
  country: "Country",
  city: "City",
  state: "State/Province",
  address: "Address",
  loginTime: "Login Time",
  lastActivity: "Last Activity",
  status: "Status",
  latitude: "Latitude",
  longitude: "Longitude",
};
