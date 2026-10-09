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
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface MockData {
  bookingNo: string;
  checkIn: string;
  checkOut: string;
  city: string;
  bookingType: string;
  reference: string;
  refNo: string;
  purposeOfVisit: string;
  remarks?: string;
  roomType: string;
  roomNo: string;
  adults: string;
  children: string;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

type Props = {
  isEdit?: boolean;
};

const initialData: MockData = {
  bookingNo: "",
  checkIn: "",
  checkOut: "",
  city: "",
  bookingType: "",
  reference: "",
  refNo: "",
  purposeOfVisit: "",
  remarks: "",
  roomType: "",
  roomNo: "",
  adults: "",
  children: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  rating: 3,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function BookingListCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks - similar to CountryDetails.tsx
  // const { canCreate, canView, canEdit, canDelete } = useCountriesPermissions();
  const canCreate: boolean = usePermission("bookingList", "create");
  const canView: boolean = usePermission("bookingList", "view");
  const canEdit: boolean = usePermission("bookingList", "edit");
  const canDelete: boolean = usePermission("bookingList", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const name: boolean = usePermission("bookingList", "create", "name");

  const isDefault: boolean = usePermission(
    "bookingList",
    "create",
    "isDefault"
  );
  const isDraft: boolean = usePermission("bookingList", "create", "isDraft");
  const canPdf: boolean = usePermission("bookingList", "pdf");
  const canPrint: boolean = usePermission("bookingList", "print");

  const permissionsFields = usePermission<keyof MockData>(
    "bookingList",
    "create",
    [
      "bookingNo",
      "checkIn",
      "checkOut",
      "city",
      "bookingType",
      "reference",
      "refNo",
      "purposeOfVisit",
      "remarks",
      "roomType",
      "roomNo",
      "adults",
      "children",
    ]
  );

  console.log("name", name);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<MockData>({
    bookingNo: "BOK-461",
    checkIn: "",
    checkOut: "",
    city: "",
    bookingType: "",
    reference: "",
    refNo: "",
    purposeOfVisit: "",
    remarks: "",
    roomType: "",
    roomNo: "",
    adults: "",
    children: "",
    isDefault: isDefaultState === "Yes",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    rating: 3,
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
          navigate("/booking-list/create");
        } else {
          navigate("/booking-list/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/booking-list/view");
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

  // Handle drag events

  // Handle image upload via file input

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
      handlePrintBookingList(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Room Size created successfully!");
      handleReset();
    } else {
      toastSuccess("Room Size created successfully!");
      navigate("/booking-list");
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
      bookingNo: "",
      checkIn: "",
      checkOut: "",
      city: "",
      bookingType: "",
      reference: "",
      refNo: "",
      purposeOfVisit: "",
      remarks: "",
      roomType: "",
      roomNo: "",
      adults: "",
      children: "",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      rating: 3,
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
      inputRefs.current["bookingType"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const handlePrintBookingList = (MockData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Room Size Details",
        data: [MockData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          title: "Title",
          fromDate: "From Date",
          toDate: "To Date",
          status: "Status",
          isDefault: "Default Country",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          rating: "Rating",
          flag: "Flag",
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
    // if (checked && formData) {
    //   // Small delay to allow switch animation to complete
    //   setTimeout(() => handlePrintBookingList(formData), 100);
    // }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    // if (pdfChecked) {
    //   // Small delay to allow switch animation to complete
    //   setTimeout(() => handleExportPDF(), 100);
    // }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("MockData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Room Size Details"
          subtitle="Room Size Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "TaxRates-details.pdf";
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
              toastRestore("Room Size saved as draft successfully");
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
        title={isEdit ? labels.editingBookingList : labels.creatingBookingList}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="booking-list"
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
                {labels.reset}
              </Button>
              <Button
                ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
                id="submitButton"
                name="submitButton"
                variant="outline"
                className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
                onClick={() => formRef.current?.requestSubmit()}
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
            {/* First Row: Code, Calling Code, Country */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {permissionsFields.bookingNo && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("bookingNo")}
                    id="bookingNo"
                    name="bookingNo"
                    value={formData.bookingNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("checkIn")}
                    onCancel={() => setFormData({ ...formData, bookingNo: "" })}
                    labelText={labels.bookingNoTooltip}
                    tooltipText={labels.bookingNoTooltip}
                    required
                    disabled
                  />
                </div>
              )}

              {permissionsFields.checkIn && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("checkIn")}
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("checkOut")}
                    onCancel={() => setFormData({ ...formData, checkIn: "" })}
                    labelText={labels.checkInTooltip}
                    tooltipText={labels.checkInTooltip}
                    required
                    type="date"
                  />
                </div>
              )}

              {permissionsFields.checkOut && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("checkOut")}
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    onNext={() => focusNextInput("city")}
                    onCancel={() => setFormData({ ...formData, checkOut: "" })}
                    labelText={labels.checkOutTooltip}
                    tooltipText={labels.checkOutTooltip}
                    required
                    type="date"
                  />
                </div>
              )}

              {permissionsFields.city && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("city")}
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onNext={() => focusNextInput("bookingType")}
                    onCancel={() => setFormData({ ...formData, city: "" })}
                    labelText={labels.cityTooltip}
                    tooltipText={labels.cityTooltip}
                    required
                  />
                </div>
              )}
              {permissionsFields.bookingType && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("bookingType")(el)}
                    id="bookingType"
                    name="bookingType"
                    allowCustomInput={true}
                    options={["Basic", "Standard", "Premium", "Exclusive"]}
                    value={formData.bookingType}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, bookingType: value });
                      if (value) {
                        focusNextInput("reference");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.bookingType) {
                        focusNextInput("reference");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.bookingTypeTooltip}
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
              {permissionsFields.city && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("reference")}
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    onNext={() => focusNextInput("refNo")}
                    onCancel={() => setFormData({ ...formData, reference: "" })}
                    labelText={labels.referenceTooltip}
                    tooltipText={labels.referenceTooltip}
                    required
                  />
                </div>
              )}

              {permissionsFields.refNo && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("refNo")}
                    id="refNo"
                    name="refNo"
                    value={formData.refNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("purposeOfVisit")}
                    onCancel={() => setFormData({ ...formData, refNo: "" })}
                    labelText={labels.refNoTooltip}
                    tooltipText={labels.refNoTooltip}
                    required
                  />
                </div>
              )}

              {permissionsFields.purposeOfVisit && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("purposeOfVisit")}
                    id="purposeOfVisit"
                    name="purposeOfVisit"
                    value={formData.purposeOfVisit}
                    onChange={handleChange}
                    onNext={() => focusNextInput("roomType")}
                    onCancel={() =>
                      setFormData({ ...formData, purposeOfVisit: "" })
                    }
                    labelText={labels.purposeOfVisitTooltip}
                    tooltipText={labels.purposeOfVisitTooltip}
                    required
                  />
                </div>
              )}
              {permissionsFields.bookingType && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("roomType")(el)}
                    id="roomType"
                    name="roomType"
                    allowCustomInput={true}
                    options={["Basic", "Standard", "Premium", "Exclusive"]}
                    value={formData.roomType}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, roomType: value });
                      if (value) {
                        focusNextInput("roomNo");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.roomType) {
                        focusNextInput("roomNo");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.roomTypeTooltip}
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

              {permissionsFields.roomNo && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("roomNo")}
                    id="roomNo"
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("adults")}
                    onCancel={() => setFormData({ ...formData, roomNo: "" })}
                    labelText={labels.roomNoTooltip}
                    tooltipText={labels.roomNoTooltip}
                    required
                  />
                </div>
              )}

              {permissionsFields.adults && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("adults")}
                    id="adults"
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                    onNext={() => focusNextInput("children")}
                    onCancel={() => setFormData({ ...formData, adults: "" })}
                    labelText={labels.adultsTooltip}
                    tooltipText={labels.adultsTooltip}
                    required
                  />
                </div>
              )}

              {permissionsFields.children && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("children")}
                    id="children"
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, children: "" })}
                    labelText={labels.childrenTooltip}
                    tooltipText={labels.childrenTooltip}
                    required
                  />
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={[labels.no, labels.yes]}
                    value={isDefaultState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === labels.yes;
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
                    labelText={labels.default}
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
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={[labels.no, labels.yes]}
                    value={isDraftState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === labels.yes;
                      setIsDraftState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: newValue,
                      }));
                      focusNextInput("name");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("name");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.draft}
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
        </div>
      </PageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
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
