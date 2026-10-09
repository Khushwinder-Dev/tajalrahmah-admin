import {
  BadgeCheck,
  CheckCircle2,
  CircleMinus,
  Eye,
  FileCheck,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import GmailTabs from "@/components/common/TableTabs";
import PageHeader from "./components/PageHeader";
import ComponnetLevelGridView from "./ComponentLevelGridView";
import ComponnetLevelDataTable from "./ComponentLevelDataTableView";
import TabsCounter from "@/components/common/TabsCounter";

// Mock data - replace with real data from your API
const summaryData = {
  total: 42,
  draft: 30,
  active: 30,
  inactive: 20,
  deleted: 30,
  updated: 25,
};

const cardConfigs = [
  {
    key: "total" as keyof typeof summaryData,
    title: "TOTAL",
    icon: <Eye />,
    color: "blue",
    total: summaryData.total,
  },
  {
    key: "active" as keyof typeof summaryData,
    title: "ACTIVE",
    icon: <BadgeCheck />,
    color: "green",
    total: summaryData.active,
  },
  {
    key: "inactive" as keyof typeof summaryData,
    title: "INACTIVE",
    icon: <CircleMinus />,
    color: "gray",
    total: summaryData.inactive,
  },
  {
    key: "draft" as keyof typeof summaryData,
    title: "DRAFT",
    icon: <FileCheck />,
    color: "yellow",
    total: summaryData.draft,
  },
  {
    key: "updated" as keyof typeof summaryData,
    title: "UPDATED",
    icon: <CheckCircle2 />,
    color: "purple",
    total: summaryData.updated,
  },

  {
    key: "deleted" as keyof typeof summaryData,
    title: "DELETED",
    icon: <Trash2 />,
    color: "red",
    total: summaryData.deleted,
  },
];

export default function BedsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);
  const [timeLabel, setTimeLabel] = useState("This year");
  const [dataTableFilter, setDataTableFilter] = useState({});

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 42,
    draft: 5,
    active: 30,
    inactive: 5,
    deleted: 2,
    updated: 2,
  };

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
        title="Beds"
        createPath="/beds/create"
      />
      {/* Grap section or gmail tab */}
      {viewMode === "grid" ? (
        <TabsCounter
          cardConfigs={cardConfigs}
          summaryData={summaryData}
          timeLabel={timeLabel}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setIsExportOpen={setIsExportOpen}
          isExportOpen={isExportOpen}
          setIsFilterOpen={setIsFilterOpen}
          setShowVisibility={setShowVisibility}
        />
      ) : (
        <GmailTabs
          setIsExportOpen={setIsExportOpen}
          isExportOpen={isExportOpen}
          setIsFilterOpen={setIsFilterOpen}
          setShowVisibility={setShowVisibility}
          dataTableFilter={dataTableFilter}
          setDataTableFilter={setDataTableFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}
      {/* Scrollable Content Area */}
      {viewMode === "grid" ? (
        <div className="mt-8 h-[calc(100vh-420px)] md:h-[calc(100vh-420px)] lg:h-[calc(100vh-420px)] xl:h-[calc(100vh-420px)] border-1 rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <ComponnetLevelGridView
            searchQuery={searchQuery}
            setIsFilterOpen={setIsFilterOpen}
            isFilterOpen={isFilterOpen}
            setIsExportOpen={setIsExportOpen}
            isExportOpen={isExportOpen}
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
