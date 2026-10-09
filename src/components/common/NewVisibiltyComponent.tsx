import React, { useState, useEffect } from "react";
import {
  Paper,
  TextInput,
  Stack,
  Group,
  Text,
  Button,
  ScrollArea,
  Box,
  UnstyledButton,
  ActionIcon,
} from "@mantine/core";
import { X } from "lucide-react";
import type { Column } from "@tanstack/react-table";

// Custom Switch Component
interface CustomSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked,
  onChange,
  size = 20,
}) => {
  const trackWidth = size * 2;
  const trackHeight = 15;
  const thumbSize = size;

  return (
    <UnstyledButton
      onClick={() => onChange(!checked)}
      style={{
        width: trackWidth,
        height: trackHeight,
        borderRadius: trackHeight / 2,
        backgroundColor: checked ? "#a8c7fa" : "#e9ecef", // Light blue when on, gray when off
        position: "relative",
        transition: "all 0.2s ease",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: 0,
      }}
    >
      <Box
        style={{
          width: thumbSize,
          height: thumbSize,
          borderRadius: "50%",
          backgroundColor: checked ? "#4285f4" : "#ffffff", // Dark blue when on, white when off
          position: "absolute",
          left: checked ? trackWidth - thumbSize : 0,
          transition: "all 0.2s ease",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      />
    </UnstyledButton>
  );
};

interface ColumnVisibilityProps<TData> {
  table: {
    getAllColumns: () => Column<TData>[];
    getIsAllColumnsVisible: () => boolean;
    toggleAllColumnsVisible: (value: boolean) => void;
  };
  setShowVisibility: (value: boolean) => void;
}

const ColumnVisibility = <TData,>({
  table,
  setShowVisibility,
}: ColumnVisibilityProps<TData>) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [allColumnsVisible, setAllColumnsVisible] = useState(
    table.getIsAllColumnsVisible()
  );

  // Update allColumnsVisible when table state changes
  useEffect(() => {
    setAllColumnsVisible(table.getIsAllColumnsVisible());
  }, [table]);

  // Get filterable columns with search filter
  const filteredColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide())
    .filter(
      (column) =>
        !searchValue ||
        column.id.toLowerCase().includes(searchValue.toLowerCase())
    );

  const handleSwitchChange = (columnId: string, checked: boolean) => {
    const column = table.getAllColumns().find((col) => col.id === columnId);
    if (column) {
      column.toggleVisibility(checked);
      setAllColumnsVisible(table.getIsAllColumnsVisible());
    }
  };

  // const handleShowAll = () => {
  //   table.toggleAllColumnsVisible(true);
  //   setAllColumnsVisible(true);
  // };

  const handleHideAll = () => {
    table.toggleAllColumnsVisible(false);
    setAllColumnsVisible(false);
  };

  const handleResetAll = () => {
    table.toggleAllColumnsVisible(true);
    setAllColumnsVisible(true);
    setSearchValue("");
  };

  const handleClose = () => {
    setShowVisibility(false);
    setSearchValue("");
  };

  return (
    <Paper
      shadow="md"
      radius="md"
      p={0}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      {/* Header - Fixed */}
      <Box
        p="md"
        style={{ backgroundColor: "white", borderRadius: "8px 8px 0 0" }}
      >
        <Group justify="space-between" align="center">
          <Text size="lg" fw={500} c="blue"></Text>
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={handleClose}
            style={{ color: "#868e96" }}
          >
            <X size={16} />
          </ActionIcon>
        </Group>

        <Box style={{ position: "relative" }}>
          {/* Floating Label */}
          <Text
            size="sm"
            c="gray.6"
            style={{
              position: "absolute",
              top: isFocused || searchValue ? -8 : 12,
              left: isFocused || searchValue ? 0 : 32,
              fontSize: isFocused || searchValue ? "12px" : "14px",
              color: isFocused ? "#4285f4" : "#868e96",
              transition: "all 0.2s ease",
              backgroundColor: "white",
              padding: isFocused || searchValue ? "0 4px" : "0",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            Search...
          </Text>

          <TextInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            variant="unstyled"
            styles={{
              input: {
                backgroundColor: "transparent",
                border: "none",
                borderBottom: `2px solid #4285f4`,
                borderRadius: 0,
                paddingLeft: 12,
                paddingRight: 8,
                paddingTop: 12,
                paddingBottom: 8,
                fontSize: "14px",
                transition: "border-color 0.2s ease",
                "&:focus": {
                  borderBottom: "2px solid #4285f4",
                },
                "&::placeholder": {
                  color: "transparent",
                },
              },
              section: {
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
              },
            }}
          />
        </Box>
      </Box>

      {/* Select All Switch */}
      <Group
        justify="space-between"
        wrap="nowrap"
        mb="sm"
        style={{
          padding: "4px 16px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        <CustomSwitch
          checked={allColumnsVisible}
          onChange={(checked) => {
            table.toggleAllColumnsVisible(checked);
            setAllColumnsVisible(checked);
          }}
          size={20}
        />
        <Text size="sm" c="gray.7" style={{ flex: 1, fontWeight: 600 }}>
          Select All
        </Text>
      </Group>

      {/* Scrollable Content */}
      <ScrollArea flex={1} p="md" style={{ backgroundColor: "white" }}>
        <Stack>
          {filteredColumns.length > 0 ? (
            filteredColumns.map((column) => (
              <Group
                key={column.id}
                justify="space-between"
                wrap="nowrap"
                style={{
                  padding: "4px 0",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleSwitchChange(column.id, !column.getIsVisible())
                }
              >
                <CustomSwitch
                  checked={column.getIsVisible()}
                  onChange={(checked) => handleSwitchChange(column.id, checked)}
                  size={20}
                />
                <Text
                  size="sm"
                  c="gray.7"
                  style={{ flex: 1, marginLeft: 2, fontWeight: 600 }}
                >
                  {column.id}
                </Text>
              </Group>
            ))
          ) : (
            <Text size="sm" c="gray.5" ta="center" py="xl">
              No columns found
            </Text>
          )}
        </Stack>
      </ScrollArea>

      {/* Footer - Fixed */}
      <Group
        justify="space-between"
        style={{ backgroundColor: "white", borderRadius: "0 0 8px 8px" }}
      >
        <Button
          variant="subtle"
          color="blue"
          size="sm"
          onClick={handleHideAll}
          styles={{
            root: {
              fontWeight: 400,
              "&:hover": {
                backgroundColor: "rgba(66, 133, 244, 0.1)",
              },
            },
          }}
        >
          Hide All
        </Button>
        <Button
          variant="subtle"
          color="blue"
          size="sm"
          onClick={handleResetAll}
          styles={{
            root: {
              fontWeight: 400,
              "&:hover": {
                backgroundColor: "rgba(66, 133, 244, 0.1)",
              },
            },
          }}
        >
          Reset All
        </Button>
      </Group>
    </Paper>
  );
};

export default ColumnVisibility;
