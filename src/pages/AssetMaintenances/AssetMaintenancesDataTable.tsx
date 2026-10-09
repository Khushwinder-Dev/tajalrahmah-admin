/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Asset Maintenance interface to match the grid component
interface AssetMaintenanceItem {
  id: string;
  asset: string;
  maintenanceType: string;
  title: string;
  startDate: string;
  completionDate: string;
  warrantyImprovement: string;
  cost: number;
  notes: string;
  status: "Active" | "Pending" | "Draft" | "Rejected";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockAssetMaintenances: AssetMaintenanceItem[] = [
  {
    id: "1",
    asset: "Server Room AC Unit",
    maintenanceType: "Preventive",
    title: "Quarterly AC Maintenance",
    startDate: "2024-01-15",
    completionDate: "2024-01-16",
    warrantyImprovement: "Extended warranty by 6 months",
    cost: 1500,
    notes:
      "Cleaned filters, checked refrigerant levels, tested cooling efficiency.",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    draftedAt: "2024-01-14",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    asset: "Production Line Conveyor",
    maintenanceType: "Corrective",
    title: "Belt Replacement",
    startDate: "2024-01-16",
    completionDate: "2024-01-17",
    warrantyImprovement: "None",
    cost: 3200,
    notes:
      "Replaced worn conveyor belt and adjusted tension. System running smoothly.",
    status: "Active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
    draftedAt: "2024-01-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    asset: "Backup Generator",
    maintenanceType: "Preventive",
    title: "Annual Generator Service",
    startDate: "2024-01-17",
    completionDate: "2024-01-18",
    warrantyImprovement: "Warranty extended to 2026",
    cost: 2800,
    notes:
      "Oil change, filter replacement, battery check, load testing completed.",
    status: "Draft",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-17",
    draftedAt: "2024-01-16",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    asset: "Office Elevator",
    maintenanceType: "Inspection",
    title: "Safety Inspection",
    startDate: "2024-01-18",
    completionDate: "2024-01-18",
    warrantyImprovement: "None",
    cost: 500,
    notes: "Annual safety inspection passed. All systems operational.",
    status: "Pending",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
    draftedAt: "2024-01-17",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    asset: "Warehouse Forklift #3",
    maintenanceType: "Corrective",
    title: "Hydraulic System Repair",
    startDate: "2024-01-19",
    completionDate: "2024-01-21",
    warrantyImprovement: "Parts warranty 12 months",
    cost: 4500,
    notes: "Replaced hydraulic pump and hoses. Pressure tested and certified.",
    status: "Active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-19",
    draftedAt: "2024-01-18",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    asset: "Fire Suppression System",
    maintenanceType: "Preventive",
    title: "Quarterly System Check",
    startDate: "2024-01-20",
    completionDate: "2024-01-20",
    warrantyImprovement: "None",
    cost: 800,
    notes: "Tested all sprinklers, checked pressure, inspected control panel.",
    status: "Active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
    draftedAt: "2024-01-19",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    asset: "HVAC System - Building A",
    maintenanceType: "Preventive",
    title: "Filter and Coil Cleaning",
    startDate: "2024-01-21",
    completionDate: "2024-01-22",
    warrantyImprovement: "Service contract renewed",
    cost: 2200,
    notes:
      "Cleaned all filters and coils, checked thermostats, optimized settings.",
    status: "Pending",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-21",
    draftedAt: "2024-01-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    asset: "Security Camera System",
    maintenanceType: "Upgrade",
    title: "Firmware Update",
    startDate: "2024-01-22",
    completionDate: "2024-01-22",
    warrantyImprovement: "Extended support to 2027",
    cost: 1200,
    notes:
      "Updated all camera firmware, tested recording and playback functionality.",
    status: "Draft",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
    draftedAt: "2024-01-21",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    asset: "Network Router",
    maintenanceType: "Preventive",
    title: "Router Maintenance",
    startDate: "2024-01-23",
    completionDate: "2024-01-23",
    warrantyImprovement: "None",
    cost: 600,
    notes: "Cleaned router, updated firmware, checked all connections.",
    status: "Active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-23",
    draftedAt: "2024-01-22",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    asset: "Industrial Printer",
    maintenanceType: "Corrective",
    title: "Print Head Replacement",
    startDate: "2024-01-24",
    completionDate: "2024-01-25",
    warrantyImprovement: "Parts warranty 6 months",
    cost: 1800,
    notes: "Replaced print head, calibrated colors, tested print quality.",
    status: "Rejected",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-24",
    draftedAt: "2024-01-23",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    asset: "Boiler System",
    maintenanceType: "Emergency",
    title: "Emergency Boiler Repair",
    startDate: "2024-01-25",
    completionDate: "2024-01-26",
    warrantyImprovement: "None",
    cost: 5500,
    notes: "Emergency repair of boiler pressure valve and safety systems.",
    status: "Active",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-25",
    draftedAt: "2024-01-24",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    asset: "Water Pump",
    maintenanceType: "Preventive",
    title: "Monthly Pump Inspection",
    startDate: "2024-01-26",
    completionDate: "2024-01-26",
    warrantyImprovement: "Service contract extended",
    cost: 400,
    notes: "Monthly inspection completed, all systems functioning normally.",
    status: "Draft",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-26",
    draftedAt: "2024-01-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function AssetMaintenancesDataTable({
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
  const { canCreate } = useCountriesPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "asset",
      title: "Asset",
      options: [...new Set(mockAssetMaintenances.map((item) => item.asset))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("asset").localeCompare(row2.getValue("asset"));
      },
      size: isMobile ? 200 : 250,
      minSize: 180,
      meta: {
        exportLabel: "Asset",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "maintenanceType",
      title: "Maintenance Type",
      options: [
        ...new Set(mockAssetMaintenances.map((item) => item.maintenanceType)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const typeOrder = {
          Emergency: 5,
          Corrective: 4,
          Upgrade: 3,
          Inspection: 2,
          Preventive: 1,
        };
        const type1 =
          typeOrder[
            row1.getValue("maintenanceType") as keyof typeof typeOrder
          ] || 0;
        const type2 =
          typeOrder[
            row2.getValue("maintenanceType") as keyof typeof typeOrder
          ] || 0;
        return type2 - type1;
      },
      size: isMobile ? 120 : 150,
      minSize: 100,
      meta: {
        exportLabel: "Maintenance Type",
        readOnly: true,
      },
    },
    {
      accessorKey: "title",
      title: "Title",
      options: [...new Set(mockAssetMaintenances.map((item) => item.title))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("title").localeCompare(row2.getValue("title"));
      },
      size: isMobile ? 200 : 250,
      minSize: 180,
      meta: {
        exportLabel: "Title",
        readOnly: true,
      },
    },
    {
      accessorKey: "startDate",
      title: "Start Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        if (isNaN(date.getTime())) {
          return false;
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("startDate"));
        const date2 = new Date(row2.getValue("startDate"));

        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Start Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "completionDate",
      title: "Completion Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        if (isNaN(date.getTime())) {
          return false;
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("completionDate"));
        const date2 = new Date(row2.getValue("completionDate"));

        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Completion Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "warrantyImprovement",
      title: "Warranty Improvement",
      options: [
        ...new Set(
          mockAssetMaintenances.map((item) => item.warrantyImprovement)
        ),
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
          .getValue("warrantyImprovement")
          .localeCompare(row2.getValue("warrantyImprovement"));
      },
      size: isMobile ? 180 : 220,
      minSize: 180,
      meta: {
        exportLabel: "Warranty Improvement",
        readOnly: true,
      },
    },
    {
      accessorKey: "cost",
      title: "Cost",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("cost") - row2.getValue("cost");
      },
      size: isMobile ? 120 : 150,
      minSize: 100,
      meta: {
        exportLabel: "Cost",
        readOnly: true,
      },
    },
    {
      accessorKey: "notes",
      title: "Notes",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("notes").localeCompare(row2.getValue("notes"));
      },
      size: isMobile ? 200 : 250,
      minSize: 180,
      meta: {
        exportLabel: "Notes",
        readOnly: true,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("createdAt"));
        const date2 = new Date(row2.getValue("createdAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
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
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("updatedAt"));
        const date2 = new Date(row2.getValue("updatedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
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
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("draftedAt"));
        const date2 = new Date(row2.getValue("draftedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockAssetMaintenances.filter(
    (item: AssetMaintenanceItem) => {
      // States use the same flags for demo
      if (dataTableFilter.status === "Active") {
        return item.isActive;
      } else if (dataTableFilter.status === "Inactive") {
        return !item.isActive;
      } else if (dataTableFilter.status === "Draft") {
        return item.isDraft;
      } else if (dataTableFilter.status === "Deleted") {
        return item.isDeleted;
      } else if (dataTableFilter.status === "Updated") {
        return item.isUpdated;
      }
      return true;
    }
  );

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["asset", "status"]}
      pathName="asset-maintenances"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      showImages={false}
    />
  );
}
