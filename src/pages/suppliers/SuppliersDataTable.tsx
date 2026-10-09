/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockSuppliers = [
  {
    id: "1",
    sn: "001",
    country: "Saudi Arabia",
    supplierName: "Al-Rashid Trading Company",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Bank Guarantee",
    paymentType: "Bank Transfer",
    depositAmount: 50000,
    currency: "SAR",
    exchangeRate: 1.0,
    localAmt: 50000,
    contactPerson: "Ahmed Al-Rashid",
    mobileNo: "+966-50-123-4567",
    email: "ahmed@alrashid.com",
    website: "www.alrashid.com",
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
    sn: "002",
    country: "UAE",
    supplierName: "Al-Zahrani Enterprises",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Cash Deposit",
    paymentType: "Credit Card",
    depositAmount: 75000,
    currency: "AED",
    exchangeRate: 0.98,
    localAmt: 73500,
    contactPerson: "Fatima Al-Zahrani",
    mobileNo: "+971-50-987-6543",
    email: "fatima@alzahrani.ae",
    website: "www.alzahrani.ae",
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
    sn: "003",
    country: "Kuwait",
    supplierName: "Al-Otaibi Industries",
    paymentTerms: "Net 60",
    dueDays: 60,
    typeOfDeposit: "Letter of Credit",
    paymentType: "Wire Transfer",
    depositAmount: 100000,
    currency: "KWD",
    exchangeRate: 12.5,
    localAmt: 1250000,
    contactPerson: "Khalid Al-Otaibi",
    mobileNo: "+965-50-555-1234",
    email: "khalid@alotaibi.kw",
    website: "www.alotaibi.kw",
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
    sn: "004",
    country: "Qatar",
    supplierName: "Al-Shehri Solutions",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Performance Bond",
    paymentType: "Bank Transfer",
    depositAmount: 60000,
    currency: "QAR",
    exchangeRate: 1.02,
    localAmt: 61200,
    contactPerson: "Mariam Al-Shehri",
    mobileNo: "+974-50-777-8888",
    email: "mariam@alshehri.qa",
    website: "www.alshehri.qa",
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
    sn: "005",
    country: "Bahrain",
    supplierName: "Al-Ghamdi Trading",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Cash Deposit",
    paymentType: "Credit Card",
    depositAmount: 40000,
    currency: "BHD",
    exchangeRate: 10.0,
    localAmt: 400000,
    contactPerson: "Omar Al-Ghamdi",
    mobileNo: "+973-50-111-2222",
    email: "omar@alghamdi.bh",
    website: "www.alghamdi.bh",
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
    sn: "006",
    country: "Oman",
    supplierName: "Al-Harbi Corporation",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Bank Guarantee",
    paymentType: "Bank Transfer",
    depositAmount: 80000,
    currency: "OMR",
    exchangeRate: 9.8,
    localAmt: 784000,
    contactPerson: "Aisha Al-Harbi",
    mobileNo: "+968-50-333-4444",
    email: "aisha@alharbi.om",
    website: "www.alharbi.om",
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
    sn: "007",
    country: "Jordan",
    supplierName: "Al-Maktoum Trading",
    paymentTerms: "Net 60",
    dueDays: 60,
    typeOfDeposit: "Letter of Credit",
    paymentType: "Wire Transfer",
    depositAmount: 90000,
    currency: "JOD",
    exchangeRate: 5.3,
    localAmt: 477000,
    contactPerson: "Yusuf Al-Maktoum",
    mobileNo: "+962-50-666-7777",
    email: "yusuf@almaktoum.jo",
    website: "www.almaktoum.jo",
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
    sn: "008",
    country: "Lebanon",
    supplierName: "Al-Nahyan Enterprises",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Performance Bond",
    paymentType: "Bank Transfer",
    depositAmount: 55000,
    currency: "LBP",
    exchangeRate: 0.00066,
    localAmt: 36.3,
    contactPerson: "Layla Al-Nahyan",
    mobileNo: "+961-50-888-9999",
    email: "layla@alnahyan.lb",
    website: "www.alnahyan.lb",
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
    sn: "009",
    country: "Egypt",
    supplierName: "Al-Qasimi Trading",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Cash Deposit",
    paymentType: "Credit Card",
    depositAmount: 70000,
    currency: "EGP",
    exchangeRate: 0.13,
    localAmt: 9100,
    contactPerson: "Hassan Al-Qasimi",
    mobileNo: "+20-50-123-4567",
    email: "hassan@alqasimi.eg",
    website: "www.alqasimi.eg",
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
    sn: "010",
    country: "Iraq",
    supplierName: "Al-Sharqi Corporation",
    paymentTerms: "Net 60",
    dueDays: 60,
    typeOfDeposit: "Bank Guarantee",
    paymentType: "Bank Transfer",
    depositAmount: 65000,
    currency: "IQD",
    exchangeRate: 0.00076,
    localAmt: 49.4,
    contactPerson: "Noor Al-Sharqi",
    mobileNo: "+964-50-555-6666",
    email: "noor@alsharqi.iq",
    website: "www.alsharqi.iq",
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
    sn: "011",
    country: "Turkey",
    supplierName: "Al-Sabah Trading",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Performance Bond",
    paymentType: "Wire Transfer",
    depositAmount: 85000,
    currency: "TRY",
    exchangeRate: 0.12,
    localAmt: 10200,
    contactPerson: "Mehmet Al-Sabah",
    mobileNo: "+90-50-777-8888",
    email: "mehmet@alsabah.tr",
    website: "www.alsabah.tr",
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
    sn: "012",
    country: "Iran",
    supplierName: "Al-Khalifa Enterprises",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Letter of Credit",
    paymentType: "Bank Transfer",
    depositAmount: 95000,
    currency: "IRR",
    exchangeRate: 0.000024,
    localAmt: 2.28,
    contactPerson: "Reza Al-Khalifa",
    mobileNo: "+98-50-999-0000",
    email: "reza@alkhalifa.ir",
    website: "www.alkhalifa.ir",
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
    sn: "013",
    country: "Pakistan",
    supplierName: "Al-Thani Trading Company",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Bank Guarantee",
    paymentType: "Bank Transfer",
    depositAmount: 110000,
    currency: "PKR",
    exchangeRate: 0.0037,
    localAmt: 407,
    contactPerson: "Ahmed Al-Thani",
    mobileNo: "+92-50-123-4567",
    email: "ahmed@althani.pk",
    website: "www.althani.pk",
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
    sn: "014",
    country: "India",
    supplierName: "Al-Said Enterprises",
    paymentTerms: "Net 60",
    dueDays: 60,
    typeOfDeposit: "Cash Deposit",
    paymentType: "Credit Card",
    depositAmount: 120000,
    currency: "INR",
    exchangeRate: 0.012,
    localAmt: 1440,
    contactPerson: "Fatima Al-Said",
    mobileNo: "+91-50-987-6543",
    email: "fatima@alsaid.in",
    website: "www.alsaid.in",
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
    sn: "015",
    country: "China",
    supplierName: "Al-Hashemi Corporation",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Performance Bond",
    paymentType: "Wire Transfer",
    depositAmount: 130000,
    currency: "CNY",
    exchangeRate: 0.14,
    localAmt: 18200,
    contactPerson: "Khalid Al-Hashemi",
    mobileNo: "+86-50-555-1234",
    email: "khalid@alhashemi.cn",
    website: "www.alhashemi.cn",
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
    sn: "016",
    country: "Japan",
    supplierName: "Aoun Trading Solutions",
    paymentTerms: "Net 90",
    dueDays: 90,
    typeOfDeposit: "Letter of Credit",
    paymentType: "Bank Transfer",
    depositAmount: 140000,
    currency: "JPY",
    exchangeRate: 0.0067,
    localAmt: 938,
    contactPerson: "Mariam Aoun",
    mobileNo: "+81-50-777-8888",
    email: "mariam@aoun.jp",
    website: "www.aoun.jp",
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
    sn: "017",
    country: "South Korea",
    supplierName: "El-Sisi Enterprises",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Bank Guarantee",
    paymentType: "Credit Card",
    depositAmount: 150000,
    currency: "KRW",
    exchangeRate: 0.00075,
    localAmt: 112.5,
    contactPerson: "Omar El-Sisi",
    mobileNo: "+82-50-999-0000",
    email: "omar@elsisi.kr",
    website: "www.elsisi.kr",
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
    sn: "018",
    country: "Singapore",
    supplierName: "Al-Kadhimi Trading",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Cash Deposit",
    paymentType: "Wire Transfer",
    depositAmount: 160000,
    currency: "SGD",
    exchangeRate: 0.37,
    localAmt: 59200,
    contactPerson: "Aisha Al-Kadhimi",
    mobileNo: "+65-50-111-2222",
    email: "aisha@alkadhimi.sg",
    website: "www.alkadhimi.sg",
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
    sn: "019",
    country: "Malaysia",
    supplierName: "Erdogan Trading",
    paymentTerms: "Net 60",
    dueDays: 60,
    typeOfDeposit: "Performance Bond",
    paymentType: "Bank Transfer",
    depositAmount: 170000,
    currency: "MYR",
    exchangeRate: 0.21,
    localAmt: 35700,
    contactPerson: "Recep Erdogan",
    mobileNo: "+60-50-333-4444",
    email: "recep@erdogan.my",
    website: "www.erdogan.my",
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
    sn: "020",
    country: "Thailand",
    supplierName: "Mitsotakis Enterprises",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Letter of Credit",
    paymentType: "Credit Card",
    depositAmount: 180000,
    currency: "THB",
    exchangeRate: 0.027,
    localAmt: 4860,
    contactPerson: "Kyriakos Mitsotakis",
    mobileNo: "+66-50-555-6666",
    email: "kyriakos@mitsotakis.th",
    website: "www.mitsotakis.th",
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

export default function SuppliersDataTable({
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
  const canCreate = usePermission("supplier", "create");

  const componentColumns = [
    {
      accessorKey: "sn",
      title: "SN",
      options: [...new Set(mockSuppliers.map((item) => item.sn))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("sn").localeCompare(row2.getValue("sn"));
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "sn",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockSuppliers.map((item) => item.country))],
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
      accessorKey: "supplierName",
      title: "Supplier Name",
      options: [...new Set(mockSuppliers.map((item) => item.supplierName))],
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
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "supplierName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "paymentTerms",
      title: "Payment Terms",
      options: [...new Set(mockSuppliers.map((item) => item.paymentTerms))],
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "paymentTerms",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "dueDays",
      title: "Due Days",
      options: [...new Set(mockSuppliers.map((item) => item.dueDays))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("dueDays") - row2.getValue("dueDays");
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "dueDays",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "typeOfDeposit",
      title: "Type of Deposit",
      options: [...new Set(mockSuppliers.map((item) => item.typeOfDeposit))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("typeOfDeposit")
          .localeCompare(row2.getValue("typeOfDeposit"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "typeOfDeposit",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "paymentType",
      title: "Payment Type",
      options: [...new Set(mockSuppliers.map((item) => item.paymentType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("paymentType")
          .localeCompare(row2.getValue("paymentType"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "paymentType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "depositAmount",
      title: "Deposit Amount",
      options: [...new Set(mockSuppliers.map((item) => item.depositAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("depositAmount") - row2.getValue("depositAmount");
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "depositAmount",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(mockSuppliers.map((item) => item.currency))],
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
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "currency",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "exchangeRate",
      title: "Exchange Rate",
      options: [...new Set(mockSuppliers.map((item) => item.exchangeRate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("exchangeRate") - row2.getValue("exchangeRate");
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "exchangeRate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "localAmt",
      title: "Local Amount",
      options: [...new Set(mockSuppliers.map((item) => item.localAmt))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("localAmt") - row2.getValue("localAmt");
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "localAmt",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "contactPerson",
      title: "Contact Person",
      options: [...new Set(mockSuppliers.map((item) => item.contactPerson))],
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
      title: "Mobile No",
      options: [...new Set(mockSuppliers.map((item) => item.mobileNo))],
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
      options: [...new Set(mockSuppliers.map((item) => item.email))],
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
      options: [...new Set(mockSuppliers.map((item) => item.website))],
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

  const filteredData = mockSuppliers.filter((supplier) => {
    if (dataTableFilter.status === "Active") {
      return supplier.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !supplier.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return supplier.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return supplier.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return supplier.isUpdated;
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
      fixedColumns={["sn"]} // Pin SN column
      pathName="supplier"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
