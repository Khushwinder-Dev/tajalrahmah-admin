import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  planName: string;
  position: string;
  department: string;
  quantityToBeRecruited: string;
  workingForm: string;
  workplace: string;
  startingSalaryFrom: string;
  startingSalaryTo: string;
  fromDate: string;
  toDate: string;
  reason: string;
  jobDescription: string;

  approver: string;
  ageFrom: string;
  ageTo: string;
  gender: string;
  height: string;
  weight: string;
  literacy: string;
  seniority: string;

  attachment: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  planName: "",
  position: "",
  quantityToBeRecruited: "",
  workingForm: "",
  workplace: "",
  startingSalaryFrom: "",
  startingSalaryTo: "",
  fromDate: "",
  toDate: "",
  reason: "",
  jobDescription: "",
  approver: "",
  ageFrom: "",
  ageTo: "",
  gender: "",
  height: "",
  weight: "",
  literacy: "",
  seniority: "",
  attachment: "",
  department: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "planName",
  "position",
  "department",
  "quantityToBeRecruited",
  "workingForm",
  "workplace",
  "startingSalaryFrom",
  "startingSalaryTo",
  "fromDate",
  "toDate",
  "reason",
  "jobDescription",
  "approver",
  "ageFrom",
  "ageTo",
  "gender",
  "height",
  "weight",
  "literacy",
  "seniority",
];

/*
======================================
Data Table View Config
======================================
*/

// Data table view data type
export type TableViewDataType = ModuleFieldsType & {
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

// add value in array if you want to add fixed columns left side
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = [
  "planName",
  "position",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "planName", title: "Plan Name" },
  { key: "position", title: "Position" },
  { key: "quantityToBeRecruited", title: "Quantity" },
  { key: "workingForm", title: "Working Form" },
  { key: "workplace", title: "Workplace" },
  { key: "startingSalaryFrom", title: "Starting Salary From" },
  { key: "startingSalaryTo", title: "Starting Salary To" },
  { key: "fromDate", title: "From Date" },
  { key: "toDate", title: "To Date" },
  { key: "reason", title: "Reason" },
  { key: "jobDescription", title: "Job Description" },
  { key: "approver", title: "Approver" },
  { key: "ageFrom", title: "Age From" },
  { key: "ageTo", title: "Age To" },
  { key: "gender", title: "Gender" },
  { key: "height", title: "Height" },
  { key: "weight", title: "Weight" },
  { key: "literacy", title: "Literacy" },
  { key: "seniority", title: "Seniority" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    planName: "Frontend Recruitment Plan",
    position: "Frontend Developer",
    department: "IT",
    quantityToBeRecruited: "2",
    workingForm: "Full-time",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "35000",
    startingSalaryTo: "50000",
    fromDate: "2025-09-01",
    toDate: "2025-09-30",
    reason: "Expansion of product team",
    jobDescription: "Develop and maintain React/Next.js applications.",
    approver: "CTO",
    ageFrom: "22",
    ageTo: "32",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in CSE",
    seniority: "Junior-Mid",
    attachment: "jd-frontend.pdf",
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
    planName: "Backend Hiring Plan",
    position: "Node.js Developer",
    department: "Engineering",
    quantityToBeRecruited: "1",
    workingForm: "Full-time",
    workplace: "Remote",
    startingSalaryFrom: "40000",
    startingSalaryTo: "60000",
    fromDate: "2025-09-05",
    toDate: "2025-10-05",
    reason: "Backend team scaling",
    jobDescription: "Build and optimize APIs with Node.js.",
    approver: "Engineering Manager",
    ageFrom: "24",
    ageTo: "35",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in Software Engineering",
    seniority: "Mid",
    attachment: "jd-backend.pdf",
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
    planName: "QA Expansion Plan",
    position: "QA Engineer",
    department: "Quality Assurance",
    quantityToBeRecruited: "3",
    workingForm: "Full-time",
    workplace: "Chittagong Office",
    startingSalaryFrom: "25000",
    startingSalaryTo: "40000",
    fromDate: "2025-09-10",
    toDate: "2025-10-10",
    reason: "Increasing product releases",
    jobDescription: "Manual and automation testing of web apps.",
    approver: "QA Lead",
    ageFrom: "21",
    ageTo: "30",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor",
    seniority: "Entry",
    attachment: "qa-plan.pdf",
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
    planName: "UI/UX Designer Plan",
    position: "UI/UX Designer",
    department: "Design",
    quantityToBeRecruited: "1",
    workingForm: "Hybrid",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "30000",
    startingSalaryTo: "45000",
    fromDate: "2025-09-15",
    toDate: "2025-10-15",
    reason: "New product design team",
    jobDescription: "Design modern UI and improve user experience.",
    approver: "Design Head",
    ageFrom: "23",
    ageTo: "33",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in Design",
    seniority: "Mid",
    attachment: "ux-plan.pdf",
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
    planName: "Data Analyst Hiring Plan",
    position: "Data Analyst",
    department: "Analytics",
    quantityToBeRecruited: "2",
    workingForm: "Full-time",
    workplace: "Remote",
    startingSalaryFrom: "38000",
    startingSalaryTo: "55000",
    fromDate: "2025-09-20",
    toDate: "2025-10-20",
    reason: "Data-driven strategy",
    jobDescription: "Analyze data and prepare business insights.",
    approver: "Analytics Manager",
    ageFrom: "25",
    ageTo: "35",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in Statistics/Economics",
    seniority: "Mid",
    attachment: "data-analyst.pdf",
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
    planName: "HR Executive Plan",
    position: "HR Executive",
    department: "HR",
    quantityToBeRecruited: "1",
    workingForm: "Full-time",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "25000",
    startingSalaryTo: "35000",
    fromDate: "2025-09-01",
    toDate: "2025-09-30",
    reason: "Employee relations support",
    jobDescription: "Assist in recruitment, payroll and employee relations.",
    approver: "HR Manager",
    ageFrom: "23",
    ageTo: "30",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in HR",
    seniority: "Entry",
    attachment: "hr-plan.pdf",
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
    planName: "Marketing Officer Hiring Plan",
    position: "Marketing Officer",
    department: "Marketing",
    quantityToBeRecruited: "2",
    workingForm: "Full-time",
    workplace: "Remote/Dhaka",
    startingSalaryFrom: "30000",
    startingSalaryTo: "42000",
    fromDate: "2025-09-05",
    toDate: "2025-09-25",
    reason: "Expanding marketing campaigns",
    jobDescription: "Plan and execute digital marketing campaigns.",
    approver: "Marketing Director",
    ageFrom: "24",
    ageTo: "34",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in Marketing",
    seniority: "Mid",
    attachment: "marketing-plan.pdf",
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
    planName: "Finance Officer Plan",
    position: "Finance Officer",
    department: "Finance",
    quantityToBeRecruited: "1",
    workingForm: "Full-time",
    workplace: "Chittagong Office",
    startingSalaryFrom: "40000",
    startingSalaryTo: "60000",
    fromDate: "2025-09-08",
    toDate: "2025-09-28",
    reason: "Team expansion",
    jobDescription: "Handle accounts and financial reporting.",
    approver: "CFO",
    ageFrom: "26",
    ageTo: "36",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in Finance",
    seniority: "Mid",
    attachment: "finance-plan.pdf",
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
    planName: "Support Staff Recruitment",
    position: "Customer Support",
    department: "Support",
    quantityToBeRecruited: "4",
    workingForm: "Shift-based",
    workplace: "Dhaka Call Center",
    startingSalaryFrom: "18000",
    startingSalaryTo: "25000",
    fromDate: "2025-09-01",
    toDate: "2025-09-15",
    reason: "Customer growth",
    jobDescription: "Provide customer service and resolve issues.",
    approver: "Support Lead",
    ageFrom: "20",
    ageTo: "28",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "HSC/Graduate",
    seniority: "Entry",
    attachment: "support-plan.pdf",
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
    planName: "Project Manager Plan",
    position: "Project Manager",
    department: "PMO",
    quantityToBeRecruited: "1",
    workingForm: "Full-time",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "60000",
    startingSalaryTo: "80000",
    fromDate: "2025-09-12",
    toDate: "2025-10-12",
    reason: "Managing large projects",
    jobDescription: "Lead software development projects.",
    approver: "CEO",
    ageFrom: "30",
    ageTo: "40",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "MBA/Project Management",
    seniority: "Senior",
    attachment: "pm-plan.pdf",
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
    planName: "DevOps Engineer Hiring Plan",
    position: "DevOps Engineer",
    department: "IT",
    quantityToBeRecruited: "1",
    workingForm: "Full-time",
    workplace: "Remote",
    startingSalaryFrom: "50000",
    startingSalaryTo: "70000",
    fromDate: "2025-09-18",
    toDate: "2025-10-18",
    reason: "Infrastructure automation",
    jobDescription: "Manage CI/CD pipelines and cloud infra.",
    approver: "CTO",
    ageFrom: "25",
    ageTo: "38",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in CSE",
    seniority: "Mid-Senior",
    attachment: "devops.pdf",
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
    planName: "Content Writer Recruitment",
    position: "Content Writer",
    department: "Marketing",
    quantityToBeRecruited: "2",
    workingForm: "Remote",
    workplace: "Anywhere",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-22",
    toDate: "2025-10-05",
    reason: "Content strategy",
    jobDescription: "Write engaging blogs and marketing copy.",
    approver: "Marketing Head",
    ageFrom: "21",
    ageTo: "28",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in English/Marketing",
    seniority: "Entry",
    attachment: "writer.pdf",
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

/* 
==========================
# Create Page Config
==========================
*/

// create page types
export type ModuleCreateEditPageTypes = ModuleFieldsType & {
  isDefault: boolean;
  isDraft: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

// Utility to extract the keys of ModuleFieldsType whose values are strings
type StringKeys<T> = Extract<
  {
    [K in keyof T]-?: T[K] extends string ? K : never;
  }[keyof T],
  string
>;

// field config types
type FieldConfig = {
  name: StringKeys<ModuleFieldsType>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  component: "autocomplete" | "input" | "mutiselect";
  placeholder?: string;
  options?: string[];
  nextFocus?: string;
  tooltip?: string;
  required?: boolean;
};

export const initialDataWithValue: ModuleCreateEditPageTypes = {
  planName: "Software Engineer Hiring Plan",
  position: "Frontend Developer",
  department: "Engineering",
  quantityToBeRecruited: "3",
  workingForm: "Full-time",
  workplace: "Dhaka HQ",
  startingSalaryFrom: "50000",
  startingSalaryTo: "70000",
  fromDate: "2025-09-01",
  toDate: "2025-12-31",
  reason: "Expansion of product team",
  jobDescription: "Work on React and Next.js projects",
  approver: "CTO",
  ageFrom: "22",
  ageTo: "35",
  gender: "Any",
  height: "Any",
  weight: "Any",
  literacy: "Bachelor in CS",
  seniority: "Junior to Mid",
  attachment: "JD_Frontend.pdf",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

// add item for your nessasary fields
export const formFields: FieldConfig[] = [
  {
    name: "planName",
    label: "Plan Name",
    component: "input",
    nextFocus: "position",
    tooltip: "Enter plan name",
    required: true,
  },
  {
    name: "position",
    label: "Position",
    component: "autocomplete",
    options: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "Designer",
      "QA Engineer",
    ],
    placeholder: " ",
    nextFocus: "department",
    tooltip: "Select or enter position",
    required: true,
  },
  {
    name: "department",
    label: "Department",
    component: "autocomplete",
    options: ["IT", "HR", "Marketing", "Sales", "Finance", "Admin"],
    placeholder: " ",
    nextFocus: "quantityToBeRecruited",
    tooltip: "Select department",
    required: true,
  },
  {
    name: "quantityToBeRecruited",
    label: "Quantity to be recruited",
    component: "input",
    nextFocus: "workingForm",
    tooltip: "Enter quantity",
    required: true,
  },
  {
    name: "workingForm",
    label: "Working Form",
    component: "autocomplete",
    options: ["Full-time", "Part-time", "Contract", "Internship"],
    placeholder: " ",
    nextFocus: "workplace",
    tooltip: "Select working form",
    required: true,
  },
  {
    name: "workplace",
    label: "Workplace",
    component: "input",
    nextFocus: "startingSalaryFrom",
    tooltip: "Enter workplace location",
    required: true,
  },
  {
    name: "startingSalaryFrom",
    label: "Starting Salary From",
    component: "input",
    nextFocus: "startingSalaryTo",
    tooltip: "Enter starting salary range from",
    required: true,
  },
  {
    name: "startingSalaryTo",
    label: "Starting Salary To",
    component: "input",
    nextFocus: "fromDate",
    tooltip: "Enter starting salary range to",
    required: true,
  },
  {
    name: "fromDate",
    label: "From Date",
    component: "input",
    nextFocus: "toDate",
    tooltip: "Select start date",
    required: true,
  },
  {
    name: "toDate",
    label: "To Date",
    component: "input",
    nextFocus: "reason",
    tooltip: "Select end date",
    required: true,
  },
  {
    name: "reason",
    label: "Reason",
    component: "input",
    nextFocus: "jobDescription",
    tooltip: "Enter reason for recruitment",
    required: true,
  },
  {
    name: "jobDescription",
    label: "Job Description",
    component: "input",
    nextFocus: "approver",
    tooltip: "Enter job description",
    required: true,
  },
  {
    name: "approver",
    label: "Approver",
    component: "input",
    nextFocus: "ageFrom",
    tooltip: "Enter approver name",
    required: true,
  },
  {
    name: "ageFrom",
    label: "Age From",
    component: "input",
    nextFocus: "ageTo",
    tooltip: "Enter minimum age",
  },
  {
    name: "ageTo",
    label: "Age To",
    component: "input",
    nextFocus: "gender",
    tooltip: "Enter maximum age",
  },
  {
    name: "gender",
    label: "Gender",
    component: "autocomplete",
    options: ["Any", "Male", "Female", "Other"],
    placeholder: " ",
    nextFocus: "height",
    tooltip: "Select gender",
  },
  {
    name: "height",
    label: "Height",
    component: "input",
    nextFocus: "weight",
    tooltip: "Enter height",
  },
  {
    name: "weight",
    label: "Weight",
    component: "input",
    nextFocus: "literacy",
    tooltip: "Enter weight",
  },
  {
    name: "literacy",
    label: "Literacy",
    component: "autocomplete",
    options: ["High School", "Bachelor", "Master", "PhD"],
    placeholder: " ",
    nextFocus: "seniority",
    tooltip: "Select literacy",
  },
  {
    name: "seniority",
    label: "Seniority",
    component: "autocomplete",
    options: ["Entry", "Junior", "Mid", "Senior", "Lead"],
    placeholder: " ",
    nextFocus: "attachment",
    tooltip: "Select seniority",
  },
  {
    name: "attachment",
    label: "Attachment",
    component: "input",
    tooltip: "Upload attachment if any",
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  planName: "Plan Name",
  position: "Position",
  department: "Department",
  quantityToBeRecruited: "Quantity to be recruited",
  workingForm: "Working Form",
  workplace: "Workplace",
  startingSalaryFrom: "Starting Salary From",
  startingSalaryTo: "Starting Salary To",
  fromDate: "From Date",
  toDate: "To Date",
  reason: "Reason",
  jobDescription: "Job Description",
  approver: "Approver",
  ageFrom: "Age From",
  ageTo: "Age To",
  gender: "Gender",
  height: "Height",
  weight: "Weight",
  literacy: "Literacy",
  seniority: "Seniority",
  attachment: "Attachment",
};
