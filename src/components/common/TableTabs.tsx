/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Archive,
  Trash2,
  Edit,
  Eye,
  Settings,
  CheckCircle2,
  List,
  Grid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { usePermission } from "@/hooks/usePermissions";

type TabId = "total" | "draft" | "active" | "inactive" | "deleted" | "updated";
type TabColor = "blue" | "orange" | "green" | "gray" | "red";

interface TabData {
  count: number;
  unread: number;
  color: TabColor;
}

interface TabConfig {
  id: TabId;
  label: string;
  icon: any;
  description: string;
}

interface GmailTabsProps {
  dataTableFilter: any;
  setDataTableFilter: any;
  viewMode?: string;
  setViewMode: (viewMode: string) => void;

  setIsExportOpen?: (isExportOpen: boolean) => void;
  isExportOpen?: boolean;
  setIsFilterOpen?: (isFilterOpen: boolean) => void;
  setShowVisibility?: (showVisibility: boolean) => void;
}

const GmailTabs: React.FC<GmailTabsProps> = ({
  dataTableFilter,
  setDataTableFilter,
  viewMode,
  setViewMode,
  setIsExportOpen,
  setIsFilterOpen,
  setShowVisibility,
  isExportOpen,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>("total");
  const [hiddenTabs] = useState<TabId[]>([]);
  // get permission
  const canExport: boolean = usePermission("countries", "export");
  const canImport: boolean = usePermission("countries", "import");

  const handleTabChange = (tabId: TabId, label: string) => {
    setActiveTab(tabId);
    setDataTableFilter({ ...dataTableFilter, status: label });
  };

  // Sample data for demonstration
  const tabData: Record<TabId, TabData> = {
    total: { count: 1247, unread: 23, color: "blue" },
    active: { count: 892, unread: 15, color: "green" },
    inactive: { count: 203, unread: 3, color: "gray" },
    draft: { count: 8, unread: 0, color: "orange" },
    deleted: { count: 144, unread: 5, color: "red" },
    updated: { count: 144, unread: 5, color: "green" },
  };

  const tabConfig: TabConfig[] = [
    {
      id: "total",
      label: "Total",
      icon: Eye,
      description: "All items",
    },
    {
      id: "active",
      label: "Active",
      icon: Archive,
      description: "Active items",
    },
    {
      id: "inactive",
      label: "Inactive",
      icon: Settings,
      description: "Inactive items",
    },

    {
      id: "draft",
      label: "Draft",
      icon: Edit,
      description: "Draft items",
    },
    {
      id: "updated",
      label: "Updated",
      icon: CheckCircle2,
      description: "Updated items",
    },
    {
      id: "deleted",
      label: "Deleted",
      icon: Trash2,
      description: "Deleted items",
    },
  ];

  const visibleTabs = tabConfig.filter((tab) => !hiddenTabs.includes(tab.id));

  const getTabColorClasses = (color: TabColor, isActive: boolean): string => {
    const colors: Record<TabColor, string> = {
      blue: isActive
        ? "text-blue-600 border-blue-600 bg-blue-50"
        : "text-gray-600 hover:text-blue-600 border-transparent hover:border-blue-300",
      orange: isActive
        ? "text-orange-600 border-orange-600 bg-orange-50"
        : "text-gray-600 hover:text-orange-600 border-transparent hover:border-orange-300",
      green: isActive
        ? "text-green-600 border-green-600 bg-green-50"
        : "text-gray-600 hover:text-green-600 border-transparent hover:border-green-300",
      gray: isActive
        ? "text-gray-600 border-gray-600 bg-gray-50"
        : "text-gray-600 hover:text-gray-700 border-transparent hover:border-gray-300",
      red: isActive
        ? "text-red-600 border-red-600 bg-red-50"
        : "text-gray-600 hover:text-red-600 border-transparent hover:border-red-300",
    };
    return colors[color] || colors.blue;
  };

  const getCountColorClasses = (color: TabColor): string => {
    const colors: Record<TabColor, string> = {
      blue: "bg-blue-100 text-blue-800",
      orange: "bg-orange-100 text-orange-800",
      green: "bg-green-100 text-green-800",
      gray: "bg-gray-100 text-gray-800",
      red: "bg-red-100 text-red-800",
    };
    return colors[color] || colors.blue;
  };

  const handleExportClick = () => {
    setIsExportOpen?.(!isExportOpen);
    setIsFilterOpen?.(false);
    setShowVisibility?.(false);
  };

  return (
    <>
      <div className="flex justify-end w-full gap-2">
        {canImport && (
          <Button className="bg-sky-200 hover:bg-primary text-black rounded-full cursor-pointer mb-2">
            <span className="font-semibold">Import</span>
          </Button>
        )}
        {canExport && (
          <Button
            className={cn(
              "bg-sky-200 hover:bg-primary text-black rounded-full cursor-pointer mb-2",
              isExportOpen && "bg-primary text-white"
            )}
            onClick={handleExportClick}
          >
            <span className="font-semibold">Export</span>
          </Button>
        )}
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 relative cursor-pointer text-primary",
            viewMode === "grid"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-gray-800"
          )}
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
        >
          {viewMode === "grid" ? (
            <List className="h-5 w-5 text-primary" />
          ) : (
            <Grid className="h-5 w-5 text-primary" />
          )}
          {/* <span>Grid</span> */}
        </button>
      </div>

      <div className="w-full mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Tab Header */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            {/* Visible Tabs */}
            <div className="flex flex-1">
              {visibleTabs.map((tab) => {
                const data = tabData[tab.id];
                const isActive = activeTab === tab.id;

                return (
                  <div
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id, tab.label)}
                    className={`
                    relative flex-1 flex items-center justify-center gap-2 px-4 py-3 cursor-pointer border-b-2 transition-all duration-200 whitespace-nowrap group
                    ${getTabColorClasses(data.color, isActive)}
                  `}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="font-medium">{tab.label}</span>

                    {/* Count badge */}
                    <span
                      className={`
                    px-2 py-0.5 rounded-full text-xs font-medium transition-colors
                    ${
                      isActive
                        ? `${getCountColorClasses(data.color)}`
                        : "bg-primary text-white group-hover:bg-gray-300"
                    }
                  `}
                    >
                      {data.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GmailTabs;
