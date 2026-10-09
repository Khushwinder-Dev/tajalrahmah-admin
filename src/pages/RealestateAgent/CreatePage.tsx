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
import { Check, Edit, Eye, Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";

type ProjectTypeDataType = {
  picture: string | null;
  code: string;
  name: string;
  vatNumber: string;
  email: string;
  phone: string;
  website: string;
  aboutInformation: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  plan: string;
  facebookUrl: string;
  instagramUrl: string;
  whatsappUrl: string;

  companyDocumentTitle: string[];
  companyDocument: File[];

  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  billingCountry: string;
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;

  agentProfilePicture: string | null;
  agentFirstName: string;
  agentLastName: string;
  agentEmail: string;
  agentPhone: string;
  hourlyRate: string;
  agentFacebookUrl: string;
  agentLinkedinUrl: string;
  agentSkypeUrl: string;
  defaultLanguage: string;
  emailSignature: string;
  direction: string;
  memberDepertment: { label: string; value: boolean }[];
  shiftReports: string;
  vehicle: string;
  welcomeEmail: boolean;
  password: string;

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
  picture: null,
  code: "SDL6ASDF",
  name: "",
  vatNumber: "0",
  email: "",
  phone: "",
  website: "",
  aboutInformation: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  plan: "",
  facebookUrl: "",
  instagramUrl: "",
  whatsappUrl: "",
  companyDocumentTitle: [],
  companyDocument: [],

  billingStreet: "",
  billingCity: "",
  billingState: "",
  billingZipCode: "",
  billingCountry: "",
  shippingStreet: "",
  shippingCity: "",
  shippingState: "",
  shippingZipCode: "",
  shippingCountry: "",

  agentProfilePicture: null,
  agentFirstName: "",
  agentLastName: "",
  agentEmail: "",
  agentPhone: "",
  hourlyRate: "0",
  agentFacebookUrl: "",
  agentLinkedinUrl: "",
  agentSkypeUrl: "",
  defaultLanguage: "",
  emailSignature: "",
  direction: "",
  memberDepertment: [{ label: "IT Department", value: false }],
  shiftReports: "",
  vehicle: "",
  welcomeEmail: true,
  password: "",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function RealEstateAgentCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const labels = useLanguageLabels();
  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("realestateAgent", "create");
  const canView = usePermission("realestateAgent", "view");
  const canEdit = usePermission("realestateAgent", "edit");
  const canDelete = usePermission("realestateAgent", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const date: boolean = usePermission("realestateAgent", "create", "date");

  const isDefault: boolean = usePermission(
    "realestateAgent",
    "create",
    "isDefault"
  );

  const isDraft: boolean = usePermission(
    "realestateAgent",
    "create",
    "isDraft"
  );
  const canPdf: boolean = usePermission("realestateAgent", "pdf");
  const canPrint: boolean = usePermission("realestateAgent", "print");

  console.log("date", date);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    picture: "",
    code: "SDL6ASDF",
    name: "",
    vatNumber: "0",
    email: "",
    phone: "",
    website: "",
    aboutInformation: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    plan: "",
    facebookUrl: "",
    instagramUrl: "",
    whatsappUrl: "",
    companyDocumentTitle: [],
    companyDocument: [],

    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingCountry: "",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingZipCode: "",
    shippingCountry: "",

    agentProfilePicture: null,
    agentFirstName: "",
    agentLastName: "",
    agentEmail: "",
    agentPhone: "",
    hourlyRate: "0",
    agentFacebookUrl: "",
    agentLinkedinUrl: "",
    agentSkypeUrl: "",
    defaultLanguage: "",
    emailSignature: "",
    direction: "",
    memberDepertment: [{ label: "IT Department", value: false }],
    shiftReports: "",
    vehicle: "",
    welcomeEmail: true,
    password: "",

    isDefault: isDefaultState === "Yes",
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

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
          navigate("/realestate-agent/create");
        } else {
          navigate("/realestate-agent/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/realestate-agent/view");
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
      if (initialData.picture) {
        setImagePreview(initialData.picture);
      }
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

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageFile(files[0]);
    }
  };

  // Handle image file selection
  const handleImageFile = (file: File) => {
    if (file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setFormData({ ...formData, picture: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload via file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
      setTimeout(() => {
        focusNextInput("submitButton");
      }, 0);
    }
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
      toastSuccess("Expense created successfully!");
      handleReset();
    } else {
      toastSuccess("Expense created successfully!");
      navigate("/realestate-agent");
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
      picture: null,
      code: "",
      name: "",
      vatNumber: "0",
      email: "",
      phone: "",
      website: "",
      aboutInformation: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      plan: "",
      facebookUrl: "",
      instagramUrl: "",
      whatsappUrl: "",
      companyDocumentTitle: [],
      companyDocument: [],
      billingStreet: "",
      billingCity: "",
      billingState: "",
      billingZipCode: "",
      billingCountry: "",
      shippingStreet: "",
      shippingCity: "",
      shippingState: "",
      shippingZipCode: "",
      shippingCountry: "",

      agentProfilePicture: null,
      agentFirstName: "",
      agentLastName: "",
      agentEmail: "",
      agentPhone: "",
      hourlyRate: "0",
      agentFacebookUrl: "",
      agentLinkedinUrl: "",
      agentSkypeUrl: "",
      defaultLanguage: "",
      emailSignature: "",
      direction: "",
      memberDepertment: [{ label: "IT Department", value: false }],
      shiftReports: "",
      vehicle: "",
      welcomeEmail: true,
      password: "",
      isDefault: false,
      isDraft: false,
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
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Expense Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          voucherNumber: "Voucher Number",
          category: "Category",
          subCategory: "Sub Category",
          expense: "Expense",
          date: "Date",
          amount: "Amount",
          currency: "Currency",
          paymentMode: "Payment Mode",
          vat: "VAT",
          supplier: "Supplier",
          approvedBy: "Approved By",
          purchaseInvoiceNumber: "Purchase Invoice Number",
          supplierVatNumber: "Supplier VAT Number",
          expenseBy: "Expense By",
          expenseFor: "Expense For",
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
          title="Expense Details"
          subtitle="Expense Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expense-details.pdf";
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
              toastRestore("Expense saved as draft successfully");
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
        title={isEdit ? labels.editingRealEstateAgent : labels.creatingRealEstateAgent}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="realestate-agent"
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
              <div className="md:col-span-4 space-y-2 pt-4">
                <h1 className="text-2xl font-bold text-primary">
                  Company Information
                </h1>
              </div>
              {canCreate && (
                <div className="space-y-2 my-8 pt-4 cursor-pointer relative md:col-span-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 bg-[#f8fafc] text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
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
                          setFormData({ ...formData, picture: null });
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
                            setFormData({ ...formData, picture: null });
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
                </div>
              )}
              {/* Notes field - only show if user can create */}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("code")}
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    onNext={() => focusNextInput("name")}
                    onCancel={() => setFormData({ ...formData, code: "" })}
                    labelText={labels.codeTooltip}
                    tooltipText={labels.codeTooltip}
                    readOnly
                    disabled
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vatNumber")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText={labels.nameTooltip}
                    tooltipText={labels.nameTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("vatNumber")}
                    type="number"
                    id="vatNumber"
                    name="vatNumber"
                    value={formData.vatNumber ? formData.vatNumber : ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() =>
                      setFormData({ ...formData, vatNumber: "0" })
                    }
                    labelText={labels.vatNumberTooltip}
                    tooltipText={labels.vatNumberTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("phone")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText={labels.emailTooltip}
                    tooltipText={labels.emailTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("phone")}
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onNext={() => focusNextInput("aboutInformation")}
                    onCancel={() => setFormData({ ...formData, phone: "" })}
                    labelText={labels.phoneTooltip}
                    tooltipText={labels.phoneTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("aboutInformation")}
                    type="text"
                    id="aboutInformation"
                    name="aboutInformation"
                    value={formData.aboutInformation}
                    onChange={handleChange}
                    onNext={() => focusNextInput("address")}
                    onCancel={() =>
                      setFormData({ ...formData, aboutInformation: "" })
                    }
                    labelText={labels.aboutInformationsTooltip}
                    tooltipText={labels.aboutInformationsTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("address")}
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("city")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText={labels.addressTooltip}
                    tooltipText={labels.addressTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("city")}
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onNext={() => focusNextInput("state")}
                    onCancel={() => setFormData({ ...formData, city: "" })}
                    labelText={labels.cityTooltip}
                    tooltipText={labels.cityTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("state")}
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    onNext={() => focusNextInput("zipCode")}
                    onCancel={() => setFormData({ ...formData, state: "" })}
                    labelText={labels.stateTooltip}
                    tooltipText={labels.stateTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("zipCode")}
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("country")}
                    onCancel={() => setFormData({ ...formData, zipCode: "" })}
                    labelText={labels.zipCodeTooltip}
                    tooltipText={labels.zipCodeTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2 md:col-span-2">
                  <Autocomplete
                    ref={(el: any) => setRef("country")(el)}
                    id="country"
                    name="country"
                    options={["Bangalore", "Dubai", "Arab", "India"]}
                    value={formData.country}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        country: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("plan");
                    }}
                    onEnterPress={() => {
                      if (formData.plan) {
                        focusNextInput("plan");
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

              {canCreate && (
                <div className="space-y-2 md:col-span-2">
                  <Autocomplete
                    ref={(el: any) => setRef("plan")(el)}
                    id="plan"
                    name="plan"
                    options={["plan 1", "plan 2", "plan 3"]}
                    value={formData.plan}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        plan: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("website");
                    }}
                    onEnterPress={() => {
                      if (formData.plan) {
                        focusNextInput("website");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.planTooltip}
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
                    setRef={setRef("website")}
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onNext={() => focusNextInput("instagramUrl")}
                    onCancel={() => setFormData({ ...formData, website: "" })}
                    labelText={labels.websiteTooltip}
                    tooltipText={labels.websiteTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("instagramUrl")}
                    type="text"
                    id="instagramUrl"
                    name="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={handleChange}
                    onNext={() => focusNextInput("whatsappUrl")}
                    onCancel={() =>
                      setFormData({ ...formData, instagramUrl: "" })
                    }
                    labelText={labels.instagramUrlTooltip}
                    tooltipText={labels.instagramUrlTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("whatsappUrl")}
                    type="text"
                    id="whatsappUrl"
                    name="whatsappUrl"
                    value={formData.whatsappUrl}
                    onChange={handleChange}
                    onNext={() => focusNextInput("companyDocumentTitle")}
                    onCancel={() =>
                      setFormData({ ...formData, whatsappUrl: "" })
                    }
                    labelText={labels.whatsappUrlTooltip}
                    tooltipText={labels.whatsappUrlTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("facebookUrl")}
                    type="text"
                    id="facebookUrl"
                    name="facebookUrl"
                    value={formData.facebookUrl}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, facebookUrl: "" })
                    }
                    labelText={labels.facebookUrlTooltip}
                    tooltipText={labels.facebookUrlTooltip}
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
                      focusNextInput("companyDocumentTitle");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("companyDocumentTitle");
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
                  Billing Address
                </h1>
              </div>

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("billingStreet")}
                    type="text"
                    id="billingStreet"
                    name="billingStreet"
                    value={formData.billingStreet}
                    onChange={handleChange}
                    onNext={() => focusNextInput("billingCity")}
                    onCancel={() =>
                      setFormData({ ...formData, billingStreet: "" })
                    }
                    labelText="Street"
                    tooltipText="Street"
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("billingCity")}
                    type="text"
                    id="billingCity"
                    name="billingCity"
                    value={formData.billingCity}
                    onChange={handleChange}
                    onNext={() => focusNextInput("billingState")}
                    onCancel={() =>
                      setFormData({ ...formData, billingCity: "" })
                    }
                    labelText={labels.cityTooltip}
                    tooltipText={labels.cityTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("billingState")}
                    type="text"
                    id="billingState"
                    name="billingState"
                    value={formData.billingState}
                    onChange={handleChange}
                    onNext={() => focusNextInput("billingZipCode")}
                    onCancel={() =>
                      setFormData({ ...formData, billingState: "" })
                    }
                    labelText={labels.stateTooltip}
                    tooltipText={labels.stateTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("billingZipCode")}
                    type="text"
                    id="billingZipCode"
                    name="billingZipCode"
                    value={formData.billingZipCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("billingCountry")}
                    onCancel={() =>
                      setFormData({ ...formData, billingZipCode: "" })
                    }
                    labelText={labels.zipCodeTooltip}
                    tooltipText={labels.zipCodeTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("billingCountry")}
                    type="text"
                    id="billingCountry"
                    name="billingCountry"
                    value={formData.billingCountry}
                    onChange={handleChange}
                    onNext={() => focusNextInput("shippingStreet")}
                    onCancel={() =>
                      setFormData({ ...formData, billingCountry: "" })
                    }
                    labelText={labels.countryTooltip}
                    tooltipText={labels.countryTooltip}
                    required
                  />
                </div>
              )}

              <div className="md:col-span-4 space-y-2 pt-4">
                <h1 className="text-2xl font-bold text-primary">
                  Shipping Address
                </h1>
              </div>

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shippingStreet")}
                    type="text"
                    id="shippingStreet"
                    name="shippingStreet"
                    value={formData.shippingStreet}
                    onChange={handleChange}
                    onNext={() => focusNextInput("shippingCity")}
                    onCancel={() =>
                      setFormData({ ...formData, shippingStreet: "" })
                    }
                    labelText="Street"
                    tooltipText="Street"
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shippingCity")}
                    type="text"
                    id="shippingCity"
                    name="shippingCity"
                    value={formData.shippingCity}
                    onChange={handleChange}
                    onNext={() => focusNextInput("shippingState")}
                    onCancel={() =>
                      setFormData({ ...formData, shippingCity: "" })
                    }
                    labelText={labels.cityTooltip}
                    tooltipText={labels.cityTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shippingState")}
                    type="text"
                    id="shippingState"
                    name="shippingState"
                    value={formData.shippingState}
                    onChange={handleChange}
                    onNext={() => focusNextInput("shippingZipCode")}
                    onCancel={() =>
                      setFormData({ ...formData, shippingState: "" })
                    }
                    labelText={labels.stateTooltip}
                    tooltipText={labels.stateTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shippingZipCode")}
                    type="text"
                    id="shippingZipCode"
                    name="shippingZipCode"
                    value={formData.shippingZipCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("shippingCountry")}
                    onCancel={() =>
                      setFormData({ ...formData, shippingZipCode: "" })
                    }
                    labelText={labels.zipCodeTooltip}
                    tooltipText={labels.zipCodeTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shippingCountry")}
                    type="text"
                    id="shippingCountry"
                    name="shippingCountry"
                    value={formData.shippingCountry}
                    onChange={handleChange}
                    onNext={() => focusNextInput("firstName")}
                    onCancel={() =>
                      setFormData({ ...formData, shippingCountry: "" })
                    }
                    labelText={labels.countryTooltip}
                    tooltipText={labels.countryTooltip}
                    required
                  />
                </div>
              )}

              <div className="md:col-span-4 space-y-2 pt-4">
                <h1 className="text-2xl font-bold text-primary">
                  Agent Information
                </h1>
              </div>

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("agentFirstName")}
                    type="text"
                    id="agentFirstName"
                    name="agentFirstName"
                    value={formData.agentFirstName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("agentLastName")}
                    onCancel={() =>
                      setFormData({ ...formData, agentFirstName: "" })
                    }
                    labelText={labels.firstNameTooltip}
                    tooltipText={labels.firstNameTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("agentLastName")}
                    type="text"
                    id="agentLastName"
                    name="agentLastName"
                    value={formData.agentLastName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("agentEmail")}
                    onCancel={() =>
                      setFormData({ ...formData, agentLastName: "" })
                    }
                    labelText={labels.lastNameTooltip}
                    tooltipText={labels.lastNameTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("agentEmail")}
                    type="text"
                    id="agentEmail"
                    name="agentEmail"
                    value={formData.agentEmail}
                    onChange={handleChange}
                    onNext={() => focusNextInput("agentPhone")}
                    onCancel={() =>
                      setFormData({ ...formData, agentEmail: "" })
                    }
                    labelText={labels.emailTooltip}
                    tooltipText={labels.emailTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("agentPhone")}
                    type="text"
                    id="agentPhone"
                    name="agentPhone"
                    value={formData.agentPhone}
                    onChange={handleChange}
                    onNext={() => focusNextInput("hourlyRate")}
                    onCancel={() =>
                      setFormData({ ...formData, agentPhone: "" })
                    }
                    labelText={labels.phoneTooltip}
                    tooltipText={labels.phoneTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("hourlyRate")}
                    type="text"
                    id="hourlyRate"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("agentFacebookUrl")}
                    onCancel={() =>
                      setFormData({ ...formData, hourlyRate: "" })
                    }
                    labelText={labels.hourlyRateTooltip}
                    tooltipText={labels.hourlyRateTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("agentFacebookUrl")}
                    type="text"
                    id="agentFacebookUrl"
                    name="agentFacebookUrl"
                    value={formData.agentFacebookUrl}
                    onChange={handleChange}
                    onNext={() => focusNextInput("agentLinkedinUrl")}
                    onCancel={() =>
                      setFormData({ ...formData, agentFacebookUrl: "" })
                    }
                    labelText={labels.facebookUrlTooltip}
                    tooltipText={labels.facebookUrlTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("agentLinkedinUrl")}
                    type="text"
                    id="agentLinkedinUrl"
                    name="agentLinkedinUrl"
                    value={formData.agentLinkedinUrl}
                    onChange={handleChange}
                    onNext={() => focusNextInput("agentSkypeUrl")}
                    onCancel={() =>
                      setFormData({ ...formData, agentLinkedinUrl: "" })
                    }
                    labelText={labels.linkedinUrlTooltip}
                    tooltipText={labels.linkedinUrlTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("agentSkypeUrl")}
                    type="text"
                    id="agentSkypeUrl"
                    name="agentSkypeUrl"
                    value={formData.agentSkypeUrl}
                    onChange={handleChange}
                    onNext={() => focusNextInput("defaultLanguage")}
                    onCancel={() =>
                      setFormData({ ...formData, agentSkypeUrl: "" })
                    }
                    labelText={labels.skypeUrlTooltip}
                    tooltipText={labels.skypeUrlTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2 md:col-span-2">
                  <Autocomplete
                    ref={(el: any) => setRef("defaultLanguage")(el)}
                    id="defaultLanguage"
                    name="defaultLanguage"
                    options={["Bangla", "English", "Hindi", "Spanish"]}
                    value={formData.defaultLanguage}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        defaultLanguage: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("emailSignature");
                    }}
                    onEnterPress={() => {
                      if (formData.defaultLanguage) {
                        focusNextInput("emailSignature");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.defaultLanguageTooltip}
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
                    setRef={setRef("emailSignature")}
                    type="text"
                    id="emailSignature"
                    name="emailSignature"
                    value={formData.emailSignature}
                    onChange={handleChange}
                    onNext={() => focusNextInput("direction")}
                    onCancel={() =>
                      setFormData({ ...formData, emailSignature: "" })
                    }
                    labelText={labels.emailSignatureTooltip}
                    tooltipText={labels.emailSignatureTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("direction")}
                    type="text"
                    id="direction"
                    name="direction"
                    value={formData.direction}
                    onChange={handleChange}
                    onNext={() => focusNextInput("shiftReports")}
                    onCancel={() => setFormData({ ...formData, direction: "" })}
                    labelText={labels.directionTooltip}
                    tooltipText={labels.directionTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shiftReports")}
                    type="text"
                    id="shiftReports"
                    name="shiftReports"
                    value={formData.shiftReports}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vehicle")}
                    onCancel={() =>
                      setFormData({ ...formData, shiftReports: "" })
                    }
                    labelText={labels.shiftReportsTooltip}
                    tooltipText={labels.shiftReportsTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("vehicle")}
                    type="text"
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    onNext={() => focusNextInput("welcomeEmail")}
                    onCancel={() => setFormData({ ...formData, vehicle: "" })}
                    labelText={labels.vehicleTooltip}
                    tooltipText={labels.vehicleTooltip}
                    required
                  />
                </div>
              )}

              {/* wellcome email checkbox */}

              {canCreate && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("welcomeEmail")(el)}
                    id="welcomeEmail"
                    name="welcomeEmail"
                    options={["No", "Yes"]}
                    value={formData.welcomeEmail === true ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        welcomeEmail: newValue,
                      }));
                      focusNextInput("password");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.welcomeEmail === true ||
                        formData.welcomeEmail === false
                      ) {
                        focusNextInput("password");
                      }
                    }}
                    placeholder=" "
                    labelText="Welcome Email"
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
                    setRef={setRef("password")}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onNext={() => focusNextInput("confirmPassword")}
                    onCancel={() => setFormData({ ...formData, password: "" })}
                    labelText={labels.passwordTooltip}
                    tooltipText={labels.passwordTooltip}
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
