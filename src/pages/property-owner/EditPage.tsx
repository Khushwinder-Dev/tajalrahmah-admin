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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type ProjectTypeDataType = {
  code: string;
  ownerName: string;
  vatNumber: string;
  email: string;
  phoneNumber: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  profileImage: string | null;

  facebookUrl?: string;
  instagramUrl?: string;
  whatsappUrl?: string;

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

  isShippingAddressSameAsBilling: boolean;

  isDefault: boolean;
  isActive: boolean;
  isDeleted: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ProjectTypeDataType = {
  code: "PRJ-001",
  ownerName: "Ant Man",
  vatNumber: "VAT123456",
  email: "antman@example.com",
  phoneNumber: "+8801700000000",
  website: "https://example.com",
  address: "123 Green Road",
  city: "Dhaka",
  state: "Dhaka Division",
  zipCode: "1205",
  country: "Bangladesh",
  profileImage: "/customer-dummy-image.jpg",

  facebookUrl: "#",
  instagramUrl: "#",
  whatsappUrl: "#",

  billingStreet: "123 Billing Road",
  billingCity: "Dhaka",
  billingState: "Dhaka Division",
  billingZipCode: "1206",
  billingCountry: "Bangladesh",

  shippingStreet: "456 Shipping Lane",
  shippingCity: "Chittagong",
  shippingState: "Chittagong Division",
  shippingZipCode: "4000",
  shippingCountry: "Bangladesh",

  isShippingAddressSameAsBilling: false,

  isDefault: true,
  isActive: true,
  isDeleted: false,

  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function PropertyOwnerEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
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

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("propertyOwner", "create");
  const canView = usePermission("propertyOwner", "view");
  const canEdit = usePermission("propertyOwner", "edit");
  const canDelete = usePermission("propertyOwner", "delete");
  const canPdf = usePermission("propertyOwner", "pdf");
  const canPrint = usePermission("propertyOwner", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof ProjectTypeDataType>(
    "propertyOwner",
    "create",
    [
      "code",
      "ownerName",
      "vatNumber",
      "email",
      "phoneNumber",
      "website",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
      "profileImage",
      "facebookUrl",
      "instagramUrl",
      "whatsappUrl",
      "billingStreet",
      "billingCity",
      "billingState",
      "billingZipCode",
      "billingCountry",
      "shippingStreet",
      "shippingCity",
      "shippingState",
      "shippingZipCode",
      "shippingCountry",
      "isShippingAddressSameAsBilling",
      "isDefault",
      "isActive",
      "isDeleted",
    ]
  );

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    code: "",
    ownerName: "",
    vatNumber: "",
    email: "",
    phoneNumber: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    profileImage: "",

    facebookUrl: "",
    instagramUrl: "",
    whatsappUrl: "",

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

    isShippingAddressSameAsBilling: false,

    isDefault: false,
    isActive: false,
    isDeleted: false,
    draftedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
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
          navigate("/property-owner/create");
        } else {
          navigate("/property-owner/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/property-owner/view");
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
      setImagePreview(initialData.profileImage);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsActiveState(initialData.isActive ? "Yes" : "No");
      setIsDeletedState(initialData.isDeleted ? "Yes" : "No");
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
      toastSuccess("Property Owner updated successfully!");
      handleReset();
    } else {
      toastSuccess("Property Owner updated successfully!");
      navigate("/property-owner");
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
      code: "",
      ownerName: "",
      vatNumber: "",
      email: "",
      phoneNumber: "",
      website: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      profileImage: "",

      facebookUrl: "",
      instagramUrl: "",
      whatsappUrl: "",

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

      isShippingAddressSameAsBilling: false,

      isDefault: false,
      isActive: false,
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
      inputRefs.current["code"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Property Owner Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          ownerName: "Owner Name",
          vatNumber: "VAT Number",
          email: "Email",
          phoneNumber: "Phone Number",
          website: "Website",
          address: "Address",
          city: "City",
          state: "State",
          zipCode: "Zip Code",
          country: "Country",
          profileImage: "Profile Image",
          facebookUrl: "Facebook URL",
          instagramUrl: "Instagram URL",
          whatsappUrl: "WhatsApp URL",
          billingStreet: "Billing Street",
          billingCity: "Billing City",
          billingState: "Billing State",
          billingZipCode: "Billing Zip Code",
          billingCountry: "Billing Country",
          shippingStreet: "Shipping Street",
          shippingCity: "Shipping City",
          shippingState: "Shipping State",
          shippingZipCode: "Shipping Zip Code",
          shippingCountry: "Shipping Country",
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
          title="Property Owner Details"
          subtitle="Property Owner Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "property-owner-details.pdf";
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
      if (!formData.isActive) {
        return [
          ...filteredOptions,
          {
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isActive: true,
              }));
              toastRestore("Property Owner saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isActive, canCreate]);

  const handleSameAsBillingAddressChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isShippingAddressSameAsBilling: checked,
    }));

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        shippingStreet: prev.billingStreet,
        shippingCity: prev.billingCity,
        shippingState: prev.billingState,
        shippingZipCode: prev.billingZipCode,
        shippingCountry: prev.billingCountry,
      }));
    }
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
        setFormData({ ...formData, profileImage: e.target?.result as string });
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

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Property Owner" : "Creating Property Owner"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="property-owner"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="edit"
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
              {permissionsFields.code && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("code")}
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    onNext={() => focusNextInput("ownerName")}
                    onCancel={() => setFormData({ ...formData, code: "" })}
                    labelText="Code"
                    tooltipText="Enter code"
                    required
                  />
                </div>
              )}

              {permissionsFields.ownerName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("ownerName")}
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vatNumber")}
                    onCancel={() => setFormData({ ...formData, ownerName: "" })}
                    labelText="Owner Name"
                    tooltipText="Enter owner name"
                    required
                  />
                </div>
              )}

              {permissionsFields.vatNumber && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("vatNumber")}
                    type="text"
                    id="vatNumber"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, vatNumber: "" })}
                    labelText="Vat Number"
                    tooltipText="Enter vat number"
                    required
                  />
                </div>
              )}

              {permissionsFields.email && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("phoneNumber")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="Email"
                    tooltipText="Enter email"
                    required
                  />
                </div>
              )}

              {permissionsFields.phoneNumber && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("phoneNumber")}
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("website")}
                    onCancel={() =>
                      setFormData({ ...formData, phoneNumber: "" })
                    }
                    labelText="Phone Number"
                    tooltipText="Enter phone number"
                    required
                  />
                </div>
              )}

              {permissionsFields.website && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("website")}
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onNext={() => focusNextInput("address")}
                    onCancel={() => setFormData({ ...formData, website: "" })}
                    labelText="Website"
                    tooltipText="Enter website"
                    required
                  />
                </div>
              )}

              {permissionsFields.address && (
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
                    labelText="Address"
                    tooltipText="Enter address"
                    required
                  />
                </div>
              )}

              {permissionsFields.city && (
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
                    labelText="City"
                    tooltipText="Enter city"
                    required
                  />
                </div>
              )}

              {permissionsFields.state && (
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
                    labelText="State"
                    tooltipText="Enter state"
                    required
                  />
                </div>
              )}

              {permissionsFields.zipCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("zipCode")}
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("zipCode")}
                    onCancel={() => setFormData({ ...formData, zipCode: "" })}
                    labelText="Zip Code"
                    tooltipText="Enter zip code"
                    required
                  />
                </div>
              )}

              {permissionsFields.country && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("country")(el)}
                    id="country"
                    name="country"
                    options={["Bangladesh", "India", "Pakistan", "USA"]}
                    value={formData.country}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        country: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("facebookUrl");
                    }}
                    onEnterPress={() => {
                      focusNextInput("facebookUrl");
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
            </div>
            {permissionsFields.profileImage && (
              <div className="space-y-2 my-8 pt-4 cursor-pointer relative">
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
                        setFormData({ ...formData, profileImage: null });
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
                        alt={"Profile Image"}
                        className="w-40 h-28 object-contain rounded-md"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                          setFormData({ ...formData, profileImage: null });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-14">
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="text-base text-gray-500">
                        {"Drag and drop image or click to upload"}
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
            <h3 className="text-2xl font-semibold">Social medial accounts</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.facebookUrl && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("facebookUrl")}
                    type="text"
                    id="facebookUrl"
                    name="facebookUrl"
                    value={formData.facebookUrl ? formData.facebookUrl : ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("instagramUrl")}
                    onCancel={() =>
                      setFormData({ ...formData, facebookUrl: "" })
                    }
                    labelText="Facebook URL"
                    tooltipText="Enter facebook url"
                    required
                  />
                </div>
              )}

              {permissionsFields.instagramUrl && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("instagramUrl")}
                    type="text"
                    id="instagramUrl"
                    name="instagramUrl"
                    value={formData.instagramUrl ? formData.instagramUrl : ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("whatsappUrl")}
                    onCancel={() =>
                      setFormData({ ...formData, instagramUrl: "" })
                    }
                    labelText="Instagram URL"
                    tooltipText="Enter instagram url"
                    required
                  />
                </div>
              )}

              {permissionsFields.whatsappUrl && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("whatsappUrl")}
                    type="text"
                    id="whatsappUrl"
                    name="whatsappUrl"
                    value={formData.whatsappUrl ? formData.whatsappUrl : ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("billingStreet")}
                    onCancel={() =>
                      setFormData({ ...formData, whatsappUrl: "" })
                    }
                    labelText="WhatsApp URL"
                    tooltipText="Enter whatsapp url"
                    required
                  />
                </div>
              )}
            </div>

            <h3 className="text-2xl font-semibold">Billing Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.billingStreet && (
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
                    tooltipText="Enter street"
                    required
                  />
                </div>
              )}

              {permissionsFields.billingCity && (
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
                    labelText="City"
                    tooltipText="Enter city"
                    required
                  />
                </div>
              )}

              {permissionsFields.billingState && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("billingState")}
                    type="text"
                    id="billingState"
                    name="billingState"
                    value={formData.billingState}
                    onChange={handleChange}
                    onNext={() => focusNextInput("zipCode")}
                    onCancel={() =>
                      setFormData({ ...formData, billingState: "" })
                    }
                    labelText="State"
                    tooltipText="Enter state"
                    required
                  />
                </div>
              )}

              {permissionsFields.billingZipCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("billingZipCode")}
                    type="text"
                    id="billingZipCode"
                    name="billingZipCode"
                    value={formData.billingZipCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("zipCode")}
                    onCancel={() =>
                      setFormData({ ...formData, billingZipCode: "" })
                    }
                    labelText="Zip Code"
                    tooltipText="Enter zip code"
                    required
                  />
                </div>
              )}

              {permissionsFields.billingCountry && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("billingCountry")(el)}
                    id="billingCountry"
                    name="billingCountry"
                    options={["Bangladesh", "India", "Pakistan", "USA"]}
                    value={formData.billingCountry}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        billingCountry: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("shippingStreet");
                    }}
                    onEnterPress={() => {
                      focusNextInput("shippingStreet");
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
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold">Shipping Address</h3>
              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="isShippingAddressSameAsBilling"
                  checked={formData.isShippingAddressSameAsBilling}
                  onCheckedChange={handleSameAsBillingAddressChange}
                />
                <Label
                  htmlFor="isShippingAddressSameAsBilling"
                  className="cursor-pointer"
                >
                  Same as Billing Address
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.shippingStreet && (
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
                    tooltipText="Enter street"
                    required
                  />
                </div>
              )}

              {permissionsFields.shippingCity && (
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
                    labelText="City"
                    tooltipText="Enter city"
                    required
                  />
                </div>
              )}

              {permissionsFields.shippingState && (
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
                    labelText="State"
                    tooltipText="Enter state"
                    required
                  />
                </div>
              )}

              {permissionsFields.shippingZipCode && (
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
                    labelText="Zip Code"
                    tooltipText="Enter zip code"
                    required
                  />
                </div>
              )}

              {permissionsFields.shippingCountry && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("shippingCountry")(el)}
                    id="shippingCountry"
                    name="shippingCountry"
                    options={["Bangladesh", "India", "Pakistan", "USA"]}
                    value={formData.shippingCountry}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        shippingCountry: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("shippingStreet");
                    }}
                    onEnterPress={() => {
                      focusNextInput("shippingStreet");
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Default field - only show if user can create */}
              {permissionsFields.isDefault && (
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

              {permissionsFields.isActive && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("isActive")(el)}
                    id="isActive"
                    name="isActive"
                    labelText="Inactive"
                    isSelectableOnly={true}
                    options={["No", "Yes"]}
                    value={isActiveState === "Yes" ? "Yes" : "No"}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
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
              )}

              {permissionsFields.isDeleted && (
                <div className="space-y-2">
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
