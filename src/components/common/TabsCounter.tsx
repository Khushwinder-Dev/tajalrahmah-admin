/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Group, Box } from "@mantine/core";
import { Grid, List } from "lucide-react";
import VerticalSummaryCards from "./grid-data-table/VerticalSummaryCards";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePermission } from "@/hooks/usePermissions";

export default function TabsCounter({
  cardConfigs,
  summaryData,
  timeLabel,
  viewMode,
  setViewMode,
  setIsExportOpen,
  isExportOpen,
  setIsFilterOpen,
  setShowVisibility,
}: {
  cardConfigs: any;
  summaryData: any;
  timeLabel: string;
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  setShowVisibility: (showVisibility: boolean) => void;
}) {
  const handleExportClick = () => {
    setIsExportOpen(!isExportOpen);
    setIsFilterOpen(false);
    setShowVisibility(false);
  };

  // get permission
  const canExport: boolean = usePermission("countries", "export");
  const canImport: boolean = usePermission("countries", "import");

  return (
    <Tabs
      variant="outline"
      defaultValue="gallery"
      styles={{
        panel: {
          borderLeft: "1px solid #dee2e6",
          borderRight: "1px solid #dee2e6",
          borderTop: "1px solid #dee2e6",
          padding: "1rem",
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
          <Tabs.List className="relative after:w-full after:h-[1px] after:bg-white after:absolute after:bottom-[-1px] after:left-0 after:content-[''] z-0 after:z-10">
            <Tabs.Tab value="gallery">
              <span className="font-bold">{timeLabel}</span>
            </Tabs.Tab>
          </Tabs.List>

          <Group gap="xs">
            {canImport && (
              <Button className="bg-sky-200 hover:bg-primary text-black rounded-full cursor-pointer mb-2">
                <span className="font-semibold">Import</span>
              </Button>
            )}
            {canExport && (
              <Button
                className={cn(
                  "bg-sky-200 hover:bg-primary text-black rounded-full cursor-pointer mb-2",
                  isExportOpen && "bg-primary text-white"
                )}
                onClick={handleExportClick}
              >
                <span className="font-semibold">Export</span>
              </Button>
            )}

            {/* Toggle Button :: List view and Grid view */}
            <div className="flex items-center">
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
            </div>
          </Group>
        </Group>
      </Box>

      <Tabs.Panel value="gallery" className="">
        <VerticalSummaryCards
          data={cardConfigs}
          statistics={summaryData}
          borderColor="border-gray-200"
        />
      </Tabs.Panel>
    </Tabs>
  );
}
