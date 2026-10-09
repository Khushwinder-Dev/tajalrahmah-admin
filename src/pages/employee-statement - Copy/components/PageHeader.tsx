import video from "@/assets/videos/test.mp4";
import VideoModal from "@/components/common/VideoModal";
import HeaderSearch from "./HeaderSearch";

type Props = {
  title: string;
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
};

const PageHeader = ({
  viewMode,
  title,
  searchQuery,
  setSearchQuery,
  setIsFilterOpen,
  isFilterOpen,
  showVisibility,
  setShowVisibility,
  setTimeLabel,
  setIsExportOpen,
}: Props) => {
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
      </div>
    </div>
  );
};

export default PageHeader;
