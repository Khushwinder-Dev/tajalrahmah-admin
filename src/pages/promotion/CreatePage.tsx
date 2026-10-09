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
import { Check, Edit, Eye, Plus, MoreVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountriesPermissions, usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";

type PromotionData = {
  code: string;
  employeeName: string;
  fromPosition: string;
  toPosition: string;
  fromDepartment: string;
  toDepartment: string;
  fromSalary: string;
  toSalary: string;
  promotionDate: string;
  effectiveDate: string;
  approvedBy: string;
  reason: string;
  description: string;
  status: "active" | "inactive" | "draft";
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: PromotionData = {
  code: "",
  employeeName: "",
  fromPosition: "",
  toPosition: "",
  fromDepartment: "",
  toDepartment: "",
  fromSalary: "",
  toSalary: "",
  promotionDate: "",
  effectiveDate: "",
  approvedBy: "",
  reason: "",
  description: "",
  status: "active",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  isUpdated: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function PromotionFormPage({ isEdit = false }: Props) {
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
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Permission checks
  const { canCreate, canView } = useCountriesPermissions();

  // Field-level permissions
  const codePerm: boolean = usePermission("promotion", "create", "code");
  const employeeNamePerm: boolean = usePermission(
    "promotion",
    "create",
    "employeeName"
  );
  const fromPositionPerm: boolean = usePermission(
    "promotion",
    "create",
    "fromPosition"
  );
  const toPositionPerm: boolean = usePermission(
    "promotion",
    "create",
    "toPosition"
  );
  const fromDepartmentPerm: boolean = usePermission(
    "promotion",
    "create",
    "fromDepartment"
  );
  const toDepartmentPerm: boolean = usePermission(
    "promotion",
    "create",
    "toDepartment"
  );
  const fromSalaryPerm: boolean = usePermission(
    "promotion",
    "create",
    "fromSalary"
  );
  const toSalaryPerm: boolean = usePermission(
    "promotion",
    "create",
    "toSalary"
  );
  const promotionDatePerm: boolean = usePermission(
    "promotion",
    "create",
    "promotionDate"
  );
  const effectiveDatePerm: boolean = usePermission(
    "promotion",
    "create",
    "effectiveDate"
  );
  const approvedByPerm: boolean = usePermission(
    "promotion",
    "create",
    "approvedBy"
  );
  const reasonPerm: boolean = usePermission("promotion", "create", "reason");
  const descriptionPerm: boolean = usePermission(
    "promotion",
    "create",
    "description"
  );
  const statusPerm: boolean = usePermission("promotion", "create", "status");
  const isDefaultPerm: boolean = usePermission(
    "promotion",
    "create",
    "isDefault"
  );
  const canPdf: boolean = usePermission("promotion", "pdf");
  const canPrint: boolean = usePermission("promotion", "print");

  // Form state
  const [formData, setFormData] = useState<PromotionData>({
    code: "",
    employeeName: "",
    fromPosition: "",
    toPosition: "",
    fromDepartment: "",
    toDepartment: "",
    fromSalary: "",
    toSalary: "",
    promotionDate: "",
    effectiveDate: "",
    approvedBy: "",
    reason: "",
    description: "",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Update translation data when employee name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.employeeName || "", arabic: "", bangla: "" },
    ]);
  }, [formData.employeeName]);

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
          navigate("/promotion/create");
        } else {
          navigate("/promotion/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/promotion/view");
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
      handlePrintReport(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Promotion created successfully!");
      handleReset();
    } else {
      toastSuccess("Promotion created successfully!");
      navigate("/promotion");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handleReset = async () => {
    setFormData({
      code: "",
      employeeName: "",
      fromPosition: "",
      toPosition: "",
      fromDepartment: "",
      toDepartment: "",
      fromSalary: "",
      toSalary: "",
      promotionDate: "",
      effectiveDate: "",
      approvedBy: "",
      reason: "",
      description: "",
      status: "active",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      isUpdated: false,
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
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  const handlePrintReport = (reportData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Promotion Details",
        data: [reportData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          employeeName: "Employee Name",
          fromPosition: "From Position",
          toPosition: "To Position",
          fromDepartment: "From Department",
          toDepartment: "To Department",
          fromSalary: "From Salary",
          toSalary: "To Salary",
          promotionDate: "Promotion Date",
          effectiveDate: "Effective Date",
          approvedBy: "Approved By",
          reason: "Reason",
          description: "Description",
          status: "Status",
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
          isUpdated: "Updated",
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
          title="Promotion Details"
          subtitle="Promotion Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "promotion-details.pdf";
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
              toastRestore("Promotion saved as draft successfully");
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
        moduleId="promotion-form-module"
        moduleName={isEdit ? "Edit Promotion" : "Adding Promotion"}
        moduleRoute={
          isEdit
            ? `/promotion/edit/${formData.code || "new"}`
            : "/promotion/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Promotion" : "Add Promotion"}
        listPath="promotion"
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
        module="promotion"
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
            {/* Fields: Code, Employee Name, From Position, To Position, From Department, To Department, From Salary, To Salary, Promotion Date, Effective Date, Approved By, Reason, Description */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {codePerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("code")}
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      onNext={() => focusNextInput("employeeName")}
                      onCancel={() => setFormData({ ...formData, code: "" })}
                      labelText="Code"
                      tooltipText="Enter the promotion code"
                      required
                    />
                    <MoreVertical
                      className="h-4 w-4 cursor-pointer absolute right-8 top-6 transform -translate-y-1/2"
                      onClick={() => setIsOptionModalOpen(true)}
                    />
                  </div>
                </div>
              )}

              {employeeNamePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("employeeName")}
                    id="employeeName"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("fromPosition")}
                    onCancel={() =>
                      setFormData({ ...formData, employeeName: "" })
                    }
                    labelText="Employee Name"
                    tooltipText="Enter the employee name"
                    required
                  />
                </div>
              )}

              {fromPositionPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("fromPosition")}
                    id="fromPosition"
                    name="fromPosition"
                    value={formData.fromPosition}
                    onChange={handleChange}
                    onNext={() => focusNextInput("toPosition")}
                    onCancel={() =>
                      setFormData({ ...formData, fromPosition: "" })
                    }
                    labelText="From Position"
                    tooltipText="Enter the current position"
                    required
                  />
                </div>
              )}

              {toPositionPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("toPosition")}
                    id="toPosition"
                    name="toPosition"
                    value={formData.toPosition}
                    onChange={handleChange}
                    onNext={() => focusNextInput("fromDepartment")}
                    onCancel={() =>
                      setFormData({ ...formData, toPosition: "" })
                    }
                    labelText="To Position"
                    tooltipText="Enter the new position"
                    required
                  />
                </div>
              )}

              {fromDepartmentPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("fromDepartment")}
                    id="fromDepartment"
                    name="fromDepartment"
                    value={formData.fromDepartment}
                    onChange={handleChange}
                    onNext={() => focusNextInput("toDepartment")}
                    onCancel={() =>
                      setFormData({ ...formData, fromDepartment: "" })
                    }
                    labelText="From Department"
                    tooltipText="Enter the current department"
                    required
                  />
                </div>
              )}

              {toDepartmentPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("toDepartment")}
                    id="toDepartment"
                    name="toDepartment"
                    value={formData.toDepartment}
                    onChange={handleChange}
                    onNext={() => focusNextInput("fromSalary")}
                    onCancel={() =>
                      setFormData({ ...formData, toDepartment: "" })
                    }
                    labelText="To Department"
                    tooltipText="Enter the new department"
                    required
                  />
                </div>
              )}

              {fromSalaryPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("fromSalary")}
                    id="fromSalary"
                    name="fromSalary"
                    value={formData.fromSalary}
                    onChange={handleChange}
                    onNext={() => focusNextInput("toSalary")}
                    onCancel={() =>
                      setFormData({ ...formData, fromSalary: "" })
                    }
                    labelText="From Salary"
                    tooltipText="Enter the current salary"
                    required
                  />
                </div>
              )}

              {toSalaryPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("toSalary")}
                    id="toSalary"
                    name="toSalary"
                    value={formData.toSalary}
                    onChange={handleChange}
                    onNext={() => focusNextInput("promotionDate")}
                    onCancel={() => setFormData({ ...formData, toSalary: "" })}
                    labelText="To Salary"
                    tooltipText="Enter the new salary"
                    required
                  />
                </div>
              )}

              {promotionDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("promotionDate")}
                    id="promotionDate"
                    name="promotionDate"
                    value={formData.promotionDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("effectiveDate")}
                    onCancel={() =>
                      setFormData({ ...formData, promotionDate: "" })
                    }
                    labelText="Promotion Date"
                    tooltipText="Enter the promotion date"
                    required
                  />
                </div>
              )}

              {effectiveDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("effectiveDate")}
                    id="effectiveDate"
                    name="effectiveDate"
                    value={formData.effectiveDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("approvedBy")}
                    onCancel={() =>
                      setFormData({ ...formData, effectiveDate: "" })
                    }
                    labelText="Effective Date"
                    tooltipText="Enter the effective date"
                    required
                  />
                </div>
              )}

              {approvedByPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("approvedBy")}
                    id="approvedBy"
                    name="approvedBy"
                    value={formData.approvedBy}
                    onChange={handleChange}
                    onNext={() => focusNextInput("reason")}
                    onCancel={() =>
                      setFormData({ ...formData, approvedBy: "" })
                    }
                    labelText="Approved By"
                    tooltipText="Enter the approver name"
                    required
                  />
                </div>
              )}

              {reasonPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("reason")}
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, reason: "" })}
                    labelText="Reason"
                    tooltipText="Enter the reason for promotion"
                    required
                  />
                </div>
              )}

              {descriptionPerm && (
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
                    tooltipText="Enter the promotion description"
                    required
                  />
                </div>
              )}

              {/* Status and Default sections remain unchanged */}

              {isDefaultPerm && (
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
                        date: "Set default promotion",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default promotion",
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
                        // no-op
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Set as default promotion"
                  />
                </div>
              )}

              {statusPerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("statusSwitch")(el)}
                    id="statusSwitch"
                    name="statusSwitch"
                    labelText="Status"
                    multiSelect={false}
                    options={[
                      { label: "Active", value: "active", date: "Set active" },
                      {
                        label: "Inactive",
                        value: "inactive",
                        date: "Set inactive",
                      },
                      { label: "Draft", value: "draft", date: "Set draft" },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = (
                        Array.isArray(value) ? value[0] : value
                      ) as "active" | "inactive" | "draft";
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue,
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
                    tooltipText="Set the promotion status"
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

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Promotion Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Promotion translations saved:", data);
        }}
      />
    </>
  );
}
