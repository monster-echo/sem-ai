import React from "react";
import { useTheme } from "next-themes";
import {
  Target,
  Clock,
  CheckCircle2,
  TrendingUp,
  Activity,
  BarChart2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine,
  Cell,
} from "recharts";
import { generateDeviationData, generateZonePerformance } from "@/lib/data";
import { HourlyData } from "@/types";

interface MESAnalysisPanelProps {
  hourlyData: HourlyData[];
}

const MESAnalysisPanel: React.FC<MESAnalysisPanelProps> = ({ hourlyData }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const deviationData = generateDeviationData();
  const zonePerformance = generateZonePerformance();

  const chartColors = {
    grid: isDark ? "#334155" : "#e2e8f0",
    text: isDark ? "#94a3b8" : "#64748b",
    tooltipBg: isDark ? "#1e293b" : "#ffffff",
    tooltipBorder: isDark ? "#334155" : "#e2e8f0",
    tooltipText: isDark ? "#fff" : "#0f172a",
  };

  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Target className="w-20 h-20 text-blue-600 dark:text-blue-500" />
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            MES 计划达成率
          </h3>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            94.2%
          </div>
          <div className="text-xs text-red-500 dark:text-red-400 mt-1">
            ↓ 目标未达成 (Gap: -5.8%)
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 mt-3 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[94.2%]"></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Clock className="w-20 h-20 text-emerald-600 dark:text-emerald-500" />
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            平均节拍偏差 (CT Deviation)
          </h3>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            +3.2
            <span className="text-sm text-slate-500 dark:text-slate-500 font-normal">
              s
            </span>
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
            ⚠ 略微慢于 MES 标准工时
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <CheckCircle2 className="w-20 h-20 text-purple-600 dark:text-purple-500" />
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            MES 报工及时率
          </h3>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            99.8%
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
            ↑ 优于上周 (IoT 自动报工)
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              累计产量趋势 (MES 计划 vs IoT 实际)
            </h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-600 border border-slate-300 dark:border-slate-400 border-dashed"></span>
                <span className="text-slate-500 dark:text-slate-400">
                  MES 累计计划
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-emerald-500/50 border border-emerald-500"></span>
                <span className="text-slate-600 dark:text-slate-300">
                  IoT 实际累计
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  stroke={chartColors.text}
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke={chartColors.text} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartColors.tooltipBg,
                    borderColor: chartColors.tooltipBorder,
                    color: chartColors.tooltipText,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cumulativeActual"
                  name="实际累计"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorActual)"
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeTarget"
                  name="MES计划累计"
                  stroke={isDark ? "#94a3b8" : "#64748b"}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col">
          <h3 className="text-slate-900 dark:text-white font-bold mb-2 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            区域综合能力模型
          </h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="70%"
                data={zonePerformance}
              >
                <PolarGrid stroke={chartColors.grid} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: chartColors.text, fontSize: 10 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="当前表现"
                  dataKey="A"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="#8b5cf6"
                  fillOpacity={0.4}
                />
                <Radar
                  name="MES标准"
                  dataKey="B"
                  stroke={isDark ? "#475569" : "#94a3b8"}
                  strokeDasharray="3 3"
                  fill="transparent"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartColors.tooltipBg,
                    borderColor: chartColors.tooltipBorder,
                    color: chartColors.tooltipText,
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "12px",
                    marginTop: "10px",
                    color: chartColors.text,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col h-64">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              MES 标准工时偏差 Top 设备 (Cycle Time Deviation)
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              正值表示慢于标准，负值表示快于标准
            </span>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deviationData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.grid}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  stroke={chartColors.text}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke={chartColors.text}
                  width={100}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  cursor={{
                    fill: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                  }}
                  contentStyle={{
                    backgroundColor: chartColors.tooltipBg,
                    borderColor: chartColors.tooltipBorder,
                    color: chartColors.tooltipText,
                  }}
                />
                <ReferenceLine x={0} stroke={isDark ? "#cbd5e1" : "#94a3b8"} />
                <Bar dataKey="deviation" name="偏差(秒)" barSize={15}>
                  {deviationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.deviation > 0 ? "#ef4444" : "#10b981"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MESAnalysisPanel;
