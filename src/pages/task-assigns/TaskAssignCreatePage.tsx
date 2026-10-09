/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/usePermissions";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import type { RootState } from "@/store";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DynamicInputTableList from "./components/dynamic-input-table/DynamicInputTableList";
import dayjs from "dayjs";
// import { useTranslation } from "react-i18next";

export type TaskAssignDataType = {
  branch: string;
  employee: string;
  date: string;
  timeline: string;
  description: string;

  isActive: boolean;
  isDraft: boolean;
  isDefault: boolean;
  isDeleted: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: TaskAssignDataType = {
  branch: "Bangladesh",
  employee: "Korim Bhai",
  date: "",
  timeline: "",
  description: "",

  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

const initialFormData: TaskAssignDataType = {
  branch: "",
  employee: "",
  date: "",
  timeline: "",
  description: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: null,
  draftedAt: null,
  updatedAt: null,
  deletedAt: null,
};

const calculateTotalTimeline = (formRows: any[]): string => {
  let totalMinutes = 0;

  formRows.forEach((row) => {
    if (row.startTime && row.endTime) {
      const start = dayjs(row.startTime, "HH:mm");
      const end = dayjs(row.endTime, "HH:mm");

      if (start.isValid() && end.isValid()) {
        const diffInMinutes = end.diff(start, "minute");
        if (diffInMinutes > 0) {
          totalMinutes += diffInMinutes;
        }
      }
    }
  });

  if (totalMinutes === 0) return "";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours > 0 ? hours + " hour" + (hours > 1 ? "s" : "") : ""}${
    minutes > 0 ? " " + minutes + " minute" + (minutes > 1 ? "s" : "") : ""
  }`.trim();
};

export default function TaskAssignCreatePage({ isEdit = false }: Props) {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("taskAssigns", "create");
  const canView = usePermission("taskAssigns", "view");
  const canEdit = usePermission("taskAssigns", "edit");
  const canDelete = usePermission("taskAssigns", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const branch: boolean = usePermission("taskAssigns", "create", "branch");
  const employee: boolean = usePermission("taskAssigns", "create", "employee");
  const date: boolean = usePermission("taskAssigns", "create", "date");
  const timeline: boolean = usePermission("taskAssigns", "create", "timeline");
  const description: boolean = usePermission(
    "taskAssigns",
    "create",
    "description"
  );
  const isDefault: boolean = usePermission(
    "taskAssigns",
    "create",
    "isDefault"
  );
  const isDraft: boolean = usePermission("taskAssigns", "create", "isDraft");

  const canPdf: boolean = usePermission("taskAssigns", "pdf");
  const canPrint: boolean = usePermission("taskAssigns", "print");

  console.log("branch", branch);
  console.log("employee", employee);
  console.log("date", date);
  console.log("timeline", timeline);
  console.log("description", description);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<TaskAssignDataType>(initialFormData);

  // Add callback function to handle formRows changes
  const handleFormRowsChange = useCallback((rows: any[]) => {
    const totalTimeline = calculateTotalTimeline(rows);
    setFormData((prev) => ({
      ...prev,
      timeline: totalTimeline,
    }));
  }, []);

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" /> // Green for Plus
      ) : (
        <Edit className="w-5 h-5 text-blue-500" /> // Blue for Edit
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/task-assigns/create");
        } else {
          navigate("/task-assigns/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/task-assigns/view");
      },
      // Only show if user has permission
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

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
      setIsDraftState(initialData.isDraft ? "Yes" : "No");
    }
  }, [isEdit, initialData]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Normal submit logic here (API call)------------

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintTaskCategory(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Task assign created successfully!");
      handleReset();
      focusNextInput("branch");
    } else {
      toastSuccess("Task assign created successfully!");
      navigate("/task-assigns");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      branch: "",
      employee: "",
      date: "",
      timeline: "",
      description: "",
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
      inputRefs.current["branch"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintTaskCategory = (taskCategoryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Task Assign Details",
        data: [taskCategoryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          employee: "Employee",
          date: "Date",
          timeline: "Timeline",
          description: "Description",
          isDefault: "Default Task Assign",
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
    console.log("Export PDF clicked");
    try {
      console.log("taskCategoryData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Task Assign Details"
          subtitle="Task Assign Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "task-assigns-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
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
              toastRestore("Task assign saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  const branches = ["Branch 1", "Branch 2", "Branch 3"];
  const employees = ["Employee 1", "Employee 2", "Employee 3"];

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Task Assign" : "Creating Task Assign"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="task-assigns"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        // Removed onExport prop
        additionalFooterButtons={
          // Only show buttons if user can create
          canCreate ? (
            <div className="flex gap-4 items-center">
              <Button
                variant="outline"
                className="gap-2 text-primary bg-sky-200 hover:bg-primary rounded-full border-primary w-32 font-semibold!"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button
                ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
                id="submitButton"
                name="submitButton"
                variant="outline"
                className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
                onClick={() => formRef.current?.requestSubmit()}
              >
                Submit
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
            {/* First Row: Department, Designation, Task, Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {/* Department field - only show if user can create */}
              {branch && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("branch")(el)}
                    id="branch"
                    name="branch"
                    allowCustomInput={true}
                    options={branches}
                    value={formData.branch}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, branch: value });
                      if (value) {
                        focusNextInput("employee");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.branch) {
                        focusNextInput("employee");
                      }
                    }}
                    placeholder=" "
                    labelText="Branch"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {/* Designation field - only show if user can create */}
              {employee && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("employee")(el)}
                    id="employee"
                    name="employee"
                    allowCustomInput={true}
                    options={employees}
                    value={formData.employee}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, employee: value });
                      if (value) {
                        focusNextInput("date");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.employee) {
                        focusNextInput("date");
                      }
                    }}
                    placeholder=" "
                    labelText="Employee"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {/* Task field - only show if user can create */}
              {date && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("date")}
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      onNext={() => focusNextInput("description")}
                      onCancel={() => setFormData({ ...formData, date: "" })}
                      labelText="Date"
                      tooltipText="Enter the date"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Timeline field - only show if user can create */}
              {timeline && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("timeline")}
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, timeline: "" })}
                    labelText="Total Timeline"
                    tooltipText="Total timeline calculated from all task rows"
                    required
                    readOnly
                  />
                </div>
              )}

              {/* Description field - only show if user can create */}
              {description && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter task description"
                    required
                  />
                </div>
              )}

              {isDefault && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={["No", "Yes"]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("isDraft");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("isDraft");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {/* Draft field - only show if user can create */}
              {isDraft && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={isDraftState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDraftState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: newValue,
                      }));
                      focusNextInput("submitButton");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("submitButton");
                      }
                    }}
                    placeholder=" "
                    labelText="Draft"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
            {/* extra table */}
            <DynamicInputTableList onFormRowsChange={handleFormRowsChange} />
          </form>
        </div>
      </PageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Reset Form"
        message="Are you sure you want to reset the form? All changes will be lost."
        confirmText="Reset"
        cancelText="Cancel"
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
