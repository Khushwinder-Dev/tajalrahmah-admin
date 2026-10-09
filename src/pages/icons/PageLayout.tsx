// components/layout/PageLayout.tsx
import type { PopoverOption } from "@/components/common/SplitButton";
import VideoModal from "@/components/common/VideoModal";
import { Button } from "@/components/ui/button";
import { Minimize2 } from "lucide-react";
import type { ReactNode } from "react";

import { useLocation } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useMinimizeAnimation } from "@/hooks/useMinimizeAnimation";
import { cn, getModuleFromPath } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  title: string;

  // Header props
  videoSrc?: string;
  videoHeader?: string;
  onListClick?: () => void;
  listText?: string;
  listPath: string;
  popoverOptions: Array<PopoverOption>;
  customHeaderActions?: ReactNode;

  // Footer props
  keepChanges?: boolean;
  onKeepChangesChange?: (checked: boolean) => void;
  pdfChecked?: boolean;
  onPdfToggle?: (checked: boolean) => void;
  printEnabled?: boolean;
  onPrintToggle?: (checked: boolean) => void;
  onHistoryClick?: () => void;
  additionalFooterButtons?: ReactNode;
  onExport?: () => void;
  activePage?: "edit" | "view" | "create" | "list";
  className?: string;
  companyAutoComplete?: boolean;
  scrollBoxClassNames?: string;
  module?: string;
  moduleId?: string;
  moduleName?: string;
  moduleRoute?: string;
  handleMinimize?: () => void;
}

export default function PageLayout({
  children,
  title,
  videoSrc,
  videoHeader,
  customHeaderActions,
  // keepChanges = false,
  // onKeepChangesChange,
  // pdfChecked = false,
  // onPdfToggle,
  // printEnabled = false,
  // onPrintToggle,
  onHistoryClick,
  additionalFooterButtons,
  onExport,
  className = "",
  scrollBoxClassNames,
  module,
  handleMinimize,
}: PageLayoutProps) {
  const location = useLocation();

  const { isMinimizing } = useMinimizeAnimation({
    duration: 600,
    onComplete: () => {
      // Navigation or other actions after animation completes
      console.log("Minimize animation completed");
    },
  });
  // Automatically detect module from route if not provided
  const detectedModule = module || getModuleFromPath(location.pathname);
  console.log("detectedModule", detectedModule);

  const canEdit = usePermission(detectedModule, "edit");
  console.log("Detected module:", detectedModule);
  console.log("canEdit:", canEdit);

  return (
    <div className="relative w-[99%] h-full">
      <div
        className={`flex flex-col h-full overflow-hidden border rounded-3xl shadow bg-white dark:bg-gray-800 relative ${className}`}
      >
        {/* Header */}
        {/* bg-[#c3d1f9] */}
        {/* <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center h-[70px]"> */}
        <div className="top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center h-[70px] relative">
          {handleMinimize && (
            <button
              onClick={handleMinimize}
              disabled={isMinimizing}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded hover:bg-sky-50 transition-colors duration-200 z-50 cursor-pointer border-l-[1px] border-b-[1px] border-l-sky-200 border-b-sky-200"
              title="Minimize"
            >
              <Minimize2
                className={`w-4 h-4 text-primary ${
                  isMinimizing ? "animate-pulse" : ""
                }`}
              />
            </button>
          )}
          <div className="flex items-center gap-2">
            {/* Video Modal */}
            {videoSrc && (
              <VideoModal src={videoSrc} header={videoHeader || "Video"} />
            )}
            <h1
              className="text-xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity w-max"
              onClick={() => window.location.reload()}
            >
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Split Button or Custom Actions */}
            {/* {(onListClick || popoverOptions) && (
              <div className="flex items-center">
                <SplitButton
                  onListClick={onListClick}
                  listText={listText}
                  listPath={listPath}
                  popoverOptions={popoverOptions}
                />
              </div>
            )} */}

            {/* Custom Header Actions */}
            {/* {customHeaderActions} */}

            {/* Right Section - Custom Tabs and Actions */}
            <div className="flex items-end gap-4 flex-1 justify-end h-full">
              {/* Custom Tabs positioned at bottom */}
              <div className="flex items-end mb-[-16px]"></div>

              {/* Custom Header Actions */}
              <div className="flex items-center">{customHeaderActions}</div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div
          className={cn(
            "flex-1 overflow-y-auto px-6 py-6 space-y-6 relative",
            scrollBoxClassNames
          )}
        >
          {children}
        </div>

        {/* Fixed Bottom Button Bar */}
        <div className="sticky h-[70px] bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-2 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 items-center">
              {/* {onKeepChangesChange && (
                <div className="flex items-center gap-2">
                  <Tooltip
                    label="Stay on this page"
                    position="top"
                    arrowSize={8}
                    withArrow
                    styles={{
                      tooltip: {
                        fontSize: "14px",
                        padding: "8px 12px",
                        backgroundColor: "#374151",
                        color: "white",
                        borderRadius: "6px",
                        fontWeight: "500",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                      arrow: {
                        backgroundColor: "#374151",
                      },
                    }}
                  >
                    <div>
                      <FooterSwitch
                        checked={keepChanges}
                        onCheckedChange={onKeepChangesChange}
                        ariaLabel="Stay on this page"
                        icon={<File size={20} />}
                      />
                    </div>
                  </Tooltip>
                </div>
              )}

              {onPdfToggle && (
                <div className="flex items-center gap-2">
                  <Tooltip
                    label="Enable PDF on Submit"
                    position="top"
                    arrowSize={8}
                    withArrow
                    styles={{
                      tooltip: {
                        fontSize: "14px",
                        padding: "8px 12px",
                        backgroundColor: "#374151",
                        color: "white",
                        borderRadius: "6px",
                        fontWeight: "500",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                      arrow: {
                        backgroundColor: "#374151",
                      },
                    }}
                  >
                    <div>
                      <FooterSwitch
                        checked={pdfChecked}
                        ariaLabel="Enable PDF on Submit"
                        icon={<File size={20} />}
                        // label={t("button.pdf")}
                        onCheckedChange={onPdfToggle}
                      />
                    </div>
                  </Tooltip>
                </div>
              )}

              {onPrintToggle && (
                <div className="flex items-center gap-2">
                  <Tooltip
                    label="Enable print on Submit"
                    position="top"
                    arrowSize={8}
                    withArrow
                    styles={{
                      tooltip: {
                        fontSize: "14px",
                        padding: "8px 12px",
                        backgroundColor: "#374151",
                        color: "white",
                        borderRadius: "6px",
                        fontWeight: "500",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                      arrow: {
                        backgroundColor: "#374151",
                      },
                    }}
                  >
                    <div>
                      <FooterSwitch
                        checked={printEnabled}
                        onCheckedChange={onPrintToggle}
                        ariaLabel="Enable print on Submit"
                        icon={<Printer size={20} />}
                      />
                    </div>
                  </Tooltip>
                </div>
              )} */}
            </div>

            <div className="flex gap-4">
              {onHistoryClick && (
                <Button
                  variant="outline"
                  className="gap-2 rounded-full cursor-pointer border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!"
                  onClick={onHistoryClick}
                >
                  <span className="hidden sm:inline font-semibold">
                    History
                  </span>
                </Button>
              )}
              {onExport && (
                <Button
                  variant="outline"
                  className="gap-2 rounded-full cursor-pointer border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!"
                  onClick={onExport}
                >
                  <span className="hidden sm:inline font-semibold">Export</span>
                </Button>
              )}
              {additionalFooterButtons}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
