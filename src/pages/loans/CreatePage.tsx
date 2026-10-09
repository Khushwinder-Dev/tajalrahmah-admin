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

type AllowancesDataType = {
  date: string;
  iqamaNo: string;
  branch: string;

  permittedBy: string;
  approvedDate: string;
  repaymentFrom: string;
  amount: string;
  interestPercentage: string;
  installmentPeriod: string;
  repaymentAmount: string;
  installment: string;
  loanStatus: string;
  loanDetails: string;

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

const initialData: AllowancesDataType = {
  date: "2025-08-01",
  iqamaNo: "1234567890",
  branch: "Dhaka",
  permittedBy: "HR Manager",
  approvedDate: "2025-08-02",
  repaymentFrom: "2025-09-01",
  amount: "20000",
  interestPercentage: "5",
  installmentPeriod: "6",
  repaymentAmount: "3500",
  installment: "Monthly",
  loanStatus: "Active",
  loanDetails: "Short-term emergency loan",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function LoansCreatePage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("loans", "create");
  const canView = usePermission("loans", "view");
  // const canEdit = usePermission("loans", "edit");
  // const canDelete = usePermission("loans", "delete");

  // Field-level permissions
  const date: boolean = usePermission("loans", "create", "date");
  const iqamaNo: boolean = usePermission("loans", "create", "iqamaNo");
  const branch: boolean = usePermission("loans", "create", "branch");
  const permittedBy: boolean = usePermission("loans", "create", "permittedBy");
  const approvedDate: boolean = usePermission(
    "loans",
    "create",
    "approvedDate"
  );
  const repaymentFrom: boolean = usePermission(
    "loans",
    "create",
    "repaymentFrom"
  );
  const amount: boolean = usePermission("loans", "create", "amount");
  const interestPercentage: boolean = usePermission(
    "loans",
    "create",
    "interestPercentage"
  );
  const installmentPeriod: boolean = usePermission(
    "loans",
    "create",
    "installmentPeriod"
  );
  const repaymentAmount: boolean = usePermission(
    "loans",
    "create",
    "repaymentAmount"
  );
  const installment: boolean = usePermission("loans", "create", "installment");
  const status: boolean = usePermission("loans", "create", "status");
  const loanDetails: boolean = usePermission("loans", "create", "loanDetails");

  const isDefault: boolean = usePermission("loans", "create", "isDefault");
  const isDraft: boolean = usePermission("loans", "create", "isDraft");
  const canPdf: boolean = usePermission("loans", "pdf");
  const canPrint: boolean = usePermission("loans", "print");

  // Form state
  const [formData, setFormData] = useState<AllowancesDataType>({
    iqamaNo: "",
    branch: "",
    amount: "",
    interestPercentage: "",
    installmentPeriod: "",
    repaymentFrom: "",
    repaymentAmount: "",
    installment: "",
    loanStatus: "Inactive",
    loanDetails: "",
    permittedBy: "",
    approvedDate: "",
    date: "",
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
          navigate("/loans/create");
        } else {
          navigate("/loans/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/loans/view");
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
      toastSuccess("Loan created successfully!");
      handleReset();
    } else {
      toastSuccess("Loan created successfully!");
      navigate("/loans");
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
      iqamaNo: "",
      branch: "",
      amount: "",
      interestPercentage: "",
      installmentPeriod: "",
      repaymentFrom: "",
      repaymentAmount: "",
      installment: "",
      loanStatus: "",
      loanDetails: "",
      permittedBy: "",
      approvedDate: "",
      date: "",
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
      inputRefs.current["date"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (printData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Loan Details",
        data: [printData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          iqamaNo: "Iqama No",
          branch: "Branch",
          amount: "Amount",
          interestPercentage: "Interest Percentage",
          installmentPeriod: "Installment Period",
          repaymentFrom: "Repayment From",
          repaymentAmount: "Repayment Amount",
          installment: "Installment",
          status: "Status",
          loanDetails: "Loan Details",
          permittedBy: "Permitted By",
          approvedDate: "Approved Date",
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
          title="Loan Details"
          subtitle="Loan Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "loan-details.pdf";
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
              toastRestore("Loan saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  const iqamaData = [
    {
      value: "1234567890",
      name: "Rasel Ahmed",
      designation: "Line Cook",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567891",
      name: "Someone",
      designation: "Chef",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567892",
      name: "Person 2",
      designation: "Waiter",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567893",
      name: "Person 3",
      designation: "Waiter",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567894",
      name: "Person 4",
      designation: "Waiter",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567895",
      name: "Person 5",
      designation: "Marketer",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567896",
      name: "Person 6",
      designation: "Waiter",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567897",
      name: "Person 7",
      designation: "Waiter",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567898",
      name: "Person 8",
      designation: "Manager",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567899",
      name: "Person 9",
      designation: "Labour",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
  ];

  const selectedEmployee = iqamaData.find(
    (item) => item.value === formData.iqamaNo
  );

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Loan" : "Creating Loan"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="loans"
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
            <div className="grid grid-cols-12 md:grid-cols-12 gap-4 my-8 relative">
              {/* Leave Types field - only show if user can create */}
              {date && (
                <div className="space-y-2 md:col-span-3">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("date")}
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      onNext={() => focusNextInput("iqamaNo")}
                      onCancel={() => setFormData({ ...formData, date: "" })}
                      labelText="Date"
                      tooltipText="Enter date"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Notes field - only show if user can create */}
              {iqamaNo && (
                <div className="space-y-2 md:col-span-3">
                  <Autocomplete
                    ref={(el: any) => setRef("iqamaNo")(el)}
                    id="iqamaNo"
                    name="iqamaNo"
                    isSelectableOnly={true}
                    options={iqamaData.map((item) => item.value)}
                    value={formData.iqamaNo}
                    onValueChange={(value: string) => {
                      const selectedOption = iqamaData.find(
                        (item) => item.value === value
                      );

                      setFormData((prev) => ({
                        ...prev,
                        iqamaNo: value,
                        branch: selectedOption?.branch || "",
                      }));

                      if (value) {
                        focusNextInput("deductionType");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.iqamaNo) {
                        // focusNextInput("deductionType");
                      }
                    }}
                    placeholder=" "
                    labelText="Iqama No"
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

              {/* Description field - only show if user can create */}
              {branch && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("branch")}
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    onNext={() => focusNextInput("deductionType")}
                    onCancel={() => setFormData({ ...formData, branch: "" })}
                    labelText="Branch"
                    tooltipText="Enter branch"
                    required
                    readOnly
                  />
                </div>
              )}

              {/* Deduction Type field - only show if user can create */}
              {permittedBy && (
                <div className="space-y-2 md:col-span-3">
                  <Autocomplete
                    ref={(el: any) => setRef("permittedBy")(el)}
                    id="permittedBy"
                    name="permittedBy"
                    isSelectableOnly={true}
                    options={["Salim Pardan", "Rasel Ahmed", "Rashed Hossen"]}
                    value={formData.permittedBy}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, permittedBy: value });
                      if (value) {
                        focusNextInput("approvedDate");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.permittedBy) {
                        focusNextInput("approvedDate");
                      }
                    }}
                    placeholder=" "
                    labelText="Permitted By"
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

              {/* Deduction Amount field - only show if user can create */}
              {approvedDate && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("approvedDate")}
                    type="date"
                    id="approvedDate"
                    name="approvedDate"
                    value={formData.approvedDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("notes")}
                    onCancel={() =>
                      setFormData({ ...formData, approvedDate: "" })
                    }
                    labelText="Approved Date"
                    tooltipText="Enter approved date"
                    required
                  />
                </div>
              )}

              {/* Notes field - only show if user can create */}
              {repaymentFrom && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("repaymentFrom")}
                    type="date"
                    id="repaymentFrom"
                    name="repaymentFrom"
                    value={formData.repaymentFrom}
                    onChange={handleChange}
                    onNext={() => focusNextInput("amount")}
                    onCancel={() =>
                      setFormData({ ...formData, repaymentFrom: "" })
                    }
                    labelText="Repayment From"
                    tooltipText="Enter repayment from"
                    required
                  />
                </div>
              )}

              {amount && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("amount")}
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    onNext={() => focusNextInput("interestPercentage")}
                    onCancel={() => setFormData({ ...formData, amount: "" })}
                    labelText="Amount"
                    tooltipText="Enter amount"
                    required
                  />
                </div>
              )}

              {interestPercentage && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("interestPercentage")}
                    type="number"
                    id="interestPercentage"
                    name="interestPercentage"
                    value={formData.interestPercentage}
                    onChange={handleChange}
                    onNext={() => focusNextInput("installmentPeriod")}
                    onCancel={() =>
                      setFormData({ ...formData, interestPercentage: "" })
                    }
                    labelText="Interest Percentage"
                    tooltipText="Enter interest percentage"
                    required
                  />
                </div>
              )}

              {installmentPeriod && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("installmentPeriod")}
                    type="number"
                    id="installmentPeriod"
                    name="installmentPeriod"
                    value={formData.installmentPeriod}
                    onChange={handleChange}
                    onNext={() => focusNextInput("repaymentAmount")}
                    onCancel={() =>
                      setFormData({ ...formData, installmentPeriod: "" })
                    }
                    labelText="Installment Period"
                    tooltipText="Enter installment period"
                    required
                  />
                </div>
              )}

              {repaymentAmount && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("repaymentAmount")}
                    type="number"
                    id="repaymentAmount"
                    name="repaymentAmount"
                    value={formData.repaymentAmount}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, repaymentAmount: "" })
                    }
                    labelText="Repayment Amount"
                    tooltipText="Enter repayment amount"
                    required
                  />
                </div>
              )}

              {installment && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("installment")}
                    id="installment"
                    name="installment"
                    value={formData.installment}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, installment: "" })
                    }
                    labelText="Installment"
                    tooltipText="Enter installment"
                    required
                  />
                </div>
              )}

              {loanDetails && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("loanDetails")}
                    id="loanDetails"
                    name="loanDetails"
                    value={formData.loanDetails}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, loanDetails: "" })
                    }
                    labelText="Loan Details"
                    tooltipText="Enter loan details"
                    required
                  />
                </div>
              )}

              {status && (
                <div className="space-y-2 md:col-span-3">
                  <Autocomplete
                    ref={(el: any) => setRef("loanStatus")(el)}
                    id="loanStatus"
                    name="loanStatus"
                    options={["Active", "Inactive"]}
                    value={formData.loanStatus}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        loanStatus: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("isDefault");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.loanStatus === "Active" ||
                        formData.loanStatus === "Inactive"
                      ) {
                        focusNextInput("isDraft");
                      }
                    }}
                    placeholder=" "
                    labelText="Loan Status"
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

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="space-y-2 md:col-span-3">
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
                <div className="space-y-2 md:col-span-3 relative">
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
          {formData.iqamaNo && selectedEmployee && (
            <div className="flex items-center bg-white shadow-md rounded-lg p-4 max-w-md">
              <img
                src={selectedEmployee.image}
                alt="Employee"
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedEmployee.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedEmployee.designation}
                </p>
              </div>
            </div>
          )}
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
