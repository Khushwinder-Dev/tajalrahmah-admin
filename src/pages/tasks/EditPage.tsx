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
import { Check, Eye, Plus, MoreVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCountriesPermissions, usePermission } from "@/hooks/usePermissions";
// import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";

type TaskData = {
  subject: string;
  hourlyRate: number;
  startDate: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  repeatEvery: string;
  relatedTo: string;
  assignees: string;
  followers: string;
  checklist: string;
  tags: string;
  description: string;
  status: "active" | "inactive" | "draft" | "deleted";
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type TaskModuleData = {
  formData: TaskData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: TaskData = {
  subject: "Implement User Authentication",
  hourlyRate: 75,
  startDate: "2024-01-15",
  dueDate: "2024-01-22",
  priority: "High",
  repeatEvery: "None",
  relatedTo: "Project Alpha",
  assignees: "John Smith, Sarah Johnson",
  followers: "Mike Wilson, Emily Davis",
  checklist:
    "Setup authentication provider, Create login page, Implement JWT tokens",
  tags: "Authentication, Security, Backend",
  description: "Set up complete user authentication system with JWT tokens.",
  status: "active",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function TaskEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  // const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `task-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<TaskModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Permission checks
  const { canCreate, canView } = useCountriesPermissions();

  // Field-level permissions
  const subjectPerm: boolean = usePermission("tasks", "edit", "subject");
  const hourlyRatePerm: boolean = usePermission("tasks", "edit", "hourlyRate");
  const startDatePerm: boolean = usePermission("tasks", "edit", "startDate");
  const dueDatePerm: boolean = usePermission("tasks", "edit", "dueDate");
  const priorityPerm: boolean = usePermission("tasks", "edit", "priority");
  const repeatEveryPerm: boolean = usePermission(
    "tasks",
    "edit",
    "repeatEvery"
  );
  const relatedToPerm: boolean = usePermission("tasks", "edit", "relatedTo");
  const assigneesPerm: boolean = usePermission("tasks", "edit", "assignees");
  const followersPerm: boolean = usePermission("tasks", "edit", "followers");
  const checklistPerm: boolean = usePermission("tasks", "edit", "checklist");
  const tagsPerm: boolean = usePermission("tasks", "edit", "tags");
  const descriptionPerm: boolean = usePermission(
    "tasks",
    "edit",
    "description"
  );
  const statusPerm: boolean = usePermission("tasks", "edit", "status");
  const isDefaultPerm: boolean = usePermission("tasks", "edit", "isDefault");
  const canPdf: boolean = usePermission("tasks", "pdf");
  const canPrint: boolean = usePermission("tasks", "print");

  // Form state
  const [formData, setFormData] = useState<TaskData>({
    subject: "",
    hourlyRate: 0,
    startDate: "",
    dueDate: "",
    priority: "Medium",
    repeatEvery: "None",
    relatedTo: "",
    assignees: "",
    followers: "",
    checklist: "",
    tags: "",
    description: "",
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

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Update translation data when subject changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.subject || "", arabic: "", bangla: "" },
    ]);
  }, [formData.subject]);

  // Check for restore flag from taskbar
  useEffect(() => {
    const shouldRestore = localStorage.getItem(`restore-${moduleId}`);
    if (shouldRestore === "true") {
      setShouldRestoreFromMinimized(true);
      localStorage.removeItem(`restore-${moduleId}`);
    }
  }, [moduleId]);

  // Restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      shouldRestoreFromMinimized ||
      (hasMinimizedData &&
        moduleData?.formData &&
        !isRestoredFromMinimized &&
        !formData.subject);

    if (hasMinimizedData && moduleData?.formData && shouldAutoRestore) {
      setFormData(moduleData.formData);

      // Restore UI states based on form data
      setIsDefaultState(moduleData.formData.isDefault ? "Yes" : "No");

      setIsRestoredFromMinimized(true);
      setShouldRestoreFromMinimized(false);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition(moduleId);
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
    shouldRestoreFromMinimized,
    formData.subject,
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
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized, moduleId]);

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
      toastSuccess("Task updated successfully!");
      handleReset();
    } else {
      toastSuccess("Task updated successfully!");
      navigate("/tasks");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      subject: "",
      hourlyRate: 0,
      startDate: "",
      dueDate: "",
      priority: "Medium",
      repeatEvery: "None",
      relatedTo: "",
      assignees: "",
      followers: "",
      checklist: "",
      tags: "",
      description: "",
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
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["subject"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintReport = (reportData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Task Details",
        data: [reportData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          subject: "Subject",
          hourlyRate: "Hourly Rate",
          startDate: "Start Date",
          dueDate: "Due Date",
          priority: "Priority",
          repeatEvery: "Repeat Every",
          relatedTo: "Related To",
          assignees: "Assignees",
          followers: "Followers",
          checklist: "Checklist",
          tags: "Tags",
          description: "Description",
          status: "Status",
          isDefault: "Default",
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
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
          title="Task Details"
          subtitle="Task Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "task-details.pdf";
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
        navigate("/tasks/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/tasks/view");
      },
      show: canView,
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
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("Task saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): TaskModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={`Edit Task`}
        moduleRoute={`/tasks/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Task"
        listPath="tasks"
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
        module="tasks"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
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
            className="space-y-6"
          >
            {/* Fields: Subject, Hourly Rate, Start Date, Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {subjectPerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("subject")}
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onNext={() => focusNextInput("hourlyRate")}
                      onCancel={() => setFormData({ ...formData, subject: "" })}
                      labelText="Subject"
                      tooltipText="Enter the task subject"
                      required
                    />
                    <MoreVertical
                      className="h-4 w-4 cursor-pointer absolute right-8 top-6 transform -translate-y-1/2"
                      onClick={() => setIsOptionModalOpen(true)}
                    />
                  </div>
                </div>
              )}

              {hourlyRatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("hourlyRate")}
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    value={formData.hourlyRate.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("startDate")}
                    onCancel={() => setFormData({ ...formData, hourlyRate: 0 })}
                    labelText="Hourly Rate"
                    tooltipText="Enter the hourly rate"
                    required
                  />
                </div>
              )}

              {startDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("startDate")}
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("dueDate")}
                    onCancel={() => setFormData({ ...formData, startDate: "" })}
                    labelText="Start Date"
                    tooltipText="Enter the start date"
                    required
                  />
                </div>
              )}

              {dueDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("dueDate")}
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("priority")}
                    onCancel={() => setFormData({ ...formData, dueDate: "" })}
                    labelText="Due Date"
                    tooltipText="Enter the due date"
                    required
                  />
                </div>
              )}
            </div>

            {/* Fields: Priority, Repeat Every, Related To, Assignees */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {priorityPerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("priority")(el)}
                    id="priority"
                    name="priority"
                    labelText="Priority"
                    multiSelect={false}
                    options={[
                      { label: "Low", value: "Low", date: "Set low priority" },
                      {
                        label: "Medium",
                        value: "Medium",
                        date: "Set medium priority",
                      },
                      {
                        label: "High",
                        value: "High",
                        date: "Set high priority",
                      },
                      {
                        label: "Urgent",
                        value: "Urgent",
                        date: "Set urgent priority",
                      },
                    ]}
                    value={formData.priority}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = (
                        Array.isArray(value) ? value[0] : value
                      ) as "Low" | "Medium" | "High" | "Urgent";
                      setFormData((prev) => ({
                        ...prev,
                        priority: stringValue,
                      }));
                    }}
                    placeholder=""
                    tooltipText="Set the task priority"
                  />
                </div>
              )}

              {repeatEveryPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("repeatEvery")}
                    id="repeatEvery"
                    name="repeatEvery"
                    value={formData.repeatEvery}
                    onChange={handleChange}
                    onNext={() => focusNextInput("relatedTo")}
                    onCancel={() =>
                      setFormData({ ...formData, repeatEvery: "None" })
                    }
                    labelText="Repeat Every"
                    tooltipText="Enter repeat interval"
                    required
                  />
                </div>
              )}

              {relatedToPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("relatedTo")}
                    id="relatedTo"
                    name="relatedTo"
                    value={formData.relatedTo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("assignees")}
                    onCancel={() => setFormData({ ...formData, relatedTo: "" })}
                    labelText="Related To"
                    tooltipText="Enter what this task is related to"
                    required
                  />
                </div>
              )}

              {assigneesPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("assignees")}
                    id="assignees"
                    name="assignees"
                    value={formData.assignees}
                    onChange={handleChange}
                    onNext={() => focusNextInput("followers")}
                    onCancel={() => setFormData({ ...formData, assignees: "" })}
                    labelText="Assignees"
                    tooltipText="Enter assignees (comma separated)"
                    required
                  />
                </div>
              )}
            </div>

            {/* Fields: Followers, Checklist, Tags, Description */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {followersPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("followers")}
                    id="followers"
                    name="followers"
                    value={formData.followers}
                    onChange={handleChange}
                    onNext={() => focusNextInput("checklist")}
                    onCancel={() => setFormData({ ...formData, followers: "" })}
                    labelText="Followers"
                    tooltipText="Enter followers (comma separated)"
                  />
                </div>
              )}

              {checklistPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("checklist")}
                    id="checklist"
                    name="checklist"
                    value={formData.checklist}
                    onChange={handleChange}
                    onNext={() => focusNextInput("tags")}
                    onCancel={() => setFormData({ ...formData, checklist: "" })}
                    labelText="Checklist"
                    tooltipText="Enter checklist items (comma separated)"
                  />
                </div>
              )}

              {tagsPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("tags")}
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, tags: "" })}
                    labelText="Tags"
                    tooltipText="Enter tags (comma separated)"
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
                    tooltipText="Enter task description"
                  />
                </div>
              )}
            </div>

            {/* Fields: Status, Default */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Status field - only show if user can edit */}
              {statusPerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    labelText="Status"
                    multiSelect={false} // Single select mode
                    options={[
                      {
                        label: "Active",
                        value: "active",
                        date: "Set active task",
                      },
                      {
                        label: "Inactive",
                        value: "InActive",
                        date: "Set inactive task",
                      },
                      {
                        label: "Draft",
                        value: "Draft",
                        date: "Set draft task",
                      },
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set delete task",
                      },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      console.log("switch value", stringValue);
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as
                          | "active"
                          | "inactive"
                          | "draft"
                          | "deleted",
                        isDeleted: stringValue === "deleted",
                        isDraft: stringValue === "Draft",
                        isActive: stringValue === "Active",
                      }));

                      // Update your form data
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
                    tooltipText="Set the task status"
                  />
                </div>
              )}

              {/* Default field - only show if user can edit */}
              {isDefaultPerm && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: "Yes",
                        value: "Yes",
                        date: "Set default task",
                      },
                      {
                        label: "No",
                        value: "No",
                        date: "Remove default task",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === "Yes"
                        : value === "Yes";
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
                        focusNextInput("actions");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Set as default task"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <ActionsAutocomplete
                  ref={(el: any) => setRef("actions")(el)}
                  id="actions"
                  name="actions"
                  labelText="Action"
                  value={selectedAction}
                  actions={[
                    {
                      action: "Created",
                      user: "John",
                      role: "Super User",
                      date: "06 Aug 2025",
                      value: "created",
                    },
                    {
                      action: "Updated",
                      user: "Sarah",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "updated",
                    },
                    {
                      action: "Inactive",
                      user: "Mike",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "inactive",
                    },
                    {
                      action: "Drafted",
                      user: "John",
                      role: "Super User",
                      date: "07 Aug 2025",
                      value: "drafted",
                    },
                  ]}
                  placeholder=""
                  onValueChange={(value: string) => {
                    setSelectedAction(value);
                  }}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Task Action History"
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
        title="Reset Form"
        message="Are you sure you want to reset the form?"
        confirmText="Reset"
        cancelText="Cancel"
      />

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Task Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Task translations saved:", data);
        }}
      />
    </>
  );
}
