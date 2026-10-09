/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockMaintenances = [
  {
    id: "1",
    vehicle: "Toyota Camry 2023",
    garage: "Al-Rashid Auto Service",
    maintenanceType: "Preventive",
    serviceName: "Oil Change & Filter",
    startDate: "2024-02-15",
    completionDate: "2024-02-15",
    parts: "Oil Filter, Engine Oil",
    cost: 150.0,
    description: "Regular oil change and filter replacement",
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
    vehicle: "Ford Transit Van",
    garage: "Quick Fix Garage",
    maintenanceType: "Repair",
    serviceName: "Brake System Repair",
    startDate: "2024-02-10",
    completionDate: "2024-02-12",
    parts: "Brake Pads, Brake Fluid",
    cost: 320.0,
    description: "Replaced worn brake pads and flushed brake fluid",
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
    vehicle: "Honda Civic 2022",
    garage: "Premium Auto Care",
    maintenanceType: "Inspection",
    serviceName: "Annual Safety Inspection",
    startDate: "2024-02-20",
    completionDate: "2024-02-20",
    parts: "N/A",
    cost: 80.0,
    description: "Comprehensive vehicle safety inspection",
    status: "inactive",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "20m",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    vehicle: "Mercedes Sprinter",
    garage: "Luxury Auto Service",
    maintenanceType: "Preventive",
    serviceName: "Tire Rotation & Balance",
    startDate: "2024-02-25",
    completionDate: "2024-02-25",
    parts: "Tire Balance Weights",
    cost: 95.0,
    description: "Tire rotation and balancing service",
    status: "draft",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: "2024-01-25",
    actionMessage: "15 Apr",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    vehicle: "Nissan Patrol",
    garage: "Desert Auto Works",
    maintenanceType: "Repair",
    serviceName: "AC System Repair",
    startDate: "2024-02-28",
    completionDate: "2024-03-01",
    parts: "AC Compressor, Refrigerant",
    cost: 450.0,
    description: "Fixed AC compressor and recharged system",
    status: "active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    vehicle: "Toyota Hilux",
    garage: "Off-Road Specialists",
    maintenanceType: "Preventive",
    serviceName: "Suspension Check",
    startDate: "2024-03-01",
    completionDate: "2024-03-01",
    parts: "N/A",
    cost: 120.0,
    description: "Comprehensive suspension system inspection",
    status: "active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    vehicle: "Ford Ranger",
    garage: "City Auto Service",
    maintenanceType: "Repair",
    serviceName: "Electrical System Fix",
    startDate: "2024-03-05",
    completionDate: "2024-03-06",
    parts: "Battery, Alternator",
    cost: 280.0,
    description: "Replaced faulty battery and alternator",
    status: "active",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    vehicle: "Chevrolet Silverado",
    garage: "American Auto Care",
    maintenanceType: "Preventive",
    serviceName: "Transmission Service",
    startDate: "2024-03-10",
    completionDate: "2024-03-10",
    parts: "Transmission Fluid, Filter",
    cost: 180.0,
    description: "Transmission fluid change and filter replacement",
    status: "active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    vehicle: "Volkswagen Golf",
    garage: "European Auto Service",
    maintenanceType: "Inspection",
    serviceName: "Emission Test",
    startDate: "2024-03-15",
    completionDate: "2024-03-15",
    parts: "N/A",
    cost: 65.0,
    description: "Annual emission compliance testing",
    status: "active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    vehicle: "Hyundai Tucson",
    garage: "Korean Auto Care",
    maintenanceType: "Repair",
    serviceName: "Wheel Alignment",
    startDate: "2024-03-20",
    completionDate: "2024-03-20",
    parts: "N/A",
    cost: 75.0,
    description: "Four-wheel alignment service",
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
    vehicle: "BMW X5",
    garage: "Premium German Auto",
    maintenanceType: "Preventive",
    serviceName: "Spark Plug Replacement",
    startDate: "2024-03-25",
    completionDate: "2024-03-25",
    parts: "Spark Plugs, Ignition Coils",
    cost: 220.0,
    description: "Replaced all spark plugs and ignition coils",
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
    vehicle: "Audi A6",
    garage: "Luxury European Auto",
    maintenanceType: "Repair",
    serviceName: "Fuel Pump Replacement",
    startDate: "2024-03-30",
    completionDate: "2024-03-31",
    parts: "Fuel Pump, Fuel Filter",
    cost: 380.0,
    description: "Replaced faulty fuel pump and filter",
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
    vehicle: "Toyota Corolla 2024",
    garage: "City Auto Service",
    maintenanceType: "Preventive",
    serviceName: "Brake Fluid Check",
    startDate: "2024-04-01",
    completionDate: "2024-04-01",
    parts: "Brake Fluid",
    cost: 45.0,
    description: "Brake fluid level and condition check",
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
    vehicle: "Ford F-150",
    garage: "Truck Specialists",
    maintenanceType: "Repair",
    serviceName: "Engine Tune-up",
    startDate: "2024-04-05",
    completionDate: "2024-04-06",
    parts: "Spark Plugs, Air Filter, Fuel Filter",
    cost: 280.0,
    description: "Complete engine tune-up service",
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
    vehicle: "Honda CR-V",
    garage: "Premium Auto Care",
    maintenanceType: "Inspection",
    serviceName: "Pre-purchase Inspection",
    startDate: "2024-04-10",
    completionDate: "2024-04-10",
    parts: "N/A",
    cost: 120.0,
    description: "Comprehensive pre-purchase vehicle inspection",
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
    vehicle: "Mercedes C-Class",
    garage: "Luxury Auto Service",
    maintenanceType: "Preventive",
    serviceName: "Coolant System Service",
    startDate: "2024-04-15",
    completionDate: "2024-04-15",
    parts: "Coolant, Thermostat",
    cost: 180.0,
    description: "Coolant flush and thermostat replacement",
    status: "active",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    vehicle: "Nissan Altima",
    garage: "Desert Auto Works",
    maintenanceType: "Repair",
    serviceName: "CV Joint Replacement",
    startDate: "2024-04-20",
    completionDate: "2024-04-21",
    parts: "CV Joints, Boots",
    cost: 320.0,
    description: "Replaced worn CV joints and boots",
    status: "draft",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    vehicle: "Ford Escape",
    garage: "City Auto Service",
    maintenanceType: "Preventive",
    serviceName: "Power Steering Service",
    startDate: "2024-04-25",
    completionDate: "2024-04-25",
    parts: "Power Steering Fluid",
    cost: 85.0,
    description: "Power steering fluid flush and refill",
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
    vehicle: "Chevrolet Malibu",
    garage: "American Auto Care",
    maintenanceType: "Inspection",
    serviceName: "Safety Equipment Check",
    startDate: "2024-05-01",
    completionDate: "2024-05-01",
    parts: "N/A",
    cost: 60.0,
    description: "Safety equipment and systems inspection",
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
    vehicle: "Volkswagen Passat",
    garage: "European Auto Service",
    maintenanceType: "Repair",
    serviceName: "Timing Belt Replacement",
    startDate: "2024-05-05",
    completionDate: "2024-05-06",
    parts: "Timing Belt, Water Pump, Tensioner",
    cost: 450.0,
    description: "Timing belt and water pump replacement",
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

export default function MaintenancesDataTable({
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
  setShowVisibility: (setShowVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const canCreate = usePermission("maintenance", "create");

  const componentColumns = [
    {
      accessorKey: "maintenanceType",
      title: "Type",
      options: [
        ...new Set(mockMaintenances.map((item) => item.maintenanceType)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("maintenanceType")
          .localeCompare(row2.getValue("maintenanceType"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "maintenanceType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "vehicle",
      title: "Vehicle",
      options: [...new Set(mockMaintenances.map((item) => item.vehicle))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("vehicle").localeCompare(row2.getValue("vehicle"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "vehicle",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "garage",
      title: "Garage",
      options: [...new Set(mockMaintenances.map((item) => item.garage))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("garage").localeCompare(row2.getValue("garage"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "garage",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "serviceName",
      title: "Service",
      options: [...new Set(mockMaintenances.map((item) => item.serviceName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("serviceName")
          .localeCompare(row2.getValue("serviceName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "serviceName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "startDate",
      title: "Start Date",
      options: [...new Set(mockMaintenances.map((item) => item.startDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("startDate")
          .localeCompare(row2.getValue("startDate"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "startDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "completionDate",
      title: "Completion Date",
      options: [
        ...new Set(mockMaintenances.map((item) => item.completionDate)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("completionDate")
          .localeCompare(row2.getValue("completionDate"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "completionDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "parts",
      title: "Parts",
      options: [...new Set(mockMaintenances.map((item) => item.parts))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("parts").localeCompare(row2.getValue("parts"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "parts",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "cost",
      title: "Cost",
      options: [...new Set(mockMaintenances.map((item) => item.cost))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("cost") - row2.getValue("cost");
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "cost",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockMaintenances.map((item) => item.description))],
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

  const filteredData = mockMaintenances.filter((maintenance) => {
    if (dataTableFilter.status === "Active") {
      return maintenance.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !maintenance.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return maintenance.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return maintenance.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return maintenance.isUpdated;
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
      fixedColumns={["maintenanceType"]} // Pin maintenance type column
      pathName="maintenances"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
