import React from "react";
import { AlertTriangle } from "lucide-react";
import { MACHINE_STATUS_TYPES } from "@/lib/data";
import { Machine } from "@/types";

interface MachineHeatmapCellProps {
  machine: Machine;
  onClick: (machine: Machine) => void;
  isSelected: boolean;
}

const MachineHeatmapCell: React.FC<MachineHeatmapCellProps> = ({
  machine,
  onClick,
  isSelected,
}) => {
  const statusConfig = MACHINE_STATUS_TYPES[machine.status];

  return (
    <div
      onClick={() => onClick(machine)}
      className={`
        relative aspect-square rounded cursor-pointer transition-all duration-200
        flex flex-col items-center justify-center gap-1
        ${statusConfig.color}
        ${
          isSelected
            ? "ring-2 ring-slate-900 dark:ring-white scale-110 z-10"
            : "hover:scale-105 hover:brightness-110 opacity-80 hover:opacity-100"
        }
      `}
      title={`${machine.name} - ${statusConfig.label}`}
    >
      <span className="text-[10px] font-bold text-white/90 drop-shadow-md">
        {machine.id.replace("M0", "")}
      </span>
      {machine.status === "ALARM" && (
        <AlertTriangle className="w-3 h-3 text-white absolute top-0.5 right-0.5" />
      )}
    </div>
  );
};

export default MachineHeatmapCell;
