/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockAgents = [
  {
    id: "1",
    agentCode: "AG001",
    agentName: "Al-Rashid Shipping Agency",
    country: "Saudi Arabia",
    notification: "Email & SMS",
    portType: "Commercial",
    portName: "Jeddah Islamic Port",
    address: "Jeddah, Makkah Province",
    landmark: "Near King Abdulaziz International Airport",
    contact: "Ahmed Al-Rashid",
    mobileNo: "+966-50-123-4567",
    phoneNo: "+966-12-123-4567",
    faxNo: "+966-12-123-4568",
    email: "info@alrashid-shipping.sa",
    website: "www.alrashid-shipping.sa",
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
    agentCode: "AG002",
    agentName: "Al-Zahrani Maritime Services",
    country: "Saudi Arabia",
    notification: "Email",
    portType: "Commercial",
    portName: "King Abdulaziz Port",
    address: "Dammam, Eastern Province",
    landmark: "Near King Fahd International Airport",
    contact: "Mohammed Al-Zahrani",
    mobileNo: "+966-50-234-5678",
    phoneNo: "+966-13-234-5678",
    faxNo: "+966-13-234-5679",
    email: "info@alzahrani-maritime.sa",
    website: "www.alzahrani-maritime.sa",
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
    agentCode: "AG003",
    agentName: "Al-Otaibi Port Agency",
    country: "Saudi Arabia",
    notification: "SMS & WhatsApp",
    portType: "Industrial",
    portName: "Yanbu Commercial Port",
    address: "Yanbu, Al Madinah Province",
    landmark: "Near Yanbu Industrial City",
    contact: "Khalid Al-Otaibi",
    mobileNo: "+966-50-345-6789",
    phoneNo: "+966-14-345-6789",
    faxNo: "+966-14-345-6790",
    email: "info@alotaibi-port.sa",
    website: "www.alotaibi-port.sa",
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
    agentCode: "AG004",
    agentName: "Al-Shehri Maritime Solutions",
    country: "Saudi Arabia",
    notification: "Email",
    portType: "Industrial",
    portName: "Jubail Commercial Port",
    address: "Jubail, Eastern Province",
    landmark: "Near Jubail Industrial City",
    contact: "Omar Al-Shehri",
    mobileNo: "+966-50-456-7890",
    phoneNo: "+966-13-456-7890",
    faxNo: "+966-13-456-7891",
    email: "info@alshehri-maritime.sa",
    website: "www.alshehri-maritime.sa",
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
    agentCode: "AG005",
    agentName: "Al-Ghamdi Port Services",
    country: "Saudi Arabia",
    notification: "SMS",
    portType: "Commercial",
    portName: "Rabigh Port",
    address: "Rabigh, Makkah Province",
    landmark: "Near King Abdullah Economic City",
    contact: "Salman Al-Ghamdi",
    mobileNo: "+966-50-567-8901",
    phoneNo: "+966-12-567-8901",
    faxNo: "+966-12-567-8902",
    email: "info@alghamdi-port.sa",
    website: "www.alghamdi-port.sa",
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
    agentCode: "AG006",
    agentName: "Al-Harbi Maritime Agency",
    country: "Saudi Arabia",
    notification: "Email & SMS",
    portType: "Commercial",
    portName: "Jizan Port",
    address: "Jizan, Jizan Province",
    landmark: "Near Jizan Economic City",
    contact: "Abdullah Al-Harbi",
    mobileNo: "+966-50-678-9012",
    phoneNo: "+966-17-678-9012",
    faxNo: "+966-17-678-9013",
    email: "info@alharbi-maritime.sa",
    website: "www.alharbi-maritime.sa",
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
    agentCode: "AG007",
    agentName: "Al-Maktoum Shipping",
    country: "UAE",
    notification: "Email",
    portType: "Commercial",
    portName: "Dubai Port",
    address: "Dubai, Dubai Emirate",
    landmark: "Near Dubai Creek",
    contact: "Ali Al-Maktoum",
    mobileNo: "+971-50-789-0123",
    phoneNo: "+971-4-789-0123",
    faxNo: "+971-4-789-0124",
    email: "info@almaktoum-shipping.ae",
    website: "www.almaktoum-shipping.ae",
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
    agentCode: "AG008",
    agentName: "Al-Nahyan Maritime",
    country: "UAE",
    notification: "SMS & WhatsApp",
    portType: "Commercial",
    portName: "Abu Dhabi Port",
    address: "Abu Dhabi, Abu Dhabi Emirate",
    landmark: "Near Mina Zayed",
    contact: "Fatima Al-Nahyan",
    mobileNo: "+971-50-890-1234",
    phoneNo: "+971-2-890-1234",
    faxNo: "+971-2-890-1235",
    email: "info@alnahyan-maritime.ae",
    website: "www.alnahyan-maritime.ae",
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
    agentCode: "AG009",
    agentName: "Al-Qasimi Port Agency",
    country: "UAE",
    notification: "Email",
    portType: "Commercial",
    portName: "Sharjah Port",
    address: "Sharjah, Sharjah Emirate",
    landmark: "Near Khalid Port",
    contact: "Hassan Al-Qasimi",
    mobileNo: "+971-50-901-2345",
    phoneNo: "+971-6-901-2345",
    faxNo: "+971-6-901-2346",
    email: "info@alqasimi-port.ae",
    website: "www.alqasimi-port.ae",
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
    agentCode: "AG010",
    agentName: "Al-Sharqi Maritime",
    country: "UAE",
    notification: "SMS",
    portType: "Commercial",
    portName: "Fujairah Port",
    address: "Fujairah, Fujairah Emirate",
    landmark: "Near Fujairah Free Zone",
    contact: "Rashid Al-Sharqi",
    mobileNo: "+971-50-012-3456",
    phoneNo: "+971-9-012-3456",
    faxNo: "+971-9-012-3457",
    email: "info@alsharqi-maritime.ae",
    website: "www.alsharqi-maritime.ae",
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
    agentCode: "AG011",
    agentName: "Al-Sabah Shipping",
    country: "Kuwait",
    notification: "Email & SMS",
    portType: "Commercial",
    portName: "Kuwait Port",
    address: "Kuwait City, Kuwait",
    landmark: "Near Shuwaikh Port",
    contact: "Nasser Al-Sabah",
    mobileNo: "+965-50-123-4567",
    phoneNo: "+965-1-123-4567",
    faxNo: "+965-1-123-4568",
    email: "info@alsabah-shipping.kw",
    website: "www.alsabah-shipping.kw",
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
    agentCode: "AG012",
    agentName: "Al-Khalifa Maritime",
    country: "Bahrain",
    notification: "Email",
    portType: "Commercial",
    portName: "Bahrain Port",
    address: "Manama, Bahrain",
    landmark: "Near Khalifa Bin Salman Port",
    contact: "Khalid Al-Khalifa",
    mobileNo: "+973-50-234-5678",
    phoneNo: "+973-17-234-5678",
    faxNo: "+973-17-234-5679",
    email: "info@alkhalifa-maritime.bh",
    website: "www.alkhalifa-maritime.bh",
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
    agentCode: "AG013",
    agentName: "Al-Thani Shipping Agency",
    country: "Qatar",
    notification: "Email & SMS",
    portType: "Commercial",
    portName: "Doha Port",
    address: "Doha, Qatar",
    landmark: "Near Doha Bay",
    contact: "Hamad Al-Thani",
    mobileNo: "+974-50-345-6789",
    phoneNo: "+974-4-345-6789",
    faxNo: "+974-4-345-6790",
    email: "info@althani-shipping.qa",
    website: "www.althani-shipping.qa",
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
    agentCode: "AG014",
    agentName: "Al-Said Maritime Services",
    country: "Oman",
    notification: "Email",
    portType: "Commercial",
    portName: "Muscat Port",
    address: "Muscat, Oman",
    landmark: "Near Sultan Qaboos Port",
    contact: "Sultan Al-Said",
    mobileNo: "+968-50-456-7890",
    phoneNo: "+968-24-456-7890",
    faxNo: "+968-24-456-7891",
    email: "info@alsaid-maritime.om",
    website: "www.alsaid-maritime.om",
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
    agentCode: "AG015",
    agentName: "Al-Hashemi Port Agency",
    country: "Jordan",
    notification: "SMS & WhatsApp",
    portType: "Commercial",
    portName: "Aqaba Port",
    address: "Aqaba, Jordan",
    landmark: "Near Red Sea",
    contact: "Abdullah Al-Hashemi",
    mobileNo: "+962-50-567-8901",
    phoneNo: "+962-3-567-8901",
    faxNo: "+962-3-567-8902",
    email: "info@alhashemi-port.jo",
    website: "www.alhashemi-port.jo",
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
    agentCode: "AG016",
    agentName: "Aoun Maritime Solutions",
    country: "Lebanon",
    notification: "Email",
    portType: "Commercial",
    portName: "Beirut Port",
    address: "Beirut, Lebanon",
    landmark: "Near Beirut Harbor",
    contact: "Michel Aoun",
    mobileNo: "+961-50-678-9012",
    phoneNo: "+961-1-678-9012",
    faxNo: "+961-1-678-9013",
    email: "info@aoun-maritime.lb",
    website: "www.aoun-maritime.lb",
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
    agentCode: "AG017",
    agentName: "El-Sisi Shipping",
    country: "Egypt",
    notification: "SMS & WhatsApp",
    portType: "Commercial",
    portName: "Alexandria Port",
    address: "Alexandria, Egypt",
    landmark: "Near Mediterranean Sea",
    contact: "Ahmed El-Sisi",
    mobileNo: "+20-50-789-0123",
    phoneNo: "+20-3-789-0123",
    faxNo: "+20-3-789-0124",
    email: "info@elsisi-shipping.eg",
    website: "www.elsisi-shipping.eg",
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
    agentCode: "AG018",
    agentName: "Al-Kadhimi Maritime",
    country: "Iraq",
    notification: "Email",
    portType: "Commercial",
    portName: "Basra Port",
    address: "Basra, Iraq",
    landmark: "Near Shatt al-Arab",
    contact: "Mustafa Al-Kadhimi",
    mobileNo: "+964-50-890-1234",
    phoneNo: "+964-40-890-1234",
    faxNo: "+964-40-890-1235",
    email: "info@alkadhimi-maritime.iq",
    website: "www.alkadhimi-maritime.iq",
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
    agentCode: "AG019",
    agentName: "Erdogan Shipping",
    country: "Turkey",
    notification: "Email & SMS",
    portType: "Commercial",
    portName: "Istanbul Port",
    address: "Istanbul, Turkey",
    landmark: "Near Bosphorus Strait",
    contact: "Recep Erdogan",
    mobileNo: "+90-50-901-2345",
    phoneNo: "+90-212-901-2345",
    faxNo: "+90-212-901-2346",
    email: "info@erdogan-shipping.tr",
    website: "www.erdogan-shipping.tr",
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
    agentCode: "AG020",
    agentName: "Mitsotakis Maritime",
    country: "Greece",
    notification: "SMS",
    portType: "Commercial",
    portName: "Piraeus Port",
    address: "Piraeus, Greece",
    landmark: "Near Athens",
    contact: "Kyriakos Mitsotakis",
    mobileNo: "+30-50-012-3456",
    phoneNo: "+30-210-012-3456",
    faxNo: "+30-210-012-3457",
    email: "info@mitsotakis-maritime.gr",
    website: "www.mitsotakis-maritime.gr",
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

export default function AgentMasterDataTable({
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
  const canCreate = usePermission("agentMaster", "create");

  const componentColumns = [
    {
      accessorKey: "agentCode",
      title: "Agent Code",
      options: [...new Set(mockAgents.map((item) => item.agentCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("agentCode")
          .localeCompare(row2.getValue("agentCode"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "agentCode",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "agentName",
      title: "Agent Name",
      options: [...new Set(mockAgents.map((item) => item.agentName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("agentName")
          .localeCompare(row2.getValue("agentName"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "agentName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockAgents.map((item) => item.country))],
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
      accessorKey: "notification",
      title: "Notification",
      options: [...new Set(mockAgents.map((item) => item.notification))],
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "notification",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "contact",
      title: "Contact",
      options: [...new Set(mockAgents.map((item) => item.contact))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("contact").localeCompare(row2.getValue("contact"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "contact",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "mobileNo",
      title: "Mobile No.",
      options: [...new Set(mockAgents.map((item) => item.mobileNo))],
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
      options: [...new Set(mockAgents.map((item) => item.email))],
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

  const filteredData = mockAgents.filter((agent) => {
    if (dataTableFilter.status === "Active") {
      return agent.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !agent.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return agent.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return agent.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return agent.isUpdated;
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
      fixedColumns={["agentCode"]} // Pin agent code column
      pathName="agent-master"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
