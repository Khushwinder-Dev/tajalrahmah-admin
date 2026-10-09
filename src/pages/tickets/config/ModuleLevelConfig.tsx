import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  subject: string;
  contact: string;
  email: string;
  department: string;
  cc: string;
  member: string;
  priority: string;
  service: string;
  tags: string;
  predefinedReply: string;
  description: string;
  attachment: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  subject: "",
  contact: "",
  email: "",
  department: "",
  cc: "",
  member: "",
  priority: "",
  service: "",
  tags: "",
  predefinedReply: "",
  description: "",
  attachment: "",
};

export const initialPropertiesForEdit: ModuleFieldsType = {
  subject: "Test Subject",
  contact: "Test Contact",
  email: "News letter find more.",
  department: "",
  cc: "",
  member: "",
  priority: "",
  service: "",
  tags: "",
  predefinedReply: "",
  description: "",
  attachment: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "subject",
  "contact",
  "email",
  "department",
  "cc",
  "member",
  "priority",
  "service",
  "tags",
  "predefinedReply",
  "description",
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["subject"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "subject", title: "Subject" },
  { key: "contact", title: "Contact" },
  { key: "email", title: "Email" },
  { key: "department", title: "Department" },
  { key: "cc", title: "CC" },
  { key: "member", title: "Member" },
  { key: "priority", title: "Priority" },
  { key: "service", title: "Service" },
  { key: "tags", title: "Tags" },
  { key: "predefinedReply", title: "Predefined Reply" },
  { key: "description", title: "Description" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    subject: "Website not loading",
    contact: "John Doe",
    email: "john.doe@example.com",
    department: "Technical Support",
    cc: "support.manager@example.com",
    member: "Jane Smith",
    priority: "High",
    service: "Web Hosting",
    tags: "website, urgent, bug",
    predefinedReply: "We have received your ticket and will respond shortly.",
    description:
      "The website is down since this morning. Please resolve it urgently.",
    attachment: "ticket-1.pdf",
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
    subject: "Email service issue",
    contact: "Alice Johnson",
    email: "alice.johnson@example.com",
    department: "Technical Support",
    cc: "support.lead@example.com",
    member: "Robert Brown",
    priority: "Medium",
    service: "Email Hosting",
    tags: "email, bug",
    predefinedReply: "Your issue has been logged. Our team will investigate.",
    description: "Unable to send emails since yesterday evening.",
    attachment: "ticket-2.pdf",
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
    subject: "QA Expansion Request",
    contact: "Michael Lee",
    email: "michael.lee@example.com",
    department: "Quality Assurance",
    cc: "qa.head@example.com",
    member: "Sophia Kim",
    priority: "High",
    service: "Recruitment",
    tags: "qa, recruitment",
    predefinedReply: "Your recruitment request has been acknowledged.",
    description: "Need to hire 3 QA engineers for automation testing.",
    attachment: "qa-expansion.pdf",
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
    subject: "UI/UX Designer Recruitment",
    contact: "Emma Watson",
    email: "emma.watson@example.com",
    department: "Design",
    cc: "design.manager@example.com",
    member: "Daniel Green",
    priority: "Medium",
    service: "Recruitment",
    tags: "ui, ux, design",
    predefinedReply: "Recruitment request received.",
    description: "Opening 1 position for UI/UX Designer in HQ.",
    attachment: "ux-designer.pdf",
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
    subject: "Data Analyst Hiring",
    contact: "William Scott",
    email: "william.scott@example.com",
    department: "Analytics",
    cc: "analytics.head@example.com",
    member: "Olivia White",
    priority: "High",
    service: "Recruitment",
    tags: "data, analytics",
    predefinedReply: "Data team hiring request noted.",
    description: "Need 2 data analysts for BI projects.",
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
    subject: "HR Executive Hiring",
    contact: "Sophia Brown",
    email: "sophia.brown@example.com",
    department: "HR",
    cc: "hr.head@example.com",
    member: "James Wilson",
    priority: "Low",
    service: "Recruitment",
    tags: "hr, hiring",
    predefinedReply: "HR hiring request submitted.",
    description: "Recruiting 1 HR Executive for Dhaka HQ.",
    attachment: "hr-executive.pdf",
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
    subject: "Marketing Officer Hiring",
    contact: "David Clark",
    email: "david.clark@example.com",
    department: "Marketing",
    cc: "marketing.director@example.com",
    member: "Amelia Harris",
    priority: "Medium",
    service: "Recruitment",
    tags: "marketing, hiring",
    predefinedReply: "Marketing recruitment request received.",
    description: "Hiring 2 Marketing Officers for remote/Dhaka.",
    attachment: "marketing-officer.pdf",
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
    subject: "Finance Officer Hiring",
    contact: "Lucas Miller",
    email: "lucas.miller@example.com",
    department: "Finance",
    cc: "finance.cfo@example.com",
    member: "Charlotte Taylor",
    priority: "High",
    service: "Recruitment",
    tags: "finance, hiring",
    predefinedReply: "Finance hiring request noted.",
    description: "Hiring 1 Finance Officer for Chittagong office.",
    attachment: "finance-officer.pdf",
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
    subject: "Customer Support Staff Recruitment",
    contact: "Benjamin Evans",
    email: "benjamin.evans@example.com",
    department: "Support",
    cc: "support.lead@example.com",
    member: "Mia Thompson",
    priority: "Low",
    service: "Recruitment",
    tags: "support, call center",
    predefinedReply: "Support staff recruitment request logged.",
    description: "Need 4 customer support agents for call center.",
    attachment: "support-staff.pdf",
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
    subject: "Project Manager Hiring",
    contact: "Ethan Walker",
    email: "ethan.walker@example.com",
    department: "PMO",
    cc: "ceo.office@example.com",
    member: "Isabella Moore",
    priority: "High",
    service: "Recruitment",
    tags: "project, manager",
    predefinedReply: "Project Manager recruitment request acknowledged.",
    description: "Hiring 1 Project Manager for Dhaka HQ.",
    attachment: "project-manager.pdf",
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
    subject: "DevOps Engineer Hiring",
    contact: "Oliver King",
    email: "oliver.king@example.com",
    department: "IT",
    cc: "cto.office@example.com",
    member: "Emily Lewis",
    priority: "High",
    service: "Recruitment",
    tags: "devops, engineer",
    predefinedReply: "DevOps recruitment request received.",
    description: "Hiring 1 DevOps Engineer for infrastructure automation.",
    attachment: "devops-engineer.pdf",
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
    subject: "Content Writer Hiring",
    contact: "Henry Baker",
    email: "henry.baker@example.com",
    department: "Marketing",
    cc: "marketing.head@example.com",
    member: "Grace Martinez",
    priority: "Low",
    service: "Recruitment",
    tags: "content, writer",
    predefinedReply: "Content writer recruitment request logged.",
    description: "Hiring 2 content writers for blog and copywriting.",
    attachment: "content-writer.pdf",
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

type optionType = {
  label: string;
  value: string;
};

// field config types
type FieldConfig = {
  name: StringKeys<ModuleFieldsType>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  component: "autocomplete" | "input" | "mutiselect";
  placeholder?: string;
  options?: optionType[];
  nextFocus?: string;
  tooltip?: string;
  required?: boolean;
};

export const initialDataWithValue: ModuleCreateEditPageTypes = {
  subject: "Email service issue",
  contact: "Alice Johnson",
  email: "alice.johnson@example.com",
  department: "Technical Support",
  cc: "support.lead@example.com",
  member: "Robert Brown",
  priority: "Medium",
  service: "Email Hosting",
  tags: "email, bug",
  predefinedReply: "Your issue has been logged. Our team will investigate.",
  description: "Unable to send emails since yesterday evening.",
  attachment: "https://thumbs.dreamstime.com/b/online-text-12658616.jpg",

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
    name: "subject",
    label: "Subject",
    component: "input",
    nextFocus: "contact",
    tooltip: "Enter subject",
    required: true,
  },
  {
    name: "contact",
    label: "Contact",
    component: "autocomplete",
    options: [
      { label: "Alice Johnson", value: "Alice Johnson" },
      { label: "Bob Smith", value: "Bob Smith" },
      { label: "Charlie Brown", value: "Charlie Brown" },
      { label: "David Lee", value: "David Lee" },
    ],
    placeholder: " ",
    nextFocus: "email",
    tooltip: "Select or enter contact",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    component: "input",
    nextFocus: "department",
    tooltip: "Enter email",
    required: true,
  },
  {
    name: "department",
    label: "Department",
    component: "mutiselect",
    options: [
      { label: "IT", value: "IT" },
      { label: "HR", value: "HR" },
      { label: "Marketing", value: "Marketing" },
      { label: "Sales", value: "Sales" },
      { label: "Finance", value: "Finance" },
      { label: "Admin", value: "Admin" },
    ],
    nextFocus: "cc",
    tooltip: "Enter department",
    required: true,
  },
  {
    name: "cc",
    label: "CC",
    component: "input",
    nextFocus: "member",
    tooltip: "Enter cc",
    required: true,
  },
  {
    name: "member",
    label: "Member",
    component: "autocomplete",
    options: [
      { label: "John Doe", value: "John Doe" },
      { label: "Jane Smith", value: "Jane Smith" },
      { label: "Bob Brown", value: "Bob Brown" },
      { label: "Sara Lee", value: "Sara Lee" },
    ],
    nextFocus: "priority",
    tooltip: "Enter member",
    required: true,
  },
  {
    name: "priority",
    label: "Priority",
    component: "mutiselect",
    options: [
      { label: "Low", value: "Low" },
      { label: "Medium", value: "Medium" },
      { label: "High", value: "High" },
    ],
    nextFocus: "service",
    tooltip: "Enter priority",
    required: true,
  },
  {
    name: "service",
    label: "Service",
    component: "mutiselect",
    options: [
      { label: "Email Hosting", value: "Email Hosting" },
      { label: "Web Hosting", value: "Web Hosting" },
      { label: "Domain Registration", value: "Domain Registration" },
    ],
    nextFocus: "tags",
    tooltip: "Enter service",
    required: true,
  },
  {
    name: "tags",
    label: "Tags",
    component: "mutiselect",
    options: [{ value: "email", label: "email" }],
    nextFocus: "predefinedReply",
    tooltip: "Enter tags",
    required: true,
  },
  {
    name: "predefinedReply",
    label: "Predefined Reply",
    component: "mutiselect",
    options: [
      {
        value:
          "Your issue has been logged. Our team will investigate. Your issue has been logged. Our team will investigate.",
        label:
          "Your issue has been logged. Our team will investigate. Your issue has been logged. Our team will investigate. Your issue has been logged. Our team will investigate. Your issue has been logged. Our team will investigate. Your issue has been logged. Our team will investigate. Your issue has been logged. Our team will investigate.",
      },
      {
        value:
          "We are currently working on your issue. It will be resolved soon.",
        label:
          "We are currently working on your issue. It will be resolved soon.",
      },
    ],
    tooltip: "Enter predefined reply",
  },
  {
    name: "description",
    label: "Description",
    component: "input",
    tooltip: "Enter description",
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  subject: "Subject",
  contact: "Contact",
  email: "Email",
  department: "Department",
  cc: "CC",
  member: "Member",
  priority: "Priority",
  service: "Service",
  tags: "Tags",
  predefinedReply: "Predefined Reply",
  description: "Description",
  attachment: "Attachment",
};
