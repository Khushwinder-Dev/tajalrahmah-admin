import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  medicineName: string;
  categoryName: string;
  description: string;
  price: string;
  manufacturedBy: string;
  status: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  medicineName: "",
  categoryName: "",
  description: "",
  price: "",
  manufacturedBy: "",
  status: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "medicineName",
  "categoryName",
  "description",
  "price",
  "manufacturedBy",
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
  "medicineName",
  "categoryName",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "medicineName", title: "Medicine Name" },
  { key: "categoryName", title: "Category Name" },
  { key: "description", title: "Description" },
  { key: "price", title: "Price" },
  { key: "manufacturedBy", title: "Manufactured By" },
  { key: "status", title: "Status" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    medicineName: "Paracetamol 500mg",
    categoryName: "Analgesic",
    description: "Pain relief and fever reducer tablet for adults and children",
    price: "50.00",
    manufacturedBy: "Square Pharmaceuticals Ltd.",
    status: "Available",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-05",
    draftedAt: null,
    actionMessage: "Stock updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    medicineName: "Amoxicillin 250mg",
    categoryName: "Antibiotic",
    description: "Broad-spectrum antibiotic for bacterial infections",
    price: "120.00",
    manufacturedBy: "Beximco Pharmaceuticals Ltd.",
    status: "Available",
    createdAt: "2025-09-02",
    updatedAt: "2025-09-06",
    draftedAt: null,
    actionMessage: "Price updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    medicineName: "Omeprazole 20mg",
    categoryName: "Antacid",
    description: "Proton pump inhibitor for gastric acid reduction",
    price: "85.00",
    manufacturedBy: "Incepta Pharmaceuticals Ltd.",
    status: "Low Stock",
    createdAt: "2025-09-03",
    updatedAt: "2025-09-07",
    draftedAt: null,
    actionMessage: "Stock alert",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    medicineName: "Metformin 500mg",
    categoryName: "Antidiabetic",
    description: "Type 2 diabetes medication for blood sugar control",
    price: "75.00",
    manufacturedBy: "Opsonin Pharma Ltd.",
    status: "Available",
    createdAt: "2025-09-04",
    updatedAt: "2025-09-08",
    draftedAt: null,
    actionMessage: "New batch received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    medicineName: "Cetirizine 10mg",
    categoryName: "Antihistamine",
    description: "Allergy relief medication for hay fever and urticaria",
    price: "45.00",
    manufacturedBy: "ACI Limited",
    status: "Out of Stock",
    createdAt: "2025-09-05",
    updatedAt: "2025-09-09",
    draftedAt: null,
    actionMessage: "Reorder required",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    medicineName: "Losartan 50mg",
    categoryName: "Antihypertensive",
    description: "ACE inhibitor for high blood pressure management",
    price: "95.00",
    manufacturedBy: "Renata Limited",
    status: "Available",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-10",
    draftedAt: null,
    actionMessage: "Quality checked",
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
  medicineName: "Aspirin 300mg",
  categoryName: "Analgesic",
  description: "Anti-inflammatory and pain relief medication",
  price: "60.00",
  manufacturedBy: "Aristopharma Ltd.",
  status: "Available",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

// add item for your necessary fields
export const formFields: FieldConfig[] = [
  {
    name: "medicineName",
    label: "Medicine Name",
    component: "input",
    nextFocus: "categoryName",
    tooltip: "Enter medicine name with dosage",
    required: true,
  },
  {
    name: "categoryName",
    label: "Category Name",
    component: "autocomplete",
    options: [
      "Analgesic",
      "Antibiotic",
      "Antacid",
      "Antidiabetic",
      "Antihistamine",
      "Antihypertensive",
      "Cardiovascular",
      "Respiratory",
      "Dermatological",
      "Neurological",
      "Gastrointestinal",
      "Vitamin & Mineral",
    ],
    placeholder: " ",
    nextFocus: "description",
    tooltip: "Select medicine category",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    nextFocus: "price",
    tooltip: "Enter detailed medicine description and usage",
    required: true,
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    component: "input",
    nextFocus: "manufacturedBy",
    tooltip: "Enter medicine price in BDT",
    required: true,
  },
  {
    name: "manufacturedBy",
    label: "Manufactured By",
    component: "autocomplete",
    options: [
      "Square Pharmaceuticals Ltd.",
      "Beximco Pharmaceuticals Ltd.",
      "Incepta Pharmaceuticals Ltd.",
      "Opsonin Pharma Ltd.",
      "ACI Limited",
      "Renata Limited",
      "Aristopharma Ltd.",
      "Drug International Ltd.",
      "Healthcare Pharmaceuticals Ltd.",
      "General Pharmaceuticals Ltd.",
    ],
    placeholder: " ",
    nextFocus: "status",
    tooltip: "Select or enter manufacturer name",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    component: "autocomplete",
    options: [
      "Available",
      "Low Stock",
      "Out of Stock",
      "Discontinued",
      "Pending Approval",
      "Expired",
    ],
    placeholder: " ",
    tooltip: "Select medicine availability status",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  medicineName: "Medicine Name",
  categoryName: "Category Name",
  description: "Description",
  price: "Price",
  manufacturedBy: "Manufactured By",
  status: "Status",
};
