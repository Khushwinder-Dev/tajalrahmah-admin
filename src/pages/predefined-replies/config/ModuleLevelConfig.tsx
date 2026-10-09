import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  replyName: string;
  body: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  replyName: "",
  body: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = ["replyName", "body"];

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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["replyName"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "replyName", title: "Reply Name" },
  { key: "body", title: "Body" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    replyName: "Welcome Message",
    body: "Hello! Thanks for reaching out. How can I assist you today?",
    status: "Active",
    createdAt: "2025-08-01T10:15:00Z",
    updatedAt: "2025-08-05T12:30:00Z",
    draftedAt: null,
    actionMessage: "Message published successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    replyName: "Follow-up Reminder",
    body: "Just checking in to see if you had a chance to review my last message.",
    status: "Draft",
    createdAt: "2025-07-20T09:00:00Z",
    updatedAt: "2025-07-22T11:00:00Z",
    draftedAt: "2025-07-21T10:00:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    replyName: "Meeting Confirmation",
    body: "Your meeting has been scheduled for tomorrow at 3 PM.",
    status: "Updated",
    createdAt: "2025-07-15T08:30:00Z",
    updatedAt: "2025-08-01T10:20:00Z",
    draftedAt: null,
    actionMessage: "Updated with new time",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    replyName: "Account Deletion",
    body: "Your account has been successfully deleted. We’re sorry to see you go.",
    status: "Deleted",
    createdAt: "2025-06-10T12:00:00Z",
    updatedAt: "2025-06-15T14:10:00Z",
    draftedAt: null,
    actionMessage: "Message archived",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    replyName: "Payment Received",
    body: "We’ve received your payment. Thank you for your purchase!",
    status: "Active",
    createdAt: "2025-08-03T09:45:00Z",
    updatedAt: "2025-08-06T16:20:00Z",
    draftedAt: null,
    actionMessage: "Payment confirmation sent",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    replyName: "Support Ticket",
    body: "We’ve created a support ticket for your request. Our team will get back soon.",
    status: "Active",
    createdAt: "2025-06-28T11:00:00Z",
    updatedAt: "2025-07-02T13:30:00Z",
    draftedAt: null,
    actionMessage: "Support message live",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    replyName: "Discount Offer",
    body: "Enjoy 20% off on your next purchase! Use code SAVE20.",
    status: "Draft",
    createdAt: "2025-07-12T07:15:00Z",
    updatedAt: "2025-07-13T08:30:00Z",
    draftedAt: "2025-07-12T09:00:00Z",
    actionMessage: "Draft saved for campaign",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    replyName: "Profile Update",
    body: "Your profile has been successfully updated.",
    status: "Updated",
    createdAt: "2025-07-25T14:20:00Z",
    updatedAt: "2025-08-04T17:00:00Z",
    draftedAt: null,
    actionMessage: "Updated with new fields",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    replyName: "Project Assigned",
    body: "You have been assigned to the new project. Please check your dashboard.",
    status: "Active",
    createdAt: "2025-07-08T10:00:00Z",
    updatedAt: "2025-07-12T12:15:00Z",
    draftedAt: null,
    actionMessage: "Project notification sent",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    replyName: "Task Completed",
    body: "Congratulations! You’ve completed all your tasks for today.",
    status: "Deleted",
    createdAt: "2025-06-18T09:00:00Z",
    updatedAt: "2025-06-22T11:30:00Z",
    draftedAt: null,
    actionMessage: "Message removed",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "11",
    replyName: "Invoice Sent",
    body: "Your invoice has been sent to your registered email address.",
    status: "Active",
    createdAt: "2025-08-02T08:00:00Z",
    updatedAt: "2025-08-06T10:45:00Z",
    draftedAt: null,
    actionMessage: "Invoice message live",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    replyName: "Support Closed",
    body: "Your support request has been resolved and marked as closed.",
    status: "Updated",
    createdAt: "2025-07-30T11:30:00Z",
    updatedAt: "2025-08-05T15:00:00Z",
    draftedAt: null,
    actionMessage: "Ticket closure update",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
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
  replyName: "Boss Laddu Khan",
  body: "This is Body Text",

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
    name: "replyName",
    label: "Reply Name",
    component: "input",
    nextFocus: "body",
    tooltip: "Enter name",
    required: true,
  },

  {
    name: "body",
    type: "text",
    label: "Body",
    component: "input",
    nextFocus: "isDefault",
    tooltip: "Enter body",
    required: true,
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  replyName: "Reply Name",
  body: "Body",
};
