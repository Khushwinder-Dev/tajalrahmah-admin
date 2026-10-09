/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import { Button } from "@/components/ui/button";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
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
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import ToggleStatusControls from "@/components/common/create-page-components/ToggleStatusControls";
import StatusDateDisplay from "@/components/common/create-page-components/StatusDateDisplay";

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

  const handlePrintReservation = (reservationData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Reservation Report",
        data: reservationData,
        fieldLabels: {
          name: "Full Name",
          email: "Email Address",
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
      setTimeout(() => handlePrintReservation(formData), 100);
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
                id="reservationNo"
                name="reservationNo"
                className="w-full h-10"
                value={formData.reservationNo}
                onChange={handleChange}
                onNext={() => focusNextInput("customerName")}
                onCancel={() => {}}
                setRef={setRef("reservationNo")}
                tooltipText="Please enter reservation no"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.customerName")}</h3>
              <EditableInput
                id="customerName"
                name="customerName"
                className="w-full h-10"
                value={formData.customerName}
                onChange={handleChange}
                onNext={() => focusNextInput("table")}
                onCancel={() => {}}
                setRef={setRef("customerName")}
                tooltipText="Please enter customer name"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.table")}</h3>
              <EditableInput
                id="table"
                name="table"
                type="text"
                value={formData.table}
                onChange={handleChange}
                onNext={() => focusNextInput("persons")}
                setRef={setRef("table")}
                tooltipText="Please enter table"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.persons")}</h3>
              <EditableInput
                id="persons"
                name="persons"
                type="text"
                value={formData.persons}
                onChange={handleChange}
                onNext={() => focusNextInput("mobile")}
                setRef={setRef("persons")}
                tooltipText="Please enter persons"
                required
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.mobile")}</h3>
              <EditableInput
                id="mobile"
                name="mobile"
                type="text"
                value={formData.mobile}
                onChange={handleChange}
                onNext={() => focusNextInput("phone")}
                setRef={setRef("mobile")}
                tooltipText="Please enter mobile"
                required
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.phone")}</h3>
              <EditableInput
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                onNext={() => focusNextInput("email")}
                setRef={setRef("phone")}
                tooltipText="Please enter phone"
                required
              />
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.email")}</h3>
              <EditableInput
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                onNext={() => focusNextInput("description")}
                setRef={setRef("email")}
                tooltipText="Please enter email"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.description")}</h3>
              <EditableInput
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                onNext={() => focusNextInput("reservationDate")}
                setRef={setRef("description")}
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
                    ref={(el) => setRef("reservationDate")(el as HTMLElement)}
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
                        setTimeout(() => focusNextInput("startTime"), 100);
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
                id="startTime"
                name="startTime"
                className="w-full h-10"
                value={formData.startTime}
                onChange={handleChange}
                onNext={() => focusNextInput("endTime")}
                setRef={setRef("startTime")}
                tooltipText="Please enter start time"
                required
              />
            </div>

            {/* End Time */}
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.endTime")}</h3>
              <EditableInput
                type="time"
                id="endTime"
                name="endTime"
                className="w-full h-10"
                value={formData.endTime}
                onChange={handleChange}
                onNext={() => focusNextInput("isDefault")}
                setRef={setRef("endTime")}
                tooltipText="Please enter end time"
                required
              />
            </div>
          </div>

          {/* Second Row: Default, Draft, Active, Delete */}
          <ToggleStatusControls
            formData={formData}
            setFormData={setFormData}
            focusNextInput={focusNextInput}
            setRef={setRef}
          />

          {/* Third Row: Dates */}
          <StatusDateDisplay formData={formData} />
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
