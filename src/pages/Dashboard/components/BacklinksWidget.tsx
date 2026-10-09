import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Link } from "lucide-react";

const newLostLinksData = [
  { date: "4 Feb", new: 800, lost: 900 },
  { date: "11 Feb", new: 400, lost: 900 },
  { date: "18 Feb", new: 900, lost: 900 },
  { date: "25 Feb", new: 300, lost: 900 },
  { date: "4 Mar", new: 1000, lost: 800 },
];

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  score,
  size = 120,
  strokeWidth = 12,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#d946ef"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{score}</span>
      </div>
    </div>
  );
};

const BacklinksWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Backlinks</h2>

      <div className="flex gap-8 w-full">
        {/* Citation Flow */}
        <div className="bg-gray-100 rounded-lg p-4 w-[300px] flex-shrink-0 shadow">
          <div className="flex items-center gap-2 mb-6">
            <Link className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600">Citation Flow</span>
          </div>

          <div className="flex justify-center">
            <CircularProgress score={55} />
          </div>
        </div>

        {/* New/Lost Links */}
        <div className="bg-gray-50 p-4 shadow rounded-lg flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600">New/Lost Links</span>
            </div>

            {/* Legend */}
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">New</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Lost</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={newLostLinksData}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#666" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#666" }}
                  domain={[0, 2000]}
                  ticks={[0, 1000, 2000]}
                />
                <Bar
                  dataKey="lost"
                  stackId="a"
                  fill="#ef4444"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="new"
                  stackId="a"
                  fill="#22c55e"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacklinksWidget;
