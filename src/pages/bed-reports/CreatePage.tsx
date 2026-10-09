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

type BedTransferData = {
  patientId: string;
  roomName: string;
  bedNumber: string;
  charge: number;
  assignDate: string;
  dischargeDate: string;
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

const initialData: BedTransferData = {
  patientId: "",
  roomName: "",
  bedNumber: "",
  charge: 0,
  assignDate: new Date().toISOString().split("T")[0],
  dischargeDate: new Date().toISOString().split("T")[0],
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

export default function BedReportsFormPage({ isEdit = false }: Props) {
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
  const patientIdPerm: boolean = usePermission(
    "bed-reports",
    "create",
    "patientId"
  );
  const roomNamePerm: boolean = usePermission(
    "bed-reports",
    "create",
    "roomName"
  );
  const bedNumberPerm: boolean = usePermission(
    "bed-reports",
    "create",
    "bedNumber"
  );
  const chargePerm: boolean = usePermission("bed-reports", "create", "charge");
  const assignDatePerm: boolean = usePermission(
    "bed-reports",
    "create",
    "assignDate"
  );
  const dischargeDatePerm: boolean = usePermission(
    "bed-reports",
    "create",
    "dischargeDate"
  );
  const descriptionPerm: boolean = usePermission(
    "bed-reports",
    "create",
    "description"
  );
  const statusPerm: boolean = usePermission("bed-reports", "create", "status");
  const isDefaultPerm: boolean = usePermission(
    "bed-reports",
    "create",
    "isDefault"
  );
  const canPdf: boolean = usePermission("bed-reports", "pdf");
  const canPrint: boolean = usePermission("bed-reports", "print");

  // Form state
  const [formData, setFormData] = useState<BedTransferData>({
    patientId: "",
    roomName: "",
    bedNumber: "",
    charge: 0,
    assignDate: new Date().toISOString().split("T")[0],
    dischargeDate: new Date().toISOString().split("T")[0],
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

  // Update translation data when patientId changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.patientId || "", arabic: "", bangla: "" },
    ]);
  }, [formData.patientId]);

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
          navigate("/bed-reports/create");
        } else {
          navigate("/bed-reports/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/bed-reports/view");
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
      [name]:
        type === "checkbox"
          ? checked
          : name === "charge"
          ? Number(value)
          : value,
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
      toastSuccess("Bed report created successfully!");
      handleReset();
    } else {
      toastSuccess("Bed report created successfully!");
      navigate("/bed-reports");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handleReset = async () => {
    setFormData({
      patientId: "",
      roomName: "",
      bedNumber: "",
      charge: 0,
      assignDate: new Date().toISOString().split("T")[0],
      dischargeDate: new Date().toISOString().split("T")[0],
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
      inputRefs.current["patientId"]?.focus();
    }, 100);
  };

  const handlePrintReport = (reportData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Bed Report Details",
        data: [reportData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          patientId: "Patient ID",
          roomName: "Room Name",
          bedNumber: "Bed Number",
          charge: "Charge",
          assignDate: "Assign Date",
          dischargeDate: "Discharge Date",
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
          title="Bed Report Details"
          subtitle="Bed Report Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bed-reports-details.pdf";
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
              toastRestore("Bed report saved as draft successfully");
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
        moduleId="bed-reports-form-module"
        moduleName={isEdit ? "Edit Bed Report" : "Adding Bed Report"}
        moduleRoute={
          isEdit
            ? `/bed-reports/edit/${formData.patientId || "new"}`
            : "/bed-reports/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Bed Report" : "Add Bed Report"}
        listPath="bed-reports"
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
        module="bed-reports"
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
            {/* Fields: Patient ID, Room Name, Bed Number, Charge, Assign Date, Discharge Date, Description */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-8 relative">
              {patientIdPerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("patientId")}
                      id="patientId"
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleChange}
                      onNext={() => focusNextInput("roomName")}
                      onCancel={() =>
                        setFormData({ ...formData, patientId: "" })
                      }
                      labelText="Patient ID"
                      tooltipText="Enter the patient ID"
                      required
                    />
                    <MoreVertical
                      className="h-4 w-4 cursor-pointer absolute right-8 top-6 transform -translate-y-1/2"
                      onClick={() => setIsOptionModalOpen(true)}
                    />
                  </div>
                </div>
              )}

              {roomNamePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("roomName")}
                    id="roomName"
                    name="roomName"
                    value={formData.roomName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("bedNumber")}
                    onCancel={() => setFormData({ ...formData, roomName: "" })}
                    labelText="Room Name"
                    tooltipText="Enter the room name"
                    required
                  />
                </div>
              )}

              {bedNumberPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("bedNumber")}
                    id="bedNumber"
                    name="bedNumber"
                    value={formData.bedNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("charge")}
                    onCancel={() => setFormData({ ...formData, bedNumber: "" })}
                    labelText="Bed Number"
                    tooltipText="Enter the bed number"
                    required
                  />
                </div>
              )}

              {chargePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("charge")}
                    id="charge"
                    name="charge"
                    value={String(formData.charge)}
                    onChange={handleChange}
                    onNext={() => focusNextInput("assignDate")}
                    onCancel={() => setFormData({ ...formData, charge: 0 })}
                    labelText="Charge"
                    tooltipText="Enter the charge amount"
                    type="number"
                    required
                  />
                </div>
              )}

              {assignDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("assignDate")}
                    id="assignDate"
                    name="assignDate"
                    value={formData.assignDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("dischargeDate")}
                    onCancel={() =>
                      setFormData({ ...formData, assignDate: "" })
                    }
                    labelText="Assign Date"
                    tooltipText="Enter the assign date"
                    type="date"
                    required
                  />
                </div>
              )}

              {dischargeDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("dischargeDate")}
                    id="dischargeDate"
                    name="dischargeDate"
                    value={formData.dischargeDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() =>
                      setFormData({ ...formData, dischargeDate: "" })
                    }
                    labelText="Discharge Date"
                    tooltipText="Enter the discharge date"
                    type="date"
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
                    onNext={() => focusNextInput("statusSwitch")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter the description"
                    required
                  />
                </div>
              )}

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
                        date: "Set default bed report",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default bed report",
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
                    tooltipText="Set as default bed report"
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
                    tooltipText="Set the bed report status"
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
        title="Bed Report Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Bed report translations saved:", data);
        }}
      />
    </>
  );
}
