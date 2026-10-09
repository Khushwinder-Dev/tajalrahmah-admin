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
import type { TicketModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useTicketFormData } from "@/hooks/useModuleFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ImageUploader } from "@/components/common/ImageUploader";
import { TemplateContent } from "@/components/common/TemplateContent";
import { getModuleFromPath } from "@/lib/utils";
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

export default function TicketsCreatePage({ isEdit = false }: Props) {
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
  } = useTicketFormData();

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
  const [ticketLanguageValues, setTicketLanguageValues] = useState<
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

      if (moduleData.ticketLanguageValues) {
        setTicketLanguageValues(moduleData.ticketLanguageValues);
      }

      setIsDefaultState(savedFormData.isDefault ? "Yes" : "No");
      setStatusState(savedFormData.isDraft ? "Draft" : "Active");
      setIsRestoredFromMinimized(true);

      const scrollPosition = getModuleScrollPosition("ticket-form-module");
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
      handlePrintTicket(formData);
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
    setTicketLanguageValues({});
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData("ticket-form-module");
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current[fieldKeys[0]]?.focus();
    }, 100);
  };

  const handlePrintTicket = (ticketData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${detectedModule} Details`,
        data: [ticketData],
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
  const handleMinimize = useCallback((): TicketModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      ticketLanguageValues,
    };
  }, [formData, ticketLanguageValues]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="ticket-form-module"
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
            {/* Dynamic Fields Grid - Rows 1 & 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {formFields.map((field, index) => {
                if (
                  !permissionsFieldLevel[
                    field.name as keyof typeof permissionsFieldLevel
                  ]
                ) {
                  return null;
                }

                // Skip predefinedReply, description, and tags - they will be rendered separately
                if (
                  (field.component === "mutiselect" &&
                    field.name === "predefinedReply") ||
                  field.name === "description" ||
                  field.name === "tags"
                ) {
                  return null;
                }

                if (field.component === "input") {
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
                              setTicketLanguageValues(values);
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
                            initialValues={ticketLanguageValues}
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
                        isShowTemplateIcon={index === 0} // Show template icon only for first field
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
                        onChange={(selectedOptions) => {
                          const selectedValues = selectedOptions.map(
                            (o) => o.value
                          );

                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: selectedValues.join(", "),
                          }));

                          if (field.nextFocus) focusNextInput(field.nextFocus);
                        }}
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* Row 3: Description, Tags, and Predefined Reply */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Description - First Column */}
              {(() => {
                const descriptionField = formFields.find(
                  (field) => field.name === "description"
                );
                if (
                  !descriptionField ||
                  !permissionsFieldLevel[
                    descriptionField.name as keyof typeof permissionsFieldLevel
                  ]
                ) {
                  return <div></div>; // Empty column placeholder
                }

                if (descriptionField.component === "input") {
                  return (
                    <div key="description" className="space-y-2">
                      <EditableInput
                        setRef={setRef("description")}
                        type={descriptionField.type}
                        id="description"
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        onNext={() =>
                          descriptionField.nextFocus &&
                          focusNextInput(descriptionField.nextFocus)
                        }
                        onCancel={() =>
                          setFormData({ ...formData, description: "" })
                        }
                        labelText={descriptionField.label}
                        tooltipText={descriptionField.tooltip}
                        required={descriptionField.required}
                      />
                    </div>
                  );
                }
                return <div></div>;
              })()}

              {/* Tags - Second Column */}
              {(() => {
                const tagsField = formFields.find(
                  (field) => field.name === "tags"
                );
                if (
                  !tagsField ||
                  !permissionsFieldLevel[
                    tagsField.name as keyof typeof permissionsFieldLevel
                  ]
                ) {
                  return <div></div>; // Empty column placeholder
                }

                if (tagsField.component === "mutiselect") {
                  return (
                    <div key="tags" className="space-y-2 relative">
                      <FloatingMultiSelect
                        label={tagsField.label}
                        data={tagsField.options || []}
                        value={
                          formData.tags
                            ? (formData.tags as string)
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean)
                            : []
                        }
                        onChange={(selectedOptions) => {
                          const selectedValues = selectedOptions.map(
                            (o) => o.value
                          );

                          setFormData((prev) => ({
                            ...prev,
                            tags: selectedValues.join(", "),
                          }));

                          if (tagsField.nextFocus)
                            focusNextInput(tagsField.nextFocus);
                        }}
                      />
                    </div>
                  );
                }
                return <div></div>;
              })()}

              {/* Predefined Reply - Takes 2 Columns (3rd and 4th) */}
              {(() => {
                const predefinedReplyField = formFields.find(
                  (field) =>
                    field.component === "mutiselect" &&
                    field.name === "predefinedReply"
                );

                if (
                  !predefinedReplyField ||
                  !permissionsFieldLevel[
                    predefinedReplyField.name as keyof typeof permissionsFieldLevel
                  ]
                ) {
                  return (
                    <>
                      <div></div> {/* Empty 3rd column */}
                      <div></div> {/* Empty 4th column */}
                    </>
                  );
                }

                return (
                  <div
                    key="predefinedReply"
                    className="md:col-span-2 space-y-2 relative"
                  >
                    <FloatingMultiSelect
                      label={predefinedReplyField.label}
                      data={predefinedReplyField.options || []}
                      value={
                        formData[predefinedReplyField.name]
                          ? (formData[predefinedReplyField.name] as string)
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                          : []
                      }
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map(
                          (o) => o.value
                        );

                        setFormData((prev) => ({
                          ...prev,
                          [predefinedReplyField.name]:
                            selectedValues.join(", "),
                        }));

                        if (predefinedReplyField.nextFocus) {
                          focusNextInput(predefinedReplyField.nextFocus);
                        }
                      }}
                    />
                  </div>
                );
              })()}
            </div>

            {/* Row 4: Default and Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Default field - First Column */}
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

              {/* Status Field - Second Column */}
              {permissionsFieldLevel.isDraft && (
                <div className="space-y-2">
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

              {/* Empty columns for spacing */}
              <div></div>
              <div></div>
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
            { [fieldKeys[0]]: "Sample 1", [fieldKeys[1]]: "Value 1" },
            { [fieldKeys[0]]: "Sample 2", [fieldKeys[1]]: "Value 2" },
            { [fieldKeys[0]]: "Sample 3", [fieldKeys[1]]: "Value 3" },
            { [fieldKeys[0]]: "Sample 4", [fieldKeys[1]]: "Value 4" },
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
