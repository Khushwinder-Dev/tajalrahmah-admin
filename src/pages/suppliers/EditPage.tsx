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

type SupplierData = {
  sn: string;
  country: string;
  supplierName: string;
  paymentTerms: string;
  dueDays: number;
  typeOfDeposit: string;
  paymentType: string;
  depositAmount: number;
  currency: string;
  exchangeRate: number;
  localAmt: number;
  contactPerson: string;
  mobileNo: string;
  email: string;
  website: string;
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

const initialData: SupplierData = {
  sn: "001",
  country: "Saudi Arabia",
  supplierName: "Global Suppliers Ltd",
  paymentTerms: "Net 30",
  dueDays: 30,
  typeOfDeposit: "Bank Guarantee",
  paymentType: "Wire Transfer",
  depositAmount: 5000,
  currency: "USD",
  exchangeRate: 3.75,
  localAmt: 18750,
  contactPerson: "Ahmed Al-Rashid",
  mobileNo: "+966-50-123-4567",
  email: "ahmed@globalsuppliers.com",
  website: "www.globalsuppliers.com",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function SupplierEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No" | string>("No");

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<SupplierData>({
    sn: "",
    country: "",
    supplierName: "",
    paymentTerms: "",
    dueDays: 30,
    typeOfDeposit: "",
    paymentType: "",
    depositAmount: 0,
    currency: "USD",
    exchangeRate: 1.0,
    localAmt: 0,
    contactPerson: "",
    mobileNo: "",
    email: "",
    website: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Permission checks
  const canCreate = usePermission("supplier", "create");
  const canView = usePermission("supplier", "view");
  const canEdit = usePermission("supplier", "edit");
  const canDelete = usePermission("supplier", "delete");

  // Field-level permissions
  const permissionsFields = usePermission<keyof SupplierData>(
    "supplier",
    "edit",
    [
      "sn",
      "country",
      "supplierName",
      "paymentTerms",
      "dueDays",
      "typeOfDeposit",
      "paymentType",
      "depositAmount",
      "currency",
      "exchangeRate",
      "localAmt",
      "contactPerson",
      "mobileNo",
      "email",
      "website",
      "isDefault",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("supplier", "pdf");
  const canPrint: boolean = usePermission("supplier", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const paymentTermsOptions = [
    "Net 15",
    "Net 30",
    "Net 45",
    "Net 60",
    "Net 90",
    "Net 120",
    "Net 180",
  ];

  const countryOptions = [
    "Saudi Arabia",
    "UAE",
    "Kuwait",
    "Bahrain",
    "Qatar",
    "Oman",
    "Jordan",
    "Lebanon",
    "Egypt",
    "Iraq",
    "Turkey",
    "Greece",
    "India",
    "Pakistan",
    "Bangladesh",
    "Sri Lanka",
    "Malaysia",
    "Singapore",
    "Indonesia",
    "Thailand",
    "Vietnam",
    "Philippines",
    "China",
    "Japan",
    "South Korea",
    "Australia",
    "New Zealand",
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Belgium",
    "Switzerland",
    "Austria",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
  ];

  const typeOfDepositOptions = [
    "Bank Guarantee",
    "Letter of Credit",
    "Cash Deposit",
    "Security Bond",
    "Performance Bond",
    "Advance Payment",
    "No Deposit Required",
  ];

  const paymentTypeOptions = [
    "Wire Transfer",
    "Bank Transfer",
    "Credit Card",
    "Check",
    "Cash",
    "Digital Payment",
    "Letter of Credit",
  ];

  const currencyOptions = [
    "USD",
    "EUR",
    "GBP",
    "SAR",
    "AED",
    "KWD",
    "BHD",
    "QAR",
    "OMR",
    "JOD",
    "LBP",
    "EGP",
    "IQD",
    "TRY",
    "IRR",
    "PKR",
    "INR",
    "CNY",
    "JPY",
    "KRW",
    "SGD",
    "MYR",
    "THB",
    "VND",
    "PHP",
    "AUD",
    "NZD",
    "CAD",
    "CHF",
    "SEK",
    "NOK",
    "DKK",
  ];

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
    // Normal submit logic here (API call)

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintSupplier(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("sn");
    } else {
      navigate("/supplier");
    }
    toastSuccess("Supplier record edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      sn: "",
      country: "",
      supplierName: "",
      paymentTerms: "",
      dueDays: 30,
      typeOfDeposit: "",
      paymentType: "",
      depositAmount: 0,
      currency: "USD",
      exchangeRate: 1.0,
      localAmt: 0,
      contactPerson: "",
      mobileNo: "",
      email: "",
      website: "",
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
    setIsDraftState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["sn"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintSupplier = (supplierData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Supplier Details",
        data: [supplierData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          country: "Country",
          supplierName: "Supplier Name",
          paymentTerms: "Payment Terms",
          dueDays: "Due Days",
          typeOfDeposit: "Type of Deposit",
          paymentType: "Payment Type",
          depositAmount: "Deposit Amount",
          currency: "Currency",
          exchangeRate: "Exchange Rate",
          localAmt: "Local Amount",
          contactPerson: "Contact Person",
          mobileNo: "Mobile No",
          email: "Email",
          website: "Website",
          isDefault: "Default Supplier",
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
      console.log("supplierData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Supplier Details"
          subtitle="Supplier Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "supplier-details.pdf";
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
          navigate("/supplier/create");
        } else {
          navigate("/supplier/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/supplier/view");
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
              toastRestore("Supplier record saved as draft successfully");
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
        title={isEdit ? "Editing Supplier" : "Creating Supplier"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="supplier"
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
            {/* Basic Supplier Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.sn && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("sn")}
                    id="sn"
                    name="sn"
                    value={formData.sn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("country")}
                    onCancel={() => setFormData({ ...formData, sn: "" })}
                    labelText="SN"
                    tooltipText="Enter serial number (e.g., 001, 002)"
                    required
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.country && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("country")(el)}
                    id="country"
                    name="country"
                    options={countryOptions}
                    value={formData.country}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        country: value,
                      }));
                      focusNextInput("supplierName");
                    }}
                    onEnterPress={() => {
                      if (formData.country) {
                        focusNextInput("supplierName");
                      }
                    }}
                    placeholder=" "
                    labelText="Country"
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

              {permissionsFields.supplierName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("supplierName")}
                    id="supplierName"
                    name="supplierName"
                    value={formData.supplierName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("paymentTerms")}
                    onCancel={() =>
                      setFormData({ ...formData, supplierName: "" })
                    }
                    labelText="Supplier Name"
                    tooltipText="Enter supplier company name"
                    required
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.paymentTerms && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("paymentTerms")(el)}
                    id="paymentTerms"
                    name="paymentTerms"
                    options={paymentTermsOptions}
                    value={formData.paymentTerms}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentTerms: value,
                      }));
                      focusNextInput("dueDays");
                    }}
                    onEnterPress={() => {
                      if (formData.paymentTerms) {
                        focusNextInput("dueDays");
                      }
                    }}
                    placeholder=" "
                    labelText="Payment Terms"
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

              {permissionsFields.dueDays && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("dueDays")}
                    id="dueDays"
                    name="dueDays"
                    value={formData.dueDays.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("typeOfDeposit")}
                    onCancel={() => setFormData({ ...formData, dueDays: 30 })}
                    labelText="Due Days"
                    tooltipText="Enter number of days for payment (e.g., 30, 45, 60)"
                    required
                    type="number"
                    min="1"
                    max="365"
                    maxLength={3}
                  />
                </div>
              )}
            </div>

            {/* Payment and Deposit Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.typeOfDeposit && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("typeOfDeposit")(el)}
                    id="typeOfDeposit"
                    name="typeOfDeposit"
                    options={typeOfDepositOptions}
                    value={formData.typeOfDeposit}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        typeOfDeposit: value,
                      }));
                      focusNextInput("paymentType");
                    }}
                    onEnterPress={() => {
                      if (formData.typeOfDeposit) {
                        focusNextInput("paymentType");
                      }
                    }}
                    placeholder=" "
                    labelText="Type of Deposit"
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

              {permissionsFields.paymentType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("paymentType")(el)}
                    id="paymentType"
                    name="paymentType"
                    options={paymentTypeOptions}
                    value={formData.paymentType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentType: value,
                      }));
                      focusNextInput("depositAmount");
                    }}
                    onEnterPress={() => {
                      if (formData.paymentType) {
                        focusNextInput("depositAmount");
                      }
                    }}
                    placeholder=" "
                    labelText="Payment Type"
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

              {permissionsFields.depositAmount && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("depositAmount")}
                    id="depositAmount"
                    name="depositAmount"
                    value={formData.depositAmount.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("currency")}
                    onCancel={() =>
                      setFormData({ ...formData, depositAmount: 0 })
                    }
                    labelText="Deposit Amount"
                    tooltipText="Enter deposit amount in original currency"
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    maxLength={15}
                  />
                </div>
              )}

              {permissionsFields.currency && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("currency")(el)}
                    id="currency"
                    name="currency"
                    options={currencyOptions}
                    value={formData.currency}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        currency: value,
                      }));
                      focusNextInput("exchangeRate");
                    }}
                    onEnterPress={() => {
                      if (formData.currency) {
                        focusNextInput("exchangeRate");
                      }
                    }}
                    placeholder=" "
                    labelText="Currency"
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

            {/* Currency and Exchange Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.exchangeRate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("exchangeRate")}
                    id="exchangeRate"
                    name="exchangeRate"
                    value={formData.exchangeRate.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("localAmt")}
                    onCancel={() =>
                      setFormData({ ...formData, exchangeRate: 1.0 })
                    }
                    labelText="Exchange Rate"
                    tooltipText="Enter exchange rate to local currency"
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.localAmt && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("localAmt")}
                    id="localAmt"
                    name="localAmt"
                    value={formData.localAmt.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("contactPerson")}
                    onCancel={() => setFormData({ ...formData, localAmt: 0 })}
                    labelText="Local Amount"
                    tooltipText="Amount in local currency (auto-calculated)"
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    maxLength={15}
                    readOnly
                  />
                </div>
              )}

              {permissionsFields.contactPerson && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("contactPerson")}
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    onNext={() => focusNextInput("mobileNo")}
                    onCancel={() =>
                      setFormData({ ...formData, contactPerson: "" })
                    }
                    labelText="Contact Person"
                    tooltipText="Enter primary contact person name"
                    required
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.mobileNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("mobileNo")}
                    id="mobileNo"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, mobileNo: "" })}
                    labelText="Mobile No"
                    tooltipText="Enter contact mobile number"
                    required
                    type="tel"
                    maxLength={20}
                  />
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.email && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("website")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="Email"
                    tooltipText="Enter contact email address"
                    required
                    type="email"
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.website && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("website")}
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, website: "" })}
                    labelText="Website"
                    tooltipText="Enter supplier website URL"
                    type="url"
                    maxLength={200}
                  />
                </div>
              )}

              {permissionsFields.isDefault && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={["No", "Yes"]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
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

            {/* System Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={isDraftState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
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
