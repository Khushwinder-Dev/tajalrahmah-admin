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

type WorkOrdersData = {
  workOrder: string;
  startDate: string;
  workCenter: string;
  manufacturingOrder: string;
  productQuantity: number;
  unit: string;
  status: string;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: WorkOrdersData = {
  workOrder: "WO-001",
  startDate: "2024-01-15",
  workCenter: "Production Line A",
  manufacturingOrder: "MO-2024-001",
  productQuantity: 100,
  unit: "Pieces",
  status: "In Progress",
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

export default function WorkOrdersEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<WorkOrdersData>({
    workOrder: "",
    startDate: "",
    workCenter: "",
    manufacturingOrder: "",
    productQuantity: 0,
    unit: "",
    status: "Pending",
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
  });

  // Permission checks
  const canCreate = usePermission("workOrders", "create");
  const canView = usePermission("workOrders", "view");
  const canEdit = usePermission("workOrders", "edit");
  const canDelete = usePermission("workOrders", "delete");

  // Field-level permissions
  const permissionsFields = usePermission<keyof WorkOrdersData>(
    "workOrders",
    "edit",
    [
      "workOrder",
      "startDate",
      "workCenter",
      "manufacturingOrder",
      "productQuantity",
      "unit",
      "status",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("workOrders", "pdf");
  const canPrint: boolean = usePermission("workOrders", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

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
    }
  }, [isEdit]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value) || 0
          : value,
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
      handlePrintWorkOrder(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("workOrder");
    } else {
      navigate("/work-orders");
    }
    toastSuccess("Work order edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      workOrder: "",
      startDate: "",
      workCenter: "",
      manufacturingOrder: "",
      productQuantity: 0,
      unit: "",
      status: "Pending",
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["workOrder"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintWorkOrder = (workOrderData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Work Order Details",
        data: [workOrderData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          workOrder: "Work Order",
          startDate: "Start Date",
          workCenter: "Work Center",
          manufacturingOrder: "Manufacturing Order",
          productQuantity: "Product Quantity",
          unit: "Unit",
          status: "Status",
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
      console.log("workOrderData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Work Order Details"
          subtitle="Work Order Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "work-order-details.pdf";
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
          navigate("/work-orders/create");
        } else {
          navigate("/work-orders/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/work-orders/view");
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
              toastRestore("Work order record saved as draft successfully");
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
        title={isEdit ? "Editing Work Order" : "Creating Work Order"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="work-orders"
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
            {/* Row 1: Work Order, Start Date, Work Center, Manufacturing Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.workOrder && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("workOrder")}
                    id="workOrder"
                    name="workOrder"
                    value={formData.workOrder}
                    onChange={handleChange}
                    onNext={() => focusNextInput("startDate")}
                    onCancel={() => setFormData({ ...formData, workOrder: "" })}
                    labelText="Work Order"
                    tooltipText="Enter work order number (e.g., WO-001)"
                    required
                    maxLength={50}
                  />
                </div>
              )}

              {permissionsFields.startDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("startDate")}
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("workCenter")}
                    onCancel={() => setFormData({ ...formData, startDate: "" })}
                    labelText="Start Date"
                    tooltipText="Select work order start date"
                    required
                  />
                </div>
              )}

              {permissionsFields.workCenter && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("workCenter")}
                    id="workCenter"
                    name="workCenter"
                    value={formData.workCenter}
                    onChange={handleChange}
                    onNext={() => focusNextInput("manufacturingOrder")}
                    onCancel={() =>
                      setFormData({ ...formData, workCenter: "" })
                    }
                    labelText="Work Center"
                    tooltipText="Enter work center (e.g., Production Line A)"
                    required
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.manufacturingOrder && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("manufacturingOrder")}
                    id="manufacturingOrder"
                    name="manufacturingOrder"
                    value={formData.manufacturingOrder}
                    onChange={handleChange}
                    onNext={() => focusNextInput("productQuantity")}
                    onCancel={() =>
                      setFormData({ ...formData, manufacturingOrder: "" })
                    }
                    labelText="Manufacturing Order"
                    tooltipText="Enter manufacturing order number (e.g., MO-2024-001)"
                    required
                    maxLength={50}
                  />
                </div>
              )}
            </div>

            {/* Row 2: Product Quantity, Unit, Status, Draft */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.productQuantity && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("productQuantity")}
                    id="productQuantity"
                    name="productQuantity"
                    type="number"
                    value={formData.productQuantity.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("unit")}
                    onCancel={() =>
                      setFormData({ ...formData, productQuantity: 0 })
                    }
                    labelText="Product Quantity"
                    tooltipText="Enter product quantity"
                    required
                    min={1}
                    step={1}
                  />
                </div>
              )}

              {permissionsFields.unit && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("unit")}
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() => setFormData({ ...formData, unit: "" })}
                    labelText="Unit"
                    tooltipText="Enter unit of measurement (e.g., Pieces, Units, Boxes)"
                    required
                    maxLength={50}
                  />
                </div>
              )}

              {permissionsFields.status && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    options={["Pending", "In Progress", "Completed", "On Hold"]}
                    value={formData.status}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        status: value,
                      }));
                      focusNextInput("isDraft");
                    }}
                    onEnterPress={() => {
                      if (formData.status) {
                        focusNextInput("isDraft");
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

              {permissionsFields.isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={formData.isDraft ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: isYes,
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
