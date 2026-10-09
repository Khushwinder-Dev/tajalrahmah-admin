import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GmailTabs from "@/components/common/TableTabs";
import VideoModal from "@/components/common/VideoModal";
import video from "@/assets/videos/test.mp4";
import DeliveryNoteGrid from "./DeliveryNoteGrid";
import DeliveryNoteDataTable from "./DeliveryNoteDataTable";
import VerticalSummaryCards from "@/components/common/grid-data-table/VerticalSummaryCards";

export default function DeliveryNotePage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const { t } = useTranslation();
  const [dataTableFilter, setDataTableFilter] = useState({});

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 42,
    draft: 8,
    active: 28,
    inactive: 6,
    deleted: 3,
    updated: 7,
  };

  const cardConfigs = [
    {
      key: "total" as keyof typeof summaryData,
      title: "TOTAL NOTES",
      icon: "/book-icon.svg",
      color: "blue",
      total: summaryData.total,
    },
    {
      key: "active" as keyof typeof summaryData,
      title: "ACTIVE NOTES",
      icon: "/activity-01.svg",
      color: "green",
      total: summaryData.active,
    },
    {
      key: "draft" as keyof typeof summaryData,
      title: "DRAFT NOTES",
      icon: "/pencil-edit-02.svg",
      color: "yellow",
      total: summaryData.draft,
    },
    {
      key: "updated" as keyof typeof summaryData,
      title: "UPDATED NOTES",
      icon: "/arrow-reload-horizontal.svg",
      color: "purple",
      total: summaryData.updated,
    },
    {
      key: "inactive" as keyof typeof summaryData,
      title: "INACTIVE NOTES",
      icon: "/unavailable.svg",
      color: "gray",
      total: summaryData.inactive,
    },
    {
      key: "deleted" as keyof typeof summaryData,
      title: "DELETED NOTES",
      icon: "/delete-02.svg",
      color: "red",
      total: summaryData.deleted,
    },
  ];

  return (
    <div className="w-100vw px-2 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <VideoModal src={video} header={"Rapid ERP Video"} />
        <h1 className="text-2xl font-bold flex-1 text-primary">
          {t("deliveryNote.title")}
        </h1>
        <Button
          className="bg-primary text-white rounded-full cursor-pointer"
          onClick={() => navigate("/delivery-notes/create")}
        >
          <span className="hidden sm:inline">{t("button.create")}</span>
          <span className="sm:hidden">{t("button.create")}</span>
        </Button>
      </div>

      {viewMode === "grid" ? (
        <VerticalSummaryCards statistics={summaryData} data={cardConfigs} />
      ) : (
        <GmailTabs
          dataTableFilter={dataTableFilter}
          setDataTableFilter={setDataTableFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}

      {/* Scrollable Content Area */}
      {viewMode === "grid" ? (
        <div className="mt-4 h-[calc(100vh-420px)] md:h-[calc(100vh-420px)] lg:h-[calc(100vh-420px)] xl:h-[calc(100vh-420px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <DeliveryNoteGrid setViewMode={setViewMode} />
        </div>
      ) : (
        <div className="mt-4 h-[calc(100vh-270px)] md:h-[calc(100vh-270px)] lg:h-[calc(100vh-270px)] xl:h-[calc(100vh-270px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <DeliveryNoteDataTable
            viewMode={viewMode}
            setViewMode={setViewMode}
            dataTableFilter={dataTableFilter}
          />
        </div>
      )}
    </div>
  );
}
