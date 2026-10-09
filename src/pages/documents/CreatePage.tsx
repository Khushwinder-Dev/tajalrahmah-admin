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
  documentNo: string;
  piNo: string;
  invoiceNo: string;
  orderBy: string;
  shipmentType: string;
  documentDate: string;
  piDate: string;
  invoiceDate: string;
  mobileNo: string;

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
  documentNo: "DOC-1001",
  piNo: "PI-2001",
  invoiceNo: "INV-3001",
  orderBy: "Rahim Traders",
  shipmentType: "Air",
  documentDate: "2025-01-05",
  piDate: "2025-01-03",
  invoiceDate: "2025-01-06",
  mobileNo: "01711111111",
  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function DocumentsCreatePage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("documents", "create");
  const canView = usePermission("documents", "view");
  const canEdit = usePermission("documents", "edit");
  const canDelete = usePermission("documents", "delete");
  const canPdf: boolean = usePermission("documents", "pdf");
  const canPrint: boolean = usePermission("documents", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFieldLevel = usePermission<keyof ProjectTypeDataType>(
    "documents",
    "create",
    [
      "documentNo",
      "piNo",
      "invoiceNo",
      "orderBy",
      "shipmentType",
      "documentDate",
      "piDate",
      "invoiceDate",
      "mobileNo",
      "isDefault",
      "isDraft",
    ]
  );

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    documentNo: "",
    piNo: "",
    invoiceNo: "",
    orderBy: "",
    shipmentType: "",
    documentDate: "",
    piDate: "",
    invoiceDate: "",
    mobileNo: "",
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
          navigate("/documents/create");
        } else {
          navigate("/documents/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/documents/view");
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
      toastSuccess("Document created successfully!");
      handleReset();
    } else {
      toastSuccess("Document created successfully!");
      navigate("/documents");
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
      documentNo: "",
      piNo: "",
      invoiceNo: "",
      orderBy: "",
      shipmentType: "",
      documentDate: "",
      piDate: "",
      invoiceDate: "",
      mobileNo: "",
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
      inputRefs.current["documentNo"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Document Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          documentNo: "Document No",
          piNo: "PI No",
          invoiceNo: "Invoice No",
          orderBy: "Order By",
          shipmentType: "Shipment Type",
          documentDate: "Document Date",
          piDate: "PI Date",
          invoiceDate: "Invoice Date",
          mobileNo: "Mobile No",
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
          title="Document Details"
          subtitle="Document Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document-details.pdf";
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
              toastRestore("Document saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  const orderByData = [
    {
      label: "Lamine Ywmal",
      phone: "01711111111",
    },
    {
      label: "Toni Rudigar",
      phone: "01822222222",
    },
    {
      label: "Goat Messi",
      phone: "01633333333",
    },
  ];

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Document" : "Creating Document"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="documents"
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
              {permissionsFieldLevel.documentNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("documentNo")}
                    type="text"
                    id="documentNo"
                    name="documentNo"
                    value={formData.documentNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("piNo")}
                    onCancel={() =>
                      setFormData({ ...formData, documentNo: "" })
                    }
                    labelText="Document No"
                    tooltipText="Enter document no"
                    required
                    readOnly
                  />
                </div>
              )}

              {/* Notes field - only show if user can create */}
              {permissionsFieldLevel.piNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("piNo")}
                    type="text"
                    id="piNo"
                    name="piNo"
                    value={formData.piNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("invoiceNo")}
                    onCancel={() => setFormData({ ...formData, piNo: "" })}
                    labelText="PI No"
                    tooltipText="Enter pi no"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.invoiceNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("invoiceNo")}
                    type="text"
                    id="invoiceNo"
                    name="invoiceNo"
                    value={formData.invoiceNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("orderBy")}
                    onCancel={() => setFormData({ ...formData, invoiceNo: "" })}
                    labelText="Invoice No"
                    tooltipText="Enter invoice no"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.orderBy && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("orderBy")(el)}
                    id="orderBy"
                    name="orderBy"
                    options={orderByData.map((item) => item.label)}
                    value={formData.orderBy}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const selectedOption = orderByData.find(
                        (item) => item.label === value
                      );
                      setFormData((prev) => ({
                        ...prev,
                        orderBy: value,
                        mobileNo: selectedOption?.phone || "",
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("shipmentType");
                    }}
                    onEnterPress={() => {
                      if (formData.orderBy) {
                        focusNextInput("shipmentType");
                      }
                    }}
                    placeholder=" "
                    labelText="Order By"
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

              {permissionsFieldLevel.shipmentType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("shipmentType")(el)}
                    id="shipmentType"
                    name="shipmentType"
                    options={["Air", "Sea", "Courier"]}
                    value={formData.shipmentType}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        shipmentType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("shipmentType");
                    }}
                    onEnterPress={() => {
                      if (formData.shipmentType) {
                        focusNextInput("shipmentType");
                      }
                    }}
                    placeholder=" "
                    labelText="Shipment Type"
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

              {permissionsFieldLevel.documentDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("documentDate")}
                    type="text"
                    id="documentDate"
                    name="documentDate"
                    value={formData.documentDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("piDate")}
                    onCancel={() =>
                      setFormData({ ...formData, documentDate: "" })
                    }
                    labelText="Document Date"
                    tooltipText="Enter document date"
                    required
                    readOnly
                  />
                </div>
              )}

              {permissionsFieldLevel.piDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("piDate")}
                    type="date"
                    id="piDate"
                    name="piDate"
                    value={formData.piDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("invoiceDate")}
                    onCancel={() => setFormData({ ...formData, piDate: "" })}
                    labelText="PI Date"
                    tooltipText="Enter pi date"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.invoiceDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("invoiceDate")}
                    type="date"
                    id="invoiceDate"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("mobileNo")}
                    onCancel={() =>
                      setFormData({ ...formData, invoiceDate: "" })
                    }
                    labelText="Invoice Date"
                    tooltipText="Enter invoice date"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.mobileNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("mobileNo")}
                    type="text"
                    id="mobileNo"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, mobileNo: "" })}
                    labelText="Mobile No"
                    tooltipText="Enter mobile no"
                    required
                    readOnly
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
