// components/layout/PageLayout.tsx
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import VideoModal from "@/components/common/VideoModal";
import FooterSwitch from "@/components/ui/footerSwitch";
import { Autocomplete } from "./Autocomplete";
import { Plus, Edit, Eye, List } from "lucide-react";

interface PageLayoutProps {
  children: ReactNode;
  title: string;

  // Header props
  videoSrc?: string;
  videoHeader?: string;
  customHeaderActions?: ReactNode;

  // Tabs props
  activeTab?: string;
  onTabChange?: (value: string) => void;
  tabsData?: Array<{
    value: string;
    label: string;
    icon?: ReactNode;
    content: ReactNode;
  }>;

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

  className?: string;
}

export default function PageLayout({
  children,
  title,
  videoSrc,
  videoHeader,
  customHeaderActions,
  activeTab = "create",
  onTabChange,
  tabsData = [
    {
      value: "create",
      label: "Create",
      icon: <Plus size={16} />,
      content: null,
    },
    { value: "edit", label: "Edit", icon: <Edit size={16} />, content: null },
    { value: "view", label: "View", icon: <Eye size={16} />, content: null },
    { value: "list", label: "List", icon: <List size={16} />, content: null },
  ],
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
}: PageLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="relative w-[99%] h-full">
      <div
        className={`flex flex-col h-full overflow-hidden border rounded-3xl shadow bg-white dark:bg-gray-800 ${className}`}
      >
        {/* Header with Title, Company Dropdown, and Custom Tabs */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 h-[70px] relative">
          <div className="flex justify-between items-start h-full pt-2">
            {/* Left Section - Title and Video */}
            <div className="flex items-center gap-2 flex-1">
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

            {/* Center Section - Company Dropdown */}
            <div className="flex justify-center items-center flex-1">
              <Autocomplete
                inputClassName="h-[38px]"
                className="min-w-[250px] w-full max-w-[300px]"
                id="isDefault"
                name="isDefault"
                options={["test", "test2"]}
                placeholder=" "
                labelText="Country"
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

            {/* Right Section - Custom Tabs and Actions */}
            <div className="flex items-end gap-4 flex-1 justify-end h-full">
              {/* Custom Tabs positioned at bottom */}
              <div className="flex items-end mb-[-16px]">
                {tabsData.map((tab, index) => (
                  <button
                    key={tab.value}
                    onClick={() => onTabChange?.(tab.value)}
                    className={`
                      relative px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-200 ease-in-out
                      ${index === 0 ? "rounded-tl-lg" : ""}
                      ${index === tabsData.length - 1 ? "rounded-tr-lg" : ""}
                      ${
                        activeTab === tab.value
                          ? "text-primary bg-blue-50"
                          : "text-gray-600 hover:text-primary hover:bg-gray-50"
                      }
                    `}
                  >
                    {/* Icon on left */}
                    <span
                      className={`transition-colors duration-200 ${
                        activeTab === tab.value
                          ? "text-primary"
                          : "text-gray-500"
                      }`}
                    >
                      {tab.icon}
                    </span>

                    {/* Label on right */}
                    <span className="whitespace-nowrap">{tab.label}</span>

                    {/* Active tab bottom border - extends to header border */}
                    {activeTab === tab.value && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Header Actions */}
              <div className="flex items-center">{customHeaderActions}</div>
            </div>
          </div>

          {/* Single border bottom for the entire header */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>

        {/* Scrollable Content Section with Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {tabsData.map((tab) => (
            <div
              key={tab.value}
              className={`px-6 py-6 space-y-6 h-full ${
                activeTab === tab.value ? "block" : "hidden"
              }`}
            >
              {tab.content || children}
            </div>
          ))}
        </div>

        {/* Fixed Bottom Button Bar */}
        <div className="sticky h-[70px] bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-4 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 items-center">
              {onKeepChangesChange && (
                <FooterSwitch
                  checked={keepChanges}
                  onCheckedChange={onKeepChangesChange}
                  label={t("button.keep")}
                />
              )}

              {onPdfToggle && (
                <div className="flex items-center gap-2">
                  <FooterSwitch
                    checked={pdfChecked}
                    label={t("button.pdf")}
                    onCheckedChange={onPdfToggle}
                  />
                </div>
              )}

              {onPrintToggle && (
                <div className="flex items-center gap-2">
                  <FooterSwitch
                    checked={printEnabled}
                    onCheckedChange={onPrintToggle}
                    label={t("button.print")}
                  />
                </div>
              )}
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
