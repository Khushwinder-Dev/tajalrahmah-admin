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
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
// import type { SubCategoryFormData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useSubCategoryFormData } from "@/hooks/useModuleFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { TemplateContent } from "@/components/common/TemplateContent";
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

export default function SubCategoryCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useSubCategoryFormData();

  const [showTemplates, setShowTemplates] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [statusState, setStatusState] = useState<"Active" | "Draft" | string>(
    "Active"
  );
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  const detectedModule = getModuleFromPath(location.pathname);

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

  // Form state
  const [formData, setFormData] = useState<ModuleCreateEditPageTypes>({
    ...initialProperties,
    isDefault: false,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Simplified restore logic using the custom hook
  useEffect(() => {
    // Auto-restore if:
    // 1. Has minimized data
    // 2. Haven't already restored
    // 3. Current form is empty (to avoid overwriting user input)
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData &&
      !isRestoredFromMinimized &&
      !formData.name &&
      !formData.slNo;

    if (shouldAutoRestore) {
      // Restore all the data
      setFormData({
        ...(moduleData as any),
        isDraft: (moduleData as any)?.isDraft || false,
      });

      setIsDefaultState(moduleData.isDefault ? "Yes" : "No");
      setStatusState(moduleData.isDraft ? "Draft" : "Active");

      setIsRestoredFromMinimized(true);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition("subcategory-form-module");
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    formData.name,
    formData.slNo,
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
      setFormData({
        ...initialDataWithValue,
      });
      setIsDefaultState(initialDataWithValue.isDefault ? "Yes" : "No");
      setStatusState(initialDataWithValue.isDraft ? "Draft" : "Active");
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized]);

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate(`/${detectedModule}/create`);
        } else {
          navigate(`/${detectedModule}/edit/undefined`);
        }
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

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

  const handleResetClick = () => {
    setIsResetModalOpen(true);
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
    setIsDefaultState("No");
    setStatusState("Active");
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Reset module data using the custom hook
    if (hasMinimizedData) {
      try {
        await resetModuleData("subcategory-form-module");
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

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      // Filter out any existing draft option first
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      // Add draft option only if not already a draft
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
  }, [formData.isDraft, canCreate, detectedModule, labels]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): any => {
    return {
      ...formData,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="subcategory-form-module"
        moduleName={
          isEdit ? `Edit ${detectedModule}` : `Adding ${detectedModule}`
        }
        moduleRoute={
          isEdit
            ? `/${detectedModule}/edit/${formData.slNo || "new"}`
            : `/${detectedModule}/create`
        }
        onMinimize={handleMinimize}
        title={
          isEdit ? `Editing ${detectedModule}` : `Creating ${detectedModule}`
        }
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
        activePage={isEdit ? "edit" : "create"}
        module={detectedModule}
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90! bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                {labels.reset}
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
              >
                {labels.submit}
              </Button>
            </div>
          ) : null
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6 relative"
          >
            {/* Dynamic form fields in responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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
                    <div key={field.name} className="space-y-2">
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
                    <div key={field.name} className="space-y-2">
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
                        onEnterPress={() => {
                          if (formData[field.name] && field.nextFocus) {
                            focusNextInput(field.nextFocus);
                          }
                        }}
                        placeholder=" "
                        labelText={field.label}
                        className="relative"
                        tooltipText={field.tooltip}
                        userLang={isRTL ? "ar" : "en"}
                        styles={{
                          input: {
                            borderColor: "var(--primary)",
                            "&:focus": {
                              borderColor: "var(--primary)",
                            },
                          },
                        }}
                        setShowTemplates={setShowTemplates}
                        showTemplates={showTemplates}
                        isShowTemplateIcon={field.showTemplate || false}
                      />
                    </div>
                  );
                }

                if (field.component === "mutiselect") {
                  return (
                    <div key={field.name} className="space-y-2">
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
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
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
                    className="relative"
                    tooltipText="Set as default subcategory"
                  />
                </div>
              )}

              {/* Status field - Updated to use SwitchSelect */}
              {permissionsFieldLevel.isDraft && (
                <div className="space-y-2 relative">
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
                      { label: "Draft", value: "Draft", date: "Set draft" },
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

      {/* Templates Modal */}
      <Modal
        opened={showTemplates}
        onClose={() => setShowTemplates(false)}
        size="xl"
        radius={20}
        overlayProps={{ backgroundOpacity: 0.25, blur: 1 }}
        withCloseButton={false}
        centered
      >
        <TemplateContent
          headers={[
            { key: "name", label: "Name" },
            { key: "groups", label: "Groups" },
            { key: "categories", label: "Categories" },
          ]}
          data={[
            {
              name: "Electronics",
              groups: "Technology",
              categories: "Gadgets",
            },
            { name: "Clothing", groups: "Fashion", categories: "Apparel" },
            { name: "Books", groups: "Education", categories: "Literature" },
            { name: "Sports", groups: "Fitness", categories: "Equipment" },
            {
              name: "Beauty",
              groups: "Personal Care",
              categories: "Cosmetics",
            },
            {
              name: "Automotive",
              groups: "Transportation",
              categories: "Parts",
            },
          ]}
          onSelect={(selectedData: any) => {
            console.log("Selected:", selectedData);
            setShowTemplates(false);
            setFormData((prev) => ({
              ...prev,
              name: selectedData.name,
              groups: selectedData.groups,
              categories: selectedData.categories,
            }));
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
