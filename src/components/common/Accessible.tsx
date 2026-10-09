/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Text, Checkbox, Table, Accordion } from "@mantine/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@/components/common/Autocomplete";
import { login } from "@/store/authSlice";
import type { RootState } from "@/store";
import { FloatingMultiSelect } from "./FloatingMultiSelect";

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

const Accessible = () => {
  const dispatch = useDispatch();
  const userData: any = useSelector((state: RootState) => state.auth.user);

  const [selectedSection, setSelectedSection] = useState("User 1");
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  // company and branch selection
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  // State to hold selections for each module independently
  const [moduleSelections, setModuleSelections] = useState<{
    [key: string]: { companies: string[]; branches: string[] };
  }>({});

  // Effect to update module selections when main selections change
  useEffect(() => {
    const newSelections: {
      [key: string]: { companies: string[]; branches: string[] };
    } = {};
    const modules = ["countries", "states", "cities"];
    modules.forEach((module) => {
      newSelections[module] = {
        companies: selectedCompanies,
        branches: selectedBranches,
      };
    });
    setModuleSelections(newSelections);
  }, [selectedCompanies, selectedBranches]);

  const branchOptions = companies
    .filter((company) => selectedCompanies.includes(company.value))
    .flatMap((company) => company.branches);

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
                    pdf: false,
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

    // Check all form permissions (including import)
    const allFormPermissionsEnabled =
      formPermissions.add === true &&
      formPermissions.edit === true &&
      formPermissions.view === true &&
      formPermissions.delete === true &&
      formPermissions.export === true &&
      formPermissions.import === true &&
      formPermissions.pdf === true &&
      formPermissions.print === true &&
      formPermissions.history === true &&
      formPermissions.restore === true &&
      formPermissions.exportPdf === true &&
      formPermissions.exportCsv === true &&
      formPermissions.exportXls === true &&
      formPermissions.exportDoc === true;

    // If no field permissions exist, only check form permissions
    if (!fieldPermissions || Object.keys(fieldPermissions).length === 0) {
      return allFormPermissionsEnabled;
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

    // Check if all fields have all permissions enabled
    const allFieldPermissionsEnabled = moduleFields.every((field) => {
      const fieldPerm = fieldPermissions[field];
      // If field permission doesn't exist, consider it as not enabled
      if (!fieldPerm) {
        return false;
      }

      return (
        fieldPerm.add === true &&
        fieldPerm.edit === true &&
        fieldPerm.view === true
      );
    });

    return allFormPermissionsEnabled && allFieldPermissionsEnabled;
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
      | "pdf"
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

    // Get current permissions
    const currentFormPermissions =
      userData.permissions.modules[module]?.formPermissions || {};
    const currentFieldPermissions =
      userData.permissions.modules[module]?.fieldPermissions || {};

    // If add permission is being checked, also check edit permission
    // If add permission is being unchecked, also uncheck edit permission
    // If edit permission is being unchecked, also uncheck history, delete, and restore
    const updatedFormPermissions = {
      ...currentFormPermissions,
      [permission]: checked,
      ...(permission === "add" && { edit: checked }),
      ...(permission === "edit" &&
        !checked && {
          history: false,
          delete: false,
          restore: false,
        }),
      ...(permission === "export" &&
        !checked && {
          exportPdf: false,
          exportCsv: false,
          exportXls: false,
          exportDoc: false,
        }),
    };

    // If form permission is being unchecked, uncheck all corresponding field permissions
    let updatedFieldPermissions =
      !checked &&
      (permission === "add" || permission === "edit" || permission === "view")
        ? Object.keys(currentFieldPermissions).reduce(
            (acc, field) => {
              acc[field] = {
                ...currentFieldPermissions[field],
                [permission]: false,
              };
              return acc;
            },
            { ...currentFieldPermissions }
          )
        : { ...currentFieldPermissions };

    // If add is checked/unchecked, ensure edit follows the same state in field permissions
    if (permission === "add") {
      updatedFieldPermissions = Object.keys(currentFieldPermissions).reduce(
        (acc, field) => {
          acc[field] = {
            ...(updatedFieldPermissions[field] ||
              currentFieldPermissions[field]),
            add: false, // Field level add should be unchecked by default
            edit: false, // Field level edit should be unchecked by default
          };
          return acc;
        },
        { ...updatedFieldPermissions }
      );
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
      pdf: checked,
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

    const itemBranchOptions = companies
      .filter((company) =>
        moduleSelections[module]?.companies?.includes(company.value)
      )
      .flatMap((company) => company.branches);

    const handleItemCompanyChange = (value: string[]) => {
      const validBranches = companies
        .filter((c) => value.includes(c.value))
        .flatMap((c) => c.branches.map((b) => b.value));

      setModuleSelections((prev) => ({
        ...prev,
        [module]: {
          companies: value,
          branches:
            prev[module]?.branches.filter((branch) =>
              validBranches.includes(branch)
            ) || [],
        },
      }));
    };

    const handleItemBranchChange = (value: string[]) => {
      setModuleSelections((prev) => ({
        ...prev,
        [module]: {
          ...prev[module],
          branches: value,
        },
      }));
    };

    return (
      <div className="flex flex-col">
        <div className="flex gap-6 my-6">
          <FloatingMultiSelect
            label="Company"
            data={companies}
            value={moduleSelections[module]?.companies || []}
            onChange={handleItemCompanyChange}
          />

          <FloatingMultiSelect
            label="Branch"
            data={itemBranchOptions}
            value={moduleSelections[module]?.branches || []}
            onChange={handleItemBranchChange}
            disabled={!moduleSelections[module]?.companies?.length}
          />
        </div>

        <div className="flex flex-col! gap-4 items-start! justify-between! mb-4 p-2 border-b bg-white flex-wrap">
          <Text fw={600} className="w-max">
            Form
          </Text>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Checkbox
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
              <Text className="w-max text-sm! font-semibold!">Add</Text>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
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
              <Text className="w-max text-sm! font-semibold!">Edit</Text>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
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
              <Text className="w-max text-sm! font-semibold!">View</Text>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
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
              <Text className="w-max text-sm! font-semibold!">Print</Text>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
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
              <Text className="w-max text-sm! font-semibold!">Import</Text>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
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
              <Text className="w-max text-sm! font-semibold!">Export</Text>
            </div>
            {userData.permissions.modules[module].formPermissions.export && (
              <div className="w-full mt-2 pt-2">
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Checkbox
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
                    <Text className="w-max text-sm! font-semibold!">PDF</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
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
                    <Text className="w-max text-sm! font-semibold!">CSV</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
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
                    <Text className="w-max text-sm! font-semibold!">XLS</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
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
                    <Text className="w-max text-sm! font-semibold!">DOC</Text>
                  </div>
                </div>
              </div>
            )}
            {userData.permissions.modules[module].formPermissions.edit && (
              <div className="w-full pt-2">
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Checkbox
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
                    <Text className="w-max text-sm! font-semibold!">
                      History
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
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
                    <Text className="w-max text-sm! font-semibold!">
                      Delete
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
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
                    <Text className="w-max text-sm! font-semibold!">
                      Restore
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {(() => {
          const formPermissions =
            userData.permissions.modules[module].formPermissions || {};
          const shouldShowTable = true;

          return shouldShowTable ? (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Field</Table.Th>
                  <Table.Th>Add</Table.Th>
                  <Table.Th>Edit</Table.Th>
                  <Table.Th>View</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody className="mt-4 bg-white">
                {Object.entries(moduleData).map(([field]) => (
                  <Table.Tr key={field}>
                    <Table.Td>
                      <Text fw={500} style={{ textTransform: "capitalize" }}>
                        {field.replace(/([A-Z])/g, " $1").trim()}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Checkbox
                        checked={
                          userData.permissions.modules[module].fieldPermissions[
                            field
                          ]?.add || false
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
                        checked={
                          userData.permissions.modules[module].fieldPermissions[
                            field
                          ]?.edit &&
                          userData.permissions.modules[module].fieldPermissions[
                            field
                          ]?.add
                        }
                        disabled={
                          !formPermissions.edit ||
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
                        checked={
                          userData.permissions.modules[module].fieldPermissions[
                            field
                          ]?.view || false
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
          ) : null;
        })()}
      </div>
    );
  };

  // Convert accordion data to autocomplete options
  const autocompleteOptions = ["User 1", "User 2", "User 3"];

  return (
    <div className="w-[100%] h-full">
      <div className="">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Autocomplete
            options={autocompleteOptions}
            value={selectedSection}
            onValueChange={setSelectedSection}
            displayKey="label"
            valueKey="value"
            searchKey="label"
            placeholder=" "
            labelText="User"
            className="w-full"
          />

          <div className="flex gap-4 mt-8">
            <FloatingMultiSelect
              label="Company"
              data={companies}
              value={selectedCompanies}
              onChange={(value) => {
                setSelectedCompanies(value);
                // Reset branches if they are not in the new company list
                const validBranches = companies
                  .filter((c) => value.includes(c.value))
                  .flatMap((c) => c.branches.map((b) => b.value));
                setSelectedBranches((prev) =>
                  prev.filter((branch) => validBranches.includes(branch))
                );
              }}
            />

            <FloatingMultiSelect
              label="Branch"
              placeholder=" "
              data={branchOptions}
              value={selectedBranches}
              onChange={setSelectedBranches}
              disabled={selectedCompanies.length === 0}
            />
          </div>

          {selectedSection && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Accordion
                variant="separated"
                radius="lg"
                multiple
                value={openAccordions}
                onChange={handleAccordionChange}
              >
                <Accordion.Item value="country">
                  <div className="flex items-center pl-4">
                    <Checkbox
                      checked={areAllPermissionsEnabled("countries")}
                      onChange={(event) => {
                        handleMasterPermissionChange(
                          "countries",
                          event.currentTarget.checked
                        );
                      }}
                    />
                    <Accordion.Control className="-ml-2">
                      <Text fw={500}>Country</Text>
                    </Accordion.Control>
                  </div>

                  <Accordion.Panel>
                    {renderFormPermissions("countries")}
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="state">
                  <div className="flex items-center pl-4">
                    <Checkbox
                      checked={areAllPermissionsEnabled("states")}
                      onChange={(event) => {
                        handleMasterPermissionChange(
                          "states",
                          event.currentTarget.checked
                        );
                      }}
                    />
                    <Accordion.Control className="-ml-2">
                      <Text fw={500}>State</Text>
                    </Accordion.Control>
                  </div>

                  <Accordion.Panel>
                    {renderFormPermissions("states")}
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>

              <Accordion
                variant="separated"
                radius="lg"
                multiple
                value={openAccordions}
                onChange={handleAccordionChange}
              >
                <Accordion.Item value="city">
                  <div className="flex items-center pl-4">
                    <Checkbox
                      checked={areAllPermissionsEnabled("cities")}
                      onChange={(event) => {
                        handleMasterPermissionChange(
                          "cities",
                          event.currentTarget.checked
                        );
                      }}
                    />
                    <Accordion.Control className="-ml-2">
                      <Text fw={500}>City</Text>
                    </Accordion.Control>
                  </div>

                  <Accordion.Panel>
                    {renderFormPermissions("cities")}
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Accessible;
