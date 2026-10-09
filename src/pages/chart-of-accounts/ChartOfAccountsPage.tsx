/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/ChartOfAccountsPage.tsx
import { useState } from "react";
import { Card, Text, TextInput, ActionIcon, Menu, Badge } from "@mantine/core";
import {
  Plus,
  MoreVertical,
  FileText,
  ChevronRight,
  ChevronDown,
  Trash2,
  Edit3,
  PanelLeft,
  PanelLeftClose,
  Building2,
  Wallet,
  DollarSign,
  TrendingUp,
  TrendingDown,
  FolderOpen,
  X,
  GripVertical,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import video from "@/assets/videos/test.mp4";
import TranslationPageLayout from "./ChartOfAccountPageLayout";
import ChartOfAccountsDetails from "./ChartOfAccountsDetails";
import { Autocomplete } from "./AutoComplete";
import { mockChartOfAccounts } from "@/mockData/chart-of-accounts";
import {
  // mockChartOfAccountsData,
  type ChartAccount,
} from "@/mockData/MockChartPdf";
import { ChartOfAccountsPDF } from "./ChartOfAccountsPDF";
import { pdf } from "@react-pdf/renderer";

// Types for Chart of Accounts with serial numbers
interface Level4Account {
  id: string;
  name: string;
  accountNumber: string;
  accountType: "dr" | "cr";
  balance: number;
  description?: string;
  serialNumber: number;
  isActive?: boolean; // Add active/inactive state
}

interface Level3Account {
  id: string;
  name: string;
  accountNumber: string;
  isExpanded: boolean;
  level4Accounts: Level4Account[];
  serialNumber: number;
}

interface Level2Account {
  id: string;
  name: string;
  accountNumber: string;
  isExpanded: boolean;
  level3Accounts: Level3Account[];
  serialNumber: number;
}

interface Level1Account {
  id: string;
  name: string;
  accountNumber: string;
  isExpanded: boolean;
  accountType:
    | "asset"
    | "liability"
    | "equity"
    | "revenue"
    | "expense"
    | "custom";
  level2Accounts: Level2Account[];
  serialNumber: number;
}

// Drag item interface for dnd-kit
interface DragItem {
  id: string;
  level: number;
  parentIds?: string[];
  serialNumber: number;
}

const ChartOfAccountsPage = () => {
  // Sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Search state
  const [selectedAccountFromAutocomplete, setSelectedAccountFromAutocomplete] =
    useState("");
  const [selectedLevel1, setSelectedLevel1] = useState<string>("");

  // Initialize with comprehensive demo data for all Level 1 accounts (with serial numbers)
  const [level1Accounts, setLevel1Accounts] =
    useState<Level1Account[]>(mockChartOfAccounts);

  // Add tree version state for forcing re-renders
  const [treeVersion, setTreeVersion] = useState(0);

  const [selectedAccount, setSelectedAccount] = useState<{
    level: 1 | 2 | 3 | 4;
    accountId: string;
    level1Id: string;
    level2Id?: string;
    level3Id?: string;
  } | null>(null);

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // DnD Kit state
  const [activeItem, setActiveItem] = useState<DragItem | null>(null);

  // Configure sensors for dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance to start dragging
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedItem = findItemById(active.id as string);
    console.log("draggedItem", draggedItem);
    if (draggedItem) {
      setActiveItem(draggedItem);
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveItem(null);
      return;
    }

    const activeItem = findItemById(active.id as string);
    const overItem = findItemById(over.id as string);

    if (!activeItem || !overItem) {
      setActiveItem(null);
      return;
    }

    // Only allow reordering within the same level and same parent
    if (
      activeItem.level !== overItem.level ||
      JSON.stringify(activeItem.parentIds) !==
        JSON.stringify(overItem.parentIds)
    ) {
      setActiveItem(null);
      return;
    }

    // Perform the reordering
    moveAccount(activeItem, overItem);
    setActiveItem(null);
  };

  // Find item by ID and return drag item info
  const findItemById = (id: string): DragItem | null => {
    for (const l1 of level1Accounts) {
      if (l1.id === id) {
        return {
          id: l1.id,
          level: 1,
          parentIds: [],
          serialNumber: l1.serialNumber,
        };
      }

      for (const l2 of l1.level2Accounts) {
        if (l2.id === id) {
          return {
            id: l2.id,
            level: 2,
            parentIds: [l1.id],
            serialNumber: l2.serialNumber,
          };
        }

        for (const l3 of l2.level3Accounts) {
          if (l3.id === id) {
            return {
              id: l3.id,
              level: 3,
              parentIds: [l1.id, l2.id],
              serialNumber: l3.serialNumber,
            };
          }

          for (const l4 of l3.level4Accounts) {
            if (l4.id === id) {
              return {
                id: l4.id,
                level: 4,
                parentIds: [l1.id, l2.id, l3.id],
                serialNumber: l4.serialNumber,
              };
            }
          }
        }
      }
    }
    return null;
  };

  // Move account function using dnd-kit with tree reset
  const moveAccount = (activeItem: DragItem, overItem: DragItem) => {
    console.log("moveAccount called:", { activeItem, overItem });

    setLevel1Accounts((prev) => {
      console.log("Current accounts before move:", prev);
      // Create deep copy to ensure immutability
      const newAccounts = JSON.parse(JSON.stringify(prev));

      if (activeItem.level === 1) {
        console.log("Moving Level 1 account");
        const activeIndex = newAccounts.findIndex(
          (acc: any) => acc.id === activeItem.id
        );
        const overIndex = newAccounts.findIndex(
          (acc: any) => acc.id === overItem.id
        );

        console.log("Indices:", { activeIndex, overIndex });

        if (activeIndex === -1 || overIndex === -1) {
          console.log("Invalid indices");
          return prev;
        }

        const reorderedAccounts = arrayMove(
          newAccounts,
          activeIndex,
          overIndex
        );

        // Update serial numbers
        reorderedAccounts.forEach((acc: any, index: number) => {
          console.log(
            `Updating Level 1 account ${acc.name} serial from ${
              acc.serialNumber
            } to ${index + 1}`
          );
          acc.serialNumber = index + 1;
        });

        console.log(
          "Level 1 accounts after move:",
          reorderedAccounts.map((acc: any) => ({
            name: acc.name,
            serial: acc.serialNumber,
          }))
        );

        // Force tree re-render after state update
        setTimeout(() => setTreeVersion((prev) => prev + 1), 0);

        return reorderedAccounts;
      } else if (
        activeItem.level === 2 &&
        activeItem.parentIds &&
        activeItem.parentIds.length >= 1
      ) {
        console.log("Moving Level 2 account");
        const level1Account = newAccounts.find(
          (acc: any) => acc.id === activeItem.parentIds![0]
        );
        if (!level1Account) {
          console.log("Level 1 account not found");
          return prev;
        }

        console.log(
          "Level 2 accounts before move:",
          level1Account.level2Accounts.map((acc: any) => ({
            name: acc.name,
            serial: acc.serialNumber,
          }))
        );

        const activeIndex = level1Account.level2Accounts.findIndex(
          (acc: any) => acc.id === activeItem.id
        );
        const overIndex = level1Account.level2Accounts.findIndex(
          (acc: any) => acc.id === overItem.id
        );

        console.log("Indices:", { activeIndex, overIndex });

        if (activeIndex === -1 || overIndex === -1) {
          console.log("Invalid indices");
          return prev;
        }

        level1Account.level2Accounts = arrayMove(
          level1Account.level2Accounts,
          activeIndex,
          overIndex
        );

        // Update serial numbers
        level1Account.level2Accounts.forEach((acc: any, index: number) => {
          console.log(
            `Updating Level 2 account ${acc.name} serial from ${
              acc.serialNumber
            } to ${index + 1}`
          );
          acc.serialNumber = index + 1;
        });

        console.log(
          "Level 2 accounts after move:",
          level1Account.level2Accounts.map((acc: any) => ({
            name: acc.name,
            serial: acc.serialNumber,
          }))
        );

        // Force tree re-render after state update
        setTimeout(() => setTreeVersion((prev) => prev + 1), 0);
      } else if (
        activeItem.level === 3 &&
        activeItem.parentIds &&
        activeItem.parentIds.length >= 2
      ) {
        console.log("Moving Level 3 account");
        const level1Account = newAccounts.find(
          (acc: any) => acc.id === activeItem.parentIds![0]
        );
        const level2Account = level1Account?.level2Accounts.find(
          (acc: any) => acc.id === activeItem.parentIds![1]
        );

        if (!level2Account) {
          console.log("Level 2 account not found");
          return prev;
        }

        console.log(
          "Level 3 accounts before move:",
          level2Account.level3Accounts.map((acc: any) => ({
            name: acc.name,
            serial: acc.serialNumber,
          }))
        );

        const activeIndex = level2Account.level3Accounts.findIndex(
          (acc: any) => acc.id === activeItem.id
        );
        const overIndex = level2Account.level3Accounts.findIndex(
          (acc: any) => acc.id === overItem.id
        );

        console.log("Indices:", { activeIndex, overIndex });

        if (activeIndex === -1 || overIndex === -1) {
          console.log("Invalid indices");
          return prev;
        }

        level2Account.level3Accounts = arrayMove(
          level2Account.level3Accounts,
          activeIndex,
          overIndex
        );

        // Update serial numbers
        level2Account.level3Accounts.forEach((acc: any, index: number) => {
          console.log(
            `Updating Level 3 account ${acc.name} serial from ${
              acc.serialNumber
            } to ${index + 1}`
          );
          acc.serialNumber = index + 1;
        });

        console.log(
          "Level 3 accounts after move:",
          level2Account.level3Accounts.map((acc: any) => ({
            name: acc.name,
            serial: acc.serialNumber,
          }))
        );

        // Force tree re-render after state update
        setTimeout(() => setTreeVersion((prev) => prev + 1), 0);
      } else if (
        activeItem.level === 4 &&
        activeItem.parentIds &&
        activeItem.parentIds.length >= 3
      ) {
        console.log("Moving Level 4 account");
        const level1Account = newAccounts.find(
          (acc: any) => acc.id === activeItem.parentIds![0]
        );
        const level2Account = level1Account?.level2Accounts.find(
          (acc: any) => acc.id === activeItem.parentIds![1]
        );
        const level3Account = level2Account?.level3Accounts.find(
          (acc: any) => acc.id === activeItem.parentIds![2]
        );

        if (!level3Account) {
          console.log("Level 3 account not found");
          return prev;
        }

        console.log(
          "Level 4 accounts before move:",
          level3Account.level4Accounts.map((acc: any) => ({
            name: acc.name,
            serial: acc.serialNumber,
          }))
        );

        const activeIndex = level3Account.level4Accounts.findIndex(
          (acc: any) => acc.id === activeItem.id
        );
        const overIndex = level3Account.level4Accounts.findIndex(
          (acc: any) => acc.id === overItem.id
        );

        console.log("Indices:", { activeIndex, overIndex });

        if (activeIndex === -1 || overIndex === -1) {
          console.log("Invalid indices");
          return prev;
        }

        level3Account.level4Accounts = arrayMove(
          level3Account.level4Accounts,
          activeIndex,
          overIndex
        );

        // Update serial numbers
        level3Account.level4Accounts.forEach((acc: any, index: number) => {
          console.log(
            `Updating Level 4 account ${acc.name} serial from ${
              acc.serialNumber
            } to ${index + 1}`
          );
          acc.serialNumber = index + 1;
        });

        console.log(
          "Level 4 accounts after move:",
          level3Account.level4Accounts.map((acc: any) => ({
            name: acc.name,
            serial: acc.serialNumber,
          }))
        );

        // Force tree re-render after state update
        setTimeout(() => setTreeVersion((prev) => prev + 1), 0);
      }

      return newAccounts;
    });
  };

  // Toggle Level 4 account active/inactive
  const toggleLevel4Active = (
    level1Id: string,
    level2Id: string,
    level3Id: string,
    level4Id: string
  ) => {
    setLevel1Accounts((prev) =>
      prev.map((l1) =>
        l1.id === level1Id
          ? {
              ...l1,
              level2Accounts: l1.level2Accounts.map((l2) =>
                l2.id === level2Id
                  ? {
                      ...l2,
                      level3Accounts: l2.level3Accounts.map((l3) =>
                        l3.id === level3Id
                          ? {
                              ...l3,
                              level4Accounts: l3.level4Accounts.map((l4) =>
                                l4.id === level4Id
                                  ? { ...l4, isActive: !l4.isActive }
                                  : l4
                              ),
                            }
                          : l3
                      ),
                    }
                  : l2
              ),
            }
          : l1
      )
    );
  };

  // Sortable Level 4 Account Component
  const SortableLevel4Account = ({
    account,
    level1Id,
    level2Id,
    level3Id,
  }: {
    account: Level4Account;
    level1Id: string;
    level2Id: string;
    level3Id: string;
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: account.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={`flex items-center gap-3 p-3 ml-16 rounded-full hover:bg-white cursor-pointer group transition-all duration-200 ${
          selectedAccount?.accountId === account.id &&
          selectedAccount.level === 4
            ? "bg-white shadow-sm border border-gray-300/50"
            : "bg-white"
        } ${isDragging ? "opacity-50 scale-95 bg-blue-100 shadow-lg" : ""}`}
        onClick={() => {
          setSelectedAccount({
            level: 4,
            accountId: account.id,
            level1Id,
            level2Id,
            level3Id,
          });
          setIsAddNewLevel4Account(false);
        }}
      >
        {/* Drag handle */}
        {/* <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing flex-shrink-0 p-1 hover:bg-gray-100 rounded"
          type="button"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical
            size={14}
            className="text-gray-400 opacity-0 group-hover:opacity-100"
          />
        </button> */}

        <div className="w-6" />

        {/* Active/Inactive Icon */}
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={(e) => {
            e.stopPropagation();
            toggleLevel4Active(level1Id, level2Id, level3Id, account.id);
          }}
          className={`rounded-full ${
            account.isActive !== false
              ? "text-green-600 hover:bg-green-50"
              : "text-red-600 hover:bg-red-50"
          }`}
        >
          {account.isActive !== false ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </ActionIcon>

        {editingItem === account.id ? (
          <TextInput
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") saveRename();
              if (e.key === "Escape") cancelRename();
            }}
            onBlur={saveRename}
            size="sm"
            className="flex-1"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="flex-1 flex items-center gap-3">
            <Text size="sm" className="font-semibold text-black">
              {account.accountNumber}
            </Text>
            <Text
              size="sm"
              className={`font-medium ${
                account.isActive !== false
                  ? "text-black"
                  : "text-gray-400 line-through"
              }`}
            >
              {account.name}
            </Text>
            <Badge
              size="sm"
              color={account.accountType === "dr" ? "blue" : "red"}
              variant="light"
              className="text-xs"
            >
              {account.accountType.toUpperCase()}
            </Badge>
            <Text
              size="sm"
              className={`ml-auto font-medium ${
                account.isActive !== false ? "text-gray-500" : "text-gray-400"
              }`}
            >
              ${account.balance.toLocaleString()}
            </Text>
          </div>
        )}
      </div>
    );
  };

  // Sortable Level 3 Account Component
  const SortableLevel3Account = ({
    account,
    level1Id,
    level2Id,
  }: {
    account: Level3Account;
    level1Id: string;
    level2Id: string;
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: account.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const sortedLevel4Accounts = account.level4Accounts.sort(
      (a, b) => a.serialNumber - b.serialNumber
    );
    const level4AccountIds = sortedLevel4Accounts.map((acc) => acc.id);

    return (
      <div key={account.id}>
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          className={`flex items-center gap-3 p-3 ml-12 rounded-full hover:bg-white cursor-pointer group transition-all duration-200 ${
            selectedAccount?.accountId === account.id &&
            selectedAccount.level === 3
              ? "bg-white shadow-sm border border-gray-300/50"
              : selectedAccount?.level3Id === account.id
              ? "bg-blue-50 border border-blue-200"
              : "bg-white"
          } ${isDragging ? "opacity-50 scale-95 bg-blue-100 shadow-lg" : ""}`}
          onClick={() => {
            toggleLevel3(level1Id, level2Id, account.id);
            setSelectedAccount({
              level: 3,
              accountId: account.id,
              level1Id,
              level2Id,
            });
          }}
        >
          {/* Drag handle */}
          {/* <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing flex-shrink-0 p-1 hover:bg-gray-100 rounded"
            type="button"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical
              size={14}
              className="text-gray-400 opacity-0 group-hover:opacity-100"
            />
          </button> */}

          <ActionIcon
            size="md"
            variant="subtle"
            onClick={(e) => {
              e.stopPropagation();
              toggleLevel3(level1Id, level2Id, account.id);
              setSelectedAccount({
                level: 3,
                accountId: account.id,
                level1Id,
                level2Id,
              });
            }}
            className="hover:bg-gray-100 rounded-lg"
          >
            {account.isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </ActionIcon>

          <FileText size={18} className="text-gray-500" />

          <div
            className="flex-1 flex items-center gap-3"
            onClick={() => {
              toggleLevel3(level1Id, level2Id, account.id);
              setSelectedAccount({
                level: 3,
                accountId: account.id,
                level1Id,
                level2Id,
              });
            }}
          >
            {editingItem === account.id ? (
              <TextInput
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") saveRename();
                  if (e.key === "Escape") cancelRename();
                }}
                onBlur={saveRename}
                size="sm"
                className="flex-1"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <Text size="md" className="font-medium text-blue-400!">
                  {account.accountNumber}
                </Text>
                <Text size="md" className="font-medium text-blue-400!">
                  {account.name}
                </Text>
              </>
            )}
          </div>

          <Menu shadow="md" width={240}>
            <Menu.Target>
              <ActionIcon
                size="md"
                variant="subtle"
                className="opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-lg transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<Plus size={18} />}
                onClick={() => addLevel4Account()}
                className="text-base"
              >
                Add Level 4 Account
              </Menu.Item>
              <Menu.Item
                leftSection={<Edit3 size={18} />}
                onClick={() => startRename(account.id, account.name)}
                className="text-base"
              >
                Rename
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<Trash2 size={18} />}
                color="red"
                onClick={() => {
                  setLevel1Accounts((prev) =>
                    prev.map((l1) =>
                      l1.id === level1Id
                        ? {
                            ...l1,
                            level2Accounts: l1.level2Accounts.map((l2) =>
                              l2.id === level2Id
                                ? {
                                    ...l2,
                                    level3Accounts: l2.level3Accounts
                                      .filter((l3) => l3.id !== account.id)
                                      .map((l3, index) => ({
                                        ...l3,
                                        serialNumber: index + 1,
                                      })),
                                  }
                                : l2
                            ),
                          }
                        : l1
                    )
                  );
                }}
                className="text-base"
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        {account.isExpanded && (
          <div className="space-y-2 mt-2">
            <SortableContext
              items={level4AccountIds}
              strategy={verticalListSortingStrategy}
            >
              {sortedLevel4Accounts.map((l4Account) => (
                <SortableLevel4Account
                  key={l4Account.id}
                  account={l4Account}
                  level1Id={level1Id}
                  level2Id={level2Id}
                  level3Id={account.id}
                />
              ))}
            </SortableContext>
          </div>
        )}
      </div>
    );
  };

  // Sortable Level 2 Account Component
  const SortableLevel2Account = ({
    account,
    level1Id,
  }: {
    account: Level2Account;
    level1Id: string;
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: account.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const sortedLevel3Accounts = account.level3Accounts.sort(
      (a, b) => a.serialNumber - b.serialNumber
    );
    const level3AccountIds = sortedLevel3Accounts.map((acc) => acc.id);

    return (
      <div key={account.id}>
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          className={`flex items-center gap-3 p-3 ml-6 rounded-full hover:bg-white/60 cursor-pointer group transition-all duration-200 ${
            selectedAccount?.accountId === account.id &&
            selectedAccount.level === 2
              ? "bg-white shadow-sm border border-gray-300/50"
              : selectedAccount?.level2Id === account.id
              ? "bg-blue-50 border border-blue-200"
              : "bg-white"
          } ${isDragging ? "opacity-50 scale-95 bg-blue-100 shadow-lg" : ""}`}
          onClick={() => {
            toggleLevel2(level1Id, account.id);
            setSelectedAccount({
              level: 2,
              accountId: account.id,
              level1Id,
            });
          }}
        >
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing flex-shrink-0 p-1 hover:bg-gray-100 rounded"
            type="button"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical
              size={14}
              className="text-gray-400 opacity-0 group-hover:opacity-100"
            />
          </button>

          <ActionIcon
            size="md"
            variant="subtle"
            onClick={(e) => {
              e.stopPropagation();
              toggleLevel2(level1Id, account.id);
            }}
            className="hover:bg-gray-100 rounded-lg"
          >
            {account.isExpanded ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </ActionIcon>

          <FileText size={20} className="text-gray-600" />

          <div
            className="flex-1 flex items-center gap-3"
            onClick={() => {
              toggleLevel2(level1Id, account.id);
              setSelectedAccount({
                level: 2,
                accountId: account.id,
                level1Id,
              });
            }}
          >
            {editingItem === account.id ? (
              <TextInput
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") saveRename();
                  if (e.key === "Escape") cancelRename();
                }}
                onBlur={saveRename}
                size="sm"
                className="flex-1"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <Text size="md" className="font-semibold text-blue-600!">
                  {account.accountNumber}
                </Text>
                <Text size="md" className="font-semibold text-blue-600!">
                  {account.name}
                </Text>
              </>
            )}
          </div>

          <Menu shadow="md" width={240}>
            <Menu.Target>
              <ActionIcon
                size="md"
                variant="subtle"
                className="opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-lg transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<Plus size={18} />}
                onClick={() => addLevel3Account(level1Id, account.id)}
                className="text-base"
              >
                Add Level 3 Account
              </Menu.Item>
              <Menu.Item
                leftSection={<Edit3 size={18} />}
                onClick={() => startRename(account.id, account.name)}
                className="text-base"
              >
                Rename
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<Trash2 size={18} />}
                color="red"
                onClick={() => {
                  setLevel1Accounts((prev) =>
                    prev.map((l1) =>
                      l1.id === level1Id
                        ? {
                            ...l1,
                            level2Accounts: l1.level2Accounts
                              .filter((l2) => l2.id !== account.id)
                              .map((l2, index) => ({
                                ...l2,
                                serialNumber: index + 1,
                              })),
                          }
                        : l1
                    )
                  );
                }}
                className="text-base"
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        {account.isExpanded && (
          <div className="space-y-2 mt-2">
            <SortableContext
              items={level3AccountIds}
              strategy={verticalListSortingStrategy}
            >
              {sortedLevel3Accounts.map((l3Account) => (
                <SortableLevel3Account
                  key={l3Account.id}
                  account={l3Account}
                  level1Id={level1Id}
                  level2Id={account.id}
                />
              ))}
            </SortableContext>
          </div>
        )}
      </div>
    );
  };

  // Sortable Level 1 Account Component
  const SortableLevel1Account = ({ account }: { account: Level1Account }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: account.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    // IMPORTANT: Sort the accounts first, then get IDs
    const sortedLevel2Accounts = account.level2Accounts.sort(
      (a, b) => a.serialNumber - b.serialNumber
    );
    const level2AccountIds = sortedLevel2Accounts.map((acc) => acc.id);

    return (
      <div key={account.id} className="mb-3">
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          className={`flex items-center gap-3 p-2 rounded-full hover:bg-white cursor-pointer group transition-all duration-200 ${
            selectedAccount?.accountId === account.id &&
            selectedAccount.level === 1
              ? "bg-white shadow-md border border-gray-300/50 dark:bg-gray-800"
              : selectedAccount?.level1Id === account.id
              ? "bg-blue-50 border border-blue-200"
              : "bg-gray-50 dark:bg-gray-800"
          } ${isDragging ? "opacity-50 scale-95 bg-blue-100 shadow-lg" : ""}`}
        >
          {/* Drag handle */}
          {/* <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing flex-shrink-0 p-1 hover:bg-gray-100 rounded"
            type="button"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical
              size={16}
              className="text-gray-400 opacity-0 group-hover:opacity-100"
            />
          </button> */}

          <ActionIcon
            size="lg"
            variant="subtle"
            onClick={(e) => {
              e.stopPropagation();
              toggleLevel1(account.id);
              setSelectedAccount({
                level: 1,
                accountId: account.id,
                level1Id: account.id,
              });
              setSelectedLevel1(account.id);
            }}
            className="hover:bg-gray-100 rounded-lg dark:bg-gray-800"
          >
            {account.isExpanded ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </ActionIcon>

          {getAccountTypeIcon(account.accountType, 22)}

          <div
            className="flex-1 flex items-center gap-4"
            onClick={() => {
              toggleLevel1(account.id);
              setSelectedAccount({
                level: 1,
                accountId: account.id,
                level1Id: account.id,
              });
              setSelectedLevel1(account.id);
            }}
          >
            {editingItem === account.id ? (
              <TextInput
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") saveRename();
                  if (e.key === "Escape") cancelRename();
                }}
                onBlur={saveRename}
                size="md"
                className="flex-1 dark:bg-gray-800"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <Text size="lg" className="font-bold text-blue-900!">
                  {account.accountNumber}
                </Text>
                <Text size="lg" className="font-bold text-blue-900!">
                  {account.name}
                </Text>
              </>
            )}
          </div>

          <Menu shadow="md" width={240}>
            <Menu.Target>
              <ActionIcon
                size="lg"
                variant="subtle"
                className="opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-lg transition-all duration-200 dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical size={20} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<Plus size={18} />}
                onClick={() => addLevel2Account(account.id)}
                className="text-base"
              >
                Add Level 2 Account
              </Menu.Item>
              <Menu.Item
                leftSection={<Edit3 size={18} />}
                onClick={() => startRename(account.id, account.name)}
                className="text-base"
              >
                Rename
              </Menu.Item>
              {account.accountType === "custom" && (
                <>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<Trash2 size={18} />}
                    color="red"
                    onClick={() => deleteLevel1Account(account.id)}
                    className="text-base"
                  >
                    Delete
                  </Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </div>

        {account.isExpanded && (
          <div className="mt-3 space-y-2">
            <SortableContext
              items={level2AccountIds}
              strategy={verticalListSortingStrategy}
            >
              {sortedLevel2Accounts.map((l2Account) => {
                return (
                  <SortableLevel2Account
                    key={l2Account.id}
                    account={l2Account}
                    level1Id={account.id}
                  />
                );
              })}
            </SortableContext>
          </div>
        )}
      </div>
    );
  };

  // Function to flatten all accounts for autocomplete
  const getAllAccountsFlat = () => {
    const allAccounts: Array<{
      id: string;
      name: string;
      accountNumber: string;
      level: number;
      displayName: string;
      level1Id: string;
      level2Id?: string;
      level3Id?: string;
      accountType?: string;
    }> = [];

    level1Accounts.forEach((l1) => {
      // Add Level 1 account
      allAccounts.push({
        id: l1.id,
        name: l1.name,
        accountNumber: l1.accountNumber,
        level: 1,
        displayName: `${l1.accountNumber} - ${l1.name} (Level 1)`,
        level1Id: l1.id,
        accountType: l1.accountType,
      });

      // Add Level 2 accounts
      l1.level2Accounts.forEach((l2) => {
        allAccounts.push({
          id: l2.id,
          name: l2.name,
          accountNumber: l2.accountNumber,
          level: 2,
          displayName: `${l2.accountNumber} - ${l2.name} (Level 2)`,
          level1Id: l1.id,
          level2Id: l2.id,
        });

        // Add Level 3 accounts
        l2.level3Accounts.forEach((l3) => {
          allAccounts.push({
            id: l3.id,
            name: l3.name,
            accountNumber: l3.accountNumber,
            level: 3,
            displayName: `${l3.accountNumber} - ${l3.name} (Level 3)`,
            level1Id: l1.id,
            level2Id: l2.id,
            level3Id: l3.id,
          });

          // Add Level 4 accounts
          l3.level4Accounts.forEach((l4) => {
            allAccounts.push({
              id: l4.id,
              name: l4.name,
              accountNumber: l4.accountNumber,
              level: 4,
              displayName: `${l4.accountNumber} - ${l4.name} (Level 4)`,
              level1Id: l1.id,
              level2Id: l2.id,
              level3Id: l3.id,
              accountType: l4.accountType,
            });
          });
        });
      });
    });

    return allAccounts;
  };

  // Get autocomplete options
  const autocompleteOptions = getAllAccountsFlat().map(
    (account) => account.displayName
  );

  // Handle autocomplete selection
  const handleAutocompleteChange = (selectedDisplayName: string) => {
    setSelectedAccountFromAutocomplete(selectedDisplayName);

    if (!selectedDisplayName) {
      setSelectedAccount(null);
      setSelectedLevel1("");
      return;
    }

    // Find the selected account
    const allAccounts = getAllAccountsFlat();
    const selectedAccount = allAccounts.find(
      (acc) => acc.displayName === selectedDisplayName
    );

    if (selectedAccount) {
      // Set the selected account for details panel
      setSelectedAccount({
        level: selectedAccount.level as 1 | 2 | 3 | 4,
        accountId: selectedAccount.id,
        level1Id: selectedAccount.level1Id,
        level2Id: selectedAccount.level2Id,
        level3Id: selectedAccount.level3Id,
      });

      // Set selected level 1 for chart display
      setSelectedLevel1(selectedAccount.level1Id);

      // Auto-expand the tree to show the selected account
      autoExpandToAccount(selectedAccount);
    }
  };

  // Function to auto-expand tree to show selected account
  const autoExpandToAccount = (account: any) => {
    setLevel1Accounts((prev) =>
      prev.map((l1) => {
        if (l1.id === account.level1Id) {
          return {
            ...l1,
            isExpanded: true,
            level2Accounts: l1.level2Accounts.map((l2) => {
              if (l2.id === account.level2Id) {
                return {
                  ...l2,
                  isExpanded: true,
                  level3Accounts: l2.level3Accounts.map((l3) => {
                    if (l3.id === account.level3Id) {
                      return {
                        ...l3,
                        isExpanded: true,
                      };
                    }
                    return l3;
                  }),
                };
              }
              return l2;
            }),
          };
        }
        return l1;
      })
    );
  };

  // Clear autocomplete selection
  const clearAutocompleteSelection = () => {
    setSelectedAccountFromAutocomplete("");
    setSelectedAccount(null);
    setSelectedLevel1("");
  };

  // Helper function to get next serial number
  const getNextSerialNumber = (accounts: any[]) => {
    if (accounts.length === 0) return 1;
    return Math.max(...accounts.map((acc) => acc.serialNumber)) + 1;
  };

  const filteredLevel1Accounts = level1Accounts.sort(
    (a, b) => a.serialNumber - b.serialNumber
  );

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Get account type icon
  const getAccountTypeIcon = (accountType: string, size = 16) => {
    switch (accountType) {
      case "asset":
        return <Building2 size={size} className="text-blue-600" />;
      case "liability":
        return <Wallet size={size} className="text-red-600" />;
      case "equity":
        return <DollarSign size={size} className="text-purple-600" />;
      case "revenue":
        return <TrendingUp size={size} className="text-green-600" />;
      case "expense":
        return <TrendingDown size={size} className="text-orange-600" />;
      case "custom":
        return <FolderOpen size={size} className="text-gray-600" />;
      default:
        return <FileText size={size} className="text-gray-600" />;
    }
  };

  // Generate next account number
  const generateAccountNumber = (parentNumber: string, level: number) => {
    const baseNumber = parentNumber.padEnd(4, "0");
    const existingNumbers = getAllAccountNumbers();
    let counter = 1;
    let newNumber = "";

    do {
      newNumber = baseNumber + counter.toString().padStart(level, "0");
      counter++;
    } while (existingNumbers.includes(newNumber));

    return newNumber;
  };

  // Get all existing account numbers
  const getAllAccountNumbers = (): string[] => {
    const numbers: string[] = [];

    level1Accounts.forEach((l1) => {
      numbers.push(l1.accountNumber);
      l1.level2Accounts.forEach((l2) => {
        numbers.push(l2.accountNumber);
        l2.level3Accounts.forEach((l3) => {
          numbers.push(l3.accountNumber);
          l3.level4Accounts.forEach((l4) => {
            numbers.push(l4.accountNumber);
          });
        });
      });
    });

    return numbers;
  };

  // Add account functions (with serial numbers)
  const addLevel2Account = (level1Id: string) => {
    const level1Account = level1Accounts.find((acc) => acc.id === level1Id);
    if (!level1Account) return;

    const newAccount: Level2Account = {
      id: `${level1Id}-l2-${Date.now()}`,
      name: "New Level 2 Account",
      accountNumber: generateAccountNumber(level1Account.accountNumber, 2),
      isExpanded: false,
      level3Accounts: [],
      serialNumber: getNextSerialNumber(level1Account.level2Accounts),
    };

    setLevel1Accounts((prev) =>
      prev.map((acc) =>
        acc.id === level1Id
          ? { ...acc, level2Accounts: [...acc.level2Accounts, newAccount] }
          : acc
      )
    );

    setEditingItem(newAccount.id);
    setEditingName(newAccount.name);
    setActiveItem(null);
  };

  const addLevel3Account = (level1Id: string, level2Id: string) => {
    const level2Account = level1Accounts
      .find((l1) => l1.id === level1Id)
      ?.level2Accounts.find((l2) => l2.id === level2Id);
    if (!level2Account) return;

    const newAccount: Level3Account = {
      id: `${level2Id}-l3-${Date.now()}`,
      name: "New Level 3 Account",
      accountNumber: generateAccountNumber(level2Account.accountNumber, 3),
      isExpanded: false,
      level4Accounts: [],
      serialNumber: getNextSerialNumber(level2Account.level3Accounts),
    };

    setLevel1Accounts((prev) =>
      prev.map((l1) =>
        l1.id === level1Id
          ? {
              ...l1,
              level2Accounts: l1.level2Accounts.map((l2) =>
                l2.id === level2Id
                  ? {
                      ...l2,
                      level3Accounts: [...l2.level3Accounts, newAccount],
                    }
                  : l2
              ),
            }
          : l1
      )
    );

    setEditingItem(newAccount.id);
    setEditingName(newAccount.name);
  };

  const [isAddNewLevel4Account, setIsAddNewLevel4Account] = useState(false);

  const addLevel4Account = () => {
    setIsAddNewLevel4Account(true);

    // const level3Account = level1Accounts
    //   .find((l1) => l1.id === level1Id)
    //   ?.level2Accounts.find((l2) => l2.id === level2Id)
    //   ?.level3Accounts.find((l3) => l3.id === level3Id);
    // if (!level3Account) return;

    // const newAccount: Level4Account = {
    //   id: `${level3Id}-l4-${Date.now()}`,
    //   name: "New Level 4 Account",
    //   accountNumber: generateAccountNumber(level3Account.accountNumber, 4),
    //   accountType: "dr",
    //   balance: 0,
    //   description: "",
    //   serialNumber: getNextSerialNumber(level3Account.level4Accounts),
    //   isActive: true, // Default to active
    // };

    // setLevel1Accounts((prev) =>
    //   prev.map((l1) =>
    //     l1.id === level1Id
    //       ? {
    //           ...l1,
    //           level2Accounts: l1.level2Accounts.map((l2) =>
    //             l2.id === level2Id
    //               ? {
    //                   ...l2,
    //                   level3Accounts: l2.level3Accounts.map((l3) =>
    //                     l3.id === level3Id
    //                       ? {
    //                           ...l3,
    //                           level4Accounts: [
    //                             ...l3.level4Accounts,
    //                             newAccount,
    //                           ],
    //                         }
    //                       : l3
    //                   ),
    //                 }
    //               : l2
    //           ),
    //         }
    //       : l1
    //   )
    // );

    // setEditingItem(newAccount.id);
    // setEditingName(newAccount.name);
  };

  // Toggle expand/collapse functions
  const toggleLevel1 = (accountId: string) => {
    setLevel1Accounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, isExpanded: !acc.isExpanded } : acc
      )
    );
  };

  const toggleLevel2 = (level1Id: string, level2Id: string) => {
    setLevel1Accounts((prev) =>
      prev.map((l1) =>
        l1.id === level1Id
          ? {
              ...l1,
              level2Accounts: l1.level2Accounts.map((l2) =>
                l2.id === level2Id ? { ...l2, isExpanded: !l2.isExpanded } : l2
              ),
            }
          : l1
      )
    );
  };

  const toggleLevel3 = (
    level1Id: string,
    level2Id: string,
    level3Id: string
  ) => {
    setLevel1Accounts((prev) =>
      prev.map((l1) =>
        l1.id === level1Id
          ? {
              ...l1,
              level2Accounts: l1.level2Accounts.map((l2) =>
                l2.id === level2Id
                  ? {
                      ...l2,
                      level3Accounts: l2.level3Accounts.map((l3) =>
                        l3.id === level3Id
                          ? { ...l3, isExpanded: !l3.isExpanded }
                          : l3
                      ),
                    }
                  : l2
              ),
            }
          : l1
      )
    );
  };

  // Delete functions with serial number reordering
  const deleteLevel1Account = (level1Id: string) => {
    setLevel1Accounts((prev) => {
      const filtered = prev.filter((l1) => l1.id !== level1Id);
      // Reorder serial numbers after deletion
      return filtered.map((acc, index) => ({
        ...acc,
        serialNumber: index + 1,
      }));
    });
    if (selectedAccount?.level1Id === level1Id) {
      setSelectedAccount(null);
    }
  };

  // Rename functions
  const startRename = (itemId: string, currentName: string) => {
    setEditingItem(itemId);
    setEditingName(currentName);
  };

  const saveRename = () => {
    if (!editingItem || !editingName.trim()) return;

    setLevel1Accounts((prev) =>
      prev.map((l1) => {
        if (l1.id === editingItem) {
          return { ...l1, name: editingName.trim() };
        }

        return {
          ...l1,
          level2Accounts: l1.level2Accounts.map((l2) => {
            if (l2.id === editingItem) {
              return { ...l2, name: editingName.trim() };
            }

            return {
              ...l2,
              level3Accounts: l2.level3Accounts.map((l3) => {
                if (l3.id === editingItem) {
                  return { ...l3, name: editingName.trim() };
                }

                return {
                  ...l3,
                  level4Accounts: l3.level4Accounts.map((l4) =>
                    l4.id === editingItem
                      ? { ...l4, name: editingName.trim() }
                      : l4
                  ),
                };
              }),
            };
          }),
        };
      })
    );

    setEditingItem(null);
    setEditingName("");
    setActiveItem(null); // Add this line to clear the dragging state
  };

  const cancelRename = () => {
    setEditingItem(null);
    setEditingName("");
    setActiveItem(null); // Add this line to clear the dragging state
  };

  // Get selected account details
  const getSelectedAccountDetails = () => {
    if (!selectedAccount) return null;

    const { level, accountId, level1Id, level2Id, level3Id } = selectedAccount;

    if (level === 4) {
      return level1Accounts
        .find((l1) => l1.id === level1Id)
        ?.level2Accounts.find((l2) => l2.id === level2Id)
        ?.level3Accounts.find((l3) => l3.id === level3Id)
        ?.level4Accounts.find((l4) => l4.id === accountId);
    }

    return null;
  };

  // Handle save and reset
  const handleSave = () => {
    console.log("=== SAVING CHART OF ACCOUNTS ===");
    console.log(
      "Complete Chart Data:",
      JSON.stringify(level1Accounts, null, 2)
    );
    alert(
      "Chart of Accounts saved successfully! Check console for detailed logs."
    );
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the chart of accounts?")) {
      setLevel1Accounts([
        {
          id: "assets",
          name: "Assets",
          accountNumber: "",
          isExpanded: false,
          accountType: "asset",
          level2Accounts: [],
          serialNumber: 1,
        },
        {
          id: "liabilities",
          name: "Liabilities",
          accountNumber: "",
          isExpanded: false,
          accountType: "liability",
          level2Accounts: [],
          serialNumber: 2,
        },
        {
          id: "equity",
          name: "Equity",
          accountNumber: "",
          isExpanded: false,
          accountType: "equity",
          level2Accounts: [],
          serialNumber: 3,
        },
        {
          id: "revenue",
          name: "Revenue",
          accountNumber: "",
          isExpanded: false,
          accountType: "revenue",
          level2Accounts: [],
          serialNumber: 4,
        },
        {
          id: "expenses",
          name: "Expenses",
          accountNumber: "",
          isExpanded: false,
          accountType: "expense",
          level2Accounts: [],
          serialNumber: 5,
        },
      ]);
      setSelectedAccount(null);
      console.log("Chart of Accounts has been reset");
    }
  };

  // Get level 1 account IDs for sortable context
  const level1AccountIds = filteredLevel1Accounts.map((acc) => acc.id);

  console.log("COA page triggered:");

  // Add this function to convert your existing data to PDF format
  const convertToPDFData = (accounts: Level1Account[]): ChartAccount[] => {
    const pdfData: ChartAccount[] = [];

    accounts.forEach((l1) => {
      // Add Level 1 account
      pdfData.push({
        accountNo: l1.accountNumber,
        accountName: l1.name,
        level: 1,
        type: getAccountTypeForPDF(l1.accountType),
        group: getAccountGroupForPDF(l1.accountType),
      });

      // Add Level 2 accounts
      l1.level2Accounts.forEach((l2) => {
        pdfData.push({
          accountNo: l2.accountNumber,
          accountName: l2.name,
          level: 2,
          type: getAccountTypeForPDF(l1.accountType),
          group: getAccountGroupForPDF(l1.accountType),
        });

        // Add Level 3 accounts
        l2.level3Accounts.forEach((l3) => {
          pdfData.push({
            accountNo: l3.accountNumber,
            accountName: l3.name,
            level: 3,
            type: getAccountTypeForPDF(l1.accountType),
            group: getAccountGroupForPDF(l1.accountType),
          });

          // Add Level 4 accounts
          l3.level4Accounts.forEach((l4) => {
            pdfData.push({
              accountNo: l4.accountNumber,
              accountName: l4.name,
              level: 4,
              type: l4.accountType === "dr" ? "Debit" : "Credit",
              group: getAccountGroupForPDF(l1.accountType),
            });
          });
        });
      });
    });

    return pdfData;
  };

  // Helper functions
  const getAccountTypeForPDF = (accountType: string): "Debit" | "Credit" => {
    switch (accountType) {
      case "asset":
      case "expense":
        return "Debit";
      case "liability":
      case "equity":
      case "revenue":
        return "Credit";
      default:
        return "Debit";
    }
  };

  const getAccountGroupForPDF = (accountType: string): "TA" | "BL" | "PS" => {
    switch (accountType) {
      case "asset":
        return "TA"; // Total Assets
      case "liability":
        return "BL"; // Balance
      case "equity":
      case "revenue":
      case "expense":
        return "PS"; // Profit & Loss
      default:
        return "TA";
    }
  };

  // Add this function to handle PDF export
  const handlePDFExport = async () => {
    try {
      // Use mock data for now, or convert your real data
      const pdfData = convertToPDFData(level1Accounts); // or convertToPDFData(level1Accounts);

      const doc = <ChartOfAccountsPDF accounts={pdfData} />;
      const blob = await pdf(doc).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `chart-of-accounts-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <TranslationPageLayout
        title="Chart of Accounts"
        videoSrc={video}
        videoHeader="Chart of Accounts Tutorial"
        onSave={handleSave}
        onReset={handleReset}
        onExport={(format) => {
          if (format === "pdf") {
            handlePDFExport();
          } else if (format === "print") {
            // handlePrint();
          }
        }}
      >
        <style>{`
       .google-meet-button {
         --md-filled-tonal-button-container-shape: 24px;
         --md-filled-tonal-button-container-height: 48px;
         --md-filled-tonal-button-label-text-font: 'Inter', system-ui, sans-serif;
         --md-filled-tonal-button-label-text-size: 14px;
         --md-filled-tonal-button-label-text-weight: 500;
         min-width: 60px;
         width: 60px;
         background-color: #43a5fa!important;
         border: none!important;
         transition: all 0.2s ease-in-out;
         --md-sys-color-secondary-container: #43a5fa;
         --md-sys-color-on-secondary-container: #ffffff;
       }
               
       .google-meet-button:hover:not(:disabled) {
         background-color: #43a5fa !important;
         transform: translateY(-1px);
         box-shadow: 0 4px 12px rgba(25, 118, 210, 0.25);
       }
               
       .google-meet-button:active:not(:disabled) {
         background-color: #43a5fa !important;
         transform: translateY(0px);
       }
               
       .button-content {
         display: flex;
         align-items: center;
         justify-content: center;
         padding: 10px;
       }
               
       .icon-wrapper {
         display: flex;
         align-items: center;
         justify-content: center;
         width: 20px;
         height: 20px;
       }

       .search-input {
         border: 1px solid #e2e8f0;
         border-radius: 25px;
         padding: 8px 16px 8px 40px;
         font-size: 14px;
         transition: all 0.2s ease;
         background: #f8fafc;
       }

       .search-input:focus {
         outline: none;
         border-color: #43a5fa;
         background: white;
         box-shadow: 0 0 0 3px rgba(67, 165, 250, 0.1);
       }

       .search-container {
         position: relative;
       }

       .search-icon {
         position: absolute;
         left: 12px;
         top: 50%;
         transform: translateY(-50%);
         color: #64748b;
         pointer-events: none;
       }

       .clear-icon {
         position: absolute;
         right: 12px;
         top: 50%;
         transform: translateY(-50%);
         color: #64748b;
         cursor: pointer;
         opacity: 0;
         transition: opacity 0.2s ease;
       }

       .search-container:hover .clear-icon,
       .search-input:focus + .clear-icon {
         opacity: 1;
       }

       .clear-icon:hover {
         color: #334155;
       }

       /* DnD Kit Custom Styles */
       .cursor-grab {
         cursor: grab;
       }
       
       .cursor-grab:active {
         cursor: grabbing;
       }

       /* Enhanced drag visual feedback for dnd-kit */
       .dragging {
         opacity: 0.5;
         transform: scale(0.95) rotate(2deg);
         transition: all 0.2s ease-in-out;
         box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
         border: 2px solid #3b82f6;
         background: linear-gradient(135deg, #dbeafe, #bfdbfe);
         z-index: 1000;
       }

       /* Drop zone styling */
       .drop-zone {
         background-color: rgba(67, 165, 250, 0.1);
         border: 2px dashed #43a5fa;
         transition: all 0.2s ease-in-out;
       }

       .autocomplete-container {
         position: relative;
       }

       .autocomplete-input {
         border: 1px solid #e2e8f0;
         border-radius: 25px;
         padding: 8px 40px 8px 16px;
         font-size: 14px;
         transition: all 0.2s ease;
         background: #f8fafc;
       }

       .autocomplete-input:focus {
         outline: none;
         border-color: #43a5fa;
         background: white;
         box-shadow: 0 0 0 3px rgba(67, 165, 250, 0.1);
       }

       .clear-autocomplete-icon {
         position: absolute;
         right: 12px;
         top: 50%;
         transform: translateY(-50%);
         color: #64748b;
         cursor: pointer;
         opacity: 0;
         transition: opacity 0.2s ease;
       }

       :hover .clear-autocomplete-icon {
         opacity: 1;
       }

       .clear-autocomplete-icon:hover {
         color: #334155;
       }

       /* Smooth transitions for all account items */
       .account-item {
         transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
       }

       .account-item:hover {
         transform: translateY(-1px);
       }

       /* Responsive adjustments */
       @media (max-width: 768px) {
         .dragging {
           transform: scale(0.9) rotate(1deg);
         }
       }
     `}</style>
        <div className="flex h-full overflow-auto min-w-0 smooth-scroll dark:bg-gray-800">
          {/* Left Sidebar with smooth animation - 30% width */}
          <div
            className={`flex-shrink-0 transition-all duration-800 ease-in-out dark:bg-gray-800 ${
              isSidebarCollapsed ? "w-0" : "w-[30%]"
            }`}
          >
            <div
              className={`h-full transition-opacity duration-800 ease-in-out dark:bg-gray-800 ${
                isSidebarCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="h-full bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 shadow-sm overflow-hidden flex flex-col">
                {/* Header with autocomplete */}
                <div className="flex-shrink-0 mb-4">
                  <div className="autocomplete-container">
                    <Autocomplete
                      className="min-w-[250px] w-full relative z-50"
                      id="accountSearch"
                      name="accountSearch"
                      hideCheckMark
                      options={autocompleteOptions}
                      value={selectedAccountFromAutocomplete}
                      onValueChange={handleAutocompleteChange}
                      placeholder="Search..."
                      labelText=""
                      styles={{
                        input: {
                          borderColor: "var(--primary)",
                          "&:focus": {
                            borderColor: "var(--primary)",
                          },
                        },
                      }}
                    />
                    {selectedAccountFromAutocomplete && (
                      <X
                        size={16}
                        className="clear-autocomplete-icon"
                        onClick={clearAutocompleteSelection}
                      />
                    )}
                  </div>
                </div>

                {/* Accounts List */}
                <div className="flex-1 overflow-x-auto overflow-y-auto min-h-0 smooth-scroll">
                  <div className="space-y-2 min-w-max pr-2">
                    <SortableContext
                      key={`level1-${treeVersion}`} // Force re-render with tree version
                      items={level1AccountIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {filteredLevel1Accounts.length > 0 ? (
                        filteredLevel1Accounts.map((account) => (
                          <SortableLevel1Account
                            key={`${account.id}-${treeVersion}`} // Force re-render with tree version
                            account={account}
                          />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <FileText
                            size={32}
                            className="text-gray-400 mx-auto mb-2"
                          />
                          <Text size="sm" className="text-gray-500">
                            No accounts available
                          </Text>
                        </div>
                      )}
                    </SortableContext>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collapse/Expand Button */}
          <div className="flex-shrink-0 flex items-start pt-4 mx-2">
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200 dark:bg-gray-800"
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isSidebarCollapsed ? (
                <PanelLeft size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </ActionIcon>
          </div>

          {/* Right Content Area with smooth animation */}
          <div
            className={`transition-all duration-300 ease-in-out min-w-0 dark:bg-gray-800 ${
              isSidebarCollapsed
                ? "flex-1 min-w-[400px]"
                : "flex-1 min-w-[400px]"
            }`}
          >
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="h-full overflow-hidden rounded-2xl!"
            >
              <div className="h-full overflow-x-auto overflow-y-auto smooth-scroll">
                <div className="min-w-max min-h-full">
                  <ChartOfAccountsDetails
                    isAddNewLevel4Account={isAddNewLevel4Account}
                    setIsAddNewLevel4Account={setIsAddNewLevel4Account}
                    chartData={level1Accounts}
                    selectedAccount={selectedAccount}
                    setSelectedAccount={setSelectedAccount}
                    accountDetails={getSelectedAccountDetails()}
                    selectedLevel1={selectedLevel1}
                    onUpdateAccount={(accountId: string, updates: any) => {
                      // Handle account updates
                      console.log("Updating account:", accountId, updates);
                    }}
                    onAddLevel4Account={(
                      level1Id,
                      level2Id,
                      level3Id,
                      accountData
                    ) => {
                      // Add the new Level 4 account
                      const newAccount: Level4Account = {
                        id: `${level3Id}-l4-${Date.now()}`,
                        name: accountData.name,
                        accountNumber: accountData.accountNumber,
                        accountType: accountData.accountType,
                        balance: accountData.balance,
                        description: accountData.description || "",
                        serialNumber: getNextSerialNumber(
                          level1Accounts
                            .find((l1) => l1.id === level1Id)
                            ?.level2Accounts.find((l2) => l2.id === level2Id)
                            ?.level3Accounts.find((l3) => l3.id === level3Id)
                            ?.level4Accounts || []
                        ),
                        isActive: true, // Default to active
                      };

                      setLevel1Accounts((prev) =>
                        prev.map((l1) =>
                          l1.id === level1Id
                            ? {
                                ...l1,
                                level2Accounts: l1.level2Accounts.map((l2) =>
                                  l2.id === level2Id
                                    ? {
                                        ...l2,
                                        level3Accounts: l2.level3Accounts.map(
                                          (l3) =>
                                            l3.id === level3Id
                                              ? {
                                                  ...l3,
                                                  level4Accounts: [
                                                    ...l3.level4Accounts,
                                                    newAccount,
                                                  ],
                                                }
                                              : l3
                                        ),
                                      }
                                    : l2
                                ),
                              }
                            : l1
                        )
                      );

                      // Auto-select the newly created account
                      setSelectedAccount({
                        level: 4,
                        accountId: newAccount.id,
                        level1Id,
                        level2Id,
                        level3Id,
                      });

                      console.log("New Level 4 account added:", newAccount);
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          <span>Dragging-- {activeItem?.level}</span>
          {activeItem ? (
            <div className="bg-white shadow-lg border-2 border-blue-400 p-4 opacity-90 rounded-full">
              <div className="flex items-center gap-2">
                <GripVertical size={16} className="text-blue-500" />
                <Text size="sm" className="font-medium text-blue-900">
                  Dragging Level {activeItem.level} Account
                </Text>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </TranslationPageLayout>
    </DndContext>
  );
};

export default ChartOfAccountsPage;
