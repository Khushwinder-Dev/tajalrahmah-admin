import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import Taskbar from "../components/Taskbar";
import { useEffect, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";

const MainLayout = () => {
  const isMobile = useIsMobile();
  console.log("isMobile", isMobile);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Start with true

  // Sync sidebar state with mobile detection
  useEffect(() => {
    setIsSidebarCollapsed(isMobile);
  }, [isMobile]);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar with fixed height */}
      <div className="flex-shrink-0 z-50">
        <Navbar
          isSidebarCollapsed={isSidebarCollapsed}
          onSidebarCollapseChange={setIsSidebarCollapsed}
        />
      </div>

      {/* Main content area - starts right after navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with fixed width - extends from navbar to bottom */}
        <div className="flex-shrink-0 z-30">
          <Sidebar
            isSidebarCollapsed={isSidebarCollapsed}
            onSidebarCollapseChange={setIsSidebarCollapsed}
          />
        </div>

        {/* Right side content area */}
        <div
          className={`flex flex-col flex-1 min-w-0 ${
            isMobile ? "overflow-y-auto" : "overflow-hidden"
          } dark:bg-gray-900`}
        >
          {/* Taskbar positioned above outlet, taking outlet's width */}
          <div className="flex-shrink-0 z-40">
            <Taskbar />
          </div>

          {/* Outlet with remaining height (after navbar, taskbar, and footer) */}
          <div
            className={`flex-1 ${
              isMobile ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"
            } px-3 py-3`}
          >
            <Outlet />
          </div>

          {/* Footer with fixed height */}
          {isMobile ? null : (
            <div className="flex-shrink-0">
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
