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

type SampleReceivingData = {
  branch: string;
  receivingNo: string;
  clientName: string;
  clientReference: string;
  typeOfSample: string;
  requiredTests: string;
  numberOfSample: number;
  section: string;
  deliveredBy: string;
  receivedBy: string;
  receivingDate: string;
  receivingTime: string;
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

type SampleReceivingModuleData = {
  formData: SampleReceivingData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: SampleReceivingData = {
  branch: "Main Branch",
  receivingNo: "SR-001",
  clientName: "ABC Food Corp",
  clientReference: "REF-2024-001",
  typeOfSample: "Food Product",
  requiredTests: "Microbiology, Chemical Analysis",
  numberOfSample: 5,
  section: "Quality Control",
  deliveredBy: "John Smith",
  receivedBy: "Sarah Johnson",
  receivingDate: "2024-01-15",
  receivingTime: "09:30",
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

export default function SampleReceivingEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  // const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `sample-receiving-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<SampleReceivingModuleData>(moduleId);

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
  const branchPerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "branch"
  );
  const receivingNoPerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "receivingNo"
  );
  const clientNamePerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "clientName"
  );
  const clientReferencePerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "clientReference"
  );
  const typeOfSamplePerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "typeOfSample"
  );
  const requiredTestsPerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "requiredTests"
  );
  const numberOfSamplePerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "numberOfSample"
  );
  const sectionPerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "section"
  );
  const deliveredByPerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "deliveredBy"
  );
  const receivedByPerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "receivedBy"
  );
  const receivingDatePerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "receivingDate"
  );
  const receivingTimePerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "receivingTime"
  );
  const statusPerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "status"
  );
  const isDefaultPerm: boolean = usePermission(
    "sample-receiving",
    "edit",
    "isDefault"
  );
  const canPdf: boolean = usePermission("sample-receiving", "pdf");
  const canPrint: boolean = usePermission("sample-receiving", "print");

  // Form state
  const [formData, setFormData] = useState<SampleReceivingData>({
    branch: "",
    receivingNo: "",
    clientName: "",
    clientReference: "",
    typeOfSample: "",
    requiredTests: "",
    numberOfSample: 0,
    section: "",
    deliveredBy: "",
    receivedBy: "",
    receivingDate: "",
    receivingTime: "",
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

  // Update translation data when clientName changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.clientName || "", arabic: "", bangla: "" },
    ]);
  }, [formData.clientName]);

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
        !formData.clientName);

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
    formData.clientName,
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
      toastSuccess("Sample Receiving updated successfully!");
      handleReset();
    } else {
      toastSuccess("Sample Receiving updated successfully!");
      navigate("/sample-receiving");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      branch: "",
      receivingNo: "",
      clientName: "",
      clientReference: "",
      typeOfSample: "",
      requiredTests: "",
      numberOfSample: 0,
      section: "",
      deliveredBy: "",
      receivedBy: "",
      receivingDate: "",
      receivingTime: "",
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
      inputRefs.current["branch"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintReport = (reportData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Sample Receiving Details",
        data: [reportData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          receivingNo: "Receiving No",
          clientName: "Client Name",
          clientReference: "Client Reference",
          typeOfSample: "Type of Sample",
          requiredTests: "Required Tests",
          numberOfSample: "Number of Sample",
          section: "Section",
          deliveredBy: "Delivered By",
          receivedBy: "Received By",
          receivingDate: "Receiving Date",
          receivingTime: "Receiving Time",
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
          title="Sample Receiving Details"
          subtitle="Sample Receiving Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample-receiving-details.pdf";
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
        navigate("/sample-receiving/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/sample-receiving/view");
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
              toastRestore("Sample Receiving saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): SampleReceivingModuleData => {
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
        moduleName={`Edit Sample Receiving`}
        moduleRoute={`/sample-receiving/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Sample Receiving"
        listPath="sample-receiving"
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
        module="sample-receiving"
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
            {/* Fields: Branch, Receiving No, Client Name, Client Reference */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {branchPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("branch")}
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    onNext={() => focusNextInput("receivingNo")}
                    onCancel={() => setFormData({ ...formData, branch: "" })}
                    labelText="Branch"
                    tooltipText="Enter the branch location"
                    required
                  />
                </div>
              )}

              {receivingNoPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("receivingNo")}
                    id="receivingNo"
                    name="receivingNo"
                    value={formData.receivingNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("clientName")}
                    onCancel={() =>
                      setFormData({ ...formData, receivingNo: "" })
                    }
                    labelText="Receiving No"
                    tooltipText="Enter the receiving number"
                    required
                  />
                </div>
              )}

              {clientNamePerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("clientName")}
                      id="clientName"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      onNext={() => focusNextInput("clientReference")}
                      onCancel={() =>
                        setFormData({ ...formData, clientName: "" })
                      }
                      labelText="Client Name"
                      tooltipText="Enter the client name"
                      required
                    />
                    <MoreVertical
                      className="h-4 w-4 cursor-pointer absolute right-8 top-6 transform -translate-y-1/2"
                      onClick={() => setIsOptionModalOpen(true)}
                    />
                  </div>
                </div>
              )}

              {clientReferencePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("clientReference")}
                    id="clientReference"
                    name="clientReference"
                    value={formData.clientReference}
                    onChange={handleChange}
                    onNext={() => focusNextInput("typeOfSample")}
                    onCancel={() =>
                      setFormData({ ...formData, clientReference: "" })
                    }
                    labelText="Client Reference"
                    tooltipText="Enter the client reference"
                    required
                  />
                </div>
              )}
            </div>

            {/* Fields: Type of Sample, Required Tests, Number of Sample, Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {typeOfSamplePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("typeOfSample")}
                    id="typeOfSample"
                    name="typeOfSample"
                    value={formData.typeOfSample}
                    onChange={handleChange}
                    onNext={() => focusNextInput("requiredTests")}
                    onCancel={() =>
                      setFormData({ ...formData, typeOfSample: "" })
                    }
                    labelText="Type of Sample"
                    tooltipText="Enter the type of sample"
                    required
                  />
                </div>
              )}

              {requiredTestsPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("requiredTests")}
                    id="requiredTests"
                    name="requiredTests"
                    value={formData.requiredTests}
                    onChange={handleChange}
                    onNext={() => focusNextInput("numberOfSample")}
                    onCancel={() =>
                      setFormData({ ...formData, requiredTests: "" })
                    }
                    labelText="Required Tests"
                    tooltipText="Enter the required tests"
                    required
                  />
                </div>
              )}

              {numberOfSamplePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("numberOfSample")}
                    id="numberOfSample"
                    name="numberOfSample"
                    type="number"
                    value={formData.numberOfSample.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("section")}
                    onCancel={() =>
                      setFormData({ ...formData, numberOfSample: 0 })
                    }
                    labelText="Number of Sample"
                    tooltipText="Enter the number of samples"
                    required
                  />
                </div>
              )}

              {sectionPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("section")}
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    onNext={() => focusNextInput("deliveredBy")}
                    onCancel={() => setFormData({ ...formData, section: "" })}
                    labelText="Section"
                    tooltipText="Enter the section"
                    required
                  />
                </div>
              )}
            </div>

            {/* Fields: Delivered By, Received By, Receiving Date, Receiving Time */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {deliveredByPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("deliveredBy")}
                    id="deliveredBy"
                    name="deliveredBy"
                    value={formData.deliveredBy}
                    onChange={handleChange}
                    onNext={() => focusNextInput("receivedBy")}
                    onCancel={() =>
                      setFormData({ ...formData, deliveredBy: "" })
                    }
                    labelText="Delivered By"
                    tooltipText="Enter who delivered the sample"
                    required
                  />
                </div>
              )}

              {receivedByPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("receivedBy")}
                    id="receivedBy"
                    name="receivedBy"
                    value={formData.receivedBy}
                    onChange={handleChange}
                    onNext={() => focusNextInput("receivingDate")}
                    onCancel={() =>
                      setFormData({ ...formData, receivedBy: "" })
                    }
                    labelText="Received By"
                    tooltipText="Enter who received the sample"
                    required
                  />
                </div>
              )}

              {receivingDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("receivingDate")}
                    id="receivingDate"
                    name="receivingDate"
                    type="date"
                    value={formData.receivingDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("receivingTime")}
                    onCancel={() =>
                      setFormData({ ...formData, receivingDate: "" })
                    }
                    labelText="Receiving Date"
                    tooltipText="Enter the receiving date"
                    required
                  />
                </div>
              )}

              {receivingTimePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("receivingTime")}
                    id="receivingTime"
                    name="receivingTime"
                    type="time"
                    value={formData.receivingTime}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() =>
                      setFormData({ ...formData, receivingTime: "" })
                    }
                    labelText="Receiving Time"
                    tooltipText="Enter the receiving time"
                    required
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
                        date: "Set active sample category",
                      },
                      {
                        label: "Inactive",
                        value: "InActive",
                        date: "Set inactive sample category",
                      },
                      {
                        label: "Draft",
                        value: "Draft",
                        date: "Set draft sample category",
                      },
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set delete sample category",
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
                    tooltipText="Set the sample receiving status"
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
                        date: "Set default sample receiving",
                      },
                      {
                        label: "No",
                        value: "No",
                        date: "Remove default sample receiving",
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
                    tooltipText="Set as default sample receiving"
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
                  tooltipText="Sample Receiving Action History"
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
        title="Sample Receiving Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Sample Receiving translations saved:", data);
        }}
      />
    </>
  );
}
