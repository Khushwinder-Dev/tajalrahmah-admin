import type { TableViewDataTableColumnConfig } from "../ComponentLevelDataTableView";

/*
======================================
Set your module all field types here
======================================
*/
export type ModuleFieldsType = {
  slNo: string;
  admissionId: string;
  patientId: string;
  billDate: string;
  patientName: string;
  dateOfBirth: string;
  address: string;
  sex: string;
  doctorName: string;
  image: string;
  admissionDate: string;
  packageName: string;
  totalDays: string;
  dischargeDate: string;
  insuranceName: string;
  policyNo: string;
  serviceName: string;
  quantity: string;
  rate: string;
  subTotal: string;
  paymentMethod: string;
  cardChequeNo: string;
  receiptNo: string;
  assignDate: string;
  bedNumber: string;
  amount: string;
  notes: string;
};

/*
  ============================
  initial Properties for permission and form: edit and create page
  ============================
*/

export const initialProperties: ModuleFieldsType = {
  slNo: "",
  admissionId: "",
  patientId: "",
  billDate: "",
  patientName: "",
  dateOfBirth: "",
  address: "",
  sex: "",
  doctorName: "",
  image: "",
  admissionDate: "",
  packageName: "",
  totalDays: "",
  dischargeDate: "",
  insuranceName: "",
  policyNo: "",
  serviceName: "",
  quantity: "",
  rate: "",
  subTotal: "",
  paymentMethod: "",
  cardChequeNo: "",
  receiptNo: "",
  assignDate: "",
  bedNumber: "",
  amount: "",
  notes: "",
};

/*
======================================
Grid View Config
======================================
*/

// Add properties to this array to make them searchable

export const searchableKeys: (keyof ModuleFieldsType)[] = [
  "admissionId",
  "patientId",
  "patientName",
  "billDate",
  "doctorName",
  "packageName",
  "serviceName",
  "receiptNo",
  "paymentMethod",
  "bedNumber",
];

/*
======================================
Data Table View Config
======================================
*/

// Data table view data type
export type TableViewDataType = ModuleFieldsType & {
  id: string;
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
export const fixedColumnsValues: (keyof ModuleFieldsType)[] = ["slNo"];

// column key and title for data table view
export const tableViewColumnSchema: TableViewDataTableColumnConfig[] = [
  { key: "slNo", title: "SL.NO" },
  { key: "admissionId", title: "Admission ID" },
  { key: "patientId", title: "Patient ID" },
  { key: "billDate", title: "Bill Date" },
  { key: "patientName", title: "Patient Name" },
  { key: "dateOfBirth", title: "Date of Birth" },
  { key: "address", title: "Address" },
  { key: "sex", title: "Sex" },
  { key: "doctorName", title: "Doctor Name" },
  { key: "image", title: "Image" },
  { key: "admissionDate", title: "Admission Date" },
  { key: "packageName", title: "Package Name" },
  { key: "totalDays", title: "Total Days" },
  { key: "dischargeDate", title: "Discharge Date" },
  { key: "insuranceName", title: "Insurance Name" },
  { key: "policyNo", title: "Policy No." },
  { key: "serviceName", title: "Service Name" },
  { key: "quantity", title: "Quantity" },
  { key: "rate", title: "Rate" },
  { key: "subTotal", title: "Sub Total" },
  { key: "paymentMethod", title: "Payment Method" },
  { key: "cardChequeNo", title: "Card / Cheque No." },
  { key: "receiptNo", title: "Receipt No" },
  { key: "assignDate", title: "Assign Date" },
  { key: "bedNumber", title: "Bed Number" },
  { key: "amount", title: "Amount" },
  { key: "notes", title: "Notes" },
];

// dont change variable name "MOCK_TABLE_DATA"
export const MOCK_TABLE_DATA: TableViewDataType[] = [
  {
    id: "1",
    slNo: "1",
    admissionId: "ADM001",
    patientId: "P001",
    billDate: "2025-01-15",
    patientName: "John Smith",
    dateOfBirth: "1985-03-20",
    address: "123 Main St, City",
    sex: "Male",
    doctorName: "Dr. Wilson",
    image: "patient1.jpg",
    admissionDate: "2025-01-10",
    packageName: "Basic Care Package",
    totalDays: "5",
    dischargeDate: "2025-01-15",
    insuranceName: "Health Plus Insurance",
    policyNo: "HP12345",
    serviceName: "Room Charges",
    quantity: "5",
    rate: "200.00",
    subTotal: "1000.00",
    paymentMethod: "Credit Card",
    cardChequeNo: "****1234",
    receiptNo: "RCP001",
    assignDate: "2025-01-10",
    bedNumber: "B101",
    amount: "1500.00",
    notes: "Regular monitoring required",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
    draftedAt: null,
    actionMessage: "Bill generated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    slNo: "2",
    admissionId: "ADM002",
    patientId: "P002",
    billDate: "2025-01-16",
    patientName: "Sarah Johnson",
    dateOfBirth: "1990-07-15",
    address: "456 Oak Ave, Town",
    sex: "Female",
    doctorName: "Dr. Brown",
    image: "patient2.jpg",
    admissionDate: "2025-01-12",
    packageName: "Premium Care Package",
    totalDays: "4",
    dischargeDate: "2025-01-16",
    insuranceName: "MediCare Pro",
    policyNo: "MP67890",
    serviceName: "Surgery",
    quantity: "1",
    rate: "5000.00",
    subTotal: "5000.00",
    paymentMethod: "Insurance",
    cardChequeNo: "INS-2025-001",
    receiptNo: "RCP002",
    assignDate: "2025-01-12",
    bedNumber: "B205",
    amount: "6200.00",
    notes: "Post-surgery care completed",
    createdAt: "2025-01-16",
    updatedAt: "2025-01-16",
    draftedAt: null,
    actionMessage: "Payment processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    slNo: "3",
    admissionId: "ADM003",
    patientId: "P003",
    billDate: "2025-01-17",
    patientName: "Michael Davis",
    dateOfBirth: "1978-11-30",
    address: "789 Pine St, Village",
    sex: "Male",
    doctorName: "Dr. Taylor",
    image: "patient3.jpg",
    admissionDate: "2025-01-14",
    packageName: "Emergency Package",
    totalDays: "3",
    dischargeDate: "2025-01-17",
    insuranceName: "Life Guard Insurance",
    policyNo: "LG11111",
    serviceName: "Emergency Treatment",
    quantity: "3",
    rate: "800.00",
    subTotal: "2400.00",
    paymentMethod: "Cash",
    cardChequeNo: "CASH",
    receiptNo: "RCP003",
    assignDate: "2025-01-14",
    bedNumber: "B301",
    amount: "2800.00",
    notes: "Emergency treatment successful",
    createdAt: "2025-01-17",
    updatedAt: "2025-01-17",
    draftedAt: null,
    actionMessage: "Discharge completed",
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
  slNo: "1",
  admissionId: "ADM001",
  patientId: "P001",
  billDate: "2025-01-15",
  patientName: "John Smith",
  dateOfBirth: "1985-03-20",
  address: "123 Main St, City",
  sex: "Male",
  doctorName: "Dr. Wilson",
  image: "patient1.jpg",
  admissionDate: "2025-01-10",
  packageName: "Basic Care Package",
  totalDays: "5",
  dischargeDate: "2025-01-15",
  insuranceName: "Health Plus Insurance",
  policyNo: "HP12345",
  serviceName: "Room Charges",
  quantity: "5",
  rate: "200.00",
  subTotal: "1000.00",
  paymentMethod: "Credit Card",
  cardChequeNo: "****1234",
  receiptNo: "RCP001",
  assignDate: "2025-01-10",
  bedNumber: "B101",
  amount: "1500.00",
  notes: "Regular monitoring required",

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
    name: "slNo",
    label: "SL.NO",
    component: "input",
    nextFocus: "admissionId",
    tooltip: "Enter serial number",
    required: true,
  },
  {
    name: "admissionId",
    label: "Admission ID",
    component: "input",
    nextFocus: "patientId",
    tooltip: "Enter admission ID",
    required: true,
  },
  {
    name: "patientId",
    label: "Patient ID",
    component: "input",
    nextFocus: "billDate",
    tooltip: "Enter patient ID",
    required: true,
  },
  {
    name: "billDate",
    label: "Bill Date",
    component: "input",
    type: "date",
    nextFocus: "patientName",
    tooltip: "Enter bill date",
    required: true,
  },
  {
    name: "patientName",
    label: "Patient Name",
    component: "input",
    nextFocus: "dateOfBirth",
    tooltip: "Enter patient name",
    required: true,
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    component: "input",
    type: "date",
    nextFocus: "address",
    tooltip: "Enter date of birth",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    component: "input",
    nextFocus: "sex",
    tooltip: "Enter patient address",
    required: true,
  },
  {
    name: "sex",
    label: "Sex",
    component: "autocomplete",
    options: ["Male", "Female", "Other"],
    nextFocus: "doctorName",
    tooltip: "Select patient sex",
    required: true,
  },
  {
    name: "doctorName",
    label: "Doctor Name",
    component: "input",
    nextFocus: "admissionDate",
    tooltip: "Enter doctor name",
    required: true,
  },
  {
    name: "admissionDate",
    label: "Admission Date",
    component: "input",
    type: "date",
    nextFocus: "packageName",
    tooltip: "Enter admission date",
    required: true,
  },
  {
    name: "packageName",
    label: "Package Name",
    component: "autocomplete",
    options: [
      "Basic Care Package",
      "Premium Care Package",
      "Emergency Package",
      "Surgery Package",
    ],
    nextFocus: "totalDays",
    tooltip: "Select package name",
    required: true,
  },
  {
    name: "totalDays",
    label: "Total Days",
    component: "input",
    type: "number",
    nextFocus: "dischargeDate",
    tooltip: "Enter total days",
    required: true,
  },
  {
    name: "dischargeDate",
    label: "Discharge Date",
    component: "input",
    type: "date",
    nextFocus: "insuranceName",
    tooltip: "Enter discharge date",
    required: true,
  },
  {
    name: "insuranceName",
    label: "Insurance Name",
    component: "input",
    nextFocus: "policyNo",
    tooltip: "Enter insurance name",
  },
  {
    name: "policyNo",
    label: "Policy No.",
    component: "input",
    nextFocus: "serviceName",
    tooltip: "Enter policy number",
  },
  {
    name: "serviceName",
    label: "Service Name",
    component: "input",
    nextFocus: "quantity",
    tooltip: "Enter service name",
    required: true,
  },
  {
    name: "quantity",
    label: "Quantity",
    component: "input",
    type: "number",
    nextFocus: "rate",
    tooltip: "Enter quantity",
    required: true,
  },
  {
    name: "rate",
    label: "Rate",
    component: "input",
    type: "number",
    nextFocus: "subTotal",
    tooltip: "Enter rate",
    required: true,
  },
  {
    name: "subTotal",
    label: "Sub Total",
    component: "input",
    type: "number",
    nextFocus: "paymentMethod",
    tooltip: "Enter sub total",
    required: true,
  },
  {
    name: "paymentMethod",
    label: "Payment Method",
    component: "autocomplete",
    options: ["Cash", "Credit Card", "Debit Card", "Insurance", "Cheque"],
    nextFocus: "cardChequeNo",
    tooltip: "Select payment method",
    required: true,
  },
  {
    name: "cardChequeNo",
    label: "Card / Cheque No.",
    component: "input",
    nextFocus: "receiptNo",
    tooltip: "Enter card or cheque number",
  },
  {
    name: "receiptNo",
    label: "Receipt No",
    component: "input",
    nextFocus: "assignDate",
    tooltip: "Enter receipt number",
    required: true,
  },
  {
    name: "assignDate",
    label: "Assign Date",
    component: "input",
    type: "date",
    nextFocus: "bedNumber",
    tooltip: "Enter assign date",
    required: true,
  },
  {
    name: "bedNumber",
    label: "Bed Number",
    component: "input",
    nextFocus: "amount",
    tooltip: "Enter bed number",
    required: true,
  },
  {
    name: "amount",
    label: "Amount",
    component: "input",
    type: "number",
    nextFocus: "notes",
    tooltip: "Enter total amount",
    required: true,
  },
  {
    name: "notes",
    label: "Notes",
    component: "input",
    tooltip: "Enter additional notes",
  },
];

/*
===============================
# PDF Config
===============================
*/

export const printConfigFieldLabels: ModuleFieldsType = {
  slNo: "SL.NO",
  admissionId: "Admission ID",
  patientId: "Patient ID",
  billDate: "Bill Date",
  patientName: "Patient Name",
  dateOfBirth: "Date of Birth",
  address: "Address",
  sex: "Sex",
  doctorName: "Doctor Name",
  image: "Image",
  admissionDate: "Admission Date",
  packageName: "Package Name",
  totalDays: "Total Days",
  dischargeDate: "Discharge Date",
  insuranceName: "Insurance Name",
  policyNo: "Policy No.",
  serviceName: "Service Name",
  quantity: "Quantity",
  rate: "Rate",
  subTotal: "Sub Total",
  paymentMethod: "Payment Method",
  cardChequeNo: "Card / Cheque No.",
  receiptNo: "Receipt No",
  assignDate: "Assign Date",
  bedNumber: "Bed Number",
  amount: "Amount",
  notes: "Notes",
};
