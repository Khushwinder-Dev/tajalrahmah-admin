/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Currency interface to match the grid component
interface CurrencyItem {
  id: string;
  code: string;
  currency: string;
  exchange: number;
  country: string;
  symbol: string;
  status: "Active" | "Inactive" | "Draft";
}

const mockCurrencies: CurrencyItem[] = [
  {
    id: "1",
    code: "USD",
    currency: "US Dollar",
    exchange: 1.0,
    country: "United States",
    symbol: "$",
    status: "Active",
  },
  {
    id: "2",
    code: "EUR",
    currency: "Euro",
    exchange: 0.92,
    country: "Eurozone",
    symbol: "€",
    status: "Inactive",
  },
  {
    id: "3",
    code: "GBP",
    currency: "British Pound",
    exchange: 0.79,
    country: "United Kingdom",
    symbol: "£",
    status: "Draft",
  },
  {
    id: "4",
    code: "JPY",
    currency: "Japanese Yen",
    exchange: 156.7,
    country: "Japan",
    symbol: "¥",
    status: "Active",
  },
  {
    id: "5",
    code: "INR",
    currency: "Indian Rupee",
    exchange: 83.2,
    country: "India",
    symbol: "₹",
    status: "Inactive",
  },
];

export default function CurrenciesDataTable({
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
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockCurrencies.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: isMobile ? 100 : 140,
      minSize: 90,
      meta: {
        exportLabel: "Code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(mockCurrencies.map((item) => item.currency))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("currency")
          .localeCompare(row2.getValue("currency"));
      },
      size: isMobile ? 160 : 220,
      minSize: 140,
      meta: {
        exportLabel: "Currency",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "exchange",
      title: "Exchange",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = Number(row.getValue(columnId));
        return filterValue.some((filterVal: string | number) => {
          const parsed = Number(filterVal);
          if (Number.isNaN(parsed)) {
            return cellValue.toString().includes(String(filterVal));
          }
          return cellValue === parsed;
        });
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          Number(row1.getValue("exchange")) - Number(row2.getValue("exchange"))
        );
      },
      size: isMobile ? 120 : 160,
      minSize: 110,
      meta: {
        exportLabel: "Exchange",
        readOnly: true,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockCurrencies.map((item) => item.country))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
      size: isMobile ? 160 : 220,
      minSize: 140,
      meta: {
        exportLabel: "Country",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "symbol",
      title: "Symbol",
      options: [...new Set(mockCurrencies.map((item) => item.symbol))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("symbol").localeCompare(row2.getValue("symbol"));
      },
      size: isMobile ? 100 : 120,
      minSize: 90,
      meta: {
        exportLabel: "Symbol",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockCurrencies;

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["code", "currency"]}
      pathName="currencies"
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
