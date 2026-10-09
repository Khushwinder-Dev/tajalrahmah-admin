// pages/TranslationPage.tsx
import { useState } from "react";
import { Card, Text, TextInput, ActionIcon, Menu } from "@mantine/core";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MoreVertical,
  FileText,
  ChevronRight,
  ChevronDown,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  PanelLeft,
  PanelLeftClose,
} from "lucide-react";
import video from "@/assets/videos/test.mp4";
import TranslationPageLayout from "./TranslationPageLayout";
import TranslationTable from "./TranslationTable";
import { LanguageInputDropdown } from "./LanguageInputDropdown";

// Types (keeping all the same)
interface SubModule {
  id: string;
  name: string;
  type: "add" | "edit" | "grid" | "delete" | "view" | "custom";
}

interface Module {
  id: string;
  name: string;
  isExpanded: boolean;
  subModules: SubModule[];
}

interface TranslationData {
  [moduleId: string]: {
    [subModuleId: string]: {
      [fieldId: string]: {
        english: string;
        bangla: string;
        arabic: string;
        urdu: string;
        hindi: string;
      };
    };
  };
}

const TranslationPage = () => {
  // NEW STATE: Sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // All your existing state remains the same
  const [translations, setTranslations] = useState<TranslationData>({});
  const [moduleLanguageValues, setModuleLanguageValues] = useState<
    Record<string, string>
  >({});

  const [modules, setModules] = useState<Module[]>([
    {
      id: "sales",
      name: "Sales",
      isExpanded: false,
      subModules: [
        { id: "sales-customer", name: "Customer", type: "add" },
        { id: "sales-order", name: "Quotation", type: "edit" },
        { id: "sales-invoice", name: "Invoice", type: "grid" },
        { id: "sales-return", name: "Refund", type: "delete" },
      ],
    },
    {
      id: "stock",
      name: "Stock",
      isExpanded: false,
      subModules: [
        { id: "stock-invoice", name: "Invoice", type: "add" },
        { id: "stock-item", name: "Item", type: "edit" },
        { id: "stock-grid", name: "Grid", type: "grid" },
        { id: "stock-delete", name: "Delete", type: "delete" },
      ],
    },
    {
      id: "customer",
      name: "Customer",
      isExpanded: false,
      subModules: [
        { id: "customer-add", name: "Add", type: "add" },
        { id: "customer-edit", name: "Edit", type: "edit" },
        { id: "customer-grid", name: "Grid", type: "grid" },
      ],
    },
    {
      id: "city",
      name: "City",
      isExpanded: false,
      subModules: [
        { id: "city-add", name: "Add", type: "add" },
        { id: "city-edit", name: "Edit", type: "edit" },
      ],
    },
    {
      id: "purchase",
      name: "Purchase",
      isExpanded: false,
      subModules: [
        { id: "purchase-order", name: "Order", type: "add" },
        { id: "purchase-grid", name: "Grid", type: "edit" },
        { id: "purchase-grid", name: "Grid", type: "grid" },
        { id: "purchase-delete", name: "Delete", type: "delete" },
      ],
    },
    {
      id: "inventory",
      name: "Inventory",
      isExpanded: false,
      subModules: [
        { id: "inventory-add", name: "Add", type: "add" },
        { id: "inventory-edit", name: "Edit", type: "edit" },
      ],
    },
    {
      id: "supplier",
      name: "Supplier",
      isExpanded: false,
      subModules: [
        { id: "supplier-add", name: "Add", type: "add" },
        { id: "supplier-edit", name: "Edit", type: "edit" },
        { id: "supplier-grid", name: "Grid", type: "grid" },
      ],
    },
    {
      id: "city",
      name: "City",
      isExpanded: false,
      subModules: [
        { id: "city-add", name: "Add", type: "add" },
        { id: "city-edit", name: "Edit", type: "edit" },
      ],
    },
    {
      id: "unit",
      name: "Unit",
      isExpanded: false,
      subModules: [
        { id: "unit-add", name: "Add", type: "add" },
        { id: "unit-edit", name: "Edit", type: "edit" },
        { id: "unit-grid", name: "Grid", type: "grid" },
        { id: "unit-delete", name: "Delete", type: "delete" },
      ],
    },
    {
      id: "category",
      name: "Category",
      isExpanded: false,
      subModules: [
        { id: "category-add", name: "Add", type: "add" },
        { id: "category-edit", name: "Edit", type: "edit" },
        { id: "category-grid", name: "Grid", type: "grid" },
      ],
    },
    {
      id: "brand",
      name: "Brand",
      isExpanded: false,
      subModules: [
        { id: "brand-add", name: "Add", type: "add" },
        { id: "brand-edit", name: "Edit", type: "edit" },
      ],
    },
    {
      id: "country",
      name: "Country",
      isExpanded: false,
      subModules: [
        { id: "country-add", name: "Add", type: "add" },
        { id: "country-edit", name: "Edit", type: "edit" },
        { id: "country-grid", name: "Grid", type: "grid" },
        { id: "country-delete", name: "Delete", type: "delete" },
      ],
    },
    {
      id: "state",
      name: "State",
      isExpanded: false,
      subModules: [
        { id: "state-add", name: "Add", type: "add" },
        { id: "state-edit", name: "Edit", type: "edit" },
        { id: "state-grid", name: "Grid", type: "grid" },
      ],
    },
    {
      id: "city",
      name: "City",
      isExpanded: false,
      subModules: [
        { id: "city-add", name: "Add", type: "add" },
        { id: "city-edit", name: "Edit", type: "edit" },
      ],
    },
    {
      id: "country",
      name: "Country",
      isExpanded: false,
      subModules: [
        { id: "country-add", name: "Add", type: "add" },
        { id: "country-edit", name: "Edit", type: "edit" },
        { id: "country-grid", name: "Grid", type: "grid" },
        { id: "country-delete", name: "Delete", type: "delete" },
      ],
    },
    {
      id: "general",
      name: "General",
      isExpanded: false,
      subModules: [],
    },
    {
      id: "Messages",
      name: "Messages",
      isExpanded: false,
      subModules: [],
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<{
    moduleId: string;
    subModuleId?: string;
  } | null>({ moduleId: "country", subModuleId: "country-add" });

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // NEW FUNCTION: Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // All your existing functions remain exactly the same
  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      name: "New Module",
      isExpanded: false,
      subModules: [],
    };
    setModules((prev) => [...prev, newModule]);
    setEditingItem(newModule.id);
    setEditingName(newModule.name);
  };

  const addSubModule = (moduleId: string) => {
    const newSubModule: SubModule = {
      id: `${moduleId}-sub-${Date.now()}`,
      name: "New Sub Module",
      type: "custom",
    };

    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? { ...module, subModules: [...module.subModules, newSubModule] }
          : module
      )
    );

    setEditingItem(newSubModule.id);
    setEditingName(newSubModule.name);
  };

  const toggleModule = (moduleId: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? { ...module, isExpanded: !module.isExpanded }
          : module
      )
    );
  };

  const deleteModule = (moduleId: string) => {
    setModules((prev) => prev.filter((module) => module.id !== moduleId));
    if (selectedItem?.moduleId === moduleId) {
      setSelectedItem(null);
    }
  };

  const deleteSubModule = (moduleId: string, subModuleId: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              subModules: module.subModules.filter(
                (sub) => sub.id !== subModuleId
              ),
            }
          : module
      )
    );

    if (selectedItem?.subModuleId === subModuleId) {
      setSelectedItem({ moduleId });
    }
  };

  const startRename = (itemId: string, currentName: string) => {
    setEditingItem(itemId);
    setEditingName(currentName);
  };

  const saveRename = () => {
    if (!editingItem || !editingName.trim()) return;

    setModules((prev) =>
      prev.map((module) => {
        if (module.id === editingItem) {
          return { ...module, name: editingName.trim() };
        }

        return {
          ...module,
          subModules: module.subModules.map((sub) =>
            sub.id === editingItem ? { ...sub, name: editingName.trim() } : sub
          ),
        };
      })
    );

    setEditingItem(null);
    setEditingName("");
  };

  const cancelRename = () => {
    setEditingItem(null);
    setEditingName("");
  };

  const moveModule = (moduleId: string, direction: "up" | "down") => {
    setModules((prev) => {
      const index = prev.findIndex((m) => m.id === moduleId);
      if (index === -1) return prev;

      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newModules = [...prev];
      [newModules[index], newModules[newIndex]] = [
        newModules[newIndex],
        newModules[index],
      ];
      return newModules;
    });
  };

  const handleSave = () => {
    console.log("=== SAVING TRANSLATIONS ===");
    console.log(
      "Complete Translation Data:",
      JSON.stringify(translations, null, 2)
    );

    // Log summary statistics
    const moduleCount = Object.keys(translations).length;
    let totalFields = 0;
    let completedTranslations = 0;
    let totalTranslations = 0;

    Object.entries(translations).forEach(([moduleId, moduleData]) => {
      console.log("Module ID:", moduleId);
      Object.entries(moduleData).forEach(([subModuleId, fields]) => {
        console.log("Sub-module ID:", subModuleId);
        Object.entries(fields).forEach(([fieldId, translations]) => {
          console.log("Field ID:", fieldId);
          totalFields++;
          Object.entries(translations).forEach(([lang, value]) => {
            console.log("Language:", lang);
            console.log("Value:", value);
            totalTranslations++;
            if (value && value.trim() !== "") {
              completedTranslations++;
            }
          });
        });
      });
    });

    console.log("=== TRANSLATION STATISTICS ===");
    console.log(`Total Modules: ${moduleCount}`);
    console.log(`Total Fields: ${totalFields}`);
    console.log(`Total Translation Slots: ${totalTranslations}`);
    console.log(`Completed Translations: ${completedTranslations}`);
    console.log(
      `Completion Rate: ${(
        (completedTranslations / totalTranslations) *
        100
      ).toFixed(2)}%`
    );

    // Log each module's data
    Object.entries(translations).forEach(([moduleId, moduleData]) => {
      console.log(`\n=== MODULE: ${moduleId.toUpperCase()} ===`);
      Object.entries(moduleData).forEach(([subModuleId, fields]) => {
        console.log(`\n--- Sub-module: ${subModuleId} ---`);
        Object.entries(fields).forEach(([fieldId, fieldTranslations]) => {
          console.log(`Field: ${fieldId}`);
          console.log(`  English: "${fieldTranslations.english}"`);
          console.log(`  Bangla: "${fieldTranslations.bangla}"`);
          console.log(`  Arabic: "${fieldTranslations.arabic}"`);
          console.log(`  Urdu: "${fieldTranslations.urdu}"`);
          console.log(`  Hindi: "${fieldTranslations.hindi}"`);
        });
      });
    });

    alert("Translations saved successfully! Check console for detailed logs.");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all translations?")) {
      console.log("=== RESETTING TRANSLATIONS ===");
      console.log(
        "Previous translation data:",
        JSON.stringify(translations, null, 2)
      );
      setTranslations({});
      console.log("Translations have been reset");
    }
  };

  // Updated translation change handler to structure data properly
  const handleTranslationChange = (
    fieldId: string,
    languageCode: string,
    value: string
  ) => {
    if (!selectedItem) return;

    const moduleId = selectedItem.moduleId;
    const subModuleId = selectedItem.subModuleId || "main";

    console.log(
      `Translation Update: ${moduleId}/${subModuleId}/${fieldId}/${languageCode} = "${value}"`
    );

    setTranslations((prev) => {
      const updated = {
        ...prev,
        [moduleId]: {
          ...prev[moduleId],
          [subModuleId]: {
            ...prev[moduleId]?.[subModuleId],
            [fieldId]: {
              english:
                languageCode === "en"
                  ? value
                  : prev[moduleId]?.[subModuleId]?.[fieldId]?.english || "",
              bangla:
                languageCode === "bn"
                  ? value
                  : prev[moduleId]?.[subModuleId]?.[fieldId]?.bangla || "",
              arabic:
                languageCode === "ar"
                  ? value
                  : prev[moduleId]?.[subModuleId]?.[fieldId]?.arabic || "",
              urdu:
                languageCode === "ur"
                  ? value
                  : prev[moduleId]?.[subModuleId]?.[fieldId]?.urdu || "",
              hindi:
                languageCode === "hi"
                  ? value
                  : prev[moduleId]?.[subModuleId]?.[fieldId]?.hindi || "",
            },
          },
        },
      };

      // Log the updated structure for this field
      console.log(
        `Updated field data:`,
        updated[moduleId][subModuleId][fieldId]
      );

      return updated;
    });
  };

  const handleAddField = (label: string) => {
    if (!selectedItem) return;

    const moduleId = selectedItem.moduleId;
    const subModuleId = selectedItem.subModuleId || "main";
    const fieldId = `custom_${Date.now()}`;

    console.log(
      `Adding new field: ${moduleId}/${subModuleId}/${fieldId} - Label: "${label}"`
    );

    setTranslations((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [subModuleId]: {
          ...prev[moduleId]?.[subModuleId],
          [fieldId]: {
            english: label,
            bangla: "",
            arabic: "",
            urdu: "",
            hindi: "",
          },
        },
      },
    }));
  };

  const handleRemoveField = (fieldId: string) => {
    if (!selectedItem) return;

    const moduleId = selectedItem.moduleId;
    const subModuleId = selectedItem.subModuleId || "main";

    console.log(`Removing field: ${moduleId}/${subModuleId}/${fieldId}`);

    setTranslations((prev) => {
      const moduleData = { ...prev[moduleId] };
      const subModuleData = { ...moduleData[subModuleId] };
      delete subModuleData[fieldId];

      return {
        ...prev,
        [moduleId]: {
          ...moduleData,
          [subModuleId]: subModuleData,
        },
      };
    });
  };

  const getCurrentModule = () => {
    return modules.find((m) => m.id === selectedItem?.moduleId);
  };

  const getCurrentSubModule = () => {
    const module = getCurrentModule();
    return selectedItem?.subModuleId
      ? module?.subModules.find((s) => s.id === selectedItem.subModuleId)
      : undefined;
  };

  // renderModuleItem remains exactly the same
  const renderModuleItem = (module: Module, index: number) => (
    <div key={module.id} className="mb-1">
      <div
        className={`flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer group ${
          selectedItem?.moduleId === module.id && !selectedItem.subModuleId
            ? "bg-primary/10  border-primary"
            : ""
        }`}
        onClick={() => setSelectedItem({ moduleId: module.id })}
      >
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={(e) => {
            e.stopPropagation();
            toggleModule(module.id);
          }}
        >
          {module.isExpanded ? (
            <ChevronDown size={14} />
          ) : module.name === "General" || module.name === "Messages" ? (
            ""
          ) : (
            <ChevronRight size={14} />
          )}
        </ActionIcon>

        <FileText size={16} className="text-gray-600" />

        {editingItem === module.id ? (
          <TextInput
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveRename();
              if (e.key === "Escape") cancelRename();
            }}
            onBlur={saveRename}
            size="xs"
            className="flex-1"
            autoFocus
          />
        ) : (
          <Text size="lg" className="flex-1 font-medium">
            {module.name}
          </Text>
        )}

        {/* Language Input Dropdown */}
        <LanguageInputDropdown
          onSubmit={(values) => {
            setModuleLanguageValues(values);
            console.log("Module translations:", values);
          }}
          title={module.name}
          initialValues={moduleLanguageValues}
        />

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon
              size="sm"
              variant="subtle"
              className="opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical size={14} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<Plus size={14} />}
              onClick={() => addSubModule(module.id)}
            >
              Add sub-module
            </Menu.Item>
            <Menu.Item
              leftSection={<Edit3 size={14} />}
              onClick={() => startRename(module.id, module.name)}
            >
              Rename
            </Menu.Item>
            <Menu.Divider />
            {index > 0 && (
              <Menu.Item
                leftSection={<ArrowUp size={14} />}
                onClick={() => moveModule(module.id, "up")}
              >
                Move up
              </Menu.Item>
            )}
            {index < modules.length - 1 && (
              <Menu.Item
                leftSection={<ArrowDown size={14} />}
                onClick={() => moveModule(module.id, "down")}
              >
                Move down
              </Menu.Item>
            )}
            <Menu.Divider />
            <Menu.Item
              leftSection={<Trash2 size={14} />}
              color="red"
              onClick={() => deleteModule(module.id)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      {module.isExpanded && (
        <div className="ml-6 mt-1 space-y-1">
          {module.subModules.map((subModule) => (
            <div
              key={subModule.id}
              className={`flex items-center gap-2 p-2 rounded-full hover:bg-gray-50 cursor-pointer group ${
                selectedItem?.subModuleId === subModule.id
                  ? "bg-primary/10 border-l-4 border-primary"
                  : ""
              }`}
              onClick={() =>
                setSelectedItem({
                  moduleId: module.id,
                  subModuleId: subModule.id,
                })
              }
            >
              <div className="w-4" />
              <FileText size={14} className="text-gray-500" />
              {editingItem === subModule.id ? (
                <TextInput
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveRename();
                    if (e.key === "Escape") cancelRename();
                  }}
                  onBlur={saveRename}
                  size="xs"
                  className="flex-1"
                  autoFocus
                />
              ) : (
                <Text size="sm" className="flex-1">
                  {subModule.name}
                </Text>
              )}

              <LanguageInputDropdown
                onSubmit={(values) => {
                  setModuleLanguageValues(values);
                  console.log("Module translations:", values);
                }}
                title={subModule.name}
                initialValues={moduleLanguageValues}
              />

              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    className="opacity-0 group-hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical size={12} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<Edit3 size={14} />}
                    onClick={() => startRename(subModule.id, subModule.name)}
                  >
                    Rename
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<Trash2 size={14} />}
                    color="red"
                    onClick={() => deleteSubModule(module.id, subModule.id)}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <TranslationPageLayout
      title="Translations"
      videoSrc={video}
      videoHeader="Translation Tutorial"
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="flex h-full overflow-hidden min-w-0">
        {/* Left Sidebar with smooth animation */}
        <div
          className={`flex-shrink-0 transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "w-0" : "w-1/5"
          }`}
        >
          <div
            className={`h-full transition-opacity duration-300 ease-in-out ${
              isSidebarCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            <Card
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              className="h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b">
                <Text fw={600} size="lg">
                  Module Tabs
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full cursor-pointer border-primary w-16"
                  onClick={addModule}
                >
                  <Plus size={14} />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="space-y-1">
                  {modules.map((module, index) =>
                    renderModuleItem(module, index)
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Collapse/Expand Button */}
        <div className="flex-shrink-0 flex items-start pt-4">
          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
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
          className={`transition-all duration-300 ease-in-out min-w-0 ${
            isSidebarCollapsed ? "flex-1 ml-4" : "flex-1 ml-2"
          }`}
        >
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="h-full"
          >
            <TranslationTable
              moduleId={selectedItem?.moduleId}
              subModuleId={selectedItem?.subModuleId}
              moduleName={getCurrentModule()?.name}
              subModuleName={getCurrentSubModule()?.name}
              onTranslationChange={handleTranslationChange}
              onAddField={handleAddField}
              onRemoveField={handleRemoveField}
            />
          </Card>
        </div>
      </div>
    </TranslationPageLayout>
  );
};

export default TranslationPage;
