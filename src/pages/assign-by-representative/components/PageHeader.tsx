import video from "@/assets/videos/test.mp4";
import VideoModal from "@/components/common/VideoModal";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import { useCountriesPermissions } from "@/hooks/usePermissions";

type Props = {
  title: string;
  createPath: string;
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  setTimeLabel: (timeLabel: string) => void;
  isShowAddButton?: boolean;
};

const PageHeader = ({
  viewMode,
  title,
  createPath,
  searchQuery,
  setSearchQuery,
  setIsFilterOpen,
  isFilterOpen,
  showVisibility,
  setShowVisibility,
  setTimeLabel,
  setIsExportOpen,
  isShowAddButton = true,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { canCreate } = useCountriesPermissions();

  return (
    <div className="flex items-center justify-between mb-8">
      {/* Left side - Title and Video */}
      <div className="flex items-center gap-4">
        <VideoModal src={video} header={"Tutorial video"} />
        <h1 className="text-2xl font-bold text-primary capitalize">{title}</h1>
      </div>

      {/* Right side - Search and Create Button */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <HeaderSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsFilterOpen={setIsFilterOpen}
          isFilterOpen={isFilterOpen}
          setShowVisibility={setShowVisibility}
          showVisibility={showVisibility}
          viewMode={viewMode}
          setTimeLabel={setTimeLabel}
          setIsExportOpen={setIsExportOpen}
        />

        {/* Create Button */}
        {canCreate && isShowAddButton && (
          <Button
            className="bg-sky-200 hover:bg-primary text-black rounded-full cursor-pointer"
            onClick={() => navigate(createPath)}
          >
            <span className="hidden sm:inline font-semibold">
              {t("button.add")}
            </span>
            <span className="sm:hidden">{t("button.add")}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
