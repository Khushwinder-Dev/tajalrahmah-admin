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
  branch: string;
  voucherNumber: string;
  category: string;
  subCategory: string;
  expense: string;
  date: string;
  amount: string;
  currency: string;
  paymentMode: string;
  vat: string;
  supplier: string;
  approvedBy: string;
  purchaseInvoiceNumber: string;
  supplierVatNumber: string;
  expenseBy: string;
  expenseFor: string;
  note: string;

  expensesDocumentTitle: string[];
  expensesDocument: File[];

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
  branch: "Dhaka HQ",
  voucherNumber: "VCH-1012",
  category: "Miscellaneous",
  subCategory: "Gifts",
  expense: "Client Gift",
  date: "2025-08-12",
  amount: "1800",
  currency: "BDT",
  paymentMode: "Cash",
  vat: "0%",
  supplier: "Gift World",
  approvedBy: "Nusrat Jahan",
  purchaseInvoiceNumber: "INV-5012",
  supplierVatNumber: "VAT-78912",
  expenseBy: "Sabbir Ahmed",
  expenseFor: "Client Relationship",
  note: "Client Relationship Building",
  expensesDocumentTitle: [],
  expensesDocument: [],
  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function ExpensesCreatePage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("expenses", "create");
  const canView = usePermission("expenses", "view");
  const canEdit = usePermission("expenses", "edit");
  const canDelete = usePermission("expenses", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions

  const branch: boolean = usePermission("expenses", "create", "branch");
  const voucherNumber: boolean = usePermission(
    "expenses",
    "create",
    "voucherNumber"
  );

  const category: boolean = usePermission("expenses", "create", "category");

  const subCategory: boolean = usePermission(
    "expenses",
    "create",
    "subCategory"
  );

  const expense: boolean = usePermission("expenses", "create", "expense");

  const date: boolean = usePermission("expenses", "create", "date");
  const amount: boolean = usePermission("expenses", "create", "amount");
  const currency: boolean = usePermission("expenses", "create", "currency");
  const paymentMode: boolean = usePermission(
    "expenses",
    "create",
    "paymentMode"
  );
  const vat: boolean = usePermission("expenses", "create", "vat");
  const supplier: boolean = usePermission("expenses", "create", "supplier");
  const approvedBy: boolean = usePermission("expenses", "create", "approvedBy");
  const purchaseInvoiceNumber: boolean = usePermission(
    "expenses",
    "create",
    "purchaseInvoiceNumber"
  );
  const supplierVatNumber: boolean = usePermission(
    "expenses",
    "create",
    "supplierVatNumber"
  );
  const expenseBy: boolean = usePermission("expenses", "create", "expenseBy");
  const expenseFor: boolean = usePermission("expenses", "create", "expenseFor");
  const note: boolean = usePermission("expenses", "create", "note");

  const isDefault: boolean = usePermission("expenses", "create", "isDefault");

  const isDraft: boolean = usePermission("expenses", "create", "isDraft");
  const canPdf: boolean = usePermission("expenses", "pdf");
  const canPrint: boolean = usePermission("expenses", "print");

  console.log("branch", branch);
  console.log("voucherNumber", voucherNumber);
  console.log("category", category);
  console.log("subCategory", subCategory);
  console.log("expense", expense);
  console.log("date", date);
  console.log("amount", amount);
  console.log("currency", currency);
  console.log("paymentMode", paymentMode);
  console.log("vat", vat);
  console.log("supplier", supplier);
  console.log("approvedBy", approvedBy);
  console.log("purchaseInvoiceNumber", purchaseInvoiceNumber);
  console.log("supplierVatNumber", supplierVatNumber);
  console.log("expenseBy", expenseBy);
  console.log("expenseFor", expenseFor);
  console.log("note", note);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    branch: "",
    voucherNumber: "87656",
    category: "",
    subCategory: "",
    expense: "",
    date: "",
    amount: "",
    currency: "",
    paymentMode: "",
    vat: "",
    supplier: "",
    approvedBy: "",
    purchaseInvoiceNumber: "",
    supplierVatNumber: "",
    expenseBy: "",
    expenseFor: "",
    note: "",
    expensesDocumentTitle: [],
    expensesDocument: [],
    isDefault: isDefaultState === "Yes",
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  const [documentsData, setDocumentsData] = useState<
    {
      title: string;
      file: File | null;
    }[]
  >([
    {
      title: "",
      file: null,
    },
  ]);

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
          navigate("/expenses/create");
        } else {
          navigate("/expenses/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/expenses/view");
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
      toastSuccess("Expense created successfully!");
      handleReset();
    } else {
      toastSuccess("Expense created successfully!");
      navigate("/expenses");
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
      branch: "",
      voucherNumber: "",
      category: "",
      subCategory: "",
      expense: "",
      date: "",
      amount: "",
      currency: "",
      paymentMode: "",
      vat: "",
      supplier: "",
      approvedBy: "",
      purchaseInvoiceNumber: "",
      supplierVatNumber: "",
      expenseBy: "",
      expenseFor: "",
      note: "",
      expensesDocumentTitle: [],
      expensesDocument: [],
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
      inputRefs.current["branch"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Expense Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          voucherNumber: "Voucher Number",
          category: "Category",
          subCategory: "Sub Category",
          expense: "Expense",
          date: "Date",
          amount: "Amount",
          currency: "Currency",
          paymentMode: "Payment Mode",
          vat: "VAT",
          supplier: "Supplier",
          approvedBy: "Approved By",
          purchaseInvoiceNumber: "Purchase Invoice Number",
          supplierVatNumber: "Supplier VAT Number",
          expenseBy: "Expense By",
          expenseFor: "Expense For",
          note: "Note",
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
          title="Expense Details"
          subtitle="Expense Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expense-details.pdf";
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
              toastRestore("Expense saved as draft successfully");
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
        title={isEdit ? "Editing Expense" : "Creating Expense"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="expenses"
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
              {branch && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("branch")(el)}
                    id="branch"
                    name="branch"
                    options={["Branch 1", "Branch 2", "Branch 3"]}
                    value={formData.branch}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        branch: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("voucherNumber");
                    }}
                    onEnterPress={() => {
                      if (formData.branch) {
                        focusNextInput("voucherNumber");
                      }
                    }}
                    placeholder=" "
                    labelText="Branch"
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
              {/* Notes field - only show if user can create */}
              {voucherNumber && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("voucherNumber")}
                    type="text"
                    id="voucherNumber"
                    name="voucherNumber"
                    value={formData.voucherNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("category")}
                    onCancel={() =>
                      setFormData({ ...formData, voucherNumber: "" })
                    }
                    labelText="Voucher Number"
                    tooltipText="Enter voucher number"
                    readOnly
                    required
                  />
                </div>
              )}
              {category && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("category")(el)}
                    id="category"
                    name="category"
                    options={["Category 1", "Category 2", "Category 3"]}
                    value={formData.category}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        category: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("subCategory");
                    }}
                    onEnterPress={() => {
                      if (formData.category) {
                        focusNextInput("subCategory");
                      }
                    }}
                    placeholder=" "
                    labelText="Category"
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
              {subCategory && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("subCategory")(el)}
                    id="subCategory"
                    name="subCategory"
                    options={[
                      "Sub Category 1",
                      "Sub Category 2",
                      "Sub Category 3",
                    ]}
                    value={formData.subCategory}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        subCategory: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("expense");
                    }}
                    onEnterPress={() => {
                      if (formData.subCategory) {
                        focusNextInput("expense");
                      }
                    }}
                    placeholder=" "
                    labelText="Sub Category"
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
              {expense && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("expense")}
                    type="text"
                    id="expense"
                    name="expense"
                    value={formData.expense}
                    onChange={handleChange}
                    onNext={() => focusNextInput("date")}
                    onCancel={() => setFormData({ ...formData, expense: "" })}
                    labelText="Expense"
                    tooltipText="Enter expense"
                    required
                  />
                </div>
              )}
              {date && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("date")}
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onNext={() => focusNextInput("amount")}
                    onCancel={() => setFormData({ ...formData, date: "" })}
                    labelText="Date"
                    tooltipText="Enter date"
                    required
                  />
                </div>
              )}
              {amount && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("amount")}
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    onNext={() => focusNextInput("currency")}
                    onCancel={() => setFormData({ ...formData, amount: "" })}
                    labelText="Amount"
                    tooltipText="Enter amount"
                    required
                  />
                </div>
              )}
              {currency && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("currency")(el)}
                    id="currency"
                    name="currency"
                    options={["currency 1", "currency 2", "currency 3"]}
                    value={formData.currency}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        currency: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("paymentMode");
                    }}
                    onEnterPress={() => {
                      if (formData.currency) {
                        focusNextInput("paymentMode");
                      }
                    }}
                    placeholder=" "
                    labelText="Currency"
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
              {paymentMode && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("paymentMode")(el)}
                    id="paymentMode"
                    name="paymentMode"
                    options={[
                      "Bank Transfer",
                      "Cash",
                      "Card",
                      "Cheque",
                      "Main Cash",
                    ]}
                    value={formData.paymentMode}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentMode: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("vat");
                    }}
                    onEnterPress={() => {
                      if (formData.paymentMode) {
                        focusNextInput("vat");
                      }
                    }}
                    placeholder=" "
                    labelText="Payment Mode"
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
              {vat && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("vat")}
                    type="text"
                    id="vat"
                    name="vat"
                    value={formData.vat}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, vat: "" })}
                    labelText="Vat (in %)"
                    tooltipText="Enter VAT"
                    required
                  />
                </div>
              )}
              {supplier && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("supplier")(el)}
                    id="supplier"
                    name="supplier"
                    options={["Person 1", "Person 2", "Person 3"]}
                    value={formData.supplier}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        supplier: value,
                        supplierVatNumber: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("approvedBy");
                    }}
                    onEnterPress={() => {
                      if (formData.supplier) {
                        focusNextInput("approvedBy");
                      }
                    }}
                    placeholder=" "
                    labelText="Supplier"
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
              {approvedBy && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("approvedBy")(el)}
                    id="approvedBy"
                    name="approvedBy"
                    options={["Person 1", "Person 2", "Person 3"]}
                    value={formData.approvedBy}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        approvedBy: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("purchaseInvoiceNumber");
                    }}
                    onEnterPress={() => {
                      if (formData.approvedBy) {
                        focusNextInput("purchaseInvoiceNumber");
                      }
                    }}
                    placeholder=" "
                    labelText="Approved By"
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
              {purchaseInvoiceNumber && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("purchaseInvoiceNumber")}
                    type="text"
                    id="purchaseInvoiceNumber"
                    name="purchaseInvoiceNumber"
                    value={formData.purchaseInvoiceNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("supplierVatNumber")}
                    onCancel={() =>
                      setFormData({ ...formData, purchaseInvoiceNumber: "" })
                    }
                    labelText="Purchase Invoice Number"
                    tooltipText="Enter Purchase Invoice Number"
                    required
                  />
                </div>
              )}
              {supplierVatNumber && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("supplierVatNumber")}
                    type="text"
                    id="supplierVatNumber"
                    name="supplierVatNumber"
                    value={formData.supplierVatNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("expenseBy")}
                    onCancel={() =>
                      setFormData({ ...formData, supplierVatNumber: "" })
                    }
                    labelText="Supplier VAT Number"
                    tooltipText="Enter Supplier VAT Number"
                    readOnly
                    required
                  />
                </div>
              )}
              {expenseBy && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("expenseBy")(el)}
                    id="expenseBy"
                    name="expenseBy"
                    options={["Person 1", "Person 2", "Person 3"]}
                    value={formData.expenseBy}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        expenseBy: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("expenseFor");
                    }}
                    onEnterPress={() => {
                      if (formData.expenseBy) {
                        focusNextInput("expenseFor");
                      }
                    }}
                    placeholder=" "
                    labelText="Expense By"
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
              {expenseFor && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("expenseFor")}
                    type="text"
                    id="expenseFor"
                    name="expenseFor"
                    value={formData.expenseFor}
                    onChange={handleChange}
                    onNext={() => focusNextInput("note")}
                    onCancel={() =>
                      setFormData({ ...formData, expenseFor: "" })
                    }
                    labelText="Expense For"
                    tooltipText="Enter Expense For"
                    required
                  />
                </div>
              )}

              {note && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("note")}
                    type="text"
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, note: "" })}
                    labelText="Note"
                    tooltipText="Enter note"
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
              {/* Draft field - only show if user can create */}
              {isDraft && (
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

            <div className="">
              <div className="flex items-center justify-between border-b pb-2 mb-4">
                <h3 className="text-lg font-semibold">Documents</h3>
                <Button
                  className="cursor-pointer"
                  type="button"
                  onClick={() =>
                    setDocumentsData((prev) => [
                      ...prev,
                      { title: "", file: null as File | null },
                    ])
                  }
                >
                  <Plus />
                </Button>
              </div>

              {documentsData.map((document, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 items-center"
                >
                  <EditableInput
                    type="text"
                    id="expensesDocumentTitle"
                    name="expensesDocumentTitle"
                    value={document.title}
                    onChange={(e) =>
                      setDocumentsData((prev) =>
                        prev.map((doc, i) =>
                          i === index ? { ...doc, title: e.target.value } : doc
                        )
                      )
                    }
                    onNext={() => focusNextInput("expensesDocument")}
                    onCancel={() =>
                      setDocumentsData((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    labelText="Document Title"
                    tooltipText="Enter document title"
                    required
                  />

                  <div className="h-[70px]">
                    <input
                      className="cursor-pointer h-[50px] border-1 border-gray-300 rounded-[12px] placeholder:text-red-500 text-gray-500 file:text-white file:bg-gray-400 file:border-0 file:px-4 file:py-2 file:h-full file:rounded-md file:cursor-pointer flex items-center justify-center w-full"
                      type="file"
                      id="expensesDocument"
                      name="expensesDocument"
                      onChange={(e) =>
                        setDocumentsData((prev) =>
                          prev.map((doc, i) =>
                            i === index
                              ? {
                                  ...doc,
                                  file: e?.target?.files?.[0] || null,
                                }
                              : doc
                          )
                        )
                      }
                      required
                    />
                  </div>
                </div>
              ))}
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
