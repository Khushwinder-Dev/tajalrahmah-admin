/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";
import { getModuleFromPath } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import type { ModuleFieldsType } from "./ComponentLevelGridView";

type TabDataType = ModuleFieldsType & {
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

const fixedColumns = ["campaignCode", "position"];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TabDataType[] = [
  {
    id: "1",
    accessoryName: "Wireless Mouse",
    category: "Computer Accessories",
    supplier: "Tech Supplies Ltd",
    manufacturer: "Logitech",
    location: "Warehouse A - Shelf 3",
    modelNumber: "M325",
    orderNumber: "ORD-1001",
    purchaseCost: "1200",
    purchaseDate: "2025-07-15",
    quantity: "50",
    minQuantity: "10",
    forSell: "Yes",
    notes: "Ergonomic design, battery included",
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
    accessoryName: "Mechanical Keyboard",
    category: "Computer Accessories",
    supplier: "Input Devices Co",
    manufacturer: "Corsair",
    location: "Warehouse B - Shelf 1",
    modelNumber: "K70 RGB",
    orderNumber: "ORD-1002",
    purchaseCost: "3500",
    purchaseDate: "2025-07-20",
    quantity: "30",
    minQuantity: "5",
    forSell: "Yes",
    notes: "RGB backlight, Cherry MX switches",
    attachment: "JD_Keyboard.pdf",
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
    accessoryName: "USB-C Hub 7-in-1",
    category: "Laptop Accessories",
    supplier: "Gadget World",
    manufacturer: "Anker",
    location: "Warehouse A - Shelf 5",
    modelNumber: "AH321",
    orderNumber: "ORD-1003",
    purchaseCost: "2200",
    purchaseDate: "2025-08-01",
    quantity: "40",
    minQuantity: "8",
    forSell: "Yes",
    notes: "HDMI, USB 3.0, SD Card slot included",
    attachment: "JD_USBHub.pdf",
    status: "Active",
    createdAt: "2025-08-19",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Approved by Procurement",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    accessoryName: "Laptop Stand Adjustable",
    category: "Office Accessories",
    supplier: "Office Essentials Ltd",
    manufacturer: "Nexstand",
    location: "Warehouse C - Shelf 2",
    modelNumber: "NS100",
    orderNumber: "ORD-1004",
    purchaseCost: "1800",
    purchaseDate: "2025-07-28",
    quantity: "25",
    minQuantity: "5",
    forSell: "Yes",
    notes: "Portable, foldable design",
    attachment: "JD_LaptopStand.pdf",
    status: "Active",
    createdAt: "2025-08-18",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Ready for distribution",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    accessoryName: "External Hard Drive 1TB",
    category: "Storage Devices",
    supplier: "Storage Solutions",
    manufacturer: "Seagate",
    location: "Warehouse B - Shelf 4",
    modelNumber: "ST1000LM035",
    orderNumber: "ORD-1005",
    purchaseCost: "5000",
    purchaseDate: "2025-07-18",
    quantity: "20",
    minQuantity: "5",
    forSell: "Yes",
    notes: "Portable HDD, USB 3.0",
    attachment: "JD_HardDrive.pdf",
    status: "Active",
    createdAt: "2025-08-17",
    updatedAt: "2025-08-24",
    draftedAt: null,
    actionMessage: "Procurement complete",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    accessoryName: "Webcam Full HD",
    category: "Computer Accessories",
    supplier: "Tech Supplies Ltd",
    manufacturer: "Logitech",
    location: "Warehouse A - Shelf 6",
    modelNumber: "C920",
    orderNumber: "ORD-1006",
    purchaseCost: "4000",
    purchaseDate: "2025-08-05",
    quantity: "15",
    minQuantity: "3",
    forSell: "Yes",
    notes: "1080p video with stereo mic",
    attachment: "JD_Webcam.pdf",
    status: "Active",
    createdAt: "2025-08-15",
    updatedAt: "2025-08-23",
    draftedAt: null,
    actionMessage: "Deployed to teams",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    accessoryName: "Gaming Headset",
    category: "Audio Devices",
    supplier: "Gadget World",
    manufacturer: "HyperX",
    location: "Warehouse C - Shelf 3",
    modelNumber: "Cloud II",
    orderNumber: "ORD-1007",
    purchaseCost: "3500",
    purchaseDate: "2025-07-30",
    quantity: "18",
    minQuantity: "5",
    forSell: "Yes",
    notes: "Noise-cancelling mic, surround sound",
    attachment: "JD_Headset.pdf",
    status: "Draft",
    createdAt: "2025-08-14",
    updatedAt: "2025-08-22",
    draftedAt: "2025-08-20",
    actionMessage: "Awaiting budget approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    accessoryName: "Power Bank 10000mAh",
    category: "Mobile Accessories",
    supplier: "PowerTech Ltd",
    manufacturer: "Xiaomi",
    location: "Warehouse B - Shelf 2",
    modelNumber: "Mi10000",
    orderNumber: "ORD-1008",
    purchaseCost: "1500",
    purchaseDate: "2025-08-02",
    quantity: "60",
    minQuantity: "10",
    forSell: "Yes",
    notes: "Fast charging, compact design",
    attachment: "JD_PowerBank.pdf",
    status: "Active",
    createdAt: "2025-08-13",
    updatedAt: "2025-08-21",
    draftedAt: null,
    actionMessage: "Approved for retail",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    accessoryName: "Smartphone Stand",
    category: "Mobile Accessories",
    supplier: "Office Essentials Ltd",
    manufacturer: "Generic",
    location: "Warehouse C - Shelf 1",
    modelNumber: "SS01",
    orderNumber: "ORD-1009",
    purchaseCost: "500",
    purchaseDate: "2025-07-25",
    quantity: "80",
    minQuantity: "20",
    forSell: "Yes",
    notes: "Foldable, universal compatibility",
    attachment: "JD_PhoneStand.pdf",
    status: "Active",
    createdAt: "2025-08-12",
    updatedAt: "2025-08-19",
    draftedAt: null,
    actionMessage: "Stock ready",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    accessoryName: "HDMI Cable 2m",
    category: "Cables & Adapters",
    supplier: "Cable Pro Ltd",
    manufacturer: "Belkin",
    location: "Warehouse A - Shelf 8",
    modelNumber: "HD2M",
    orderNumber: "ORD-1010",
    purchaseCost: "300",
    purchaseDate: "2025-08-03",
    quantity: "100",
    minQuantity: "20",
    forSell: "Yes",
    notes: "High-speed HDMI, supports 4K",
    attachment: "JD_HDMICable.pdf",
    status: "Active",
    createdAt: "2025-08-11",
    updatedAt: "2025-08-18",
    draftedAt: null,
    actionMessage: "Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    accessoryName: "Portable SSD 512GB",
    category: "Storage Devices",
    supplier: "Storage Solutions",
    manufacturer: "Samsung",
    location: "Warehouse B - Shelf 5",
    modelNumber: "T7",
    orderNumber: "ORD-1011",
    purchaseCost: "7000",
    purchaseDate: "2025-07-22",
    quantity: "12",
    minQuantity: "3",
    forSell: "Yes",
    notes: "USB 3.2 Gen 2, ultra-fast transfer",
    attachment: "JD_SSD.pdf",
    status: "Active",
    createdAt: "2025-08-10",
    updatedAt: "2025-08-16",
    draftedAt: null,
    actionMessage: "Procured successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    accessoryName: "Wireless Earbuds",
    category: "Audio Devices",
    supplier: "Gadget World",
    manufacturer: "Sony",
    location: "Warehouse A - Shelf 7",
    modelNumber: "WF-1000XM4",
    orderNumber: "ORD-1012",
    purchaseCost: "8500",
    purchaseDate: "2025-08-04",
    quantity: "20",
    minQuantity: "4",
    forSell: "Yes",
    notes: "Noise cancellation, long battery life",
    attachment: "JD_Earbuds.pdf",
    status: "Active",
    createdAt: "2025-08-09",
    updatedAt: "2025-08-15",
    draftedAt: null,
    actionMessage: "Approved by CTO",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function ComponentLevelDataTableView({
  viewMode,
  setViewMode,
  dataTableFilter,
  searchQuery,
  setShowExport,
  showExport,
  setShowFilter,
  showFilter,
  setShowVisibility,
  showVisibility,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
  searchQuery: string;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);
  const canCreate = usePermission(detectedModule, "create");

  console.log("table view", location.pathname);

  const columnSchema: ColumnConfig[] = [
    { key: "accessoryName", title: "Accessory Name" },
    { key: "category", title: "Category" },
    { key: "supplier", title: "Supplier" },
    { key: "manufacturer", title: "Manufacturer" },
    { key: "location", title: "Location" },
    { key: "modelNumber", title: "Model Number" },
    { key: "orderNumber", title: "Order Number" },
    { key: "purchaseCost", title: "Purchase Cost" },
    { key: "purchaseDate", title: "Purchase Date" },
    { key: "quantity", title: "Quantity" },
    { key: "minQuantity", title: "Minimum Quantity" },
    { key: "forSell", title: "For Sell" },
    { key: "notes", title: "Notes" },

    // same for all module so you dont have to change this part
    { key: "createdAt", title: "Created", type: "date", readOnly: true },
    { key: "updatedAt", title: "Updated", type: "date", readOnly: true },
    { key: "draftedAt", title: "Drafted", type: "date", readOnly: true },
  ];

  const componentColumns = columnSchema.map((schema) =>
    buildColumn(schema, MOCK_TABLE_DATA, canCreate)
  );

  const filteredData = MOCK_TABLE_DATA.filter((leave) => {
    if (dataTableFilter.status === "Active") {
      return leave.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !leave.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return leave.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return leave.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return leave.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={fixedColumns}
      pathName={location.pathname.split("/")[1]}
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}

type ColumnConfig = {
  key: string;
  title: string;
  type?: "string" | "number" | "date"; // to handle sorting/filtering differently
  size?: number;
  minSize?: number;
  readOnly?: boolean;
};

const buildColumn = (config: ColumnConfig, data: any[], canCreate: boolean) => {
  const {
    key,
    title,
    type = "string",
    size = 200,
    minSize = 150,
    readOnly,
  } = config;

  // Unique options for dropdown filter
  const options =
    type === "date"
      ? []
      : [...new Set(data.map((item) => item[key]).filter(Boolean))];

  // Filtering logic
  const filterFn = (row: any, columnId: string, filterValue: any) => {
    if (!filterValue || filterValue.length === 0) return true;
    const cellValue = row.getValue(columnId);

    if (type === "date") {
      if (!cellValue) return false;
      const formatted = new Date(cellValue).toISOString().split("T")[0];
      return filterValue.includes(formatted);
    }

    return filterValue.some((fv: string) =>
      String(cellValue).toLowerCase().includes(fv.toLowerCase())
    );
  };

  // Sorting logic
  const sortingFn =
    type === "date"
      ? (row1: any, row2: any) =>
          new Date(row1.getValue(key)).getTime() -
          new Date(row2.getValue(key)).getTime()
      : (row1: any, row2: any) =>
          String(row1.getValue(key)).localeCompare(String(row2.getValue(key)));

  return {
    accessorKey: key,
    title,
    options,
    filterFn,
    sortingFn,
    size,
    minSize,
    meta: {
      exportLabel: key,
      readOnly: readOnly ?? !canCreate,
    },
  };
};
