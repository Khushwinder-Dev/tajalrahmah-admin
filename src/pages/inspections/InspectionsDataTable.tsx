/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Inspections interface to match the grid component
interface InspectionItem {
  id: string;
  vehicle: string;
  inspectionForm: string;
  addedFrom: string;
  fromDate: string;
  toDate: string;
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

const mockInspections: InspectionItem[] = [
  {
    id: "1",
    vehicle: "Toyota Camry - ABC123",
    inspectionForm: "Annual Safety Inspection",
    addedFrom: "Fleet Manager",
    fromDate: "2024-01-15",
    toDate: "2024-01-20",
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
    vehicle: "Ford Transit - XYZ789",
    inspectionForm: "Monthly Maintenance Check",
    addedFrom: "Maintenance Team",
    fromDate: "2024-02-01",
    toDate: "2024-02-05",
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
    vehicle: "Honda Civic - DEF456",
    inspectionForm: "Pre-Trip Inspection",
    addedFrom: "Driver",
    fromDate: "2024-02-10",
    toDate: "2024-02-12",
    status: "Draft",
    createdAt: "2024-02-17",
    updatedAt: "2024-02-17",
    draftedAt: "2024-02-16",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    vehicle: "Chevrolet Silverado - GHI789",
    inspectionForm: "DOT Compliance Check",
    addedFrom: "Compliance Officer",
    fromDate: "2024-02-15",
    toDate: "2024-02-18",
    status: "Pending",
    createdAt: "2024-02-18",
    updatedAt: "2024-02-18",
    draftedAt: "2024-02-17",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    vehicle: "Nissan Altima - JKL012",
    inspectionForm: "Quarterly Review",
    addedFrom: "Quality Assurance",
    fromDate: "2024-03-01",
    toDate: "2024-03-05",
    status: "Active",
    createdAt: "2024-03-19",
    updatedAt: "2024-03-19",
    draftedAt: "2024-03-18",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    vehicle: "BMW X5 - MNO345",
    inspectionForm: "Executive Vehicle Check",
    addedFrom: "Executive Assistant",
    fromDate: "2024-03-10",
    toDate: "2024-03-12",
    status: "Active",
    createdAt: "2024-03-20",
    updatedAt: "2024-03-20",
    draftedAt: "2024-03-19",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    vehicle: "Mercedes Sprinter - PQR678",
    inspectionForm: "Commercial Vehicle Inspection",
    addedFrom: "Operations Manager",
    fromDate: "2024-03-15",
    toDate: "2024-03-20",
    status: "Pending",
    createdAt: "2024-04-21",
    updatedAt: "2024-04-21",
    draftedAt: "2024-04-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    vehicle: "Hyundai Elantra - STU901",
    inspectionForm: "Routine Safety Check",
    addedFrom: "Safety Inspector",
    fromDate: "2024-03-25",
    toDate: "2024-03-28",
    status: "Draft",
    createdAt: "2024-04-22",
    updatedAt: "2024-04-22",
    draftedAt: "2024-04-21",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    vehicle: "Audi A4 - VWX234",
    inspectionForm: "Emergency Inspection",
    addedFrom: "Supervisor",
    fromDate: "2024-04-01",
    toDate: "2024-04-05",
    status: "Active",
    createdAt: "2024-05-23",
    updatedAt: "2024-05-23",
    draftedAt: "2024-05-22",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    vehicle: "Volkswagen Jetta - YZA567",
    inspectionForm: "Post-Accident Review",
    addedFrom: "Mechanic",
    fromDate: "2024-04-10",
    toDate: "2024-04-15",
    status: "Rejected",
    createdAt: "2024-05-24",
    updatedAt: "2024-05-24",
    draftedAt: "2024-05-23",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    vehicle: "Subaru Outback - BCD890",
    inspectionForm: "Emissions Test",
    addedFrom: "Transport Coordinator",
    fromDate: "2024-04-15",
    toDate: "2024-04-20",
    status: "Active",
    createdAt: "2024-06-25",
    updatedAt: "2024-06-25",
    draftedAt: "2024-06-24",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    vehicle: "Mazda CX-5 - EFG123",
    inspectionForm: "Brake System Check",
    addedFrom: "Vehicle Administrator",
    fromDate: "2024-04-20",
    toDate: "2024-04-25",
    status: "Draft",
    createdAt: "2024-06-26",
    updatedAt: "2024-06-26",
    draftedAt: "2024-06-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function InspectionsDataTable({
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
      accessorKey: "vehicle",
      title: "Vehicle",
      options: [...new Set(mockInspections.map((item) => item.vehicle))],
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
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Vehicle",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "inspectionForm",
      title: "Inspection Form",
      options: [...new Set(mockInspections.map((item) => item.inspectionForm))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("inspectionForm")
          .localeCompare(row2.getValue("inspectionForm"));
      },
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Inspection Form",
        readOnly: true,
      },
    },
    {
      accessorKey: "addedFrom",
      title: "Added From",
      options: [...new Set(mockInspections.map((item) => item.addedFrom))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("addedFrom")
          .localeCompare(row2.getValue("addedFrom"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Added From",
        readOnly: true,
      },
    },
    {
      accessorKey: "fromDate",
      title: "From Date",
      options: [...new Set(mockInspections.map((item) => item.fromDate))],
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
        const date1 = new Date(row1.getValue("fromDate"));
        const date2 = new Date(row2.getValue("fromDate"));

        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "From Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "toDate",
      title: "To Date",
      options: [...new Set(mockInspections.map((item) => item.toDate))],
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
        const date1 = new Date(row1.getValue("toDate"));
        const date2 = new Date(row2.getValue("toDate"));

        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "To Date",
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

  const filteredData = mockInspections.filter((item: InspectionItem) => {
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
  });

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["vehicle", "status"]}
      pathName="inspections"
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
