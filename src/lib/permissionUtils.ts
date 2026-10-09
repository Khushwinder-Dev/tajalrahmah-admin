// utils/permissionUtils.ts
// utils/permissionUtils.ts
import type {
  UserPermissions,
  PermissionCheckers,
} from "@/types/permissions.types";

/**
 * Creates permission checker functions for a specific module
 */
export const createPermissionCheckers = (
  permissions: UserPermissions | undefined,
  moduleName: string
): PermissionCheckers => {
  if (!permissions?.modules?.[moduleName]) {
    // Return all false permissions if module not found
    return createEmptyPermissions();
  }

  const modulePermissions = permissions.modules[moduleName];
  const { formPermissions = {}, fieldPermissions = {} } = modulePermissions;

  // Create form-level permission checkers
  const formCheckers: PermissionCheckers = {};
  Object.keys(formPermissions).forEach((action: string) => {
    const camelCaseAction = toCamelCase(`can-${action}`);
    formCheckers[camelCaseAction] =
      formPermissions[action as keyof typeof formPermissions] || false;
  });

  // Create field-level permission checkers
  const fieldCheckers: PermissionCheckers = {};
  Object.keys(fieldPermissions).forEach((fieldName: string) => {
    const fieldPerms = fieldPermissions[fieldName];
    Object.keys(fieldPerms).forEach((action: string) => {
      const checkerName = toCamelCase(`can-${action}-${fieldName}`);
      fieldCheckers[checkerName] =
        fieldPerms[action as keyof typeof fieldPerms] || false;
    });
  });

  return {
    ...formCheckers,
    ...fieldCheckers,
  };
};

/**
 * Converts kebab-case or snake_case to camelCase
 */
const toCamelCase = (str: string): string => {
  return str
    .replace(/[-_](.)/g, (_, char: string) => char.toUpperCase())
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
};

/**
 * Returns empty permissions object when module is not accessible
 */
const createEmptyPermissions = (): PermissionCheckers => {
  return new Proxy(
    {},
    {
      get: (): boolean => false,
    }
  );
};

/**
 * Generic permission checker function
 */
export const hasPermission = (
  permissions: UserPermissions | undefined,
  moduleName: string,
  action: string,
  fieldName?: string
): boolean => {
  if (!permissions?.modules?.[moduleName]) {
    return false;
  }

  const modulePermissions = permissions.modules[moduleName];

  if (fieldName) {
    // Check field-level permission
    return (
      modulePermissions.fieldPermissions?.[fieldName]?.[
        action as keyof (typeof modulePermissions.fieldPermissions)[string]
      ] || false
    );
  } else {
    // Check form-level permission
    return (
      modulePermissions.formPermissions?.[
        action as keyof typeof modulePermissions.formPermissions
      ] || false
    );
  }
};
