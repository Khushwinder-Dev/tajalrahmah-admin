import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { useTranslation } from "react-i18next";

import { Download, Filter, Import, List, Mic, Search } from "lucide-react";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine

type Props = {
  setViewMode: (viewMode: "grid" | "list") => void;
  setModalData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      message: React.ReactElement;
    }>
  >;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isExportOpen: boolean;
  setIsExportOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterOpen: boolean;
};

const GridTableHeader = ({
  setViewMode,
  setModalData,
  searchQuery,
  setSearchQuery,
  isExportOpen,
  setIsExportOpen,
  setIsFilterOpen,
  isFilterOpen,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 pb-2">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Left buttons */}
        <div className="col-span-4 flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-  rounded-full min-w-[60px] sm:min-w-[80px]"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List</span>
          </Button>
          <Button
            variant="outline"
            className="gap-2 cursor-pointer rounded-full"
            onClick={() => {
              open();
              setModalData({
                title: "Import Country",
                message: <ImportStepperTemp />,
              });
            }}
          >
            <Import className="h-4 w-4" />
            <span className="hidden sm:inline">{t("common.import")}</span>
          </Button>
        </div>

        {/* Search */}
        <div className="col-span-4 flex justify-center">
          <div className="w-full max-w-xs mx-auto">
            <div className="relative flex items-center rounded-full">
              <Search className="absolute left-3 h-4 w-4 text-gray-400 z-10" />
              <Input
                placeholder="Search..."
                className="pl-9 pr-9 w-full rounded-full relative z-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Tooltip
                arrowOffset={10}
                arrowSize={7}
                withArrow
                position="top"
                label="Search by voice"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0 z-10"
                >
                  <Mic className="h-4 w-4 text-blue-700" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Right buttons */}
        <div className="col-span-4 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            className={`gap-2 rounded-full ${
              isExportOpen ? "bg-primary text-white" : ""
            }`}
            onClick={() => {
              setIsExportOpen(!isExportOpen);
              setIsFilterOpen(false);
            }}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{t("common.export")}</span>
          </Button>

          <Button
            variant="outline"
            className={`gap-2 rounded-full ${
              isFilterOpen ? "bg-primary text-white" : ""
            }`}
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
              setIsExportOpen(false);
            }}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">{t("common.filters")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GridTableHeader;
