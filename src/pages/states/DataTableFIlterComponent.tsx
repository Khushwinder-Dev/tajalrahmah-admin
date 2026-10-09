/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import ListFilterComponent from "./ListFilterComponent";
import ExportComponent from "./ListExportComponent";
import ColumnVisibilityPanel from "./ListVisibilityComponent";

interface FilterComponentProps {
  table: any;
  columnOrder: string[];
  setShowFilter: (showFilter: boolean) => void;
  setShowVisibility: (showVisibility: boolean) => void;
  allColumnsVisible: boolean;
  setAllColumnsVisible: (allColumnsVisible: boolean) => void;
  setShowExport: (showExport: boolean) => void;
  activeTab?: ActiveTab;
}

type ActiveTab = "filter" | "export" | "visibility";

export default function FilterComponent({
  table,
  columnOrder,
  setShowFilter,
  setShowVisibility,
  allColumnsVisible,
  setAllColumnsVisible,
  setShowExport,
  activeTab: propActiveTab = "filter",
}: FilterComponentProps) {
  console.log("data table filter");
  const [activeTab, setActiveTab] = useState<ActiveTab>(propActiveTab);

  // Update activeTab when prop changes
  useEffect(() => {
    setActiveTab(propActiveTab);
  }, [propActiveTab]);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "filter":
        return (
          <ListFilterComponent
            table={table}
            columnOrder={columnOrder}
            onClose={() => setShowFilter(false)}
          />
        );
      case "export":
        return (
          <ExportComponent
            table={table}
            columnOrder={columnOrder}
            allColumnsVisible={allColumnsVisible}
            setAllColumnsVisible={setAllColumnsVisible}
            setShowExport={setShowExport}
            onClose={() => setShowExport(false)}
          />
        );
      case "visibility":
        return (
          <ColumnVisibilityPanel
            table={table}
            columnOrder={columnOrder}
            setShowVisibility={setShowVisibility}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col bg-white overflow-hidden dark:bg-gray-900 h-full border"
      style={{ borderRadius: "20px" }}
    >
      {/* Header with Custom Tab Navigation - Only show active tab */}
      {/* <div className="flex-shrink-0 p-4 border-b">
        <div className="flex gap-8 relative">
          {tabs
            .filter((tab) => tab.value === activeTab)
            .map((tab) => {
              return (
                <div key={tab.value} className="relative cursor-pointer">
                  <button className="text-lg font-medium font-['Inter'] leading-tight text-sky-400">
                    {tab.label}
                  </button>

                  <div className="absolute -bottom-[18px] left-1/2 transform -translate-x-1/2 w-11 h-[5px] bg-sky-400 rounded-full" />
                </div>
              );
            })}
        </div>
      </div> */}

      {/* Active Component Content */}
      <div className="flex-1 overflow-hidden">{renderActiveComponent()}</div>

      {/* Footer with Reset and Apply buttons */}
      {/* <div className="bg-white dark:bg-gray-900 border-t px-4 py-3 flex-shrink-0">
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div> */}
    </div>
  );
}
