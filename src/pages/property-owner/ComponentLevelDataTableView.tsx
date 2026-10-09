/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  code: string;
  ownerName: string;
  vatNumber: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

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

const mockTableData: TabDataType[] = [
  {
    id: "1",
    code: "C001",
    ownerName: "John Doe",
    vatNumber: "VAT123456",
    email: "john.doe@example.com",
    phoneNumber: "+1-202-555-0123",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",

    status: "Active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-02-15T12:00:00Z",
    draftedAt: null,
    actionMessage: "Created new record",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    code: "C002",
    ownerName: "Jane Smith",
    vatNumber: "VAT654321",
    email: "jane.smith@example.com",
    phoneNumber: "+44-20-7946-0958",
    address: "45 Queen St",
    city: "London",
    state: "London",
    zipCode: "SW1A 1AA",
    country: "UK",

    status: "Draft",
    createdAt: "2025-01-12T11:20:00Z",
    updatedAt: "2025-01-15T09:00:00Z",
    draftedAt: "2025-01-12T11:20:00Z",
    actionMessage: "Saved as draft",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    code: "C003",
    ownerName: "Carlos Rivera",
    vatNumber: "VAT789123",
    email: "carlos.rivera@example.com",
    phoneNumber: "+34-91-555-9876",
    address: "Calle Mayor 12",
    city: "Madrid",
    state: "Madrid",
    zipCode: "28013",
    country: "Spain",

    status: "Updated",
    createdAt: "2025-01-05T08:00:00Z",
    updatedAt: "2025-02-01T14:30:00Z",
    draftedAt: null,
    actionMessage: "Profile updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    code: "C004",
    ownerName: "Emily Chen",
    vatNumber: "VAT456789",
    email: "emily.chen@example.com",
    phoneNumber: "+86-10-555-7788",
    address: "88 Nanjing Rd",
    city: "Shanghai",
    state: "Shanghai",
    zipCode: "200000",
    country: "China",

    status: "Active",
    createdAt: "2025-01-01T09:15:00Z",
    updatedAt: "2025-01-20T16:45:00Z",
    draftedAt: null,
    actionMessage: "Verified account",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    code: "C005",
    ownerName: "Michael Johnson",
    vatNumber: "VAT321654",
    email: "michael.johnson@example.com",
    phoneNumber: "+1-310-555-2323",
    address: "456 Sunset Blvd",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    country: "USA",

    status: "Deleted",
    createdAt: "2025-01-08T13:45:00Z",
    updatedAt: "2025-01-10T14:00:00Z",
    draftedAt: null,
    actionMessage: "Account deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "6",
    code: "C006",
    ownerName: "Sofia Rossi",
    vatNumber: "VAT963852",
    email: "sofia.rossi@example.com",
    phoneNumber: "+39-06-555-1010",
    address: "Via Roma 24",
    city: "Rome",
    state: "Lazio",
    zipCode: "00184",
    country: "Italy",

    status: "Active",
    createdAt: "2025-01-18T12:00:00Z",
    updatedAt: "2025-02-10T09:30:00Z",
    draftedAt: null,
    actionMessage: "Payment confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    code: "C007",
    ownerName: "Ahmed Khan",
    vatNumber: "VAT741852",
    email: "ahmed.khan@example.com",
    phoneNumber: "+92-21-555-4040",
    address: "12 Clifton Rd",
    city: "Karachi",
    state: "Sindh",
    zipCode: "74000",
    country: "Pakistan",

    status: "Draft",
    createdAt: "2025-01-20T15:00:00Z",
    updatedAt: "2025-01-21T11:45:00Z",
    draftedAt: "2025-01-20T15:00:00Z",
    actionMessage: "Incomplete details",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    code: "C008",
    ownerName: "Hiroshi Tanaka",
    vatNumber: "VAT852963",
    email: "hiroshi.tanaka@example.com",
    phoneNumber: "+81-3-555-8080",
    address: "Shibuya 1-1",
    city: "Tokyo",
    state: "Tokyo",
    zipCode: "150-0002",
    country: "Japan",

    status: "Active",
    createdAt: "2025-01-02T09:30:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
    draftedAt: null,
    actionMessage: "Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    code: "C009",
    ownerName: "Lucas Müller",
    vatNumber: "VAT159357",
    email: "lucas.muller@example.com",
    phoneNumber: "+49-30-555-6060",
    address: "Berliner Str 99",
    city: "Berlin",
    state: "Berlin",
    zipCode: "10115",
    country: "Germany",

    status: "Updated",
    createdAt: "2025-01-05T08:20:00Z",
    updatedAt: "2025-02-02T17:00:00Z",
    draftedAt: null,
    actionMessage: "Changed billing info",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    code: "C010",
    ownerName: "Maria Lopez",
    vatNumber: "VAT357159",
    email: "maria.lopez@example.com",
    phoneNumber: "+52-55-555-7070",
    address: "Av Reforma 200",
    city: "Mexico City",
    state: "CDMX",
    zipCode: "06000",
    country: "Mexico",

    status: "Deleted",
    createdAt: "2025-01-03T10:00:00Z",
    updatedAt: "2025-01-07T12:00:00Z",
    draftedAt: null,
    actionMessage: "Removed account",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "11",
    code: "C011",
    ownerName: "Oliver Brown",
    vatNumber: "VAT456123",
    email: "oliver.brown@example.com",
    phoneNumber: "+61-2-555-3030",
    address: "78 George St",
    city: "Sydney",
    state: "NSW",
    zipCode: "2000",
    country: "Australia",

    status: "Active",
    createdAt: "2025-01-14T07:45:00Z",
    updatedAt: "2025-02-12T10:20:00Z",
    draftedAt: null,
    actionMessage: "Login successful",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    code: "C012",
    ownerName: "Fatima Zahra",
    vatNumber: "VAT987654",
    email: "fatima.zahra@example.com",
    phoneNumber: "+212-5-555-9090",
    address: "Rue Mohammed V",
    city: "Casablanca",
    state: "Casablanca",
    zipCode: "20000",
    country: "Morocco",

    status: "Draft",
    createdAt: "2025-01-25T09:00:00Z",
    updatedAt: "2025-01-26T11:30:00Z",
    draftedAt: "2025-01-25T09:00:00Z",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function ComponentLevelDataTableView({
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
  const canCreate = usePermission("propertyOwner", "create");

  const componentColumns = [
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockTableData.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "ownerName",
      title: "Owner Name",
      options: [...new Set(mockTableData.map((item) => item.ownerName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("ownerName")
          .localeCompare(row2.getValue("ownerName"));
      },
      size: 200,
      minSize: 200,
      meta: {
        exportLabel: "ownerName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "vatNumber",
      title: "VAT Number",
      options: [...new Set(mockTableData.map((item) => item.vatNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("vatNumber")
          .localeCompare(row2.getValue("vatNumber"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "vatNumber",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockTableData.map((item) => item.email))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "email",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "phoneNumber",
      title: "Phone Number",
      options: [...new Set(mockTableData.map((item) => item.phoneNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("phoneNumber")
          .localeCompare(row2.getValue("phoneNumber"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "phoneNumber",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockTableData.map((item) => item.email))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "email",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "address",
      title: "Address",
      options: [...new Set(mockTableData.map((item) => item.address))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("address").localeCompare(row2.getValue("address"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "address",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "state",
      title: "State",
      options: [...new Set(mockTableData.map((item) => item.state))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("state").localeCompare(row2.getValue("state"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "state",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "city",
      title: "City",
      options: [...new Set(mockTableData.map((item) => item.city))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("city").localeCompare(row2.getValue("city"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "city",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "zipCode",
      title: "Zip Code",
      options: [...new Set(mockTableData.map((item) => item.zipCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("zipCode").localeCompare(row2.getValue("zipCode"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "zipCode",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockTableData.map((item) => item.country))],
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
      minSize: 150,
      meta: {
        exportLabel: "country",
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
        const cellValue = row.getValue(columnId);
        if (!cellValue) return false;
        const dateValue = new Date(cellValue as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(dateValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = row1.getValue("draftedAt");
        const date2 = row2.getValue("draftedAt");
        if (!date1 && !date2) return 0;
        if (!date1) return 1;
        if (!date2) return -1;
        return new Date(date1).getTime() - new Date(date2).getTime();
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockTableData.filter((leave) => {
    if (dataTableFilter.status === "Active") {
      return leave.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !leave.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return leave.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return leave.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return leave.isUpdated;
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
      fixedColumns={["code", "ownerName"]} // Pin leave types column
      pathName="property-owner"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
