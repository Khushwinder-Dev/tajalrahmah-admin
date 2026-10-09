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
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DynamicInputTableList from "./components/dynamic-input-table/DynamicInputTableList";

export type TaskAssignDataType = {
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
  termsAndConditions: string;

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
  branch: "Dhaka",
  customer: "ABC Corporation",
  customerNo: "CUST001",
  vendorCode: "VND001",
  status: "In Progress",
  projectName: "ERP Implementation",
  projectCode: "ERP-DHK-001",
  projectType: "Software",
  startDate: "2025-07-01",
  projectLocation: "Dhaka HQ",
  poNumber: "PO12345",
  description: "Implementing ERP system across departments",
  termsAndConditions: "",

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
  termsAndConditions: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: null,
  draftedAt: null,
  updatedAt: null,
  deletedAt: null,
};

// Terms & Conditions options array
const termsAndConditionsOptions = [
  {
    key: "payment_terms",
    label: "Payment Terms",
    description: "Specify the payment schedule, method, and due dates.",
    value: "",
  },
  {
    key: "delivery_time",
    label: "Delivery Time",
    description: "State the expected delivery period for the project.",
    value: "",
  },
  {
    key: "warranty",
    label: "Warranty",
    description: "Define the warranty period and coverage.",
    value: "",
  },
  {
    key: "confidentiality",
    label: "Confidentiality",
    description: "Obligation to keep information confidential.",
    value: "",
  },
  {
    key: "termination",
    label: "Termination",
    description: "Conditions under which the contract can be terminated.",
    value: "",
  },
  {
    key: "governing_law",
    label: "Governing Law",
    description: "Specify the jurisdiction and governing law.",
    value: "",
  },
  // Add more as needed
];

export default function TaskAssignCreatePage({ isEdit = false }: Props) {
  // Terms & Conditions state
  const [termsAndConditionsSelectValue, setTermsAndConditionsSelectValue] =
    useState("");
  const [selectedTermsAndConditions, setSelectedTermsAndConditions] = useState<
    Array<{
      key: string;
      label: string;
      description: string;
      value: string;
    }>
  >([]);
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
  const canCreate = usePermission("projects", "create");
  const canView = usePermission("projects", "view");
  const canEdit = usePermission("projects", "edit");
  const canDelete = usePermission("projects", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const branch: boolean = usePermission("projects", "create", "branch");
  const customer: boolean = usePermission("projects", "create", "customer");
  const customerNo: boolean = usePermission("projects", "create", "customerNo");
  const vendorCode: boolean = usePermission("projects", "create", "vendorCode");
  const status: boolean = usePermission("projects", "create", "status");
  const projectName: boolean = usePermission(
    "projects",
    "create",
    "projectName"
  );
  const projectCode: boolean = usePermission(
    "projects",
    "create",
    "projectCode"
  );
  const projectType: boolean = usePermission(
    "projects",
    "create",
    "projectType"
  );
  const startDate: boolean = usePermission("projects", "create", "startDate");
  const projectLocation: boolean = usePermission(
    "projects",
    "create",
    "projectLocation"
  );
  const poNumber: boolean = usePermission("projects", "create", "poNumber");
  const description: boolean = usePermission(
    "projects",
    "create",
    "description"
  );
  const isDefault: boolean = usePermission("projects", "create", "isDefault");
  const isDraft: boolean = usePermission("projects", "create", "isDraft");

  const canPdf: boolean = usePermission("projects", "pdf");
  const canPrint: boolean = usePermission("projects", "print");

  console.log("branch", branch);
  console.log("customer", customer);
  console.log("customerNo", customerNo);
  console.log("vendorCode", vendorCode);
  console.log("status", status);
  console.log("projectName", projectName);
  console.log("projectCode", projectCode);
  console.log("projectType", projectType);
  console.log("startDate", startDate);
  console.log("projectLocation", projectLocation);
  console.log("poNumber", poNumber);
  console.log("description", description);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<TaskAssignDataType>(initialFormData);

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
          navigate("/projects/create");
        } else {
          navigate("/projects/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/projects/view");
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
      toastSuccess("Project created successfully!");
      handleReset();
      focusNextInput("branch");
    } else {
      toastSuccess("Project created successfully!");
      navigate("/projects");
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
      termsAndConditions: "",
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
          title="Project Details"
          subtitle="Project Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "project-details.pdf";
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

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Project" : "Creating Project"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="projects"
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
              )}

              {/* Designation field - only show if user can create */}
              {customer && (
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
              )}
              {customerNo && (
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
              )}

              {/* Task field - only show if user can create */}
              {vendorCode && (
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
              )}

              {/* Timeline field - only show if user can create */}
              {status && (
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
              )}

              {projectName && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("projectName")}
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("projectCode")}
                    onCancel={() =>
                      setFormData({ ...formData, projectName: "" })
                    }
                    labelText="Project Name"
                    tooltipText="Project Name"
                    required
                  />
                </div>
              )}

              {projectCode && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("projectCode")}
                    id="projectCode"
                    name="projectCode"
                    value={formData.projectCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("projectType")}
                    onCancel={() =>
                      setFormData({ ...formData, projectCode: "" })
                    }
                    labelText="Project Code"
                    tooltipText="Project Code"
                    required
                  />
                </div>
              )}

              {projectType && (
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
              )}

              {startDate && (
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
              )}

              {projectLocation && (
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
              )}

              {poNumber && (
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
              )}

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
            <DynamicInputTableList />

            {/* summary table */}
            <div className="">
              {/* Terms & Conditions Selector and Editable List */}
              <Autocomplete
                ref={(el: any) => setRef("termsAndConditionsSelect")(el)}
                id="termsAndConditionsSelect"
                name="termsAndConditionsSelect"
                allowCustomInput={false}
                options={termsAndConditionsOptions.map((opt) => opt.label)}
                value={termsAndConditionsSelectValue}
                onValueChange={(label: string) => {
                  const option = termsAndConditionsOptions.find(
                    (opt) => opt.label === label
                  );
                  if (
                    option &&
                    !selectedTermsAndConditions.some(
                      (item) => item.key === option.key
                    )
                  ) {
                    setSelectedTermsAndConditions([
                      ...selectedTermsAndConditions,
                      { ...option },
                    ]);
                  }
                  setTermsAndConditionsSelectValue("");
                }}
                onEnterPress={() => {
                  if (termsAndConditionsSelectValue) {
                    const option = termsAndConditionsOptions.find(
                      (opt) => opt.label === termsAndConditionsSelectValue
                    );
                    if (
                      option &&
                      !selectedTermsAndConditions.some(
                        (item) => item.key === option.key
                      )
                    ) {
                      setSelectedTermsAndConditions([
                        ...selectedTermsAndConditions,
                        { ...option },
                      ]);
                    }
                    setTermsAndConditionsSelectValue("");
                  }
                }}
                placeholder=" "
                labelText="Terms & Conditions"
                className="relative mb-4"
                styles={{
                  input: {
                    borderColor: "var(--primary)",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
              />

              <div className="space-y-3">
                {/* Map selected T&C as editable inputs with remove button */}
                {selectedTermsAndConditions.map((item, idx) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <EditableInput
                      setRef={setRef(`termsAndConditions_${item.key}`)}
                      id={`termsAndConditions_${item.key}`}
                      name={`termsAndConditions_${item.key}`}
                      value={item.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedTermsAndConditions((prev) =>
                          prev.map((tc, i) =>
                            i === idx ? { ...tc, description: val } : tc
                          )
                        );
                      }}
                      onNext={() => focusNextInput("submitButton")}
                      onCancel={() => {
                        setSelectedTermsAndConditions((prev) =>
                          prev.filter((_, i) => i !== idx)
                        );
                      }}
                      labelText={item.label}
                      tooltipText={item.label}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedTermsAndConditions((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      className="ml-2 text-red-500 hover:text-red-700"
                      aria-label="Remove"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 6L6 18M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
