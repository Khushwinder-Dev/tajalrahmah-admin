/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useUserMasterPermissions } from "@/hooks/usePermissions";

// Lead interface to match the grid component
interface Lead {
  id: string;
  clientName: string;
  service: string;
  budget: number;
  status: "active" | "archived" | "upcoming" | "draft";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    clientName: "John Doe",
    service: "Web Development",
    budget: 50000,
    status: "active",
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
    clientName: "Jane Smith",
    service: "Mobile App Development",
    budget: 80000,
    status: "archived",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    clientName: "Kamrul Islam",
    service: "E-commerce Website",
    budget: 60000,
    status: "archived",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    clientName: "Shamima Akter",
    service: "Digital Marketing",
    budget: 45000,
    status: "archived",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    clientName: "Tanvir Ahmed",
    service: "Cloud Infrastructure Setup",
    budget: 120000,
    status: "archived",
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
    clientName: "Farhana Rahman",
    service: "UI/UX Design",
    budget: 30000,
    status: "archived",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    clientName: "Rashed Khan",
    service: "SEO Optimization",
    budget: 25000,
    status: "archived",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    clientName: "Mehnaz Sultana",
    service: "Content Creation",
    budget: 20000,
    status: "archived",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    clientName: "Sajib Chowdhury",
    service: "Social Media Management",
    budget: 28000,
    status: "archived",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    clientName: "Omar Faruque",
    service: "Cybersecurity Audit",
    budget: 90000,
    status: "upcoming",
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
    clientName: "Sumaiya Haque",
    service: "Email Marketing Campaign",
    budget: 15000,
    status: "draft",
    createdAt: "2023-04-15",
    updatedAt: "2023-09-10",
    draftedAt: "2023-04-10",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    clientName: "Imran Kabir",
    service: "ERP System Integration",
    budget: 110000,
    status: "draft",
    createdAt: "2023-05-01",
    updatedAt: "2023-11-12",
    draftedAt: "2023-04-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "13",
    clientName: "Nazmul Hasan",
    service: "Database Management",
    budget: 35000,
    status: "active",
    createdAt: "2023-05-10",
    updatedAt: "2023-10-30",
    draftedAt: "2023-05-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "14",
    clientName: "Fatima Begum",
    service: "Graphic Design",
    budget: 22000,
    status: "upcoming",
    createdAt: "2023-05-20",
    updatedAt: "2023-11-02",
    draftedAt: "2023-05-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "15",
    clientName: "Rakibul Islam",
    service: "Video Production",
    budget: 40000,
    status: "draft",
    createdAt: "2023-06-01",
    updatedAt: "2023-11-08",
    draftedAt: "2023-05-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "16",
    clientName: "Taslima Khatun",
    service: "Content Writing",
    budget: 18000,
    status: "active",
    createdAt: "2023-06-10",
    updatedAt: "2023-10-25",
    draftedAt: "2023-06-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "17",
    clientName: "Karim Uddin",
    service: "Network Security",
    budget: 75000,
    status: "upcoming",
    createdAt: "2023-06-15",
    updatedAt: "2023-06-20",
    draftedAt: "2023-06-12",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "18",
    clientName: "Nasrin Akter",
    service: "App Testing",
    budget: 30000,
    status: "draft",
    createdAt: "2023-07-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-06-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "19",
    clientName: "Mizanur Rahman",
    service: "Data Analysis",
    budget: 45000,
    status: "active",
    createdAt: "2023-07-10",
    updatedAt: "2023-10-18",
    draftedAt: "2023-07-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "20",
    clientName: "Rashida Begum",
    service: "Customer Support",
    budget: 25000,
    status: "upcoming",
    createdAt: "2023-07-20",
    updatedAt: "2023-09-15",
    draftedAt: "2023-07-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function LeadsDataTable({
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
  const { canCreate } = useUserMasterPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "clientName",
      title: "Client Name",
      options: [...new Set(mockLeads.map((item) => item.clientName))],
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
      size: isMobile ? 120 : 180,
      minSize: 120,
      meta: {
        exportLabel: "Client Name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "service",
      title: "Service",
      options: [...new Set(mockLeads.map((item) => item.service))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("service").localeCompare(row2.getValue("service"));
      },
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Service",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "budget",
      title: "Budget",
      options: [...new Set(mockLeads.map((item) => item.budget))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("budget") - row2.getValue("budget");
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Budget",
        readOnly: !canCreate,
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

  const filteredData = mockLeads.filter((lead) => {
    if (dataTableFilter.status === "Active") {
      return lead.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !lead.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return lead.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return lead.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return lead.isUpdated;
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
      fixedColumns={["clientName", "service"]} // Pin client name and service columns
      pathName="leads"
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
