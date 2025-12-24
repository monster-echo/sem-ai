"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useMachineData } from "@/hooks/useMachineData";
import StatCard from "@/components/dashboard/StatCard";
import MachineCard from "@/components/dashboard/MachineCard";
import MachineHeatmapCell from "@/components/dashboard/MachineHeatmapCell";
import MachineDetailPanel from "@/components/dashboard/MachineDetailPanel";
import AICopilot from "@/components/dashboard/AICopilot";
import ConfigModal from "@/components/dashboard/ConfigModal";
import {
  Gauge,
  Activity,
  AlertTriangle,
  Grid,
  List,
  Play,
  Pause,
  Cog,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "next-themes";

export default function DashboardPage() {
  const { allMachines, hourlyData, stats } = useMachineData();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<"heatmap" | "grid">("heatmap");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const itemsPerPage = 12;

  const filteredMachines = useMemo(() => {
    if (statusFilter === "ALL") return allMachines;
    return allMachines.filter((m) => m.status === statusFilter);
  }, [allMachines, statusFilter]);

  const totalPages = Math.ceil(filteredMachines.length / itemsPerPage);
  const paginatedMachines = filteredMachines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, viewMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay && viewMode === "grid") {
      interval = setInterval(() => {
        setCurrentPage((prev) => {
          if (prev >= totalPages) return 1;
          return prev + 1;
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, viewMode, totalPages]);

  const chartGridColor = theme === "dark" ? "#334155" : "#e2e8f0";
  const chartTextColor = theme === "dark" ? "#94a3b8" : "#64748b";
  const tooltipBg = theme === "dark" ? "#1e293b" : "#ffffff";
  const tooltipBorder = theme === "dark" ? "#334155" : "#e2e8f0";
  const tooltipText = theme === "dark" ? "#fff" : "#0f172a";

  return (
    <div className="h-full flex flex-col p-4">
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />

      {/* Dashboard Toolbar */}
      <div className="flex justify-between items-center mb-4 bg-white/50 dark:bg-slate-900/50 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              statusFilter === "ALL"
                ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white shadow"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {t.common.all} ({allMachines.length})
          </button>
          <div className="w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>
          <button
            onClick={() => setStatusFilter("RUNNING")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              statusFilter === "RUNNING"
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50"
                : "text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            {t.common.running} ({stats.running})
          </button>
          <button
            onClick={() => setStatusFilter("IDLE")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              statusFilter === "IDLE"
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50"
                : "text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
            {t.common.idle} ({stats.idle})
          </button>
          <button
            onClick={() => setStatusFilter("ALARM")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              statusFilter === "ALARM"
                ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 animate-pulse"
                : "text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            {t.common.alarm} ({stats.alarm})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100/80 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 p-0.5">
            <button
              onClick={() => setViewMode("heatmap")}
              className={`p-1.5 px-2 rounded-md flex items-center gap-2 text-xs transition-colors ${
                viewMode === "heatmap"
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="热力图视图"
            >
              <Grid className="w-4 h-4" />
              <span className="hidden xl:inline">{t.common.heatmap}</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 px-2 rounded-md flex items-center gap-2 text-xs transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="详细列表视图"
            >
              <List className="w-4 h-4" />
              <span className="hidden xl:inline">{t.common.list}</span>
            </button>
          </div>

          {viewMode === "grid" && (
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`p-2 rounded-lg transition-all border ${
                isAutoPlay
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50"
                  : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
              title={isAutoPlay ? t.common.stop : t.common.autoPlay}
            >
              {isAutoPlay ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
          )}

          <button
            onClick={() => setIsConfigOpen(true)}
            className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
            title={t.common.config}
          >
            <Cog className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 h-full overflow-hidden">
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 h-full overflow-y-auto custom-scrollbar">
          <StatCard
            title={t.common.realtimeOEE}
            value="82.4"
            unit="%"
            icon={<Gauge className="w-5 h-5" />}
            trend="1.2%"
            trendUp={true}
          />

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex-1 flex flex-col min-h-[250px]">
            <h3 className="text-slate-900 dark:text-white font-bold mb-2 flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-blue-500" />
              {t.common.productionTrend}
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartGridColor}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="time"
                    stroke={chartTextColor}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis stroke={chartTextColor} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      borderColor: tooltipBorder,
                      color: tooltipText,
                    }}
                  />
                  <Bar
                    dataKey="actual"
                    fill="#3b82f6"
                    radius={[2, 2, 0, 0]}
                    name="实际产量"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#94a3b8"
                    strokeDasharray="3 3"
                    dot={false}
                    name="目标"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 min-h-[200px] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-slate-900 dark:text-white font-bold text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                {t.common.alarmQueue}
              </h3>
              <span className="text-xs bg-red-500 px-1.5 rounded text-white">
                {stats.alarm}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
              {allMachines
                .filter((m) => m.status === "ALARM")
                .map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMachine(m)}
                    className="p-2 bg-red-50 dark:bg-red-900/10 border-l-2 border-red-500 rounded cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex justify-between">
                      <span className="text-red-600 dark:text-red-400 font-bold text-xs">
                        {m.name}
                      </span>
                      <span className="text-[10px] text-slate-500">刚刚</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      主轴过载报警 (Overload)
                    </p>
                  </div>
                ))}
              {stats.alarm === 0 && (
                <div className="text-center text-slate-500 text-xs py-4">
                  {t.common.noAlarms}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4 relative h-full">
          <div className="flex justify-between items-end mb-1 px-1">
            <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide flex items-center gap-2">
              {viewMode === "heatmap" && t.common.deviceStatusHeatmap}
              {viewMode === "grid" && t.common.deviceList}
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-600">
              {`${t.common.showing}: ${filteredMachines.length} / ${allMachines.length} ${t.common.records}`}
            </span>
          </div>

          <div className="flex-1 bg-slate-50/30 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-4 overflow-y-auto custom-scrollbar relative">
            <MachineDetailPanel
              machine={selectedMachine}
              onClose={() => setSelectedMachine(null)}
            />

            {viewMode === "heatmap" ? (
              <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-300">
                {["A区", "B区", "C区"].map((zone) => {
                  const zoneMachines = filteredMachines.filter(
                    (m) => m.zone === zone
                  );
                  if (zoneMachines.length === 0) return null;
                  return (
                    <div key={zone} className="mb-6 last:mb-0">
                      <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1 w-full">
                        {zone}
                      </h4>
                      <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 lg:grid-cols-20 gap-1.5">
                        {zoneMachines.map((machine) => (
                          <MachineHeatmapCell
                            key={machine.id}
                            machine={machine}
                            onClick={setSelectedMachine}
                            isSelected={selectedMachine?.id === machine.id}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                  {paginatedMachines.map((machine) => (
                    <MachineCard key={machine.id} machine={machine} />
                  ))}
                </div>

                <div className="mt-auto flex justify-center items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 relative">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col items-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {t.common.page}{" "}
                      <span className="text-slate-900 dark:text-white font-bold">
                        {currentPage}
                      </span>{" "}
                      / {totalPages} {t.common.page}
                    </span>
                    {isAutoPlay && (
                      <span className="text-[10px] text-emerald-500 mt-0.5 animate-pulse">
                        {t.common.autoPlay} (5s)
                      </span>
                    )}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AICopilot stats={stats} machines={allMachines} />
    </div>
  );
}
