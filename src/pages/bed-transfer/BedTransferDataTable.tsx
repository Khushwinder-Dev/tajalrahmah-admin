/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Bed Transfer interface to match the grid component
interface BedTransferItem {
  id: string;
  patientId: string;
  roomName: string;
  bedNumber: string;
  charge: number;
  assignDate: string;
  dischargeDate: string;
  description: string;
  status: "Active" | "Discharged" | "Transferred" | "Pending";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockBedTransfers: BedTransferItem[] = [
  {
    id: "1",
    patientId: "PT-001",
    roomName: "ICU-A",
    bedNumber: "B-101",
    charge: 2500.0,
    assignDate: "2024-01-01",
    dischargeDate: "2024-01-05",
    description: "Critical care patient",
    status: "Discharged",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    patientId: "PT-002",
    roomName: "Ward-B",
    bedNumber: "B-205",
    charge: 1200.5,
    assignDate: "2024-02-01",
    dischargeDate: "2024-02-10",
    description: "Post-operative recovery",
    status: "Active",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    patientId: "PT-003",
    roomName: "Private-101",
    bedNumber: "B-301",
    charge: 3500.75,
    assignDate: "2024-03-01",
    dischargeDate: "2024-03-07",
    description: "VIP patient - private room",
    status: "Active",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    patientId: "PT-004",
    roomName: "General-A",
    bedNumber: "B-102",
    charge: 800.25,
    assignDate: "2024-04-01",
    dischargeDate: "2024-04-08",
    description: "General admission",
    status: "Pending",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    patientId: "PT-005",
    roomName: "ICU-B",
    bedNumber: "B-103",
    charge: 4200.0,
    assignDate: "2024-05-01",
    dischargeDate: "2024-05-15",
    description: "Emergency admission",
    status: "Transferred",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    patientId: "PT-006",
    roomName: "Ward-C",
    bedNumber: "B-206",
    charge: 1450.8,
    assignDate: "2024-06-01",
    dischargeDate: "2024-06-12",
    description: "Observation and treatment",
    status: "Active",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    patientId: "PT-007",
    roomName: "Private-102",
    bedNumber: "B-302",
    charge: 3300.4,
    assignDate: "2024-07-01",
    dischargeDate: "2024-07-09",
    description: "Private suite - extended stay",
    status: "Discharged",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    patientId: "PT-008",
    roomName: "General-B",
    bedNumber: "B-104",
    charge: 950.6,
    assignDate: "2024-08-01",
    dischargeDate: "2024-08-06",
    description: "Standard care",
    status: "Pending",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    patientId: "PT-009",
    roomName: "ICU-C",
    bedNumber: "B-105",
    charge: 2800.3,
    assignDate: "2024-09-01",
    dischargeDate: "2024-09-10",
    description: "Intensive monitoring",
    status: "Active",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    patientId: "PT-010",
    roomName: "Ward-A",
    bedNumber: "B-207",
    charge: 1100.9,
    assignDate: "2024-10-01",
    dischargeDate: "2024-10-11",
    description: "Recovery ward",
    status: "Transferred",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    patientId: "PT-011",
    roomName: "Private-103",
    bedNumber: "B-303",
    charge: 3800.7,
    assignDate: "2024-11-01",
    dischargeDate: "2024-11-08",
    description: "Executive suite",
    status: "Active",
    createdAt: "2023-04-15",
    updatedAt: "2023-09-10",
    draftedAt: "2023-04-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    patientId: "PT-012",
    roomName: "General-C",
    bedNumber: "B-106",
    charge: 750.45,
    assignDate: "2024-12-01",
    dischargeDate: "2024-12-05",
    description: "Short-term care",
    status: "Pending",
    createdAt: "2023-05-01",
    updatedAt: "2023-11-12",
    draftedAt: "2023-04-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function BedTransferDataTable({
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
      accessorKey: "patientId",
      title: "Patient ID",
      options: [...new Set(mockBedTransfers.map((item) => item.patientId))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("patientId")
          .localeCompare(row2.getValue("patientId"));
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Patient ID",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "roomName",
      title: "Room Name",
      options: [...new Set(mockBedTransfers.map((item) => item.roomName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("roomName")
          .localeCompare(row2.getValue("roomName"));
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Room Name",
        readOnly: true,
      },
    },
    {
      accessorKey: "bedNumber",
      title: "Bed Number",
      options: [...new Set(mockBedTransfers.map((item) => item.bedNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("bedNumber")
          .localeCompare(row2.getValue("bedNumber"));
      },
      size: isMobile ? 120 : 140,
      minSize: 120,
      meta: {
        exportLabel: "Bed Number",
        readOnly: true,
      },
    },
    {
      accessorKey: "charge",
      title: "Charge",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = Number(row.getValue(columnId));
        return filterValue.some((filterVal: string | number) => {
          const parsed = Number(filterVal);
          if (Number.isNaN(parsed)) {
            return cellValue.toString().includes(String(filterVal));
          }
          return cellValue === parsed;
        });
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          Number(row1.getValue("charge")) - Number(row2.getValue("charge"))
        );
      },
      size: isMobile ? 120 : 140,
      minSize: 120,
      meta: {
        exportLabel: "Charge",
        readOnly: true,
      },
    },
    {
      accessorKey: "assignDate",
      title: "Assign Date",
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
        const date1 = new Date(row1.getValue("assignDate"));
        const date2 = new Date(row2.getValue("assignDate"));
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;
        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 160,
      minSize: 150,
      meta: {
        exportLabel: "Assign Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "dischargeDate",
      title: "Discharge Date",
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
        const date1 = new Date(row1.getValue("dischargeDate"));
        const date2 = new Date(row2.getValue("dischargeDate"));
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;
        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 170,
      minSize: 150,
      meta: {
        exportLabel: "Discharge Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [],
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
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Description",
        readOnly: true,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockBedTransfers.map((item) => item.status))],
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
      size: isMobile ? 120 : 140,
      minSize: 120,
      meta: {
        exportLabel: "Status",
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

  const filteredData = mockBedTransfers.filter((item: BedTransferItem) => {
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
      fixedColumns={["patientId", "status"]}
      pathName="bed-transfer"
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
