import { useState, useEffect, useMemo } from "react";
import { generateMachines, generateHourlyData } from "@/lib/data";

export const useMachineData = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [allMachines, setAllMachines] = useState<any[]>([]);
  const [hourlyData, setHourlyData] = useState<any[]>([]);

  useEffect(() => {
    setAllMachines(generateMachines(100));
    setHourlyData(generateHourlyData());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setAllMachines((prev) =>
        prev.map((m) => {
          if (m.status === "RUNNING") {
            const shouldChange = Math.random() > 0.7;
            if (!shouldChange) return m;

            return {
              ...m,
              load: Math.min(
                100,
                Math.max(0, m.load + Math.floor(Math.random() * 10 - 5))
              ),
              rpm: Math.min(
                20000,
                Math.max(0, m.rpm + Math.floor(Math.random() * 200 - 100))
              ),
            };
          }
          return m;
        })
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(() => {
    return {
      running: allMachines.filter((m) => m.status === "RUNNING").length,
      idle: allMachines.filter((m) => m.status === "IDLE").length,
      alarm: allMachines.filter((m) => m.status === "ALARM").length,
      offline: allMachines.filter((m) => m.status === "OFFLINE").length,
    };
  }, [allMachines]);

  return {
    currentTime,
    allMachines,
    hourlyData,
    stats,
  };
};
