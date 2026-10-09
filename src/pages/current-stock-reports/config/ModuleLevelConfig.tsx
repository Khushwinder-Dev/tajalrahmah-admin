import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  code: string;
  itemName: string;
  category: string;
  brand: string;
  unitPrice: string;
  salesPrice: string;
  openingStock: string;
  currentStock: string;
  value: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  code: "",
  itemName: "",
  category: "",
  brand: "",
  unitPrice: "",
  salesPrice: "",
  openingStock: "",
  currentStock: "",
  value: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = ["code", "itemName"];

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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["code"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "code", title: "Code" },
  { key: "itemName", title: "Item Name" },
  { key: "category", title: "Category" },
  { key: "brand", title: "Brand" },
  { key: "unitPrice", title: "Unit Price" },
  { key: "salesPrice", title: "Sales Price" },
  { key: "openingStock", title: "Opening Stock" },
  { key: "currentStock", title: "Current Stock" },
  { key: "value", title: "Value" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    code: "C-1001",
    itemName: "Item 1",
    category: "Category 1",
    brand: "Brand 1",
    unitPrice: "100",
    salesPrice: "200",
    openingStock: "10",
    currentStock: "5",
    value: "500",
    status: "Active",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "Checked in",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    code: "C-1002",
    itemName: "Item 2",
    category: "Category 2",
    brand: "Brand 2",
    unitPrice: "120",
    salesPrice: "220",
    openingStock: "15",
    currentStock: "8",
    value: "1760",
    status: "Draft",
    createdAt: "2025-09-03T09:30:00Z",
    updatedAt: "2025-09-03T10:15:00Z",
    draftedAt: "2025-09-03T09:45:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    code: "C-1003",
    itemName: "Item 3",
    category: "Category 3",
    brand: "Brand 3",
    unitPrice: "90",
    salesPrice: "180",
    openingStock: "20",
    currentStock: "10",
    value: "1800",
    status: "Deleted",
    createdAt: "2025-08-25T08:00:00Z",
    updatedAt: "2025-08-26T08:30:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "4",
    code: "C-1004",
    itemName: "Item 4",
    category: "Category 4",
    brand: "Brand 4",
    unitPrice: "140",
    salesPrice: "250",
    openingStock: "12",
    currentStock: "6",
    value: "1500",
    status: "Updated",
    createdAt: "2025-09-05T11:20:00Z",
    updatedAt: "2025-09-06T14:00:00Z",
    draftedAt: null,
    actionMessage: "Stock updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    code: "C-1005",
    itemName: "Item 5",
    category: "Category 5",
    brand: "Brand 5",
    unitPrice: "200",
    salesPrice: "350",
    openingStock: "8",
    currentStock: "3",
    value: "1050",
    status: "Active",
    createdAt: "2025-09-07T15:00:00Z",
    updatedAt: "2025-09-07T16:10:00Z",
    draftedAt: null,
    actionMessage: "Follow-up stock added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    code: "C-1006",
    itemName: "Item 6",
    category: "Category 6",
    brand: "Brand 6",
    unitPrice: "75",
    salesPrice: "150",
    openingStock: "30",
    currentStock: "20",
    value: "3000",
    status: "Draft",
    createdAt: "2025-09-08T10:00:00Z",
    updatedAt: "2025-09-08T10:30:00Z",
    draftedAt: "2025-09-08T10:10:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    code: "C-1007",
    itemName: "Item 7",
    category: "Category 7",
    brand: "Brand 7",
    unitPrice: "160",
    salesPrice: "300",
    openingStock: "18",
    currentStock: "12",
    value: "3600",
    status: "Active",
    createdAt: "2025-09-09T09:00:00Z",
    updatedAt: "2025-09-09T10:45:00Z",
    draftedAt: null,
    actionMessage: "Checked in",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    code: "C-1008",
    itemName: "Item 8",
    category: "Category 8",
    brand: "Brand 8",
    unitPrice: "110",
    salesPrice: "210",
    openingStock: "25",
    currentStock: "15",
    value: "3150",
    status: "Deleted",
    createdAt: "2025-08-30T13:00:00Z",
    updatedAt: "2025-08-30T14:00:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "9",
    code: "C-1009",
    itemName: "Item 9",
    category: "Category 9",
    brand: "Brand 9",
    unitPrice: "95",
    salesPrice: "190",
    openingStock: "14",
    currentStock: "9",
    value: "1710",
    status: "Updated",
    createdAt: "2025-09-02T11:00:00Z",
    updatedAt: "2025-09-02T12:15:00Z",
    draftedAt: null,
    actionMessage: "Item info updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    code: "C-1010",
    itemName: "Item 10",
    category: "Category 10",
    brand: "Brand 10",
    unitPrice: "300",
    salesPrice: "500",
    openingStock: "6",
    currentStock: "2",
    value: "1000",
    status: "Active",
    createdAt: "2025-09-04T14:00:00Z",
    updatedAt: "2025-09-04T15:20:00Z",
    draftedAt: null,
    actionMessage: "Operation scheduled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    code: "C-1011",
    itemName: "Item 11",
    category: "Category 11",
    brand: "Brand 11",
    unitPrice: "130",
    salesPrice: "260",
    openingStock: "16",
    currentStock: "11",
    value: "2860",
    status: "Draft",
    createdAt: "2025-09-06T09:30:00Z",
    updatedAt: "2025-09-06T10:00:00Z",
    draftedAt: "2025-09-06T09:45:00Z",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    code: "C-1012",
    itemName: "Item 12",
    category: "Category 12",
    brand: "Brand 12",
    unitPrice: "220",
    salesPrice: "400",
    openingStock: "22",
    currentStock: "18",
    value: "7200",
    status: "Active",
    createdAt: "2025-09-10T10:00:00Z",
    updatedAt: "2025-09-10T11:10:00Z",
    draftedAt: null,
    actionMessage: "Checked in",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  code: "Code",
  itemName: "Item Name",
  category: "Category",
  brand: "Brand",
  unitPrice: "Unit Price",
  salesPrice: "Sales Price",
  openingStock: "Opening Stock",
  currentStock: "Current Stock",
  value: "Value",
};
