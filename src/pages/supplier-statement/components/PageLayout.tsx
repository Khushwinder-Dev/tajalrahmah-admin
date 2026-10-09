// components/layout/PageLayout.tsx
import type { PopoverOption } from "@/components/common/SplitButton";
import VideoModal from "@/components/common/VideoModal";
import { Button } from "@/components/ui/button";
import FooterSwitch from "@/components/ui/footerSwitch";
import { Minimize2 } from "lucide-react";
import type { ReactNode } from "react";
// import { useState } from "react";
import { Tooltip } from "@mantine/core";

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
// import { Autocomplete } from "./Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useMinimizeAnimation } from "@/hooks/useMinimizeAnimation";
import { cn, getModuleFromPath } from "@/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

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

export default function DPageLayout({
  children,
  title,
  videoSrc,
  videoHeader,
  // onListClick,
  // listText = "List",
  listPath,
  // popoverOptions,
  customHeaderActions,
  keepChanges = false,
  onKeepChangesChange,
  pdfChecked = false,
  onPdfToggle,
  printEnabled = false,
  onPrintToggle,
  onHistoryClick,
  additionalFooterButtons,
  onExport,
  className = "",
  activePage,
  // companyAutoComplete = true,
  scrollBoxClassNames,
  module,
  handleMinimize,
}: PageLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  // const [companyName, setCompanyName] = useState("Rapid ERP Solutions");

  const { isMinimizing } = useMinimizeAnimation({
    duration: 600,
    onComplete: () => {
      // Navigation or other actions after animation completes
      console.log("Minimize animation completed");
    },
  });
  // Automatically detect module from route if not provided
  const detectedModule = module || getModuleFromPath(location.pathname);

  const canCreate = usePermission(detectedModule, "create");
  const canEdit = usePermission(detectedModule, "edit");
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const tabsData = [{ value: "list", label: "List", content: null }];

  const onTabChange = (value: string | undefined) => {
    console.log("Tab changed to:", value);

    if (value === "list") {
      // Check if there's a fromView parameter to restore the previous view mode
      const fromView = searchParams.get("fromView");
      const listUrl = fromView
        ? `/${listPath}?view=${fromView}`
        : `/${listPath}`;
      navigate(listUrl);
    } else if (value === "minimize") {
      handleMinimize?.();
    } else {
      // For create tab - preserve current view mode
      const currentView =
        searchParams.get("view") || searchParams.get("fromView") || "grid";
      navigate(`/${listPath}/create?fromView=${currentView}`);
    }
  };

  return (
    <div className="relative w-[99%] h-full">
      <div
        className={`flex flex-col h-full overflow-hidden border rounded-3xl shadow bg-white dark:bg-gray-900 relative ${className}`}
      >
        <div className="top-0 bg-white dark:bg-gray-900 border-b px-6 py-4 flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center h-fit sm:h-[70px] relative">
          {handleMinimize && (
            <button
              onClick={handleMinimize}
              disabled={isMinimizing}
              className={`absolute top-2 w-8 h-8 flex items-center justify-center rounded hover:bg-sky-50 transition-colors duration-200 z-50 cursor-pointer border-l-[1px] border-b-[1px] border-l-sky-200 border-b-sky-200 ${
                isRTL ? "left-2" : "right-2"
              }`}
              title="Minimize"
            >
              <Minimize2
                className={`w-4 h-4 text-primary ${
                  isMinimizing ? "animate-pulse" : ""
                }`}
              />
            </button>
          )}

          {/* Left side - Title and Video */}
          <div
            className={`flex items-center self-start gap-2 ${
              isRTL ? "order-1" : "order-1"
            }`}
          >
            {videoSrc && (
              <VideoModal src={videoSrc} header={videoHeader || "Video"} />
            )}
            <h1
              className="text-xl font-bold text-primary cursor-pointer capitalize hover:opacity-80 transition-opacity w-max"
              onClick={() => window.location.reload()}
            >
              {title}
            </h1>
          </div>

          {/* Right side - Tabs and Actions */}
          <div
            className={`flex items-center gap-6 ${
              isRTL ? "order-2" : "order-2"
            }`}
          >
            {/* Tab Navigation */}
            <div className="flex items-center gap-16 sm:gap-8">
              {tabsData.map((tab) => {
                if (tab.value === "create" && !canCreate) {
                  return null;
                }
                if (tab.value === "edit" && !canEdit) {
                  return null;
                }

                const isActive = activePage === tab.value;

                return (
                  <div key={tab.value} className="relative cursor-pointer">
                    <button
                      onClick={() => onTabChange(tab.value)}
                      className={`text-lg font-medium font-['Inter'] leading-tight transition-colors cursor-pointer ${
                        isActive
                          ? "text-sky-400"
                          : "text-black/40 hover:text-black/60 dark:text-white/40 dark:hover:text-white/60"
                      }`}
                    >
                      {tab.label}
                    </button>

                    {/* Active indicator line */}
                    {isActive && (
                      <div className="absolute -bottom-[18px] left-1/2 transform -translate-x-1/2 w-11 h-[2px] bg-sky-400 rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Custom Header Actions */}
            <div className="flex items-center">{customHeaderActions}</div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div
          className={cn(
            "flex-1 overflow-y-auto px-6 py-6 space-y-6 relative grid-scroll",
            scrollBoxClassNames
          )}
        >
          {children}
        </div>

        {/* Fixed Bottom Button Bar */}
        <div className="sticky h-[70px] bottom-0 z-30 bg-white dark:bg-gray-900 border-t px-6 max-[435px]:px-2 py-2 max-[435px]:py-4 shadow-sm">
          <div
            className={`flex flex-row justify-between items-center gap-4 max-[435px]:gap-2 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex max-[435px]:gap-2 sm:gap-6 items-center ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {onKeepChangesChange && (
                <div className="flex items-center gap-2">
                  <Tooltip
                    label="Keep"
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
                        label="Keep"
                        imageUrl={
                          keepChanges
                            ? "/one-finger-hold.svg"
                            : "/one-finger-hold.svg"
                        }
                      />
                    </div>
                  </Tooltip>
                </div>
              )}

              {onPdfToggle && (
                <div className="flex items-center gap-2">
                  <Tooltip
                    label="PDF"
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
                        label="PDF"
                        onCheckedChange={onPdfToggle}
                        imageUrl={pdfChecked ? "/pdf.svg" : "/pdf.svg"}
                      />
                    </div>
                  </Tooltip>
                </div>
              )}

              {onPrintToggle && (
                <div className="flex items-center gap-2">
                  <Tooltip
                    label="Print"
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
                        label="Print"
                        imageUrl={printEnabled ? "/print.svg" : "/print.svg"}
                      />
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>

            <div
              className={`flex gap-4 max-[435px]:gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {onHistoryClick && (
                <Button
                  variant="outline"
                  className="gap-2 rounded-full cursor-pointer border-primary w-28 max-[435px]:w-20 bg-primary hover:bg-primary/90 font-semibold! text-white!"
                  onClick={onHistoryClick}
                >
                  <span className="font-semibold">History</span>
                </Button>
              )}
              {onExport && (
                <Button
                  variant="outline"
                  className="gap-2 rounded-full cursor-pointer border-primary w-28 max-[435px]:w-20 bg-primary hover:bg-primary/90 font-semibold! text-white!"
                  onClick={onExport}
                >
                  <span className="font-semibold">Export</span>
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
