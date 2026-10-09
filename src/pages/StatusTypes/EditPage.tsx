/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Autocomplete } from "@/components/common/Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import type { DocumentTypeModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";

type DocumentTypeData = {
  code: string;
  name: string;
  name_ar?: string;
  name_hi?: string;
  name_ur?: string;
  name_bn?: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: DocumentTypeData = {
  code: "PASS",
  name: "Passport",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function DocumentTypeEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `document-type-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<DocumentTypeModuleData>(moduleId);

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
  const [documentTypeLanguageValues, setDocumentTypeLanguageValues] = useState<
    Record<string, string>
  >({});
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);
  const [isStatusActive] = useState<boolean>(true);

  // Form state
  const [formData, setFormData] = useState<DocumentTypeData>({
    code: "",
    name: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Get permissions
  const canPdf: boolean = usePermission("documentTypes", "pdf");
  const canPrint: boolean = usePermission("documentTypes", "print");

  // Document type codes for autocomplete
  const documentTypeCodes = [
    "PASS",
    "DL",
    "NID",
    "BC",
    "SSN",
    "VISA",
    "WP",
    "RC",
  ];

  // Focus management
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

    const shouldAutoRestore =
      shouldRestoreFromMinimized ||
      (hasMinimizedData &&
        moduleData?.formData &&
        !isRestoredFromMinimized &&
        !formData.name &&
        !formData.code);

    if (hasMinimizedData && moduleData?.formData && shouldAutoRestore) {
      console.log("Found restored module and should restore:", moduleData);
      console.log("Restoring form data:", moduleData.formData);

      setFormData(moduleData.formData);

      if (moduleData.documentTypeLanguageValues) {
        setDocumentTypeLanguageValues(moduleData.documentTypeLanguageValues);
      }

      setIsDefaultState(moduleData.formData.isDefault ? "Yes" : "No");
      if (moduleData.formData.isDeleted) {
        setStatusState("Delete");
      } else if (moduleData.formData.isDraft) {
        setStatusState("Draft");
      } else {
        setStatusState("Active");
      }

      setIsRestoredFromMinimized(true);
      setShouldRestoreFromMinimized(false);

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
    formData.code,
    moduleId,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available
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

      setDocumentTypeLanguageValues({
        ar: initialData.name_ar || "",
        hi: initialData.name_hi || "",
        ur: initialData.name_ur || "",
        bn: initialData.name_bn || "",
      });
      setIsDefaultState(initialData.isDefault ? labels.yes : labels.no);
      if (initialData.isDeleted) {
        setStatusState("Delete");
      } else if (initialData.isDraft) {
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
      handlePrintDocumentType(formData);
    }

    if (keepCreating) {
      toastSuccess("Document type updated successfully!");
      handleReset();
    } else {
      toastSuccess("Document type updated successfully!");
      navigate("/document-types");
    }
  };

  const handleReset = async () => {
    setFormData({
      code: "",
      name: "",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });

    setIsDefaultState(labels.no);
    setStatusState("Active");
    setSelectedAction("");
    setDocumentTypeLanguageValues({});
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData(moduleId);
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintDocumentType = (documentTypeData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Document Type Details",
        data: [documentTypeData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          name: "Name",
          isDefault: labels.default,
          isActive: "Active Status",
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
      console.log("documentTypeData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Document Type Details"
          subtitle="Document Type Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document-type-details.pdf";
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
        navigate("/document-types/create");
      },
      show: true,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/document-types/view");
      },
      show: true,
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
            label: labels.draft,
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("Document type saved as draft successfully");
            },
            show: true,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, labels]);

  const handleMinimize = useCallback((): DocumentTypeModuleData => {
    console.log("Minimizing edit page with data:", {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      documentTypeLanguageValues,
    });

    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      documentTypeLanguageValues,
    };
  }, [formData, documentTypeLanguageValues]);

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={`Edit Document Type`}
        moduleRoute={`/document-types/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Editing Document Type"
        listPath="status-types"
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
            {/* First Row: Code, Name, Default */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("code")(el)}
                  id="code"
                  name="code"
                  allowCustomInput={true}
                  options={documentTypeCodes}
                  value={formData.code}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, code: value });
                    focusNextInput("name");
                  }}
                  isShowTemplateIcon={false}
                  onEnterPress={() => {
                    if (formData.code) {
                      focusNextInput("name");
                    }
                  }}
                  placeholder=""
                  labelText="Code"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Enter document type code"
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText="Name"
                    tooltipText="Enter document type name"
                    required
                  />

                  <LanguageInputDropdown
                    onSubmit={(values) => {
                      setDocumentTypeLanguageValues(values);
                      console.log("Document type translations:", values);
                      setFormData((prev) => ({
                        ...prev,
                        name_ar: values.ar || "",
                        name_hi: values.hi || "",
                        name_ur: values.ur || "",
                        name_bn: values.bn || "",
                      }));
                      setTimeout(() => {
                        focusNextInput("isDefault");
                      }, 100);
                    }}
                    title="Document Type Name"
                    initialValues={documentTypeLanguageValues}
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <SwitchSelect
                  ref={(el: any) => setRef("isDefault")(el)}
                  id="isDefault"
                  name="isDefault"
                  options={[
                    {
                      label: labels.yes,
                      value: labels.yes,
                      date: "Set default document type",
                    },
                    {
                      label: labels.no,
                      value: labels.no,
                      date: "Remove default document type",
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
                  tooltipText="Set as default document type"
                  className="relative"
                />
              </div>

              {isStatusActive && (
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
                        date: "Set active document type",
                      },
                      {
                        label: "InActive",
                        value: "InActive",
                        date: "Set inactive document type",
                      },
                      {
                        label: "Draft",
                        value: "Draft",
                        date: "Set draft document type",
                      },
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set delete document type",
                      },
                    ]}
                    value={statusState}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      console.log("switch value", stringValue);
                      setStatusState(stringValue);

                      setFormData((prev) => ({
                        ...prev,
                        isDeleted: stringValue === "Delete",
                        isDraft: stringValue === "Draft",
                        isActive: stringValue === "Active",
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
                  tooltipText="Document Type Action"
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
