import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GmailTabs from "@/components/common/TableTabs";
import VerticalSummaryCards from "@/components/common/grid-data-table/VerticalSummaryCards";
import VideoModal from "@/components/common/VideoModal";
import video from "@/assets/videos/test.mp4";

import SuppliersGridTable from "./SuppliersGridTable";
import SuppliersDataTable from "./SuppliersDataTable";

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
    title: "TOTAL SUPPLIERS GROUPS",
    icon: "/book-icon.svg",
    color: "blue",
    total: summaryData.total,
  },
  {
    key: "active" as keyof typeof summaryData,
    title: "ACTIVE SUPPLIERS GROUPS",
    icon: "/activity-01.svg",
    color: "green",
    total: summaryData.active,
  },
  {
    key: "draft" as keyof typeof summaryData,
    title: "DRAFT SUPPLIERS GROUPS",
    icon: "/pencil-edit-02.svg",
    color: "yellow",
    total: summaryData.draft,
  },
  {
    key: "updated" as keyof typeof summaryData,
    title: "UPDATED SUPPLIERS GROUPS",
    icon: "/arrow-reload-horizontal.svg",
    color: "purple",
    total: summaryData.updated,
  },
  {
    key: "inactive" as keyof typeof summaryData,
    title: "INACTIVE SUPPLIERS GROUPS",
    icon: "/unavailable.svg",
    color: "gray",
    total: summaryData.inactive,
  },
  {
    key: "deleted" as keyof typeof summaryData,
    title: "DELETED SUPPLIERS GROUPS",
    icon: "/delete-02.svg",
    color: "red",
    total: summaryData.deleted,
  },
];

export default function SuppliersPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const { t } = useTranslation();

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
    <div className=" w-100vw px-2 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <VideoModal src={video} header={"Rapid ERP Video"} />
        <h1 className="text-2xl font-bold flex-1 text-primary">
          SUPPLIERS GROUPS
        </h1>
        <Button
          className="bg-primary text-white rounded-full cursor-pointer"
          onClick={() => navigate("/suppliers-group/create")}
        >
          <span className="hidden sm:inline">{t("button.create")}</span>
          <span className="sm:hidden">{t("button.create")}</span>
        </Button>
      </div>

      {viewMode === "grid" ? (
        <VerticalSummaryCards data={cardConfigs} statistics={summaryData} />
      ) : (
        <GmailTabs
          dataTableFilter={dataTableFilter}
          setDataTableFilter={setDataTableFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}

      {viewMode === "grid" ? (
        <div className="mt-4 h-[calc(100vh-420px)] md:h-[calc(100vh-420px)] lg:h-[calc(100vh-420px)] xl:h-[calc(100vh-420px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <SuppliersGridTable setViewMode={setViewMode} />
        </div>
      ) : (
        <div className="mt-4 h-[calc(100vh-270px)] md:h-[calc(100vh-270px)] lg:h-[calc(100vh-270px)] xl:h-[calc(100vh-270px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <SuppliersDataTable
            viewMode={viewMode}
            setViewMode={setViewMode}
            dataTableFilter={dataTableFilter}
          />
        </div>
      )}
    </div>
  );
}
