import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  List,
  Grid3X3,
  Import,
  Download,
  Filter,
  Mic,
  Search,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface LeftButton {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  visible?: boolean;
}

interface RightButton {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  visible?: boolean;
}

interface PageHeaderProps {
  // Search props
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  showMicButton?: boolean;
  onMicClick?: () => void;

  // Left buttons props
  leftButtons?: LeftButton[];
  showViewModeButtons?: boolean;
  currentViewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  showImportButton?: boolean;
  onImportClick?: () => void;

  // Right buttons props
  rightButtons?: RightButton[];
  showExportButton?: boolean;
  isExportActive?: boolean;
  onExportClick?: () => void;
  showFilterButton?: boolean;
  isFilterActive?: boolean;
  onFilterClick?: () => void;

  // General props
  className?: string;
}

export default function PageHeader({
  // Search props
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  showMicButton = true,
  onMicClick,

  // Left buttons props
  leftButtons = [],
  showViewModeButtons = true,
  currentViewMode = "grid",
  onViewModeChange,
  showImportButton = true,
  onImportClick,

  // Right buttons props
  rightButtons = [],
  showExportButton = true,
  isExportActive = false,
  onExportClick,
  showFilterButton = true,
  isFilterActive = false,
  onFilterClick,

  // General props
  className = "",
}: PageHeaderProps) {
  const { t } = useTranslation();

  const handleMicClick = () => {
    if (onMicClick) {
      onMicClick();
    } else {
      console.log("Microphone clicked");
    }
  };

  const handleViewModeClick = (mode: "grid" | "list") => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  const handleImportClick = () => {
    if (onImportClick) {
      onImportClick();
    } else {
      console.log("Import clicked");
    }
  };

  const handleExportClick = () => {
    if (onExportClick) {
      onExportClick();
    } else {
      console.log("Export clicked");
    }
  };

  const handleFilterClick = () => {
    if (onFilterClick) {
      onFilterClick();
    } else {
      console.log("Filter clicked");
    }
  };

  return (
    <div
      className={`sticky top-0 z-50 bg-white dark:bg-gray-900 pb-2 ${className}`}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Left buttons section */}
        <div className="col-span-4 flex items-center gap-2">
          {/* View Mode Buttons */}
          {showViewModeButtons && (
            <>
              <Button
                variant={currentViewMode === "grid" ? "default" : "outline"}
                className="gap-2 cursor-pointer"
                onClick={() => handleViewModeClick("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
              </Button>
              <Button
                variant={currentViewMode === "list" ? "default" : "outline"}
                className="gap-2 cursor-pointer"
                onClick={() => handleViewModeClick("list")}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
            </>
          )}

          {/* Import Button */}
          {showImportButton && (
            <Button
              variant="outline"
              className="gap-2 cursor-pointer"
              onClick={handleImportClick}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>
          )}

          {/* Custom Left Buttons */}
          {leftButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              className="gap-2 cursor-pointer"
              onClick={button.onClick}
              style={{ display: button.visible === false ? "none" : "flex" }}
            >
              {button.icon}
              <span className="hidden sm:inline">{button.label}</span>
            </Button>
          ))}
        </div>

        {/* Search section */}
        <div className="col-span-4 flex justify-center">
          <div className="w-full max-w-md">
            <div className="relative flex items-center rounded-full">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-9 pr-9 w-full rounded-full"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {showMicButton && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0"
                  onClick={handleMicClick}
                >
                  <Mic className="h-4 w-4 text-blue-400" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right buttons section */}
        <div className="col-span-4 flex items-center justify-end gap-2">
          {/* Export Button */}
          {showExportButton && (
            <Button
              variant="outline"
              className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
                isExportActive ? "bg-blue-400 text-white" : ""
              }`}
              onClick={handleExportClick}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.export")}</span>
            </Button>
          )}

          {/* Filter Button */}
          {showFilterButton && (
            <Button
              variant="outline"
              className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
                isFilterActive ? "bg-blue-400 text-white" : ""
              }`}
              onClick={handleFilterClick}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.filters")}</span>
            </Button>
          )}

          {/* Custom Right Buttons */}
          {rightButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
                button.isActive ? "bg-blue-400 text-white" : ""
              }`}
              onClick={button.onClick}
              style={{ display: button.visible === false ? "none" : "flex" }}
            >
              {button.icon}
              <span className="hidden sm:inline">{button.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
