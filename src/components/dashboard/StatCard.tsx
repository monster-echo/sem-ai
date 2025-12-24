import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendUp,
}) => (
  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex items-center justify-between">
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
        {title}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {unit}
        </span>
      </div>
      {trend && (
        <p
          className={`text-xs mt-1 ${
            trendUp
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {trendUp ? "↑" : "↓"} {trend} 较昨日
        </p>
      )}
    </div>
    <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-blue-600 dark:text-blue-400">
      {icon}
    </div>
  </div>
);

export default StatCard;
