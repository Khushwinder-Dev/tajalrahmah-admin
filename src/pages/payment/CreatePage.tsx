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
import { Check, Edit, Eye, Plus, MoreVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountriesPermissions, usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
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
  status: "active" | "inactive" | "draft";
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: PaymentData = {
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
  isUpdated: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function PaymentFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Permission checks
  const { canCreate, canView } = useCountriesPermissions();

  // Field-level permissions
  const codePerm: boolean = usePermission("payment", "create", "code");
  const invoiceTypePerm: boolean = usePermission(
    "payment",
    "create",
    "invoiceType"
  );
  const currencyPerm: boolean = usePermission("payment", "create", "currency");
  const paymentTermsPerm: boolean = usePermission(
    "payment",
    "create",
    "paymentTerms"
  );
  const dueDaysPerm: boolean = usePermission("payment", "create", "dueDays");
  const totalAmountPerm: boolean = usePermission(
    "payment",
    "create",
    "totalAmount"
  );
  const containerAmountPerm: boolean = usePermission(
    "payment",
    "create",
    "containerAmount"
  );
  const typeOfDepositPerm: boolean = usePermission(
    "payment",
    "create",
    "typeOfDeposit"
  );
  const depositAmountPerm: boolean = usePermission(
    "payment",
    "create",
    "depositAmount"
  );
  const depositDatePerm: boolean = usePermission(
    "payment",
    "create",
    "depositDate"
  );
  const exchangeRatePerm: boolean = usePermission(
    "payment",
    "create",
    "exchangeRate"
  );
  const localAmountPerm: boolean = usePermission(
    "payment",
    "create",
    "localAmount"
  );
  const statusPerm: boolean = usePermission("payment", "create", "status");
  const isDefaultPerm: boolean = usePermission(
    "payment",
    "create",
    "isDefault"
  );
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
    isUpdated: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

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

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
    }
  }, [isEdit]);

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
          navigate("/payment/create");
        } else {
          navigate("/payment/edit/undefined");
        }
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

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

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
      toastSuccess("Payment created successfully!");
      handleReset();
    } else {
      toastSuccess("Payment created successfully!");
      navigate("/payment");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

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
      isUpdated: false,
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
      inputRefs.current["code"]?.focus();
    }, 100);
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
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
          isUpdated: "Updated",
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
              toastRestore("Payment saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

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
        moduleId="payment-form-module"
        moduleName={isEdit ? "Edit Payment" : "Adding Payment"}
        moduleRoute={
          isEdit ? `/payment/edit/${formData.code || "new"}` : "/payment/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Payment" : "Add Payment"}
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
        activePage="create"
        module="payment"
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
                onClick={handleSubmit}
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

              {/* Status and Default sections remain unchanged */}

              {isDefaultPerm && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: labels.yes,
                        value: labels.yes,
                        date: "Set default payment",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default payment",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === labels.yes
                        : value === labels.yes;
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
                        // no-op
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Set as default payment"
                  />
                </div>
              )}

              {statusPerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("statusSwitch")(el)}
                    id="statusSwitch"
                    name="statusSwitch"
                    labelText="Status"
                    multiSelect={false}
                    options={[
                      { label: "Active", value: "active", date: "Set active" },
                      {
                        label: "Inactive",
                        value: "inactive",
                        date: "Set inactive",
                      },
                      { label: "Draft", value: "draft", date: "Set draft" },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = (
                        Array.isArray(value) ? value[0] : value
                      ) as "active" | "inactive" | "draft";
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue,
                        isDraft: stringValue === "draft",
                        isActive: stringValue === "active",
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
            </div>
          </form>
        </div>
      </MinimizablePageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
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
