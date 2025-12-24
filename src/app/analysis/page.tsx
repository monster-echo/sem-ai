"use client";

import React from "react";
import MESAnalysisPanel from "@/components/dashboard/MESAnalysisPanel";
import { generateHourlyData } from "@/lib/data";

export default function AnalysisPage() {
  const hourlyData = generateHourlyData();

  return (
    <div className="h-full p-4">
      <MESAnalysisPanel hourlyData={hourlyData} />
    </div>
  );
}
