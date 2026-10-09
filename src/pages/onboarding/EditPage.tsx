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
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";

type OnboardingData = {
  dataId: string;
  selectStaff: string;
  generalInformation: string;
  staffFullName: string;
  address: string;
  assetAllocation: string;
  typeOfTraining: string;
  trainingProgram: string;
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

type OnboardingModuleData = {
  formData: OnboardingData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: OnboardingData = {
  dataId: "ONB001",
  selectStaff: "John Doe",
  generalInformation: "New employee onboarding",
  staffFullName: "John Doe Smith",
  address: "123 Main Street, City",
  assetAllocation: "Laptop, Phone, ID Card",
  typeOfTraining: "Technical Training",
  trainingProgram: "Software Development Basics",
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

export default function OnboardingEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `onboarding-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<OnboardingModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [selectedAction, setSelectedAction] = useState<string>("");

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Permission checks
  const { canCreate, canView } = useCountriesPermissions();

  // Field-level permissions
  const dataIdPerm: boolean = usePermission("onboarding", "edit", "dataId");
  const selectStaffPerm: boolean = usePermission(
    "onboarding",
    "edit",
    "selectStaff"
  );
  const generalInformationPerm: boolean = usePermission(
    "onboarding",
    "edit",
    "generalInformation"
  );
  const staffFullNamePerm: boolean = usePermission(
    "onboarding",
    "edit",
    "staffFullName"
  );
  const addressPerm: boolean = usePermission("onboarding", "edit", "address");
  const assetAllocationPerm: boolean = usePermission(
    "onboarding",
    "edit",
    "assetAllocation"
  );
  const typeOfTrainingPerm: boolean = usePermission(
    "onboarding",
    "edit",
    "typeOfTraining"
  );
  const trainingProgramPerm: boolean = usePermission(
    "onboarding",
    "edit",
    "trainingProgram"
  );
  const statusPerm: boolean = usePermission("onboarding", "edit", "status");
  const isDefaultPerm: boolean = usePermission(
    "onboarding",
    "edit",
    "isDefault"
  );
  const canPdf: boolean = usePermission("onboarding", "pdf");
  const canPrint: boolean = usePermission("onboarding", "print");

  // Form state
  const [formData, setFormData] = useState<OnboardingData>({
    dataId: "",
    selectStaff: "",
    generalInformation: "",
    staffFullName: "",
    address: "",
    assetAllocation: "",
    typeOfTraining: "",
    trainingProgram: "",
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

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Update translation data when staffFullName changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.staffFullName || "", arabic: "", bangla: "" },
    ]);
  }, [formData.staffFullName]);

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
        !formData.staffFullName);

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
    formData.staffFullName,
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
      toastSuccess("Onboarding updated successfully!");
      handleReset();
    } else {
      toastSuccess("Onboarding updated successfully!");
      navigate("/onboarding");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      dataId: "",
      selectStaff: "",
      generalInformation: "",
      staffFullName: "",
      address: "",
      assetAllocation: "",
      typeOfTraining: "",
      trainingProgram: "",
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
      inputRefs.current["dataId"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintReport = (reportData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Onboarding Details",
        data: [reportData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          dataId: "Data ID",
          selectStaff: "Select Staff",
          generalInformation: "General Information",
          staffFullName: "Staff Full Name",
          address: "Address",
          assetAllocation: "Asset Allocation",
          typeOfTraining: "Type of Training",
          trainingProgram: "Training Program",
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
          title="Onboarding Details"
          subtitle="Onboarding Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "onboarding-details.pdf";
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
        navigate("/onboarding/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/onboarding/view");
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
              toastRestore("Onboarding saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): OnboardingModuleData => {
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
        moduleName={`Edit Onboarding`}
        moduleRoute={`/onboarding/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Onboarding"
        listPath="onboarding"
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
        module="onboarding"
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
            {/* Fields: Data ID, Select Staff, General Information, Staff Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {dataIdPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("dataId")}
                    id="dataId"
                    name="dataId"
                    value={formData.dataId}
                    onChange={handleChange}
                    onNext={() => focusNextInput("selectStaff")}
                    onCancel={() => setFormData({ ...formData, dataId: "" })}
                    labelText="Data ID"
                    tooltipText="Enter the data ID"
                    required
                  />
                </div>
              )}

              {selectStaffPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("selectStaff")}
                    id="selectStaff"
                    name="selectStaff"
                    value={formData.selectStaff}
                    onChange={handleChange}
                    onNext={() => focusNextInput("generalInformation")}
                    onCancel={() =>
                      setFormData({ ...formData, selectStaff: "" })
                    }
                    labelText="Select Staff"
                    tooltipText="Select staff member"
                    required
                  />
                </div>
              )}

              {generalInformationPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("generalInformation")}
                    id="generalInformation"
                    name="generalInformation"
                    value={formData.generalInformation}
                    onChange={handleChange}
                    onNext={() => focusNextInput("staffFullName")}
                    onCancel={() =>
                      setFormData({ ...formData, generalInformation: "" })
                    }
                    labelText="General Information"
                    tooltipText="Enter general information"
                    required
                  />
                </div>
              )}

              {staffFullNamePerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("staffFullName")}
                      id="staffFullName"
                      name="staffFullName"
                      value={formData.staffFullName}
                      onChange={handleChange}
                      onNext={() => focusNextInput("address")}
                      onCancel={() =>
                        setFormData({ ...formData, staffFullName: "" })
                      }
                      labelText="Staff Full Name"
                      tooltipText="Enter the staff full name"
                      required
                    />
                    <MoreVertical
                      className="h-4 w-4 cursor-pointer absolute right-8 top-6 transform -translate-y-1/2"
                      onClick={() => setIsOptionModalOpen(true)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Fields: Address, Asset Allocation, Type of Training, Training Program */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {addressPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("address")}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("assetAllocation")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText="Address"
                    tooltipText="Enter the address"
                    required
                  />
                </div>
              )}

              {assetAllocationPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("assetAllocation")}
                    id="assetAllocation"
                    name="assetAllocation"
                    value={formData.assetAllocation}
                    onChange={handleChange}
                    onNext={() => focusNextInput("typeOfTraining")}
                    onCancel={() =>
                      setFormData({ ...formData, assetAllocation: "" })
                    }
                    labelText="Asset Allocation"
                    tooltipText="Enter asset allocation"
                    required
                  />
                </div>
              )}

              {typeOfTrainingPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("typeOfTraining")}
                    id="typeOfTraining"
                    name="typeOfTraining"
                    value={formData.typeOfTraining}
                    onChange={handleChange}
                    onNext={() => focusNextInput("trainingProgram")}
                    onCancel={() =>
                      setFormData({ ...formData, typeOfTraining: "" })
                    }
                    labelText="Type of Training"
                    tooltipText="Enter type of training"
                    required
                  />
                </div>
              )}

              {trainingProgramPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("trainingProgram")}
                    id="trainingProgram"
                    name="trainingProgram"
                    value={formData.trainingProgram}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() =>
                      setFormData({ ...formData, trainingProgram: "" })
                    }
                    labelText="Training Program"
                    tooltipText="Enter training program"
                    required
                  />
                </div>
              )}
            </div>

            {/* Fields: Status, Default */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Status and Default sections */}

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
                        date: "Set default onboarding",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default onboarding",
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
                    tooltipText="Set as default onboarding"
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
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set delete shift type",
                      },
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
                    tooltipText="Set the onboarding status"
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
                  tooltipText="Shift Type Action History"
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

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Onboarding Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Onboarding translations saved:", data);
        }}
      />
    </>
  );
}
