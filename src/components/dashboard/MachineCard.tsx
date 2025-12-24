import React from "react";
import { MACHINE_STATUS_TYPES } from "@/lib/data";
import { Machine } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";

interface MachineCardProps {
  machine: Machine;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const statusConfig = MACHINE_STATUS_TYPES[machine.status];
  const { t } = useTranslation();

  return (
    <div
      className={`relative overflow-hidden bg-white dark:bg-slate-800 border-l-4 ${
        machine.status === "ALARM"
          ? "border-red-500 animate-pulse-border"
          : "border-slate-200 dark:border-slate-700"
      } rounded-lg p-3 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm dark:shadow-none`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {machine.name}
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            {machine.product}
          </p>
        </div>
        <div
          className={`w-2 h-2 rounded-full ${statusConfig.color} shadow-sm`}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded">
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            {t.common.rpm}
          </p>
          <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
            {machine.rpm}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded">
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            {t.common.load}
          </p>
          <div className="flex items-center gap-1">
            <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  machine.load > 90 ? "bg-red-500" : "bg-blue-500"
                }`}
                style={{ width: `${machine.load}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineCard;
