/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";

import PageLayout from "@/components/common/PageLayout";
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
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import EditableInput from "@/components/common/EditableInput";

type DeliveryOrderLogisticData = {
  sn: string;
  country: string;
  company: string;
  piNo: string;
  invoiceNo: string;
  supplierName: string;
  status: string;
  dateLoginId: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
  notes: string;
};

type Props = {
  isEdit?: boolean;
};

const initialData: DeliveryOrderLogisticData = {
  sn: "DOL001",
  country: "Saudi Arabia",
  company: "Al-Rashid Trading Company",
  piNo: "PI-2024-001",
  invoiceNo: "INV-2024-001",
  supplierName: "Global Supplies Ltd",
  status: "Active",
  dateLoginId: new Date().toISOString().split("T")[0],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
  notes: "",
};

export default function DeliveryOrderLogisticFormPage({
  isEdit = false,
}: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("deliveryOrderLogistic", "create");
  const canView = usePermission("deliveryOrderLogistic", "view");
  const canEdit = usePermission("deliveryOrderLogistic", "edit");
  const canDelete = usePermission("deliveryOrderLogistic", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof DeliveryOrderLogisticData>(
    "deliveryOrderLogistic",
    "create",
    ["country", "company", "notes"]
  );

  const canPdf: boolean = usePermission("deliveryOrderLogistic", "pdf");
  const canPrint: boolean = usePermission("deliveryOrderLogistic", "print");

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

  const supplierOptions = [
    "Global Supplies Ltd",
    "Emirates Trading Co",
    "Kuwait Supply Chain",
    "Qatar Logistics Hub",
    "Bahrain Express",
    "Oman Distribution",
    "Jordan Freight",
    "Lebanon Logistics",
    "Egypt Supply Co",
    "Iraq Trading House",
    "Turkish Suppliers",
    "Iran Global Trade",
    "Pakistani Export Co",
    "Indian Trading Partners",
    "Chinese Export Group",
    "Japanese Trading Solutions",
    "Korean Export Company",
    "Singapore Trading Partners",
    "Malaysian Export Co",
    "Thai Trading Solutions",
  ];

  const statusOptions = [
    "Active",
    "Pending",
    "In Transit",
    "Delivered",
    "Processing",
    "Cancelled",
    "On Hold",
    "Confirmed",
    "Shipped",
    "Completed",
  ];

  // Form state
  const [formData, setFormData] = useState<DeliveryOrderLogisticData>({
    sn: "",
    country: "",
    company: "",
    piNo: "",
    invoiceNo: "",
    supplierName: "",
    status: "Active",
    dateLoginId: new Date().toISOString().split("T")[0],
    isActive: true,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
    notes: "",
  });

  // Module form data states for the reusable components
  const [documentData, setDocumentData] = useState<any>({});
  const [supplierData, setSupplierData] = useState<any>({});
  const [certificateData, setCertificateData] = useState<any>({});
  const [goodsData, setGoodsData] = useState<any>({});
  const [packingData, setPackingData] = useState<any>({});
  const [shippingData, setShippingData] = useState<any>({});
  const [portData, setPortData] = useState<any>({});
  const [consigneeData, setConsigneeData] = useState<any>({});
  const [courierData, setCourierData] = useState<any>({});
  const [paymentData, setPaymentData] = useState<any>({});
  const [notesData, setNotesData] = useState<any>({});

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
          navigate("/delivery-order-logistic/create");
        } else {
          navigate("/delivery-order-logistic/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/delivery-order-logistic/view");
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
        dateLoginId:
          initialData.dateLoginId || new Date().toISOString().split("T")[0],
      });
    }
  }, [isEdit]);

  // Auto-generate serial number
  useEffect(() => {
    if (!isEdit && !formData.sn) {
      const generateSN = () => {
        const timestamp = Date.now().toString().slice(-6);
        return `DOL${timestamp}`;
      };
      setFormData((prev) => ({
        ...prev,
        sn: generateSN(),
      }));
    }
  }, [isEdit, formData.sn]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      mainForm: formData,
      document: documentData,
      supplier: supplierData,
      certificate: certificateData,
      goods: goodsData,
      packing: packingData,
      shipping: shippingData,
      port: portData,
      consignee: consigneeData,
      courier: courierData,
      payment: paymentData,
      notes: notesData,
    });
    // Normal submit logic here (API call)------------

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintDeliveryOrder(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Delivery order logistic record created successfully!");
      handleReset();
    } else {
      toastSuccess("Delivery order logistic record created successfully!");
      navigate("/delivery-order-logistic");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    const resetTimestamp = Date.now().toString().slice(-6);
    setFormData({
      sn: `DOL${resetTimestamp}`,
      country: "",
      company: "",
      piNo: "",
      invoiceNo: "",
      supplierName: "",
      status: "Active",
      dateLoginId: new Date().toISOString().split("T")[0],
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: "",
    });

    // Reset all module data
    setDocumentData({});
    setSupplierData({});
    setCertificateData({});
    setGoodsData({});
    setPackingData({});
    setShippingData({});
    setPortData({});
    setConsigneeData({});
    setCourierData({});
    setPaymentData({});
    setNotesData({});

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

  const handlePrintDeliveryOrder = (deliveryOrderData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Delivery Order Logistic Details",
        data: [deliveryOrderData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "Serial Number",
          country: "Country",
          company: "Company",
          piNo: "P.I. Number",
          invoiceNo: "Invoice Number",
          supplierName: "Supplier Name",
          status: "Status",
          dateLoginId: "Date Login ID",
          isDefault: "Default Delivery Order",
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
      console.log("deliveryOrderData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Delivery Order Logistic Details"
          subtitle="Delivery Order Logistic Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "delivery-order-logistic-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  return (
    <>
      <PageLayout
        title={
          isEdit
            ? "Editing Delivery Order Logistic"
            : "Creating Delivery Order Logistic"
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="delivery-order-logistic"
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
            {/* Delivery Order Logistic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.sn && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("sn")(el)}
                    id="sn"
                    name="sn"
                    options={[]}
                    value={formData.sn}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        sn: value,
                      }));
                      focusNextInput("country");
                    }}
                    onEnterPress={() => {
                      if (formData.sn) {
                        focusNextInput("country");
                      }
                    }}
                    placeholder=" "
                    labelText="Serial Number"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                    disabled={isEdit} // Disable in edit mode
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
                      focusNextInput("piNo");
                    }}
                    onEnterPress={() => {
                      if (formData.company) {
                        focusNextInput("piNo");
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

              {permissionsFields.piNo && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("piNo")(el)}
                    id="piNo"
                    name="piNo"
                    options={[]}
                    value={formData.piNo}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        piNo: value,
                      }));
                      focusNextInput("invoiceNo");
                    }}
                    onEnterPress={() => {
                      if (formData.piNo) {
                        focusNextInput("invoiceNo");
                      }
                    }}
                    placeholder=" "
                    labelText="P.I. Number"
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

              {permissionsFields.invoiceNo && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("invoiceNo")(el)}
                    id="invoiceNo"
                    name="invoiceNo"
                    options={[]}
                    value={formData.invoiceNo}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        invoiceNo: value,
                      }));
                      focusNextInput("supplierName");
                    }}
                    onEnterPress={() => {
                      if (formData.invoiceNo) {
                        focusNextInput("supplierName");
                      }
                    }}
                    placeholder=" "
                    labelText="Invoice Number"
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

              {permissionsFields.supplierName && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("supplierName")(el)}
                    id="supplierName"
                    name="supplierName"
                    options={supplierOptions}
                    value={formData.supplierName}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        supplierName: value,
                      }));
                      focusNextInput("status");
                    }}
                    onEnterPress={() => {
                      if (formData.supplierName) {
                        focusNextInput("status");
                      }
                    }}
                    placeholder=" "
                    labelText="Supplier Name"
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
                      focusNextInput("dateLoginId");
                    }}
                    onEnterPress={() => {
                      if (formData.status) {
                        focusNextInput("dateLoginId");
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

              {permissionsFields.dateLoginId && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("dateLoginId")(el)}
                    id="dateLoginId"
                    name="dateLoginId"
                    options={[]}
                    value={formData.dateLoginId}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        dateLoginId: value,
                      }));
                      focusNextInput("submitButton");
                    }}
                    onEnterPress={() => {
                      if (formData.dateLoginId) {
                        focusNextInput("submitButton");
                      }
                    }}
                    placeholder=" "
                    labelText="Date Login ID"
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

          {/* Reusable Form Generator modules */}
          <div className="">
            <ReusableFormGenerator
              moduleName="documents"
              formData={documentData}
              setFormData={setDocumentData}
              onFieldChange={(fieldName, value) => {
                console.log(`Document field ${fieldName} changed to:`, value);
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
              formData={supplierData}
              setFormData={setSupplierData}
              onFieldChange={(fieldName, value) => {
                console.log(`Supplier field ${fieldName} changed to:`, value);
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
              formData={certificateData}
              setFormData={setCertificateData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Certificate field ${fieldName} changed to:`,
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
              formData={goodsData}
              setFormData={setGoodsData}
              onFieldChange={(fieldName, value) => {
                console.log(`Goods field ${fieldName} changed to:`, value);
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
              moduleName="packing"
              formData={packingData}
              setFormData={setPackingData}
              onFieldChange={(fieldName, value) => {
                console.log(`Packing field ${fieldName} changed to:`, value);
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
              moduleName="shipping"
              formData={shippingData}
              setFormData={setShippingData}
              onFieldChange={(fieldName, value) => {
                console.log(`Shipping field ${fieldName} changed to:`, value);
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
              moduleName="portMaster"
              formData={portData}
              setFormData={setPortData}
              onFieldChange={(fieldName, value) => {
                console.log(`Port field ${fieldName} changed to:`, value);
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
              moduleName="consigneeMaster"
              formData={consigneeData}
              setFormData={setConsigneeData}
              onFieldChange={(fieldName, value) => {
                console.log(`Consignee field ${fieldName} changed to:`, value);
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
              moduleName="courier"
              formData={courierData}
              setFormData={setCourierData}
              onFieldChange={(fieldName, value) => {
                console.log(`Courier field ${fieldName} changed to:`, value);
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
              formData={paymentData}
              setFormData={setPaymentData}
              onFieldChange={(fieldName, value) => {
                console.log(`Payment field ${fieldName} changed to:`, value);
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
          </div>

          <div className="">
            <EditableInput
              ref={(el: any) => setRef("notes")(el)}
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={(value: string) => {
                setFormData((prev) => ({
                  ...prev,
                  notes: value,
                }));
                focusNextInput("submitButton");
              }}
              placeholder=" "
              labelText="Notes"
              className="relative"
            />
          </div>
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
