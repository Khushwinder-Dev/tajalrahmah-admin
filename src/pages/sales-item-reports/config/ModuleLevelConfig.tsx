import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  invoiceNo: string;
  customer: string;
  salesDate: string;
  item: string;
  quantity: string;
  unitPrice: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  invoiceNo: "",
  customer: "",
  salesDate: "",
  item: "",
  quantity: "",
  unitPrice: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = ["invoiceNo"];

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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["invoiceNo", "customer"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "invoiceNo", title: "Invoice Number" },
  { key: "customer", title: "Customer" },
  { key: "salesDate", title: "Sales Date" },
  { key: "item", title: "Item" },
  { key: "quantity", title: "Quantity" },
  { key: "unitPrice", title: "Unit Price" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    invoiceNo: "INV-1001",
    customer: "John Doe",
    salesDate: "2025-09-01",
    item: "Item A",
    quantity: "2",
    unitPrice: "100",
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
    invoiceNo: "INV-1002",
    customer: "Jane Smith",
    salesDate: "2025-09-02",
    item: "Item B",
    quantity: "5",
    unitPrice: "150",
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
    invoiceNo: "INV-1003",
    customer: "Michael Lee",
    salesDate: "2025-09-03",
    item: "Item C",
    quantity: "3",
    unitPrice: "200",
    status: "Deleted",
    createdAt: "2025-09-04T08:00:00Z",
    updatedAt: "2025-09-04T09:30:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "4",
    invoiceNo: "INV-1004",
    customer: "Sarah Khan",
    salesDate: "2025-09-04",
    item: "Item D",
    quantity: "7",
    unitPrice: "180",
    status: "Updated",
    createdAt: "2025-09-05T11:20:00Z",
    updatedAt: "2025-09-06T14:00:00Z",
    draftedAt: null,
    actionMessage: "Invoice updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    invoiceNo: "INV-1005",
    customer: "David Miller",
    salesDate: "2025-09-05",
    item: "Item E",
    quantity: "10",
    unitPrice: "250",
    status: "Active",
    createdAt: "2025-09-07T15:00:00Z",
    updatedAt: "2025-09-07T16:10:00Z",
    draftedAt: null,
    actionMessage: "Order confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    invoiceNo: "INV-1006",
    customer: "Emily Davis",
    salesDate: "2025-09-06",
    item: "Item F",
    quantity: "4",
    unitPrice: "300",
    status: "Draft",
    createdAt: "2025-09-08T10:00:00Z",
    updatedAt: "2025-09-08T10:30:00Z",
    draftedAt: "2025-09-08T10:10:00Z",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    invoiceNo: "INV-1007",
    customer: "Robert Brown",
    salesDate: "2025-09-07",
    item: "Item G",
    quantity: "6",
    unitPrice: "120",
    status: "Active",
    createdAt: "2025-09-09T09:00:00Z",
    updatedAt: "2025-09-09T10:45:00Z",
    draftedAt: null,
    actionMessage: "Payment received",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    invoiceNo: "INV-1008",
    customer: "Sophia Wilson",
    salesDate: "2025-09-08",
    item: "Item H",
    quantity: "8",
    unitPrice: "400",
    status: "Deleted",
    createdAt: "2025-09-10T13:00:00Z",
    updatedAt: "2025-09-10T14:00:00Z",
    draftedAt: null,
    actionMessage: "Invoice cancelled",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "9",
    invoiceNo: "INV-1009",
    customer: "Liam Johnson",
    salesDate: "2025-09-09",
    item: "Item I",
    quantity: "9",
    unitPrice: "220",
    status: "Updated",
    createdAt: "2025-09-11T11:00:00Z",
    updatedAt: "2025-09-11T12:15:00Z",
    draftedAt: null,
    actionMessage: "Customer info updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    invoiceNo: "INV-1010",
    customer: "Olivia Martinez",
    salesDate: "2025-09-10",
    item: "Item J",
    quantity: "12",
    unitPrice: "500",
    status: "Active",
    createdAt: "2025-09-12T14:00:00Z",
    updatedAt: "2025-09-12T15:20:00Z",
    draftedAt: null,
    actionMessage: "Order shipped",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    invoiceNo: "INV-1011",
    customer: "William Clark",
    salesDate: "2025-09-11",
    item: "Item K",
    quantity: "5",
    unitPrice: "350",
    status: "Draft",
    createdAt: "2025-09-13T09:30:00Z",
    updatedAt: "2025-09-13T10:00:00Z",
    draftedAt: "2025-09-13T09:45:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    invoiceNo: "INV-1012",
    customer: "Emma White",
    salesDate: "2025-09-12",
    item: "Item L",
    quantity: "15",
    unitPrice: "280",
    status: "Active",
    createdAt: "2025-09-14T10:00:00Z",
    updatedAt: "2025-09-14T11:10:00Z",
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
  invoiceNo: "Invoice No",
  customer: "Customer",
  salesDate: "Sales Date",
  item: "Item",
  quantity: "Quantity",
  unitPrice: "Unit Price",
};
