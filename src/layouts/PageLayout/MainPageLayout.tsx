import video from "@/assets/videos/test.mp4";
import VideoModal from "@/components/common/VideoModal";
import HeaderSearch from "@/components/HeaderSearch";
import { useCountriesPermissions } from "@/hooks/usePermissions";
import { Tooltip } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
// import CsvImportModal from "@/pages/Country/ImportModal";
import ImportStepperTemp from "@/components/common/IMportTemp";
import {
  Grid3x3,
  List,
  Upload,
  Eye,
  Download,
  Filter,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import useIsMobile from "@/hooks/useIsMobile";
import useIsTab from "@/hooks/useIsTab";

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
  pathName?: string;
  showCreateButton?: boolean;
  showTableButton?: boolean;
  showExportButton?: boolean;
  onlyView?: boolean;
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
  setShowVisibility,
  showVisibility,
  children,
  tabsSection,
  showCreateButton = true,
  showTableButton = true,
  showExportButton = true,
  onlyView = false,
}: // pathName,
PageLayoutProps) => {
  const navigate = useNavigate();
  const { canCreate } = useCountriesPermissions();
  const [isImportOpen, setIsImportOpen] = useState(false);
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const [searchParams, setSearchParams] = useSearchParams();

  const [, setModalData] = useState({
    title: "Import User",
    message: (
      <ImportStepperTemp
        opened={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />
    ),
  });

  const handleViewModeChange = (viewMode: string) => {
    setViewMode(viewMode);
    searchParams.set("view", viewMode);
    setSearchParams(searchParams);
  };

  const handleAddClick = () => {
    console.log("handleAddClick", viewMode, createPath);
    navigate(createPath + "?fromView=" + viewMode);
    // searchParams.set("fromView", viewMode);
    // setSearchParams(searchParams);
  };

  return (
    <div
      className={`w-full dark:bg-gray-900 border border-[#dee2e6] dark:border-gray-700 ${
        isRTL ? "ml-2" : "mr-2"
      } rounded-[24px] h-full overflow-hidden overflow-x-hidden`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between border-b shadow-sm border-b-[#dee2e6] dark:border-b-gray-700 h-[70px] px-3 mb-2">
        {/* Title and Video - RTL aware */}
        <div
          className={`flex items-center gap-2 ${isRTL ? "order-2" : "order-1"}`}
        >
          <VideoModal src={video} header={"Tutorial video"} />
          <h1
            className="text-[18px] font-bold text-primary cursor-pointer hover:text-sky-500 transition-colors"
            onClick={() => window.location.reload()}
          >
            {title}
          </h1>
        </div>

        {/* Create Button or View Text - RTL aware */}
        <div
          className={`flex items-center gap-4 ${isRTL ? "order-1" : "order-2"}`}
        >
          {/* View Button - when onlyView is true */}
          {onlyView ? (
            <Tooltip
              label="View"
              position="top"
              withArrow
              arrowSize={8}
              styles={{
                tooltip: {
                  fontSize: "14px",
                  padding: "8px 12px",
                  backgroundColor: "white",
                  color: "var(--primary)",
                  border: "1px solid var(--primary)",
                  borderRadius: "6px",
                  fontWeight: "600",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                },
                arrow: {
                  backgroundColor: "white",
                  border: "1px solid var(--primary)",
                },
              }}
            >
              <Button
                onClick={() => navigate(createPath)}
                size="sm"
                className="flex justify-center items-center gap-2 cursor-pointer hover:bg-primary! hover:text-white! transition-colors text-primary! dark:bg-gray-800! dark:hover:bg-primary"
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
                  background: "white",
                  color: "#20B7FA",
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: "100%",
                }}
              >
                View
              </Button>
            </Tooltip>
          ) : (
            /* Create Button - when onlyView is false */
            showCreateButton &&
            canCreate && (
              <Tooltip
                label="New Country"
                position="top"
                withArrow
                arrowSize={8}
                styles={{
                  tooltip: {
                    fontSize: "14px",
                    padding: "8px 12px",
                    backgroundColor: "white",
                    color: "var(--primary)",
                    border: "1px solid var(--primary)",
                    borderRadius: "6px",
                    fontWeight: "600",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  },
                  arrow: {
                    backgroundColor: "white",
                    border: "1px solid var(--primary)",
                  },
                }}
              >
                <Button
                  onClick={handleAddClick}
                  size="sm"
                  className="flex justify-center items-center gap-2 cursor-pointer hover:bg-primary! hover:text-white! transition-colors text-primary! dark:bg-gray-800! dark:hover:bg-primary"
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
                    background: "white",
                    color: "#20B7FA",
                    fontSize: "24px",
                    fontWeight: 700,
                    lineHeight: "100%",
                  }}
                >
                  Add
                </Button>
              </Tooltip>
            )
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="overflow-y-auto overflow-x-hidden grid-scroll h-full">
        {/* Tabs Section */}
        {tabsSection}

        <div className="">
          {/* Mobile Layout - Two Rows */}
          {isMobile || isTab ? (
            <div className="px-6 pt-4 mb-3">
              {/* First Row - All Buttons */}
              <div className="flex items-center justify-between mb-3">
                {/* Left Side Buttons */}
                <div className="flex items-center gap-1">
                  {/* View Toggle Button */}
                  {showTableButton && (
                    <Tooltip
                      label={viewMode === "grid" ? "List" : "Grid"}
                      position="top"
                      withArrow
                      arrowSize={8}
                      styles={{
                        tooltip: {
                          fontSize: "14px",
                          padding: "8px 12px",
                          backgroundColor: "white",
                          color: "var(--primary)",
                          border: "1px solid var(--primary)",
                          borderRadius: "6px",
                          fontWeight: "600",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                        arrow: {
                          backgroundColor: "white",
                          border: "1px solid var(--primary)",
                        },
                      }}
                    >
                      <Button
                        onClick={() =>
                          handleViewModeChange(
                            viewMode === "grid" ? "list" : "grid"
                          )
                        }
                        size="sm"
                        className="min-w-[40px] px-2 cursor-pointer border bg-white text-primary! border-primary hover:bg-primary hover:text-white dark:bg-gray-800"
                      >
                        {viewMode === "grid" ? (
                          <List size={16} />
                        ) : (
                          <Grid3x3 size={16} />
                        )}
                      </Button>
                    </Tooltip>
                  )}
                  {/* Import Button - only show in grid view */}
                  {viewMode === "grid" && (
                    <Tooltip
                      label="Import"
                      position="top"
                      withArrow
                      arrowSize={8}
                      styles={{
                        tooltip: {
                          fontSize: "14px",
                          padding: "8px 12px",
                          backgroundColor: "white",
                          color: "var(--primary)",
                          border: "1px solid var(--primary)",
                          borderRadius: "6px",
                          fontWeight: "600",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                        arrow: {
                          backgroundColor: "white",
                          border: "1px solid var(--primary)",
                        },
                      }}
                    >
                      <Button
                        onClick={() => {
                          setModalData({
                            title: "Import User",
                            message: (
                              <ImportStepperTemp
                                opened={isImportOpen}
                                onClose={() => setIsImportOpen(false)}
                              />
                            ),
                          });
                          setIsImportOpen(true);
                        }}
                        size="sm"
                        className="min-w-[40px] px-2 cursor-pointer border border-primary hover:text-white hover:bg-primary bg-white text-primary! dark:bg-gray-800"
                      >
                        <Download size={16} />
                      </Button>
                    </Tooltip>
                  )}

                  {/* Visibility Button - only show in list view */}
                  {viewMode === "list" && (
                    <Tooltip
                      label="Visibility"
                      position="top"
                      withArrow
                      arrowSize={8}
                      styles={{
                        tooltip: {
                          fontSize: "14px",
                          padding: "8px 12px",
                          backgroundColor: "white",
                          color: "var(--primary)",
                          border: "1px solid var(--primary)",
                          borderRadius: "6px",
                          fontWeight: "600",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                        arrow: {
                          backgroundColor: "white",
                          border: "1px solid var(--primary)",
                        },
                      }}
                    >
                      <Button
                        onClick={() => {
                          if (showVisibility) {
                            setShowVisibility(false);
                          } else {
                            setShowVisibility(true);
                            setIsExportOpen(false);
                            setIsFilterOpen(false);
                          }
                        }}
                        size="sm"
                        className={`min-w-[40px] px-2 cursor-pointer border border-primary ${
                          showVisibility
                            ? "bg-primary text-white border-primary hover:bg-primary dark:bg-gray-900"
                            : "hover:text-white hover:bg-primary bg-white text-primary! dark:bg-gray-900"
                        }`}
                      >
                        {showVisibility ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </Button>
                    </Tooltip>
                  )}
                </div>

                {/* Right Side Buttons */}
                <div className="flex items-center gap-1">
                  {/* Export Button */}
                  {showExportButton && (
                    <Tooltip
                      label="Export"
                      position="top"
                      withArrow
                      arrowSize={8}
                      styles={{
                        tooltip: {
                          fontSize: "14px",
                          padding: "8px 12px",
                          backgroundColor: "white",
                          color: "var(--primary)",
                          border: "1px solid var(--primary)",
                          borderRadius: "6px",
                          fontWeight: "600",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                        arrow: {
                          backgroundColor: "white",
                          border: "1px solid var(--primary)",
                        },
                      }}
                    >
                      <Button
                        onClick={() => {
                          if (isExportOpen) {
                            setIsExportOpen(false);
                          } else {
                            setIsExportOpen(true);
                            setShowVisibility(false);
                            setIsFilterOpen(false);
                          }
                        }}
                        size="sm"
                        className={`min-w-[40px] px-2 cursor-pointer border border-primary ${
                          isExportOpen
                            ? "bg-primary text-white border-primary hover:bg-primary"
                            : "hover:text-white hover:bg-primary bg-white text-primary! dark:bg-gray-800!"
                        }`}
                      >
                        <Upload size={16} />
                      </Button>
                    </Tooltip>
                  )}

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
                        backgroundColor: "white",
                        color: "var(--primary)",
                        border: "1px solid var(--primary)",
                        borderRadius: "6px",
                        fontWeight: "600",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                      arrow: {
                        backgroundColor: "white",
                        border: "1px solid var(--primary)",
                      },
                    }}
                  >
                    <Button
                      onClick={() => {
                        if (isFilterOpen) {
                          setIsFilterOpen(false);
                        } else {
                          setIsFilterOpen(true);
                          setShowVisibility(false);
                          setIsExportOpen(false);
                        }
                      }}
                      size="sm"
                      className={`min-w-[40px] px-2 cursor-pointer border border-primary ${
                        isFilterOpen
                          ? "bg-primary text-white border-primary hover:bg-primary"
                          : "hover:text-white hover:bg-primary bg-white text-primary! dark:bg-gray-800"
                      }`}
                    >
                      <Filter size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </div>

              {/* Second Row - Search Bar (Full Width) */}
              <div className="w-full">
                <HeaderSearch
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            </div>
          ) : (
            /* Desktop Layout - Original Single Row */
            <div className="flex items-center justify-between px-6 pt-4 mb-3 relative">
              {/* View Mode Toggle - RTL aware */}
              <div
                className={`flex items-center gap-2 ${
                  isRTL ? "order-2" : "order-1"
                }`}
              >
                {/* View Toggle Button - shows opposite of current view */}
                {showTableButton && (
                  <Tooltip
                    label={viewMode === "grid" ? "List" : "Grid"}
                    position="top"
                    withArrow
                    arrowSize={8}
                    styles={{
                      tooltip: {
                        fontSize: "14px",
                        padding: "8px 12px",
                        backgroundColor: "white",
                        color: "var(--primary)",
                        border: "1px solid var(--primary)",
                        borderRadius: "6px",
                        fontWeight: "600",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                      arrow: {
                        backgroundColor: "white",
                        border: "1px solid var(--primary)",
                      },
                    }}
                  >
                    <Button
                      onClick={() =>
                        handleViewModeChange(
                          viewMode === "grid" ? "list" : "grid"
                        )
                      }
                      size="sm"
                      className="min-w-[60px] cursor-pointer border bg-white text-primary! border-primary hover:bg-primary hover:text-white dark:bg-gray-800"
                    >
                      {viewMode === "grid" ? (
                        <>
                          <List size={16} />
                          <span className="ml-1 text-sm font-medium">List</span>
                        </>
                      ) : (
                        <>
                          <Grid3x3 size={16} />
                          <span className="ml-1 text-sm font-medium">Grid</span>
                        </>
                      )}
                    </Button>
                  </Tooltip>
                )}

                {/* Import Button - only show in grid view */}
                {viewMode === "grid" && (
                  <Tooltip
                    label="Import"
                    position="top"
                    withArrow
                    arrowSize={8}
                    styles={{
                      tooltip: {
                        fontSize: "14px",
                        padding: "8px 12px",
                        backgroundColor: "white",
                        color: "var(--primary)",
                        border: "1px solid var(--primary)",
                        borderRadius: "6px",
                        fontWeight: "600",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                      arrow: {
                        backgroundColor: "white",
                        border: "1px solid var(--primary)",
                      },
                    }}
                  >
                    <Button
                      onClick={() => {
                        setModalData({
                          title: "Import User",
                          message: (
                            <ImportStepperTemp
                              opened={isImportOpen}
                              onClose={() => setIsImportOpen(false)}
                            />
                          ),
                        });
                        setIsImportOpen(true);
                      }}
                      size="sm"
                      className="min-w-[60px] cursor-pointer border border-primary hover:text-white hover:bg-primary bg-white text-primary! dark:bg-gray-800"
                    >
                      <Download size={16} />
                      <span className="ml-1 text-sm font-semibold">Import</span>
                    </Button>
                  </Tooltip>
                )}

                {/* Visibility Button - only show in list view */}
                {viewMode === "list" && (
                  <Tooltip
                    label="Visibility"
                    position="top"
                    withArrow
                    arrowSize={8}
                    styles={{
                      tooltip: {
                        fontSize: "14px",
                        padding: "8px 12px",
                        backgroundColor: "white",
                        color: "var(--primary)",
                        border: "1px solid var(--primary)",
                        borderRadius: "6px",
                        fontWeight: "600",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                      arrow: {
                        backgroundColor: "white",
                        border: "1px solid var(--primary)",
                      },
                    }}
                  >
                    <Button
                      onClick={() => {
                        if (showVisibility) {
                          setShowVisibility(false);
                        } else {
                          setShowVisibility(true);
                          setIsExportOpen(false);
                          setIsFilterOpen(false);
                        }
                      }}
                      size="sm"
                      className={`min-w-[60px] cursor-pointer border border-primary ${
                        showVisibility
                          ? "bg-primary text-white border-primary hover:bg-primary  dark:bg-gray-900"
                          : "hover:text-white hover:bg-primary bg-white text-primary! dark:bg-gray-800"
                      }`}
                    >
                      <Eye size={16} />
                      <span className="ml-1 text-sm font-semibold">
                        Visibility
                      </span>
                    </Button>
                  </Tooltip>
                )}
              </div>

              {/* Search with focus-sensitive icons - Always centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <HeaderSearch
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>

              {/* Action Buttons Toggle - RTL aware */}
              <div
                className={`flex items-center gap-2 ${
                  isRTL ? "order-1" : "order-3"
                }`}
              >
                {/* Export Button */}
                {showExportButton && (
                  <Tooltip
                    label="Export"
                    position="top"
                    withArrow
                    arrowSize={8}
                    styles={{
                      tooltip: {
                        fontSize: "14px",
                        padding: "8px 12px",
                        backgroundColor: "white",
                        color: "var(--primary)",
                        border: "1px solid var(--primary)",
                        borderRadius: "6px",
                        fontWeight: "600",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                      arrow: {
                        backgroundColor: "white",
                        border: "1px solid var(--primary)",
                      },
                    }}
                  >
                    <Button
                      onClick={() => {
                        if (isExportOpen) {
                          setIsExportOpen(false);
                        } else {
                          setIsExportOpen(true);
                          setShowVisibility(false);
                          setIsFilterOpen(false);
                        }
                      }}
                      size="sm"
                      className={`min-w-[60px] cursor-pointer border border-primary ${
                        isExportOpen
                          ? "bg-primary text-white border-primary hover:bg-primary dark:bg-gray-900"
                          : "hover:text-white hover:bg-primary bg-white text-primary! dark:bg-gray-800"
                      }`}
                    >
                      <Upload size={16} />
                      <span className="ml-1 text-sm font-semibold">Export</span>
                    </Button>
                  </Tooltip>
                )}

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
                      backgroundColor: "white",
                      color: "var(--primary)",
                      border: "1px solid var(--primary)",
                      borderRadius: "6px",
                      fontWeight: "600",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    },
                    arrow: {
                      backgroundColor: "white",
                      border: "1px solid var(--primary)",
                    },
                  }}
                >
                  <Button
                    onClick={() => {
                      if (isFilterOpen) {
                        setIsFilterOpen(false);
                      } else {
                        setIsFilterOpen(true);
                        setShowVisibility(false);
                        setIsExportOpen(false);
                      }
                    }}
                    size="sm"
                    className={`min-w-[60px] cursor-pointer border border-primary ${
                      isFilterOpen
                        ? "bg-primary text-white border-primary hover:bg-primary dark:bg-gray-900"
                        : "hover:text-white hover:bg-primary bg-white text-primary! dark:bg-gray-800"
                    }`}
                  >
                    <Filter size={16} />
                    <span className="ml-1 text-sm font-semibold">Filter</span>
                  </Button>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
        {/* Scrollable Content Area */}
        {children}
      </div>

      <ImportStepperTemp
        opened={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />
    </div>
  );
};

export default PageLayout;
