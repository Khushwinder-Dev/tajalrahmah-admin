/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Store interface to match the grid component
interface StoreItem {
  id: string;
  storeCode: string;
  storeName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  capacity: number;
  storeType: string;
  description: string;
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

const mockStores: StoreItem[] = [
  {
    id: "1",
    storeCode: "STR-001",
    storeName: "Downtown Central Store",
    phone: "+1-555-0101",
    email: "downtown@store.com",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    country: "USA",
    capacity: 500,
    storeType: "Supermarket",
    description:
      "Large supermarket in downtown area with full grocery selection",
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
    storeCode: "STR-002",
    storeName: "Westside Mall Store",
    phone: "+1-555-0102",
    email: "westside@store.com",
    address: "456 Oak Avenue",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    capacity: 300,
    storeType: "Department Store",
    description: "Modern department store in Westside Mall",
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
    storeCode: "STR-003",
    storeName: "North Point Store",
    phone: "+1-555-0103",
    email: "northpoint@store.com",
    address: "789 Pine Street",
    city: "Chicago",
    state: "IL",
    country: "USA",
    capacity: 400,
    storeType: "Hypermarket",
    description: "Large hypermarket with electronics and groceries",
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
    storeCode: "STR-004",
    storeName: "South Bay Store",
    phone: "+1-555-0104",
    email: "southbay@store.com",
    address: "321 Elm Street",
    city: "Miami",
    state: "FL",
    country: "USA",
    capacity: 250,
    storeType: "Convenience Store",
    description: "24/7 convenience store in South Bay area",
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
    storeCode: "STR-005",
    storeName: "East Village Store",
    phone: "+1-555-0105",
    email: "eastvillage@store.com",
    address: "654 Maple Drive",
    city: "Seattle",
    state: "WA",
    country: "USA",
    capacity: 350,
    storeType: "Supermarket",
    description: "Organic and specialty foods supermarket",
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
    storeCode: "STR-006",
    storeName: "Midtown Plaza Store",
    phone: "+1-555-0106",
    email: "midtown@store.com",
    address: "987 Cedar Lane",
    city: "Boston",
    state: "MA",
    country: "USA",
    capacity: 450,
    storeType: "Department Store",
    description: "Premium department store in Midtown Plaza",
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
    storeCode: "STR-007",
    storeName: "Riverside Store",
    phone: "+1-555-0107",
    email: "riverside@store.com",
    address: "147 River Road",
    city: "Portland",
    state: "OR",
    country: "USA",
    capacity: 200,
    storeType: "Convenience Store",
    description: "Small convenience store by the river",
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
    storeCode: "STR-008",
    storeName: "Highland Park Store",
    phone: "+1-555-0108",
    email: "highland@store.com",
    address: "258 Highland Avenue",
    city: "Denver",
    state: "CO",
    country: "USA",
    capacity: 600,
    storeType: "Hypermarket",
    description: "Large hypermarket with full range of products",
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
    storeCode: "STR-009",
    storeName: "Valley View Store",
    phone: "+1-555-0109",
    email: "valleyview@store.com",
    address: "369 Valley Street",
    city: "Phoenix",
    state: "AZ",
    country: "USA",
    capacity: 320,
    storeType: "Supermarket",
    description: "Family-friendly supermarket with pharmacy",
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
    storeCode: "STR-010",
    storeName: "Sunset Strip Store",
    phone: "+1-555-0110",
    email: "sunset@store.com",
    address: "741 Sunset Boulevard",
    city: "Las Vegas",
    state: "NV",
    country: "USA",
    capacity: 280,
    storeType: "Department Store",
    description: "Luxury department store on Sunset Strip",
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
    storeCode: "STR-011",
    storeName: "Garden District Store",
    phone: "+1-555-0111",
    email: "garden@store.com",
    address: "852 Garden Way",
    city: "New Orleans",
    state: "LA",
    country: "USA",
    capacity: 180,
    storeType: "Convenience Store",
    description: "Historic convenience store in Garden District",
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
    storeCode: "STR-012",
    storeName: "Mountain View Store",
    phone: "+1-555-0112",
    email: "mountain@store.com",
    address: "963 Mountain Road",
    city: "Salt Lake City",
    state: "UT",
    country: "USA",
    capacity: 420,
    storeType: "Hypermarket",
    description: "Large hypermarket with outdoor equipment section",
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

export default function StoreDataTable({
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
      accessorKey: "storeCode",
      title: "Store Code",
      options: [...new Set(mockStores.map((item) => item.storeCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("storeCode")
          .localeCompare(row2.getValue("storeCode"));
      },
      size: isMobile ? 130 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Store Code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "storeName",
      title: "Store Name",
      options: [...new Set(mockStores.map((item) => item.storeName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("storeName")
          .localeCompare(row2.getValue("storeName"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Store Name",
        readOnly: true,
      },
    },
    {
      accessorKey: "phone",
      title: "Phone",
      options: [...new Set(mockStores.map((item) => item.phone))],
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
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "Phone",
        readOnly: true,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockStores.map((item) => item.email))],
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
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Email",
        readOnly: true,
      },
    },
    {
      accessorKey: "address",
      title: "Address",
      options: [...new Set(mockStores.map((item) => item.address))],
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
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "Address",
        readOnly: true,
      },
    },
    {
      accessorKey: "city",
      title: "City",
      options: [...new Set(mockStores.map((item) => item.city))],
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
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "City",
        readOnly: true,
      },
    },
    {
      accessorKey: "state",
      title: "State",
      options: [...new Set(mockStores.map((item) => item.state))],
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
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "State",
        readOnly: true,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockStores.map((item) => item.country))],
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
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Country",
        readOnly: true,
      },
    },
    {
      accessorKey: "capacity",
      title: "Capacity",
      options: [...new Set(mockStores.map((item) => item.capacity))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("capacity") - row2.getValue("capacity");
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Capacity",
        readOnly: true,
      },
    },
    {
      accessorKey: "storeType",
      title: "Store Type",
      options: [...new Set(mockStores.map((item) => item.storeType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("storeType")
          .localeCompare(row2.getValue("storeType"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Store Type",
        readOnly: true,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockStores.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Description",
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

  const filteredData = mockStores.filter((item: StoreItem) => {
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
      fixedColumns={["storeCode", "status"]}
      pathName="store"
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
