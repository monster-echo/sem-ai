"use client";

import React, { useState } from "react";
import {
  Router,
  Wifi,
  WifiOff,
  Activity,
  Server,
  RefreshCw,
  Settings,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Network,
} from "lucide-react";
import { generateGatewayList } from "@/lib/data";

export default function GatewayPanel() {
  const [gateways, setGateways] = useState(() => generateGatewayList());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setGateways(generateGatewayList());
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE":
        return "text-emerald-600 dark:text-emerald-500 bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
      case "WARNING":
        return "text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20";
      case "OFFLINE":
        return "text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20";
      default:
        return "text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ONLINE":
        return <CheckCircle2 className="w-4 h-4" />;
      case "WARNING":
        return <AlertTriangle className="w-4 h-4" />;
      case "OFFLINE":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-500">
            <Router className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              网关总数
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {gateways.length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-500">
            <Wifi className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              在线网关
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {gateways.filter((g) => g.status === "ONLINE").length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-500">
            <WifiOff className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              离线/异常
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {gateways.filter((g) => g.status !== "ONLINE").length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-500">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              总吞吐量
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              22.8{" "}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-500">
                MB/s
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-blue-500" />
            网关连接状态
          </h2>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all ${
              isRefreshing ? "animate-spin" : ""
            }`}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {gateways.map((gateway) => (
              <div
                key={gateway.id}
                className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-lg ${
                        gateway.status === "ONLINE"
                          ? "bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
                          : "bg-slate-200 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <Server className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        {gateway.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-500 font-mono mt-0.5">
                        {gateway.ip}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      gateway.status
                    )}`}
                  >
                    {getStatusIcon(gateway.status)}
                    {gateway.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-100 dark:border-transparent">
                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">
                      连接协议
                    </p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {gateway.protocol}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-100 dark:border-transparent">
                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">
                      挂载设备
                    </p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {gateway.devices} 台
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-100 dark:border-transparent">
                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">
                      实时吞吐
                    </p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 font-mono">
                      {gateway.throughput}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-100 dark:border-transparent">
                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">
                      最后心跳
                    </p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {gateway.lastHeartbeat}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                  <button className="px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    查看日志
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5" />
                    配置
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
