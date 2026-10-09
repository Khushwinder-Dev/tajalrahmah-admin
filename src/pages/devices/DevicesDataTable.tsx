/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockDevices = [
  {
    id: "1",
    deviceCode: "DEV001",
    name: "HP LaserJet Pro",
    serialNo: "HP123456789",
    customer: "ABC Corporation",
    model: "M404dn",
    productionDate: "2023-01-15",
    purchaseDate: "2023-02-01",
    warrantyStartingDate: "2023-02-01",
    warrantyPeriodMonths: 24,
    warrantyExpiryDate: "2025-02-01",
    warrantyExpiringAlert: true,
    description: "High-performance laser printer for office use",
    image: "/device-images/hp-printer.jpg",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-01-20",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    deviceCode: "DEV002",
    name: "Dell OptiPlex Desktop",
    serialNo: "DELL987654321",
    customer: "XYZ Solutions",
    model: "7090 MT",
    productionDate: "2023-03-10",
    purchaseDate: "2023-03-15",
    warrantyStartingDate: "2023-03-15",
    warrantyPeriodMonths: 36,
    warrantyExpiryDate: "2026-03-15",
    warrantyExpiringAlert: false,
    description: "Business desktop computer with Intel i7 processor",
    image: "/device-images/dell-desktop.jpg",
    status: "active",
    createdAt: "2023-03-10",
    updatedAt: "2023-03-12",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    deviceCode: "DEV003",
    name: "Cisco Router",
    serialNo: "CISCO555666777",
    customer: "Tech Innovations Ltd",
    model: "ISR 4331",
    productionDate: "2023-05-20",
    purchaseDate: "2023-06-01",
    warrantyStartingDate: "2023-06-01",
    warrantyPeriodMonths: 12,
    warrantyExpiryDate: "2024-06-01",
    warrantyExpiringAlert: true,
    description: "Enterprise-grade router for network infrastructure",
    image: "/device-images/cisco-router.jpg",
    status: "active",
    createdAt: "2023-05-20",
    updatedAt: "2023-05-22",
    draftedAt: null,
    actionMessage: "20m",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    deviceCode: "DEV004",
    name: "Samsung Monitor",
    serialNo: "SAM111222333",
    customer: "Creative Agency",
    model: "27CF391",
    productionDate: "2023-07-10",
    purchaseDate: "2023-07-15",
    warrantyStartingDate: "2023-07-15",
    warrantyPeriodMonths: 24,
    warrantyExpiryDate: "2025-07-15",
    warrantyExpiringAlert: false,
    description: "27-inch curved monitor for design work",
    image: "/device-images/samsung-monitor.jpg",
    status: "active",
    createdAt: "2023-07-10",
    updatedAt: "2023-07-12",
    draftedAt: null,
    actionMessage: "15 Apr",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    deviceCode: "DEV005",
    name: "Lenovo ThinkPad",
    serialNo: "LEN444555666",
    customer: "Consulting Group",
    model: "X1 Carbon",
    productionDate: "2023-09-05",
    purchaseDate: "2023-09-10",
    warrantyStartingDate: "2023-09-10",
    warrantyPeriodMonths: 36,
    warrantyExpiryDate: "2026-09-10",
    warrantyExpiringAlert: false,
    description: "Ultra-lightweight business laptop",
    image: "/device-images/lenovo-laptop.jpg",
    status: "active",
    createdAt: "2023-09-05",
    updatedAt: "2023-09-07",
    draftedAt: null,
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    deviceCode: "DEV006",
    name: "Canon Multifunction Printer",
    serialNo: "CAN777888999",
    customer: "Marketing Solutions",
    model: "imageRUNNER 2630i",
    productionDate: "2023-11-15",
    purchaseDate: "2023-11-20",
    warrantyStartingDate: "2023-11-20",
    warrantyPeriodMonths: 18,
    warrantyExpiryDate: "2025-05-20",
    warrantyExpiringAlert: true,
    description: "All-in-one printer with scanning and copying",
    image: "/device-images/canon-printer.jpg",
    status: "active",
    createdAt: "2023-11-15",
    updatedAt: "2023-11-17",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    deviceCode: "DEV007",
    name: "Apple iMac",
    serialNo: "APPLE123789456",
    customer: "Design Studio",
    model: "24-inch M1",
    productionDate: "2024-01-10",
    purchaseDate: "2024-01-15",
    warrantyStartingDate: "2024-01-15",
    warrantyPeriodMonths: 12,
    warrantyExpiryDate: "2025-01-15",
    warrantyExpiringAlert: false,
    description: "All-in-one desktop for creative professionals",
    image: "/device-images/apple-imac.jpg",
    status: "active",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    deviceCode: "DEV008",
    name: "Microsoft Surface Pro",
    serialNo: "MS987321654",
    customer: "Consulting Firm",
    model: "Surface Pro 9",
    productionDate: "2024-02-20",
    purchaseDate: "2024-02-25",
    warrantyStartingDate: "2024-02-25",
    warrantyPeriodMonths: 24,
    warrantyExpiryDate: "2026-02-25",
    warrantyExpiringAlert: false,
    description: "2-in-1 tablet and laptop for mobility",
    image: "/device-images/surface-pro.jpg",
    status: "active",
    createdAt: "2024-02-20",
    updatedAt: "2024-02-22",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    deviceCode: "DEV009",
    name: "Epson Projector",
    serialNo: "EPS654987321",
    customer: "Training Center",
    model: "PowerLite 2247U",
    productionDate: "2024-03-05",
    purchaseDate: "2024-03-10",
    warrantyStartingDate: "2024-03-10",
    warrantyPeriodMonths: 36,
    warrantyExpiryDate: "2027-03-10",
    warrantyExpiringAlert: false,
    description: "High-brightness projector for presentations",
    image: "/device-images/epson-projector.jpg",
    status: "active",
    createdAt: "2024-03-05",
    updatedAt: "2024-03-07",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    deviceCode: "DEV010",
    name: "Netgear Switch",
    serialNo: "NET147258369",
    customer: "IT Services Co",
    model: "GS724T",
    productionDate: "2024-04-12",
    purchaseDate: "2024-04-15",
    warrantyStartingDate: "2024-04-15",
    warrantyPeriodMonths: 60,
    warrantyExpiryDate: "2029-04-15",
    warrantyExpiringAlert: false,
    description: "24-port managed Gigabit switch",
    image: "/device-images/netgear-switch.jpg",
    status: "active",
    createdAt: "2024-04-12",
    updatedAt: "2024-04-14",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    deviceCode: "DEV011",
    name: "Brother Label Printer",
    serialNo: "BRO369258147",
    customer: "Warehouse Solutions",
    model: "QL-820NWB",
    productionDate: "2024-05-18",
    purchaseDate: "2024-05-20",
    warrantyStartingDate: "2024-05-20",
    warrantyPeriodMonths: 12,
    warrantyExpiryDate: "2025-05-20",
    warrantyExpiringAlert: true,
    description: "Professional label printer with wireless connectivity",
    image: "/device-images/brother-printer.jpg",
    status: "inactive",
    createdAt: "2024-05-18",
    updatedAt: "2024-05-19",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    deviceCode: "DEV012",
    name: "ASUS Gaming Monitor",
    serialNo: "ASUS852741963",
    customer: "Gaming Cafe",
    model: "ROG Swift PG279Q",
    productionDate: "2024-06-25",
    purchaseDate: "2024-06-30",
    warrantyStartingDate: "2024-06-30",
    warrantyPeriodMonths: 36,
    warrantyExpiryDate: "2027-06-30",
    warrantyExpiringAlert: false,
    description: "27-inch gaming monitor with 165Hz refresh rate",
    image: "/device-images/asus-monitor.jpg",
    status: "active",
    createdAt: "2024-06-25",
    updatedAt: "2024-06-27",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    deviceCode: "DEV013",
    name: "Xerox Workstation",
    serialNo: "XER123456789",
    customer: "Print Solutions Inc",
    model: "VersaLink C405",
    productionDate: "2024-07-01",
    purchaseDate: "2024-07-10",
    warrantyStartingDate: "2024-07-10",
    warrantyPeriodMonths: 24,
    warrantyExpiryDate: "2026-07-10",
    warrantyExpiringAlert: false,
    description: "Color multifunction printer for small offices",
    image: "/device-images/xerox-printer.jpg",
    status: "active",
    createdAt: "2024-07-01",
    updatedAt: "2024-07-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    deviceCode: "DEV014",
    name: "Logitech Webcam",
    serialNo: "LOG987654321",
    customer: "Remote Work Solutions",
    model: "Brio Ultra HD",
    productionDate: "2024-08-15",
    purchaseDate: "2024-08-20",
    warrantyStartingDate: "2024-08-20",
    warrantyPeriodMonths: 12,
    warrantyExpiryDate: "2025-08-20",
    warrantyExpiringAlert: false,
    description: "4K webcam for video conferencing",
    image: "/device-images/logitech-webcam.jpg",
    status: "active",
    createdAt: "2024-08-15",
    updatedAt: "2024-08-16",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    deviceCode: "DEV015",
    name: "Synology NAS",
    serialNo: "SYN456789123",
    customer: "Data Storage Corp",
    model: "DS920+",
    productionDate: "2024-09-01",
    purchaseDate: "2024-09-05",
    warrantyStartingDate: "2024-09-05",
    warrantyPeriodMonths: 24,
    warrantyExpiryDate: "2026-09-05",
    warrantyExpiringAlert: false,
    description: "4-bay network attached storage for data backup",
    image: "/device-images/synology-nas.jpg",
    status: "active",
    createdAt: "2024-09-01",
    updatedAt: "2024-09-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    deviceCode: "DEV016",
    name: "Ubiquiti Access Point",
    serialNo: "UBI789123456",
    customer: "Network Solutions Ltd",
    model: "UniFi AP AC Pro",
    productionDate: "2024-10-10",
    purchaseDate: "2024-10-15",
    warrantyStartingDate: "2024-10-15",
    warrantyPeriodMonths: 12,
    warrantyExpiryDate: "2025-10-15",
    warrantyExpiringAlert: false,
    description: "High-performance wireless access point",
    image: "/device-images/ubiquiti-ap.jpg",
    status: "active",
    createdAt: "2024-10-10",
    updatedAt: "2024-10-11",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    deviceCode: "DEV017",
    name: "APC UPS System",
    serialNo: "APC321654987",
    customer: "Power Solutions Inc",
    model: "Smart-UPS 1500VA",
    productionDate: "2024-11-01",
    purchaseDate: "2024-11-05",
    warrantyStartingDate: "2024-11-05",
    warrantyPeriodMonths: 36,
    warrantyExpiryDate: "2027-11-05",
    warrantyExpiringAlert: false,
    description: "Uninterruptible power supply for critical systems",
    image: "/device-images/apc-ups.jpg",
    status: "draft",
    createdAt: "2024-11-01",
    updatedAt: "2024-11-02",
    draftedAt: "2024-11-02",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    deviceCode: "DEV018",
    name: "Barcode Scanner",
    serialNo: "BAR654321987",
    customer: "Retail Systems Co",
    model: "Honeywell 1900g",
    productionDate: "2024-12-01",
    purchaseDate: "2024-12-05",
    warrantyStartingDate: "2024-12-05",
    warrantyPeriodMonths: 60,
    warrantyExpiryDate: "2029-12-05",
    warrantyExpiringAlert: false,
    description: "2D area-imaging scanner for retail applications",
    image: "/device-images/barcode-scanner.jpg",
    status: "active",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    deviceCode: "DEV019",
    name: "Security Camera",
    serialNo: "SEC987123654",
    customer: "Security Solutions Ltd",
    model: "Hikvision DS-2CD2143G0-I",
    productionDate: "2024-12-10",
    purchaseDate: "2024-12-15",
    warrantyStartingDate: "2024-12-15",
    warrantyPeriodMonths: 24,
    warrantyExpiryDate: "2026-12-15",
    warrantyExpiringAlert: false,
    description: "4MP IP dome camera with night vision",
    image: "/device-images/security-camera.jpg",
    status: "active",
    createdAt: "2024-12-10",
    updatedAt: "2024-12-11",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    deviceCode: "DEV020",
    name: "Thermal Printer",
    serialNo: "THM456789321",
    customer: "Shipping Solutions Inc",
    model: "Zebra ZD420",
    productionDate: "2024-12-20",
    purchaseDate: "2024-12-25",
    warrantyStartingDate: "2024-12-25",
    warrantyPeriodMonths: 12,
    warrantyExpiryDate: "2025-12-25",
    warrantyExpiringAlert: true,
    description: "Direct thermal desktop printer for labels",
    image: "/device-images/thermal-printer.jpg",
    status: "inactive",
    createdAt: "2024-12-20",
    updatedAt: "2024-12-21",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function DevicesDataTable({
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
  const canCreate = usePermission("devices", "create");

  const componentColumns = [
    {
      accessorKey: "deviceCode",
      title: "Device Code",
      options: [...new Set(mockDevices.map((item) => item.deviceCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("deviceCode")
          .localeCompare(row2.getValue("deviceCode"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "deviceCode",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "name",
      title: "Device Name",
      options: [...new Set(mockDevices.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "serialNo",
      title: "Serial No",
      options: [...new Set(mockDevices.map((item) => item.serialNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("serialNo")
          .localeCompare(row2.getValue("serialNo"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "serialNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customer",
      title: "Customer",
      options: [...new Set(mockDevices.map((item) => item.customer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customer")
          .localeCompare(row2.getValue("customer"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "customer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "model",
      title: "Model",
      options: [...new Set(mockDevices.map((item) => item.model))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("model").localeCompare(row2.getValue("model"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "model",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "productionDate",
      title: "Production Date",
      options: [...new Set(mockDevices.map((item) => item.productionDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("productionDate")
          .localeCompare(row2.getValue("productionDate"));
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "productionDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "purchaseDate",
      title: "Purchase Date",
      options: [...new Set(mockDevices.map((item) => item.purchaseDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("purchaseDate")
          .localeCompare(row2.getValue("purchaseDate"));
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "purchaseDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "warrantyExpiryDate",
      title: "Warranty Expiry",
      options: [...new Set(mockDevices.map((item) => item.warrantyExpiryDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("warrantyExpiryDate")
          .localeCompare(row2.getValue("warrantyExpiryDate"));
      },
      size: 150,
      minSize: 130,
      meta: {
        exportLabel: "warrantyExpiryDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "warrantyPeriodMonths",
      title: "Warranty Period",
      options: [
        ...new Set(mockDevices.map((item) => item.warrantyPeriodMonths)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          row1.getValue("warrantyPeriodMonths") -
          row2.getValue("warrantyPeriodMonths")
        );
      },
      size: 130,
      minSize: 110,
      meta: {
        exportLabel: "warrantyPeriodMonths",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockDevices.map((item) => item.description))],
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
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "description",
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockDevices.filter((device) => {
    if (dataTableFilter.status === "Active") {
      return device.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !device.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return device.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return device.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return device.isUpdated;
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
      fixedColumns={["deviceCode"]} // Pin device code column
      pathName="devices"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
