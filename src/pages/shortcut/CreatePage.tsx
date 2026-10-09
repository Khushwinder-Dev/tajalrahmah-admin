/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColorsPermissions, usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";

type ShortcutData = {
  indexName: string;
  title: string;
  titleValue: string;
  fontAwesomeIcon: string;
  status: "active" | "inactive" | "draft";
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

const initialData: ShortcutData = {
  indexName: "Dashboard",
  title: "Dashboard",
  titleValue: "Main Dashboard",
  fontAwesomeIcon: "fas fa-tachometer-alt",
  status: "active",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function ShortcutFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");

  // Permission checks
  const { canCreate, canView } = useColorsPermissions();

  // Field-level permissions
  const indexName: boolean = usePermission("shortcut", "create", "indexName");
  const title: boolean = usePermission("shortcut", "create", "title");
  const titleValue: boolean = usePermission(
    "shortcut",
    "create",
    "titleValue"
  );
  const fontAwesomeIcon: boolean = usePermission(
    "shortcut",
    "create",
    "fontAwesomeIcon"
  );
  const status: boolean = usePermission("shortcut", "create", "status");
  const isDefault: boolean = usePermission("shortcut", "create", "isDefault");
  const canPdf: boolean = usePermission("shortcut", "pdf");
  const canPrint: boolean = usePermission("shortcut", "print");

  // Form state
  const [formData, setFormData] = useState<ShortcutData>({
    indexName: "",
    title: "",
    titleValue: "",
    fontAwesomeIcon: "",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
    }
  }, [isEdit]);

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
          navigate("/shortcut/create");
        } else {
          navigate("/shortcut/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/shortcut/view");
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
      handlePrintShortcut(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Shortcut created successfully!");
      handleReset();
    } else {
      toastSuccess("Shortcut created successfully!");
      navigate("/shortcut");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handleReset = async () => {
    setFormData({
      indexName: "",
      title: "",
      titleValue: "",
      fontAwesomeIcon: "",
      status: "active",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["indexName"]?.focus();
    }, 100);
  };

  const handlePrintShortcut = (shortcutData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Shortcut Details",
        data: [shortcutData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          indexName: "Index Name",
          title: "Title",
          titleValue: "Title Value",
          fontAwesomeIcon: "Font Awesome Icon",
          status: "Status",
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
          title="Shortcut Details"
          subtitle="Shortcut Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shortcut-details.pdf";
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
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("Shortcut saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler
  const handleMinimize = useCallback(() => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="shortcut-form-module"
        moduleName={isEdit ? "Edit Shortcut" : "Adding Shortcut"}
        moduleRoute={
          isEdit
            ? `/shortcut/edit/${formData.title || "new"}`
            : "/shortcut/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Shortcut" : "Add Shortcut"}
        listPath="shortcut"
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
        module="shortcut"
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
            {/* First Row: Index Name, Title, Title Value, Font Awesome Icon */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Index Name field - only show if user can create */}
              {indexName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("indexName")}
                    id="indexName"
                    name="indexName"
                    value={formData.indexName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("title")}
                    onCancel={() => setFormData({ ...formData, indexName: "" })}
                    labelText="Index Name"
                    tooltipText="Enter the shortcut index name"
                    required
                  />
                </div>
              )}

              {/* Title field - only show if user can create */}
              {title && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("title")}
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onNext={() => focusNextInput("titleValue")}
                    onCancel={() => setFormData({ ...formData, title: "" })}
                    labelText="Title"
                    tooltipText="Enter the shortcut title"
                    required
                  />
                </div>
              )}

              {/* Title Value field - only show if user can create */}
              {titleValue && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("titleValue")}
                    id="titleValue"
                    name="titleValue"
                    value={formData.titleValue}
                    onChange={handleChange}
                    onNext={() => focusNextInput("fontAwesomeIcon")}
                    onCancel={() =>
                      setFormData({ ...formData, titleValue: "" })
                    }
                    labelText="Title Value"
                    tooltipText="Enter the shortcut title value"
                    required
                  />
                </div>
              )}

              {/* Font Awesome Icon field - only show if user can create */}
              {fontAwesomeIcon && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("fontAwesomeIcon")}
                    id="fontAwesomeIcon"
                    name="fontAwesomeIcon"
                    value={formData.fontAwesomeIcon}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() =>
                      setFormData({ ...formData, fontAwesomeIcon: "" })
                    }
                    labelText="Font Awesome Icon"
                    tooltipText="Enter Font Awesome icon class (e.g., fas fa-home)"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: Default, Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Default field - only show if user can create */}
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
                        date: "Set default shortcut",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default shortcut",
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
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        // Form submission or next action
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Set as default shortcut"
                  />
                </div>
              )}

              {/* Status field - only show if user can create */}
              {status && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("statusSwitch")(el)}
                    id="statusSwitch"
                    name="statusSwitch"
                    labelText="Status"
                    multiSelect={false}
                    options={[
                      {
                        label: "Active",
                        value: "active",
                        date: "Set active",
                      },
                      {
                        label: "Inactive",
                        value: "inactive",
                        date: "Set inactive",
                      },
                      {
                        label: "Draft",
                        value: "draft",
                        date: "Set draft",
                      },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;

                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as "active" | "inactive" | "draft",
                        isDraft: stringValue === "draft",
                        isActive: stringValue === "active",
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
                    tooltipText="Set the shortcut status"
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
    </>
  );
}
