// components/layout/PageLayout.tsx
import VideoModal from "@/components/common/VideoModal";
import { List, Plus } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface PermissionCreatePageLayoutProps {
  children: ReactNode;
  title: string;

  // Header props
  videoSrc?: string;
  videoHeader?: string;
  listPath: string;
  customHeaderActions?: ReactNode;

  // Footer props
  additionalFooterButtons?: ReactNode;
  activePage?: "edit" | "view" | "create" | "list";
  className?: string;
  scrollBoxClassNames?: string;
}

export default function PermissionCreatePageLayout({
  children,
  title,
  videoSrc,
  videoHeader,

  listPath,

  customHeaderActions,
  additionalFooterButtons,
  className = "",
  activePage,
  scrollBoxClassNames,
}: PermissionCreatePageLayoutProps) {
  const navigate = useNavigate();

  const tabsData = [
    {
      value: "create",
      label: "Add",
      icon: <Plus size={16} />,
      content: null,
    },
    { value: "list", label: "List", icon: <List size={16} />, content: null },
  ];

  const onTabChange = (value: string) => {
    // Navigation will be handled in useEffect to avoid double navigation
    if (value === "list") {
      navigate(`/${listPath}`);
    }
  };

  return (
    <div className="relative w-[99%] h-full">
      <div
        className={`flex flex-col h-full overflow-hidden border rounded-3xl shadow bg-white dark:bg-gray-800 relative ${className}`}
      >
        {/* Header */}
        {/* bg-[#c3d1f9] */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center h-[70px]">
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
            {/* Right Section - Custom Tabs and Actions */}
            <div className="flex items-end gap-4 flex-1 justify-end h-full">
              {/* Custom Tabs positioned at bottom */}
              <div className="flex items-end mb-[-16px]">
                {tabsData.map((tab, index) => {
                  return (
                    <button
                      key={tab.value}
                      onClick={() => {
                        onTabChange(tab.value);
                      }}
                      className={`
                      relative cursor-pointer px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-200 ease-in-out
                      ${index === 0 ? "rounded-tl-lg" : ""}
                      ${index === tabsData.length - 1 ? "rounded-tr-lg" : ""}
                      ${
                        activePage === tab.value
                          ? "text-primary"
                          : "text-gray-600"
                      }
                    `}
                    >
                      {/* Label on right */}
                      <span className="whitespace-nowrap">{tab.label}</span>

                      {/* Active tab bottom border - extends to header border */}
                      {activePage === tab.value && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                      )}
                    </button>
                  );
                })}
              </div>

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
        <div className="sticky h-[70px] bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-4 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-4 justify-end w-full">
              {additionalFooterButtons}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
