import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { date: "3 Feb", "1-3": 3, "4-10": 4, "11-20": 4, "21-50": 3, "51+": 2 },
  { date: "11 Feb", "1-3": 4, "4-10": 5, "11-20": 5, "21-50": 4, "51+": 2 },
  { date: "18 Feb", "1-3": 5, "4-10": 6, "11-20": 6, "21-50": 5, "51+": 2 },
  { date: "25 Feb", "1-3": 6, "4-10": 7, "11-20": 7, "21-50": 6, "51+": 2 },
  { date: "4 Mar", "1-3": 7, "4-10": 8, "11-20": 8, "21-50": 7, "51+": 2 },
];

const RankingsWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Rankings</h2>

      {/* Top Row - Two cards side by side */}
      <div className="grid grid-cols-2 gap-3 mb-9">
        {/* Google Rankings Card */}
        <div className="bg-gray-50 rounded-lg p-3 py-6 shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Google Rankings</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">10</div>
        </div>

        {/* Google Change Card */}
        <div className="bg-gray-50 rounded-lg p-3 py-6 shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Google Change</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-3xl font-bold text-gray-900">4</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-base text-gray-600 font-semibold">
            Google Rankings
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-3 text-xs justify-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>1-3</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
            <span>4-10</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>11-20</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span>21-50</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>51+</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
              barCategoryGap="25%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#666" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#666" }}
                domain={[0, 40]}
                ticks={[0, 20]}
              />
              <Bar dataKey="1-3" stackId="a" fill="#16a34a" />
              <Bar dataKey="4-10" stackId="a" fill="#84cc16" />
              <Bar dataKey="11-20" stackId="a" fill="#eab308" />
              <Bar dataKey="21-50" stackId="a" fill="#f97316" />
              <Bar dataKey="51+" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RankingsWidget;
