/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";

type LeadStatusData = {
  name: string;
  order: number;
  color: string;
  status: "active" | "inactive" | "draft";
  isDefault: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: LeadStatusData = {
  name: "New",
  order: 1,
  color: "#3B82F6",
  status: "active",
  isDefault: false,
};

export default function LeadStatusFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  // Permission checks
  const canCreate = usePermission("lead-status", "create");
  const canView = usePermission("lead-status", "view");

  // Field-level permissions
  const name: boolean = usePermission("lead-status", "create", "name");
  const orderField: boolean = usePermission("lead-status", "create", "order");
  const colorField: boolean = usePermission("lead-status", "create", "color");
  const statusField: boolean = usePermission("lead-status", "create", "status");
  const isDefaultField: boolean = usePermission(
    "lead-status",
    "create",
    "isDefault"
  );
  const canPdf: boolean = usePermission("lead-status", "pdf");
  const canPrint: boolean = usePermission("lead-status", "print");

  // Form state
  const [formData, setFormData] = useState<LeadStatusData>({
    name: "",
    order: 1,
    color: "#3B82F6",
    status: "active",
    isDefault: false,
  });

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(initialData);
    }
  }, [isEdit]);

  const [popoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/lead-status/create");
        } else {
          navigate("/lead-status/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/lead-status/view");
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
    const parsedValue = name === "order" ? Number(value) : value;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : parsedValue,
    } as LeadStatusData;
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintLeadSource(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Lead status created successfully!");
      handleReset();
    } else {
      toastSuccess("Lead status created successfully!");
      navigate("/lead-status");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handleReset = async () => {
    setFormData({
      name: "",
      order: 1,
      color: "#3B82F6",
      status: "active",
      isDefault: false,
    });

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

  const handlePrintLeadSource = (leadSourceData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Lead Status Details",
        data: [leadSourceData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          order: "Order",
          color: "Color",
          status: "Status",
          isDefault: "Default Lead Status",
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
          title="Lead Status Details"
          subtitle="Lead Status Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lead-status-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  // No draft toggle for lead status

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
        moduleId="lead-status-form-module"
        moduleName={isEdit ? "Edit Lead Status" : "Adding Lead Status"}
        moduleRoute={
          isEdit
            ? `/lead-status/edit/${formData.name || "new"}`
            : "/lead-status/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Lead Status" : "Add Lead Status"}
        listPath="lead-status"
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
        module="lead-status"
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
            {/* First Row: Lead Status Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Name */}
              {name && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("order")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText="Lead Status Name"
                    tooltipText="Enter the lead status name (e.g., New, Qualified, Won)"
                    required
                  />
                </div>
              )}

              {/* Order */}
              {orderField && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("order")}
                    id="order"
                    name="order"
                    value={String(formData.order)}
                    onChange={handleChange}
                    onNext={() => focusNextInput("color")}
                    onCancel={() => setFormData({ ...formData, order: 1 })}
                    labelText="Order"
                    tooltipText="Enter display order (number)"
                    required
                  />
                </div>
              )}

              {/* Color */}
              {colorField && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("color")}
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    onNext={() => focusNextInput("statusSwitch")}
                    onCancel={() =>
                      setFormData({ ...formData, color: "#3B82F6" })
                    }
                    labelText="Color"
                    tooltipText="Enter hex color (e.g., #3B82F6)"
                    required
                  />
                </div>
              )}

              {/* Default */}
              {isDefaultField && (
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
                        date: "Unset default",
                      },
                    ]}
                    value={formData.isDefault ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === labels.yes
                        : value === labels.yes;
                      setFormData((prev) => ({ ...prev, isDefault: isYes }));
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Set as default lead status"
                  />
                </div>
              )}

              {/* Status */}
              {statusField && (
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
                    tooltipText="Set the lead status availability"
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
