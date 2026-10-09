/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import CheckCard from "@/components/CheckCard";
import BillPaymentTable from "@/components/BillPaymentTable";
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

type CheckData = {
  vendorName: string;
  date: string;
  bankAccount: string;
  amount: number;
  checkNumber: string;
  status: "Pending" | "Issued" | "Cleared" | "Void";
  memo: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: CheckData = {
  vendorName: "ABC Supplies Co.",
  date: "2024-01-15",
  bankAccount: "Chase Bank - 1234",
  amount: 1250.0,
  checkNumber: "CHK-001",
  status: "Pending",
  memo: "",
  isActive: true,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function ChecksEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("checks", "create");
  const canView = usePermission("checks", "view");
  const canEdit = usePermission("checks", "edit");
  const canDelete = usePermission("checks", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof CheckData>("checks", "edit", [
    "vendorName",
    "date",
    "bankAccount",
    "amount",
    "checkNumber",
    "status",
    "memo",
  ]);

  const canPdf: boolean = usePermission("checks", "pdf");
  const canPrint: boolean = usePermission("checks", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const vendorOptions = [
    "ABC Supplies Co.",
    "XYZ Corporation",
    "Tech Solutions Inc.",
    "Global Services Ltd.",
    "Premium Partners",
    "Innovation Labs",
    "Elite Enterprises",
    "Strategic Solutions",
    "NextGen Systems",
    "Peak Performance",
    "Summit Solutions",
    "Apex Industries",
    "Dynamic Systems",
    "Future Tech",
    "Core Solutions",
    "Prime Services",
    "Advanced Corp",
    "Smart Solutions",
    "Elite Corp",
    "Global Tech",
  ];

  const bankAccountOptions = [
    "Chase Bank - 1234",
    "Wells Fargo - 5678",
    "Bank of America - 9012",
    "Citibank - 3456",
    "PNC Bank - 7890",
    "US Bank - 2345",
    "TD Bank - 6789",
    "Capital One - 0123",
    "Regions Bank - 4567",
    "Fifth Third - 8901",
    "KeyBank - 2345",
    "BB&T - 6789",
  ];

  const statusOptions = ["Pending", "Issued", "Cleared", "Void"];

  // Form state
  const [formData, setFormData] = useState<CheckData>({
    vendorName: "",
    date: "",
    bankAccount: "",
    amount: 0,
    checkNumber: "",
    status: "Pending",
    memo: "",
    isActive: true,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
  });

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
  }, [isEdit, initialData]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Generate next check number
  const generateCheckNumber = () => {
    const timestamp = Date.now().toString().slice(-4);
    return `CHK-${timestamp}`;
  };

  // Auto-generate check number when vendor is selected
  const handleVendorChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      vendorName: value,
      checkNumber: prev.checkNumber || generateCheckNumber(),
    }));
    focusNextInput("date");
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
      handlePrintChecks(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("vendorName");
    } else {
      navigate("/checks");
    }
    toastSuccess("Check record edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      vendorName: "",
      date: "",
      bankAccount: "",
      amount: 0,
      checkNumber: "",
      status: "Pending",
      memo: "",
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
      inputRefs.current["vendorName"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintChecks = (checkData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Check Details",
        data: [checkData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          vendorName: "Vendor Name",
          date: "Date",
          bankAccount: "Bank Account",
          amount: "Amount",
          checkNumber: "Check Number",
          status: "Status",
          memo: "Memo",
          isActive: "Active Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
      console.log("checkData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Check Details"
          subtitle="Check Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "check-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const [popoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/checks/create");
        } else {
          navigate("/checks/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/checks/view");
      },
      // Only show if user has permission
      show: canView,
    },
  ]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Check" : "Creating Check"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="checks"
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
        <div dir={isRTL ? "rtl" : "ltr"} className="space-y-8">
          {/* Main form and check preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <form
                ref={formRef}
                key={formKey}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-8">
                  Check Information
                </h3>

                {/* Basic Check Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {permissionsFields.vendorName && (
                    <div className="space-y-2">
                      <Autocomplete
                        ref={(el: any) => setRef("vendorName")(el)}
                        id="vendorName"
                        name="vendorName"
                        options={vendorOptions}
                        value={formData.vendorName}
                        labelClassName="rounded-lg"
                        onValueChange={handleVendorChange}
                        onEnterPress={() => {
                          if (formData.vendorName) {
                            focusNextInput("date");
                          }
                        }}
                        placeholder=" "
                        labelText="Vendor Name *"
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
                        onNext={() => focusNextInput("bankAccount")}
                        onCancel={() => setFormData({ ...formData, date: "" })}
                        labelText="Date *"
                        tooltipText="Enter check date"
                        required
                        type="date"
                      />
                    </div>
                  )}

                  {permissionsFields.bankAccount && (
                    <div className="space-y-2">
                      <Autocomplete
                        ref={(el: any) => setRef("bankAccount")(el)}
                        id="bankAccount"
                        name="bankAccount"
                        options={bankAccountOptions}
                        value={formData.bankAccount}
                        labelClassName="rounded-lg"
                        onValueChange={(value: string) => {
                          setFormData((prev) => ({
                            ...prev,
                            bankAccount: value,
                          }));
                          focusNextInput("amount");
                        }}
                        onEnterPress={() => {
                          if (formData.bankAccount) {
                            focusNextInput("amount");
                          }
                        }}
                        placeholder=" "
                        labelText="Bank Account *"
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

                  {permissionsFields.amount && (
                    <div className="space-y-2">
                      <EditableInput
                        setRef={setRef("amount")}
                        id="amount"
                        name="amount"
                        value={formData.amount?.toString() || ""}
                        onChange={handleChange}
                        onNext={() => focusNextInput("checkNumber")}
                        onCancel={() => setFormData({ ...formData, amount: 0 })}
                        labelText="Amount *"
                        tooltipText="Enter check amount"
                        required
                        type="number"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  )}

                  {permissionsFields.checkNumber && (
                    <div className="space-y-2">
                      <EditableInput
                        setRef={setRef("checkNumber")}
                        id="checkNumber"
                        name="checkNumber"
                        value={formData.checkNumber}
                        onChange={handleChange}
                        onNext={() => focusNextInput("status")}
                        onCancel={() =>
                          setFormData({ ...formData, checkNumber: "" })
                        }
                        labelText="Check Number *"
                        tooltipText="Enter check number"
                        required
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
                        onValueChange={(
                          value: "Pending" | "Issued" | "Cleared" | "Void"
                        ) => {
                          setFormData((prev) => ({
                            ...prev,
                            status: value,
                          }));
                          focusNextInput("memo");
                        }}
                        onEnterPress={() => {
                          if (formData.status) {
                            focusNextInput("memo");
                          }
                        }}
                        placeholder=" "
                        labelText="Status *"
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

                {/* Memo field */}
                {permissionsFields.memo && (
                  <div className="space-y-2">
                    <EditableInput
                      setRef={setRef("memo")}
                      id="memo"
                      name="memo"
                      value={formData.memo}
                      onChange={handleChange}
                      onNext={() => focusNextInput("submitButton")}
                      onCancel={() => setFormData({ ...formData, memo: "" })}
                      labelText="Memo"
                      tooltipText="Enter memo (optional)"
                    />
                  </div>
                )}
              </form>
            </div>

            {/* Check Card Preview */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Check Preview
              </h3>
              <CheckCard
                vendorName={formData.vendorName}
                date={formData.date}
                bankAccount={formData.bankAccount}
                amount={formData.amount}
                checkNumber={formData.checkNumber}
                memo={formData.memo}
                className="w-full"
              />
            </div>
          </div>

          {/* Bill Payment Information Table */}
          <div className="space-y-6">
            <BillPaymentTable
              onPaymentSelect={(payments) => {
                // Calculate total amount from selected payments
                const totalAmount = payments.reduce(
                  (sum, payment) => sum + payment.amount,
                  0
                );
                setFormData((prev) => ({
                  ...prev,
                  amount: totalAmount,
                }));
              }}
              className="w-full"
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
