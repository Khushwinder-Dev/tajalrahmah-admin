import React from "react";
import { Badge, Group, Text } from "@mantine/core";
import { Wifi, WifiOff, Clock } from "lucide-react";

interface TranslationStatusProps {
  isLoading: boolean;
  isConfigured: boolean;
  lastTranslation?: string;
}

export const TranslationStatus: React.FC<TranslationStatusProps> = ({
  isLoading,
  isConfigured,
  lastTranslation,
}) => {
  return (
    <Group justify="space-between" align="center" className="mb-2">
      <Group>
        <Text size="xs" c="gray">
          Translation Service:
        </Text>
        <Badge
          color={isConfigured ? "green" : "red"}
          variant="light"
          size="sm"
          leftSection={
            isConfigured ? <Wifi size={10} /> : <WifiOff size={10} />
          }
        >
          {isConfigured ? "Online" : "Offline"}
        </Badge>
      </Group>

      {isLoading && (
        <Group>
          <Clock size={12} />
          <Text size="xs" c="blue">
            Translating...
          </Text>
        </Group>
      )}

      {lastTranslation && !isLoading && (
        <Text size="xs" c="gray">
          Last: "{lastTranslation}"
        </Text>
      )}
    </Group>
  );
};
