import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  projectGroup: string;
  vatNumber: string;
  website: string;
  phone: string;
  currency: string;
  country: string;
  language: string;
  street: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  projectGroup: "",
  vatNumber: "",
  website: "",
  phone: "",
  currency: "",
  country: "",
  language: "",
  street: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "projectGroup",
  "vatNumber",
  "website",
  "phone",
  "currency",
  "country",
  "language",
  "street",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["projectGroup"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "projectGroup", title: "Project Group" },
  { key: "vatNumber", title: "VAT Number" },
  { key: "website", title: "Website" },
  { key: "phone", title: "Phone" },
  { key: "currency", title: "Currency" },
  { key: "country", title: "Country" },
  { key: "language", title: "Language" },
  { key: "street", title: "Street" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    projectGroup: "TechCorp Solutions",
    vatNumber: "VAT123456789",
    website: "www.techcorp.com",
    phone: "+1-555-0123",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "123 Tech Street, Silicon Valley, CA 94000",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project group created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    projectGroup: "DataFlow Inc",
    vatNumber: "VAT987654321",
    website: "www.dataflow.io",
    phone: "+1-555-0456",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "456 Data Avenue, Austin, TX 73301",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project group created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    projectGroup: "RetailMax Ltd",
    vatNumber: "VAT456789123",
    website: "www.retailmax.co.uk",
    phone: "+44-20-7946-0958",
    currency: "GBP",
    country: "United Kingdom",
    language: "English",
    street: "789 Retail Road, London, SW1A 1AA",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project group created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    projectGroup: "SecureBank Corp",
    vatNumber: "VAT789123456",
    website: "www.securebank.com",
    phone: "+1-555-0789",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "321 Security Boulevard, New York, NY 10001",
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
    projectGroup: "Enterprise Systems",
    vatNumber: "VAT321654987",
    website: "www.enterprisesys.com",
    phone: "+1-555-0321",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "654 Enterprise Way, Seattle, WA 98101",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project group created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    projectGroup: "PaymentGateway LLC",
    vatNumber: "VAT654987321",
    website: "www.paymentgateway.com",
    phone: "+1-555-0654",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "987 Payment Plaza, Miami, FL 33101",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project group created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    projectGroup: "Creative Agency Pro",
    vatNumber: "VAT147258369",
    website: "www.creativeagency.pro",
    phone: "+1-555-0147",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "147 Creative Lane, Los Angeles, CA 90210",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project group completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    projectGroup: "SpeedTech Solutions",
    vatNumber: "VAT369258147",
    website: "www.speedtech.solutions",
    phone: "+1-555-0369",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "258 Speed Drive, Denver, CO 80201",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project group created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    projectGroup: "QualityAssurance Inc",
    vatNumber: "VAT852741963",
    website: "www.qualityassurance.inc",
    phone: "+1-555-0852",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "741 Quality Street, Boston, MA 02101",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project group created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    projectGroup: "DocuTech Systems",
    vatNumber: "VAT963852741",
    website: "www.docutech.systems",
    phone: "+1-555-0963",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "852 Document Drive, Chicago, IL 60601",
    status: "Active",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-31",
    draftedAt: null,
    actionMessage: "Project group created",
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
  projectGroup: "TechCorp Solutions",
  vatNumber: "VAT123456789",
  website: "www.techcorp.com",
  phone: "+1-555-0123",
  currency: "USD",
  country: "United States",
  language: "English",
  street: "123 Tech Street, Silicon Valley, CA 94000",

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
    name: "projectGroup",
    label: "Project Group",
    component: "input",
    nextFocus: "vatNumber",
    tooltip: "Enter project group name",
    required: true,
  },
  {
    name: "vatNumber",
    label: "VAT Number",
    component: "input",
    placeholder: "Enter VAT number",
    nextFocus: "website",
    tooltip: "Enter the VAT registration number",
    required: true,
  },
  {
    name: "website",
    label: "Website",
    component: "input",
    placeholder: "Enter website URL",
    nextFocus: "phone",
    tooltip: "Enter the project group website",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    component: "input",
    placeholder: "Enter phone number",
    nextFocus: "currency",
    tooltip: "Enter contact phone number",
    required: true,
  },
  {
    name: "currency",
    label: "Currency",
    component: "autocomplete",
    placeholder: "Select currency",
    nextFocus: "country",
    tooltip: "Select the primary currency",
    options: [
      "USD",
      "EUR",
      "GBP",
      "JPY",
      "CAD",
      "AUD",
      "CHF",
      "CNY",
      "INR",
      "BRL",
    ],
    required: true,
  },
  {
    name: "country",
    label: "Country",
    component: "autocomplete",
    placeholder: "Select country",
    nextFocus: "language",
    tooltip: "Select the country",
    options: [
      "United States",
      "United Kingdom",
      "Canada",
      "Germany",
      "France",
      "Japan",
      "Australia",
      "India",
      "Brazil",
      "China",
    ],
    required: true,
  },
  {
    name: "language",
    label: "Language",
    component: "autocomplete",
    placeholder: "Select language",
    nextFocus: "street",
    tooltip: "Select the primary language",
    options: [
      "English",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Portuguese",
      "Chinese",
      "Japanese",
      "Korean",
      "Arabic",
    ],
    required: true,
  },
  {
    name: "street",
    label: "Street",
    component: "input",
    placeholder: "Enter street address",
    tooltip: "Enter the street address",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  projectGroup: "Project Group",
  vatNumber: "VAT Number",
  website: "Website",
  phone: "Phone",
  currency: "Currency",
  country: "Country",
  language: "Language",
  street: "Street",
};
