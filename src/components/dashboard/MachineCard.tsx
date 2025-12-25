import React from "react";
import { MACHINE_STATUS_TYPES } from "@/lib/data";
import { Machine } from "@/types";
import Gauge from "./Gauge";
import { useTranslation } from "@/hooks/useTranslation";

interface MachineCardProps {
  machine: Machine;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const { t } = useTranslation();
  const statusConfig = MACHINE_STATUS_TYPES[machine.status];

  return (
    <div
      className={`relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-0 transition-all hover:shadow-lg group hover:border-blue-500/30 dark:hover:border-blue-500/30`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full ${statusConfig.color} ${statusConfig.shadow}`}
          ></div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate max-w-25">
            {machine.name.split("-").pop()}{" "}
            {/* Show only the number part or short name */}
          </h3>
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
            statusConfig.color
          } ${
            machine.status === "IDLE" ? "text-slate-900" : "text-white"
          } shadow-sm`}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 grid grid-cols-2 gap-4 items-center">
        {/* Left: Production */}
        <div className="flex flex-col justify-center items-center text-center border-r border-slate-100 dark:border-slate-800 pr-4">
          <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            {t.common.production}
          </span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">
            {machine.productionCount.toLocaleString()}
          </span>
          <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full"
              style={{ width: `${(machine.productionCount / 30000) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Right: Availability */}
        <div className="flex flex-col items-center justify-center">
          <Gauge value={machine.availability} />
        </div>
      </div>

      {/* Hover Effect Line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${statusConfig.color} opacity-0 group-hover:opacity-100 transition-opacity`}
      ></div>
    </div>
  );
};

export default MachineCard;
