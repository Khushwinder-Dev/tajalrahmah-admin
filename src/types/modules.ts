/* eslint-disable @typescript-eslint/no-explicit-any */
// types/modules.ts
export interface ModuleData {
  [key: string]: any;
}

export interface MinimizedModule {
  id: string;
  name: string;
  data: ModuleData;
  component: string;
  minimizedAt: string;
  route: string; // Add route for navigation
}

export interface MinimizedModulesState {
  minimizedModules: MinimizedModule[];
  activeModule: string | null;
}

export type MinimizedModulesAction =
  | { type: "MINIMIZE_MODULE"; payload: Omit<MinimizedModule, "minimizedAt"> }
  | { type: "RESTORE_MODULE"; payload: { id: string } }
  | { type: "CLOSE_MINIMIZED"; payload: { id: string } };

export interface CountryFormData {
  code: string;
  title: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  flag: string | null;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  ISD: string;
  isDeleted: boolean;
}

export interface CategoryFormData {
  slNo: string;
  name: string;
  group: string;
  description: string;
  status: string;
  isDraft: boolean;
  isDefault: boolean;
  createdAt?: Date | null;
  draftedAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  isDeleted?: boolean;
}

interface OpeningStock {
  id: string;
  documentNumber: string;
  branch: string;
  poNumber: string;
  documentDate: string;
  remarks: string;
  amount: number;
  isActive: boolean;
  isDefault: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

export interface OpeningStockModuleData {
  formData: OpeningStock;
  hasChanges: boolean;
  scrollPosition?: number;
  isDraft: boolean;
  isDefault: boolean;
}

export interface SubCategoryFormData {
  slNo: string;
  groups: string;
  status: string;
  name: string;
  label: string;
  categories: string;
  description: string;
  type?: React.HTMLInputTypeAttribute;
  component: "autocomplete" | "input" | "mutiselect";
  placeholder?: string;
  options?: string[];
  nextFocus?: string;
  tooltip?: string;
  required?: boolean;
  isDraft?: boolean;
  isDefault?: boolean;
}

// types/modules.ts
export interface CustomerGroupModuleData {
  formData: any;
  hasChanges: boolean;
  scrollPosition: number;
  customerGroupLanguageValues: Record<string, string>;
}

// Invoice Module Data Interface
export interface InvoiceModuleData {
  id: string;
  documentNumber: string;
  poNumber: string;
  poDate: string;
  supplierName: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: string;
  supplierNumber: string;
  supplierStatus: string;
  supplierGroup: string;
  remarks: string;
  country: string;
  state: string;
  city: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
  // Module-specific metadata
  hasChanges: boolean;
  scrollPosition: number;
}

export interface CommonTypeModuleData {
  formData: any;
  hasChanges: boolean;
  scrollPosition: number;
  commonTypeLanguageValues: Record<string, string>;
}

export interface DocumentTypeModuleData {
  formData: any;
  hasChanges: boolean;
  scrollPosition: number;
  documentTypeLanguageValues: Record<string, string>;
}

export interface ExportMediaModuleData {
  formData: any;
  hasChanges: boolean;
  scrollPosition: number;
  exportMediaLanguageValues: Record<string, string>;
}

// Blog Module Data Interface
export interface BlogModuleData {
  formData: any; // Use your specific blog form type here
  hasChanges: boolean;
  scrollPosition: number;
  blogLanguageValues: Record<string, string>;
}

interface StockTransfer {
  id: string;
  documentNumber: string;
  sourceBranch: string;
  destinationBranch: string;
  poNumber: string;
  documentDate: Date | string;
  remarks: string;
  amount: number;
  isActive: boolean;
  isDefault: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

export interface StockTransferModuleData {
  formData: StockTransfer;
  hasChanges: boolean;
  scrollPosition?: number;
  isDraft: boolean;
  isDefault: boolean;
}

// Ticket Module Data Interface
export interface TicketModuleData {
  formData: any;
  hasChanges: boolean;
  scrollPosition: number;
  ticketLanguageValues: Record<string, string>;
}

// Purchase Return Module Data Interface
export interface PurchaseReturnModuleData {
  id: string;
  documentNumber: string;
  purchaseInvoiceNumber: string;
  poNumber: string;
  poDate: string;
  supplierName: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: string;
  supplierNumber: string;
  supplierStatus: string;
  supplierGroup: string;
  remarks: string;
  country: string;
  state: string;
  city: string;
  documents: string;
  expiryDate: string;
  image: string | null;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
  // Module-specific metadata
  hasChanges: boolean;
  scrollPosition: number;
}

// export interface InvoiceModuleData {
//   formData: Invoice;
//   hasChanges: boolean;
//   scrollPosition?: number;
//   isDraft: boolean;
//   isDefault: boolean;
// }

export interface LanguageFormData {
  id?: string;
  seq: number;
  code: string;
  language: string;
  default: boolean;
  status: "active" | "inactive";
  isDeleted: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  language_ar?: string;
  language_hi?: string;
  language_ur?: string;
  language_bn?: string;
}

export interface CountryModuleData extends ModuleData {
  formData: CountryFormData;
  hasChanges: boolean;
  scrollPosition?: number;
  countryLanguageValues?: Record<string, string>;
}

export interface TaskAssignModuleData extends ModuleData {
  formData: CountryFormData;
  hasChanges: boolean;
  scrollPosition?: number;
  countryLanguageValues?: Record<string, string>;
}

export interface LanguageModuleData extends ModuleData {
  formData: LanguageFormData;
  hasChanges: boolean;
  scrollPosition?: number;
  languageLanguageValues?: Record<string, string>;
}
