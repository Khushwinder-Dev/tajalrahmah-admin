// hooks/usePermissions.ts
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { createPermissionCheckers, hasPermission } from "@/lib/permissionUtils";
import type {
  PermissionCheckers,
  CountriesPermissions,
  AuthState,
  UsersPermissions,
  UserMasterPermissions,
  ColorsPermissions,
  LeadSourcesPermissions,
  ExpiryItemsPermissions,
} from "@/types/permissions.types";

// Define your root state type
interface RootState {
  auth: AuthState;
  // ... other slices
}

/**
 * Custom hook to get permission checkers for a specific module
 */
export const useModulePermissions = (
  moduleName: string
): PermissionCheckers => {
  const permissions = useSelector(
    (state: RootState) => state.auth.user?.permissions
  );

  const permissionCheckers = useMemo(() => {
    return createPermissionCheckers(permissions, moduleName);
  }, [permissions, moduleName]);

  return permissionCheckers;
};

/**
 * Typed hook specifically for countries module
 */
export const useCountriesPermissions = (): CountriesPermissions => {
  const permissions = useSelector((state: RootState) => {
    return state.auth.user?.permissions;
  });

  const permissionCheckers = useMemo(() => {
    return createPermissionCheckers(
      permissions,
      "countries"
    ) as unknown as CountriesPermissions;
  }, [permissions]);

  return permissionCheckers;
};

/**
 * Typed hook specifically for users module
 */
export const useUsersPermissions = (): UsersPermissions => {
  const permissions = useSelector((state: RootState) => {
    return state.auth.user?.permissions;
  });

  const permissionCheckers = useMemo(() => {
    return createPermissionCheckers(
      permissions,
      "users"
    ) as unknown as UsersPermissions;
  }, [permissions]);

  return permissionCheckers;
};

/**
 * Typed hook specifically for user-master module
 */
export const useUserMasterPermissions = (): UserMasterPermissions => {
  const permissions = useSelector((state: RootState) => {
    return state.auth.user?.permissions;
  });

  const permissionCheckers = useMemo(() => {
    return createPermissionCheckers(
      permissions,
      "user-master"
    ) as unknown as UserMasterPermissions;
  }, [permissions]);

  return permissionCheckers;
};

/**
 * Typed hook specifically for colors module
 */
export const useColorsPermissions = (): ColorsPermissions => {
  const permissions = useSelector((state: RootState) => {
    return state.auth.user?.permissions;
  });

  const permissionCheckers = useMemo(() => {
    return createPermissionCheckers(
      permissions,
      "colors"
    ) as unknown as ColorsPermissions;
  }, [permissions]);

  return permissionCheckers;
};

/**
 * Typed hook specifically for lead-sources module
 */
export const useLeadSourcesPermissions = (): LeadSourcesPermissions => {
  const permissions = useSelector((state: RootState) => {
    return state.auth.user?.permissions;
  });

  const permissionCheckers = useMemo(() => {
    return createPermissionCheckers(
      permissions,
      "lead-sources"
    ) as unknown as LeadSourcesPermissions;
  }, [permissions]);

  return permissionCheckers;
};

/**
 * Typed hook specifically for expiry-items module
 */
export const useExpiryItemsPermissions = (): ExpiryItemsPermissions => {
  const permissions = useSelector((state: RootState) => {
    return state.auth.user?.permissions;
  });

  const permissionCheckers = useMemo(() => {
    return createPermissionCheckers(
      permissions,
      "expiry-items"
    ) as unknown as ExpiryItemsPermissions;
  }, [permissions]);

  return permissionCheckers;
};

/**
 * Generic permission checker hook
 */

type PermissionMap<T extends string> = Record<T, boolean>;

// Overloads
export function usePermission(moduleName: string, action: string): boolean;

export function usePermission<T extends string>(
  moduleName: string,
  action: string,
  fieldName: T
): boolean;

export function usePermission<T extends string>(
  moduleName: string,
  action: string,
  fieldNames: T[]
): PermissionMap<T>;

export function usePermission<T extends string>(
  moduleName: string,
  action: string,
  fieldNames?: T | T[]
): boolean | PermissionMap<T> {
  const permissions = useSelector(
    (state: RootState) => state.auth.user?.permissions
  );

  return useMemo(() => {
    if (!fieldNames) return hasPermission(permissions, moduleName, action);

    if (Array.isArray(fieldNames)) {
      const map: Record<string, boolean> = {};
      fieldNames.forEach((field) => {
        map[field] = hasPermission(permissions, moduleName, action, field);
      });
      return map as PermissionMap<T>;
    }

    return hasPermission(permissions, moduleName, action, fieldNames);
  }, [permissions, moduleName, action, fieldNames]);
}

/**
 * Hook to get all permissions for easy destructuring
 */
export const useAllPermissions = () => {
  return useSelector((state: RootState) => state.auth.user?.permissions);
};

/**
 * Hook to check if user has access to a module
 */
export const useHasModuleAccess = (moduleName: string): boolean => {
  const permissions = useSelector(
    (state: RootState) => state.auth.user?.permissions
  );

  return useMemo(() => {
    return !!permissions?.modules?.[moduleName];
  }, [permissions, moduleName]);
};

export const usePermissionsPermissions = (): CountriesPermissions => {
  const permissions = useSelector((state: RootState) => {
    return state.auth.user?.permissions;
  });

  const permissionCheckers = useMemo(() => {
    return createPermissionCheckers(
      permissions,
      "countries"
    ) as unknown as CountriesPermissions;
  }, [permissions]);

  return permissionCheckers;
};
