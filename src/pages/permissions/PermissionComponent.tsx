/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete } from "@/components/common/Autocomplete";
import { FloatingMultiSelect } from "@/components/common/FloatingMultiSelect";
import { FloatingSelect } from "@/components/common/FloatingSelect";
import type { RootState } from "@/store";
import { login } from "@/store/authSlice";
import { Accordion, Button, Checkbox, Table, Text } from "@mantine/core";
import { X } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// list of companies and branches
const companies = [
  {
    label: "Company 1",
    value: "company1",
    branches: [
      { label: "Branch 1-1", value: "branch1-1" },
      { label: "Branch 1-2", value: "branch1-2" },
    ],
  },
  {
    label: "Company 2",
    value: "company2",
    branches: [
      { label: "Branch 2-1", value: "branch2-1" },
      { label: "Branch 2-2", value: "branch2-2" },
      { label: "Branch 2-3", value: "branch2-3" },
    ],
  },
  {
    label: "Company 3",
    value: "company3",
    branches: [{ label: "Branch 3-1", value: "branch3-1" }],
  },
];

// Predefined permission sets for each user role
const rolePermissions = {
  "Nahid Islam": {
    countries: {
      formPermissions: {
        add: true,
        edit: true,
        view: true,
        delete: true,
        export: true,
        import: true,
        inactive: true,
        print: true,
        history: true,
        restore: true,
        exportPdf: true,
        exportCsv: true,
        exportXls: true,
        exportDoc: true,
      },
      fieldPermissions: {
        countryName: { add: true, edit: true, view: true },
        countryCode: { add: true, edit: true, view: true },
        callingCode: { add: true, edit: true, view: true },
        flag: { add: true, edit: true, view: true },
        status: { add: true, edit: true, view: true },
        createdDate: { add: true, edit: true, view: true },
        lastUpdated: { add: true, edit: true, view: true },
        createdBy: { add: true, edit: true, view: true },
        isDefault: { add: true, edit: true, view: true },
        isDraft: { add: true, edit: true, view: true },
      },
    },
    states: {
      formPermissions: {
        add: true,
        edit: true,
        view: true,
        print: true,
        import: true,
        export: true,

        exportPdf: true,
        exportCsv: true,
        exportXls: true,
        exportDoc: true,

        inactive: true,
        history: true,
        delete: true,
        restore: true,
      },
      fieldPermissions: {
        stateName: { add: true, edit: true, view: true },
        stateCode: { add: true, edit: true, view: true },
        country: { add: true, edit: true, view: true },
        status: { add: true, edit: true, view: true },
        createdDate: { add: true, edit: true, view: true },
        lastUpdated: { add: true, edit: true, view: true },
        createdBy: { add: true, edit: true, view: true },
        isDefault: { add: true, edit: true, view: true },
        isDraft: { add: true, edit: true, view: true },
      },
    },
    cities: {
      formPermissions: {
        add: true,
        edit: true,
        view: true,
        delete: true,
        export: true,
        import: true,
        inactive: true,
        print: true,
        history: true,
        restore: true,
        exportPdf: true,
        exportCsv: true,
        exportXls: true,
        exportDoc: true,
      },
      fieldPermissions: {
        cityName: { add: true, edit: true, view: true },
        cityCode: { add: true, edit: true, view: true },
        state: { add: true, edit: true, view: true },
        country: { add: true, edit: true, view: true },
        status: { add: true, edit: true, view: true },
        createdDate: { add: true, edit: true, view: true },
        lastUpdated: { add: true, edit: true, view: true },
        createdBy: { add: true, edit: true, view: true },
        isDefault: { add: true, edit: true, view: true },
        isDraft: { add: true, edit: true, view: true },
      },
    },
  },
  "Tarek Rahman": {
    countries: {
      formPermissions: {
        add: true,
        edit: true,
        view: true,
        delete: false,
        export: true,
        import: true,
        inactive: true,
        print: true,
        history: true,
        restore: false,
        exportPdf: true,
        exportCsv: true,
        exportXls: true,
        exportDoc: true,
      },
      fieldPermissions: {
        countryName: { add: true, edit: true, view: true },
        countryCode: { add: true, edit: true, view: true },
        callingCode: { add: true, edit: true, view: true },
        flag: { add: true, edit: true, view: true },
        status: { add: true, edit: true, view: true },
        createdDate: { add: false, edit: false, view: true },
        lastUpdated: { add: false, edit: false, view: true },
        createdBy: { add: false, edit: false, view: true },
        isDefault: { add: false, edit: false, view: true },
        isDraft: { add: true, edit: true, view: true },
      },
    },
    states: {
      formPermissions: {
        add: true,
        edit: true,
        view: true,
        delete: false,
        export: true,
        import: true,
        inactive: true,
        print: true,
        history: true,
        restore: false,
        exportPdf: true,
        exportCsv: true,
        exportXls: true,
        exportDoc: true,
      },
      fieldPermissions: {
        stateName: { add: true, edit: true, view: true },
        stateCode: { add: true, edit: true, view: true },
        country: { add: true, edit: true, view: true },
        status: { add: true, edit: true, view: true },
        createdDate: { add: false, edit: false, view: true },
        lastUpdated: { add: false, edit: false, view: true },
        createdBy: { add: false, edit: false, view: true },
        isDefault: { add: false, edit: false, view: true },
        isDraft: { add: true, edit: true, view: true },
      },
    },
    cities: {
      formPermissions: {
        add: true,
        edit: true,
        view: true,
        delete: false,
        export: true,
        import: true,
        inactive: true,
        print: true,
        history: true,
        restore: false,
        exportPdf: true,
        exportCsv: true,
        exportXls: true,
        exportDoc: true,
      },
      fieldPermissions: {
        cityName: { add: true, edit: true, view: true },
        cityCode: { add: true, edit: true, view: true },
        state: { add: true, edit: true, view: true },
        country: { add: true, edit: true, view: true },
        status: { add: true, edit: true, view: true },
        createdDate: { add: false, edit: false, view: true },
        lastUpdated: { add: false, edit: false, view: true },
        createdBy: { add: false, edit: false, view: true },
        isDefault: { add: false, edit: false, view: true },
        isDraft: { add: true, edit: true, view: true },
      },
    },
  },
  "Rohan Rahman": {
    countries: {
      formPermissions: {
        add: false,
        edit: false,
        view: true,
        delete: false,
        export: true,
        import: false,
        inactive: true,
        print: true,
        history: false,
        restore: false,
        exportPdf: true,
        exportCsv: true,
        exportXls: false,
        exportDoc: false,
      },
      fieldPermissions: {
        countryName: { add: false, edit: false, view: true },
        countryCode: { add: false, edit: false, view: true },
        callingCode: { add: false, edit: false, view: true },
        flag: { add: false, edit: false, view: true },
        status: { add: false, edit: false, view: true },
        createdDate: { add: false, edit: false, view: true },
        lastUpdated: { add: false, edit: false, view: true },
        createdBy: { add: false, edit: false, view: true },
        isDefault: { add: false, edit: false, view: true },
        isDraft: { add: false, edit: false, view: true },
      },
    },
    states: {
      formPermissions: {
        add: false,
        edit: false,
        view: true,
        delete: false,
        export: true,
        import: false,
        inactive: true,
        print: true,
        history: false,
        restore: false,
        exportPdf: true,
        exportCsv: true,
        exportXls: false,
        exportDoc: false,
      },
      fieldPermissions: {
        stateName: { add: false, edit: false, view: true },
        stateCode: { add: false, edit: false, view: true },
        country: { add: false, edit: false, view: true },
        status: { add: false, edit: false, view: true },
        createdDate: { add: false, edit: false, view: true },
        lastUpdated: { add: false, edit: false, view: true },
        createdBy: { add: false, edit: false, view: true },
        isDefault: { add: false, edit: false, view: true },
        isDraft: { add: false, edit: false, view: true },
      },
    },
    cities: {
      formPermissions: {
        add: false,
        edit: false,
        view: true,
        delete: false,
        export: true,
        import: false,
        inactive: true,
        print: true,
        history: false,
        restore: false,
        exportPdf: true,
        exportCsv: true,
        exportXls: false,
        exportDoc: false,
      },
      fieldPermissions: {
        cityName: { add: false, edit: false, view: true },
        cityCode: { add: false, edit: false, view: true },
        state: { add: false, edit: false, view: true },
        country: { add: false, edit: false, view: true },
        status: { add: false, edit: false, view: true },
        createdDate: { add: false, edit: false, view: true },
        lastUpdated: { add: false, edit: false, view: true },
        createdBy: { add: false, edit: false, view: true },
        isDefault: { add: false, edit: false, view: true },
        isDraft: { add: false, edit: false, view: true },
      },
    },
  },
  "Asif Mahmod": {
    countries: {
      formPermissions: {
        add: true,
        edit: true,
        view: true,
        delete: false,
        export: true,
        import: false,
        inactive: true,
        print: true,
        history: true,
        restore: false,
        exportPdf: true,
        exportCsv: true,
        exportXls: true,
        exportDoc: false,
      },
      fieldPermissions: {
        countryName: { add: true, edit: true, view: true },
        countryCode: { add: true, edit: true, view: true },
        callingCode: { add: true, edit: true, view: true },
        flag: { add: true, edit: true, view: true },
        status: { add: true, edit: true, view: true },
        createdDate: { add: false, edit: false, view: true },
        lastUpdated: { add: false, edit: false, view: true },
        createdBy: { add: false, edit: false, view: true },
        isDefault: { add: false, edit: false, view: true },
        isDraft: { add: true, edit: true, view: true },
      },
    },
    states: {
      formPermissions: {
        add: true,
        edit: true,
        view: true,
        delete: false,
        export: true,
        import: false,
        inactive: true,
        print: true,
        history: true,
        restore: false,
        exportPdf: true,
        exportCsv: true,
        exportXls: true,
        exportDoc: false,
      },
      fieldPermissions: {
        stateName: { add: true, edit: true, view: true },
        stateCode: { add: true, edit: true, view: true },
        country: { add: true, edit: true, view: true },
        status: { add: true, edit: true, view: true },
        createdDate: { add: false, edit: false, view: true },
        lastUpdated: { add: false, edit: false, view: true },
        createdBy: { add: false, edit: false, view: true },
        isDefault: { add: false, edit: false, view: true },
        isDraft: { add: true, edit: true, view: true },
      },
    },
    cities: {
      formPermissions: {
        add: true,
        edit: true,
        view: true,
        delete: false,
        export: true,
        import: false,
        inactive: true,
        print: true,
        history: true,
        restore: false,
        exportPdf: true,
        exportCsv: true,
        exportXls: true,
        exportDoc: false,
      },
      fieldPermissions: {
        cityName: { add: true, edit: true, view: true },
        cityCode: { add: true, edit: true, view: true },
        state: { add: true, edit: true, view: true },
        country: { add: true, edit: true, view: true },
        status: { add: true, edit: true, view: true },
        createdDate: { add: false, edit: false, view: true },
        lastUpdated: { add: false, edit: false, view: true },
        createdBy: { add: false, edit: false, view: true },
        isDefault: { add: false, edit: false, view: true },
        isDraft: { add: true, edit: true, view: true },
      },
    },
  },
  "Naimur Rahman": {
    countries: {
      formPermissions: {
        add: false,
        edit: false,
        view: true,
        delete: false,
        export: false,
        import: false,
        inactive: false,
        print: false,
        history: false,
        restore: false,
        exportPdf: false,
        exportCsv: false,
        exportXls: false,
        exportDoc: false,
      },
      fieldPermissions: {
        countryName: { add: false, edit: false, view: true },
        countryCode: { add: false, edit: false, view: true },
        callingCode: { add: false, edit: false, view: true },
        flag: { add: false, edit: false, view: true },
        status: { add: false, edit: false, view: true },
        createdDate: { add: false, edit: false, view: false },
        lastUpdated: { add: false, edit: false, view: false },
        createdBy: { add: false, edit: false, view: false },
        isDefault: { add: false, edit: false, view: false },
        isDraft: { add: false, edit: false, view: false },
      },
    },
    states: {
      formPermissions: {
        add: false,
        edit: false,
        view: true,
        delete: false,
        export: false,
        import: false,
        inactive: false,
        print: false,
        history: false,
        restore: false,
        exportPdf: false,
        exportCsv: false,
        exportXls: false,
        exportDoc: false,
      },
      fieldPermissions: {
        stateName: { add: false, edit: false, view: true },
        stateCode: { add: false, edit: false, view: true },
        country: { add: false, edit: false, view: true },
        status: { add: false, edit: false, view: true },
        createdDate: { add: false, edit: false, view: false },
        lastUpdated: { add: false, edit: false, view: false },
        createdBy: { add: false, edit: false, view: false },
        isDefault: { add: false, edit: false, view: false },
        isDraft: { add: false, edit: false, view: false },
      },
    },
    cities: {
      formPermissions: {
        add: false,
        edit: false,
        view: true,
        delete: false,
        export: false,
        import: false,
        inactive: false,
        print: false,
        history: false,
        restore: false,
        exportPdf: false,
        exportCsv: false,
        exportXls: false,
        exportDoc: false,
      },
      fieldPermissions: {
        cityName: { add: false, edit: false, view: true },
        cityCode: { add: false, edit: false, view: true },
        state: { add: false, edit: false, view: true },
        country: { add: false, edit: false, view: true },
        status: { add: false, edit: false, view: true },
        createdDate: { add: false, edit: false, view: false },
        lastUpdated: { add: false, edit: false, view: false },
        createdBy: { add: false, edit: false, view: false },
        isDefault: { add: false, edit: false, view: false },
        isDraft: { add: false, edit: false, view: false },
      },
    },
  },
};

const PermissionComponent = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const userData: any = useSelector((state: RootState) => state.auth.user);

  const [selectedSection, setSelectedSection] = useState("Nahid Islam");
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [moduleSearchTerm, setModuleSearchTerm] = useState<string>("");

  // company and branch selection
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [formCompanySelection, setFormCompanySelection] = useState<{
    [module: string]: string[];
  }>({});
  const [formBranchSelection, setFormBranchSelection] = useState<{
    [module: string]: string[];
  }>({});

  // Module names for search functionality
  const moduleNames = [
    { label: "Country", value: "countries" },
    { label: "State", value: "states" },
    { label: "City", value: "cities" },
  ];

  // Filter modules based on search term
  const filteredModules = moduleNames.filter((module) =>
    module.label.toLowerCase().includes(moduleSearchTerm.toLowerCase())
  );

  // Helper function to render module accordion items
  const renderModuleAccordion = (module: { label: string; value: string }) => {
    const moduleKey = module.value as "countries" | "states" | "cities";
    const accordionValue = module.value;

    return (
      <Accordion.Item key={module.value} value={accordionValue}>
        <div className="flex items-center pl-4">
          <Checkbox
            className="custom_checkbox"
            checked={areAllPermissionsEnabled(moduleKey)}
            onChange={(event) => {
              handleMasterPermissionChange(
                moduleKey,
                event.currentTarget.checked
              );
            }}
          />
          <Accordion.Control className="-ml-2">
            <Text fw={500}>{module.label}</Text>
          </Accordion.Control>
        </div>
        <Accordion.Panel>{renderFormPermissions(moduleKey)}</Accordion.Panel>
      </Accordion.Item>
    );
  };

  // Effect to apply role-based permissions when user role changes
  useEffect(() => {
    if (
      userData &&
      selectedSection &&
      rolePermissions[selectedSection as keyof typeof rolePermissions]
    ) {
      const rolePerms =
        rolePermissions[selectedSection as keyof typeof rolePermissions];

      // Initialize user data with permissions if it doesn't exist
      let updatedUserData = {
        ...userData,
        permissions: {
          ...userData.permissions,
          modules: {
            ...userData.permissions?.modules,
          },
        },
      };

      // Apply role permissions for each module
      Object.keys(rolePerms).forEach((module) => {
        const modulePerms = rolePerms[module as keyof typeof rolePerms];
        updatedUserData = {
          ...updatedUserData,
          permissions: {
            ...updatedUserData.permissions,
            modules: {
              ...updatedUserData.permissions.modules,
              [module]: {
                formPermissions: modulePerms.formPermissions,
                fieldPermissions: modulePerms.fieldPermissions,
              },
            },
          },
        };
      });

      dispatch(login(updatedUserData));
    }
  }, [selectedSection, dispatch]);

  const branchOptions = companies
    .filter((company) => selectedCompany === company.value)
    .flatMap((company) => company.branches);

  // Branch options for form permissions (multi-select)
  const getFormBranchOptions = (module: string) =>
    companies
      .filter((company) =>
        (formCompanySelection[module] || []).includes(company.value)
      )
      .flatMap((company) => company.branches)
      .map((branch) => ({ label: branch.label, value: branch.value }));

  // Initialize permissions if they don't exist
  useEffect(() => {
    if (userData?.permissions?.modules) {
      const modules = ["countries", "states", "cities"];
      let needsUpdate = false;
      let updatedUserData = { ...userData };

      modules.forEach((module) => {
        if (!updatedUserData.permissions.modules[module]) {
          updatedUserData = {
            ...updatedUserData,
            permissions: {
              ...updatedUserData.permissions,
              modules: {
                ...updatedUserData.permissions.modules,
                [module]: {},
              },
            },
          };
          needsUpdate = true;
        }

        if (!updatedUserData.permissions.modules[module].formPermissions) {
          updatedUserData = {
            ...updatedUserData,
            permissions: {
              ...updatedUserData.permissions,
              modules: {
                ...updatedUserData.permissions.modules,
                [module]: {
                  ...updatedUserData.permissions.modules[module],
                  formPermissions: {
                    add: false,
                    edit: false,
                    view: false,
                    delete: false,
                    export: false,
                    import: false,
                    inactive: false,
                    print: false,
                    history: false,
                    restore: false,
                    exportPdf: false,
                    exportCsv: false,
                    exportXls: false,
                    exportDoc: false,
                  },
                },
              },
            },
          };
          needsUpdate = true;
        }

        if (!updatedUserData.permissions.modules[module].fieldPermissions) {
          updatedUserData = {
            ...updatedUserData,
            permissions: {
              ...updatedUserData.permissions,
              modules: {
                ...updatedUserData.permissions.modules,
                [module]: {
                  ...updatedUserData.permissions.modules[module],
                  fieldPermissions: {},
                },
              },
            },
          };
          needsUpdate = true;
        }

        // Initialize field permissions for each field
        let moduleFields: string[] = [];
        switch (module) {
          case "countries":
            moduleFields = Object.keys(countryData);
            break;
          case "states":
            moduleFields = Object.keys(stateData);
            break;
          case "cities":
            moduleFields = Object.keys(cityData);
            break;
        }

        moduleFields.forEach((field) => {
          if (
            !updatedUserData.permissions.modules[module].fieldPermissions[field]
          ) {
            updatedUserData = {
              ...updatedUserData,
              permissions: {
                ...updatedUserData.permissions,
                modules: {
                  ...updatedUserData.permissions.modules,
                  [module]: {
                    ...updatedUserData.permissions.modules[module],
                    fieldPermissions: {
                      ...updatedUserData.permissions.modules[module]
                        .fieldPermissions,
                      [field]: {
                        add: false,
                        edit: false,
                        view: false,
                      },
                    },
                  },
                },
              },
            };
            needsUpdate = true;
          }
        });
      });

      if (needsUpdate) {
        dispatch(login(updatedUserData));
      }
    }
  }, [userData, dispatch]);

  // Custom accordion onChange handler that prevents closing
  const handleAccordionChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setOpenAccordions(value);
    }
  };

  // Helper function to check if all permissions are enabled for a module
  const areAllPermissionsEnabled = (
    module: "countries" | "states" | "cities"
  ) => {
    const formPermissions =
      userData?.permissions?.modules?.[module]?.formPermissions;
    const fieldPermissions =
      userData?.permissions?.modules?.[module]?.fieldPermissions;

    if (!formPermissions) return false;

    // Check if ANY form permissions are enabled (instead of ALL)
    const anyFormPermissionsEnabled =
      formPermissions.add === true ||
      formPermissions.edit === true ||
      formPermissions.view === true ||
      formPermissions.delete === true ||
      formPermissions.export === true ||
      formPermissions.import === true ||
      formPermissions.inactive === true ||
      formPermissions.print === true ||
      formPermissions.history === true ||
      formPermissions.restore === true ||
      formPermissions.exportPdf === true ||
      formPermissions.exportCsv === true ||
      formPermissions.exportXls === true ||
      formPermissions.exportDoc === true;

    // If no field permissions exist, check if any form permissions are enabled
    if (!fieldPermissions || Object.keys(fieldPermissions).length === 0) {
      return anyFormPermissionsEnabled;
    }

    // Get the appropriate field data based on module
    let moduleFields: string[] = [];
    switch (module) {
      case "countries":
        moduleFields = Object.keys(countryData);
        break;
      case "states":
        moduleFields = Object.keys(stateData);
        break;
      case "cities":
        moduleFields = Object.keys(cityData);
        break;
    }

    // Check if ANY fields have ANY permissions enabled
    const anyFieldPermissionsEnabled = moduleFields.some((field) => {
      const fieldPerm = fieldPermissions[field];
      // If field permission doesn't exist, consider it as not enabled
      if (!fieldPerm) {
        return false;
      }

      return (
        fieldPerm.add === true ||
        fieldPerm.edit === true ||
        fieldPerm.view === true
      );
    });

    return anyFormPermissionsEnabled || anyFieldPermissionsEnabled;
  };

  // Sample data for country operations
  const countryData = {
    countryName: {
      add: false,
      edit: false,
      view: false,
    },
    countryCode: {
      add: false,
      edit: false,
      view: false,
    },
    callingCode: {
      add: false,
      edit: false,
      view: false,
    },
    flag: {
      add: false,
      edit: false,
      view: false,
    },
    status: {
      add: false,
      edit: false,
      view: false,
    },
    createdDate: {
      add: false,
      edit: false,
      view: false,
    },
    lastUpdated: {
      add: false,
      edit: false,
      view: false,
    },
    createdBy: {
      add: false,
      edit: false,
      view: false,
    },
    isDefault: {
      add: false,
      edit: false,
      view: false,
    },
    isDraft: {
      add: false,
      edit: false,
      view: false,
    },
  };

  // Handler for form permissions
  const handleFormPermissionChange = (
    module: "countries" | "states" | "cities",
    permission:
      | "add"
      | "edit"
      | "view"
      | "delete"
      | "export"
      | "import"
      | "inactive"
      | "print"
      | "history"
      | "restore"
      | "exportPdf"
      | "exportCsv"
      | "exportXls"
      | "exportDoc",
    checked: boolean
  ) => {
    console.log(`Changing ${module} ${permission} to ${checked}`);
    console.log(
      "Current userData before change:",
      JSON.stringify(userData.permissions.modules, null, 2)
    );

    // Get current permissions
    const currentFormPermissions =
      userData.permissions.modules[module]?.formPermissions || {};
    const currentFieldPermissions =
      userData.permissions.modules[module]?.fieldPermissions || {};

    // If add permission is being checked, also check edit permission
    // If add permission is being unchecked, also uncheck edit permission
    // If edit permission is being checked, also check inactive, delete, and restore
    // If edit permission is being unchecked, also uncheck inactive, delete, and restore
    // If view permission is being checked, also check history
    // If view permission is being unchecked, also uncheck history
    const updatedFormPermissions = {
      ...currentFormPermissions,
      [permission]: checked,
      ...(permission === "add" && { edit: checked }),
      ...(permission === "edit" &&
        checked && {
          inactive: true,
          delete: true,
          restore: true,
        }),
      ...(permission === "edit" &&
        !checked && {
          inactive: false,
          delete: false,
          restore: false,
        }),
      ...(permission === "view" &&
        checked && {
          history: true,
        }),
      ...(permission === "view" &&
        !checked && {
          history: false,
        }),
      ...(permission === "export" &&
        checked && {
          exportPdf: true,
          exportCsv: true,
          exportXls: true,
          exportDoc: true,
        }),
      ...(permission === "export" &&
        !checked && {
          exportPdf: false,
          exportCsv: false,
          exportXls: false,
          exportDoc: false,
        }),
    };

    // Handle field-level permissions based on form-level permission changes
    const updatedFieldPermissions = { ...currentFieldPermissions };

    // Get the appropriate field data based on module
    let moduleFields: string[] = [];
    switch (module) {
      case "countries":
        moduleFields = Object.keys(countryData);
        break;
      case "states":
        moduleFields = Object.keys(stateData);
        break;
      case "cities":
        moduleFields = Object.keys(cityData);
        break;
    }

    // Handle Add and View form-level permissions
    if (permission === "add" || permission === "view") {
      moduleFields.forEach((field) => {
        if (!updatedFieldPermissions[field]) {
          updatedFieldPermissions[field] = {
            add: false,
            edit: false,
            view: false,
          };
        }

        // When form-level permission is checked, check all corresponding field-level permissions
        // When unchecked, uncheck all corresponding field-level permissions
        updatedFieldPermissions[field] = {
          ...updatedFieldPermissions[field],
          [permission]: checked,
        };

        // If Add is unchecked, also uncheck Edit at field level
        if (permission === "add" && !checked) {
          updatedFieldPermissions[field].edit = false;
        }
      });
    }

    // Handle Edit form-level permission
    if (permission === "edit") {
      moduleFields.forEach((field) => {
        if (!updatedFieldPermissions[field]) {
          updatedFieldPermissions[field] = {
            add: false,
            edit: false,
            view: false,
          };
        }

        // Only allow edit at field level if both form-level add and edit are checked
        if (updatedFormPermissions.add && checked) {
          updatedFieldPermissions[field] = {
            ...updatedFieldPermissions[field],
            edit: checked,
          };
        } else {
          updatedFieldPermissions[field] = {
            ...updatedFieldPermissions[field],
            edit: false,
          };
        }
      });
    }

    // After handling individual permission changes, ensure field-level edit permissions
    // are properly set when both form-level add and edit are checked
    if (updatedFormPermissions.add && updatedFormPermissions.edit) {
      moduleFields.forEach((field) => {
        if (!updatedFieldPermissions[field]) {
          updatedFieldPermissions[field] = {
            add: false,
            edit: false,
            view: false,
          };
        }

        // When both form-level add and edit are checked, ensure field-level edit is also checked
        updatedFieldPermissions[field] = {
          ...updatedFieldPermissions[field],
          edit: true,
        };
      });
    }

    const updatedUserData = {
      ...userData,
      permissions: {
        ...userData.permissions,
        modules: {
          ...userData.permissions.modules,
          [module]: {
            ...userData.permissions.modules[module],
            formPermissions: updatedFormPermissions,
            fieldPermissions: updatedFieldPermissions,
          },
        },
      },
    };

    console.log(
      "Updated userData after change:",
      JSON.stringify(updatedUserData.permissions.modules, null, 2)
    );
    dispatch(login(updatedUserData));
  };

  // Handler for master checkbox (toggle all permissions for a module)
  const handleMasterPermissionChange = (
    module: "countries" | "states" | "cities",
    checked: boolean
  ) => {
    const allFormPermissions = {
      add: checked,
      edit: checked,
      view: checked,
      delete: checked,
      export: checked,
      import: checked,
      inactive: checked,
      print: checked,
      history: checked,
      restore: checked,
      exportPdf: checked,
      exportCsv: checked,
      exportXls: checked,
      exportDoc: checked,
    };

    const allFieldPermissions: Record<
      string,
      { add: boolean; edit: boolean; view: boolean }
    > = {};

    // Use the appropriate data based on the module
    let moduleData;
    switch (module) {
      case "countries":
        moduleData = countryData;
        break;
      case "states":
        moduleData = stateData;
        break;
      case "cities":
        moduleData = cityData;
        break;
      default:
        moduleData = countryData;
    }

    // When master checkbox is checked, check all field permissions
    // When unchecked, uncheck all field permissions
    Object.keys(moduleData).forEach((field) => {
      allFieldPermissions[field] = {
        add: checked,
        edit: checked,
        view: checked,
      };
    });

    const updatedUserData = {
      ...userData,
      permissions: {
        ...userData.permissions,
        modules: {
          ...userData.permissions.modules,
          [module]: {
            ...userData.permissions.modules[module],
            formPermissions: allFormPermissions,
            fieldPermissions: allFieldPermissions,
          },
        },
      },
    };

    dispatch(login(updatedUserData));

    // Always keep accordion open - never close it
    if (!openAccordions.includes(module)) {
      setOpenAccordions([...openAccordions, module]);
    }
  };

  // Handler for field permissions
  const handleFieldPermissionChange = (
    module: "countries" | "states" | "cities",
    field: string,
    permission: "add" | "edit" | "view",
    checked: boolean
  ) => {
    const currentFormPermissions =
      userData.permissions.modules[module]?.formPermissions || {};

    // Check if the form-level permission is enabled
    const isFormPermissionEnabled = currentFormPermissions[permission];

    // If form-level permission is disabled, don't allow field-level changes
    if (!isFormPermissionEnabled) {
      return;
    }

    // Additional check for edit permission - it requires both add and edit form permissions
    if (
      permission === "edit" &&
      (!currentFormPermissions.add || !currentFormPermissions.edit)
    ) {
      return;
    }

    const currentFieldPermissions = {
      ...(userData.permissions.modules[module]?.fieldPermissions?.[field] || {
        view: false,
        edit: false,
        add: false,
      }),
    };

    // Update the permission that triggered the change
    currentFieldPermissions[permission] = checked;

    // If 'add' is being unchecked, also uncheck 'edit'
    if (permission === "add" && !checked) {
      currentFieldPermissions.edit = false;
    }

    const updatedUserData = {
      ...userData,
      permissions: {
        ...userData.permissions,
        modules: {
          ...userData.permissions.modules,
          [module]: {
            ...userData.permissions.modules[module],
            fieldPermissions: {
              ...userData.permissions.modules[module]?.fieldPermissions,
              [field]: currentFieldPermissions,
            },
          },
        },
      },
    };

    dispatch(login(updatedUserData));
  };

  // Sample data for state operations
  const stateData = {
    stateName: {
      add: false,
      edit: false,
      view: false,
    },
    stateCode: {
      add: false,
      edit: false,
      view: false,
    },
    country: {
      add: false,
      edit: false,
      view: false,
    },
    status: {
      add: false,
      edit: false,
      view: false,
    },
    createdDate: {
      add: false,
      edit: false,
      view: false,
    },
    lastUpdated: {
      add: false,
      edit: false,
      view: false,
    },
    createdBy: {
      add: false,
      edit: false,
      view: false,
    },
    isDefault: {
      add: false,
      edit: false,
      view: false,
    },
    isDraft: {
      add: false,
      edit: false,
      view: false,
    },
  };

  // Sample data for city operations
  const cityData = {
    cityName: {
      add: false,
      edit: false,
      view: false,
    },
    cityCode: {
      add: false,
      edit: false,
      view: false,
    },
    state: {
      add: false,
      edit: false,
      view: false,
    },
    country: {
      add: false,
      edit: false,
      view: false,
    },
    status: {
      add: false,
      edit: false,
      view: false,
    },
    createdDate: {
      add: false,
      edit: false,
      view: false,
    },
    lastUpdated: {
      add: false,
      edit: false,
      view: false,
    },
    createdBy: {
      add: false,
      edit: false,
      view: false,
    },
    isDefault: {
      add: false,
      edit: false,
      view: false,
    },
    isDraft: {
      add: false,
      edit: false,
      view: false,
    },
  };

  // Helper function to render form permissions section
  const renderFormPermissions = (module: "countries" | "states" | "cities") => {
    const moduleData = {
      countries: countryData,
      states: stateData,
      cities: cityData,
    }[module];

    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-2">
          <FloatingMultiSelect
            label="Company"
            data={companies.map((company) => ({
              label: company.label,
              value: company.value,
            }))}
            value={formCompanySelection[module] || []}
            onChange={(value) => {
              setFormCompanySelection((prev) => ({ ...prev, [module]: value }));
              setFormBranchSelection((prev) => {
                const validBranches = companies
                  .filter((company) => value.includes(company.value))
                  .flatMap((company) => company.branches)
                  .map((branch) => branch.value);
                return {
                  ...prev,
                  [module]: (prev[module] || []).filter((branch) =>
                    validBranches.includes(branch)
                  ),
                };
              });
            }}
          />
          <FloatingMultiSelect
            label="Branch"
            placeholder=" "
            data={getFormBranchOptions(module)}
            value={formBranchSelection[module] || []}
            onChange={(value) =>
              setFormBranchSelection((prev) => ({ ...prev, [module]: value }))
            }
            disabled={
              !(
                formCompanySelection[module] &&
                formCompanySelection[module].length > 0
              )
            }
          />
        </div>
        <div className="flex flex-col! gap-4 items-start! justify-between! mb-4 p-2 border-b bg-white flex-wrap">
          <div className="flex flex-wrap w-full">
            <div className="flex gap-2 min-[1600px]:gap-4 items-center py-3 flex-wrap justify-between w-full">
              <div className="flex items-center gap-2">
                <Checkbox
                  className="custom_checkbox"
                  checked={
                    userData.permissions.modules[module].formPermissions.add
                  }
                  onChange={(event) => {
                    handleFormPermissionChange(
                      module,
                      "add",
                      event.currentTarget.checked
                    );
                  }}
                />
                <span className="w-max text-base min-[1600px]:text-xl font-semibold">
                  Add
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  className="custom_checkbox"
                  checked={
                    userData.permissions.modules[module].formPermissions.edit
                  }
                  disabled={
                    !userData.permissions.modules[module].formPermissions.add
                  }
                  onChange={(event) => {
                    if (
                      userData.permissions.modules[module].formPermissions.add
                    ) {
                      handleFormPermissionChange(
                        module,
                        "edit",
                        event.currentTarget.checked
                      );
                    }
                  }}
                />
                <span className="w-max text-base min-[1600px]:text-xl font-semibold">
                  Edit
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  className="custom_checkbox"
                  checked={
                    userData.permissions.modules[module].formPermissions.view
                  }
                  onChange={(event) => {
                    handleFormPermissionChange(
                      module,
                      "view",
                      event.currentTarget.checked
                    );
                  }}
                />
                <span className="w-max text-base min-[1600px]:text-xl font-semibold">
                  View
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  className="custom_checkbox"
                  checked={
                    userData.permissions.modules[module].formPermissions.print
                  }
                  onChange={(event) => {
                    handleFormPermissionChange(
                      module,
                      "print",
                      event.currentTarget.checked
                    );
                  }}
                />
                <span className="w-max text-base min-[1600px]:text-xl font-semibold">
                  Print
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  className="custom_checkbox"
                  checked={
                    userData.permissions.modules[module].formPermissions.import
                  }
                  onChange={(event) => {
                    handleFormPermissionChange(
                      module,
                      "import",
                      event.currentTarget.checked
                    );
                  }}
                />
                <span className="w-max text-base min-[1600px]:text-xl font-semibold">
                  Import
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  className="custom_checkbox"
                  checked={
                    userData.permissions.modules[module].formPermissions.export
                  }
                  onChange={(event) => {
                    handleFormPermissionChange(
                      module,
                      "export",
                      event.currentTarget.checked
                    );
                  }}
                />
                <span className="w-max text-base min-[1600px]:text-xl font-semibold">
                  Export
                </span>
              </div>
            </div>
            <div className="flex gap-2 min-[1600px]:gap-6 items-center py-3 flex-wrap justify-start w-full">
              {userData.permissions.modules[module].formPermissions.export && (
                <>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="custom_checkbox"
                      checked={
                        userData.permissions.modules[module].formPermissions
                          .exportPdf
                      }
                      onChange={(event) => {
                        handleFormPermissionChange(
                          module,
                          "exportPdf",
                          event.currentTarget.checked
                        );
                      }}
                    />
                    <span className="w-max text-base font-semibold">PDF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="custom_checkbox"
                      checked={
                        userData.permissions.modules[module].formPermissions
                          .exportCsv
                      }
                      onChange={(event) => {
                        handleFormPermissionChange(
                          module,
                          "exportCsv",
                          event.currentTarget.checked
                        );
                      }}
                    />
                    <span className="w-max text-base font-semibold">CSV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="custom_checkbox"
                      checked={
                        userData.permissions.modules[module].formPermissions
                          .exportXls
                      }
                      onChange={(event) => {
                        handleFormPermissionChange(
                          module,
                          "exportXls",
                          event.currentTarget.checked
                        );
                      }}
                    />
                    <span className="w-max text-base font-semibold">XLS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="custom_checkbox"
                      checked={
                        userData.permissions.modules[module].formPermissions
                          .exportDoc
                      }
                      onChange={(event) => {
                        handleFormPermissionChange(
                          module,
                          "exportDoc",
                          event.currentTarget.checked
                        );
                      }}
                    />
                    <span className="w-max text-base font-semibold">DOC</span>
                  </div>
                </>
              )}
              {userData.permissions.modules[module].formPermissions.edit && (
                <>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="custom_checkbox"
                      checked={
                        userData.permissions.modules[module].formPermissions
                          .inactive
                      }
                      onChange={(event) => {
                        handleFormPermissionChange(
                          module,
                          "inactive",
                          event.currentTarget.checked
                        );
                      }}
                    />
                    <span className="w-max text-base font-semibold">
                      Inactive
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="custom_checkbox"
                      checked={
                        userData.permissions.modules[module].formPermissions
                          .delete
                      }
                      onChange={(event) => {
                        handleFormPermissionChange(
                          module,
                          "delete",
                          event.currentTarget.checked
                        );
                      }}
                    />
                    <span className="w-max text-base font-semibold">
                      Delete
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="custom_checkbox"
                      checked={
                        userData.permissions.modules[module].formPermissions
                          .restore
                      }
                      onChange={(event) => {
                        handleFormPermissionChange(
                          module,
                          "restore",
                          event.currentTarget.checked
                        );
                      }}
                    />
                    <span className="w-max text-base font-semibold">
                      Restore
                    </span>
                  </div>
                </>
              )}
              {userData.permissions.modules[module].formPermissions.view && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="custom_checkbox"
                    checked={
                      userData.permissions.modules[module].formPermissions
                        .history
                    }
                    onChange={(event) => {
                      handleFormPermissionChange(
                        module,
                        "history",
                        event.currentTarget.checked
                      );
                    }}
                  />
                  <span className="w-max text-base font-semibold">History</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {(() => {
          const formPermissions =
            userData.permissions.modules[module].formPermissions || {};
          const shouldShowTable = true;

          return shouldShowTable ? (
            <div style={{ maxHeight: "250px", overflowY: "auto" }}>
              <Table striped highlightOnHover>
                <Table.Thead
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    background: "white",
                  }}
                >
                  <Table.Tr>
                    <Table.Th>Field</Table.Th>
                    <Table.Th>Add</Table.Th>
                    <Table.Th>Edit</Table.Th>
                    <Table.Th>View</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {Object.entries(moduleData).map(([field]) => (
                    <Table.Tr key={field}>
                      <Table.Td>
                        <Text fw={500} style={{ textTransform: "capitalize" }}>
                          {field.replace(/([A-Z])/g, " $1").trim()}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Checkbox
                          className="custom_checkbox"
                          checked={
                            userData.permissions.modules[module]
                              .fieldPermissions[field]?.add || false
                          }
                          disabled={!formPermissions.add}
                          onChange={(event) => {
                            handleFieldPermissionChange(
                              module,
                              field,
                              "add",
                              event.currentTarget.checked
                            );
                          }}
                        />
                      </Table.Td>
                      <Table.Td>
                        <Checkbox
                          className="custom_checkbox"
                          checked={
                            userData.permissions.modules[module]
                              .fieldPermissions[field]?.edit || false
                          }
                          disabled={
                            !formPermissions.edit ||
                            !formPermissions.add ||
                            !userData.permissions.modules[module]
                              .fieldPermissions[field]?.add
                          }
                          onChange={(event) => {
                            handleFieldPermissionChange(
                              module,
                              field,
                              "edit",
                              event.currentTarget.checked
                            );
                          }}
                        />
                      </Table.Td>
                      <Table.Td>
                        <Checkbox
                          className="custom_checkbox"
                          checked={
                            userData.permissions.modules[module]
                              .fieldPermissions[field]?.view || false
                          }
                          disabled={!formPermissions.view}
                          onChange={(event) => {
                            handleFieldPermissionChange(
                              module,
                              field,
                              "view",
                              event.currentTarget.checked
                            );
                          }}
                        />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          ) : null;
        })()}
      </div>
    );
  };

  // Convert accordion data to autocomplete options
  const autocompleteOptions = [
    "Nahid Islam",
    "Tarek Rahman",
    "Asif Mahmod",
    "Naimur Rahman",
    "Rohan Rahman",
  ];

  useImperativeHandle(ref, () => ({
    getValues: () => {
      const currentPermissions = userData?.permissions?.modules || {};
      console.log("Current permissions being returned:", currentPermissions);
      return {
        selectedUser: selectedSection,
        company: selectedCompany,
        branch: selectedBranch,
        permissions: currentPermissions,
      };
    },
  }));

  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <Autocomplete
            options={moduleNames}
            value={selectedModule}
            onValueChange={(value: string) => {
              setSelectedModule(value);
              // When a module is selected, filter to show only that module
              if (value) {
                const selectedModuleData = moduleNames.find(
                  (m) => m.value === value
                );
                if (selectedModuleData) {
                  setModuleSearchTerm(selectedModuleData.label);
                }
              } else {
                // Clear search term when no module is selected
                setModuleSearchTerm("");
              }
            }}
            displayKey="label"
            valueKey="value"
            searchKey="label"
            placeholder=" "
            labelText="Search"
          />
        </div>
        {(moduleSearchTerm || selectedModule) && (
          <Button
            variant="outline"
            onClick={() => {
              setModuleSearchTerm("");
              setSelectedModule("");
            }}
            className="!h-[50px]"
          >
            <X className="size-6" />
          </Button>
        )}
      </div>
      <div className="flex gap-4">
        <Autocomplete
          options={autocompleteOptions}
          value={selectedSection}
          onValueChange={setSelectedSection}
          displayKey="label"
          valueKey="value"
          searchKey="label"
          placeholder=" "
          labelText="User"
        />

        <FloatingSelect
          label="Company"
          data={companies}
          value={selectedCompany}
          onChange={(value) => {
            setSelectedCompany(value ?? "");
            setSelectedBranch("");
          }}
        />

        <FloatingSelect
          label="Branch"
          placeholder=" "
          data={branchOptions}
          value={selectedBranch}
          onChange={(value) => setSelectedBranch(value ?? "")}
          disabled={!selectedCompany}
        />
      </div>

      {selectedSection && (
        <div className="mt-6 flex-grow overflow-y-auto h-[calc(100%-70px)] pb-[100px]">
          {filteredModules.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredModules.map((module) => (
                <Accordion
                  key={module.value}
                  variant="separated"
                  radius="lg"
                  multiple
                  value={openAccordions}
                  onChange={handleAccordionChange}
                  className="h-fit"
                >
                  {renderModuleAccordion(module)}
                </Accordion>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500">
              {moduleSearchTerm ? (
                <div className="text-center">
                  <p>No modules found matching "{moduleSearchTerm}"</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              ) : (
                <p>No modules available</p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
});

export default PermissionComponent;
