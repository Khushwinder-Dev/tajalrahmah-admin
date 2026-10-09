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
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useLanguageFormData } from "@/hooks/useLanguageFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { TemplateContent } from "@/components/common/TemplateContent";

type LanguageData = {
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
};

type Props = {
  isEdit?: boolean;
};

const initialData: LanguageData = {
  seq: 1,
  code: "en",
  language: "English",
  default: true,
  status: "active",
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export default function LanguageFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useLanguageFormData();

  const [showTemplates, setShowTemplates] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [statusState, setStatusState] = useState<
    "Active" | "Inactive" | string
  >("Active");
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [languageValues, setLanguageValues] = useState<Record<string, string>>(
    {}
  );
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  // Permission checks
  const canCreate: boolean = usePermission("languages", "create");
  const canView: boolean = usePermission("languages", "view");

  // Field-level permissions
  const seq: boolean = usePermission("languages", "create", "seq");
  const languageCode: boolean = usePermission("languages", "create", "code");
  const languageName: boolean = usePermission(
    "languages",
    "create",
    "language"
  );
  const isDefault: boolean = usePermission("languages", "create", "default");
  const isActive: boolean = usePermission("languages", "create", "status");
  const canPdf: boolean = usePermission("languages", "pdf");
  const canPrint: boolean = usePermission("languages", "print");

  // Language codes for autocomplete
  const languageCodes = [
    "en",
    "es",
    "fr",
    "de",
    "it",
    "pt",
    "ru",
    "zh",
    "ja",
    "ko",
    "ar",
    "hi",
    "ur",
    "bn",
  ];

  // Form state
  const [formData, setFormData] = useState<LanguageData>({
    seq: 1,
    code: "",
    language: "",
    default: false,
    status: "active",
    isDeleted: false,
    createdAt: null,
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
      moduleData?.formData &&
      !isRestoredFromMinimized &&
      !formData.language &&
      !formData.code;

    if (shouldAutoRestore) {
      const savedFormData = moduleData.formData;

      // Restore all the data
      setFormData({
        ...(savedFormData as any),
        status: (savedFormData as any)?.status || "active",
      });

      if (moduleData.languageValues) {
        setLanguageValues(moduleData.languageValues);
      }

      setIsDefaultState(savedFormData.default ? "Yes" : "No");
      setStatusState(savedFormData.status === "active" ? "Active" : "Inactive");

      setIsRestoredFromMinimized(true);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition("language-form-module");
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
    formData.language,
    formData.code,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available (but only if not restoring from minimized)
  useEffect(() => {
    if (
      isEdit &&
      initialData &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      setFormData({
        ...initialData,
      });
      setIsDefaultState(initialData.default ? "Yes" : "No");
      setStatusState(initialData.status === "active" ? "Active" : "Inactive");
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
          navigate("/languages/create");
        } else {
          navigate("/languages/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/languages/view");
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
      handlePrintLanguage(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Language created successfully!");
      handleReset();
    } else {
      toastSuccess("Language created successfully!");
      navigate("/languages");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      seq: 1,
      code: "",
      language: "",
      default: false,
      status: "active",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");
    setStatusState("Active");
    setLanguageValues({});
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Reset module data using the custom hook
    if (hasMinimizedData) {
      try {
        await resetModuleData("language-form-module");
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["seq"]?.focus();
    }, 100);
  };

  const handlePrintLanguage = (languageData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Language Details",
        data: [languageData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          seq: "Sequence",
          code: "Language Code",
          language: "Language Name",
          default: "Default Language",
          status: "Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
          title="Language Details"
          subtitle="Language Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "languages-details.pdf";
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

      // Add draft option only if not already inactive
      if (formData.status !== "inactive") {
        return [
          ...filteredOptions,
          {
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                status: "inactive",
              }));
              toastRestore("Language saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.status, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): any => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      languageValues,
    };
  }, [formData, languageValues]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="language-form-module"
        moduleName={isEdit ? "Edit Language" : "Adding Language"}
        moduleRoute={
          isEdit
            ? `/languages/edit/${formData.code || "new"}`
            : "/languages/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? labels.editingLanguage : labels.addingLanguage}
        listPath="languages"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        module="languages"
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
            {/* First Row: Sequence, Code, Language Name, Default */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Sequence field */}
              {seq && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("seq")}
                    id="seq"
                    name="seq"
                    type="number"
                    value={formData.seq.toString()}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        seq: parseInt(e.target.value) || 1,
                      });
                      if (e.target.value) {
                        focusNextInput("code");
                      }
                    }}
                    onNext={() => focusNextInput("code")}
                    onCancel={() => setFormData({ ...formData, seq: 1 })}
                    labelText={labels.sequence}
                    tooltipText={labels.sequenceTooltip}
                    required
                  />
                </div>
              )}

              {/* Language Code field with Template Support */}
              {languageCode && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("code")(el)}
                    id="code"
                    name="code"
                    allowCustomInput={true}
                    options={languageCodes}
                    value={formData.code}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, code: value });
                      if (value) {
                        focusNextInput("language");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.code) {
                        focusNextInput("language");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.code}
                    className="relative"
                    tooltipText={labels.languageCodeTooltip}
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
                    isShowTemplateIcon={true}
                  />
                </div>
              )}

              {/* Language Name field */}
              {languageName && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("language")}
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      onNext={() => focusNextInput("isDefault")}
                      onCancel={() =>
                        setFormData({ ...formData, language: "" })
                      }
                      labelText={labels.language}
                      tooltipText={labels.languageNameTooltip}
                      required
                    />

                    {/* Language Input Dropdown */}
                    <LanguageInputDropdown
                      onSubmit={(values) => {
                        setLanguageValues(values);
                        console.log("Language translations:", values);
                        setFormData((prev) => ({
                          ...prev,
                          language_ar: values.ar || "",
                          language_hi: values.hi || "",
                          language_ur: values.ur || "",
                          language_bn: values.bn || "",
                        }));
                        setTimeout(() => {
                          focusNextInput("isDefault");
                        }, 100);
                      }}
                      title="Language Name"
                      initialValues={languageValues}
                    />
                  </div>
                </div>
              )}

              {/* Default field - Updated to use SwitchSelect like country */}
              {isDefault && (
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
                        date: "Set default language",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default language",
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
                        default: newValue,
                      }));
                      focusNextInput("status");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.default === true ||
                        formData.default === false
                      ) {
                        focusNextInput("status");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.defaultLanguage}
                    className="relative"
                    tooltipText={labels.defaultLanguageTooltip}
                  />
                </div>
              )}
            </div>

            {/* Second Row: Status */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {/* Status field - Updated to use SwitchSelect like country */}
              {isActive && (
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
                        label: "Inactive",
                        value: "Inactive",
                        date: "Set inactive",
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
                        status:
                          stringValue === "Active" ? "active" : "inactive",
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
                    tooltipText={labels.statusTooltip}
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
            { key: "code", label: "Code" },
            { key: "name", label: "Name" },
          ]}
          data={[
            { code: "en", name: "English" },
            { code: "es", name: "Spanish" },
            { code: "fr", name: "French" },
            { code: "de", name: "German" },
            { code: "it", name: "Italian" },
            { code: "pt", name: "Portuguese" },
            { code: "ru", name: "Russian" },
            { code: "zh", name: "Chinese" },
            { code: "ja", name: "Japanese" },
            { code: "ko", name: "Korean" },
            { code: "ar", name: "Arabic" },
            { code: "hi", name: "Hindi" },
            { code: "ur", name: "Urdu" },
            { code: "bn", name: "Bengali" },
          ]}
          onSelect={(selectedData: any) => {
            console.log("Selected:", selectedData);
            setShowTemplates(false);
            setFormData((prev) => ({
              ...prev,
              code: selectedData.code,
              language: selectedData.name,
            }));
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
