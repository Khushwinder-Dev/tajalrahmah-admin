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
import { useLanguageLabels } from "@/hooks/useLanguageLabels";

type PackageType = {
  account: string;
  debit: string;
  description: string;
  credit: string;
};
type ProjectTypeDataType = {
  number: string;
  journalDate: string;
  journalEntry: string;
  reference: string;
  totalCycles: string;

  PackageType: PackageType;

  isDefault: boolean;
  isActive: boolean;
  isDeleted: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ProjectTypeDataType = {
  number: "",
  journalDate: "",
  journalEntry: "",
  reference: "",
  totalCycles: "",
  PackageType: {
    account: "",
    debit: "",
    description: "",
    credit: "",
  },

  isDefault: false,
  isActive: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function JournalEntryEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);
  // const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  // const [isActiveState, setIsActiveState] = useState<"Yes" | "No" | string>(
  //   "No"
  // );
  // const [isDeletedState, setIsDeletedState] = useState<
  //   "Delete" | "Restore" | string
  // >("");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks

  const canView = usePermission("journalEntry", "view");
  const canEdit = usePermission("journalEntry", "edit");
  const canDelete = usePermission("journalEntry", "delete");

  console.log("canEdit", canEdit);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions

  // const branch: boolean = usePermission("journalEntry", "create", "branch");
  // const voucherNumber: boolean = usePermission(
  //   "journalEntry",
  //   "create",
  //   "voucherNumber"
  // );

  // const category: boolean = usePermission("journalEntry", "create", "category");

  // const subCategory: boolean = usePermission(
  //   "journalEntry",
  //   "create",
  //   "subCategory"
  // );

  // const expense: boolean = usePermission("journalEntry", "create", "expense");

  // const date: boolean = usePermission("journalEntry", "create", "date");
  // const amount: boolean = usePermission("journalEntry", "create", "amount");
  // const currency: boolean = usePermission("journalEntry", "create", "currency");
  // const paymentMode: boolean = usePermission(
  //   "journalEntry",
  //   "create",
  //   "paymentMode"
  // );
  // const vat: boolean = usePermission("journalEntry", "create", "vat");
  // const supplier: boolean = usePermission("journalEntry", "create", "supplier");
  // const approvedBy: boolean = usePermission("journalEntry", "create", "approvedBy");
  // const purchaseInvoiceNumber: boolean = usePermission(
  //   "journalEntry",
  //   "create",
  //   "purchaseInvoiceNumber"
  // );
  // const supplierVatNumber: boolean = usePermission(
  //   "journalEntry",
  //   "create",
  //   "supplierVatNumber"
  // );
  // const expenseBy: boolean = usePermission("journalEntry", "create", "expenseBy");
  // const expenseFor: boolean = usePermission("journalEntry", "create", "expenseFor");
  // const note: boolean = usePermission("journalEntry", "create", "note");

  const isDefault: boolean = usePermission(
    "journalEntry",
    "create",
    "isDefault"
  );

  const isDraft: boolean = usePermission("journalEntry", "create", "isDraft");
  const isActive: boolean = usePermission("journalEntry", "create", "isActive");
  const isDeleted: boolean = usePermission(
    "journalEntry",
    "create",
    "isDeleted"
  );
  const canPdf: boolean = usePermission("journalEntry", "pdf");
  const canPrint: boolean = usePermission("journalEntry", "print");

  // console.log("branch", branch);
  // console.log("voucherNumber", voucherNumber);
  // console.log("category", category);
  // console.log("subCategory", subCategory);
  // console.log("expense", expense);
  // console.log("date", date);
  // console.log("amount", amount);
  // console.log("currency", currency);
  // console.log("paymentMode", paymentMode);
  // console.log("vat", vat);
  // console.log("supplier", supplier);
  // console.log("approvedBy", approvedBy);
  // console.log("purchaseInvoiceNumber", purchaseInvoiceNumber);
  // console.log("supplierVatNumber", supplierVatNumber);
  // console.log("expenseBy", expenseBy);
  // console.log("expenseFor", expenseFor);
  // console.log("note", note);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("isActive", isActive);
  console.log("isDeleted", isDeleted);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    number: "",
    journalDate: "",
    journalEntry: "",
    reference: "",
    totalCycles: "",
    PackageType: {
      account: "",
      debit: "",
      description: "",
      credit: "",
    },

    isDefault: isDefaultState === "Yes",
    isActive: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  const [packageRows, setPackageRows] = useState([
    {
      id: Date.now(),
      account: "Dhaka Bank",
      debit: "6842",
      description: "The description is here",
      credit: "7145",
    },
    {
      id: Date.now() + 1,
      account: "Dhaka Bank",
      debit: "6842",
      description: "The description is here",
      credit: "7145",
    },
  ]);

  const labels = useLanguageLabels();

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
          navigate("/journal-entry/create");
        } else {
          navigate("/journal-entry/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canEdit,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/journal-entry/view");
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
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      // setIsActiveState(initialData.isActive ? "Yes" : "No");
      // setIsDeletedState(initialData.isDeleted ? "Delete" : "Restore");
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
      navigate("/shipment");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePackageChange = (id: number, field: string, value: string) => {
    setPackageRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleAddRow = () => {
    setPackageRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        account: "",
        debit: "",
        description: "",
        credit: "",
      },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setPackageRows((prev) => prev.filter((row) => row.id !== id));
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      number: "",
      journalDate: "",
      journalEntry: "",
      reference: "",
      totalCycles: "",
      PackageType: {
        account: "",
        debit: "",
        description: "",
        credit: "",
      },

      isDefault: false,
      isActive: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");
    setPackageRows([
      {
        id: Date.now(),
        account: "",
        debit: "",
        description: "",
        credit: "",
      },
    ]);

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
      if (!formData.isActive) {
        return [
          ...filteredOptions,
          {
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isActive: true,
              }));
              toastRestore("Expense saved as draft successfully");
            },
            show: canEdit, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isActive, canEdit]);

  return (
    <>
      <PageLayout
        title={
          isEdit ? labels.editingJournalEntry : labels.creatingJournalEntry
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="journal-entry"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="edit"
        // Removed onExport prop
        additionalFooterButtons={
          // Only show buttons if user can create
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

              {canEdit && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("number")}
                    type="text"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    onNext={() => focusNextInput("journalDate")}
                    onCancel={() => setFormData({ ...formData, number: "" })}
                    labelText={labels.numberTooltip}
                    tooltipText={labels.numberTooltip}
                    required
                  />
                </div>
              )}

              {canEdit && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("journalDate")}
                    type="date"
                    id="journalDate"
                    name="journalDate"
                    value={formData.journalDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("journalEntry")}
                    onCancel={() =>
                      setFormData({ ...formData, journalDate: "" })
                    }
                    labelText={labels.journalDateTooltip}
                    tooltipText={labels.journalDateTooltip}
                    required
                  />
                </div>
              )}

              {canEdit && (
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("journalEntry")(el)}
                    id="journalEntry"
                    name="journalEntry"
                    options={["Banco de España", "Banco España", "e España"]}
                    value={formData.journalEntry}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        journalEntry: value,
                      }));
                    }}
                    onEnterPress={() => {
                      if (formData.journalEntry) {
                        focusNextInput("reference");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.journalEntry}
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

              {canEdit && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("reference")}
                    type="text"
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    onNext={() => focusNextInput("totalCycles")}
                    onCancel={() => setFormData({ ...formData, reference: "" })}
                    labelText={labels.referenceTooltip}
                    tooltipText={labels.referenceTooltip}
                    required
                  />
                </div>
              )}
              {canEdit && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("totalCycles")}
                    type="text"
                    id="totalCycles"
                    name="totalCycles"
                    value={formData.totalCycles}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, totalCycles: "" })
                    }
                    labelText={labels.totalCyclesTooltip}
                    tooltipText={labels.totalCyclesTooltip}
                    required
                    readOnly
                    disabled
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
                      focusNextInput("account");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("account");
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

              <div className="md:col-span-4 space-y-2 pt-4">
                <h1 className="text-2xl font-bold text-primary">
                  Account Information
                </h1>
              </div>

              <div className="md:col-span-4">
                {packageRows.map((row) => (
                  <div key={row.id} className="p-2 border rounded-lg">
                    {canEdit && (
                      <div className="flex flex-col md:flex-row gap-4 mx-auto items-center">
                        <Autocomplete
                          ref={(el: any) => setRef("account")(el)}
                          id="account"
                          name="account"
                          options={[
                            "Banco Santander",
                            "DBN Bank",
                            "Bangla Bank",
                            "BRAC Bank",
                            "City Bank",
                            "BRAC Microfinance Bank",
                            "Bkash",
                            "Nagad",
                            "Rocket",
                          ]}
                          value={row.account}
                          labelClassName="rounded-lg"
                          onValueChange={(value: string) => {
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, account: value } : r
                              )
                            );
                          }}
                          onEnterPress={() => {
                            if (row.account) {
                              focusNextInput(`debit-${row.id}`);
                            }
                          }}
                          placeholder=" "
                          labelText={labels.accountTooltip}
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

                        <div className="mt-5 w-full">
                          <EditableInput
                            type="text"
                            id={`debit-${row.id}`}
                            name={`debit-${row.id}`}
                            value={row.debit}
                            onChange={(e) =>
                              handlePackageChange(
                                row.id,
                                "debit",
                                e.target.value
                              )
                            }
                            onNext={() => focusNextInput(`credit-${row.id}`)}
                            onCancel={() =>
                              setPackageRows((prev) =>
                                prev.map((r) =>
                                  r.id === row.id ? { ...r, debit: "" } : r
                                )
                              )
                            }
                            labelText={labels.debitTooltip}
                            tooltipText={labels.debitTooltip}
                          />
                        </div>

                        <div className="mt-5 w-full">
                          <EditableInput
                            type="text"
                            id={`credit-${row.id}`}
                            name={`credit-${row.id}`}
                            value={row.credit}
                            onChange={(e) =>
                              handlePackageChange(
                                row.id,
                                "credit",
                                e.target.value
                              )
                            }
                            onNext={() =>
                              focusNextInput(`description-${row.id}`)
                            }
                            onCancel={() =>
                              setPackageRows((prev) =>
                                prev.map((r) =>
                                  r.id === row.id ? { ...r, credit: "" } : r
                                )
                              )
                            }
                            labelText={labels.creditTooltip}
                            tooltipText={labels.creditTooltip}
                          />
                        </div>

                        <div className="mt-5 w-full">
                          <EditableInput
                            type="text"
                            id={`description-${row.id}`}
                            name={`description-${row.id}`}
                            value={row.description}
                            onChange={(e) =>
                              handlePackageChange(
                                row.id,
                                "description",
                                e.target.value
                              )
                            }
                            onNext={() =>
                              focusNextInput(`account-${row.id + 1}`)
                            }
                            onCancel={() =>
                              setPackageRows((prev) =>
                                prev.map((r) =>
                                  r.id === row.id
                                    ? { ...r, description: "" }
                                    : r
                                )
                              )
                            }
                            labelText={labels.descriptionTooltip}
                            tooltipText={labels.descriptionTooltip}
                          />
                        </div>

                        {/* Add more fields: length, width, height, etc. in similar way */}

                        {packageRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteRow(row.id)}
                            className="p-2 text-red-500"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center md:flex-wrap md:col-span-4">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Add Row
                </button>
              </div>
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
