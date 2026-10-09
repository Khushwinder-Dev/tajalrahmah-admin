/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Group, Box } from "@mantine/core";
import VerticalSummaryCards from "./VerticalSummaryCards";
import MobileSummaryCards from "@/components/common/MobileSummaryCard";
import useIsMobile from "@/hooks/useIsMobile";
// import useIsTab from "@/hooks/useIsTab";

export default function TabsCounter({
  cardConfigs,
  summaryData,
}: {
  timeLabel: string;

  cardConfigs: any;
  summaryData: any;
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  setShowVisibility: (showVisibility: boolean) => void;
}) {
  const isMobile = useIsMobile();
  // const isTab = useIsTab();
  // get permission
  // const canImport: boolean = usePermission("countries", "import");

  return (
    <Tabs
      variant="outline"
      defaultValue="gallery"
      styles={{
        panel: {
          zIndex: 10,
          bottom: "-1px",
        },
        list: {
          borderBottom: "none",
        },
      }}
    >
      <Box style={{ position: "relative" }}>
        <Group
          justify="space-between"
          gap={0}
          style={{ alignItems: "flex-end" }}
        >
          {/* <Tabs.List className="relative after:w-full after:h-[1px] after:bg-white after:absolute after:bottom-[-1px] after:left-0 after:content-[''] z-0 after:z-10">
            <Tabs.Tab value="gallery">
              <span className="font-bold">{timeLabel}</span>
            </Tabs.Tab>
          </Tabs.List> */}

          <div className="flex justify-between w-full">
            {/* Toggle Button :: List view and Grid view */}
            {/* <div className="flex items-center">
              <button
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 relative cursor-pointer",
                  viewMode === "grid"
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-800"
                )}
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
              >
                {viewMode === "grid" ? (
                  <List className="h-5 w-5" />
                ) : (
                  <Grid className="h-5 w-5" />
                )}
              </button>
            </div> */}
            <Group gap="xs">
              {/* {canImport && (
                <Button className="bg-sky-200 hover:bg-primary text-black rounded-full cursor-pointer mb-2">
                  <span className="font-semibold">Import</span>
                </Button>
              )} */}
              {/* {canExport && (
                <Button
                  className={cn(
                    "bg-sky-200 hover:bg-primary text-black rounded-full cursor-pointer mb-2",
                    isExportOpen && "bg-primary text-white"
                  )}
                  onClick={handleExportClick}
                >
                  <span className="font-semibold">Export</span>
                </Button>
              )} */}
            </Group>
          </div>
        </Group>
      </Box>

      <Tabs.Panel value="gallery" className="">
        {isMobile ? (
          <MobileSummaryCards data={cardConfigs} statistics={summaryData} />
        ) : (
          <VerticalSummaryCards
            data={cardConfigs}
            statistics={summaryData}
            borderColor="border-gray-200"
          />
        )}
      </Tabs.Panel>
    </Tabs>
  );
}
