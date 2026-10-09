/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const MockData = [
  {
    id: "1",
    customer: "Md Boshir",
    email: "md.boshir@example.com",
    membership: "Gold",
    loyaltyPoints: "1200",
    action: "Active",
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
    customer: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    membership: "Silver",
    loyaltyPoints: "450",
    action: "Active",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    status: "active",
    actionMessage: "4h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    customer: "Rafiq Hasan",
    email: "rafiq.hasan@example.com",
    membership: "Bronze",
    loyaltyPoints: "150",
    action: "Inactive",
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
    customer: "Laila Chowdhury",
    email: "laila.chowdhury@example.com",
    membership: "Gold",
    loyaltyPoints: "1800",
    action: "Active",
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
    customer: "Tanvir Hossain",
    email: "tanvir.hossain@example.com",
    membership: "Silver",
    loyaltyPoints: "600",
    action: "Inactive",
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
    customer: "Nabila Rahman",
    email: "nabila.rahman@example.com",
    membership: "Gold",
    loyaltyPoints: "2000",
    action: "Active",
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
    customer: "Jamal Uddin",
    email: "jamal.uddin@example.com",
    membership: "Bronze",
    loyaltyPoints: "120",
    action: "Active",
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
    customer: "Farzana Akter",
    email: "farzana.akter@example.com",
    membership: "Silver",
    loyaltyPoints: "700",
    action: "Active",
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
    customer: "Rashed Khan",
    email: "rashed.khan@example.com",
    membership: "Gold",
    loyaltyPoints: "1700",
    action: "Inactive",
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
    customer: "Sadia Parvin",
    email: "sadia.parvin@example.com",
    membership: "Silver",
    loyaltyPoints: "500",
    action: "Active",
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

export default function LoyaltyUsersDataTable({
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
      accessorKey: "customer",
      title: "Customer",
      options: [...new Set(MockData.map((item) => item.customer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customer")
          .localeCompare(row2.getValue("customer"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "customer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(MockData.map((item) => item.email))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "email",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "membership",
      title: "Membership",
      options: [...new Set(MockData.map((item) => item.membership))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("membership")
          .localeCompare(row2.getValue("membership"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "membership",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "loyaltyPoints",
      title: "Loyalty Points",
      options: [...new Set(MockData.map((item) => item.loyaltyPoints))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("loyaltyPoints")
          .localeCompare(row2.getValue("loyaltyPoints"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "loyaltyPoints",
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

  const filteredData = MockData.filter((finance) => {
    if (dataTableFilter.status === "Active") {
      return finance.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !finance.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return finance.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return finance.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return finance.isUpdated;
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
      fixedColumns={["customer", "status"]} // Pin country name column
      pathName="loyalty-users"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
