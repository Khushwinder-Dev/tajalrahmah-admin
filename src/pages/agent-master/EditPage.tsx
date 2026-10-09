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

type AgentData = {
  agentCode: string;
  agentName: string;
  country: string;
  notification: string;
  portType: string;
  portName: string;
  address: string;
  landmark: string;
  contact: string;
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

const initialData: AgentData = {
  agentCode: "AG001",
  agentName: "Al-Rashid Shipping Agency",
  country: "Saudi Arabia",
  notification: "Email & SMS",
  portType: "Commercial",
  portName: "Jeddah Islamic Port",
  address: "Jeddah, Makkah Province",
  landmark: "Near King Abdulaziz International Airport",
  contact: "Ahmed Al-Rashid",
  mobileNo: "+966-50-123-4567",
  phoneNo: "+966-12-123-4567",
  faxNo: "+966-12-123-4568",
  email: "info@alrashid-shipping.sa",
  website: "www.alrashid-shipping.sa",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function AgentMasterEditPage({ isEdit = true }: Props) {
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
  const [formData, setFormData] = useState<AgentData>({
    agentCode: "",
    agentName: "",
    country: "",
    notification: "",
    portType: "",
    portName: "",
    address: "",
    landmark: "",
    contact: "",
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
  const canCreate = usePermission("agentMaster", "create");
  const canView = usePermission("agentMaster", "view");
  const canEdit = usePermission("agentMaster", "edit");
  const canDelete = usePermission("agentMaster", "delete");

  // Field-level permissions
  const permissionsFields = usePermission<keyof AgentData>(
    "agentMaster",
    "edit",
    [
      "agentCode",
      "agentName",
      "country",
      "notification",
      "portType",
      "portName",
      "address",
      "landmark",
      "contact",
      "mobileNo",
      "phoneNo",
      "faxNo",
      "email",
      "website",
      "isDefault",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("agentMaster", "pdf");
  const canPrint: boolean = usePermission("agentMaster", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const portTypeOptions = [
    "Commercial",
    "Fishing",
    "Military",
    "Recreational",
    "Container",
    "Bulk Cargo",
    "Oil Terminal",
    "Passenger",
    "Industrial",
    "Research",
    "Tourism",
    "Emergency",
    "Private",
    "Public",
    "International",
    "Regional",
    "Local",
    "Specialized",
  ];

  const countryOptions = [
    "Saudi Arabia",
    "United Arab Emirates",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
    "Jordan",
    "Egypt",
    "Lebanon",
    "Iraq",
    "Syria",
    "Yemen",
    "Turkey",
    "Iran",
    "Pakistan",
    "India",
    "China",
    "Japan",
    "South Korea",
    "Singapore",
  ];

  const contactPersonOptions = [
    "Ahmed Al-Rashid",
    "Mohammed Al-Zahrani",
    "Fatima Al-Sayed",
    "Omar Al-Mansouri",
    "Aisha Al-Qahtani",
    "Khalid Al-Otaibi",
    "Noor Al-Harbi",
    "Yusuf Al-Dossary",
    "Layla Al-Shamrani",
    "Hassan Al-Mutairi",
    "Mariam Al-Hajri",
    "Abdullah Al-Shehri",
    "Zahra Al-Ghamdi",
    "Ibrahim Al-Ruwaili",
    "Amina Al-Sulaimani",
    "Saleh Al-Balawi",
    "Huda Al-Malki",
    "Tariq Al-Hamdan",
    "Rania Al-Saadi",
    "Waleed Al-Rashidi",
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
      handlePrintAgent(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("agentCode");
    } else {
      navigate("/agent-master");
    }
    toastSuccess("Agent record edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      agentCode: "",
      agentName: "",
      country: "",
      notification: "",
      portType: "",
      portName: "",
      address: "",
      landmark: "",
      contact: "",
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
      inputRefs.current["agentCode"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintAgent = (agentData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Agent Details",
        data: [agentData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          agentCode: "Agent Code",
          agentName: "Agent Name",
          country: "Country",
          notification: "Notification",
          portType: "Port Type",
          portName: "Port Name",
          address: "Address",
          landmark: "Landmark",
          contact: "Contact",
          mobileNo: "Mobile No.",
          phoneNo: "Phone No.",
          faxNo: "Fax No.",
          email: "Email",
          website: "Website",
          isDefault: "Default Agent",
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
      console.log("agentData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Agent Details"
          subtitle="Agent Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "agent-details.pdf";
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
          navigate("/agent-master/create");
        } else {
          navigate("/agent-master/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/agent-master/view");
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
              toastRestore("Agent record saved as draft successfully");
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
        title={isEdit ? "Editing Agent" : "Creating Agent"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="agent-master"
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
            {/* Basic Agent Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.agentCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("agentCode")}
                    id="agentCode"
                    name="agentCode"
                    value={formData.agentCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("agentName")}
                    onCancel={() => setFormData({ ...formData, agentCode: "" })}
                    labelText="Agent Code"
                    tooltipText="Enter unique agent code (e.g., AG001, AG002)"
                    required
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.agentName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("agentName")}
                    id="agentName"
                    name="agentName"
                    value={formData.agentName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("country")}
                    onCancel={() => setFormData({ ...formData, agentName: "" })}
                    labelText="Agent Name"
                    tooltipText="Enter full agent name"
                    required
                    maxLength={100}
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
                      focusNextInput("notification");
                    }}
                    onEnterPress={() => {
                      if (formData.country) {
                        focusNextInput("notification");
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

              {permissionsFields.notification && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("notification")(el)}
                    id="notification"
                    name="notification"
                    options={[
                      "Email",
                      "SMS",
                      "Email & SMS",
                      "WhatsApp",
                      "SMS & WhatsApp",
                    ]}
                    value={formData.notification}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        notification: value,
                      }));
                      focusNextInput("portType");
                    }}
                    onEnterPress={() => {
                      if (formData.notification) {
                        focusNextInput("portType");
                      }
                    }}
                    placeholder=" "
                    labelText="Notification"
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

            {/* Port Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.portType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("portType")(el)}
                    id="portType"
                    name="portType"
                    options={portTypeOptions}
                    value={formData.portType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        portType: value,
                      }));
                      focusNextInput("portName");
                    }}
                    onEnterPress={() => {
                      if (formData.portType) {
                        focusNextInput("portName");
                      }
                    }}
                    placeholder=" "
                    labelText="Port Type"
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

              {permissionsFields.portName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("portName")}
                    id="portName"
                    name="portName"
                    value={formData.portName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("address")}
                    onCancel={() => setFormData({ ...formData, portName: "" })}
                    labelText="Port Name"
                    tooltipText="Enter port name"
                    required
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.address && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("address")}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("landmark")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText="Address"
                    tooltipText="Enter agent address"
                    required
                    maxLength={200}
                  />
                </div>
              )}

              {permissionsFields.landmark && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("landmark")}
                    id="landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    onNext={() => focusNextInput("contact")}
                    onCancel={() => setFormData({ ...formData, landmark: "" })}
                    labelText="Landmark"
                    tooltipText="Enter nearby landmark for easy identification"
                    maxLength={100}
                  />
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.contact && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("contact")(el)}
                    id="contact"
                    name="contact"
                    options={contactPersonOptions}
                    value={formData.contact}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        contact: value,
                      }));
                      focusNextInput("mobileNo");
                    }}
                    onEnterPress={() => {
                      if (formData.contact) {
                        focusNextInput("mobileNo");
                      }
                    }}
                    placeholder=" "
                    labelText="Contact"
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
                    tooltipText="Enter mobile number with country code"
                    required
                    type="tel"
                    maxLength={20}
                  />
                </div>
              )}

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
                    tooltipText="Enter office phone number"
                    type="tel"
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
                    type="tel"
                    maxLength={20}
                  />
                </div>
              )}
            </div>

            {/* Additional Contact Information */}
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
                    tooltipText="Enter port website URL"
                    type="url"
                    maxLength={100}
                  />
                </div>
              )}
            </div>

            {/* System Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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
