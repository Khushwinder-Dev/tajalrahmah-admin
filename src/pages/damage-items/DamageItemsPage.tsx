import {
  BadgeCheck,
  CheckCircle2,
  CircleMinus,
  Eye,
  FileCheck,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import PageLayout from "@/layouts/PageLayout/MainPageLayout"; // Update path as needed
import CountryGrid from "./DamageItemsGrid";
import CountryDataTable2 from "./DamageItemsDataTable";
import TabsCounter from "./components/TabsCounter";
// import MaterialTableTabs from "@/components/common/MaterialTableTabs";
import CounterTabs from "@/components/CounterTabs";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import { selectMinimizedModulesForUser } from "@/store/minimizedModulesSlice";
import MobileCounterTabs from "@/components/MobileCounterTabs";
import useIsMobile from "@/hooks/useIsMobile";

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
    title: "Total",
    imgSrc: "/counter-1.svg",
    icon: <Eye />,
    color: "blue",
    total: summaryData.total,
  },
  {
    key: "active" as keyof typeof summaryData,
    title: "Active",
    imgSrc: "/counter-active.svg",
    icon: <BadgeCheck />,
    color: "green",
    total: summaryData.active,
  },
  {
    key: "inactive" as keyof typeof summaryData,
    title: "Inactive",
    imgSrc: "/counter-inactive.svg",
    icon: <CircleMinus />,
    color: "gray",
    total: summaryData.inactive,
  },
  {
    key: "draft" as keyof typeof summaryData,
    title: "Draft",
    imgSrc: "/counter-draft.svg",
    icon: <FileCheck />,
    color: "yellow",
    total: summaryData.draft,
  },
  {
    key: "updated" as keyof typeof summaryData,
    title: "Updated",
    imgSrc: "/counter-updated.svg",
    icon: <CheckCircle2 />,
    color: "purple",
    total: summaryData.updated,
  },
  {
    key: "deleted" as keyof typeof summaryData,
    title: "Deleted",
    imgSrc: "/counter-deleted.svg",
    icon: <Trash2 />,
    color: "red",
    total: summaryData.deleted,
  },
];

export default function CountryPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);
  const [timeLabel, setTimeLabel] = useState("This year");
  const [dataTableFilter, setDataTableFilter] = useState({});

  // Get current user id and that user's minimized modules array
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const isMobile = useIsMobile();
  const minimizedModulesForUser = useAppSelector((state) =>
    selectMinimizedModulesForUser(state, userId ?? "__no_user__")
  );
  // console.log("Minimized modules for user:", minimizedModulesForUser);
  // Mock data - replace with real data from your API
  const summaryData = {
    total: 42,
    draft: 5,
    active: 30,
    inactive: 5,
    deleted: 2,
    updated: 2,
  };

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
    ) : //isMobile then mobileCounterComponent else CounterTabs
    isMobile ? (
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
        <CountryGrid
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
          <CountryDataTable2
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
            setIsFilterOpen={setIsFilterOpen}
            isFilterOpen={isFilterOpen}
          />
        </div>
      </div>
    );

  return (
    <PageLayout
      title="Damage Items"
      createPath="/damage-items/create"
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
      pathName="damage-items"
    >
      {mainContent}
    </PageLayout>
  );
}
