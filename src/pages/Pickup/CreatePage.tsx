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
import { useLanguageLabels } from "@/hooks/useLanguageLabels";

type PackageType = {
  amount: string;
  packageDetails: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  weightVol: string;
  fixedCharge: string;
  DecValue: string;
  TariffFee: string;
};

type ProjectTypeDataType = {
  shippingPrefix: string;
  number: string;
  agency: string;
  officeOfOrigin: string;
  customer: string;
  customerAddress: string;
  recipient: string;
  recipientAddress: string;
  logisticService: string;
  paymentTerm: string;
  typeofPackage: string;
  courierCompany: string;
  serviceMode: string;
  deliveryTime: string;
  assignDriver: string;
  currency: string;
  currencyRate: string;
  deliveryStatus: string;
  invoice: string;
  PackageType: PackageType;
  priceKg: string;
  Discount: string;
  valueAssured: string;
  shippingInsurance: string;
  customDuties: string;
  tax: string;
  declaredValue: string;
  reissue: string;

  companyDocumentTitle: string[];
  companyDocument: File[];

  isDefault: boolean;
  isDraft: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ProjectTypeDataType = {
  shippingPrefix: "",
  number: "",
  agency: "",
  officeOfOrigin: "",
  customer: "",
  customerAddress: "",
  recipient: "",
  recipientAddress: "",
  logisticService: "",
  paymentTerm: "",
  typeofPackage: "",
  courierCompany: "",
  serviceMode: "",
  deliveryTime: "",
  assignDriver: "",
  currency: "",
  currencyRate: "",
  deliveryStatus: "",
  invoice: "",
  PackageType: {
    amount: "",
    packageDetails: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    weightVol: "",
    fixedCharge: "",
    DecValue: "",
    TariffFee: "",
  },
  priceKg: "",
  Discount: "",
  valueAssured: "",
  shippingInsurance: "",
  customDuties: "",
  tax: "",
  declaredValue: "",
  reissue: "",

  companyDocumentTitle: [],
  companyDocument: [],

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function PickupCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const labels = useLanguageLabels();
  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("pickup", "create");
  const canView = usePermission("pickup", "view");
  const canEdit = usePermission("pickup", "edit");
  const canDelete = usePermission("pickup", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const date: boolean = usePermission("pickup", "create", "date");

  const isDefault: boolean = usePermission("pickup", "create", "isDefault");

  const isDraft: boolean = usePermission("pickup", "create", "isDraft");
  const canPdf: boolean = usePermission("pickup", "pdf");
  const canPrint: boolean = usePermission("pickup", "print");

  console.log("date", date);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    shippingPrefix: "",
    number: "",
    agency: "",
    officeOfOrigin: "",
    customer: "",
    customerAddress: "",
    recipient: "",
    recipientAddress: "",
    logisticService: "",
    paymentTerm: "",
    typeofPackage: "",
    courierCompany: "",
    serviceMode: "",
    deliveryTime: "",
    assignDriver: "",
    currency: "",
    currencyRate: "",
    deliveryStatus: "",
    invoice: "",
    PackageType: {
      amount: "",
      packageDetails: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      weightVol: "",
      fixedCharge: "",
      DecValue: "",
      TariffFee: "",
    },
    priceKg: "",
    Discount: "",
    valueAssured: "",
    shippingInsurance: "",
    customDuties: "",
    tax: "",
    declaredValue: "",
    reissue: "",

    companyDocumentTitle: [],
    companyDocument: [],

    isDefault: isDefaultState === "Yes",
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  const [packageRows, setPackageRows] = useState([
    {
      id: Date.now(),
      amount: "",
      packageDetails: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      weightVol: "",
      fixedCharge: "",
      DecValue: "",
      TariffFee: "",
    },
  ]);

  const [documentsData, setDocumentsData] = useState<
    {
      title: string;
      file: File | null;
    }[]
  >([
    {
      title: "",
      file: null,
    },
  ]);

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
          navigate("/pickup/create");
        } else {
          navigate("/pickup/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/pickup/view");
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
      handlePrintLeaves(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Pickup created successfully!");
      handleReset();
    } else {
      toastSuccess("Pickup created successfully!");
      navigate("/pickup");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePackageChange = (id: number, field: string, value: string) => {
    setPackageRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleAddRow = () => {
    setPackageRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        amount: "",
        packageDetails: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        weightVol: "",
        fixedCharge: "",
        DecValue: "",
        TariffFee: "",
      },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setPackageRows((prev) => prev.filter((row) => row.id !== id));
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      shippingPrefix: "",
      number: "",
      agency: "",
      officeOfOrigin: "",
      customer: "",
      customerAddress: "",
      recipient: "",
      recipientAddress: "",
      logisticService: "",
      paymentTerm: "",
      typeofPackage: "",
      courierCompany: "",
      serviceMode: "",
      deliveryTime: "",
      assignDriver: "",
      currency: "",
      currencyRate: "",
      deliveryStatus: "",
      invoice: "",
      PackageType: {
        amount: "",
        packageDetails: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        weightVol: "",
        fixedCharge: "",
        DecValue: "",
        TariffFee: "",
      },
      priceKg: "",
      Discount: "",
      valueAssured: "",
      shippingInsurance: "",
      customDuties: "",
      tax: "",
      declaredValue: "",
      reissue: "",
      companyDocumentTitle: [],
      companyDocument: [],

      isDefault: false,
      isDraft: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");
    setPackageRows([
      {
        id: Date.now(),
        amount: "",
        packageDetails: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        weightVol: "",
        fixedCharge: "",
        DecValue: "",
        TariffFee: "",
      },
    ]);
    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["branch"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Pickup Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          voucherNumber: "Voucher Number",
          category: "Category",
          subCategory: "Sub Category",
          Pickup: "Pickup",
          date: "Date",
          amount: "Amount",
          currency: "Currency",
          paymentMode: "Payment Mode",
          vat: "VAT",
          supplier: "Supplier",
          approvedBy: "Approved By",
          purchaseInvoiceNumber: "Purchase Invoice Number",
          supplierVatNumber: "Supplier VAT Number",
          PickupBy: "Pickup By",
          PickupFor: "Pickup For",
          note: "Note",
          isDefault: "Default Leave",
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
      console.log("sampleReceivingData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Pickup Details"
          subtitle="Pickup Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Pickup-details.pdf";
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
              toastRestore("Pickup saved as draft successfully");
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
        title={isEdit ? labels.editingPickup : labels.creatingPickup}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="pickup"
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
            {/* All fields in one 4-column row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Leave Types field - only show if user can create */}

              {canCreate && (
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("shippingPrefix")(el)}
                    id="shippingPrefix"
                    name="shippingPrefix"
                    options={["BAN", "UAE", "UK", "IND", "SA", "USA"]}
                    value={formData.shippingPrefix}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        shippingPrefix: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("number");
                    }}
                    onEnterPress={() => {
                      if (formData.shippingPrefix) {
                        focusNextInput("number");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.shippingPrefixTooltip}
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
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("number")}
                    type="text"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    onNext={() => focusNextInput("agency")}
                    onCancel={() => setFormData({ ...formData, number: "" })}
                    labelText={labels.numberTooltip}
                    tooltipText={labels.numberTooltip}
                    readOnly
                    disabled
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("agency")(el)}
                    id="agency"
                    name="agency"
                    options={["Banco de España", "Banco España", "e España"]}
                    value={formData.agency}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        agency: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.agency) {
                        focusNextInput("officeOfOrigin");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.agencyTooltip}
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
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("officeOfOrigin")(el)}
                    id="officeOfOrigin"
                    name="officeOfOrigin"
                    options={[
                      "India",
                      "UAE",
                      "UK",
                      "Bangladesh",
                      "South Africa",
                      "USA",
                    ]}
                    value={formData.officeOfOrigin}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        officeOfOrigin: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.officeOfOrigin) {
                        focusNextInput("customer");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.officeOfOriginTooltip}
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
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("customer")}
                    type="text"
                    id="customer"
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    onNext={() => focusNextInput("customerAddress")}
                    onCancel={() => setFormData({ ...formData, customer: "" })}
                    labelText={labels.customerTooltip}
                    tooltipText={labels.customerTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("customerAddress")}
                    type="text"
                    id="customerAddress"
                    name="customerAddress"
                    value={formData.customerAddress}
                    onChange={handleChange}
                    onNext={() => focusNextInput("recipient")}
                    onCancel={() =>
                      setFormData({ ...formData, customerAddress: "" })
                    }
                    labelText={labels.customerAddressTooltip}
                    tooltipText={labels.customerAddressTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("recipient")}
                    type="text"
                    id="recipient"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleChange}
                    onNext={() => focusNextInput("recipientAddress")}
                    onCancel={() => setFormData({ ...formData, recipient: "" })}
                    labelText={labels.recipientTooltip}
                    tooltipText={labels.recipientTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("recipientAddress")}
                    type="text"
                    id="recipientAddress"
                    name="recipientAddress"
                    value={formData.recipientAddress}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, recipientAddress: "" })
                    }
                    labelText={labels.recipientAddressTooltip}
                    tooltipText={labels.recipientAddressTooltip}
                    required
                  />
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={["No", "Yes"]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                      // Call focusNextInput if needed
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

              {/* Draft field - only show if user can create */}
              {isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={isDraftState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDraftState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: newValue,
                      }));
                      focusNextInput("logisticService");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("logisticService");
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
              <div className="md:col-span-4 space-y-2 pt-4">
                <h1 className="text-2xl font-bold text-primary">
                  Shipping Information
                </h1>
              </div>
              {canCreate && (
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("logisticService")(el)}
                    id="logisticService"
                    name="logisticService"
                    options={[
                      "DHL",
                      "UPS",
                      "FedEx",
                      "TNT",
                      "USPS",
                      "Canada Post",
                    ]}
                    value={formData.logisticService}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        logisticService: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.logisticService) {
                        focusNextInput("paymentTerm");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.logisticServiceTooltip}
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
              {/* paymentTerm typeofPackage courierCompany   serviceMode deliveryTime assignDriver currency all autocomplete field   */}

              {canCreate && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("paymentTerm")(el)}
                    id="paymentTerm"
                    name="paymentTerm"
                    options={["Prepaid", "Collect", "COD", "Advance Payment"]}
                    value={formData.paymentTerm}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentTerm: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.paymentTerm) {
                        focusNextInput("typeofPackage");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.paymentTermTooltip}
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
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("typeofPackage")(el)}
                    id="typeofPackage"
                    name="typeofPackage"
                    options={["Documents", "Electronics", "Clothes", "Fragile"]}
                    value={formData.typeofPackage}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        typeofPackage: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.typeofPackage) {
                        focusNextInput("courierCompany");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.typeofPackageTooltip}
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
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("courierCompany")(el)}
                    id="courierCompany"
                    name="courierCompany"
                    options={["DHL", "FedEx", "UPS", "Local Courier"]}
                    value={formData.courierCompany}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        courierCompany: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.courierCompany) {
                        focusNextInput("serviceMode");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.courierCompanyTooltip}
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
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("serviceMode")(el)}
                    id="serviceMode"
                    name="serviceMode"
                    options={["Air", "Sea", "Road", "Express"]}
                    value={formData.serviceMode}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        serviceMode: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.serviceMode) {
                        focusNextInput("deliveryTime");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.serviceModeTooltip}
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
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("deliveryTime")(el)}
                    id="deliveryTime"
                    name="deliveryTime"
                    options={["Same Day", "Next Day", "3-5 Days", "7+ Days"]}
                    value={formData.deliveryTime}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        deliveryTime: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.deliveryTime) {
                        focusNextInput("assignDriver");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.deliveryTimeTooltip}
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
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("assignDriver")(el)}
                    id="assignDriver"
                    name="assignDriver"
                    options={["Driver 1", "Driver 2", "Driver 3"]}
                    value={formData.assignDriver}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        assignDriver: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.assignDriver) {
                        focusNextInput("currency");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.assignDriverTooltip}
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
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("currency")(el)}
                    id="currency"
                    name="currency"
                    options={["USD", "EUR", "BDT", "INR"]}
                    value={formData.currency}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        currency: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.currency) {
                        focusNextInput("currencyRate");
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

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("currencyRate")}
                    type="text"
                    id="currencyRate"
                    name="currencyRate"
                    value={formData.currencyRate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("deliveryStatus")}
                    onCancel={() =>
                      setFormData({ ...formData, currencyRate: "" })
                    }
                    labelText={`USD => ${formData.currency || ""}`}
                    tooltipText={`USD => ${formData.currency || ""}`}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("deliveryStatus")(el)}
                    id="deliveryStatus"
                    name="deliveryStatus"
                    options={["Pending", "Delivered", "Cancelled"]}
                    value={formData.deliveryStatus}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        deliveryStatus: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.deliveryStatus) {
                        focusNextInput("invoice");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.deliveryStatusTooltip}
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
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("invoice")(el)}
                    id="invoice"
                    name="invoice"
                    options={["Yes", "No"]}
                    value={formData.invoice}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        invoice: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.invoice) {
                        focusNextInput("currencyRate");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.invoiceTooltip}
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

              <div className="md:col-span-4">
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                  <h3 className="text-lg font-semibold">Attachment files</h3>
                  <Button
                    className="cursor-pointer"
                    type="button"
                    onClick={() =>
                      setDocumentsData((prev) => [
                        ...prev,
                        { title: "", file: null as File | null },
                      ])
                    }
                  >
                    <Plus />
                  </Button>
                </div>

                {documentsData.map((document, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 items-center"
                  >
                    <EditableInput
                      type="text"
                      id="companyDocumentTitle"
                      name="companyDocumentTitle"
                      value={document.title}
                      onChange={(e) =>
                        setDocumentsData((prev) =>
                          prev.map((doc, i) =>
                            i === index
                              ? { ...doc, title: e.target.value }
                              : doc
                          )
                        )
                      }
                      onNext={() => focusNextInput("companyDocument")}
                      onCancel={() =>
                        setDocumentsData((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      labelText="Document Title"
                      tooltipText="Enter document title"
                      required
                    />

                    <div className="h-[70px]">
                      <input
                        className="cursor-pointer h-[50px] border-1 border-gray-300 rounded-[12px] placeholder:text-red-500 text-gray-500 file:text-white file:bg-gray-400 file:border-0 file:px-4 file:py-2 file:h-full file:rounded-md file:cursor-pointer flex items-center justify-center w-full"
                        type="file"
                        id="companyDocument"
                        name="companyDocument"
                        onChange={(e) =>
                          setDocumentsData((prev) =>
                            prev.map((doc, i) =>
                              i === index
                                ? {
                                    ...doc,
                                    file: e?.target?.files?.[0] || null,
                                  }
                                : doc
                            )
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:col-span-4 space-y-2 pt-4">
                <h1 className="text-2xl font-bold text-primary">
                  Package Information
                </h1>
              </div>

              <div className="md:col-span-4">
                {packageRows.map((row) => (
                  <div key={row.id} className="p-2 border rounded-lg">
                    {canCreate && (
                      <div className="flex flex-col md:flex-row gap-4 mx-auto items-center">
                        <EditableInput
                          type="text"
                          id={`amount-${row.id}`}
                          name={`amount-${row.id}`}
                          value={row.amount}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "amount",
                              e.target.value
                            )
                          }
                          onNext={() =>
                            focusNextInput(`packageDetails-${row.id}`)
                          }
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, amount: "" } : r
                              )
                            )
                          }
                          labelText="Amount"
                          tooltipText="Amount"
                        />

                        <EditableInput
                          type="text"
                          id={`packageDetails-${row.id}`}
                          name={`packageDetails-${row.id}`}
                          value={row.packageDetails}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "packageDetails",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`weight-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id
                                  ? { ...r, packageDetails: "" }
                                  : r
                              )
                            )
                          }
                          labelText="Package Details"
                          tooltipText="Package Details"
                        />

                        <EditableInput
                          type="text"
                          id={`weight-${row.id}`}
                          name={`weight-${row.id}`}
                          value={row.weight}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "weight",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`length-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, weight: "" } : r
                              )
                            )
                          }
                          labelText="Weight"
                          tooltipText="Weight"
                        />

                        <EditableInput
                          type="text"
                          id={`length-${row.id}`}
                          name={`length-${row.id}`}
                          value={row.length}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "length",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`width-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, length: "" } : r
                              )
                            )
                          }
                          labelText="Length"
                          tooltipText="Length"
                        />

                        <EditableInput
                          type="text"
                          id={`width-${row.id}`}
                          name={`width-${row.id}`}
                          value={row.width}
                          onChange={(e) =>
                            handlePackageChange(row.id, "width", e.target.value)
                          }
                          onNext={() => focusNextInput(`height-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, weight: "" } : r
                              )
                            )
                          }
                          labelText="Width"
                          tooltipText="Width"
                        />

                        <EditableInput
                          type="text"
                          id={`height-${row.id}`}
                          name={`height-${row.id}`}
                          value={row.height}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "height",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`weightVol-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, height: "" } : r
                              )
                            )
                          }
                          labelText="Height"
                          tooltipText="Height"
                        />

                        <EditableInput
                          type="text"
                          id={`weightVol-${row.id}`}
                          name={`weightVol-${row.id}`}
                          value={row.weightVol}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "weightVol",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`fixedCharge-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, weightVol: "" } : r
                              )
                            )
                          }
                          labelText="Weight Volume"
                          tooltipText="Weight Volume"
                        />

                        <EditableInput
                          type="text"
                          id={`fixedCharge-${row.id}`}
                          name={`fixedCharge-${row.id}`}
                          value={row.fixedCharge}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "fixedCharge",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`DecValue-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, fixedCharge: "" } : r
                              )
                            )
                          }
                          labelText="Fixed Charge"
                          tooltipText="Fixed Charge"
                        />

                        <EditableInput
                          type="text"
                          id={`DecValue-${row.id}`}
                          name={`DecValue-${row.id}`}
                          value={row.DecValue}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "DecValue",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`TariffFee-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, DecValue: "" } : r
                              )
                            )
                          }
                          labelText="Dec Value"
                          tooltipText="Dec Value"
                        />

                        <EditableInput
                          type="text"
                          id={`TariffFee-${row.id}`}
                          name={`TariffFee-${row.id}`}
                          value={row.TariffFee}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "TariffFee",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`amount-${row.id + 1}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, TariffFee: "" } : r
                              )
                            )
                          }
                          labelText="Tariff Fee"
                          tooltipText="Tariff Fee"
                        />

                        {/* Add more fields: length, width, height, etc. in similar way */}

                        {packageRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteRow(row.id)}
                            className="p-2 text-red-500"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center md:flex-wrap md:col-span-4">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Add Row
                </button>

                <div></div>
                <div></div>

                <p className="text-lg">Total</p>

                {/* total weight, weitht volume, fixed charge, dec value, traff fee */}
                <div className="flex flex-col md:flex-row items-center md:space-x-5">
                  <p className="text-md"> Weight: 461</p>
                  <p className="text-md"> Weight Volume: 544</p>
                  <p className="text-md"> Fixed Charge: 47277</p>
                  <p className="text-md"> Dec Value: 45274</p>
                  <p className="text-md"> Tariff Fee: 77727</p>
                </div>
              </div>

              <div className="md:col-span-4 space-y-2 pt-4">
                <h1 className="text-2xl font-bold text-primary">
                  Rate & Taxes Information
                </h1>
              </div>
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("priceKg")}
                    type="text"
                    id="priceKg"
                    name="priceKg"
                    value={formData.priceKg}
                    onChange={handleChange}
                    onNext={() => focusNextInput("Discount")}
                    onCancel={() => setFormData({ ...formData, priceKg: "" })}
                    labelText={labels.priceKgTooltip}
                    tooltipText={labels.priceKgTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("Discount")}
                    type="text"
                    id="Discount"
                    name="Discount"
                    value={formData.Discount}
                    onChange={handleChange}
                    onNext={() => focusNextInput("valueAssured")}
                    onCancel={() => setFormData({ ...formData, Discount: "" })}
                    labelText={labels.DiscountTooltip}
                    tooltipText={labels.DiscountTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("valueAssured")}
                    type="text"
                    id="valueAssured"
                    name="valueAssured"
                    value={formData.valueAssured}
                    onChange={handleChange}
                    onNext={() => focusNextInput("shippingInsurance")}
                    onCancel={() =>
                      setFormData({ ...formData, valueAssured: "" })
                    }
                    labelText={labels.valueAssuredTooltip}
                    tooltipText={labels.valueAssuredTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shippingInsurance")}
                    type="text"
                    id="shippingInsurance"
                    name="shippingInsurance"
                    value={formData.shippingInsurance}
                    onChange={handleChange}
                    onNext={() => focusNextInput("customDuties")}
                    onCancel={() =>
                      setFormData({ ...formData, shippingInsurance: "" })
                    }
                    labelText={labels.shippingInsuranceTooltip}
                    tooltipText={labels.shippingInsuranceTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("customDuties")}
                    type="text"
                    id="customDuties"
                    name="customDuties"
                    value={formData.customDuties}
                    onChange={handleChange}
                    onNext={() => focusNextInput("tax")}
                    onCancel={() =>
                      setFormData({ ...formData, customDuties: "" })
                    }
                    labelText={labels.customDutiesTooltip}
                    tooltipText={labels.customDutiesTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("tax")}
                    type="text"
                    id="tax"
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    onNext={() => focusNextInput("declaredValue")}
                    onCancel={() => setFormData({ ...formData, tax: "" })}
                    labelText={labels.taxTooltip}
                    tooltipText={labels.taxTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("declaredValue")}
                    type="text"
                    id="declaredValue"
                    name="declaredValue"
                    value={formData.declaredValue}
                    onChange={handleChange}
                    onNext={() => focusNextInput("reissue")}
                    onCancel={() =>
                      setFormData({ ...formData, declaredValue: "" })
                    }
                    labelText={labels.declaredValueTooltip}
                    tooltipText={labels.declaredValueTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("reissue")}
                    type="text"
                    id="reissue"
                    name="reissue"
                    value={formData.reissue}
                    onChange={handleChange}
                    onNext={() => focusNextInput("reissue")}
                    onCancel={() => setFormData({ ...formData, reissue: "" })}
                    labelText={labels.reissueTooltip}
                    tooltipText={labels.reissueTooltip}
                    required
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
