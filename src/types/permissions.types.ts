// types/permissions.ts

export interface FieldPermission {
  view: boolean;
  edit: boolean;
}

export interface FormPermissions {
  create: boolean;
  view: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
  import: boolean;
  [key: string]: boolean; // Allow additional form permissions
}

export interface FieldPermissions {
  [fieldName: string]: FieldPermission;
}

export interface ModulePermission {
  formPermissions: FormPermissions;
  fieldPermissions: FieldPermissions;
}

export interface UserPermissions {
  modules: {
    [moduleName: string]: ModulePermission;
  };
}

export interface User {
  userId: string;
  userRole: string;
  permissions: UserPermissions;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Type for permission checker functions
export interface PermissionCheckers {
  [key: string]: boolean;
}

// Specific types for countries module (example)
export interface CountriesPermissions {
  // Form permissions
  canCreate: boolean;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canImport: boolean;

  // Field permissions - View
  canViewCountryName: boolean;
  canViewCountryCode: boolean;
  canViewCallingCode: boolean;
  canViewFlag: boolean;
  canViewStatus: boolean;
  canViewCreatedDate: boolean;
  canViewLastUpdated: boolean;
  canViewCreatedBy: boolean;
  canViewNotes: boolean;

  // Field permissions - Edit
  canEditCountryName: boolean;
  canEditCountryCode: boolean;
  canEditCallingCode: boolean;
  canEditFlag: boolean;
  canEditStatus: boolean;
  canEditCreatedDate: boolean;
  canEditLastUpdated: boolean;
  canEditCreatedBy: boolean;
  canEditNotes: boolean;

  // Field permissions - create
  canCreateCountryName: boolean;
  canCreateCountryCode: boolean;
  canCreateCallingCode: boolean;
  canCreateFlag: boolean;
  canCreateStatus: boolean;
  canCreateCreatedDate: boolean;
  canCreateLastUpdated: boolean;
  canCreateCreatedBy: boolean;
  canCreateNotes: boolean;
}

// Specific types for users module
export interface UsersPermissions {
  // Form permissions
  canCreate: boolean;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canImport: boolean;

  // Field permissions - View
  canViewUserName: boolean;
  canViewStatus: boolean;
  canViewCreatedDate: boolean;
  canViewUpdatedDate: boolean;
  canViewDraftedDate: boolean;

  // Field permissions - Edit
  canEditUserName: boolean;
  canEditStatus: boolean;
  canEditCreatedDate: boolean;
  canEditUpdatedDate: boolean;
  canEditDraftedDate: boolean;

  // Field permissions - Create
  canCreateUserName: boolean;
  canCreateStatus: boolean;
  canCreateCreatedDate: boolean;
  canCreateUpdatedDate: boolean;
  canCreateDraftedDate: boolean;
}

export interface UserMasterPermissions {
  // Form permissions
  canCreate: boolean;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canImport: boolean;

  // Field permissions - View
  canViewUserName: boolean;
  canViewMobileNumber: boolean;
  canViewEmail: boolean;
  canViewUserType: boolean;
  canViewPassword: boolean;
  canViewConfirmPassword: boolean;
  canViewOtp: boolean;
  canViewFacebook: boolean;
  canViewLinkedin: boolean;
  canViewInstagram: boolean;
  canViewStatus: boolean;
  canViewCreatedDate: boolean;
  canViewUpdatedDate: boolean;
  canViewDraftedDate: boolean;

  // Field permissions - Edit
  canEditUserName: boolean;
  canEditMobileNumber: boolean;
  canEditEmail: boolean;
  canEditUserType: boolean;
  canEditPassword: boolean;
  canEditConfirmPassword: boolean;
  canEditOtp: boolean;
  canEditFacebook: boolean;
  canEditLinkedin: boolean;
  canEditInstagram: boolean;
  canEditStatus: boolean;
  canEditCreatedDate: boolean;
  canEditUpdatedDate: boolean;
  canEditDraftedDate: boolean;

  // Field permissions - Create
  canCreateUserName: boolean;
  canCreateMobileNumber: boolean;
  canCreateEmail: boolean;
  canCreateUserType: boolean;
  canCreatePassword: boolean;
  canCreateConfirmPassword: boolean;
  canCreateOtp: boolean;
  canCreateFacebook: boolean;
  canCreateLinkedin: boolean;
  canCreateInstagram: boolean;
  canCreateStatus: boolean;
  canCreateCreatedDate: boolean;
  canCreateUpdatedDate: boolean;
  canCreateDraftedDate: boolean;
}

// Specific types for colors module
export interface ColorsPermissions {
  // Form permissions
  canCreate: boolean;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canImport: boolean;

  // Field permissions - View
  canViewName: boolean;
  canViewCode: boolean;
  canViewDescription: boolean;
  canViewHexCode: boolean;
  canViewStatus: boolean;
  canViewCreatedDate: boolean;
  canViewUpdatedDate: boolean;
  canViewDraftedDate: boolean;

  // Field permissions - Edit
  canEditName: boolean;
  canEditCode: boolean;
  canEditDescription: boolean;
  canEditHexCode: boolean;
  canEditStatus: boolean;
  canEditCreatedDate: boolean;
  canEditUpdatedDate: boolean;
  canEditDraftedDate: boolean;

  // Field permissions - Create
  canCreateName: boolean;
  canCreateCode: boolean;
  canCreateDescription: boolean;
  canCreateHexCode: boolean;
  canCreateStatus: boolean;
  canCreateCreatedDate: boolean;
  canCreateUpdatedDate: boolean;
  canCreateDraftedDate: boolean;
}

// Specific types for lead-sources module
export interface LeadSourcesPermissions {
  // Form permissions
  canCreate: boolean;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canImport: boolean;

  // Field permissions - View
  canViewName: boolean;
  canViewStatus: boolean;
  canViewCreatedDate: boolean;
  canViewUpdatedDate: boolean;
  canViewDraftedDate: boolean;

  // Field permissions - Edit
  canEditName: boolean;
  canEditStatus: boolean;
  canEditCreatedDate: boolean;
  canEditUpdatedDate: boolean;
  canEditDraftedDate: boolean;

  // Field permissions - Create
  canCreateName: boolean;
  canCreateStatus: boolean;
  canCreateCreatedDate: boolean;
  canCreateUpdatedDate: boolean;
  canCreateDraftedDate: boolean;
}

// Specific types for expiry-items module
export interface ExpiryItemsPermissions {
  // Form permissions
  canCreate: boolean;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canImport: boolean;

  // Field permissions - View
  canViewItemName: boolean;
  canViewBatchNumber: boolean;
  canViewExpiryDate: boolean;
  canViewQuantity: boolean;
  canViewUnit: boolean;
  canViewLocation: boolean;
  canViewCategory: boolean;
  canViewSupplier: boolean;
  canViewStatus: boolean;
  canViewIsDefault: boolean;
  canViewCreatedDate: boolean;
  canViewUpdatedDate: boolean;
  canViewDraftedDate: boolean;

  // Field permissions - Edit
  canEditItemName: boolean;
  canEditBatchNumber: boolean;
  canEditExpiryDate: boolean;
  canEditQuantity: boolean;
  canEditUnit: boolean;
  canEditLocation: boolean;
  canEditCategory: boolean;
  canEditSupplier: boolean;
  canEditStatus: boolean;
  canEditIsDefault: boolean;
  canEditCreatedDate: boolean;
  canEditUpdatedDate: boolean;
  canEditDraftedDate: boolean;

  // Field permissions - Create
  canCreateItemName: boolean;
  canCreateBatchNumber: boolean;
  canCreateExpiryDate: boolean;
  canCreateQuantity: boolean;
  canCreateUnit: boolean;
  canCreateLocation: boolean;
  canCreateCategory: boolean;
  canCreateSupplier: boolean;
  canCreateStatus: boolean;
  canCreateIsDefault: boolean;
  canCreateCreatedDate: boolean;
  canCreateUpdatedDate: boolean;
  canCreateDraftedDate: boolean;
}
