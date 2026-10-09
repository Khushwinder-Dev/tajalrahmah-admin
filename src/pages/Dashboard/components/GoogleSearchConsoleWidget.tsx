import React from "react";
import {
  LineChart,
  Line,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Search } from "lucide-react";

const impressionsData = [
  { date: "4 Feb", impressions: 180 },
  { date: "11 Feb", impressions: 200 },
  { date: "18 Feb", impressions: 190 },
  { date: "25 Feb", impressions: 220 },
  { date: "4 Mar", impressions: 240 },
  { date: "11 Mar", impressions: 210 },
  { date: "18 Mar", impressions: 250 },
  { date: "25 Mar", impressions: 260 },
];

const GoogleSearchConsoleWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 mt-6">
        Google Search Console
      </h2>

      {/* Impressions Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-6">
          <Search className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">Impressions</span>
        </div>
        <div className="text-5xl font-bold text-gray-900 text-center">
          262 K
        </div>
      </div>

      {/* Impressions Chart */}
      <div className="h-24 mt-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={impressionsData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GoogleSearchConsoleWidget;
