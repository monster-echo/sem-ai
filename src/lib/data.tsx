import React from "react";
import { Activity, Clock, AlertTriangle, Zap } from "lucide-react";
import {
  HourlyData,
  DeviationData,
  ZonePerformance,
  Machine,
  MachineStatus,
  MaintenanceRecord,
  AlarmHistory,
  Asset,
  Gateway,
  MachineStatusConfig,
} from "@/types";

export const generateHourlyData = (): HourlyData[] => {
  const data: HourlyData[] = [];
  let cumulativeTarget = 0;
  let cumulativeActual = 0;

  for (let i = 8; i <= 18; i++) {
    const hourlyTarget = 800 + Math.floor(Math.random() * 100);
    const efficiency = i > 13 ? 0.9 : 0.98;
    const hourlyActual = Math.floor(
      hourlyTarget * efficiency + (Math.random() * 100 - 50)
    );

    cumulativeTarget += hourlyTarget;
    cumulativeActual += hourlyActual;

    data.push({
      time: `${i}:00`,
      target: hourlyTarget,
      actual: hourlyActual,
      cumulativeTarget,
      cumulativeActual,
      efficiency: Math.round((hourlyActual / hourlyTarget) * 100),
    });
  }
  return data;
};

export const generateDeviationData = (): DeviationData[] => {
  return [
    { name: "CNC-HAAS-008", standardCT: 45, actualCT: 52, deviation: 15.5 },
    { name: "CNC-MAZAK-012", standardCT: 120, actualCT: 135, deviation: 12.5 },
    { name: "CNC-DMG-003", standardCT: 60, actualCT: 66, deviation: 10.0 },
    { name: "CNC-FANUC-019", standardCT: 30, actualCT: 32, deviation: 6.6 },
    { name: "CNC-HAAS-002", standardCT: 45, actualCT: 46, deviation: 2.2 },
    { name: "CNC-MAZAK-005", standardCT: 120, actualCT: 118, deviation: -1.6 },
    { name: "CNC-DMG-011", standardCT: 60, actualCT: 58, deviation: -3.3 },
  ];
};

export const generateZonePerformance = (): ZonePerformance[] => {
  return [
    { subject: "A区 (HAAS)", A: 98, B: 100, fullMark: 100 },
    { subject: "B区 (MAZAK)", A: 86, B: 100, fullMark: 100 },
    { subject: "C区 (DMG)", A: 92, B: 100, fullMark: 100 },
    { subject: "质量合规", A: 95, B: 100, fullMark: 100 },
    { subject: "设备稼动", A: 85, B: 100, fullMark: 100 },
    { subject: "人员效能", A: 90, B: 100, fullMark: 100 },
  ];
};

export const generateMachines = (count = 100): Machine[] => {
  const machines: Machine[] = [];
  const types = ["HAAS", "MAZAK", "DMG", "FANUC"];
  const statuses: MachineStatus[] = [
    "RUNNING",
    "RUNNING",
    "RUNNING",
    "RUNNING",
    "IDLE",
    "IDLE",
    "ALARM",
    "OFFLINE",
  ];

  for (let i = 1; i <= count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const id = `M${String(i).padStart(3, "0")}`;

    machines.push({
      id,
      name: `CNC-${type}-${String(i).padStart(3, "0")}`,
      type,
      status,
      product:
        status === "RUNNING"
          ? `Part-${Math.floor(Math.random() * 9000 + 1000)}`
          : "-",
      progress: status === "RUNNING" ? Math.floor(Math.random() * 100) : 0,
      rpm: status === "RUNNING" ? 8000 + Math.floor(Math.random() * 10000) : 0,
      load: status === "RUNNING" ? 40 + Math.floor(Math.random() * 55) : 0,
      zone: i <= 30 ? "A区" : i <= 60 ? "B区" : "C区",
    });
  }
  return machines;
};

export const MACHINE_STATUS_TYPES: Record<MachineStatus, MachineStatusConfig> =
  {
    RUNNING: {
      label: "运行",
      color: "bg-emerald-500",
      text: "text-emerald-500",
      border: "border-emerald-500",
      shadow: "shadow-emerald-500/50",
      icon: <Activity className="w-4 h-4" />,
    },
    IDLE: {
      label: "待机",
      color: "bg-yellow-500",
      text: "text-yellow-500",
      border: "border-yellow-500",
      shadow: "shadow-yellow-500/50",
      icon: <Clock className="w-4 h-4" />,
    },
    ALARM: {
      label: "故障",
      color: "bg-red-600",
      text: "text-red-500",
      border: "border-red-600",
      shadow: "shadow-red-600/50",
      icon: <AlertTriangle className="w-4 h-4 animate-pulse" />,
    },
    OFFLINE: {
      label: "离线",
      color: "bg-slate-600",
      text: "text-slate-500",
      border: "border-slate-600",
      shadow: "shadow-slate-600/50",
      icon: <Zap className="w-4 h-4" />,
    },
  };

export const generateMaintenanceRecords = (): MaintenanceRecord[] => {
  return [
    {
      id: "MT-2023-001",
      machine: "CNC-HAAS-008",
      type: "预防性维护",
      status: "PENDING",
      date: "2025-12-25",
      technician: "张工",
    },
    {
      id: "MT-2023-002",
      machine: "CNC-MAZAK-012",
      type: "主轴更换",
      status: "IN_PROGRESS",
      date: "2025-12-24",
      technician: "李工",
    },
    {
      id: "MT-2023-003",
      machine: "CNC-DMG-003",
      type: "冷却液更换",
      status: "COMPLETED",
      date: "2025-12-20",
      technician: "王工",
    },
    {
      id: "MT-2023-004",
      machine: "CNC-FANUC-019",
      type: "刀库校准",
      status: "COMPLETED",
      date: "2025-12-18",
      technician: "赵工",
    },
    {
      id: "MT-2023-005",
      machine: "CNC-HAAS-002",
      type: "季度点检",
      status: "COMPLETED",
      date: "2025-12-15",
      technician: "张工",
    },
  ];
};

export const generateAlarmHistory = (): AlarmHistory[] => {
  return [
    {
      id: "ALM-1001",
      machine: "CNC-HAAS-008",
      code: "X-AXIS OVERLOAD",
      message: "X轴电机过载",
      time: "10:23:45",
      level: "CRITICAL",
    },
    {
      id: "ALM-1002",
      machine: "CNC-MAZAK-012",
      code: "COOLANT LOW",
      message: "冷却液液位低",
      time: "09:15:20",
      level: "WARNING",
    },
    {
      id: "ALM-1003",
      machine: "CNC-DMG-003",
      code: "DOOR OPEN",
      message: "安全门未关闭",
      time: "08:45:10",
      level: "INFO",
    },
    {
      id: "ALM-1004",
      machine: "CNC-FANUC-019",
      code: "SPINDLE VIB",
      message: "主轴震动异常",
      time: "Yesterday",
      level: "WARNING",
    },
    {
      id: "ALM-1005",
      machine: "CNC-HAAS-002",
      code: "AIR PRESSURE",
      message: "气压不足",
      time: "Yesterday",
      level: "CRITICAL",
    },
  ];
};

export const generateAssetList = (count = 50): Asset[] => {
  const assets: Asset[] = [];
  const types = ["HAAS", "MAZAK", "DMG", "FANUC"];
  const models: Record<string, string[]> = {
    HAAS: ["VF-2", "VF-4", "UMC-750"],
    MAZAK: ["Variaxis i-700", "Integrex i-200"],
    DMG: ["DMU 50", "DMC 650 V"],
    FANUC: ["Robodrill α-D21LiB5"],
  };
  const locations = ["A区-01", "A区-02", "B区-01", "B区-02", "C区-01"];

  for (let i = 1; i <= count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const model = models[type][Math.floor(Math.random() * models[type].length)];
    const purchaseDate = new Date(
      2018 + Math.floor(Math.random() * 5),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    )
      .toISOString()
      .split("T")[0];

    assets.push({
      id: `AST-${String(i).padStart(4, "0")}`,
      name: `CNC-${type}-${String(i).padStart(3, "0")}`,
      type,
      model,
      serialNumber: `${type.substring(0, 2)}${Math.floor(
        Math.random() * 1000000
      )}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      purchaseDate,
      status: Math.random() > 0.1 ? "ACTIVE" : "MAINTENANCE",
      value: 500000 + Math.floor(Math.random() * 1000000),
      warrantyExp: new Date(
        parseInt(purchaseDate.split("-")[0]) + 3,
        parseInt(purchaseDate.split("-")[1]),
        parseInt(purchaseDate.split("-")[2])
      )
        .toISOString()
        .split("T")[0],
    });
  }
  return assets;
};

export const generateGatewayList = (): Gateway[] => {
  return [
    {
      id: "GW-001",
      name: "Main Workshop Gateway",
      ip: "192.168.1.10",
      protocol: "OPC UA",
      status: "ONLINE",
      devices: 45,
      throughput: "12.5 MB/s",
      lastHeartbeat: "Just now",
    },
    {
      id: "GW-002",
      name: "Assembly Line Gateway",
      ip: "192.168.1.11",
      protocol: "MQTT",
      status: "ONLINE",
      devices: 32,
      throughput: "8.2 MB/s",
      lastHeartbeat: "Just now",
    },
    {
      id: "GW-003",
      name: "Quality Control Gateway",
      ip: "192.168.1.12",
      protocol: "Modbus TCP",
      status: "WARNING",
      devices: 12,
      throughput: "1.5 MB/s",
      lastHeartbeat: "2 min ago",
    },
    {
      id: "GW-004",
      name: "Warehouse Gateway",
      ip: "192.168.1.13",
      protocol: "HTTP/REST",
      status: "OFFLINE",
      devices: 8,
      throughput: "0 KB/s",
      lastHeartbeat: "2 hours ago",
    },
    {
      id: "GW-005",
      name: "Energy Monitor Gateway",
      ip: "192.168.1.14",
      protocol: "Modbus RTU",
      status: "ONLINE",
      devices: 24,
      throughput: "560 KB/s",
      lastHeartbeat: "Just now",
    },
  ];
};
