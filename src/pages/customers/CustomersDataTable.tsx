/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";

type Customer = {
  id: string;
  customerNo: string;
  customerName: string;
  shortName?: string;
  inActive: boolean;
  vatNumber?: string;
  vendorCode?: string;
  paymentMode: "Cash" | "Card" | "Bank Transfer" | "Mobile Payment";
  currency: "USD" | "EUR" | "BDT" | "INR" | "GBP";
  phone?: string;
  fax?: string;
  mobile?: string;
  whatsapp?: string;
  country: string;
  state: string;
  city?: string;
  postCode?: string;
  address?: string;
  email?: string;
  website?: string;
  language: "English" | "Bengali" | "Hindi" | "Spanish" | "French";
  locationUrl?: string;
  customerLogo?: string; // URL
  status: "active" | "inactive" | "draft";
  isActive: boolean;
  isDeleted: boolean;
  isDraft: boolean;
  isUpdated: boolean;
  actionMessage: string;
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
};
const customers: Customer[] = [
  {
    id: "1",
    customerNo: "CUST001",
    customerName: "Global Tech Inc",
    shortName: "GTI",
    inActive: false,
    vatNumber: "VAT001234",
    vendorCode: "VEND001",
    paymentMode: "Bank Transfer",
    currency: "USD",
    phone: "+1-202-555-0100",
    fax: "+1-202-555-0110",
    mobile: "+1-202-555-0120",
    whatsapp: "+1-202-555-0120",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    postCode: "90001",
    address: "123 Silicon Ave",
    email: "support@globaltech.com",
    website: "https://globaltech.com",
    language: "English",
    locationUrl: "https://maps.example.com/globaltech",
    customerLogo: "https://example.com/logos/globaltech.png",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Customer created",
    createdAt: "2023-01-10",
    updatedAt: "2023-04-20",
    draftedAt: "",
  },
  {
    id: "2",
    customerNo: "CUST002",
    customerName: "Dhaka Electronics",
    shortName: "DE",
    inActive: false,
    vatNumber: "VATBD1245",
    vendorCode: "VEND002",
    paymentMode: "Cash",
    currency: "BDT",
    phone: "+880-2-9889988",
    mobile: "+880-1711-123456",
    whatsapp: "+880-1711-123456",
    country: "Bangladesh",
    state: "Dhaka",
    city: "Dhaka",
    postCode: "1212",
    address: "Gulshan-1, Dhaka",
    email: "info@dhakaelectronics.com",
    website: "http://dhakaelectronics.com",
    language: "Bengali",
    locationUrl: "https://maps.example.com/dhakaelectronics",
    customerLogo: "https://example.com/logos/dhakaelectronics.png",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Customer info updated",
    createdAt: "2023-02-15",
    updatedAt: "2023-06-01",
    draftedAt: "",
  },
  {
    id: "3",
    customerNo: "CUST003",
    customerName: "Mumbai Textiles",
    shortName: "MTX",
    inActive: true,
    vatNumber: "VATIN9981",
    vendorCode: "VEND003",
    paymentMode: "Card",
    currency: "INR",
    mobile: "+91-98201-12345",
    whatsapp: "+91-98201-12345",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    postCode: "400001",
    address: "Dadar East, Mumbai",
    email: "contact@mtx.in",
    website: "https://mtx.in",
    language: "Hindi",
    locationUrl: "",
    customerLogo: "",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Customer deactivated",
    createdAt: "2022-11-20",
    updatedAt: "2023-01-01",
    draftedAt: "",
  },
  {
    id: "4",
    customerNo: "CUST004",
    customerName: "Eurozone Imports",
    inActive: false,
    paymentMode: "Card",
    currency: "EUR",
    country: "Germany",
    state: "Bavaria",
    email: "sales@eurozone.com",
    language: "French",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Imported successfully",
    createdAt: "2023-03-22",
    updatedAt: "2023-03-25",
    draftedAt: "",
  },
  {
    id: "5",
    customerNo: "CUST005",
    customerName: "London Supplies Ltd",
    shortName: "LSL",
    inActive: false,
    vendorCode: "VEND005",
    paymentMode: "Bank Transfer",
    currency: "GBP",
    phone: "+44-20-7946-0958",
    country: "United Kingdom",
    state: "England",
    city: "London",
    postCode: "SW1A 1AA",
    email: "admin@londonsupplies.co.uk",
    website: "https://londonsupplies.co.uk",
    language: "English",
    locationUrl: "",
    customerLogo: "",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Created as draft",
    createdAt: "2023-06-01",
    updatedAt: "",
    draftedAt: "2023-06-01",
  },
  {
    id: "6",
    customerNo: "CUST006",
    customerName: "Barcelona Beverages",
    shortName: "BBEV",
    inActive: false,
    paymentMode: "Cash",
    currency: "EUR",
    phone: "+34-91-1234567",
    country: "Spain",
    state: "Catalonia",
    city: "Barcelona",
    email: "contact@bbev.es",
    language: "Spanish",
    customerLogo: "https://example.com/logos/bbev.png",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Customer registered",
    createdAt: "2023-07-15",
    updatedAt: "2023-08-10",
    draftedAt: "",
  },
  {
    id: "7",
    customerNo: "CUST007",
    customerName: "Karachi Wholesalers",
    shortName: "KWS",
    inActive: false,
    paymentMode: "Mobile Payment",
    currency: "USD",
    country: "Pakistan",
    state: "Sindh",
    email: "info@karachiw.com",
    language: "English",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Customer deleted",
    createdAt: "2022-06-10",
    updatedAt: "2022-10-10",
    draftedAt: "",
  },
  {
    id: "8",
    customerNo: "CUST008",
    customerName: "Chittagong Steel",
    inActive: true,
    paymentMode: "Bank Transfer",
    currency: "BDT",
    country: "Bangladesh",
    state: "Chittagong",
    email: "sales@ctgsteel.com",
    language: "Bengali",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Inactive due to debt",
    createdAt: "2023-02-01",
    updatedAt: "2023-02-20",
    draftedAt: "",
  },
  {
    id: "9",
    customerNo: "CUST009",
    customerName: "New York Goods",
    inActive: false,
    paymentMode: "Card",
    currency: "USD",
    country: "United States",
    state: "New York",
    email: "contact@nygoods.com",
    language: "English",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated payment info",
    createdAt: "2023-01-05",
    updatedAt: "2023-07-07",
    draftedAt: "",
  },
  {
    id: "10",
    customerNo: "CUST010",
    customerName: "Paris Decor",
    shortName: "PDECOR",
    inActive: false,
    vendorCode: "VEND010",
    paymentMode: "Cash",
    currency: "EUR",
    country: "France",
    state: "Île-de-France",
    city: "Paris",
    email: "hello@parisdecor.fr",
    website: "https://parisdecor.fr",
    language: "French",
    customerLogo: "https://example.com/logos/parisdecor.png",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Waiting for approval",
    createdAt: "2023-08-01",
    updatedAt: "",
    draftedAt: "2023-08-01",
  },
];

export default function CustomersDataTable({
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
  const componentColumns = [
    {
      accessorKey: "customerName",
      title: "Customer Name",
      options: [...new Set(customers.map((item) => item.customerName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerName")
          .localeCompare(row2.getValue("customerName"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "customerName",
      },
    },
    {
      accessorKey: "shortName",
      title: "Short Name",
      options: [
        ...new Set(customers.map((item) => item.shortName).filter(Boolean)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("shortName")
          .localeCompare(row2.getValue("shortName"));
      },
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "shortName",
      },
    },
    {
      accessorKey: "customerNo",
      title: "Customer No",
      options: [...new Set(customers.map((item) => item.customerNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerNo")
          .localeCompare(row2.getValue("customerNo"));
      },
      size: 120,
      minSize: 80,
      meta: {
        exportLabel: "customerNo",
      },
    },

    {
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(customers.map((item) => item.currency))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("currency")
          .localeCompare(row2.getValue("currency"));
      },
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "currency",
      },
    },
    {
      accessorKey: "vatNumber",
      title: "VAT Number",
      options: [
        ...new Set(customers.map((item) => item.vatNumber).filter(Boolean)),
      ],
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
      minSize: 100,
      meta: {
        exportLabel: "vatNumber",
      },
    },
    {
      accessorKey: "vendorCode",
      title: "Vendor Code",
      options: [
        ...new Set(customers.map((item) => item.vendorCode).filter(Boolean)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("vendorCode")
          .localeCompare(row2.getValue("vendorCode"));
      },
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "vendorCode",
      },
    },
    {
      accessorKey: "phone",
      title: "Phone",
      options: [
        ...new Set(customers.map((item) => item.phone).filter(Boolean)),
      ],
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
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "phone",
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [
        ...new Set(customers.map((item) => item.email).filter(Boolean)),
      ],
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
      minSize: 100,
      meta: {
        exportLabel: "email",
      },
    },
    {
      accessorKey: "paymentMode",
      title: "Payment Mode",
      options: [...new Set(customers.map((item) => item.paymentMode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("paymentMode")
          .localeCompare(row2.getValue("paymentMode"));
      },
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "paymentMode",
      },
    },

    {
      accessorKey: "status",
      title: "Status",
      options: ["active", "inactive", "draft"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 120,
      minSize: 80,
      meta: {
        exportLabel: "status",
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
      size: 130,
      minSize: 100,
      meta: {
        exportLabel: "createdAt",
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
      size: 130,
      minSize: 100,
      meta: {
        exportLabel: "updatedAt",
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
      size: 130,
      minSize: 100,
      meta: {
        exportLabel: "draftedAt",
      },
    },
  ];

  const filteredData = customers.filter((country) => {
    if (dataTableFilter.status === "Active") {
      return country.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !country.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return country.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return country.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return country.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["customerName"]} // Pin country name column
      searchQuery={searchQuery}
      pathName={"customers"}
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      setIsFilterOpen={setIsFilterOpen}
      isFilterOpen={isFilterOpen}
    />
  );
}
