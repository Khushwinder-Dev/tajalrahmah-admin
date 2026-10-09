/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Autocomplete } from "@/components/common/Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
// import { se } from "date-fns/locale";
// import { de } from "date-fns/locale";

type RoomsData = {
  roomType: string;
  roomSize: string;
  roomSizeName: string;
  capacity: string;
  extraCapacity: string;
  rate: string;
  bedCharge: string;
  personalCharges: string;
  review: string;
  description: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: RoomsData = {
  roomType: "Deluxe Suite",
  roomSize: "350",
  roomSizeName: "sq ft",
  capacity: "2",
  extraCapacity: "1",
  rate: "4500",
  bedCharge: "500",
  personalCharges: "300",
  review: "Excellent room with sea view",
  description:
    "Spacious deluxe suite with modern amenities, a king-size bed, and a private balcony.",
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

const roomSizeOptions = [
  { value: "Single", label: "Single" },
  { value: "Double", label: "Double" },
  { value: "Triple", label: "Triple" },
  { value: "Quad", label: "Quad" },
  { value: "Queen", label: "Queen" },
  { value: "King", label: "King" },
  { value: "Suite", label: "Suite" },
];

export default function RoomsEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const [keepCreating, setKeepCreating] = useState(false);

  // const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No" | string>("No");
  const [isDeletedState, setIsDeletedState] = useState<
    "Delete" | "Restore" | string
  >("");

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<RoomsData>({
    roomType: "Deluxe Suite",
    roomSize: "350",
    roomSizeName: "sq ft",
    capacity: "2",
    extraCapacity: "1",
    rate: "4500",
    bedCharge: "500",
    personalCharges: "300",
    review: "Excellent room with sea view",
    description:
      "Spacious deluxe suite with modern amenities, a king-size bed, and a private balcony.",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    rating: 3,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // get permission
  const canPdf: boolean = usePermission("rooms", "pdf");
  const canPrint: boolean = usePermission("rooms", "print");
  const canEdit: boolean = usePermission("rooms", "edit");
  const isDefault: boolean = usePermission(
    "rooms",
    "create",
    "isDefault"
  );
  const isDraft: boolean = usePermission("rooms", "create", "isDraft");

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

      setIsDefaultState(initialData.isDefault ? labels.yes : labels.no);
    }
  }, [isEdit, initialData, labels]);

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
    // Normal submit logic here (API call)

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintRoomSize(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("title");
    } else {
      navigate("/rooms");
    }
    toastSuccess("Rooms Edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      roomType: "",
      roomSize: "",
      roomSizeName: "",
      capacity: "",
      extraCapacity: "",
      rate: "",
      bedCharge: "",
      personalCharges: "",
      review: "",
      description: "",
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
    setIsDefaultState(labels.no);
    setIsDeletedState("");
    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["roomType"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintRoomSize = (RoomsData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "RoomSize Details",
        data: [RoomsData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          roomType: "Room Type",
          roomSize: "Room Size",
          roomSizeName: "Room Size Name",
          description: "Description",
          isDefault: labels.default,
          isActive: "Active Status",
          isDraft: labels.draft,
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
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("RoomsData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Rooms Details"
          subtitle="Rooms Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "RoomSize-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

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
          navigate("/rooms/create");
        } else {
          navigate("/rooms/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/rooms/view");
      },
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
            label: labels.draft,
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("RoomSize saved as draft successfully");
            },
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, labels]);

  return (
    <>
      <PageLayout
        title={isEdit ? labels.editingRooms : labels.creatingRooms}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="rooms"
        activePage="edit"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        additionalFooterButtons={
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
              className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold! focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:transform focus:scale-105 focus:transition-all focus:duration-300`}
              onClick={() => formRef.current?.requestSubmit()}
            >
              {labels.submit}
            </Button>
          </div>
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
            {/* First Row: Code, Calling Code, Country */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("roomSize")}
                    id="roomSize"
                    name="roomSize"
                    value={formData.roomSize}
                    onChange={handleChange}
                    onNext={() => focusNextInput("roomSizeName")}
                    onCancel={() => setFormData({ ...formData, roomSize: "" })}
                    labelText={labels.roomSizeTooltip}
                    tooltipText={labels.roomSizeTooltip}
                    required
                  />
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("roomSizeName")(el)}
                    id="roomSizeName"
                    name="roomSizeName"
                    allowCustomInput={true}
                    options={roomSizeOptions}
                    value={formData.roomSizeName}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, roomSizeName: value });
                      if (value) {
                        focusNextInput("capacity");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.roomSizeName) {
                        focusNextInput("capacity");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.roomSizeNameTooltip}
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
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("capacity")}
                    id="capacity"
                    name="capacity"
                    value={formData.capacity ? formData.capacity : ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("extraCapacity")}
                    onCancel={() => setFormData({ ...formData, capacity: "" })}
                    labelText={labels.capacityTooltip}
                    tooltipText={labels.capacityTooltip}
                    required
                    type="number"
                  />
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("extraCapacity")}
                    id="extraCapacity"
                    name="extraCapacity"
                    value={formData.extraCapacity ? formData.extraCapacity : ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("rate")}
                    onCancel={() =>
                      setFormData({ ...formData, extraCapacity: "" })
                    }
                    labelText={labels.extraCapacityTooltip}
                    tooltipText={labels.extraCapacityTooltip}
                    required
                    type="number"
                  />
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("rate")}
                    id="rate"
                    name="rate"
                    value={formData.rate ? formData.rate : ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("bedCharge")}
                    onCancel={() => setFormData({ ...formData, rate: "" })}
                    labelText={labels.rateTooltip}
                    tooltipText={labels.rateTooltip}
                    required
                    type="number"
                  />
                </div>
              )}
              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("bedCharge")}
                    id="bedCharge"
                    name="bedCharge"
                    value={formData.bedCharge ? formData.bedCharge : ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("personalCharges")}
                    onCancel={() => setFormData({ ...formData, bedCharge: "" })}
                    labelText={labels.bedChargeTooltip}
                    tooltipText={labels.bedChargeTooltip}
                    required
                    type="number"
                  />
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("personalCharges")}
                    id="personalCharges"
                    name="personalCharges"
                    value={
                      formData.personalCharges ? formData.personalCharges : ""
                    }
                    onChange={handleChange}
                    onNext={() => focusNextInput("review")}
                    onCancel={() =>
                      setFormData({ ...formData, personalCharges: "" })
                    }
                    labelText={labels.personalChargeTooltip}
                    tooltipText={labels.personalChargeTooltip}
                    required
                    type="number"
                  />
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("review")}
                    id="review"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, review: "" })}
                    labelText={labels.reviewTooltip}
                    tooltipText={labels.reviewTooltip}
                    required
                  />
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
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
                      focusNextInput("isDeleted");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("isDeleted");
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
              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isDeleted")(el)}
                  id="isDeleted"
                  name="isDeleted"
                  labelText="Deleted"
                  isSelectableOnly={true}
                  options={["Delete", "Restore"]}
                  value={isDeletedState}
                  onValueChange={(value: "Delete" | "Restore") => {
                    if (value === "Delete" || value === "Restore") {
                      setIsDeletedState(value);
                      const newValue = value === "Delete";
                      setFormData((prev) => ({
                        ...prev,
                        isDeleted: newValue,
                      }));
                    }
                  }}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      focusNextInput("title");
                    }
                  }}
                  placeholder=" "
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
