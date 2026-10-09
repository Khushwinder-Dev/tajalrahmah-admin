/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Salesman interface to match the grid component
interface SalesmanItem {
  id: string;
  code: string;
  salesmanName: string;
  commission: string;
  territory: string;
  experience: string;
  department: string;
  manager: string;
  phone: string;
  email: string;
  description: string;
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

const mockSalesmen: SalesmanItem[] = [
  {
    id: "1",
    code: "SLM-001",
    salesmanName: "John Smith",
    commission: "5%",
    territory: "North Region",
    experience: "5 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0123",
    email: "john.smith@company.com",
    description: "Experienced salesman specializing in corporate accounts",
    status: "Active",
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
    code: "SLM-002",
    salesmanName: "Emily Davis",
    commission: "7%",
    territory: "South Region",
    experience: "3 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0124",
    email: "emily.davis@company.com",
    description: "Top performer in retail sales and customer relations",
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
    code: "SLM-003",
    salesmanName: "Robert Wilson",
    commission: "6%",
    territory: "East Region",
    experience: "8 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0125",
    email: "robert.wilson@company.com",
    description: "Senior salesman with expertise in enterprise solutions",
    status: "Draft",
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
    code: "SLM-004",
    salesmanName: "Lisa Anderson",
    commission: "5.5%",
    territory: "West Region",
    experience: "4 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0126",
    email: "lisa.anderson@company.com",
    description: "Specialized in technology sales and client onboarding",
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
    code: "SLM-005",
    salesmanName: "David Martinez",
    commission: "6.5%",
    territory: "Central Region",
    experience: "6 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0127",
    email: "david.martinez@company.com",
    description: "Expert in B2B sales and relationship management",
    status: "Active",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    code: "SLM-006",
    salesmanName: "Jennifer Taylor",
    commission: "5%",
    territory: "Northwest Region",
    experience: "2 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0128",
    email: "jennifer.taylor@company.com",
    description: "Rising star in digital sales and online marketing",
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
    code: "SLM-007",
    salesmanName: "Christopher Lee",
    commission: "7.5%",
    territory: "Southeast Region",
    experience: "10 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0129",
    email: "christopher.lee@company.com",
    description: "Veteran salesman with extensive industry connections",
    status: "Pending",
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
    code: "SLM-008",
    salesmanName: "Amanda White",
    commission: "6%",
    territory: "Northeast Region",
    experience: "4 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0130",
    email: "amanda.white@company.com",
    description: "Specialized in healthcare and pharmaceutical sales",
    status: "Draft",
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
    code: "SLM-009",
    salesmanName: "Kevin Thompson",
    commission: "5.5%",
    territory: "Southwest Region",
    experience: "3 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0131",
    email: "kevin.thompson@company.com",
    description: "Focused on manufacturing and industrial sales",
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
    code: "SLM-010",
    salesmanName: "Michelle Garcia",
    commission: "6.5%",
    territory: "Midwest Region",
    experience: "7 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0132",
    email: "michelle.garcia@company.com",
    description: "Expert in financial services and investment products",
    status: "Rejected",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    code: "SLM-011",
    salesmanName: "Daniel Rodriguez",
    commission: "5%",
    territory: "Pacific Region",
    experience: "1 year",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0133",
    email: "daniel.rodriguez@company.com",
    description: "New graduate with strong potential in tech sales",
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
    code: "SLM-012",
    salesmanName: "Rachel Moore",
    commission: "7%",
    territory: "Atlantic Region",
    experience: "9 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0134",
    email: "rachel.moore@company.com",
    description: "Senior sales professional specializing in luxury goods",
    status: "Draft",
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

export default function SalesmanDataTable({
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
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockSalesmen.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: isMobile ? 130 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "salesmanName",
      title: "Salesman Name",
      options: [...new Set(mockSalesmen.map((item) => item.salesmanName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("salesmanName")
          .localeCompare(row2.getValue("salesmanName"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Salesman Name",
        readOnly: true,
      },
    },
    {
      accessorKey: "commission",
      title: "Commission",
      options: [...new Set(mockSalesmen.map((item) => item.commission))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("commission")
          .localeCompare(row2.getValue("commission"));
      },
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "Commission",
        readOnly: true,
      },
    },
    {
      accessorKey: "territory",
      title: "Territory",
      options: [...new Set(mockSalesmen.map((item) => item.territory))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("territory")
          .localeCompare(row2.getValue("territory"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Territory",
        readOnly: true,
      },
    },
    {
      accessorKey: "experience",
      title: "Experience",
      options: [...new Set(mockSalesmen.map((item) => item.experience))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("experience")
          .localeCompare(row2.getValue("experience"));
      },
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "Experience",
        readOnly: true,
      },
    },
    {
      accessorKey: "department",
      title: "Department",
      options: [...new Set(mockSalesmen.map((item) => item.department))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("department")
          .localeCompare(row2.getValue("department"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Department",
        readOnly: true,
      },
    },
    {
      accessorKey: "manager",
      title: "Manager",
      options: [...new Set(mockSalesmen.map((item) => item.manager))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("manager").localeCompare(row2.getValue("manager"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Manager",
        readOnly: true,
      },
    },
    {
      accessorKey: "phone",
      title: "Phone",
      options: [...new Set(mockSalesmen.map((item) => item.phone))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("phone").localeCompare(row2.getValue("phone"));
      },
      size: isMobile ? 140 : 160,
      minSize: 120,
      meta: {
        exportLabel: "Phone",
        readOnly: true,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockSalesmen.map((item) => item.email))],
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
      size: isMobile ? 180 : 220,
      minSize: 160,
      meta: {
        exportLabel: "Email",
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
      size: isMobile ? 180 : 250,
      minSize: 180,
      meta: {
        exportLabel: "Description",
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

  const filteredData = mockSalesmen.filter((item: SalesmanItem) => {
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
      fixedColumns={["code", "status"]}
      pathName="salesman"
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
