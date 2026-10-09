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

type ProjectTypeDataType = {
  vehicle: string;
  fuelTime: string;
  odometer: string;
  gallons: string;
  price: string;
  fuelType: string;
  vendor: string;
  reference: string;
  description: string;

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
  vehicle: "Toyota Corolla",
  fuelTime: "2025-08-16",
  odometer: "45210",
  gallons: "12.5",
  price: "48.75",
  fuelType: "Petrol",
  vendor: "Shell Dhaka",
  reference: "REF-1001",
  description: "Full tank refill",

  isDefault: false,
  isActive: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function FuelsEditPage({ isEdit = false }: Props) {
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

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("fuels", "create");
  const canView = usePermission("fuels", "view");
  const canEdit = usePermission("fuels", "edit");
  const canDelete = usePermission("fuels", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions

  const vehicle: boolean = usePermission("fuels", "create", "vehicle");
  const fuelTime: boolean = usePermission("fuels", "create", "fuelTime");
  const odometer: boolean = usePermission("fuels", "create", "odometer");
  const gallons: boolean = usePermission("fuels", "create", "gallons");
  const price: boolean = usePermission("fuels", "create", "price");
  const fuelType: boolean = usePermission("fuels", "create", "fuelType");
  const vendor: boolean = usePermission("fuels", "create", "vendor");
  const reference: boolean = usePermission("fuels", "create", "reference");
  const description: boolean = usePermission("fuels", "create", "description");

  const isDefault: boolean = usePermission("fuels", "create", "isDefault");
  const isActive: boolean = usePermission("fuels", "create", "isActive");
  const isDeleted: boolean = usePermission("fuels", "create", "isDeleted");

  const isDraft: boolean = usePermission("fuels", "create", "isDraft");
  const canPdf: boolean = usePermission("fuels", "pdf");
  const canPrint: boolean = usePermission("fuels", "print");

  console.log("vehicle", vehicle);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    vehicle: "",
    fuelTime: "",
    odometer: "",
    gallons: "",
    price: "",
    fuelType: "",
    vendor: "",
    reference: "",
    description: "",

    isDefault: isDefaultState === "Yes",
    isActive: false,
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
          navigate("/fuels/edit/undefined");
        } else {
          navigate("/fuels/create");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/fuels/view");
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
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsActiveState(initialData.isActive ? "Yes" : "No");
      setIsDeletedState(initialData.isDeleted ? "Delete" : "Restore");
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
      toastSuccess("Fuel created successfully!");
      handleReset();
    } else {
      toastSuccess("Fuel created successfully!");
      navigate("/fuels");
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
      vehicle: "",
      fuelTime: "",
      odometer: "",
      gallons: "",
      price: "",
      fuelType: "",
      vendor: "",
      reference: "",
      description: "",

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
      inputRefs.current["vehicle"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Fuel Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          vehicle: "Vehicle",
          fuelTime: "Fuel Time",
          odometer: "Odometer",
          gallons: "Gallons",
          price: "Price",
          fuelType: "Fuel Type",
          vendor: "Vendor",
          reference: "Reference",
          description: "Description",
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
          title="Fuel Details"
          subtitle="Fuel Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "fuel-details.pdf";
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
              toastRestore("Vehicle saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isActive, canCreate]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Fuel" : "Creating Fuel"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="fuels"
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
              {vehicle && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("vehicle")(el)}
                    id="vehicle"
                    name="vehicle"
                    options={[
                      "Toyota Corolla",
                      "Honda Civic",
                      "Ford Focus",
                      "Chevrolet Camaro",
                      "Dodge Charger",
                    ]}
                    value={formData.vehicle}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        vehicle: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("fuelTime");
                    }}
                    onEnterPress={() => {
                      if (formData.vehicle) {
                        focusNextInput("fuelTime");
                      }
                    }}
                    placeholder=" "
                    labelText="Vehicle"
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

              {fuelTime && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("fuelTime")}
                    type="date"
                    id="fuelTime"
                    name="fuelTime"
                    value={formData.fuelTime}
                    onChange={handleChange}
                    onNext={() => focusNextInput("odometer")}
                    onCancel={() => setFormData({ ...formData, fuelTime: "" })}
                    labelText="Fuel Time"
                    tooltipText="Enter fuel time"
                    required
                  />
                </div>
              )}

              {odometer && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("odometer")}
                    type="text"
                    id="odometer"
                    name="odometer"
                    value={formData.odometer}
                    onChange={handleChange}
                    onNext={() => focusNextInput("gallons")}
                    onCancel={() => setFormData({ ...formData, odometer: "" })}
                    labelText="Odometer"
                    tooltipText="Enter odometer"
                    required
                  />
                </div>
              )}

              {gallons && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("gallons")}
                    type="text"
                    id="gallons"
                    name="gallons"
                    value={formData.gallons}
                    onChange={handleChange}
                    onNext={() => focusNextInput("price")}
                    onCancel={() => setFormData({ ...formData, gallons: "" })}
                    labelText="Gallons"
                    tooltipText="Enter gallons"
                    required
                  />
                </div>
              )}

              {price && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("price")}
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    onNext={() => focusNextInput("fuelType")}
                    onCancel={() => setFormData({ ...formData, price: "" })}
                    labelText="Price"
                    tooltipText="Enter price"
                    required
                  />
                </div>
              )}

              {fuelType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("fuelType")(el)}
                    id="fuelType"
                    name="fuelType"
                    options={["Petrol", "Diesel", "CNG", "Diesel", "Diesel"]}
                    value={formData.fuelType}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        fuelType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("vendor");
                    }}
                    onEnterPress={() => {
                      if (formData.fuelType) {
                        focusNextInput("vendor");
                      }
                    }}
                    placeholder=" "
                    labelText="Fuel Type"
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

              {vendor && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("vendor")}
                    type="text"
                    id="vendor"
                    name="vendor"
                    value={formData.vendor}
                    onChange={handleChange}
                    onNext={() => focusNextInput("reference")}
                    onCancel={() => setFormData({ ...formData, vendor: "" })}
                    labelText="Vendor"
                    tooltipText="Enter vendor"
                    required
                  />
                </div>
              )}

              {reference && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("reference")}
                    type="text"
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, reference: "" })}
                    labelText="Reference"
                    tooltipText="Enter reference"
                    required
                  />
                </div>
              )}

              {description && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter description"
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

              {isActive && (
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

              {isDeleted && (
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
