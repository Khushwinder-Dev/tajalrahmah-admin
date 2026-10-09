import {
  BadgeCheck,
  CheckCircle2,
  CircleMinus,
  Eye,
  FileCheck,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import PageLayout from "@/layouts/PageLayout/MainPageLayout";
import TabsCounter from "@/pages/Country/components/TabsCounter";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import { selectMinimizedModulesForUser } from "@/store/minimizedModulesSlice";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import ExportMediasGrid from "./ExportMediasGrid";

// Mock data - replace with real data from your API
const summaryData = {
  total: 42,
  draft: 5,
  active: 30,
  inactive: 5,
  deleted: 2,
  updated: 2,
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

export default function ExportMediasPage() {
  const [viewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);
  const [timeLabel, setTimeLabel] = useState("This year");
  const labels = useLanguageLabels();

  // Get current user id and that user's minimized modules array
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const minimizedModulesForUser = useAppSelector((state) =>
    selectMinimizedModulesForUser(state, userId ?? "__no_user__")
  );

  // Get view mode from URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const viewModeParam = urlParams.get("view");
    if (viewModeParam) {
      console.log("View mode:", viewModeParam);
    }
  }, []);

  // Tabs Section Component - Only grid view
  const tabsSection = (
    <TabsCounter
      cardConfigs={cardConfigs}
      summaryData={summaryData}
      viewMode={viewMode}
      setViewMode={() => {}} // No-op since we only have grid view
      setIsExportOpen={setIsExportOpen}
      isExportOpen={isExportOpen}
      setIsFilterOpen={setIsFilterOpen}
      setShowVisibility={setShowVisibility}
      timeLabel={timeLabel}
    />
  );

  // Main Content Component - Only grid view
  const mainContent = (
    <div
      className={cn(
        minimizedModulesForUser.length > 0
          ? "h-[calc(100vh-477px)]"
          : "h-[calc(100vh-440px)]",
        "scroll-smooth [scrollbar-gutter:stable]"
      )}
    >
      <ExportMediasGrid
        searchQuery={searchQuery}
        setIsFilterOpen={setIsFilterOpen}
        isFilterOpen={isFilterOpen}
        setIsExportOpen={setIsExportOpen}
        isExportOpen={isExportOpen}
      />
    </div>
  );

  return (
    <PageLayout
      title={labels.exportMedias || "Export Medias"}
      createPath="/export-medias/create"
      viewMode="grid"
      setViewMode={() => {}} // No-op since we only have grid view
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
      pathName="export-medias"
      showTableButton={false}
      showExportButton={false}
    >
      {mainContent}
    </PageLayout>
  );
}
