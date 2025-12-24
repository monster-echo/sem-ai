import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { MACHINE_STATUS_TYPES } from "@/lib/data";
import { Machine } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";

interface MachineDetailPanelProps {
  machine: Machine | null;
  onClose: () => void;
}

const MachineDetailPanel: React.FC<MachineDetailPanelProps> = ({
  machine,
  onClose,
}) => {
  const { t } = useTranslation();
  const [trendData, setTrendData] = useState<number[]>([]);

  useEffect(() => {
    if (machine) {
      // Use setTimeout to avoid synchronous state update warning
      const timer = setTimeout(() => {
        setTrendData([...Array(20)].map(() => 30 + Math.random() * 60));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [machine]);

  if (!machine) return null;
  const statusConfig = MACHINE_STATUS_TYPES[machine.status];

  return (
    <div className="fixed top-0 right-0 h-screen w-full md:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-slate-200 dark:border-slate-700 shadow-2xl z-60 p-6 flex flex-col transform transition-transform duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {machine.name}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          title={t.common.close}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className={`flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 mb-6 border ${statusConfig.border}`}
      >
        <div className={`p-3 rounded-lg ${statusConfig.color} text-white`}>
          {statusConfig.icon}
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.common.currentStatus}
          </p>
          <p className={`text-lg font-bold ${statusConfig.text}`}>
            {statusConfig.label}
          </p>
        </div>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto">
        <div>
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-wider">
            {t.common.mesData}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">
                {t.common.currentProduct}
              </p>
              <p className="text-slate-900 dark:text-white font-medium">
                {machine.product}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">
                {t.common.completionRate}
              </p>
              <p className="text-slate-900 dark:text-white font-medium">
                {machine.progress}%
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">
                {t.common.standardCycleTime}
              </p>
              <p className="text-slate-600 dark:text-slate-300 font-mono font-bold">
                45.0 <span className="text-[10px]">s</span>
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">
                {t.common.actualCycleTime}
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 font-mono font-bold">
                48.2 <span className="text-[10px]">s</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-wider">
            {t.common.loadTrend}
          </h3>
          <div className="h-32 bg-slate-50 dark:bg-slate-800 rounded-lg p-2 flex items-end justify-between gap-1">
            {trendData.map((height, i) => (
              <div
                key={i}
                className="w-full bg-blue-500/30 rounded-t-sm hover:bg-blue-500/60 transition-colors"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetailPanel;
