/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  FileText,
  XCircle,
  Trash2,
  RefreshCw,
  Calculator,
} from "lucide-react";

type TabId = "total" | "draft" | "active" | "inactive" | "deleted" | "updated";
type TabColor = "blue" | "orange" | "green" | "gray" | "red" | "purple";

interface TabData {
  count: number;
  percentage: string;
  color: TabColor;
}

interface TabConfig {
  id: TabId;
  label: string;
  icon: any;
  description: string;
}

interface MobileFigmaTabsProps {
  dataTableFilter: any;
  setDataTableFilter: any;
  onTabChange?: (tabId: TabId, label: string) => void;
}

const MobileFigmaTabs: React.FC<MobileFigmaTabsProps> = ({
  dataTableFilter,
  setDataTableFilter,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>("total");

  const handleTabChange = (tabId: TabId, label: string) => {
    setActiveTab(tabId);
    setDataTableFilter({ ...dataTableFilter, status: label });
    onTabChange?.(tabId, label);
  };

  // Sample data matching the original design
  const tabData: Record<TabId, TabData> = {
    total: { count: 100, percentage: "100% of all countries", color: "blue" },
    active: { count: 80, percentage: "80% of total countries", color: "green" },
    inactive: {
      count: 10,
      percentage: "10% of total countries",
      color: "gray",
    },
    draft: { count: 5, percentage: "05% of total countries", color: "orange" },
    deleted: {
      count: 1247,
      percentage: "95% of total countries",
      color: "red",
    },
    updated: {
      count: 144,
      percentage: "15% of total countries",
      color: "purple",
    },
  };

  const tabConfig: TabConfig[] = [
    {
      id: "total",
      label: "All",
      icon: <Calculator size={14} />,
      description: "All items",
    },
    {
      id: "active",
      label: "Active",
      icon: <CheckCircle size={14} />,
      description: "Active items",
    },
    {
      id: "inactive",
      label: "Inactive",
      icon: <XCircle size={14} />,
      description: "Inactive items",
    },
    {
      id: "draft",
      label: "Drafted",
      icon: <FileText size={14} />,
      description: "Draft items",
    },
    {
      id: "updated",
      label: "Updated",
      icon: <RefreshCw size={14} />,
      description: "Updated items",
    },
    {
      id: "deleted",
      label: "Deleted",
      icon: <Trash2 size={14} />,
      description: "Deleted items",
    },
  ];

  const getColorClasses = (color: TabColor) => {
    const colorMap: Record<
      TabColor,
      {
        bg: string;
        iconColor: string;
        textColor: string;
        countColor: string;
        border: string;
        activeBg: string;
      }
    > = {
      blue: {
        bg: "bg-blue-50",
        iconColor: "text-blue-500",
        textColor: "text-blue-600",
        countColor: "text-blue-700",
        border: "border-blue-200",
        activeBg: "bg-blue-100",
      },
      green: {
        bg: "bg-green-50",
        iconColor: "text-green-500",
        textColor: "text-green-600",
        countColor: "text-green-700",
        border: "border-green-200",
        activeBg: "bg-green-100",
      },
      gray: {
        bg: "bg-gray-50",
        iconColor: "text-gray-500",
        textColor: "text-gray-600",
        countColor: "text-gray-700",
        border: "border-gray-200",
        activeBg: "bg-gray-100",
      },
      orange: {
        bg: "bg-orange-50",
        iconColor: "text-orange-500",
        textColor: "text-orange-600",
        countColor: "text-orange-700",
        border: "border-orange-200",
        activeBg: "bg-orange-100",
      },
      red: {
        bg: "bg-red-50",
        iconColor: "text-red-500",
        textColor: "text-red-600",
        countColor: "text-red-700",
        border: "border-red-200",
        activeBg: "bg-red-100",
      },
      purple: {
        bg: "bg-purple-50",
        iconColor: "text-purple-500",
        textColor: "text-purple-600",
        countColor: "text-purple-700",
        border: "border-purple-200",
        activeBg: "bg-purple-100",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="w-full p-4">
      {/* Mobile Grid - 2 rows, 3 columns */}
      <div className="grid grid-cols-3 gap-3">
        {tabConfig.map((tab) => {
          const data = tabData[tab.id];
          const isActive = activeTab === tab.id;
          const colors = getColorClasses(data.color);

          return (
            <div
              key={tab.id}
              onClick={() => handleTabChange(tab.id, tab.label)}
              className={cn(
                "relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 h-20",
                isActive
                  ? `${colors.activeBg} ${colors.border}`
                  : `bg-white border-gray-200 hover:${colors.bg}`
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  className={cn(
                    "absolute top-1 right-1 w-2 h-2 rounded-full",
                    colors.iconColor.replace("text-", "bg-")
                  )}
                />
              )}

              {/* Content */}
              <div className="flex flex-col h-full justify-between">
                {/* Top - Icon and Label */}
                <div className="flex items-center gap-2">
                  <div className={cn("flex-shrink-0", colors.iconColor)}>
                    {tab.icon}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      isActive ? colors.textColor : "text-gray-600"
                    )}
                  >
                    {tab.label}
                  </span>
                </div>

                {/* Bottom - Count */}
                <div className="flex justify-end">
                  <span
                    className={cn(
                      "text-lg font-bold",
                      isActive ? colors.countColor : "text-gray-800"
                    )}
                  >
                    {data.count}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileFigmaTabs;
