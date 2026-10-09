/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const complementariesData = [
  {
    id: "1",
    roomType: "Standard Room",
    complementary: "Breakfast",
    rate: 25.0,
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    roomType: "Deluxe Room",
    complementary: "Airport Transfer",
    rate: 45.0,
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-22",
  },
  {
    id: "3",
    roomType: "Suite",
    complementary: "Spa Access",
    rate: 75.0,
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-25",
  },
  {
    id: "4",
    roomType: "Executive Room",
    complementary: "Lounge Access",
    rate: 35.0,
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
  },
  {
    id: "5",
    roomType: "Family Room",
    complementary: "Kids Club",
    rate: 30.0,
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-26",
  },
];

export default function ComplementariesDataTable({
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
  setShowFilter: (setShowFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (setShowVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const canCreate = usePermission("complementaries", "create");

  const componentColumns = [
    {
      accessorKey: "roomType",
      title: "Room Type",
      options: [...new Set(complementariesData.map((item) => item.roomType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("roomType")
          .localeCompare(row2.getValue("roomType"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "roomType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "complementary",
      title: "Complementary",
      options: [
        ...new Set(complementariesData.map((item) => item.complementary)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("complementary")
          .localeCompare(row2.getValue("complementary"));
      },
      size: 300,
      minSize: 250,
      meta: {
        exportLabel: "complementary",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "rate",
      title: "Rate",
      options: [
        ...new Set(
          complementariesData.map((item) => `$${item.rate.toFixed(2)}`)
        ),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        const rateText = `$${cellValue.toFixed(2)}`;
        return filterValue.includes(rateText);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("rate") - row2.getValue("rate");
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "rate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 150,
      minSize: 120,
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
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = complementariesData.filter((complementary) => {
    if (dataTableFilter.status === "Active") {
      return !complementary.isDeleted;
    } else if (dataTableFilter.status === "Inactive") {
      return complementary.isDeleted;
    } else if (dataTableFilter.status === "Deleted") {
      return complementary.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return complementary.isUpdated;
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
      fixedColumns={["roomType"]} // Pin Room Type column
      pathName="complementaries"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
