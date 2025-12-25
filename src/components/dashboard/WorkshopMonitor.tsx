import React, { useState } from "react";
import {
  MonitorPlay,
  Filter,
  Maximize2,
  Camera,
  Thermometer,
  Activity,
} from "lucide-react";
import CameraPlayer from "./CameraPlayer";

const WorkshopMonitor = () => {
  const [selectedZone, setSelectedZone] = useState("all");

  const machines = [
    {
      id: "CNC-001",
      name: "五轴加工中心 A1",
      status: "running",
      operator: "张工",
      progress: 78,
      program: "P-2024-001",
      temp: 42,
      vibration: 1.2,
      cameraUrl:
        "http://218.219.214.248:50000/nphMotionJpeg?Resolution=640x480",
    },
    {
      id: "CNC-002",
      name: "数控车床 B2",
      status: "warning",
      operator: "李工",
      progress: 45,
      program: "P-2024-003",
      temp: 65,
      vibration: 2.8,
      cameraUrl: "http://88.53.197.250/axis-cgi/mjpg/video.cgi",
    },
    {
      id: "CNC-003",
      name: "立式铣床 C1",
      status: "idle",
      operator: "待机",
      progress: 0,
      program: "-",
      temp: 25,
      vibration: 0,
      cameraUrl: "http://158.58.130.148/mjpg/video.mjpg",
    },
    {
      id: "CNC-004",
      name: "五轴加工中心 A2",
      status: "running",
      operator: "王工",
      progress: 92,
      program: "P-2024-002",
      temp: 44,
      vibration: 1.1,
      cameraUrl: "http://86.63.39.58:8080/axis-cgi/mjpg/video.cgi",
    },
    {
      id: "CNC-005",
      name: "数控磨床 D1",
      status: "error",
      operator: "赵工",
      progress: 12,
      program: "P-2024-005",
      temp: 28,
      vibration: 0,
      cameraUrl: "http://109.247.15.178:6001/mjpg/video.mjpg",
    },
    {
      id: "CNC-006",
      name: "数控车床 B3",
      status: "running",
      operator: "刘工",
      progress: 33,
      program: "P-2024-004",
      temp: 41,
      vibration: 1.3,
      cameraUrl: "http://142.0.109.159/axis-cgi/mjpg/video.cgi",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-emerald-500";
      case "warning":
        return "bg-amber-500";
      case "error":
        return "bg-red-500";
      case "idle":
        return "bg-slate-500";
      default:
        return "bg-slate-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "running":
        return "运行中";
      case "warning":
        return "警告";
      case "error":
        return "故障";
      case "idle":
        return "待机";
      default:
        return "未知";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 顶部控制栏 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MonitorPlay className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            车间实时监控
          </h2>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
          <div className="flex gap-2">
            {["all", "zone-a", "zone-b", "zone-c"].map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedZone === zone
                    ? "bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {zone === "all"
                  ? "全部区域"
                  : zone === "zone-a"
                  ? "A区-精加工"
                  : zone === "zone-b"
                  ? "B区-粗加工"
                  : "C区-质检"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            系统正常运行
          </div>
          <button
            type="button"
            title="筛选"
            aria-label="筛选"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Filter className="w-5 h-5" />
          </button>
          <button
            type="button"
            title="全屏"
            aria-label="全屏"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 监控卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all group"
          >
            {/* 卡片头部 */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 flex justify-between items-center bg-slate-50 dark:bg-slate-800/80">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${getStatusColor(
                    machine.status
                  )} shadow-[0_0_10px_currentColor]`}
                ></div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {machine.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {machine.id}
                  </p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  machine.status === "running"
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                    : machine.status === "warning"
                    ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
                    : machine.status === "error"
                    ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                    : "bg-slate-100 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-500/20"
                }`}
              >
                {getStatusText(machine.status)}
              </span>
            </div>

            {/* 摄像头预览区域 */}
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 group-hover:brightness-110 transition-all overflow-hidden">
              <CameraPlayer
                url={machine.cameraUrl}
                name={machine.name}
                status={machine.status}
              />

              {/* 状态指示条 */}
              {machine.status === "running" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/50 z-20">
                  <div
                    className="h-full bg-emerald-500 animate-pulse"
                    style={{ width: `${machine.progress}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* 实时数据 */}
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  当前程序
                </p>
                <p className="text-sm font-mono text-blue-600 dark:text-blue-400">
                  {machine.program}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  操作员
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {machine.operator}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  主轴温度
                </p>
                <div className="flex items-center gap-2">
                  <Thermometer className="w-3 h-3 text-slate-400 dark:text-slate-400" />
                  <span
                    className={`text-sm font-mono ${
                      machine.temp > 60
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {machine.temp}°C
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  振动值
                </p>
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-slate-400 dark:text-slate-400" />
                  <span
                    className={`text-sm font-mono ${
                      machine.vibration > 2.5
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {machine.vibration} mm/s
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopMonitor;
