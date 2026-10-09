// components/ResetFormModal.tsx
import React from "react";
import { Modal, Text, Group, Stack } from "@mantine/core";
import { Button } from "@/components/ui/button";
// import { AlertTriangle } from "lucide-react";

interface ResetFormModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ResetFormModal: React.FC<ResetFormModalProps> = ({
  opened,
  onClose,
  onConfirm,
  // title = "Are you sure?",
  message = "All data will be resetted.",
  confirmText = "Reset",
  cancelText = "Cancel",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size="xs" // Smaller width
      radius="lg"
      padding="xl"
      overlayProps={{
        backgroundOpacity: 0.25,
        blur: 1,
      }}
    >
      <Stack gap="lg" align="center" className="py-4">
        {/* Warning Icon */}
        {/* <ThemeIcon
          size={70}
          radius="xl"
          variant="light"
          color="orange"
          className="bg-orange-50 border-2 border-orange-200"
        >
          <AlertTriangle
            size={35}
            className="text-orange-500"
            strokeWidth={1.5}
          />
        </ThemeIcon> */}

        {/* Title */}
        {/* <Text size="xl" fw={600} ta="center" className="text-gray-800">
          {title}
        </Text> */}

        {/* Message */}
        <Text
          size="sm"
          c="dimmed"
          ta="center"
          className="text-gray-600! font-semibold! text-base!"
          style={{ lineHeight: 1.4 }}
        >
          {message}
        </Text>

        {/* Action Buttons - Centered */}
        <Group gap="sm" justify="center" className="mt-2 flex! gap-4!">
          <Button
            onClick={handleConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium"
          >
            {confirmText}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-full font-medium"
          >
            {cancelText}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
