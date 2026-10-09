/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";

// Lead Status interface (Name, Order, Color)
interface LeadStatus {
  id: string;
  name: string;
  order: number;
  color: string; // hex color
  status: "active" | "inactive" | "draft";
}

const mockLeadStatuses: LeadStatus[] = [
  { id: "1", name: "New", order: 1, color: "#3B82F6", status: "active" },
  { id: "2", name: "Contacted", order: 2, color: "#06B6D4", status: "active" },
  { id: "3", name: "Qualified", order: 3, color: "#10B981", status: "active" },
  {
    id: "4",
    name: "Proposal Sent",
    order: 4,
    color: "#8B5CF6",
    status: "active",
  },
  {
    id: "5",
    name: "Negotiation",
    order: 5,
    color: "#F59E0B",
    status: "active",
  },
  { id: "6", name: "Won", order: 6, color: "#22C55E", status: "active" },
  { id: "7", name: "Lost", order: 7, color: "#EF4444", status: "inactive" },
  { id: "8", name: "On Hold", order: 8, color: "#64748B", status: "draft" },
  { id: "9", name: "Re-engage", order: 9, color: "#A78BFA", status: "active" },
  {
    id: "10",
    name: "No Response",
    order: 10,
    color: "#94A3B8",
    status: "inactive",
  },
  {
    id: "11",
    name: "In-progress",
    order: 11,
    color: "#10B981",
    status: "active",
  },
  {
    id: "12",
    name: "Completed",
    order: 12,
    color: "#94A3B8",
    status: "active",
  },
  {
    id: "13",
    name: "Cancelled",
    order: 13,
    color: "#EF4444",
    status: "inactive",
  },
  { id: "14", name: "On Hold", order: 14, color: "#94A3B8", status: "draft" },
  {
    id: "15",
    name: "Re-engage",
    order: 15,
    color: "#F59E0B",
    status: "active",
  },
  {
    id: "16",
    name: "No Response",
    order: 16,
    color: "#EF4444",
    status: "inactive",
  },
  {
    id: "17",
    name: "In-progress",
    order: 17,
    color: "#94A3B8",
    status: "active",
  },
  {
    id: "18",
    name: "Completed",
    order: 18,
    color: "#F59E0B",
    status: "active",
  },
  {
    id: "19",
    name: "Cancelled",
    order: 19,
    color: "#10B981",
    status: "inactive",
  },
  { id: "20", name: "On Hold", order: 20, color: "#94A3B8", status: "draft" },
  {
    id: "21",
    name: "Re-engage",
    order: 21,
    color: "#F59E0B",
    status: "active",
  },
  {
    id: "22",
    name: "No Response",
    order: 22,
    color: "#94A3B8",
    status: "inactive",
  },
  {
    id: "23",
    name: "In-progress",
    order: 23,
    color: "#F59E0B",
    status: "active",
  },
];

export default function LeadStatusDataTable({
  viewMode,
  setViewMode,
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
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockLeadStatuses.map((item) => item.name))],
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
      size: isMobile ? 120 : 180,
      minSize: 120,
      meta: {
        exportLabel: "Name",
        readOnly: true,
      },
    },
    {
      accessorKey: "order",
      title: "Order",
      options: [...new Set(mockLeadStatuses.map((item) => String(item.order)))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = String(row.getValue(columnId));
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return Number(row1.getValue("order")) - Number(row2.getValue("order"));
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Order",
        readOnly: true,
      },
    },
    {
      accessorKey: "color",
      title: "Color",
      options: [...new Set(mockLeadStatuses.map((item) => item.color))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = (row.getValue(columnId) as string).toLowerCase();
        return filterValue.some((filterVal: string) =>
          cellValue.includes(String(filterVal).toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("color").localeCompare(row2.getValue("color"));
      },
      size: isMobile ? 120 : 160,
      minSize: 100,
      meta: {
        exportLabel: "Color",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockLeadStatuses;

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["name", "status"]}
      pathName="lead-status"
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
