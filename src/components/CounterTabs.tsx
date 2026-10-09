/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { cn } from "@/lib/utils";

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

interface FigmaTabsProps {
  dataTableFilter: any;
  setDataTableFilter: any;
  onTabChange?: (tabId: TabId, label: string) => void;
}

const FigmaTabs: React.FC<FigmaTabsProps> = ({
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

  // Sample data matching the Figma design
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
      icon: "/counter-1.svg",
      description: "All items",
    },
    {
      id: "active",
      label: "Active",
      icon: "/counter-active.svg",
      description: "Active items",
    },
    {
      id: "inactive",
      label: "Inactive",
      icon: "/counter-inactive.svg",
      description: "Inactive items",
    },
    {
      id: "draft",
      label: "Drafted",
      icon: "/counter-draft.svg",
      description: "Draft items",
    },
    {
      id: "updated",
      label: "Updated",
      icon: "/counter-updated.svg",
      description: "Updated items",
    },
    {
      id: "deleted",
      label: "Deleted",
      icon: "/counter-deleted.svg",
      description: "Deleted items",
    },
  ];

  const getColorClasses = (color: TabColor) => {
    const colorMap: Record<
      TabColor,
      { bg: string; badge: string; badgeText: string; border: string }
    > = {
      blue: {
        bg: "bg-sky-300",
        badge: "bg-sky-400/20",
        badgeText: "text-sky-400",
        border: "border-sky-300",
      },
      green: {
        bg: "bg-green-300",
        badge: "bg-green-400/20",
        badgeText: "text-green-400",
        border: "border-green-300",
      },
      gray: {
        bg: "bg-[#82CAD2]",
        badge: "bg-[#82CAD2]/20",
        badgeText: "text-[#82CAD2]",
        border: "border-[#82CAD2]",
      },
      orange: {
        bg: "bg-orange-300",
        badge: "bg-orange-400/20",
        badgeText: "text-orange-400",
        border: "border-orange-300",
      },
      red: {
        bg: "bg-red-300",
        badge: "bg-red-400/20",
        badgeText: "text-red-400",
        border: "border-red-300",
      },
      purple: {
        bg: "bg-purple-300",
        badge: "bg-purple-400/20",
        badgeText: "text-purple-400",
        border: "border-purple-300",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="w-full flex px-4">
      {tabConfig.map((tab) => {
        const data = tabData[tab.id];
        const isActive = activeTab === tab.id;
        const colors = getColorClasses(data.color);

        return (
          <div
            key={tab.id}
            onClick={() => handleTabChange(tab.id, tab.label)}
            className={cn(
              "self-stretch h-16 px-4 py-2.5 bg-white dark:bg-gray-900 border-b-2 inline-flex justify-center items-center gap-3 overflow-hidden cursor-pointer transition-all duration-200 mt-4",
              isActive
                ? colors.border
                : "border-transparent hover:border-gray-200"
            )}
            style={{ flex: "1 0 0" }}
          >
            {/* Circular background */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                colors.bg
              )}
            >
              <img src={tab.icon} alt="" className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="inline-flex flex-col justify-center items-start gap-1">
              <div className="w-36 inline-flex justify-between items-center">
                <div className="justify-start text-black/60 dark:text-white/60 text-xl font-medium leading-tight">
                  {tab.label}
                </div>
                <div className={cn("w-16 h-7 relative rounded-[50px]")}>
                  <div
                    className={cn(
                      "left-[21px] top-[7.50px] absolute text-center justify-start text-sm font-bold leading-3",
                      colors.badgeText
                    )}
                  >
                    {data.count}
                  </div>
                </div>
              </div>
              <div className="justify-start text-black/30 dark:text-white/30 text-sm font-medium leading-none">
                {data.percentage}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FigmaTabs;
