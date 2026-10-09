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

type TransporterData = {
  transporterCountry: string;
  transporterName: string;
  contactPerson: string;
  mobileNo: string;
  phoneNo: string;
  faxNo: string;
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

const initialData: TransporterData = {
  transporterCountry: "Saudi Arabia",
  transporterName: "Al-Rashid Transport Services",
  contactPerson: "Ahmed Al-Rashid",
  mobileNo: "+966-50-123-4567",
  phoneNo: "+966-11-234-5678",
  faxNo: "+966-11-234-5679",
  email: "ahmed@alrashid-transport.com",
  website: "www.alrashid-transport.com",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function TransporterEditPage({ isEdit = true }: Props) {
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
  const [formData, setFormData] = useState<TransporterData>({
    transporterCountry: "",
    transporterName: "",
    contactPerson: "",
    mobileNo: "",
    phoneNo: "",
    faxNo: "",
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
  const canCreate = usePermission("transporter", "create");
  const canView = usePermission("transporter", "view");
  const canEdit = usePermission("transporter", "edit");
  const canDelete = usePermission("transporter", "delete");

  // Field-level permissions
  const permissionsFields = usePermission<keyof TransporterData>(
    "transporter",
    "edit",
    [
      "transporterCountry",
      "transporterName",
      "contactPerson",
      "mobileNo",
      "phoneNo",
      "faxNo",
      "email",
      "website",
      "isDefault",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("transporter", "pdf");
  const canPrint: boolean = usePermission("transporter", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
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

  const companyOptions = [
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
      handlePrintTransporter(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("transporterCountry");
    } else {
      navigate("/transporter");
    }
    toastSuccess("Transporter record edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      transporterCountry: "",
      transporterName: "",
      contactPerson: "",
      mobileNo: "",
      phoneNo: "",
      faxNo: "",
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
      inputRefs.current["transporterCountry"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintTransporter = (transporterData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Transporter Details",
        data: [transporterData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          transporterCountry: "Transporter Country",
          transporterName: "Transporter Name",
          contactPerson: "Contact Person",
          mobileNo: "Mobile No.",
          phoneNo: "Phone No.",
          faxNo: "Fax No.",
          email: "Email",
          website: "Website",
          isDefault: "Default Transporter",
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
      console.log("transporterData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Transporter Details"
          subtitle="Transporter Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transporter-details.pdf";
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
          navigate("/transporter/create");
        } else {
          navigate("/transporter/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/transporter/view");
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
              toastRestore("Transporter record saved as draft successfully");
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
        title={isEdit ? "Editing Transporter" : "Creating Transporter"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="transporter"
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
            {/* Basic Transporter Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.transporterCountry && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("transporterCountry")(el)}
                    id="transporterCountry"
                    name="transporterCountry"
                    options={countryOptions}
                    value={formData.transporterCountry}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        transporterCountry: value,
                      }));
                      focusNextInput("transporterName");
                    }}
                    onEnterPress={() => {
                      if (formData.transporterCountry) {
                        focusNextInput("transporterName");
                      }
                    }}
                    placeholder=" "
                    labelText="Transporter Country"
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

              {permissionsFields.transporterName && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("transporterName")(el)}
                    id="transporterName"
                    name="transporterName"
                    options={companyOptions}
                    value={formData.transporterName}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        transporterName: value,
                      }));
                      focusNextInput("contactPerson");
                    }}
                    onEnterPress={() => {
                      if (formData.transporterName) {
                        focusNextInput("contactPerson");
                      }
                    }}
                    placeholder=" "
                    labelText="Transporter Name"
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
                    tooltipText="Enter contact person name"
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
                    onNext={() => focusNextInput("phoneNo")}
                    onCancel={() => setFormData({ ...formData, mobileNo: "" })}
                    labelText="Mobile No."
                    tooltipText="Enter mobile number"
                    required
                    maxLength={20}
                  />
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.phoneNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("phoneNo")}
                    id="phoneNo"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("faxNo")}
                    onCancel={() => setFormData({ ...formData, phoneNo: "" })}
                    labelText="Phone No."
                    tooltipText="Enter phone number"
                    required
                    maxLength={20}
                  />
                </div>
              )}

              {permissionsFields.faxNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("faxNo")}
                    id="faxNo"
                    name="faxNo"
                    value={formData.faxNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, faxNo: "" })}
                    labelText="Fax No."
                    tooltipText="Enter fax number"
                    required
                    maxLength={20}
                  />
                </div>
              )}

              {permissionsFields.email && (
                <div className="space-y-2">
                  <Autocomplete
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("website")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="Email"
                    tooltipText="Enter email address"
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
                    tooltipText="Enter website URL"
                    required
                    maxLength={100}
                  />
                </div>
              )}
            </div>

            {/* System Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 relative">
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
