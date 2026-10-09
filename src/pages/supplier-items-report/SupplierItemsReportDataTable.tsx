/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Supplier Items interface to match the grid component
interface SupplierItemReport {
  id: string;
  supplier: string;
  itemName: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive" | "Draft";
}

const mockSupplierItems: SupplierItemReport[] = [
  {
    id: "1",
    supplier: "Acme Supplies",
    itemName: "Tomatoes",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "Active",
  },
  {
    id: "2",
    supplier: "Global Foods",
    itemName: "Olive Oil",
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    status: "Inactive",
  },
  {
    id: "3",
    supplier: "Fresh Farms",
    itemName: "Lettuce",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    status: "Draft",
  },
  {
    id: "4",
    supplier: "Prime Meat Co",
    itemName: "Beef",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    status: "Active",
  },
  {
    id: "5",
    supplier: "Dairy Best",
    itemName: "Cheese",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    status: "Inactive",
  },
];

export default function SupplierItemsReportDataTable({
  viewMode,
  setViewMode,
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
  const { canCreate } = useCountriesPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "supplier",
      title: "Supplier",
      options: [...new Set(mockSupplierItems.map((item) => item.supplier))],
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
      size: isMobile ? 160 : 220,
      minSize: 140,
      meta: {
        exportLabel: "Supplier",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "itemName",
      title: "Item Name",
      options: [...new Set(mockSupplierItems.map((item) => item.itemName))],
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
      size: isMobile ? 160 : 220,
      minSize: 140,
      meta: {
        exportLabel: "Item Name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockSupplierItems.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: isMobile ? 120 : 150,
      minSize: 110,
      meta: {
        exportLabel: "Status",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "startDate",
      title: "Start Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) {
          return false;
        }
        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("startDate"));
        const date2 = new Date(row2.getValue("startDate"));
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;
        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 130,
      meta: {
        exportLabel: "Start Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "endDate",
      title: "End Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) {
          return false;
        }
        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("endDate"));
        const date2 = new Date(row2.getValue("endDate"));
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;
        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 130,
      meta: {
        exportLabel: "End Date",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockSupplierItems;

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["supplier", "itemName"]}
      pathName="supplier-items-report"
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
