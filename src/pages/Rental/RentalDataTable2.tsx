/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const mockAssets = [
  {
    id: 1,
    seg: "001",
    name: "Home Asset",
    number: "1234",
    agreementName: "Agreement 1",
    agreementType: "Lease",
    agreementDate: "2022-01-01",
    expireDate: "2023-01-01",
    installmentNo: 12,
    installmentAmount: 1000,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to the user's home.",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 2,
    seg: "002",
    name: "Canada Asset",
    number: "2345",
    agreementName: "Agreement 2",
    agreementType: "Lease",
    agreementDate: "2022-02-01",
    expireDate: "2023-02-01",
    installmentNo: 12,
    installmentAmount: 1500,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Canada.",
    status: "inactive",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 3,
    seg: "003",
    name: "United States Asset",
    number: "3456",
    agreementName: "Agreement 3",
    agreementType: "Lease",
    agreementDate: "2022-03-01",
    expireDate: "2023-03-01",
    installmentNo: 12,
    installmentAmount: 2000,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to the United States.",
    status: "draft",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 4,
    seg: "004",
    name: "Office Asset",
    number: "4567",
    agreementName: "Agreement 4",
    agreementType: "Rent",
    agreementDate: "2022-04-01",
    expireDate: "2023-04-01",
    installmentNo: 6,
    installmentAmount: 5000,
    installmentPlan: "Quarterly",
    NotificationDays: 20,
    description: "Asset for office utilities and workspace.",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 5,
    seg: "005",
    name: "Shop Asset",
    number: "5678",
    agreementName: "Agreement 5",
    agreementType: "Lease",
    agreementDate: "2022-05-01",
    expireDate: "2023-05-01",
    installmentNo: 10,
    installmentAmount: 3000,
    installmentPlan: "Monthly",
    NotificationDays: 25,
    description: "Used for retail store rental.",
    status: "inactive",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 6,
    seg: "006",
    name: "Factory Asset",
    number: "6789",
    agreementName: "Agreement 6",
    agreementType: "Rent",
    agreementDate: "2022-06-01",
    expireDate: "2023-06-01",
    installmentNo: 8,
    installmentAmount: 4000,
    installmentPlan: "Monthly",
    NotificationDays: 15,
    description: "Asset for factory utilities and machines.",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 7,
    seg: "007",
    name: "Warehouse Asset",
    number: "7890",
    agreementName: "Agreement 7",
    agreementType: "Lease",
    agreementDate: "2022-07-01",
    expireDate: "2023-07-01",
    installmentNo: 9,
    installmentAmount: 3500,
    installmentPlan: "Monthly",
    NotificationDays: 20,
    description: "Storage for product inventories.",
    status: "inactive",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 8,
    seg: "008",
    name: "IT Equipment Asset",
    number: "8901",
    agreementName: "Agreement 8",
    agreementType: "Rent",
    agreementDate: "2022-08-01",
    expireDate: "2023-08-01",
    installmentNo: 6,
    installmentAmount: 2500,
    installmentPlan: "Bi-Monthly",
    NotificationDays: 10,
    description: "Leased computers and networking tools.",
    status: "draft",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 9,
    seg: "009",
    name: "Vehicle Asset",
    number: "9012",
    agreementName: "Agreement 9",
    agreementType: "Lease",
    agreementDate: "2022-09-01",
    expireDate: "2023-09-01",
    installmentNo: 12,
    installmentAmount: 1500,
    installmentPlan: "Monthly",
    NotificationDays: 5,
    description: "Vehicles for logistics and transportation.",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 10,
    seg: "010",
    name: "Remote Asset",
    number: "0123",
    agreementName: "Agreement 10",
    agreementType: "Rent",
    agreementDate: "2022-10-01",
    expireDate: "2023-10-01",
    installmentNo: 4,
    installmentAmount: 1000,
    installmentPlan: "Quarterly",
    NotificationDays: 7,
    description: "Used for remote site activities.",
    status: "inactive",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 11,
    seg: "011",
    name: "Training Center Asset",
    number: "1123",
    agreementName: "Agreement 11",
    agreementType: "Lease",
    agreementDate: "2022-11-01",
    expireDate: "2023-11-01",
    installmentNo: 10,
    installmentAmount: 2200,
    installmentPlan: "Monthly",
    NotificationDays: 15,
    description: "Asset used for training and development.",
    status: "draft",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 12,
    seg: "012",
    name: "Security Asset",
    number: "1224",
    agreementName: "Agreement 12",
    agreementType: "Rent",
    agreementDate: "2022-12-01",
    expireDate: "2023-12-01",
    installmentNo: 3,
    installmentAmount: 1200,
    installmentPlan: "Quarterly",
    NotificationDays: 12,
    description: "Asset for security systems and services.",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];
export default function RentalDataTable2({
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
      options: [...new Set(mockAssets.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("assetName")
          .localeCompare(row2.getValue("assetName"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "Name",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "agreementName",
      title: "Agreement Name",
      options: [...new Set(mockAssets.map((item) => item.agreementName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
    },
    {
      accessorKey: "agreementType",
      title: "Type",
      options: [...new Set(mockAssets.map((item) => item.agreementType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
    },
    {
      accessorKey: "number",
      title: "Number",
      options: [...new Set(mockAssets.map((item) => item.number))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
    },
    {
      accessorKey: "installmentAmount",
      title: "Amount",
      options: [...new Set(mockAssets.map((item) => item.installmentAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
    },
    {
      accessorKey: "installmentPlan",
      title: "Plan",
      options: [...new Set(mockAssets.map((item) => item.installmentPlan))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
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
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockAssets.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) => cellValue === filterVal);
      },
    },
  ];

  const filteredData = mockAssets.filter((item) => {
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
      fixedColumns={["name", "status"]} // Pin name column
      pathName="rental"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
