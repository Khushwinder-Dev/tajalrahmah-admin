/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useColorsPermissions } from "@/hooks/usePermissions";

// Item Master interface to match the grid component
interface ItemMaster {
  id: string;
  itemCode: string;
  itemName: string;
  arabicName: string;
  costPrice: number;
  regularPrice: number;
  offerPrice: number;
  startDate: string;
  endDate: string;
  openingStock: number;
  category: string;
  subCategory: string;
  unit: string;
  description: string;
  status: "active" | "inactive" | "draft";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockItems: ItemMaster[] = [
  {
    id: "1",
    itemCode: "ITM001",
    itemName: "Laptop Pro 15",
    arabicName: "لابتوب برو 15",
    costPrice: 1200,
    regularPrice: 1500,
    offerPrice: 1350,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 50,
    category: "Electronics",
    subCategory: "Laptops",
    unit: "Piece",
    description: "High-performance laptop for professionals",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    itemCode: "ITM002",
    itemName: "Wireless Mouse",
    arabicName: "ماوس لاسلكي",
    costPrice: 25,
    regularPrice: 35,
    offerPrice: 30,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 200,
    category: "Electronics",
    subCategory: "Accessories",
    unit: "Piece",
    description: "Ergonomic wireless mouse with precision tracking",
    status: "active",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    itemCode: "ITM003",
    itemName: "Office Chair",
    arabicName: "كرسي مكتب",
    costPrice: 150,
    regularPrice: 200,
    offerPrice: 175,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 30,
    category: "Furniture",
    subCategory: "Office Chairs",
    unit: "Piece",
    description: "Comfortable ergonomic office chair",
    status: "active",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    itemCode: "ITM004",
    itemName: "Monitor 24 inch",
    arabicName: "شاشة 24 بوصة",
    costPrice: 200,
    regularPrice: 280,
    offerPrice: 250,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 40,
    category: "Electronics",
    subCategory: "Monitors",
    unit: "Piece",
    description: "Full HD 24-inch LED monitor",
    status: "active",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    itemCode: "ITM005",
    itemName: "Desk Lamp",
    arabicName: "مصباح مكتب",
    costPrice: 30,
    regularPrice: 45,
    offerPrice: 38,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 100,
    category: "Furniture",
    subCategory: "Lighting",
    unit: "Piece",
    description: "Adjustable LED desk lamp",
    status: "draft",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    itemCode: "ITM006",
    itemName: "Keyboard Mechanical",
    arabicName: "لوحة مفاتيح ميكانيكية",
    costPrice: 80,
    regularPrice: 120,
    offerPrice: 100,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 75,
    category: "Electronics",
    subCategory: "Accessories",
    unit: "Piece",
    description: "RGB mechanical gaming keyboard",
    status: "active",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    itemCode: "ITM007",
    itemName: "Webcam HD",
    arabicName: "كاميرا ويب عالية الدقة",
    costPrice: 60,
    regularPrice: 85,
    offerPrice: 70,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 60,
    category: "Electronics",
    subCategory: "Accessories",
    unit: "Piece",
    description: "1080p HD webcam for video conferencing",
    status: "inactive",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    itemCode: "ITM008",
    itemName: "Office Desk",
    arabicName: "مكتب مكتب",
    costPrice: 300,
    regularPrice: 400,
    offerPrice: 350,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 20,
    category: "Furniture",
    subCategory: "Desks",
    unit: "Piece",
    description: "Spacious wooden office desk",
    status: "active",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    itemCode: "ITM009",
    itemName: "USB Hub",
    arabicName: "محول USB",
    costPrice: 15,
    regularPrice: 25,
    offerPrice: 20,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 150,
    category: "Electronics",
    subCategory: "Accessories",
    unit: "Piece",
    description: "7-port USB 3.0 hub",
    status: "draft",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    itemCode: "ITM010",
    itemName: "Desk Organizer",
    arabicName: "منظم مكتب",
    costPrice: 20,
    regularPrice: 30,
    offerPrice: 25,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 80,
    category: "Furniture",
    subCategory: "Accessories",
    unit: "Piece",
    description: "Multi-compartment desk organizer",
    status: "active",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function ItemsDataTable({
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
  const { canCreate } = useColorsPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "itemName",
      title: "Item Name",
      options: [...new Set(mockItems.map((item) => item.itemName))],
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
      size: isMobile ? 120 : 180,
      minSize: 120,
      meta: {
        exportLabel: "Item Name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "arabicName",
      title: "Arabic Name",
      options: [...new Set(mockItems.map((item) => item.arabicName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("arabicName")
          .localeCompare(row2.getValue("arabicName"));
      },
      size: isMobile ? 120 : 180,
      minSize: 120,
      meta: {
        exportLabel: "Arabic Name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "itemCode",
      title: "Item Code",
      options: [...new Set(mockItems.map((item) => item.itemCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("itemCode")
          .localeCompare(row2.getValue("itemCode"));
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Item Code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "costPrice",
      title: "Cost Price",
      options: [...new Set(mockItems.map((item) => item.costPrice.toString()))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: string) =>
          cellValue.toString().includes(filterVal)
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("costPrice") - row2.getValue("costPrice");
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Cost Price",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "regularPrice",
      title: "Regular Price",
      options: [
        ...new Set(mockItems.map((item) => item.regularPrice.toString())),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: string) =>
          cellValue.toString().includes(filterVal)
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("regularPrice") - row2.getValue("regularPrice");
      },
      size: isMobile ? 120 : 140,
      minSize: 120,
      meta: {
        exportLabel: "Regular Price",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "offerPrice",
      title: "Offer Price",
      options: [
        ...new Set(mockItems.map((item) => item.offerPrice.toString())),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: string) =>
          cellValue.toString().includes(filterVal)
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("offerPrice") - row2.getValue("offerPrice");
      },
      size: isMobile ? 120 : 140,
      minSize: 120,
      meta: {
        exportLabel: "Offer Price",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "openingStock",
      title: "Opening Stock",
      options: [
        ...new Set(mockItems.map((item) => item.openingStock.toString())),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: string) =>
          cellValue.toString().includes(filterVal)
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("openingStock") - row2.getValue("openingStock");
      },
      size: isMobile ? 120 : 140,
      minSize: 120,
      meta: {
        exportLabel: "Opening Stock",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "category",
      title: "Category",
      options: [...new Set(mockItems.map((item) => item.category))],
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
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Category",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "subCategory",
      title: "Sub Category",
      options: [...new Set(mockItems.map((item) => item.subCategory))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("subCategory")
          .localeCompare(row2.getValue("subCategory"));
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Sub Category",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "unit",
      title: "Unit",
      options: [...new Set(mockItems.map((item) => item.unit))],
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
      size: isMobile ? 80 : 100,
      minSize: 80,
      meta: {
        exportLabel: "Unit",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockItems.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Description",
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

  const filteredData = mockItems.filter((item: ItemMaster) => {
    // Items use the same flags for demo
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
      fixedColumns={["itemName", "itemCode"]}
      pathName="items"
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
