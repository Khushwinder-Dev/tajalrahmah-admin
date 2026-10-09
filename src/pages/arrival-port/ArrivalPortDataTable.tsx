/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type ArrivalPortDataType = {
  country: string;
  company: string;
  containerNo: string;
  arrivalDate: string;
  validityTill: string;
  date: string;
  loginId: string;

  id: string;
  status: string;

  createdAt: string;
  updatedAt: string;
  draftedAt: string | null;
  actionMessage: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
};

const mockTableData: ArrivalPortDataType[] = [
  {
    id: "1",
    country: "Saudi Arabia",
    company: "Al-Rashid Trading Company",
    containerNo: "C123456",
    arrivalDate: "2024-01-15",
    validityTill: "2024-01-20",
    date: "2024-01-15",
    loginId: "admin",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    actionMessage: "Shipment received successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    country: "United Arab Emirates",
    company: "Dubai Logistics LLC",
    containerNo: "C654321",
    arrivalDate: "2024-02-05",
    validityTill: "2024-02-12",
    date: "2024-02-05",
    loginId: "manager",
    status: "Inactive",
    createdAt: "2024-02-05",
    updatedAt: "2024-02-12",
    draftedAt: null,
    actionMessage: "Shipment delayed",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    country: "Bangladesh",
    company: "Chittagong Shipping Lines",
    containerNo: "C987654",
    arrivalDate: "2024-03-10",
    validityTill: "2024-03-15",
    date: "2024-03-10",
    loginId: "sabbir",
    status: "Active",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-15",
    draftedAt: null,
    actionMessage: "Cleared at customs",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    country: "India",
    company: "Mumbai Exports Pvt Ltd",
    containerNo: "C456789",
    arrivalDate: "2024-04-02",
    validityTill: "2024-04-08",
    date: "2024-04-02",
    loginId: "operator",
    status: "Draft",
    createdAt: "2024-04-02",
    updatedAt: "2024-04-08",
    draftedAt: "2024-04-02",
    actionMessage: "Draft saved for review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    country: "China",
    company: "Shanghai Cargo Co.",
    containerNo: "C112233",
    arrivalDate: "2024-05-20",
    validityTill: "2024-05-28",
    date: "2024-05-20",
    loginId: "admin",
    status: "Active",
    createdAt: "2024-05-20",
    updatedAt: "2024-05-28",
    draftedAt: null,
    actionMessage: "Shipment on time",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    country: "USA",
    company: "New York Freight Corp",
    containerNo: "C445566",
    arrivalDate: "2024-06-11",
    validityTill: "2024-06-18",
    date: "2024-06-11",
    loginId: "john",
    status: "Deleted",
    createdAt: "2024-06-11",
    updatedAt: "2024-06-18",
    draftedAt: null,
    actionMessage: "Record removed",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "7",
    country: "Germany",
    company: "Berlin Transport AG",
    containerNo: "C778899",
    arrivalDate: "2024-07-05",
    validityTill: "2024-07-12",
    date: "2024-07-05",
    loginId: "manager",
    status: "Updated",
    createdAt: "2024-07-05",
    updatedAt: "2024-07-12",
    draftedAt: null,
    actionMessage: "Information updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    country: "UK",
    company: "London Shipping Ltd",
    containerNo: "C332211",
    arrivalDate: "2024-08-01",
    validityTill: "2024-08-07",
    date: "2024-08-01",
    loginId: "admin",
    status: "Active",
    createdAt: "2024-08-01",
    updatedAt: "2024-08-07",
    draftedAt: null,
    actionMessage: "Shipment arrived",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    country: "Singapore",
    company: "Singapore Marine Services",
    containerNo: "C998877",
    arrivalDate: "2024-09-09",
    validityTill: "2024-09-16",
    date: "2024-09-09",
    loginId: "user123",
    status: "Inactive",
    createdAt: "2024-09-09",
    updatedAt: "2024-09-16",
    draftedAt: null,
    actionMessage: "Awaiting approval",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    country: "Malaysia",
    company: "Kuala Lumpur Cargo Ltd",
    containerNo: "C221133",
    arrivalDate: "2024-10-12",
    validityTill: "2024-10-18",
    date: "2024-10-12",
    loginId: "manager",
    status: "Draft",
    createdAt: "2024-10-12",
    updatedAt: "2024-10-18",
    draftedAt: "2024-10-12",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    country: "Qatar",
    company: "Doha Freight Solutions",
    containerNo: "C554433",
    arrivalDate: "2024-11-03",
    validityTill: "2024-11-09",
    date: "2024-11-03",
    loginId: "admin",
    status: "Active",
    createdAt: "2024-11-03",
    updatedAt: "2024-11-09",
    draftedAt: null,
    actionMessage: "Successfully cleared",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    country: "Oman",
    company: "Muscat Logistics LLC",
    containerNo: "C667788",
    arrivalDate: "2024-12-15",
    validityTill: "2024-12-22",
    date: "2024-12-15",
    loginId: "operator",
    status: "Updated",
    createdAt: "2024-12-15",
    updatedAt: "2024-12-22",
    draftedAt: null,
    actionMessage: "Final data updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function PurchaseOrderLogisticDataTable({
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
  const canCreate = usePermission("arrivalPort", "create");

  const fieldPermissions = usePermission<keyof ArrivalPortDataType>(
    "arrivalPort",
    "view",
    [
      "country",
      "company",
      "containerNo",
      "arrivalDate",
      "validityTill",
      "date",
      "loginId",
      "id",
      "status",
      "createdAt",
      "updatedAt",
      "draftedAt",
      "actionMessage",
      "isActive",
      "isDraft",
      "isDeleted",
      "isUpdated",
    ]
  );

  const componentColumns = [
    {
      accessorKey: "id",
      title: "SN",
      options: fieldPermissions.id
        ? [...new Set(mockTableData.map((item) => item.id))]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("id").localeCompare(row2.getValue("id"));
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "id",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: fieldPermissions.country
        ? [...new Set(mockTableData.map((item) => item.country))]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "country",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "company",
      title: "Company",
      options: fieldPermissions.company
        ? [...new Set(mockTableData.map((item) => item.company))]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("company").localeCompare(row2.getValue("company"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "company",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "containerNo",
      title: "Container No",
      options: fieldPermissions.containerNo
        ? [...new Set(mockTableData.map((item) => item.containerNo))]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("containerNo")
          .localeCompare(row2.getValue("containerNo"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "containerNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "arrivalDate",
      title: "Arrival Date",
      options: fieldPermissions.arrivalDate
        ? [...new Set(mockTableData.map((item) => item.arrivalDate))]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("arrivalDate")
          .localeCompare(row2.getValue("arrivalDate"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "arrivalDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "validityTill",
      title: "Validity Till",
      options: fieldPermissions.validityTill
        ? [...new Set(mockTableData.map((item) => item.validityTill))]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("validityTill")
          .localeCompare(row2.getValue("validityTill"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "validityTill",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "date",
      title: "Date",
      options: fieldPermissions.date
        ? [...new Set(mockTableData.map((item) => item.date))]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("date").localeCompare(row2.getValue("date"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "loginId",
      title: "Login ID",
      options: fieldPermissions.loginId
        ? [...new Set(mockTableData.map((item) => item.loginId))]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("loginId").localeCompare(row2.getValue("loginId"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "loginId",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "isActive",
      title: "Active",
      options: fieldPermissions.isActive ? ["Yes", "No"] : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as boolean;
        const displayValue = cellValue ? "Yes" : "No";
        return filterValue.includes(displayValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const val1 = row1.getValue("isActive") ? 1 : 0;
        const val2 = row2.getValue("isActive") ? 1 : 0;
        return val1 - val2;
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "isActive",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: fieldPermissions.createdAt ? [] : [], // Dates are typically not filtered with predefined options
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
      options: fieldPermissions.updatedAt ? [] : [], // Dates are typically not filtered with predefined options
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

  const filteredData = mockTableData.filter((item) => {
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
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
      fixedColumns={["id", "country"]}
      pathName="arrival-port"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
