/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const mockLanguages = [
  {
    id: "1",
    seq: 1,
    code: "en",
    language: "English",
    default: true,
    status: "active",
    isDeleted: false,
  },
  {
    id: "2",
    seq: 2,
    code: "es",
    language: "Spanish",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "3",
    seq: 3,
    code: "fr",
    language: "French",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "4",
    seq: 4,
    code: "de",
    language: "German",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "5",
    seq: 5,
    code: "it",
    language: "Italian",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "6",
    seq: 6,
    code: "pt",
    language: "Portuguese",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "7",
    seq: 7,
    code: "ru",
    language: "Russian",
    default: false,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "8",
    seq: 8,
    code: "zh",
    language: "Chinese",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "9",
    seq: 9,
    code: "ja",
    language: "Japanese",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "10",
    seq: 10,
    code: "ko",
    language: "Korean",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "11",
    seq: 11,
    code: "ar",
    language: "Arabic",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "12",
    seq: 12,
    code: "hi",
    language: "Hindi",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "13",
    seq: 13,
    code: "bn",
    language: "Bengali",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "14",
    seq: 14,
    code: "tr",
    language: "Turkish",
    default: false,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "15",
    seq: 15,
    code: "nl",
    language: "Dutch",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "16",
    seq: 16,
    code: "pl",
    language: "Polish",
    default: false,
    status: "active",
    isDeleted: false,
  },
];

export default function LanguagesDataTable({
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
  const { canCreate } = useCountriesPermissions();

  const componentColumns = [
    {
      accessorKey: "seq",
      title: "Seq",
      options: [...new Set(mockLanguages.map((item) => item.seq))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("seq") - row2.getValue("seq");
      },
      size: 180,
      minSize: 80,
      meta: {
        exportLabel: "seq",
        readOnly: true,
      },
    },
    {
      accessorKey: "language",
      title: "Language",
      options: [...new Set(mockLanguages.map((item) => item.language))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("language")
          .localeCompare(row2.getValue("language"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "language",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockLanguages.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 180,
      minSize: 100,
      meta: {
        exportLabel: "code",
        readOnly: !canCreate,
      },
    },
  ];

  const filteredData = mockLanguages.filter((language) => {
    if (dataTableFilter.status === "Active") {
      return language.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return language.status === "inactive";
    } else if (dataTableFilter.status === "Deleted") {
      return language.isDeleted;
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
      fixedColumns={["seq", "language"]}
      pathName="languages"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
    />
  );
}
