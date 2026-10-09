import video from "@/assets/videos/test.mp4";

import VideoModal from "@/components/common/VideoModal";
import DatabaseTable from "./DatabaseTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExportImportDatabasePopup } from "./ExportImportDatabasePopup";

export default function DataabsePage() {
  const [tableView, setTableView] = useState<"Backup" | "Restore">("Backup");
  const [search, setSearch] = useState("");
  const [opened, setOpened] = useState(false);
  return (
    <>
      <div className="w-100vw px-2 py-4 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-8">
          {/* Left side - Title and Video */}
          <div className="flex items-center gap-4">
            <VideoModal src={video} header={"Tutorial video"} />
            <h1 className="text-2xl font-bold text-primary">Database</h1>
          </div>

          {/* Right side - Search and Create Button */}
          <div className="flex items-center gap-4">
            {tableView === "Backup" ? (
              <Button variant="outline" onClick={() => setOpened(true)}>
                Create Backup
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setOpened(true)}>
                Import Database
              </Button>
            )}
          </div>
        </div>

        {/* Time Sheet Tabale */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={() => setTableView("Backup")}
              variant={tableView === "Backup" ? "default" : "outline"}
            >
              Backup
            </Button>
            <Button
              onClick={() => setTableView("Restore")}
              variant={tableView === "Restore" ? "default" : "outline"}
            >
              Restore
            </Button>
          </div>

          {/* search for data */}
          <Input
            placeholder="Search..."
            className="w-50"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DatabaseTable tableView={tableView} search={search} />
      </div>

      <ExportImportDatabasePopup
        opened={opened}
        setOpened={setOpened}
        onDelete={() => {}}
        title={tableView === "Backup" ? "Create Backup" : "Import Database"}
        description={
          tableView === "Backup"
            ? "Are you sure you want to create a backup?"
            : "Are you sure you want to import a database?"
        }
        tableView={tableView}
      />
    </>
  );
}
