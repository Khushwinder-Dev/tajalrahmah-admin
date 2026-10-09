import video from "@/assets/videos/test.mp4";
import VideoModal from "@/components/common/VideoModal";
import HeaderSearch from "@/components/HeaderSearch";
import { useCountriesPermissions } from "@/hooks/usePermissions";
import { Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";

type PageLayoutProps = {
  title: string;
  createPath: string;
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  setTimeLabel: (timeLabel: string) => void;
  children: React.ReactNode;
  tabsSection?: React.ReactNode;
};

const PageLayout = ({
  title,
  createPath,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
  children,
  tabsSection,
}: PageLayoutProps) => {
  const navigate = useNavigate();
  const { canCreate } = useCountriesPermissions();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(isExportOpen || isFilterOpen);
  }, [isExportOpen, isFilterOpen]);

  return (
    <div className="w-full dark:bg-gray-900 border border-[#dee2e6] mr-2 rounded-[24px] h-[102%]">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b shadow-sm border-b-[#dee2e6] h-[70px] px-6 mb-2">
        {/* Left side - Title and Video */}
        <div className="flex items-center gap-2">
          <VideoModal src={video} header={"Tutorial video"} />
          <h1 className="text-[18px] font-bold text-primary">{title}</h1>
        </div>

        {/* Search */}
        <HeaderSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

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
                height: "48px",
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

      {/* Content Container */}
      <div className="px-6 py-2">
        <div className="border border-[#dee2e6] rounded-[24px] py-2 px-2">
          {/* View Mode and Action Buttons */}
          <div className="flex items-center justify-between mb-1 px-6 pt-4">
            {/* Left side - View Mode Toggle */}
            <div className="flex items-center">
              <div className="relative flex bg-gray-50 rounded-full border border-gray-200 overflow-hidden">
                {/* Sliding Background */}
                <motion.div
                  className="absolute top-0 bottom-0 w-1/2 bg-sky-400"
                  style={{
                    borderRadius:
                      viewMode === "list"
                        ? "9999px 0 0 9999px"
                        : "0 9999px 9999px 0",
                  }}
                  animate={{
                    x: viewMode === "grid" ? "100%" : "0%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />

                {/* Check Mark - positioned next to the active icon */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 z-20 text-white"
                  animate={{
                    x: viewMode === "list" ? 8 : 72,
                    scale: [0.8, 1.2, 1],
                    opacity: 1,
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    scale: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  <FaCheck size={10} />
                </motion.div>

                {/* Vertical Divider */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-gray-300 z-5"></div>

                {/* List View Button */}
                <Tooltip
                  label="List"
                  position="top"
                  withArrow
                  arrowSize={8}
                  styles={{
                    tooltip: {
                      fontSize: "14px",
                      padding: "8px 12px",
                      backgroundColor: "#374151",
                      color: "white",
                      borderRadius: "6px",
                      fontWeight: "500",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    },
                    arrow: {
                      backgroundColor: "#374151",
                    },
                  }}
                >
                  <motion.button
                    onClick={() => setViewMode("list")}
                    className={`relative z-10 flex items-center justify-center w-16 h-8 cursor-pointer ${
                      viewMode === "list" ? "text-white" : "text-gray-600"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.img
                      src="/list-rounded.svg"
                      alt="List view"
                      className="w-6 h-6"
                      style={{
                        filter:
                          viewMode === "list"
                            ? "brightness(0) invert(1)"
                            : "none",
                      }}
                      animate={{
                        scale: viewMode === "list" ? 1.1 : 1,
                        rotate: viewMode === "list" ? [0, -5, 5, 0] : 0,
                      }}
                      transition={{
                        scale: { type: "spring", stiffness: 300, damping: 20 },
                        rotate: { duration: 0.4, ease: "easeInOut" },
                      }}
                    />
                  </motion.button>
                </Tooltip>

                {/* Grid View Button */}
                <Tooltip
                  label="Grid"
                  position="top"
                  withArrow
                  arrowSize={8}
                  styles={{
                    tooltip: {
                      fontSize: "14px",
                      padding: "8px 12px",
                      backgroundColor: "#374151",
                      color: "white",
                      borderRadius: "6px",
                      fontWeight: "500",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    },
                    arrow: {
                      backgroundColor: "#374151",
                    },
                  }}
                >
                  <motion.button
                    onClick={() => setViewMode("grid")}
                    className={`relative z-10 flex items-center justify-center w-16 h-8 cursor-pointer ${
                      viewMode === "grid" ? "text-white" : "text-gray-600"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.img
                      src="/grid-line.svg"
                      alt="Grid view"
                      className="w-4 h-4"
                      style={{
                        filter:
                          viewMode === "grid"
                            ? "brightness(0) invert(1)"
                            : "none",
                      }}
                      animate={{
                        scale: viewMode === "grid" ? 1.1 : 1,
                        rotate: viewMode === "grid" ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{
                        scale: { type: "spring", stiffness: 300, damping: 20 },
                        rotate: { duration: 0.4, ease: "easeInOut" },
                      }}
                    />
                  </motion.button>
                </Tooltip>
              </div>
            </div>

            {/* Right side - Action Buttons Toggle */}
            <div className="flex items-center">
              <div className="relative flex bg-gray-50 rounded-full border border-gray-200 overflow-hidden">
                {/* Sliding Background */}
                <motion.div
                  className="absolute top-0 bottom-0 bg-sky-400"
                  style={{
                    borderRadius: isExportOpen
                      ? "9999px 0 0 9999px"
                      : isFilterOpen
                      ? "0 9999px 9999px 0"
                      : "9999px",
                  }}
                  animate={{
                    x: isFilterOpen ? "100%" : "0%",
                    width: "50%",
                    opacity: isExportOpen || isFilterOpen ? 1 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.2 },
                  }}
                />

                {/* Check Mark for Export */}
                {isExportOpen && isSelected && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 z-20 text-white"
                    style={{ left: 8 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.2, 1],
                      opacity: 1,
                    }}
                    transition={{
                      scale: { duration: 0.3, ease: "easeOut" },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <FaCheck size={10} />
                  </motion.div>
                )}

                {/* Check Mark for Filter */}
                {isFilterOpen && isSelected && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 z-20 text-white"
                    style={{ right: 8 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.2, 1],
                      opacity: 1,
                    }}
                    transition={{
                      scale: { duration: 0.3, ease: "easeOut" },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <FaCheck size={10} className="-ml-12" />
                  </motion.div>
                )}

                {/* Vertical Divider */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-gray-300 z-5"></div>

                {/* Export Button */}
                <Tooltip
                  label="Export"
                  position="top"
                  withArrow
                  arrowSize={8}
                  styles={{
                    tooltip: {
                      fontSize: "14px",
                      padding: "8px 12px",
                      backgroundColor: "#374151",
                      color: "white",
                      borderRadius: "6px",
                      fontWeight: "500",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    },
                    arrow: {
                      backgroundColor: "#374151",
                    },
                  }}
                >
                  <motion.button
                    onClick={() => {
                      setIsExportOpen(!isExportOpen);
                      if (!isExportOpen && isFilterOpen) {
                        setIsFilterOpen(false);
                      }
                    }}
                    className={`relative z-10 flex items-center justify-center w-16 h-8 cursor-pointer ${
                      isExportOpen ? "text-white" : "text-gray-600"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.img
                      src="/oui_export.svg"
                      alt="Export"
                      className="w-4 h-4"
                      style={{
                        filter: isExportOpen
                          ? "brightness(0) invert(1)"
                          : "none",
                      }}
                      animate={{
                        scale: isExportOpen ? 1.1 : 1,
                        rotate: isExportOpen ? [0, -5, 5, 0] : 0,
                      }}
                      transition={{
                        scale: { type: "spring", stiffness: 300, damping: 20 },
                        rotate: { duration: 0.4, ease: "easeInOut" },
                      }}
                    />
                  </motion.button>
                </Tooltip>

                {/* Filter Button */}
                <Tooltip
                  label="Filters"
                  position="top"
                  withArrow
                  arrowSize={8}
                  styles={{
                    tooltip: {
                      fontSize: "14px",
                      padding: "8px 12px",
                      backgroundColor: "#374151",
                      color: "white",
                      borderRadius: "6px",
                      fontWeight: "500",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    },
                    arrow: {
                      backgroundColor: "#374151",
                    },
                  }}
                >
                  <motion.button
                    onClick={() => {
                      setIsFilterOpen(!isFilterOpen);
                      if (!isFilterOpen && isExportOpen) {
                        setIsExportOpen(false);
                      }
                    }}
                    className={`relative z-10 flex items-center justify-center w-16 h-8 cursor-pointer ${
                      isFilterOpen ? "text-white" : "text-gray-600"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.img
                      src="/filter.svg"
                      alt="Filter"
                      className="w-4 h-4"
                      style={{
                        filter: isFilterOpen
                          ? "brightness(0) invert(1)"
                          : "none",
                      }}
                      animate={{
                        scale: isFilterOpen ? 1.1 : 1,
                        rotate: isFilterOpen ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{
                        scale: { type: "spring", stiffness: 300, damping: 20 },
                        rotate: { duration: 0.4, ease: "easeInOut" },
                      }}
                    />
                  </motion.button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          {tabsSection}

          {/* Scrollable Content Area */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
