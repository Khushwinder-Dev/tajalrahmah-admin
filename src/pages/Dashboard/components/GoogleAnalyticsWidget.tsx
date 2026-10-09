import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const pieData = [
  { name: "Referral", value: 604, color: "#60a5fa" },
  { name: "Organic Search", value: 573, color: "#34d399" },
  { name: "Direct", value: 564, color: "#fbbf24" },
  { name: "Other", value: 410, color: "#a78bfa" },
  { name: "Paid Search", value: 212, color: "#f87171" },
  { name: "Social", value: 176, color: "#38bdf8" },
  { name: "Display", value: 136, color: "#84cc16" },
  { name: "Email", value: 112, color: "#fb923c" },
];

const GoogleAnalyticsWidget: React.FC = () => {
  const totalSessions = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Google Analytics
      </h2>

      {/* Sessions Pie Chart */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-orange-500" />
          <span className="text-sm text-gray-600">Sessions</span>
        </div>

        <div className="relative">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={1}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-900">
              {totalSessions.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Sessions</div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-600">
                {item.name} - {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600">Sessions</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totalSessions.toLocaleString()}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600">Goal Completions</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">3,306</div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAnalyticsWidget;
