/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockConsignees = [
  {
    id: "1",
    customerCode: "CS001",
    customerName: "Al-Rashid Trading Company",
    notification: "Email & SMS",
    country: "Saudi Arabia",
    zipCode: "21452",
    address: "King Fahd Road, Jeddah",
    landmark: "Near King Abdulaziz International Airport",
    poBox: "12345",
    currency: "SAR",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "50000",
    mobileNo: "+966-50-123-4567",
    contactPerson: "Ahmed Al-Rashid",
    faxNo: "+966-12-123-4568",
    phoneNo: "+966-12-123-4567",
    website: "www.alrashid-trading.sa",
    email: "info@alrashid-trading.sa",
    status: "active",
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
    customerCode: "CS002",
    customerName: "Al-Zahrani Enterprises",
    notification: "Email",
    country: "Saudi Arabia",
    zipCode: "31451",
    address: "King Khalid Road, Dammam",
    landmark: "Near King Fahd International Airport",
    poBox: "23456",
    currency: "SAR",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "75000",
    mobileNo: "+966-50-234-5678",
    contactPerson: "Mohammed Al-Zahrani",
    faxNo: "+966-13-234-5679",
    phoneNo: "+966-13-234-5678",
    website: "www.alzahrani-enterprises.sa",
    email: "info@alzahrani-enterprises.sa",
    status: "active",
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
    customerCode: "CS003",
    customerName: "Al-Otaibi Industries",
    notification: "SMS & WhatsApp",
    country: "Saudi Arabia",
    zipCode: "41912",
    address: "Industrial City Road, Yanbu",
    landmark: "Near Yanbu Industrial City",
    poBox: "34567",
    currency: "SAR",
    paymentTerms: "Net 60",
    creditPeriod: "60 days",
    creditLimit: "100000",
    mobileNo: "+966-50-345-6789",
    contactPerson: "Khalid Al-Otaibi",
    faxNo: "+966-14-345-6790",
    phoneNo: "+966-14-345-6789",
    website: "www.alotaibi-industries.sa",
    email: "info@alotaibi-industries.sa",
    status: "active",
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
    customerCode: "CS004",
    customerName: "Al-Shehri Solutions",
    notification: "Email",
    country: "Saudi Arabia",
    zipCode: "31961",
    address: "Industrial City Road, Jubail",
    landmark: "Near Jubail Industrial City",
    poBox: "45678",
    currency: "SAR",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "60000",
    mobileNo: "+966-50-456-7890",
    contactPerson: "Omar Al-Shehri",
    faxNo: "+966-13-456-7891",
    phoneNo: "+966-13-456-7890",
    website: "www.alshehri-solutions.sa",
    email: "info@alshehri-solutions.sa",
    status: "active",
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
    customerCode: "CS005",
    customerName: "Al-Ghamdi Trading",
    notification: "SMS",
    country: "Saudi Arabia",
    zipCode: "23932",
    address: "Economic City Road, Rabigh",
    landmark: "Near King Abdullah Economic City",
    poBox: "56789",
    currency: "SAR",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "40000",
    mobileNo: "+966-50-567-8901",
    contactPerson: "Salman Al-Ghamdi",
    faxNo: "+966-12-567-8902",
    phoneNo: "+966-12-567-8901",
    website: "www.alghamdi-trading.sa",
    email: "info@alghamdi-trading.sa",
    status: "active",
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
    customerCode: "CS006",
    customerName: "Al-Harbi Corporation",
    notification: "Email & SMS",
    country: "Saudi Arabia",
    zipCode: "45142",
    address: "Economic City Road, Jizan",
    landmark: "Near Jizan Economic City",
    poBox: "67890",
    currency: "SAR",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "80000",
    mobileNo: "+966-50-678-9012",
    contactPerson: "Abdullah Al-Harbi",
    faxNo: "+966-17-678-9013",
    phoneNo: "+966-17-678-9012",
    website: "www.alharbi-corporation.sa",
    email: "info@alharbi-corporation.sa",
    status: "active",
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
    customerCode: "CS007",
    customerName: "Al-Maktoum Trading",
    notification: "Email",
    country: "UAE",
    zipCode: "00000",
    address: "Sheikh Zayed Road, Dubai",
    landmark: "Near Dubai Creek",
    poBox: "78901",
    currency: "AED",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "120000",
    mobileNo: "+971-50-789-0123",
    contactPerson: "Ali Al-Maktoum",
    faxNo: "+971-4-789-0124",
    phoneNo: "+971-4-789-0123",
    website: "www.almaktoum-trading.ae",
    email: "info@almaktoum-trading.ae",
    status: "active",
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
    customerCode: "CS008",
    customerName: "Al-Nahyan Enterprises",
    notification: "SMS & WhatsApp",
    country: "UAE",
    zipCode: "00000",
    address: "Corniche Road, Abu Dhabi",
    landmark: "Near Mina Zayed",
    poBox: "89012",
    currency: "AED",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "150000",
    mobileNo: "+971-50-890-1234",
    contactPerson: "Fatima Al-Nahyan",
    faxNo: "+971-2-890-1235",
    phoneNo: "+971-2-890-1234",
    website: "www.alnahyan-enterprises.ae",
    email: "info@alnahyan-enterprises.ae",
    status: "active",
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
    customerCode: "CS009",
    customerName: "Al-Qasimi Trading",
    notification: "Email",
    country: "UAE",
    zipCode: "00000",
    address: "Al Wahda Street, Sharjah",
    landmark: "Near Khalid Port",
    poBox: "90123",
    currency: "AED",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "90000",
    mobileNo: "+971-50-901-2345",
    contactPerson: "Hassan Al-Qasimi",
    faxNo: "+971-6-901-2346",
    phoneNo: "+971-6-901-2345",
    website: "www.alqasimi-trading.ae",
    email: "info@alqasimi-trading.ae",
    status: "active",
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
    customerCode: "CS010",
    customerName: "Al-Sharqi Corporation",
    notification: "SMS",
    country: "UAE",
    zipCode: "00000",
    address: "Free Zone Road, Fujairah",
    landmark: "Near Fujairah Free Zone",
    poBox: "01234",
    currency: "AED",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "70000",
    mobileNo: "+971-50-012-3456",
    contactPerson: "Rashid Al-Sharqi",
    faxNo: "+971-9-012-3457",
    phoneNo: "+971-9-012-3456",
    website: "www.alsharqi-corporation.ae",
    email: "info@alsharqi-corporation.ae",
    status: "active",
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
    customerCode: "CS011",
    customerName: "Al-Sabah Trading",
    notification: "Email & SMS",
    country: "Kuwait",
    zipCode: "00000",
    address: "Gulf Road, Kuwait City",
    landmark: "Near Shuwaikh Port",
    poBox: "12345",
    currency: "KWD",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "100000",
    mobileNo: "+965-50-123-4567",
    contactPerson: "Nasser Al-Sabah",
    faxNo: "+965-1-123-4568",
    phoneNo: "+965-1-123-4567",
    website: "www.alsabah-trading.kw",
    email: "info@alsabah-trading.kw",
    status: "active",
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
    customerCode: "CS012",
    customerName: "Al-Khalifa Enterprises",
    notification: "Email",
    country: "Bahrain",
    zipCode: "00000",
    address: "King Faisal Highway, Manama",
    landmark: "Near Khalifa Bin Salman Port",
    poBox: "23456",
    currency: "BHD",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "80000",
    mobileNo: "+973-50-234-5678",
    contactPerson: "Khalid Al-Khalifa",
    faxNo: "+973-17-234-5679",
    phoneNo: "+973-17-234-5678",
    website: "www.alkhalifa-enterprises.bh",
    email: "info@alkhalifa-enterprises.bh",
    status: "active",
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
    customerCode: "CS013",
    customerName: "Al-Thani Trading Company",
    notification: "Email & SMS",
    country: "Qatar",
    zipCode: "00000",
    address: "Corniche Road, Doha",
    landmark: "Near Doha Bay",
    poBox: "34567",
    currency: "QAR",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "120000",
    mobileNo: "+974-50-345-6789",
    contactPerson: "Hamad Al-Thani",
    faxNo: "+974-4-345-6790",
    phoneNo: "+974-4-345-6789",
    website: "www.althani-trading.qa",
    email: "info@althani-trading.qa",
    status: "active",
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
    customerCode: "CS014",
    customerName: "Al-Said Enterprises",
    notification: "Email",
    country: "Oman",
    zipCode: "00000",
    address: "Sultan Qaboos Street, Muscat",
    landmark: "Near Sultan Qaboos Port",
    poBox: "45678",
    currency: "OMR",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "90000",
    mobileNo: "+968-50-456-7890",
    contactPerson: "Sultan Al-Said",
    faxNo: "+968-24-456-7891",
    phoneNo: "+968-24-456-7890",
    website: "www.alsaid-enterprises.om",
    email: "info@alsaid-enterprises.om",
    status: "active",
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
    customerCode: "CS015",
    customerName: "Al-Hashemi Corporation",
    notification: "SMS & WhatsApp",
    country: "Jordan",
    zipCode: "00000",
    address: "King Hussein Street, Amman",
    landmark: "Near Red Sea",
    poBox: "56789",
    currency: "JOD",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "75000",
    mobileNo: "+962-50-567-8901",
    contactPerson: "Abdullah Al-Hashemi",
    faxNo: "+962-3-567-8902",
    phoneNo: "+962-3-567-8901",
    website: "www.alhashemi-corporation.jo",
    email: "info@alhashemi-corporation.jo",
    status: "active",
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
    customerCode: "CS016",
    customerName: "Aoun Trading Solutions",
    notification: "Email",
    country: "Lebanon",
    zipCode: "00000",
    address: "Beirut Street, Beirut",
    landmark: "Near Beirut Harbor",
    poBox: "67890",
    currency: "LBP",
    paymentTerms: "Net 60",
    creditPeriod: "60 days",
    creditLimit: "60000",
    mobileNo: "+961-50-678-9012",
    contactPerson: "Michel Aoun",
    faxNo: "+961-1-678-9013",
    phoneNo: "+961-1-678-9012",
    website: "www.aoun-trading.lb",
    email: "info@aoun-trading.lb",
    status: "draft",
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
    customerCode: "CS017",
    customerName: "El-Sisi Enterprises",
    notification: "SMS & WhatsApp",
    country: "Egypt",
    zipCode: "00000",
    address: "Nile Street, Cairo",
    landmark: "Near Mediterranean Sea",
    poBox: "78901",
    currency: "EGP",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "80000",
    mobileNo: "+20-50-789-0123",
    contactPerson: "Ahmed El-Sisi",
    faxNo: "+20-3-789-0124",
    phoneNo: "+20-3-789-0123",
    website: "www.elsisi-enterprises.eg",
    email: "info@elsisi-enterprises.eg",
    status: "active",
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
    customerCode: "CS018",
    customerName: "Al-Kadhimi Trading",
    notification: "Email",
    country: "Iraq",
    zipCode: "00000",
    address: "Tigris Street, Baghdad",
    landmark: "Near Shatt al-Arab",
    poBox: "89012",
    currency: "IQD",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "70000",
    mobileNo: "+964-50-890-1234",
    contactPerson: "Mustafa Al-Kadhimi",
    faxNo: "+964-40-890-1235",
    phoneNo: "+964-40-890-1234",
    website: "www.alkadhimi-trading.iq",
    email: "info@alkadhimi-trading.iq",
    status: "active",
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
    customerCode: "CS019",
    customerName: "Erdogan Trading",
    notification: "Email & SMS",
    country: "Turkey",
    zipCode: "00000",
    address: "Bosphorus Street, Istanbul",
    landmark: "Near Bosphorus Strait",
    poBox: "90123",
    currency: "TRY",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "100000",
    mobileNo: "+90-50-901-2345",
    contactPerson: "Recep Erdogan",
    faxNo: "+90-212-901-2346",
    phoneNo: "+90-212-901-2345",
    website: "www.erdogan-trading.tr",
    email: "info@erdogan-trading.tr",
    status: "active",
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
    customerCode: "CS020",
    customerName: "Mitsotakis Enterprises",
    notification: "SMS",
    country: "Greece",
    zipCode: "00000",
    address: "Aegean Street, Athens",
    landmark: "Near Athens",
    poBox: "01234",
    currency: "EUR",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "90000",
    mobileNo: "+30-50-012-3456",
    contactPerson: "Kyriakos Mitsotakis",
    faxNo: "+30-210-012-3457",
    phoneNo: "+30-210-012-3456",
    website: "www.mitsotakis-enterprises.gr",
    email: "info@mitsotakis-enterprises.gr",
    status: "inactive",
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

export default function ConsigneeMasterDataTable({
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
  const canCreate = usePermission("consigneeMaster", "create");

  const componentColumns = [
    {
      accessorKey: "customerCode",
      title: "Customer Code",
      options: [...new Set(mockConsignees.map((item) => item.customerCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerCode")
          .localeCompare(row2.getValue("customerCode"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "customerCode",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customerName",
      title: "Customer Name",
      options: [...new Set(mockConsignees.map((item) => item.customerName))],
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
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "customerName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockConsignees.map((item) => item.country))],
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
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(mockConsignees.map((item) => item.currency))],
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
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "currency",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "paymentTerms",
      title: "Payment Terms",
      options: [...new Set(mockConsignees.map((item) => item.paymentTerms))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("paymentTerms")
          .localeCompare(row2.getValue("paymentTerms"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "paymentTerms",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "creditLimit",
      title: "Credit Limit",
      options: [...new Set(mockConsignees.map((item) => item.creditLimit))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("creditLimit")
          .localeCompare(row2.getValue("creditLimit"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "creditLimit",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "contactPerson",
      title: "Contact Person",
      options: [...new Set(mockConsignees.map((item) => item.contactPerson))],
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "contactPerson",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "mobileNo",
      title: "Mobile No.",
      options: [...new Set(mockConsignees.map((item) => item.mobileNo))],
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
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockConsignees.map((item) => item.email))],
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

  const filteredData = mockConsignees.filter((consignee) => {
    if (dataTableFilter.status === "Active") {
      return consignee.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !consignee.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return consignee.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return consignee.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return consignee.isUpdated;
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
      fixedColumns={["customerCode"]} // Pin customer code column
      pathName="consignee-master"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
