/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { Check, Eye, Plus, MoreVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCountriesPermissions, usePermission } from "@/hooks/usePermissions";
// import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";

type PaymentData = {
  code: string;
  invoiceType: string;
  currency: string;
  paymentTerms: string;
  dueDays: number;
  totalAmount: number;
  containerAmount: number;
  typeOfDeposit: string;
  depositAmount: number;
  depositDate: string;
  exchangeRate: number;
  localAmount: number;
  status: "active" | "inactive" | "draft" | "deleted";
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type PaymentModuleData = {
  formData: PaymentData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: PaymentData = {
  code: "PAY-001",
  invoiceType: "Commercial Invoice",
  currency: "USD",
  paymentTerms: "Net 30",
  dueDays: 30,
  totalAmount: 50000,
  containerAmount: 45000,
  typeOfDeposit: "Bank Transfer",
  depositAmount: 10000,
  depositDate: "2024-01-15",
  exchangeRate: 1.0,
  localAmount: 50000,
  status: "active",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function PaymentEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  // const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `payment-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<PaymentModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Permission checks
  const { canCreate, canView } = useCountriesPermissions();

  // Field-level permissions
  const codePerm: boolean = usePermission("payment", "edit", "code");
  const invoiceTypePerm: boolean = usePermission(
    "payment",
    "edit",
    "invoiceType"
  );
  const currencyPerm: boolean = usePermission("payment", "edit", "currency");
  const paymentTermsPerm: boolean = usePermission(
    "payment",
    "edit",
    "paymentTerms"
  );
  const dueDaysPerm: boolean = usePermission("payment", "edit", "dueDays");
  const totalAmountPerm: boolean = usePermission(
    "payment",
    "edit",
    "totalAmount"
  );
  const containerAmountPerm: boolean = usePermission(
    "payment",
    "edit",
    "containerAmount"
  );
  const typeOfDepositPerm: boolean = usePermission(
    "payment",
    "edit",
    "typeOfDeposit"
  );
  const depositAmountPerm: boolean = usePermission(
    "payment",
    "edit",
    "depositAmount"
  );
  const depositDatePerm: boolean = usePermission(
    "payment",
    "edit",
    "depositDate"
  );
  const exchangeRatePerm: boolean = usePermission(
    "payment",
    "edit",
    "exchangeRate"
  );
  const localAmountPerm: boolean = usePermission(
    "payment",
    "edit",
    "localAmount"
  );
  const statusPerm: boolean = usePermission("payment", "edit", "status");
  const isDefaultPerm: boolean = usePermission("payment", "edit", "isDefault");
  const canPdf: boolean = usePermission("payment", "pdf");
  const canPrint: boolean = usePermission("payment", "print");

  // Form state
  const [formData, setFormData] = useState<PaymentData>({
    code: "",
    invoiceType: "",
    currency: "",
    paymentTerms: "",
    dueDays: 0,
    totalAmount: 0,
    containerAmount: 0,
    typeOfDeposit: "",
    depositAmount: 0,
    depositDate: "",
    exchangeRate: 0,
    localAmount: 0,
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Update translation data when invoiceType changes
  useEffect(() => {
    setTranslations([
      {
        id: 1,
        english: formData.invoiceType || "",
        arabic: "",
        bangla: "",
      },
    ]);
  }, [formData.invoiceType]);

  // Check for restore flag from taskbar
  useEffect(() => {
    const shouldRestore = localStorage.getItem(`restore-${moduleId}`);
    if (shouldRestore === "true") {
      setShouldRestoreFromMinimized(true);
      localStorage.removeItem(`restore-${moduleId}`);
    }
  }, [moduleId]);

  // Restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      shouldRestoreFromMinimized ||
      (hasMinimizedData &&
        moduleData?.formData &&
        !isRestoredFromMinimized &&
        !formData.invoiceType);

    if (hasMinimizedData && moduleData?.formData && shouldAutoRestore) {
      setFormData(moduleData.formData);

      // Restore UI states based on form data
      setIsDefaultState(moduleData.formData.isDefault ? "Yes" : "No");

      setIsRestoredFromMinimized(true);
      setShouldRestoreFromMinimized(false);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition(moduleId);
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    shouldRestoreFromMinimized,
    formData.invoiceType,
    moduleId,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available
  useEffect(() => {
    if (
      isEdit &&
      initialData &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized, moduleId]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    };
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintReport(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Payment updated successfully!");
      handleReset();
    } else {
      toastSuccess("Payment updated successfully!");
      navigate("/payment");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      code: "",
      invoiceType: "",
      currency: "",
      paymentTerms: "",
      dueDays: 0,
      totalAmount: 0,
      containerAmount: 0,
      typeOfDeposit: "",
      depositAmount: 0,
      depositDate: "",
      exchangeRate: 0,
      localAmount: 0,
      status: "active",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");

    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Reset form data using the custom hook
    if (hasMinimizedData) {
      try {
        await resetModuleData(moduleId);
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintReport = (reportData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Payment Details",
        data: [reportData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          invoiceType: "Invoice Type",
          currency: "Currency",
          paymentTerms: "Payment Terms",
          dueDays: "Due Days",
          totalAmount: "Total Amount",
          containerAmount: "Container Amount",
          typeOfDeposit: "Type of Deposit",
          depositAmount: "Deposit Amount",
          depositDate: "Deposit Date",
          exchangeRate: "Exchange Rate",
          localAmount: "Local Amount",
          status: "Status",
          isDefault: "Default",
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
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
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Payment Details"
          subtitle="Payment Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payment-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: "Create",
      icon: <Plus className="w-5 h-5 text-green-500" />,
      onClick: () => {
        navigate("/payment/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/payment/view");
      },
      show: canView,
    },
  ]);

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

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
              toastRestore("Payment saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): PaymentModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={`Edit Payment`}
        moduleRoute={`/payment/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Payment"
        listPath="payment"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="edit"
        module="payment"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
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
            className="space-y-6"
          >
            {/* Fields: Code, Invoice Type, Currency, Payment Terms, Due Days, Total Amount, Container Amount, Type of Deposit, Deposit Amount, Deposit Date, Exchange Rate, Local Amount */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {codePerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("code")}
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      onNext={() => focusNextInput("invoiceType")}
                      onCancel={() => setFormData({ ...formData, code: "" })}
                      labelText="Code"
                      tooltipText="Enter the payment code"
                      required
                    />
                    <MoreVertical
                      className="h-4 w-4 cursor-pointer absolute right-8 top-6 transform -translate-y-1/2"
                      onClick={() => setIsOptionModalOpen(true)}
                    />
                  </div>
                </div>
              )}

              {invoiceTypePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("invoiceType")}
                    id="invoiceType"
                    name="invoiceType"
                    value={formData.invoiceType}
                    onChange={handleChange}
                    onNext={() => focusNextInput("currency")}
                    onCancel={() =>
                      setFormData({ ...formData, invoiceType: "" })
                    }
                    labelText="Invoice Type"
                    tooltipText="Enter the invoice type"
                    required
                  />
                </div>
              )}

              {currencyPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("currency")}
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    onNext={() => focusNextInput("paymentTerms")}
                    onCancel={() => setFormData({ ...formData, currency: "" })}
                    labelText="Currency"
                    tooltipText="Enter the currency"
                    required
                  />
                </div>
              )}

              {paymentTermsPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("paymentTerms")}
                    id="paymentTerms"
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleChange}
                    onNext={() => focusNextInput("dueDays")}
                    onCancel={() =>
                      setFormData({ ...formData, paymentTerms: "" })
                    }
                    labelText="Payment Terms"
                    tooltipText="Enter the payment terms"
                    required
                  />
                </div>
              )}

              {dueDaysPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("dueDays")}
                    id="dueDays"
                    name="dueDays"
                    type="number"
                    value={formData.dueDays.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("totalAmount")}
                    onCancel={() => setFormData({ ...formData, dueDays: 0 })}
                    labelText="Due Days"
                    tooltipText="Enter the due days"
                    required
                  />
                </div>
              )}

              {totalAmountPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("totalAmount")}
                    id="totalAmount"
                    name="totalAmount"
                    type="number"
                    value={formData.totalAmount.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("containerAmount")}
                    onCancel={() =>
                      setFormData({ ...formData, totalAmount: 0 })
                    }
                    labelText="Total Amount"
                    tooltipText="Enter the total amount"
                    required
                  />
                </div>
              )}

              {containerAmountPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("containerAmount")}
                    id="containerAmount"
                    name="containerAmount"
                    type="number"
                    value={formData.containerAmount.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("typeOfDeposit")}
                    onCancel={() =>
                      setFormData({ ...formData, containerAmount: 0 })
                    }
                    labelText="Container Amount"
                    tooltipText="Enter the container amount"
                    required
                  />
                </div>
              )}

              {typeOfDepositPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("typeOfDeposit")}
                    id="typeOfDeposit"
                    name="typeOfDeposit"
                    value={formData.typeOfDeposit}
                    onChange={handleChange}
                    onNext={() => focusNextInput("depositAmount")}
                    onCancel={() =>
                      setFormData({ ...formData, typeOfDeposit: "" })
                    }
                    labelText="Type of Deposit"
                    tooltipText="Enter the type of deposit"
                    required
                  />
                </div>
              )}

              {depositAmountPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("depositAmount")}
                    id="depositAmount"
                    name="depositAmount"
                    type="number"
                    value={formData.depositAmount.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("depositDate")}
                    onCancel={() =>
                      setFormData({ ...formData, depositAmount: 0 })
                    }
                    labelText="Deposit Amount"
                    tooltipText="Enter the deposit amount"
                    required
                  />
                </div>
              )}

              {depositDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("depositDate")}
                    id="depositDate"
                    name="depositDate"
                    type="date"
                    value={formData.depositDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("exchangeRate")}
                    onCancel={() =>
                      setFormData({ ...formData, depositDate: "" })
                    }
                    labelText="Deposit Date"
                    tooltipText="Enter the deposit date"
                    required
                  />
                </div>
              )}

              {exchangeRatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("exchangeRate")}
                    id="exchangeRate"
                    name="exchangeRate"
                    type="number"
                    value={formData.exchangeRate.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("localAmount")}
                    onCancel={() =>
                      setFormData({ ...formData, exchangeRate: 0 })
                    }
                    labelText="Exchange Rate"
                    tooltipText="Enter the exchange rate"
                    required
                  />
                </div>
              )}

              {localAmountPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("localAmount")}
                    id="localAmount"
                    name="localAmount"
                    type="number"
                    value={formData.localAmount.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() =>
                      setFormData({ ...formData, localAmount: 0 })
                    }
                    labelText="Local Amount"
                    tooltipText="Enter the local amount"
                    required
                  />
                </div>
              )}

              {/* Status field - only show if user can edit */}
              {statusPerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    labelText="Status"
                    multiSelect={false} // Single select mode
                    options={[
                      {
                        label: "Active",
                        value: "active",
                        date: "Set active area",
                      },
                      {
                        label: "Inactive",
                        value: "InActive",
                        date: "Set inactive area",
                      },
                      {
                        label: "Draft",
                        value: "Draft",
                        date: "Set draft area",
                      },
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set delete area",
                      },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      console.log("switch value", stringValue);
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as
                          | "active"
                          | "inactive"
                          | "draft"
                          | "deleted",
                        isDeleted: stringValue === "deleted",
                        isDraft: stringValue === "Draft",
                        isActive: stringValue === "Active",
                      }));

                      // Update your form data
                      setFormData((prev) => ({
                        ...prev,
                        isDeleted: stringValue === "Delete",
                        isDraft: stringValue === "Draft",
                        isActive: stringValue === "Active",
                      }));
                    }}
                    placeholder=""
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                    tooltipText="Set the payment status"
                  />
                </div>
              )}

              {/* Default field - only show if user can edit */}
              {isDefaultPerm && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: "Yes",
                        value: "Yes",
                        date: "Set default payment",
                      },
                      {
                        label: "No",
                        value: "No",
                        date: "Remove default payment",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === "Yes"
                        : value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("actions");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Set as default payment"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <ActionsAutocomplete
                  ref={(el: any) => setRef("actions")(el)}
                  id="actions"
                  name="actions"
                  labelText="Action"
                  value={selectedAction}
                  actions={[
                    {
                      action: "Created",
                      user: "John",
                      role: "Super User",
                      date: "06 Aug 2025",
                      value: "created",
                    },
                    {
                      action: "Updated",
                      user: "Sarah",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "updated",
                    },
                    {
                      action: "Inactive",
                      user: "Mike",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "inactive",
                    },
                    {
                      action: "Drafted",
                      user: "John",
                      role: "Super User",
                      date: "07 Aug 2025",
                      value: "drafted",
                    },
                  ]}
                  placeholder=""
                  onValueChange={(value: string) => {
                    setSelectedAction(value);
                  }}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Payment Action History"
                />
              </div>
            </div>
          </form>
        </div>
      </MinimizablePageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Reset Form"
        message="Are you sure you want to reset the form?"
        confirmText="Reset"
        cancelText="Cancel"
      />

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Payment Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Payment translations saved:", data);
        }}
      />
    </>
  );
}
