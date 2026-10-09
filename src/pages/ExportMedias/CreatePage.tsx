/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import type { ExportMediaModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useExportMediaFormData } from "@/hooks/useModuleFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { TemplateContent } from "@/components/common/TemplateContent";

type ExportMediaData = {
  code: string;
  name: string;
  isDefault: boolean;
  isStatusActive: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
  name_ar?: string;
  name_hi?: string;
  name_ur?: string;
  name_bn?: string;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ExportMediaData = {
  code: "PDF",
  name: "PDF Document",
  isDefault: false,
  isStatusActive: true,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function ExportMediaFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useExportMediaFormData();

  const [showTemplates, setShowTemplates] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [statusState, setStatusState] = useState<"Active" | "Draft" | string>(
    "Active"
  );
  const [isStatusActive] = useState<boolean>(true);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [exportMediaLanguageValues, setExportMediaLanguageValues] = useState<
    Record<string, string>
  >({});
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  // Permission checks
  const canCreate: boolean = usePermission("exportMedias", "create");
  const canPdf: boolean = usePermission("exportMedias", "pdf");
  const canPrint: boolean = usePermission("exportMedias", "print");

  // Field-level permissions
  const exportMediaName: boolean = usePermission(
    "exportMedias",
    "create",
    "name"
  );
  const exportMediaCode: boolean = usePermission(
    "exportMedias",
    "create",
    "code"
  );
  const isDefault: boolean = usePermission(
    "exportMedias",
    "create",
    "isDefault"
  );

  // Export media codes for autocomplete
  const exportMediaCodes = [
    "PDF",
    "EXCEL",
    "CSV",
    "JSON",
    "XML",
    "WORD",
    "HTML",
    "TXT",
    "ZIP",
    "SQL",
  ];

  // Form state
  const [formData, setFormData] = useState<ExportMediaData>({
    code: "",
    name: "",
    isDefault: false,
    isStatusActive: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
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
      !formData.name &&
      !formData.code;

    if (shouldAutoRestore) {
      const savedFormData = moduleData.formData;

      setFormData({
        ...(savedFormData as any),
        isStatusActive:
          (savedFormData as any)?.isStatusActive !== undefined
            ? (savedFormData as any).isStatusActive
            : true,
      });

      if (moduleData.exportMediaLanguageValues) {
        setExportMediaLanguageValues(moduleData.exportMediaLanguageValues);
      }

      setIsDefaultState(savedFormData.isDefault ? "Yes" : "No");
      setStatusState(savedFormData.isActive ? "Active" : "Draft");
      setIsRestoredFromMinimized(true);

      const scrollPosition = getModuleScrollPosition(
        "export-media-form-module"
      );
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
    formData.code,
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
      setFormData({
        ...initialData,
      });
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setStatusState(initialData.isActive ? "Active" : "Draft");
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized]);

  // Focus management
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
      handlePrintExportMedia(formData);
    }

    if (keepCreating) {
      toastSuccess("Export media created successfully!");
      handleReset();
    } else {
      toastSuccess("Export media created successfully!");
      navigate("/export-medias");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handleReset = async () => {
    setFormData({
      code: "",
      name: "",
      isDefault: false,
      isStatusActive: true,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });

    setIsDefaultState("No");
    setStatusState("Active");
    setExportMediaLanguageValues({});
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData("export-media-form-module");
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  const handlePrintExportMedia = (exportMediaData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Export Media Details",
        data: [exportMediaData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Export Media Code",
          name: "Export Media Name",
          isDefault: "Default Export Media",
          isActive: "Active Status",
          isDraft: "Draft Status",
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
          title="Export Media Details"
          subtitle="Export Media Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "export-media-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleMinimize = useCallback((): ExportMediaModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      exportMediaLanguageValues,
    };
  }, [formData, exportMediaLanguageValues]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="export-media-form-module"
        moduleName={isEdit ? "Edit Export Media" : "Adding Export Media"}
        moduleRoute={
          isEdit
            ? `/export-medias/edit/${formData.code || "new"}`
            : "/export-medias/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Editing Export Media" : "Adding Export Media"}
        listPath="export-medias"
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        module="exportMedias"
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
            {/* First Row: Code, Name, Default */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 relative">
              {/* Code field */}
              {exportMediaCode && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("code")(el)}
                    id="code"
                    name="code"
                    allowCustomInput={true}
                    options={exportMediaCodes}
                    value={formData.code}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, code: value });
                      if (value) {
                        focusNextInput("name");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.code) {
                        focusNextInput("name");
                      }
                    }}
                    placeholder=" "
                    labelText="Code"
                    className="relative"
                    tooltipText="Enter export media code"
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

              {/* Name field */}
              {exportMediaName && (
                <div className="space-y-2">
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
                      tooltipText="Enter export media name"
                      required
                    />

                    {/* Language Input Dropdown */}
                    <LanguageInputDropdown
                      onSubmit={(values) => {
                        setExportMediaLanguageValues(values);
                        console.log("Export media translations:", values);
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
                      title="Export Media Name"
                      initialValues={exportMediaLanguageValues}
                    />
                  </div>
                </div>
              )}

              {/* Default field */}
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
                        date: "Set default export media",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default export media",
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
                    tooltipText="Set as default export media"
                  />
                </div>
              )}
            </div>

            {/* Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
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
            { code: "PDF", name: "PDF Document" },
            { code: "EXCEL", name: "Excel Spreadsheet" },
            { code: "CSV", name: "CSV File" },
            { code: "JSON", name: "JSON Data" },
            { code: "XML", name: "XML Document" },
            { code: "WORD", name: "Word Document" },
            { code: "HTML", name: "HTML Page" },
            { code: "TXT", name: "Text File" },
          ]}
          onSelect={(selectedData: any) => {
            console.log("Selected:", selectedData);
            setShowTemplates(false);
            setFormData((prev) => ({
              ...prev,
              code: selectedData.code,
              name: selectedData.name,
            }));
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
