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

type HolidayData = {
  id: number;
  supplierName: string;
  code: string;
  country: string;
  currency: string;
  paymentTerms: string;
  paymentType: string;
  dueDay: string;
  depositType: string;
  depositAmount: string;
  exchangeRate: string;
  localAmt: string;
  reference: string;
  poBox: string;
  contactPerson: string;
  landMark: string;
  zip: string;
  notification: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  website: string;
  createdAt: string | null;
  updatedAt: string | null;
  draftedAt: string | null;
  actionMessage: string;
  isActive: boolean;
  isDraft: boolean;
  isDefault: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: HolidayData = {
  id: 12,
  supplierName: "Global Tech Supplies Ltd.",
  code: "SUP-1045",
  country: "Bangladesh",
  currency: "BDT",
  paymentTerms: "Net 30",
  paymentType: "Bank Transfer",
  dueDay: "30",
  depositType: "Advance",
  depositAmount: "50000",
  exchangeRate: "1.00",
  localAmt: "50000",
  reference: "INV-2024-0098",
  poBox: "1219",
  contactPerson: "Shahidul Islam",
  landMark: "Near Motijheel Commercial Area",
  zip: "1000",
  notification: "Preferred Supplier",
  address: "House 23, Road 10, Banani, Dhaka",
  phone: "+8801712345678",
  fax: "+88029876543",
  email: "info@globaltechbd.com",
  website: "https://www.globaltechbd.com",
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

export default function SupplierMasterEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);
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

  // Form state
  const [formData, setFormData] = useState<HolidayData>({
    id: 0,
    supplierName: "Global Tech Supplies Ltd.",
    code: "SUP-1045",
    country: "Bangladesh",
    currency: "BDT",
    paymentTerms: "Net 30",
    paymentType: "Bank Transfer",
    dueDay: "30",
    depositType: "Advance",
    depositAmount: "50000",
    exchangeRate: "1.00",
    localAmt: "50000",
    reference: "INV-2024-0098",
    poBox: "1219",
    contactPerson: "Shahidul Islam",
    landMark: "Near Motijheel Commercial Area",
    zip: "1000",
    notification: "Preferred Supplier",
    address: "House 23, Road 10, Banani, Dhaka",
    phone: "+8801712345678",
    fax: "+88029876543",
    email: "info@globaltechbd.com",
    website: "https://www.globaltechbd.com",
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
  const canPdf: boolean = usePermission("transportMaster", "pdf");
  const canPrint: boolean = usePermission("transportMaster", "print");
  const canEdit: boolean = usePermission("transportMaster", "edit");

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

      setIsDefaultState(initialData.isDefault ? labels.yes : labels.no);
      setIsActiveState(initialData.isActive ? labels.yes : labels.no);
    }
  }, [isEdit, initialData, labels]);

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
      navigate("/supplier-master");
    }
    toastSuccess("Holiday Edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      id: 0,
      supplierName: "",
      code: "",
      country: "",
      currency: "",
      paymentTerms: "",
      paymentType: "",
      dueDay: "",
      depositType: "",
      depositAmount: "",
      exchangeRate: "",
      localAmt: "",
      reference: "",
      poBox: "",
      contactPerson: "",
      landMark: "",
      zip: "",
      notification: "",
      address: "",
      phone: "",
      fax: "",
      email: "",
      website: "",
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
    // setIsDefaultState(labels.no);
    setIsActiveState(labels.no);
    setIsDeletedState("");

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
        title: "Holiday Details",
        data: [countryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
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
      console.log("holidayData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Holiday Details"
          subtitle="Holiday Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Holiday-details.pdf";
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
          navigate("/supplier-master/create");
        } else {
          navigate("/supplier-master/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/supplier-master/view");
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
              toastRestore("Holiday saved as draft successfully");
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
        title={
          isEdit ? labels.editingSupplierMaster : labels.creatingSupplierMaster
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="supplier-master"
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {/* field - only show if user can create */}

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("supplierName")}
                      id="supplierName"
                      name="supplierName"
                      value={formData.supplierName}
                      onChange={handleChange}
                      onNext={() => focusNextInput("code")}
                      onCancel={() =>
                        setFormData({ ...formData, supplierName: "" })
                      }
                      labelText={labels.supplierNameTooltip}
                      tooltipText={labels.supplierNameTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("code")}
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      onNext={() => focusNextInput("country")}
                      onCancel={() =>
                        setFormData({ ...formData, code: "COD-571" })
                      }
                      labelText={labels.codeTooltip}
                      tooltipText={labels.codeTooltip}
                      required
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("country")(el)}
                    id="country"
                    name="country"
                    options={["Bahamas", "Barbados", "Jamaica", "Trinidad"]}
                    value={formData.country}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        country: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("currency");
                    }}
                    onEnterPress={() => {
                      if (formData.country) {
                        focusNextInput("currency");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.countryTooltip}
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

              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("currency")(el)}
                    id="currency"
                    name="currency"
                    options={["BDT", "INR", "USD", "EUR"]}
                    value={formData.currency}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        currency: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("paymentTerms");
                    }}
                    onEnterPress={() => {
                      if (formData.currency) {
                        focusNextInput("paymentTerms");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.currencyTooltip}
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
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("paymentTerms")(el)}
                    id="paymentTerms"
                    name="paymentTerms"
                    options={["Net 15", "Net 30", "Net 45", "Net 60"]}
                    value={formData.paymentTerms}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentTerms: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("dueDay");
                    }}
                    onEnterPress={() => {
                      if (formData.paymentTerms) {
                        focusNextInput("dueDay");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.paymentTermsTooltip}
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

              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("dueDay")(el)}
                    id="dueDay"
                    name="dueDay"
                    options={["1st", "2nd", "3rd", "4th"]}
                    value={formData.dueDay}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        dueDay: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("depositType");
                    }}
                    onEnterPress={() => {
                      if (formData.dueDay) {
                        focusNextInput("depositType");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.dueDayTooltip}
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

              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("depositType")(el)}
                    id="depositType"
                    name="depositType"
                    options={["Cash", "Cheque", "Bank Transfer"]}
                    value={formData.depositType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        depositType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("depositAmount");
                    }}
                    onEnterPress={() => {
                      if (formData.depositType) {
                        focusNextInput("depositAmount");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.depositTypeTooltip}
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

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("depositAmount")}
                      id="depositAmount"
                      name="depositAmount"
                      value={formData.depositAmount}
                      onChange={handleChange}
                      onNext={() => focusNextInput("paymentType")}
                      onCancel={() =>
                        setFormData({ ...formData, depositAmount: "" })
                      }
                      labelText={labels.depositAmountTooltip}
                      tooltipText={labels.depositAmountTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("paymentType")(el)}
                    id="paymentType"
                    name="paymentType"
                    options={["Cash", "Cheque", "Bank Transfer"]}
                    value={formData.paymentType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("currency");
                    }}
                    onEnterPress={() => {
                      if (formData.paymentType) {
                        focusNextInput("currency");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.paymentTypeTooltip}
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

              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("currency")(el)}
                    id="currency"
                    name="currency"
                    options={["USD", "EUR", "GBP"]}
                    value={formData.currency}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        currency: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("exchangeRate");
                    }}
                    onEnterPress={() => {
                      if (formData.currency) {
                        focusNextInput("exchangeRate");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.currencyTooltip}
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

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("exchangeRate")}
                      id="exchangeRate"
                      name="exchangeRate"
                      value={formData.exchangeRate}
                      onChange={handleChange}
                      onNext={() => focusNextInput("localAmt")}
                      onCancel={() =>
                        setFormData({ ...formData, exchangeRate: "" })
                      }
                      labelText={labels.exchangeRateTooltip}
                      tooltipText={labels.exchangeRateTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("localAmt")}
                      id="localAmt"
                      name="localAmt"
                      value={formData.localAmt}
                      onChange={handleChange}
                      onNext={() => focusNextInput("notification")}
                      onCancel={() =>
                        setFormData({ ...formData, localAmt: "" })
                      }
                      labelText={labels.localAmtTooltip}
                      tooltipText={labels.localAmtTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("notification")(el)}
                    id="notification"
                    name="notification"
                    options={["Yes", "No"]}
                    value={formData.notification}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        notification: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("address");
                    }}
                    onEnterPress={() => {
                      if (formData.notification) {
                        focusNextInput("address");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.notificationTooltip}
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

              {/* field - only show if user can create */}
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("address")}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("landMark")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText={labels.addressTooltip}
                    tooltipText={labels.addressTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("landMark")}
                    id="landMark"
                    name="landMark"
                    value={formData.landMark}
                    onChange={handleChange}
                    onNext={() => focusNextInput("reference")}
                    onCancel={() => setFormData({ ...formData, landMark: "" })}
                    labelText={labels.landMarkTooltip}
                    tooltipText={labels.landMarkTooltip}
                    required
                  />
                </div>
              )}
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("reference")}
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    onNext={() => focusNextInput("contactPerson")}
                    onCancel={() => setFormData({ ...formData, reference: "" })}
                    labelText={labels.referenceTooltip}
                    tooltipText={labels.referenceTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("contactPerson")}
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    onNext={() => focusNextInput("phone")}
                    onCancel={() =>
                      setFormData({ ...formData, contactPerson: "" })
                    }
                    labelText={labels.contactPersonTooltip}
                    tooltipText={labels.contactPersonTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("phone")}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onNext={() => focusNextInput("poBox")}
                    onCancel={() => setFormData({ ...formData, phone: "" })}
                    labelText={labels.phoneTooltip}
                    tooltipText={labels.phoneTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("poBox")}
                    id="poBox"
                    name="poBox"
                    value={formData.poBox}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, poBox: "" })}
                    labelText={labels.poBoxTooltip}
                    tooltipText={labels.poBoxTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("fax")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText={labels.emailTooltip}
                    tooltipText={labels.emailTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("fax")}
                    id="fax"
                    name="fax"
                    value={formData.fax}
                    onChange={handleChange}
                    onNext={() => focusNextInput("zip")}
                    onCancel={() => setFormData({ ...formData, fax: "" })}
                    labelText={labels.faxTooltip}
                    tooltipText={labels.faxTooltip}
                    required
                  />
                </div>
              )}
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("zip")}
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    onNext={() => focusNextInput("website")}
                    onCancel={() => setFormData({ ...formData, zip: "" })}
                    labelText={labels.zipTooltip}
                    tooltipText={labels.zipTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canEdit && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("website")}
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, website: "" })}
                    labelText={labels.websiteTooltip}
                    tooltipText={labels.websiteTooltip}
                    required
                  />
                </div>
              )}

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

              {/* field - only show if user can create */}
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
