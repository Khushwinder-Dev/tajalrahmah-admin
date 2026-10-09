/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";
import FilterComponent from "@/components/Filters/FilterComponent";
import ExportComponent from "@/components/Filters/ExportComponent";

interface GridTabsComponentProps {
  data: any[];
  setFilteredData: (filtered: any[]) => void;
  setShowTabs: (visible: boolean) => void;
  defaultTab?: "filter" | "export";
}

type TabType = "filter" | "export";

export default function GridTabsComponent({
  data,
  setFilteredData,
  setShowTabs,
  defaultTab = "filter",
}: GridTabsComponentProps) {
  // Initialize state with defaultTab and force re-render when defaultTab changes
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    console.log("GridTabsComponent initialized with defaultTab:", defaultTab);
    return defaultTab;
  });

  // Reset active tab when defaultTab changes
  useEffect(() => {
    console.log("useEffect triggered - setting activeTab to:", defaultTab);
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Debug current state
  useEffect(() => {
    console.log("Current activeTab:", activeTab, "defaultTab:", defaultTab);
  }, [activeTab, defaultTab]);

  const tabs = [
    { id: "export" as const, label: "Export", value: "export" },
    { id: "filter" as const, label: "Filter", value: "filter" },
  ];

  const handleReset = () => {
    // Reset logic based on active tab
    if (activeTab === "filter") {
      // Reset filters
      setFilteredData(data);
    }
  };

  const handleApply = () => {
    // Apply logic based on active tab
    if (activeTab === "filter") {
      // Apply filters
      console.log("Apply filters");
    }
    setShowTabs(false);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "filter":
        return (
          <FilterComponent
            data={data}
            setFilteredData={setFilteredData}
            onReset={handleReset}
            onApply={handleApply}
            onClose={() => setShowTabs(false)}
          />
        );
      case "export":
        return (
          <ExportComponent
            data={data}
            onReset={() => {}} // Empty function since no reset needed for export
            onApply={() => setShowTabs(false)} // Just close the tabs
            onClose={() => setShowTabs(false)}
          />
        );
      default:
        return null;
    }
  };

  // Show only the relevant tab without navigation when defaultTab is specified
  if (defaultTab) {
    return (
      <div
        className="flex flex-col bg-white dark:bg-gray-900 h-full"
        style={{ borderRadius: "20px" }}
      >
        {/* Header with Single Tab Label */}
        {/* <div className="flex-shrink-0 p-4 border-b">
          <div className="flex gap-8 relative">
            <div className="relative">
              <div className="text-lg font-medium font-['Inter'] leading-tight text-sky-400">
                {defaultTab === "filter" ? "Filter" : "Export"}
              </div>

              <div className="absolute -bottom-[18px] left-1/2 transform -translate-x-1/2 w-11 h-[5px] bg-sky-400 rounded-full" />
            </div>
          </div>
        </div> */}

        {/* Active Component */}
        <div className="flex-1 overflow-hidden">{renderActiveComponent()}</div>
      </div>
    );
  }

  // Original behavior with both tabs when no defaultTab is specified
  return (
    <div
      className="flex flex-col bg-white dark:bg-gray-900 h-full"
      style={{ borderRadius: "20px" }}
    >
      {/* Header with Custom Tab Navigation */}
      <div className="flex-shrink-0 p-4 border-b">
        <div className="flex gap-8 relative">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;

            return (
              <div key={tab.value} className="relative cursor-pointer">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-lg font-medium font-['Inter'] leading-tight transition-colors cursor-pointer ${
                    isActive
                      ? "text-sky-400"
                      : "text-black/40 hover:text-black/60"
                  }`}
                >
                  {tab.label}
                </button>

                {/* Active indicator line */}
                {isActive && (
                  <div className="absolute -bottom-[18px] left-1/2 transform -translate-x-1/2 w-11 h-[5px] bg-sky-400 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Component */}
      <div className="flex-1 overflow-hidden">{renderActiveComponent()}</div>
    </div>
  );
}
