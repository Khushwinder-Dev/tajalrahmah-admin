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

type ShippingData = {
  sn: string;
  shipperCountry: string;
  shipperName: string;
  contactPerson: string;
  mobileNo: string;
  phoneNo: string;
  faxNo: string;
  email: string;
  website: string;
  shipmentRate: string;
  cbm: string;
  freightCost: string;
  currencyType: string;
  status: string;
  date: string;
  loginId: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ShippingData = {
  sn: "001",
  shipperCountry: "Saudi Arabia",
  shipperName: "Al-Rashid Shipping Co",
  contactPerson: "Ahmed Al-Rashid",
  mobileNo: "+966501234567",
  phoneNo: "+966114567890",
  faxNo: "+966114567891",
  email: "ahmed@rashidshipping.com",
  website: "www.rashidshipping.com",
  shipmentRate: "150.00",
  cbm: "25.5",
  freightCost: "3825.00",
  currencyType: "SAR",
  status: "Active",
  date: "2024-01-15",
  loginId: "user001",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

export default function ShippingCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("shipping", "create");
  const canView = usePermission("shipping", "view");
  const canEdit = usePermission("shipping", "edit");
  const canDelete = usePermission("shipping", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof ShippingData>(
    "shipping",
    "create",
    [
      "sn",
      "shipperCountry",
      "shipperName",
      "contactPerson",
      "mobileNo",
      "phoneNo",
      "faxNo",
      "email",
      "website",
      "shipmentRate",
      "cbm",
      "freightCost",
      "currencyType",
      "status",
      "date",
      "loginId",
      "isActive",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("shipping", "pdf");
  const canPrint: boolean = usePermission("shipping", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const statusOptions = [
    "Active",
    "Inactive",
    "On Hold",
    "Completed",
    "Cancelled",
    "Under Review",
    "Pending",
    "Approved",
    "In Transit",
    "Delivered",
  ];

  const shipperCountryOptions = [
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

  const currencyTypeOptions = [
    "SAR",
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CNY",
    "INR",
    "PKR",
    "BDT",
    "LKR",
    "MYR",
    "SGD",
    "THB",
    "VND",
    "PHP",
    "KRW",
    "NZD",
    "AUD",
    "CAD",
    "CHF",
    "DKK",
    "NOK",
    "SEK",
    "ZAR",
  ];

  // Form state
  const [formData, setFormData] = useState<ShippingData>({
    sn: "",
    shipperCountry: "",
    shipperName: "",
    contactPerson: "",
    mobileNo: "",
    phoneNo: "",
    faxNo: "",
    email: "",
    website: "",
    shipmentRate: "",
    cbm: "",
    freightCost: "",
    currencyType: "",
    status: "",
    date: "",
    loginId: "",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
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
          navigate("/shipping/create");
        } else {
          navigate("/shipping/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/shipping/view");
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
  }, [isEdit]);

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
      handlePrintShipping(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Shipping record created successfully!");
      handleReset();
    } else {
      toastSuccess("Shipping record created successfully!");
      navigate("/shipping");
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
      shipperCountry: "",
      shipperName: "",
      contactPerson: "",
      mobileNo: "",
      phoneNo: "",
      faxNo: "",
      email: "",
      website: "",
      shipmentRate: "",
      cbm: "",
      freightCost: "",
      currencyType: "",
      status: "",
      date: "",
      loginId: "",
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setIsDraftState("No");

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

  const handlePrintShipping = (shippingData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Shipping Details",
        data: [shippingData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          shipperCountry: "Shipper Country",
          shipperName: "Shipper Name",
          contactPerson: "Contact Person",
          mobileNo: "Mobile No",
          phoneNo: "Phone No",
          faxNo: "Fax No",
          email: "Email",
          website: "Website",
          shipmentRate: "Shipment Rate",
          cbm: "CBM",
          freightCost: "Freight Cost",
          currencyType: "Currency Type",
          status: "Status",
          date: "Date",
          loginId: "Login ID",
          isActive: "Active Status",
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
      console.log("shippingData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Shipping Details"
          subtitle="Shipping Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shipping-details.pdf";
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
              toastRestore("Shipping record saved as draft successfully");
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
        title={isEdit ? "Editing Shipping" : "Creating Shipping"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="shipping"
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
            {/* Basic Shipping Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.sn && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("sn")}
                    id="sn"
                    name="sn"
                    value={formData.sn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("shipperCountry")}
                    onCancel={() => setFormData({ ...formData, sn: "" })}
                    labelText="SN"
                    tooltipText="Enter serial number (e.g., 001, 002)"
                    required
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.shipperCountry && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("shipperCountry")(el)}
                    id="shipperCountry"
                    name="shipperCountry"
                    options={shipperCountryOptions}
                    value={formData.shipperCountry}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        shipperCountry: value,
                      }));
                      focusNextInput("shipperName");
                    }}
                    onEnterPress={() => {
                      if (formData.shipperCountry) {
                        focusNextInput("shipperName");
                      }
                    }}
                    placeholder=" "
                    labelText="Shipper Country"
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

              {permissionsFields.shipperName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shipperName")}
                    id="shipperName"
                    name="shipperName"
                    value={formData.shipperName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("contactPerson")}
                    onCancel={() =>
                      setFormData({ ...formData, shipperName: "" })
                    }
                    labelText="Shipper Name"
                    tooltipText="Enter shipper's full name"
                    required
                    maxLength={100}
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
                    tooltipText="Enter the contact person's name"
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
                    onNext={() => focusNextInput("phoneNo")}
                    onCancel={() => setFormData({ ...formData, mobileNo: "" })}
                    labelText="Mobile No"
                    tooltipText="Enter mobile phone number"
                    required
                    maxLength={20}
                  />
                </div>
              )}
            </div>

            {/* Contact and Shipment Details */}
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
                    labelText="Phone No"
                    tooltipText="Enter office phone number"
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
                    labelText="Fax No"
                    tooltipText="Enter fax number"
                    maxLength={20}
                  />
                </div>
              )}

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
                    onNext={() => focusNextInput("shipmentRate")}
                    onCancel={() => setFormData({ ...formData, website: "" })}
                    labelText="Website"
                    tooltipText="Enter website URL"
                    type="url"
                    maxLength={200}
                  />
                </div>
              )}
            </div>

            {/* Website and Shipment Rate */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.shipmentRate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shipmentRate")}
                    id="shipmentRate"
                    name="shipmentRate"
                    value={formData.shipmentRate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("cbm")}
                    onCancel={() =>
                      setFormData({ ...formData, shipmentRate: "" })
                    }
                    labelText="Shipment Rate"
                    tooltipText="Enter the rate for this shipment"
                    required
                    type="number"
                    step="0.01"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.cbm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("cbm")}
                    id="cbm"
                    name="cbm"
                    value={formData.cbm}
                    onChange={handleChange}
                    onNext={() => focusNextInput("freightCost")}
                    onCancel={() => setFormData({ ...formData, cbm: "" })}
                    labelText="CBM"
                    tooltipText="Enter the total cubic meters of the shipment"
                    required
                    type="number"
                    step="0.01"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.freightCost && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("freightCost")}
                    id="freightCost"
                    name="freightCost"
                    value={formData.freightCost}
                    onChange={handleChange}
                    onNext={() => focusNextInput("currencyType")}
                    onCancel={() =>
                      setFormData({ ...formData, freightCost: "" })
                    }
                    labelText="Freight Cost"
                    tooltipText="Enter the total freight cost for this shipment"
                    required
                    type="number"
                    step="0.01"
                    maxLength={15}
                  />
                </div>
              )}

              {permissionsFields.currencyType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("currencyType")(el)}
                    id="currencyType"
                    name="currencyType"
                    options={currencyTypeOptions}
                    value={formData.currencyType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        currencyType: value,
                      }));
                      focusNextInput("status");
                    }}
                    onEnterPress={() => {
                      if (formData.currencyType) {
                        focusNextInput("status");
                      }
                    }}
                    placeholder=" "
                    labelText="Currency Type"
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

            {/* CBM and Freight Cost */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.status && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    options={statusOptions}
                    value={formData.status}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        status: value,
                      }));
                      focusNextInput("date");
                    }}
                    onEnterPress={() => {
                      if (formData.status) {
                        focusNextInput("date");
                      }
                    }}
                    placeholder=" "
                    labelText="Status"
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

              {permissionsFields.date && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("date")}
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onNext={() => focusNextInput("loginId")}
                    onCancel={() => setFormData({ ...formData, date: "" })}
                    labelText="Date"
                    tooltipText="Enter shipping date (YYYY-MM-DD)"
                    required
                    type="date"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.loginId && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("loginId")(el)}
                    id="loginId"
                    name="loginId"
                    options={[
                      "user001",
                      "user002",
                      "user003",
                      "user004",
                      "user005",
                    ]}
                    value={formData.loginId}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        loginId: value,
                      }));
                      focusNextInput("isActive");
                    }}
                    onEnterPress={() => {
                      if (formData.loginId) {
                        focusNextInput("isActive");
                      }
                    }}
                    placeholder=" "
                    labelText="Login ID"
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
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isActive")(el)}
                    id="isActive"
                    name="isActive"
                    options={["No", "Yes"]}
                    value={formData.isActive ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setFormData((prev) => ({
                        ...prev,
                        isActive: isYes,
                      }));
                      focusNextInput("isDraft");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isActive === true ||
                        formData.isActive === false
                      ) {
                        focusNextInput("isDraft");
                      }
                    }}
                    placeholder=" "
                    labelText="Active"
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

            {/* Currency Type and Status */}
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
