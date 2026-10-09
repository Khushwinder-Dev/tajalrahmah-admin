import React from "react";
import {
  RankingsWidget,
  GoogleAnalyticsWidget,
  GoogleLighthouseWidget,
  BacklinksWidget,
  GoogleSearchConsoleWidget,
} from "./components";

const SEODashboard: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-100 grid-scroll rounded-lg">
      <div className="p-4 min-h-full">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">SEO Dashboard</h1>
        </div>

        <div className="space-y-4">
          {/* First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
            <div className="min-h-[480px]">
              <RankingsWidget />
            </div>
            <div className="min-h-[480px]">
              <GoogleAnalyticsWidget />
            </div>
            <div className="min-h-[480px]">
              <GoogleLighthouseWidget />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
            <div className="lg:col-span-2 min-h-[320px]">
              <BacklinksWidget />
            </div>
            <div className="lg:col-span-1 min-h-[320px]">
              <GoogleSearchConsoleWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEODashboard;
