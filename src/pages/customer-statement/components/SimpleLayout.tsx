// components/layout/SimplePageLayout.tsx
import VideoModal from "@/components/common/VideoModal";
import { Button } from "@/components/ui/button";
import { Minimize2, Download } from "lucide-react";
import type { ReactNode } from "react";
import { Tooltip } from "@mantine/core";
import { useMinimizeAnimation } from "@/hooks/useMinimizeAnimation";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface SimplePageLayoutProps {
  children: ReactNode;
  title: string;

  // Header props
  videoSrc?: string;
  videoHeader?: string;
  customHeaderActions?: ReactNode;

  // Export functionality
  onExport?: () => void;
  exportText?: string;

  // Footer props
  keepChanges?: boolean;
  onKeepChangesChange?: (checked: boolean) => void;
  pdfChecked?: boolean;
  onPdfToggle?: (checked: boolean) => void;
  printEnabled?: boolean;
  onPrintToggle?: (checked: boolean) => void;
  onHistoryClick?: () => void;
  additionalFooterButtons?: ReactNode;

  className?: string;
  scrollBoxClassNames?: string;
  handleMinimize?: () => void;
  setShowExport: (value: boolean) => void;
  showExport: boolean;
}

export default function SimplePageLayout({
  children,
  title,
  videoSrc,
  videoHeader,
  customHeaderActions,
  exportText = "Export",
  className = "",
  scrollBoxClassNames,
  handleMinimize,
  setShowExport,
  showExport,
}: SimplePageLayoutProps) {
  const { isMinimizing } = useMinimizeAnimation({
    duration: 600,
    onComplete: () => {
      console.log("Minimize animation completed");
    },
  });

  const { isRTL } = useSelector((state: RootState) => state.language);

  return (
    <div className="relative w-[99%] h-full">
      <div
        className={`flex flex-col h-full overflow-hidden border rounded-3xl shadow bg-white dark:bg-gray-900 relative ${className}`}
      >
        {/* Header */}
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

          {/* Right side - Export Button and Actions */}
          <div
            className={`flex items-center gap-4 ${
              isRTL ? "order-2" : "order-2"
            }`}
          >
            {/* Export Button */}
            <Tooltip
              label="Export data table"
              position="bottom"
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
              <Button
                onClick={() => setShowExport(!showExport)}
                variant="outline"
                className="gap-2 rounded-full cursor-pointer border-primary bg-white! text-primary! hover:bg-primary/5 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="font-semibold">{exportText}</span>
              </Button>
            </Tooltip>

            {/* Custom Header Actions */}
            <div className="flex items-center">{customHeaderActions}</div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div
          className={cn(
            "flex-1 overflow-hidden px-6 py-6 space-y-6 relative",
            scrollBoxClassNames
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
