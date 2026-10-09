/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/usePermissions";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import type { RootState } from "@/store";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type ProjectTypeDataType = {
  product: string;
  productVariant: string;
  quantity: string;
  unitOfMeasure: string;
  routing: string;
  bomType: string;
  manufacturingReadiness: string;
  consumption: string;
  description: string;

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
  product: "Laptop",
  productVariant: "16GB RAM / 512GB SSD",
  quantity: "50",
  unitOfMeasure: "pcs",
  routing: "Assembly Line 1",
  bomType: "Standard",
  manufacturingReadiness: "Ready",
  consumption: "Flexible",
  description: "High-performance business laptop",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function BillsOfMaterialsCreatePage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("billsOfMaterials", "create");
  const canView = usePermission("billsOfMaterials", "view");
  const canEdit = usePermission("billsOfMaterials", "edit");
  const canDelete = usePermission("billsOfMaterials", "delete");
  const canPdf: boolean = usePermission("billsOfMaterials", "pdf");
  const canPrint: boolean = usePermission("billsOfMaterials", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions

  const permissionsFieldLevel = usePermission<keyof ProjectTypeDataType>(
    "billsOfMaterials",
    "create",
    [
      "product",
      "productVariant",
      "quantity",
      "unitOfMeasure",
      "routing",
      "bomType",
      "manufacturingReadiness",
      "consumption",
      "description",
      "isDefault",
      "isDraft",
    ]
  );

  console.log("permissionsFieldLevel", permissionsFieldLevel);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    product: "",
    productVariant: "",
    quantity: "",
    unitOfMeasure: "",
    routing: "",
    bomType: "",
    manufacturingReadiness: "",
    consumption: "",
    description: "",

    isDefault: isDefaultState === "Yes",
    isDraft: false,
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
          navigate("/bills-of-materials/create");
        } else {
          navigate("/bills-of-materials/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/bills-of-materials/view");
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
      handlePrintLeaves(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Bills of materials created successfully!");
      handleReset();
    } else {
      toastSuccess("Bills of materials created successfully!");
      navigate("/bills-of-materials");
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
      product: "",
      productVariant: "",
      quantity: "",
      unitOfMeasure: "",
      routing: "",
      bomType: "",
      manufacturingReadiness: "",
      consumption: "",
      description: "",

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
      inputRefs.current["product"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Bills of Materials Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          product: "Product",
          productVariant: "Product Variant",
          quantity: "Quantity",
          unitOfMeasure: "Unit of Measure",
          routing: "Routing",
          bomType: "BOM Type",
          manufacturingReadiness: "Manufacturing Readiness",
          consumption: "Consumption",
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
          title="Bills of Materials Details"
          subtitle="Bills of Materials Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bills-of-materials-details.pdf";
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
              toastRestore("Bills of materials saved as draft successfully");
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
        title={
          isEdit ? "Editing Bills of Materials" : "Creating Bills of Materials"
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="bills-of-materials"
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
              {permissionsFieldLevel.product && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("product")(el)}
                    id="product"
                    name="product"
                    options={["laptop", "Mobile", "PC"]}
                    value={formData.product}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        product: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("productVariant");
                    }}
                    onEnterPress={() => {
                      if (formData.product) {
                        focusNextInput("productVariant");
                      }
                    }}
                    placeholder=" "
                    labelText="Product"
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

              {permissionsFieldLevel.productVariant && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("productVariant")(el)}
                    id="productVariant"
                    name="productVariant"
                    options={["Variant One", "Variant Two", "Variant Three"]}
                    value={formData.productVariant}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        productVariant: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("quantity");
                    }}
                    onEnterPress={() => {
                      if (formData.productVariant) {
                        focusNextInput("quantity");
                      }
                    }}
                    placeholder=" "
                    labelText="Product Variant"
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

              {permissionsFieldLevel.quantity && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("quantity")}
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    onNext={() => focusNextInput("unitOfMeasure")}
                    onCancel={() => setFormData({ ...formData, quantity: "" })}
                    labelText="Quantity"
                    tooltipText="Enter quantity"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.unitOfMeasure && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("unitOfMeasure")(el)}
                    id="unitOfMeasure"
                    name="unitOfMeasure"
                    options={["pcs", "kg", "lit"]}
                    value={formData.unitOfMeasure}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        unitOfMeasure: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("routing");
                    }}
                    onEnterPress={() => {
                      if (formData.unitOfMeasure) {
                        focusNextInput("routing");
                      }
                    }}
                    placeholder=" "
                    labelText="Unit of Measure"
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

              {permissionsFieldLevel.routing && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("routing")(el)}
                    id="routing"
                    name="routing"
                    options={["Routeing 1", "Routeing 2", "Routeing 3"]}
                    value={formData.routing}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        routing: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("bomType");
                    }}
                    onEnterPress={() => {
                      if (formData.routing) {
                        focusNextInput("bomType");
                      }
                    }}
                    placeholder=" "
                    labelText="Routing"
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

              {permissionsFieldLevel.bomType && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("bomType")(el)}
                    id="bomType"
                    name="bomType"
                    options={["Manufacture this product", "Kit"]}
                    value={formData.bomType}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        bomType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("manufacturingReadiness");
                    }}
                    onEnterPress={() => {
                      if (formData.bomType) {
                        focusNextInput("manufacturingReadiness");
                      }
                    }}
                    placeholder=" "
                    labelText="BOM Type"
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

              {permissionsFieldLevel.manufacturingReadiness && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("manufacturingReadiness")(el)}
                    id="manufacturingReadiness"
                    name="manufacturingReadiness"
                    options={[
                      "Ready",
                      "Not Ready",
                      "Partially Ready",
                      "In Progress",
                    ]}
                    value={formData.manufacturingReadiness}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        manufacturingReadiness: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("consumption");
                    }}
                    onEnterPress={() => {
                      if (formData.manufacturingReadiness) {
                        focusNextInput("consumption");
                      }
                    }}
                    placeholder=" "
                    labelText="Manufacturing Readiness"
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
              {permissionsFieldLevel.consumption && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("consumption")(el)}
                    id="consumption"
                    name="consumption"
                    options={["Consumption", "Not Consumption"]}
                    value={formData.consumption}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        consumption: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("description");
                    }}
                    onEnterPress={() => {
                      if (formData.consumption) {
                        focusNextInput("description");
                      }
                    }}
                    placeholder=" "
                    labelText="Consumption"
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
              {permissionsFieldLevel.description && (
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
              {permissionsFieldLevel.isDefault && (
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
              {permissionsFieldLevel.isDraft && (
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
