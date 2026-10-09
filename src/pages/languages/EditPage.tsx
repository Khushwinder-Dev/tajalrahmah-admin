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
import { useNavigate, useParams } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import type { LanguageModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";

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

export default function LanguageEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL params
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `language-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<LanguageModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [statusState, setStatusState] = useState<
    "Active" | "Inactive" | "Delete" | string
  >("Active");
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [languageValues, setLanguageValues] = useState<Record<string, string>>(
    {}
  );
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);

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

  // Permission checks
  const canCreate: boolean = usePermission("languages", "create");
  const canView: boolean = usePermission("languages", "view");
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
        moduleData?.formData &&
        !isRestoredFromMinimized &&
        !formData.language &&
        !formData.code);

    if (hasMinimizedData && moduleData?.formData && shouldAutoRestore) {
      console.log("Found restored module and should restore:", moduleData);

      // Restore form data
      setFormData(moduleData.formData);

      // Restore language values
      if (moduleData.languageValues) {
        setLanguageValues(moduleData.languageValues);
      }

      // Restore UI states based on form data
      setIsDefaultState(moduleData.formData.default ? "Yes" : "No");
      if (moduleData.formData.isDeleted) {
        setStatusState("Delete");
      } else if (moduleData.formData.status === "inactive") {
        setStatusState("Inactive");
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
    formData.language,
    formData.code,
    moduleId,
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
      console.log("Initializing with edit data:", initialData);
      setFormData({
        ...initialData,
      });

      // Initialize language values if they exist
      setLanguageValues({
        ar: initialData.language_ar || "",
        hi: initialData.language_hi || "",
        ur: initialData.language_ur || "",
        bn: initialData.language_bn || "",
      });

      setIsDefaultState(initialData.default ? labels.yes : labels.no);
      if (initialData.isDeleted) {
        setStatusState("Delete");
      } else if (initialData.status === "inactive") {
        setStatusState("Inactive");
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
      handlePrintLanguage(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Language updated successfully!");
      handleReset();
    } else {
      toastSuccess("Language updated successfully!");
      navigate("/languages");
    }
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
    setIsDefaultState(labels.no);
    setStatusState("Active");
    setSelectedAction("");
    setLanguageValues({});
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
      inputRefs.current["seq"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintLanguage = (languageData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Language Details",
        data: [languageData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          seq: labels.sequence,
          code: labels.code,
          language: labels.language,
          default: labels.defaultLanguage,
          status: labels.status,
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
    console.log("Export PDF clicked");
    try {
      console.log("languageData on pdf click", formData);
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

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: "Create",
      icon: <Plus className="w-5 h-5 text-green-500" />,
      onClick: () => {
        navigate("/languages/create");
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

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      if (formData.status !== "inactive") {
        return [
          ...filteredOptions,
          {
            label: labels.draft || "Draft",
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
  }, [formData.status, labels, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): LanguageModuleData => {
    console.log("Minimizing edit page with data:", {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      languageValues,
    });

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
        moduleId={moduleId}
        moduleName={`Edit Language`}
        moduleRoute={`/languages/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title={labels.editingLanguage}
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
        activePage="edit"
        module="languages"
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
            {/* First Row: Sequence, Code, Language Name, Default */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              {/* Sequence field */}
              <div className="md:col-span-3 space-y-2">
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

              {/* Language Code field */}
              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("code")(el)}
                  id="code"
                  name="code"
                  allowCustomInput={true}
                  options={languageCodes}
                  value={formData.code}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, code: value });
                    focusNextInput("language");
                  }}
                  isShowTemplateIcon={false}
                  onEnterPress={() => {
                    if (formData.code) {
                      focusNextInput("language");
                    }
                  }}
                  placeholder=""
                  labelText={labels.code}
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText={labels.languageCodeTooltip}
                />
              </div>

              {/* Language Name field */}
              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("language")}
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, language: "" })}
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

              {/* Default field - Updated to use SwitchSelect */}
              <div className="md:col-span-3 space-y-2">
                <SwitchSelect
                  ref={(el: any) => setRef("isDefault")(el)}
                  id="isDefault"
                  name="isDefault"
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
                  tooltipText={labels.defaultLanguageTooltip}
                  className="relative"
                />
              </div>

              {/* Status field - Updated to use SwitchSelect */}
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
                      date: "Set active language",
                    },
                    {
                      label: "Inactive",
                      value: "Inactive",
                      date: "Set inactive language",
                    },
                    {
                      label: "Delete",
                      value: "Delete",
                      date: "Set delete language",
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
                      isDeleted: stringValue === "Delete",
                      status: stringValue === "Active" ? "active" : "inactive",
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
                      action: "Inactive",
                      user: "Rahim",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "inactive",
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
                  tooltipText="Language Action"
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
