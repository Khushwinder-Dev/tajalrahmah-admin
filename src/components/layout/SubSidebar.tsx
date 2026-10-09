import React from "react";
import type { LucideIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

type SubSidebarItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

type SubSidebarProps = {
  items: SubSidebarItem[];
  onNavigate: (path: string) => void;
  onClose: () => void;
  title?: string;
};

const SubSidebar: React.FC<SubSidebarProps & { activePath?: string }> = ({
  items,
  onNavigate,
  onClose,
  title,
  activePath,
}) => {
  const location = useLocation();
  const currentPath = activePath || location.pathname;
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 shadow-lg rounded-r-xl h-full relative flex flex-col border-l border-gray-200 dark:border-gray-700">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center mb-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-pointer transition"
        aria-label="Close"
      >
        ×
      </button>
      {title && (
        <h3 className="mb-4 font-bold text-xl text-primary dark:text-gray-100 ml-2 mt-4">
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-2 mt-4">
        {items.map((item) => (
          <button
            key={item.path}
            className={`flex items-center gap-2 text-left text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-primary px-4 rounded-lg transition group cursor-pointer mx-2 py-3 ${
              currentPath === item.path
                ? "bg-blue-100 dark:bg-blue-900 text-primary"
                : "bg-gray-200"
            }`}
            onClick={() => onNavigate(item.path)}
          >
            <item.icon
              className={`w-4 h-4 text-gray-400 group-hover:text-primary transition ${
                currentPath === item.path ? "text-primary" : ""
              }`}
            />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubSidebar;
