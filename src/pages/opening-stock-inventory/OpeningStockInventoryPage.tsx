import {
  Box,
  Package,
  TrendingUp,
  Archive,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import PageLayout from "@/layouts/PageLayout/MainPageLayout";
import OpeningStockInventoryGrid from "./OpeningStockInventoryGrid";
import OpeningStockInventoryDataTable from "./OpeningStockInventoryDataTable";
import TabsCounter from "@/pages/Country/components/TabsCounter";
import CounterTabs from "@/components/CounterTabs";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import { selectMinimizedModulesForUser } from "@/store/minimizedModulesSlice";
import MobileCounterTabs from "@/components/MobileCounterTabs";
import useIsMobile from "@/hooks/useIsMobile";
import { useLocation } from "react-router-dom";

// Mock data - replace with real data from your API
const summaryData = {
  total: 25,
  draft: 5,
  active: 20,
  inactive: 5,
  deleted: 2,
  updated: 3,
};

const cardConfigs = [
  {
    key: "total" as keyof typeof summaryData,
    title: "Total Stock",
    imgSrc: "/counter-1.svg",
    icon: <Box />,
    color: "blue",
    total: summaryData.total,
  },
  {
    key: "active" as keyof typeof summaryData,
    title: "Active Stock",
    imgSrc: "/counter-active.svg",
    icon: <Package />,
    color: "green",
    total: summaryData.active,
  },
  {
    key: "inactive" as keyof typeof summaryData,
    title: "Inactive Stock",
    imgSrc: "/counter-inactive.svg",
    icon: <AlertCircle />,
    color: "gray",
    total: summaryData.inactive,
  },
  {
    key: "draft" as keyof typeof summaryData,
    title: "Draft Stock",
    imgSrc: "/counter-draft.svg",
    icon: <Archive />,
    color: "yellow",
    total: summaryData.draft,
  },
  {
    key: "updated" as keyof typeof summaryData,
    title: "Updated Stock",
    imgSrc: "/counter-updated.svg",
    icon: <TrendingUp />,
    color: "purple",
    total: summaryData.updated,
  },
  {
    key: "deleted" as keyof typeof summaryData,
    title: "Deleted Stock",
    imgSrc: "/counter-deleted.svg",
    icon: <Trash2 />,
    color: "red",
    total: summaryData.deleted,
  },
];

export default function OpeningStockInventoryPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);
  const [timeLabel, setTimeLabel] = useState("This year");
  const [dataTableFilter, setDataTableFilter] = useState({});

  const basePathName = useLocation().pathname;
  const moduleName = basePathName.split("/")[1].replace("-", " ");
  const pathName = basePathName.split("/")[1];

  // Get current user id and that user's minimized modules array
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const isMobile = useIsMobile();
  const minimizedModulesForUser = useAppSelector((state) =>
    selectMinimizedModulesForUser(state, userId ?? "__no_user__")
  );

  // Get view mode from URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const viewModeParam = urlParams.get("view");
    if (viewModeParam) {
      setViewMode(viewModeParam);
    }
  }, []);

  // Tabs Section Component
  const tabsSection =
    viewMode === "grid" ? (
      <TabsCounter
        cardConfigs={cardConfigs}
        summaryData={summaryData}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setIsExportOpen={setIsExportOpen}
        isExportOpen={isExportOpen}
        setIsFilterOpen={setIsFilterOpen}
        setShowVisibility={setShowVisibility}
        timeLabel={timeLabel}
      />
    ) : isMobile ? (
      <MobileCounterTabs
        dataTableFilter={dataTableFilter}
        setDataTableFilter={setDataTableFilter}
      />
    ) : (
      <CounterTabs
        dataTableFilter={dataTableFilter}
        setDataTableFilter={setDataTableFilter}
      />
    );

  // Main Content Component
  const mainContent =
    viewMode === "grid" ? (
      <div
        className={
          "h-[calc(100vh-440px)] md:h-[calc(100vh-440px)] lg:h-[calc(100vh-440px)] xl:h-[calc(100vh-440px)] scroll-smooth [scrollbar-gutter:stable]"
        }
      >
        <OpeningStockInventoryGrid
          searchQuery={searchQuery}
          setIsFilterOpen={setIsFilterOpen}
          isFilterOpen={isFilterOpen}
          setIsExportOpen={setIsExportOpen}
          isExportOpen={isExportOpen}
        />
      </div>
    ) : (
      <div
        className={cn(
          minimizedModulesForUser.length > 0
            ? "h-[calc(100vh-477px)]"
            : "h-[calc(100vh-396px)]"
        )}
      >
        <div className="overflow-y-auto overflow-x-hidden scroll-smooth [scrollbar-gutter:stable] h-full">
          <OpeningStockInventoryDataTable
            viewMode={viewMode}
            setViewMode={setViewMode}
            dataTableFilter={dataTableFilter}
            setIsExportOpen={setIsExportOpen}
            isExportOpen={isExportOpen}
            setIsFilterOpen={setIsFilterOpen}
            isFilterOpen={isFilterOpen}
            setShowVisibility={setShowVisibility}
            showVisibility={showVisibility}
          />
        </div>
      </div>
    );

  return (
    <PageLayout
      title={moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}
      createPath={`${basePathName}/create`}
      viewMode={viewMode}
      setViewMode={setViewMode}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      setIsFilterOpen={setIsFilterOpen}
      isFilterOpen={isFilterOpen}
      setIsExportOpen={setIsExportOpen}
      isExportOpen={isExportOpen}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      setTimeLabel={setTimeLabel}
      tabsSection={tabsSection}
      pathName={pathName}
    >
      {mainContent}
    </PageLayout>
  );
}
