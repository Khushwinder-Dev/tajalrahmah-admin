/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Autocomplete } from "@/components/common/Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type ComplementariesData = {
  roomType: string;
  complementary: string;
  rate: number;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ComplementariesData = {
  roomType: "Standard Room",
  complementary: "Breakfast",
  rate: 25.0,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

export default function ComplementariesEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<ComplementariesData>({
    roomType: "",
    complementary: "",
    rate: 0,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
  });

  // Permission checks
  const canCreate = usePermission("complementaries", "create");
  const canView = usePermission("complementaries", "view");
  const canEdit = usePermission("complementaries", "edit");
  const canDelete = usePermission("complementaries", "delete");

  // Field-level permissions
  const permissionsFields = usePermission<keyof ComplementariesData>(
    "complementaries",
    "edit",
    ["roomType", "complementary", "rate", "isDraft"]
  );

  const canPdf: boolean = usePermission("complementaries", "pdf");
  const canPrint: boolean = usePermission("complementaries", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

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
    }
  }, [isEdit]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value) || 0
          : value,
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
      handlePrintComplementary(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("roomType");
    } else {
      navigate("/complementaries");
    }
    toastSuccess("Complementary edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      roomType: "",
      complementary: "",
      rate: 0,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["roomType"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintComplementary = (complementaryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Complementary Details",
        data: [complementaryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          roomType: "Room Type",
          complementary: "Complementary Service",
          rate: "Rate",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
      console.log("complementaryData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Complementary Details"
          subtitle="Complementary Service Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "complementary-details.pdf";
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
          navigate("/complementaries/create");
        } else {
          navigate("/complementaries/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/complementaries/view");
      },
      // Only show if user has permission
      show: canView,
    },
  ]);

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
              toastRestore("Complementary record saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Complementary" : "Creating Complementary"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="complementaries"
        activePage="edit"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        additionalFooterButtons={
          // Only show buttons if user can edit
          canEdit ? (
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
            {/* Basic Complementary Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 relative">
              {permissionsFields.roomType && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("roomType")}
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    onNext={() => focusNextInput("complementary")}
                    onCancel={() => setFormData({ ...formData, roomType: "" })}
                    labelText="Room Type"
                    tooltipText="Enter room type (e.g., Standard Room, Suite)"
                    required
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.complementary && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("complementary")}
                    id="complementary"
                    name="complementary"
                    value={formData.complementary}
                    onChange={handleChange}
                    onNext={() => focusNextInput("rate")}
                    onCancel={() =>
                      setFormData({ ...formData, complementary: "" })
                    }
                    labelText="Complementary Service"
                    tooltipText="Enter complementary service description"
                    required
                    maxLength={500}
                  />
                </div>
              )}
            </div>

            {/* Rate and Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 relative">
              {permissionsFields.rate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("rate")}
                    id="rate"
                    name="rate"
                    type="number"
                    value={formData.rate.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDraft")}
                    onCancel={() => setFormData({ ...formData, rate: 0 })}
                    labelText="Rate"
                    tooltipText="Enter service rate in dollars"
                    required
                    min={0}
                    step={0.01}
                  />
                </div>
              )}

              {permissionsFields.isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={formData.isDraft ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: isYes,
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
