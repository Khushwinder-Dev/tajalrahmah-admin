/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
// Removed Autocomplete import - not needed for bank form
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import { useNavigate } from "react-router-dom";

// Define Bank interface to ensure type consistency
interface Bank {
  id: string;
  bankName: string;
  accountNumber: string;
  branchName: string;
  ibanNumber: string;
  openingBalance: number;
  address: string;
  bankDetails: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

type Props = {
  isEdit?: boolean;
};

const initialData: Bank = {
  id: "1",
  bankName: "National Bank",
  accountNumber: "1234567890",
  branchName: "Main Branch",
  ibanNumber: "SA0380000000608010167519",
  openingBalance: 50000.0,
  address: "123 Main Street, City Center",
  bankDetails: "Primary business account for daily transactions",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Mock data not needed for bank form

export default function BankFormPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const bankNameInputRef = useRef<EditableInputRef>(null);
  const accountNumberInputRef = useRef<EditableInputRef>(null);
  const branchNameInputRef = useRef<EditableInputRef>(null);
  const ibanNumberInputRef = useRef<EditableInputRef>(null);
  const openingBalanceInputRef = useRef<EditableInputRef>(null);
  const addressInputRef = useRef<EditableInputRef>(null);
  const bankDetailsInputRef = useRef<EditableInputRef>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<Bank>({
    id: "",
    bankName: "",
    accountNumber: "",
    branchName: "",
    ibanNumber: "",
    openingBalance: 0,
    address: "",
    bankDetails: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Bank form doesn't need filtered options

  // Update translation data when bank name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.bankName || "", arabic: "", bangla: "" },
    ]);
  }, [formData.bankName]);

  // Bank form doesn't need country/state/city filtering
  // These useEffect hooks are removed for bank interface

  // Update the focusNextInput function for bank form fields
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "bankName":
        accountNumberInputRef.current?.focus();
        break;
      case "accountNumber":
        branchNameInputRef.current?.focus();
        break;
      case "branchName":
        ibanNumberInputRef.current?.focus();
        break;
      case "ibanNumber":
        openingBalanceInputRef.current?.focus();
        break;
      case "openingBalance":
        addressInputRef.current?.focus();
        break;
      case "address":
        bankDetailsInputRef.current?.focus();
        break;
      case "bankDetails":
        defaultSwitchRef.current?.focus();
        break;
      case "default":
        activeSwitchRef.current?.focus();
        break;
      case "active":
        draftSwitchRef.current?.focus();
        break;
      case "draft":
        deleteButtonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const getRelativeTime = (dateString: string | null | Date) => {
    if (!dateString) return "--/--/----";

    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years}y ago`;
    } else if (months > 0) {
      return `${months}mo ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  // Add this function to handle key navigation for switches and buttons
  const handleSwitchKeyDown = (
    e: React.KeyboardEvent,
    currentField: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Trigger the switch/button action first
      switch (currentField) {
        case "default":
          setFormData({ ...formData, isDefault: !formData.isDefault });
          break;
        case "active":
          setFormData({ ...formData, isActive: !formData.isActive });
          break;
        case "draft":
          setFormData({ ...formData, isDraft: !formData.isDraft });
          break;
        case "delete":
          setFormData({ ...formData, isDeleted: !formData.isDeleted });
          break;
      }
      // Then move to next field
      setTimeout(() => focusNextInput(currentField), 50);
    }
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

  // Handle numeric input changes
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;
    setFormData({
      ...formData,
      [name]: numericValue,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        id: "",
        bankName: "",
        accountNumber: "",
        branchName: "",
        ibanNumber: "",
        openingBalance: 0,
        address: "",
        bankDetails: "",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date(),
        draftedAt: null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      });
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  const handlePrintBank = (bankData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Bank Details",
        data: [bankData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          bankName: "Bank Name",
          accountNumber: "Account Number",
          branchName: "Branch Name",
          ibanNumber: "IBAN Number",
          openingBalance: "Opening Balance",
          address: "Address",
          bankDetails: "Bank Details",
          isDefault: "Default Bank",
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
    if (checked && formData) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrintBank(formData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("bankData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Bank Details"
          subtitle="Bank Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bank-details.pdf";
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
        title={isEdit ? t("form.editingBank") : t("form.creatingBank")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/banks"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/banks/create");
              } else {
                // Navigate to edit page
                navigate("/banks/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/banks/view");
            },
          },
        ]}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={handlePDFSwitchChange}
        printEnabled={printEnabled}
        onPrintToggle={handleSwitchChange}
        additionalFooterButtons={
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="gap-2 text-primary rounded-full border-primary"
              onClick={handleReset}
            >
              {t("button.reset")}
            </Button>
            <Button
              variant="outline"
              className="gap-2 text-primary rounded-full border-primary"
              onClick={() => formRef.current?.requestSubmit()}
            >
              {t("button.submit")}
            </Button>
          </div>
        }
        className="w-full"
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* First Row: Bank Name, Account Number, Branch Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Bank Name</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                ref={bankNameInputRef}
                id="bankName"
                name="bankName"
                className="w-full h-10"
                value={formData.bankName}
                onChange={handleChange}
                onNext={() => focusNextInput("bankName")}
                onCancel={() => {}}
                tooltipText="Please enter bank name"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Account Number</h3>
              <EditableInput
                ref={accountNumberInputRef}
                id="accountNumber"
                name="accountNumber"
                className="w-full h-10"
                value={formData.accountNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("accountNumber")}
                onCancel={() => {}}
                tooltipText="Please enter account number"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Branch Name</h3>
              <EditableInput
                ref={branchNameInputRef}
                id="branchName"
                name="branchName"
                className="w-full h-10"
                value={formData.branchName}
                onChange={handleChange}
                onNext={() => focusNextInput("branchName")}
                onCancel={() => {}}
                tooltipText="Please enter branch name"
              />
            </div>
          </div>

          {/* Second Row: IBAN Number, Opening Balance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">IBAN Number</h3>
              <EditableInput
                ref={ibanNumberInputRef}
                id="ibanNumber"
                name="ibanNumber"
                className="w-full h-10"
                value={formData.ibanNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("ibanNumber")}
                onCancel={() => {}}
                tooltipText="Please enter IBAN number"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Opening Balance</h3>
              <EditableInput
                ref={openingBalanceInputRef}
                id="openingBalance"
                name="openingBalance"
                type="number"
                className="w-full h-10"
                value={formData.openingBalance.toString()}
                onChange={handleNumericChange}
                onNext={() => focusNextInput("openingBalance")}
                onCancel={() => {}}
                tooltipText="Please enter opening balance"
              />
            </div>
          </div>

          {/* Third Row: Address */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Address</h3>
              <EditableInput
                ref={addressInputRef}
                id="address"
                name="address"
                className="w-full h-10"
                value={formData.address}
                onChange={handleChange}
                onNext={() => focusNextInput("address")}
                onCancel={() => {}}
                tooltipText="Please enter bank address"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Bank Details</h3>
              <EditableInput
                ref={bankDetailsInputRef}
                id="bankDetails"
                name="bankDetails"
                className="w-full h-10"
                value={formData.bankDetails}
                onChange={handleChange}
                onNext={() => focusNextInput("bankDetails")}
                onCancel={() => {}}
                tooltipText="Please enter bank details"
              />
            </div>
          </div>

          {/* Fifth Row: Default, Draft, Active, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.default")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={defaultSwitchRef}
                  id="isDefault"
                  name="isDefault"
                  className=""
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDefault: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "default")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={activeSwitchRef}
                  id="isActive"
                  name="isActive"
                  className=""
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "active")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={draftSwitchRef}
                  id="isDraft"
                  name="isDraft"
                  className=""
                  checked={formData.isDraft}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDraft: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "draft")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {formData.isDeleted ? t("button.restore") : t("button.delete")}
              </h3>
              <div className="h-10 flex items-center">
                <Button
                  ref={deleteButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isDeleted: !formData.isDeleted,
                    })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "delete")}
                >
                  {formData.isDeleted ? (
                    <Undo2 className="text-green-500" />
                  ) : (
                    <Trash2 className="text-red-500" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Sixth Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium mb-1">Created</h3>
              <p>{getRelativeTime(formData.createdAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{getRelativeTime(formData.updatedAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{getRelativeTime(formData.draftedAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Deleted</h3>
              <p>{getRelativeTime(formData.deletedAt)}</p>
            </div>
          </div>
        </form>
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Bank Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Bank translations saved:", data);
        }}
      />
    </>
  );
}
