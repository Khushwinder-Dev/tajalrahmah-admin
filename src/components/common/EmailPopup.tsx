import { Group, Modal } from "@mantine/core";
import EditableInput from "./EditableInput";
import FloatingCloseButton from "./FloatingCloseButton"; // Import your FloatingCloseButton component
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import useIsMobile from "@/hooks/useIsMobile";

interface Props {
  emailOpened: boolean;
  closeEmail: () => void;
}

const EmailPopup = ({ emailOpened, closeEmail }: Props) => {
  // Email form state
  const [emailForm, setEmailForm] = useState({
    from: "",
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
  });

  //   PDF or Email
  const [isPDF, setIsPDF] = useState(true);
  const [isExcel, setIsExcel] = useState(false);
  const [isCSV, setIsCSV] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
  const isMobile = useIsMobile();

  const handleClose = () => {
    closeEmail();
    setEmailForm({
      from: "",
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
    });
  };

  return (
    <Modal
      opened={emailOpened}
      onClose={handleClose}
      centered
      size={"lg"}
      radius="lg"
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
          Send Email
        </h2>
        <FloatingCloseButton onClose={handleClose} className="top-0 right-0" />
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex gap-2">
          <EditableInput
            id="email-from"
            name="From"
            type="email"
            readOnly
            labelText="From"
            required
            value={emailForm.from}
            onChange={(e) =>
              setEmailForm((f) => ({ ...f, from: e.target.value }))
            }
          />
          <EditableInput
            id="email-to"
            name="To"
            type="text"
            labelText="To"
            required
            value={emailForm.to}
            onChange={(e) =>
              setEmailForm((f) => ({ ...f, to: e.target.value }))
            }
          />
        </div>
        <div className="flex gap-2">
          <EditableInput
            id="email-cc"
            name="CC"
            type="text"
            labelText="CC"
            value={emailForm.cc}
            onChange={(e) =>
              setEmailForm((f) => ({ ...f, cc: e.target.value }))
            }
          />
          <EditableInput
            id="email-bcc"
            name="BCC"
            type="text"
            labelText="BCC"
            value={emailForm.bcc}
            onChange={(e) =>
              setEmailForm((f) => ({ ...f, bcc: e.target.value }))
            }
          />
        </div>

        <EditableInput
          id="email-subject"
          name="Subject"
          type="text"
          labelText="Subject"
          value={emailForm.subject}
          onChange={(e) =>
            setEmailForm((f) => ({ ...f, subject: e.target.value }))
          }
        />

        {/* Body textarea */}
        <div className="relative w-full z-0 block">
          <textarea
            id="floating_outlined"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer border-2 grid-scroll"
            placeholder=" "
            value={emailForm.body}
            onChange={(e) =>
              setEmailForm((f) => ({ ...f, body: e.target.value }))
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
            className={`${isMobile ? "w-full mt-2" : ""}`}
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
                // TODO: integrate with email API
                console.log("Email payload", emailForm);
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

export default EmailPopup;
