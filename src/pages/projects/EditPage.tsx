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

type TaskCategoryData = {
  branch: string;
  customer: string;
  customerNo: string;
  vendorCode: string;
  status: string;
  projectName: string;
  projectCode: string;
  projectType: string;
  startDate: string;
  projectLocation: string;
  poNumber: string;
  description: string;

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

const initialData: TaskCategoryData = {
  branch: "Branch 1",
  customer: "Customer 1",
  customerNo: "CUST001",
  vendorCode: "VEND001",
  status: "In Progress",
  projectName: "ERP Implementation",
  projectCode: "ERP-DHK-001",
  projectType: "Software",
  startDate: "2025-07-01",
  projectLocation: "Dhaka HQ",
  poNumber: "PO12345",
  description: "Implementing ERP system across departments",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Add the calculateTotalTimeline function
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

export default function ProjectEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [isActiveState, setIsActiveState] = useState<"Yes" | "No" | string>(
    "No"
  );

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<TaskCategoryData>({
    branch: "",
    customer: "",
    customerNo: "",
    vendorCode: "",
    status: "",
    projectName: "",
    projectCode: "",
    projectType: "",
    startDate: "",
    projectLocation: "",
    poNumber: "",
    description: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // get permission
  const canPdf: boolean = usePermission("projects", "pdf");
  const canPrint: boolean = usePermission("projects", "print");

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
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsActiveState(initialData.isActive ? "Yes" : "No");
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
    // Normal submit logic here (API call)

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintTaskCategory(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("branch");
    } else {
      navigate("/projects");
    }
    toastSuccess("Projects Edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      branch: "",
      customer: "",
      customerNo: "",
      vendorCode: "",
      status: "",
      projectName: "",
      projectCode: "",
      projectType: "",
      startDate: "",
      projectLocation: "",
      poNumber: "",
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
    setIsActiveState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["branch"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintTaskCategory = (taskCategoryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Project Details",
        data: [taskCategoryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          customer: "Customer",
          customerNo: "Customer No",
          vendorCode: "Vendor Code",
          status: "Status",
          projectName: "Project Name",
          projectCode: "Project Code",
          projectType: "Project Type",
          startDate: "Start Date",
          projectLocation: "Project Location",
          poNumber: "PO Number",
          description: "Description",
          isDefault: "Default Task Category",
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
          title="Project Details"
          subtitle="Project Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "project-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

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
          navigate("/projects/create");
        } else {
          navigate("/projects/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/projects/view");
      },
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
              toastRestore("Task category saved as draft successfully");
            },
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft]);

  const branches = ["Branch 1", "Branch 2", "Branch 3"];
  const customers = ["Customer 1", "Customer 2", "Customer 3"];
  const projectTypes = ["Monthly Base", "Call Base", "Task Hours"];
  const statusOptions = ["In Progress", "Completed", "Pending"];

  const customerDetails: Record<
    string,
    { customerNo: string; vendorCode: string }
  > = {
    "Customer 1": { customerNo: "CUST001", vendorCode: "VEND001" },
    "Customer 2": { customerNo: "CUST002", vendorCode: "VEND002" },
    "Customer 3": { customerNo: "CUST003", vendorCode: "VEND003" },
  };

  // Add callback function to handle formRows changes
  const handleFormRowsChange = useCallback((rows: any[]) => {
    const totalTimeline = calculateTotalTimeline(rows);
    setFormData((prev) => ({
      ...prev,
      timeline: totalTimeline,
    }));
  }, []);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Project" : "Creating Project"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="projects"
        activePage="edit"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        additionalFooterButtons={
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
              className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold! focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:transform focus:scale-105 focus:transition-all focus:duration-300`}
              onClick={() => formRef.current?.requestSubmit()}
            >
              Submit
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
            {/* First Row: Department, Designation, Task, Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
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
                      focusNextInput("customer");
                    }
                  }}
                  onEnterPress={() => {
                    if (formData.branch) {
                      focusNextInput("customer");
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

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("customer")(el)}
                  id="customer"
                  name="customer"
                  allowCustomInput={true}
                  options={customers}
                  value={formData.customer}
                  onValueChange={(value: string) => {
                    const details = customerDetails[value] || {
                      customerNo: "",
                      vendorCode: "",
                    };
                    setFormData({
                      ...formData,
                      customer: value,
                      customerNo: details.customerNo,
                      vendorCode: details.vendorCode,
                    });
                    if (value) {
                      focusNextInput("customerNo");
                    }
                  }}
                  onEnterPress={() => {
                    if (formData.customer) {
                      focusNextInput("customerNo");
                    }
                  }}
                  placeholder=" "
                  labelText="Customer"
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

              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("customerNo")}
                    id="customerNo"
                    name="customerNo"
                    value={formData.customerNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vendorCode")}
                    onCancel={() =>
                      setFormData({ ...formData, customerNo: "" })
                    }
                    labelText="Customer No"
                    tooltipText="Customer No"
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("vendorCode")}
                    id="vendorCode"
                    name="vendorCode"
                    type="text"
                    value={formData.vendorCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() =>
                      setFormData({ ...formData, vendorCode: "" })
                    }
                    labelText="Vendor Code"
                    tooltipText="Vendor Code"
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("status")(el)}
                  id="status"
                  name="status"
                  isSelectableOnly={true}
                  options={statusOptions}
                  value={formData.status}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, status: value });
                    if (value) {
                      focusNextInput("projectName");
                    }
                  }}
                  onEnterPress={() => {
                    if (formData.status) {
                      focusNextInput("projectName");
                    }
                  }}
                  placeholder=" "
                  labelText="Status"
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

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("projectName")}
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  onNext={() => focusNextInput("projectCode")}
                  onCancel={() => setFormData({ ...formData, projectName: "" })}
                  labelText="Project Name"
                  tooltipText="Project Name"
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("projectCode")}
                  id="projectCode"
                  name="projectCode"
                  value={formData.projectCode}
                  onChange={handleChange}
                  onNext={() => focusNextInput("projectType")}
                  onCancel={() => setFormData({ ...formData, projectCode: "" })}
                  labelText="Project Code"
                  tooltipText="Project Code"
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("projectType")(el)}
                  id="projectType"
                  name="projectType"
                  allowCustomInput={true}
                  options={projectTypes}
                  value={formData.projectType}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, projectType: value });
                    if (value) {
                      focusNextInput("startDate");
                    }
                  }}
                  onEnterPress={() => {
                    if (formData.projectType) {
                      focusNextInput("startDate");
                    }
                  }}
                  placeholder=" "
                  labelText="Project Type"
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

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  type="date"
                  setRef={setRef("startDate")}
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  onNext={() => focusNextInput("projectLocation")}
                  onCancel={() => setFormData({ ...formData, startDate: "" })}
                  labelText="Start Date"
                  tooltipText="Start Date"
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("projectLocation")}
                  id="projectLocation"
                  name="projectLocation"
                  value={formData.projectLocation}
                  onChange={handleChange}
                  onNext={() => focusNextInput("poNumber")}
                  onCancel={() =>
                    setFormData({ ...formData, projectLocation: "" })
                  }
                  labelText="Project Location"
                  tooltipText="Project Location"
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("poNumber")}
                  id="poNumber"
                  name="poNumber"
                  value={formData.poNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("description")}
                  onCancel={() => setFormData({ ...formData, poNumber: "" })}
                  labelText="PO Number"
                  tooltipText="PO Number"
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("description")}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onNext={() => focusNextInput("isDefault")}
                  onCancel={() => setFormData({ ...formData, description: "" })}
                  labelText="Description"
                  tooltipText="Enter task description"
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isDefault")(el)}
                  id="isDefault"
                  name="isDefault"
                  options={["No", "Yes"]}
                  isSelectableOnly={true}
                  value={isDefaultState === "Yes" ? "Yes" : "No"}
                  onValueChange={(value: string) => {
                    const isYes = value === "Yes";
                    setIsDefaultState(isYes ? "Yes" : "No");
                    setFormData((prev) => ({
                      ...prev,
                      isDefault: isYes,
                    }));
                    focusNextInput("isActive");
                  }}
                  onEnterPress={() => {
                    focusNextInput("isActive");
                  }}
                  placeholder=" "
                  labelText="Default"
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

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isActive")(el)}
                  id="isActive"
                  name="isActive"
                  labelText="Active"
                  isSelectableOnly={true}
                  options={["No", "Yes"]}
                  value={isActiveState === "Yes" ? "Yes" : "No"}
                  onValueChange={(value: string) => {
                    const isYes = value === "Yes";
                    setIsActiveState(isYes ? "Yes" : "No");
                    setFormData((prev) => ({
                      ...prev,
                      isActive: isYes,
                    }));
                    focusNextInput("submitButton");
                  }}
                  onEnterPress={() => {
                    focusNextInput("submitButton");
                  }}
                  placeholder=" "
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
