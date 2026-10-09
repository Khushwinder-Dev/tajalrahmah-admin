/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import EditableInput from "@/components/common/EditableInput";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface LeadsData {
  clientName: string;
  productGroup: string;
  service: string;
  budget: number;
  priority: string;
  startDate: string;
  assignee: string;
  contact: string;
  position: string;
  source: string;
  employees: string;
  branches: string;
  business: string;
  automation: boolean;
  status: string;
  language: string;
  mobile: string;
  whatsapp: string;
  email: string;
  fax: string;
  country: string;
  state: string;
  city: string;
  area: string;
  website: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  location: string;
  notes: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

type Props = {
  isEdit?: boolean;
};

const initialData: LeadsData = {
  clientName: "",
  productGroup: "",
  service: "",
  budget: 0,
  priority: "",
  startDate: "",
  assignee: "",
  contact: "",
  position: "",
  source: "",
  employees: "",
  branches: "",
  business: "",
  automation: false,
  status: "",
  language: "",
  mobile: "",
  whatsapp: "",
  email: "",
  fax: "",
  country: "",
  state: "",
  city: "",
  area: "",
  website: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  location: "",
  notes: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  rating: 3,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

const productGroups = ["Electronics", "Clothing", "Furniture", "Books"];
const services = ["Ledger", "Accounts", "Inventory", "Sales", "HR"];
const priorities = ["Low", "Medium", "High"];
const assignees = ["John Doe", "Jane Smith", "Bob Johnson"];
const sources = ["Web", "Email", "Phone", "Social Media"];
const branches = ["Main Branch", "Branch 1", "Branch 2", "Branch 3"];
const statuses = ["Open", "In Progress", "Closed"];
const languages = ["English", "Arabic", "Bangla", "German", "Italian"];
const countriesNames = [
  "Dubai",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "India",
  "Pakistan",
];
const states = ["State 1", "State 2", "State 3"];
const cities = ["City 1", "City 2", "City 3"];
const areas = ["Area 1", "Area 2", "Area 3"];

export default function LeadsCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");

  const [statusState, setStatusState] = useState<"Active" | "Draft" | string>(
    "Active"
  );
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks - similar to CountryDetails.tsx
  // const { canCreate, canView, canEdit, canDelete } = useCountriesPermissions();
  const canCreate: boolean = usePermission("leads", "create");
  const canView: boolean = usePermission("leads", "view");
  const canEdit: boolean = usePermission("leads", "edit");
  const canDelete: boolean = usePermission("leads", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const name: boolean = usePermission("leads", "create", "name");

  const isDefault: boolean = usePermission("leads", "create", "isDefault");
  const isDraft: boolean = usePermission("leads", "create", "isDraft");
  const canPdf: boolean = usePermission("leads", "pdf");
  const canPrint: boolean = usePermission("leads", "print");

  console.log("name", name);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<LeadsData>({
    clientName: "",
    productGroup: "",
    service: "",
    budget: 0,
    priority: "",
    startDate: "",
    assignee: "",
    contact: "",
    position: "",
    source: "",
    employees: "",
    branches: "",
    business: "",
    automation: false,
    status: "",
    language: "",
    mobile: "",
    whatsapp: "",
    email: "",
    fax: "",
    country: "",
    state: "",
    city: "",
    area: "",
    website: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    location: "",
    notes: "",
    isDefault: isDefaultState === "Yes",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    rating: 3,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

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
          navigate("/leads/create");
        } else {
          navigate("/leads/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/leads/view");
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

      // if (initialData.picture) {
      //   setImagePreview(initialData.picture);
      // }

      setStatusState(initialData.isActive ? "Active" : "Draft");
    }
  }, [isEdit]);

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
      handlePrintIncrements(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Leads created successfully!");
      handleReset();
    } else {
      toastSuccess("Leads created successfully!");
      navigate("/leads");
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
      clientName: "",
      productGroup: "",
      service: "",
      budget: 0,
      priority: "",
      startDate: "",
      assignee: "",
      contact: "",
      position: "",
      source: "",
      employees: "",
      branches: "",
      business: "",
      automation: false,
      status: "",
      language: "",
      mobile: "",
      whatsapp: "",
      email: "",
      fax: "",
      country: "",
      state: "",
      city: "",
      area: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      location: "",
      notes: "",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      rating: 3,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");
    setStatusState("Active");
    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["clientName"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const handlePrintIncrements = (LeadsData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Leads Details",
        data: [LeadsData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          title: "Title",
          fromDate: "From Date",
          toDate: "To Date",
          status: "Status",
          isDefault: "Default Country",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          rating: "Rating",
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
    // if (checked && formData) {
    //   // Small delay to allow switch animation to complete
    //   setTimeout(() => handlePrintIncrements(formData), 100);
    // }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    // if (pdfChecked) {
    //   // Small delay to allow switch animation to complete
    //   setTimeout(() => handleExportPDF(), 100);
    // }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("LeadsData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Leads Details"
          subtitle="Leads Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leads-details.pdf";
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
              toastRestore("Leads saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
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
        moduleId="leads-form-module"
        moduleName={isEdit ? "Edit Leads" : "Adding Leads"}
        moduleRoute={
          isEdit
            ? `/leads/edit/${formData.clientName || "new"}`
            : "/leads/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? labels.editingLeads : labels.creatingLeads}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="leads"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        module="leads"
        additionalFooterButtons={
          // Only show buttons if user can create
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
            {/* First Row: */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("clientName")}
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("productGroup")}
                    onCancel={() =>
                      setFormData({ ...formData, clientName: "" })
                    }
                    labelText={labels.clientNamerTooltip}
                    tooltipText={labels.clientNamerTooltip}
                    required
                  />
                </div>
              )}
              {/* auto-complete */}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("productGroup")(el)}
                    id="productGroup"
                    name="productGroup"
                    allowCustomInput={true}
                    options={productGroups}
                    value={formData.productGroup}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, productGroup: value });
                      if (value) {
                        focusNextInput("service");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.productGroup) {
                        focusNextInput("service");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.productGroupTooltip}
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

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("service")(el)}
                    id="service"
                    name="service"
                    allowCustomInput={true}
                    options={services}
                    value={formData.service}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, service: value });
                      if (value) {
                        focusNextInput("budget");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.service) {
                        focusNextInput("budget");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.serviceTooltip}
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

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("budget")}
                      id="budget"
                      name="budget"
                      value={formData.budget ? formData.budget.toString() : ""}
                      onChange={handleChange}
                      onNext={() => focusNextInput("priority")}
                      onCancel={() => setFormData({ ...formData, budget: 0 })}
                      labelText={labels.budgetTooltip}
                      tooltipText={labels.budgetTooltip}
                      required
                      type="number"
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("priority")(el)}
                    id="priority"
                    name="priority"
                    allowCustomInput={true}
                    options={priorities}
                    value={formData.priority}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, priority: value });
                      if (value) {
                        focusNextInput("startDate");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.priority) {
                        focusNextInput("startDate");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.priorityTooltip}
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

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("startDate")}
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      onNext={() => focusNextInput("assignee")}
                      onCancel={() =>
                        setFormData({ ...formData, startDate: "" })
                      }
                      labelText={labels.startDateTooltip}
                      tooltipText={labels.startDateTooltip}
                      required
                      type="date"
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("assignee")(el)}
                    id="assignee"
                    name="assignee"
                    allowCustomInput={true}
                    options={assignees}
                    value={formData.assignee}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, assignee: value });
                      if (value) {
                        focusNextInput("contact");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.assignee) {
                        focusNextInput("contact");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.assigneeTooltip}
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

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("contact")}
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      onNext={() => focusNextInput("position")}
                      onCancel={() => setFormData({ ...formData, contact: "" })}
                      labelText={labels.contactTooltip}
                      tooltipText={labels.contactTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("position")}
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      onNext={() => focusNextInput("source")}
                      onCancel={() =>
                        setFormData({ ...formData, position: "" })
                      }
                      labelText={labels.positionTooltip}
                      tooltipText={labels.positionTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("source")(el)}
                    id="source"
                    name="source"
                    allowCustomInput={true}
                    options={sources}
                    value={formData.source}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, source: value });
                      if (value) {
                        focusNextInput("employees");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.source) {
                        focusNextInput("employees");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.sourceTooltip}
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

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("employees")}
                      id="employees"
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      onNext={() => focusNextInput("branches")}
                      onCancel={() =>
                        setFormData({ ...formData, employees: "" })
                      }
                      labelText={labels.employeesTooltip}
                      tooltipText={labels.employeesTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("branches")(el)}
                    id="branches"
                    name="branches"
                    allowCustomInput={true}
                    options={branches}
                    value={formData.branches}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, branches: value });
                      if (value) {
                        focusNextInput("automation");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.branches) {
                        focusNextInput("automation");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.branchesTooltip}
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

              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("automation")(el)}
                    id="automation"
                    name="automation"
                    options={[labels.no, labels.yes]}
                    value={
                      formData.automation === true ? labels.yes : labels.no
                    }
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === labels.yes;
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        automation: newValue,
                      }));
                      focusNextInput("status");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.automation === true ||
                        formData.automation === false
                      ) {
                        focusNextInput("status");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.automationTooltip}
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

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    allowCustomInput={true}
                    options={statuses}
                    value={formData.status}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, status: value });
                      if (value) {
                        focusNextInput("language");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.status) {
                        focusNextInput("language");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.statusTooltip}
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
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("language")(el)}
                    id="language"
                    name="language"
                    allowCustomInput={true}
                    options={languages}
                    value={formData.language}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, language: value });
                      if (value) {
                        focusNextInput("mobile");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.language) {
                        focusNextInput("mobile");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.languageTooltip}
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

              <div className="md:col-span-12 space-y-2 my-8 pt-4">
                <h1 className="text-2xl font-bold text-primary">
                  Contact Details
                </h1>
              </div>

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("mobile")}
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      onNext={() => focusNextInput("whatsapp")}
                      onCancel={() => setFormData({ ...formData, mobile: "" })}
                      labelText={labels.mobileTooltip}
                      tooltipText={labels.mobileTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("whatsapp")}
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      onNext={() => focusNextInput("fax")}
                      onCancel={() =>
                        setFormData({ ...formData, whatsapp: "" })
                      }
                      labelText={labels.whatsappTooltip}
                      tooltipText={labels.whatsappTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("fax")}
                      id="fax"
                      name="fax"
                      value={formData.fax}
                      onChange={handleChange}
                      onNext={() => focusNextInput("email")}
                      onCancel={() => setFormData({ ...formData, fax: "" })}
                      labelText={labels.faxTooltip}
                      tooltipText={labels.faxTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("email")}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onNext={() => focusNextInput("country")}
                      onCancel={() => setFormData({ ...formData, email: "" })}
                      labelText={labels.emailTooltip}
                      tooltipText={labels.emailTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("country")(el)}
                    id="country"
                    name="country"
                    allowCustomInput={true}
                    options={countriesNames}
                    value={formData.country}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, country: value });
                      if (value) {
                        focusNextInput("state");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.country) {
                        focusNextInput("state");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.countryNameTooltip}
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
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("state")(el)}
                    id="state"
                    name="state"
                    allowCustomInput={true}
                    options={states}
                    value={formData.state}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, state: value });
                      if (value) {
                        focusNextInput("state");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.state) {
                        focusNextInput("city");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.stateTooltip}
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

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("city")(el)}
                    id="city"
                    name="city"
                    allowCustomInput={true}
                    options={cities}
                    value={formData.city}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, city: value });
                      if (value) {
                        focusNextInput("area");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.city) {
                        focusNextInput("area");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.cityTooltip}
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

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("area")(el)}
                    id="area"
                    name="area"
                    allowCustomInput={true}
                    options={areas}
                    value={formData.area}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, area: value });
                      if (value) {
                        focusNextInput("website");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.area) {
                        focusNextInput("website");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.areaTooltip}
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

              <div className="md:col-span-12 space-y-2 my-8 pt-4">
                <h1 className="text-2xl font-bold text-primary">
                  Important Links
                </h1>
              </div>

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("website")}
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      onNext={() => focusNextInput("facebook")}
                      onCancel={() => setFormData({ ...formData, website: "" })}
                      labelText={labels.websiteTooltip}
                      tooltipText={labels.websiteTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("facebook")}
                      id="facebook"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      onNext={() => focusNextInput("instagram")}
                      onCancel={() =>
                        setFormData({ ...formData, facebook: "" })
                      }
                      labelText={labels.facebookTooltip}
                      tooltipText={labels.facebookTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("instagram")}
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      onNext={() => focusNextInput("linkedin")}
                      onCancel={() =>
                        setFormData({ ...formData, instagram: "" })
                      }
                      labelText={labels.instagramTooltip}
                      tooltipText={labels.instagramTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("linkedin")}
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      onNext={() => focusNextInput("location")}
                      onCancel={() =>
                        setFormData({ ...formData, linkedin: "" })
                      }
                      labelText={labels.linkedinTooltip}
                      tooltipText={labels.linkedinTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("location")}
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      onNext={() => focusNextInput("notes")}
                      onCancel={() =>
                        setFormData({ ...formData, location: "" })
                      }
                      labelText={labels.locationTooltip}
                      tooltipText={labels.locationTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("notes")}
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      onNext={() => focusNextInput("isDefault")}
                      onCancel={() => setFormData({ ...formData, notes: "" })}
                      labelText={labels.notesTooltip}
                      tooltipText={labels.notesTooltip}
                    />
                  </div>
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="md:col-span-3 space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: labels.yes,
                        value: labels.yes,
                        date: "Set default leads",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default leads",
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
                    tooltipText="Set as default leads"
                  />
                </div>
              )}

              {/* Status field */}
              <div className="md:col-span-3 space-y-2">
                <SwitchSelect
                  ref={(el: any) => setRef("status")(el)}
                  id="status"
                  name="status"
                  labelText="Status"
                  multiSelect={false} // Single select mode
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

                    // Update your form data
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
                  tooltipText="Set the leads status"
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
    </>
  );
}
