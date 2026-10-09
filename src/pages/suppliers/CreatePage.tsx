/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  supplierName: "Al-Rashid Trading Company",
  paymentTerms: "Net 30",
  dueDays: 30,
  typeOfDeposit: "Bank Guarantee",
  paymentType: "Bank Transfer",
  depositAmount: 50000,
  currency: "SAR",
  exchangeRate: 1.0,
  localAmt: 50000,
  contactPerson: "Ahmed Al-Rashid",
  mobileNo: "+966-50-123-4567",
  email: "ahmed@alrashid.com",
  website: "www.alrashid.com",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function SupplierFormPage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("supplier", "create");
  const canView = usePermission("supplier", "view");
  const canEdit = usePermission("supplier", "edit");
  const canDelete = usePermission("supplier", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof SupplierData>(
    "supplier",
    "create",
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

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const paymentTermsOptions = [
    "Net 30",
    "Net 45",
    "Net 60",
    "Net 90",
    "Net 120",
    "Net 180",
  ];

  const typeOfDepositOptions = [
    "Bank Guarantee",
    "Cash Deposit",
    "Letter of Credit",
    "Performance Bond",
    "Advance Payment",
    "Security Deposit",
  ];

  const paymentTypeOptions = [
    "Bank Transfer",
    "Credit Card",
    "Wire Transfer",
    "Cash",
    "Check",
    "Digital Payment",
  ];

  const currencyOptions = [
    "SAR",
    "AED",
    "KWD",
    "QAR",
    "BHD",
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
    "USD",
    "EUR",
    "GBP",
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

  const supplierNameOptions = [
    "Al-Rashid Trading Company",
    "Al-Zahrani Enterprises",
    "Al-Otaibi Industries",
    "Al-Shehri Solutions",
    "Al-Ghamdi Trading",
    "Al-Harbi Corporation",
    "Al-Maktoum Trading",
    "Al-Nahyan Enterprises",
    "Al-Qasimi Trading",
    "Al-Sharqi Corporation",
    "Al-Sabah Trading",
    "Al-Khalifa Enterprises",
    "Al-Thani Trading Company",
    "Al-Said Enterprises",
    "Al-Hashemi Corporation",
    "Aoun Trading Solutions",
    "El-Sisi Enterprises",
    "Al-Kadhimi Trading",
    "Erdogan Trading",
    "Mitsotakis Enterprises",
  ];

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
    currency: "SAR",
    exchangeRate: 1.0,
    localAmt: 0,
    contactPerson: "",
    mobileNo: "",
    email: "",
    website: "",
    isDefault: isDefaultState === "Yes",
    isActive: true,
    isDraft: false,
    isDeleted: false,
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
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/supplier/view");
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
      handlePrintSupplier(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Supplier record created successfully!");
      handleReset();
    } else {
      toastSuccess("Supplier record created successfully!");
      navigate("/supplier");
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
      sn: "",
      country: "",
      supplierName: "",
      paymentTerms: "",
      dueDays: 30,
      typeOfDeposit: "",
      paymentType: "",
      depositAmount: 0,
      currency: "SAR",
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

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["sn"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

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

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "supplier-details.pdf";
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
                  <Autocomplete
                    ref={(el: any) => setRef("supplierName")(el)}
                    id="supplierName"
                    name="supplierName"
                    options={supplierNameOptions}
                    value={formData.supplierName}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        supplierName: value,
                      }));
                      focusNextInput("paymentTerms");
                    }}
                    onEnterPress={() => {
                      if (formData.supplierName) {
                        focusNextInput("paymentTerms");
                      }
                    }}
                    placeholder=" "
                    labelText="Supplier Name"
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
                    tooltipText="Enter amount in local currency"
                    required
                    type="number"
                    maxLength={15}
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
                    maxLength={50}
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
                    tooltipText="Enter company website URL"
                    maxLength={100}
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
