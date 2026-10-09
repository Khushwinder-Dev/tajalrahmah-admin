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

type PreAlertsData = {
  tracking: string;
  date: string;
  customer: string;
  shippingCompany: string;
  supplier: string;
  packageDescription: string;
  deliveryDate: string;
  purchasePrice: number;
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

const initialData: PreAlertsData = {
  tracking: "TRK-2024-001",
  date: "2024-01-15",
  customer: "Tech Solutions Inc",
  shippingCompany: "FedEx Express",
  supplier: "Microsoft Store",
  packageDescription: "Microsoft Office 365 License Keys",
  deliveryDate: "2024-01-20",
  purchasePrice: 2500.0,
  status: "In Transit",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

export default function PreAlertsCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("preAlerts", "create");
  const canView = usePermission("preAlerts", "view");
  const canEdit = usePermission("preAlerts", "edit");
  const canDelete = usePermission("preAlerts", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof PreAlertsData>(
    "preAlerts",
    "create",
    [
      "tracking",
      "date",
      "customer",
      "shippingCompany",
      "supplier",
      "packageDescription",
      "deliveryDate",
      "purchasePrice",
      "status",
      "isActive",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("preAlerts", "pdf");
  const canPrint: boolean = usePermission("preAlerts", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const statusOptions = [
    "In Transit",
    "Delivered",
    "Pending",
    "Out for Delivery",
    "In Customs",
    "Returned",
    "Lost",
    "Damaged",
  ];

  const shippingCompanyOptions = [
    "FedEx Express",
    "UPS Ground",
    "DHL Express",
    "USPS Priority",
    "FedEx Ground",
    "UPS Express",
    "DHL Ground",
    "USPS First Class",
    "Amazon Logistics",
    "OnTrac",
    "LaserShip",
    "Purolator",
    "Canada Post",
    "Royal Mail",
    "Deutsche Post",
    "La Poste",
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

  // Form state
  const [formData, setFormData] = useState<PreAlertsData>({
    tracking: "",
    date: "",
    customer: "",
    shippingCompany: "",
    supplier: "",
    packageDescription: "",
    deliveryDate: "",
    purchasePrice: 0,
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
          navigate("/pre-alerts/create");
        } else {
          navigate("/pre-alerts/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/pre-alerts/view");
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
      handlePrintPreAlert(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Pre-alert created successfully!");
      handleReset();
    } else {
      toastSuccess("Pre-alert created successfully!");
      navigate("/pre-alerts");
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
      tracking: "",
      date: "",
      customer: "",
      shippingCompany: "",
      supplier: "",
      packageDescription: "",
      deliveryDate: "",
      purchasePrice: 0,
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
      inputRefs.current["tracking"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintPreAlert = (preAlertData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Pre-Alert Details",
        data: [preAlertData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          tracking: "Tracking",
          date: "Date",
          customer: "Customer",
          shippingCompany: "Shipping Company",
          supplier: "Supplier",
          packageDescription: "Package Description",
          deliveryDate: "Delivery Date",
          purchasePrice: "Purchase Price",
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
          title="Pre-Alert Details"
          subtitle="Pre-Alert Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pre-alert-details.pdf";
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
              toastRestore("Pre-alert record saved as draft successfully");
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
        title={isEdit ? "Editing Pre-Alert" : "Creating Pre-Alert"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="pre-alerts"
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
            {/* Basic Pre-Alert Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.tracking && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("tracking")}
                    id="tracking"
                    name="tracking"
                    value={formData.tracking}
                    onChange={handleChange}
                    onNext={() => focusNextInput("date")}
                    onCancel={() => setFormData({ ...formData, tracking: "" })}
                    labelText="Tracking"
                    tooltipText="Enter tracking number (e.g., TRK-2024-001)"
                    required
                    maxLength={20}
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
                    onNext={() => focusNextInput("customer")}
                    onCancel={() => setFormData({ ...formData, date: "" })}
                    labelText="Date"
                    tooltipText="Enter pre-alert date"
                    required
                    type="date"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.customer && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("customer")}
                    id="customer"
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    onNext={() => focusNextInput("shippingCompany")}
                    onCancel={() => setFormData({ ...formData, customer: "" })}
                    labelText="Customer"
                    tooltipText="Enter customer name"
                    required
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.shippingCompany && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("shippingCompany")(el)}
                    id="shippingCompany"
                    name="shippingCompany"
                    options={shippingCompanyOptions}
                    value={formData.shippingCompany}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        shippingCompany: value,
                      }));
                      focusNextInput("supplier");
                    }}
                    onEnterPress={() => {
                      if (formData.shippingCompany) {
                        focusNextInput("supplier");
                      }
                    }}
                    placeholder=" "
                    labelText="Shipping Company"
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

            {/* Pre-Alert Details */}
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
                      focusNextInput("packageDescription");
                    }}
                    onEnterPress={() => {
                      if (formData.supplier) {
                        focusNextInput("packageDescription");
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

              {permissionsFields.packageDescription && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("packageDescription")}
                    id="packageDescription"
                    name="packageDescription"
                    value={formData.packageDescription}
                    onChange={handleChange}
                    onNext={() => focusNextInput("deliveryDate")}
                    onCancel={() =>
                      setFormData({ ...formData, packageDescription: "" })
                    }
                    labelText="Package Description"
                    tooltipText="Enter package contents description"
                    required
                    maxLength={200}
                  />
                </div>
              )}

              {permissionsFields.deliveryDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("deliveryDate")}
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("purchasePrice")}
                    onCancel={() =>
                      setFormData({ ...formData, deliveryDate: "" })
                    }
                    labelText="Delivery Date"
                    tooltipText="Enter expected delivery date"
                    required
                    type="date"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.purchasePrice && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("purchasePrice")}
                    id="purchasePrice"
                    name="purchasePrice"
                    value={formData.purchasePrice.toString()}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setFormData((prev) => ({
                        ...prev,
                        purchasePrice: value,
                      }));
                    }}
                    onNext={() => focusNextInput("status")}
                    onCancel={() =>
                      setFormData({ ...formData, purchasePrice: 0 })
                    }
                    labelText="Purchase Price"
                    tooltipText="Enter purchase cost"
                    required
                    type="number"
                    step="0.01"
                    min={0}
                  />
                </div>
              )}
            </div>

            {/* Status and Additional Details */}
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
                      focusNextInput("isActive");
                    }}
                    onEnterPress={() => {
                      if (formData.status) {
                        focusNextInput("isActive");
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
