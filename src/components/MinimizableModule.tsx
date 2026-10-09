// components/MinimizableModule.tsx
import React, { type ReactNode } from "react";
import { useMinimizedModules } from "../contexts/MinimizedModulesContext";
import { type ModuleData } from "@/types/modules";

interface MinimizableModuleProps {
  moduleId: string;
  moduleName: string;
  children: ReactNode;
  onMinimize?: () => ModuleData;
  className?: string;
}

const MinimizableModule: React.FC<MinimizableModuleProps> = ({
  moduleId,
  moduleName,
  children,
  onMinimize,
  className = "",
}) => {
  const { dispatch } = useMinimizedModules();

  const handleMinimize = (): void => {
    const moduleData = onMinimize ? onMinimize() : {};

    dispatch({
      type: "MINIMIZE_MODULE",
      payload: {
        id: moduleId,
        name: moduleName,
        data: moduleData,
        component: moduleName,
        route: "moduleRoute",
      },
    });
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
    >
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-800">{moduleName}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleMinimize}
            className="w-8 h-8 flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors duration-200 text-lg font-bold"
            title="Minimize"
          >
            −
          </button>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default MinimizableModule;
