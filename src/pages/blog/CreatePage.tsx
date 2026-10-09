/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import type { BlogModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useBlogFormData } from "@/hooks/useModuleFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ImageUploader } from "@/components/common/ImageUploader";
import { TemplateContent } from "@/components/common/TemplateContent";
import { getModuleFromPath } from "@/lib/utils";
import { cn } from "@/lib/utils";
import EnglishDate from "@/components/EnglishDateInput";
import { Textarea } from "@mantine/core";
import {
  formFields,
  initialDataWithValue,
  initialProperties,
  printConfigFieldLabels,
  type ModuleCreateEditPageTypes,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";
import { FloatingMultiSelect } from "@/components/common/FloatingMultiSelect";

type Props = {
  isEdit?: boolean;
};

export default function BlogCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const detectedModule = getModuleFromPath(location.pathname);

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useBlogFormData();

  const [showTemplates, setShowTemplates] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [statusState, setStatusState] = useState<"Active" | "Draft" | string>(
    "Active"
  );
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [blogLanguageValues, setBlogLanguageValues] = useState<
    Record<string, string>
  >({});
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

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
    [...fieldKeys, "isDefault", "isDraft", "attachment"]
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
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData?.formData &&
      !isRestoredFromMinimized &&
      !formData[fieldKeys[0]] &&
      !formData[fieldKeys[1]];

    if (shouldAutoRestore) {
      const savedFormData = moduleData.formData;

      setFormData({
        ...(savedFormData as any),
        isDraft: (savedFormData as any)?.isDraft || false,
      });

      if (moduleData.blogLanguageValues) {
        setBlogLanguageValues(moduleData.blogLanguageValues);
      }

      setIsDefaultState(savedFormData.isDefault ? "Yes" : "No");
      setStatusState(savedFormData.isDraft ? "Draft" : "Active");
      setIsRestoredFromMinimized(true);

      const scrollPosition = getModuleScrollPosition("blog-form-module");
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
    formData,
    fieldKeys,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
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
      handlePrintBlog(formData);
    }

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
    setBlogLanguageValues({});
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData("blog-form-module");
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current[fieldKeys[0]]?.focus();
    }, 100);
  };

  const handlePrintBlog = (blogData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${detectedModule} Details`,
        data: [blogData],
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
  }, [formData.isDraft, canCreate, detectedModule, labels]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): BlogModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      blogLanguageValues,
    };
  }, [formData, blogLanguageValues]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="blog-form-module"
        moduleName={
          isEdit ? `Edit ${detectedModule}` : `Adding ${detectedModule}`
        }
        moduleRoute={
          isEdit
            ? `/${detectedModule}/edit/${formData[fieldKeys[0]] || "new"}`
            : `/${detectedModule}/create`
        }
        onMinimize={handleMinimize}
        title={
          isEdit ? `Editing ${detectedModule}` : `Creating ${detectedModule}`
        }
        listPath={detectedModule}
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
            {/* Dynamic Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {formFields.map((field, index) => {
                if (
                  !permissionsFieldLevel[
                    field.name as keyof typeof permissionsFieldLevel
                  ]
                ) {
                  return null;
                }

                // Skip textarea here - it will be rendered separately below
                if (field.component === "textarea") {
                  return null;
                }

                if (field.component === "input") {
                  // Handle date fields with EnglishDate component
                  if (field.type === "date") {
                    return (
                      <div key={field.name} className="space-y-2">
                        <EnglishDate
                          isDate={true}
                          calendarType="gregorian"
                          userLang="en"
                          rtl={false}
                          value={formData[field.name] || ""}
                          onChange={(date: string) =>
                            setFormData({ ...formData, [field.name]: date })
                          }
                          disabled={false}
                          labelText={field.label}
                          className={cn(
                            "transition-all",
                            "ring-1 ring-primary"
                          )}
                          isStartFocus={false}
                          setStartNextFocus={() => {
                            field.nextFocus && focusNextInput(field.nextFocus);
                          }}
                          isShowCalender={true}
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={field.name} className="space-y-2">
                      {/* Add language dropdown for the first text field */}
                      {index === 0 && field.type === "text" ? (
                        <div className="relative">
                          <EditableInput
                            setRef={setRef(field.name)}
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
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
                          <LanguageInputDropdown
                            onSubmit={(values) => {
                              setBlogLanguageValues(values);
                              console.log(
                                `${detectedModule} translations:`,
                                values
                              );
                              setFormData((prev) => ({
                                ...prev,
                                [`${field.name}_ar`]: values.ar || "",
                                [`${field.name}_hi`]: values.hi || "",
                                [`${field.name}_ur`]: values.ur || "",
                                [`${field.name}_bn`]: values.bn || "",
                              }));
                              setTimeout(() => {
                                field.nextFocus &&
                                  focusNextInput(field.nextFocus);
                              }, 100);
                            }}
                            title={field.label}
                            initialValues={blogLanguageValues}
                          />
                        </div>
                      ) : (
                        <EditableInput
                          setRef={setRef(field.name)}
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ""}
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
                      )}
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
                        value={formData[field.name] || ""}
                        onValueChange={(value: string | null) => {
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: value || "",
                          }));
                          if (field.nextFocus && value) {
                            focusNextInput(field.nextFocus);
                          }
                        }}
                        onEnterPress={() => {
                          if (formData[field.name] && field.nextFocus) {
                            focusNextInput(field.nextFocus);
                          }
                        }}
                        placeholder=""
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
                        isShowTemplateIcon={index === 0}
                      />
                    </div>
                  );
                }

                if (field.component === "mutiselect") {
                  return (
                    <div key={field.name} className="space-y-2 relative">
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

              {/* Default field */}
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
                    placeholder=""
                    labelText={labels.default}
                    className="relative"
                    tooltipText={`Set as default ${detectedModule}`}
                  />
                </div>
              )}
            </div>

            {/* Textarea Fields - Full Width Row */}
            {formFields
              .filter((field) => field.component === "textarea")
              .map((field) => {
                if (
                  !permissionsFieldLevel[
                    field.name as keyof typeof permissionsFieldLevel
                  ]
                ) {
                  return null;
                }

                return (
                  <div key={field.name} className="w-full my-8">
                    <div className="space-y-2">
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      <div className="relative">
                        <Textarea
                          ref={(el: any) => setRef(field.name)(el)}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                          className="min-h-[120px] w-full resize-y border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          rows={6}
                          required={field.required}
                        />
                        <LanguageInputDropdown
                          onSubmit={(values) => {
                            setBlogLanguageValues((prev) => ({
                              ...prev,
                              ...values,
                            }));
                            console.log(
                              `${detectedModule} ${field.name} translations:`,
                              values
                            );
                            setFormData((prev) => ({
                              ...prev,
                              [`${field.name}_ar`]: values.ar || "",
                              [`${field.name}_hi`]: values.hi || "",
                              [`${field.name}_ur`]: values.ur || "",
                              [`${field.name}_bn`]: values.bn || "",
                            }));
                            setTimeout(() => {
                              field.nextFocus &&
                                focusNextInput(field.nextFocus);
                            }, 100);
                          }}
                          title={field.label}
                          initialValues={blogLanguageValues}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* Status Field */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
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
                      { label: "Draft", value: "Draft", date: "Set draft" },
                    ]}
                    value={statusState}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      setStatusState(stringValue);

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
                    tooltipText={`${detectedModule} status`}
                  />
                </div>
              )}
            </div>

            {/* Image Upload */}
            {permissionsFieldLevel.attachment && (
              <ImageUploader
                onImageSelect={(file: any) => {
                  console.log("Selected:", file);
                  setFormData((prev) => ({
                    ...prev,
                    attachment: file,
                  }));
                }}
                existingImages={
                  formData.attachment ? [formData.attachment] : []
                }
              />
            )}
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
            { key: fieldKeys[0], label: formFields[0]?.label || "Field 1" },
            { key: fieldKeys[1], label: formFields[1]?.label || "Field 2" },
          ]}
          data={[
            { [fieldKeys[0]]: "Sample Blog 1", [fieldKeys[1]]: "Technology" },
            { [fieldKeys[0]]: "Sample Blog 2", [fieldKeys[1]]: "Business" },
            { [fieldKeys[0]]: "Sample Blog 3", [fieldKeys[1]]: "Lifestyle" },
            { [fieldKeys[0]]: "Sample Blog 4", [fieldKeys[1]]: "Education" },
          ]}
          onSelect={(selectedData: any) => {
            console.log("Selected:", selectedData);
            setShowTemplates(false);
            setFormData((prev) => ({
              ...prev,
              ...selectedData,
            }));
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
