/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Deliveryman interface to match the grid component
interface DeliverymanItem {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  nationalId: string;
  vehicleType: string;
  assignedArea: string;
  customerLogo: string;
  status: "Active" | "Inactive" | "Draft" | "Delete";
}

const mockDeliverymen: DeliverymanItem[] = [
  {
    id: "1",
    code: "DM-001",
    name: "John Doe",
    phone: "+1 202-555-0147",
    email: "john.doe@example.com",
    address: "123 Main St, New York, USA",
    nationalId: "A123456789",
    vehicleType: "Bike",
    assignedArea: "Manhattan",
    customerLogo: "/sample1.png",
    status: "Active",
  },
  {
    id: "2",
    code: "DM-002",
    name: "Sarah Khan",
    phone: "+971 50 555 1234",
    email: "sarah.khan@example.com",
    address: "Al Barsha, Dubai, UAE",
    nationalId: "B987654321",
    vehicleType: "Car",
    assignedArea: "Al Barsha",
    customerLogo: "/sample1.png",
    status: "Inactive",
  },
  {
    id: "3",
    code: "DM-003",
    name: "Mike Lee",
    phone: "+44 20 7946 0958",
    email: "mike.lee@example.co.uk",
    address: "221B Baker St, London, UK",
    nationalId: "UK55667788",
    vehicleType: "Van",
    assignedArea: "Westminster",
    customerLogo: "/sample1.png",
    status: "Draft",
  },
];

export default function DeliverymanDataTable({
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
      options: [...new Set(mockDeliverymen.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: isMobile ? 100 : 140,
      minSize: 90,
      meta: {
        exportLabel: "Code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockDeliverymen.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: isMobile ? 160 : 220,
      minSize: 140,
      meta: {
        exportLabel: "Name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "phone",
      title: "Phone",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = String(row.getValue(columnId)).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(String(filterVal).toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("phone").localeCompare(row2.getValue("phone"));
      },
      size: isMobile ? 120 : 160,
      minSize: 110,
      meta: {
        exportLabel: "Phone",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockDeliverymen.map((item) => item.email))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: isMobile ? 160 : 220,
      minSize: 140,
      meta: {
        exportLabel: "Email",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "address",
      title: "Address",
      options: [...new Set(mockDeliverymen.map((item) => item.address))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("address").localeCompare(row2.getValue("address"));
      },
      size: isMobile ? 100 : 120,
      minSize: 90,
      meta: {
        exportLabel: "Address",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "nationalId",
      title: "National ID",
      options: [...new Set(mockDeliverymen.map((item) => item.nationalId))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("nationalId")
          .localeCompare(row2.getValue("nationalId"));
      },
      size: isMobile ? 140 : 200,
      minSize: 120,
      meta: {
        exportLabel: "National ID",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "vehicleType",
      title: "Vehicle Type",
      options: [...new Set(mockDeliverymen.map((item) => item.vehicleType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("vehicleType")
          .localeCompare(row2.getValue("vehicleType"));
      },
      size: isMobile ? 140 : 180,
      minSize: 120,
      meta: {
        exportLabel: "Vehicle Type",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "assignedArea",
      title: "Assigned Area",
      options: [...new Set(mockDeliverymen.map((item) => item.assignedArea))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("assignedArea")
          .localeCompare(row2.getValue("assignedArea"));
      },
      size: isMobile ? 160 : 220,
      minSize: 140,
      meta: {
        exportLabel: "Assigned Area",
        readOnly: !canCreate,
      },
    },
  ];

  const filteredData = mockDeliverymen.filter((item) => {
    const status = (dataTableFilter?.status as string) || "";
    if (!status) return true;
    if (status === "Deleted") return item.status === "Delete";
    return item.status.toLowerCase() === status.toLowerCase();
  });

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["code", "name"]}
      pathName="deliverymen"
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
