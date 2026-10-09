/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockTransporters = [
  {
    id: "1",
    transporterCountry: "Saudi Arabia",
    transporterName: "Al-Rashid Transport Services",
    contactPerson: "Ahmed Al-Rashid",
    mobileNo: "+966-50-123-4567",
    phoneNo: "+966-11-234-5678",
    faxNo: "+966-11-234-5679",
    email: "ahmed@alrashid-transport.com",
    website: "www.alrashid-transport.com",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    transporterCountry: "UAE",
    transporterName: "Al-Zahrani Logistics",
    contactPerson: "Fatima Al-Zahrani",
    mobileNo: "+971-50-234-5678",
    phoneNo: "+971-4-345-6789",
    faxNo: "+971-4-345-6790",
    email: "fatima@alzahrani-logistics.com",
    website: "www.alzahrani-logistics.com",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    transporterCountry: "Kuwait",
    transporterName: "Al-Otaibi Freight Solutions",
    contactPerson: "Omar Al-Otaibi",
    mobileNo: "+965-50-345-6789",
    phoneNo: "+965-2-456-7890",
    faxNo: "+965-2-456-7891",
    email: "omar@alotaibi-freight.com",
    website: "www.alotaibi-freight.com",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    transporterCountry: "Qatar",
    transporterName: "Al-Shehri Cargo Services",
    contactPerson: "Aisha Al-Shehri",
    mobileNo: "+974-50-456-7890",
    phoneNo: "+974-4-567-8901",
    faxNo: "+974-4-567-8902",
    email: "aisha@alshehri-cargo.com",
    website: "www.alshehri-cargo.com",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    transporterCountry: "Bahrain",
    transporterName: "Al-Ghamdi Express",
    contactPerson: "Khalid Al-Ghamdi",
    mobileNo: "+973-50-567-8901",
    phoneNo: "+973-17-678-9012",
    faxNo: "+973-17-678-9013",
    email: "khalid@alghamdi-express.com",
    website: "www.alghamdi-express.com",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    transporterCountry: "Oman",
    transporterName: "Al-Harbi Shipping",
    contactPerson: "Salma Al-Harbi",
    mobileNo: "+968-50-678-9012",
    phoneNo: "+968-24-789-0123",
    faxNo: "+968-24-789-0124",
    email: "salma@alharbi-shipping.com",
    website: "www.alharbi-shipping.com",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    transporterCountry: "Jordan",
    transporterName: "Al-Maktoum Transport",
    contactPerson: "Hassan Al-Maktoum",
    mobileNo: "+962-79-789-0123",
    phoneNo: "+962-6-890-1234",
    faxNo: "+962-6-890-1235",
    email: "hassan@almaktoum-transport.com",
    website: "www.almaktoum-transport.com",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    transporterCountry: "Lebanon",
    transporterName: "Al-Nahyan Logistics",
    contactPerson: "Layla Al-Nahyan",
    mobileNo: "+961-70-890-1234",
    phoneNo: "+961-1-901-2345",
    faxNo: "+961-1-901-2346",
    email: "layla@alnahyan-logistics.com",
    website: "www.alnahyan-logistics.com",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    transporterCountry: "Egypt",
    transporterName: "Al-Qasimi Freight",
    contactPerson: "Youssef Al-Qasimi",
    mobileNo: "+20-10-901-2345",
    phoneNo: "+20-2-012-3456",
    faxNo: "+20-2-012-3457",
    email: "youssef@alqasimi-freight.com",
    website: "www.alqasimi-freight.com",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    transporterCountry: "Iraq",
    transporterName: "Al-Sharqi Cargo",
    contactPerson: "Noor Al-Sharqi",
    mobileNo: "+964-750-012-3456",
    phoneNo: "+964-1-123-4567",
    faxNo: "+964-1-123-4568",
    email: "noor@alsharqi-cargo.com",
    website: "www.alsharqi-cargo.com",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    transporterCountry: "Turkey",
    transporterName: "Al-Sabah Express",
    contactPerson: "Mehmet Al-Sabah",
    mobileNo: "+90-532-123-4567",
    phoneNo: "+90-212-234-5678",
    faxNo: "+90-212-234-5679",
    email: "mehmet@alsabah-express.com",
    website: "www.alsabah-express.com",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    transporterCountry: "Iran",
    transporterName: "Al-Khalifa Shipping",
    contactPerson: "Reza Al-Khalifa",
    mobileNo: "+98-912-234-5678",
    phoneNo: "+98-21-345-6789",
    faxNo: "+98-21-345-6790",
    email: "reza@alkhalifa-shipping.com",
    website: "www.alkhalifa-shipping.com",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    transporterCountry: "Pakistan",
    transporterName: "Al-Thani Transport Co",
    contactPerson: "Ali Al-Thani",
    mobileNo: "+92-300-123-4567",
    phoneNo: "+92-21-234-5678",
    faxNo: "+92-21-234-5679",
    email: "ali@althani-transport.com",
    website: "www.althani-transport.com",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    transporterCountry: "India",
    transporterName: "Al-Said Logistics",
    contactPerson: "Sara Al-Said",
    mobileNo: "+91-987-234-5678",
    phoneNo: "+91-11-345-6789",
    faxNo: "+91-11-345-6790",
    email: "sara@alsaid-logistics.com",
    website: "www.alsaid-logistics.com",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    transporterCountry: "China",
    transporterName: "Al-Hashemi Freight",
    contactPerson: "Ahmed Al-Hashemi",
    mobileNo: "+86-138-345-6789",
    phoneNo: "+86-10-456-7890",
    faxNo: "+86-10-456-7891",
    email: "ahmed@alhashemi-freight.com",
    website: "www.alhashemi-freight.com",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    transporterCountry: "Japan",
    transporterName: "Aoun Cargo Solutions",
    contactPerson: "Fatima Aoun",
    mobileNo: "+81-90-456-7890",
    phoneNo: "+81-3-567-8901",
    faxNo: "+81-3-567-8902",
    email: "fatima@aoun-cargo.com",
    website: "www.aoun-cargo.com",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    transporterCountry: "South Korea",
    transporterName: "El-Sisi Express",
    contactPerson: "Omar El-Sisi",
    mobileNo: "+82-10-567-8901",
    phoneNo: "+82-2-678-9012",
    faxNo: "+82-2-678-9013",
    email: "omar@elsisi-express.com",
    website: "www.elsisi-express.com",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    transporterCountry: "Singapore",
    transporterName: "Al-Kadhimi Shipping",
    contactPerson: "Layla Al-Kadhimi",
    mobileNo: "+65-912-678-9012",
    phoneNo: "+65-6-789-0123",
    faxNo: "+65-6-789-0124",
    email: "layla@alkadhimi-shipping.com",
    website: "www.alkadhimi-shipping.com",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    transporterCountry: "Malaysia",
    transporterName: "Erdogan Trading",
    contactPerson: "Recep Erdogan",
    mobileNo: "+60-12-789-0123",
    phoneNo: "+60-3-890-1234",
    faxNo: "+60-3-890-1235",
    email: "recep@erdogan-trading.com",
    website: "www.erdogan-trading.com",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    transporterCountry: "Thailand",
    transporterName: "Mitsotakis Enterprises",
    contactPerson: "Kyriakos Mitsotakis",
    mobileNo: "+66-81-890-1234",
    phoneNo: "+66-2-901-2345",
    faxNo: "+66-2-901-2346",
    email: "kyriakos@mitsotakis-enterprises.com",
    website: "www.mitsotakis-enterprises.com",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function TransporterDataTable({
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
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const canCreate = usePermission("transporter", "create");
  const canViewTransporterCountry = usePermission(
    "transporter",
    "view",
    "transporterCountry"
  );
  const canViewTransporterName = usePermission(
    "transporter",
    "view",
    "transporterName"
  );
  const canViewContactPerson = usePermission(
    "transporter",
    "view",
    "contactPerson"
  );
  const canViewMobileNo = usePermission("transporter", "view", "mobileNo");
  const canViewPhoneNo = usePermission("transporter", "view", "phoneNo");
  const canViewFaxNo = usePermission("transporter", "view", "faxNo");
  const canViewEmail = usePermission("transporter", "view", "email");
  const canViewWebsite = usePermission("transporter", "view", "website");
  const canViewCreatedAt = usePermission("transporter", "view", "createdAt");
  const canViewUpdatedAt = usePermission("transporter", "view", "updatedAt");

  const componentColumns = [
    {
      accessorKey: "transporterCountry",
      title: "Transporter Country",
      options: canViewTransporterCountry
        ? [...new Set(mockTransporters.map((item) => item.transporterCountry))]
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
          .getValue("transporterCountry")
          .localeCompare(row2.getValue("transporterCountry"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "transporterCountry",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "transporterName",
      title: "Transporter Name",
      options: canViewTransporterName
        ? [...new Set(mockTransporters.map((item) => item.transporterName))]
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
          .getValue("transporterName")
          .localeCompare(row2.getValue("transporterName"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "transporterName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "contactPerson",
      title: "Contact Person",
      options: canViewContactPerson
        ? [...new Set(mockTransporters.map((item) => item.contactPerson))]
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
          .getValue("contactPerson")
          .localeCompare(row2.getValue("contactPerson"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "contactPerson",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "mobileNo",
      title: "Mobile No.",
      options: canViewMobileNo
        ? [...new Set(mockTransporters.map((item) => item.mobileNo))]
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
          .getValue("mobileNo")
          .localeCompare(row2.getValue("mobileNo"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "mobileNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "phoneNo",
      title: "Phone No.",
      options: canViewPhoneNo
        ? [...new Set(mockTransporters.map((item) => item.phoneNo))]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("phoneNo").localeCompare(row2.getValue("phoneNo"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "phoneNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "faxNo",
      title: "Fax No.",
      options: canViewFaxNo
        ? [...new Set(mockTransporters.map((item) => item.faxNo))]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("faxNo").localeCompare(row2.getValue("faxNo"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "faxNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: canViewEmail
        ? [...new Set(mockTransporters.map((item) => item.email))]
        : [],
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
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "email",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "website",
      title: "Website",
      options: canViewWebsite
        ? [...new Set(mockTransporters.map((item) => item.website))]
        : [],
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
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "website",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: canViewCreatedAt ? [] : [], // Dates are typically not filtered with predefined options
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
      options: canViewUpdatedAt ? [] : [], // Dates are typically not filtered with predefined options
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockTransporters.filter((transporter) => {
    if (dataTableFilter.status === "Active") {
      return transporter.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !transporter.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return transporter.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return transporter.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return transporter.isUpdated;
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
      fixedColumns={["transporterCountry"]} // Pin Transporter Country column
      pathName="transporter"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
