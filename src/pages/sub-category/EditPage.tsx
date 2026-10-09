/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import type { SubCategoryFormData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";
import { FloatingMultiSelect } from "@/components/common/FloatingMultiSelect";
import { getModuleFromPath } from "@/lib/utils";
import {
  formFields,
  initialDataWithValue,
  initialProperties,
  printConfigFieldLabels,
  type ModuleCreateEditPageTypes,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";

type Props = {
  isEdit?: boolean;
};

export default function SubCategoryEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Get the ID from URL params
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const detectedModule = getModuleFromPath(location.pathname);

  // Get module ID for this edit page
  const moduleId = `${detectedModule}-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<SubCategoryFormData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [statusState, setStatusState] = useState<
    "Active" | "Draft" | "Delete" | string
  >("Active");
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);

  // Form state
  const [formData, setFormData] = useState<
    ModuleCreateEditPageTypes | SubCategoryFormData
  >({
    ...initialProperties,
    groups: "",
    slNo: "",
    name: "",
    categories: "",
    label: "",
    isDefault: false,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Permission checks
  const canCreate = usePermission(detectedModule, "create");
  const canView = usePermission(detectedModule, "view");
  const canPdf: boolean = usePermission(detectedModule, "pdf");
  const canPrint: boolean = usePermission(detectedModule, "print");

  // Field-level permissions
  const fieldKeys = Object.keys(
    initialProperties
  ) as (keyof ModuleFieldsType)[];
  const permissionsFieldLevel = usePermission<keyof ModuleCreateEditPageTypes>(
    detectedModule,
    "create",
    [...fieldKeys, "isDefault", "isDraft"]
  );

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Check for restore flag from taskbar
  useEffect(() => {
    const shouldRestore = localStorage.getItem(`restore-${moduleId}`);
    if (shouldRestore === "true") {
      console.log(
        "Setting shouldRestoreFromMinimized to true from localStorage"
      );
      setShouldRestoreFromMinimized(true);
      localStorage.removeItem(`restore-${moduleId}`);
    }
  }, [moduleId]);

  // Restore logic using the custom hook
  useEffect(() => {
    console.log("Checking for restored module...");
    console.log("Has minimized data:", hasMinimizedData);
    console.log("shouldRestoreFromMinimized flag:", shouldRestoreFromMinimized);

    // Check if we should restore automatically
    const shouldAutoRestore =
      shouldRestoreFromMinimized ||
      (hasMinimizedData &&
        moduleData &&
        !isRestoredFromMinimized &&
        !formData.name &&
        !formData.slNo);

    if (hasMinimizedData && moduleData && shouldAutoRestore) {
      console.log("Found restored module and should restore:", moduleData);

      // Restore form data
      setFormData(moduleData);

      // Restore UI states based on form data
      setIsDefaultState(moduleData.isDefault ? "Yes" : "No");
      if (moduleData.isDraft) {
        setStatusState("Draft");
      } else {
        setStatusState("Active");
      }

      // Set flag to prevent re-restoration
      setIsRestoredFromMinimized(true);
      setShouldRestoreFromMinimized(false);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition(moduleId);
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    } else if (hasMinimizedData && !shouldAutoRestore) {
      console.log("Found minimized module but not restoring automatically");
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    shouldRestoreFromMinimized,
    formData.name,
    formData.slNo,
    moduleId,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available (but only if not restoring from minimized)
  useEffect(() => {
    if (
      isEdit &&
      initialDataWithValue &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      console.log("Initializing with edit data:", initialDataWithValue);
      setFormData({
        ...initialDataWithValue,
      });

      setIsDefaultState(
        initialDataWithValue.isDefault ? labels.yes : labels.no
      );
      if (initialDataWithValue.isDraft) {
        setStatusState("Draft");
      } else {
        setStatusState("Active");
      }
    }
  }, [isEdit, labels, hasMinimizedData, isRestoredFromMinimized, moduleId]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    console.log("Form data changed:", newFormData);
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintSubCategory(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess(
        `${detectedModule} ${isEdit ? "updated" : "created"} successfully!`
      );
      handleReset();
    } else {
      toastSuccess(
        `${detectedModule} ${isEdit ? "updated" : "created"} successfully!`
      );
      navigate(`/${detectedModule}`);
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      ...initialProperties,
      isDefault: false,
      isDraft: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState(labels.no);
    setStatusState("Active");
    setSelectedAction("");
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Reset form data using the custom hook
    if (hasMinimizedData) {
      try {
        await resetModuleData(moduleId);
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current[fieldKeys[0]]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintSubCategory = (subcategoryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${detectedModule} Details`,
        data: [subcategoryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ...printConfigFieldLabels,
          isDefault: labels.default,
          isDraft: labels.draft,
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
          draftedAt: "Drafted At",
          deletedAt: "Deleted At",
        },
      });
      printHtmlContent(html);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when printing");
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title={`${detectedModule} Details`}
          subtitle={`${detectedModule} Information`}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${detectedModule}-details.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: "Create",
      icon: <Plus className="w-5 h-5 text-green-500" />,
      onClick: () => {
        navigate(`/${detectedModule}/create`);
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate(`/${detectedModule}/view`);
      },
      show: canView,
    },
  ]);

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      if (!formData.isDraft) {
        return [
          ...filteredOptions,
          {
            label: labels.draft || "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore(`${detectedModule} saved as draft successfully`);
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, labels, canCreate, detectedModule]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): any => {
    return {
      ...formData,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={`Edit ${detectedModule}`}
        moduleRoute={`/${detectedModule}/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title={`Editing ${detectedModule}`}
        listPath="sub-category"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="edit"
        module={detectedModule}
        additionalFooterButtons={
          <div className="flex gap-4 max-[435px]:gap-2">
            <Button
              variant="outline"
              className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
              onClick={handleResetClick}
            >
              {labels.reset}
            </Button>
            <Button
              variant="outline"
              className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
              onClick={handleSubmit}
            >
              {labels.submit}
            </Button>
          </div>
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Dynamic form fields in responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              {formFields.map((field) => {
                if (
                  !permissionsFieldLevel[
                    field.name as keyof typeof permissionsFieldLevel
                  ]
                ) {
                  return null; // skip if not allowed
                }

                if (field.component === "input") {
                  return (
                    <div key={field.name} className="md:col-span-3 space-y-2">
                      <EditableInput
                        setRef={setRef(field.name)}
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onNext={() =>
                          field.nextFocus && focusNextInput(field.nextFocus)
                        }
                        onCancel={() =>
                          setFormData({ ...formData, [field.name]: "" })
                        }
                        labelText={field.label}
                        tooltipText={field.tooltip}
                        required={field.required}
                      />
                    </div>
                  );
                }

                if (field.component === "autocomplete") {
                  return (
                    <div key={field.name} className="md:col-span-3 space-y-2">
                      <Autocomplete
                        ref={(el: any) => setRef(field.name)(el)}
                        id={field.name}
                        name={field.name}
                        allowCustomInput={true}
                        options={field.options || []}
                        value={formData[field.name]}
                        onValueChange={(value: string) => {
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: value,
                          }));
                          if (field.nextFocus) focusNextInput(field.nextFocus);
                        }}
                        isShowTemplateIcon={false}
                        onEnterPress={() => {
                          if (formData[field.name] && field.nextFocus) {
                            focusNextInput(field.nextFocus);
                          }
                        }}
                        placeholder=""
                        labelText={field.label}
                        className="relative"
                        styles={{
                          input: {
                            borderColor: "var(--primary)",
                            "&:focus": {
                              borderColor: "var(--primary)",
                            },
                          },
                        }}
                        tooltipText={field.tooltip}
                      />
                    </div>
                  );
                }

                if (field.component === "mutiselect") {
                  return (
                    <div key={field.name} className="md:col-span-3 space-y-2">
                      <FloatingMultiSelect
                        label={field.label}
                        data={field.options || []}
                        value={
                          formData[field.name]
                            ? (formData[field.name] as string)
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean)
                            : []
                        }
                        onChange={(value: string[]) => {
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: value.join(", "),
                          }));
                          if (field.nextFocus) focusNextInput(field.nextFocus);
                        }}
                      />
                    </div>
                  );
                }

                return null;
              })}

              {/* Default field - Updated to use SwitchSelect */}
              {permissionsFieldLevel.isDefault && (
                <div className="md:col-span-3 space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={[
                      {
                        label: labels.yes,
                        value: labels.yes,
                        date: "Set default",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === labels.yes
                        : value === labels.yes;
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                      focusNextInput("status");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("status");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.default}
                    tooltipText="Set as default subcategory"
                    className="relative"
                  />
                </div>
              )}

              {/* Status field - Updated to use SwitchSelect */}
              {permissionsFieldLevel.isDraft && (
                <div className="md:col-span-3 space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    labelText="Status"
                    multiSelect={false}
                    options={[
                      {
                        label: "Active",
                        value: "Active",
                        date: "Set active",
                      },
                      {
                        label: "Draft",
                        value: "Draft",
                        date: "Set draft",
                      },
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set delete",
                      },
                    ]}
                    value={statusState}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      console.log("switch value", stringValue);
                      setStatusState(stringValue);

                      // Update your form data
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: stringValue === "Draft",
                      }));
                    }}
                    placeholder=""
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                    tooltipText="Subcategory status"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="md:col-span-3 space-y-2">
                <ActionsAutocomplete
                  ref={(el: any) => setRef("actions")(el)}
                  id="actions"
                  name="actions"
                  labelText="Action"
                  value={selectedAction}
                  actions={[
                    {
                      action: "Created",
                      user: "Karim",
                      role: "Super User",
                      date: "06 Aug 2025",
                      value: "created",
                    },
                    {
                      action: "Updated",
                      user: "Rahim",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "updated",
                    },
                    {
                      action: "Drafted",
                      user: "Karim",
                      role: "Super User",
                      date: "07 Aug 2025",
                      value: "drafted",
                    },
                    {
                      action: "Deleted",
                      user: "Abdullah",
                      role: "Super Admin",
                      date: "09 Aug 2025",
                      value: "deleted",
                    },
                  ]}
                  placeholder=""
                  onValueChange={(value: string) => {
                    setSelectedAction(value);
                    console.log("Selected action:", value);
                  }}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText={`${detectedModule} Action`}
                />
              </div>
            </div>
          </form>
        </div>
      </MinimizablePageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
      />

      {/* Options Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Options"
        size="xl"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="pt-5 pb-14 px-5">Modal Content</div>
      </Modal>
    </>
  );
}
