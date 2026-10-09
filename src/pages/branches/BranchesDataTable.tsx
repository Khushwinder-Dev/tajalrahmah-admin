/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Branch interface to match the grid component
interface BranchItem {
  id: string;
  code: string;
  branchName: string;
  taxNumber: string;
  phone: string;
  fax: string;
  mobile: string;
  email: string;
  website: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postCode: string;
  bankDetails: string;
  status: "Active" | "Pending" | "Draft" | "Rejected";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockBranches: BranchItem[] = [
  {
    id: "1",
    code: "BR-001",
    branchName: "Main Branch",
    taxNumber: "TX-123456789",
    phone: "+1-555-0100",
    fax: "+1-555-0101",
    mobile: "+1-555-0102",
    email: "main@company.com",
    website: "www.company.com",
    address: "123 Main Street",
    country: "United States",
    state: "California",
    city: "San Francisco",
    postCode: "94105",
    bankDetails: "Bank of America - 1234567890",
    status: "Active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    code: "BR-002",
    branchName: "Downtown Branch",
    taxNumber: "TX-987654321",
    phone: "+1-555-0200",
    fax: "+1-555-0201",
    mobile: "+1-555-0202",
    email: "downtown@company.com",
    website: "www.company.com",
    address: "456 Business Ave",
    country: "United States",
    state: "New York",
    city: "New York City",
    postCode: "10001",
    bankDetails: "Chase Bank - 9876543210",
    status: "Active",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    code: "BR-003",
    branchName: "Westside Branch",
    taxNumber: "TX-456789123",
    phone: "+1-555-0300",
    fax: "+1-555-0301",
    mobile: "+1-555-0302",
    email: "westside@company.com",
    website: "www.company.com",
    address: "789 West Street",
    country: "United States",
    state: "Texas",
    city: "Austin",
    postCode: "73301",
    bankDetails: "Wells Fargo - 4567891230",
    status: "Draft",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    code: "BR-004",
    branchName: "North Branch",
    taxNumber: "TX-789123456",
    phone: "+1-555-0400",
    fax: "+1-555-0401",
    mobile: "+1-555-0402",
    email: "north@company.com",
    website: "www.company.com",
    address: "321 North Blvd",
    country: "United States",
    state: "Washington",
    city: "Seattle",
    postCode: "98101",
    bankDetails: "US Bank - 7891234560",
    status: "Pending",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    code: "BR-005",
    branchName: "South Branch",
    taxNumber: "TX-321654987",
    phone: "+1-555-0500",
    fax: "+1-555-0501",
    mobile: "+1-555-0502",
    email: "south@company.com",
    website: "www.company.com",
    address: "654 South Road",
    country: "United States",
    state: "Florida",
    city: "Miami",
    postCode: "33101",
    bankDetails: "SunTrust - 3216549870",
    status: "Active",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    code: "BR-006",
    branchName: "Central Branch",
    taxNumber: "TX-654987321",
    phone: "+1-555-0600",
    fax: "+1-555-0601",
    mobile: "+1-555-0602",
    email: "central@company.com",
    website: "www.company.com",
    address: "987 Central Plaza",
    country: "United States",
    state: "Illinois",
    city: "Chicago",
    postCode: "60601",
    bankDetails: "Fifth Third - 6549873210",
    status: "Active",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    code: "BR-007",
    branchName: "East Branch",
    taxNumber: "TX-147258369",
    phone: "+1-555-0700",
    fax: "+1-555-0701",
    mobile: "+1-555-0702",
    email: "east@company.com",
    website: "www.company.com",
    address: "147 East Avenue",
    country: "United States",
    state: "Massachusetts",
    city: "Boston",
    postCode: "02101",
    bankDetails: "TD Bank - 1472583690",
    status: "Pending",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    code: "BR-008",
    branchName: "Mountain Branch",
    taxNumber: "TX-369258147",
    phone: "+1-555-0800",
    fax: "+1-555-0801",
    mobile: "+1-555-0802",
    email: "mountain@company.com",
    website: "www.company.com",
    address: "369 Mountain View",
    country: "United States",
    state: "Colorado",
    city: "Denver",
    postCode: "80201",
    bankDetails: "PNC Bank - 3692581470",
    status: "Draft",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    code: "BR-009",
    branchName: "Peachtree Branch",
    taxNumber: "TX-852741963",
    phone: "+1-555-0900",
    fax: "+1-555-0901",
    mobile: "+1-555-0902",
    email: "peachtree@company.com",
    website: "www.company.com",
    address: "852 Peachtree St",
    country: "United States",
    state: "Georgia",
    city: "Atlanta",
    postCode: "30301",
    bankDetails: "Regions Bank - 8527419630",
    status: "Active",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    code: "BR-010",
    branchName: "Desert Branch",
    taxNumber: "TX-963741852",
    phone: "+1-555-1000",
    fax: "+1-555-1001",
    mobile: "+1-555-1002",
    email: "desert@company.com",
    website: "www.company.com",
    address: "963 Desert Way",
    country: "United States",
    state: "Arizona",
    city: "Phoenix",
    postCode: "85001",
    bankDetails: "BBVA - 9637418520",
    status: "Rejected",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    code: "BR-011",
    branchName: "Pacific Branch",
    taxNumber: "TX-741852963",
    phone: "+1-555-1100",
    fax: "+1-555-1101",
    mobile: "+1-555-1102",
    email: "pacific@company.com",
    website: "www.company.com",
    address: "741 Pacific Blvd",
    country: "United States",
    state: "Oregon",
    city: "Portland",
    postCode: "97201",
    bankDetails: "KeyBank - 7418529630",
    status: "Active",
    createdAt: "2023-04-15",
    updatedAt: "2023-09-10",
    draftedAt: "2023-04-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    code: "BR-012",
    branchName: "Vegas Branch",
    taxNumber: "TX-159753486",
    phone: "+1-555-1200",
    fax: "+1-555-1201",
    mobile: "+1-555-1202",
    email: "vegas@company.com",
    website: "www.company.com",
    address: "159 Vegas Strip",
    country: "United States",
    state: "Nevada",
    city: "Las Vegas",
    postCode: "89101",
    bankDetails: "Zions Bank - 1597534860",
    status: "Draft",
    createdAt: "2023-05-01",
    updatedAt: "2023-11-12",
    draftedAt: "2023-04-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function BranchesDataTable({
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
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockBranches.map((item) => item.code))],
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
      size: isMobile ? 130 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "branchName",
      title: "Branch Name",
      options: [...new Set(mockBranches.map((item) => item.branchName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("branchName")
          .localeCompare(row2.getValue("branchName"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Branch Name",
        readOnly: true,
      },
    },
    {
      accessorKey: "taxNumber",
      title: "Tax Number",
      options: [...new Set(mockBranches.map((item) => item.taxNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("taxNumber")
          .localeCompare(row2.getValue("taxNumber"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Tax Number",
        readOnly: true,
      },
    },
    {
      accessorKey: "phone",
      title: "Phone",
      options: [...new Set(mockBranches.map((item) => item.phone))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("phone").localeCompare(row2.getValue("phone"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Phone",
        readOnly: true,
      },
    },
    {
      accessorKey: "fax",
      title: "Fax",
      options: [...new Set(mockBranches.map((item) => item.fax))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("fax").localeCompare(row2.getValue("fax"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Fax",
        readOnly: true,
      },
    },
    {
      accessorKey: "mobile",
      title: "Mobile",
      options: [...new Set(mockBranches.map((item) => item.mobile))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("mobile").localeCompare(row2.getValue("mobile"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Mobile",
        readOnly: true,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockBranches.map((item) => item.email))],
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
      size: isMobile ? 180 : 250,
      minSize: 180,
      meta: {
        exportLabel: "Email",
        readOnly: true,
      },
    },
    {
      accessorKey: "website",
      title: "Website",
      options: [...new Set(mockBranches.map((item) => item.website))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("website").localeCompare(row2.getValue("website"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Website",
        readOnly: true,
      },
    },
    {
      accessorKey: "address",
      title: "Address",
      options: [...new Set(mockBranches.map((item) => item.address))],
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
      size: isMobile ? 200 : 250,
      minSize: 180,
      meta: {
        exportLabel: "Address",
        readOnly: true,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockBranches.map((item) => item.country))],
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
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "Country",
        readOnly: true,
      },
    },
    {
      accessorKey: "state",
      title: "State",
      options: [...new Set(mockBranches.map((item) => item.state))],
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
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "State",
        readOnly: true,
      },
    },
    {
      accessorKey: "city",
      title: "City",
      options: [...new Set(mockBranches.map((item) => item.city))],
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
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "City",
        readOnly: true,
      },
    },
    {
      accessorKey: "postCode",
      title: "Post Code",
      options: [...new Set(mockBranches.map((item) => item.postCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("postCode")
          .localeCompare(row2.getValue("postCode"));
      },
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "Post Code",
        readOnly: true,
      },
    },
    {
      accessorKey: "bankDetails",
      title: "Bank Details",
      options: [...new Set(mockBranches.map((item) => item.bankDetails))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("bankDetails")
          .localeCompare(row2.getValue("bankDetails"));
      },
      size: isMobile ? 200 : 250,
      minSize: 180,
      meta: {
        exportLabel: "Bank Details",
        readOnly: true,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("createdAt"));
        const date2 = new Date(row2.getValue("createdAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
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
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("updatedAt"));
        const date2 = new Date(row2.getValue("updatedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
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
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("draftedAt"));
        const date2 = new Date(row2.getValue("draftedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockBranches.filter((item: BranchItem) => {
    // States use the same flags for demo
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
      fixedColumns={["code", "status"]}
      pathName="branches"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      showImages={false}
    />
  );
}
