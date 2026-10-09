/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const mockCandidates = [
  {
    id: "1",
    firstName: "Aarif",
    lastName: "Hossain",
    ssn: "123-45-6789",
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
    firstName: "Nusrat",
    lastName: "Jahan",
    ssn: "987-65-4321",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    status: "active",
    actionMessage: "3h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    firstName: "Kamrul",
    lastName: "Islam",
    ssn: "456-78-9123",
    createdAt: "2022-01-10",
    updatedAt: "2022-12-20",
    draftedAt: "2022-01-01",
    status: "archived",
    actionMessage: "6mo",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    firstName: "Shamima",
    lastName: "Akter",
    ssn: "321-54-9876",
    createdAt: "2021-01-12",
    updatedAt: "2021-12-22",
    draftedAt: "2020-12-30",
    status: "archived",
    actionMessage: "1y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    firstName: "Tanvir",
    lastName: "Ahmed",
    ssn: "654-32-1987",
    createdAt: "2020-01-10",
    updatedAt: "2020-12-15",
    draftedAt: "2020-01-01",
    status: "archived",
    actionMessage: "2y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    firstName: "Farhana",
    lastName: "Rahman",
    ssn: "789-12-3456",
    createdAt: "2019-01-08",
    updatedAt: "2019-12-10",
    draftedAt: "2018-12-28",
    status: "archived",
    actionMessage: "3y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    firstName: "Rashed",
    lastName: "Khan",
    ssn: "234-56-7891",
    createdAt: "2018-01-05",
    updatedAt: "2018-12-12",
    draftedAt: "2017-12-30",
    status: "archived",
    actionMessage: "4y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    firstName: "Mehnaz",
    lastName: "Sultana",
    ssn: "876-54-3210",
    createdAt: "2024-12-01",
    updatedAt: "2025-06-01",
    draftedAt: "2024-11-20",
    status: "draft",
    actionMessage: "3d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    firstName: "Omar",
    lastName: "Faruque",
    ssn: "135-79-2468",
    createdAt: "2025-12-15",
    updatedAt: "2026-01-05",
    draftedAt: "2025-12-01",
    status: "draft",
    actionMessage: "2d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    firstName: "Sumaiya",
    lastName: "Haque",
    ssn: "975-31-8642",
    createdAt: "2026-12-20",
    updatedAt: "2027-01-02",
    draftedAt: "2026-12-10",
    status: "draft",
    actionMessage: "1d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function CandidateDataTable2({
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
      accessorKey: "firstName",
      title: "First Name",
      options: [...new Set(mockCandidates.map((item) => item.firstName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("firstName")
          .localeCompare(row2.getValue("firstName"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "first name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "lastName",
      title: "Last Name",
      options: [...new Set(mockCandidates.map((item) => item.lastName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("lastName")
          .localeCompare(row2.getValue("lastName"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "lastName",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "ssn",
      title: "SSN",
      options: [...new Set(mockCandidates.map((item) => item.ssn))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("ssn").localeCompare(row2.getValue("ssn"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "ssn",
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

  const filteredData = mockCandidates.filter((candidate) => {
    if (dataTableFilter.status === "Active") {
      return candidate.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !candidate.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return candidate.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return candidate.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return candidate.isUpdated;
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
      fixedColumns={["firstName", "status"]} // Pin country name column
      pathName="candidate-list"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
