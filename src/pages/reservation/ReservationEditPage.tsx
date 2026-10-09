/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Trash2, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PDF from "@/components/common/pdf";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  isEdit?: boolean;
};

type ReservationType = {
  reservationNo: string;
  reservationDate: string; // Format: "YYYY-MM-DD"

  customerName: string;

  table: string;
  persons: string;
  startTime: string; // Format: "HH:mm" or "HH:mm A" (e.g. "18:30" or "6:30 PM")
  endTime: string;

  mobile: string;
  phone: string;
  email: string;

  description: string;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  isDeleted: boolean;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
};

const initialData: ReservationType = {
  reservationNo: "RSV1001",
  reservationDate: "2025-07-09",

  customerName: "Rahim Uddin",
  table: "T01",
  persons: "2",
  startTime: "18:30",
  endTime: "20:00",

  mobile: "01710000001",
  phone: "029999001",
  email: "rahim@example.com",
  description: "Near main entrance, window seat.",

  createdAt: new Date("2025-07-05T10:00:00Z"),
  draftedAt: null,
  updatedAt: new Date("2025-07-08T14:00:00Z"),
  deletedAt: null,

  isDeleted: false,
  isDefault: true,
  isActive: true,
  isDraft: false,
};

export default function ReservationCreatePage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const customerNameInputRef = useRef<EditableInputRef>(null);
  const reservationNoInputRef = useRef<EditableInputRef>(null);
  const descriptionInputRef = useRef<EditableInputRef>(null);
  const tableInputRef = useRef<EditableInputRef>(null);
  const personsInputRef = useRef<EditableInputRef>(null);
  const mobileInputRef = useRef<EditableInputRef>(null);
  const emailInputRef = useRef<EditableInputRef>(null);
  const phoneInputRef = useRef<EditableInputRef>(null);
  const startTimeInputRef = useRef<EditableInputRef>(null);
  const endTimeInputRef = useRef<EditableInputRef>(null);

  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const flagUploadRef = useRef<HTMLInputElement>(null);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<ReservationType>({
    reservationNo: "",
    reservationDate: "",

    customerName: "",
    table: "",
    persons: "",
    startTime: "",
    endTime: "",

    mobile: "",
    phone: "",
    email: "",
    description: "",

    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,

    isDeleted: false,
    isDefault: false,
    isActive: true,
    isDraft: false,
  });

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "reservationNo":
        customerNameInputRef.current?.focus();
        break;
      case "customerName":
        tableInputRef.current?.focus();
        break;
      case "table":
        personsInputRef.current?.focus();
        break;
      case "persons":
        mobileInputRef.current?.focus();
        break;
      case "mobile":
        phoneInputRef.current?.focus();
        break;
      case "phone":
        emailInputRef.current?.focus();
        break;
      case "email":
        descriptionInputRef.current?.focus();
        break;
      case "description":
        // Focus on the date picker button first
        document.getElementById("datePickerButton")?.focus();
        break;
      case "reservationDate":
        // After date is selected, move to start time
        startTimeInputRef.current?.focus();
        break;
      case "startTime":
        endTimeInputRef.current?.focus();
        break;
      case "endTime":
        // After end time, move to default switch
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
      case "delete":
        flagUploadRef.current?.focus();
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        reservationNo: "",
        reservationDate: "",

        customerName: "",
        table: "",
        persons: "",
        startTime: "",
        endTime: "",

        mobile: "",
        phone: "",
        email: "",
        description: "",

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

  const handlePrintCountry = (printData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Reservation Report",
        data: printData,
        fieldLabels: {
          reservationNo: "Reservation No",
          reservationDate: "Reservation Date",
          customerName: "Customer Name",
          table: "Table",
          persons: "Persons",
          startTime: "Start Time",
          endTime: "End Time",
          mobile: "Mobile",
          phone: "Phone",
          email: "Email",
          description: "Description",
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
      setTimeout(() => handlePrintCountry(formData), 100);
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
      console.log("reservationData on pdf click", formData);
      const blob = await pdf(
        <PDF
          data={[formData]}
          title="Reservation Details"
          subtitle="Reservation Information Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reservation-details.pdf";
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
        title={
          isEdit ? t("form.editingReservation") : t("form.creatingReservation")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/reservation"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/reservation/create");
              } else {
                // Navigate to edit page
                navigate("/reservation/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/reservation/view");
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
          {/* First Row: Code, Calling Code, Country */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.reservationNo")}</h3>
              <EditableInput
                ref={reservationNoInputRef}
                id="reservationNo"
                name="reservationNo"
                className="w-full h-10"
                value={formData.reservationNo}
                onChange={handleChange}
                onNext={() => focusNextInput("reservationNo")}
                onCancel={() => {}}
                tooltipText="Please enter reservation no"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.customerName")}</h3>
              <EditableInput
                ref={customerNameInputRef}
                id="customerName"
                name="customerName"
                className="w-full h-10"
                value={formData.customerName}
                onChange={handleChange}
                onNext={() => focusNextInput("customerName")}
                onCancel={() => {}}
                tooltipText="Please enter customer name"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.table")}</h3>
              <EditableInput
                ref={tableInputRef}
                id="table"
                name="table"
                className="w-full h-10"
                value={formData.table}
                onChange={handleChange}
                onNext={() => focusNextInput("table")}
                onCancel={() => {}}
                tooltipText="Please enter table"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.persons")}</h3>
              <EditableInput
                ref={personsInputRef}
                id="persons"
                name="persons"
                className="w-full h-10"
                value={formData.persons}
                onChange={handleChange}
                onNext={() => focusNextInput("persons")}
                onCancel={() => {}}
                tooltipText="Please enter persons"
                required
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.mobile")}</h3>
              <EditableInput
                ref={mobileInputRef}
                id="mobile"
                name="mobile"
                className="w-full h-10"
                value={formData.mobile}
                onChange={handleChange}
                onNext={() => focusNextInput("mobile")}
                onCancel={() => {}}
                tooltipText="Please enter mobile"
                required
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.phone")}</h3>
              <EditableInput
                ref={phoneInputRef}
                id="phone"
                name="phone"
                className="w-full h-10"
                value={formData.phone}
                onChange={handleChange}
                onNext={() => focusNextInput("phone")}
                onCancel={() => {}}
                tooltipText="Please enter phone"
                required
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.email")}</h3>
              <EditableInput
                ref={emailInputRef}
                id="email"
                name="email"
                className="w-full h-10"
                value={formData.email}
                onChange={handleChange}
                onNext={() => focusNextInput("email")}
                onCancel={() => {}}
                tooltipText="Please enter email"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.description")}</h3>
              <EditableInput
                ref={descriptionInputRef}
                id="description"
                name="description"
                className="w-full h-10"
                value={formData.description}
                onChange={handleChange}
                onNext={() => focusNextInput("description")}
                onCancel={() => {}}
                tooltipText="Please enter description"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <label
                htmlFor="reservationDate"
                className="block text-sm font-medium"
              >
                {t("form.reservationDate")}
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="datePickerButton"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.reservationDate && "text-muted-foreground"
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        // The popover will open on space/enter
                        // We'll handle the focus after date selection in the onSelect
                      }
                    }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.reservationDate ? (
                      format(new Date(formData.reservationDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.reservationDate
                        ? new Date(formData.reservationDate)
                        : undefined
                    }
                    onSelect={(date) => {
                      if (date) {
                        const formattedDate = format(date, "yyyy-MM-dd");
                        handleChange({
                          target: {
                            name: "reservationDate",
                            value: formattedDate,
                          },
                        } as React.ChangeEvent<HTMLInputElement>);
                        // After date is selected, move focus to start time
                        setTimeout(
                          () => focusNextInput("reservationDate"),
                          100
                        );
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Start Time */}
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.startTime")}</h3>
              <EditableInput
                type="time"
                ref={startTimeInputRef}
                id="startTime"
                name="startTime"
                className="w-full h-10"
                value={formData.startTime}
                onChange={handleChange}
                onNext={() => focusNextInput("startTime")}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    focusNextInput("startTime");
                  }
                }}
                onCancel={() => {}}
                tooltipText="Please enter start time"
                required
              />
            </div>

            {/* End Time */}
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.endTime")}</h3>
              <EditableInput
                type="time"
                ref={endTimeInputRef}
                id="endTime"
                name="endTime"
                className="w-full h-10"
                value={formData.endTime}
                onChange={handleChange}
                onNext={() => focusNextInput("endTime")}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    focusNextInput("endTime");
                  }
                }}
                onCancel={() => {}}
                tooltipText="Please enter end time"
                required
              />
            </div>
          </div>

          {/* Second Row: Default, Draft, Active, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-3 space-y-2">
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
            <div className="md:col-span-3 space-y-2">
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
            <div className="md:col-span-3 space-y-2">
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
            <div className="md:col-span-3 space-y-2">
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

          {/* Third Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Created</h3>
              <p>{getRelativeTime(formData.createdAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{getRelativeTime(formData.updatedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{getRelativeTime(formData.draftedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p>{getRelativeTime(formData.deletedAt)}</p>
            </div>
          </div>
        </form>
      </PageLayout>

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
