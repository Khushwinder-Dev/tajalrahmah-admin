/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";

import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import ReusableFormGenerator from "@/components/Logistic/ReusableModuleGenerator";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";

type PurchaseOrderLogisticData = {
  country: string;
  company: string;
  note: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: PurchaseOrderLogisticData = {
  country: "Saudi Arabia",
  company: "Al-Rashid Trading Company",
  note: "",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

export default function TransitOrderFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("purchaseOrderLogistic", "create");
  const canView = usePermission("purchaseOrderLogistic", "view");
  const canEdit = usePermission("purchaseOrderLogistic", "edit");
  const canDelete = usePermission("purchaseOrderLogistic", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof PurchaseOrderLogisticData>(
    "purchaseOrderLogistic",
    "create",
    ["country", "company", "note"]
  );

  const canPdf: boolean = usePermission("purchaseOrderLogistic", "pdf");
  const canPrint: boolean = usePermission("purchaseOrderLogistic", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

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

  // Form state
  const [formData, setFormData] = useState<PurchaseOrderLogisticData>({
    country: "",
    company: "",
    note: "",
    isActive: true,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
  });

  // Transit Order form data for the reusable component
  const [transitOrderData, setTransitOrderData] = useState<any>({});

  const [popoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" /> // Green for Plus
      ) : (
        <Edit className="w-5 h-5 text-blue-500" /> // Blue for Edit
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/purchase-order-logistic/create");
        } else {
          navigate("/purchase-order-logistic/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/purchase-order-logistic/view");
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
    }
  }, [isEdit]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Normal submit logic here (API call)------------

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintTransitOrder(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Transit order record created successfully!");
      handleReset();
    } else {
      toastSuccess("Transit order record created successfully!");
      navigate("/purchase-order-logistic");
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
      country: "",
      company: "",
      note: "",
      isActive: true,
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
      inputRefs.current["country"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintTransitOrder = (transitOrderData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Transit Order Details",
        data: [transitOrderData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          country: "Country",
          company: "Company",
          note: "Note",
          piNo: "P.I.No",
          invoiceNo: "Invoice No",
          supplierName: "Supplier Name",
          status: "Status",
          date: "Date",
          loginId: "Login ID",
          isDefault: "Default Transit Order",
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
      console.log("transitOrderData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Transit Order Details"
          subtitle="Transit Order Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transit-order-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  // Create minimize handler
  const handleMinimize = useCallback(() => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="purchase-order-logistic-form-module"
        moduleName={
          isEdit
            ? "Edit Purchase Order Logistic"
            : "Adding Purchase Order Logistic"
        }
        moduleRoute={
          isEdit
            ? `/purchase-order-logistic/edit/${formData.country || "new"}`
            : "/purchase-order-logistic/create"
        }
        onMinimize={handleMinimize}
        title={
          isEdit
            ? "Edit Purchase Order Logistic"
            : "Add Purchase Order Logistic"
        }
        listPath="purchase-order-logistic"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        module="purchaseOrderLogistic"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90! bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                {labels.reset}
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={() => formRef.current?.requestSubmit()}
              >
                {labels.submit}
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
            {/* Purchase Order Logistic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 relative">
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
                      focusNextInput("company");
                    }}
                    onEnterPress={() => {
                      if (formData.country) {
                        focusNextInput("company");
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

              {permissionsFields.company && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("company")(el)}
                    id="company"
                    name="company"
                    options={companyOptions}
                    value={formData.company}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        company: value,
                      }));
                      focusNextInput("note");
                    }}
                    onEnterPress={() => {
                      if (formData.company) {
                        focusNextInput("note");
                      }
                    }}
                    placeholder=" "
                    labelText="Company"
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

          {/* Reusable Form Generator using transitOrder module */}
          <div className="">
            <ReusableFormGenerator
              moduleName="documents"
              formData={transitOrderData}
              setFormData={setTransitOrderData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Transit Order field ${fieldName} changed to:`,
                  value
                );
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="supplier"
              formData={transitOrderData}
              setFormData={setTransitOrderData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Transit Order field ${fieldName} changed to:`,
                  value
                );
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="certificates"
              formData={transitOrderData}
              setFormData={setTransitOrderData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Transit Order field ${fieldName} changed to:`,
                  value
                );
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="goods"
              formData={transitOrderData}
              setFormData={setTransitOrderData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Transit Order field ${fieldName} changed to:`,
                  value
                );
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="payment"
              formData={transitOrderData}
              setFormData={setTransitOrderData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Transit Order field ${fieldName} changed to:`,
                  value
                );
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
          </div>

          {/* note */}
          {/* Note Field */}
          {permissionsFields.note && (
            <div className="grid grid-cols-1 gap-4 my-8">
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("note")}
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }));
                  }}
                  onNext={() => focusNextInput("submitButton")}
                  onCancel={() => setFormData({ ...formData, note: "" })}
                  labelText="Note"
                  tooltipText="Enter any additional notes"
                />
              </div>
            </div>
          )}
        </div>
      </MinimizablePageLayout>

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
