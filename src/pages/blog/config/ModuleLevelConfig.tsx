import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  issueDate: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;

  attachment: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  issueDate: "",
  title: "",
  titleAr: "",
  description: "",
  descriptionAr: "",
  attachment: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "issueDate",
  "title",
  "titleAr",
  "description",
  "descriptionAr",
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
  "issueDate",
  "title",
];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "issueDate", title: "Issue Date" },
  { key: "title", title: "Title" },
  { key: "titleAr", title: "Title (Ar)" },
  { key: "description", title: "Description" },
  { key: "descriptionAr", title: "Description (Ar)" },
  { key: "attachment", title: "Attachment" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    issueDate: "2025-08-20",
    title: "Frontend Hiring Plan",
    titleAr: "خطة توظيف الواجهة الأمامية",
    description: "Frontend team expansion for new product lines.",
    descriptionAr: "توسيع فريق الواجهة الأمامية للمنتجات الجديدة.",
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
    issueDate: "2025-08-21",
    title: "Backend Hiring Plan",
    titleAr: "خطة توظيف الخلفية",
    description: "Backend team expansion to support scaling APIs.",
    descriptionAr: "توسيع فريق الخلفية لدعم توسيع واجهات برمجة التطبيقات.",
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
    issueDate: "2025-08-22",
    title: "QA Expansion Plan",
    titleAr: "خطة توسيع ضمان الجودة",
    description: "Hiring QA engineers to support increased product releases.",
    descriptionAr: "توظيف مهندسي ضمان الجودة لدعم زيادة إصدارات المنتجات.",
    attachment: "qa-plan.pdf",
    status: "Active",
    createdAt: "2025-08-22",
    updatedAt: "2025-08-26",
    draftedAt: null,
    actionMessage: "Recruitment started",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    issueDate: "2025-08-23",
    title: "UI/UX Designer Plan",
    titleAr: "خطة مصمم واجهة المستخدم وتجربة المستخدم",
    description: "Hiring designers for upcoming product launches.",
    descriptionAr: "توظيف المصممين لإطلاق المنتجات القادمة.",
    attachment: "ux-plan.pdf",
    status: "Active",
    createdAt: "2025-08-23",
    updatedAt: "2025-08-27",
    draftedAt: null,
    actionMessage: "Approved by Design Head",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    issueDate: "2025-08-24",
    title: "Data Analyst Hiring Plan",
    titleAr: "خطة توظيف محلل بيانات",
    description: "Recruiting analysts to strengthen data-driven strategy.",
    descriptionAr: "توظيف محللين لتعزيز الاستراتيجية المعتمدة على البيانات.",
    attachment: "data-analyst.pdf",
    status: "Active",
    createdAt: "2025-08-24",
    updatedAt: "2025-08-28",
    draftedAt: null,
    actionMessage: "In progress",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    issueDate: "2025-08-25",
    title: "HR Executive Plan",
    titleAr: "خطة توظيف مسؤول الموارد البشرية",
    description: "Hiring HR executive to support employee relations.",
    descriptionAr: "توظيف مسؤول موارد بشرية لدعم علاقات الموظفين.",
    attachment: "hr-plan.pdf",
    status: "Active",
    createdAt: "2025-08-25",
    updatedAt: "2025-08-29",
    draftedAt: null,
    actionMessage: "Approved by HR",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    issueDate: "2025-08-26",
    title: "Marketing Officer Plan",
    titleAr: "خطة توظيف مسؤول تسويق",
    description: "Expanding marketing team for digital campaigns.",
    descriptionAr: "توسيع فريق التسويق للحملات الرقمية.",
    attachment: "marketing-plan.pdf",
    status: "Draft",
    createdAt: "2025-08-26",
    updatedAt: "2025-08-29",
    draftedAt: "2025-08-27",
    actionMessage: "Waiting for CEO approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    issueDate: "2025-08-27",
    title: "Finance Officer Plan",
    titleAr: "خطة توظيف موظف مالي",
    description: "Hiring finance officer to manage company accounts.",
    descriptionAr: "توظيف موظف مالي لإدارة حسابات الشركة.",
    attachment: "finance-plan.pdf",
    status: "Active",
    createdAt: "2025-08-27",
    updatedAt: "2025-08-30",
    draftedAt: null,
    actionMessage: "Final approval done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    issueDate: "2025-08-28",
    title: "Support Staff Recruitment",
    titleAr: "توظيف موظفي الدعم",
    description: "Recruiting customer support staff for call center.",
    descriptionAr: "توظيف موظفي دعم العملاء لمركز الاتصال.",
    attachment: "support-plan.pdf",
    status: "Active",
    createdAt: "2025-08-28",
    updatedAt: "2025-08-31",
    draftedAt: null,
    actionMessage: "Recruitment open",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    issueDate: "2025-08-29",
    title: "Project Manager Plan",
    titleAr: "خطة توظيف مدير مشروع",
    description: "Hiring project manager to oversee client projects.",
    descriptionAr: "توظيف مدير مشروع للإشراف على مشاريع العملاء.",
    attachment: "pm-plan.pdf",
    status: "Active",
    createdAt: "2025-08-29",
    updatedAt: "2025-09-01",
    draftedAt: null,
    actionMessage: "CEO Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    issueDate: "2025-08-30",
    title: "DevOps Engineer Plan",
    titleAr: "خطة توظيف مهندس ديف أوبس",
    description: "Recruiting DevOps engineer for infrastructure automation.",
    descriptionAr: "توظيف مهندس ديف أوبس لأتمتة البنية التحتية.",
    attachment: "devops.pdf",
    status: "Active",
    createdAt: "2025-08-30",
    updatedAt: "2025-09-02",
    draftedAt: null,
    actionMessage: "In recruitment process",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    issueDate: "2025-08-31",
    title: "Content Writer Recruitment",
    titleAr: "توظيف كاتب محتوى",
    description: "Hiring writers to support blog and marketing efforts.",
    descriptionAr: "توظيف كتاب لدعم المدونات وجهود التسويق.",
    attachment: "writer.pdf",
    status: "Active",
    createdAt: "2025-08-31",
    updatedAt: "2025-09-03",
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
  component: "autocomplete" | "input" | "mutiselect" | "textarea";
  placeholder?: string;
  options?: string[];
  nextFocus?: string;
  tooltip?: string;
  required?: boolean;
};

export const initialDataWithValue: ModuleCreateEditPageTypes = {
  issueDate: new Date().toISOString().slice(0, 10),
  title: "Frontend Developer",
  titleAr: "Frontend Developer",
  description: "Frontend team expansion for new product lines.",
  descriptionAr: "Frontend team expansion for new product lines.",
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
    name: "issueDate",
    label: "Issue Date",
    component: "input",
    nextFocus: "title",
    tooltip: "Enter Date",
    type: "date",
    required: true,
  },
  {
    name: "title",
    label: "Title",
    component: "input",
    nextFocus: "titleAr",
    tooltip: "Enter title",
    required: true,
  },
  {
    name: "titleAr",
    label: "Title (Ar)",
    component: "input",
    nextFocus: "description",
    tooltip: "Enter title (Ar)",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    component: "textarea",
    nextFocus: "descriptionAr",
    tooltip: "Enter description",
    required: true,
  },
  {
    name: "descriptionAr",
    label: "Description (Ar)",
    component: "textarea",
    nextFocus: "attachment",
    tooltip: "Enter description (Ar)",
    required: true,
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
  issueDate: "Issue Date",
  title: "Title",
  titleAr: "Title Ar",
  description: "Description",
  descriptionAr: "Description Ar",
  attachment: "Attachment",
};
