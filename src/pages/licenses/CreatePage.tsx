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

type LicensesData = {
  sn: string;
  softwareName: string;
  category: string;
  productKey: string;
  seats: number;
  manufacturer: string;
  licensedName: string;
  licensedEmail: string;
  supplier: string;
  orderNumber: string;
  purchaseOrderNumber: string;
  purchaseCost: number;
  purchaseDate: string;
  expirationDate: string;
  terminationDate: string | null;
  depreciation: string;
  notes: string;
  status: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: LicensesData = {
  sn: "001",
  softwareName: "Microsoft Office 365",
  category: "Productivity",
  productKey: "XXXX-XXXX-XXXX-XXXX",
  seats: 50,
  manufacturer: "Microsoft Corporation",
  licensedName: "Tech Solutions Inc",
  licensedEmail: "admin@techsolutions.com",
  supplier: "Microsoft Store",
  orderNumber: "ORD-2024-001",
  purchaseOrderNumber: "PO-2024-001",
  purchaseCost: 2500.0,
  purchaseDate: "2024-01-15",
  expirationDate: "2025-01-15",
  terminationDate: null,
  depreciation: "25%",
  notes: "Annual subscription for office productivity suite",
  status: "Active",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

export default function LicensesCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("licenses", "create");
  const canView = usePermission("licenses", "view");
  const canEdit = usePermission("licenses", "edit");
  const canDelete = usePermission("licenses", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof LicensesData>(
    "licenses",
    "create",
    [
      "sn",
      "softwareName",
      "category",
      "productKey",
      "seats",
      "manufacturer",
      "licensedName",
      "licensedEmail",
      "supplier",
      "orderNumber",
      "purchaseOrderNumber",
      "purchaseCost",
      "purchaseDate",
      "expirationDate",
      "terminationDate",
      "depreciation",
      "notes",
      "status",
      "isActive",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("licenses", "pdf");
  const canPrint: boolean = usePermission("licenses", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const statusOptions = [
    "Active",
    "Inactive",
    "On Hold",
    "Under Review",
    "Pending",
    "Approved",
    "Closed",
    "Expired",
  ];

  const categoryOptions = [
    "Productivity",
    "Design",
    "Engineering",
    "Accounting",
    "Virtualization",
    "Analytics",
    "ERP",
    "Development",
    "Security",
    "Communication",
    "Project Management",
    "Database",
    "Operating System",
    "Antivirus",
    "Backup",
    "Cloud Services",
  ];

  const manufacturerOptions = [
    "Microsoft Corporation",
    "Adobe Inc",
    "Autodesk Inc",
    "Intuit Inc",
    "VMware Inc",
    "Salesforce Inc",
    "Dassault Systèmes",
    "SAP SE",
    "Cisco Systems",
    "Atlassian Corporation",
    "Oracle Corporation",
    "IBM Corporation",
    "Google LLC",
    "Apple Inc",
    "Symantec Corporation",
    "Trend Micro",
  ];

  const supplierOptions = [
    "Microsoft Store",
    "Adobe Store",
    "Autodesk Store",
    "Intuit Store",
    "VMware Store",
    "Salesforce Store",
    "SAP Store",
    "Cisco Store",
    "Atlassian Store",
    "Oracle Store",
    "IBM Store",
    "Google Store",
    "Apple Store",
    "Symantec Store",
    "Trend Micro Store",
    "Direct Purchase",
  ];

  const depreciationOptions = [
    "10%",
    "15%",
    "20%",
    "25%",
    "30%",
    "35%",
    "40%",
    "45%",
    "50%",
  ];

  // Form state
  const [formData, setFormData] = useState<LicensesData>({
    sn: "",
    softwareName: "",
    category: "",
    productKey: "",
    seats: 1,
    manufacturer: "",
    licensedName: "",
    licensedEmail: "",
    supplier: "",
    orderNumber: "",
    purchaseOrderNumber: "",
    purchaseCost: 0,
    purchaseDate: "",
    expirationDate: "",
    terminationDate: null,
    depreciation: "25%",
    notes: "",
    status: "",
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
          navigate("/licenses/create");
        } else {
          navigate("/licenses/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/licenses/view");
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
      handlePrintLicense(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("License created successfully!");
      handleReset();
    } else {
      toastSuccess("License created successfully!");
      navigate("/licenses");
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
      softwareName: "",
      category: "",
      productKey: "",
      seats: 1,
      manufacturer: "",
      licensedName: "",
      licensedEmail: "",
      supplier: "",
      orderNumber: "",
      purchaseOrderNumber: "",
      purchaseCost: 0,
      purchaseDate: "",
      expirationDate: "",
      terminationDate: null,
      depreciation: "25%",
      notes: "",
      status: "",
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

  const handlePrintLicense = (licenseData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "License Details",
        data: [licenseData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          softwareName: "Software Name",
          category: "Category",
          productKey: "Product Key",
          seats: "Seats",
          manufacturer: "Manufacturer",
          licensedName: "Licensed Name",
          licensedEmail: "Licensed Email",
          supplier: "Supplier",
          orderNumber: "Order Number",
          purchaseOrderNumber: "Purchase Order Number",
          purchaseCost: "Purchase Cost",
          purchaseDate: "Purchase Date",
          expirationDate: "Expiration Date",
          terminationDate: "Termination Date",
          depreciation: "Depreciation",
          notes: "Notes",
          status: "Status",
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
      console.log("licenseData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="License Details"
          subtitle="License Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "license-details.pdf";
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
              toastRestore("License record saved as draft successfully");
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
        title={isEdit ? "Editing License" : "Creating License"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="licenses"
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
            {/* Basic License Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.sn && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("sn")}
                    id="sn"
                    name="sn"
                    value={formData.sn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("softwareName")}
                    onCancel={() => setFormData({ ...formData, sn: "" })}
                    labelText="SN"
                    tooltipText="Enter serial number (e.g., 001, 002)"
                    required
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.softwareName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("softwareName")}
                    id="softwareName"
                    name="softwareName"
                    value={formData.softwareName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("category")}
                    onCancel={() =>
                      setFormData({ ...formData, softwareName: "" })
                    }
                    labelText="Software Name"
                    tooltipText="Enter software name"
                    required
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.category && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("category")(el)}
                    id="category"
                    name="category"
                    options={categoryOptions}
                    value={formData.category}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        category: value,
                      }));
                      focusNextInput("productKey");
                    }}
                    onEnterPress={() => {
                      if (formData.category) {
                        focusNextInput("productKey");
                      }
                    }}
                    placeholder=" "
                    labelText="Category"
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

              {permissionsFields.productKey && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("productKey")}
                    id="productKey"
                    name="productKey"
                    value={formData.productKey}
                    onChange={handleChange}
                    onNext={() => focusNextInput("seats")}
                    onCancel={() =>
                      setFormData({ ...formData, productKey: "" })
                    }
                    labelText="Product Key"
                    tooltipText="Enter product key/license key"
                    required
                    maxLength={50}
                  />
                </div>
              )}
            </div>

            {/* License Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.seats && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("seats")}
                    id="seats"
                    name="seats"
                    value={formData.seats.toString()}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setFormData((prev) => ({
                        ...prev,
                        seats: value,
                      }));
                    }}
                    onNext={() => focusNextInput("manufacturer")}
                    onCancel={() => setFormData({ ...formData, seats: 1 })}
                    labelText="Seats"
                    tooltipText="Enter number of seats/licenses"
                    required
                    type="number"
                    min={1}
                    max={1000}
                  />
                </div>
              )}

              {permissionsFields.manufacturer && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("manufacturer")(el)}
                    id="manufacturer"
                    name="manufacturer"
                    options={manufacturerOptions}
                    value={formData.manufacturer}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        manufacturer: value,
                      }));
                      focusNextInput("licensedName");
                    }}
                    onEnterPress={() => {
                      if (formData.manufacturer) {
                        focusNextInput("licensedName");
                      }
                    }}
                    placeholder=" "
                    labelText="Manufacturer"
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

              {permissionsFields.licensedName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("licensedName")}
                    id="licensedName"
                    name="licensedName"
                    value={formData.licensedName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("licensedEmail")}
                    onCancel={() =>
                      setFormData({ ...formData, licensedName: "" })
                    }
                    labelText="Licensed Name"
                    tooltipText="Enter company/organization name"
                    required
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.licensedEmail && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("licensedEmail")}
                    id="licensedEmail"
                    name="licensedEmail"
                    value={formData.licensedEmail}
                    onChange={handleChange}
                    onNext={() => focusNextInput("supplier")}
                    onCancel={() =>
                      setFormData({ ...formData, licensedEmail: "" })
                    }
                    labelText="Licensed Email"
                    tooltipText="Enter contact email for license"
                    required
                    type="email"
                    maxLength={100}
                  />
                </div>
              )}
            </div>

            {/* Additional License Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.supplier && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("supplier")(el)}
                    id="supplier"
                    name="supplier"
                    options={supplierOptions}
                    value={formData.supplier}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        supplier: value,
                      }));
                      focusNextInput("orderNumber");
                    }}
                    onEnterPress={() => {
                      if (formData.supplier) {
                        focusNextInput("orderNumber");
                      }
                    }}
                    placeholder=" "
                    labelText="Supplier"
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
                      focusNextInput("purchaseCost");
                    }}
                    onEnterPress={() => {
                      if (formData.status) {
                        focusNextInput("purchaseCost");
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

              {permissionsFields.purchaseCost && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("purchaseCost")}
                    id="purchaseCost"
                    name="purchaseCost"
                    value={formData.purchaseCost.toString()}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setFormData((prev) => ({
                        ...prev,
                        purchaseCost: value,
                      }));
                    }}
                    onNext={() => focusNextInput("purchaseDate")}
                    onCancel={() =>
                      setFormData({ ...formData, purchaseCost: 0 })
                    }
                    labelText="Purchase Cost"
                    tooltipText="Enter purchase cost"
                    required
                    type="number"
                    step="0.01"
                    min={0}
                  />
                </div>
              )}

              {permissionsFields.purchaseDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("purchaseDate")}
                    id="purchaseDate"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("expirationDate")}
                    onCancel={() =>
                      setFormData({ ...formData, purchaseDate: "" })
                    }
                    labelText="Purchase Date"
                    tooltipText="Enter purchase date (YYYY-MM-DD)"
                    required
                    type="date"
                    maxLength={10}
                  />
                </div>
              )}
            </div>

            {/* More License Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.expirationDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("expirationDate")}
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("depreciation")}
                    onCancel={() =>
                      setFormData({ ...formData, expirationDate: "" })
                    }
                    labelText="Expiration Date"
                    tooltipText="Enter license expiration date (YYYY-MM-DD)"
                    required
                    type="date"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.depreciation && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("depreciation")(el)}
                    id="depreciation"
                    name="depreciation"
                    options={depreciationOptions}
                    value={formData.depreciation}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        depreciation: value,
                      }));
                      focusNextInput("notes");
                    }}
                    onEnterPress={() => {
                      if (formData.depreciation) {
                        focusNextInput("notes");
                      }
                    }}
                    placeholder=" "
                    labelText="Depreciation"
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

              {permissionsFields.notes && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("notes")}
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isActive")}
                    onCancel={() => setFormData({ ...formData, notes: "" })}
                    labelText="Notes"
                    tooltipText="Enter additional notes about the license"
                    required
                    maxLength={500}
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

            {/* Status and Draft Fields */}
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
