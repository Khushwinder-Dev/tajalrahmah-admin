/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";
import { getModuleFromPath } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import type { ModuleFieldsType } from "./ComponentLevelGridView";

type TabDataType = ModuleFieldsType & {
  id: string;
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

const fixedColumns = ["campaignCode", "position"];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TabDataType[] = [
  {
    id: "1",
    campaignCode: "CMP-003",
    campaignName: "Customer Support Hiring",
    recruitmentPlan: "Hiring 15 support agents for call center operations",
    recruitmentChannel: "Job Boards, Walk-in Interviews, Employee Referrals",
    position: "Customer Support Agent",
    company: "Best Electronics LTD",
    recruitedQuantity: "15",
    workingFrom: "2025-09-20",
    department: "Customer Support",
    workplace: "Call Center - Dhaka",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-01",
    toDate: "2025-11-20",
    reason: "Increase in customer base",
    jobDescription:
      "Handle customer queries, tickets, and complaints professionally.",
    managers: "Ms. Ayesha (Support Lead)",
    followers: "30",
    metaTitle: "Customer Support Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a Customer Support Agent. Great team environment and growth opportunities.",
    ageFrom: "20",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s degree in any discipline",
    seniority: "Entry-level",
    attachment: "JD_SupportAgent.pdf",
    status: "Active",
    createdAt: "2025-08-20",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Approved by CTO",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    campaignCode: "CMP-003",
    campaignName: "Customer Support Hiring",
    recruitmentPlan: "Hiring 15 support agents for call center operations",
    recruitmentChannel: "Job Boards, Walk-in Interviews, Employee Referrals",
    position: "Customer Support Agent",
    company: "Best Electronics LTD",
    recruitedQuantity: "15",
    workingFrom: "2025-09-20",
    department: "Customer Support",
    workplace: "Call Center - Dhaka",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-01",
    toDate: "2025-11-20",
    reason: "Increase in customer base",
    jobDescription:
      "Handle customer queries, tickets, and complaints professionally.",
    managers: "Ms. Ayesha (Support Lead)",
    followers: "30",
    metaTitle: "Customer Support Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a Customer Support Agent. Great team environment and growth opportunities.",
    ageFrom: "20",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s degree in any discipline",
    seniority: "Entry-level",
    attachment: "JD_SupportAgent.pdf",
    status: "Draft",
    createdAt: "2025-08-21",
    updatedAt: "2025-08-24",
    draftedAt: "2025-08-22",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    campaignCode: "CMP-004",
    campaignName: "QA Engineer Hiring",
    recruitmentPlan: "Hiring 3 QA engineers for Chittagong office",
    recruitmentChannel: "LinkedIn, Job Boards, Employee Referrals",
    position: "QA Engineer",
    company: "Best Electronics LTD",
    recruitedQuantity: "3",
    workingFrom: "2025-09-10",
    department: "Quality Assurance",
    workplace: "Chittagong Office",
    startingSalaryFrom: "25000",
    startingSalaryTo: "40000",
    fromDate: "2025-09-10",
    toDate: "2025-10-10",
    reason: "Increasing product releases",
    jobDescription: "Manual and automation testing of web applications.",
    managers: "Mr. Imran (QA Lead)",
    followers: "5",
    metaTitle: "QA Engineer Jobs in Chittagong - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a QA Engineer. Ensure high quality of our software products.",
    ageFrom: "21",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor in Computer Science",
    seniority: "Entry-level",
    attachment: "JD_QA.pdf",
    status: "Active",
    createdAt: "2025-08-19",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Recruitment started",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    campaignCode: "CMP-005",
    campaignName: "UI/UX Designer Hiring",
    recruitmentPlan: "Hiring 1 UI/UX Designer for Dhaka HQ",
    recruitmentChannel: "Design Portfolios, LinkedIn, Referrals",
    position: "UI/UX Designer",
    company: "Best Electronics LTD",
    recruitedQuantity: "1",
    workingFrom: "2025-09-15",
    department: "Design",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "30000",
    startingSalaryTo: "45000",
    fromDate: "2025-09-15",
    toDate: "2025-10-15",
    reason: "New product design team",
    jobDescription: "Design modern UI and improve user experience.",
    managers: "Ms. Nadia (Design Head)",
    followers: "2",
    metaTitle: "UI/UX Designer Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a UI/UX Designer. Create modern and user-friendly interfaces.",
    ageFrom: "23",
    ageTo: "33",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor in Design",
    seniority: "Mid-level",
    attachment: "JD_UIUX.pdf",
    status: "Active",
    createdAt: "2025-08-18",
    updatedAt: "2025-08-25",
    draftedAt: null,
    actionMessage: "Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    campaignCode: "CMP-006",
    campaignName: "Data Analyst Hiring",
    recruitmentPlan: "Hiring 2 Data Analysts for remote analytics team",
    recruitmentChannel: "Job Boards, LinkedIn, Referrals",
    position: "Data Analyst",
    company: "Best Electronics LTD",
    recruitedQuantity: "2",
    workingFrom: "2025-09-20",
    department: "Analytics",
    workplace: "Remote",
    startingSalaryFrom: "38000",
    startingSalaryTo: "55000",
    fromDate: "2025-09-20",
    toDate: "2025-10-20",
    reason: "Data-driven decision making",
    jobDescription: "Analyze data and provide actionable insights.",
    managers: "Mr. Farhan (Analytics Manager)",
    followers: "3",
    metaTitle: "Data Analyst Jobs - Best Electronics LTD",
    metaDescription:
      "Join our analytics team as a Data Analyst. Work remotely and deliver insights for business growth.",
    ageFrom: "25",
    ageTo: "35",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor in Statistics or Economics",
    seniority: "Mid-level",
    attachment: "JD_DataAnalyst.pdf",
    status: "Active",
    createdAt: "2025-08-17",
    updatedAt: "2025-08-24",
    draftedAt: null,
    actionMessage: "In progress",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    campaignCode: "CMP-007",
    campaignName: "HR Executive Hiring",
    recruitmentPlan: "Hiring 1 HR Executive for Dhaka HQ",
    recruitmentChannel: "LinkedIn, Job Boards, Referrals",
    position: "HR Executive",
    company: "Best Electronics LTD",
    recruitedQuantity: "1",
    workingFrom: "2025-09-01",
    department: "HR",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "25000",
    startingSalaryTo: "35000",
    fromDate: "2025-09-01",
    toDate: "2025-09-30",
    reason: "Employee relations support",
    jobDescription: "Assist in recruitment, payroll and employee relations.",
    managers: "Ms. Sultana (HR Manager)",
    followers: "2",
    metaTitle: "HR Executive Jobs - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as HR Executive. Support employee relations and HR operations.",
    ageFrom: "23",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor in HR",
    seniority: "Entry-level",
    attachment: "JD_HR.pdf",
    status: "Active",
    createdAt: "2025-08-15",
    updatedAt: "2025-08-23",
    draftedAt: null,
    actionMessage: "Approved by HR",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    campaignCode: "CMP-008",
    campaignName: "Marketing Officer Hiring",
    recruitmentPlan: "Hiring 2 Marketing Officers for remote/Dhaka",
    recruitmentChannel: "LinkedIn, Job Boards, Referrals",
    position: "Marketing Officer",
    company: "Best Electronics LTD",
    recruitedQuantity: "2",
    workingFrom: "2025-09-05",
    department: "Marketing",
    workplace: "Remote/Dhaka",
    startingSalaryFrom: "30000",
    startingSalaryTo: "42000",
    fromDate: "2025-09-05",
    toDate: "2025-09-25",
    reason: "Expanding marketing campaigns",
    jobDescription: "Plan and execute digital marketing campaigns.",
    managers: "Mr. Tanvir (Marketing Director)",
    followers: "3",
    metaTitle: "Marketing Officer Jobs - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as Marketing Officer. Drive campaigns and brand growth.",
    ageFrom: "24",
    ageTo: "34",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor in Marketing",
    seniority: "Mid-level",
    attachment: "JD_Marketing.pdf",
    status: "Draft",
    createdAt: "2025-08-14",
    updatedAt: "2025-08-22",
    draftedAt: "2025-08-20",
    actionMessage: "Waiting for CEO approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    campaignCode: "CMP-009",
    campaignName: "Finance Officer Hiring",
    recruitmentPlan: "Hiring 1 Finance Officer for Chittagong office",
    recruitmentChannel: "LinkedIn, Job Boards, Referrals",
    position: "Finance Officer",
    company: "Best Electronics LTD",
    recruitedQuantity: "1",
    workingFrom: "2025-09-08",
    department: "Finance",
    workplace: "Chittagong Office",
    startingSalaryFrom: "40000",
    startingSalaryTo: "60000",
    fromDate: "2025-09-08",
    toDate: "2025-09-28",
    reason: "Team expansion",
    jobDescription: "Handle accounts and financial reporting.",
    managers: "Mr. Rahman (CFO)",
    followers: "1",
    metaTitle: "Finance Officer Jobs - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as Finance Officer. Manage accounts and financial reporting.",
    ageFrom: "26",
    ageTo: "36",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor in Finance",
    seniority: "Mid-level",
    attachment: "JD_Finance.pdf",
    status: "Active",
    createdAt: "2025-08-13",
    updatedAt: "2025-08-21",
    draftedAt: null,
    actionMessage: "Final approval done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    campaignCode: "CMP-010",
    campaignName: "Support Staff Hiring",
    recruitmentPlan: "Hiring 4 customer support staff for Dhaka call center",
    recruitmentChannel: "Job Boards, Walk-ins",
    position: "Customer Support",
    company: "Best Electronics LTD",
    recruitedQuantity: "4",
    workingFrom: "2025-09-01",
    department: "Support",
    workplace: "Dhaka Call Center",
    startingSalaryFrom: "18000",
    startingSalaryTo: "25000",
    fromDate: "2025-09-01",
    toDate: "2025-09-15",
    reason: "Customer growth",
    jobDescription: "Provide customer service and resolve issues.",
    managers: "Mr. Hasan (Support Lead)",
    followers: "4",
    metaTitle: "Support Staff Jobs - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as Support Staff. Serve customers and maintain service quality.",
    ageFrom: "20",
    ageTo: "28",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "HSC/Graduate",
    seniority: "Entry-level",
    attachment: "JD_Support.pdf",
    status: "Active",
    createdAt: "2025-08-12",
    updatedAt: "2025-08-19",
    draftedAt: null,
    actionMessage: "Recruitment open",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    campaignCode: "CMP-011",
    campaignName: "Project Manager Hiring",
    recruitmentPlan: "Hiring 1 Project Manager for Dhaka HQ",
    recruitmentChannel: "LinkedIn, Referrals",
    position: "Project Manager",
    company: "Best Electronics LTD",
    recruitedQuantity: "1",
    workingFrom: "2025-09-12",
    department: "PMO",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "60000",
    startingSalaryTo: "80000",
    fromDate: "2025-09-12",
    toDate: "2025-10-12",
    reason: "Managing large projects",
    jobDescription: "Lead software development projects.",
    managers: "Mr. Karim (CEO)",
    followers: "1",
    metaTitle: "Project Manager Jobs - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as Project Manager. Lead software development projects effectively.",
    ageFrom: "30",
    ageTo: "40",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "MBA/Project Management",
    seniority: "Senior",
    attachment: "JD_PM.pdf",
    status: "Active",
    createdAt: "2025-08-11",
    updatedAt: "2025-08-18",
    draftedAt: null,
    actionMessage: "CEO Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    campaignCode: "CMP-012",
    campaignName: "DevOps Engineer Hiring",
    recruitmentPlan: "Hiring 1 DevOps Engineer for remote IT operations",
    recruitmentChannel: "LinkedIn, Job Boards",
    position: "DevOps Engineer",
    company: "Best Electronics LTD",
    recruitedQuantity: "1",
    workingFrom: "2025-09-18",
    department: "IT",
    workplace: "Remote",
    startingSalaryFrom: "50000",
    startingSalaryTo: "70000",
    fromDate: "2025-09-18",
    toDate: "2025-10-18",
    reason: "Infrastructure automation",
    jobDescription: "Manage CI/CD pipelines and cloud infrastructure.",
    managers: "Mr. Alam (CTO)",
    followers: "1",
    metaTitle: "DevOps Engineer Jobs - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as DevOps Engineer. Manage pipelines and cloud infrastructure.",
    ageFrom: "25",
    ageTo: "38",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor in CSE",
    seniority: "Mid-Senior",
    attachment: "JD_DevOps.pdf",
    status: "Active",
    createdAt: "2025-08-10",
    updatedAt: "2025-08-16",
    draftedAt: null,
    actionMessage: "In recruitment process",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    campaignCode: "CMP-012",
    campaignName: "DevOps Engineer Hiring",
    recruitmentPlan: "Hiring 1 DevOps Engineer for remote IT operations",
    recruitmentChannel: "LinkedIn, Job Boards",
    position: "DevOps Engineer",
    company: "Best Electronics LTD",
    recruitedQuantity: "1",
    workingFrom: "2025-09-18",
    department: "IT",
    workplace: "Remote",
    startingSalaryFrom: "50000",
    startingSalaryTo: "70000",
    fromDate: "2025-09-18",
    toDate: "2025-10-18",
    reason: "Infrastructure automation",
    jobDescription: "Manage CI/CD pipelines and cloud infrastructure.",
    managers: "Mr. Alam (CTO)",
    followers: "1",
    metaTitle: "DevOps Engineer Jobs - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as DevOps Engineer. Manage pipelines and cloud infrastructure.",
    ageFrom: "25",
    ageTo: "38",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor in CSE",
    seniority: "Mid-Senior",
    attachment: "JD_DevOps.pdf",
    status: "Active",
    createdAt: "2025-08-09",
    updatedAt: "2025-08-15",
    draftedAt: null,
    actionMessage: "Recruitment ongoing",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
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
  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);
  const canCreate = usePermission(detectedModule, "create");

  console.log("table view", location.pathname);

  const columnSchema: ColumnConfig[] = [
    { key: "campaignCode", title: "Campaign Code" },
    { key: "campaignName", title: "Campaign Name" },
    { key: "recruitmentPlan", title: "Recruitment Plan" },
    { key: "recruitmentChannel", title: "Recruitment Channel" },
    { key: "position", title: "Position" },
    { key: "company", title: "Company" },
    { key: "recruitedQuantity", title: "Recruited Quantity" },
    { key: "workingFrom", title: "Working From" },
    { key: "department", title: "Department" },
    { key: "workplace", title: "Workplace" },
    { key: "startingSalaryFrom", title: "Starting Salary From" },
    { key: "startingSalaryTo", title: "Starting Salary To" },
    { key: "fromDate", title: "From Date" },
    { key: "toDate", title: "To Date" },
    { key: "reason", title: "Reason" },
    { key: "jobDescription", title: "Job Description" },
    { key: "managers", title: "Managers" },
    { key: "followers", title: "Followers" },
    { key: "metaTitle", title: "Meta Title" },
    { key: "metaDescription", title: "Meta Description" },
    { key: "ageFrom", title: "Age From" },
    { key: "ageTo", title: "Age To" },
    { key: "gender", title: "Gender" },
    { key: "height", title: "Height" },
    { key: "weight", title: "Weight" },
    { key: "literacy", title: "Literacy" },
    { key: "seniority", title: "Seniority" },
    // same for all module so you dont have to change this part
    { key: "createdAt", title: "Created", type: "date", readOnly: true },
    { key: "updatedAt", title: "Updated", type: "date", readOnly: true },
    { key: "draftedAt", title: "Drafted", type: "date", readOnly: true },
  ];

  const componentColumns = columnSchema.map((schema) =>
    buildColumn(schema, MOCK_TABLE_DATA, canCreate)
  );

  const filteredData = MOCK_TABLE_DATA.filter((leave) => {
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
      fixedColumns={fixedColumns}
      pathName={location.pathname.split("/")[1]}
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}

type ColumnConfig = {
  key: string;
  title: string;
  type?: "string" | "number" | "date"; // to handle sorting/filtering differently
  size?: number;
  minSize?: number;
  readOnly?: boolean;
};

const buildColumn = (config: ColumnConfig, data: any[], canCreate: boolean) => {
  const {
    key,
    title,
    type = "string",
    size = 200,
    minSize = 150,
    readOnly,
  } = config;

  // Unique options for dropdown filter
  const options =
    type === "date"
      ? []
      : [...new Set(data.map((item) => item[key]).filter(Boolean))];

  // Filtering logic
  const filterFn = (row: any, columnId: string, filterValue: any) => {
    if (!filterValue || filterValue.length === 0) return true;
    const cellValue = row.getValue(columnId);

    if (type === "date") {
      if (!cellValue) return false;
      const formatted = new Date(cellValue).toISOString().split("T")[0];
      return filterValue.includes(formatted);
    }

    return filterValue.some((fv: string) =>
      String(cellValue).toLowerCase().includes(fv.toLowerCase())
    );
  };

  // Sorting logic
  const sortingFn =
    type === "date"
      ? (row1: any, row2: any) =>
          new Date(row1.getValue(key)).getTime() -
          new Date(row2.getValue(key)).getTime()
      : (row1: any, row2: any) =>
          String(row1.getValue(key)).localeCompare(String(row2.getValue(key)));

  return {
    accessorKey: key,
    title,
    options,
    filterFn,
    sortingFn,
    size,
    minSize,
    meta: {
      exportLabel: key,
      readOnly: readOnly ?? !canCreate,
    },
  };
};
