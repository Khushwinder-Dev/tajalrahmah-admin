/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const shippingData = [
  {
    id: "1",
    sn: "001",
    shipperCountry: "Saudi Arabia",
    shipperName: "Al-Rashid Shipping Co",
    contactPerson: "Ahmed Al-Rashid",
    mobileNo: "+966501234567",
    phoneNo: "+966114567890",
    faxNo: "+966114567891",
    email: "ahmed@rashidshipping.com",
    website: "www.rashidshipping.com",
    shipmentRate: "150.00",
    cbm: "25.5",
    freightCost: "3825.00",
    currencyType: "SAR",
    status: "Active",
    date: "2024-01-15",
    loginId: "user001",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    sn: "002",
    shipperCountry: "UAE",
    shipperName: "Al-Zahrani Shipping",
    contactPerson: "Mohammed Al-Zahrani",
    mobileNo: "+971501234567",
    phoneNo: "+971114567890",
    faxNo: "+971114567891",
    email: "mohammed@zahranishipping.com",
    website: "www.zahranishipping.com",
    shipmentRate: "200.00",
    cbm: "30.0",
    freightCost: "6000.00",
    currencyType: "AED",
    status: "Inactive",
    date: "2024-01-16",
    loginId: "user002",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    sn: "003",
    shipperCountry: "Kuwait",
    shipperName: "Al-Otaibi Shipping",
    contactPerson: "Ali Al-Otaibi",
    mobileNo: "+965501234567",
    phoneNo: "+965114567890",
    faxNo: "+965114567891",
    email: "ali@otaibishipping.com",
    website: "www.otaibishipping.com",
    shipmentRate: "100.00",
    cbm: "15.0",
    freightCost: "1500.00",
    currencyType: "KWD",
    status: "Active",
    date: "2024-01-17",
    loginId: "user003",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    sn: "004",
    shipperCountry: "Qatar",
    shipperName: "Al-Shehri Shipping",
    contactPerson: "Youssef Al-Shehri",
    mobileNo: "+974501234567",
    phoneNo: "+974114567890",
    faxNo: "+974114567891",
    email: "youssef@shehri.com",
    website: "www.shehri.com",
    shipmentRate: "250.00",
    cbm: "40.0",
    freightCost: "10000.00",
    currencyType: "QAR",
    status: "Deleted",
    date: "2024-01-18",
    loginId: "user004",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isActive: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    sn: "005",
    shipperCountry: "Bahrain",
    shipperName: "Al-Ghamdi Shipping",
    contactPerson: "Khaled Al-Ghamdi",
    mobileNo: "+973501234567",
    phoneNo: "+973114567890",
    faxNo: "+973114567891",
    email: "khaled@ghamdi.com",
    website: "www.ghamdi.com",
    shipmentRate: "120.00",
    cbm: "20.0",
    freightCost: "3000.00",
    currencyType: "BHD",
    status: "Active",
    date: "2024-01-19",
    loginId: "user005",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    sn: "006",
    shipperCountry: "Oman",
    shipperName: "Al-Harbi Shipping",
    contactPerson: "Faisal Al-Harbi",
    mobileNo: "+968501234567",
    phoneNo: "+968114567890",
    faxNo: "+968114567891",
    email: "faisal@harbi.com",
    website: "www.harbi.com",
    shipmentRate: "180.00",
    cbm: "35.0",
    freightCost: "6300.00",
    currencyType: "OMR",
    status: "Approved",
    date: "2024-01-20",
    loginId: "user006",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    sn: "007",
    shipperCountry: "Jordan",
    shipperName: "Al-Maktoum Shipping",
    contactPerson: "Hassan Al-Maktoum",
    mobileNo: "+962501234567",
    phoneNo: "+962114567890",
    faxNo: "+962114567891",
    email: "hassan@maktoum.com",
    website: "www.maktoum.com",
    shipmentRate: "100.00",
    cbm: "15.0",
    freightCost: "1500.00",
    currencyType: "JOD",
    status: "In Transit",
    date: "2024-01-21",
    loginId: "user007",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    sn: "008",
    shipperCountry: "Lebanon",
    shipperName: "Al-Nahyan Shipping",
    contactPerson: "Youssef Al-Nahyan",
    mobileNo: "+961501234567",
    phoneNo: "+961114567890",
    faxNo: "+961114567891",
    email: "youssef@nahyan.com",
    website: "www.nahyan.com",
    shipmentRate: "150.00",
    cbm: "25.0",
    freightCost: "3750.00",
    currencyType: "LBP",
    status: "Pending",
    date: "2024-01-22",
    loginId: "user008",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    sn: "009",
    shipperCountry: "Egypt",
    shipperName: "Al-Qasimi Shipping",
    contactPerson: "Ahmed Al-Qasimi",
    mobileNo: "+20501234567",
    phoneNo: "+20114567890",
    faxNo: "+20114567891",
    email: "ahmed@qasimi.com",
    website: "www.qasimi.com",
    shipmentRate: "200.00",
    cbm: "40.0",
    freightCost: "8000.00",
    currencyType: "EGP",
    status: "Approved",
    date: "2024-01-23",
    loginId: "user009",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    sn: "010",
    shipperCountry: "Iraq",
    shipperName: "Al-Sharqi Shipping",
    contactPerson: "Ali Al-Sharqi",
    mobileNo: "+964501234567",
    phoneNo: "+964114567890",
    faxNo: "+964114567891",
    email: "ali@sharqi.com",
    website: "www.sharqi.com",
    shipmentRate: "100.00",
    cbm: "15.0",
    freightCost: "1500.00",
    currencyType: "IQD",
    status: "In Transit",
    date: "2024-01-24",
    loginId: "user010",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    sn: "011",
    shipperCountry: "Turkey",
    shipperName: "Al-Sabah Shipping",
    contactPerson: "Mehmet Al-Sabah",
    mobileNo: "+90501234567",
    phoneNo: "+90114567890",
    faxNo: "+90114567891",
    email: "mehmet@sabah.com",
    website: "www.sabah.com",
    shipmentRate: "180.00",
    cbm: "35.0",
    freightCost: "6300.00",
    currencyType: "TRY",
    status: "Delivered",
    date: "2024-01-25",
    loginId: "user011",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    sn: "012",
    shipperCountry: "Iran",
    shipperName: "Al-Khalifa Shipping",
    contactPerson: "Mohammad Al-Khalifa",
    mobileNo: "+98501234567",
    phoneNo: "+98114567890",
    faxNo: "+98114567891",
    email: "mohammad@khalifa.com",
    website: "www.khalifa.com",
    shipmentRate: "120.00",
    cbm: "20.0",
    freightCost: "3000.00",
    currencyType: "IRR",
    status: "Pending",
    date: "2024-01-26",
    loginId: "user012",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    sn: "013",
    shipperCountry: "Pakistan",
    shipperName: "Al-Thani Shipping",
    contactPerson: "Naveed Al-Thani",
    mobileNo: "+92501234567",
    phoneNo: "+92114567890",
    faxNo: "+92114567891",
    email: "naveed@thani.com",
    website: "www.thani.com",
    shipmentRate: "150.00",
    cbm: "25.0",
    freightCost: "3750.00",
    currencyType: "PKR",
    status: "Approved",
    date: "2024-01-27",
    loginId: "user013",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    sn: "014",
    shipperCountry: "India",
    shipperName: "Al-Said Shipping",
    contactPerson: "Rajesh Al-Said",
    mobileNo: "+91501234567",
    phoneNo: "+91114567890",
    faxNo: "+91114567891",
    email: "rajesh@said.com",
    website: "www.said.com",
    shipmentRate: "200.00",
    cbm: "40.0",
    freightCost: "8000.00",
    currencyType: "INR",
    status: "In Transit",
    date: "2024-01-28",
    loginId: "user014",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    sn: "015",
    shipperCountry: "China",
    shipperName: "Al-Hashemi Shipping",
    contactPerson: "Zhang Wei",
    mobileNo: "+86501234567",
    phoneNo: "+86114567890",
    faxNo: "+86114567891",
    email: "zhangwei@hashemi.com",
    website: "www.hashemi.com",
    shipmentRate: "100.00",
    cbm: "15.0",
    freightCost: "1500.00",
    currencyType: "CNY",
    status: "Delivered",
    date: "2024-01-29",
    loginId: "user015",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    sn: "016",
    shipperCountry: "Japan",
    shipperName: "Aoun Shipping Solutions",
    contactPerson: "Taro Suzuki",
    mobileNo: "+81501234567",
    phoneNo: "+81114567890",
    faxNo: "+81114567891",
    email: "taro@aoun.com",
    website: "www.aoun.com",
    shipmentRate: "180.00",
    cbm: "35.0",
    freightCost: "6300.00",
    currencyType: "JPY",
    status: "Pending",
    date: "2024-01-30",
    loginId: "user016",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    sn: "017",
    shipperCountry: "South Korea",
    shipperName: "El-Sisi Shipping",
    contactPerson: "Kim Min-seok",
    mobileNo: "+82501234567",
    phoneNo: "+82114567890",
    faxNo: "+82114567891",
    email: "kim@sisi.com",
    website: "www.sisi.com",
    shipmentRate: "100.00",
    cbm: "15.0",
    freightCost: "1500.00",
    currencyType: "KRW",
    status: "Approved",
    date: "2024-01-31",
    loginId: "user017",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    sn: "018",
    shipperCountry: "Singapore",
    shipperName: "Al-Kadhimi Shipping",
    contactPerson: "Lee Wei",
    mobileNo: "+65501234567",
    phoneNo: "+65114567890",
    faxNo: "+65114567891",
    email: "lee@kadhimi.com",
    website: "www.kadhimi.com",
    shipmentRate: "180.00",
    cbm: "35.0",
    freightCost: "6300.00",
    currencyType: "SGD",
    status: "In Transit",
    date: "2024-02-01",
    loginId: "user018",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    sn: "019",
    shipperCountry: "Malaysia",
    shipperName: "Erdogan Shipping",
    contactPerson: "Ahmet Erdogan",
    mobileNo: "+60501234567",
    phoneNo: "+60114567890",
    faxNo: "+60114567891",
    email: "ahmet@erdogan.com",
    website: "www.erdogan.com",
    shipmentRate: "120.00",
    cbm: "20.0",
    freightCost: "3000.00",
    currencyType: "MYR",
    status: "Delivered",
    date: "2024-02-02",
    loginId: "user019",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    sn: "020",
    shipperCountry: "Thailand",
    shipperName: "Mitsotakis Shipping",
    contactPerson: "Nikos Mitsotakis",
    mobileNo: "+66501234567",
    phoneNo: "+66114567890",
    faxNo: "+66114567891",
    email: "nikos@mitsotakis.com",
    website: "www.mitsotakis.com",
    shipmentRate: "150.00",
    cbm: "25.0",
    freightCost: "3750.00",
    currencyType: "THB",
    status: "Pending",
    date: "2024-02-03",
    loginId: "user020",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function ShippingDataTable({
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
  const canCreate = usePermission("shipping", "create");

  const componentColumns = [
    {
      accessorKey: "sn",
      title: "SN",
      options: [...new Set(shippingData.map((item) => item.sn))],
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
      accessorKey: "shipperCountry",
      title: "Shipper Country",
      options: [...new Set(shippingData.map((item) => item.shipperCountry))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("shipperCountry")
          .localeCompare(row2.getValue("shipperCountry"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "shipperCountry",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "shipperName",
      title: "Shipper Name",
      options: [...new Set(shippingData.map((item) => item.shipperName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("shipperName")
          .localeCompare(row2.getValue("shipperName"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "shipperName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "contactPerson",
      title: "Contact Person",
      options: [...new Set(shippingData.map((item) => item.contactPerson))],
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
      title: "Mobile No",
      options: [...new Set(shippingData.map((item) => item.mobileNo))],
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
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "mobileNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "phoneNo",
      title: "Phone No",
      options: [...new Set(shippingData.map((item) => item.phoneNo))],
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
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "phoneNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "faxNo",
      title: "Fax No",
      options: [...new Set(shippingData.map((item) => item.faxNo))],
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
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "faxNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(shippingData.map((item) => item.email))],
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
      options: [...new Set(shippingData.map((item) => item.website))],
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
      accessorKey: "shipmentRate",
      title: "Shipment Rate",
      options: [...new Set(shippingData.map((item) => item.shipmentRate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("shipmentRate")
          .localeCompare(row2.getValue("shipmentRate"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "shipmentRate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "cbm",
      title: "CBM",
      options: [...new Set(shippingData.map((item) => item.cbm))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("cbm").localeCompare(row2.getValue("cbm"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "cbm",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "freightCost",
      title: "Freight Cost",
      options: [...new Set(shippingData.map((item) => item.freightCost))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("freightCost")
          .localeCompare(row2.getValue("freightCost"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "freightCost",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "currencyType",
      title: "Currency Type",
      options: [...new Set(shippingData.map((item) => item.currencyType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("currencyType")
          .localeCompare(row2.getValue("currencyType"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "currencyType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(shippingData.map((item) => item.status))],
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
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "status",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "date",
      title: "Date",
      options: [...new Set(shippingData.map((item) => item.date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("date").localeCompare(row2.getValue("date"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "loginId",
      title: "Login ID",
      options: [...new Set(shippingData.map((item) => item.loginId))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("loginId").localeCompare(row2.getValue("loginId"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "loginId",
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
  ];

  const filteredData = shippingData.filter((shipping) => {
    if (dataTableFilter.status === "Active") {
      return shipping.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !shipping.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return shipping.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return shipping.isUpdated;
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
      pathName="shipping"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
