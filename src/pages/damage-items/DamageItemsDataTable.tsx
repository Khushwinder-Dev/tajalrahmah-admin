/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useColorsPermissions } from "@/hooks/usePermissions";

// Damage Items data table types and mock data
interface DamageItem {
  id: string;
  itemId: string;
  quantityDamaged: number;
  documentDate: string; // ISO date
  reportedBy: string;
  location: string;
  damageType: string;
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

const mockDamageItems: DamageItem[] = [
  {
    id: "1",
    itemId: "ITM-0001",
    quantityDamaged: 3,
    documentDate: "2025-09-10",
    reportedBy: "John Doe",
    location: "Warehouse A",
    damageType: "Broken",
    status: "Active",
    createdAt: "2025-09-10",
    updatedAt: "2025-09-12",
    draftedAt: "2025-09-09",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    itemId: "ITM-0002",
    quantityDamaged: 1,
    documentDate: "2025-09-11",
    reportedBy: "Jane Smith",
    location: "Warehouse B",
    damageType: "Water Damage",
    status: "Active",
    createdAt: "2025-09-11",
    updatedAt: "2025-09-12",
    draftedAt: "2025-09-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "Today",
  },
  {
    id: "3",
    itemId: "ITM-0003",
    quantityDamaged: 6,
    documentDate: "2025-09-08",
    reportedBy: "Ahmed Ali",
    location: "Store 1",
    damageType: "Cracked",
    status: "Draft",
    createdAt: "2025-09-08",
    updatedAt: "2025-09-09",
    draftedAt: "2025-09-07",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "2 days ago",
  },
  {
    id: "4",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
    status: "Inactive",
    createdAt: "2025-09-09",
    updatedAt: "2025-09-10",
    draftedAt: "2025-09-08",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "1 day ago",
  },
  {
    id: "5",
    itemId: "ITM-0005",
    quantityDamaged: 4,
    documentDate: "2025-09-07",
    reportedBy: "Ali Ahmed",
    location: "Store 2",
    damageType: "Expired",
    status: "Deleted",
    createdAt: "2025-09-07",
    updatedAt: "2025-09-08",
    draftedAt: "2025-09-06",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "3 days ago",
  },
  {
    id: "6",
    itemId: "ITM-0006",
    quantityDamaged: 5,
    documentDate: "2025-09-06",
    reportedBy: "Sara Khan",
    location: "Warehouse C",
    damageType: "Expired",
    status: "Updated",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-07",
    draftedAt: "2025-09-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "4 days ago",
  },
  {
    id: "7",
    itemId: "ITM-0006",
    quantityDamaged: 5,
    documentDate: "2025-09-06",
    reportedBy: "Sara Khan",
    location: "Warehouse C",
    damageType: "Expired",
    status: "Updated",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-07",
    draftedAt: "2025-09-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "4 days ago",
  },
  {
    id: "8",
    itemId: "ITM-0006",
    quantityDamaged: 5,
    documentDate: "2025-09-06",
    reportedBy: "Sara Khan",
    location: "Warehouse C",
    damageType: "Expired",
    status: "Updated",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-07",
    draftedAt: "2025-09-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "4 days ago",
  },
  {
    id: "9",
    itemId: "ITM-0006",
    quantityDamaged: 5,
    documentDate: "2025-09-06",
    reportedBy: "Sara Khan",
    location: "Warehouse C",
    damageType: "Expired",
    status: "Updated",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-07",
    draftedAt: "2025-09-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "4 days ago",
  },
  {
    id: "10",
    itemId: "ITM-0006",
    quantityDamaged: 5,
    documentDate: "2025-09-06",
    reportedBy: "Sara Khan",
    location: "Warehouse C",
    damageType: "Expired",
    status: "Updated",
    createdAt: "2025-09-06",
    updatedAt: "2025-09-07",
    draftedAt: "2025-09-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
    actionMessage: "4 days ago",
  },
];

export default function DamageItemsDataTable({
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
      accessorKey: "itemId",
      title: "Item ID",
      options: [...new Set(mockDamageItems.map((item) => item.itemId))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("itemId").localeCompare(row2.getValue("itemId"));
      },
      size: isMobile ? 120 : 180,
      minSize: 120,
      meta: {
        exportLabel: "Item ID",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "quantityDamaged",
      title: "Damaged",
      options: [
        ...new Set(
          mockDamageItems.map((item) => item.quantityDamaged.toString())
        ),
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
          Number(row1.getValue("quantityDamaged")) -
          Number(row2.getValue("quantityDamaged"))
        );
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Quantity Damaged",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "documentDate",
      title: "Document Date",
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
        const d1 = new Date(row1.getValue("documentDate")).getTime();
        const d2 = new Date(row2.getValue("documentDate")).getTime();
        return d1 - d2;
      },
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Document Date",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "reportedBy",
      title: "Reported By",
      options: [...new Set(mockDamageItems.map((item) => item.reportedBy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("reportedBy")
          .localeCompare(row2.getValue("reportedBy"));
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Reported By",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "location",
      title: "Location",
      options: [...new Set(mockDamageItems.map((item) => item.location))],
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
      accessorKey: "damageType",
      title: "Damage Type",
      options: [...new Set(mockDamageItems.map((item) => item.damageType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("damageType")
          .localeCompare(row2.getValue("damageType"));
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Damage Type",
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

  const filteredData = mockDamageItems.filter((item: DamageItem) => {
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
      fixedColumns={["itemId", "quantityDamaged"]}
      pathName="damage-items"
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
