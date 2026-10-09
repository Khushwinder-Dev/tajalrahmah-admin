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
import { Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  dateLoginId: "2024-01-15",
  isActive: true,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-20"),
  isDeleted: false,
  notes: "Initial delivery order for office supplies and equipment.",
};

// Mock data for modules with dummy values
const mockDocumentData = {
  documentType: "Bill of Lading",
  documentNumber: "BOL-2024-001",
  issueDate: "2024-01-15",
  expiryDate: "2024-03-15",
  issuingAuthority: "Port Authority of Saudi Arabia",
  documentStatus: "Valid",
  remarks: "Original document received and verified",
};

const mockSupplierData = {
  supplierCode: "SUP-001",
  contactPerson: "Ahmed Al-Rashid",
  phoneNumber: "+966-11-123-4567",
  emailAddress: "ahmed@alrashid.com",
  address: "123 Industrial Area, Riyadh, Saudi Arabia",
  taxNumber: "300123456700003",
  bankDetails: "Al Rajhi Bank - Account: 123456789",
};

const mockCertificateData = {
  certificateType: "ISO 9001:2015",
  certificateNumber: "ISO-2024-001",
  issuingBody: "Saudi Standards Organization",
  issueDate: "2024-01-01",
  expiryDate: "2027-01-01",
  status: "Active",
  attachmentUrl: "/documents/certificates/iso-9001-2024.pdf",
};

const mockGoodsData = {
  itemCode: "ITEM-001",
  itemDescription: "Office Chairs - Executive Series",
  quantity: 50,
  unitOfMeasure: "Pieces",
  unitPrice: 250.0,
  totalValue: 12500.0,
  weight: 750.5,
  dimensions: "60cm x 60cm x 110cm",
  hsCode: "9401.30.00",
};

const mockPortData = {
  portOfLoading: "King Abdulaziz Port, Dammam",
  portOfDischarge: "Jebel Ali Port, Dubai",
  eta: "2024-01-20",
  etd: "2024-01-18",
  vesselName: "MSC Mediterranean",
  voyageNumber: "VOY-2024-001",
  containerNumber: "MSCU1234567",
};

const mockConsigneeData = {
  consigneeName: "Al-Zahrani Enterprises",
  contactPerson: "Omar Al-Zahrani",
  phoneNumber: "+971-4-567-8901",
  emailAddress: "omar@alzahrani.ae",
  deliveryAddress: "456 Business District, Dubai, UAE",
  specialInstructions: "Fragile items - Handle with care",
};

const mockCourierData = {
  courierService: "Aramex Express",
  trackingNumber: "ARX-2024-001234",
  pickupDate: "2024-01-22",
  expectedDelivery: "2024-01-25",
  serviceType: "Express Delivery",
  insuranceValue: 15000.0,
  courierContact: "+966-11-800-1234",
};

const mockPaymentData = {
  paymentTerms: "Letter of Credit",
  paymentMethod: "Bank Transfer",
  creditPeriod: 30,
  currency: "USD",
  exchangeRate: 3.75,
  bankName: "Saudi National Bank",
  accountNumber: "SA1234567890123456789",
  swiftCode: "SNBNSARI",
};

export default function DeliveryOrderLogisticEditPage({
  isEdit = true,
}: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
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
    "edit",
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

  // Form state - Initialize with existing data for edit mode
  const [formData, setFormData] = useState<DeliveryOrderLogisticData>({
    sn: initialData.sn,
    country: initialData.country,
    company: initialData.company,
    piNo: initialData.piNo,
    invoiceNo: initialData.invoiceNo,
    supplierName: initialData.supplierName,
    status: initialData.status,
    dateLoginId: initialData.dateLoginId,
    isActive: initialData.isActive,
    isDeleted: initialData.isDeleted,
    createdAt: initialData.createdAt,
    updatedAt: new Date(), // Update timestamp for edit
    notes: initialData.notes,
  });

  // Module form data states with dummy data
  const [documentData, setDocumentData] = useState<any>(mockDocumentData);
  const [supplierData, setSupplierData] = useState<any>(mockSupplierData);
  const [certificateData, setCertificateData] =
    useState<any>(mockCertificateData);
  const [goodsData, setGoodsData] = useState<any>(mockGoodsData);
  const [portData, setPortData] = useState<any>(mockPortData);
  const [consigneeData, setConsigneeData] = useState<any>(mockConsigneeData);
  const [courierData, setCourierData] = useState<any>(mockCourierData);
  const [paymentData, setPaymentData] = useState<any>(mockPaymentData);
  const [notesData, setNotesData] = useState<any>({});

  const [popoverOptions] = useState([
    {
      label: "Create New",
      icon: <Plus className="w-5 h-5 text-green-500" />,
      onClick: () => {
        navigate("/delivery-order-logistic/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate(`/delivery-order-logistic/${id}`);
      },
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
    if (id && isEdit) {
      // In a real application, you would fetch data by ID from API
      console.log(`Editing delivery order logistic`);
      // For now, we use the mock data already set in state
      setFormData((prevData) => ({
        ...prevData,
        updatedAt: new Date(), // Update the timestamp
      }));
    }
  }, [id, isEdit]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted for edit:", {
      id,
      mainForm: formData,
      document: documentData,
      supplier: supplierData,
      certificate: certificateData,
      goods: goodsData,
      port: portData,
      consignee: consigneeData,
      courier: courierData,
      payment: paymentData,
      notes: notesData,
    });

    // Update logic here (API call)------------
    // Update the updatedAt timestamp
    setFormData((prev) => ({
      ...prev,
      updatedAt: new Date(),
    }));

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintDeliveryOrder(formData);
    }

    // Navigation after successful update
    if (keepCreating) {
      toastSuccess("Delivery order logistic record updated successfully!");
      navigate("/delivery-order-logistic/create");
    } else {
      toastSuccess("Delivery order logistic record updated successfully!");
      navigate("/delivery-order-logistic");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function - Reset to original data for edit mode
  const handleReset = () => {
    setFormData({
      sn: initialData.sn,
      country: initialData.country,
      company: initialData.company,
      piNo: initialData.piNo,
      invoiceNo: initialData.invoiceNo,
      supplierName: initialData.supplierName,
      status: initialData.status,
      dateLoginId: initialData.dateLoginId,
      isActive: initialData.isActive,
      isDeleted: initialData.isDeleted,
      createdAt: initialData.createdAt,
      updatedAt: new Date(),
      notes: initialData.notes,
    });

    // Reset all module data to original mock data
    setDocumentData(mockDocumentData);
    setSupplierData(mockSupplierData);
    setCertificateData(mockCertificateData);
    setGoodsData(mockGoodsData);
    setPortData(mockPortData);
    setConsigneeData(mockConsigneeData);
    setCourierData(mockCourierData);
    setPaymentData(mockPaymentData);
    setNotesData({});

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["sn"]?.focus();
    }, 100);
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
      a.download = `delivery-order-logistic-${formData.sn}-details.pdf`;
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
        title={`Editing Delivery Order Logistic`}
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
        activePage="edit"
        additionalFooterButtons={
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
                className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
                onClick={() => formRef.current?.requestSubmit()}
              >
                Update
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
                        updatedAt: new Date(),
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
                    disabled={true} // Disable SN in edit mode
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
                        updatedAt: new Date(),
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
                        updatedAt: new Date(),
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
                        updatedAt: new Date(),
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
                        updatedAt: new Date(),
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
                        updatedAt: new Date(),
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
                        updatedAt: new Date(),
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
                        updatedAt: new Date(),
                      }));
                      focusNextInput("notes");
                    }}
                    onEnterPress={() => {
                      if (formData.dateLoginId) {
                        focusNextInput("notes");
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
                // Update main form timestamp when any module changes
                setFormData((prev) => ({ ...prev, updatedAt: new Date() }));
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null;
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
                setFormData((prev) => ({ ...prev, updatedAt: new Date() }));
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null;
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
                setFormData((prev) => ({ ...prev, updatedAt: new Date() }));
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null;
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
                setFormData((prev) => ({ ...prev, updatedAt: new Date() }));
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null;
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
                setFormData((prev) => ({ ...prev, updatedAt: new Date() }));
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null;
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
                setFormData((prev) => ({ ...prev, updatedAt: new Date() }));
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null;
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
                setFormData((prev) => ({ ...prev, updatedAt: new Date() }));
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null;
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
                setFormData((prev) => ({ ...prev, updatedAt: new Date() }));
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null;
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
                  updatedAt: new Date(),
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
        message="Are you sure you want to reset the form to original values? All changes will be lost."
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
