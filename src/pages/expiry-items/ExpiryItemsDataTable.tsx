/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useExpiryItemsPermissions } from "@/hooks/usePermissions";

// Expiry Items data table types and mock data
interface ExpiryItem {
  id: string;
  itemName: string;
  batchNumber: string;
  expiryDate: string; // ISO date
  quantity: number;
  unit: string;
  location: string;
  category: string;
  supplier: string;
  status: "Active" | "Inactive" | "Draft" | "Deleted" | "Updated";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockExpiryItems: ExpiryItem[] = [
  {
    id: "1",
    itemName: "Paracetamol 500mg",
    batchNumber: "BCH-2024-001",
    expiryDate: "2025-03-15",
    quantity: 100,
    unit: "Tablets",
    location: "Warehouse A",
    category: "Medicine",
    supplier: "ABC Pharmaceuticals",
    status: "Active",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-20",
    draftedAt: "2025-01-14",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    itemName: "Ibuprofen 400mg",
    batchNumber: "BCH-2024-002",
    expiryDate: "2025-06-20",
    quantity: 50,
    unit: "Tablets",
    location: "Warehouse B",
    category: "Medicine",
    supplier: "XYZ Medical",
    status: "Active",
    createdAt: "2025-01-16",
    updatedAt: "2025-01-21",
    draftedAt: "2025-01-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "Today",
  },
  {
    id: "3",
    itemName: "Vitamin C 1000mg",
    batchNumber: "BCH-2024-003",
    expiryDate: "2025-12-10",
    quantity: 200,
    unit: "Capsules",
    location: "Store 1",
    category: "Supplements",
    supplier: "Health Plus",
    status: "Draft",
    createdAt: "2025-01-17",
    updatedAt: "2025-01-22",
    draftedAt: "2025-01-16",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "2 days ago",
  },
  {
    id: "4",
    itemName: "Bandages 5cm",
    batchNumber: "BCH-2024-004",
    expiryDate: "2026-01-30",
    quantity: 25,
    unit: "Pieces",
    location: "Warehouse A",
    category: "Medical Supplies",
    supplier: "MedSupply Co",
    status: "Inactive",
    createdAt: "2025-01-18",
    updatedAt: "2025-01-23",
    draftedAt: "2025-01-17",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "1 day ago",
  },
  {
    id: "5",
    itemName: "Antiseptic Solution",
    batchNumber: "BCH-2024-005",
    expiryDate: "2025-08-15",
    quantity: 10,
    unit: "Bottles",
    location: "Store 2",
    category: "Medical Supplies",
    supplier: "CleanCare Ltd",
    status: "Deleted",
    createdAt: "2025-01-19",
    updatedAt: "2025-01-24",
    draftedAt: "2025-01-18",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "3 days ago",
  },
  {
    id: "6",
    itemName: "Surgical Gloves",
    batchNumber: "BCH-2024-006",
    expiryDate: "2025-11-25",
    quantity: 500,
    unit: "Pairs",
    location: "Warehouse B",
    category: "Medical Supplies",
    supplier: "SafeHands Inc",
    status: "Updated",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-25",
    draftedAt: "2025-01-19",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "4 days ago",
  },
  {
    id: "7",
    itemName: "Thermometer Digital",
    batchNumber: "BCH-2024-007",
    expiryDate: "2026-02-14",
    quantity: 15,
    unit: "Units",
    location: "Store 1",
    category: "Medical Equipment",
    supplier: "TechMed Solutions",
    status: "Updated",
    createdAt: "2025-01-21",
    updatedAt: "2025-01-26",
    draftedAt: "2025-01-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "4 days ago",
  },
  {
    id: "8",
    itemName: "Blood Pressure Monitor",
    batchNumber: "BCH-2024-008",
    expiryDate: "2025-09-30",
    quantity: 5,
    unit: "Units",
    location: "Warehouse A",
    category: "Medical Equipment",
    supplier: "Precision Health",
    status: "Updated",
    createdAt: "2025-01-22",
    updatedAt: "2025-01-27",
    draftedAt: "2025-01-21",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "4 days ago",
  },
  {
    id: "9",
    itemName: "Multivitamin Complex",
    batchNumber: "BCH-2024-009",
    expiryDate: "2025-07-18",
    quantity: 75,
    unit: "Bottles",
    location: "Store 2",
    category: "Supplements",
    supplier: "VitaLife Corp",
    status: "Updated",
    createdAt: "2025-01-23",
    updatedAt: "2025-01-28",
    draftedAt: "2025-01-22",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "4 days ago",
  },
  {
    id: "10",
    itemName: "Pain Relief Gel",
    batchNumber: "BCH-2024-010",
    expiryDate: "2025-10-05",
    quantity: 30,
    unit: "Tubes",
    location: "Warehouse B",
    category: "Medicine",
    supplier: "Relief Pharma",
    status: "Updated",
    createdAt: "2025-01-24",
    updatedAt: "2025-01-29",
    draftedAt: "2025-01-23",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "4 days ago",
  },
];

export default function ExpiryItemsDataTable({
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
  isFilterOpen,
  setIsFilterOpen,
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
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const { canCreate } = useExpiryItemsPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "itemName",
      title: "Item Name",
      options: [...new Set(mockExpiryItems.map((item) => item.itemName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("itemName")
          .localeCompare(row2.getValue("itemName"));
      },
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Item Name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "batchNumber",
      title: "Batch Number",
      options: [...new Set(mockExpiryItems.map((item) => item.batchNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("batchNumber")
          .localeCompare(row2.getValue("batchNumber"));
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Batch Number",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "expiryDate",
      title: "Expiry Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) return false;
        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const d1 = new Date(row1.getValue("expiryDate")).getTime();
        const d2 = new Date(row2.getValue("expiryDate")).getTime();
        return d1 - d2;
      },
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Expiry Date",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "quantity",
      title: "Quantity",
      options: [
        ...new Set(mockExpiryItems.map((item) => item.quantity.toString())),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = String(row.getValue(columnId));
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          Number(row1.getValue("quantity")) - Number(row2.getValue("quantity"))
        );
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Quantity",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "unit",
      title: "Unit",
      options: [...new Set(mockExpiryItems.map((item) => item.unit))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("unit").localeCompare(row2.getValue("unit"));
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Unit",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "location",
      title: "Location",
      options: [...new Set(mockExpiryItems.map((item) => item.location))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("location")
          .localeCompare(row2.getValue("location"));
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Location",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "category",
      title: "Category",
      options: [...new Set(mockExpiryItems.map((item) => item.category))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("category")
          .localeCompare(row2.getValue("category"));
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Category",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "supplier",
      title: "Supplier",
      options: [...new Set(mockExpiryItems.map((item) => item.supplier))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("supplier")
          .localeCompare(row2.getValue("supplier"));
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Supplier",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("createdAt"));
        const date2 = new Date(row2.getValue("createdAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "createdAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("updatedAt"));
        const date2 = new Date(row2.getValue("updatedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("draftedAt"));
        const date2 = new Date(row2.getValue("draftedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockExpiryItems.filter((item: ExpiryItem) => {
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return item.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.isUpdated;
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
      fixedColumns={["itemName", "expiryDate"]}
      pathName="expiry-items"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      showImages={false}
    />
  );
}
