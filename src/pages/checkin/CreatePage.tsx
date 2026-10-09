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

type CheckinData = {
  bookingNo: string;
  checkIn: string;
  checkOut: string;
  arrivalFrom: string;
  bookingType: string;
  bookingReference: string;
  bookingRefNo: string;
  purposeOfVisit: string;
  remarks: string;
  roomType: string;
  roomNo: string;
  adults: number;
  children: number;
  status: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: CheckinData = {
  bookingNo: "BK001",
  checkIn: "2024-01-15",
  checkOut: "2024-01-18",
  arrivalFrom: "Dubai, UAE",
  bookingType: "Online",
  bookingReference: "REF001",
  bookingRefNo: "BRN001",
  purposeOfVisit: "Business",
  remarks: "VIP Guest",
  roomType: "Deluxe",
  roomNo: "101",
  adults: 2,
  children: 1,
  status: "Active",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

export default function CheckinCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("checkin", "create");
  const canView = usePermission("checkin", "view");
  const canEdit = usePermission("checkin", "edit");
  const canDelete = usePermission("checkin", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof CheckinData>(
    "checkin",
    "create",
    [
      "bookingNo",
      "checkIn",
      "checkOut",
      "arrivalFrom",
      "bookingType",
      "bookingReference",
      "bookingRefNo",
      "purposeOfVisit",
      "remarks",
      "roomType",
      "roomNo",
      "adults",
      "children",
      "status",
      "isActive",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("checkin", "pdf");
  const canPrint: boolean = usePermission("checkin", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const statusOptions = [
    "Active",
    "Inactive",
    "On Hold",
    "Completed",
    "Cancelled",
    "Under Review",
    "Pending",
    "Approved",
    "In Transit",
    "Delivered",
  ];

  const arrivalFromOptions = [
    "Dubai, UAE",
    "Riyadh, KSA",
    "Kuwait City",
    "Doha, Qatar",
    "Muscat, Oman",
    "Amman, Jordan",
    "Beirut, Lebanon",
    "Cairo, Egypt",
    "Baghdad, Iraq",
    "Istanbul, Turkey",
    "Athens, Greece",
    "New Delhi, India",
  ];

  const bookingTypeOptions = ["Online", "Phone", "Walk-in", "Travel Agent"];

  const purposeOfVisitOptions = [
    "Business",
    "Leisure",
    "Conference",
    "Medical",
    "Family Visit",
    "Education",
    "Shopping",
    "Tourism",
    "Cultural Exchange",
    "Research",
    "Medical Tourism",
  ];

  const roomTypeOptions = [
    "Standard",
    "Deluxe",
    "Suite",
    "Accessible",
    "Family",
    "Budget",
    "Executive",
    "Studio",
    "Medical Suite",
  ];

  // Form state
  const [formData, setFormData] = useState<CheckinData>({
    bookingNo: "",
    checkIn: "",
    checkOut: "",
    arrivalFrom: "",
    bookingType: "",
    bookingReference: "",
    bookingRefNo: "",
    purposeOfVisit: "",
    remarks: "",
    roomType: "",
    roomNo: "",
    adults: 0,
    children: 0,
    status: "",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
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
          navigate("/checkin/create");
        } else {
          navigate("/checkin/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/checkin/view");
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
  }, [isEdit]);

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
      handlePrintCheckin(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Checkin record created successfully!");
      handleReset();
    } else {
      toastSuccess("Checkin record created successfully!");
      navigate("/checkin");
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
      arrivalFrom: "",
      bookingType: "",
      bookingReference: "",
      bookingRefNo: "",
      purposeOfVisit: "",
      remarks: "",
      roomType: "",
      roomNo: "",
      adults: 0,
      children: 0,
      status: "",
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setIsDraftState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["bookingNo"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintCheckin = (checkinData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Checkin Details",
        data: [checkinData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          bookingNo: "Booking No",
          checkIn: "Check In",
          checkOut: "Check Out",
          arrivalFrom: "Arrival From",
          bookingType: "Booking Type",
          bookingReference: "Booking Reference",
          bookingRefNo: "Booking Ref No",
          purposeOfVisit: "Purpose of Visit",
          remarks: "Remarks",
          roomType: "Room Type",
          roomNo: "Room No",
          adults: "Adults",
          children: "Children",
          status: "Status",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
      console.log("checkinData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Checkin Details"
          subtitle="Checkin Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "checkin-details.pdf";
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
              toastRestore("Checkin record saved as draft successfully");
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
        title={isEdit ? "Editing Checkin" : "Creating Checkin"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="checkin"
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
            {/* Basic Checkin Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.bookingNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("bookingNo")}
                    id="bookingNo"
                    name="bookingNo"
                    value={formData.bookingNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("checkIn")}
                    onCancel={() => setFormData({ ...formData, bookingNo: "" })}
                    labelText="Booking No"
                    tooltipText="Enter booking number (e.g., BK001, BK002)"
                    required
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.checkIn && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("checkIn")}
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("checkOut")}
                    onCancel={() => setFormData({ ...formData, checkIn: "" })}
                    labelText="Check In"
                    tooltipText="Enter check-in date (YYYY-MM-DD)"
                    required
                    type="date"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.checkOut && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("checkOut")}
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    onNext={() => focusNextInput("arrivalFrom")}
                    onCancel={() => setFormData({ ...formData, checkOut: "" })}
                    labelText="Check Out"
                    tooltipText="Enter check-out date (YYYY-MM-DD)"
                    required
                    type="date"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.arrivalFrom && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("arrivalFrom")(el)}
                    id="arrivalFrom"
                    name="arrivalFrom"
                    options={arrivalFromOptions}
                    value={formData.arrivalFrom}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        arrivalFrom: value,
                      }));
                      focusNextInput("bookingType");
                    }}
                    onEnterPress={() => {
                      if (formData.arrivalFrom) {
                        focusNextInput("bookingType");
                      }
                    }}
                    placeholder=" "
                    labelText="Arrival From"
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

            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.bookingType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("bookingType")(el)}
                    id="bookingType"
                    name="bookingType"
                    options={bookingTypeOptions}
                    value={formData.bookingType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        bookingType: value,
                      }));
                      focusNextInput("purposeOfVisit");
                    }}
                    onEnterPress={() => {
                      if (formData.bookingType) {
                        focusNextInput("purposeOfVisit");
                      }
                    }}
                    placeholder=" "
                    labelText="Booking Type"
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

              {permissionsFields.purposeOfVisit && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("purposeOfVisit")(el)}
                    id="purposeOfVisit"
                    name="purposeOfVisit"
                    options={purposeOfVisitOptions}
                    value={formData.purposeOfVisit}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        purposeOfVisit: value,
                      }));
                      focusNextInput("roomType");
                    }}
                    onEnterPress={() => {
                      if (formData.purposeOfVisit) {
                        focusNextInput("roomType");
                      }
                    }}
                    placeholder=" "
                    labelText="Purpose of Visit"
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

              {permissionsFields.roomType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("roomType")(el)}
                    id="roomType"
                    name="roomType"
                    options={roomTypeOptions}
                    value={formData.roomType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        roomType: value,
                      }));
                      focusNextInput("roomNo");
                    }}
                    onEnterPress={() => {
                      if (formData.roomType) {
                        focusNextInput("roomNo");
                      }
                    }}
                    placeholder=" "
                    labelText="Room Type"
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
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("roomNo")}
                    id="roomNo"
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("adults")}
                    onCancel={() => setFormData({ ...formData, roomNo: "" })}
                    labelText="Room No"
                    tooltipText="Enter room number (e.g., 101, 201)"
                    required
                    maxLength={10}
                  />
                </div>
              )}
            </div>

            {/* Guest Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.adults && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("adults")}
                    id="adults"
                    name="adults"
                    value={formData.adults.toString()}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setFormData({ ...formData, adults: value });
                    }}
                    onNext={() => focusNextInput("children")}
                    onCancel={() => setFormData({ ...formData, adults: 0 })}
                    labelText="Adults"
                    tooltipText="Enter number of adults"
                    required
                    type="number"
                    min="0"
                    max="10"
                  />
                </div>
              )}

              {permissionsFields.children && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("children")}
                    id="children"
                    name="children"
                    value={formData.children.toString()}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setFormData({ ...formData, children: value });
                    }}
                    onNext={() => focusNextInput("status")}
                    onCancel={() => setFormData({ ...formData, children: 0 })}
                    labelText="Children"
                    tooltipText="Enter number of children"
                    required
                    type="number"
                    min="0"
                    max="10"
                  />
                </div>
              )}

              {permissionsFields.status && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    options={statusOptions}
                    value={formData.status}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        status: value,
                      }));
                      focusNextInput("isActive");
                    }}
                    onEnterPress={() => {
                      if (formData.status) {
                        focusNextInput("isActive");
                      }
                    }}
                    placeholder=" "
                    labelText="Status"
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

              {permissionsFields.isActive && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isActive")(el)}
                    id="isActive"
                    name="isActive"
                    options={["No", "Yes"]}
                    value={formData.isActive ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setFormData((prev) => ({
                        ...prev,
                        isActive: isYes,
                      }));
                      focusNextInput("isDraft");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isActive === true ||
                        formData.isActive === false
                      ) {
                        focusNextInput("isDraft");
                      }
                    }}
                    placeholder=" "
                    labelText="Active"
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

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.remarks && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("remarks")}
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDraft")}
                    onCancel={() => setFormData({ ...formData, remarks: "" })}
                    labelText="Remarks"
                    tooltipText="Enter any additional remarks or notes"
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={isDraftState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
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
