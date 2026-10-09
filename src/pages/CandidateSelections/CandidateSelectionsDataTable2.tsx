/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const mockCandidates = [
  {
    id: "1",
    name: "John Doe",
    position: "Manager",
    team: "IT",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    status: "active",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "Developer",
    team: "Software",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    status: "active",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    name: "Emma Johnson",
    position: "HR Officer",
    team: "Human Resources",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    status: "active",
    actionMessage: "1h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    name: "Lena Müller",
    position: "Developer",
    team: "Software",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    status: "active",
    actionMessage: "3d",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    name: "Louis Martin",
    position: "Engineer",
    team: "Engineering",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    status: "active",
    actionMessage: "5d",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    name: "Taro Suzuki",
    position: "System Analyst",
    team: "IT",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    status: "active",
    actionMessage: "1w",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    name: "Olivia Brown",
    position: "Marketing Lead",
    team: "Marketing",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    status: "active",
    actionMessage: "1w",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    name: "Lucas Silva",
    position: "Data Analyst",
    team: "Data",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    status: "active",
    actionMessage: "6d",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    name: "Amit Kumar",
    position: "Support Engineer",
    team: "Customer Support",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    status: "active",
    actionMessage: "3d",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    name: "Li Wei",
    position: "Operations Manager",
    team: "Operations",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    status: "active",
    actionMessage: "45m",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function CandidateSelectionsDataTable2({
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
  const { canCreate } = useCountriesPermissions();

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockCandidates.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "position",
      title: "Position",
      options: [...new Set(mockCandidates.map((item) => item.position))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("position")
          .localeCompare(row2.getValue("position"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "position",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "team",
      title: "Team",
      options: [...new Set(mockCandidates.map((item) => item.team))],
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
        return row1.getValue("team") - row2.getValue("team");
      },
      size: 200,
      minSize: 180,
      meta: {
        readOnly: true,
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
      size: 180,
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
      size: 180,
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
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("draftedAt")).getTime() -
          new Date(row2.getValue("draftedAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockCandidates.filter((certificate) => {
    if (dataTableFilter.status === "Active") {
      return certificate.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !certificate.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return certificate.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return certificate.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return certificate.isUpdated;
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
      fixedColumns={["name", "position", "status"]} // Pin country name column
      pathName="candidate-selections"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
