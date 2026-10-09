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

type ColorData = {
  name: string;
  code: string;
  description: string;
  hexCode: string;
  status: "active" | "inactive" | "draft";
  isDefault: boolean;
  isStatusActive: boolean;
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

const initialData: ColorData = {
  name: "Primary Blue",
  code: "BLU001",
  description: "Main brand color used for primary actions and highlights",
  hexCode: "#3B82F6",
  status: "active",
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

export default function ColorFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  // Permission checks
  const { canCreate, canView } = useColorsPermissions();

  // Field-level permissions
  const name: boolean = usePermission("colors", "create", "name");
  const code: boolean = usePermission("colors", "create", "code");
  const description: boolean = usePermission("colors", "create", "description");
  const hexCode: boolean = usePermission("colors", "create", "hexCode");
  const status: boolean = usePermission("colors", "create", "status");
  const isDefault: boolean = usePermission("colors", "create", "isDefault");
  const canPdf: boolean = usePermission("colors", "pdf");
  const canPrint: boolean = usePermission("colors", "print");

  // Form state
  const [formData, setFormData] = useState<ColorData>({
    name: "",
    code: "",
    description: "",
    hexCode: "",
    status: "active",
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
          navigate("/colors/create");
        } else {
          navigate("/colors/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/colors/view");
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
      handlePrintColor(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Color created successfully!");
      handleReset();
    } else {
      toastSuccess("Color created successfully!");
      navigate("/colors");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handleReset = async () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      hexCode: "",
      status: "active",
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

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["name"]?.focus();
    }, 100);
  };

  const handlePrintColor = (colorData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Color Details",
        data: [colorData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Color Name",
          code: "Color Code",
          description: "Description",
          hexCode: "Hex Code",
          status: "Status",
          isDefault: "Default Color",
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
          title="Color Details"
          subtitle="Color Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "color-details.pdf";
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
              toastRestore("Color saved as draft successfully");
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
        moduleId="color-form-module"
        moduleName={isEdit ? "Edit Color" : "Adding Color"}
        moduleRoute={
          isEdit ? `/colors/edit/${formData.name || "new"}` : "/colors/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Color" : "Add Color"}
        listPath="colors"
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
        module="colors"
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
            {/* First Row: Color Name and Code */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Color Name field - only show if user can create */}
              {name && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("code")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText="Color Name"
                    tooltipText="Enter the color name"
                    required
                  />
                </div>
              )}

              {/* Color Code field - only show if user can create */}
              {code && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("code")}
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    onNext={() => focusNextInput("hexCode")}
                    onCancel={() => setFormData({ ...formData, code: "" })}
                    labelText="Color Code"
                    tooltipText="Enter the color code (e.g., BLU001)"
                    required
                  />
                </div>
              )}

              {/* Hex Code field - only show if user can create */}
              {hexCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("hexCode")}
                    id="hexCode"
                    name="hexCode"
                    value={formData.hexCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, hexCode: "" })}
                    labelText="Hex Code"
                    tooltipText="Enter the hex color code (e.g., #3B82F6)"
                    type="text"
                    required
                  />
                </div>
              )}

              {/* Description field - only show if user can create */}
              {description && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter a description for the color"
                    type="text"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: Status and Default */}
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
                        date: "Set default color",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default color",
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
                    tooltipText="Set as default color"
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
                    tooltipText="Set the color status"
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
