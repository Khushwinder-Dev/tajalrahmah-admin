/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const MockData = [
  {
    id: "1",
    name: "Md. Saidul Basar",
    customerGroup: "VIP",
    customer: "Best Electronics LTD",
    card: "Gold",
    pointFrom: "1000",
    pointTo: "1500",
    description: "Regular customer with premium membership.",
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
    name: "Sara Ahmed",
    customerGroup: "Regular",
    customer: "TechWorld",
    card: "Silver",
    pointFrom: "200",
    pointTo: "450",
    description: "Frequent buyer of electronic appliances.",
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
    name: "Rafiq Hasan",
    customerGroup: "New",
    customer: "HomeNeeds",
    card: "Bronze",
    pointFrom: "0",
    pointTo: "100",
    description: "New customer, recently registered.",
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
    name: "Laila Chowdhury",
    customerGroup: "VIP",
    customer: "SmartTech",
    card: "Gold",
    pointFrom: "1200",
    pointTo: "1800",
    description: "High-value customer with loyalty benefits.",
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
    name: "Tanvir Hossain",
    customerGroup: "Regular",
    customer: "ElectroMart",
    card: "Silver",
    pointFrom: "300",
    pointTo: "600",
    description: "Purchases mostly home appliances.",
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
    name: "Nabila Rahman",
    customerGroup: "VIP",
    customer: "GadgetWorld",
    card: "Gold",
    pointFrom: "1500",
    pointTo: "2000",
    description: "Premium electronics buyer.",
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
    name: "Jamal Uddin",
    customerGroup: "New",
    customer: "OfficeSupplies Ltd.",
    card: "Bronze",
    pointFrom: "50",
    pointTo: "150",
    description: "Recently registered corporate customer.",
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
    name: "Farzana Akter",
    customerGroup: "Regular",
    customer: "HomeTech",
    card: "Silver",
    pointFrom: "400",
    pointTo: "700",
    description: "Buys home electronics frequently.",
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
    name: "Rashed Khan",
    customerGroup: "VIP",
    customer: "TechBazaar",
    card: "Gold",
    pointFrom: "1300",
    pointTo: "1700",
    description: "High-spending electronics customer.",
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
    name: "Sadia Parvin",
    customerGroup: "Regular",
    customer: "ElectroShop",
    card: "Silver",
    pointFrom: "250",
    pointTo: "500",
    description: "Regular appliance purchaser.",
    createdAt: "2026-12-20",
    updatedAt: "2027-01-02",
    draftedAt: "2026-12-10",
    status: "upcoming",
    actionMessage: "1d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    name: "Hossain Ali",
    customerGroup: "New",
    customer: "GadgetStore",
    card: "Bronze",
    pointFrom: "0",
    pointTo: "120",
    description: "New customer, electronics buyer.",
    createdAt: "2025-11-10",
    updatedAt: "2025-12-05",
    draftedAt: "2025-11-01",
    status: "draft",
    actionMessage: "5d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    name: "Tanjila Sultana",
    customerGroup: "VIP",
    customer: "SmartHome",
    card: "Gold",
    pointFrom: "1400",
    pointTo: "1900",
    description: "Premium customer with loyalty benefits.",
    createdAt: "2025-12-10",
    updatedAt: "2026-01-03",
    draftedAt: "2025-12-01",
    status: "draft",
    actionMessage: "2d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function MembershipRulesDataTable({
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
      options: [...new Set(MockData.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
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
      accessorKey: "customerGroup",
      title: "Customer Group",
      options: [...new Set(MockData.map((item) => item.customerGroup))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "customerGroup",
        readOnly: !canCreate,
      },
    },

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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "customer",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "card",
      title: "Card",
      options: [...new Set(MockData.map((item) => item.card))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "card",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "pointFrom",
      title: "Point From",
      options: [...new Set(MockData.map((item) => item.pointFrom))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "pointFrom",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "pointTo",
      title: "Point To",
      options: [...new Set(MockData.map((item) => item.pointTo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "pointTo",
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

  const filteredData = MockData.filter((item) => {
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
      fixedColumns={["name", "status"]} // Pin country name column
      pathName="membership-rules"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
