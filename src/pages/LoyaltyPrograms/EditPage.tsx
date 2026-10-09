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
  ruleName: string;
  pointFrom: string;
  pointTo: string;
  weight: string;
  rulesStatus: string;
};
type ProjectTypeDataType = {
  name: string;
  customerGroup: string;
  customer: string;
  startDate: string;
  endDate: string;
  ruleBase: string;
  minimumPurchase: string;
  accountCreationPoint: string;
  birthdayPoint: string;
  redeemType: string;
  minimumPointToRedeem: string;
  maxAmountReceive: string;
  status: string;
  redeemInPortal: string;
  redeemInPos: string;
  description: string;

  PackageType: PackageType[];

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
  name: "Festive Rewards Program",
  customerGroup: "Gold Members",
  customer: "John Doe",
  startDate: "2025-01-01",
  endDate: "2025-12-31",
  ruleBase: "Purchase Amount",
  minimumPurchase: "2000", // in BDT
  accountCreationPoint: "100",
  birthdayPoint: "250",
  redeemType: "Discount Voucher",
  minimumPointToRedeem: "500",
  maxAmountReceive: "5000", // max discount limit
  status: "active",
  redeemInPortal: "true",
  redeemInPos: "true",
  description:
    "Exclusive loyalty program for Gold Members with special rewards on purchases and birthdays.",
  PackageType: [
    {
      ruleName: "Silver Tier",
      pointFrom: "1",
      pointTo: "999",
      weight: "1", // 1 point per 100 BDT
      rulesStatus: "active",
    },
    {
      ruleName: "Gold Tier",
      pointFrom: "1000",
      pointTo: "4999",
      weight: "2", // 2 points per 100 BDT
      rulesStatus: "active",
    },
    {
      ruleName: "Platinum Tier",
      pointFrom: "5000",
      pointTo: "10000",
      weight: "3", // 3 points per 100 BDT
      rulesStatus: "active",
    },
  ],
  isDefault: false,
  isActive: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function LoyaltyProgramsEditPage({ isEdit = false }: Props) {
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

  const canView = usePermission("loyaltyPrograms", "view");
  const canEdit = usePermission("loyaltyPrograms", "edit");
  const canDelete = usePermission("loyaltyPrograms", "delete");

  console.log("canEdit", canEdit);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  const isDefault: boolean = usePermission(
    "loyaltyPrograms",
    "create",
    "isDefault"
  );

  const isDraft: boolean = usePermission(
    "loyaltyPrograms",
    "create",
    "isDraft"
  );
  const isActive: boolean = usePermission(
    "loyaltyPrograms",
    "create",
    "isActive"
  );
  const isDeleted: boolean = usePermission(
    "loyaltyPrograms",
    "create",
    "isDeleted"
  );
  const canPdf: boolean = usePermission("loyaltyPrograms", "pdf");
  const canPrint: boolean = usePermission("loyaltyPrograms", "print");

  const permissionsFields = usePermission<
    keyof ProjectTypeDataType | `PackageType.${keyof PackageType}`
  >("loyaltyPrograms", "create", [
    "name",
    "customerGroup",
    "customer",
    "startDate",
    "endDate",
    "ruleBase",
    "minimumPurchase",
    "accountCreationPoint",
    "birthdayPoint",
    "redeemType",
    "minimumPointToRedeem",
    "maxAmountReceive",
    "status",
    "redeemInPortal",
    "redeemInPos",
    "description",
    "PackageType.ruleName",
    "PackageType.pointFrom",
    "PackageType.pointTo",
    "PackageType.weight",
    "PackageType.rulesStatus",
  ]);

  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("isActive", isActive);
  console.log("isDeleted", isDeleted);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    name: "",
    customerGroup: "",
    customer: "",
    startDate: "",
    endDate: "",
    ruleBase: "",
    minimumPurchase: "",
    accountCreationPoint: "",
    birthdayPoint: "",
    redeemType: "",
    minimumPointToRedeem: "",
    maxAmountReceive: "",
    status: "",
    redeemInPortal: "",
    redeemInPos: "",
    description: "",
    PackageType: [
      {
        ruleName: "",
        pointFrom: "",
        pointTo: "",
        weight: "",
        rulesStatus: "",
      },
    ],
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
      ruleName: "Silver Tier",
      pointFrom: "1",
      pointTo: "999",
      weight: "1", // 1 point per 100 BDT
      rulesStatus: "active",
    },
    {
      id: Date.now() + 1,
      ruleName: "Silver Tier",
      pointFrom: "1",
      pointTo: "999",
      weight: "1", // 1 point per 100 BDT
      rulesStatus: "active",
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
          navigate("/loyalty-programs/create");
        } else {
          navigate("/loyalty-programs/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canEdit,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/loyalty-programs/view");
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
      toastSuccess("Pickup created successfully!");
      handleReset();
    } else {
      toastSuccess("Pickup created successfully!");
      navigate("/loyalty-programs");
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
        ruleName: "",
        pointFrom: "",
        pointTo: "",
        weight: "",
        rulesStatus: "",
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
      name: "",
      customerGroup: "",
      customer: "",
      startDate: "",
      endDate: "",
      ruleBase: "",
      minimumPurchase: "",
      accountCreationPoint: "",
      birthdayPoint: "",
      redeemType: "",
      minimumPointToRedeem: "",
      maxAmountReceive: "",
      status: "",
      redeemInPortal: "",
      redeemInPos: "",
      description: "",
      PackageType: [
        {
          ruleName: "",
          pointFrom: "",
          pointTo: "",
          weight: "",
          rulesStatus: "",
        },
      ],

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
        ruleName: "",
        pointFrom: "",
        pointTo: "",
        weight: "", // 1 point per 100 BDT
        rulesStatus: "",
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
        title: "Pickup Details",
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
          title="Pickup Details"
          subtitle="Pickup Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Pickup-details.pdf";
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
              toastRestore("Pickup saved as draft successfully");
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
          isEdit
            ? labels.editingLoyaltyPrograms
            : labels.creatingLoyaltyPrograms
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="loyalty-programs"
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

              {permissionsFields.name && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("customerGroup")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText={labels.nameTooltip}
                    tooltipText={labels.nameTooltip}
                    readOnly
                    disabled
                    required
                  />
                </div>
              )}

              {permissionsFields.customerGroup && (
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("customerGroup")(el)}
                    id="customerGroup"
                    name="customerGroup"
                    options={["Member", "Guest", "Both"]}
                    value={formData.customerGroup}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        customerGroup: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("customer");
                    }}
                    onEnterPress={() => {
                      if (formData.customerGroup) {
                        focusNextInput("customer");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.customerGroupTooltip}
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

              {permissionsFields.customer && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("customer")}
                    type="text"
                    id="customer"
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    onNext={() => focusNextInput("startDate")}
                    onCancel={() => setFormData({ ...formData, customer: "" })}
                    labelText={labels.customerTooltip}
                    tooltipText={labels.customerTooltip}
                    required
                  />
                </div>
              )}

              {permissionsFields.startDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("startDate")}
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("endDate")}
                    onCancel={() => setFormData({ ...formData, startDate: "" })}
                    labelText={labels.startDateTooltip}
                    tooltipText={labels.startDateTooltip}
                    required
                  />
                </div>
              )}

              {permissionsFields.endDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("endDate")}
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("ruleBase")}
                    onCancel={() => setFormData({ ...formData, endDate: "" })}
                    labelText={labels.endDateTooltip}
                    tooltipText={labels.endDateTooltip}
                    required
                  />
                </div>
              )}
              {permissionsFields.ruleBase && (
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("ruleBase")(el)}
                    id="ruleBase"
                    name="ruleBase"
                    options={["BAN", "UAE", "UK", "IND", "SA", "USA"]}
                    value={formData.ruleBase}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        ruleBase: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("minimumPurchase");
                    }}
                    onEnterPress={() => {
                      if (formData.ruleBase) {
                        focusNextInput("minimumPurchase");
                      }
                    }}
                    placeholder=" "
                    labelText="Rule Base"
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

              {permissionsFields.minimumPurchase && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("minimumPurchase")}
                    type="number"
                    id="minimumPurchase"
                    name="minimumPurchase"
                    value={formData.minimumPurchase}
                    onChange={handleChange}
                    onNext={() => focusNextInput("accountCreationPoint")}
                    onCancel={() =>
                      setFormData({ ...formData, minimumPurchase: "" })
                    }
                    labelText={labels.minimumPurchaseTooltip}
                    tooltipText={labels.minimumPurchaseTooltip}
                    required
                  />
                </div>
              )}

              {permissionsFields.accountCreationPoint && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("accountCreationPoint")}
                    type="number"
                    id="accountCreationPoint"
                    name="accountCreationPoint"
                    value={formData.accountCreationPoint}
                    onChange={handleChange}
                    onNext={() => focusNextInput("birthdayPoint")}
                    onCancel={() =>
                      setFormData({ ...formData, accountCreationPoint: "" })
                    }
                    labelText={labels.accountCreationPointTooltip}
                    tooltipText={labels.accountCreationPointTooltip}
                    required
                  />
                </div>
              )}

              {permissionsFields.birthdayPoint && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("birthdayPoint")}
                    type="number"
                    id="birthdayPoint"
                    name="birthdayPoint"
                    value={formData.birthdayPoint}
                    onChange={handleChange}
                    onNext={() => focusNextInput("redeemType")}
                    onCancel={() =>
                      setFormData({ ...formData, birthdayPoint: "" })
                    }
                    labelText={labels.birthdayPointTooltip}
                    tooltipText={labels.birthdayPointTooltip}
                    required
                  />
                </div>
              )}

              {permissionsFields.redeemType && (
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("ruleBase")(el)}
                    id="redeemType"
                    name="redeemType"
                    options={["Fixed", "Percentage", "Amount"]}
                    value={formData.redeemType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        redeemType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("minimumPointToRedeem");
                    }}
                    onEnterPress={() => {
                      if (formData.redeemType) {
                        focusNextInput("minimumPointToRedeem");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.redeemTypeTooltip}
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

              {permissionsFields.minimumPointToRedeem && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("minimumPointToRedeem")}
                    type="number"
                    id="minimumPointToRedeem"
                    name="minimumPointToRedeem"
                    value={formData.minimumPointToRedeem}
                    onChange={handleChange}
                    onNext={() => focusNextInput("maxAmountReceive")}
                    onCancel={() =>
                      setFormData({ ...formData, minimumPointToRedeem: "" })
                    }
                    labelText={labels.minimumPointToRedeemTooltip}
                    tooltipText={labels.minimumPointToRedeemTooltip}
                    required
                  />
                </div>
              )}

              {permissionsFields.maxAmountReceive && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("maxAmountReceive")}
                    type="number"
                    id="maxAmountReceive"
                    name="maxAmountReceive"
                    value={formData.maxAmountReceive}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() =>
                      setFormData({ ...formData, maxAmountReceive: "" })
                    }
                    labelText={labels.maxAmountReceiveTooltip}
                    tooltipText={labels.maxAmountReceiveTooltip}
                    required
                  />
                </div>
              )}
              {permissionsFields.status && (
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    options={["Active", "Inactive"]}
                    value={formData.status}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        status: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("redeemInPortal");
                    }}
                    onEnterPress={() => {
                      if (formData.status) {
                        focusNextInput("redeemInPortal");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.statusTooltip}
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
              {permissionsFields.redeemInPortal && (
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("redeemInPortal")(el)}
                    id="redeemInPortal"
                    name="redeemInPortal"
                    options={["Yes", "No"]}
                    value={formData.redeemInPortal}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        redeemInPortal: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("redeemInPos");
                    }}
                    onEnterPress={() => {
                      if (formData.redeemInPortal) {
                        focusNextInput("redeemInPos");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.redeemInPortalTooltip}
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
              {permissionsFields.redeemInPos && (
                <div className="space-y-2 ">
                  <Autocomplete
                    ref={(el: any) => setRef("redeemInPos")(el)}
                    id="redeemInPos"
                    name="redeemInPos"
                    options={["Yes", "No"]}
                    value={formData.redeemInPos}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        redeemInPos: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("description");
                    }}
                    onEnterPress={() => {
                      if (formData.redeemInPos) {
                        focusNextInput("description");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.redeemInPosTooltip}
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

              {permissionsFields.description && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText={labels.descriptionTooltip}
                    tooltipText={labels.descriptionTooltip}
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

              <div className="md:col-span-4 space-y-2 pt-4">
                <h1 className="text-2xl font-bold text-primary">Rules</h1>
              </div>

              <div className="md:col-span-4">
                {packageRows.map((row) => (
                  <div key={row.id} className="p-2 border rounded-lg">
                    {canEdit && (
                      <div className="flex flex-col md:flex-row gap-4 mx-auto items-center">
                        <EditableInput
                          type="text"
                          id={`ruleName-${row.id}`}
                          name={`ruleName-${row.id}`}
                          value={row.ruleName}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "ruleName",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`pointFrom-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, ruleName: "" } : r
                              )
                            )
                          }
                          labelText="Rule Name"
                          tooltipText="Rule Name"
                        />

                        <EditableInput
                          type="text"
                          id={`pointFrom-${row.id}`}
                          name={`pointFrom-${row.id}`}
                          value={row.pointFrom}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "pointFrom",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`pointTo-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, pointFrom: "" } : r
                              )
                            )
                          }
                          labelText="Point From"
                          tooltipText="Point From"
                        />

                        <EditableInput
                          type="text"
                          id={`pointTo-${row.id}`}
                          name={`pointTo-${row.id}`}
                          value={row.pointTo}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "pointTo",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`weight-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, pointTo: "" } : r
                              )
                            )
                          }
                          labelText="Point To"
                          tooltipText="Point To"
                        />

                        <EditableInput
                          type="text"
                          id={`weight-${row.id}`}
                          name={`weight-${row.id}`}
                          value={row.weight}
                          onChange={(e) =>
                            handlePackageChange(
                              row.id,
                              "weight",
                              e.target.value
                            )
                          }
                          onNext={() => focusNextInput(`rulesStatus-${row.id}`)}
                          onCancel={() =>
                            setPackageRows((prev) =>
                              prev.map((r) =>
                                r.id === row.id ? { ...r, weight: "" } : r
                              )
                            )
                          }
                          labelText="Weight"
                          tooltipText="Weight"
                        />
                        <Autocomplete
                          ref={(el: any) => setRef(`rulesStatus-${row.id}`)(el)}
                          id={`rulesStatus-${row.id}`}
                          name={`rulesStatus-${row.id}`}
                          options={["Yes", "No"]}
                          value={row.rulesStatus}
                          labelClassName="rounded-lg"
                          onValueChange={(value: string) => {
                            setFormData((prev) => ({
                              ...prev,
                              rulesStatus: value,
                            }));
                            // Call focusNextInput if needed
                            focusNextInput("");
                          }}
                          onEnterPress={() => {
                            if (row.rulesStatus) {
                              focusNextInput("");
                            }
                          }}
                          placeholder=" "
                          labelText="Rules Status"
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

                <div></div>
                <div></div>
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
