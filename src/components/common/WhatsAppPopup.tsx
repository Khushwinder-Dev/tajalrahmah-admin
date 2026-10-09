import { Group, Modal } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import EditableInput from "./EditableInput";
import FloatingCloseButton from "./FloatingCloseButton"; // Import your FloatingCloseButton component

import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import useIsMobile from "@/hooks/useIsMobile";

type Props = {
  closeWhatsapp: () => void;
  whatsappOpened: boolean;
};

const whatsAppData = [
  { value: "rashed", label: "Rashed", phone: "+8801711111111" },
  { value: "someone", label: "Someone", phone: "+87687098987" },
  { value: "johncena", label: "John Cena", phone: "+676767667" },
  { value: "king", label: "King", phone: "+88017732765" },
];

const WhatsAppPopup = ({ closeWhatsapp, whatsappOpened }: Props) => {
  //   PDF or Email
  const [isPDF, setIsPDF] = useState(true);
  const [isExcel, setIsExcel] = useState(false);
  const [isCSV, setIsCSV] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
  const isMobile = useIsMobile();

  // WhatsApp form state
  const [whatsappForm, setWhatsappForm] = useState<{
    from: string;
    to: string[];
    body: string;
  }>({
    from: "+8801711111111",
    to: ["rashed"],
    body: `    URL : https://pms.rapidsmartautomotive.com/download/invoice/2
    Invoice Number : 2
    Total Before Discount: 10,000.00 SAR
    Discount $: 0.00
    Total After Discount: 10,000.00 SAR
    Total VAT: 1,500.00 SAR
    Net Total: 11,500.00 SAR`,
  });

  const handleClose = () => {
    closeWhatsapp();
    setWhatsappForm({
      from: "",
      to: [],
      body: "",
    });
  };

  return (
    <Modal
      opened={whatsappOpened}
      onClose={handleClose}
      centered
      radius="lg"
      size="lg"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      withCloseButton={false} // Remove default close button
      title={null} // Remove default title
    >
      {/* Custom Header */}
      <div className="relative mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-start">
          Send WhatsApp Message
        </h2>
        <FloatingCloseButton onClose={handleClose} className="top-0 right-0" />
      </div>

      <div className="space-y-2 mt-4">
        <EditableInput
          id="wa-from"
          name="From"
          type="text"
          labelText="From"
          readOnly
          value={whatsappForm.from}
          onChange={(e) =>
            setWhatsappForm((f) => ({ ...f, from: e.target.value }))
          }
        />

        <FloatingMultiSelectCustom />
        {/* Body textarea */}
        <div className="relative w-full z-0 mt-8 block">
          <textarea
            id="floating_outlined"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer border-2 grid-scroll"
            placeholder=" "
            value={whatsappForm.body}
            onChange={(e) =>
              setWhatsappForm((f) => ({ ...f, body: e.target.value }))
            }
            rows={4}
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Body
          </label>
        </div>

        <div
          className={`flex items-end mt-4 ${
            isMobile ? "flex-col" : "flex-row justify-between items-center"
          }`}
        >
          <div
            className={`flex gap-2 items-center ${
              isMobile ? "justify-between w-full" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <p>PDF</p>
              <div
                className={cn(
                  "w-[36px] h-4 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 cursor-pointer",
                  isPDF ? "bg-sky-400 justify-end" : "bg-sky-200 justify-start"
                )}
                onClick={() => setIsPDF(!isPDF)}
              >
                <div className="w-4.5 h-4.5 bg-gray-50 rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.25)] transition-all duration-200" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p>Excel</p>
              <div
                className={cn(
                  "w-[36px] h-4 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 cursor-pointer",
                  isExcel
                    ? "bg-sky-400 justify-end"
                    : "bg-sky-200 justify-start"
                )}
                onClick={() => setIsExcel(!isExcel)}
              >
                <div className="w-4.5 h-4.5 bg-gray-50 rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.25)] transition-all duration-200" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p>CSV</p>
              <div
                className={cn(
                  "w-[36px] h-4 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 cursor-pointer",
                  isCSV ? "bg-sky-400 justify-end" : "bg-sky-200 justify-start"
                )}
                onClick={() => setIsCSV(!isCSV)}
              >
                <div className="w-4.5 h-4.5 bg-gray-50 rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.25)] transition-all duration-200" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p>Doc</p>
              <div
                className={cn(
                  "w-[36px] h-4 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 cursor-pointer",
                  isDoc ? "bg-sky-400 justify-end" : "bg-sky-200 justify-start"
                )}
                onClick={() => setIsDoc(!isDoc)}
              >
                <div className="w-4.5 h-4.5 bg-gray-50 rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.25)] transition-all duration-200" />
              </div>
            </div>
          </div>

          <Group
            justify="flex-end"
            mt="md"
            className={`${isMobile ? "mt-2 w-full" : ""}`}
          >
            <Button
              variant="outline"
              className={`cursor-pointer border border-primary hover:text-white hover:bg-primary bg-white text-primary! ${
                isMobile ? "w-32" : "min-w-[60px]"
              }`}
              onClick={handleClose}
            >
              Reset
            </Button>
            <Button
              className={`cursor-pointer border border-primary hover:text-white hover:bg-primary bg-white text-primary! ${
                isMobile ? "w-32" : "min-w-[60px]"
              }`}
              onClick={() => {
                // TODO: integrate with WhatsApp API
                console.log("WhatsApp payload", whatsappForm);
                handleClose();
              }}
            >
              Send
            </Button>
          </Group>
        </div>
      </div>
    </Modal>
  );
};

export default WhatsAppPopup;

function FloatingMultiSelectCustom() {
  const [selected, setSelected] = useState<string[]>(["rashed"]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const toggleSelect = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        onClick={() => setOpen(true)}
        tabIndex={0}
        className={`min-h-[50px] px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
        rounded-lg border border-gray-300 appearance-none 
        dark:text-white dark:border-gray-600 
        focus:outline-none focus:ring-0 focus:border-primary peer flex flex-wrap gap-1 cursor-text`}
      >
        {selected.length === 0 && (
          <span className="text-gray-400 text-sm mt-1">Select To...</span>
        )}

        {selected.map((value) => {
          const item = whatsAppData.find((o) => o.value === value);
          return (
            <div
              key={value}
              className="relative group bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center gap-1 cursor-default"
            >
              {item?.label}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent closing when removing
                  toggleSelect(value);
                }}
                className="ml-1 cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>

              {/* Tooltip */}
              <div
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                  transition bg-gray-900 text-white text-xs z-50 rounded-md px-2 py-1 whitespace-nowrap"
              >
                {item?.phone}
              </div>
            </div>
          );
        })}

        {open && selected.length > 0 && (
          <X
            size={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => setSelected([])}
          />
        )}
      </div>

      {/* Floating label */}
      <label
        htmlFor="floating_outlined"
        className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
          -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 
          peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
          peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
          peer-focus:-translate-y-4 start-1`}
      >
        To
      </label>

      {/* Dropdown (only when open) */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 border border-gray-200 rounded-lg shadow bg-white max-h-40 overflow-y-auto grid-scroll z-50">
          {whatsAppData.map((option) => (
            <div
              key={option.value}
              onClick={() => toggleSelect(option.value)}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-100 flex items-center gap-1 ${
                selected.includes(option.value) ? "bg-blue-50" : ""
              }`}
            >
              {selected.includes(option.value) ? <Check size={14} /> : ""}{" "}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
