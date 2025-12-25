import React from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface GaugeProps {
  value: number;
}

const Gauge: React.FC<GaugeProps> = ({ value }) => {
  const { t } = useTranslation();
  const radius = 40;
  const center = 50;
  // Standard SVG coordinates: 0 is Right, 90 is Bottom, 180 is Left.
  // We want a semi-circle from Left (180) to Right (360/0).
  const startAngle = 180;
  const endAngle = 360;
  const totalAngle = endAngle - startAngle;

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, startAngle);
    const end = polarToCartesian(x, y, radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1, // Sweep flag 1 for clockwise
      end.x,
      end.y,
    ].join(" ");
  };

  // Ensure value is between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const valueAngle = startAngle + (clampedValue / 100) * totalAngle;

  // Generate ticks
  const ticks = [];
  const tickCount = 20;
  for (let i = 0; i <= tickCount; i++) {
    const angle = startAngle + (i / tickCount) * totalAngle;
    const isMajor = i % 5 === 0;
    const innerR = isMajor ? radius - 6 : radius - 4;
    const outerR = radius;
    const start = polarToCartesian(center, center, innerR, angle);
    const end = polarToCartesian(center, center, outerR, angle);
    ticks.push(
      <line
        key={i}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="currentColor"
        strokeWidth={isMajor ? 1.5 : 0.5}
        className="text-slate-300 dark:text-slate-600"
      />
    );
  }

  return (
    <div className="relative w-full flex items-end justify-center">
      <svg width="100%" viewBox="9 9 82 42" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
            <stop offset="33%" stopColor="#eab308" /> {/* Yellow */}
            <stop offset="66%" stopColor="#3b82f6" /> {/* Blue */}
            <stop offset="100%" stopColor="#22c55e" /> {/* Green */}
          </linearGradient>
        </defs>

        {/* Ticks */}
        {ticks}

        {/* Background Track */}
        <path
          d={describeArc(center, center, radius - 8, startAngle, endAngle)}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-slate-100 dark:text-slate-800"
        />

        {/* Value Path */}
        <path
          d={describeArc(center, center, radius - 8, startAngle, valueAngle)}
          fill="none"
          stroke="url(#gauge-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute bottom-0 flex flex-col items-center justify-center pb-0">
        <div className="flex items-center gap-0.5">
          <span className="text-md font-bold text-slate-900 dark:text-white leading-none">
            {value}%
          </span>
          {value > 90 ? (
            <ArrowUp className="w-3 h-3 text-emerald-500" />
          ) : value < 70 ? (
            <ArrowDown className="w-3 h-3 text-red-500" />
          ) : (
            <Minus className="w-3 h-3 text-yellow-500" />
          )}
        </div>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 scale-90">
          {t.common.availability}
        </span>
      </div>
    </div>
  );
};

export default Gauge;
