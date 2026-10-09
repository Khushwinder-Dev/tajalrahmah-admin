import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  foodName: string;
  variant: string;
  itemInformation: string;
  quantity: string;
  price: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  foodName: "",
  variant: "",
  itemInformation: "",
  quantity: "",
  price: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "foodName",
  "variant",
  "itemInformation",
  "quantity",
  "price",
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
  "foodName",
  "variant",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "foodName", title: "Food Name" },
  { key: "variant", title: "Variant" },
  { key: "itemInformation", title: "Item Information" },
  { key: "quantity", title: "Quantity" },
  { key: "price", title: "Price" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    foodName: "Chicken Biryani",
    variant: "Spicy",
    itemInformation: "Aromatic basmati rice with tender chicken pieces",
    quantity: "50",
    price: "450",
    status: "Active",
    createdAt: "2025-08-20",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Ready for production",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    foodName: "Beef Burger",
    variant: "Classic",
    itemInformation: "Juicy beef patty with lettuce, tomato, and cheese",
    quantity: "30",
    price: "350",
    status: "Active",
    createdAt: "2025-08-21",
    updatedAt: "2025-08-24",
    draftedAt: null,
    actionMessage: "In production",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    foodName: "Margherita Pizza",
    variant: "Regular",
    itemInformation: "Fresh mozzarella, tomato sauce, and basil",
    quantity: "25",
    price: "650",
    status: "Active",
    createdAt: "2025-08-19",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Production complete",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    foodName: "Chocolate Cake",
    variant: "Dark Chocolate",
    itemInformation: "Rich dark chocolate cake with chocolate ganache",
    quantity: "15",
    price: "280",
    status: "Draft",
    createdAt: "2025-08-18",
    updatedAt: "2025-08-25",
    draftedAt: "2025-08-20",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    foodName: "Caesar Salad",
    variant: "Chicken",
    itemInformation:
      "Fresh romaine lettuce with grilled chicken and caesar dressing",
    quantity: "40",
    price: "320",
    status: "Active",
    createdAt: "2025-08-17",
    updatedAt: "2025-08-24",
    draftedAt: null,
    actionMessage: "Ready to serve",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    foodName: "Fish Curry",
    variant: "Bengali Style",
    itemInformation: "Traditional Bengali fish curry with rice",
    quantity: "35",
    price: "380",
    status: "Active",
    createdAt: "2025-08-15",
    updatedAt: "2025-08-23",
    draftedAt: null,
    actionMessage: "Production ongoing",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    foodName: "Pasta Carbonara",
    variant: "Creamy",
    itemInformation: "Creamy pasta with bacon, eggs, and parmesan cheese",
    quantity: "20",
    price: "420",
    status: "Active",
    createdAt: "2025-08-14",
    updatedAt: "2025-08-22",
    draftedAt: null,
    actionMessage: "Ready for service",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    foodName: "Grilled Chicken",
    variant: "Herb Seasoned",
    itemInformation: "Tender grilled chicken with herb seasoning",
    quantity: "45",
    price: "480",
    status: "Active",
    createdAt: "2025-08-13",
    updatedAt: "2025-08-21",
    draftedAt: null,
    actionMessage: "Production complete",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    foodName: "Vegetable Soup",
    variant: "Mixed Vegetables",
    itemInformation: "Healthy mixed vegetable soup with herbs",
    quantity: "60",
    price: "180",
    status: "Active",
    createdAt: "2025-08-12",
    updatedAt: "2025-08-19",
    draftedAt: null,
    actionMessage: "Ready to serve",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    foodName: "Fried Rice",
    variant: "Chicken",
    itemInformation: "Wok-fried rice with chicken and vegetables",
    quantity: "55",
    price: "320",
    status: "Active",
    createdAt: "2025-08-11",
    updatedAt: "2025-08-18",
    draftedAt: null,
    actionMessage: "Production ongoing",
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
  foodName: "Chicken Biryani",
  variant: "Spicy",
  itemInformation:
    "Aromatic basmati rice with tender chicken pieces and traditional spices",
  quantity: "50",
  price: "450",

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
    name: "foodName",
    label: "Food Name",
    component: "input",
    nextFocus: "variant",
    tooltip: "Enter food item name",
    required: true,
  },
  {
    name: "variant",
    label: "Variant",
    component: "autocomplete",
    options: [
      "Spicy",
      "Mild",
      "Regular",
      "Extra Spicy",
      "Sweet",
      "Sour",
      "Classic",
      "Special",
    ],
    placeholder: " ",
    nextFocus: "itemInformation",
    tooltip: "Select or enter variant",
    required: true,
  },
  {
    name: "itemInformation",
    label: "Item Information",
    component: "input",
    nextFocus: "quantity",
    tooltip: "Enter detailed item information",
    required: true,
  },
  {
    name: "quantity",
    label: "Quantity",
    component: "input",
    type: "number",
    nextFocus: "price",
    tooltip: "Enter production quantity",
    required: true,
  },
  {
    name: "price",
    label: "Price",
    component: "input",
    type: "number",
    tooltip: "Enter price per unit",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  foodName: "Food Name",
  variant: "Variant",
  itemInformation: "Item Information",
  quantity: "Quantity",
  price: "Price",
};
