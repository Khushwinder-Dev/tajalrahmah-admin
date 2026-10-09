/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Promotion interface to match the grid component
interface PromotionItem {
  id: string;
  code: string;
  employeeName: string;
  fromPosition: string;
  toPosition: string;
  fromDepartment: string;
  toDepartment: string;
  fromSalary: string;
  toSalary: string;
  promotionDate: string;
  effectiveDate: string;
  approvedBy: string;
  reason: string;
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

const mockPromotions: PromotionItem[] = [
  {
    id: "1",
    code: "PRM-001",
    employeeName: "John Smith",
    fromPosition: "Junior Developer",
    toPosition: "Senior Developer",
    fromDepartment: "IT",
    toDepartment: "IT",
    fromSalary: "$60,000",
    toSalary: "$75,000",
    promotionDate: "2024-01-15",
    effectiveDate: "2024-02-01",
    approvedBy: "Sarah Johnson",
    reason: "Outstanding performance and technical growth",
    description:
      "Promoted due to exceptional coding skills and leadership potential",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    draftedAt: "2024-01-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    code: "PRM-002",
    employeeName: "Emily Davis",
    fromPosition: "Marketing Coordinator",
    toPosition: "Marketing Manager",
    fromDepartment: "Marketing",
    toDepartment: "Marketing",
    fromSalary: "$45,000",
    toSalary: "$65,000",
    promotionDate: "2024-02-20",
    effectiveDate: "2024-03-01",
    approvedBy: "Michael Brown",
    reason: "Successful campaign management and team leadership",
    description:
      "Promoted for managing multiple successful marketing campaigns",
    status: "Active",
    createdAt: "2024-02-20",
    updatedAt: "2024-02-20",
    draftedAt: "2024-02-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    code: "PRM-003",
    employeeName: "Robert Wilson",
    fromPosition: "Sales Representative",
    toPosition: "Sales Manager",
    fromDepartment: "Sales",
    toDepartment: "Sales",
    fromSalary: "$50,000",
    toSalary: "$70,000",
    promotionDate: "2024-03-10",
    effectiveDate: "2024-04-01",
    approvedBy: "Lisa Anderson",
    reason: "Consistent sales performance and team building skills",
    description:
      "Promoted for exceeding sales targets and mentoring junior staff",
    status: "Draft",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-10",
    draftedAt: "2024-03-05",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    code: "PRM-004",
    employeeName: "Lisa Anderson",
    fromPosition: "HR Assistant",
    toPosition: "HR Specialist",
    fromDepartment: "Human Resources",
    toDepartment: "Human Resources",
    fromSalary: "$40,000",
    toSalary: "$55,000",
    promotionDate: "2024-04-05",
    effectiveDate: "2024-05-01",
    approvedBy: "David Martinez",
    reason: "Improved recruitment processes and employee relations",
    description:
      "Promoted for streamlining HR processes and improving employee satisfaction",
    status: "Pending",
    createdAt: "2024-04-05",
    updatedAt: "2024-04-05",
    draftedAt: "2024-04-01",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    code: "PRM-005",
    employeeName: "David Martinez",
    fromPosition: "Accountant",
    toPosition: "Senior Accountant",
    fromDepartment: "Finance",
    toDepartment: "Finance",
    fromSalary: "$55,000",
    toSalary: "$70,000",
    promotionDate: "2024-05-12",
    effectiveDate: "2024-06-01",
    approvedBy: "Jennifer Taylor",
    reason: "Advanced financial analysis and reporting capabilities",
    description: "Promoted for developing new financial reporting systems",
    status: "Active",
    createdAt: "2024-05-12",
    updatedAt: "2024-05-12",
    draftedAt: "2024-05-08",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    code: "PRM-006",
    employeeName: "Jennifer Taylor",
    fromPosition: "Customer Service Rep",
    toPosition: "Customer Service Supervisor",
    fromDepartment: "Customer Service",
    toDepartment: "Customer Service",
    fromSalary: "$35,000",
    toSalary: "$50,000",
    promotionDate: "2024-06-18",
    effectiveDate: "2024-07-01",
    approvedBy: "Christopher Lee",
    reason: "Excellent customer satisfaction scores and team management",
    description:
      "Promoted for maintaining high customer satisfaction and training new staff",
    status: "Active",
    createdAt: "2024-06-18",
    updatedAt: "2024-06-18",
    draftedAt: "2024-06-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    code: "PRM-007",
    employeeName: "Christopher Lee",
    fromPosition: "Operations Analyst",
    toPosition: "Operations Manager",
    fromDepartment: "Operations",
    toDepartment: "Operations",
    fromSalary: "$60,000",
    toSalary: "$80,000",
    promotionDate: "2024-07-25",
    effectiveDate: "2024-08-01",
    approvedBy: "Amanda White",
    reason: "Process optimization and efficiency improvements",
    description:
      "Promoted for implementing cost-saving operational improvements",
    status: "Pending",
    createdAt: "2024-07-25",
    updatedAt: "2024-07-25",
    draftedAt: "2024-07-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    code: "PRM-008",
    employeeName: "Amanda White",
    fromPosition: "Quality Inspector",
    toPosition: "Quality Manager",
    fromDepartment: "Quality Assurance",
    toDepartment: "Quality Assurance",
    fromSalary: "$45,000",
    toSalary: "$65,000",
    promotionDate: "2024-08-30",
    effectiveDate: "2024-09-01",
    approvedBy: "Kevin Thompson",
    reason: "Zero defect rate and quality system improvements",
    description:
      "Promoted for maintaining perfect quality standards and process improvements",
    status: "Draft",
    createdAt: "2024-08-30",
    updatedAt: "2024-08-30",
    draftedAt: "2024-08-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    code: "PRM-009",
    employeeName: "Kevin Thompson",
    fromPosition: "Project Coordinator",
    toPosition: "Project Manager",
    fromDepartment: "Project Management",
    toDepartment: "Project Management",
    fromSalary: "$50,000",
    toSalary: "$70,000",
    promotionDate: "2024-09-15",
    effectiveDate: "2024-10-01",
    approvedBy: "Michelle Garcia",
    reason: "Successful project delivery and stakeholder management",
    description:
      "Promoted for delivering multiple projects on time and within budget",
    status: "Active",
    createdAt: "2024-09-15",
    updatedAt: "2024-09-15",
    draftedAt: "2024-09-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    code: "PRM-010",
    employeeName: "Michelle Garcia",
    fromPosition: "Business Analyst",
    toPosition: "Senior Business Analyst",
    fromDepartment: "Business Analysis",
    toDepartment: "Business Analysis",
    fromSalary: "$65,000",
    toSalary: "$85,000",
    promotionDate: "2024-10-22",
    effectiveDate: "2024-11-01",
    approvedBy: "Daniel Rodriguez",
    reason: "Strategic insights and process improvements",
    description:
      "Promoted for providing valuable business insights and recommendations",
    status: "Rejected",
    createdAt: "2024-10-22",
    updatedAt: "2024-10-22",
    draftedAt: "2024-10-18",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    code: "PRM-011",
    employeeName: "Daniel Rodriguez",
    fromPosition: "Junior Designer",
    toPosition: "UI/UX Designer",
    fromDepartment: "Design",
    toDepartment: "Design",
    fromSalary: "$45,000",
    toSalary: "$60,000",
    promotionDate: "2024-11-08",
    effectiveDate: "2024-12-01",
    approvedBy: "Rachel Moore",
    reason: "Creative design solutions and user experience improvements",
    description:
      "Promoted for innovative design work and improved user experience",
    status: "Active",
    createdAt: "2024-11-08",
    updatedAt: "2024-11-08",
    draftedAt: "2024-11-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    code: "PRM-012",
    employeeName: "Rachel Moore",
    fromPosition: "Content Writer",
    toPosition: "Content Manager",
    fromDepartment: "Content",
    toDepartment: "Content",
    fromSalary: "$40,000",
    toSalary: "$55,000",
    promotionDate: "2024-12-05",
    effectiveDate: "2025-01-01",
    approvedBy: "James Clark",
    reason: "Content strategy development and team leadership",
    description:
      "Promoted for developing comprehensive content strategies and managing writers",
    status: "Draft",
    createdAt: "2024-12-05",
    updatedAt: "2024-12-05",
    draftedAt: "2024-12-01",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function PromotionsDataTable({
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
      options: [...new Set(mockPromotions.map((item) => item.code))],
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
      accessorKey: "employeeName",
      title: "Employee Name",
      options: [...new Set(mockPromotions.map((item) => item.employeeName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("employeeName")
          .localeCompare(row2.getValue("employeeName"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Employee Name",
        readOnly: true,
      },
    },
    {
      accessorKey: "fromPosition",
      title: "From Position",
      options: [...new Set(mockPromotions.map((item) => item.fromPosition))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("fromPosition")
          .localeCompare(row2.getValue("fromPosition"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "From Position",
        readOnly: true,
      },
    },
    {
      accessorKey: "toPosition",
      title: "To Position",
      options: [...new Set(mockPromotions.map((item) => item.toPosition))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("toPosition")
          .localeCompare(row2.getValue("toPosition"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "To Position",
        readOnly: true,
      },
    },
    {
      accessorKey: "fromDepartment",
      title: "From Department",
      options: [...new Set(mockPromotions.map((item) => item.fromDepartment))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("fromDepartment")
          .localeCompare(row2.getValue("fromDepartment"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "From Department",
        readOnly: true,
      },
    },
    {
      accessorKey: "toDepartment",
      title: "To Department",
      options: [...new Set(mockPromotions.map((item) => item.toDepartment))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("toDepartment")
          .localeCompare(row2.getValue("toDepartment"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "To Department",
        readOnly: true,
      },
    },
    {
      accessorKey: "fromSalary",
      title: "From Salary",
      options: [...new Set(mockPromotions.map((item) => item.fromSalary))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("fromSalary")
          .localeCompare(row2.getValue("fromSalary"));
      },
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "From Salary",
        readOnly: true,
      },
    },
    {
      accessorKey: "toSalary",
      title: "To Salary",
      options: [...new Set(mockPromotions.map((item) => item.toSalary))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("toSalary")
          .localeCompare(row2.getValue("toSalary"));
      },
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "To Salary",
        readOnly: true,
      },
    },
    {
      accessorKey: "promotionDate",
      title: "Promotion Date",
      options: [...new Set(mockPromotions.map((item) => item.promotionDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("promotionDate"));
        const date2 = new Date(row2.getValue("promotionDate"));
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;
        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Promotion Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "effectiveDate",
      title: "Effective Date",
      options: [...new Set(mockPromotions.map((item) => item.effectiveDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("effectiveDate"));
        const date2 = new Date(row2.getValue("effectiveDate"));
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;
        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "Effective Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "approvedBy",
      title: "Approved By",
      options: [...new Set(mockPromotions.map((item) => item.approvedBy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("approvedBy")
          .localeCompare(row2.getValue("approvedBy"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Approved By",
        readOnly: true,
      },
    },
    {
      accessorKey: "reason",
      title: "Reason",
      options: [...new Set(mockPromotions.map((item) => item.reason))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("reason").localeCompare(row2.getValue("reason"));
      },
      size: isMobile ? 180 : 250,
      minSize: 180,
      meta: {
        exportLabel: "Reason",
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

  const filteredData = mockPromotions.filter((item: PromotionItem) => {
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
      pathName="promotion"
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
