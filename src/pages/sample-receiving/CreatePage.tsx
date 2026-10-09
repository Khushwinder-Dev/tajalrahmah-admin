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

const initialData: SampleReceivingData = {
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
  isUpdated: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function SampleReceivingFormPage({ isEdit = false }: Props) {
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
  const branchPerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "branch"
  );
  const receivingNoPerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "receivingNo"
  );
  const clientNamePerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "clientName"
  );
  const clientReferencePerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "clientReference"
  );
  const typeOfSamplePerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "typeOfSample"
  );
  const requiredTestsPerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "requiredTests"
  );
  const numberOfSamplePerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "numberOfSample"
  );
  const sectionPerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "section"
  );
  const deliveredByPerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "deliveredBy"
  );
  const receivedByPerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "receivedBy"
  );
  const receivingDatePerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "receivingDate"
  );
  const receivingTimePerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "receivingTime"
  );
  const statusPerm: boolean = usePermission(
    "sample-receiving",
    "create",
    "status"
  );
  const isDefaultPerm: boolean = usePermission(
    "sample-receiving",
    "create",
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
    isUpdated: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Update translation data when clientName changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.clientName || "", arabic: "", bangla: "" },
    ]);
  }, [formData.clientName]);

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
          navigate("/sample-receiving/create");
        } else {
          navigate("/sample-receiving/edit/undefined");
        }
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
      toastSuccess("Sample Receiving created successfully!");
      handleReset();
    } else {
      toastSuccess("Sample Receiving created successfully!");
      navigate("/sample-receiving");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

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
      inputRefs.current["branch"]?.focus();
    }, 100);
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
              toastRestore("Sample Receiving saved as draft successfully");
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
        moduleId="sample-receiving-form-module"
        moduleName={
          isEdit ? "Edit Sample Receiving" : "Adding Sample Receiving"
        }
        moduleRoute={
          isEdit
            ? `/sample-receiving/edit/${formData.receivingNo || "new"}`
            : "/sample-receiving/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Sample Receiving" : "Add Sample Receiving"}
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
        activePage="create"
        module="sample-receiving"
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
                    tooltipText="Enter the branch name"
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
                    tooltipText="Enter the person who delivered"
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
                    tooltipText="Enter the person who received"
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

            {/* Status and Default sections */}
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
                        date: "Set default sample receiving",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default sample receiving",
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
                    tooltipText="Set as default sample receiving"
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
                    tooltipText="Set the sample receiving status"
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
