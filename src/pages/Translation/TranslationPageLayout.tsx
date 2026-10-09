// components/layout/TranslationPageLayout.tsx
import VideoModal from "@/components/common/VideoModal";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

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
  onExport?: () => void;
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
  onSave,
  onReset,
  additionalFooterButtons,
  className = "",
}: TranslationPageLayoutProps) {
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

            {/* Center Section - Module Selection */}
            {/* <div className="flex justify-center items-center flex-1 px-4">
              <Autocomplete
                inputClassName="h-[38px] bg-stone-50"
                className="min-w-[200px] w-full max-w-[300px]"
                id="moduleSelect"
                name="moduleSelect"
                hideCheckMark
                options={moduleOptions}
                value={selectedModuleState}
                onValueChange={handleModuleChange}
                placeholder="Select Module"
                labelText=""
                styles={{
                  input: {
                    borderColor: "var(--primary)",
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
              />
            </div> */}

            {/* Right Section - Custom Tabs and Actions */}
            {/* <div className="flex items-end gap-4 flex-1 justify-end h-full">
              <div className="flex items-end mb-[-16px]">
                {languageTabs.map((tab, index) => {
                  return (
                    <button
                      key={tab.value}
                      onClick={() => {
                        onLanguageChange?.(tab.value);
                      }}
                      className={`
                      relative cursor-pointer px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-200 ease-in-out
                      ${index === 0 ? "rounded-tl-lg" : ""}
                      ${
                        index === languageTabs.length - 1 ? "rounded-tr-lg" : ""
                      }
                      ${
                        activeLanguage === tab.value
                          ? "text-primary"
                          : "text-gray-600"
                      }
                    `}
                    >
                      <span className="whitespace-nowrap">{tab.label}</span>

                      {activeLanguage === tab.value && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center">{customHeaderActions}</div>
            </div> */}
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative">
          {children}
        </div>

        {/* Fixed Bottom Button Bar */}
        <div className="sticky h-[70px] bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-4 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 items-center"></div>

            <div className="flex gap-4">
              {onReset && (
                <Button
                  variant="outline"
                  className="gap-2 rounded-full cursor-pointer border-gray-300 w-32 bg-gray-100 hover:bg-gray-200 font-semibold"
                  onClick={onReset}
                >
                  <span className="hidden sm:inline font-semibold">Reset</span>
                </Button>
              )}
              {onSave && (
                <Button
                  className="gap-2 rounded-full cursor-pointer w-32 bg-primary hover:bg-primary/90 font-semibold text-white"
                  onClick={onSave}
                >
                  <span className="hidden sm:inline font-semibold">Submit</span>
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
