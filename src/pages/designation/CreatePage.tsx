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

type DesignationData = {
  code: string;
  designationName: string;
  description: string;
  department: string;
  employeeCount: number;
  minSalary: string;
  maxSalary: string;
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

const initialData: DesignationData = {
  code: "",
  designationName: "",
  description: "",
  department: "",
  employeeCount: 0,
  minSalary: "",
  maxSalary: "",
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

export default function DesignationFormPage({ isEdit = false }: Props) {
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
  const codePerm: boolean = usePermission("designation", "create", "code");
  const designationNamePerm: boolean = usePermission(
    "designation",
    "create",
    "designationName"
  );
  const descriptionPerm: boolean = usePermission(
    "designation",
    "create",
    "description"
  );
  const departmentPerm: boolean = usePermission(
    "designation",
    "create",
    "department"
  );
  const employeeCountPerm: boolean = usePermission(
    "designation",
    "create",
    "employeeCount"
  );
  const minSalaryPerm: boolean = usePermission(
    "designation",
    "create",
    "minSalary"
  );
  const maxSalaryPerm: boolean = usePermission(
    "designation",
    "create",
    "maxSalary"
  );
  const statusPerm: boolean = usePermission("designation", "create", "status");
  const isDefaultPerm: boolean = usePermission(
    "designation",
    "create",
    "isDefault"
  );
  const canPdf: boolean = usePermission("designation", "pdf");
  const canPrint: boolean = usePermission("designation", "print");

  // Form state
  const [formData, setFormData] = useState<DesignationData>({
    code: "",
    designationName: "",
    description: "",
    department: "",
    employeeCount: 0,
    minSalary: "",
    maxSalary: "",
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

  // Update translation data when designationName changes
  useEffect(() => {
    setTranslations([
      {
        id: 1,
        english: formData.designationName || "",
        arabic: "",
        bangla: "",
      },
    ]);
  }, [formData.designationName]);

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
          navigate("/designation/create");
        } else {
          navigate("/designation/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/designation/view");
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
      toastSuccess("Designation created successfully!");
      handleReset();
    } else {
      toastSuccess("Designation created successfully!");
      navigate("/designation");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handleReset = async () => {
    setFormData({
      code: "",
      designationName: "",
      description: "",
      department: "",
      employeeCount: 0,
      minSalary: "",
      maxSalary: "",
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
        title: "Designation Details",
        data: [reportData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          designationName: "Designation Name",
          description: "Description",
          department: "Department",
          employeeCount: "Employee Count",
          minSalary: "Min Salary",
          maxSalary: "Max Salary",
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
          title="Designation Details"
          subtitle="Designation Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "designation-details.pdf";
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
              toastRestore("Designation saved as draft successfully");
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
        moduleId="designation-form-module"
        moduleName={isEdit ? "Edit Designation" : "Adding Designation"}
        moduleRoute={
          isEdit
            ? `/designation/edit/${formData.code || "new"}`
            : "/designation/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Designation" : "Add Designation"}
        listPath="designation"
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
        module="designation"
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
            {/* Fields: Code, Designation Name, Description, Department, Employee Count, Min Salary, Max Salary */}
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
                      onNext={() => focusNextInput("designationName")}
                      onCancel={() => setFormData({ ...formData, code: "" })}
                      labelText="Code"
                      tooltipText="Enter the designation code"
                      required
                    />
                    <MoreVertical
                      className="h-4 w-4 cursor-pointer absolute right-8 top-6 transform -translate-y-1/2"
                      onClick={() => setIsOptionModalOpen(true)}
                    />
                  </div>
                </div>
              )}

              {designationNamePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("designationName")}
                    id="designationName"
                    name="designationName"
                    value={formData.designationName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() =>
                      setFormData({ ...formData, designationName: "" })
                    }
                    labelText="Designation Name"
                    tooltipText="Enter the designation name"
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
                    onNext={() => focusNextInput("department")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter the designation description"
                    required
                  />
                </div>
              )}

              {departmentPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("department")}
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    onNext={() => focusNextInput("employeeCount")}
                    onCancel={() =>
                      setFormData({ ...formData, department: "" })
                    }
                    labelText="Department"
                    tooltipText="Enter the department name"
                    required
                  />
                </div>
              )}

              {employeeCountPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("employeeCount")}
                    id="employeeCount"
                    name="employeeCount"
                    type="number"
                    value={formData.employeeCount.toString()}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setFormData({ ...formData, employeeCount: value });
                    }}
                    onNext={() => focusNextInput("minSalary")}
                    onCancel={() =>
                      setFormData({ ...formData, employeeCount: 0 })
                    }
                    labelText="Employee Count"
                    tooltipText="Enter the number of employees"
                    required
                  />
                </div>
              )}

              {minSalaryPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("minSalary")}
                    id="minSalary"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleChange}
                    onNext={() => focusNextInput("maxSalary")}
                    onCancel={() => setFormData({ ...formData, minSalary: "" })}
                    labelText="Min Salary"
                    tooltipText="Enter the minimum salary"
                    required
                  />
                </div>
              )}

              {maxSalaryPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("maxSalary")}
                    id="maxSalary"
                    name="maxSalary"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() => setFormData({ ...formData, maxSalary: "" })}
                    labelText="Max Salary"
                    tooltipText="Enter the maximum salary"
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
                        date: "Set default designation",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default designation",
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
                    tooltipText="Set as default designation"
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
                    tooltipText="Set the department status"
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
        title="Department Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Department translations saved:", data);
        }}
      />
    </>
  );
}
