/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Sample Receiving interface to match the grid component
interface SampleReceivingItem {
  id: string;
  branch: string;
  receivingNo: string;
  clientName: string;
  clientReference: string;
  typeOfSample: string;
  requiredTests: string;
  numberOfSample: number;
  section: string;
  deliveredBy: string;
  receivedBy: string;
  receivingDate: string;
  receivingTime: string;
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

const mockSampleReceivings: SampleReceivingItem[] = [
  {
    id: "1",
    branch: "Main Branch",
    receivingNo: "SR-001",
    clientName: "ABC Food Corp",
    clientReference: "REF-2024-001",
    typeOfSample: "Food Product",
    requiredTests: "Microbiology, Chemical Analysis",
    numberOfSample: 5,
    section: "Quality Control",
    deliveredBy: "John Smith",
    receivedBy: "Sarah Johnson",
    receivingDate: "2024-01-15",
    receivingTime: "09:30 AM",
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
    branch: "North Branch",
    receivingNo: "SR-002",
    clientName: "XYZ Beverages Ltd",
    clientReference: "REF-2024-002",
    typeOfSample: "Beverage",
    requiredTests: "Chemical Analysis, pH Testing",
    numberOfSample: 3,
    section: "Laboratory",
    deliveredBy: "Mike Wilson",
    receivedBy: "Emily Davis",
    receivingDate: "2024-01-16",
    receivingTime: "11:15 AM",
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
    branch: "South Branch",
    receivingNo: "SR-003",
    clientName: "Fresh Produce Inc",
    clientReference: "REF-2024-003",
    typeOfSample: "Agricultural Product",
    requiredTests: "Pesticide Residue, Heavy Metals",
    numberOfSample: 8,
    section: "Environmental Testing",
    deliveredBy: "David Brown",
    receivedBy: "Lisa Anderson",
    receivingDate: "2024-01-17",
    receivingTime: "02:45 PM",
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
    branch: "Main Branch",
    receivingNo: "SR-004",
    clientName: "Dairy Products Co",
    clientReference: "REF-2024-004",
    typeOfSample: "Dairy Product",
    requiredTests: "Microbiology, Fat Content",
    numberOfSample: 4,
    section: "Food Safety",
    deliveredBy: "Robert Taylor",
    receivedBy: "Jennifer White",
    receivingDate: "2024-01-18",
    receivingTime: "10:00 AM",
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
    branch: "East Branch",
    receivingNo: "SR-005",
    clientName: "Meat Processing Ltd",
    clientReference: "REF-2024-005",
    typeOfSample: "Meat Product",
    requiredTests: "Pathogen Testing, Nutritional Analysis",
    numberOfSample: 6,
    section: "Microbiology",
    deliveredBy: "James Miller",
    receivedBy: "Amanda Garcia",
    receivingDate: "2024-01-19",
    receivingTime: "08:30 AM",
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
    branch: "West Branch",
    receivingNo: "SR-006",
    clientName: "Organic Foods LLC",
    clientReference: "REF-2024-006",
    typeOfSample: "Organic Product",
    requiredTests: "Organic Certification, Contaminant Analysis",
    numberOfSample: 7,
    section: "Organic Testing",
    deliveredBy: "Christopher Lee",
    receivedBy: "Michelle Rodriguez",
    receivingDate: "2024-01-20",
    receivingTime: "01:20 PM",
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
    branch: "Main Branch",
    receivingNo: "SR-007",
    clientName: "Seafood Distributors",
    clientReference: "REF-2024-007",
    typeOfSample: "Seafood",
    requiredTests: "Mercury Content, Freshness Testing",
    numberOfSample: 3,
    section: "Chemical Analysis",
    deliveredBy: "Kevin Martinez",
    receivedBy: "Rachel Thompson",
    receivingDate: "2024-01-21",
    receivingTime: "03:15 PM",
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
    branch: "North Branch",
    receivingNo: "SR-008",
    clientName: "Bakery Supplies Inc",
    clientReference: "REF-2024-008",
    typeOfSample: "Bakery Product",
    requiredTests: "Allergen Testing, Shelf Life",
    numberOfSample: 5,
    section: "Allergen Testing",
    deliveredBy: "Daniel Clark",
    receivedBy: "Stephanie Lewis",
    receivingDate: "2024-01-22",
    receivingTime: "09:45 AM",
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
    branch: "Central Branch",
    receivingNo: "SR-009",
    clientName: "Frozen Foods Co",
    clientReference: "REF-2024-009",
    typeOfSample: "Frozen Product",
    requiredTests: "Temperature Testing, Quality Check",
    numberOfSample: 4,
    section: "Quality Control",
    deliveredBy: "Michael Johnson",
    receivedBy: "Jessica Wilson",
    receivingDate: "2024-01-23",
    receivingTime: "12:30 PM",
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
    branch: "Downtown Branch",
    receivingNo: "SR-010",
    clientName: "Spice Importers Ltd",
    clientReference: "REF-2024-010",
    typeOfSample: "Spice Product",
    requiredTests: "Contaminant Analysis, Purity Test",
    numberOfSample: 6,
    section: "Chemical Analysis",
    deliveredBy: "William Davis",
    receivedBy: "Ashley Brown",
    receivingDate: "2024-01-24",
    receivingTime: "04:00 PM",
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
    branch: "Industrial Branch",
    receivingNo: "SR-011",
    clientName: "Packaging Materials Inc",
    clientReference: "REF-2024-011",
    typeOfSample: "Packaging Material",
    requiredTests: "Safety Testing, Material Analysis",
    numberOfSample: 2,
    section: "Environmental Testing",
    deliveredBy: "Thomas Wilson",
    receivedBy: "Nicole Garcia",
    receivingDate: "2024-01-25",
    receivingTime: "07:15 AM",
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
    branch: "Main Branch",
    receivingNo: "SR-012",
    clientName: "Nutritional Supplements Co",
    clientReference: "REF-2024-012",
    typeOfSample: "Supplement Product",
    requiredTests: "Nutritional Analysis, Purity Test",
    numberOfSample: 9,
    section: "Nutritional Analysis",
    deliveredBy: "Richard Martinez",
    receivedBy: "Kimberly Lee",
    receivingDate: "2024-01-26",
    receivingTime: "11:45 AM",
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

export default function SampleReceivingDataTable({
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
      accessorKey: "receivingNo",
      title: "Receiving No",
      options: [
        ...new Set(mockSampleReceivings.map((item) => item.receivingNo)),
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
          .getValue("receivingNo")
          .localeCompare(row2.getValue("receivingNo"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Receiving No",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "clientName",
      title: "Client Name",
      options: [
        ...new Set(mockSampleReceivings.map((item) => item.clientName)),
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
          .getValue("clientName")
          .localeCompare(row2.getValue("clientName"));
      },
      size: isMobile ? 180 : 220,
      minSize: 180,
      meta: {
        exportLabel: "Client Name",
        readOnly: true,
      },
    },
    {
      accessorKey: "branch",
      title: "Branch",
      options: [...new Set(mockSampleReceivings.map((item) => item.branch))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("branch").localeCompare(row2.getValue("branch"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Branch",
        readOnly: true,
      },
    },
    {
      accessorKey: "typeOfSample",
      title: "Type of Sample",
      options: [
        ...new Set(mockSampleReceivings.map((item) => item.typeOfSample)),
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
          .getValue("typeOfSample")
          .localeCompare(row2.getValue("typeOfSample"));
      },
      size: isMobile ? 180 : 220,
      minSize: 180,
      meta: {
        exportLabel: "Type of Sample",
        readOnly: true,
      },
    },
    {
      accessorKey: "numberOfSample",
      title: "Number of Sample",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          row1.getValue("numberOfSample") - row2.getValue("numberOfSample")
        );
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Number of Sample",
        readOnly: true,
      },
    },
    {
      accessorKey: "section",
      title: "Section",
      options: [...new Set(mockSampleReceivings.map((item) => item.section))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("section").localeCompare(row2.getValue("section"));
      },
      size: isMobile ? 180 : 220,
      minSize: 180,
      meta: {
        exportLabel: "Section",
        readOnly: true,
      },
    },
    {
      accessorKey: "receivedBy",
      title: "Received By",
      options: [
        ...new Set(mockSampleReceivings.map((item) => item.receivedBy)),
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
          .getValue("receivedBy")
          .localeCompare(row2.getValue("receivedBy"));
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Received By",
        readOnly: true,
      },
    },
    {
      accessorKey: "receivingDate",
      title: "Receiving Date",
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
        const date1 = new Date(row1.getValue("receivingDate"));
        const date2 = new Date(row2.getValue("receivingDate"));

        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Receiving Date",
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

  const filteredData = mockSampleReceivings.filter(
    (item: SampleReceivingItem) => {
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
      fixedColumns={["receivingNo", "status"]}
      pathName="sample-receiving"
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
