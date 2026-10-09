import { Button } from "@/components/ui/button";
import { Modal } from "@mantine/core";

interface DatabaseModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  onDelete: () => void;
  title: string;
  tableView: "Backup" | "Restore";
  description: string;
}

export function DatabaseModal({
  opened,
  setOpened,
  onDelete,
  title,
  description,
  tableView,
}: DatabaseModalProps) {
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
            {tableView === "Backup" ? "Delete" : "Restore"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
