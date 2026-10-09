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

type BranchData = {
  code: string;
  branchName: string;
  taxNumber: string;
  phone: string;
  fax: string;
  mobile: string;
  email: string;
  website: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postCode: string;
  bankDetails: string;
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

type BranchModuleData = {
  formData: BranchData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: BranchData = {
  code: "BR-001",
  branchName: "Main Branch",
  taxNumber: "TAX-123456789",
  phone: "+1-555-0123",
  fax: "+1-555-0124",
  mobile: "+1-555-0125",
  email: "info@mainbranch.com",
  website: "www.mainbranch.com",
  address: "123 Main Street, Downtown",
  country: "United States",
  state: "California",
  city: "San Francisco",
  postCode: "94105",
  bankDetails: "Bank of America, Account: 1234567890",
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

export default function BranchEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  // const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `branches-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<BranchModuleData>(moduleId);

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
  const codePerm: boolean = usePermission("branches", "edit", "code");
  const branchNamePerm: boolean = usePermission(
    "branches",
    "edit",
    "branchName"
  );
  const taxNumberPerm: boolean = usePermission("branches", "edit", "taxNumber");
  const phonePerm: boolean = usePermission("branches", "edit", "phone");
  const faxPerm: boolean = usePermission("branches", "edit", "fax");
  const mobilePerm: boolean = usePermission("branches", "edit", "mobile");
  const emailPerm: boolean = usePermission("branches", "edit", "email");
  const websitePerm: boolean = usePermission("branches", "edit", "website");
  const addressPerm: boolean = usePermission("branches", "edit", "address");
  const countryPerm: boolean = usePermission("branches", "edit", "country");
  const statePerm: boolean = usePermission("branches", "edit", "state");
  const cityPerm: boolean = usePermission("branches", "edit", "city");
  const postCodePerm: boolean = usePermission("branches", "edit", "postCode");
  const bankDetailsPerm: boolean = usePermission(
    "branches",
    "edit",
    "bankDetails"
  );
  const statusPerm: boolean = usePermission("branches", "edit", "status");
  const isDefaultPerm: boolean = usePermission("branches", "edit", "isDefault");
  const canPdf: boolean = usePermission("branches", "pdf");
  const canPrint: boolean = usePermission("branches", "print");

  // Form state
  const [formData, setFormData] = useState<BranchData>({
    code: "",
    branchName: "",
    taxNumber: "",
    phone: "",
    fax: "",
    mobile: "",
    email: "",
    website: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postCode: "",
    bankDetails: "",
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

  // Update translation data when branchName changes
  useEffect(() => {
    setTranslations([
      {
        id: 1,
        english: formData.branchName || "",
        arabic: "",
        bangla: "",
      },
    ]);
  }, [formData.branchName]);

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
        !formData.branchName);

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
    formData.branchName,
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
      [name]: type === "checkbox" ? checked : value,
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
      toastSuccess("Branch updated successfully!");
      handleReset();
    } else {
      toastSuccess("Branch updated successfully!");
      navigate("/branches");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      code: "",
      branchName: "",
      taxNumber: "",
      phone: "",
      fax: "",
      mobile: "",
      email: "",
      website: "",
      address: "",
      country: "",
      state: "",
      city: "",
      postCode: "",
      bankDetails: "",
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
        title: "Branch Details",
        data: [reportData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          branchName: "Branch Name",
          taxNumber: "Tax Number",
          phone: "Phone",
          fax: "Fax",
          mobile: "Mobile",
          email: "Email",
          website: "Website",
          address: "Address",
          country: "Country",
          state: "State",
          city: "City",
          postCode: "Post Code",
          bankDetails: "Bank Details",
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
          title="Branch Details"
          subtitle="Branch Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "branch-details.pdf";
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
        navigate("/branches/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/branches/view");
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
              toastRestore("Branch saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): BranchModuleData => {
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
        moduleName={`Edit Branch`}
        moduleRoute={`/branches/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Branch"
        listPath="branches"
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
        module="branches"
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
            {/* Fields: Code, Branch Name, Tax Number, Phone, Fax, Mobile, Email, Website, Address, Country, State, City, Post Code, Bank Details */}
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
                      onNext={() => focusNextInput("branchName")}
                      onCancel={() => setFormData({ ...formData, code: "" })}
                      labelText="Code"
                      tooltipText="Enter the branch code"
                      required
                    />
                    <MoreVertical
                      className="h-4 w-4 cursor-pointer absolute right-8 top-6 transform -translate-y-1/2"
                      onClick={() => setIsOptionModalOpen(true)}
                    />
                  </div>
                </div>
              )}

              {branchNamePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("branchName")}
                    id="branchName"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("taxNumber")}
                    onCancel={() =>
                      setFormData({ ...formData, branchName: "" })
                    }
                    labelText="Branch Name"
                    tooltipText="Enter the branch name"
                    required
                  />
                </div>
              )}

              {taxNumberPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("taxNumber")}
                    id="taxNumber"
                    name="taxNumber"
                    value={formData.taxNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("phone")}
                    onCancel={() => setFormData({ ...formData, taxNumber: "" })}
                    labelText="Tax Number"
                    tooltipText="Enter the tax number"
                    required
                  />
                </div>
              )}

              {phonePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("phone")}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onNext={() => focusNextInput("fax")}
                    onCancel={() => setFormData({ ...formData, phone: "" })}
                    labelText="Phone"
                    tooltipText="Enter the branch phone number"
                    required
                  />
                </div>
              )}

              {faxPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("fax")}
                    id="fax"
                    name="fax"
                    value={formData.fax}
                    onChange={handleChange}
                    onNext={() => focusNextInput("mobile")}
                    onCancel={() => setFormData({ ...formData, fax: "" })}
                    labelText="Fax"
                    tooltipText="Enter the branch fax number"
                    required
                  />
                </div>
              )}

              {mobilePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("mobile")}
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, mobile: "" })}
                    labelText="Mobile"
                    tooltipText="Enter the branch mobile number"
                    required
                  />
                </div>
              )}

              {emailPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("website")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="Email"
                    tooltipText="Enter the branch email"
                    required
                  />
                </div>
              )}

              {websitePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("website")}
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onNext={() => focusNextInput("address")}
                    onCancel={() => setFormData({ ...formData, website: "" })}
                    labelText="Website"
                    tooltipText="Enter the branch website"
                    required
                  />
                </div>
              )}

              {addressPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("address")}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("country")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText="Address"
                    tooltipText="Enter the branch address"
                    required
                  />
                </div>
              )}

              {countryPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("country")}
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    onNext={() => focusNextInput("state")}
                    onCancel={() => setFormData({ ...formData, country: "" })}
                    labelText="Country"
                    tooltipText="Enter the country"
                    required
                  />
                </div>
              )}

              {statePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("state")}
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    onNext={() => focusNextInput("city")}
                    onCancel={() => setFormData({ ...formData, state: "" })}
                    labelText="State"
                    tooltipText="Enter the state"
                    required
                  />
                </div>
              )}

              {cityPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("city")}
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onNext={() => focusNextInput("postCode")}
                    onCancel={() => setFormData({ ...formData, city: "" })}
                    labelText="City"
                    tooltipText="Enter the city"
                    required
                  />
                </div>
              )}

              {postCodePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("postCode")}
                    id="postCode"
                    name="postCode"
                    value={formData.postCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("bankDetails")}
                    onCancel={() => setFormData({ ...formData, postCode: "" })}
                    labelText="Post Code"
                    tooltipText="Enter the postal code"
                    required
                  />
                </div>
              )}

              {bankDetailsPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("bankDetails")}
                    id="bankDetails"
                    name="bankDetails"
                    value={formData.bankDetails}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() =>
                      setFormData({ ...formData, bankDetails: "" })
                    }
                    labelText="Bank Details"
                    tooltipText="Enter the bank details"
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
                    tooltipText="Set the branch status"
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
                        date: "Set default branch",
                      },
                      {
                        label: "No",
                        value: "No",
                        date: "Remove default branch",
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
                    tooltipText="Set as default branch"
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
                  tooltipText="Branch Action History"
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
        title="Branch Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Branch translations saved:", data);
        }}
      />
    </>
  );
}
