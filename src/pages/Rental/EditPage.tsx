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
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type RentalData = {
  id: number;
  seg: string;
  name: string;
  number: number;
  agreementAmount: number;
  agreementName: string;
  agreementType: string;
  agreementDate: string;
  expireDate: string;
  installmentNo: number;
  installmentAmount: number;
  installmentPlan: string;
  NotificationDays: number;
  description: string;
  status: string;
  createdAt: string | null;
  updatedAt: string | null;
  draftedAt: string | null;
  actionMessage: string;
  isActive: boolean;
  isDraft: boolean;
  isDefault: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  title_ar?: string;
  title_hi?: string;
  title_ur?: string;
  title_bn?: string;
};

type Props = {
  isEdit?: boolean;
};

const initialData: RentalData = {
  id: 12,
  seg: "012",
  name: "Security Asset",
  number: 0,
  agreementAmount: 0,
  agreementName: "Agreement 12",
  agreementType: "Rent",
  agreementDate: "2022-12-01",
  expireDate: "2023-12-01",
  installmentNo: 3,
  installmentAmount: 1200,
  installmentPlan: "Quarterly",
  NotificationDays: 12,
  description: "Asset for security systems and services.",
  status: "active",
  createdAt: "2023-01-15",
  updatedAt: "2023-11-20",
  draftedAt: "2023-01-10",
  actionMessage: "",
  isActive: true,
  isDraft: false,
  isDefault: false,
  isDeleted: false,
  isUpdated: false,
};

export default function RentalEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
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
  const [isDeletedState, setIsDeletedState] = useState<
    "Delete" | "Restore" | string
  >("");

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [, setCountryLanguageValues] = useState<Record<string, string>>({});

  const categoryData = ["Bank", "Company", "Organization", "Building", "Hotel"];

  // Form state
  const [formData, setFormData] = useState<RentalData>({
    id: 0,
    seg: "",
    name: "",
    number: 0,
    agreementAmount: 0,
    agreementName: "",
    agreementType: "",
    agreementDate: "",
    expireDate: "",
    installmentNo: 0,
    installmentAmount: 0,
    installmentPlan: "",
    NotificationDays: 0,
    description: "",
    status: "",
    createdAt: null,
    updatedAt: null,
    draftedAt: null,
    actionMessage: "",
    isActive: true,
    isDraft: false,
    isDefault: false,
    isDeleted: false,
    isUpdated: false,
  });

  // get permission
  const canPdf: boolean = usePermission("assets", "pdf");
  const canPrint: boolean = usePermission("assets", "print");

  // Country codes for autocomplete
  // const countryCodes = ["US", "CA", "GB", "AU", "DE", "FR"];

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

      // Initialize language values if they exist
      setCountryLanguageValues({
        ar: initialData.title_ar || "",
        hi: initialData.title_hi || "",
        ur: initialData.title_ur || "",
        bn: initialData.title_bn || "",
      });
      setIsDefaultState(initialData.isDefault ? labels.yes : labels.no);
      setIsActiveState(initialData.isActive ? labels.yes : labels.no);
    }
  }, [isEdit, initialData, labels]);

  // Handle drag events

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
      handlePrintCountry(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("code");
    } else {
      navigate("/rental");
    }
    toastSuccess("Rental Edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      id: 0,
      seg: "",
      name: "",
      number: 0,
      agreementAmount: 0,
      agreementName: "",
      agreementType: "",
      agreementDate: "",
      expireDate: "",
      installmentNo: 0,
      installmentAmount: 0,
      installmentPlan: "",
      NotificationDays: 0,
      description: "",
      status: "active",
      createdAt: "",
      updatedAt: "",
      draftedAt: null,
      actionMessage: "",
      isActive: true,
      isDraft: false,
      isDefault: false,
      isDeleted: false,
      isUpdated: false,
    });
    setIsDefaultState(labels.no);
    setIsActiveState(labels.no);
    setIsDeletedState("");
    setCountryLanguageValues({});

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  // Trigger file input click

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintCountry = (countryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Asset Master Details",
        data: [countryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: labels.code,
          title: labels.country,
          callingCode: labels.calling,
          isDefault: labels.default,
          isActive: "Active Status",
          isDraft: labels.draft,
          isDeleted: "Deleted Status",
          rating: "Rating",
          flag: "Flag",
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
      console.log("countryData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Asset Details"
          subtitle="Asset Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "countries-details.pdf";
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
          navigate("/rental/create");
        } else {
          navigate("/rental/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/assets/view");
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
            label: labels.draft,
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("Rental saved as draft successfully");
            },
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, labels]);

  return (
    <>
      <PageLayout
        title={isEdit ? labels.editingRental : labels.editingRental}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="rental"
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
              {labels.reset}
            </Button>
            <Button
              ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
              id="submitButton"
              name="submitButton"
              variant="outline"
              className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold! focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:transform focus:scale-105 focus:transition-all focus:duration-300`}
              onClick={() => formRef.current?.requestSubmit()}
            >
              {labels.submit}
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
            {/* First Row: Code, Calling Code, Country */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("seg")}
                    id="seg"
                    name="seg"
                    value={formData.seg}
                    onChange={handleChange}
                    onNext={() => focusNextInput("name")}
                    onCancel={() => setFormData({ ...formData, seg: "" })}
                    labelText={labels.segTooltip}
                    tooltipText={labels.segTooltip}
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("number")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText={labels.rentalNameTooltip}
                    tooltipText={labels.rentalNameTooltip}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("number")}
                    id="number"
                    name="number"
                    value={formData.number ? formData.number.toString() : ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("agreementAmount")}
                    onCancel={() => setFormData({ ...formData, number: 0 })}
                    labelText={labels.agreementNumberTooltip}
                    tooltipText={labels.agreementNumberTooltip}
                    required
                    type="number"
                    min={0}
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("agreementAmount")}
                    id="agreementAmount"
                    name="agreementAmount"
                    value={
                      formData.agreementAmount
                        ? formData.agreementAmount.toString()
                        : ""
                    }
                    onChange={handleChange}
                    onNext={() => focusNextInput("agreementType")}
                    onCancel={() =>
                      setFormData({ ...formData, agreementAmount: 0 })
                    }
                    labelText={labels.agreementAmountTooltip}
                    tooltipText={labels.agreementAmountTooltip}
                    required
                    type="number"
                    min={0}
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("agreementType")(el)}
                  id="agreementType"
                  name="agreementType"
                  allowCustomInput={true}
                  options={categoryData}
                  value={formData.agreementType}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, agreementType: value });
                    if (value) {
                      focusNextInput("agreementDate");
                    }
                  }}
                  onEnterPress={() => {
                    if (formData.agreementType) {
                      focusNextInput("agreementDate");
                    }
                  }}
                  placeholder=" "
                  labelText={labels.agreementTypeTooltip}
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
                  setRef={setRef("agreementDate")}
                  id="agreementDate"
                  name="agreementDate"
                  value={formData.agreementDate}
                  onChange={handleChange}
                  onNext={() => focusNextInput("installmentPlan")}
                  onCancel={() =>
                    setFormData({ ...formData, agreementDate: "" })
                  }
                  labelText={labels.agreementDateTooltip}
                  tooltipText={labels.agreementDateTooltip}
                  required
                  type="date"
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("installmentNo")}
                  id="installmentNo"
                  name="installmentNo"
                  value={
                    formData.installmentNo
                      ? formData.installmentNo.toString()
                      : ""
                  }
                  onChange={handleChange}
                  onNext={() => focusNextInput("installmentPlan")}
                  onCancel={() =>
                    setFormData({ ...formData, installmentNo: 0 })
                  }
                  labelText={labels.installmentNoTooltip}
                  tooltipText={labels.installmentNoTooltip}
                  required
                  type="number"
                  min={0}
                  disabled
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("installmentPlan")}
                  id="installmentPlan"
                  name="installmentPlan"
                  value={formData.installmentPlan}
                  onChange={handleChange}
                  onNext={() => focusNextInput("expireDate")}
                  onCancel={() =>
                    setFormData({ ...formData, installmentPlan: "" })
                  }
                  labelText={labels.installmentPlanTooltip}
                  tooltipText={labels.installmentPlanTooltip}
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("installmentAmount")}
                  id="installmentAmount"
                  name="installmentAmount"
                  value={
                    formData.installmentAmount
                      ? formData.installmentAmount.toString()
                      : ""
                  }
                  onChange={handleChange}
                  onNext={() => focusNextInput("expireDate")}
                  onCancel={() =>
                    setFormData({ ...formData, installmentAmount: 0 })
                  }
                  labelText={labels.installmentAmountTooltip}
                  tooltipText={labels.installmentAmountTooltip}
                  required
                  type="number"
                  min={0}
                  disabled
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("expireDate")}
                  id="expireDate"
                  name="expireDate"
                  value={formData.expireDate}
                  onChange={handleChange}
                  onNext={() => focusNextInput("NotificationDays")}
                  onCancel={() => setFormData({ ...formData, expireDate: "" })}
                  labelText={labels.installExpireDateTooltip}
                  tooltipText={labels.installExpireDateTooltip}
                  required
                  type="date"
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("NotificationDays")}
                  id="NotificationDays"
                  name="NotificationDays"
                  value={
                    formData.NotificationDays
                      ? formData.NotificationDays.toString()
                      : ""
                  }
                  onChange={handleChange}
                  onNext={() => focusNextInput("description")}
                  onCancel={() =>
                    setFormData({ ...formData, NotificationDays: 0 })
                  }
                  labelText={labels.NotificationDaysTooltip}
                  tooltipText={labels.NotificationDaysTooltip}
                  required
                  type="number"
                  min={0}
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
                  labelText={labels.descriptionTooltip}
                  tooltipText={labels.descriptionTooltip}
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isDefault")(el)}
                  id="isDefault"
                  name="isDefault"
                  options={[labels.no, labels.yes]}
                  isSelectableOnly={true}
                  value={isDefaultState === "Yes" ? labels.yes : labels.no}
                  onValueChange={(value: string) => {
                    const isYes = value === labels.yes;
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
                  labelText={labels.default}
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
                  labelText="Inactive"
                  isSelectableOnly={true}
                  options={[labels.no, labels.yes]}
                  value={isActiveState === "Yes" ? labels.yes : labels.no}
                  onValueChange={(value: string) => {
                    const isYes = value === labels.yes;
                    setIsActiveState(isYes ? "Yes" : "No");
                    setFormData((prev) => ({
                      ...prev,
                      isActive: isYes,
                    }));
                    focusNextInput("isDeleted");
                  }}
                  onEnterPress={() => {
                    focusNextInput("isDeleted");
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

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isDeleted")(el)}
                  id="isDeleted"
                  name="isDeleted"
                  labelText="Status"
                  isSelectableOnly={true}
                  options={["Delete", "Restore"]}
                  value={isDeletedState}
                  onValueChange={(value: "Delete" | "Restore") => {
                    if (value === "Delete" || value === "Restore") {
                      setIsDeletedState(value);
                      const newValue = value === "Delete";
                      setFormData((prev) => ({
                        ...prev,
                        isDeleted: newValue,
                      }));
                    }
                  }}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      focusNextInput("fileUploadElement");
                    }
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

            {/* Flag Upload
            <div className="space-y-2 my-8 pt-4 cursor-pointer relative">
              <div
                className={`border-2 border-dashed rounded-lg p-6 bg-[#f8fafc] text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                tabIndex={0}
                ref={(el) => setRef("fileUploadElement")(el as HTMLElement)}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (imagePreview) {
                      setImagePreview(null);
                      setFormData({ ...formData, flag: null });
                      setTimeout(() => {
                        triggerFileInput();
                      }, 0);
                    } else {
                      triggerFileInput();
                    }
                  }
                }}
              >
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt={labels.flagPreview}
                      className="w-40 h-28 object-contain rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setFormData({ ...formData, flag: null });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-14">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="text-base text-gray-500">
                      {labels.dragDropImage}
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div> */}
          </form>
        </div>
      </PageLayout>

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
