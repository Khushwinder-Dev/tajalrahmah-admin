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

const initialData: BranchData = {
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
  isUpdated: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function BranchFormPage({ isEdit = false }: Props) {
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
  const codePerm: boolean = usePermission("branches", "create", "code");
  const branchNamePerm: boolean = usePermission(
    "branches",
    "create",
    "branchName"
  );
  const taxNumberPerm: boolean = usePermission(
    "branches",
    "create",
    "taxNumber"
  );
  const phonePerm: boolean = usePermission("branches", "create", "phone");
  const faxPerm: boolean = usePermission("branches", "create", "fax");
  const mobilePerm: boolean = usePermission("branches", "create", "mobile");
  const emailPerm: boolean = usePermission("branches", "create", "email");
  const websitePerm: boolean = usePermission("branches", "create", "website");
  const addressPerm: boolean = usePermission("branches", "create", "address");
  const countryPerm: boolean = usePermission("branches", "create", "country");
  const statePerm: boolean = usePermission("branches", "create", "state");
  const cityPerm: boolean = usePermission("branches", "create", "city");
  const postCodePerm: boolean = usePermission("branches", "create", "postCode");
  const bankDetailsPerm: boolean = usePermission(
    "branches",
    "create",
    "bankDetails"
  );
  const statusPerm: boolean = usePermission("branches", "create", "status");
  const isDefaultPerm: boolean = usePermission(
    "branches",
    "create",
    "isDefault"
  );
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
    isUpdated: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

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
          navigate("/branches/create");
        } else {
          navigate("/branches/edit/undefined");
        }
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
      toastSuccess("Branch created successfully!");
      handleReset();
    } else {
      toastSuccess("Branch created successfully!");
      navigate("/branches");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

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
              toastRestore("Branch saved as draft successfully");
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
        moduleId="branch-form-module"
        moduleName={isEdit ? "Edit Branch" : "Adding Branch"}
        moduleRoute={
          isEdit
            ? `/branches/edit/${formData.code || "new"}`
            : "/branches/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Branch" : "Add Branch"}
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
        activePage="create"
        module="branches"
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
                    tooltipText="Enter the tax identification number"
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
                        date: "Set default branch",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default branch",
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
                    tooltipText="Set as default branch"
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
                    tooltipText="Set the branch status"
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
