import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  consumableName: string;
  category: string;
  supplier: string;
  manufacturer: string;
  location: string;
  modelNumber: string;
  orderNumber: string;
  purchaseCost: string;
  purchaseDate: string;
  quantity: string;
  minimumQuantity: string;
  forSell: string;
  notes: string;

  attachment: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  consumableName: "",
  category: "",
  supplier: "",
  manufacturer: "",
  location: "",
  modelNumber: "",
  orderNumber: "",
  purchaseCost: "",
  purchaseDate: "",
  quantity: "",
  minimumQuantity: "",
  forSell: "",
  attachment: "",
  notes: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "consumableName",
  "category",
  "supplier",
  "manufacturer",
  "location",
  "modelNumber",
  "orderNumber",
  "purchaseCost",
  "purchaseDate",
  "quantity",
  "minimumQuantity",
  "forSell",
  "notes",
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
  "consumableName",
  "category",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "consumableName", title: "Consumable Name" },
  { key: "category", title: "Category" },
  { key: "supplier", title: "Supplier" },
  { key: "manufacturer", title: "Manufacturer" },
  { key: "location", title: "Location" },
  { key: "modelNumber", title: "Model Number" },
  { key: "orderNumber", title: "Order Number" },
  { key: "purchaseCost", title: "Purchase Cost" },
  { key: "purchaseDate", title: "Purchase Date" },
  { key: "quantity", title: "Quantity" },
  { key: "minimumQuantity", title: "Minimum Quantity" },
  { key: "forSell", title: "For Sell" },
  { key: "attachment", title: "Attachment" },
  { key: "notes", title: "Notes" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    consumableName: "Ceiling Fan",
    category: "Electrical",
    supplier: "ABC Suppliers",
    manufacturer: "Conion",
    location: "Warehouse 1",
    modelNumber: "CF-123",
    orderNumber: "ORD-456",
    purchaseCost: "2500",
    purchaseDate: "2025-08-28",
    quantity: "100",
    minimumQuantity: "10",
    forSell: "Yes",
    notes: "Check stock regularly",
    attachment: "JD_Frontend.pdf",
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
    consumableName: "Light Bulb",
    category: "Electrical",
    supplier: "XYZ Suppliers",
    manufacturer: "Philips",
    location: "Warehouse 2",
    modelNumber: "LB-456",
    orderNumber: "ORD-789",
    purchaseCost: "150",
    purchaseDate: "2025-08-25",
    quantity: "500",
    minimumQuantity: "50",
    forSell: "Yes",
    notes: "Fragile, handle with care",
    attachment: "LB_manual.pdf",
    status: "Draft",
    createdAt: "2025-08-18",
    updatedAt: "2025-08-22",
    draftedAt: "2025-08-19",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    consumableName: "Fan",
    category: "Electrical",
    supplier: "XYZ Suppliers",
    manufacturer: "Conion",
    location: "Warehouse 3",
    modelNumber: "FAN-789",
    orderNumber: "ORD-123",
    purchaseCost: "2000",
    purchaseDate: "2025-08-22",
    quantity: "200",
    minimumQuantity: "20",
    forSell: "Yes",
    notes: "Check stock regularly",
    attachment: "JD_Frontend.pdf",
    status: "Deleted",
    createdAt: "2025-08-15",
    updatedAt: "2025-08-20",
    draftedAt: null,
    actionMessage: "Deleted by HR",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "4",
    consumableName: "Fan",
    category: "Electrical",
    supplier: "XYZ Suppliers",
    manufacturer: "Conion",
    location: "Warehouse 3",
    modelNumber: "FAN-789",
    orderNumber: "ORD-123",
    purchaseCost: "2000",
    purchaseDate: "2025-08-22",
    quantity: "200",
    minimumQuantity: "20",
    forSell: "Yes",
    notes: "Check stock regularly",
    attachment: "JD_Frontend.pdf",
    status: "Updated",
    createdAt: "2025-08-15",
    updatedAt: "2025-08-20",
    draftedAt: null,
    actionMessage: "Updated by HR",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    consumableName: "Air Conditioner",
    category: "Electrical",
    supplier: "CoolAir Ltd",
    manufacturer: "Samsung",
    location: "Warehouse 4",
    modelNumber: "AC-101",
    orderNumber: "ORD-567",
    purchaseCost: "35000",
    purchaseDate: "2025-07-30",
    quantity: "50",
    minimumQuantity: "5",
    forSell: "Yes",
    notes: "Seasonal stock",
    attachment: "AC_manual.pdf",
    status: "Active",
    createdAt: "2025-07-31",
    updatedAt: "2025-08-05",
    draftedAt: null,
    actionMessage: "Stock updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    consumableName: "Refrigerator",
    category: "Electrical",
    supplier: "HomeAppliance Co",
    manufacturer: "LG",
    location: "Warehouse 5",
    modelNumber: "RF-202",
    orderNumber: "ORD-678",
    purchaseCost: "45000",
    purchaseDate: "2025-07-25",
    quantity: "30",
    minimumQuantity: "3",
    forSell: "Yes",
    notes: "Check temperature regularly",
    attachment: "RF_manual.pdf",
    status: "Active",
    createdAt: "2025-07-26",
    updatedAt: "2025-08-01",
    draftedAt: null,
    actionMessage: "New stock added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    consumableName: "Microwave Oven",
    category: "Electrical",
    supplier: "Kitchen Supplies Ltd",
    manufacturer: "Panasonic",
    location: "Warehouse 6",
    modelNumber: "MW-303",
    orderNumber: "ORD-789",
    purchaseCost: "12000",
    purchaseDate: "2025-08-01",
    quantity: "80",
    minimumQuantity: "8",
    forSell: "Yes",
    notes: "Handle carefully",
    attachment: "MW_manual.pdf",
    status: "Draft",
    createdAt: "2025-08-02",
    updatedAt: "2025-08-10",
    draftedAt: "2025-08-05",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    consumableName: "Water Heater",
    category: "Electrical",
    supplier: "WarmHome Ltd",
    manufacturer: "Ariston",
    location: "Warehouse 7",
    modelNumber: "WH-404",
    orderNumber: "ORD-890",
    purchaseCost: "8000",
    purchaseDate: "2025-07-20",
    quantity: "60",
    minimumQuantity: "6",
    forSell: "Yes",
    notes: "Check installation",
    attachment: "WH_manual.pdf",
    status: "Active",
    createdAt: "2025-07-21",
    updatedAt: "2025-07-30",
    draftedAt: null,
    actionMessage: "Stock verified",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    consumableName: "LED TV",
    category: "Electrical",
    supplier: "Vision Electronics",
    manufacturer: "Sony",
    location: "Warehouse 8",
    modelNumber: "TV-505",
    orderNumber: "ORD-901",
    purchaseCost: "40000",
    purchaseDate: "2025-07-15",
    quantity: "40",
    minimumQuantity: "4",
    forSell: "Yes",
    notes: "Display in showroom",
    attachment: "TV_manual.pdf",
    status: "Draft",
    createdAt: "2025-07-16",
    updatedAt: "2025-07-25",
    draftedAt: "2025-07-17",
    actionMessage: "Pending display",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    consumableName: "Exhaust Fan",
    category: "Electrical",
    supplier: "ABC Suppliers",
    manufacturer: "Conion",
    location: "Warehouse 9",
    modelNumber: "EF-606",
    orderNumber: "ORD-012",
    purchaseCost: "2200",
    purchaseDate: "2025-08-05",
    quantity: "120",
    minimumQuantity: "12",
    forSell: "Yes",
    notes: "Check blades",
    attachment: "EF_manual.pdf",
    status: "Active",
    createdAt: "2025-08-06",
    updatedAt: "2025-08-15",
    draftedAt: null,
    actionMessage: "Stock verified",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    consumableName: "Ceiling Lamp",
    category: "Electrical",
    supplier: "Lighting Co",
    manufacturer: "Philips",
    location: "Warehouse 10",
    modelNumber: "CL-707",
    orderNumber: "ORD-123",
    purchaseCost: "1800",
    purchaseDate: "2025-08-08",
    quantity: "150",
    minimumQuantity: "15",
    forSell: "Yes",
    notes: "Handle with care",
    attachment: "CL_manual.pdf",
    status: "Active",
    createdAt: "2025-08-09",
    updatedAt: "2025-08-16",
    draftedAt: null,
    actionMessage: "Stock updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    consumableName: "Table Lamp",
    category: "Electrical",
    supplier: "Lighting Co",
    manufacturer: "Philips",
    location: "Warehouse 10",
    modelNumber: "TL-808",
    orderNumber: "ORD-234",
    purchaseCost: "1200",
    purchaseDate: "2025-08-10",
    quantity: "200",
    minimumQuantity: "20",
    forSell: "Yes",
    notes: "Check stock regularly",
    attachment: "TL_manual.pdf",
    status: "Draft",
    createdAt: "2025-08-11",
    updatedAt: "2025-08-15",
    draftedAt: "2025-08-12",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
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
  consumableName: "Ceiling Fan",
  category: "Electrical",
  supplier: "ABC Suppliers",
  manufacturer: "Conion",
  location: "Warehouse 1",
  modelNumber: "CF-123",
  orderNumber: "ORD-456",
  purchaseCost: "2500",
  purchaseDate: "2025-08-28",
  quantity: "100",
  minimumQuantity: "10",
  forSell: "Yes",
  notes: "Check stock regularly",
  attachment: "JD_Frontend.pdf",

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
    name: "consumableName",
    label: "Consumable Name",
    component: "input",
    nextFocus: "category",
    tooltip: "Enter consumable name",
    required: true,
  },
  {
    name: "category",
    label: "Category",
    component: "autocomplete",
    options: [
      "Electrical",
      "Mechanical",
      "Plumbing",
      "Carpentry",
      "Painting",
      "Cleaning",
    ],
    nextFocus: "supplier",
    tooltip: "Enter category",
    required: true,
  },
  {
    name: "supplier",
    label: "Supplier",
    component: "autocomplete",
    options: ["ABC Suppliers", "XYZ Supplies", "Tech Supplies Ltd"],
    nextFocus: "manufacturer",
    tooltip: "Enter supplier",
    required: true,
  },
  {
    name: "manufacturer",
    label: "Manufacturer",
    component: "autocomplete",
    options: ["ABC Suppliers", "XYZ Supplies", "Tech Supplies Ltd"],
    nextFocus: "location",
    tooltip: "Enter manufacturer",
    required: true,
  },
  {
    name: "location",
    label: "Location",
    component: "input",
    nextFocus: "modelNumber",
    tooltip: "Enter location",
    required: true,
  },
  {
    name: "modelNumber",
    label: "Model Number",
    component: "input",
    nextFocus: "orderNumber",
    tooltip: "Enter model number",
    required: true,
  },
  {
    name: "orderNumber",
    label: "Order Number",
    component: "input",
    nextFocus: "purchaseCost",
    tooltip: "Enter order number",
    required: true,
  },
  {
    name: "purchaseCost",
    label: "Purchase Cost",
    component: "input",
    nextFocus: "purchaseDate",
    tooltip: "Enter purchase cost",
    required: true,
  },
  {
    name: "purchaseDate",
    label: "Purchase Date",
    component: "input",
    nextFocus: "quantity",
    tooltip: "Enter purchase date",
    required: true,
    type: "date",
  },
  {
    name: "quantity",
    label: "Quantity",
    component: "input",
    nextFocus: "minimumQuantity",
    tooltip: "Enter quantity",
    required: true,
  },
  {
    name: "minimumQuantity",
    label: "Minimum Quantity",
    component: "input",
    nextFocus: "forSell",
    tooltip: "Enter minimum quantity",
    required: true,
  },
  {
    name: "forSell",
    label: "For Sell",
    component: "autocomplete",
    options: ["Yes", "No"],
    nextFocus: "notes",
    tooltip: "Enter for sell",
    required: true,
  },
  {
    name: "notes",
    label: "Notes",
    component: "input",
    nextFocus: "attachment",
    tooltip: "Enter notes",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  consumableName: "Consumable Name",
  category: "Category",
  supplier: "Supplier",
  manufacturer: "Manufacturer",
  location: "Location",
  modelNumber: "Model Number",
  orderNumber: "Order Number",
  purchaseCost: "Purchase Cost",
  purchaseDate: "Purchase Date",
  quantity: "Quantity",
  minimumQuantity: "Minimum Quantity",
  forSell: "For Sell",
  notes: "Notes",
  attachment: "Attachment",
};
