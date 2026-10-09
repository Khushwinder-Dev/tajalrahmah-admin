/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockPorts = [
  {
    id: "1",
    portCode: "JED",
    portName: "Jeddah Islamic Port",
    portType: "Commercial",
    country: "Saudi Arabia",
    address: "Jeddah, Makkah Province",
    landmark: "Near King Abdulaziz International Airport",
    contactPerson: "Ahmed Al-Rashid",
    mobileNo: "+966-50-123-4567",
    phoneNo: "+966-12-123-4567",
    faxNo: "+966-12-123-4568",
    email: "info@jeddahport.sa",
    website: "www.jeddahport.sa",
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
    portCode: "DAM",
    portName: "King Abdulaziz Port",
    portType: "Commercial",
    country: "Saudi Arabia",
    address: "Dammam, Eastern Province",
    landmark: "Near King Fahd International Airport",
    contactPerson: "Mohammed Al-Zahrani",
    mobileNo: "+966-50-234-5678",
    phoneNo: "+966-13-234-5678",
    faxNo: "+966-13-234-5679",
    email: "info@dammamport.sa",
    website: "www.dammamport.sa",
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
    portCode: "YAN",
    portName: "Yanbu Commercial Port",
    portType: "Industrial",
    country: "Saudi Arabia",
    address: "Yanbu, Al Madinah Province",
    landmark: "Near Yanbu Industrial City",
    contactPerson: "Khalid Al-Otaibi",
    mobileNo: "+966-50-345-6789",
    phoneNo: "+966-14-345-6789",
    faxNo: "+966-14-345-6790",
    email: "info@yanbuport.sa",
    website: "www.yanbuport.sa",
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
    portCode: "JUB",
    portName: "Jubail Commercial Port",
    portType: "Industrial",
    country: "Saudi Arabia",
    address: "Jubail, Eastern Province",
    landmark: "Near Jubail Industrial City",
    contactPerson: "Omar Al-Shehri",
    mobileNo: "+966-50-456-7890",
    phoneNo: "+966-13-456-7890",
    faxNo: "+966-13-456-7891",
    email: "info@jubailport.sa",
    website: "www.jubailport.sa",
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
    portCode: "RAB",
    portName: "Rabigh Port",
    portType: "Commercial",
    country: "Saudi Arabia",
    address: "Rabigh, Makkah Province",
    landmark: "Near King Abdullah Economic City",
    contactPerson: "Salman Al-Ghamdi",
    mobileNo: "+966-50-567-8901",
    phoneNo: "+966-12-567-8901",
    faxNo: "+966-12-567-8902",
    email: "info@rabighport.sa",
    website: "www.rabighport.sa",
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
    portCode: "JIZ",
    portName: "Jizan Port",
    portType: "Commercial",
    country: "Saudi Arabia",
    address: "Jizan, Jizan Province",
    landmark: "Near Jizan Economic City",
    contactPerson: "Abdullah Al-Harbi",
    mobileNo: "+966-50-678-9012",
    phoneNo: "+966-17-678-9012",
    faxNo: "+966-17-678-9013",
    email: "info@jizanport.sa",
    website: "www.jizanport.sa",
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
    portCode: "DUB",
    portName: "Dubai Port",
    portType: "Commercial",
    country: "UAE",
    address: "Dubai, Dubai Emirate",
    landmark: "Near Dubai Creek",
    contactPerson: "Ali Al-Maktoum",
    mobileNo: "+971-50-789-0123",
    phoneNo: "+971-4-789-0123",
    faxNo: "+971-4-789-0124",
    email: "info@dubaiport.ae",
    website: "www.dubaiport.ae",
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
    portCode: "ABU",
    portName: "Abu Dhabi Port",
    portType: "Commercial",
    country: "UAE",
    address: "Abu Dhabi, Abu Dhabi Emirate",
    landmark: "Near Mina Zayed",
    contactPerson: "Fatima Al-Nahyan",
    mobileNo: "+971-50-890-1234",
    phoneNo: "+971-2-890-1234",
    faxNo: "+971-2-890-1235",
    email: "info@abudhabiport.ae",
    website: "www.abudhabiport.ae",
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
    portCode: "SHJ",
    portName: "Sharjah Port",
    portType: "Commercial",
    country: "UAE",
    address: "Sharjah, Sharjah Emirate",
    landmark: "Near Khalid Port",
    contactPerson: "Hassan Al-Qasimi",
    mobileNo: "+971-50-901-2345",
    phoneNo: "+971-6-901-2345",
    faxNo: "+971-6-901-2346",
    email: "info@sharjahport.ae",
    website: "www.sharjahport.ae",
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
    portCode: "FUJ",
    portName: "Fujairah Port",
    portType: "Commercial",
    country: "UAE",
    address: "Fujairah, Fujairah Emirate",
    landmark: "Near Fujairah Free Zone",
    contactPerson: "Rashid Al-Sharqi",
    mobileNo: "+971-50-012-3456",
    phoneNo: "+971-9-012-3456",
    faxNo: "+971-9-012-3457",
    email: "info@fujairahport.ae",
    website: "www.fujairahport.ae",
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
    portCode: "KWI",
    portName: "Kuwait Port",
    portType: "Commercial",
    country: "Kuwait",
    address: "Kuwait City, Kuwait",
    landmark: "Near Shuwaikh Port",
    contactPerson: "Nasser Al-Sabah",
    mobileNo: "+965-50-123-4567",
    phoneNo: "+965-1-123-4567",
    faxNo: "+965-1-123-4568",
    email: "info@kuwaitport.kw",
    website: "www.kuwaitport.kw",
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
    portCode: "BAH",
    portName: "Bahrain Port",
    portType: "Commercial",
    country: "Bahrain",
    address: "Manama, Bahrain",
    landmark: "Near Khalifa Bin Salman Port",
    contactPerson: "Khalid Al-Khalifa",
    mobileNo: "+973-50-234-5678",
    phoneNo: "+973-17-234-5678",
    faxNo: "+973-17-234-5679",
    email: "info@bahrainport.bh",
    website: "www.bahrainport.bh",
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
    portCode: "QAT",
    portName: "Doha Port",
    portType: "Commercial",
    country: "Qatar",
    address: "Doha, Qatar",
    landmark: "Near Doha Bay",
    contactPerson: "Hamad Al-Thani",
    mobileNo: "+974-50-345-6789",
    phoneNo: "+974-4-345-6789",
    faxNo: "+974-4-345-6790",
    email: "info@dohaport.qa",
    website: "www.dohaport.qa",
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
    portCode: "OMN",
    portName: "Muscat Port",
    portType: "Commercial",
    country: "Oman",
    address: "Muscat, Oman",
    landmark: "Near Sultan Qaboos Port",
    contactPerson: "Sultan Al-Said",
    mobileNo: "+968-50-456-7890",
    phoneNo: "+968-24-456-7890",
    faxNo: "+968-24-456-7891",
    email: "info@muscatport.om",
    website: "www.muscatport.om",
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
    portCode: "JOR",
    portName: "Aqaba Port",
    portType: "Commercial",
    country: "Jordan",
    address: "Aqaba, Jordan",
    landmark: "Near Red Sea",
    contactPerson: "Abdullah Al-Hashemi",
    mobileNo: "+962-50-567-8901",
    phoneNo: "+962-3-567-8901",
    faxNo: "+962-3-567-8902",
    email: "info@aqabaport.jo",
    website: "www.aqabaport.jo",
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
    portCode: "LBN",
    portName: "Beirut Port",
    portType: "Commercial",
    country: "Lebanon",
    address: "Beirut, Lebanon",
    landmark: "Near Beirut Harbor",
    contactPerson: "Michel Aoun",
    mobileNo: "+961-50-678-9012",
    phoneNo: "+961-1-678-9012",
    faxNo: "+961-1-678-9013",
    email: "info@beirutport.lb",
    website: "www.beirutport.lb",
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
    portCode: "EGY",
    portName: "Alexandria Port",
    portType: "Commercial",
    country: "Egypt",
    address: "Alexandria, Egypt",
    landmark: "Near Mediterranean Sea",
    contactPerson: "Ahmed El-Sisi",
    mobileNo: "+20-50-789-0123",
    phoneNo: "+20-3-789-0123",
    faxNo: "+20-3-789-0124",
    email: "info@alexandriaport.eg",
    website: "www.alexandriaport.eg",
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
    portCode: "IRQ",
    portName: "Basra Port",
    portType: "Commercial",
    country: "Iraq",
    address: "Basra, Iraq",
    landmark: "Near Shatt al-Arab",
    contactPerson: "Mustafa Al-Kadhimi",
    mobileNo: "+964-50-890-1234",
    phoneNo: "+964-40-890-1234",
    faxNo: "+964-40-890-1235",
    email: "info@basraport.iq",
    website: "www.basraport.iq",
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
    portCode: "TUR",
    portName: "Istanbul Port",
    portType: "Commercial",
    country: "Turkey",
    address: "Istanbul, Turkey",
    landmark: "Near Bosphorus Strait",
    contactPerson: "Recep Erdogan",
    mobileNo: "+90-50-901-2345",
    phoneNo: "+90-212-901-2345",
    faxNo: "+90-212-901-2346",
    email: "info@istanbulport.tr",
    website: "www.istanbulport.tr",
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
    portCode: "GRC",
    portName: "Piraeus Port",
    portType: "Commercial",
    country: "Greece",
    address: "Piraeus, Greece",
    landmark: "Near Athens",
    contactPerson: "Kyriakos Mitsotakis",
    mobileNo: "+30-50-012-3456",
    phoneNo: "+30-210-012-3456",
    faxNo: "+30-210-012-3457",
    email: "info@piraeusport.gr",
    website: "www.piraeusport.gr",
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

export default function PortMasterDataTable({
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
  const canCreate = usePermission("portMaster", "create");

  const componentColumns = [
    {
      accessorKey: "portCode",
      title: "Port Code",
      options: [...new Set(mockPorts.map((item) => item.portCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("portCode")
          .localeCompare(row2.getValue("portCode"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "portCode",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "portName",
      title: "Port Name",
      options: [...new Set(mockPorts.map((item) => item.portName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("portName")
          .localeCompare(row2.getValue("portName"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "portName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "portType",
      title: "Port Type",
      options: [...new Set(mockPorts.map((item) => item.portType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("portType")
          .localeCompare(row2.getValue("portType"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "portType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockPorts.map((item) => item.country))],
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
      accessorKey: "contactPerson",
      title: "Contact Person",
      options: [...new Set(mockPorts.map((item) => item.contactPerson))],
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
      options: [...new Set(mockPorts.map((item) => item.mobileNo))],
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
      options: [...new Set(mockPorts.map((item) => item.email))],
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

  const filteredData = mockPorts.filter((port) => {
    if (dataTableFilter.status === "Active") {
      return port.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !port.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return port.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return port.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return port.isUpdated;
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
      fixedColumns={["portCode"]} // Pin port code column
      pathName="port-master"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
