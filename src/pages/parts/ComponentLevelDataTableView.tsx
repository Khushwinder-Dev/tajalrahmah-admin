/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  name: string;
  partsType: string;
  brand: string;
  model: string;
  serialNumber: string;
  linkedVehicle: string;
  currentAssignee: string;
  partGroup: string;
  purchaseVendor: string;
  purchaseDate: string;
  warrantyDate: string;
  comments: string;
  serviceDate: string;
  serviceMonths: string;
  resaleValue: string;
  outOfDate: string;

  status: string;
  createdAt: string;
  updatedAt: string;
  draftedAt: string | null;
  actionMessage: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
};

const mockTableData: TabDataType[] = [
  {
    id: "1",
    name: "Brake Pad",
    partsType: "Brake System",
    brand: "Bosch",
    model: "BPX-200",
    serialNumber: "BRK-12345",
    linkedVehicle: "Toyota Corolla",
    currentAssignee: "Workshop A",
    partGroup: "Safety",
    purchaseVendor: "AutoParts Ltd",
    purchaseDate: "2024-01-15",
    warrantyDate: "2026-01-15",
    comments: "Front wheel brake pads",
    serviceDate: "2024-07-15",
    serviceMonths: "24",
    resaleValue: "50",
    outOfDate: "2026-01-15",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-07-10",
    draftedAt: null,
    actionMessage: "Installed successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    name: "Air Filter",
    partsType: "Engine",
    brand: "K&N",
    model: "AF-300",
    serialNumber: "ENG-23456",
    linkedVehicle: "Honda Civic",
    currentAssignee: "Workshop B",
    partGroup: "Engine Care",
    purchaseVendor: "CarCare Hub",
    purchaseDate: "2024-02-10",
    warrantyDate: "2025-02-10",
    comments: "High flow filter",
    serviceDate: "2024-08-10",
    serviceMonths: "12",
    resaleValue: "25",
    outOfDate: "2025-02-10",
    status: "Active",
    createdAt: "2024-02-10",
    updatedAt: "2024-08-05",
    draftedAt: null,
    actionMessage: "Replaced old filter",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    name: "Battery",
    partsType: "Electrical",
    brand: "Exide",
    model: "EX-120",
    serialNumber: "BAT-54321",
    linkedVehicle: "Hyundai Elantra",
    currentAssignee: "Warehouse",
    partGroup: "Power Supply",
    purchaseVendor: "PowerMax",
    purchaseDate: "2024-03-05",
    warrantyDate: "2026-03-05",
    comments: "12V, 60Ah",
    serviceDate: "2024-09-05",
    serviceMonths: "24",
    resaleValue: "80",
    outOfDate: "2026-03-05",
    status: "Active",
    createdAt: "2024-03-05",
    updatedAt: "2024-09-01",
    draftedAt: null,
    actionMessage: "Stored in warehouse",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    name: "Fuel Pump",
    partsType: "Fuel System",
    brand: "Delphi",
    model: "FP-100",
    serialNumber: "FUEL-98765",
    linkedVehicle: "Ford Ranger",
    currentAssignee: "Workshop C",
    partGroup: "Fuel",
    purchaseVendor: "FuelTech",
    purchaseDate: "2024-04-12",
    warrantyDate: "2025-04-12",
    comments: "Electronic pump",
    serviceDate: "2024-10-12",
    serviceMonths: "18",
    resaleValue: "120",
    outOfDate: "2025-04-12",
    status: "Inactive",
    createdAt: "2024-04-12",
    updatedAt: "2024-10-02",
    draftedAt: null,
    actionMessage: "Replaced with new pump",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    name: "Clutch Plate",
    partsType: "Transmission",
    brand: "Valeo",
    model: "CP-750",
    serialNumber: "CLT-67890",
    linkedVehicle: "Mazda 3",
    currentAssignee: "Workshop D",
    partGroup: "Transmission",
    purchaseVendor: "TransParts",
    purchaseDate: "2024-05-01",
    warrantyDate: "2025-05-01",
    comments: "Heavy duty clutch",
    serviceDate: "2024-11-01",
    serviceMonths: "12",
    resaleValue: "150",
    outOfDate: "2025-05-01",
    status: "Draft",
    createdAt: "2024-05-01",
    updatedAt: "2024-11-01",
    draftedAt: "2024-05-02",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    name: "Headlight",
    partsType: "Lighting",
    brand: "Philips",
    model: "HL-900",
    serialNumber: "LGT-11223",
    linkedVehicle: "Nissan Altima",
    currentAssignee: "Warehouse",
    partGroup: "Lighting",
    purchaseVendor: "LightZone",
    purchaseDate: "2024-06-20",
    warrantyDate: "2026-06-20",
    comments: "LED Headlight",
    serviceDate: "2024-12-20",
    serviceMonths: "24",
    resaleValue: "60",
    outOfDate: "2026-06-20",
    status: "Active",
    createdAt: "2024-06-20",
    updatedAt: "2024-12-15",
    draftedAt: null,
    actionMessage: "In stock",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    name: "Shock Absorber",
    partsType: "Suspension",
    brand: "Monroe",
    model: "SA-450",
    serialNumber: "SUS-33445",
    linkedVehicle: "Chevrolet Malibu",
    currentAssignee: "Workshop A",
    partGroup: "Suspension",
    purchaseVendor: "RideControl",
    purchaseDate: "2024-07-10",
    warrantyDate: "2026-07-10",
    comments: "Rear shock absorber",
    serviceDate: "2025-01-10",
    serviceMonths: "24",
    resaleValue: "100",
    outOfDate: "2026-07-10",
    status: "Active",
    createdAt: "2024-07-10",
    updatedAt: "2025-01-05",
    draftedAt: null,
    actionMessage: "Installed successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    name: "Radiator",
    partsType: "Cooling System",
    brand: "Denso",
    model: "RD-350",
    serialNumber: "CLN-55667",
    linkedVehicle: "Kia Sportage",
    currentAssignee: "Workshop B",
    partGroup: "Cooling",
    purchaseVendor: "CoolMax",
    purchaseDate: "2024-08-01",
    warrantyDate: "2026-08-01",
    comments: "Aluminum radiator",
    serviceDate: "2025-02-01",
    serviceMonths: "24",
    resaleValue: "200",
    outOfDate: "2026-08-01",
    status: "Active",
    createdAt: "2024-08-01",
    updatedAt: "2025-01-30",
    draftedAt: null,
    actionMessage: "Delivered to workshop",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    name: "Alternator",
    partsType: "Electrical",
    brand: "Bosch",
    model: "ALT-220",
    serialNumber: "ELE-77889",
    linkedVehicle: "Subaru Forester",
    currentAssignee: "Workshop C",
    partGroup: "Power",
    purchaseVendor: "ElectroHub",
    purchaseDate: "2024-08-20",
    warrantyDate: "2026-08-20",
    comments: "High performance alternator",
    serviceDate: "2025-02-20",
    serviceMonths: "24",
    resaleValue: "180",
    outOfDate: "2026-08-20",
    status: "Active",
    createdAt: "2024-08-20",
    updatedAt: "2025-02-15",
    draftedAt: null,
    actionMessage: "Ready for installation",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    name: "Spark Plug",
    partsType: "Engine",
    brand: "NGK",
    model: "SP-101",
    serialNumber: "ENG-99001",
    linkedVehicle: "Volkswagen Jetta",
    currentAssignee: "Workshop D",
    partGroup: "Ignition",
    purchaseVendor: "EngineParts",
    purchaseDate: "2024-09-05",
    warrantyDate: "2025-09-05",
    comments: "Platinum spark plug",
    serviceDate: "2025-03-05",
    serviceMonths: "12",
    resaleValue: "15",
    outOfDate: "2025-09-05",
    status: "Inactive",
    createdAt: "2024-09-05",
    updatedAt: "2025-02-28",
    draftedAt: null,
    actionMessage: "Replaced after service",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    name: "Timing Belt",
    partsType: "Engine",
    brand: "Gates",
    model: "TB-400",
    serialNumber: "ENG-11234",
    linkedVehicle: "Mitsubishi Lancer",
    currentAssignee: "Workshop A",
    partGroup: "Timing",
    purchaseVendor: "AutoDrive",
    purchaseDate: "2024-10-01",
    warrantyDate: "2026-10-01",
    comments: "Rubber reinforced belt",
    serviceDate: "2025-04-01",
    serviceMonths: "24",
    resaleValue: "90",
    outOfDate: "2026-10-01",
    status: "Draft",
    createdAt: "2024-10-01",
    updatedAt: "2025-04-01",
    draftedAt: "2024-10-02",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    name: "Exhaust Pipe",
    partsType: "Exhaust",
    brand: "Magnaflow",
    model: "EP-900",
    serialNumber: "EXH-56789",
    linkedVehicle: "Jeep Wrangler",
    currentAssignee: "Workshop B",
    partGroup: "Exhaust",
    purchaseVendor: "ExhaustPro",
    purchaseDate: "2024-11-01",
    warrantyDate: "2026-11-01",
    comments: "Stainless steel pipe",
    serviceDate: "2025-05-01",
    serviceMonths: "24",
    resaleValue: "220",
    outOfDate: "2026-11-01",
    status: "Active",
    createdAt: "2024-11-01",
    updatedAt: "2025-05-01",
    draftedAt: null,
    actionMessage: "Installed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function ComponentLevelDataTableView({
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
  const canCreate = usePermission("parts", "create");

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockTableData.map((item) => item.name))],
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
      accessorKey: "partsType",
      title: "Parts Type",
      options: [...new Set(mockTableData.map((item) => item.partsType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("partsType")
          .localeCompare(row2.getValue("partsType"));
      },
      size: 200,
      minSize: 200,
      meta: {
        exportLabel: "partsType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "brand",
      title: "Brand",
      options: [...new Set(mockTableData.map((item) => item.brand))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("brand").localeCompare(row2.getValue("brand"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "brand",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "model",
      title: "Model",
      options: [...new Set(mockTableData.map((item) => item.model))],
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
      minSize: 150,
      meta: {
        exportLabel: "model",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "serialNumber",
      title: "Serial Number",
      options: [...new Set(mockTableData.map((item) => item.serialNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("serialNumber")
          .localeCompare(row2.getValue("serialNumber"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "serialNumber",
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

  const filteredData = mockTableData.filter((leave) => {
    if (dataTableFilter.status === "Active") {
      return leave.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !leave.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return leave.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return leave.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return leave.isUpdated;
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
      fixedColumns={["name", "partsType"]} // Pin leave types column
      pathName="parts"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
