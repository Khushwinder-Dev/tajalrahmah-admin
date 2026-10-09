import video from "@/assets/videos/test.mp4";
import VideoModal from "@/components/common/VideoModal";
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
};

const PageHeader = ({
  title,
  createPath,
  searchQuery,
  setSearchQuery,
}: Props) => {
  const navigate = useNavigate();
  const { canCreate } = useCountriesPermissions();

  return (
    <div className="flex items-center justify-between border-b shadow-sm border-b-[#dee2e6] h-[70px] px-6 mb-2">
      {/* Left side - Title and Video */}
      <div className="flex items-center gap-2 ">
        <VideoModal src={video} header={"Tutorial video"} />
        <h1 className="text-[18px] font-bold text-primary">{title}</h1>
      </div>

      {/* Search */}
      <HeaderSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Right side - Create Button */}
      <div className="flex items-center gap-4">
        {/* Create Button */}
        {canCreate && (
          <button
            onClick={() => navigate(createPath)}
            className="flex justify-center items-center gap-2 cursor-pointer hover:bg-[#1a9dd9] transition-colors"
            style={{
              display: "flex",
              width: "140px",
              height: "40px",
              padding: "10px 40px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
              borderRadius: "30px",
              border: "1px solid #20B7FA",
              background: "#20B7FA",
              color: "#FFF",
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "100%",
            }}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
