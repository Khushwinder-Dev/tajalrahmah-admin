// components/layout/TranslationPageLayout.tsx
import VideoModal from "@/components/common/VideoModal";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  FileText,
  Printer,
  FileSpreadsheet,
  FileType,
  Download,
  ChevronDown,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface TranslationPageLayoutProps {
  children: ReactNode;
  title: string;

  // Header props
  videoSrc?: string;
  videoHeader?: string;
  customHeaderActions?: ReactNode;

  // Footer props
  keepChanges?: boolean;
  onKeepChangesChange?: (checked: boolean) => void;
  onSave?: () => void;
  onReset?: () => void;
  additionalFooterButtons?: ReactNode;
  onExport?: (format: "pdf" | "print" | "csv" | "excel" | "doc") => void;
  onImport?: () => void;
  activeLanguage?: "bangla" | "arabic" | "urdu" | "hindi" | string;
  onLanguageChange?: (language: string) => void;
  selectedModule?: string;
  onModuleChange?: (module: string) => void;
  className?: string;
}

export default function TranslationPageLayout({
  children,
  title,
  videoSrc,
  videoHeader,
  onExport,
  className = "",
}: TranslationPageLayoutProps) {
  const [isExportPopoverOpen, setIsExportPopoverOpen] = useState(false);

  const exportOptions = [
    {
      key: "pdf" as const,
      label: "PDF",
      icon: <FileText size={16} className="text-red-600" />,
      description: "Portable Document Format",
    },
    {
      key: "print" as const,
      label: "Print",
      icon: <Printer size={16} className="text-gray-600" />,
      description: "Print document",
    },
    {
      key: "csv" as const,
      label: "CSV",
      icon: <FileSpreadsheet size={16} className="text-green-600" />,
      description: "Comma Separated Values",
    },
    {
      key: "excel" as const,
      label: "Excel",
      icon: <FileSpreadsheet size={16} className="text-green-700" />,
      description: "Microsoft Excel format",
    },
    {
      key: "doc" as const,
      label: "Word",
      icon: <FileType size={16} className="text-blue-600" />,
      description: "Microsoft Word document",
    },
  ];

  const handleExportClick = (
    format: "pdf" | "print" | "csv" | "excel" | "doc"
  ) => {
    onExport?.(format);
    setIsExportPopoverOpen(false);
  };

  return (
    <div className="relative w-[99%] h-full">
      <div
        className={`flex flex-col h-full overflow-hidden border rounded-3xl shadow bg-white dark:bg-gray-800 relative ${className}`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 h-[70px]">
          <div className="flex justify-between items-center h-full">
            {/* Left Section - Title */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Video Modal */}
              {videoSrc && (
                <VideoModal src={videoSrc} header={videoHeader || "Video"} />
              )}
              <h1
                className="text-xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
                onClick={() => window.location.reload()}
              >
                {title}
              </h1>
            </div>

            {/* Right Section - Export Button */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Export Button with Popover */}
              <Popover
                open={isExportPopoverOpen}
                onOpenChange={setIsExportPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center gap-2 px-8! py-6! bg-primary hover:bg-primary/80 text-white rounded-full"
                  >
                    <Download size={16} />
                    <span>Export</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        isExportPopoverOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-64 p-0"
                  align="end"
                  side="bottom"
                  sideOffset={8}
                >
                  <div className="p-2">
                    <div className="text-xs font-medium text-muted-foreground px-3 py-2 border-b">
                      Export Options
                    </div>

                    <div className="mt-2 space-y-1">
                      {exportOptions.map((option) => (
                        <button
                          key={option.key}
                          onClick={() => handleExportClick(option.key)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-150 text-left"
                        >
                          <div className="flex-shrink-0">{option.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">
                              {option.label}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {option.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative">
          {children}
        </div>
      </div>
    </div>
  );
}
