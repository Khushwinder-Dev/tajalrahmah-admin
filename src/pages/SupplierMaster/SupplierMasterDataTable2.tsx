/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// update

const mockHoliday = [
  {
    id: 1,
    supplierName: "Global Express Logistics",
    landMark: "Near Motijheel Commercial Area",
    notification: "Delivery expected within 3-5 business days",
    address: "House 12, Road 5, Dhanmondi, Dhaka-1205, Bangladesh",
    contactPerson: "Mr. Rahim Uddin",
    code: "COD-571",
    phone: "+8801712345678",
    country: "Bangladesh",
    fax: "+88029567890",
    email: "info@globalexpress.com",
    website: "https://www.globalexpress.com",
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
    supplierName: "Bangla Cargo Services",
    landMark: "Beside Hazrat Shahjalal Airport",
    notification: "Next-day air freight available",
    address: "Cargo Gate, Airport Road, Dhaka-1229, Bangladesh",
    contactPerson: "Ms. Ayesha Khan",
    code: "COD-572",
    phone: "+8801811223344",
    country: "Bangladesh",
    fax: "+88029876543",
    email: "support@banglacargo.com",
    website: "https://www.banglacargo.com",
    status: "inactive",
    createdAt: "2023-02-10",
    updatedAt: "2023-10-18",
    draftedAt: "2023-02-05",
    actionMessage: "4h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: 3,
    supplierName: "Dhaka Freight Movers",
    landMark: "Kawran Bazar Bus Terminal",
    notification: "Heavy load trucking available",
    address: "Plot 45, Kawran Bazar, Dhaka-1215",
    contactPerson: "Mr. Kamal Hossain",
    code: "COD-573",
    phone: "+8801911223344",
    country: "Bangladesh",
    fax: "+88029561123",
    email: "contact@dhakafreight.com",
    website: "https://www.dhakafreight.com",
    status: "draft",
    createdAt: "2023-03-12",
    updatedAt: "2023-09-25",
    draftedAt: "2023-03-08",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 4,
    supplierName: "Chittagong Port Logistics",
    landMark: "Near Chittagong Port Gate 2",
    notification: "Container handling within 48 hours",
    address: "Dock Road, Agrabad, Chattogram-4100",
    contactPerson: "Capt. Nurul Islam",
    code: "COD-574",
    phone: "+8801711556677",
    country: "Bangladesh",
    fax: "+880312223344",
    email: "info@ctgportlogistics.com",
    website: "https://www.ctgportlogistics.com",
    status: "active",
    createdAt: "2023-04-05",
    updatedAt: "2023-09-12",
    draftedAt: "2023-04-01",
    actionMessage: "Ongoing shipment",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 5,
    supplierName: "Sylhet Parcel Express",
    landMark: "Ambarkhana Bus Stand",
    notification: "Regional delivery within 24 hours",
    address: "Ambarkhana, Sylhet-3100, Bangladesh",
    contactPerson: "Mr. Tanvir Chowdhury",
    code: "COD-575",
    phone: "+8801922334455",
    country: "Bangladesh",
    fax: "+880821123456",
    email: "parcel@sylhetexpress.com",
    website: "https://www.sylhetexpress.com",
    status: "inactive",
    createdAt: "2023-05-22",
    updatedAt: "2023-09-10",
    draftedAt: "2023-05-18",
    actionMessage: "Service paused",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 6,
    supplierName: "Rajshahi Transport Co.",
    landMark: "Rail Station Road",
    notification: "Daily goods train service",
    address: "Station Road, Rajshahi-6000",
    contactPerson: "Mr. Jahangir Alam",
    code: "COD-576",
    phone: "+8801755667788",
    country: "Bangladesh",
    fax: "+880721445566",
    email: "support@rajtrans.com",
    website: "https://www.rajtrans.com",
    status: "active",
    createdAt: "2023-06-18",
    updatedAt: "2023-09-02",
    draftedAt: "2023-06-12",
    actionMessage: "Live tracking enabled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 7,
    supplierName: "Khulna Cargo Movers",
    landMark: "Near Khulna Shipyard",
    notification: "Sea cargo available weekly",
    address: "Shipyard Road, Khulna-9200",
    contactPerson: "Mr. Shafiqul Bari",
    code: "COD-577",
    phone: "+8801766778899",
    country: "Bangladesh",
    fax: "+88041788900",
    email: "khulna@cargomovers.com",
    website: "https://www.khulnacargomovers.com",
    status: "inactive",
    createdAt: "2023-07-14",
    updatedAt: "2023-08-25",
    draftedAt: "2023-07-10",
    actionMessage: "Awaiting documents",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 8,
    supplierName: "Barisal River Transport",
    landMark: "Launch Ghat, Barisal",
    notification: "River freight services twice a week",
    address: "Launch Terminal, Barisal-8200",
    contactPerson: "Mr. Mokbul Hossain",
    code: "COD-578",
    phone: "+8801788990011",
    country: "Bangladesh",
    fax: "+880431223344",
    email: "info@barisalriver.com",
    website: "https://www.barisalriver.com",
    status: "draft",
    createdAt: "2023-08-03",
    updatedAt: "2023-08-20",
    draftedAt: "2023-08-01",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 9,
    supplierName: "Mymensingh Logistics Ltd.",
    landMark: "College Road Bus Stand",
    notification: "Local trucking within 12 hours",
    address: "College Road, Mymensingh-2200",
    contactPerson: "Mr. Rashed Karim",
    code: "COD-579",
    phone: "+8801799001122",
    country: "Bangladesh",
    fax: "+88091677890",
    email: "support@mymensinghlogistics.com",
    website: "https://www.mymensinghlogistics.com",
    status: "active",
    createdAt: "2023-09-09",
    updatedAt: "2023-09-19",
    draftedAt: "2023-09-05",
    actionMessage: "Running delivery",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 10,
    supplierName: "Gazipur Industrial Transport",
    landMark: "Tongi Industrial Area",
    notification: "Factory goods distribution",
    address: "Tongi, Gazipur-1704, Bangladesh",
    contactPerson: "Mr. Mahbub Alam",
    code: "COD-580",
    phone: "+8801712334455",
    country: "Bangladesh",
    fax: "+88029877654",
    email: "gazipur@industrialtransport.com",
    website: "https://www.gazipurtransport.com",
    status: "inactive",
    createdAt: "2023-10-12",
    updatedAt: "2023-10-28",
    draftedAt: "2023-10-08",
    actionMessage: "Temporarily closed",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 11,
    supplierName: "Rangpur Parcel Line",
    landMark: "Shapla Chottor, Rangpur",
    notification: "North Bengal delivery within 48 hours",
    address: "Station Road, Rangpur-5400",
    contactPerson: "Mr. Habibur Rahman",
    code: "COD-581",
    phone: "+8801712889900",
    country: "Bangladesh",
    fax: "+880521223344",
    email: "info@rangpurparcel.com",
    website: "https://www.rangpurparcel.com",
    status: "draft",
    createdAt: "2023-11-05",
    updatedAt: "2023-11-15",
    draftedAt: "2023-11-01",
    actionMessage: "Draft entry",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 12,
    supplierName: "Comilla Transport Agency",
    landMark: "Kandirpar Bus Terminal",
    notification: "Daily passenger & goods transport",
    address: "Kandirpar, Comilla-3500",
    contactPerson: "Mr. Abdur Rahim",
    code: "COD-582",
    phone: "+8801712003344",
    country: "Bangladesh",
    fax: "+880817788990",
    email: "service@comillatransport.com",
    website: "https://www.comillatransport.com",
    status: "active",
    createdAt: "2023-12-01",
    updatedAt: "2023-12-18",
    draftedAt: "2023-11-28",
    actionMessage: "On schedule",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function SupplierMasterDataTable2({
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
      accessorKey: "supplierName",
      title: "Supplier Name",
      options: [...new Set(mockHoliday.map((item) => item.supplierName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("supplierName")
          .localeCompare(row2.getValue("supplierName"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "supplierName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "landMark",
      title: "landMark",
      options: [...new Set(mockHoliday.map((item) => item.landMark))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("landMark")
          .localeCompare(row2.getValue("landMark"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "landMark",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "notification",
      title: "notification",
      options: [...new Set(mockHoliday.map((item) => item.notification))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("notification")
          .localeCompare(row2.getValue("notification"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "notification",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "address",
      title: "address",
      options: [...new Set(mockHoliday.map((item) => item.address))],
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "address",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "phone",
      title: "phone",
      options: [...new Set(mockHoliday.map((item) => item.phone))],
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "phone",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "email",
      options: [...new Set(mockHoliday.map((item) => item.email))],
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "email",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "status",
      options: [...new Set(mockHoliday.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "status",
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
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockHoliday.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) => cellValue === filterVal);
      },
    },
  ];

  const filteredData = mockHoliday.filter((item) => {
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
      fixedColumns={["supplierName", "status"]} // Pin name column
      pathName="supplier-master"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
