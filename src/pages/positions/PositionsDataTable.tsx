/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const positionsData = [
  {
    id: "1",
    positionName: "Software Engineer",
    positionDetails: "Full-stack development with React and Node.js",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    positionName: "UI/UX Designer",
    positionDetails: "Create user-centered design solutions",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-22",
  },
  {
    id: "3",
    positionName: "Product Manager",
    positionDetails: "Lead product strategy and development",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-25",
  },
  {
    id: "4",
    positionName: "Data Analyst",
    positionDetails: "Analyze business data and create reports",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
  },
  {
    id: "5",
    positionName: "DevOps Engineer",
    positionDetails: "Manage infrastructure and deployment pipelines",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-26",
  },
];

export default function PositionsDataTable({
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
  const canCreate = usePermission("positions", "create");

  const componentColumns = [
    {
      accessorKey: "positionName",
      title: "Position Name",
      options: [...new Set(positionsData.map((item) => item.positionName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("positionName")
          .localeCompare(row2.getValue("positionName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "positionName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "positionDetails",
      title: "Position Details",
      options: [...new Set(positionsData.map((item) => item.positionDetails))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("positionDetails")
          .localeCompare(row2.getValue("positionDetails"));
      },
      size: 300,
      minSize: 250,
      meta: {
        exportLabel: "positionDetails",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "isActive",
      title: "Status",
      options: [
        ...new Set(
          positionsData.map((item) => (item.isActive ? "Active" : "Inactive"))
        ),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as boolean;
        const statusText = cellValue ? "Active" : "Inactive";
        return filterValue.includes(statusText);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("isActive") === row2.getValue("isActive")
          ? 0
          : row1.getValue("isActive")
          ? -1
          : 1;
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "isActive",
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

  const filteredData = positionsData.filter((position) => {
    if (dataTableFilter.status === "Active") {
      return position.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !position.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return position.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return position.isUpdated;
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
      fixedColumns={["positionName"]} // Pin Position Name column
      pathName="positions"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
