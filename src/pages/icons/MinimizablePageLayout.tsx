// components/MinimizablePageLayout.tsx
import React, { type ReactNode, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { minimizeModule } from "@/store/minimizedModulesSlice";
import { type ModuleData } from "@/types/modules";
import PageLayout from "./PageLayout";
// import { Minus } from "lucide-react";
import { Minimize2 } from "lucide-react";
import { useMinimizeAnimation } from "@/hooks/useMinimizeAnimation";
import MinimizeAnimation from "@/components/MinimizeAnimation";
import type { PopoverOption } from "@/components/common/SplitButton";
import { useNavigate } from "react-router-dom";
import { minimizeModuleWithAuth } from "@/store/minimizedModulesThunks";
import { useAppDispatch } from "@/store/hooks";

interface MinimizablePageLayoutProps {
  moduleId: string;
  moduleName: string;
  moduleRoute: string;
  children: ReactNode;
  onMinimize?: () => ModuleData;

  // Required PageLayout props
  title: string;
  listPath: string;
  popoverOptions: Array<PopoverOption>;

  // Optional PageLayout props
  videoSrc?: string;
  videoHeader?: string;
  customHeaderActions?: ReactNode;
  keepChanges?: boolean;
  onKeepChangesChange?: (value: boolean) => void;
  pdfChecked?: boolean;
  onPdfToggle?: (value: boolean) => void;
  printEnabled?: boolean;
  onPrintToggle?: (value: boolean) => void;
  onHistoryClick?: () => void;
  additionalFooterButtons?: ReactNode;
  onExport?: () => void;
  activePage?: "edit" | "view" | "create" | "list";
  className?: string;
  companyAutoComplete?: boolean;
  scrollBoxClassNames?: string;
  module?: string;
}

const MinimizablePageLayout: React.FC<MinimizablePageLayoutProps> = ({
  moduleId,
  moduleName,
  moduleRoute,
  children,
  onMinimize,
  popoverOptions,
  ...pageLayoutProps
}) => {
  const dispatch = useAppDispatch();
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { isMinimizing, startMinimizeAnimation } = useMinimizeAnimation({
    duration: 600,
    onComplete: () => {
      // Navigate AFTER animation completes and Redux state is updated
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    },
  });

  const handleMinimize = (): void => {
    const moduleData = onMinimize ? onMinimize() : {};

    const moduleToAdd = {
      id: moduleId,
      name: moduleName,
      data: moduleData,
      component: moduleName,
      route: moduleRoute,
    };

    try {
      // Use the auth-aware thunk instead of the direct action
      dispatch(minimizeModuleWithAuth(moduleToAdd));
    } catch (error) {
      console.error("Error dispatching minimize action:", error);
    }

    startMinimizeAnimation(contentRef.current || undefined);
  };

  // Add minimize button with loading state
  const enhancedPopoverOptions: Array<PopoverOption> = [
    ...popoverOptions,
    {
      // label: isMinimizing ? "Minimizing..." : "Minimize",
      label: isMinimizing ? "Minimizing..." : "",
      icon: (
        <Minimize2
          className={`w-5 h-5 text-gray-600 ${
            isMinimizing ? "animate-pulse" : ""
          }`}
        />
      ),
      onClick: handleMinimize,
    },
  ];

  return (
    <div ref={contentRef} className="h-full">
      <MinimizeAnimation isActive={isMinimizing}>
        <PageLayout
          {...pageLayoutProps}
          popoverOptions={enhancedPopoverOptions}
          handleMinimize={handleMinimize}
        >
          {children}
        </PageLayout>
      </MinimizeAnimation>
    </div>
  );
};

export default MinimizablePageLayout;
