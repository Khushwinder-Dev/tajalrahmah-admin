import { useState } from "react";
import PageHeader from "./components/PageHeader";
import ComponnetLevelGridView from "./ComponentLevelGridView";
import ComponnetLevelDataTable from "./ComponentLevelDataTableView";
import { useLocation } from "react-router-dom";

export default function PlansPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);
  const [, setTimeLabel] = useState("This year");
  const [dataTableFilter] = useState({});
  const basePathName = useLocation().pathname;

  return (
    <div className="w-100vw px-2 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <PageHeader
        setViewMode={setViewMode}
        viewMode={viewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsFilterOpen={setIsFilterOpen}
        isFilterOpen={isFilterOpen}
        setIsExportOpen={setIsExportOpen}
        setShowVisibility={setShowVisibility}
        showVisibility={showVisibility}
        setTimeLabel={setTimeLabel}
        title={basePathName.split("/")[1].replace("-", " ")}
      />
      {/* Scrollable Content Area */}
      {viewMode === "grid" ? (
        <div className="mt-8 h-[calc(100vh-100px)] md:h-[calc(100vh-100px)] lg:h-[calc(100vh-100px)] xl:h-[calc(100vh-100px)] border-1 rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <ComponnetLevelGridView
            searchQuery={searchQuery}
            setIsFilterOpen={setIsFilterOpen}
            isFilterOpen={isFilterOpen}
          />
        </div>
      ) : (
        <div className="mt-4 h-[calc(100vh-322px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <ComponnetLevelDataTable
            viewMode={viewMode}
            searchQuery={searchQuery}
            setViewMode={setViewMode}
            dataTableFilter={dataTableFilter}
            setShowExport={setIsExportOpen}
            showExport={isExportOpen}
            setShowFilter={setIsFilterOpen}
            showFilter={isFilterOpen}
            setShowVisibility={setShowVisibility}
            showVisibility={showVisibility}
          />
        </div>
      )}
    </div>
  );
}
