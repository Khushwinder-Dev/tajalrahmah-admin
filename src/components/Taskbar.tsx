// components/Taskbar.tsx
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { type MinimizedModule, type ModuleData } from "@/types/modules";
import { useNavigate, useLocation } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface TaskbarProps {
  onModuleRestore?: (module: MinimizedModule) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onModuleRestore }) => {
  // Use the custom hook - pass empty string as we want all modules for the user
  const { allMinimizedModules, closeModule } =
    useMinimizedModuleData<ModuleData>("");

  const navigate = useNavigate();
  const location = useLocation();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  // Check if a module is currently active based on the route
  const isModuleActive = useCallback(
    (module: MinimizedModule) => {
      return location.pathname === module.route;
    },
    [location.pathname]
  );

  // Check scroll state
  const checkScrollState = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, []);

  // Handle scroll events
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollState();
      container.addEventListener("scroll", checkScrollState);

      // Check on resize
      const resizeObserver = new ResizeObserver(checkScrollState);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("scroll", checkScrollState);
        resizeObserver.disconnect();
      };
    }
  }, [checkScrollState, allMinimizedModules.length]);

  const handleRestore = useCallback(
    (module: MinimizedModule): void => {
      // Set localStorage flag for restore
      localStorage.setItem(`restore-${module.id}`, "true");

      // Navigate to the module
      navigate(module.route);

      if (onModuleRestore) {
        onModuleRestore(module);
      }
    },
    [navigate, onModuleRestore]
  );

  const handleClose = useCallback(
    async (
      moduleId: string,
      e: React.MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
      e.stopPropagation();

      try {
        await closeModule(moduleId);
      } catch (error) {
        console.error("Error closing minimized module:", error);
      }
    },
    [closeModule]
  );

  // Scroll functions
  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  }, []);

  // Mouse drag to scroll
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setDragStart({
        x: e.pageX,
        scrollLeft: scrollContainerRef.current.scrollLeft,
      });
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current) return;

      e.preventDefault();
      const x = e.pageX;
      const walk = (x - dragStart.x) * 2;
      scrollContainerRef.current.scrollLeft = dragStart.scrollLeft - walk;
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Don't render if no modules
  if (allMinimizedModules.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-300 shadow-sm relative">
      <div className="flex items-center h-10">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 w-8 h-full bg-slate-100 hover:bg-slate-200 border-r border-slate-300 flex items-center justify-center transition-colors z-10 cursor-pointer"
            title="Scroll left"
          >
            <ChevronLeft size={14} className="text-slate-600" />
          </button>
        )}

        {/* Tabs Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex overflow-x-hidden scroll-smooth cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex min-w-max">
            {allMinimizedModules.map((module, index) => {
              const isActive = isModuleActive(module);

              return (
                <React.Fragment key={module.id}>
                  {/* Tab */}
                  <div
                    className={`
                      group relative flex items-center gap-2 h-10 px-4 py-2 cursor-pointer select-none whitespace-nowrap transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-50 border-b-2 border-blue-500"
                          : "bg-white hover:bg-slate-50"
                      }
                    `}
                    onClick={() => handleRestore(module)}
                    title={`Restore ${module.name}`}
                  >
                    {/* Module Icon */}
                    <div
                      className={`
                      flex-shrink-0 w-3 h-3 rounded-full flex items-center justify-center
                      ${
                        isActive
                          ? "bg-gradient-to-br from-blue-600 to-blue-700"
                          : "bg-gradient-to-br from-blue-500 to-blue-600"
                      }
                    `}
                    >
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-90"></div>
                    </div>

                    {/* Module Name - Full name without truncation */}
                    <span
                      className={`
                      text-xs font-medium transition-colors
                      ${
                        isActive
                          ? "text-blue-700 font-semibold"
                          : "text-slate-700 group-hover:text-slate-900"
                      }
                    `}
                    >
                      {module.name}
                    </span>

                    {/* Close Button */}
                    <button
                      onClick={(e) => handleClose(module.id, e)}
                      className={`
                        flex-shrink-0 w-4 h-4 rounded-full bg-transparent flex items-center justify-center transition-all duration-200 ml-2 cursor-pointer
                        ${
                          isActive
                            ? "hover:bg-blue-200 text-blue-600 opacity-70 hover:opacity-100"
                            : "hover:bg-slate-300 hover:text-slate-700 opacity-0 group-hover:opacity-100"
                        }
                      `}
                      title="Close"
                    >
                      <X size={12} />
                    </button>
                  </div>

                  {/* Vertical Divider - Show between tabs but not after the last one */}
                  {index < allMinimizedModules.length - 1 && (
                    <div className="w-px h-6 bg-slate-300 self-center flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="flex-shrink-0 w-8 h-full bg-slate-100 hover:bg-slate-200 border-l border-slate-300 flex items-center justify-center transition-colors z-10 cursor-pointer"
            title="Scroll right"
          >
            <ChevronRight size={14} className="text-slate-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Taskbar;
