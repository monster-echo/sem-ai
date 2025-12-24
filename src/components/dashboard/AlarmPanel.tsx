"use client";

import React, { useState } from "react";
import { AlertTriangle, Search, Filter, AlertOctagon } from "lucide-react";
import { generateAlarmHistory } from "@/lib/data";
import { AlarmHistory } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";

export default function AlarmPanel() {
  const [alarmHistory] = useState<AlarmHistory[]>(() => generateAlarmHistory());
  const { t } = useTranslation();

  const getAlarmColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-500/10 border-red-200 dark:border-red-500/20";
      case "WARNING":
        return "text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20";
      case "INFO":
        return "text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20";
      default:
        return "text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20";
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-500">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.common.activeAlarms}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              3
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            {t.alarm.title}
          </h2>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder={t.alarm.searchPlaceholder}
                className="w-full sm:w-64 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              title={t.common.filter}
              aria-label={t.common.filter}
              className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="space-y-2">
            {alarmHistory.map((alarm) => (
              <div
                key={alarm.id}
                className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg border ${getAlarmColor(
                      alarm.level
                    )}`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {alarm.machine}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                        {alarm.code}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {alarm.message}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mb-1">
                    {alarm.time}
                  </p>
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.common.details}
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
