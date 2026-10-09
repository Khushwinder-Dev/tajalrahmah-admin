import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@mantine/core";
import { useState } from "react";

interface ExportImportDatabasePopupProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  onDelete: () => void;
  title: string;
  tableView: "Backup" | "Restore";
  description: string;
}

export function ExportImportDatabasePopup({
  opened,
  setOpened,
  onDelete,
  title,
  description,
  tableView,
}: ExportImportDatabasePopupProps) {
  const [isManul, setIsManul] = useState<boolean>(false);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={title}
      size="sm"
      centered
      withCloseButton={false}
      classNames={{
        title: "text-lg font-semibold",
        body: "space-y-4",
      }}
    >
      <div className="space-y-4">
        <p className="text-sm">{description}</p>
        <div className="flex justify-end gap-2">
          {tableView === "Backup" ? (
            <form className="w-full">
              <div className="flex items-center gap-6 mb-6">
                <label className="flex items-center gap-1 text-base font-medium">
                  <input
                    type="radio"
                    name="mode"
                    value="manual"
                    checked={isManul}
                    className="accent-blue-600"
                    onChange={() => setIsManul(true)}
                  />
                  Manual
                </label>
                <label className="flex items-center gap-1 text-base font-medium">
                  <input
                    type="radio"
                    name="mode"
                    value="automatic"
                    checked={!isManul}
                    className="accent-blue-600"
                    onChange={() => setIsManul(false)}
                  />
                  Automatic
                </label>
              </div>
              {isManul ? (
                <div className="flex gap-8">
                  <Button>Create Backup</Button>
                </div>
              ) : (
                <>
                  <div className="flex gap-8">
                    <div className="flex flex-col w-1/2">
                      <label className="font-semibold mb-1">
                        Backup Frequency<span className="text-red-500">*</span>
                      </label>
                      <select className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="font-semibold mb-1">
                        Time<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        defaultValue="12:00"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Button
                      type="submit"
                      className="bg-sky-500 hover:bg-sky-600 text-white text-lg px-8 py-2 shadow-md rounded"
                    >
                      Set Schedule
                    </Button>
                  </div>
                </>
              )}
            </form>
          ) : (
            <form className="w-full">
              <Input type="file" placeholder="Select File" className="w-full" />

              <div className="flex gap-8 mt-8">
                <Button variant="outline" onClick={() => setOpened(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onDelete();
                    setOpened(false);
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
}
